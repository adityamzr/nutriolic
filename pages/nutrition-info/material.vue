<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-14 lg:h-24 w-18 lg:w-24 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('exit')" class="h-10 w-10 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/home.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="h-16 lg:h-24 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 left-0 lg:left-4 flex justify-evenly items-center">
      <CircleButton @click="handleClick('back')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div v-show="currentPage < 6" class="h-16 lg:h-24 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 right-0 lg:right-4 flex justify-evenly items-center">
      <CircleButton @click="handleClick('next')" class="h-12 w-12 lg:h-16 lg:w-16 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 lg:top-10 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-5xl lg:text-8xl min-w-96">INFORMASI GIZI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-20"/>
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
         <!-- Start of PAGE 1 -->
         <div id="page-1" v-show="currentPage === 1" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Merumuskan Masalah</span>
          <p class="text-white text-xs lg:text-lg">
            Berdasarkan narasi di atas, “BPOM menekankan pentingnya menerapkan prinsip-prinsip gizi seimbang dalam kehidupan sehari-hari untuk mencegah penyakit tidak menular. Prinsip ini meliputi mengonsumsi makanan sesuai isi piringku, membaca label gizi sebelum membeli produk makanan atau minuman, dan menjaga pola makan dengan membatasi asupan gula, garam, dan lemak sesuai anjuran Kementerian Kesehatan.”
          </p>
          <span class="text-white text-xs lg:text-lg font-semibold">Pertanyaan:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q1" class="my-1 lg:mt-2"/>
          </client-only>
          <span class="text-white text-xs lg:text-xl font-bold">Merumuskan Hipotesis</span>
          <p class="text-white text-xs lg:text-lg">
            Berdasarkan pemahaman Anda tentang hubungan antara gizi dan kesehatan tubuh, buatlah hipotesis tentang bagaimana kebiasaan membaca label gizi dapat mempengaruhi pola makan seseorang.
          </p>
          <span class="text-white text-xs lg:text-lg font-semibold mb-1">Hipotesis:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q2" class="my-1 lg:mt-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 1 -->
         <!-- Start of PAGE 2 -->
         <div id="page-2" v-show="currentPage === 2" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Mengumpulkan Data</span>
          <p class="text-white text-xs lg:text-lg">
            A. Berikut ini adalah dua kelompok yang memiliki kebiasaan berbeda dalam membaca label nutrisi sebelum membeli produk makanan:
          </p>
          <div class="w-full flex justify-center">
            <Element src="/element/nutfact.png" class="mt-2 w-3/4"></Element>
          </div>
          <span class="text-white text-xs lg:text-lg font-bold">Jawaban berdasarkan data</span>
          <p class="text-white text-xs lg:text-lg mb-1">
            Berdasarkan data di atas, apa yang dapat Anda simpulkan mengenai hubungan antara kebiasaan membaca label gizi dengan pola makan sehat?
          </p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q3" class="my-1 lg:mt-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 2 -->
         <!-- Start of PAGE 3 -->
         <div id="page-3" v-show="currentPage === 3" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Merancang Experimen</span>
          <p class="text-white text-xs lg:text-lg mb-1 lg:mb-2">
            Misalkan Anda merencanakan sebuah eksperimen untuk menguji hipotesis tentang hubungan antara membaca label nutrisi dan pola makan sehat. Lengkapi setiap bagian dari desain eksperimen di bawah ini.
          </p>
          <span class="text-white text-xs lg:text-lg font-semibold">P4: Variabel Independen</span>
          <p class="text-white text-xs lg:text-lg mb-1"> Dalam eksperimen ini, aspek spesifik apa yang akan diuji terkait kebiasaan membaca label nutrisi dan pola makan sehat?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p4" class="my-1 lg:mt-2"/>
          </client-only>
          <span class="text-white text-xs lg:text-lg font-semibold">P5: Variabel Terikat</span>
          <p class="text-white text-xs lg:text-lg mb-1">Hasil apa yang akan diukur dalam eksperimen ini?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p5" class="my-1 lg:mt-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 3 -->
         <!-- Start of PAGE 4 -->
         <div id="page-4" v-show="currentPage === 4" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-lg font-semibold">P6: Variabel Kontrol</span>
          <p class="text-white text-xs lg:text-lg mb-1">Variabel apa yang akan Anda jaga agar tetap konstan untuk memastikan tes yang adil?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p6" class="my-1 lg:mt-2"/>
          </client-only>
          <span class="text-white text-xs lg:text-lg font-semibold">P7: Bahan dan Peralatan</span>
          <p class="text-white text-xs lg:text-lg mb-1">Sebutkan bahan dan peralatan yang diperlukan untuk melakukan percobaan ini.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p7" class="my-1 lg:mt-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 4 -->
         <!-- Start of PAGE 5 -->
         <div id="page-5" v-show="currentPage === 5" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-lg font-semibold">P8: Langkah-langkah Eksperimen</span>
          <p class="text-white text-xs lg:text-lg mb-1">Uraikan langkah-langkah yang akan Anda lakukan untuk menguji hipotesis Anda.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p8" class="my-1 lg:mt-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 5 -->
          <!-- Start of PAGE 6 -->
         <div id="page-6" v-show="currentPage === 6" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Menarik Kesimpulan</span>
          <p class="text-white text-xs lg:text-lg mb-1">Berdasarkan data yang diberikan dan percobaan yang telah dirancang, buatlah kesimpulan tentang hubungan antara makanan dan fungsi otak.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.conclusion" class="my-1 lg:mt-2"/>
          </client-only>
          <div class="flex w-full justify-center mt-6">
            <button @click="handleSubmit()" class="w-fit py-2 px-2 lg:px-4 rounded-full bg-yellow-200">
              <LilitaText class="text-stroke-2 text-2xl lg:text-4xl">SIMPAN</LilitaText>
            </button>
          </div>
         </div>
         <!-- End of PAGE 6 -->
      </div>
    </div>
  </div>
  <EmptyFieldModal v-if="showEmptyFieldModal" @close="showEmptyFieldModal = false" />
  <ServerErrorModal v-if="showServerErrorModal" @close="showServerErrorModal = false" />
  <ImageModal v-if="showImageModal" :src="modalSrc" @close="showImageModal = false"/>

  <!-- Modal Exit -->
  <div class="fixed inset-0 z-50 flex items-center justify-center" v-if="showExitModal" @close="showExitModal = false">
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
    <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl z-10 text-center">
      <h2 class="text-xl font-bold text-yellow-600 mb-4">Perhatian!</h2>
      <span class="text-sm text-gray-600">Apakah Anda yakin ingin keluar?</span>
      <p class="text-xs text-gray-600 mb-4">Semua isian Anda akan hilang dan harus diisi kembali dari awal.</p>
      <button
        @click="showExitModal = false"
        class="px-2 py-2 mr-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
        Batal
      </button>
      <button
        @click="handleExit('/material-menu')"
        class="px-2 py-2 ml-2 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
        Keluar
      </button>
    </div>
  </div>
