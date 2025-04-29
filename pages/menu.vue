<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="flex justify-center items-end border-2 w-[80%] h-[60%] p-4">
      <!-- <div class="flex justify-center absolute top-0 left-1/2 -translate-x-1/2">
        <Element src="/element/nutriolic-title.svg" customClass="h-[140px] md:h-32 lg:h-48" />
        <span class="absolute top-28 text-sm font-semibold">Pembelajaran Nutrisi Interaktif</span>
      </div> -->
      <div class="flex justify-evenly items-center w-[80%] h-[50%]">
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/learning-objectives')" class="w-20 md:w-28 h-20 md:h-28">
            <Element src="/element/play.png" customClass="w-12 md:w-16"/>
          </CircleButton>
          <span class="text-sm font-semibold">SIAP!</span>
        </div>
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/tutorial')" class="w-20 md:w-28 h-20 md:h-28">
            <Element src="/element/question-mark.png" customClass="w-10 md:w-14"/>
          </CircleButton>
          <span class="text-sm font-semibold">Cara Penggunaan</span>
        </div>
      </div>
      <div class="absolute right-0 bottom-[-60px]">
        <ChefRight/>
      </div>
      <div class="absolute right-32 top-0">
        <div class="relative items-center w-56 md:w-56">
          <Element src="/element/cloud.png" customClass="w-[100%]"/>
          <div class="absolute h-40 inset-0 flex items-center justify-center px-2 text-xs text-center font-semibold text-black">
            Halo Nutrikids! Senang sekali bisa bersama kalian. Yuk, jelajahi kebutuhan nutrisi kita! Sudah siap? Sebelum mulai, pastikan kalian tahu cara menggunakan aplikasi ini ya!
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = (path) => {
  router.push(path);
};
</script>