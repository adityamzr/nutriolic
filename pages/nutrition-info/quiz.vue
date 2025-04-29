<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div v-if="showQuiz" class="h-14 w-18 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('exit')" class="h-10 w-10" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-if="showQuizTitle" class="z-10 min-w-96 justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-5xl">INFORMASI GIZI</LilitaText>
    </div>
    <div v-if="showScore" class="z-10 justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl">SKOR</LilitaText>
    </div>
    <div v-if="showQuiz" class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
        <!-- Start of quiz -->
        <div class="w-full pt-2 pb-4 px-2 h-full overflow-auto">
          <span class="text-white text-xs font-bold">Soal {{ currentPage + 1 }}</span>
          <p class="text-white text-xs text-justify">
            {{ questions[currentPage].question }}
            <span @click="openImage(questions[currentPage].img_path)" class="text-yellow-400 cursor-pointer">(Lihat gambar)</span>
          </p>
          <span class="text-white text-xs font-semibold">Pilih jawabanmu:</span>
          <!-- Start of choices -->
          <div class="grid grid-cols-2 gap-4 mt-2">
            <label
              v-for="(option, index) in questions[currentPage].option"
              :key="index"
              class="flex items-center p-3 border-2 rounded-lg cursor-pointer bg-white hover:bg-rose-400"
              :class="{ 'bg-rose-50': selectedOption === option.value }"
            >
              <input
                type="radio"
                :value="option.value"
                v-model="selectedOption"
                class="hidden"
              />
              <span class="text-xs hover:text-white">{{ option.label }}</span>
            </label>
          </div>
          <!-- End of choices -->
          <div class="flex w-full justify-center mt-6">
            <button @click="handleSubmit()" class="w-28 py-2 px-2 rounded-full bg-yellow-200">
              <LilitaText class="text-stroke-2 text-2xl">SUBMIT</LilitaText>
            </button>
          </div>
         </div>
         <!-- End of quiz -->
      </div>
    </div>

    <!-- GOOD JOB -->
    <div v-if="showCorrect" class="relative justify-center items-end w-[80%] h-[80%] p-2 bg-rose-400 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="relative flex flex-col justify-center pl-20 items-center gap-2 w-[95%] h-[100%] z-10">
        <Element src="/element/nipis.png" customClass="absolute top-8 left-40 w-12"/>
        <Element src="/element/strawberry.png" customClass="absolute top-8 left-1/2 w-12"/>
        <Element src="/element/lemon.png" customClass="absolute top-8 right-24 w-12"/>
        <Element src="/element/mango.png" customClass="absolute bottom-12 left-40 w-12"/>
        <Element src="/element/tomato.png" customClass="absolute bottom-10 right-24 w-12"/>
        <LilitaText class="text-stroke-4 text-black text-7xl">GOOD JOB</LilitaText>
        <div class="flex w-full justify-center">
          <button @click="handleNext()" class="w-28 py-2 px-2 rounded-full bg-blue-900">
            <LilitaText class="text-stroke-2 text-white text-4xl">NEXT</LilitaText>
          </button>
        </div>
      </div>
      <div class="absolute bottom-3 left-[15px]">
        <Element src="/element/nice-chef.png" class="w-40"></Element>
      </div>
    </div>
    <!-- END OF GOOD JOB -->
    <!-- TRY AGAIN -->
    <div v-if="showWrong" class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-red-800 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="relative flex flex-col justify-center pl-20 items-center w-[95%] h-[100%] z-10">
        <Element src="/element/nipis.png" customClass="absolute top-8 left-40 w-12"/>
        <Element src="/element/sukun.png" customClass="absolute bottom-10 right-24 w-12"/>
        <Element src="/element/lemon.png" customClass="absolute top-5 right-24 w-12"/>
        <Element src="/element/shallot.png" customClass="absolute bottom-12 left-40 w-12"/>
        <Element src="/element/egg.png" customClass="absolute top-8 left-1/2 w-12"/>
        <LilitaText class="text-stroke-4 text-black text-7xl">TRY AGAIN</LilitaText>
        <div class="flex flex-col w-full items-center">
          <span class="text-white text-lg font-bold">Check jawabanmu disini</span>
          <button @click="handleCheck()" class="w-32 py-2 px-2 rounded-full bg-blue-900">
            <LilitaText class="text-stroke-2 text-white text-4xl">CHECK</LilitaText>
          </button>
        </div>
      </div>
      <div class="absolute bottom-3 left-[15px]">
        <Element src="/element/try-chef.png" class="w-36"></Element>
      </div>
    </div>
    <!-- END OF TRY AGAIN -->
    <!-- EXPLAINATION -->
    <div v-if="showExplaination" class="relative flex justify-center items-end w-[75%] h-[75%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-20"/>
      <div class="flex flex-col justify-center items-center gap-2 md:gap-0 w-[100%] h-[85%] z-10">
        <div class="flex items-center justify-center gap-2 overflow-auto">
          <div class="w-[20%] -scale-x-100">
            <ChefRight class="w-32"/>
          </div>
          <div class="flex flex-col w-[80%] h-full">
            <span class="text-white text-xs font-bold">{{ questions[currentPage].label }}</span>
            <p class="text-white text-xs mt-2">
              <span class="text-white text-xs font-bold">🔍 Penjelasan Ilmiah:</span>
              {{ questions[currentPage].explaination }}
            </p>
          </div>
        </div>

        <button @click="handleNext()" class="w-24 py-2 px-2 rounded-full bg-yellow-200">
          <LilitaText class="text-stroke-2 text-2xl">NEXT</LilitaText>
        </button>
      </div>
    </div>
    <!-- END OF EXPLAINATION -->
    <!-- SCORE -->
    <div v-if="showScore" class="relative flex justify-center items-end w-[75%] h-[75%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-20"/>
      <div class="relative flex flex-col justify-center items-center gap-2 md:gap-0 w-[100%] h-[85%] z-10">
        <div class="flex items-center justify-center mb-5">
          <div class="flex items-center w-full h-full">
            <LilitaText class="text-7xl">{{ score }}</LilitaText>
          </div>
        </div>
        <div class="absolute bottom-3 left-10 -scale-x-100">
          <ChefRight class="w-32"/>
        </div>
        <button @click="handleNext()" class="w-24 py-2 px-2 rounded-full bg-yellow-200">
          <LilitaText class="text-stroke-2 text-2xl">NEXT</LilitaText>
        </button>
      </div>
    </div>
    <!-- END OF SCORE -->
  </div>
  <EmptyChoiceModal v-if="showEmptyChoiceModal" @close="showEmptyChoiceModal = false" />
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
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const apiUrl = useRuntimeConfig().public.API_BASE_URL;
const currentPage = ref(0)

