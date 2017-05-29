/**
 * Created by john on 2017/5/29.
 */
"use strict";
//circle
class Circle{
  constructor(x,y,r,i,text,off){
    this.x=x;
    this.y=y;
    this.r=r;
    this.i=i;
    this.text=text;
    this.offset=off;
  }
}
class Stack{
  constructor(){
    this.list=[];
  }
  pop(){
    return this.list.shift();
  }
  push(i){
    this.list.unshift(i);
  }
  empty(){
    return this.list.length===0;
  }
}
let circles=[];
let canvas=document.getElementById("canvas"),
    context=canvas.getContext("2d"),
    reproduce=document.getElementById("reproduce"),
    input=document.getElementById("input"),
    st=new Stack(),
    deep=document.getElementById('inorder');
    
function sleep(time){
  return new Promise((resolve)=>{
    setTimeout(resolve,time);
  })
}
async function glare(i){
  context.save();
  context.beginPath();
  context.arc(circles[i].x,circles[i].y,10,0,Math.PI*2,false);
  context.closePath();
  context.fillStyle="#cc2230";
  context.fill();
  await sleep(2000);
  context.fillStyle="#000";
  context.fill();
  await sleep(200);
}
deep.addEventListener('click',async function(){
  let len=circles.length;
  let cur;
  if(len>0){
    cur=0;
    st.push(cur);
  }
  while(!st.empty()){
    cur=st.pop();
    await glare(cur);
    if(cur*2+2<len&&circles[cur*2+2].text)
      st.push(cur*2+2);
    if(cur*2+1<len&&circles[cur*2+1].text)
      st.push(cur*2+1);
  }
});


reproduce.addEventListener("click",function(){
  circles=[];
  context.clearRect(0,0,canvas.width,canvas.height);
  if(input.value.length)
    test(str_arr(input.value));
  draw_tree();
});
function  draw_tree(){
  let len=circles.length;
  console.log(circles);
  for(let i=0;i<len;i++){
    if(circles[i].text){
      draw_cir(circles[i].x,circles[i].y,10);
      draw_text(circles[i].text,circles[i].x+15,circles[i].y+5);
      if(i*2+1<len&&circles[i*2+1].text){
        draw_line(circles[i].x,circles[i].y,circles[i*2+1].x,circles[i*2+1].y);
      }
      if(i*2+2<len&&circles[i*2+2].text){
        draw_line(circles[i].x,circles[i].y,circles[i*2+2].x,circles[i*2+2].y);
      }
    }
  }
}
function draw_cir(x,y,r){
  context.beginPath();
  context.arc(x,y,r,0,Math.PI*2,false);
  context.closePath();
  context.fill();
}
function draw_line(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.closePath();
  context.stroke();
}
function test(list){
  let len=list.length;
  let num=[];
  num.push(0);
  circles.push(new Circle(canvas.width/2,20,10,0,list[0],canvas.width/4));
  while(num.length){
    let n=num.shift();
    console.log(n);
    if(n*2+1<len){
      if(list[n*2+1]){
        num.push(n*2+1);
        circles.push(new Circle(circles[n].x-circles[n].offset,circles[n].y+80,10,n*2+1,list[n*2+1]==='null'?"":list[n*2+1],circles[n].offset/2));
      }
      if(list[n*2+2]){
        num.push(n*2+2);
        circles.push(new Circle(circles[n].x+circles[n].offset,circles[n].y+80,10,n*2+2,list[n*2+2]==='null'?"":list[n*2+2],circles[n].offset/2));
      }
      
    }
  }
}
function draw_text(text,x,y){
  context.fillText(text,x,y);
}
function str_arr(str){
  let list=str.split(/[\,\.\s]+/);
  return list;
}