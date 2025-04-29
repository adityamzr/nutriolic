<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-14 w-18 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('exit')" class="h-10 w-10" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="h-16 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('back')" class="h-12 w-12" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-show="currentPage < 8" class="h-16 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 right-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('next')" class="h-12 w-12 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl">KALORI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
         <!-- Start of PAGE 1 -->
         <div id="page-1" v-show="currentPage === 1" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-bold">Merumuskan Masalah</span>
          <p class="text-white text-xs">
            Perhatikan pernyataan berikut ini:“Obesitas adalah suatu kondisi di mana tubuh memiliki kelebihan lemak yang dapat meningkatkan risiko berbagai penyakit kronis, seperti diabetes, penyakit jantung, dan gangguan pernapasan. Data menunjukkan bahwa angka obesitas pada anak di Indonesia meningkat 10 kali lipat dalam 10 tahun terakhir.”
          </p>
          <span class="text-white text-xs font-semibold">Pertanyaan:</span>
          <p class="text-white text-xs mb-1">Mengapa obesitas dapat menyebabkan berbagai komplikasi kesehatan? Tulislah pertanyaan penelitian yang dapat dikembangkan dari pernyataan di atas!</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q1"/>
          </client-only>
          <span class="text-white text-xs font-bold">Merumuskan Hipotesis</span>
          <p class="text-white text-xs">
            Berdasarkan pemahaman Anda mengenai obesitas dan dampaknya terhadap kesehatan, buatlah hipotesis bagaimana pola makan dan gaya hidup dapat mempengaruhi risiko obesitas.
          </p>
          <span class="text-white text-xs font-semibold mb-1">Hipotesis:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q2"/>
          </client-only>
         </div>
         <!-- End of PAGE 1 -->
         <!-- Start of PAGE 2 -->
         <div id="page-2" v-show="currentPage === 2" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-bold">Mengumpulkan Data</span>
          <p class="text-white text-xs">
            A. Berikut ini adalah data kebutuhan kalori berdasarkan usia dan jenis kelamin <span @click="openImage('/element/cal-activities.png')" class="text-yellow-400 cursor-pointer">(Lihat tabel)</span>. Carilah referensi untuk mengisi tabel aktivitas ringan, sedang, dan berat di bawah ini.
          </p>
          <table class="table-auto bg-white border border-gray-400 w-full mt-1">
            <thead>
              <tr>
                <th class="border text-xs">Ringan</th>
                <th class="border text-xs">Sedang</th>
                <th class="border text-xs">Berat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 3" :key="n">
                <td class="border text-xs text-center"><input type="text" class="text-center" v-model="answers.activities.light['r' + n]"></td>
                <td class="border text-xs text-center"><input type="text" class="text-center" v-model="answers.activities.currently['r' + n]"></td>
                <td class="border text-xs text-center"><input type="text" class="text-center" v-model="answers.activities.heavy['r' + n]"></td>
              </tr>
            </tbody>
          </table>
          <span class="text-white text-xs font-bold">Jawaban berdasarkan data</span>
          <p class="text-white text-xs mb-1">
            Berdasarkan data aktivitas di atas, seorang siswa termasuk dalam kelompok yang memiliki aktivitas ringan, sedang, atau berat, mengapa?
          </p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q3"/>
          </client-only>
         </div>
         <!-- End of PAGE 2 -->
         <!-- Start of PAGE 3 -->
         <div id="page-3" v-show="currentPage === 3" class="w-full pt-2 pb-4 h-full overflow-auto">
          <p class="text-white text-xs mb-1">
            Berdasarkan tabel kebutuhan energi <span @click="openImage('/element/cal-activities.png')" class="text-yellow-400 cursor-pointer">(Lihat tabel)</span>, mengapa kebutuhan kalori pria lebih tinggi daripada wanita pada semua rentang usia?
          </p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q4"/>
          </client-only>
          <p class="text-white text-xs my-1">Bagaimana perbedaan kebutuhan kalori antara seseorang yang beraktivitas ringan, sedang, dan berat? Berikan contoh aktivitas yang termasuk ke dalam masing-masing kategori!</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q5"/>
          </client-only>
         </div>
         <!-- End of PAGE 3 -->
         <!-- Start of PAGE 4 -->
         <div id="page-4" v-show="currentPage === 4" class="w-full pt-2 pb-4 h-full overflow-auto">
          <p class="text-white text-xs">B. Buatlah menu makanan dengan gizi seimbang (karbohidrat, protein, lemak, vitamin dan mineral) yang dapat memenuhi kebutuhan harian Anda sebagai pelajar.</p>
          <table class="table-auto bg-white border border-gray-400 w-full mt-1">
            <thead>
              <tr>
                <th colspan="2" class="border text-xs">Menu</th>
                <th class="border text-xs">Kuantitas</th>
                <th class="border text-xs">Jumlah Energi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border text-xs text-center px-2 font-bold">Karbohidrat</td>
                <td class="border text-xs text-center">Nasi Putih</td>
                <td class="border text-xs text-center">1 mangkuk</td>
                <td class="border text-xs text-center">630 kal</td>
              </tr>
              <tr v-for="n in 3" :key="n">
                <td class="border text-xs text-center font-bold">{{ items[n-1] }}</td>
                <td class="border text-xs text-center"><input type="text" class="text-center w-[120px] md:w-auto" v-model="answers.food_items.protein[context[n-1]]"></td>
                <td class="border text-xs text-center"><input type="text" class="text-center w-[120px] md:w-auto" v-model="answers.food_items.fat[context[n-1]]"></td>
                <td class="border text-xs text-center"><input type="text" class="text-center w-[120px] md:w-auto" v-model="answers.food_items.vitamin[context[n-1]]"></td>
              </tr>
            </tbody>
          </table>
          <p class="text-white text-xs my-1">Berdasarkan menu makanan yang Anda buat, apakah menu tersebut sudah memenuhi kebutuhan energi dan gizi harian siswa? Jika tidak, apa yang perlu ditambahkan atau dikurangi?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q6"/>
          </client-only>
         </div>
         <!-- End of PAGE 4-->
         <!-- Start of PAGE 5 -->
         <div id="page-5" v-show="currentPage === 5" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-bold">Merancang Experimen</span>
          <p class="text-white text-xs">
            Misalkan Anda sedang merancang sebuah eksperimen untuk menguji hipotesis Anda tentang hubungan antara Obesitas dan Kalori yang Dibutuhkan. Lengkapi setiap bagian dari desain eksperimen di bawah ini.
          </p>
          <span class="text-white text-xs font-semibold">P4: Variabel Independen</span>
          <p class="text-white text-xs mb-1">Aspek spesifik yang akan dianalisis dalam hubungan antara obesitas dan kebutuhan kalori adalah Jawaban.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p4"/>
          </client-only>
          <span class="text-white text-xs font-semibold">P5: Variabel Tergantung</span>
          <p class="text-white text-xs mb-1">Hasil apa yang akan Anda ukur dalam eksperimen Anda?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p5"/>
          </client-only>
         </div>
         <!-- End of PAGE 5 -->
         <!-- Start of PAGE 6 -->
         <div id="page-6" v-show="currentPage === 6" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-semibold">P6: Variabel Kontrol</span>
          <p class="text-white text-xs mb-1">Variabel apa yang akan Anda jaga agar tetap konstan untuk memastikan tes yang adil?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p6"/>
          </client-only>
          <span class="text-white text-xs font-semibold">P7: Bahan dan Peralatan</span>
          <p class="text-white text-xs mb-1">Sebutkan bahan dan peralatan yang diperlukan untuk melakukan percobaan ini.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p7"/>
          </client-only>
         </div>
         <!-- End of PAGE 6 -->
         <!-- Start of PAGE 7 -->
         <div id="page-7" v-show="currentPage === 7" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-semibold">P8: Langkah-langkah Eksperimen</span>
          <p class="text-white text-xs mb-1">Uraikan langkah-langkah yang akan Anda lakukan untuk menguji hipotesis Anda.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p8"/>
          </client-only>
         </div>
         <!-- End of PAGE 7 -->
          <!-- Start of PAGE 8 -->
         <div id="page-8" v-show="currentPage === 8" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-bold">Menarik Kesimpulan</span>
          <p class="text-white text-xs mb-1">Berdasarkan data yang diberikan dan percobaan yang telah dirancang, buatlah kesimpulan tentang hubungan antara makanan dan fungsi otak.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.conclusion"/>
          </client-only>
          <div class="flex w-full justify-center mt-6">
            <button @click="handleSubmit()" class="w-28 py-2 px-2 rounded-full bg-yellow-200">
              <LilitaText class="text-stroke-2 text-2xl">SIMPAN</LilitaText>
            </button>
          </div>
         </div>
         <!-- End of PAGE 8 -->
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

