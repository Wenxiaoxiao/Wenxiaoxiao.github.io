(function(){
    var userInfo;
    wtsLogin.init({env:$.globedata.environment},function(user){
        userInfo=user;
    })
    Vue.component('sub-from', {
        props: {
            fromdata:{
                type:Object,
            },
            parentselect:{
                type:Object,
            },
            indextitle:{
                type:String,
            },
            parentdata:{
                type:Object,//当前数据
            },
        },
        data: function () {
            return {
                checkItem: Object,
                setDom: new Array,
                cityItem: Object,
                switchValue: false,
                startDate:new Date('1949-01-01'),
                endDate:new Date('2025-12-12'),
                pickerVisible:new Date(),
                ready:false,
                onlyShow:false,//仅做展示，无法选择
                handler:function(e){e.preventDefault();},//防止透传
            }
          },
        created: function () {
            // `this` 指向 vm 实例
            var self=this;
            this.setDom=this.fromdata.data;
            if(this.fromdata.type==4){
                var allData=cityData3;
                this.cityItem = [
                    {
                      level: 1,
                      name: allData[0].text,
                      code: allData[0].value
                    },
                    {
                      level: 2,
                      name: allData[0].children[0].text,
                      code: allData[0].children[0].value
                    },
                    {
                      level: 3,
                      name: allData[0].children[0].children[0].text,
                      code: allData[0].children[0].children[0].value
                    }
                  ];
                this.ready=true;
            }
            if(this.fromdata.type==8){
                this.switchValue=this.fromdata.value=='是'?true:false;
            }
            if(this.fromdata.code=="sex"){
                var sex_1='儿子,父亲,岳父,兄弟';
                var sex_2='女儿,母亲,岳母,姐妹';
                if(sex_2.indexOf(self.parentdata.name)>-1){
                    self.onlyShow=true;
                    self.fromdata.value='女'
                }else if(sex_1.indexOf(self.parentdata.name)>-1){
                    self.onlyShow=true;
                    self.fromdata.value='男'
                }
            }
        },
        computed: {
            slotsSelect:function() {
              var data = this.fromdata.data;
              return [
                {
                  flex: 1,
                  values: data,
                  defaultIndex: 0
                }
              ];
            },
            slotsCity:function(){
                var data = cityData3;
                if (data.length < 2) return [];
                return [
                {
                    flex: 1,
                    values: data,
                    defaultIndex: 0,
                    className: "1"
                },
                {
                    flex: 1,
                    values: data[0].children,
                    defaultIndex: 0,
                    className: "2"
                },
                {
                    flex: 1,
                    values: data[0].children[0].children,
                    defaultIndex: 0,
                    className: "3"
                }
                ];
            },
            cityTxt:function(){
                var value=this.fromdata.value?this.fromdata.value:this.fromdata.placeholder||'';
                if (value.length > 8) {
                    value = value.slice(0, 8) + "..."
                }
                return value;
            },
          },
        methods:{
            switchChange:function(){
                this.fromdata.value=this.switchValue?'是':'否';
            },
            getSlotValue:function(picker, values){
                this.checkItem = values[0];
            },
            inputChange:function(e){
                var self=this;
                if(this.fromdata.code=='familyIncome'){
                    self.$emit("inputback", {
                        value: e.target.value,
                    });
                }
            },
            /*解决iphone页面层级相互影响滑动的问题*/
            closeTouch:function(){   /*  弹层出现时调用  */
                document.getElementsByTagName("body")[0].addEventListener('touchmove',
                this.handler,{passive:false});//阻止默认事件
                console.log("closeTouch haved happened.");
            },
            openTouch:function(){   /*  弹层关闭时调用  */
                document.getElementsByTagName("body")[0].removeEventListener('touchmove',
                this.handler,{passive:false});//打开默认事件
                console.log("openTouch haved happened.");
            },
            checkon:function(i){
                var self=this;
                if(this.fromdata.isSingle){
                    for(var k in self.setDom){
                        if(i==k){
                            self.setDom[k].select=true;
                        }else{
                            self.setDom[k].select=false;
                        }
                    }
                }else{
                    self.setDom[i].select=!self.setDom[i].select;
                }
                this.$emit("selectedback", {
                    value: this.setDom[i].select,
                    i: i,
                });
            },
            isShowHandel:function(type) {
                //munt 选择回调-取消
                this.fromdata.show = type?true:false;
                if(type){
                    this.closeTouch();
                 }else{
                    this.openTouch();
                 }
              },
              handleSure:function() {
                //munt 选择回调-确认
                var self=this;
                if(this.fromdata.addPerson && !this.checkParent(this.checkItem.code)){
                    return;
                }
                if(this.fromdata.addPerson && this.checkItem.name=='自己'){
                    self.$emit("selectforself", {
                        type: 1,
                    });
                }else if(this.fromdata.addPerson){
                    self.$emit("selectforself", {
                        type: 2,
                    });
                }
                this.openTouch();
                this.fromdata.show = false;
                this.fromdata.value = this.checkItem.name;
                if(this.fromdata.type==6){
                    self.$emit("checkrole", {
                        check: this.checkItem,
                    });
                }
              },
              checkParent:function(code){
                var hasCommon=false;
                var parentSelect=this.parentselect;
                for(var k in parentSelect){
                    if(parentSelect[k].code==code && !parentSelect[k].addPerson){
                        hasCommon=true;
                        break;
                    }
                }
                if(hasCommon){
                    layerAlert('已有相同的成员，请更换改选项')
                    return false;
                }else{
                    return true;
                }
              },
              citySure:function() {
                //munt 选择回调-确认
                this.fromdata.show = false;
                this.fromdata.value = this.getCityName();
                this.openTouch();
              },
              showTime:function(i) {
                //按钮选择
                this.$refs.datePicker.open();
              },
              dateConfirm:function(t,n){
                this.fromdata.value=formatDate(t);
              },
              getCityValue:function(picker, values){
                  if(!this.ready)return;
                if (!values || values.length < 1) return;
                if (values[0].value != this.cityItem[0].code) {
                  //省份变化
                  picker.setSlotValues(1, values[0].children);
                  if (values[1].children.length > 0) {
                    picker.setSlotValues(2, values[1].children);
                  } else{
                    picker.setSlotValues(2, []);
                  }
                } else if (values[1].value != this.cityItem[1].code) {
                  if (values[1].children.length > 0) {
                    picker.setSlotValues(2, values[1].children);
                  } else {
                    picker.setSlotValues(2, []);
                  }
                }
                this.cityItem=values
              },
              updateCity:function(data) {
                for (var k = 0; k < 3; k++) {
                  this.cityItem[k].code = data[k] ? data[k].value : "";
                  this.cityItem[k].name = data[k] ? data[k].text : "";
                }
              },
              getCityName:function() {
                var name = "";
                var fromdata=this.fromdata;
                for (var k = 0; k < 3; k++) {
                  name += this.cityItem[k].text ? this.cityItem[k].text+' ' : "";
                }
                return name;
              },
        },
        template: `<div class="sub-page" v-if="fromdata && fromdata.need">
    <div class="sub-box" v-if="fromdata.type==1">
        <div class="sub-title">{{fromdata.name}}<span class="zhushi" v-if="fromdata.force">*</span></div>
        <div class="sub-from">
            <input type="text" v-model="fromdata.value" placeholder="请输入" :class="[{hasTips:fromdata.tips},'sub-input']">
            <span class="input-tips">{{fromdata.tips}}</span>
        </div>
    </div>
    <div class="sub-box" v-if="fromdata.type==2 || fromdata.type==6">
        <div class="sub-title">{{fromdata.name}}<span class="zhushi" v-if="fromdata.force">*</span></div>
        <div class="sub-from">
            <div class="def-text common-icon" @click="isShowHandel(1)" v-if="!onlyShow">
                {{fromdata.value?fromdata.value:"请选择"}}</div>
                <div class="def-text-2" v-else>
                    {{fromdata.value}}
                </div>
        </div>
    </div>
    <div class="sub-box" v-if="fromdata.type==3">
        <div class="sub-title">{{fromdata.name}}<span class="zhushi" v-if="fromdata.force">*</span></div>
        <div class="sub-from">
            <div class="def-text common-icon" @click="showTime">
                {{fromdata.value?fromdata.value:"请选择"}}</div>
        </div>
    </div>
    <div class="sub-box" v-if="fromdata.type==4">
        <div class="sub-title">{{fromdata.name}}<span class="zhushi" v-if="fromdata.force">*</span></div>
        <div class="sub-from">
            <div class="def-text common-icon" @click="isShowHandel(1)">
                {{cityTxt}}</div>
        </div>
    </div>
    <div class="sub-box box-vertical" v-if="fromdata.type==5">
        <div class="sub-title">{{fromdata.name}}<span class="zhushi" v-if="fromdata.force">*</span></div>
        <div class="sub-from">
            <textarea cols="20" rows="4" v-model="fromdata.value" :placeholder="fromdata.placeholder" class="sub-textarea"></textarea>
        </div>
    </div>
    <div class="sub-box" v-if="fromdata.type==7">
        <div class="sub-title">{{fromdata.name}}</div>
        <div class="sub-from">
                <div class="def-text-2">
                    {{fromdata.value}}
                </div>
                <span class="tips">{{fromdata.tips}}</span>
        </div>
    </div>
    <div class="sub-box" v-if="fromdata.type==8">
        <div class="sub-title">{{fromdata.name}}</div>
        <div class="sub-from">
            <mt-switch v-model="switchValue" @change="switchChange"></mt-switch>
        </div>
    </div>
    <div class="sub-box" v-if="fromdata.type==9">
            <div class="sub-title">{{fromdata.name}}<span class="zhushi" v-if="fromdata.force">*</span></div>
            <div class="sub-from">
                <input type="number" v-model="fromdata.value" placeholder="请输入" @change="inputChange" :class="[{hasTips:fromdata.tips},'sub-input']">
                <span class="input-tips">{{fromdata.tips}}</span>
            </div>
    </div>
    <div class="sub-box box-vertical" v-if="fromdata.type==10">
            <div class="sub-title">{{indextitle+1}}. {{fromdata.name}}<span class="zhushi" v-if="fromdata.force">*</span></div>
            <div class="sub-from">
                <div class="checkList">
                    <div class="checkItem" v-for="(ele, i) in setDom" @click="checkon(i)">
                        <span :class="[{active:ele.select},'checkRole']"></span>
                        <span class="checkTitle">{{ele.name}}</span>
                    </div>
                </div>
            </div>
    </div>
    <div class="sub-desc">{{fromdata.desc}}</div>
    <div class="select-layer-box" v-show="(fromdata.type==2 || fromdata.type==6) && fromdata.show">
        <div class="mask"></div>
        <div class="mainContent">
            <mt-picker :slots="slotsSelect" :show-toolbar="true" value-key="name" @change="getSlotValue">
                <span @click="isShowHandel(0)" class="frombtn btn-cancle">取消</span>
                <span @click="handleSure" class="frombtn btn-sure">确认</span>
            </mt-picker>
        </div>
    </div>
    <mt-datetime-picker v-if="fromdata.type==3"  ref="datePicker" type="date" @confirm="dateConfirm"
        v-model="pickerVisible"
        :startDate="startDate"
        :endDate="endDate"
        year-format="{value} 年" month-format="{value} 月"
        date-format="{value} 日">
    </mt-datetime-picker>
    <div class="select-layer-box" v-show="fromdata.type==4 && fromdata.show">
        <div class="mask"></div>
        <div class="mainContent">
          <mt-picker :slots="slotsCity" :show-toolbar="true" value-key="text" @change="getCityValue">
            <span @click="isShowHandel(0)" class="frombtn btn-cancle">取消</span>
            <span @click="citySure" class="frombtn btn-sure">确认</span>
          </mt-picker>
        </div>
      </div>
</div>`
      })
    var app = new Vue({
        el: '#app',
        data: {
        user:null,//用户信息
          page: 0,//当前显示页面
          selectPerson:[],//选择人员
          familyEconomy:familyEconomy,// 家庭经济状况
          responsibility:responsibility,// 家庭责任
          getRightPlanner:getRightPlanner,// 匹配
          persons:allPersons,//全部人员
          result:new Array(),//结果数据
          showTell:false,//显示手机号弹窗
          tell:'',//手机号
          name:'',//姓名
          showPerson:0,//默认显示人物
        },
        created: function () {
            // `this` 指向 vm 实例
            console.log(this.familyEconomy);
          },
          methods: {
            startPage:function(){
                this.page++;
                this.user=userInfo;
            },
            /**
             * 第1页点击按钮
             */
            page_1_click: function () {
                var err=false;
                var persons=this.persons;
                for(var k=0;k<persons.length;k++){
                    if(persons[k].choose){
                        err=true
                        break;
                    }
                }
                if(!err){
                    return layerMsg('请您先选择至少一位家庭成员！');
                }
                this.page++;
                this.initSelectData();
            },
            /**
             * 第二页点击按钮
             */
            page_2_click: function () {
                var self=this;
                var err=false;
                var errMsg='';
                console.log(this.selectPerson);
                var data=this.selectPerson;
                for(var k=0;k<data.length;k++){
                    var sub=data[k].children;
                    if(data[k].name=='自己'){
                        self.name=sub[0].value;
                    }
                    if(!data[k].name){
                        err=true;
                        errMsg="人物角色尚未选择";
                        break;
                    }
                    for(var i =0; i<sub.length;i++){
                        if(!sub[i].value && sub[i].force && sub[i].need){
                            err=true;
                            errMsg=data[k].name+'-'+sub[i].name+"尚未填写或填写有误！";
                            break;
                        }
                    }
                }
                if(err)return layerAlert(errMsg);
                this.page++;
            },
            /**
             * 第3页点击按钮
             */
            page_3_click: function () {
                console.log(this.familyEconomy);
                console.log(this.responsibility);
                var familyEconomyCheck=this.checkWrite(this.familyEconomy);
                var responsibilityCheck=this.checkWrite(this.responsibility);
                if(familyEconomyCheck.err){
                    return layerAlert(this.familyEconomy[familyEconomyCheck.index].name+'尚未填写');
                }
                if(responsibilityCheck.err){
                    return layerAlert(this.responsibility[responsibilityCheck.index].name+'尚未填写');
                }
                this.page++;
            },
            page_4_click:function(){
                var getRightPlannerCheck=this.checkWrite(this.getRightPlanner);
                if(getRightPlannerCheck.err){
                    return layerAlert(this.getRightPlanner[getRightPlannerCheck.index].name+' 尚未填写');
                }
                console.log(JSON.stringify(this.getRightPlanner));
                this.page++;
                this.getResult();
            },
            submitBtn:function(){
                var tell=this.tell;
                var name=this.name;
                if(!tell){
                    layerMsg('请输入您的手机号');
                    return;
                }
                if(!$.regular().isPhone(tell)){
                    layerAlert('您的手机号输入有误！');
                    return;
                }
                this.showTell=false;
                if(!name){
                    name=userInfo.nickname||'';
                }
                var result={
                    name: name,
                    mobile: tell,
                    url:location.href,
                    type:5,
                    detail:JSON.stringify(this.result)
                }
                $.ajaxPackage({
                    url: "/policy/platAppointment/api/addUser",
                    data: JSON.stringify(result),
                    contentType: "application/json;charset=UTF-8",
                    success: function(data, isError) {
                        if (!isError) {
                            return;
                        }
                        layerAlert('您的问卷已提交成功，请耐心等待规划师联系您','我知道了',function(){
                            if($.tools().isWeiXin() && wx){
                                wx.closeWindow();
                            }
                        });
                    }
                });
            },
            getResult:function(){
                this.result=[
                    {
                        name:'家庭成员',
                        code:'familyMembers',
                        children:this.initJSONResult(this.selectPerson),
                    },
                    {
                        name:'家庭经济情况',
                        code:'familyIncome',
                        children:[
                            {
                                name:familyEconomy.name,
                                code:familyEconomy.code,
                                children:this.initResult(this.familyEconomy)
                            },
                            {
                                name:responsibility.name,
                                code:responsibility.code,
                                children:this.initResult(this.responsibility)
                            },
                        ],
                    },
                    {
                        name:'选规划师',
                        code:'getPlanner',
                        children:this.initResult(this.getRightPlanner)
                    },
                ];
                console.log(JSON.stringify(this.result));
                
            },
            initResult:function(data){
                var value=[];
                for(var k in data){
                    value.push({
                        name:data[k].name,
                        code:data[k].code,
                        value:data[k].value,
                    })
                }
                return value;
            },
            initJSONResult:function(data){
                var jsonValue=[];
                var self=this;
                for(var k in data){
                    jsonValue.push({
                        name:data[k].name,
                        code:data[k].code,
                        children:self.initResult(data[k].children),
                    })
                }
                return jsonValue;
            },
            checkWrite:function(data,parentName){
                var err=false;
                var errIndex=-1;
                for(var i =0; i<data.length;i++){
                    if(!data[i].value && data[i].force){
                        err=true;
                        errIndex=i;
                        break;
                    }
                }
                return {
                    err:err,
                    index:errIndex
                };
            },
            inputBack:function(e){
                console.log(e.value);
                var value=e.value*0.05;
                familyEconomy[1].value=value.toFixed(2);
            },
            selectedback:function(i,e){
                var result='';
                if(this.getRightPlanner[i].isSingle){
                    var data=this.getRightPlanner[i].data;
                    for(var k in data){
                        if(e.i==k){
                            result=data[k].name
                            data[k].select=true;
                        }else{
                            data[k].select=false;
                        }
                    }
                    this.getRightPlanner[i].data=data;
                }else{
                    this.getRightPlanner[i].data[e.i].select=e.value;
                    var data=this.getRightPlanner[i].data;
                    for(var k in data){
                        if(data[k].select){
                            result+=data[k].name+','
                        }
                    }
                    result=result.substr(0, result.length - 1);
                }
                this.getRightPlanner[i].value=result;
                console.log(this.getRightPlanner[i]);
                console.log(result);
            },
            addPerson:function(){
                //新增成员
                var doms=JSON.stringify(selectDom);
                var person=[];
                for(var k =0;k<allPersons.length;k++){
                    person.push({
                        name:allPersons[k].name,
                        code:allPersons[k].id,
                        select:false,
                    })
                }
                doms=JSON.parse(doms);
                doms.unshift({
                    name:'角色',
                    code:'role',
                    value:'',
                    force:true,
                    type:6,
                    desc:'',
                    placeholder:'若您存在特殊健康状态或已投保险情况，请说明',
                    addPerson:true,
                    data:person,
                    show:false,
                    need:true,
                })
                this.selectPerson.push(
                    {
                        name:'选择',
                        code:'',
                        value:'',
                        addPerson:true,
                        type:'',
                        show:false,
                        children:doms
                    }
                );
                console.log(this.selectPerson);
                
            },
            selectforself:function(index,e){
                //选择人物为自己时回调
                if(e.type==1 || e.type==2){
                    var result=e.type==1?true:false;
                    this.selectPerson[index].children[1].need=result;
                    this.selectPerson[index].children[4].need=result;
                }
            },
            // 初始化人物数据
            initSelectData:function(){
                var selected=new Array();
                var persons=this.persons;
                var doms=JSON.stringify(selectDom);
                for(var k=0;k<persons.length;k++){
                    if(persons[k].choose){
                        var domSelects=JSON.parse(doms);
                        if(persons[k].name=='自己'){
                            domSelects[0].need=true
                            domSelects[3].need=true
                        }
                        selected.push({
                            name:persons[k].name,
                            code:persons[k].id,
                            value:'',
                            type:persons[k].type,
                            show:false,
                            children:domSelects
                        })
                    }
                };
                this.selectPerson=selected;
                console.log(selected);
            },
            /**
             * 删除人物
             * @param {*} i-序列
             */
            delitePerson:function(i){
                var self=this;
                if(self.selectPerson.length<2){
                    layerMsg('家庭成员不能为空！');
                    return;
                }
                layerinquiry('您确定要删除该成员吗？',['确认','再看看'],function(){
                    self.selectPerson.splice(i,1); 
                    layerMsg('已删除该成员');
                })
            },
            checkRole:function(index,data){
                var code=data.check.code;
                this.selectPerson[index].name=data.check.name
                this.selectPerson[index].code=code
                this.selectPerson[index].type=allPersons[code].type
            }
          }
      })
    
      
    function layerMsg(text) {
        layer.open({
            content: text,
            skin: 'msg',
            style: 'bottom:0;',
            time: 2 //2秒后自动关闭
        });
    }
    
    //ios风格确认按钮弹窗
    function layerAlert(text, btn, yes, type) {
    
        layer.open({
            content: text,
            skin: 'lzAlert',
            btn: btn || '我知道了',
            shadeClose: type ? false : true,
            yes: function (index) {
                layer.close(index);
                if (typeof yes == 'function') yes(index);
            },
        });
    }
    /**
     * 询问框弹窗
     * text-文字
     * btns-按钮文本
     * yes-成功回调
     * no-失败回调
     */
    function layerinquiry(text, btns, yes, no) {
        var inquiry = layer.open({
            content: text,
            btn: btns,
            skin: "inquiry",
            yes: function (index) {
                layer.close(inquiry);
                yes(index);
            },
            no: function () {
                if ($.tools().isFn(no)) {
                    no();
                }
            }
        });
    }

    //时间选择器过滤
    function formatDate(secs) {
        var t = new Date(secs)
        var year = t.getFullYear()
        var month = t.getMonth() + 1
        if (month < 10) { month = '0' + month }
        var date = t.getDate()
        if (date < 10) { date = '0' + date }
        var hour = t.getHours()
        if (hour < 10) { hour = '0' + hour }
        var minute = t.getMinutes()
        if (minute < 10) { minute = '0' + minute }
        var second = t.getSeconds()
        if (second < 10) { second = '0' + second }
        return year + '-' + month + '-' + date
    }
    $.shareWx({
        img: location.origin + "/m/lib/images/exercise/appointment/share.jpg",
        title: "梧桐树家庭保障问卷",
        desc: '您的信息将被严格保密！科学规划家庭保障方案，我们更专业！'
    });
    
})()
