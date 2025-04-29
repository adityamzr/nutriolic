<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-14 w-18 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/home')" class="h-10 w-10" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-show="currentPage > 0 && currentPage < 3" class="h-16 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('back')" class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-show="currentPage < 2" class="h-16 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 right-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('next')" class="h-12 w-12 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="z-10 justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl">REFLEKSI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90 rounded-3xl">
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">

        <!-- Start of quiz -->
        <div class="w-full pt-2 pb-4 px-2 h-full overflow-auto">
          <div v-show="currentPage === 0" class="flex justify-center gap-2">
            <div class="-scale-x-100">
              <ChefRight class="w-40"/>
            </div>
            <div class="flex flex-col w-full pt-4">
              <span class="text-white text-xs">🔥 Halo, Petualang Cerdas! 🔥</span>
              <p class="text-white text-xs text-justify mt-4">
                Setelah menggunakan aplikasi ini, bagaimana perasaan Anda? Yuk, luangkan sedikit waktu untuk merefleksikan pengalaman yang baru saja dijalani. Setiap jawaban yang diberikan akan sangat berarti untuk memahami sejauh mana aplikasi ini dapat membantu atau memberikan kesan bagi Anda.
              </p>
            </div>
          </div>
          <!-- Start of choices -->
          <span v-show="currentPage === 1" class="text-xs font-semibold text-white">Bagaimana Perasaan Anda setelah menggunakan aplikasi ini?</span>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <label
              v-show="currentPage === 1"
              v-for="(option, index) in options"
              :key="index"
              class="flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer bg-yellow-300 hover:bg-rose-400"
              :class="{ 'bg-rose-50': selectedOption === option.value }"
            >
              <input
                type="radio"
                :value="option.value"
                v-model="selectedOption"
                class="hidden"
              />
              <Element :src="`/element/${option.name}.png`" customClass="h-24 mb-2" />
              <span class="text-sm text-center hover:text-white">{{ option.name }}</span>
            </label>

            <div v-show="currentPage === 2" class="flex flex-col w-full h-40 items-center text-xs bg-yellow-300 p-2 rounded-lg">
              <span class="font-semibold">Jika Anda memiliki perasaan, Anda dapat menulis di kotak ini!</span>
              <client-only>
                <QuillEditor v-model:modelValue="pesan" class="w-full mt-2 h-full"/>
              </client-only>
            </div> 
            <div v-show="currentPage === 2" class="flex flex-col w-full h-40 items-center text-xs p-2 rounded-lg bg-yellow-300">
              <span class="font-semibold">Jika Anda memiliki saran, Tulis juga di bawah. Thank you great student!</span>
              <client-only>
                <QuillEditor v-model:modelValue="saran" class="w-full mt-2 h-full"/>
              </client-only>
            </div> 
          </div>
          <!-- End of choices -->
          <div v-show="currentPage === 2" class="flex w-full justify-center mt-6">
            <button @click="handleSubmit()" class="w-28 py-2 px-2 rounded-full bg-rose-400">
              <LilitaText class="text-stroke-2 text-2xl">SUBMIT</LilitaText>
            </button>
          </div>

          <div v-show="currentPage === 3" class="flex justify-center gap-2">
            <div class="-scale-x-100">
              <ChefRight class="w-40"/>
            </div>
            <div class="flex flex-col w-full pt-4">
              <span class="text-white text-xs">🔥 Halo, Petualang Cerdas! 🔥</span>
              <p class="text-white text-xs text-justify mt-4">
                Terima kasih telah berbagi perasaan Anda! Semoga pengalaman ini memberikan manfaat dan kesan yang menyenangkan.
              </p>
            </div>
          </div>
        </div>
         <!-- End of quiz -->
      </div>
    </div>
    <div v-show="currentPage > 0 && currentPage < 3" class="absolute bottom-0 right-0 z-10">
      <ChefRight class="w-24"/>
    </div>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/strawberry.png" customClass="absolute bottom-20 left-1/2 w-10"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/potato.png" customClass="absolute bottom-20 right-2/3 w-10"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/grape.png" customClass="absolute bottom-24 left-64 w-10"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/lemon.png" customClass="absolute bottom-28 right-24 w-10"/>
    <Element v-show="currentPage === 0 || currentPage === 3" src="/element/shallot.png" customClass="absolute bottom-24 left-2/3 w-12"/>
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