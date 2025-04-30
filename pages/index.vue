<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="w-[80%] h-[60%] p-4">
      <div class="flex justify-center absolute top-0 md:top-10 left-1/2 -translate-x-1/2">
        <Element src="/element/nutriolic-title.svg" customClass="h-[140px] md:h-38 lg:h-52" />
        <span class="absolute top-28 md:top-28 lg:top-40 text-sm md:text-md lg:text-lg font-semibold">Pembelajaran Nutrisi Interaktif</span>
      </div>
      <Element src="/element/milk.gif" customClass="absolute left-[120px] bottom-20 lg:bottom-36 w-16 lg:w-24" />
      <Element src="/element/cereal.gif" customClass="absolute left-[140px] bottom-14 lg:bottom-28 w-28 lg:w-36" />
      <div class="absolute right-2 bottom-[-60px]">
        <ChefRight class="w-40 md:w-52 lg:w-72"/>
      </div>
    </div>
    <button @click="handleClick('/login')" class="absolute bottom-20 lg:bottom-32 w-36 lg:w-fit py-2 px-4 rounded-full bg-red-200">
      <LilitaText class="text-stroke-2 lg:text-stroke-3 text-4xl lg:text-6xl">Mulai</LilitaText>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = (path) => {
  const element = document.documentElement;
  (element.requestFullscreen || element.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen)?.call(element);
  router.push(path);
};
</script>
