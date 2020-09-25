var newdate = [];
var year = new Date();
year = year.getFullYear();
var value = 0
for (var i = year; i > 1905; i--) {
    value++;
    var obj = {};
    obj.value = value;
    obj.text = i+"年";
    obj.children = [];
    for (var j = 1; j < 13; j++) {
        var obj1 = {};
        obj1.value = value * 300 + j;
        obj1.text = j+"月";
        obj1.children = [];
        obj.children.push(obj1);
        if (j == 1 || j == 3 || j == 5 || j == 7 || j == 8 || j == 10 || j == 12) {
            for (var k = 1; k <= 31; k++) {
                var obj2 = {};
                obj2.text = k+"日";
                obj2.value = 300 * value + 300 * j + k;
                obj1.children.push(obj2);
            }
        } else if (j == 4 || j == 6 || j == 9 || j == 11) {
            for (var k = 1; k <= 30; k++) {
                var obj2 = {};
                obj2.text = k+"日";
                obj2.value = 300 * value + 300 * j + k;
                obj1.children.push(obj2);
            }
        } else {
            if (((i % 4) == 0) && ((i % 100) != 0) || ((i % 400) == 0)) {

                for (var k = 1; k <= 29; k++) {
                    var obj2 = {};
                    obj2.text = k+"日";
                    obj2.value = 300 * value + 300 * j + k;
                    obj1.children.push(obj2);
                }
            } else {
                for (var k = 1; k <= 28; k++) {
                    var obj2 = {};
                    obj2.text = k+"日";
                    obj2.value = 300 * value + 300 * j + k;
                    obj1.children.push(obj2);
                }
            }
        }
    }
    newdate.push(obj);

}