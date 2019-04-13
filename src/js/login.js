require(["require.config"], function () {
	require(["jquery","header","url","cookie","footer"], function ($, header ,url, cookie) {
		 class Register{
		      constructor(){
		        this.init();
		      }
		      init(){
		      	this.userInput = $("#Laccount"),
				this.pwdInput = $("#Lpassword"),
				this.btn = $("#btn"),
				this.remember = $("#remember");
				
				this.bindEventss();
		      }
		      bindEventss(){
			 	//绑定登陆事件
			 	this.btn.on("click", () => {
			 		let nickname = this.userInput.val(),
						password = this.pwdInput.val(),
						remember = this.remember;
					//发送ajax请求
					$.ajax({
						url : url.phpBaseUrl+"/api/v1/login.php", 
						method : "post",
						data: { nickname, password },
						dataType: "json",
						success: function(data){
							if(data.code === 1){
								// 保存用户登录信息cookie
								// 14天免登录
								$.cookie.json = true;
								const nickname = $.cookie("nickname")||[];
				             	const has = usernames.some(curr=>{
				             		if($nickname===nickname){
				             	
				                 }
				                 
				             	})
				             	console.log(nickname)
				               $.cookie("nickname",nickname,{expires:10,path:"/"});
				               
				              window.location.href="../index.html" ;   
				              
								var option = remember.checked ? {"path" : "/", "expires" : 14} : {"path" : "/"};
								//tools.cookie("username", username, option);
		
								//if(confirm(res.res_message + "，即将跳转首页")){
								//	location.href = "../index.html";
								//}
							}
						}
					})
					// 阻止默认提交
				return false;
			 	})
			 }
		}
		 new Register();
		 
//		window.onload = function(){
//			var userInput = $("#Laccount"),
//				pwdInput = $("#Lpassword"),
//				btn = $("#btn"),
//				remember = $("#remember");
//			// 注册功能
//			btn.onclick = function() {
//
//				var username = userInput.value;
//				var password = pwdInput.value;
//				// 提交服务器
//				tools.ajaxPost(url.phpBaseUrl+"/api/v1/login.php", { username, password }, function(res){
//					if(res.res_code === 1){
//						// 保存用户登录信息cookie
//						// 14天免登录
//						var option = remember.checked ? {"path" : "/", "expires" : 14} : {"path" : "/"};
//						tools.cookie("username", username, option);
//
//						if(confirm(res.res_message + "，即将跳转首页")){
//							location.href = "../index.html";
//						}
//					}else{
//						alert(res.res_message);
//					}
//				});
//				// 阻止默认提交
//				return false;
//			}
//		}
	})
})