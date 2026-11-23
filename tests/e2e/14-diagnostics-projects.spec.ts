import {mkdtempSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {test,expect} from '@playwright/test';
import {appUrl,launchExtension,importDemoProfile,getState,findDemoTab,runFill,DEMO_ORIGIN,callBackground} from './helpers';

test('户籍保护清楚显示字段名、原因、建议，并导出无个人值的诊断',async()=>{
 const f=await launchExtension(mkdtempSync(path.join(tmpdir(),'diagnosis-report-')));
 try{
  const app=await f.context.newPage();await app.goto(appUrl(f.extensionId));await importDemoProfile(app);const profile=(await getState(app)).activeProfileVersionId!;
  const page=await f.context.newPage();await page.goto(DEMO_ORIGIN+'/basic.html');
  await page.evaluate(()=>{const box=document.createElement('fieldset');box.innerHTML='<legend>个人信息</legend><label for="hukou-region">户籍所在地</label><select id="hukou-region"><option value="">请选择</option><option>示例地区</option></select>';document.body.append(box)});
  const tab=await findDemoTab(app,'basic.html');const {run,snapshot}=await runFill(app,tab.tabId,profile);
  expect(snapshot.report.fields.find(x=>x.label==='户籍所在地')).toMatchObject({outcome:'pending',diagnosticCode:'SENSITIVE_CONFIRMATION'});
  await expect(page.locator('#hukou-region')).toHaveValue('');
  await app.goto(appUrl(f.extensionId,'review/'+run.runId));
  await expect(app.getByRole('heading',{name:'未完成字段与原因报告'})).toBeVisible();
  await expect(app.locator('.diagnostic-items')).toContainText('户籍所在地');await expect(app.locator('.diagnostic-items')).toContainText('敏感信息保护');
  const download=app.waitForEvent('download');await app.locator('#btn-export-diagnostics').click();const item=await download;const file=await item.path();const raw=readFileSync(file!,'utf8');const exported=JSON.parse(raw);
  expect(exported.format).toBe('local-apply-diagnostics-v1');expect(exported.fields.some((x:any)=>x.fieldName==='户籍所在地'&&x.code==='SENSITIVE_CONFIRMATION')).toBe(true);
  for(const secret of ['lin@example.com','00000000000','林示例','320000200001010000','profile-demo-lin'])expect(raw).not.toContain(secret);
  expect(exported).not.toHaveProperty('origin');expect(exported).not.toHaveProperty('profile');
 }finally{await f.context.close()}
});

test('只读下拉通过关联选项填写，普通只读文本保留，无项目页面不提示新增项目',async()=>{
 const f=await launchExtension(mkdtempSync(path.join(tmpdir(),'readonly-select-')));
 try{
  const app=await f.context.newPage();await app.goto(appUrl(f.extensionId));await importDemoProfile(app);const version=(await getState(app)).activeProfileVersionId!;
  const page=await f.context.newPage();await page.goto(DEMO_ORIGIN+'/basic.html');
  await page.evaluate(()=>{
   document.body.innerHTML='<fieldset><legend>个人基本信息</legend><div class="el-form-item is-required"><label for="highest" class="el-form-item__label">最高学历</label><input id="highest" readonly role="combobox" aria-controls="degree-options" aria-expanded="false"><div id="degree-options" role="listbox" hidden><div role="option">本科</div><div role="option">硕士</div></div></div><label for="locked">姓名</label><input id="locked" readonly></fieldset>';
   const input=document.querySelector<HTMLInputElement>('#highest')!,list=document.querySelector<HTMLElement>('#degree-options')!;
   input.onclick=()=>{list.hidden=false;input.setAttribute('aria-expanded','true')};
   list.querySelectorAll<HTMLElement>('[role="option"]').forEach(option=>option.onclick=()=>{input.value=option.textContent!;list.hidden=true;input.setAttribute('aria-expanded','false');input.dispatchEvent(new Event('change',{bubbles:true}))});
  });
  const tab=await findDemoTab(app,'basic.html');const {run,snapshot}=await runFill(app,tab.tabId,version);
  await expect(page.locator('#highest')).toHaveValue('硕士');await expect(page.locator('#locked')).toHaveValue('');
  expect(snapshot.report.fields.find(x=>x.label==='姓名')).toMatchObject({diagnosticCode:'CONTROL_READONLY'});
  expect(run.notes.some(x=>x.includes('项目栏'))).toBe(false);
  expect(snapshot.descriptors.find(x=>x.label==='最高学历')).toMatchObject({required:true});
 }finally{await f.context.close()}
});

test('北森“项目经历”标题及额外嵌套wrapper下，两条项目仍分别写入',async()=>{
 const f=await launchExtension(mkdtempSync(path.join(tmpdir(),'beisen-separate-projects-')));
 try{
  const app=await f.context.newPage();await app.goto(appUrl(f.extensionId));await importDemoProfile(app);const version=(await getState(app)).activeProfileVersionId!;
  const page=await f.context.newPage();await page.goto(DEMO_ORIGIN+'/beisen-style.html');
  await page.evaluate(()=>{
   // Projects have an explicit project heading; campus practice is tested separately below.
   const region=document.querySelector('[data-repeated="projects"]');if(!region)throw new Error('no project section');
   // Two initial independent slots within an additional layout wrapper.
   const add=region.querySelector('#projects_addButton');
   if(!(add instanceof HTMLElement))throw new Error('no project add button');add.click();
   const records=[...region.querySelectorAll('[data-record]')];
   if(records.length!==2)throw new Error('expected exactly two project slots');
   const body=region.querySelector('.beisen-body');if(!body)throw new Error('missing project body');const wrapper=document.createElement('div');wrapper.setAttribute('data-nested-project-fixture','true');while(body.firstChild)wrapper.append(body.firstChild);body.append(wrapper);
  });
  await expect(page.locator('[data-nested-project-fixture] [data-record]')).toHaveCount(2);
  const tab=await findDemoTab(app,'beisen-style.html');const {snapshot}=await runFill(app,tab.tabId,version);
  expect(snapshot.report.fields.filter(f=>f.outcome==='failed')).toHaveLength(0);
  const profile=JSON.parse(readFileSync(new URL('../../fixtures/profile.demo.json',import.meta.url),'utf8'));
  for(let n=1;n<=2;n++){
   await expect(page.locator(`[name="project-name-${n}"]`)).toHaveValue(profile.data.projects[n-1].name);
   await expect(page.locator(`[name="project-result-${n}"]`)).toHaveValue(profile.data.projects[n-1].description);
   const other=profile.data.projects[n===1?1:0].description;expect(await page.locator(`[name="project-result-${n}"]`).inputValue()).not.toContain(other);
  }
  expect(snapshot.descriptors.filter(d=>d.label==='实践名称').map(d=>d.recordInstanceId).filter(Boolean).length).toBe(2);
 }finally{await f.context.close()}
});

test('项目、在校实践、技能共存时不跨区写入，错误提示不作为标签',async()=>{
 const f=await launchExtension(mkdtempSync(path.join(tmpdir(),'scope-boundaries-')));
 try{
  const app=await f.context.newPage();await app.goto(appUrl(f.extensionId));await importDemoProfile(app);const version=(await getState(app)).activeProfileVersionId!;
  const page=await f.context.newPage();await page.goto(DEMO_ORIGIN+'/beisen-style.html');
  await page.evaluate(()=>{
   const parent=document.querySelector('[data-repeated="projects"]')!.parentElement!;
   for(const [title,id] of [['在校实践','campus'],['技能','skills']]){
    const box=document.createElement('div');box.innerHTML=`<div class="beisen-section-heading">${title}</div><div class="form-item"><div class="form-item__title"><span class="form-item__text">项目名称</span></div><input id="${id}-name"></div><div class="form-item"><div class="form-item__title"><span class="form-item__text">自我评价</span></div><textarea id="${id}-description"></textarea></div>`;parent.append(box);
   }
   const box=document.createElement('fieldset');box.innerHTML='<legend>个人基本信息</legend><div class="el-form-item is-required"><label class="el-form-item__label">微信号</label><div><div class="el-form-item__error">必填项未填写</div><input id="safe-label"></div></div><label for="prefix">手机号</label><select id="prefix"><option value="86">+86</option><option value="1">+1</option></select>';parent.append(box);
  });
  const tab=await findDemoTab(app,'beisen-style.html');const {run,snapshot}=await runFill(app,tab.tabId,version);
  for(const id of ['campus-name','campus-description','skills-name','skills-description'])await expect(page.locator('#'+id)).toHaveValue('');
  expect(snapshot.report.fields.filter((x:any)=>x.diagnosticCode==='SECTION_NOT_SUPPORTED')).toHaveLength(4);
  expect(snapshot.descriptors.some(d=>d.label==='必填项未填写')).toBe(false);
  expect(snapshot.descriptors.some(d=>d.label==='微信号')).toBe(true);
  await expect(page.locator('#prefix')).toHaveValue('86');
  expect(snapshot.report.fields.some((x:any)=>x.diagnosticCode==='PHONE_PREFIX_MANUAL')).toBe(true);
  const profile=JSON.parse(readFileSync(new URL('../../fixtures/profile.demo.json',import.meta.url),'utf8'));
  for(let n=1;n<=2;n++)await expect(page.locator(`[name="project-result-${n}"]`)).toHaveValue(profile.data.projects[n-1].description);
  // A route change cancels old work but a fresh scan can establish a new baseline.
  await page.evaluate(()=>{location.hash='/new-form';document.body.append(document.createElement('hr'))});
  await page.waitForTimeout(100);
  const next=await runFill(app,tab.tabId,version,'scan');expect(next.snapshot.descriptors.length).toBeGreaterThan(0);
 }finally{await f.context.close()}
});
