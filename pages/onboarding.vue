<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-20 lg:w-28 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/learning-objectives')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 w-4 lg:h-9 lg:w-6" />
      </CircleButton>
    </div>
    <div class="flex flex-col justify-center items-center w-[60%] lg:w-[60%] h-[90%] mr-2">
      <LilitaText class="text-stroke-3 text-4xl lg:text-6xl text-yellow-400 text-center w-[400px] md:w-[100%]">TAHUKAH KAMU?</LilitaText>
      <div class="relative h-[70%] w-[100%] bg-gray-300 bg-opacity-90">
        <Element src="/element/indonesia.png" customClass="h-[100%] w-[100%]" />
        <div class="absolute left-2 lg:left-10 top-0 lg:top-4 w-2/5">
          <LilitaText class="text-stroke-2 lg:text-stroke-3 text-xl md:text-2xl lg:text-5xl text-yellow-400">FAKTA TERKAIT OBESITAS DI INDONESIA</LilitaText>
          <div class="w-100 h-1 lg:h-3 bg-black"></div>
        </div>
        <div class="absolute left-2 bottom-0 md:bottom-4 lg:left-10 lg:bottom-6 w-3/4 lg:w-1/2">
          <div class="space-y-0">
            <div v-for="item in options" class="flex gap-1 md:gap-3 lg:gap-4 items-start">
              <LilitaText class="min-w-10 lg:min-w-24 text-stroke-2 lg:text-stroke-3 text-xl md:text-2xl lg:text-5xl text-yellow-400">
                {{ item.value }}
              </LilitaText>
              <div>
                <span class="block text-xs lg:text-xl font-bold">{{ item.title }}</span>
                <p class="text-xs lg:text-base">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="absolute right-0 top-0 lg:top-24 bg-blue-900 w-2/4 lg:w-1/3 h-fite p-1 md:p-2 lg:p-4 rounded-bl-xl lg:rounded-l-xl">
          <p class="text-white text-xs lg:text-xl">Sulawesi Utara merupakan provinsi yang memiliki angka obesitas tertinggi mencapai 30,2%.
            sebanyak 16 provinsi di Indonesia memiliki kasus obesitas di atas angka rata-rata nasional</p>
        </div>
      </div>
      <span class="text-xs lg:text-xl text-white font-semibold ob1">Hai anak-anak hebat! Sebelum mulai, bacalah narasi di atas. Masalah itu muncul karena kurangnya asupan nutrisi dalam tubuh. Yuk, kita pelajari bersama cara mencegah penyakit lewat nutrisi yang baik!</span>
      <span class="text-xs lg:text-xl text-white font-semibold ob2 hidden">Berdasarkan angka yang ditampilkan dalam infografis?mengapa anak-anak usia 5-12 tahun rentan mengalami obesitas?</span>
      <input v-model="onboarding" type="text" name="onboarding" class="w-full py-1 text-xs text-white bg-transparent border-b-2 border-dashed border-white ob2 hidden"></input>
    </div>
    <div class="flex flex-col items-center justify-center w-28 lg:w-52 bottom-[-50px] right-[15px]">
      <ChefRight class="w-28 lg:w-52"/>
      <button @click="handleClick('')" class="w-fit py-2 px-4 rounded-xl border border-black bg-red-200">
        <LilitaText class="text-stroke-2 text-3xl lg:text-6xl ob1">SIAP</LilitaText>
        <LilitaText class="text-stroke-2 text-3xl lg:text-6xl ob2 hidden">MENU</LilitaText>
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

const options = ([
  {
    value: 40,
    title: "Juta",
    text: "orang dewasa di Indonesia telah mengalami obesitas dan kelebihan berat badan"
  },
  {
    value: 18.8,
    title: "Persen",
    text: "masalah obesitas telah dialami dialami oleh anak-anak usia 5-12 tahun"
  },
  {
    value: 10.8,
    title: "Persen",
    text: "masalah kelebihan berat badan telah dialami oleh remaja"
  },
]);

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