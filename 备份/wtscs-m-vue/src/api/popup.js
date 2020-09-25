
import Vue from 'vue'
import layer from 'static/js/layer/layer' //弹出层
import 'static/js/layer/need/layer.css' //弹出层样式
let popup=(function (){
    return {
        msg: function(text){
            //中间轻提示框
            layer.open({
                content: text
                ,skin: 'msg'
                ,styles: 'bottom:0;'
                ,time: 2 //2秒后自动关闭
              });
        },
        alert:function(text,btn,yes){
            //ios风格确认按钮弹窗
            layer.open({
                content: text
                ,skin:'lzAlert'
                ,btn: btn || '我知道了',
                yes: function (index) {
                    layer.close(index);
                    if(typeof yes == 'function')yes(index);
                },
              });
        },
        footer:function(text,type){
            //底部提示框
            layer.open({ 
                content: text
                ,skin: 'footer',
                shadeClose: type ? false : true
              });
        },
        loading:function(text){
            //加载中
            var loading=layer.open({
                type: 2
                ,content: text
                ,shadeClose:false
              });
            return loading
        },
        custom:function(html,className,callback){
            // 自定义
            layer.open({
                type: 1,
                content: html,
                className: className || '',
                shadeClose: true,
                end: function () {
                    callback()
                }
            })
        },
        /**
         * 询问框弹窗
         * text-文字
         * btns-按钮文本
         * yes-成功回调
         * no-失败回调
         */
        inquiry:function(text,btns,yes,no){
            var inquiry=layer.open({
                content: text
                ,btn: btns
                ,skin:"inquiry"
                ,yes: function(index){
                    layer.close(inquiry);
                    if(yes)yes(index);
                },
                no:function(){
                    if(no){
                        no();
                    }
                    
                }
              });
        },
        close(index){
            layer.close(index)
        },
        closeAll(){
            layer.closeAll()
        }   
    }
})()


export default popup