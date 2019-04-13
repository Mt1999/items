require(["require.config"], () => {
  require(["jquery", "template", "cookie","header", "footer"], ($, template,header) => {
    function Cart () {
    //   $.cookie.json = true;
			// this.cartt = $.cookie("cart") || [];
			this.init();
			
    }
    $.extend(Cart.prototype, {
      init () {
        this.cart = JSON.parse(localStorage.getItem("cart"));
				
			
			
				this.render();
      },
      render () {
        var html = template("cart-template", {cart: this.cart});
        console.log(html);
				$(".listItem___3aUCt").html(html);
				this.addListenter();
				
			},
			//注册事件监听
			addListenter() {
				 //删除选购的商品
				 $(".body___2MMoL").on("click","#cartdel",this.delProductHandler.bind(this))
			},
			//删除购物车中商品的处理
			delProductHandler(event){
				//找出"删除"所在行
				//  $(".body___2MMoL") = $(event.target).parents("li");
				//待删除商品的id
				const id = $li.data("id");
				//在购物车的数组中删除指定id的商品
				this.cart = this.cart.filter(curr=>{
						if(curr.id === id)
								return false;
						return true;
				})
				//将删除后的数组重新保存会cookie
				$.cookie("cart",this.cart,{expires:7,path:"/"});
				//删除DOM树中的行
				$li.remove();
				//购物车中没有商品时，更新购物车样式
				if(this.cart.length == 0){
						$("ul.rug-list").addClass("hidden")
						$("div.empty").removeClass("hidden")
				}
				//更新合计
				this.totalPrice()
				//修改购物车数量
				$("shopping.cart").find("span").text(this.cart.length);
			}
    })
    new Cart();
  })
})