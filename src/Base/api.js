
let Api = {
    ReleaseModel: /www.the-archi.com/.test(window.location.host) ? true : false,//发布模式
    // InnerNetwork: false,
    Host: '',
    Host_Formal: {
        InnerToken: 'http://www.the-archi.com',
        Inner: 'http://www.the-archi.com',
        Outer: 'http://www.the-archi.com',
    },
    //测试_内网
    Host_Test: {
        InnerToken: 'http://10.2.138.32',//http://www.the-archi.com
        Inner: 'http://10.2.138.32',
        Outer: 'http://10.2.138.32',//http://10.2.138.32
    },
    ProjectList: '/home/index.php/Project/listallbypage/limit/9999/page/',
    ProjectDetail:'/home/index.php/Project/slide2/id/',
    AboutUs:'/home/index.php/Aboutus/menu',
    AboutUsnd:'/home/index.php/Aboutus/show/id/',
    AboutUslist:'/home/index.php/Team/_list',
    Contact:'/home/index.php/Contact/show/id/4',
    EventNews:'/home/index.php/News/yearlist/limit/9999/page/',
    EventDetail:'/home/index.php/News/show/id/',
    Lang_en:'/home/index.php/Public/_switch?lang=en',
    Lang_cn:'/home/index.php/Public/_switch?lang=cn',
    TopMenu:'/home/index.php/Public/topmenu',
}


let _GetApi = function (apiname) {
    return Api.ReleaseModel ? Api.Host_Formal.Inner + Api[apiname] : Api.Host_Test.Inner + Api[apiname];
}

export function GetApi(apiname) {
    return _GetApi(apiname);
};

export function GetToken() {
    return Api.ReleaseModel ? Api.Host_Formal.InnerToken + Api.Token : Api.Host_Test.InnerToken + Api.Token;
};

export default Api