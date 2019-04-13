require.config({
	baseUrl: "/",
	paths : {
		"jquery" : "lib/jquery/jquery-3.2.1",
		"header" : "js/module/header",
		"footer" : "js/module/footer",
		"url" : "js/module/url",
		"template" : "lib/art-template/template-web",
		"Swiper" : "lib/swiper/js/swiper",
		"zoom" : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		"side" : "js/module/side",
		"viewpager" : "js/module/viewpager",
		"isLogin" : "js/isLogin",
		"addToCart" : "js/module/addToCart",
		"fly" : "lib/jquery-plugins/jquery.fly.min",
		"cookie" : "lib/jquery-plugins/jquery.cookie"
	},
	// 垫片，不满足AMD规范的模块，但是又依赖于另外的模块
	shim : {
		"zoom" : {
			deps: ["jquery"]
		},
		"cookie" : {
			deps: ["jquery"]
		},
		"fly" : {
			deps : ["jquery"]
		}
	}

})