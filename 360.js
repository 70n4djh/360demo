$(function(){
    var curIndex= 0;
    var t;
    var slides=$(".slide-tn");
    var bgPics=$(".slide-pic");
    var loop=setInterval(carousel,2000);
    var timer;
    function carousel(){
        if(curIndex<(slides.length-1))
        {
            curIndex++;
            fadeInOut(curIndex,curIndex-1);
        }else{
            curIndex=0;
            fadeInOut(curIndex,slides.length-1);
        }
        for(var i=0;i<slides.length;i++){
            if(i==curIndex){
                slides.eq(curIndex).addClass('on');
            }else{
                slides.eq(i).removeClass('on');
            }
        }
    }

    $(".slide-tn").on('mouseover',function() {
        clearInterval(loop);
        if(curIndex!=$(this).index()){
            for(var i=0;i<bgPics.length;i++){
                if(i!=curIndex||i!=$(this).index()){
                    bgPics[i].style.opacity= 0;
                }
            }
            fadeInOut($(this).index(),curIndex);
        }

        for(var i=0;i<slides.length;i++) {
            if (i == curIndex) {
                slides.eq($(this).index()).addClass('on');
            } else {
                slides.eq(i).removeClass('on');
            }
        }
    })
    $(".slide-tn").on('mouseout',function(){
        clearTimeout(loop);
        loop=setInterval(carousel,2000);

    });

    $(".slide-pic").on('mouseout',loop);

    $(".slide-pic").on('mouseover',function() {
        clearInterval(loop);
       /* if(curIndex!=$(this).index()){
            for(var i=0;i<bgPics.length;i++){
                if(i!=curIndex||i!=$(this).index()){
                    bgPics[i].style.opacity= 0;
                }
            }
            fadeInOut($(this).index(),curIndex);
        }*/
    });

    function fadeInOut(precur,oldcur){
        clearInterval(t);
        var value= 0;
        value=parseFloat(bgPics[precur].style.opacity);
        t=setInterval(
            function(){
                if (value <= 1) {
                    value+=0.1;
                    bgPics[precur].style.opacity = value;
                    bgPics[oldcur].style.opacity=(1 - value);
                }
                else {
                    bgPics[oldcur].style.opacity= 0;
                    bgPics[precur].style.opacity= 1;
                    clearInterval(t);
                }
            },50 );
        curIndex = precur;
    }
})

//var timerloop=setInterval(autoAlt,3000);

/**
 * Created by Administrator on 2015/7/17.
 */
//var $ = require("jquery");
var curIndex= 0;
var t;
var timerloop=setInterval(autoAlt,3000);
var fadeInTimer,fadeOutTimer;
var bigPic=$(".slide-pic"),
    tn=$(".slide-tn"),
    inputText=$(":text");

$(".side-item").hover(
    function(){
        $(this).parent().children().removeClass("current");
        $(this).addClass("current");
    }
);

inputText.focus(
    function () {
        $(this).addClass("focus-on");
    }
);
inputText.blur(
    function () {
        $(this).removeClass("focus-on");
    }
);
$(".scroll-right").click(
    function(){
        $(this).parent().children().removeClass("current-day");
        $(this).addClass("current-day");
    }
);

tn.on("mouseover",
    function() {
        clearInterval(timerloop);
        var precur = $(this).index();
        if(curIndex!=precur){
            for(var i=0;i<bigPic.length;i++){
                if(i!=curIndex && i!=$(this).index()){
                    bigPic[i].style.opacity= 0;
                }
            }
            fadeInOut();
        }
        $(this).parent().children().removeClass("on");
        $(this).addClass("on");
        bigPic.parent().children().removeClass("pic-on");
        bigPic.eq($(this).index()).addClass("pic-on");
    }
);
tn.on("mouseout",
    function(){
        clearInterval(timerloop);
        timerloop=setInterval(autoAlt,3000);
    }
);

bigPic.on('mouseout',timerloop);

bigPic.on('mouseover',function() {
    clearInterval(timerloop);

});

function autoAlt(){
    var precur=(curIndex+1)%9;
    tn.parent().children().removeClass("on");
    bigPic.parent().children().removeClass("pic-on");
    tn.eq(precur).addClass("on");
    bigPic.eq(precur).addClass("pic-on");
    fadeInOut();
    curIndex=precur;
};

function fadeInOut(){
    bigPic.each(function() {
        if ($(this).hasClass("pic-on"))     {
            fadeIn(this);
            curIndex=$(this).index();
        }//fadein to 1
        else {
            if($(this).css("opacity")>0)   fadeOut(this);    //fadeout to 0
        }
    });
}

function fadeIn(pic){
    clearInterval(fadeInTimer);
    var target=1;
    var opacity=0;
    fadeInTimer=setInterval(function(){
        if(opacity>=target){
            clearInterval(fadeInTimer);
            pic.style.opacity=target;
        }
        else{
            opacity=parseFloat(pic.style.opacity);
            opacity+=0.1;
            pic.style.opacity=opacity;
        }
    },50);
}

function fadeOut(pic){
    clearInterval(fadeOutTimer);
    var target=0;
    var opacity=1;
    fadeOutTimer=setInterval(function(){
        if(opacity<=target){
            clearInterval(fadeOutTimer);
            pic.style.opacity=target;
        }
        else{
            opacity=parseFloat(pic.style.opacity);
            opacity-=0.1;
            pic.style.opacity=opacity;
        }
    },50);
}


