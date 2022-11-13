<script lang="ts" setup>
import { onMounted } from "vue";
import type { Position } from "./type";
const gravity = 0.8;
let d, c;

class Player {
  height: number;
  position: Position;
  velocity: Position;
  constructor(position) {
    this.height = 50;
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1
    };
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y < d.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

function background() {
  c.fillStyle = "#000";
  c.fillRect(0, 0, d.width, d.height);
}

const player1 = new Player({ x: 0, y: 0 });
const player2 = new Player({ x: 200, y: 100 });

function animate() {
  window.requestAnimationFrame(animate);
  background();
  player1.update();
  player2.update();
}

onMounted(() => {
  d = document.querySelector(".dom");
  c = d.getContext("2d");
  d.width = 1024;
  d.height = 500;
  animate();
});

window.addEventListener("keydown", event => {
  switch (event.key) {
    case " ":
      player1.velocity.y = -20;
      break;
  }
});
</script>
<template>
  <canvas class="dom" />
</template>
