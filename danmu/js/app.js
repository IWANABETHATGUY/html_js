/**
 * Created by john on 2017/2/13.
 */
var is_scale=false;
var bofang=true;
$(function(){
    //定时保持滚动条在底部
    //查看当前display_mask 有多少弹幕,清楚在屏幕外的弹幕
    setInterval(function(){
        var timestamp = Date.parse(new Date())/1000;
        console.log($(".display_mask>p").length);
        $(".display_mask>p").each(function(){
            if(timestamp-$(this).attr("time")>=14){
                $(this).remove();
            }
        })
    },15000);

    //for testing ....
    var arr=["what","666","shit","what the fuck","deep dark fantancy"];
    var ttt=setInterval(function(){
        var text=arr[parseInt(Math.random()*5)];
        $(".list").append("<li>"+text+"</li>");
        send(text);
    },parseInt(Math.random()*100+300));
    //是弹幕列表的滚动条始终保持在弹幕列表的底部
    var sss=setInterval(function(){
        $(".list").scrollTop($(".list")[0].scrollHeight);
    },100);
    //当发送执行
    $(".input.send").click(function(){
        if($(".input.input_text").val()){
            var text=$(".input.input_text").val();
            self_send(text);
            $(".list").append("<li>"+$(".input.input_text").val()+"</li>");
            $(".input.input_text").val("");

        }

    })
    //clear

    $(".input.input_text").focus(function(){
        $(document).keydown(function(e){
            if(e.keyCode== 13)
                $(".input.send").click();
        })
    })

    //放大按钮
    $(".btn_scale").click(function(){
        scale();
    })
    // 放大后的弹幕发送栏
    //双击display_box
    $(".display_box,.display_mask").dblclick(function(){
        scale();
    })
    $(".slide-two label").click(function(){
        if($("#slideTwo").is(":checked")){
            $(".display_mask").html("");
            $(".display_mask").css("display","none");
        }
        else{
            $(".display_mask").html("");
            $(".display_mask").css("display","block");
        }

    })
    //控制播放暂停按键
    $("a.btn_radio").click(function(){
        if(bofang){
            $(this).removeClass("btn_zanting")
                .addClass("btn_bofang");
            $(this).find("i").removeClass("icon-iconfontcolor96")
                .addClass("icon-bofang");
            bofang=false;
        }
        else{
            $(this).removeClass("btn_bofang")
                .addClass("btn_bofang");
            $(this).find("i").removeClass("icon-bofang")
                .addClass("icon-iconfontcolor96");
            bofang=true;
        }

    });
    //音量控制条
    $(".icon_list>li:nth-child(5)").hover(function(){
        $(".ddf").css("display","block");
    })
    $(".icon_list>li:nth-child(5)").mouseleave(function(){
        $(".ddf").css("display","none");
    })
    //静音
    $(".icon_list>li:nth-child(5)").click(function(){
        $(this).
    })
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        orientation:"vertical",
        range:"min",
        min:0,
        max:100,
        value:30,
        slide:function(event,ui){
            $(".ddf>span").text(ui.value);
        }

    });
    $(".ddf>span").text($("#slider").slider("value"));
})
//    send函数
function send(text){
    var ele=document.createElement("p");
    ele.innerHTML=text;
    ele.style.color=random_color();
    ele.style.position="absolute";
    ele.style.top=random_top();
    ele.style.animation="move 10s linear";
    ele.style.whiteSpace="nowrap";
    ele.setAttribute("time",Date.parse(new Date())/1000);
    ele.style.animationFillMode="Forwards";
    $(".display_mask").append(ele);
}
function self_send(text){
    var ele=document.createElement("p");
    ele.innerHTML=text;
    ele.style.color=random_color();
    ele.style.position="absolute";
    ele.style.top=random_top();
    ele.style.animation="move 10s linear";
    ele.style.whiteSpace="nowrap";
    ele.style.animationFillMode="Forwards";
    ele.style.border="1px solid "+random_color();
    ele.setAttribute("time",Date.parse(new Date())/1000);
    $(".display_mask").append(ele);
}
// 随机颜色函数
function random_color(){
    var r=parseInt(Math.random()*256);
    var g=parseInt(Math.random()*256);
    var b=parseInt(Math.random()*256);
    return "rgb("+r+","+g+","+b+")";
}
//随机高度函数
function random_top(){
    if(!is_scale){
        var re=parseInt(Math.random()*400);
        re=re-re%16;
        return re+"px";
    }
    else{
        var re=parseInt(Math.random()*730);
        re=re-re%16;
        return re+"px";
    }

}
//缩放函数
function scale(){
    if(!is_scale){
        $("body").css("background-color","#000");
        $(".container").css({"height":"730px","width":"1000px","margin":"0 auto"})
        $(".list").css("display","none");
        $("#small-input-box").css("display","none");
        $(".display_box").css({"height":"730px","width":"1000px","top":"0px","left":"0px"});
        $(".display_mask").css({"height":"730px","width":"1000px","top":"0px","left":"0px"});
        $(".mask").css({"width":"1000px","right":"0px"});
        $(".lead_slider").css({"width":"1000px"});
        $(".container>.lead_slider").append("#box_box");
        is_scale=true;
    }
    else{
        $("body").css("background-color","#fff");
        $(".container").css({"height":"400px","width":"100%","margin":"40px auto"});
        $(".list").css("display","block");
        $(".input_box").css("display","block");
        $(".display_box").css({"height":"400px","width":"700px","left":"300px"});
        $(".display_mask").css({"height":"400px","width":"700px","left":"300px"});
        $(".mask").css({"width":"700px","right":"534.5px"});
        $(".lead_slider").css({"width":"700px"});
        is_scale=false;

    }

}
