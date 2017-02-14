/**
 * Created by john on 2017/2/12.
 */
var breaklength=5;
var sessionlength=30;
$(function(){
    //add_breaklength
    $("#add_breaklength").click(function(){
        if(stop){
            $(".dis_breaklength").html(++breaklength);
        }

    });
    //decrease_breaklength
    $("#decrease_breaklength").click(function(){
        if(breaklength>1){
            $(".dis_breaklength").html(--breaklength);
        }
    });
    //add_sessionlength
    $("#add_sessionlength").click(function(){
        if(stop){
            start=false;
            $(".ddf>span:nth-child(2)").css("left",100);
            $(".mask").css("top",300);
            $(".dis_sessionlength").html(++sessionlength);
            $(".ddf>span:nth-child(2)").html(sessionlength);
        }

    });
    //decrease_sessionlength
    $("#decrease_sessionlength").click(function(){
        if(stop){
            start=false;
            $(".ddf>span:nth-child(2)").css("left",100);
            $(".mask").css("top",300);
            if(sessionlength>1){
                $(".dis_sessionlength").html(--sessionlength);
                $(".ddf>span:nth-child(2)").html(sessionlength);
            }
        }

    });

    //div_container_change
    var stop=true;
    var start=false;
    var sss=0;
    var m,s;
    var seconds;
    var animate=false;
    var bre=false;
    $(".ddf").click(function(){
        if(!start){
            seconds=sessionlength*60-1;
            console.log(seconds);
            sss=setInterval(change_text,1000);
            start=true;
            stop=false;
            setTimeout(function(){
                $(".ddf>span:nth-child(2)").css("left",30);
            },1000);
        }
        else if(!stop){
            clearInterval(sss);
            stop=true;
            $(".mask").stop(true);
        }
        else if(stop){
            sss=setInterval(change_text,1000);
            stop=false;
            if(animate){
                $(".mask").animate({top:0},seconds*1000+1000,"linear");
            }

        }

    });
    //change the span time

    function change_text(){
        if(!bre)
        {
            if(seconds==sessionlength*60-1){
                $(".ddf>span:nth-child(1)").html("Session");
                $(".ddf>span:nth-child(1)").css("left",70);
            }
            if(seconds==59)
            {
                $(".mask").animate({top:0},seconds*1000+1000,"linear");
                animate=true;
            }
            m=parseInt(seconds/60);
            s=seconds%60;
            if(m<10)
                m="0"+m;
            if(s<10)
                s="0"+s;
            $(".ddf>span:nth-child(2)").html(m+":"+s);
            if(seconds<=0)
            {
                $(".mask").stop(true);
                $(".mask").css("top",300);
                bre=true;
                seconds=breaklength*60;
            }
        }
        else{
            if(seconds==breaklength*60-1){
                $(".ddf>span:nth-child(1)").html("Break");
                $(".ddf>span:nth-child(1)").css("left",80)
                $(".mask").addClass("red");
                $(".mask").animate({top:0},seconds*1000+1000,"linear");
            }
            m=parseInt(seconds/60);
            s=seconds%60;
            if(m<10)
                m="0"+m;
            if(s<10)
                s="0"+s;
            $(".ddf>span:nth-child(2)").html(m+":"+s);
            if(seconds<=0)
            {
                $(".mask").stop(true);
                $(".mask").css("top",300);
                bre=false;
                seconds=sessionlength*60;
                $(".mask").removeClass("red");
            }
        }
        seconds--;
        console.log(seconds);
    }




});