const items = ['Protein', 'Lemak', 'Vitamin'];
const context = ['menu', 'amount', 'energy_amount'];

const openImage = (path) => {
  modalSrc.value = path;
  showImageModal.value = true;
};

const answers = ref({
  q1: '',
  q2: '',
  q3: '',
  activities: {
    light: {
    r1: "",
    r2: "",
    r3: ""
    },
    currently: {
      r1: "",
      r2: "",
      r3: ""
    },
    heavy: {
      r1: "",
      r2: "",
      r3: ""
    }
  },
  q4: '',
  q5: '',
  food_items: {
    carb: {
      menu: "White rice",
      amount: "1 bowl",
      energy_amount: "630 cal"
    },
    protein: {
      menu: "",
      amount: "",
      energy_amount: ""
    },
    fat: {
      menu: "",
      amount: "",
      energy_amount: ""
    },
    vitamin: {
      menu: "",
      amount: "",
      energy_amount: ""
    },
  },
  q6: '',
  p4: '',
  p5: '',
  p6: '',
  p7: '',
  p8: '',
  conclusion: '',
});

const pageMap = [
  { id: 'page-1', fields: ['q1', 'q2'] },
  { id: 'page-2', fields: ['activities', 'q3'] },
  { id: 'page-3', fields: ['q4', 'q5'] },
  { id: 'page-4', fields: ['food_items', 'q6'] },
  { id: 'page-5', fields: ['p4', 'p5'] },
  { id: 'page-6', fields: ['p6', 'p7'] },
  { id: 'page-7', fields: ['p8'] },
  { id: 'page-8', fields: ['conclusion'] },
];

const handleClick = (path) => {
  const current = pageMap[currentPage.value - 1]; // halaman sekarang
  const isEmpty = current.fields.some((field) => {
    const value = answers.value[field];

    if (field === 'activities') {
      return Object.values(value).some((activity) =>
        Object.values(activity).some((v) => !v || v === '<p><br></p>')
      );
    }

    if (field === 'food_items') {
      const emptyFields = [];

      Object.entries(value).forEach(([key, item]) => {
        Object.entries(item).forEach(([subKey, v]) => {
          if (!v || v === '<p><br></p>') {
            emptyFields.push(`${key}.${subKey}`);
          }
        });
      });

      if (emptyFields.length > 0) {
        console.log('Field kosong:', emptyFields);
        return true;
      }

      return false;
    }

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
      router.push('/calorie/video');
    }
    return;
  }

  if (isEmpty) {
    showEmptyFieldModal.value = true;
    return;
  }

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
    const res = await fetch(`${apiUrl}/kalori-responses`, {
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
    router.push('/calorie/pre-quiz');
  } catch (err) {
    console.error(err);
    showServerErrorModal.value = true;
  }
}
</script>