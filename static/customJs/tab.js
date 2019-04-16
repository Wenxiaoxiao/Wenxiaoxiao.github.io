let tabTitle = document.getElementsByClassName('tab-title'),
	tabContent = document.getElementsByClassName('tab-content');
function choseContent(num){
	for(let i = 0;i < tabTitle.length;i++){
		if(num === i){
			let flag = tabTitle[i].classList.contains('activeTitle');
			if(flag){

			}
			else{
				tabTitle[i].classList.add('activeTitle');
				tabContent[i].classList.add('activeContent');
			}
		}
		else{
			tabTitle[i].classList.remove('activeTitle');
			tabContent[i].classList.remove('activeContent');
		}
	}

}