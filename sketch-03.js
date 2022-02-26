const canvasSketch = require('canvas-sketch');
// const math = require("canvas-sketch-util/math"); // 引入 libary
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// console 看增加速度 預設60Hz
const animate = () => {
  console.log('gavin');
  requestAnimationFrame(animate);
}
// animate();

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);
        // 雙層迴圈變成點與點之間互連
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
      
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });

    // const point = { x: 800, y: 400, radius: 10 };
    // const agentA = new Agent(800, 400, 10);
    // const agentB = new Agent(300, 700, 10);

    // agentA.draw(context);
    // agentB.draw(context);
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // 根據畢氏定理去繪製連線
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    // sqrt 開根號
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor (x, y) {
    this.pos = new Vector(x, y); // 向量
    this.vel = new Vector(random.range(-1 ,1), random.range(-1, 1)); // 速度
    this.radius = random.range(4, 12);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
  }

  draw(context) {
    // context.fillStyle = 'white';

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
