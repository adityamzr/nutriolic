<style>
  .wrapper {
    background-image: url('/assets/element/kitchen.svg');
    background-size: cover;
    background-position: center;
  }
</style>

<template>
  <div class="wrapper h-screen w-full">
      <NuxtPage />
  </div>
</template>

<script setup>
onMounted(() => {
  function forceLandscape() {
    if (window.innerHeight > window.innerWidth) {
        document.body.classList.add("rotate-90");
    } else {
        document.body.classList.remove("rotate-90");
    }
  }
  
  window.addEventListener("load", forceLandscape);
  window.addEventListener("resize", forceLandscape);
})
</script>