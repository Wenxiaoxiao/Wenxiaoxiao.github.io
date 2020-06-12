//倒计时
function countDown(endTime,callback){
    //像这种需要将结果回传的然后又无法直接return的情况，可以考虑回调函数；
    var seconds;
    var timer = setInterval(function(){
        var time = new Date();
        var nowTime = time.getTime();
        if(endTime<nowTime || endTime===nowTime){
            // $(".countdown").html(0);
            seconds=0;
            callback(0);
            clearInterval(timer);
            //清缓存并跳转到指定页面
            // sessionStorage.removeItem("SESSION_END_TIME");
        }
        else{
            var decount = endTime-nowTime;
            seconds = Math.ceil(decount/1000);
            callback(seconds);
        }
    },100);
};
//对数组里面的对象去重处理==================================
function deDuplication(arr,code){
    let hash={};
    let tmparr = arr.reduce((preVal, curVal) => {
        hash[curVal[code]] ? '' : hash[curVal[code]] = true && preVal.push(curVal); 
        return preVal
    }, []);
    console.log('1111',tmparr, hash);
    return tmparr;
}
let data = [
    { id: 201801, name: '张三', age: 15, },
    { id: 201804, name: 'John', age: 18, },
    { id: 201802, name: '李四', age: 18, },
    { id: 201801, name: '张三', age: 15, },
    { id: 201805, name: 'Jack', age: 18, },
    { id: 201803, name: '王五', age: 10, },
    { id: 201805, name: 'Jack', age: 18, },
    { id: 201804, name: 'John', age: 18, },
    { id: 201805, name: 'Jack', age: 18, },
];
deDuplication(data,'id');
//语法
// array.reduce(callbackfunction, initialVal);
// function callbackfunction(preVal, curVal, index, array){
// 	//函数体
// }
//等同于for循环
function removeRepeat(arr, key){
	for(let i = 0; i < arr.length; i++) {
		for(let j = i+1; j < arr.length; j++) {
			if(arr[i][key] === arr[j][key]){
				arr.splice(j, 1);
				j = j-1;  // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
			}
		}
    }
    console.log("arr",arr);
}
removeRepeat(data, 'id');
//filter方法去重
var arr2 = data.filter((x, index,self)=>{
var arrids = []
data.forEach((item,i) => {
    arrids.push(item.id)
})
return arrids.indexOf(x.id) === index
})  
console.log(arr2);
//====================================================
//获取地址栏参数
 function getQueryString(name,type) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var search=window.location.search;
    if(type){//中文
        search=decodeURI(search);
    }
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
