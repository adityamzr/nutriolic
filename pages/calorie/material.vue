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
    <div v-show="currentPage < 10" class="h-16 lg:h-24 w-16 md:w-24 absolute top-1/2 -translate-y-1/2 right-0 lg:right-4 flex justify-evenly items-center">
      <CircleButton @click="handleClick('next')" class="h-12 w-12 lg:h-16 lg:w-16 rotate-180" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 lg:top-10 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">KALORI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
         <!-- Start of PAGE 1 -->
         <div id="page-1" v-show="currentPage === 1" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Merumuskan Masalah</span>
          <p class="text-white text-xs lg:text-lg">
            Perhatikan pernyataan berikut ini:“Obesitas adalah suatu kondisi di mana tubuh memiliki kelebihan lemak yang dapat meningkatkan risiko berbagai penyakit kronis, seperti diabetes, penyakit jantung, dan gangguan pernapasan. Data menunjukkan bahwa angka obesitas pada anak di Indonesia meningkat 10 kali lipat dalam 10 tahun terakhir.”
          </p>
          <span class="text-white text-xs lg:text-lg font-semibold">Pertanyaan:</span>
          <p class="text-white text-xs lg:text-lg mb-1">Mengapa obesitas dapat menyebabkan berbagai komplikasi kesehatan? Tulislah pertanyaan penelitian yang dapat dikembangkan dari pernyataan di atas!</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q1" class="my-1 lg:my-2"/>
          </client-only>
          <span class="text-white text-xs lg:text-lg font-bold">Merumuskan Hipotesis</span>
          <p class="text-white text-xs lg:text-lg">
            Berdasarkan pemahaman Anda mengenai obesitas dan dampaknya terhadap kesehatan, buatlah hipotesis bagaimana pola makan dan gaya hidup dapat mempengaruhi risiko obesitas.
          </p>
          <span class="text-white text-xs lg:text-lg font-semibold mb-1">Hipotesis:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q2" class="my-1 lg:my-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 1 -->
         <!-- Start of PAGE 2 -->
         <div id="page-2" v-show="currentPage === 2" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Mengumpulkan Data</span>
          <p class="text-white text-xs lg:text-lg">
            A. Berikut ini adalah data kebutuhan kalori berdasarkan usia dan jenis kelamin <span @click="openImage('/element/cal-activities.png')" class="text-yellow-400 cursor-pointer">(Lihat tabel)</span>. Carilah referensi untuk mengisi tabel aktivitas ringan, sedang, dan berat di bawah ini.
          </p>
          <table class="table-auto bg-white border border-gray-400 w-full mt-1">
            <thead>
              <tr>
                <th class="border text-xs lg:text-lg">Ringan</th>
                <th class="border text-xs lg:text-lg">Sedang</th>
                <th class="border text-xs lg:text-lg">Berat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 3" :key="n">
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.activities.light['r' + n]"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.activities.currently['r' + n]"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.activities.heavy['r' + n]"></td>
              </tr>
            </tbody>
          </table>
          <span class="text-white text-xs lg:text-lg font-bold">Jawaban berdasarkan data</span>
          <p class="text-white text-xs lg:text-lg mb-1">
            Berdasarkan data aktivitas di atas, seorang siswa termasuk dalam kelompok yang memiliki aktivitas ringan, sedang, atau berat, mengapa?
          </p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q3" class="my-1 lg:my-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 2 -->
         <!-- Start of PAGE 3 -->
         <div id="page-3" v-show="currentPage === 3" class="w-full pt-2 pb-4 h-full overflow-auto">
          <p class="text-white text-xs lg:text-lg mb-1">
            Berdasarkan tabel kebutuhan energi <span @click="openImage('/element/cal-activities.png')" class="text-yellow-400 cursor-pointer">(Lihat tabel)</span>, mengapa kebutuhan kalori pria lebih tinggi daripada wanita pada semua rentang usia?
          </p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q4" class="my-1 lg:my-2"/>
          </client-only>
          <p class="text-white text-xs lg:text-lg my-1">Bagaimana perbedaan kebutuhan kalori antara seseorang yang beraktivitas ringan, sedang, dan berat? Berikan contoh aktivitas yang termasuk ke dalam masing-masing kategori!</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q5" class="my-1 lg:my-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 3 -->
         <!-- Start of PAGE 4 -->
         <div id="page-4" v-show="currentPage === 4" class="w-full pt-2 pb-4 h-full overflow-auto">
          <p class="text-white text-xs lg:text-lg">B. Buatlah menu makanan dengan gizi seimbang (karbohidrat, protein, lemak, vitamin dan mineral) yang dapat memenuhi kebutuhan harian Anda sebagai pelajar.</p>
          <table class="table-auto bg-white border border-gray-400 w-full mt-1">
            <thead>
              <tr>
                <th colspan="2" class="border text-xs lg:text-lg">Menu</th>
                <th class="border text-xs lg:text-lg">Kuantitas</th>
                <th class="border text-xs lg:text-lg">Jumlah Energi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border text-xs lg:text-lg text-center px-2 font-bold">Karbohidrat</td>
                <td class="border text-xs lg:text-lg text-center">Nasi Putih</td>
                <td class="border text-xs lg:text-lg text-center">1 mangkuk</td>
                <td class="border text-xs lg:text-lg text-center">630 kal</td>
              </tr>
              <tr v-for="n in 3" :key="n">
                <td class="border text-xs lg:text-lg text-center font-bold">{{ items[n-1] }}</td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center w-[120px] md:w-auto" v-model="answers.food_items.protein[context[n-1]]"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center w-[120px] md:w-auto" v-model="answers.food_items.fat[context[n-1]]"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center w-[120px] md:w-auto" v-model="answers.food_items.vitamin[context[n-1]]"></td>
              </tr>
            </tbody>
          </table>
          <p class="text-white text-xs lg:text-lg my-1">Berdasarkan menu makanan yang Anda buat, apakah menu tersebut sudah memenuhi kebutuhan energi dan gizi harian siswa? Jika tidak, apa yang perlu ditambahkan atau dikurangi?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q6" class="my-1 lg:my-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 4-->
         <!-- Start of PAGE 5 -->
         <div id="page-5" v-show="currentPage === 5" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Merancang Experimen</span>
          <p class="text-white text-xs lg:text-lg mb-1 lg:mb-2">
            Misalkan Anda sedang merancang sebuah eksperimen untuk menguji hipotesis Anda tentang hubungan antara Obesitas dan Kalori yang Dibutuhkan. Amatilah tabel Data yang merupakan simulasi hasil experiment yang kalian design, lalu lengkapi setiap bagian dari desain eksperimen di halaman selanjutnya!
          </p>
          <div class="overflow-auto w-full">
            <table class="table-auto bg-white border border-gray-400 w-full mt-1">
              <thead>
                <tr class="bg-yellow-400">
                  <th class="border text-xs lg:text-lg p-2">No</th>
                  <th class="border text-xs lg:text-lg p-2">Nama</th>
                  <th class="border text-xs lg:text-lg p-2">Jenis Kelamin</th>
                  <th class="border text-xs lg:text-lg p-2">Usia</th>
                  <th class="border text-xs lg:text-lg p-2">Aktivitas Harian</th>
                  <th class="border text-xs lg:text-lg p-2">Hari 1</th>
                  <th class="border text-xs lg:text-lg p-2">Hari 2</th>
                  <th class="border text-xs lg:text-lg p-2">Hari 3</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(n, index) in experiments" :key="n">
                  <td class="border text-xs lg:text-lg text-center">{{ index+1 }}</td>
                  <td class="border text-xs lg:text-lg text-center">{{ n.name }}</td>
                  <td class="border text-xs lg:text-lg text-center">{{ n.gender }}</td>
                  <td class="border text-xs lg:text-lg text-center">{{ n.age }}</td>
                  <td class="border text-xs lg:text-lg text-center">{{ n.activities }}</td>
                  <td class="border text-xs lg:text-lg text-center">{{ n.day1 }}</td>
                  <td class="border text-xs lg:text-lg text-center">{{ n.day2 }}</td>
                  <td class="border text-xs lg:text-lg text-center">{{ n.day3 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
         </div>
         <!-- End of PAGE 5 -->
         <!-- Start of PAGE 5 -->
         <div id="page-6" v-show="currentPage === 6" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Merancang Experimen</span>
          <p class="text-white text-xs lg:text-lg mb-1 lg:mb-2">
            Misalkan Anda sedang merancang sebuah eksperimen untuk menguji hipotesis Anda tentang hubungan antara Obesitas dan Kalori yang Dibutuhkan. Lengkapi setiap bagian dari desain eksperimen di bawah ini.
          </p>
          <span class="text-white text-xs lg:text-lg font-semibold">P4: Variabel Independen</span>
          <p class="text-white text-xs lg:text-lg mb-1">Aspek spesifik yang akan dianalisis dalam hubungan antara obesitas dan kebutuhan kalori adalah Jawaban.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p4" class="my-1 lg:my-2"/>
          </client-only>
          <span class="text-white text-xs lg:text-lg font-semibold">P5: Variabel Tergantung</span>
          <p class="text-white text-xs lg:text-lg mb-1">Hasil apa yang akan Anda ukur dalam eksperimen Anda?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p5" class="my-1 lg:my-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 6 -->
         <!-- Start of PAGE 7 -->
         <div id="page-7" v-show="currentPage === 7" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-lg font-semibold">P6: Variabel Kontrol</span>
          <p class="text-white text-xs lg:text-lg mb-1">Variabel apa yang akan Anda jaga agar tetap konstan untuk memastikan tes yang adil?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p6" class="my-1 lg:my-2"/>
          </client-only>
          <span class="text-white text-xs lg:text-lg font-semibold">P7: Bahan dan Peralatan</span>
          <p class="text-white text-xs lg:text-lg mb-1">Sebutkan bahan dan peralatan yang diperlukan untuk melakukan percobaan ini.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p7" class="my-1 lg:my-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 7 -->
         <!-- Start of PAGE 8 -->
         <div id="page-8" v-show="currentPage === 8" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-lg font-semibold">P8: Langkah-langkah Eksperimen</span>
          <p class="text-white text-xs lg:text-lg mb-1">Uraikan langkah-langkah yang akan Anda lakukan untuk menguji hipotesis Anda.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p8" class="my-1 lg:my-2"/>
          </client-only>
         </div>
         <!-- End of PAGE 8 -->
         <!-- Start of PAGE 9 -->
         <div id="page-9" v-show="currentPage === 9" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-lg font-semibold">P9: Data Hasil Experimen</span>
          <p class="text-white text-xs lg:text-lg mb-1">Amati dan pahami tabel kosong yang tersedia di bawah ini. Cocokkan dan isi tabel tersebut dengan data yang sesuai berdasarkan gambar yang disediakan. <span @click="openImage('/element/experimen-kal.jpg')" class="text-yellow-400 cursor-pointer">(Lihat foto disini)</span>.</p>
          <table class="table-auto bg-white border border-gray-400 w-full mt-1">
            <thead>
              <tr class="bg-yellow-400">
                <th class="border text-xs lg:text-lg p-2">No</th>
                <th class="border text-xs lg:text-lg p-2">Nama</th>
                <th class="border text-xs lg:text-lg p-2">Jenis Kelamin</th>
                <th class="border text-xs lg:text-lg p-2">Usia</th>
                <th class="border text-xs lg:text-lg p-2">Aktivitas Harian</th>
                <th class="border text-xs lg:text-lg p-2">Hari 1</th>
                <th class="border text-xs lg:text-lg p-2">Hari 2</th>
                <th class="border text-xs lg:text-lg p-2">Hari 3</th>
                <th class="border text-xs lg:text-lg p-2">Rata-rata kalori (kcal)</th>
                <th class="border text-xs lg:text-lg p-2">Status Kalori</th>
                <th class="border text-xs lg:text-lg p-2">Dampak terhadap Tubuh</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(n, i) in 3" :key="i">
                <td class="border text-xs lg:text-lg text-center">{{ i+1 }}</td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data' + (i + 1)].name"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].gender"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].age"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].activities"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].day1"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].day2"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].day3"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].average"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].status"></td>
                <td class="border text-xs lg:text-lg text-center"><input type="text" class="text-center" v-model="answers.p9['data'+ (i + 1)].impact"></td>
              </tr>
            </tbody>
          </table>
         </div>
         <!-- End of PAGE 9 -->
          <!-- Start of PAGE 10 -->
         <div id="page-10" v-show="currentPage === 10" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Menarik Kesimpulan</span>
          <p class="text-white text-xs lg:text-lg mb-1">Berdasarkan data yang diberikan dan percobaan yang telah dirancang, buatlah kesimpulan tentang hubungan antara makanan dan fungsi otak.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.conclusion" class="my-1 lg:my-2"/>
          </client-only>
          <div class="flex w-full justify-center mt-6">
            <button @click="handleSubmit()" class="w-fit py-2 px-2 lg:px-4 rounded-full bg-yellow-200">
              <LilitaText class="text-stroke-2 text-2xl lg:text-4xl">SIMPAN</LilitaText>
            </button>
          </div>
         </div>
         <!-- End of PAGE 10 -->
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
  p9: {
    data1: {
      name: "",
      gender: "",
      age: "",
      activities: "",
      day1: "",
      day2: "",
      day3: "",
      average: "",
      status: "",
      impact: "",
    },
    data2: {
      name: "",
      gender: "",
      age: "",
      activities: "",
      day1: "",
      day2: "",
      day3: "",
      average: "",
      status: "",
      impact: "",
    },
    data3: {
      name: "",
      gender: "",
      age: "",
      activities: "",
      day1: "",
      day2: "",
      day3: "",
      average: "",
      status: "",
      impact: "",
    },
  },
  conclusion: '',
});

