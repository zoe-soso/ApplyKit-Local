import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {readChineseProfile} from '../../src/shared/chinese-profile';
import {profileFileSchema} from '../../src/shared/schemas';
import {getCatalogField,readFieldValue} from '../../src/shared/field-catalog';

function blank():any {return JSON.parse(readFileSync(new URL('../../public/个人资料模板.json',import.meta.url),'utf8'))}
function valid():any {const p=blank();p['已由本人确认']=true;p['用途']='虚构测试';p['基础信息']['姓名']='测试同学';p['基础信息']['电子邮箱']='test@example.invalid';return p}
function parse(input:any){return readChineseProfile(JSON.stringify(input))!}

describe('中文资料：事实保真、错误拒绝与个人资料边界',()=>{
 it('空白模板须先由本人审阅，不会被误导入',()=>{expect(()=>parse(blank())).toThrow('已由本人确认')});
 it('空经历完全省略，不生成不存在的学校、公司和学历',()=>{const p=parse(valid());expect(profileFileSchema.safeParse(p).success).toBe(true);expect(p.data.education).toEqual([]);expect(p.data.projects).toEqual([]);expect(p.data.preferences.acceptsRelocation).toBe(null)});
 it('虚构中文资料保持演示标记，不能被当作真实档案',()=>{expect(parse(valid()).source.status).toBe('fictional')});
 it('两段教育各有自己的专业与日期，默认记录由本人指定',()=>{const p=valid();const r=p['教育经历'][0];r['学校名称']='第一测试大学';r['学历']='本科';r['专业']='通信工程';r['入学时间']='2023-09';r['毕业时间']='2027-06';r['默认记录']=true;const other=structuredClone(r);other['学校名称']='第二测试大学';other['专业']='软件工程';other['默认记录']=false;p['教育经历'].push(other);const out=parse(p);expect(profileFileSchema.safeParse(out).success).toBe(true);expect(out.data.education.map(e=>e.major)).toEqual(['通信工程','软件工程']);expect(out.data.education[0]?.endDate).toEqual({year:2027,month:6})});
 it('未指定性别、是否及日期不补值，否和0不会被当作未知',()=>{const p=valid();p['求职意向']['是否接受异地']='否';p['求职意向']['可实习月数']=0;const out=parse(p);expect(out.data.personal.gender).toBeNull();expect(out.data.personal.birthDate).toBeNull();expect(out.data.preferences.acceptsRelocation).toBe(false);expect(out.data.preferences.internshipMonths).toBe(0)});
 it('不存在的日历日期由原有校验拒绝，保留原先资料',()=>{const p=valid();p['基础信息']['出生日期']='2003-02-29';expect(profileFileSchema.safeParse(parse(p)).success).toBe(false)});
 it('不把籍贯当生源地，两项可以分别读取',()=>{const p=valid();p['基础信息']['籍贯']='甲地';p['基础信息']['生源地']='乙地';const out=parse(p);expect(readFieldValue(out.data,{section:'personal',field:'nativePlace'})).toEqual({kind:'text',value:'甲地'});expect(readFieldValue(out.data,{section:'personal',field:'sourceLocation'})).toEqual({kind:'text',value:'乙地'})});
 it('手动查阅的家庭和附件资料不导入扩展，也不拼进自我介绍',()=>{const p=valid();p['手动查阅资料']['家庭成员可选'][0]['姓名']='不可外传的占位文字';const out=parse(p);expect(JSON.stringify(out)).not.toContain('不可外传的占位文字');expect(out.source.note).toContain('不自动填写')});
 it('新增敏感字段必须手动确认，职位调剂和加班意愿不能被默认代答',()=>{for(const f of ['maritalStatus','address','passportNumber'])expect(getCatalogField('personal',f)?.requiresConfirmation).toBe(true);for(const f of ['overtime','shiftWork','locationAdjustment'])expect(getCatalogField('preferences',f)?.requiresConfirmation).toBe(true)});
 it('中文键被误改要明确报错，不能静默漏掉个人信息',()=>{const p=valid();p['基础信息']['电话号码拼错']='123';expect(()=>parse(p)).toThrow('未知字段')});
 it('非法列表、是否选项和记录类型被拒绝',()=>{const p=valid();p['求职意向']['意向城市']='深圳';expect(()=>parse(p)).toThrow('字符串数组');p['求职意向']['意向城市']=[];p['求职意向']['是否接受异地']='随便';expect(()=>parse(p)).toThrow('请填写是、否');p['求职意向']['是否接受异地']='';p['教育经历']={};expect(()=>parse(p)).toThrow('应为数组')});
 it('记录数和文件体积有限制',()=>{const p=valid();p['项目经历']=Array(21).fill({});expect(()=>parse(p)).toThrow('最多20段');expect(()=>readChineseProfile(' '.repeat(2*1024*1024+1))).toThrow('2MiB')});
 it('普通原生ApplyKit资料继续走原有入口，不在中文转换器内改写',()=>{expect(readChineseProfile('{"kind":"applykit-profile"}')).toBeNull()});
 it('相同模板重复转换生成独立版本，不覆盖其他履历',()=>{const p=valid();expect(parse(p).profileVersionId).not.toBe(parse(p).profileVersionId)});
});
