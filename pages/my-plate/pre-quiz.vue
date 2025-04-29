<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 w-20 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/calorie/material')" class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-center text-5xl min-w-96">ISI PIRINGKU</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[75%] h-[75%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-20"/>
      <div class="flex flex-col justify-center items-center gap-2 md:gap-0 w-[100%] h-[90%] z-10">
        <div class="flex justify-center gap-2">
          <div class="md:w-40 -scale-x-100">
            <ChefRight class="w-32"/>
          </div>
          <div class="flex flex-col w-full">
            <span class="text-white text-xs">🔥 Halo, Petualang Cerdas! 🔥</span>
            <p class="text-white text-xs">
              Kalian luar biasa! 🏆 Kalian telah berhasil menyelesaikan Worksheet 3: Informasi Gizi dengan gemilang! 🎉
              Tapi perjalanan belum berakhir! Untuk menaklukkan misi utama dalam aplikasi ini, kalian harus menaklukkan 4 Worksheet. Saat ini, progress kalian 1/4!
            </p>
            <p class="text-white text-xs mt-2">
              ⚔️ Langkah Selanjutnya? Klik Tombol quiz dan buktikan seberapa hebat pemahaman kalian tentang kalori! Apakah kalian siap menghadapi tantangan berikutnya? 💡✨
            </p>
            <span class="text-white text-xs">🎯 Tujuan Akhir: Selesaikan semua misi dan jadilah Master Kalori! 🏅</span>
            <span class="text-white text-xs">💥 Ayo lanjutkan petualangan ini! Klik tombol quiz sekarang!🚀🔥</span>
          </div>
        </div>

        <button @click="handleClick('/calorie/quiz')" class="w-24 py-2 px-2 rounded-full bg-yellow-200">
          <LilitaText class="text-stroke-2 text-2xl">QUIZ</LilitaText>
        </button>
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