const showEmptyChoiceModal = ref(false);
const showServerErrorModal = ref(false);
const showExitModal = ref(false);
const showImageModal = ref(false);
const showQuiz = ref(true);
const showQuizTitle = ref(true);
const showCorrect = ref(false);
const showWrong = ref(false);
const showExplaination = ref(false);
const showScore = ref(false);
const modalSrc = ref('');
const score = ref(0);

const openImage = (path) => {
  modalSrc.value = path;
  showImageModal.value = true;
};

const questions = ref({
  0: {
    id: 11,
    option_id: '001',
    code: 1,
    category: 'gizi',
    question: 'Berdasarkan informasi nilai gizi yang tersedia dan prinsip keseimbangan gizi harian (termasuk asupan protein, vitamin, dan kandungan gula/lemak), manakah produk yang lebih sehat untuk dikonsumsi dan mengapa?',
    answer: 'b',
    label: 'B. Produk A lebih sehat karena meskipun kalorinya lebih tinggi, ia menyediakan protein, lemak sehat, serta vitamin dan mineral penting yang tidak dimiliki oleh Produk B.',
    explaination: 'Produk A (susu) memang memiliki kalori lebih tinggi, tetapi juga menyediakan gizi lengkap: protein, lemak sehat, vitamin A, D, B kompleks, dan mineral penting. Produk B (minuman bersoda) hanya menyediakan kalori dari gula, tanpa nilai gizi lain, menjadikannya kurang sehat. Dalam memilih makanan, penting mempertimbangkan keseimbangan nutrisi, bukan hanya jumlah kalori.',
    img_path: '/element/n1.png',
    option: [
      { value: 'a', label: 'A. Produk B lebih sehat karena memiliki kalori lebih rendah, gula yang cukup, dan nol lemak, sehingga cocok dikonsumsi bagi yang sedang diet kalori.' },
      { value: 'b', label: 'B. Produk A lebih sehat karena meskipun kalorinya lebih tinggi, ia menyediakan protein, lemak sehat, serta vitamin dan mineral penting yang tidak dimiliki oleh Produk B.' },
      { value: 'c', label: 'C. Produk B lebih sehat karena kadar gulanya lebih tinggi, yang penting untuk sumber energi instan saat pagi hari dan memiliki natrium lebih rendah.' },
      { value: 'd', label: 'D. Produk A lebih sehat karena memiliki lebih banyak karbohidrat dan natrium yang dibutuhkan tubuh untuk aktivitas fisik tinggi, meski tanpa vitamin.' },
    ]
  },
  1: {
    id: 12,
    option_id: '002',
    code: 2,
    category: 'gizi',
    question: 'Manakah pernyataan yang paling benar berdasarkan argumen ilmiah tentang makanan tinggi gula namun rendah zat gizi lain?',
    answer: 'c',
    label: 'C. Makanan tinggi gula dapat menyebabkan lonjakan kadar gula darah yang cepat dan kemudian turun drastis.',
    explaination: 'Makanan tinggi gula cepat diserap tubuh, menyebabkan kadar gula darah melonjak, kemudian turun drastis, yang bisa memengaruhi energi dan konsentrasi. Ini dapat berdampak pada kesehatan jangka panjang, seperti risiko diabetes. Pilihan lain tidak benar karena mengabaikan pentingnya keseimbangan zat gizi.',
    img_path: '/element/n2.png',
    option: [
      { value: 'a', label: 'A. Kalori dari gula bisa langsung dibakar tubuh sehingga tidak menimbulkan masalah jika dikonsumsi dalam jumlah besar.' },
      { value: 'b', label: 'B. Minuman bersoda bisa menjadi sumber utama protein karena kandungan kalorinya tinggi.' },
      { value: 'c', label: 'C. Makanan tinggi gula dapat menyebabkan lonjakan kadar gula darah yang cepat dan kemudian turun drastis.' },
      { value: 'd', label: 'D. Kekurangan vitamin dan mineral bukan masalah asalkan kalori cukup.' },
    ]
  },
  2: {
    id: 13,
    option_id: '003',
    code: 3,
    category: 'gizi',
    question: 'Seorang remaja perempuan usia 14–18 tahun dengan aktivitas rendah memiliki kebutuhan energi harian sekitar 1.800 kkal. Ia mengonsumsi 3 bungkus selai kacang, masing-masing 562 kkal. Apa dampaknya?',
    answer: 'b',
    label: 'B. Konsumsi tersebut melebihi kebutuhan energi hariannya dan berisiko menyebabkan kelebihan energi jika dikonsumsi terus-menerus.',
    explaination: '3 bungkus selai kacang = 3 × 562 = 1.686 kkal, hampir seluruh kebutuhan hariannya (1.800 kkal). Jika dia juga mengonsumsi makanan lain, maka total kalori harian akan berlebih, dan jika pola ini berlangsung lama, bisa meningkatkan risiko penambahan berat badan atau kelebihan energi.',
    img_path: '/element/n3.png',
    option: [
      { value: 'a', label: 'A. Konsumsi tersebut masih sangat jauh di bawah kebutuhan energi hariannya, sehingga ia perlu menambah asupan energi dari makanan lain.' },
      { value: 'b', label: 'B. Konsumsi tersebut melebihi kebutuhan energi hariannya dan berisiko menyebabkan kelebihan energi jika dikonsumsi terus-menerus.' },
      { value: 'c', label: 'C. Konsumsi tersebut tepat dan sesuai dengan kebutuhan energi harian.' },
      { value: 'd', label: 'D. Konsumsi tersebut hanya mencukupi setengah dari kebutuhan energi harian.' },
    ]
  },
  3: {
    id: 14,
    option_id: '004',
    code: 4,
    category: 'gizi',
    question: 'Berdasarkan informasi gizi pada mi instan, manakah pernyataan berikut yang paling tepat dan didukung argumen ilmiah kuat?',
    answer: 'd',
    label: 'D. Mi instan dapat memenuhi sebagian energi, tetapi konsumsi rutin 2–3 bungkus per hari berisiko menimbulkan gangguan tekanan darah tinggi akibat kelebihan natrium.',
    explaination: 'Mi instan umumnya mengandung natrium tinggi, dan konsumsi berlebihan dapat meningkatkan tekanan darah dan risiko penyakit jantung. Meski mengandung beberapa vitamin, nilai gizinya tetap terbatas. Mengandalkan mi instan sebagai makanan utama dapat mengganggu keseimbangan nutrisi harian.',
    img_path: '/element/n4.png',
    option: [
      { value: 'a', label: 'A. Konsumsi 3 bungkus mi instan sudah memenuhi kebutuhan energi dan natrium secara ideal, namun dapat menyebabkan anemia karena kurang zat besi.' },
      { value: 'b', label: 'B. Meskipun tinggi garam, konsumsi rutin mi instan aman karena mengandung vitamin B dan zat besi yang mencegah stroke.' },
      { value: 'c', label: 'C. Kandungan natrium tinggi pada mi instan bermanfaat untuk tekanan darah, asalkan banyak minum air.' },
      { value: 'd', label: 'D. Mi instan dapat memenuhi sebagian energi, tetapi konsumsi rutin 2–3 bungkus per hari berisiko menimbulkan gangguan tekanan darah tinggi akibat kelebihan natrium.' },
    ]
  },
  4: {
    id: 15,
    option_id: '005',
    code: 5,
    category: 'gizi',
    question: 'Manakah rancangan eksperimen paling tepat untuk memahami pentingnya membaca informasi gizi sebelum membeli makanan?',
    answer: 'c',
    label: 'C. Melakukan eksperimen dengan dua kelompok siswa: satu diberi informasi gizi sebelum memilih makanan, satu tidak; kemudian membandingkan pilihan makanan mereka.',
    explaination: 'Pilihan C merupakan eksperimen kuasi yang membandingkan dua kelompok, sehingga dapat mengungkap secara langsung pengaruh informasi gizi terhadap perilaku memilih makanan. Ini mencerminkan metode ilmiah yang kuat karena ada variabel kontrol dan pengamatan perilaku nyata.',
    img_path: '/element/n5.png',
    option: [
      { value: 'a', label: 'A. Membandingkan rasa antara junk food dan makanan sehat, lalu menyebarkan kuesioner mengenai rasa yang paling disukai.' },
      { value: 'b', label: 'B. Membuat video edukasi gizi dan menilai perubahan perilaku makan setelah seminggu.' },
      { value: 'c', label: 'C. Melakukan eksperimen dengan dua kelompok siswa: satu diberi informasi gizi sebelum memilih makanan, satu tidak; kemudian membandingkan pilihan makanan mereka.' },
      { value: 'd', label: 'D. Melakukan survei terhadap merek junk food populer dan membuat daftar makanan sehat penggantinya.' },
    ]
  },

})

