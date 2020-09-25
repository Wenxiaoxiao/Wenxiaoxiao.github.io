<template>
<div class="reseve-popup">
    <div class="contact-layer-box" v-show="isLayerHide">
        <div class="showMask"  @click.stop="hidePop"></div>
        <transition name="reseve-fade" >
            <div class="contact-layer" v-show="isLayerHide">
                <div class="title2">
                    - 服务预约 -
                </div>
                <div class="msg">
                    <div class="msg-box">
                        <span class="msg-key">您的姓名:</span>
                        <input placeholder="您的姓名" maxlength="20" v-model:value="customerName" @blur="hasFocus" class="msg-value msg-name">
                    </div>
                    <div class="msg-box">
                        <span class="msg-key">您的手机:</span>
                            <input placeholder="您的手机" type="number" v-model:value="mobilePhone" @blur="hasFocus" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                                class="msg-value msg-phone">
                    </div>
                </div>
                <div class="submit" @click="submitFn">
                    提交预约
                </div>
            </div>
        </transition>
    </div>
    <div class="tagBox" v-show="isTagshow">
        <div class="tag-backdrop" @click="isTagshow = false"></div>
        <transition name="tag">
            <div class="tagBlock" v-show="isTagshow" ref="tagBox">
                <img src="static/images/tan_bg.png">
            </div>
        </transition>  
    </div>
</div>
</template>
<script>

import _ from 'lodash'
export default {
  props: ['isLayerHide','agentId'],
  data() {
    return {
        //成功弹窗隐藏
        isTagshow:false,
        //时间内容隐藏
        isTimeBox:false,
        //用户名称
        customerName:'',
        //用户手机
        mobilePhone:'',
    };
  },
  created(){
  },
  computed: {},
  methods: {
      /** 预约方案提交*/
    submitFn(){
        var content = {};
        if(!this.mobilePhone || !this.customerName.trim()){
            return this.$popup.msg("有信息尚未输入")
        }
        if (!this.$regulars.isPhone(this.mobilePhone)) {
            return this.$popup.msg("手机号填写输入有误")
        }; 
        this.myToTop();
        content.agentId = this.agentId;
        //姓名
        content.name = this.customerName.trim();
        //手机 
        content.mobile = this.mobilePhone.trim();
        //请求接口
        this.$http.getHttp({name: "Exe_agentOrder", params:content},(data,isError) => {
            if(!isError)return this.$emit('popupHide',false);
            console.log(data);
            //弹窗隐藏
            this.$emit('popupHide',false)
           //预约成功弹窗显示
            this.$nextTick(()=>{
                // 初始化
                this.customerName ='';//用户名称
                this.mobilePhone ='';//用户手机
                this.isTagshow = true;
            })
        }, error => {});
    },
    hidePop() {
        this.$emit('popupHide',false);
        this.myToTop();
    },
    // 是否所有元素都失去焦点
    hasFocus() {
        if(!document.hasFocus()) {
            this.myToTop();
        }
    },
    // 提交表单后页面高度重置
    myToTop() {
        setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
    }
  },
  mounted(){
      console.log(this.agentId)
  },
  watch: {
    agentId:{
        deep:true,
        handler:(newVal)=>{
            console.log('newValue', newVal);
            this.agentId = newVal;
        }
    }
  }
};
</script>

<style lang="scss">
.contact-layer-box{
    .showMask{
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 998;
        background-color: rgba(0,0,0,.5);
    }
    .contact-layer {
        position: absolute;
        background-color: #fff;
        width: r(603);
        height: r(540);
        border-radius: 8px !important;
        top: 30%;
        left: 50%;
        margin-left: r(-301);
        z-index: 1000;
        .title,
        .title2 {
            height: r(140);
            line-height: r(140);
            text-align: center;
            font-size: r(49);
            font-weight: 900;
            border-top-left-radius: 8px !important;
            border-top-right-radius: 8px !important;
            color: #ff6000;
            background: url(~@/contact-bg.png) no-repeat center;
            span {
                font-weight: 100
            }
        }
        .msg {
            padding-top: r(10);
            font-size: r(32);
            .msg-box {
                margin-top: 0.3rem;
                .msg-key {
                    font-size: r(30);
                    width: r(180);
                    display: inline-block;
                    text-align: right;
                    padding-right: 0.1rem;
                    height: 0.6rem;
                    line-height: 0.6rem;
                }
                .msg-value {
                    display: inline-block;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    height: r(76);
                    line-height: r(76);
                    width: r(346);
                    padding-left: 0.2rem;
                }
            }
            .msg-box-time {
                position: relative;
                .key-time {
                    width: r(356);
                    text-align: center;
                    position: relative;
                    padding: 0rem;
                    .arrow {
                        position: absolute;
                        right: 0.1rem;
                        top: 50%;
                        width: r(25);
                        transform: translateY(-50%);
                        -webkit-transform: translateY(-50%);
                        -moz-transform: translateY(-50%);
                        -ms-transform: translateY(-50%);
                        -o-transform: translateY(-50%);
                    }
                }
                .select-box {
                    position: absolute;
                    width: r(356);
                    left: 2.5rem;
                    border: 1px solid #ccc;
                    background: #fff;
                    .select-value {
                        height: 0.6rem;
                        line-height: 0.6rem;
                        text-align: center;
                    }
                }
            }
        }
        .submit {
            margin: 0.5rem auto;
            width: r(526);
            height: r(80);
            background-color: #ff9c00;
            border-radius: 5px;
            color: #fff;
            font-size: 0.48rem;
            line-height: 2;
            text-align: center;
        }
    }
    .reseve-fade-enter-active {
        transition: all .2s;
        -webkit-transition: all .2s;
        -moz-transition: all .2s;
        -ms-transition: all .2s;
        -o-transition: all .2s;
    }
    .reseve-fade-enter, .reseve-fade-leave-to{
        transform: scale(0);
        -ms-transform:scale(0); 	/* IE 9 */
        -moz-transform:scale(0); 	/* Firefox */
        -webkit-transform:scale(0); /* Safari 和 Chrome */
        -o-transform:scale(0); 	/* Opera */
        opacity: .3;
    }
}

.tagBox{
    .tag-backdrop{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 999;
    }
    .tagBlock{
        width: r(680);
        position: fixed;
        left: 50%;
        top: 20%;
        margin-left: r(-340);
        z-index: 1001;
        img{
            width:100%;
            display:block;
        }
    }
    .tag-enter-active {
        transition: all .1s;
        -webkit-transition: all .1s;
        -moz-transition: all .1s;
        -ms-transition: all .1s;
        -o-transition: all .1s;
    }
    .tag-enter, .tag-leave-to
        /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
        transform: scale(0);
        -ms-transform:scale(0); 	/* IE 9 */
        -moz-transform:scale(0); 	/* Firefox */
        -webkit-transform:scale(0); /* Safari 和 Chrome */
        -o-transform:scale(0); 	/* Opera */
    }
}
</style>