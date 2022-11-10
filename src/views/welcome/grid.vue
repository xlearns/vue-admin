<script setup lang="ts"></script>

<template>
  <div class="h-full">
    <div class="grid">
      <div
        :class="`top-1-${index + 1}`"
        v-for="(item, index) in 4"
        :key="index"
      >
        {{ `top-1-${index + 1}` }}
      </div>
      <div
        :class="`top-2-${index + 1}`"
        v-for="(item, index) in 4"
        :key="index"
      >
        {{ `top-2-${index + 1}` }}
      </div>
      <div class="main-1">
        <el-tooltip
          effect="dark"
          placement="top"
          v-for="item in ['hellohellohellohellohellohello', 'hello']"
          :content="item"
          :key="item"
        >
          <div v-epEllipsis class="w-[100px]">
            {{ item }}
          </div>
        </el-tooltip>
      </div>
      <div class="main-2">main-2</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.grid {
  display: grid;
  margin: 0 !important;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 170px 172px 398px 398px;
  grid-template-areas:
    "top-1-1 top-1-2 top-1-3 top-1-4"
    "top-2-1 top-2-2 top-2-3 top-2-4"
    "main-1 main-1 main-1 main-1"
    "main-2 main-2 main-2 main-2";
  gap: 20px;
}

.top-1-1 {
  grid-area: top-1-1;
  border: 1px solid red;
  background: #fff;
}

.top-1-2 {
  grid-area: top-1-2;
  border: 1px solid red;
  background: #fff;
}

.top-1-3 {
  grid-area: top-1-3;
  border: 1px solid red;
  background: #fff;
}

.top-1-4 {
  grid-area: top-1-4;
  border: 1px solid red;
  background: #fff;
}

.top-2-1 {
  grid-area: top-2-1;
  border: 1px solid red;
  background: #fff;
}

.top-2-2 {
  grid-area: top-2-2;
  border: 1px solid red;
  background: #fff;
}

.top-2-3 {
  grid-area: top-2-3;
  border: 1px solid red;
  background: #fff;
}

.top-2-4 {
  grid-area: top-2-4;
  border: 1px solid red;
  background: #fff;
}

.main-1 {
  grid-area: main-1;
  border: 1px solid red;
  background: #fff;
}

.main-2 {
  grid-area: main-2;
  border: 1px solid red;
  background: #fff;
}

@media only screen and(max-width:992px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 170px 170px 172px 172px 398px 398px;
    grid-template-areas:
      "top-1-1 top-1-2"
      "top-1-3 top-1-4"
      "top-2-1 top-2-2"
      "top-2-3 top-2-4"
      "main-1 main-1"
      "main-2 main-2";
  }
}

@media only screen and (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: 170px 170px 170px 170px 172px 172px 172px 172px 398px 398px;
    grid-template-areas:
      "top-1-1"
      "top-1-2"
      "top-1-3"
      "top-1-4"
      "top-2-1"
      "top-2-2"
      "top-2-3"
      "top-2-4"
      "main-1"
      "main-2";
  }
}
</style>
