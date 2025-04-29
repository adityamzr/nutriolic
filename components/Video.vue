<template>
  <video controls :class="customClass" loading="lazy" alt="">
    <source v-if="computedSrc" :src="computedSrc" type="video/mp4" />
    Browser Anda tidak mendukung tag video.
  </video>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: "",
  }
})

const videos = import.meta.glob("~/assets/video/*", { eager: true });

const computedSrc = computed(() => {
  return videos[`/assets${props.src}`]?.default || "";
});
</script>