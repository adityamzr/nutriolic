<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-14 lg:h-24 w-18 lg:w-24 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/home')" class="h-10 w-10 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/home.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div v-show="currentPage > 0 && currentPage < 3" class="h-16 lg:h-24 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 left-0 lg:left-4 flex justify-evenly items-center">
      <CircleButton @click="handleClick('back')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div v-show="currentPage < 2" class="h-16 lg:h-24 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 right-0 lg:right-4 flex justify-evenly items-center">
      <CircleButton @click="handleClick('next')" class="h-12 w-12 lg:h-16 lg:w-16 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="z-10 justify-center absolute top-5 lg:top-8 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">REFLEKSI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90 rounded-3xl">
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">

        <!-- Start of quiz -->
        <div class="w-full pt-2 pb-4 px-2 h-full overflow-auto">
          <div v-show="currentPage === 0" class="flex justify-center gap-2">
            <div class="-scale-x-100">
              <ChefRight class="w-40 lg:w-60"/>
            </div>
            <div class="flex flex-col w-full pt-4">
              <span class="text-white text-xs lg:text-xl">🔥 Halo, Petualang Cerdas! 🔥</span>
              <p class="text-white text-xs lg:text-lg text-justify mt-4">
                Setelah menggunakan aplikasi ini, bagaimana perasaan Anda? Yuk, luangkan sedikit waktu untuk merefleksikan pengalaman yang baru saja dijalani. Setiap jawaban yang diberikan akan sangat berarti untuk memahami sejauh mana aplikasi ini dapat membantu atau memberikan kesan bagi Anda.
              </p>
            </div>
          </div>
          <!-- Start of choices -->
          <span v-show="currentPage === 1" class="text-xs lg:text-xl font-semibold text-white">Bagaimana Perasaan Anda setelah menggunakan aplikasi ini?</span>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <label
              v-show="currentPage === 1"
              v-for="(option, index) in options"
              :key="index"
              class="flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer transition-colors"
              :class="{ 
                'bg-rose-400 text-white': selectedOption === option.value,
                'bg-yellow-300': selectedOption !== option.value }"
            >
              <input
                type="radio"
                :value="option.value"
                v-model="selectedOption"
                class="hidden"
              />
              <Element :src="`/element/${option.name}.png`" customClass="h-24 lg:h-28 mb-2" />
              <span class="text-sm lg:text-lg text-center hover:text-white">{{ option.name }}</span>
            </label>

            <div v-show="currentPage === 2" class="flex flex-col w-full h-40 lg:h-72 items-center text-xs lg:text-lg bg-yellow-300 p-2 lg:p-4 rounded-lg">
              <span class="font-semibold">Jika Anda memiliki perasaan, Anda dapat menulis di kotak ini!</span>
              <client-only>
                <QuillEditor v-model:modelValue="pesan" class="w-full mt-2 h-full"/>
              </client-only>
            </div> 
            <div v-show="currentPage === 2" class="flex flex-col w-full h-40 lg:h-72 items-center text-xs lg:text-lg p-2 lg:p-4 rounded-lg bg-yellow-300">
              <span class="font-semibold">Jika Anda memiliki saran, Tulis juga di bawah. Thank you great student!</span>
              <client-only>
                <QuillEditor v-model:modelValue="saran" class="w-full mt-2 h-full"/>
              </client-only>
            </div> 
          </div>
          <!-- End of choices -->
          <div v-show="currentPage === 2" class="flex w-full justify-center mt-6">
            <button @click="handleSubmit()" class="w-fit py-2 px-2 lg:px-4 rounded-full bg-rose-400">
              <LilitaText class="text-stroke-2 text-2xl lg:text-4xl">SUBMIT</LilitaText>
            </button>
          </div>

          <div v-show="currentPage === 3" class="flex justify-center gap-2">
            <div class="-scale-x-100">
              <ChefRight class="w-40 lg:w-60"/>
            </div>
            <div class="flex flex-col w-full pt-4">
              <span class="text-white text-xs lg:text-xl">🔥 Halo, Petualang Cerdas! 🔥</span>
              <p class="text-white text-xs lg:text-lg text-justify mt-4">
                Terima kasih telah berbagi perasaan Anda! Semoga pengalaman ini memberikan manfaat dan kesan yang menyenangkan.
              </p>
            </div>
          </div>
        </div>
         <!-- End of quiz -->
      </div>
    </div>
    <div v-show="currentPage > 0 && currentPage < 3" class="absolute bottom-0 right-0 z-10">
      <ChefRight class="w-24 lg:w-48"/>
    </div>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/strawberry.png" customClass="absolute bottom-20 lg:bottom-40 left-1/2 w-10 lg:w-14"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/potato.png" customClass="absolute bottom-20 lg:bottom-40 right-2/3 w-10 lg:w-14"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/grape.png" customClass="absolute bottom-24 left-64 w-10 lg:w-14"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/lemon.png" customClass="absolute bottom-28 lg:bottom-52 right-24 lg:right-52 w-10 lg:w-14"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/shallot.png" customClass="absolute bottom-24 left-2/3 w-12 lg:w-16"/>
  </div>
  <EmptyFieldModal v-if="showEmptyFieldModal" @close="showEmptyFieldModal = false" />
  <EmptyChoiceModal v-if="showEmptyChoiceModal" @close="showEmptyChoiceModal = false" />
  <ServerErrorModal v-if="showServerErrorModal" @close="showServerErrorModal = false" />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const apiUrl = useRuntimeConfig().public.API_BASE_URL;
const showEmptyFieldModal = ref(false);
const showEmptyChoiceModal = ref(false);
const showServerErrorModal = ref(false);
const currentPage = ref(0);

const options = ref([
  { value: 1, name: 'Pusing' },
  { value: 2, name: 'Ngantuk' },
  { value: 3, name: 'Lapar' },
  { value: 4, name: 'Senang' },
]);

const selectedOption = ref('')
const pesan = ref('')
const saran = ref('')

const handleClick = (direction) => {
  if(direction === 'back'){
    currentPage.value--;
  }else if(direction === 'next'){
    currentPage.value++;
  }else{
    router.push(direction)
  }
};


const handleSubmit = async () => {
  if (!selectedOption.value) {
    showEmptyChoiceModal.value = true;
    return;
  }

  // if(!pesan.value || !saran.value){
  //   showEmptyFieldModal.value = true;
  //   return;
  // }

  const payload = {
    kesan: options.value[selectedOption.value-1].name,
    pesan: pesan.value,
    saran: saran.value
  }
  const token = localStorage.getItem('token')

  try {
    const res = await fetch(`${apiUrl}/reflection`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error('Server error');

    console.log(data)
    currentPage.value++;
  } catch (err) {
    console.error(err);
    showServerErrorModal.value = true;
  }
}
</script>