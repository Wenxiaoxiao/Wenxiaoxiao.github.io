<template>
  <div class="member-desc">
    <div v-show="ishowmember" class="member-mask" @click="showMember(false)"></div>
    <div v-show="ishowmember" class="member-content">
      <div class="member-info" v-if="policydate.insureders && policydate.insureders.length>0">
          <div v-for="insureder,index in policydate.insureders" v-if="insureder.insurederName && insureder.insuredRelationship" class="item-input clearfix">
            <span class="item-name">{{insureder.insurederName}}</span>
            <i class="iconfont icon-jiantou_xia"></i>
            <div class="selsectList">
               <div style="display:none;">{{JSON.stringify(showLog)}}</div>
              <div class="selsectListDesc" @click="showList(true,index)">{{insureder.insuredRelationship|relationship}}</div>
              <div v-show="insureder.isShow" class="selsectListInfo">
                <ul>
                  <li v-for="item in members" @click="changeINType(index,item.type)">{{item.value}}</li>
                </ul>
              </div>
            </div>
          </div>
      </div>
      <div class="member-btn">
        <span @click="save">保存</span>
      </div>
    </div>
  </div>
</template>

<script>
var that = null;
export default {
  props: ["ishowmember","policydate","relations"],
  data: () => ({
    showLog:null,
    members: [
      {
        type: "1",
        value: "本人"
      },
      {
        type: "9",
        value: "丈夫"
      },
      {
        type: "10",
        value: "妻子"
      },
      {
        type: "11",
        value: "父亲"
      },
      {
        type: "12",
        value: "母亲"
      },
      {
        type: "13",
        value: "儿子"
      },
      {
        type: "14",
        value: "女儿"
      },
      {
        type: "15",
        value: "孙子"
      },
      {
        type: "16",
        value: "孙女"
      },
      {
        type: "17",
        value: "外孙"
      },
      {
        type: "18",
        value: "外孙女"
      },
      {
        type: "2",
        value: "父母"
      },
      {
        type: "3",
        value: "儿女"
      },
      {
        type: "4",
        value: "配偶"
      },

      {
        type: "5",
        value: "兄弟姐妹"
      },
      {
        type: "6",
        value: "祖父母，外祖父母"
      },
      {
        type: "7",
        value: "祖孙，外祖孙"
      },
      {
        type: "8",
        value: "其它"
      }
    ],
    member: "1"
  }),
  mounted() {
    if(this.policydate.insureders && this.policydate.insureders.length>0){
      for(var i=0;i<this.policydate.insureders.length;i++){
        this.policydate.insureders[i].isShow = false;
      }
    }
  },

  created() {
    that = this; 
  },
  methods: {
    showMember(val,isRed,arr) {
      this.showList(false);
      this.$emit("showMember", val,that.policydate,arr,isRed);
    },

    showList(flag,index){
      that.showLog = flag;
      if(index || index == 0){
        var arr =  JSON.parse(JSON.stringify(this.policydate.insureders));
         for(var i=0;i<arr.length;i++){
        arr[i].isShow = false;
      }
        arr[index].isShow = flag;
      this.policydate.insureders = arr;
      }else{
        var arr =  JSON.parse(JSON.stringify(this.policydate.insureders));
         for(var i=0;i<arr.length;i++){
        arr[i].isShow = flag;
      }
      this.policydate.insureders = arr;
      }
    },

    changeINType(index,type){
      var arr =  JSON.parse(JSON.stringify(this.policydate.insureders));
        arr[index].insuredRelationship = type;
      this.policydate.insureders = arr;
      this.showList(false,index);
    },

    //提交绑定的点击事件
    save(){
      that.$http.getHttp(
        {
          name:"P_buildMember",
          params:{
            policyNo:that.policydate.policyNo,
            insureders:that.policydate.insureders
          }
        },
        data => {
           var arr=[];
            arr.push(that.relations[0]);
            for(var i=0;i<data.data.length;i++){
              arr.push(data.data[i]);
            }
            that.$popup.msg('分类成功!');
          that.showMember(false,true,arr);
        }
      );
    }
  },
    watch: {
      policydate(newVal) {
        this.policydate = newVal
      },
      relations(newVal){
        this.relations = newVal
      },
      ishowmember(newVal){
        this.ishowmember = newVal
      }
    },
};
</script>

<style lang="scss">
.member-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
}
.member-content {
  z-index: 999;
  width: r(525);
  border-radius: r(12);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: r(30);
  .member-info{
    width: 100%;
  }
    .item-input {
      width: 100%;
      border-radius: r(7);
      line-height: r(75);
      font-size: r(29);
      margin-bottom: r(20);
      position: relative;
      .item-name {
        float: left;
        width: 37%;
        text-align: center;
        overflow: hidden;
    text-overflow: ellipsis; 
    -o-text-overflow: ellipsis;
    white-space:nowrap;
      }
      .icon-jiantou_xia {
        color: #999;
        position: absolute;
        right: r(15);
        top: 0;
        font-size: r(16);
        z-index: 12;
        
      }
      .selsectList {
        float: left;
        width: 63%;
        height: 100%;
        height: r(75);
        box-sizing: border-box;
        border: 1px solid #999;
        color: #999;
        background: #fff;
        padding-right: r(30);
        padding-left: r(10);
        position: relative;
        .selsectListInfo{
          width: 100%;
          position: absolute;
          top: r(75);
          left: 0;
          z-index: 14;
          background: #fff;
          border: 1px solid #ccc;
          text-align: center;
          max-height: r(400);
          overflow: auto;
          li {
          width: 100%;
          padding: 0 r(10);
        }
        }
        
      }
    }
  .member-btn {
    text-align: center;
    color: #fff;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    padding-top: r(20);
    span {
      display: block;
      width: 100%;
      background: $baseColor;
      line-height: r(80);
      font-size: r(33);
      letter-spacing: 1px;
      border-radius: r(12);
    }
  }
}
</style>