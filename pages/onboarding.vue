<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 w-20 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/learning-objectives')" class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-8 left-1/2 -translate-x-1/2">
      
    </div>
    <div class="flex flex-col justify-center items-center w-[60%] lg:w-[90%] h-[90%] mr-2">
      <LilitaText class="text-stroke-3 text-4xl text-yellow-400 text-center w-[400px] md:w-[100%]">TAHUKAH KAMU?</LilitaText>
      <div class="h-[70%] w-[100%] bg-blue-900 bg-opacity-90">
        <Element src="/element/indonesia.png" customClass="h-[100%] w-[100%]" />
      </div>
      <span class="text-xs text-white font-semibold ob1">Hai anak-anak hebat! Sebelum mulai, bacalah narasi di atas. Masalah itu muncul karena kurangnya asupan nutrisi dalam tubuh. Yuk, kita pelajari bersama cara mencegah penyakit lewat nutrisi yang baik!</span>
      <span class="text-xs text-white font-semibold ob2 hidden">Berdasarkan angka yang ditampilkan dalam infografis?mengapa anak-anak usia 5-12 tahun rentan mengalami obesitas?</span>
      <input v-model="onboarding" type="text" name="onboarding" class="w-full py-1 text-xs text-white bg-transparent border-b-2 border-dashed border-white ob2 hidden"></input>
    </div>
    <div class="w-28 bottom-[-50px] right-[15px]">
      <ChefRight/>
      <button @click="handleClick('')" class="w-28 py-2 px-4 rounded-xl border border-black bg-red-200">
        <LilitaText class="text-stroke-2 text-3xl ob1">SIAP</LilitaText>
        <LilitaText class="text-stroke-2 text-3xl ob2 hidden">MENU</LilitaText>
      </button>
    </div>
  </div>
  <EmptyFieldModal v-if="showEmptyFieldModal" @close="showEmptyFieldModal = false" />
  <ServerErrorModal v-if="showServerErrorModal" @close="showServerErrorModal = false" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const apiUrl = useRuntimeConfig().public.API_BASE_URL
const showEmptyFieldModal = ref(false);
const showServerErrorModal = ref(false);
const onboarding = ref('');

const handleClick = (path) => {
  const ob2Active = [...document.querySelectorAll('.ob2')].some(el => !el.classList.contains('hidden'));
  if (path === '/learning-objectives') {
    if (!ob2Active) {
      router.push(path);
    }else{
      toggleObElements('to-ob1');
    }
  } else {
    if(!ob2Active){
      toggleObElements('to-ob2');
    }else{
      handleSubmit();
    }
  }
};

const toggleObElements = (mode) => {
  const ob1Elements = document.querySelectorAll('.ob1');
  const ob2Elements = document.querySelectorAll('.ob2');

  if (mode === 'to-ob2') {
    ob1Elements.forEach(el => el.classList.add('hidden'));
    ob2Elements.forEach(el => el.classList.remove('hidden'));
  } else if (mode === 'to-ob1') {
    ob2Elements.forEach(el => el.classList.add('hidden'));
    ob1Elements.forEach(el => el.classList.remove('hidden'));
  } 
};

const handleSubmit = async () => {
  if(!onboarding.value.trim()){
    showEmptyFieldModal.value = true;
    return;
  }

  const token = localStorage.getItem('token')
  const payload = { response: onboarding.value }

  try {
    const res = await fetch(`${apiUrl}/onboarding`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Server error');

    router.push('/home');
  } catch (err) {
    console.error(err);
    showServerErrorModal.value = true;
  }
};
</script>