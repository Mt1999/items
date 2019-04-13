require(["./require.config"],()=>{
	require(["jquery","template","header","footer"],($,template,header)=>{
		class List{
			constructor(){
				this.getData();	
				this.priceDesc();
			}
            getData(){

				$.get("http://rap2api.taobao.org/app/mock/125278/commodity",(res)=>{
					let data ={list:res.res_body.list}
					console.log(data);
					this.data=data;
					this.loadList();
				})
			}
			loadList(){
				let html =template("list-template",this.data)
				$(".commodity-con-sdws").append(html);
				this.priceDesc();
			}
			priceDesc (){
				//排序
				$(".pricedown").on("click",()=>{
					this.data.list.sort(function(a,b){
						return a.price-b.price;
					})
					this.loadList();
				})
			}
		}
		new List()
	})
})