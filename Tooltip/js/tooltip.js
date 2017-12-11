/**
 * Created by zhangxuan on 2017/10/24.
 */

;(function ($) {
    //面向对象
    function Tooltip(options){

        //默认配置
        var defaults = {
            //消息体
            message:'添加成功',
            //显示时间
            timeout:2000,
            //框的类型
            type:'success',
            //可选配置项
            option:{
                color:'',
                imageUrl:''
            }
        }

        //合并对象，深拷贝
        var config = $.extend(true,{},defaults,options);
        this.load(config);
    };

    //重写原型对象
    Tooltip.prototype ={
        //重新指定constructor
        constructor:Tooltip,
        load:function(config){
            //操作
            $('#message').html(config.message);
            if(config.type === 'error'){
                $('.tooltip-container').css('background','#CB4C17');
                $('.tooltip-circle img').attr('src','../images/error.png');
            }else if(config.type === 'success'){
                $('.tooltip-container').css('background','#0DB8AC');
                $('.tooltip-circle img').attr('src','../images/right.png');
            }else{
                $('.tooltip-container').css('background',config.option.color);
                $('.tooltip-circle img').attr('src',config.option.imageUrl);
            }
            //点击关闭按钮关闭
            $('.tooltip-close').on('click',function(){
                $('.tooltip-container').fadeOut();
            });
            //操作提示框
            if(config.timeout){
                // $('.tooltip-timeout').animate({'width':'0'},config.timeout);
                //到时间提示框自动消失
                setTimeout(function(){
                    $('.tooltip-container').fadeOut(function(){
                        $(this).remove();
                    });
                },config.timeout);
            }
        }
    };
    $.fn.extend({
        tooltip:function(opt){
            new Tooltip(opt);
            return this;
        }
    });
})(jQuery);