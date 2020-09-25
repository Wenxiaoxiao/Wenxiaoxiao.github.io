<template>
<div class="city-picker" :class="{'show':show}">
  <div class="mint-popup mint-datetime mint-popup-bottom">
    <mt-picker ref="picker" :slots="slots" @change="onValuesChange" :showToolbar="true" valueKey="text">
      <span class="mint-datetime-action mint-datetime-cancel" @click="close(false)">取消</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="close(true)">确定</span>
    </mt-picker>
  </div>
  <div class="v-modal" style="z-index: 2000;"></div>
</div>
</template>

<script type="text/ecmascript-6">
  import cityNew from "@/datas/city-anbang.js"
  let cityList = [];
  let regionList = [];

  export default {
    props: {
      show:{
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data () {
      return {
        avtiveData:[],
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      }
    },
    methods: {
      close(isSave){
        this.$emit('update:show', false);
        if(isSave) {
          let text = "";
          this.avtiveData.forEach(item => {
            text += item.text;
          });
          this.$emit('submit', text, this.avtiveData);
        }
      },
      onValuesChange(picker, values) {
        if(!this.$refs.picker){
          return;
        }
        if(this.avtiveData.length == 0 || this.avtiveData[0].value != values[0].value || !values[1] || !values[2]) {
          cityList = values[0].children;
          this.$refs.picker.setSlotValues(1, cityList);
          regionList = cityList[0].children;
          this.$refs.picker.setSlotValues(2, regionList);
        }else if(this.avtiveData[1].value != values[1].value){
          regionList = values[1].children;
          this.$refs.picker.setSlotValues(2, regionList);
        }
        this.avtiveData = JSON.parse(JSON.stringify(values));
      },
      getList(id,index) {

      },
    },
    mounted() {
      this.$refs.picker.setSlotValues(0,cityNew);
      // cityList = cityNew[0].children;
      // this.$refs.picker.setSlotValues(1,cityList);
      // regionList = cityList[0].children;
      // this.$refs.picker.setSlotValues(2,regionList);
    },
  }
</script>
<style lang="scss" scoped>
.city-picker {
  display: none;
  &.show {
    display: block;
  }
  .mint-datetime {
    z-index:2001;
  }
}
</style>
