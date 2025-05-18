<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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