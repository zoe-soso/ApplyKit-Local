import {mkdtempSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {test,expect} from '@playwright/test';
import {appUrl,launchExtension,getState,findDemoTab,runFill,DEMO_ORIGIN,callBackground} from './helpers';

test('中文JSON经过真实文件选择、预览、保存，再在离线演示页填写；无外部请求',async()=>{
 const f=await launchExtension(mkdtempSync(path.join(tmpdir(),'local-cn-profile-')));
 const external:string[]=[];
 // Block all non-loopback web requests during this test, and fail if any are attempted.
 await f.context.route(/^https?:\/\//,async route=>{
  const u=new URL(route.request().url());
  if(u.hostname==='127.0.0.1'||u.hostname==='localhost')await route.continue();
  else{external.push(u.origin+u.pathname);await route.abort();}
 });
 try{
  const app=await f.context.newPage();await app.goto(appUrl(f.extensionId));
  const cn:any=JSON.parse(readFileSync(new URL('../../public/个人资料模板.json',import.meta.url),'utf8'));
  cn['已由本人确认']=true;cn['用途']='虚构测试';cn['基础信息']['姓名']='离线测试同学';cn['基础信息']['电子邮箱']='offline@example.invalid';cn['基础信息']['手机号码']='00000000002';cn['基础信息']['性别']='女';cn['基础信息']['生源地']='测试生源城市';
  cn['教育经历'][0]['学校名称']='本地测试大学';cn['教育经历'][0]['学历']='本科';cn['教育经历'][0]['专业']='通信工程';cn['教育经历'][0]['入学时间']='2023-09';cn['教育经历'][0]['毕业时间']='2027-06';cn['教育经历'][0]['主修课程']='电路、信号与系统';
  cn['手动查阅资料']['家庭成员可选'][0]['姓名']='绝不导入的虚构家属';
  const bytes=Buffer.from(JSON.stringify(cn),'utf8');
  await app.locator('#profile-file').setInputFiles({name:'虚构资料.local.json',mimeType:'application/json',buffer:bytes});
  await app.getByRole('button',{name:'校验并导入',exact:true}).click();
  await expect(app.getByText('姓名：离线测试同学',{exact:false})).toBeVisible();
  await app.locator('#btn-confirm-import').click();await expect.poll(async()=>(await getState(app)).profiles.length).toBe(1);
  const state=await getState(app);const version=state.activeProfileVersionId!;
  expect(JSON.stringify(state)).not.toContain('绝不导入的虚构家属');
  const target=await f.context.newPage();await target.goto(`${DEMO_ORIGIN}/basic.html`);
  const tab=await findDemoTab(app,'basic.html');const result=await runFill(app,tab.tabId,version);
  await expect(target.locator('#fullname')).toHaveValue('离线测试同学');
  await expect(target.locator('#email')).toHaveValue('offline@example.invalid');
  expect(result.snapshot.report.modelCalls).toBe(0);
  // A file with a typo must be rejected without changing the active profile.
  cn['基础信息']['错误键']='不应丢失后静默导入';
  await app.locator('#profile-file').setInputFiles({name:'错误资料.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(cn),'utf8')});
  await app.getByRole('button',{name:'校验并导入',exact:true}).click();
  await expect(app.getByText(/未知字段/)).toBeVisible();expect((await getState(app)).activeProfileVersionId).toBe(version);
  expect(external).toEqual([]);
  expect(await f.worker.evaluate(()=>chrome.storage.local.getKeys())).toContain('applykit.state.v1');
 }finally{await f.context.close()}
});
