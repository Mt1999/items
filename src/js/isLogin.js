
define(['jquery','tools'], function($,tools) {
	var beforeSign = $("#before-sign"),
	signin = $("#signin"),
	signUser = $("#sign-name"),
	signout = $("#signout");


	// 判断是否登录
	var username = tools.cookie("username");
	if(username){
		beforeSign.style.display = "none";
		signUser.innerHTML = username;
		signin.style.display = "block";
	}

	// 退出登录
	signout.onclick = function(){
		if(confirm("确认退出登录？")){
			tools.cookie("username" ,"", {"expires" : -1, "path": "/"});
			beforeSign.style.display = "block";

			signin.style.display = "none";
		}
	}
})


