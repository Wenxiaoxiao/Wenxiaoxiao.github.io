
const Common = {
    getday:function getday(type) {
        var date_ = new Date();
        var year = date_.getFullYear();
        var month = date_.getMonth() + 1;
        var hours = date_.getHours();
        var minutes = date_.getMinutes();
        var seconds = date_.getSeconds();
        if(hours<10){
            hours = '0'+hours
        }
        if(minutes<10){
            minutes = '0'+minutes
        }
        if(seconds<10){
            seconds = '0'+seconds
        }
    
        if (type === 1) {
            return year + '-' + month + '-01' //本月第一天
        }
        else if (type === 2) {
            var day = new Date(year, month, 0);
            return year + '-' + month + '-' + day.getDate(); //下个月
        }
        else if (type === 0) {
            return year + '-' + month + '-' + date_.getDate(); //当日
        }
        else if (type === 3) {
            var curDate = new Date();
            var nextDate = new Date(curDate.getTime() + 24*60*60*1000); //后一天
            return nextDate;
        }
        else if(type === 4){
            return year + '-' + month + '-' + date_.getDate()+'T'+hours+':'+minutes+':'+seconds;
        }
   },
    dateformat:function (date) { 
        var date_  = new Date(date);
        var result = date_.getFullYear()+'年'+(date_.getMonth()+1)+'月'+date_.getDate()+'日  '+date_.getHours()+':'+date_.getMinutes()+':'+date_.getSeconds();
        return result;
   },
    GetRequest:function(_GetRequest,PARAM,GetUrl){
        let headers = new Headers()
        headers.append('Content-Type', 'application/json;charset=UTF-8')
        //headers.append('lang','cn')
        fetch(GetUrl+PARAM,{
        method:'GET',
        headers:headers,
        mode:'cors',
        cache:'default'
        })
        .then(res =>res.json())
        .then((json) => {
            //console.log(json)
            _GetRequest(json)
        })
    },
   WebApiHost:{},
   ZDAWebApiHost:{},
   token:{},


}
 export default Common;