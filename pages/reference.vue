<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-20 lg:w-24 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/home')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9"/>
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 lg:top-10 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">Referensi</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[75%] h-[75%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <div class="flex flex-col items-center w-[90%] h-full">
        <div class="mt-6 lg:mt-12 mb-2 text-md lg:text-xl font-semibold p-2 bg-white border-2 border-black">Daftar Pustaka</div>
        <div class="flex flex-col items-start gap-1 z-10 overflow-auto">
          <span class="text-white text-xs lg:text-lg font-semibold">- World Health Organization (WHO). (2021, Juni 9). Malnutrition.</span>
          <span class="text-white text-xs lg:text-lg font-semibold">- Satgas Remaja IDAI. (2013). Nutrisi pada remaja. Dalam Bunga Rampai Kesehatan Remaja. Ikatan Dokter Anak Indonesia.</span>
          <span class="text-white text-xs lg:text-lg font-semibold">- UNICEF. (2021). Social and Behaviour Change Communication Strategy: Improving Adolescent Nutrition in Indonesia.</span>
          <span class="text-white text-xs lg:text-lg font-semibold">- Kementerian Kesehatan Republik Indonesia. (2018). Hasil Utama RISKESDAS 2018. Badan Penelitian dan Pengembangan Kesehatan.</span>
          <span class="text-white text-xs lg:text-lg font-semibold">- OECD. (2020). PISA 2018 Results (Volume I): What Students Know and Can Do. OECD Publishing.</span>
          <span class="text-white text-xs lg:text-lg font-semibold">- Kemendikbud. (2021). Buku Siswa Ilmu Pengetahuan Alam Kelas VIII SMP/MTs Kurikulum Merdeka. Pusat Kurikulum dan Perbukuan, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.</span>
        </div>
      </div>
    </div>
    <div class="absolute bottom-[-50px] right-0">
      <ChefRight/>
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