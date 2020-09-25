<template>
<div class="uploader clearfix">
    <input class="file" id="fileUp" type="file" accept="image/*" multiple="false" @change="add"/>
    <div id="fileList" class="uploader-list">
        <div class="file-item" v-for="(item,index) in fileUrls">
        <img v-if="item.loaded" :src="item.compress">
        <img v-else src="static/images/reload.gif" class="reload">
        <i v-if="item.loaded" class="iconfont icon-chuyidong delet" @click="delite(index)"></i>
        </div>
    </div>
    <label class="filePicker" for="fileUp"><i class="iconfont icon-xiangji"></i></label>
</div>
</template>

<script>
import pictures from "@/api/pictures.js";
var vm;
export default {
  props: {
      maxNumber:{
        type: String,
        default: "10"
      },
      files:{
        type:Array,
      },
  },
  data() {
    return {
      fileUrls:[],//图片上传
    };
  },
  computed: {},
  created() {
    vm=this;
  },
  methods: {
      /**
       * 新增图片
       */
      add(e){
        console.log(e);
        if(this.maxNumber<=this.files.length){
            this.$popup.msg('最多上传'+this.maxNumber+'张图片，您已超过限制！')
            return;
        }
        let file = e.target.files[0];           
        let param = new FormData(); //创建form对象
        param.append('file',file,file.name);//通过append向form对象添加数据
        vm.update(param)
    },
    /**
     * 上传图片
     */
    update(param){
        this.$http.getHttp({ 
        name: "o_upload",
        params: param, 
        headers:{'Content-Type':'multipart/form-data'}
        },(data,err) => {
          console.log(data);
          if(!err)return;
          vm.$set(vm.fileUrls[vm.fileUrls.length-1], 'url', data.data[0].wwwurl)
          vm.$set(vm.fileUrls[vm.fileUrls.length-1], 'loaded', true);
          vm.backFather();
        });
    },
    // 删除图片
    delite(index){
      vm.files.splice(index,1);
      this.backFather()
    },
  },
  watch:{
      files(newVal){
          if(newVal.length==0){
            this.fileUrls=[];
          }
      }
  }
};
</script>

<style lang="scss" scoped>
 .uploader {
    width: 100%;
    height: auto;
    text-align: left;
    position: relative;
    box-sizing: border-box;
    padding-left: r(30);
    .file{
      width: 1px;
      height: 1px;
      visibility: hidden;
    }
    #fileList {
      width: auto;
      height: auto;
      .file-item {
        width: r(225);
        height: r(225);
        float: left;
        position: relative;
        margin-right: r(5);
        margin-bottom: r(5);
        .delet {
          width: r(34);
          height: r(34);
          display: inline-block;
          background: rgba(0, 0, 0, 0.5);
          font-size: r(32);
          color: #fff;
          border-bottom-left-radius: r(10);
          text-align: center;
          position: absolute;
          line-height: r(34);
          right: 0;
          top: 0;
        }
        img {
          width: r(225);
          height: r(225);
        }
        .reload{
            width: r(100);
            height: r(100);
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: r(-50);
            margin-top: r(-50);
        }
      }
    }
    .filePicker {
      width: r(225);
      height: r(225);
      float: left;
      border: 2px dashed #cbcbcb;
      position: relative;
      color: #cbcbcb;
      line-height: r(225);
      text-align: center;
      i {
        font-size: r(90);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #cbcbcb;
      }
    }
  }
</style>