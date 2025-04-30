<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="flex justify-center items-end w-[80%] h-[60%] p-4">
      <div class="flex justify-evenly items-center w-[80%] h-[50%]">
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/learning-objectives')" class="w-20 md:w-28 lg:w-36 h-20 md:h-28 lg:h-36">
            <Element src="/element/play.png" customClass="w-12 md:w-16 lg:w-20"/>
          </CircleButton>
          <span class="text-sm lg:text-2xl font-semibold">SIAP!</span>
        </div>
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/tutorial')" class="w-20 md:w-28 lg:w-36 h-20 md:h-28 lg:h-36">
            <Element src="/element/question-mark.png" customClass="w-10 md:w-14"/>
          </CircleButton>
          <span class="text-sm lg:text-2xl font-semibold">Cara Penggunaan</span>
        </div>
      </div>
      <div class="absolute right-2 lg:right-10 bottom-[-60px] lg:-bottom-20">
        <ChefRight class="w-40 md:w-52 lg:w-96"/>
      </div>
      <div class="absolute right-32 md:right-40 lg:right-[340px] top-0 lg:top-16">
        <div class="relative items-center w-56 md:w-56 lg:w-72">
          <Element src="/element/cloud.png" customClass="w-[100%]"/>
          <div class="absolute h-40 md:h-40 lg:48 inset-0 lg:inset-5 flex items-center justify-center px-2 text-xs lg:text-sm text-center font-semibold text-black">
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