# 私人定制小程序 项目文档

## 项目介绍

> 保险私人定制
> 包括定制列表，下单，订单列表

## 技术选择

- 跨平台框架 chameleon --[官方文档](https://cmljs.org/#/)
- 微信小程序文档 --[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- 支付宝小程序文档 --[官方文档](https://docs.alipay.com/mini/developer/getting-started)

## 运行环境
- node >= 8.10.0 
- npm >= 5.6.0

## 项目结构

```
├─dist # 静态资源生成目录
├─doc # 项目文档目录
├─mock # 模拟请求文件目录
├─node_modules # 利用npm管理的所有包及其依赖
├─src # 当前项目的源码
    ├─api # 公用js
    ├─app # app入口
    ├─assets # 静态资源路径 一般存放图片
    ├─components # 组件
    ├─json # 静态数据
    ├─less # 公用样式
    ├─pages # 页面文件及样式文件
    ├─store # 公用数据
    └─router.config.json # 页面路由配置
├─chameleon.config.js # 项目平台相关配置
├─npm-shrinkwrap.json # 项目依赖说明
└─package.json # 项目依赖说明
```

## 命令

> cnpm/npm i -g chameleon-tool 全局安装构建工具  
> cnpm/npm i 下载依赖文件  
> cml dev 启动所有端开发模式 
> cml build 启动所有端生产模式打包
> cml wx dev 执行微信端开发模式构建 也会构建web端，使api mock生效
> cml wx build 执行微信端打包模式构建
> cml alipay dev 执行支付宝端开发模式构建 也会构建web端，使api mock生效
> cml alipay build 执行支付宝端打包模式构建

## 开发调试方式

> https://cmljs.org/doc/quick_start/quick_start.html 详见此链接

## 常用公共代码

```
├─src
    ├─api 
        ├─ alipayTools.js # 支付宝小程序工具方法 
        ├─ common.js # app配置 
        ├─ notice.js # 提示工具方法 
        ├─ tools.js # 工具方法 
        └─ wxTools.js # 支付宝小程序工具方法 
```

## 账号信息

### 微信账号

#### 测试环境：

- appid:wxcf6de2f6fc4c5fd7
- AppSecret:bad10308f674b89246e2dce0b80a2ced

#### 正式环境：

- appid：wx10d94d10a4b81869
- AppSecret:83b8c2313e45358b26d75ff4d28c11d7

---

### 支付宝

#### 测试环境：

- AppId：

#### 正式环境：

- AppId：

---

## 开发注意事项
- 不要在业务逻辑里使用底层平台方法（如window、wx等），如需使用应在components/tools进行多平台封装再进行调用