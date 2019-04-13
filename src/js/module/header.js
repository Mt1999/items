define(["jquery"], function ($) {
	class Header {
		constructor () {
			this.init().then(() => {
				this.foter();
			})
		}
		init () {
			return new Promise((resolve, reject) => {
				// 可以在加载路径后面写上空格加选择器，只加载一部分html
				$("#header-container").load("/html/module/header.html",  () => {
					// 回调函数，指的是load加载结束以后执行的代码
					resolve();
				});
			})
			
		}
		foter (){
			$(window).on("scroll",function(){
				//
				if($(window).scrollTop() > 0 ){
					 $(".nav-top").hide();
					 $(".nav").addClass("scrolled");
					 $(".shoppingCart").css({"top": 65});
				}else{
					$(".nav").removeClass("scrolled");
					$(".nav-top").show();
					 $(".shoppingCart").css({"top": 110});
				};
			})	

			var nav = document.querySelector(".nav"),
			mall = nav.querySelector(".mall"),
			mallNav = document.querySelector(".mall-nav");
		
			//鼠标移入
			mall.onmouseenter = function(){
				mallNav.style.overflow = "visible";
				mallNav.style.height = "330"+"px";
			}
			//鼠标移除
			mall.onmouseleave = function(){
				//移入shoppingCart
				mallNav.onmouseenter = function(){
					mallNav.style.height = "330"+"px";
				}
				mallNav.onmouseleave = function(){
					mallNav.style.overflow = "hidden";
					mallNav.style.height = "0"+"px";
				}
			}

			$('.search-input').hover(function() {
				$(".search").addClass('active');
			});
			//搜索框按钮
			$(document).on("click", "div.active button.search-input", function() {
				window.location.href = "/html/list.html" + $(this).siblings("input").val();
				return true;
			})
		}
	}	
	return new Header();
	
})