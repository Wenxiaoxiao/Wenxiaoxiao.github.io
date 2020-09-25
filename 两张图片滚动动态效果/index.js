// let jumbotron = document.getElementsByClassName('jumbotron')[0];
let changeTarget = document.getElementsByClassName('changeTarget')[0];
let jumbotron_red = document.getElementsByClassName('jumbotron-red')[0];
//https://segmentfault.com/a/1190000014293962
//https://element.eleme.cn/#/zh-CN
window.onscroll = function(){
    //元素距离顶部的距离
    //let divOffsetTop = jumbotron.offsetTop;
    let divOffsetTop = changeTarget.offsetTop;
    //let divH = jumbotron.offsetHeight;
    //console.log("divOffsetTop",divOffsetTop);
    // 获取滚动条距离顶部的距离
    let osTop = document.documentElement.scrollTop || document.body.srcollTop;
    //获取上层图片的高度
    let dis = osTop-divOffsetTop;
    // console.log("dis====",dis);
    // setTimeout(function(){
    //     jumbotron_red.style.height=dis+'px';
    // },1000)
    jumbotron_red.style.height=dis+'px';
}