import {CATALOG} from './field-catalog';
import type {FieldResult,ReasonCode} from './types';

export const DIAGNOSTIC_CODES = ['SECTION_NOT_SUPPORTED','PHONE_PREFIX_MANUAL','SENSITIVE_CONFIRMATION','CONTROL_DISABLED','CONTROL_READONLY','CONTROL_HIDDEN','RECORD_CONTAINER_MISSING','RECORD_TARGET_REUSED','REGION_OPTION_UNMATCHED','DROPDOWN_NOT_OPEN','PAGE_REJECTED_RESULT'] as const;
export type DiagnosticCode = typeof DIAGNOSTIC_CODES[number];
export interface DiagnosticDescriptor {fieldId:string;label:string;section:string;controlKind:string;required?:boolean;recordInstanceId?:string|null;unsupportedReason?:string|null}
const reasons:Record<ReasonCode,[string,string]>={
 READY_TO_FILL:['已匹配，尚未执行填写','返回插件弹窗点击一键填写。'],FILLED_VERIFIED:['已填写并回读确认','核对网页内容后由本人提交。'],VALUE_ALREADY_EQUAL:['原值相同，无需改写','保留即可。'],EXISTING_VALUE:['网页已有不同内容，默认保留','核对网页原值，确需更换时再明确允许覆盖。'],
 SOURCE_MISSING:['资料中缺少对应内容','在履历编辑器补充该字段后重新扫描；没有该经历则删除网页空记录。'],NO_MATCH:['识别到了网页字段，但没有可靠的资料对应关系','在本地选择对应源字段，或手动填写后保留字段名称供适配。'],AMBIGUOUS_FIELD:['多个资料字段都可能对应，无法唯一确认','选择准确的源字段，不自动猜测。'],AMBIGUOUS_RECORD:['不能确定网页这组栏位属于哪一段经历','新增足够的项目/教育栏位，或使用整组填写选择对应记录；不会拼接多段。'],AMBIGUOUS_OPTION:['下拉选项没有唯一对应项','核对网站实际选项与资料写法；地区级别不同请手动选择省、市、区。'],UNSUPPORTED_WIDGET:['控件暂不支持自动操作','在网页手动处理；导出结构诊断供后续适配。'],PRECISION_MISMATCH:['日期精度不足','网站若要求完整日期，请补齐本人确认的年月日；不自动猜日期。'],TEXT_TOO_LONG:['资料长度超过网页限制','缩短此字段的描述，保留原资料副本。'],REQUIRES_USER_ACTION:['该项需要本人确认或手动操作','在网页逐项核对后处理。'],STALE_PAGE:['页面或字段结构已经变化','等待网页稳定后重新扫描，不继续使用旧定位。'],VALIDATION_FAILED:['写入后网页未接受或回读不一致','查看网页校验提示，按要求调整或手动填写。'],TIMEOUT:['等待控件或网页响应超时','关闭遗留弹层，等待网页完成加载后重新扫描。'],USER_CANCELLED:['本轮被主动停止','核对已填内容，需要时重新扫描。'],RULE_STALE:['本地保存的对应规则不再适用','重新扫描并选择正确对应关系。'],
};
const details:Record<DiagnosticCode,[string,string]>={
 SECTION_NOT_SUPPORTED:['该分区尚未适配，已阻止跨区填写','技能、在校实践等请手动填写；不会使用项目或自我评价代填。'],PHONE_PREFIX_MANUAL:['这是电话国家区号选择器','请本人确认区号；手机号仅写入独立的号码输入框。'],
 SENSITIVE_CONFIRMATION:['敏感信息保护：此项默认不自动填写','户籍、证件、家庭信息等由本人在招聘网页确认；不是资料缺失或程序超时。'],CONTROL_DISABLED:['网页将控件设为禁用','先完成网页前置步骤或联系招聘方，插件不绕过禁用状态。'],CONTROL_READONLY:['网页将控件设为只读','按网页流程修改，或检查是否为账号固定信息。'],CONTROL_HIDDEN:['字段当前不可见或尚未展开','先展开对应栏位，再重新扫描。'],RECORD_CONTAINER_MISSING:['没有识别到独立的经历容器','先新增/展开独立项目栏；不能把多条经历塞进单个文本框。'],RECORD_TARGET_REUSED:['防串写保护：该输入框已属于另一段经历','停止向该格写入；新增独立项目栏并重新扫描，导出诊断检查北森分组。'],REGION_OPTION_UNMATCHED:['地区选项匹配失败或行政级别不同','在网页手动选择省/市/区，不用籍贯或生源地替代户籍。'],DROPDOWN_NOT_OPEN:['下拉或地区弹窗没有正常展开','关闭已有弹层，手动展开一次后重试；仍失败则需要适配该控件。'],PAGE_REJECTED_RESULT:['网页在输入后拒绝、撤销或清空该值','检查网页的校验提示，避免把视觉写入误认为已保存。'],
};
export function explainField(field:Pick<FieldResult,'reasonCode'|'diagnosticCode'>,descriptor?:DiagnosticDescriptor){
 const specific=field.diagnosticCode?details[field.diagnosticCode]:undefined;
 const [cause,nextStep]=specific??reasons[field.reasonCode];
 return {cause,nextStep,code:field.diagnosticCode??field.reasonCode};
}
export function classifyExecution(message:string,reason:ReasonCode,label:string):DiagnosticCode|undefined{
 if(message.startsWith('防串写保护'))return 'RECORD_TARGET_REUSED';
 if(reason==='AMBIGUOUS_OPTION'&&/户籍|户口|籍贯|生源|城市|地区|所在地/.test(label))return 'REGION_OPTION_UNMATCHED';
 if(/未.*展开|没有.*弹|无法.*打开/.test(message))return 'DROPDOWN_NOT_OPEN';
 if(reason==='VALIDATION_FAILED')return 'PAGE_REJECTED_RESULT';
 return undefined;
}
export function safeDiagnosticLabel(label:string):string{
 // Labels only; never include source values, options, website error text or URLs.
 const known=CATALOG.flatMap(s=>s.fields).find(f=>f.label===label||f.aliases.includes(label));
 if(known)return known.label;
 return label.replace(/https?:\/\/\S+/gi,'[链接已移除]').replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi,'[邮箱已移除]').replace(/\b\d{5,}[\dXx]*\b/g,'[数字已移除]').replace(/[\r\n]/g,' ').slice(0,60)||'无标签字段';
}
export function buildDiagnosticReport(report:{phase:string;fields:FieldResult[]},descriptors:DiagnosticDescriptor[]){
 const groups=new Map<string,number>();
 const fields=report.fields.filter(f=>['pending','failed','preserved'].includes(f.outcome)).map((f,index)=>{
  const d=descriptors.find(x=>x.fieldId===f.fieldId);let group:number|null=null;
  if(d?.recordInstanceId){if(!groups.has(d.recordInstanceId))groups.set(d.recordInstanceId,groups.size+1);group=groups.get(d.recordInstanceId)!;}
  return {index:index+1,fieldName:safeDiagnosticLabel(f.label),section:f.section,recordGroup:group,controlKind:d?.controlKind??'unknown',required:d?.required??false,status:f.outcome,...explainField(f,d)};
 });
 const grouped:Record<string,number>={};for(const f of fields)grouped[f.code]=(grouped[f.code]??0)+1;
 return {format:'local-apply-diagnostics-v1',extensionVersion:'0.1.3',phase:report.phase,totalFields:report.fields.length,unresolvedFields:fields.length,reasonCounts:grouped,fields,privacy:'仅包含字段标签、类型、分组序号和固定原因说明；没有填写值、简历、网页HTML、选项文本、登录URL或网站原始报错。分享前请预览字段标签。'};
}
