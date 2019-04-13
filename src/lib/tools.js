var  tools = {
    // 获取元素样式
    //@param obj DOMObj 元素对象
    //@param  attr string 样式名称、
    //@return string 返回结果
    getStyle : function (obj,attr) {
        //currentstyle 选中样式
        return obj.currentStyle ?
            obj.currentStyle[attr] :
            getComputedStyle(obj,false)[attr];//得到计算格式
    },
    //获取或者设置内联样式
    // @param obj DOMObj 获取或者设置对象
    // @param attr 
    //     1.string 获取obj的attr属性
    //         @return string 得到的属性值
    //     2. object 设置内联样式
    css : function (obj,attr) {
        //判断attr 是字符串  或者是对象
        if (typeof attr === "string") {
            //获取 返回
            return this.getStyle(obj,attr);
        } else if (typeof attr === "object"){
            //设置
            //for in 
            for (var key in attr) {
                obj.style[key] = attr[key];
            }
        }
    },
    // 计算元素到body边缘的距离
    // @parom obj DOMObj 需要计算的那个dom元素
    // @return object {left ,top }
    getBodyDis : function(obj) {
        var left = 0,
            top = 0;
        //只要父级不是null
        while(obj.offsetParent != null) {
            //加上边框的宽度和offset
            left += obj.offsetLeft + obj.clientLeft;
            top += obj.offsetTop + obj.clientTop;
            //把自己变成自己的父级
            obj = obj.offsetParent;
        }
        //返回
        return {
            "left" : left,
            "top" : top
        };
    },
    // 获取游览器宽高
    // @return object {width , height }
    getBody : function() {
        return {
            width : document.documentElement.clientWidth || document.body.clientWidth,
            height : document.documentElement.clientHeight || document.body.clientHeight
        };
    },
    // 鼠标滚轮事件绑定
    // @param obj DOMObj 绑定滚轮事件的对象
    // @param fn Function 事件处理函数
    mousewheel : function(obj,fn) {
        console.log(obj.onmousewheel);
        //旋转鼠标滚动轮时
        if (obj.onmousewheel !== undefined) {
            obj.onmousewheel = function(e){
                //兼容
                e = e || window.event;
                //判断滚动方向
                if (e.wheelDelta < 0 ) {
                    //向下
                    fn("down");
                } else {
                    fn("up");
                }
            };
        } else {
            //注册侦听器
            obj.addEventListener("DOMMouseScroll" , function(e){
                if (e.detail > 0) {
                   //向下
                   fn("down");
                } else {
                    fn("up");
                }
            });
        }
    },
    // 监听事件
    // @param obj DOMObj 监听事件的对象
    // @param type string 事件手柄
    // @param fn function 事件处理函数
    // @param [isCapturn] boolean 
    //     false 冒泡（默认）
    //     true 事件捕获
    on : function(obj , type , fn , isCapturn) {
        //判断iscapturn 是不是undefined
        if(isCapturn === undefined) isCapturn = false;
        //将指定函数绑定到事件
        if (obj.attachEvent) {
            //IE只能在冒泡阶段处理事件
            obj.attachEvent("on" + type , fn );
        } else {
            obj.addEventListener(type , fn , isCapturn );
        }
    },
    // 移除事件监听
    // @param obj DOMObj 移除监听事件的对象
    // @param type string 事件手柄
    // @param fn function 事件处理函数
    off : function(obj , type , fn ) {
        //从事件中取消指定函数的绑定
        if (obj.detachEvent) {
            obj.detachEvent("on" + type, fn );
        } else {
            obj.removeEventListener(type , fn );
        }
    },
    // 元素匀速运动事件
    // @param obj DOMObj 运动的dom元素
    // @param attr string 运动的属性
    // @param end number 终点值
    // @param duration number 运动时间
    move : function(obj , attr , end , duration ) {
        //每一次进来之前需要把上一次的定时器清除
        clearInterval(obj.timer);
        //开始值
        var start = parseInt(this.getStyle(obj , attr ));
        //总距离
        var distance = end - start;
        //总步数
        var steps = Math.floor(duration / 30 );
        //速度（m每一步的距离）
        var speed = distance / steps;
        //timer需要唯一，写在对象属性上面
        obj.timer = setInterval(function() {
            //往前走一步
            start += speed;
            //判断
            if(distance <= speed ){
                start = end;
                clearInterval(obj.timer);
            }
            obj.style[attr] = start + "px";
        },30);
    },
    // 让元素在body里面绝对居中
    // @param obj DOMObj 需要居中的那个元素
    showCenter : function(obj){
        //需要居中的那个元素 上面添加设置 绝对定位
        obj.style.position = "absolute";
        var _this = this;
        //window 大小改变时
        window.onresize = (function center(){
            var left = (_this.getBody().width - obj.offsetWidth) / 2,
                top = (_this.getBody().height - obj.offsetHeight) / 2;
            _this.css(obj,{left : left + "px", top : top + "px" });
            return center;
        })();
    },
    // cookie 的操作（存取）
    // @param key string 存取的key值
    // @param [value] string 
    //     如果传入value, 那就是存cookie
    //     不是那就取cookie
    // @param [option] object { expires , path}
    // @return string 取cookie的时候返回的当前cookie的值
    cookie : function (key , value, option) {
        if (value === undefined) {
            //取cookie
            var cookie = document.cookie;
            var arr = cookie.split("; ");//分割
            var obj = {};//创建一个数组来存
            arr.forEach(function(ele) {
                var subarr = ele.split("=");
                obj[subarr[0]] = decodeURIComponent(subarr[1]);//解码
            })
            //判断
            return obj[key] ? obj[key] : "";
        } else {
            //存cookie
            var str = key + "=" + encodeURIComponent(value);//编码
            //判断
            if(option){
                //path
                if (option.path) {
                    str += ";path=" + option.path;
                } 
                if (option.expires) {
                    var date = new Date();//得到当前时间
                    //把过期日期设置为option.expires天之后
                    date.setDate(date.getDate() + option.expires);
                    str += ";expires=" + date;
                }
            }
            document.cookie = str;
        }
    },
    // ajax 请求get
    // @param url 地址 string 请求的路径
    // @param query  object 请求的参数query
    // @oaram  succCb  function   请求成功的回调函数
    // @pamam failCb function 请求失败的回调
    //@param isJson boolean 
    //    true : 解析json 默认
    //    false : 文本请求
    ajaxGet : function (url,query,succCb,failCb,isJson) {
        //拼接URL 加 query
        //判断query是否存在
        if(query){
            url += "?";
            for(var key in query ){
                url += key + "=" + query[key] + "&";
            }
            //把最后一个 & 删除
            //length - 2
           url = url.slice(0,-1);
        }
        //1.创建对象
        var ajax = new XMLHttpRequest();
        //2.建立连接
        ajax.open("GET",url,true);
        //3.发送请求
        ajax.send(null);
        //4.监听状态的改变
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 ) {
                if(ajax.status === 200){
                    //用户传了回调才执行
                    // isJson默认值为true，要解析json
                    if(isJson === undefined){
                        isJson = true;
                    }
                    var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
                    succCb && succCb(res);
                }else{
                    //请求失败
                    failCb && failCb();
                }
            } 
        }
    },
    // ajax 请求post
    // @param url 地址 string 请求的路径
    // @param query  object 请求的参数query
    // @oaram  succCb  function   请求成功的回调函数
    // @pamam failCb function 请求失败的回调
    //@param isJson boolean 
    //    true : 解析json 默认
    //    false : 文本请求
    ajaxPost : function(url,query,succCb,failCb,isJson) {
        //1.创建一个对象
        var ajax = new XMLHttpRequest();
        //2.建立连接
        ajax.open("POST",url,true);
        //设置请求头数据传输格式
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //把query拼接成 urlencoded
        var str = "";
        for(var key in query) {
            str += key + "=" + query[key] + "&";
        }
        str = str.slice(0,-1);
        //3.发送请求
        ajax.send(str);
        //4.监听状态的改变
        ajax.onreadystatechange = function () {
            //readyState 准备状态
            if (ajax.readyState === 4 ) {
                //状态栏
                if (ajax.status === 200 ) {
                    // 判断isJson 是否传进去了
                    isJson = isJson === undefined ? true : isJson;
                    succCb && succCb(isJson ? JSON.parse(ajax.responseText) : ajax.responseText );
                }
            }
        }
    },
    // jsonp ajax 请求
    // @param url string 请求路径
    // @param cb string 全局函数名
    // @param query object 请求参数
    ajaxJsonp : function(url,cb,query) {
        //1.创建script标签
        var script = document.createElement("script");
        //2.拼接URL和回调函数+ 请求参数
        url += "?cb" + cb;
        if (query) {
            for(var key in query ) {
                url += "&" + key + "=" + query[key];
            }
        }
        //3.设置script的src属性
        script.src = url;
        //4.把script添加到body里面
        document.body.appendChild(script);
        //传入的同时，需要删除
        document.body.removeChild(script);
    },
    //promise 许诺
    // @param url string 请求路径
    // @param query object 请求参数
    //@param isJson boolean 
    //    true : 解析json 默认
    //    false : 文本请求
    ajaxGetPromise : function(url,query,isJson) {
        return new Promise(function(resolve,reject) {
            //拼接url和query
            if (query) {
                url += "?";
                for(var key in query) {
                    url += key + "=" + query[key] + "&";
                }
                //最后一个&删除
                url = url.slice(0,-1);
            }
            //1.创建对象
            var ajax = new XMLHttpRequest();
            //2.建立连接
            ajax.open("GET",url,true);
            //3.发送请求
            ajax.send(null);
            //4.监听状态的改变
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4 ) {
                    //用户传了的回调才执行
                    if (ajax.status === 200 ) {
                        //isJson默认为true，要解析json
                        if (isJson === undefined ) {
                            isJson = true;
                        }
                        var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
                        resolve(res);
                    }else{
                        //请求失败
                        reject();
                    }
                }
            }
        })
    }
}