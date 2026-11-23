import {describe,it,expect} from 'vitest';
import {buildDiagnosticReport,explainField,classifyExecution} from '../../src/shared/diagnostics';
import {conflictingRecordTargets} from '../../src/shared/record-targets';
import type {FieldResult,FillAction} from '../../src/shared/types';
function field(overrides:Partial<FieldResult>={}):FieldResult{return {fieldId:'one',section:'personal',source:null,outcome:'pending',reasonCode:'REQUIRES_USER_ACTION',label:'户籍所在地',elapsedMs:0,...overrides}}
describe('可行动的失败诊断与数据最小化',()=>{
 it('户籍被保护时明确原因，不能谎报为匹配或控件故障',()=>{const r=explainField(field({diagnosticCode:'SENSITIVE_CONFIRMATION'}));expect(r.cause).toContain('敏感信息保护');expect(r.nextStep).toContain('不是资料缺失')});
 it('区分禁用、只读和控件匹配失败',()=>{expect(explainField(field({diagnosticCode:'CONTROL_DISABLED'})).cause).toContain('禁用');expect(explainField(field({diagnosticCode:'CONTROL_READONLY'})).cause).toContain('只读');expect(classifyExecution('没有找到选项','AMBIGUOUS_OPTION','户籍地')).toBe('REGION_OPTION_UNMATCHED')});
 it('导出字段名称、结构序号和原因，不导出填写值/选项/履历/网址',()=>{const r=buildDiagnosticReport({phase:'completed',fields:[field(),field({fieldId:'two',label:'项目描述',section:'projects',reasonCode:'AMBIGUOUS_RECORD'})]},[{fieldId:'one',label:'户籍所在地',section:'personal',controlKind:'combobox',required:true,unsupportedReason:'机密网站报错',recordInstanceId:null},{fieldId:'two',label:'项目描述',section:'projects',controlKind:'textarea',recordInstanceId:'用户私有标识'}]);const text=JSON.stringify(r);expect(text).not.toContain('机密网站报错');expect(text).not.toContain('用户私有标识');expect(r.fields[0]?.fieldName).toBe('户籍所在地');expect(r.fields[1]?.recordGroup).toBe(1)});
 it('不把已填和原值相同计为未完成；保留原值有独立原因',()=>{const r=buildDiagnosticReport({phase:'completed',fields:[field({outcome:'filled',reasonCode:'FILLED_VERIFIED'}),field({fieldId:'two',outcome:'unchanged',reasonCode:'VALUE_ALREADY_EQUAL'}),field({fieldId:'three',outcome:'preserved',reasonCode:'EXISTING_VALUE'})]},[]);expect(r.totalFields).toBe(3);expect(r.unresolvedFields).toBe(1);expect(r.fields[0]?.cause).toContain('默认保留')});
 it('未知标签的邮箱和长数字被移除，不透传执行器报错文本',()=>{const r=buildDiagnosticReport({phase:'completed',fields:[field({label:'联系 a@example.invalid 13800000000',diagnosticCode:'PAGE_REJECTED_RESULT',reasonCode:'VALIDATION_FAILED'})]},[]);expect(JSON.stringify(r)).not.toContain('a@example.invalid');expect(JSON.stringify(r)).not.toContain('13800000000')});
 it('历史记录无新增诊断码也能给出原因和建议',()=>{const r=explainField(field({reasonCode:'SOURCE_MISSING'}));expect(r.cause).toContain('缺少');expect(r.nextStep).toContain('补充')});
});
describe('项目不能合写到同一格',()=>{
 function action(id:string,record:string):FillAction{return {fieldId:id,source:{section:'projects',recordId:record,field:'description'},expectedFingerprint:'x',kind:'textarea',value:'独立描述',overwrite:false}}
 it('两个项目同一目标时两个动作都阻止，尚未开始就不写入',()=>{const target={};const r=conflictingRecordTargets([action('a','project-one'),action('b','project-two')],()=>target);expect([...r].sort()).toEqual(['a','b'])});
 it('两个独立输入框可分别填写，不把整个重复区块误判为冲突',()=>{const nodes={a:{},b:{}};expect(conflictingRecordTargets([action('a','project-one'),action('b','project-two')],id=>nodes[id as 'a'|'b']).size).toBe(0)});
 it('同一记录的重复校验不误报，但冲突后新增同目标动作仍不能放行',()=>{const node={};const actions=[action('a','p1'),action('b','p2'),action('c','p1')];const blocked=conflictingRecordTargets(actions,()=>node);expect(blocked.has('a')).toBe(true);expect(blocked.has('b')).toBe(true);expect(blocked.has('c')).toBe(true)});
});
