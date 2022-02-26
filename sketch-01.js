const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],// 可以是陣列，或是可以輸出的大小
  // pixelsPerInch: 300, // 
  // orientation: 'landscape'// 轉橫式
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const W = width * 0.10;
    const H = height * 0.10;
    const gap = width * 0.03;

    // 起始點
    const ix = width * 0.17; 
    const iy = height * 0.17;

    const off = width * 0.02;

    let x, y;

    // 巢狀會得到平面的圖案
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
         x = ix + (W + gap) * i;
         y = iy + (H + gap) * j;
        // 畫 5 個連續的正方形
        context.beginPath();
        context.rect(x, y, W, H);
        context.stroke();

        // Math.random() 產出 0 ~ 1 之間的參數，如果大於 0.5 就會出現小框框
        if (Math.random() > 0.5) {
          // 在一個小的正方形在內
          context.beginPath();
          // 因為 x y 各加 8 所以寬和高都要減去 8 的兩倍 框框才會再正方形內
          context.rect(x + off / 2, y + off / 2, W - off, H - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
