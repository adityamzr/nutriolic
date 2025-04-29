<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div v-show="currentPage != 3" class="h-14 w-18 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/home')" class="h-10 w-10" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-show="currentPage > 0 && currentPage != 3" class="h-16 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('back')" class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-show="currentPage != 3" class="z-10 flex justify-center absolute top-3 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl">GAME</LilitaText>
    </div>
    <div v-show="currentPage != 3" class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90 rounded-3xl">
      <!-- KALKULATOR BMR -->
      <div v-show="currentPage != 2" class="flex justify-center items-center w-[95%] h-[90%] z-10">
        <!-- KALKULATOR -->
        <div v-show="currentPage === 0" class="flex h-full items-start gap-4">
          <div class="w-1/2 h-full">
            <p class="text-xs text-white text-justify">BMR (Basal Metabolic Rate) digunakan untuk menentukan jumlah kalori minimum yang dibutuhkan tubuh Anda untuk menjalankan fungsi dasarnya. BMR dapat membantu Anda mengetahui kebutuhan kalori harian Anda, dan menjaga kesehatan Anda.</p>
          </div>
          <div class="w-1/2 h-full">
            <div class="w-full h-fit bg-yellow-300 rounded-lg py-2 px-4 text-center">
              <LilitaText class="text-stroke-2 text-2xl">Kalkulator BMR</LilitaText>
              <input v-model="bmrInput.age" type="number" placeholder="Usia 15-80" class="px-4 py-1 md:py-2 rounded-lg w-full mb-2">
              <div class="flex items-center gap-2 mb-2">
                <label class="flex items-center gap-2">
                  <input
                    class="w-6 h-6"
                    type="radio"
                    name="gender"
                    value="male"
                    v-model="bmrInput.gender"
                  />
                  Pria
                </label>
                <label class="flex items-center gap-2">
                  <input
                    class="w-6 h-6"
                    type="radio"
                    name="gender"
                    value="female"
                    v-model="bmrInput.gender"
                  />
                  Wanita
                </label>
              </div>
              <input v-model="bmrInput.height" type="number" placeholder="Tinggi Badan (cm)" class="px-4 py-1 md:py-2 rounded-lg w-full mb-2">
              <input v-model="bmrInput.weight" type="number" placeholder="Berat Badan (kg)" class="px-4 py-1 md:py-2 rounded-lg w-full mb-2">
              <button @click="handleBMR()" class="mt-2 mb-1 px-6 py-2 bg-rose-400 text-white rounded">
                Hitung BMR-ku
              </button>
            </div>
          </div>
        </div>

        <!-- HASIL BMR -->
        <div v-show="currentPage === 1" class="flex flex-col w-full h-full justify-start items-center text-center mt-8 gap-2">
          <span class="text-white text-xl font-bold">BMR kamu adalah {{ bmr }} kalori per hari</span>
          <span class="text-yellow-400 text-md font-bold">Ayo susun makanan ke dalam piring berdasarkan BMR-mu!</span>
          <div @click="handleClick('next')" class="flex flex-col items-center justify-center">
            <span class="text-green-400 font-bold">Click The Plate!</span>
            <Element src="/element/game-plate.png" customClass="w-32"/>
          </div>
        </div>
      </div>

      <!-- GAME PIRING -->
      <div v-show="currentPage === 2" class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
        
        <!-- Area Piring -->
        <div class="relative flex flex-col justify-center w-[60%] h-full gap-2">
          <!-- Piring besar -->
          <div class="border-2 p-4 rounded-full self-center w-48 h-48 flex flex-wrap content-center justify-center bg-gray-50">
            <div class="relative border-2 border-black p-1 rounded-full w-40 h-40 flex flex-wrap content-center justify-center bg-gray-300">
              <div class="absolute top-[40%] left-0 w-1/2 h-0.5 bg-black"></div>
              <div class="absolute bottom-[40%] right-0 w-1/2 h-0.5 bg-black"></div>
              <div class="absolute left-1/2 top-0 h-full w-0.5 bg-black"></div>
              <draggable :list="bigPlateItems" group="foods" item-key="id" class="grid grid-cols-2 gap-2">
                <template #item="{ element }">
                  <Element :src="`/element/${element.name}.png`" customClass="w-12 z-10"/>
                </template>
              </draggable>
            </div>
          </div>

          <!-- Piring kecil -->
          <div class="absolute -top-1 -right-1 z-20">
            <div class="border-2 p-4 rounded-full w-28 h-28 flex flex-wrap content-center justify-center bg-gray-50">
              <div class="border-2 border-black p-1 rounded-full w-[80px] h-[80px] flex flex-wrap content-center justify-center bg-gray-300">
                <draggable :list="littlePlateItems" group="foods" item-key="id" class="grid grid-cols-2 gap-2">
                  <template #item="{ element }">
                    <Element :src="`/element/${element.name}.png`" customClass="w-12"/>
                  </template>
                </draggable>
              </div>
            </div>
          </div>

          <div class="w-[70%] h-24 bg-yellow-300 rounded-lg py-2 px-4 self-end">
            <p class="text-xs font-semibold">Susun makanan di atas piring, dan mari kita mulai membuat piring Anda!</p>
          </div>
        </div>

        <!-- Area Drag Makanan -->
        <div class="flex flex-col items-center w-[40%] h-full">
          <div class="border-2 border-black p-2 rounded-lg w-full h-full max-w-md bg-rose-300">
            <draggable :list="foodItems" group="foods" item-key="id" class="grid grid-cols-4 gap-4">
              <template #item="{ element }">
                <Element :src="`/element/${element.name}.png`" customClass="w-16"/>
              </template>
            </draggable>
          </div>
  
          <!-- Tombol Simpan -->
          <button @click="submitPlate" class="mt-2 px-6 py-2 bg-green-500 text-white rounded">
            Simpan Pilihan
          </button>
        </div>

      </div>

      <div v-show="currentPage === 0" class="absolute bottom-8 left-[100px] md:w-40 z-10">
        <div class="relative items-center w-52 md:w-56">
          <Element src="/element/cloud2.png" customClass="w-48 -scale-x-100"/>
          <div class="absolute w-36 h-32 inset-5 pb-8 flex items-center justify-center px-2 text-xs text-center font-semibold text-black">
            Ayo hitung BMR kamu, dan susun menu makanan berdasarkan kebutuhan kalori harianmu!
          </div>
        </div>
      </div>
      
      <div class="absolute -bottom-20 -left-5 md:w-40 -scale-x-100 z-10">
        <ChefRight class="w-36"/>
      </div>

      <Element v-show="currentPage === 2" src="/element/strawberry.png" customClass="absolute top-5 left-5 w-10"/>
      <Element v-show="currentPage === 2" src="/element/potato.png" customClass="absolute top-20 left-5 w-10"/>
      <Element v-show="currentPage === 2" src="/element/lemon.png" customClass="absolute top-0 left-24 w-10"/>
      <Element v-show="currentPage === 2" src="/element/shallot.png" customClass="absolute -top-1 right-5 w-12"/>
      <Element v-show="currentPage === 2" src="/element/paprica.png" customClass="absolute top-2 right-28 w-10"/>
      <Element v-show="currentPage === 2" src="/element/brocolis.png" customClass="absolute bottom-24 left-1/2 w-12"/>
      <Element v-show="currentPage === 2" src="/element/mango.png" customClass="absolute bottom-16 left-90 w-12"/>
    </div>
    <!-- GOOD JOB -->
    <div v-show="currentPage === 3" class="relative justify-center items-end w-[80%] h-[80%] p-2 bg-rose-400 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="relative flex flex-col justify-center pl-20 items-center gap-2 w-[95%] h-[100%] z-10">
        <Element src="/element/nipis.png" customClass="absolute top-4 left-40 w-12"/>
        <Element src="/element/strawberry.png" customClass="absolute top-0 left-1/2 w-12"/>
        <Element src="/element/lemon.png" customClass="absolute top-0 right-24 w-12"/>
        <Element src="/element/mango.png" customClass="absolute bottom-12 left-40 w-12"/>
        <Element src="/element/tomato.png" customClass="absolute bottom-10 right-20 w-12"/>
        <LilitaText class="text-stroke-4 text-black text-7xl">GOOD JOB</LilitaText>
        <p class="text-white text-xs w-3/4 text-center font-semibold">Yeay, kamu berhasil menyelesaikan gamenya! 🏅 Cek BMR dan pilihan nutrisi kamu luar biasa.
          Saatnya kembali ke Home dan lanjutkan perjalanan sehatmu!</p>
        <div class="flex w-full justify-center mt-2">
          <button @click="handleClick('/home')" class="w-32 py-2 px-2 rounded-full bg-blue-900">
            <LilitaText class="text-stroke-2 text-white text-4xl">HOME</LilitaText>
          </button>
        </div>
      </div>
      <div class="absolute bottom-3 left-0">
        <Element src="/element/nice-chef.png" class="w-40"></Element>
      </div>
    </div>
    <!-- END OF GOOD JOB -->

  </div>
  <EmptyFieldModal v-if="showEmptyFieldModal" @close="showEmptyFieldModal = false" />
  <ServerErrorModal v-if="showServerErrorModal" @close="showServerErrorModal = false" />
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();
const apiUrl = useRuntimeConfig().public.API_BASE_URL;