const pageMap = [
  { id: 'page-1', fields: ['q1', 'q2'] },
  { id: 'page-2', fields: ['activities', 'q3'] },
  { id: 'page-3', fields: ['q4', 'q5'] },
  { id: 'page-4', fields: ['food_items', 'q6'] },
  { id: 'page-5', fields: [] },
  { id: 'page-6', fields: ['p4', 'p5'] },
  { id: 'page-7', fields: ['p6', 'p7'] },
  { id: 'page-8', fields: ['p8'] },
  { id: 'page-9', fields: ['p9'] },
  { id: 'page-10', fields: ['conclusion'] },
];

const experiments = ref([
  {
    name: "Marselino",
    gender: "Laki-laki",
    age: "14",
    activities: "Pelajar, tidak pernah olahraga",
    day1: "Nasi putih, Mie instan, Pizza, Burger, Es krim",
    day2: "Es krim, Tempe goreng, Ayam goreng, Donat",
    day3: "Nasi putih, Tahu goreng, Soda manis, Mie instan"
  },
  {
    name: "Salsabila",
    gender: "Perempuan",
    age: "13",
    activities: "Pelajar, olahraga ringan (senam 2x/minggu)",
    day1: "Nasi putih, Sayur bayam, Ikan panggang, Apel, Susu full cream",
    day2: "Nasi putih, Tempe goreng, Pisang, Susu full cream",
    day3: "Nasi putih, Ayam goreng, Apel, Es krim"
  },
  {
    name: "Dimas",
    gender: "Laki-laki",
    age: "15",
    activities: "Pelajar, olahraga sedang (futsal 3x/minggu)",
    day1: "Nasi putih, Ayam goreng, Kentang goreng, Soda manis",
    day2: "Nasi putih, Tahu goreng, Burger, Es krim",
    day3: "Nasi putih, Ikan panggang, Sayur bayam, Pisang"
  }
]);

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

    if (field === 'p9') {
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
  console.log(answers.value)
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