</template>

<script setup>
import QuillEditor from '~/components/QuillEditor.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const apiUrl = useRuntimeConfig().public.API_BASE_URL;
const showEmptyFieldModal = ref(false);
const showServerErrorModal = ref(false);

const showExitModal = ref(false);
const showImageModal = ref(false);
const modalSrc = ref('');
const currentPage = ref(1)

const answers = ref({
  q1: '',
  q2: '',
  q3: '',
  p4: '',
  p5: '',
  p6: '',
  p7: '',
  p8: '',
  conclusion: '',
});

const pageMap = [
  { id: 'page-1', fields: ['q1', 'q2'] },
  { id: 'page-2', fields: ['q3'] },
  { id: 'page-3', fields: ['p4', 'p5'] },
  { id: 'page-4', fields: ['p6', 'p7'] },
  { id: 'page-5', fields: ['p8'] },
  { id: 'page-6', fields: ['conclusion'] },
];

const handleClick = (path) => {
  const current = pageMap[currentPage.value - 1];
  const isEmpty = current.fields.some((field) => {
    const value = answers.value[field];
    return !value || value === '<p><br></p>';
  });

  if (path === 'exit') {
    showExitModal.value = true;
    return;
  }

  if (path === 'back') {
    if (currentPage.value > 1) {
      currentPage.value--;
    } else {
      router.push('/nutrition-info/info');
    }
    return;
  }

  // if (isEmpty) {
  //   showEmptyFieldModal.value = true;
  //   return;
  // }

  if (currentPage.value < pageMap.length) {
    currentPage.value++;
  }
};

const handleExit = (path) => {
  router.push(path)
};

const handleSubmit = async () => {
  const current = pageMap[currentPage.value - 1];
  const isEmpty = current.fields.some((field) => {
    const value = answers.value[field];
    return !value || value === '<p><br></p>';
  });

  if (isEmpty) {
    showEmptyFieldModal.value = true;
    return;
  }

  const payload = JSON.stringify(answers.value)
  const token = localStorage.getItem('token')

  try {
    const res = await fetch(`${apiUrl}/gizi-responses`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: payload,
    });

    const data = await res.json();

    if (!res.ok) throw new Error('Server error');
    console.log(data)
    router.push('/nutrition-info/pre-quiz');
  } catch (err) {
    console.error(err);
    showServerErrorModal.value = true;
  }
}
</script>