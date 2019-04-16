let content_dt = document.getElementsByClassName('content_dt'),
	content_dd = document.getElementsByClassName('content_dd');
for(let i = 0;i < content_dt.length;i++){
	content_dt[i].onmouseenter = function(){
		addClass(i,'content_dd_active')
	}
	content_dt[i].onmouseleave = function(){
		removeClass(i,'content_dd_active')
	}
	content_dd[i].onmouseenter = function(){
		addClass(i,'content_dd_active')
	}
	content_dd[i].onmouseleave = function(){
		removeClass(i,'content_dd_active')
	}
}
function addClass(obj,classname){
	content_dd[obj].classList.add(classname);
	content_dd[obj].style.animation = 'content_show 0.5s ease-in';
}
function removeClass(obj,classname){
	content_dd[obj].classList.remove(classname);
	content_dd[obj].style.animation = 'content_hide 0.5s ease-in';
}