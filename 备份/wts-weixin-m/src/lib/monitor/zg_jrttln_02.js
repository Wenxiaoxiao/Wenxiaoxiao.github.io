/**
 * 统计代码主体
 * @return {[type]} [description]
 */
(function(r,d,s,l){var meteor=r.meteor=r.meteor||[];meteor.methods=["track","off","on"];meteor.factory=function(method){return function(){
  var args=Array.prototype.slice.call(arguments);args.unshift(method);meteor.push(args);return meteor}};for(var i=0;i<meteor.methods.length;i++){
  var key=meteor.methods[i];meteor[key]=meteor.factory(key)}meteor.load=function(){var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);
  js.src="https://analytics.snssdk.com/meteor.js/v1/"+l+"/sdk";fjs.parentNode.insertBefore(js,fjs)};meteor.load();if(meteor.invoked){return}
  meteor.invoked=true;
  meteor.track("pageview")})(window,document,"script","1643920280607757");
/**
 * 数据提交后操作 
 * @return {[type]} 如果没有 删除afterSubmit内部代码即可，不能删除afterSubmit本身
 */
function afterSubmit(){
      meteor.track('form', {convert_id: 1644463641204748 })
}