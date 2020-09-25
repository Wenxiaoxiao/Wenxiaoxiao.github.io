<template>
 <div class="box margin-none">
    <div class="promp-common" :style="typeNum == 0?'display:block':''">
        <div class="list-form marb-e3e3e3">
            <span class="list-left">【医疗】 请您保管好下列资料:</span>
        </div>
        <p class="left-yuan">正式收据，门诊/住院费用清单，社保结算单</p>

        <p class="left-yuan">相关检查及检验报告</p>

        <p class="left-yuan">意外事故证明（公安机关等机构出具的资料）等</p>
    </div>
    <div class="promp-common" :style="typeNum == 1?'display:block':''">
        <div class="list-form marb-e3e3e3">
            <span class="list-left">【重疾】 请您保管好下列资料:</span>
        </div>
        <p class="left-yuan">（门诊，住院）病例</p>

        <p class="left-yuan">相关检查及检验报告 </p>

        <p class="left-yuan">病理组织检验报告（恶性肿瘤理赔），相关检查及检验报告</p>

        <p class="left-yuan">意外事故证明（公安机关等机构出具的资料）等</p>
    </div>
    <div class="promp-common" :style="typeNum == 2?'display:block':''">
        <div class="list-form marb-e3e3e3">
            <span class="list-left">【残疾】 请您保管好下列资料:</span>
        </div>
        <p class="left-yuan">（门诊，住院）病例</p>

        <p class="left-yuan">相关检查及检验报告 </p>

        <p class="left-yuan">意外事故证明（公安等机构出具的资料）等</p>

        <p class="left-yuan">鉴定报告（如有）等</p>
    </div>
    <div class="promp-common" :style="typeNum == 3?'display:block':''">
        <div class="list-form marb-e3e3e3">
            <span class="list-left">【身故】 请您保管好下列资料:</span>
        </div>
        <p class="left-yuan">（门诊，住院）病例</p>

        <p class="left-yuan">相关检查及检验报告</p>

        <p class="left-yuan">意外事故证明（公安机关等机构出具的资料）等</p>

        <p class="left-yuan">鉴定报告（如有）等</p>

        <p class="left-yuan">死亡证明，户口注销证明，殡葬/火化证明</p>
    </div>
    <div class="promp-common" :style="typeNum == 4?'display:block':''">
        <div class="list-form marb-e3e3e3">
            <span class="list-left">【家财损失】 请您保管好下列资料:</span>
        </div>
        <p class="left-yuan">公安机关开具的保安证明，金额超过5000需提供立案证明</p>

        <p class="left-yuan">房产证复印件、出险照片、房产原装修合同、发票</p>

        <p class="left-yuan">出险后维修合同、发票</p>

        <p class="left-yuan">家电、家具原购买合同、发票</p>
    </div>
    <div class="promp-common" :style="typeNum == 5?'display:block':''">
        <div class="list-form marb-e3e3e3">
            <span class="list-left">【其他】 请您保管好下列资料:</span>
        </div>
        <p class="left-yuan">依照具体赔案情况由保险人要求提供的证明材料</p>
    </div>
</div>
</template>

<script>
    export default {
      props: {
          typeNum:Number
      },
      data() {
        return {
          // 保险分类数据
        };
      },
      methods: {},
      mounted: function() {},
      watch: {
          typeNum(newValue, oldValue) {
            if(newValue){
                console.log(this.typeNum)
                this.typeNum=newValue;
            }
        }
      }
    };
</script>

<style lang="scss">
 .margin-none {
    background: white;
    margin: 0;
    padding-bottom: 0;

    //padding-top: r(20);
    .promp-common {
      display: none;
      padding-top: r(10);
      padding-bottom: r(20);
      border-bottom: 1px solid #ddd;
    }
  }
</style>