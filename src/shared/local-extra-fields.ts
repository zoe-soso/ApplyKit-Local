import type { CatalogField } from './field-catalog';
export const LOCAL_EXTRA_FIELDS: Record<string,CatalogField[]> = {
  "personal": [
    {
      "field": "namePinyin",
      "label": "姓名拼音",
      "valueKind": "text",
      "aliases": [
        "姓名拼音",
        "拼音姓名",
        "姓名全拼"
      ]
    },
    {
      "field": "qq",
      "label": "QQ号",
      "valueKind": "text",
      "aliases": [
        "QQ号",
        "QQ",
        "QQ号码"
      ]
    },
    {
      "field": "alternatePhone",
      "label": "备用电话",
      "valueKind": "text",
      "aliases": [
        "备用电话",
        "备用手机号",
        "其他联系电话"
      ]
    },
    {
      "field": "ethnicity",
      "label": "民族",
      "valueKind": "text",
      "aliases": [
        "民族"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "politicalStatus",
      "label": "政治面貌",
      "valueKind": "text",
      "aliases": [
        "政治面貌"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "maritalStatus",
      "label": "婚姻状况",
      "valueKind": "text",
      "aliases": [
        "婚姻状况",
        "婚姻情况"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "householdType",
      "label": "户口性质",
      "valueKind": "text",
      "aliases": [
        "户口性质",
        "户籍性质"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "householdLocation",
      "label": "户籍所在地",
      "valueKind": "text",
      "aliases": [
        "户籍所在地",
        "户口所在地"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "birthPlace",
      "label": "出生地",
      "valueKind": "text",
      "aliases": [
        "出生地"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "sourceLocation",
      "label": "生源地",
      "valueKind": "text",
      "aliases": [
        "生源地"
      ]
    },
    {
      "field": "address",
      "label": "通讯地址",
      "valueKind": "text",
      "aliases": [
        "通讯地址",
        "通信地址",
        "详细地址"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "postalCode",
      "label": "邮政编码",
      "valueKind": "text",
      "aliases": [
        "邮政编码",
        "邮编"
      ]
    },
    {
      "field": "identityType",
      "label": "证件类型",
      "valueKind": "text",
      "aliases": [
        "证件类型",
        "身份证件类型"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "passportNumber",
      "label": "护照号码",
      "valueKind": "text",
      "aliases": [
        "护照号码",
        "护照号"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "healthStatus",
      "label": "健康状况",
      "valueKind": "text",
      "aliases": [
        "健康状况"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "height",
      "label": "身高",
      "valueKind": "text",
      "aliases": [
        "身高"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "weight",
      "label": "体重",
      "valueKind": "text",
      "aliases": [
        "体重"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "hobbies",
      "label": "兴趣爱好",
      "valueKind": "text",
      "aliases": [
        "兴趣爱好",
        "个人爱好"
      ]
    },
    {
      "field": "linkedin",
      "label": "LinkedIn主页",
      "valueKind": "text",
      "aliases": [
        "LinkedIn主页",
        "linkedin"
      ]
    },
    {
      "field": "portfolio",
      "label": "作品集链接",
      "valueKind": "text",
      "aliases": [
        "作品集链接",
        "作品链接"
      ]
    }
  ],
  "preferences": [
    {
      "field": "employmentType",
      "label": "求职类型",
      "valueKind": "text",
      "aliases": [
        "求职类型",
        "工作性质",
        "求职性质"
      ]
    },
    {
      "field": "desiredPosition",
      "label": "本次应聘职位",
      "valueKind": "text",
      "aliases": [
        "本次应聘职位",
        "本次申请岗位"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "expectedAnnualSalary",
      "label": "期望年薪",
      "valueKind": "text",
      "aliases": [
        "期望年薪",
        "期望年收入",
        "期望年薪税前"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "salaryNegotiable",
      "label": "薪资是否可协商",
      "valueKind": "text",
      "aliases": [
        "薪资是否可协商"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "earliestStartDate",
      "label": "最早到岗日期",
      "valueKind": "text",
      "aliases": [
        "最早到岗日期"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "internshipStartDate",
      "label": "可实习开始日期",
      "valueKind": "text",
      "aliases": [
        "可实习开始日期"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "internshipEndDate",
      "label": "可实习结束日期",
      "valueKind": "text",
      "aliases": [
        "可实习结束日期"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "businessTravel",
      "label": "是否接受出差",
      "valueKind": "text",
      "aliases": [
        "是否接受出差",
        "能否接受出差"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "shiftWork",
      "label": "是否接受倒班",
      "valueKind": "text",
      "aliases": [
        "是否接受倒班",
        "是否接受轮班"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "overtime",
      "label": "是否接受加班",
      "valueKind": "text",
      "aliases": [
        "是否接受加班"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "locationAdjustment",
      "label": "是否接受岗位调剂",
      "valueKind": "text",
      "aliases": [
        "是否接受岗位调剂"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "accommodation",
      "label": "是否需要住宿",
      "valueKind": "text",
      "aliases": [
        "是否需要住宿"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "recruitmentSource",
      "label": "招聘信息来源",
      "valueKind": "text",
      "aliases": [
        "招聘信息来源",
        "应聘渠道",
        "获知渠道"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "referralCode",
      "label": "内推码",
      "valueKind": "text",
      "aliases": [
        "内推码",
        "推荐码"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "referrerName",
      "label": "内推人姓名",
      "valueKind": "text",
      "aliases": [
        "内推人姓名",
        "推荐人姓名"
      ],
      "requiresConfirmation": true
    }
  ],
  "education": [
    {
      "field": "schoolCity",
      "label": "学校所在城市",
      "valueKind": "text",
      "aliases": [
        "学校所在城市",
        "院校所在城市"
      ]
    },
    {
      "field": "campus",
      "label": "校区",
      "valueKind": "text",
      "aliases": [
        "校区"
      ]
    },
    {
      "field": "degreeName",
      "label": "学位名称",
      "valueKind": "text",
      "aliases": [
        "学位名称",
        "所获学位"
      ]
    },
    {
      "field": "className",
      "label": "班级",
      "valueKind": "text",
      "aliases": [
        "班级"
      ]
    },
    {
      "field": "averageScore",
      "label": "平均成绩",
      "valueKind": "text",
      "aliases": [
        "平均成绩",
        "平均分"
      ]
    },
    {
      "field": "rankingPercent",
      "label": "专业排名百分比",
      "valueKind": "text",
      "aliases": [
        "专业排名百分比"
      ]
    },
    {
      "field": "classSize",
      "label": "专业总人数",
      "valueKind": "text",
      "aliases": [
        "专业总人数",
        "年级总人数"
      ]
    },
    {
      "field": "majorCourses",
      "label": "主修课程",
      "valueKind": "text",
      "aliases": [
        "主修课程",
        "核心课程"
      ]
    },
    {
      "field": "secondMajor",
      "label": "第二专业",
      "valueKind": "text",
      "aliases": [
        "第二专业",
        "辅修专业"
      ]
    },
    {
      "field": "studyAbroad",
      "label": "海外学习经历",
      "valueKind": "text",
      "aliases": [
        "海外学习经历"
      ]
    },
    {
      "field": "thesisTitle",
      "label": "毕业论文题目",
      "valueKind": "text",
      "aliases": [
        "毕业论文题目",
        "毕业设计题目"
      ]
    },
    {
      "field": "thesisDescription",
      "label": "毕业设计说明",
      "valueKind": "text",
      "aliases": [
        "毕业设计说明"
      ]
    }
  ],
  "workExperiences": [
    {
      "field": "employmentType",
      "label": "任职性质",
      "valueKind": "text",
      "aliases": [
        "任职性质"
      ]
    },
    {
      "field": "industry",
      "label": "所属行业",
      "valueKind": "text",
      "aliases": [
        "所属行业"
      ]
    },
    {
      "field": "achievements",
      "label": "工作成果",
      "valueKind": "text",
      "aliases": [
        "工作成果",
        "主要业绩"
      ]
    },
    {
      "field": "leavingReason",
      "label": "离职原因",
      "valueKind": "text",
      "aliases": [
        "离职原因"
      ],
      "requiresConfirmation": true
    }
  ],
  "internships": [
    {
      "field": "employmentType",
      "label": "实习性质",
      "valueKind": "text",
      "aliases": [
        "实习性质"
      ]
    },
    {
      "field": "achievements",
      "label": "实习成果",
      "valueKind": "text",
      "aliases": [
        "实习成果",
        "实习业绩"
      ]
    },
    {
      "field": "tools",
      "label": "实习使用工具",
      "valueKind": "text",
      "aliases": [
        "实习使用工具"
      ]
    },
    {
      "field": "supervisor",
      "label": "实习证明人",
      "valueKind": "text",
      "aliases": [
        "实习证明人"
      ],
      "requiresConfirmation": true
    }
  ],
  "projects": [
    {
      "field": "organization",
      "label": "项目所属单位",
      "valueKind": "text",
      "aliases": [
        "项目所属单位"
      ]
    },
    {
      "field": "technology",
      "label": "技术栈",
      "valueKind": "text",
      "aliases": [
        "技术栈",
        "使用技术"
      ]
    },
    {
      "field": "teamSize",
      "label": "团队规模",
      "valueKind": "text",
      "aliases": [
        "团队规模",
        "项目人数"
      ]
    },
    {
      "field": "contribution",
      "label": "个人贡献",
      "valueKind": "text",
      "aliases": [
        "个人贡献",
        "本人贡献"
      ]
    },
    {
      "field": "results",
      "label": "项目成果",
      "valueKind": "text",
      "aliases": [
        "项目成果",
        "项目产出"
      ]
    }
  ],
  "awards": [
    {
      "field": "level",
      "label": "获奖级别",
      "valueKind": "text",
      "aliases": [
        "获奖级别",
        "奖项级别"
      ]
    },
    {
      "field": "rank",
      "label": "获奖等级",
      "valueKind": "text",
      "aliases": [
        "获奖等级",
        "获奖名次"
      ]
    }
  ],
  "publications": [
    {
      "field": "publicationType",
      "label": "成果类型",
      "valueKind": "text",
      "aliases": [
        "成果类型"
      ]
    },
    {
      "field": "journal",
      "label": "刊物会议名称",
      "valueKind": "text",
      "aliases": [
        "刊物会议名称"
      ]
    },
    {
      "field": "authorOrder",
      "label": "作者排序",
      "valueKind": "text",
      "aliases": [
        "作者排序"
      ]
    },
    {
      "field": "doi",
      "label": "DOI",
      "valueKind": "text",
      "aliases": [
        "DOI"
      ]
    }
  ],
  "certificates": [
    {
      "field": "issuer",
      "label": "证书颁发机构",
      "valueKind": "text",
      "aliases": [
        "证书颁发机构",
        "发证机构"
      ]
    },
    {
      "field": "certificateNumber",
      "label": "证书编号",
      "valueKind": "text",
      "aliases": [
        "证书编号"
      ],
      "requiresConfirmation": true
    },
    {
      "field": "validUntil",
      "label": "证书有效期",
      "valueKind": "text",
      "aliases": [
        "证书有效期"
      ]
    }
  ]
};
