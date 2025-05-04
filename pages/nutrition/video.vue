<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-20 lg:w-28 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/material-menu')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 lg:top-12 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">NUTRISI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[75%] h-[75%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-20"/>
      <div class="flex justify-center gap-2 w-[90%] h-[90%] z-10">
        <div class="flex flex-col justify-center w-[65%] md:w-[70%]">
          <Video src="/video/nutrition.mp4" class="h-auto"></Video>
          <span class="text-white text-xs md:text-sm lg:text-xl">jika Anda sudah memahami videonya, silakan klik tombol "Play" di samping untuk melanjutkan perjalanan kita!</span>
        </div>
        <!-- <div class="flex flex-col items-center justify-between grow"> -->
        <div class="flex items-end justify-center grow">
          <Element @click="handleClick('/nutrition/material')" src="/element/start.png" customClass="cursor-pointer w-20 lg:w-40 mb-8 lg:mb-16"/>
        </div>
      </div>
    </div>
    <div class="absolute w-24 md:w-20 lg:w-80 right-[170px] md:right-56 top-20 lg:top-32">
      <div class="relative items-center w-44 md:w-48 lg:w-80">
        <Element src="/element/cloud2.png" customClass="w-full"/>
        <div class="absolute top-0 lg:top-8 left-1/2 -translate-x-1/2 h-[120px] w-36 md:h-32 md:w-40 lg:h-40 lg:w-52 inset-0 flex items-center justify-center px-2 text-xs lg:text-lg text-center font-semibold text-black">
          Halo para siswa yang cerdas, saksikan video tentang 'pentingnya nutrisi untuk otak kita' dengan saksama!
        </div>
      </div>
    </div>
    <div class="absolute w-32 md:w-40 lg:w-72 right-2 bottom-0">
      <ChefRight class="lg:w-72"/>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = (path) => {
  router.push(path);
};
</script>