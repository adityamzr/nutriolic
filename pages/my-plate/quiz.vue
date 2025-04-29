<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div v-if="showQuiz" class="h-14 w-18 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('exit')" class="h-10 w-10" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-if="showQuizTitle" class="z-10 justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-center text-5xl min-w-96">ISI PIRINGKU</LilitaText>
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
    id: 16,
    option_id: '001',
    code: 1,
    category: 'gizi',
    question: 'Apa alasan ilmiah di balik pemberian porsi buah dan sayur yang lebih besar dalam panduan “Isi Piringku”, khususnya bagi remaja?',
    answer: 'c',
    label: 'C. Karena buah dan sayur membantu menjaga fungsi pencernaan, daya tahan tubuh, dan mencegah penyakit jangka panjang yang rawan terjadi saat remaja.',
    explaination: 'Panduan “Isi Piringku” menekankan pentingnya buah dan sayur karena kandungan serat, vitamin, dan antioksidannya membantu memperkuat sistem imun, memperlancar pencernaan, dan mencegah penyakit degeneratif. Ini sangat penting bagi remaja yang sedang dalam masa pertumbuhan.',
    img_path: '/element/n6.png',
    option: [
      { value: 'a', label: 'A. Karena buah dan sayur menghasilkan energi paling tinggi dibanding zat gizi lainnya, sehingga cocok dikonsumsi dalam jumlah banyak.' },
      { value: 'b', label: 'B. Karena serat, vitamin, dan mineral dari buah dan sayur sangat dibutuhkan untuk pertumbuhan otot dan pembentukan energi utama dalam tubuh.' },
      { value: 'c', label: 'C. Karena buah dan sayur membantu menjaga fungsi pencernaan, daya tahan tubuh, dan mencegah penyakit jangka panjang yang rawan terjadi saat remaja.' },
      { value: 'd', label: 'D. Karena buah dan sayur mengandung lemak sehat yang dibutuhkan lebih besar porsinya dibanding karbohidrat dan protein.' },
    ]
  },
  1: {
    id: 17,
    option_id: '002',
    code: 2,
    category: 'gizi',
    question: 'Berdasarkan proporsi "Isi Piringku", jika seseorang mengonsumsi makanan dengan komposisi 60% biji-bijian dan 10% sayuran, apa konsekuensi paling mungkin terjadi?',
    answer: 'b',
    label: 'B. Peningkatan kadar gula darah karena kekurangan serat.',
    explaination: 'Konsumsi biji-bijian berlebih (terutama jika olahan) dan rendahnya asupan sayur menyebabkan asupan serat rendah. Ini bisa memicu peningkatan kadar gula darah dan masalah pencernaan karena tidak seimbangnya komposisi makanan.',
    img_path: '/element/n7.png',
    option: [
      { value: 'a', label: 'A. Penyerapan kalsium dalam tubuh meningkat.' },
      { value: 'b', label: 'B. Peningkatan kadar gula darah karena kekurangan serat.' },
      { value: 'c', label: 'C. Regenerasi sel tubuh berjalan optimal.' },
      { value: 'd', label: 'D. Risiko anemia meningkat karena kekurangan zat besi.' },
    ]
  },
  2: {
    id: 18,
    option_id: '003',
    code: 3,
    category: 'gizi',
    question: 'Apa dampak yang paling mungkin terjadi jika seseorang hanya mengonsumsi 1–2 porsi buah dan sayur per hari secara terus-menerus?',
    answer: 'c',
    label: 'C. Risiko kekurangan mikronutrien seperti vitamin dan serat meningkat.',
    explaination: 'Asupan buah dan sayur yang sangat rendah tidak cukup untuk memenuhi kebutuhan vitamin, mineral, dan serat. Dalam jangka panjang, hal ini bisa memicu masalah seperti gangguan imun, sembelit, dan risiko penyakit degeneratif.',
    img_path: '/element/n8.png',
    option: [
      { value: 'a', label: 'A. Tubuh menyimpan lebih banyak energi dari protein.' },
      { value: 'b', label: 'B. Pencernaan menjadi lebih cepat dan lancar.' },
      { value: 'c', label: 'C. Risiko kekurangan mikronutrien seperti vitamin dan serat meningkat.' },
      { value: 'd', label: 'D. Kebutuhan zat besi terpenuhi dari sumber lain.' },
    ]
  },
  3: {
    id: 19,
    option_id: '004',
    code: 4,
    category: 'gizi',
    question: 'Dalam suatu sekolah terdapat 200 siswa yang terdiri dari: 80 siswa usia 10–14 tahun, 120 siswa usia 15–19 tahun. Diketahui bahwa: 15,3% anak usia 10–14 tahun tidak mengonsumsi buah/sayur, 13,3% anak usia 15–19 tahun tidak mengonsumsi buah/sayur. Berapakah jumlah total siswa yang tidak mengonsumsi buah dan sayur dalam seminggu?',
    answer: 'a',
    label: 'A. 28 siswa.',
    explaination: 'Perhitungan: Usia 10–14 tahun: 15,3% × 80 = 12,24 siswa → dibulatkan menjadi 12 siswa. Usia 15–19 tahun: 13,3% × 120 = 15,96 siswa → dibulatkan menjadi 16 siswa. Total: 12 + 16 = 28 siswa.',
    img_path: '/element/n9.png',
    option: [
      { value: 'a', label: 'A. 28 siswa.' },
      { value: 'b', label: 'B. 27 siswa.' },
      { value: 'c', label: 'C. 26 siswa.' },
      { value: 'd', label: 'D. 30 siswa.' },
    ]
  },
  4: {
    id: 20,
    option_id: '005',
    code: 5,
    category: 'gizi',
    question: 'Mengapa penerapan “Isi Piringku” dapat membantu mencegah anemia dan masalah pertumbuhan pada remaja?',
    answer: 'c',
    label: 'C. Karena mendorong konsumsi buah, sayur, dan protein yang mengandung zat besi dan nutrisi penting untuk pertumbuhan.',
    explaination: 'Anemia pada remaja umumnya disebabkan oleh kurangnya asupan zat besi dan vitamin penting. “Isi Piringku” mendorong konsumsi makanan seimbang, termasuk buah, sayur, dan lauk berprotein tinggi seperti daging, ikan, atau kacang-kacangan yang mengandung zat besi.',
    img_path: '/element/n10.png',
    option: [
      { value: 'a', label: 'A. Karena membantu meningkatkan konsumsi kalori secara signifikan agar tidak mudah lapar.' },
      { value: 'b', label: 'B. Karena menurunkan kebutuhan zat besi dan protein sehingga remaja tidak kelebihan zat gizi.' },
      { value: 'c', label: 'C. Karena mendorong konsumsi buah, sayur, dan protein yang mengandung zat besi dan nutrisi penting untuk pertumbuhan.' },
      { value: 'd', label: 'D. Karena menyarankan untuk tidak mengonsumsi makanan pokok sehingga kadar gula darah stabil.' },
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