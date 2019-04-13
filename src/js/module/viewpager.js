define(["jquery"], function() {
	var index = 0,
		lastIndex = 0,
		box = $(".swiper-container"),
		aImg = $("ul li"),
		aBtn = $("ol li"),
		goNext = $(".goNext"),
		goPrev = $(".goPrev");

	 //给下标绑定按钮事件
	 aBtn = Array.from(aBtn);
	 aBtn.forEach(function(btn){
		 btn.onclick = function(){
			 index = this.innerText - 1;
			 change();
		 }
	 })   
	 //封装
	 function change(){
		//去掉之前的按钮
		aBtn[lastIndex].classList.remove("ac");
		//去掉之前的图片ac
		aImg[lastIndex].classList.remove("ac");
		//把现在的图片加上ac
		aImg[index].classList.add("ac");
		aBtn[index].classList.add("ac");
		//把现在的index赋值给上一次的index
		lastIndex = index;
	}
	 //下一张
	goNext.onclick = function(){
		 if(++index >= aImg.length )  index = 0;
		 change();
	}
	 //上一张
	goPrev.onclick = function(){
		 if(--index < 0 ) index = aImg.length - 1;
		 change();
	}
	 //自动轮播
// 	setInterval(function(){
// 	    goNext.onclick();
// 	 },3000);

	var  timer = setInterval(function(){
		  goNext.onclick();
	},2000);
	//鼠标移入停止
	box.mouseenter(function(){
		clearInterval(timer);
	})
	
	//鼠标移除计时开始
	box.mouseleave(function(){
		timer =  setInterval(function(){
			  goNext.onclick();
		},2000);
	})
})