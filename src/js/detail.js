require(["require.config"], () => {
  require(["jquery", "url", "template", "addToCart","header", "zoom","footer" ], ($, url, template,addToCart,header,zoom) => {
    class Detail {
      constructor () {
        this.init();
				
        
      }

      init () {
        // 获取id，然后请求数据
        //location.search = ?id=23
        let id = location.search.slice(4);
        // console.log(id)
        // 带着id请求详情页数据
        $.ajax({
          url: url.baseUrl+"detail?id="+id,
          method: "GET",
          dataType: "json",
          success :  res => {
            
            if(res.res_code === 1){
              // 保存当前商品数据
              // this.detail = res.res_body.data; 
              let id = res.res_body.data[location.search.slice(4)-1];
              
              // 由于rap2返回的id都一样，所以要手动的修改当前数据的id，真实开发中不用写这行代码
               this.detail = id;
            
              // 渲染详情页
              this.render(res.res_body.data[location.search.slice(4)-1])
              
							this.zoom();
            }
          }
      
        })
      }
      render (data) {

        // console.log(data[location.search.slice(4)-1])
        // console.log(data)
        var html = template("detail-template", {...data});
        // console.log(html)
        $(".wrap").html(html);
        // 绑定事件
        this.toCart();
      }
      zoom () {
        // 放大镜插件
        $(".zoom-img").elevateZoom({
            gallery:'gal1',
            cursor: 'pointer',
            galleryActiveClass: 'active',
            borderSize:'1',    
            borderColor:'#888'
        });
				
      }
      toCart () {
        // 加入购物车 
				//.product-buy 大盒子
        //addcart 加入购物车
       addToCart($(".product-buy"),"#addcart",this.detail);
      }
    }
    new Detail();
  })
})