<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-20 lg:w-28 absolute top-0 left-0 flex justify-evenly items-center z-10">
      <CircleButton @click="handleClick('/menu')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 w-4 lg:h-9 lg:w-6" />
      </CircleButton>
    </div>
    <div class="h-16 lg:h-24 w-20 lg:w-28 absolute top-0 right-0 flex justify-evenly items-center z-10">
      <CircleButton @click="handleClick('/onboarding')" class="h-12 w-12 lg:h-16 lg:w-16 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 w-4 lg:h-9 lg:w-6" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-4 lg:top-8 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-3 text-4xl lg:text-6xl text-center w-[400px] md:w-[100%]">TUJUAN PEMBELAJARAN</LilitaText>
    </div>
    <div class="relative flex justify-center items-center w-[80%] h-[70%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20 lg:w-28"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28 lg:w-32"/>
      <!-- <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/> -->
       <div class="absolute top-2 lg:top-4 -right-[74px] lg:-right-[90px] bg-rose-300 p-2 md:p-3 lg:p-4 max-w-[165px] md:max-w-48 lg:max-w-80 rounded-xl z-10">
        <p class="text-xs lg:text-lg">Tabel disamping merupakan tujuan kita mempelajari nutrisi menggunakan aplikasi Nutriolic, jika kamu sudah memahami silahkan  klik tombol next di pojok kiri atas </p>
       </div>
      <div class="flex flex-col items-center w-[90%] h-[100%]">
        <Element src="/element/tujuan-pembelajaran.png" customClass="h-[100%]" />
      </div>
    </div>
    <div class="absolute right-2 lg:right-10 bottom-[-50px] lg:-bottom-20">
      <ChefRight class="w-36 md:w-44 lg:w-72"/>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = (path) => {
  console.log(path)
  router.push(path);
};
</script>