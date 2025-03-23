<template>
  <img v-if="computedSrc" :src="computedSrc" :class="customClass" loading="lazy" alt="">
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

const images = import.meta.glob("~/assets/element/*", { eager: true });

const computedSrc = computed(() => {
  return images[`/assets${props.src}`]?.default || "";
});
</script>