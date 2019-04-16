let item = document.getElementsByClassName('item'),
	index,
	slip_change = document.getElementsByClassName('slip_change'),
	item_active = document.getElementsByClassName('item_active'),
	container = document.getElementsByClassName('container')[0];
function Animation(type){
	if(type === 'opacity'){
		item_active[0].style.animation = 'show 2s ease-in';
	}
	else if(type === 'move'){
		item_active[0].style.animation = 'move 2s ease-in';
	}
}
function chosed_item(num){
	item_still();
	for(let i = 0;i < item.length;i++){
		if((num-1) === i){
			item[i].classList.add('item_active')
			slip_change[i].classList.add('slip_active')
		}
		else{
			item[i].classList.remove('item_active')
			slip_change[i].classList.remove('slip_active')
		}
	}
	Animation('move');
}

var SwiperTimer = null;
function autoPlay(flag,time){
	if(flag === true){
		SwiperTimer = setInterval(function () {
            change_item('next');
        },time);
	}
}
autoPlay(true,5000);

function mouseEnter(){
	clearInterval(SwiperTimer);
}

function mouseLeave(){
	autoPlay(true,5000);
}

function item_still(){
	for(let i = 0;i < item.length;i++){
		let flag = item[i].classList.contains('item_active');
		if(flag){
			item[i].classList.add('item_still_active')
			index = i;
		}
		else{
			item[i].classList.remove('item_still_active')
		}
	}
	return index;
}
function change_item(flag){
	let idx,
		index = item_still();
	if(flag === 'pre'){
		if(index === 0){
			idx = item.length-1;
		}
		else{
			idx = index -1;
		}
	}
	else if(flag === 'next'){
		if(index === item.length-1){
			idx = 0
		}
		else{
			idx = index +1;
		}
	}
	
	for(let i = 0;i < item.length;i++){
		if(idx === i){
			item[i].classList.add('item_active')
			slip_change[i].classList.add('slip_active')
		}
		else{
			item[i].classList.remove('item_active')
			slip_change[i].classList.remove('slip_active')
		}
	}
	Animation('move');
}