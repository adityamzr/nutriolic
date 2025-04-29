<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 w-20 absolute top-0 left-0 flex justify-evenly items-center z-10">
      <CircleButton @click="handleClick('/menu')" class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="h-16 w-20 absolute top-0 right-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/onboarding')" class="h-12 w-12 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-4 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-3 text-4xl text-center w-[400px] md:w-[100%]">TUJUAN PEMBELAJARAN</LilitaText>
    </div>
    <div class="relative flex justify-center items-center w-[80%] h-[70%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <div class="flex flex-col items-center w-[90%] h-[100%]">
        <Element src="/element/objectives-table.png" customClass="h-[100%]" />
      </div>
    </div>
    <div class="absolute bottom-[-50px] right-[15px]">
      <ChefRight/>
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