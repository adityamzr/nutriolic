<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 w-32 absolute top-0 right-0 flex justify-evenly items-center">
      <CircleButton class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-8" />
      </CircleButton>
      <CircleButton class="h-12 w-12" variant="secondary">
        <Element src="/element/exit-door.png" customClass="h-8" />
      </CircleButton>
    </div>
    <div class="h-16 w-52 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton class="h-12 w-12">
        <Element src="/element/gear.png" customClass="h-8 w-8" />
      </CircleButton>
      <CircleButton class="h-12 w-12">
        <Element src="/element/question-mark.png" customClass="h-8" />
      </CircleButton>
      <CircleButton class="h-12 w-12">
        <Element src="/element/chain.png" customClass="w-10" />
      </CircleButton>
    </div>
    <div class="flex justify-center items-end border-2 w-[80%] h-[60%] p-4">
      <div class="flex justify-center absolute top-0 left-1/2 -translate-x-1/2">
        <Element src="/element/nutriolic-title.svg" customClass="h-[140px] md:h-32 lg:h-48" />
        <span class="absolute top-28 text-sm font-semibold">Pembelajaran Nutrisi Interaktif</span>
      </div>
      <div class="flex justify-evenly items-center w-96 h-28">
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/material')" class="w-20 h-20">
            <Element src="/element/chart.png" customClass="w-12"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Materi</span>
        </div>
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/game')" class="w-20 h-20">
            <Element src="/element/paper-chart.png" customClass="w-12"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Game</span>
        </div>
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/reflection')" class="w-20 h-20">
            <Element src="/element/medal.png" customClass="w-12"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Refleksi</span>
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