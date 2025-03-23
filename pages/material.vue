<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 w-20 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/home')" class="h-12 w-12" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl">MATERI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[70%] h-[70%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/mangosteen.png" customClass="absolute top-[-40px] left-[-40px] w-32"/>
      <Element src="/element/orange.png" customClass="absolute bottom-[-30px] left-[-30px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-20"/>
      <div class="grid grid-cols-2 items-center w-[90%] h-[90%]">
        <div class="flex flex-col items-center pl-16">
          <CircleButton class="w-20 h-20">
            <Element src="/element/nutrient.png" customClass="w-14"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Nutrient</span>
        </div>
        <div class="flex flex-col items-center pr-16">
          <CircleButton class="w-20 h-20">
            <Element src="/element/calorie.png" customClass="w-14"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Calorie</span>
        </div>
        <div class="flex flex-col items-center pr-12">
          <CircleButton class="w-20 h-20">
            <Element src="/element/nutrition-fact.png" customClass="w-14"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Nutrision Fact</span>
        </div>
        <div class="flex flex-col items-center pl-12">
          <CircleButton class="w-20 h-20">
            <Element src="/element/plate.png" customClass="w-14"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">My Plate</span>
        </div>
      </div>
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