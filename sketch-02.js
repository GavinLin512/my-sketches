const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math"); // 引入 libary
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

// // 角度轉弧度
// const degToRad = (degrees) => {
//   return (degrees / 180) * Math.PI;
// };
// // 介於 min 到 max 之間的隨機倍數
// const randomRange = (min,max) => {
//   return Math.random() * (max - min) + min;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x,y;

    const num = 20;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360/num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      // x = radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      // y = radius * Math.cos(angle);

      context.save();
      // context.translate(cx,cy);
      context.translate(x, y);
      // context.rotate(0.3);
      // context.rotate(45/180 * Math.PI);
      // context.rotate(degToRad(45));
      context.rotate(-angle); // 逆時針轉 
      context.scale(random.range(0.1,2) , random.range(0.2,0.5));

      context.beginPath();
      context.rect(-w / 2, random.range(0, -h * 0.5), w, h);
      context.fill();

      // 畫圓球
      // context.save();
      // context.translate(100,400);

      // context.beginPath();
      // context.arc(0, 0, 50, 0, Math.PI * 2);
      // context.fill();
      context.restore();

      context.save();
      context.translate(cx,cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5,20);

      context.beginPath();
      context.arc(0,0,radius * random.range(0.7,1.3),slice * random.range(0,-5),slice * random.range(1,5)); // 繪製弧線 起始點 半徑 起始弧度 終止弧度
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
