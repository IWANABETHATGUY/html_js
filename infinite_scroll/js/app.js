	var count=1;
var it=true;
$(function(){

	for(var i =0;i<30;i++){
		$('.comment_list').append('<li>item'+count+++'</li>');
	}
	setTimeout(function(){
		$('#container').append("<div class='footer'></div>");
	},100)
	$(window).scroll(function(){
		if(it){
			var win_sc=$(this).scrollTop();
			var win_height=$(window).innerHeight();
			if(win_sc+win_height==$(document).height()){
				it=false;
				$('.footer').append("<div class='spinner'>"+
					"<div class='box box_1'></div>"+
					"<div class='box box_2'></div>"+
					"<div class='box box_3'></div>"+
					"<div class='box box_4'></div>"+
					"<div class='box box_5'></div>"+
					"</div>")
				setTimeout(add,2000);
				setTimeout(function(){
					$('#container').append("<div class='footer'></div>");
				},2100);
			}
		}

	})
})

function add (){
	for(var i =0;i<10;i++){
		$('.comment_list').append('<li>item'+count+++'</li>');
	}
	$('.footer').remove();
	it=true;
}
