<template>
  <div class="test">
    <canvas id="canvas"></canvas>
    <div class="oneline">
      <div>
        <span class="text">{{ message }}</span>
        <input
          @input="inputFn"
          ref="text"
          class="input"
          value=""
          placeholder="许个愿望吧"
        />
      </div>

      <div class="btn" @click="fly">放飞孔明灯</div>
    </div>
  </div>
</template>
<script>
import "./fillTextVertical.js";
export default {
  name: "TestApp",
  data: function () {
    return {
      canvas: null,
      imageObj: null,
      ctx: null,
      width: 0,
      height: 0,
      pi2: Math.PI * 2,
      arrLine: [],
      arrBoll: [],
      arrclickFly: [],
      one: {},
      message: "",
    };
  },
  methods: {
    createLine() {},
    inputFn() {
      this.message = "";
    },
    fly() {
      const text = this.$refs.text.value;
      if (text.length > 10) {
        this.message = "请输入10个字符以内的祝福";
        return;
      }
      const rany = this.binRandom(0.5);
      const one = {
        p: { x: this.width / 2, y: this.height - 200 }, //position
        v: {
          //velocity
          x: this.binRandom(0.5) ? this.random(1) : this.random(-1),
          y: rany < 0.2 ? 0.2 : rany,
        },
        o: this.random(1) + 0.3, //opacity
        scale: 5, //opacity
        scaleText: text,
        size: 200, //opacity
      };
      this.arrclickFly.push(one);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //
      // this.drawOneLine(300);
    },
    random(t) {
      return Math.random() * t;
    },
    binRandom(t) {
      return Math.random() < t;
    },
    drawLines() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.arrLine.forEach((p) => {
        p.p.x += p.v.x;
        p.p.y += p.v.y;
        if (p.p.x > this.width + 20 || p.p.x < -20) p.v.x *= -1;
        if (p.p.y > this.height || p.p.y < -20) p.v.y *= -1;
      });
     
      this.arrLine.forEach((p) => {
        const x = p.p.x;
        const y = p.p.y;
        const scale = p.scale;

        if (scale < 0.5) {
          this.ctx.fillStyle = "rgba(255, 148, 77," + p.o + ")";
        } else {
          var lingrad = this.ctx.createLinearGradient(
            x + 25 * scale,
            y + 0 * scale,
            x + 40 * scale,
            y + 30 * scale
          );
          lingrad.addColorStop(0, "#ff471a");
          lingrad.addColorStop(1, "#ffc080");
          this.ctx.fillStyle = lingrad; //增加渐变
        }

        //---------画孔明灯外形 begin

        this.ctx.beginPath();
        this.ctx.moveTo(x + 10 * scale, y + 10 * scale); //左上
        this.ctx.lineTo(x + 20 * scale, y + 38 * scale); //左下
        // this.ctx.lineTo(x + 30 * scale, y + 38 * scale); //右下
        this.ctx.quadraticCurveTo(
          x + 25 * scale,
          y + 41 * scale,
          x + 30 * scale,
          y + 38 * scale
        ); //赛贝尔曲线增加弧度
        this.ctx.lineTo(x + 30 * scale, y + 38 * scale); //右下
        this.ctx.lineTo(x + 40 * scale, y + 10 * scale); //右上
        this.ctx.lineTo(x + 25 * scale, y); //顶部
        this.ctx.closePath();
        this.ctx.fill();

        //画中间的分割线，  顶部到底部
        this.ctx.moveTo(x + 25 * scale, y); //顶部
        this.ctx.lineTo(x + 25 * scale, y + 38 * scale); //顶部中间

        var lingrad2 = this.ctx.createLinearGradient(
          x + 25 * scale,
          y + 0 * scale,
          x + 40 * scale,
          y + 30 * scale
        );
        lingrad2.addColorStop(0, "#000");
        lingrad2.addColorStop(1, "#ff8d1a");
        this.ctx.strokeStyle = lingrad2; //增加渐变
        this.ctx.lineWidth = 0.3;
        this.ctx.stroke();

        //---------孔明灯外形 end

        //在孔明灯上写字
        this.ctx.fillStyle = "rgba(0, 0, 51," + p.o + ")"; //轮廓颜色
        this.ctx.font = `${scale * 10}px serif`;
        const textarr = [
          "股票",
          "回本",
          "祖国",
          "统一",
          "中秋",
          "快乐",
          "安康",
          "涨薪",
          "平安",
          "如意",
          "暴富",
          "不卷",
          "peace",
          "and",
          "love",
        ];
        const randomtext = Math.ceil(p.scaleText * 10);
        this.ctx.fillText(
          textarr[randomtext],
          x + 15 * scale,
          y + 22 * scale,
          scale * 19
        );
      });

      requestAnimationFrame(this.drawLines);
    },
    drawBool() {
      this.arrBoll.forEach((p) => {
        p.p.x += p.v.x;
        p.p.y += p.v.y;
        if (p.p.x > this.width + 20 || p.p.x < -40) p.v.x *= -1;
        if (p.p.y > this.height || p.p.y < -20) p.v.y *= -1;
        //rendering stuff
      });
      //stuff
      this.arrBoll.forEach((p) => {
        this.ctx.fillStyle = "rgba(255, 0, 0," + p.o + ")";
        this.ctx.beginPath();
        this.ctx.arc(p.p.x, p.p.y, p.s / 5, 0, this.pi2);
        this.ctx.closePath();
        this.ctx.fill();
      });
      requestAnimationFrame(this.drawBool);
    },

    drawOneLine(timer) {
      this.arrclickFly.forEach((item) => {
        this.ctx.drawImage(
          this.imageObj,
          item.p.x,
          item.p.y,
          item.size,
          item.size
        );
        item.p.x += item.v.x;
        item.p.y -= item.v.y;
        item.size = item.size - 0.05;
        if (item.p.x > this.width + 20 || item.p.x < -60) item.v.x *= -1;
        if (item.p.y > this.height || item.p.y < -60) item.v.y *= -1;
        // if (item.v.y < 0 && item.p.y > this.height / 1.5) {
        //   item.v.y *= -1;
        // }
        if (item.size <= 10) item.size = 10;
        if (item.scaleText) {
          //在孔明灯上写字
          this.ctx.fillStyle = "#ffcc00"; //轮廓颜色
          this.ctx.font = `${item.size / 18}px serif`;
          let x = item.p.x + item.size / 2;
          let y = item.p.y + item.size / 4;
          this.ctx.fillTextVertical(item.scaleText, x, y, 10);
        }
      });
      requestAnimationFrame(this.drawOneLine, timer);
    },
  },
  mounted() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    const density = Math.ceil(this.width / 14);

    this.imageObj = new Image();
    this.imageObj.src = "/44.png";
    this.arrLine = new Array(density).fill().map(() => {
      return {
        p: { x: this.random(this.width), y: this.random(this.height) }, //position
        v: {
          //velocity
          x: this.binRandom(0.5) ? this.random(1) : this.random(-1),
          y: this.binRandom(0.5) ? this.random(1) : this.random(-1),
        },
        o: this.random(1) + 0.3, //opacity
        scale: this.random(1), //opacity
        scaleText: this.random(1), //opacity
      };
    });
    this.drawLines(this.arrLine);

    //画圆
    this.arrBoll = new Array(density * 2).fill().map(() => {
      return {
        p: { x: this.random(this.width), y: this.random(this.height) }, //position
        v: {
          //velocity
          x: this.binRandom(0.5) ? this.random(1) : this.random(-1),
          y: this.binRandom(0.5) ? this.random(1) : this.random(-1),
        },
        s: this.random(1) + 8, //size
        o: this.random(1) + 0.3, //opacity
      };
    });

    this.drawBool(this.arrBoll);

    requestAnimationFrame(this.drawOneLine);
    /************************ */
  },
};
</script>
<style scoped>
.test {
  /* background: #000; */
  background: url("./assets/2.jpeg") no-repeat;
  background-size: cover;

  height: 100vh;
  position: relative;
  width: 100vw;
  overflow: hidden;
  text-align: center;
}
.oneline {
  /* width: 100vw; */
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1;
  display: flex;
  /* justify-content: center; */
  align-items: flex-end;
}
.text {
  color: #fff;
  font-size: 14px;
}
.btn {
  width: 100px;
  height: 36px;
  background: #ffb366;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 16px;
}
.btn:active,
.btn:focus {
  background: #ff471a;
  color: #ffb366;
}
.input {
  width: 180px;
  height: 24px;
  border-radius: 4px;
  padding: 4px 10px;
  border-radius: 4px;
}
canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 0;
}
</style>
