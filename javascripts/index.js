/*By 金徐明
 * QQ:709298562
 * E-mail:fly_fish_jxm@163.com
 * */


/*变更信息：
 *2015-6: 创建
 *2015-7：优化重整
 * */

$(document).ready(function() {
	
	/*图片自动轮转*/
	$("#myCarousel").carousel({
		pause: true,
		interval: 4000
	});

	/* 导航栏定位 纠正函数 */
	$('#nav').affix({
		offset: {
			top: $('header').height() - $('#nav').height()
		}
	});


	$('body').scrollspy({
		target: '#nav'
	})


	$('.scroll-top').click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	})


	$('#nav .navbar-nav li>a').click(function() {
		var link = $(this).attr('href');
		var posi = $(link).offset().top;
		$('body,html').animate({
			scrollTop: posi
		}, 700);
	});


	$('.panel .img-responsive').on('load', function() {
		
	}).each(function(i) {
		if (this.complete) {
			var item = $('<div class="item"></div>');
			var itemDiv = $(this).parent('a');
			var title = $(this).parent('a').attr("title");

			item.attr("title", title);
			$(itemDiv.html()).appendTo(item);
			item.appendTo('#modalCarousel .carousel-inner');
			if (i == 0) {
				item.addClass('active');
			}
		}
	});

	$('#modalCarousel').carousel({
		interval: false
	});

	$('#modalCarousel').on('slid.bs.carousel', function() {
		$('.modal-title').html($(this).find('.active').attr("title"));
	})

	$('.panel-thumbnail>a').click(function(e) {

		e.preventDefault();
		var idx = $(this).parents('.panel').parent().index();
		var id = parseInt(idx);

		$('#myModal').modal('show');
		$('#modalCarousel').carousel(id);
		return false;
	});

});

/*qq、微信等提示弹出*/
$(function() {
	$("[data-toggle='tooltip']").tooltip();
});