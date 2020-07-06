//正则类
const regular = {
    //电话号码
    isPhone: function(phone) {
        var pattern = /^1[3,4,5,6,7,8,9]\d{9}$/;
        return pattern.test(phone);
    },
    //邮件
    isEmail: function(email) {
        var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
        return pattern.test(email);
    },
    //姓名
    isName: function(val) {
        var pattern = /^[\u4e00-\u9fa5]{2,10}$|^[\w+\s]{1,20}$/;
        return pattern.test(val);
    },
    //邮编
    isZip: function(val) {
        var pattern = /^[0-9]\d{5}$/;
        return pattern.test(val);
    },
    //身份证
    issfz: function(val) {
        var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return pattern.test(val);
    },
    //数字
    isNum: function(val) {
        var pattern = /(^[1-9]\d*\.?\d*$)|(^0\.\d*[1-9]$)/;
        return pattern.test(val);
    },
    //匹配中英文
    isChAndEn: function(val) {
        var pattern = /[a-zA-Z\u4e00-\u9fa5]+/g;
        return !pattern.test(val);
    },
    //获取身份证对应的性别和年龄
    getDateSex: function(num) {
        var UUserCard = num;
        var returns = {
            age: '',
            sex: '',
        };
        //获取出生日期
        UUserCard.substring(6, 10) +
            '-' +
            UUserCard.substring(10, 12) +
            '-' +
            UUserCard.substring(12, 14);
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //alert("男");
            returns.sex = 1;
        } else {
            //alert("女");
            returns.sex = 2;
        }
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (
            UUserCard.substring(10, 12) < month ||
            (UUserCard.substring(10, 12) == month &&
                UUserCard.substring(12, 14) <= day)
        ) {
            age++;
        }
        //alert(age);
        returns.age = age;
        return returns;
    },
    isExtLink: function(link) {
        var pattern = /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/g;
        return pattern.text(link);
    },
};

export default regular