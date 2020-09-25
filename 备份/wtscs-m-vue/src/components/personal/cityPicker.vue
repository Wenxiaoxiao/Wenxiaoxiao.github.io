<template>
  <div class="addressTem">
    <div class="addressmask" @click="hideaddressmask"></div>
    <div class="address-info">
      <div class="address-title">
        <span v-for="item in addressTitle">{{item}}</span>
      </div>
      <div class="address-content">
        <ul
          ref="box"
          v-for="(items,index) in addressData"
          :style="'width:'+ (100/addressData.length) +'%;'"
        >
          <li
            ref="boxli"
            @click="clickevent(item.id,index)"
            v-for="item in items"
            :class="[item.active?'active':'']"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import cityPicker from "static/js/city-picker";
export default {
  props: {
    address: { address: String, default: "" }
  },
  data: () => ({
    addressTitle: ["请选择"],
    addressData: [],
    pro: { id: "", name: "" },
    city: { id: "", name: "" },
  }),
  mounted() {
    this.showpro(); 
  },


  created() {},
  methods: {
    clickevent(id, index) {
      if (index == 0) {
        this.proclick(id);
      } else {
        this.cityclick(id);
      }
    },
    proclick(proid) {
      this.showpro();
      for (var i = 0; i < this.addressData[0].length; i++) {
        if (this.addressData[0][i].id == proid) {
          this.addressData[0][i].active = true;
          this.pro.id = proid;
          this.pro.name = this.addressData[0][i].name;
          this.addressTitle[0] = this.addressData[0][i].name;
          this.addressTitle[1] = "请选择";
          break;
        }
      }
      this.addressData.push(cityPicker.city(proid));
    },

    cityclick(cityid) {
      for (var i = 0; i < this.addressData[1].length; i++) {
        if (this.addressData[1][i].id == cityid) {
          this.addressData[1][i].active = true;
          this.city.id = cityid;
          this.city.name = this.addressData[1][i].name;
          var addressTitle = JSON.parse(JSON.stringify(this.addressTitle));
          addressTitle[1] = this.addressData[1][i].name;
          this.addressTitle = addressTitle;
        } else {
          this.addressData[1][i].active = false;
        }
      }
      this.$emit("selected", { pro: this.pro.name, city: this.city.name });
    },

    hideaddressmask(e) {
      if (e.currentTarget.className == "addressmask") {
        this.$emit("hideAddressInfo", {});
      }
    },

    showpro(val) {
      this.addressData = [];
      this.addressTitle = ["请选择"];
      this.pro = { id: "", name: "" };
      this.city = { id: "", name: "" };
      this.addressData.push(cityPicker.province());
      if (val && val.length > 0) {
        for (var i = 0; i < val.split(",").length; i++) {
          var item = val.split(",")[i];
          if (i == 0) {
            for (var j = 0; j < cityPicker.province().length; j++) {
              if (this.addressData[0][j].name.indexOf(item) > -1) {
                this.addressData[0][j].active = true;
                this.pro.id = this.addressData[0][j].id;
                this.pro.name = this.addressData[0][j].name;
                this.addressTitle[0] = this.addressData[0][j].name;
                this.addressTitle[1] = "请选择";
                break;
              }
            }
          } else {
            this.addressData.push(cityPicker.city(this.pro.id));
            for (var j = 0; j < cityPicker.city(this.pro.id).length; j++) {
              if (this.addressData[1][j].name.indexOf(item) > -1) {
                this.addressData[1][j].active = true;
                this.city.id = this.addressData[1][j].id;
                this.city.name = this.addressData[1][j].name;
                var addressTitle = JSON.parse(
                  JSON.stringify(this.addressTitle)
                );
                addressTitle[1] = this.addressData[1][j].name;
                this.addressTitle = addressTitle;
                break;
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
.addressmask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
}
.address-info {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  color: #000;
  font-size: r(30);
  z-index: 10;
  .address-title {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #ccc;
    span {
      line-height: r(90);
      padding: r(20);
    }
  }
  .address-content::after {
    clear: both;
    content: "";
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .address-content {
    ul {
      float: left;
      text-align: center;
      height: r(540);
      overflow: auto;
    }
    li {
      width: 100%;
      line-height: r(70);
      box-sizing: border-box;
      padding: 0 r(20);
      &.active {
        color: #ff6e06;
      }
    }
  }
}
</style>