/**
 * Created by fakehxj on 17-2-23.
 */
$(function(){
	var is_load=false;
	var json;
	var count=0;

	for(var i=0;i<50;i++)
	{
		var ppp=document.createElement('h1');
		ppp.innerHTML='what the fuck is that i,donk\'t care';
		$('#container').append(ppp);
	}
	document.body.style.overflowY='scroll';
	var mask=$('#mask');
	mask.css({'height':$(document).height(),'width':'100%','background-color':'rgba(0,0,0,0.7)',});
	$('#input').on('focus',function(){
		this.style.width='400px';
		$('#button').css('display','block');
		$('#button').css({'transform':'scale(1)'});

	})
	$('#input').on('blur',function(){
		this.style.width='450px';
		$('#button').css('display','block');
		$('#button').css({'transform':'scale(0)'})
	})
	$('#mask').on('click',function(){
		$('body').css({'overflow-y':'scroll'});
		$('#mask').css({'opacity':0,'z-index':'-1'});
		$('#comment_list').css({'opacity':0,'top':'1000px'})
	})
	$('#button').on('click',function(){
		var val=$('#input').val();
		$('#input').val('');
		$('#list').append('<li class="comment">'+val+'</li>');
	})
	$('#btn').on('click',function(){
		if(!is_load){
			$.getJSON('./test.json',function(data){
				json=data;
				$('#con_num').html(json.data.length+"条评论");
				for(var i=0;i<30;i++){
					$('#list').append('<li class="comment">'+json.data[count++].comment+'</li>')
				}
			})
			is_load=true;
		}
		$('body').css({'overflow-y':'hidden'});
		$('#mask').css({'opacity':0.8,'z-index':1});
		$('#comment_list').css({'opacity':1,'top':'20px'})
		$('#input').focus();
	})
	$('#list').scroll(function(){
		if(count<100){
			var par_pt=$(this).position().top;
			if($('#list> li').last().position().top-par_pt<700){
				for(var i=0;i<10;i++)
				{
					$('#list').append('<li class="comment">'+ json.data[count++].comment+'</li>');
				}
			}
		}

	})
})