const showEmptyFieldModal = ref(false);
const showServerErrorModal = ref(false);
const showCorrect = ref(false);
const currentPage = ref(0);
const foodItems = ref([
  { id: 1, name: 'kol' },
  { id: 2, name: 'brocolis' },
  { id: 3, name: 'yogurt' },
  { id: 4, name: 'mushroom' },
  { id: 5, name: 'terong' },
  { id: 6, name: 'egg' },
  { id: 7, name: 'milk' },
  { id: 8, name: 'fish' },
  { id: 9, name: 'salmon' },
  { id: 10, name: 'bread' },
  { id: 11, name: 'chicken' },
  { id: 12, name: 'tempe' },
  { id: 13, name: 'kiwi' },
  { id: 14, name: 'rice' },
]);
const littlePlateItems = ref([])
const bigPlateItems = ref([])
const bmrInput = ref({
  age: '',
  gender: '',
  height: '',
  weight: '',
});
const bmr = ref('');

const handleClick = (direction) => {
  if(direction === 'back'){
    currentPage.value--;
  }else if(direction === 'next'){
    currentPage.value++;
  }else{
    router.push(direction)
  }
};

const submitPlate = async () => {
  console.log('BMI:', bmr.value)
  console.log('Piring berisi:', toRaw(littlePlateItems.value))
  console.log('Piring berisi:', toRaw(bigPlateItems.value))

  if(littlePlateItems.value.length === 0 && bigPlateItems.value.length === 0){
    showEmptyFieldModal.value = true;
    return; 
  }

  const payload = {
    bmi: bmr.value,
    littlePlate: toRaw(littlePlateItems.value),
    bigPlate: toRaw(bigPlateItems.value)
  }
  const token = localStorage.getItem('token')
  console.log(payload)
  try {
    const res = await fetch(`${apiUrl}/game`, {
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

const handleBMR =  () => {
  bmr.value = calculateBMR({
    age: bmrInput.value.age,
    gender: bmrInput.value.gender,
    height: bmrInput.value.height,
    weight: bmrInput.value.weight,
  });
  if(bmr.value) currentPage.value++;
  console.log('BMR kamu adalah:', bmr.value, 'kalori per hari');
}

const calculateBMR = ({ gender, weight, height, age }) => {
  if (!gender || !weight || !height || !age) {
    showEmptyFieldModal.value = true;
    return false;
  }

  let bmr = 0;

  if (gender.toLowerCase() === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else if (gender.toLowerCase() === 'female') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  } else {
    throw new Error("Gender harus 'male' atau 'female'.");
  }

  return Math.round(bmr);
}
</script>