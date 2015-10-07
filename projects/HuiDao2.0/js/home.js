$(document).ready(function(){
	$("#left-container").height($(window).height()-70);
	
	if($(window).width()<770){
		/*对f作调整*/
		$("#item-f-img").css("max-height","300px");
		$("#item-f-des").css("max-height","270px");
		$("#item-f-des").css("margin-top","30px");
		/*对h作调整*/
		$("#item-h-img").css("max-height","300px");
		$("#item-h-des").css("max-height","270px");
		$("#item-h-des").css("margin-top","30px");
		/*对g作调整*/
		$("#item-g-img").css("max-height","300px");
		$("#item-g-des").css("max-height","270px");
		$("#item-g-des").css("margin-top","30px");
	}
	
	/*fullPage*/
	$(function(){
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': true,
        /*'sectionsColor': ['#254875', '#00FF00', '#254587', '#695684'],*/
        anchors: ['page1', 'page2', 'page3', 'page4','page5', 'page6', 'page7', 'page8','page9'],
        'navigation': true,
        'navigationPosition': 'right',
        /*'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple']*/
    })
})
});