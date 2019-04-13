require(["require.config"], function () {
	require(["jquery","header","url","template","Swiper","viewpager","isLogin","footer"], function ($, header,url,template,Swiper,ShopItem,viewpager,isLogin) {
		
		// 搜索功能
		class Index {
			constructor (){
				this.textfield = $("#textfield");
				this.search();
			}
			search () {
				this.textfield.on("keyup", function () {
					let keyWord = $(this).val();
					// getJSON可以完成jsonp跨域，数据返回了自动调用后面的回调
					$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWord, res => {
						let list = res.s;
						console.log(list);
						let ul = $("<ul>");
						list.forEach( function(item, index) {
							$("<li>").html(item).appendTo(ul);
						});
						$("#search_result_search_fm").empty().show().append(ul);
					})
				})
			}
			
		}

		new Index();

	})
})