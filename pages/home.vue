<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 w-32 absolute top-0 right-5 flex justify-end items-center">
      <!-- <Button @click="handleClick('/')" class="w-24">
        <LilitaText class="text-stroke-2 text-3xl">Menu</LilitaText>
      </Button> -->
      <CircleButton class="h-12 w-12" @click="handleClick('logout')">
        <Element src="/element/exit-door.png" customClass="h-8 w-8" />
      </CircleButton>
    </div>
    <div class="h-16 w-52 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton class="h-12 w-12" @click="handleClick('/setting')">
        <Element src="/element/gear.png" customClass="h-8 w-8" />
      </CircleButton>
      <CircleButton class="h-12 w-12" @click="handleClick('/reference')">
        <Element src="/element/question-mark.png" customClass="h-8" />
      </CircleButton>
      <CircleButton class="h-12 w-12" @click="handleClick('/developer')">
        <Element src="/element/chain.png" customClass="w-10" />
      </CircleButton>
    </div>
    <div class="flex justify-center items-end w-[80%] h-[60%] p-4">
      <div class="flex justify-center absolute top-0 left-1/2 -translate-x-1/2">
        <Element src="/element/nutriolic-title.svg" customClass="h-[140px] md:h-32 lg:h-48" />
        <span class="absolute top-28 text-sm font-semibold">Pembelajaran Nutrisi Interaktif</span>
      </div>
      <div class="flex justify-evenly items-center w-[80%] h-[50%]">
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/material-menu')" class="w-20 md:w-28 h-20 md:h-28">
            <Element src="/element/chart.png" customClass="w-12 md:w-16"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Materi</span>
        </div>
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/game')" class="w-20 md:w-28 h-20 md:h-28">
            <Element src="/element/paper-chart.png" customClass="w-12 md:w-16"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Game</span>
        </div>
        <div class="flex flex-col items-center">
          <CircleButton @click="handleClick('/reflection')" class="w-20 md:w-28 h-20 md:h-28">
            <Element src="/element/medal.png" customClass="w-12 md:w-16"/>
          </CircleButton>
          <span class="text-lg text-white font-semibold">Refleksi</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Logout -->
  <div class="fixed inset-0 z-50 flex items-center justify-center" v-if="showModalLogout" @close="showModalLogout = false">
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
    <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl z-10 text-center">
      <h2 class="text-xl font-bold text-yellow-600 mb-4">Perhatian!</h2>
      <p class="text-sm text-gray-600 mb-6">Apakah kamu yakin ingin keluar?</p>
      <button
        @click="showModalLogout = false"
        class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
        Batal
      </button>
      <button
        @click="handleLogout()"
        class="px-4 py-2 ml-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
        Keluar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const showModalLogout = ref(false);

const handleClick = (path) => {
  console.log(path)
  if(path === 'logout') showModalLogout.value = true;
  else router.push(path);
};

const handleLogout = () => {
  localStorage.removeItem('token')
  navigateTo('/')
};
</script>