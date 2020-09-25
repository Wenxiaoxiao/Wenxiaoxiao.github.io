<template>
  <div class="upload_com">
    <form enctype="multipart/form-data" name="fileinfo" id="myForm">
      <input
        type="file"
        accept="image/*"
        @change="changeImage($event,upload_type)"
        ref="avatarInput"
        style="display:none"
      />
    </form>
    <div class="wrapper">
      <div class="pic_list">
        <div v-show="imgDatas.length" v-for="(src,index) in imgDatas" :key="index" class="imgwrapper">
          <div >
            <img :src="src" alt srcset />
            <div class="modal">已传图片</div>
          </div>
          <div class="delete" @click="deleteImg(index,upload_type)">
            <img src="/static/images/reimbursement/delete.png" />
          </div>
        </div>
        <div class="upload" @click="upLoad">
            <div>+</div>
            <div>请拍照上传医院门诊发票</div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import Vue from "vue";
import { Indicator } from 'mint-ui';
var axios = require('axios');
export default {
    props: {
        upload_type:String,
        originImg:Array
    },
    data(){
        return{
            imgDatas:this.originImg||[],
            imgPaths:[],
            formData:{
                auth_user_file: null,
            },
            isIos:false,
        }
    },
    methods:{
        verfySizeType(event){
          console.log('event',event);
          let fileTypes = [".gif", ".flv",".swf",".rm",".rmvb",".mp4",".3gp",".avi",".mov",".qt"],type = event.name,size = event.size,fileSize = 0,fileMaxSize=10240,THAT = this;
          //当括号里面的值为0、空字符、false 、null 、undefined的时候就相当于false
          if(type){//判断类型
              var isNext = true;
              var fileEnd = type.substring(type.indexOf(".")).toLowerCase();
              for (var i = 0; i < fileTypes.length; i++) {
                  if (fileTypes[i] == fileEnd) {
                      isNext = false;
                      break;
                  }
              }
              if (!isNext){
                  THAT.$popup.msg("不接受此文件类型!");
                  THAT.$refs.avatarInput.value = "";
                  return false;
              }
          }else {
              return false;
          }
          //判断大小
          if(size){
              if (size/1024 > fileMaxSize) {
                  THAT.$popup.msg("文件大小不能大于10M!");
                  THAT.$refs.avatarInput.value = "";
                  return false;
              }else if (size <= 0) {
                  THAT.$popup.msg("文件大小不能为0M!");
                  THAT.$refs.avatarInput.value = "";
                  return false;
              }
          }else{
              return false;
          }
          THAT.formData.auth_user_file = event;
          THAT.submit();
        },
        changeImage(event){
          //限制格式为jpg,png;
          //限制大小为 10M
          console.log(event);
          let THAT = this;
          if(event.target.files.length>1){
            THAT.$popup.msg("一次只能上传一张图片，请勿多选!");
          }
          else{
            THAT.verfySizeType(event.target.files[0]);
          }
        },
        submit(){
          //console.log("开始上传啦！");
            event.preventDefault();//取消默认行为
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                }
            };
            let formData = new FormData();
            let THAT = this;
            formData.append('auth_user_file', THAT.formData.auth_user_file);
            var link = window.location.origin === 'https://bx.wts999.com'?'https://bx.wts999.com':'https://bx.wts9999.net';
            var url = link+"/resmgr/upload";
             var load = THAT.$popup.loading("上传图片中...");
            axios.post(url,formData,config).then(function(res) {
                THAT.$popup.close(load)
                if(res.data.data.length>0){
                  THAT.imgDatas.push(res.data.data[0].wwwurl);
                  //THAT.imgPaths.push({[THAT.upload_type]:res.data.data[0].path,Idname:THAT.Idname,IdNum:THAT.IdNum});
                  THAT.imgPaths.push(res.data.data[0].path);
                  THAT.$emit('return-img',THAT.imgDatas,THAT.upload_type,THAT.imgPaths,'add');
                }
                
            });
            //将input清空
            THAT.$refs.avatarInput.value = "";
        },
        upLoad() {
        // 触发上传图片按钮
            this.$refs.avatarInput.dispatchEvent(new MouseEvent("click"));
        },
        //删除图片
        deleteImg(index,upload_type){
            this.imgDatas.splice(index,1);
            this.imgPaths.splice(index,1);
            this.$emit('return-img',this.imgDatas,upload_type,this.imgPaths,'delete');
        }
    },
    created(){
   
    },
    computed:{
        
    },
    components:{
        
    },
    mounted(){
      console.log('originImg',this.originImg);
      var ua = navigator.userAgent.toLowerCase();
      var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
      console.log("isIos",isIos)
      if (isIos) {
        this.isIos = true;
      };
    },
    watch:{

    }
};
</script>

<style lang="scss">
.upload_com {
  width:r(690);
  margin:0 auto;
  .wrapper {
    width:r(690);
    background: #fff;
    .space {
      & > div > div {
        height: r(10);
        background: #f2f2f2;
      }
    }
    .pic_list {
      display: inline-block;
      vertical-align: middle;
      width:r(690);
      & > .imgwrapper {
        width:r(690);
        height:r(422);
        display: inline-block;
        position: relative;
        vertical-align: top;
        margin-bottom:r(20);
        & > .delete {
          position: absolute;
          right: r(0);
          top: r(0);
          width: r(64);
          height: r(64);
          & > img {
            width: r(64);
            height: r(64);
          }
        }
        & > div {
          width:r(690);
          height:r(422);
          overflow: hidden;
          position: relative;
          & > img {
            width:r(690);
          }
          & > .modal {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            position: absolute;
            left: 0;
            top: 0;
            color: #fff;
            text-align: center;
            line-height:r(422);
            font-size: r(25);
          }
        }
      }
      &>.upload {
       width:r(690);
       height:r(422);
       background:#f5f5f5;
       font-size:r(30);
       color:#666;
       text-align:center;
       padding-top:r(160);
       &>div{
           line-height:r(40);
       }
    }
    }
  }
}
</style>