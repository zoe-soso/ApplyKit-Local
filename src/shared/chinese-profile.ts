import type { ProfileFile } from './types';
type Spec={section:string;repeated:boolean;fields:Array<{label:string;field:string;type:string}>};
export const CHINESE_FIELDS:Record<string,Spec> = {
  "基础信息": {
    "section": "personal",
    "repeated": false,
    "fields": [
      {
        "label": "姓名",
        "field": "fullName",
        "type": "required"
      },
      {
        "label": "英文名",
        "field": "englishName",
        "type": "text"
      },
      {
        "label": "性别",
        "field": "gender",
        "type": "gender"
      },
      {
        "label": "手机号码",
        "field": "phone",
        "type": "text"
      },
      {
        "label": "电子邮箱",
        "field": "email",
        "type": "text"
      },
      {
        "label": "出生日期",
        "field": "birthDate",
        "type": "date"
      },
      {
        "label": "现居城市",
        "field": "currentCity",
        "type": "text"
      },
      {
        "label": "籍贯",
        "field": "nativePlace",
        "type": "text"
      },
      {
        "label": "国籍",
        "field": "nationality",
        "type": "text"
      },
      {
        "label": "微信号",
        "field": "wechat",
        "type": "text"
      },
      {
        "label": "个人主页",
        "field": "homepage",
        "type": "text"
      },
      {
        "label": "GitHub主页",
        "field": "github",
        "type": "text"
      },
      {
        "label": "工作经验",
        "field": "workExperience",
        "type": "text"
      },
      {
        "label": "最近公司",
        "field": "recentCompany",
        "type": "text"
      },
      {
        "label": "证件号码",
        "field": "identityNumber",
        "type": "text"
      },
      {
        "label": "紧急联系人姓名",
        "field": "emergencyContactName",
        "type": "text"
      },
      {
        "label": "紧急联系人电话",
        "field": "emergencyContactPhone",
        "type": "text"
      },
      {
        "label": "与紧急联系人关系",
        "field": "emergencyContactRelation",
        "type": "text"
      },
      {
        "label": "姓名拼音",
        "field": "namePinyin",
        "type": "text"
      },
      {
        "label": "QQ号",
        "field": "qq",
        "type": "text"
      },
      {
        "label": "备用电话",
        "field": "alternatePhone",
        "type": "text"
      },
      {
        "label": "民族",
        "field": "ethnicity",
        "type": "text"
      },
      {
        "label": "政治面貌",
        "field": "politicalStatus",
        "type": "text"
      },
      {
        "label": "婚姻状况",
        "field": "maritalStatus",
        "type": "text"
      },
      {
        "label": "户口性质",
        "field": "householdType",
        "type": "text"
      },
      {
        "label": "户籍所在地",
        "field": "householdLocation",
        "type": "text"
      },
      {
        "label": "出生地",
        "field": "birthPlace",
        "type": "text"
      },
      {
        "label": "生源地",
        "field": "sourceLocation",
        "type": "text"
      },
      {
        "label": "通讯地址",
        "field": "address",
        "type": "text"
      },
      {
        "label": "邮政编码",
        "field": "postalCode",
        "type": "text"
      },
      {
        "label": "证件类型",
        "field": "identityType",
        "type": "text"
      },
      {
        "label": "护照号码",
        "field": "passportNumber",
        "type": "text"
      },
      {
        "label": "健康状况",
        "field": "healthStatus",
        "type": "text"
      },
      {
        "label": "身高",
        "field": "height",
        "type": "text"
      },
      {
        "label": "体重",
        "field": "weight",
        "type": "text"
      },
      {
        "label": "兴趣爱好",
        "field": "hobbies",
        "type": "text"
      },
      {
        "label": "LinkedIn主页",
        "field": "linkedin",
        "type": "text"
      },
      {
        "label": "作品集链接",
        "field": "portfolio",
        "type": "text"
      }
    ]
  },
  "求职意向": {
    "section": "preferences",
    "repeated": false,
    "fields": [
      {
        "label": "意向岗位",
        "field": "targetRoles",
        "type": "list"
      },
      {
        "label": "意向城市",
        "field": "preferredCities",
        "type": "list"
      },
      {
        "label": "第一意向城市",
        "field": "primaryPreferredCity",
        "type": "text"
      },
      {
        "label": "期望月薪税前",
        "field": "expectedSalary",
        "type": "text"
      },
      {
        "label": "当前薪资",
        "field": "currentSalary",
        "type": "text"
      },
      {
        "label": "到岗说明",
        "field": "availabilityText",
        "type": "text"
      },
      {
        "label": "可实习月数",
        "field": "internshipMonths",
        "type": "number"
      },
      {
        "label": "每周可实习天数",
        "field": "daysPerWeek",
        "type": "number"
      },
      {
        "label": "是否接受异地",
        "field": "acceptsRelocation",
        "type": "boolean"
      },
      {
        "label": "开发语言",
        "field": "developmentLanguages",
        "type": "list"
      },
      {
        "label": "求职类型",
        "field": "employmentType",
        "type": "text"
      },
      {
        "label": "本次应聘职位",
        "field": "desiredPosition",
        "type": "text"
      },
      {
        "label": "期望年薪",
        "field": "expectedAnnualSalary",
        "type": "text"
      },
      {
        "label": "薪资是否可协商",
        "field": "salaryNegotiable",
        "type": "text"
      },
      {
        "label": "最早到岗日期",
        "field": "earliestStartDate",
        "type": "text"
      },
      {
        "label": "可实习开始日期",
        "field": "internshipStartDate",
        "type": "text"
      },
      {
        "label": "可实习结束日期",
        "field": "internshipEndDate",
        "type": "text"
      },
      {
        "label": "是否接受出差",
        "field": "businessTravel",
        "type": "text"
      },
      {
        "label": "是否接受倒班",
        "field": "shiftWork",
        "type": "text"
      },
      {
        "label": "是否接受加班",
        "field": "overtime",
        "type": "text"
      },
      {
        "label": "是否接受岗位调剂",
        "field": "locationAdjustment",
        "type": "text"
      },
      {
        "label": "是否需要住宿",
        "field": "accommodation",
        "type": "text"
      },
      {
        "label": "招聘信息来源",
        "field": "recruitmentSource",
        "type": "text"
      },
      {
        "label": "内推码",
        "field": "referralCode",
        "type": "text"
      },
      {
        "label": "内推人姓名",
        "field": "referrerName",
        "type": "text"
      }
    ]
  },
  "教育经历": {
    "section": "education",
    "repeated": true,
    "fields": [
      {
        "label": "学校名称",
        "field": "school",
        "type": "required"
      },
      {
        "label": "学院院系",
        "field": "department",
        "type": "text"
      },
      {
        "label": "学历",
        "field": "degreeLevel",
        "type": "degree"
      },
      {
        "label": "专业",
        "field": "major",
        "type": "text"
      },
      {
        "label": "学籍状态",
        "field": "enrollmentStatus",
        "type": "enrollment"
      },
      {
        "label": "学习形式",
        "field": "educationType",
        "type": "educationType"
      },
      {
        "label": "入学时间",
        "field": "startDate",
        "type": "date"
      },
      {
        "label": "毕业时间",
        "field": "endDate",
        "type": "date"
      },
      {
        "label": "GPA",
        "field": "gpa",
        "type": "text"
      },
      {
        "label": "GPA满分",
        "field": "gpaScale",
        "type": "text"
      },
      {
        "label": "专业排名",
        "field": "majorRanking",
        "type": "text"
      },
      {
        "label": "学号",
        "field": "studentNumber",
        "type": "text"
      },
      {
        "label": "实验室",
        "field": "lab",
        "type": "text"
      },
      {
        "label": "研究方向",
        "field": "researchDirection",
        "type": "text"
      },
      {
        "label": "导师",
        "field": "advisor",
        "type": "text"
      },
      {
        "label": "导师研究方向",
        "field": "advisorResearchDirection",
        "type": "text"
      },
      {
        "label": "教育经历说明",
        "field": "description",
        "type": "text"
      },
      {
        "label": "学校所在城市",
        "field": "schoolCity",
        "type": "text"
      },
      {
        "label": "校区",
        "field": "campus",
        "type": "text"
      },
      {
        "label": "学位名称",
        "field": "degreeName",
        "type": "text"
      },
      {
        "label": "班级",
        "field": "className",
        "type": "text"
      },
      {
        "label": "平均成绩",
        "field": "averageScore",
        "type": "text"
      },
      {
        "label": "专业排名百分比",
        "field": "rankingPercent",
        "type": "text"
      },
      {
        "label": "专业总人数",
        "field": "classSize",
        "type": "text"
      },
      {
        "label": "主修课程",
        "field": "majorCourses",
        "type": "text"
      },
      {
        "label": "第二专业",
        "field": "secondMajor",
        "type": "text"
      },
      {
        "label": "海外学习经历",
        "field": "studyAbroad",
        "type": "text"
      },
      {
        "label": "毕业论文题目",
        "field": "thesisTitle",
        "type": "text"
      },
      {
        "label": "毕业设计说明",
        "field": "thesisDescription",
        "type": "text"
      }
    ]
  },
  "工作经历": {
    "section": "workExperiences",
    "repeated": true,
    "fields": [
      {
        "label": "公司名称",
        "field": "company",
        "type": "required"
      },
      {
        "label": "部门",
        "field": "department",
        "type": "text"
      },
      {
        "label": "职位",
        "field": "title",
        "type": "text"
      },
      {
        "label": "城市",
        "field": "city",
        "type": "text"
      },
      {
        "label": "开始时间",
        "field": "startDate",
        "type": "date"
      },
      {
        "label": "结束时间",
        "field": "endDate",
        "type": "endDate"
      },
      {
        "label": "工作职责",
        "field": "description",
        "type": "text"
      },
      {
        "label": "任职性质",
        "field": "employmentType",
        "type": "text"
      },
      {
        "label": "所属行业",
        "field": "industry",
        "type": "text"
      },
      {
        "label": "工作成果",
        "field": "achievements",
        "type": "text"
      },
      {
        "label": "离职原因",
        "field": "leavingReason",
        "type": "text"
      }
    ]
  },
  "实习经历": {
    "section": "internships",
    "repeated": true,
    "fields": [
      {
        "label": "公司名称",
        "field": "company",
        "type": "required"
      },
      {
        "label": "部门",
        "field": "department",
        "type": "text"
      },
      {
        "label": "职位",
        "field": "title",
        "type": "text"
      },
      {
        "label": "城市",
        "field": "city",
        "type": "text"
      },
      {
        "label": "开始时间",
        "field": "startDate",
        "type": "date"
      },
      {
        "label": "结束时间",
        "field": "endDate",
        "type": "endDate"
      },
      {
        "label": "实习内容",
        "field": "description",
        "type": "text"
      },
      {
        "label": "实习性质",
        "field": "employmentType",
        "type": "text"
      },
      {
        "label": "实习成果",
        "field": "achievements",
        "type": "text"
      },
      {
        "label": "实习使用工具",
        "field": "tools",
        "type": "text"
      },
      {
        "label": "实习证明人",
        "field": "supervisor",
        "type": "text"
      }
    ]
  },
  "项目经历": {
    "section": "projects",
    "repeated": true,
    "fields": [
      {
        "label": "项目名称",
        "field": "name",
        "type": "required"
      },
      {
        "label": "项目角色",
        "field": "role",
        "type": "text"
      },
      {
        "label": "开始时间",
        "field": "startDate",
        "type": "date"
      },
      {
        "label": "结束时间",
        "field": "endDate",
        "type": "endDate"
      },
      {
        "label": "项目链接",
        "field": "url",
        "type": "text"
      },
      {
        "label": "项目描述",
        "field": "description",
        "type": "text"
      },
      {
        "label": "项目所属单位",
        "field": "organization",
        "type": "text"
      },
      {
        "label": "技术栈",
        "field": "technology",
        "type": "text"
      },
      {
        "label": "团队规模",
        "field": "teamSize",
        "type": "text"
      },
      {
        "label": "个人贡献",
        "field": "contribution",
        "type": "text"
      },
      {
        "label": "项目成果",
        "field": "results",
        "type": "text"
      }
    ]
  },
  "语言能力": {
    "section": "languages",
    "repeated": true,
    "fields": [
      {
        "label": "语种",
        "field": "language",
        "type": "required"
      },
      {
        "label": "语言证书",
        "field": "certificate",
        "type": "text"
      },
      {
        "label": "考试分数",
        "field": "score",
        "type": "text"
      },
      {
        "label": "考试时间",
        "field": "examDate",
        "type": "date"
      },
      {
        "label": "掌握程度",
        "field": "proficiency",
        "type": "text"
      },
      {
        "label": "听说能力",
        "field": "listeningSpeaking",
        "type": "text"
      },
      {
        "label": "读写能力",
        "field": "readingWriting",
        "type": "text"
      }
    ]
  },
  "获奖经历": {
    "section": "awards",
    "repeated": true,
    "fields": [
      {
        "label": "奖项名称",
        "field": "name",
        "type": "required"
      },
      {
        "label": "获奖日期",
        "field": "date",
        "type": "date"
      },
      {
        "label": "颁发单位",
        "field": "issuer",
        "type": "text"
      },
      {
        "label": "奖项说明",
        "field": "description",
        "type": "text"
      },
      {
        "label": "获奖级别",
        "field": "level",
        "type": "text"
      },
      {
        "label": "获奖等级",
        "field": "rank",
        "type": "text"
      }
    ]
  },
  "论文专著专利": {
    "section": "publications",
    "repeated": true,
    "fields": [
      {
        "label": "成果名称",
        "field": "name",
        "type": "required"
      },
      {
        "label": "发表日期",
        "field": "publishedAt",
        "type": "date"
      },
      {
        "label": "成果描述",
        "field": "description",
        "type": "text"
      },
      {
        "label": "成果类型",
        "field": "publicationType",
        "type": "text"
      },
      {
        "label": "刊物会议名称",
        "field": "journal",
        "type": "text"
      },
      {
        "label": "作者排序",
        "field": "authorOrder",
        "type": "text"
      },
      {
        "label": "DOI",
        "field": "doi",
        "type": "text"
      }
    ]
  },
  "资格证书": {
    "section": "certificates",
    "repeated": true,
    "fields": [
      {
        "label": "证书名称",
        "field": "name",
        "type": "required"
      },
      {
        "label": "获得日期",
        "field": "obtainedAt",
        "type": "date"
      },
      {
        "label": "证书说明",
        "field": "description",
        "type": "text"
      },
      {
        "label": "证书颁发机构",
        "field": "issuer",
        "type": "text"
      },
      {
        "label": "证书编号",
        "field": "certificateNumber",
        "type": "text"
      },
      {
        "label": "证书有效期",
        "field": "validUntil",
        "type": "text"
      }
    ]
  }
};
const ENUMS:Record<string,Record<string,string>>={
 gender:{男:'male',女:'female',其他:'other','不愿透露':'other'},
 degree:{本科:'bachelor',学士:'bachelor',硕士:'master',博士:'doctor',大专:'associate',专科:'associate',其他:'other'},
 enrollment:{在读:'enrolled',在校:'enrolled',已毕业:'graduated'},
 educationType:{全日制统招:'fullTimeUnified',全日制:'fullTime',非全日制:'partTime',其他:'other'},
};
function fail(path:string,reason:string):never{throw new Error(path+'：'+reason)}
function valueOf(v:unknown,type:string,path:string):unknown {
 if(v===null||v===undefined||v==='')return type==='required'?'':type==='list'?[]:null;
 if(type==='list') {if(!Array.isArray(v)||v.some(x=>typeof x!=='string'))fail(path,'请填写字符串数组');return v.map(x=>(x as string).trim()).filter(Boolean);}
 if(type==='boolean'){if(v===true||v==='是')return true;if(v===false||v==='否')return false;return fail(path,'请填写是、否或留空');}
 if(type==='number'){if(typeof v!=='string'&&typeof v!=='number')fail(path,'需要数字');const n=Number(v);if(!Number.isFinite(n)||!Number.isInteger(n))fail(path,'需要整数');return n;}
 if(typeof v!=='string')fail(path,'请填写文本，不要把内容改成对象');
 const text=v.trim();
 if(type==='date'||type==='endDate'){
   if(type==='endDate'&&text==='至今')return {present:true};
   const m=/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/.exec(text);
   if(!m)fail(path,'日期请填YYYY、YYYY-MM、YYYY-MM-DD，结束日期也可填至今');
   return {year:Number(m[1]),...(m[2]?{month:Number(m[2])}:{}),...(m[3]?{day:Number(m[3])}:{})};
 }
 if(ENUMS[type]) {const e=ENUMS[type]!;if(e[text])return e[text];if(Object.values(e).includes(text))return text;return fail(path,'选项不正确，请参照模板填写说明');}
 return text;
}
function recordOf(raw:unknown,spec:Spec,path:string):Record<string,unknown>{
 if(!raw||typeof raw!=='object'||Array.isArray(raw))fail(path,'需要一组字段');
 const record=raw as Record<string,unknown>;
 const valid=new Set(spec.fields.map(f=>f.label));if(spec.repeated)valid.add('默认记录');
 for(const key of Object.keys(record))if(!valid.has(key))fail(path+'.'+key,'未知字段，请不要修改字段名');
 const converted:Record<string,unknown>={};
 for(const f of spec.fields)converted[f.field]=valueOf(record[f.label],f.type,path+'.'+f.label);
 if(spec.repeated){const primary=record['默认记录'];if(primary!==undefined&&typeof primary!=='boolean')fail(path+'.默认记录','请填写true或false');converted['primary']=primary===true;}
 return converted;
}
/** Only parses the file the owner selected; no network, filesystem search or logging. */
export function readChineseProfile(raw:string):ProfileFile|null{
 if(new TextEncoder().encode(raw).length>2*1024*1024)fail('文件','超过2MiB上限');
 let input:unknown;try{input=JSON.parse(raw)}catch{return null}
 if(!input||typeof input!=='object'||(input as Record<string,unknown>)['格式']!=='本地网申资料-v1')return null;
 const source=input as Record<string,unknown>;
 if(source['已由本人确认']!==true)fail('已由本人确认','请先在本机填好并审阅资料，再将这一项设为true');
 const rootKeys=new Set(['格式','资料名称','已由本人确认','_填写说明','用途','自我评价','手动查阅资料',...Object.keys(CHINESE_FIELDS)]);
 for(const key of Object.keys(source))if(!rootKeys.has(key))fail(key,'未知分区，请不要修改分区名');
 const data:Record<string,unknown>={};
 for(const [label,spec] of Object.entries(CHINESE_FIELDS)){
  const raw=source[label];
  if(spec.repeated){
   if(raw===undefined){data[spec.section]=[];continue}
   if(!Array.isArray(raw)||raw.length>20)fail(label,'应为数组，每类最多20段');
   data[spec.section]=raw.map((entry,i)=>({entry,converted:recordOf(entry,spec,`${label}[${i+1}]`)}))
    .filter(({converted})=>Object.entries(converted).some(([k,v])=>k!=='primary'&&v!==null&&v!==''&&!(Array.isArray(v)&&!v.length)))
    .map(({converted},i)=>({id:spec.section+'-'+(i+1),...converted}));
  }else data[spec.section]=recordOf(raw??{},spec,label);
 }
 data['selfIntroduction']=valueOf(source['自我评价'],'text','自我评价');
 const id='local-'+crypto.randomUUID();
 return {kind:'applykit-profile',schemaVersion:1,profileId:id,profileVersionId:id+'-v1',name:typeof source['资料名称']==='string'&&source['资料名称'].trim()?source['资料名称'].trim():'我的求职资料',createdAt:new Date().toISOString(),source:{type:source['用途']==='虚构测试'?'demo':'import',status:source['用途']==='虚构测试'?'fictional':'user-reviewed',note:'中文资料在本机转换。手动查阅资料只留在原JSON，不导入扩展、不自动填写；请保管原文件。'},data:data as unknown as ProfileFile['data']};
}
