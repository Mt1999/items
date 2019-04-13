define(["jquery", "fly"], () => {
  // container指的是包含加入购物车按钮的父级容器盒子
  // btnSelector指的是容器里面的添加购物车按钮的选择器
  // detail 要添加到购物车的那条数据this.list[0]
  // isList是否来自于列表的加入购物车
  return function (container, btnSelector, detail, isList) {
     // 加入购物车
     container.on("click", btnSelector, function (e) {
       if(isList) {
          // detail没有传递，那么从列表上的DOM去获取当前商品的信息
          var $li = $(this).parent();
          detail = {
            id : $(this).attr("id"),
            imgs : $li.find("imgs").attr("src"),
            title : $li.find("h2").html(),
            price: $li.find("h3").html()
          }
         
       }
       
       console.log(detail);
      // 存数据之前先取
      let cart = localStorage.getItem("cart");
      if(cart) {
        cart = JSON.parse(cart);

        // 购物车已经有数据
        // 判断购物车里是否已经存在当前数据
        let index;
        if(cart.some((item, i) => {
          index = i;
          return item.id == detail.id;
        })){
          // 索引为index的这条数据就是当前数据
          cart[index].num++;
        }else{
          // 购物车里还没有加过当前数据
          
          cart.push({...detail, num : 1});
        }
        localStorage.setItem("cart" , JSON.stringify(cart));
      }else{
        localStorage.setItem("cart", JSON.stringify([
          {...detail, num : 1}
        ]));
      }
      // console.log(JSON.parse(localStorage.getItem("cart")));
      // 抛物线飞入购物车
      $(`<div style="width:40px;height:40px"><img style="width:40px;height:40px" src="{{imgs}}"></div>`).fly({
        start:{
          left: e.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
          top: e.clientY,  //开始位置（必填）
        },
        end:{
          left: $(window).innerWidth() - 33, //结束位置（必填）
          top: $(".shopping").position().top  //结束位置（必填）
          
        },
        autoPlay: true, //是否直接运动,默认true
        speed: 1.3, //越大越快，默认1.2
        vertex_Rtop: 20, //运动轨迹最高点top值，默认20
        onEnd: function(){
          this.destroy(); // 把运动的小方块销毁
          // 购物车数量加1
          $("#sidebarcartnum").html(Number($("#sidebarcartnum").html())+1);
          //结束回调
        } 
      })
		})
  }
  
})