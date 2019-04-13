require(["require.config"], function () {
	require(["jquery","header","url","cookie","footer"], function ($, header ,url, cookie ) {
		class Regist {
			constructor () {
				this.init();
				
			}
			init () {
				this.nickname = $("#nickname");//用户名
				this.password = $("#password");//密码
				this.btn = $(".register-btn");//提交

				this.onClick();
			}
			onClick (){
//				var _this = this;
				// 注册功能
				this.btn.on("click",() => {
					let nickname = this.nickname.val(),
            			password = this.password.val();
						console.log(nickname)
					$.ajax({
						url: url.phpBaseUrl+"/api/v1/register.php", 
						method: "post",
						data: { nickname, password},
						dataType: "json",
						success: function(data){
			             	alert(data.message)
			             	if(res.res_code === 1){
							if(confirm(res.res_message+ "，即将跳转登录页面")){
								location.href = "/login.html";
							}
						}
			            }
						
					});
				
					// 阻止默认提交
					return false;
				})
			}
			  
		}
		
		new Regist();
		

	})
})