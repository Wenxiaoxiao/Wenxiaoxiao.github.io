
module.exports = {
    "root": true,
    "env": {
        "browser": true,
    },
    "parserOptions": {
        "ecmaVersion": 5,
        "sourceType": 'script'
    },
    "extends": 'standard',
    "globals": {
        "window":true,
        "document":true,
        "$":true,
        "layer":true,
        "jQuery":true,
        "template":true,
        "jEmoji":true,
        "LzPicker":true,
        "QRCode":true,
        "WdatePicker":true,
        "laydate":true,
        "wx":true,
        "VConsole":true,
        "_":true,
        "WeixinJSBridge":true,
        "moment":true,
        "CityPicker":true
    },
    "rules": {
        "camelcase": 1,
        "no-alert": 1,
        "no-console": 0,
        "no-constant-condition": 2,
        "no-debugger": 2,
        "quotes": 0,
        // 允许使用分号
        "semi": [0, "never"],
        "space-in-brackets": 0,
        // 允许使用==
        'eqeqeq': 0,
        // 缩进使用不做限制
        'indent': 0,
        // 函数圆括号之前没有空格
        'space-before-function-paren': 0,
        // 不限制变量一起声明
        'one-var': 0,
        // 条件语句中复制操作符需要用圆括号括起来
        'no-cond-assign': [2, 'except-parens'],
        // 单行可忽略大括号，多行不可忽略
        'curly': [2, 'multi-line'],
        // 不允许出现多个空格
        'no-multi-spaces': [2, { ignoreEOLComments: true }],
        // 对象字面量的键值空格风格
        'key-spacing': 2,
        // 不允许重复声明变量
        'no-redeclare': [2, { builtinGlobals: true }],
        // 立即执行函数风格
        'wrap-iife': [2, 'inside'],
        // 不允许圆括号中出现空格
        'space-in-parens': [2, 'never'],
        // 确保运算符周围有空格
        'space-infix-ops': 2,
        // 强制点号与属性同一行
        'dot-location': [2, 'property'],
        // 强制单行代码使用空格
        'block-spacing': [2, 'always'],
        // 采用one true brace style大括号风格
        'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
        // 文件结尾空行
        'no-multiple-empty-lines': 0,
        // 统一逗号周围空格风格
        'comma-spacing': [2, { 'before': false, 'after': true }],
        // 要求在块级
        'lines-around-comment': 0,
        "spaced-comment":0,
        "no-trailing-spaces":[1,{"skipBlankLines":true}],
        "no-useless-escape":0,
        "padded-blocks":[2, "never"],
        "no-mixed-operators":0,
        "no-callback-literal":0,
        "no-new":0,
        "standard/no-callback-literal":0,
        "no-caller":0
    }
}