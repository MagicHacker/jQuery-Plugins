/*Tab插件*/
;(function ($) {

    //定义默认参数
    var defaults = {
        type:'click',//触发模式
        switchMode:'default',//切换模式
        defaultItem:2, //默认显示项
        autoPlay:3000//自动播放
    };
    //面向对象
    function Tab(options){
        //创建tab中的this对象
        var _this = this;
        this.index = 0;
        //列表集合
        this.tabItems = $('ul.tab-nav li');
        //内容集合
        this.contentItems = $('div.con-wrap > div.conItems');
        //合并参数
        this.config = $.extend({},defaults,options);
        if(this.config.type === 'click'){
            this.tabItems.on('click',function(){
                _this.changeItems($(this));
            });
        }else if(this.config.type === 'mouseover' || this.config.type != 'click'){
            this.tabItems.on('mouseover',function () {
                _this.changeItems($(this));
            })
        }
    };
    //重写Tab的原型对象
    Tab.prototype = {
        //手动指定constructor
        constructor:Tab,
        changeItems:function(currentTab){
            this.index = currentTab.index();

            currentTab.addClass('active').siblings().removeClass('active');

            if(this.config.switchMode === 'default' || this.config.switchMode != 'fade'){

                this.contentItems.eq(this.index).addClass('currentItems').siblings().removeClass('currentItems');

            }else if(this.config.switchMode === 'fade'){

                this.contentItems.eq(this.index).fadeIn().siblings().fadeOut();
            }

        }

    };
    //注册到jQuery对象上
    $.fn.extend({
        tab:function(opt){
            new Tab(opt);
            //形成链式调用
            return this;
        }
    });
})(jQuery);