<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-20 lg:w-24 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/home')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 lg:top-14 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">Pengembang</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[70%] h-[70%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <div class="flex flex-col items-center w-[90%] h-[90%]">
        <div class="my-4 text-xl lg:text-2xl font-semibold p-2 bg-white border-2 border-black">Pengembang</div>
        <span class="text-white text-lg lg:text-xl font-semibold">Syahaarah Salsabila Gunawan</span>
        <span class="text-white text-lg lg:text-xl font-semibold">UNIVERSITAS PENDIDIKAN INDONESIA</span>
        <span class="text-white text-lg lg:text-xl font-semibold">Syahaarahs@gmail.com</span>
        <span class="text-white text-lg lg:text-xl font-semibold">087731668600</span>
      </div>
    </div>
    <div class="absolute right-2 lg:right-10 bottom-[-60px] lg:-bottom-20">
      <ChefRight class="w-40 md:w-52 lg:w-80"/>
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