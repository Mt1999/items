define(["jquery"], $ => {
	class Footer {
		constructor () {
			this.init().then(() => {
				this.bottom();
			});
		}
		init () {
			return new Promise(resolve => {
				$("#footer-container").load("/html/module/footer.html", () => {
					resolve();
				})
			})
		}

		bottom () {
			//底部二维码移入效果
			$('.footerConcern-us .WeChat').hover(function(){
				$('.footerConcern-us .code').fadeIn();
			},function(){
				$('.footerConcern-us .code').fadeOut();
			});
		}

	}
	return new Footer();
})