<script setup lang="ts">
import { onMounted } from "vue";
import Player from "xgplayer/dist/simple_player";
import volume from "xgplayer/es/controls/volume";
import screenShot from "xgplayer/es/controls/screenShot";
import playbackRate from "xgplayer/es/controls/playbackRate";

defineOptions({
  name: "Video"
});

onMounted(() => {
  new Player({
    id: "mse",
    // 默认静音
    volume: 1,
    autoplay: false,
    screenShot: false,
    url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4",
    poster:
      "https://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
    controlPlugins: [volume, playbackRate, screenShot],
    //传入倍速可选数组
    playbackRate: [0.5, 0.75, 1, 1.5, 2]
  });
});
</script>

<template>
  <el-card>
    <div id="mse" />
  </el-card>
</template>

<style scoped>
#mse {
  /* flex: auto; */
}
</style>
