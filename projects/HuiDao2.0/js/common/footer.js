/*当游览器宽度改变时，每1秒执行一次下列函数*/
$(function(){setTimeout(onWidthChange,1000);});
 
function onWidthChange()
{
    if( $(window).width() < 990 ) {
    	$("#footer").css("padding-top","10px");
    }else if($(window).width() > 990){
    	$("#footer").css("padding-top","18px");
    }
    setTimeout(onWidthChange,1000);
}