const selectedOption = ref('')

const handleClick = (path) => {
  if (path === 'exit') {
    showExitModal.value = true;
    return;
  }
};

const handleExit = (path) => {
  router.push(path)
};

const handleNext = () => {
  const questionsLength = Object.keys(questions.value).length;
  let scorePage = showScore.value;

  if(currentPage.value + 1 === questionsLength){
    if(scorePage) router.push('/material-menu');
    else{
      showScore.value = true;
      showQuizTitle.value = false;
    }
  }else{
    currentPage.value++;
    showQuiz.value = true;
  }

  selectedOption.value = '';
  showCorrect.value = false;
  showWrong.value = false;
  showExplaination.value = false;
}

const handleCheck = () => {
  showWrong.value = false;
  showQuizTitle.value = true;
  showExplaination.value = true;
}

const handleSubmit = async () => {
  if (!selectedOption.value) {
    showEmptyChoiceModal.value = true;
    return;
  }

  const is_correct = selectedOption.value === questions.value[currentPage.value].answer;
  score.value = is_correct ? score.value += 20 : score.value += 0;

  const payload = {
    questionId: questions.value[currentPage.value].id,
    response: selectedOption.value,
    score: is_correct ? 20 : 0
  }
  const token = localStorage.getItem('token')

  try {
    const res = await fetch(`${apiUrl}/quiz`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error('Server error');

    if(is_correct){
      showCorrect.value = true;
      showQuiz.value = false;
      showQuizTitle.value = false;
    }else{
      showWrong.value = true;
      showQuiz.value = false;
      showQuizTitle.value = false;
    }
    console.log(data)
  } catch (err) {
    console.error(err);
    showServerErrorModal.value = true;
  }
}
</script>