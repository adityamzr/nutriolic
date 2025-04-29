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
      <LilitaText class="text-stroke-4 text-6xl">NUTRISI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
         <!-- Start of PAGE 1 -->
         <div id="page-1" v-show="currentPage === 1"  class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-bold">Merumuskan Masalah</span>
          <p class="text-white text-xs">
            Pertimbangkan pernyataan berikut ini:
            “Otak manusia hanya terdiri dari sekitar 2% dari berat badan, namun menggunakan hampir 20% dari total energi yang kita konsumsi. Nutrisi yang kita makan memiliki dampak langsung terhadap fungsi kognitif, suasana hati, dan kesehatan otak.”
            Buatlah Pertanyaan yang sesuai dengan masalah yang telah disajikan di atas
          </p>
          <span class="text-white text-xs font-semibold mb-1">Pertanyaan:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q1"/>
          </client-only>
          <span class="text-white text-xs font-bold">Merumuskan Hipotesis</span>
          <p class="text-white text-xs">
            Berdasarkan pemahaman Anda tentang hubungan antara makanan dan otak, buatlah hipotesis tentang bagaimana pola makan tertentu dapat mempengaruhi konsentrasi seseorang saat belajar.
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
            A. Perhatikan tabel berikut <span @click="openImage('/element/img-q3.png')" class="text-yellow-400 cursor-pointer">(Lihat tabel)</span>. Diet A: Tinggi lemak jenuh dan gula, rendah serat dan protein. Diet B: Tinggi asam lemak omega-3, protein, dan serat, dengan sedikit gula. Tabel di bawah ini menunjukkan hasil tes kognitif pada kelompok yang mengonsumsi masing-masing diet selama tiga bulan:
          </p>
          <span class="text-white text-xs font-semibold">Pertanyaan:</span>
          <p class="text-white text-xs mb-1">Berdasarkan data di atas, apa yang dapat Anda simpulkan tentang hubungan antara diet dan fungsi kognitif?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.q3"/>
          </client-only>
         </div>
         <!-- End of PAGE 2 -->
         <!-- Start of PAGE 3 -->
         <div id="page-3" v-show="currentPage === 3" class="w-full pt-2 pb-4 h-full overflow-auto">
          <p class="text-white text-xs">
            B. Berdasarkan narasi sebelumnya, tubuh kita membutuhkan nutrisi yang seimbang untuk membantu otak berfungsi secara optimal. Carilah referensi sebanyak-banyaknya mengenai makanan yang termasuk dalam kategori nutrisi berikut ini:
          </p>
          <span class="text-white text-xs font-semibold">Karbohidrat:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.carbs"/>
          </client-only>
          <span class="text-white text-xs font-semibold">Protein:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.proteins"/>
          </client-only>
          <span class="text-white text-xs font-semibold">Lemak:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.fats"/>
          </client-only>
          <span class="text-white text-xs font-semibold">Vitamin:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.vitamins"/>
          </client-only>
          <span class="text-white text-xs font-semibold">Mineral:</span>
          <client-only>
            <QuillEditor v-model:modelValue="answers.minerals"/>
          </client-only>
         </div>
         <!-- End of PAGE 3 -->
         <!-- Start of PAGE 4 -->
         <div id="page-4" v-show="currentPage === 4" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-bold">Merancang Experimen</span>
          <p class="text-white text-xs">
            Misalkan Anda sedang merancang sebuah eksperimen untuk menguji hipotesis Anda tentang hubungan antara Obesitas dan Kalori yang Dibutuhkan. Lengkapi setiap bagian dari desain eksperimen di bawah ini.
          </p>
          <span class="text-white text-xs font-semibold">P4: Variabel Independen</span>
          <p class="text-white text-xs mb-1">Aspek spesifik apa dari komponen nutrisi yang akan Anda analisis dalam kaitannya dengan kemampuan otak untuk berkonsentrasi? Jelaskan.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p4"/>
          </client-only>
          <span class="text-white text-xs font-semibold">P5: Variabel Tergantung</span>
          <p class="text-white text-xs mb-1">Hasil apa yang akan Anda ukur dalam eksperimen Anda?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p5"/>
          </client-only>
         </div>
         <!-- End of PAGE 4-->
         <!-- Start of PAGE 5 -->
         <div id="page-5" v-show="currentPage === 5" class="w-full pt-2 pb-4 h-full overflow-auto">
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
         <!-- End of PAGE 5 -->
         <!-- Start of PAGE 6 -->
         <div id="page-6" v-show="currentPage === 6" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-semibold">P8: Langkah-langkah Eksperimen</span>
          <p class="text-white text-xs mb-1">Uraikan langkah-langkah yang akan Anda lakukan untuk menguji hipotesis Anda.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.p8"/>
          </client-only>
         </div>
         <!-- End of PAGE 6 -->
         <!-- Start of PAGE 7 -->
         <div id="page-7" v-show="currentPage === 7" class="w-full pt-2 pb-4 h-full overflow-auto">
          <span class="text-white text-xs font-semibold">Jawablah pertanyaan-pertanyaan berikut dengan tepat:</span>
          <p class="text-white text-xs my-1">Mengapa makanan penting untuk tubuh?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.a1"/>
          </client-only>
          <p class="text-white text-xs mt-2 mb-1">Analisislah apa yang akan terjadi pada tubuh jika kita kekurangan nutrisi.</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.a2"/>
          </client-only>
          <p class="text-white text-xs mt-2 mb-1">Mengapa makanan dianggap sebagai sumber energi bagi tubuh?</p>
          <client-only>
            <QuillEditor v-model:modelValue="answers.a3"/>
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

const openImage = (path) => {
  modalSrc.value = path;
  showImageModal.value = true;
};

const answers = ref({
  q1: '',
  q2: '',
  q3: '',
  carbs: '',
  proteins: '',
  fats: '',
  vitamins: '',
  minerals: '',
  p4: '',
  p5: '',
  p6: '',
  p7: '',
  p8: '',
  a1: '',
  a2: '',
  a3: '',
  conclusion: '',
});

const pageMap = [
  { id: 'page-1', fields: ['q1', 'q2'] },
  { id: 'page-2', fields: ['q3'] },
  { id: 'page-3', fields: ['carbs', 'proteins', 'fats', 'vitamins', 'minerals'] },
  { id: 'page-4', fields: ['p4', 'p5'] },
  { id: 'page-5', fields: ['p6', 'p7'] },
  { id: 'page-6', fields: ['p8'] },
  { id: 'page-7', fields: ['a1', 'a2', 'a3'] },
  { id: 'page-8', fields: ['conclusion'] },
];

const handleClick = (path) => {
  const current = pageMap[currentPage.value - 1]; // halaman sekarang
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
      router.push('/nutrition/video');
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
    const res = await fetch(`${apiUrl}/nutrisi-responses`, {
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
    router.push('/nutrition/pre-quiz');
  } catch (err) {
    console.error(err);
    showServerErrorModal.value = true;
  }
}
</script>