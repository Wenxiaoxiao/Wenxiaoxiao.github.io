import _ from "lodash"; //lodash.js

const process=[
    {
        name:"开始投保",
        code:'STP',
        route:'/'
    },
    {
        name:"获取测算项",
        code:'GCI',
        route:'product-premium-key',
        url:"/product/premium",
        params:['key']
    },
    {
        name:"计算保额",
        code:'GCC',
        route:'/premium'
    },
    {
        name:"测算保费",
        code:'GCR',
        route:'product-premium-key',
        url:"/product/premium",
        params:['key']
    },
    {
        name:"健康告知",
        code:'GHN',
        route:'product-healthy-key',
        url:"/product/healthy",
        params:['key']
    },
    {
        name:"获取订单项",
        code:'GOI',
        route:'product-writeInform-key',
        url:"/product/writeInform",
        params:['key']
    },
    {
        name:"下订单",
        code:'BOP',
        route:'product-cardPay-key',
        url:"/product/cardPay",
        params:['key']
    },
    {
        name:"快捷支付",
        code:'FOP',
        route:'product-pay-key',
        url:"/product/pay",
        params:['key']
    },
]
const getProcess=(code,data)=>{
    let result=_.find(process,(o)=>{
        return o.code===code
    })
    return result
}
const getStep=(name,data)=>{
    let result=_.find(process,(o)=>{
        return o.route===name
    })
    return result
}
export default {
    getProcess,
    getStep
}