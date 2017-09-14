class Point {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.angle = i;
  }
}
let points = [];
window.onload = function () {
  let audio = document.getElementById("audio");
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
//创建输入源
let source = audioContext.createMediaElementSource(audio);
//用createAnalyser方法,获取音频时间和频率数据,实现数据可视化。
let analyser = audioContext.createAnalyser();
//连接：source → analyser → destination
source.connect(analyser);
//声音连接到扬声器
analyser.connect(audioContext.destination);
let   arrData = new Uint8Array(analyser.frequencyBinCount);
  let canvas = document.getElementById("canvas");
  let button = document.getElementById("btn");
  let ctx = canvas.getContext("2d");
  let c_x = canvas.width / 2,
  c_y = canvas.height / 2;
  

  r = 100;
  for (let i = 0; i < 360; i += 3) {
    points.push(new Point(Math.sin(Math.PI / 180 * i) * r + c_x, Math.cos(Math.PI / 180 * i) * r + c_y, i));
  }
  setInterval(draw_canvas,33);

  function draw_canvas() {
      analyser.getByteFrequencyData(arrData);
    ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < 120; i++) {
    ctx.strokeStyle = "hsl( " + Math.round((i * 360) / 120) + ", 100%, 50%)";
    let ran = arrData[i*5] + r;
    if (i === 119) {
      cpi = 358.5;
      let cpx = Math.sin(Math.PI / 180 * cpi) * ran + c_x,
        cpy = Math.cos(Math.PI / 180 * cpi) * ran + c_y;
      draw_curve(ctx, canvas, points[i].x, points[i].y, cpx, cpy, points[0].x, points[0].y);
    } else {
      cpi = (points[i].angle + points[i + 1].angle) / 2;
      let cpx = Math.sin(Math.PI / 180 * cpi) * ran + c_x,
        cpy = Math.cos(Math.PI / 180 * cpi) * ran + c_y;
      draw_curve(ctx, canvas, points[i].x, points[i].y, cpx, cpy, points[i + 1].x, points[i + 1].y);
    }
  }
}

}

function draw_point(ctx, can, x, y, line) {
  let h = can.height,
    w = can.width;
  ctx.lineWidth = line;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function draw_curve(ctx, can, x1, y1, cpx, cpy, x2, y2) {

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cpx, cpy, x2, y2);
  ctx.stroke();
}


