//全部人员信息
var allPersons=[
    {
        name:'自己',
        id:0,
        type:1,
        choose:false,
    },
    {
        name:'配偶',
        id:1,
        type:4,
        choose:false,
    },
    {
        name:'儿子',
        id:2,
        type:13,
        choose:false,
    },
    {
        name:'女儿',
        id:3,
        type:14,
        choose:false,
    },
    {
        name:'父亲',
        id:4,
        type:11,
        choose:false,
    },
    {
        name:'母亲',
        id:5,
        type:12,
        choose:false,
    },
    {
        name:'岳父',
        id:6,
        type:11,
        choose:false,
    },
    {
        name:'岳母',
        id:7,
        type:12,
        choose:false,
    },
    {
        name:'儿子2',
        id:8,
        type:13,
        choose:false,
    },
    {
        name:'儿子3',
        id:9,
        type:13,
        choose:false,
    },
    {
        name:'女儿2',
        id:10,
        type:14,
        choose:false,
    },
    {
        name:'女儿3',
        id:11,
        type:14,
        choose:false,
    },
    {
        name:'兄弟',
        id:12,
        type:17,
        choose:false,
    },
    {
        name:'姐妹',
        id:13,
        type:18,
        choose:false,
    },
    {
        name:'其他',
        id:14,
        type:8,
        choose:false,
    },
];

//单个人员需选择要素
var selectDom=[
    {
        name:'姓名',
        code:'name',
        value:'',
        force:true,
        type:1,
        desc:'',
        placeholder:'',
        data:null,
        show:false,
        need:false,
    },
    {
        name:'性别',
        code:'sex',
        value:'',
        force:true,
        type:2,
        desc:'',
        placeholder:'',
        data:[
            {
                name:'男',
                code:'1',
                select:false,
            },
            {
                name:'女',
                code:'1',
                select:false,
            },
        ],
        show:false,
        need:true,
    },
    {
        name:'出生日期',
        code:'birthday',
        value:'',
        force:true,
        type:3,
        desc:'',
        placeholder:'',
        data:null,
        show:false,
        need:true,
    },
    {
        name:'居住地',
        code:'city',
        value:'',
        force:true,
        type:4,
        desc:'',
        placeholder:'请选择',
        subtring:8,
        data:null,
        show:false,
        need:false,
    },
    {
        name:'社保类型',
        code:'socialSecurity',
        value:'',
        force:true,
        type:2,
        desc:'',
        placeholder:'',
        data:[
            {
                name:'职工社保',
                code:'1',
                select:false,
            },
            {
                name:'城市居民社保',
                code:'2',
                select:false,
            },
            {
                name:'新农合',
                code:'3',
                select:false,
            },
            {
                name:'无社保',
                code:'4',
                select:false,
            },
        ],
        show:false,
        need:true,
    },
    {
        name:'补充信息',
        code:'supplement',
        value:'',
        force:false,
        type:5,
        desc:'',
        placeholder:'若您存在特殊健康状态或已投保险情况，请说明',
        data:null,
        show:false,
        need:true,
    },
];

// 家庭经济状况
var familyEconomy=[
    {
        name:'家庭年收入',
        code:'familyIncome',
        value:'',
        force:true,
        type:9,
        desc:'',
        data:null,
        show:false,
        tips:'万元',
        need:true,
    },
    {
        name:'家庭保费总预算',
        code:'budget',
        value:'',
        force:false,
        type:7,
        desc:'科学的家庭保费预算应该为家庭收入的5%~15%哦~',
        data:null,
        show:false,
        tips:'万元',
        need:true,
    }
];
// 家庭责任
var responsibility=[
    {
        name:'是否需要为老人提供经济支持',
        code:'supportOld',
        value:'否',
        force:false,
        type:8,
        desc:'',
        data:null,
        show:false,
        need:true,
    },
    {
        name:'是否需要抚养孩子',
        code:'supportYoung',
        value:'否',
        force:false,
        type:8,
        desc:'',
        data:null,
        show:false,
        need:true,
    },
    {
        name:'家庭负债',
        code:'liabilities',
        value:'',
        force:true,
        type:1,
        desc:'（包含房贷车贷）',
        data:null,
        show:false,
        tips:'万元',
        need:true,
    },
];

// 匹配适合的保险规划师
var getRightPlanner=[
    {
        name:'您期望在多长时间被完成家庭保险配置？',
        code:'cycle',
        value:'',
        force:true,
        isSingle:true,
        type:10,
        desc:'',
        data:[
            {
                name:'1-2天',
                code:'1',
                select:false,
            },
            {
                name:'1周',
                code:'2',
                select:false,
            },
            {
                name:'2-3周',
                code:'3',
                select:false,
            },
        ],
        show:false,
        tips:'',
        need:true,
    },
    {
        name:'您在选择保险配置时，优先考虑以下哪个因素？',
        code:'selectionElements',
        value:'',
        force:true,
        type:10,
        desc:'',
        data:[
            {
                name:'公司品牌大',
                code:'1',
                select:false,
            },
            {
                name:'保障充足',
                code:'2',
                select:false,
            },
            {
                name:'价格便宜',
                code:'3',
                select:false,
            },
        ],
        show:false,
        tips:'',
        need:true,
    },
    {
        name:'您期望适配的保险顾问老师，服务风格更偏向哪个？',
        code:'teacherStyle',
        value:'',
        force:true,
        type:10,
        desc:'',
        data:[
            {
                name:'经验丰富',
                code:'1',
                select:false,
            },
            {
                name:'严谨细致',
                code:'2',
                select:false,
            },
            {
                name:'耐心解说',
                code:'3',
                select:false,
            },
        ],
        show:false,
        tips:'',
        need:true,
    },
    {
        name:'本次保险服务，您主要希望解决的问题是？',
        code:'question',
        value:'',
        force:true,
        type:10,
        desc:'',
        data:[
            {
                name:'新保险方案的配置与购买',
                code:'1',
                select:false,
            },
            {
                name:'已购买保险的分析',
                code:'2',
                select:false,
            },
            {
                name:'退保与加保咨询',
                code:'3',
                select:false,
            },
            {
                name:'其他',
                code:'4',
                select:false,
            },
        ],
        show:false,
        tips:'',
        need:true,
    },
    {
        name:'自己或配偶是否目前或曾经有过以下健康问题：恶性肿瘤（包括原位癌）、肺部结节、慢性肾病、抑郁症，或患有其他疾病需要长期服药治疗？',
        code:'healthProblem',
        value:'',
        force:true,
        type:10,
        isSingle:true,
        desc:'',
        data:[
            {
                name:'是',
                code:'1',
                select:false,
            },
            {
                name:'否',
                code:'2',
                select:false,
            },
        ],
        show:false,
        tips:'',
        need:true,
    },
    
];