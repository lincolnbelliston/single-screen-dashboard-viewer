$(document).ready(function(){

	scale();
	$(window).on('resize',function(){scale()});
	$(document).on('scroll',function(){reposition()});
	$('#b1').click();
	barDisappear();
	
	$(window).mousemove(function(event){barAppear()});
	$('#full-screen-container').mouseenter(function(event){barDisappear()});
	
	$('#pin').click(function(){clickPin()});
	$('#pin').hover(function() {
		$('#pin').css({
			'border-style':'solid',
			'border-color':'black'

		})
	}, function () {
		$('#pin').css({
			'border-style':'none'
		})		
	});	
	
	$(".bb").hover(function(event) {
		if (small_h - $(event.target.parentNode).outerHeight() < 3) {
			$(event.target.parentNode).css({
				'border-style':'solid',
				'border-color':'black',
				'border-width':'1px'
				
			});
		}
	}, function() {
		if (small_h - $(event.target.parentNode).outerHeight() < 3){
			$(event.target.parentNode).css('border-style','none');
		};
	});	
});

var w;
var h;
var clicked_h;
var small_w;
var small_h;
var squeezeX;
var dimX;
var dimY;

// scale the iframe to fit browser window. Dashboards were designed for 1080 x 1920 resolution, so we scale accordingly.
function scale() {
	w = $(window).width();
	h = $(window).height();
	clicked_h = h/18;
	small_h = (h-clicked_h)/6
	small_w = small_h*(1920/1080);
	dimX = w/1920;
	dimY = h/1080;
	var smallY = small_h/1080;
	squeezeX = (w - small_w)/1920;



/* 	// this code limits scaling so that the dashboard will stop shrinking and scrollbars will appear when it passes a certain threshold
	if (dimY < 0.76){
		dimY = 0.76;
		$('body').css('overflow-y','scroll');
	} else {
		$('body').css('overflow-y','hidden');
	}

	if (dimX < 0.76){
		dimX = 0.76;
		$('body').css('overflow-x','scroll');
	} else {
		$('body').css('overflow-x','hidden');
	}

	if (squeezeX < 0.76) {
		squeezeX = 0.76;
		$('body').css('overflow-x','scroll');
	} else {
		$('body').css('overflow-x','hidden');
	}
*/


	
	if (clicked == true){
		$('#full-screen').css('transform','scale('+squeezeX+', '+dimY+')');
		$('#full-screen-container').css('left',small_w);
	} else{
		$('#full-screen').css('transform','scale('+dimX+', '+dimY+')');
	};
	$('#full-screen-container').css('height',h);
	$('#bar').find('iframe').css('transform','scale('+smallY+')');
	$('#bar').children().css({
		'height': small_h,
		'width': small_w
	});
	$('#bar').css({
		'top':-h,
		'width': small_w
	})
	$("#pin").css({
		top: small_h/8,
		left: 7/8*small_w
	});

}

var show_id = '#c1';
var hide_id;

// when a thumbnail is clicked, send it to the main iframe
function makeFullscreen(event){
	 
	document.getElementById("full-screen").src = event.target.childNodes[1].src;
	$(show_id).animate({height: small_h},'fast');
	$(show_id).css('border-style','none');
	
	hide_id = '#' + event.target.parentNode.id;
	$(hide_id).animate({height: clicked_h},'fast');
	$(hide_id).css({
		'border-style':'solid',
		'border-color':'blue',
		'border-width':'3px'
	});
	
	show_id = hide_id;
}

var first = true;
var border = '#cc';


// show sidebar when mouse gets within 1/6 sidebar width of left edge of browser
function barAppear(){
	
	if (event.pageX < small_w/6){
		$('.aa').show('fast');
		$('.bb').css('pointer-events','auto');
		$('#bar').css({
			'width':small_w,
			'overflow':'visible',
			'pointer-events':'auto'
		});
		$('#pin').show();
		if (first == true) {
			$(border).css({
				'border-style':'solid',
				'border-color':'blue',
				'width':small_w
			});
		first = false;
		};
	};
};

var fix = false;

// hide sidebar when mouse leaves
function barDisappear(){
	if (fix == false) {
		$('.cc').each(function() {
			if ($(this).css('border-style') == 'solid') {
				border = '#' + this.id;
			}
		});
		
		$('.aa').hide('fast');
		$('.cc').css({
			'border-style':'none',
			'width':small_w
		});
		$('.bb').css('poitner-events','none');
		$('#bar').css({
			'width':small_w/3,
			'overflow':'hidden'
		});
		$('#pin').hide();
		first = true;
	}
	
	if (clicked == false) {
		$('#full-screen-container').css('left','0px');
		$('#full-screen').css('transform','scale('+dimX+', '+dimY+')');
	}
}

var clicked = false
function clickPin(){
	if (clicked == false) {
		fix = true;
		clicked = true;
		$('#pin').html('<span class="glyphicon glyphicon-triangle-left"></span>');
		$('#full-screen-container').css('left',small_w);
		$('#full-screen').css('transform','scale('+squeezeX+', '+dimY+')');
		
	} else {
		fix = false;
		clicked = false;
		$('#pin').html('<span class="glyphicon glyphicon-pushpin"></span>');
	}
}


// bug fix: dashboard scrolled to the right when dropdown menu was opened. This just moves it back into place.
function reposition(){
	$('body').scrollLeft(0);
}




































