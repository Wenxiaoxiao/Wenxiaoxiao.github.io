/**
 * Created by Administrator on 2017/8/16.
 */
var data_writes = {
    beneficiaryInfo: {
        elementCode: "beneficiaryType",
        elementDescribe: "",
        elementName: "受益人",
        elementType: "5",
        elementValue: "法定受益人"
    },
    fromItem: [
        {
            elementCode: "insurancePeriod",
            elementDescribe: "",
            elementName: "保障期限",
            elementType: "5",
            elementValue: "1年"
        },
        {
            elementCode: "startDate",
            elementDescribe: "",
            elementName: "起保日期",
            elementType: "5",
            elementValue: "2017-08-07"
        }
    ],
    fromvalue: {
        allowedholderAge: "18-99",
        allowedinsurederAge: "30d-37",
        allowedinsurederSex: "1-2",
        amount: "119000",
        beneficiaryType: "1",
        endDate: "2018-08-06",
        holderBirthday: "",
        holderCardType: "03",
        holderName: "电饭锅",
        holderSex: "",
        insurancePeriod: "1y",
        insuredRelationship: "3",
        insurederBirthday: "",
        insurederCardType: "01",
        insurederSex: "",
        policyId: "0",
        premium: "99",
        prod_id: "101001",
        startDate: "2017-08-07"
    },
    insurederInfo: [
        {
            elementCode: "insuredRelationship",
            elementDescribe: "",
            elementName: "与投保人关系",
            elementType: "5",
            elementValue: "儿女"
        },
        {
            elementCode: "insurederName",
            elementDescribe: "",
            elementName: "被保人姓名",
            elementType: "3",
            elementValue: ""
        },
        {
            elementCode: "insurederCardType",
            elementDescribe: "",
            elementName: "证件类型",
            elementType: "2",
            elementValue: [
                {
                    isDefault: "true",
                    name: "居民身份证",
                    value: "01"
                },
                {
                    isDefault: "false",
                    name: "护照",
                    value: "02"
                },
                {
                    isDefault: "false",
                    name: "军人证",
                    value: "03"
                },
                {
                    isDefault: "false",
                    name: "港澳台同胞证",
                    value: "05"
                }
            ]
        },
        {
            elementCode: "insurederIdCard",
            elementDescribe: "",
            elementName: "证件号",
            elementType: "3",
            elementValue: ""
        },
        {
            elementCode: "insurederBirthday",
            elementDescribe: "",
            elementName: "被保人生日",
            elementType: "4",
            elementValue: "1999-06-27"
        },
        {
            elementCode: "insurederSex",
            elementDescribe: "",
            elementName: "被保人性别",
            elementType: "1",
            elementValue: [
                {
                    isDefault: "true",
                    name: "男",
                    value: "1"
                },
                {
                    isDefault: "false",
                    name: "女",
                    value: "2"
                }
            ]
        }
    ],
    policyholderInfo: [
        {
            elementCode: "holderName",
            elementDescribe: "请输入投保人姓名",
            elementName: "投保人姓名",
            elementType: "3",
            elementValue: ""
        },
        {
            elementCode: "holderBirthday",
            elementDescribe: "",
            elementName: "投保人生日",
            elementType: "4",
            elementValue: "1999-06-27"
        }
    ],
    premium: {
        elementCode: "premium",
        elementDescribe: "",
        elementName: "保费",
        elementType: "5",
        elementValue: "99"
    },
    hide_items: [
        {
            item_show: "insurederCardType",
            items_hide: ["insurederBirthday", "insurederSex"
            ]
        }

    ]


}

var trees=[
    {
        name:"农业",
        code:"101001",
        child:[
            {
                name:"农副业",
                code:"101012",
                child:[
                    {
                        name:"农场经营者",
                        code:"1212"
                    },
                    {
                        name:"农业试验人员",
                        code:"1213"
                    }
                ]
            },
            {
                name:"农技类",
                code:"101012",
                child:{
                    name:"农业技师",
                    code:"1212"
                }
            }
        ]
    },
    {
        name:"木材森林业",
        code:"101001",
        child:[
            {
                name:"森林砍伐业",
                code:"101012",
                child:{
                    name:"山地造林工人",
                    code:"1212"
                }
            }
        ]
    },
]

//图片上传模板
var upload=[
    {
        elementDescribe: "提示：图片上传仅支持JPG格式，且单张图片不能超过2M,图片上传过程中，切勿关闭页面，谢谢！",
        elementType: "11",
        elementName:"投保人资料上传",
        data:[
            {
                elementCode: "bankCardImg",
                elementDescribe: "请上传交费卡照片",
                elementName: "交费卡照片",
                elementValue: ""
            },
            {
                elementCode: "bankCardImg",
                elementDescribe: "请上传交费卡照片",
                elementName: "交费卡照片",
                elementValue: ""
            },
        ]
    }
]

