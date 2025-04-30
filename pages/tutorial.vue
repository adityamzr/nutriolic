<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-14 w-18 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/home')" class="h-10 w-10" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-show="currentPage > 0 && currentPage < 14" class="h-16 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('back')" class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-show="currentPage < 14" class="h-16 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 right-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('next')" class="h-12 w-12 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="z-10 justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-2 text-center text-4xl w-[400px] md:w-[100%]">CARA PENGGUNAAN</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90 rounded-3xl">
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
        <Element :src="`${options[currentPage].path}`" customClass="w-full"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const currentPage = ref(0);

const options = ref({
  0: { path: '/element/cp1.png' },
  1: { path: '/element/cp2.png' },
  2: { path: '/element/cp3.png' },
  3: { path: '/element/cp4.png' },
  4: { path: '/element/cp5.png' },
  5: { path: '/element/cp6.png' },
  6: { path: '/element/cp7.png' },
  7: { path: '/element/cp8.png' },
  8: { path: '/element/cp9.png' },
  9: { path: '/element/cp10.png' },
  10: { path: '/element/cp11.png' },
  11: { path: '/element/cp12.png' },
  12: { path: '/element/cp13.png' },
  13: { path: '/element/cp14.png' },
  14: { path: '/element/cp15.png' }
});

const handleClick = (direction) => {
  if(direction === 'back'){
    currentPage.value--;
  }else if(direction === 'next'){
    currentPage.value++;
  }else{
    router.push(direction)
  }
};

</script>