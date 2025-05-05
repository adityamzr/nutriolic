<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div v-if="showQuiz" class="h-14 lg:h-24 w-18 lg:w-24 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('exit')" class="h-10 w-10 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/home.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div v-if="showQuizTitle" class="z-10 justify-center absolute top-5 lg:top-10 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">KALORI</LilitaText>
    </div>
    <div v-if="showScore" class="z-10 justify-center absolute top-5 lg:top-10 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">SKOR</LilitaText>
    </div>
    <div v-if="showQuiz" class="relative flex justify-center items-end w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="flex justify-center items-center gap-2 w-[95%] h-[90%] z-10">
        <!-- Start of quiz -->
        <div class="w-full pt-2 pb-4 px-2 h-full overflow-auto">
          <span class="text-white text-xs lg:text-xl font-bold">Soal {{ currentPage + 1 }}</span>
          <p class="text-white text-xs lg:text-lg text-justify">
            {{ questions[currentPage].question }}
            <span @click="openImage(questions[currentPage].img_path)" class="text-yellow-400 cursor-pointer">(Lihat gambar)</span>
          </p>
          <span class="text-white text-xs lg:text-lg font-semibold">Pilih jawabanmu:</span>
          <!-- Start of choices -->
          <div class="grid grid-cols-2 gap-4 mt-2">
            <label
              v-for="(option, index) in questions[currentPage].option"
              :key="index"
              class="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors"
              :class="{ 
                'bg-rose-400 text-white': selectedOption === option.value,
                'bg-white': selectedOption !== option.value }"
            >
              <input
                type="radio"
                :value="option.value"
                v-model="selectedOption"
                class="hidden"
              />
              <span class="text-xs lg:text-lg">{{ option.label }}</span>
            </label>
          </div>
          <!-- End of choices -->
          <div class="flex w-full justify-center mt-6">
            <button @click="handleSubmit()" class="w-fit py-2 px-2 lg:px-4 rounded-full bg-yellow-200">
              <LilitaText class="text-stroke-2 text-2xl lg:text-4xl">SUBMIT</LilitaText>
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
        <Element src="/element/nice-chef.png" class="w-40 lg:w-60"></Element>
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
        <Element src="/element/try-chef.png" class="w-36 lg:w-60"></Element>
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
            <ChefRight class="w-32 lg:w-52"/>
          </div>
          <div class="flex flex-col w-[80%] h-full">
            <span class="text-white text-xs lg:text-lg font-bold">{{ questions[currentPage].label }}</span>
            <p class="text-white text-xs lg:text-lg mt-2">
              <span class="text-white text-xs font-bold">🔍 Penjelasan Ilmiah:</span>
              {{ questions[currentPage].explaination }}
            </p>
          </div>
        </div>

        <button @click="handleNext()" class="w-fit py-2 px-2 lg:px-4 rounded-full bg-yellow-200">
          <LilitaText class="text-stroke-2 text-2xl lg:text-4xl">NEXT</LilitaText>
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
            <LilitaText class="text-7xl lg:text-9xl">{{ score }}</LilitaText>
          </div>
        </div>
        <div class="absolute bottom-3 left-10 -scale-x-100">
          <ChefRight class="w-32 lg:w-60"/>
        </div>
        <button @click="handleNext()" class="w-fit py-2 px-2 lg:px-4 rounded-full bg-yellow-200">
          <LilitaText class="text-stroke-2 text-2xl lg:text-4xl">NEXT</LilitaText>
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
    id: 6,
    option_id: '001',
    code: 1,
    category: 'kalori',
    question: 'Apa dampak utama dari stunting pada anak balita terhadap pembangunan suatu negara dalam jangka panjang?',
    answer: 'b',
    label: 'B. Berkurangnya potensi produktivitas dan kemampuan kognitif generasi mendatang.',
    explaination: 'Stunting atau pertumbuhan yang terhambat akibat kekurangan gizi kronis di masa awal kehidupan berdampak pada terganggunya perkembangan otak dan fisik anak. Anak stunting cenderung memiliki kemampuan kognitif yang lebih rendah dan produktivitas yang terbatas saat dewasa. Dalam jangka panjang, hal ini dapat menurunkan kualitas SDM suatu negara, menghambat pembangunan, serta meningkatkan beban ekonomi dan kesehatan.',
    img_path: '/element/kalori1.jpg',
    option: [
      { value: 'a', label: 'A. Menurunnya angka harapan hidup secara signifikan.' },
      { value: 'b', label: 'B. Berkurangnya potensi produktivitas dan kemampuan kognitif generasi mendatang.' },
      { value: 'c', label: 'C. Meningkatnya angka kematian akibat penyakit menular.' },
      { value: 'd', label: 'D. Meningkatnya tingkat obesitas di kalangan remaja.' },
    ]
  },
  1: {
    id: 7,
    option_id: '002',
    code: 2,
    category: 'aktivitas',
    question: 'Pernyataan yang tepat tentang tingkat aktivitas Damar adalah:',
    answer: 'c',
    label: 'C. Damar termasuk aktivitas ringan karena jarang berolahraga.',
    explaination: 'Tingkat aktivitas ringan ditandai dengan minimnya kegiatan fisik, seperti duduk, belajar, dan menggunakan HP. Meski Damar mengonsumsi 2.800 kkal, itu tidak menjadikannya termasuk dalam aktivitas berat. Tanpa aktivitas fisik yang tinggi, kalori sebanyak itu bisa berlebihan. Aktivitas berat biasanya melibatkan latihan fisik intens seperti yang dilakukan Farel.',
    img_path: '/element/kalori2.jpg',
    option: [
      { value: 'a', label: 'A. Damar termasuk sangat aktif karena konsumsi energinya tinggi.' },
      { value: 'b', label: 'B. Damar termasuk aktivitas sedang karena sering belajar.' },
      { value: 'c', label: 'C. Damar termasuk aktivitas ringan karena jarang berolahraga.' },
      { value: 'd', label: 'D. Damar termasuk aktivitas berat karena energinya 2.800 kkal.' },
    ]
},
2: {
    id: 8,
    option_id: '003',
    code: 3,
    category: 'kalori',
    question: 'Perhatikan grafik berikut tentang kebutuhan kalori harian berdasarkan tingkat aktivitas fisik. Kemudian pilih pernyataan yang paling didukung oleh data pada grafik.',
    answer: 'a',
    label: 'A. Jika seseorang meningkatkan aktivitasnya dari ringan menjadi berat, maka kebutuhan kalorinya bertambah sebanyak 700 kkal.',
    explaination: 'Grafik menunjukkan bahwa kebutuhan kalori meningkat seiring aktivitas. Dari aktivitas ringan ke berat, perbedaan bisa mencapai 700 kkal atau lebih. Pernyataan lain salah karena bertentangan dengan prinsip energi dan data grafik: orang tidak aktif memerlukan lebih sedikit energi; konsumsi berlebih dari kalori tanpa aktivitas menyebabkan peningkatan berat badan.',
    img_path: '/element/kalori3.jpg',
    option: [
      { value: 'a', label: 'A. Jika seseorang meningkatkan aktivitasnya dari ringan menjadi berat, maka kebutuhan kalorinya bertambah sebanyak 700 kkal.' },
      { value: 'b', label: 'B. Orang yang tidak aktif dan orang yang sangat aktif membutuhkan jumlah kalori yang sama.' },
      { value: 'c', label: 'C. Jika seseorang hanya duduk sepanjang hari tetapi makan 2.800 kkal, berat badannya akan tetap stabil.' },
      { value: 'd', label: 'D. Kebutuhan kalori harian selalu turun seiring meningkatnya aktivitas fisik.' },
    ]
},
3: {
    id: 9,
    option_id: '004',
    code: 4,
    category: 'lemak',
    question: 'Seorang remaja perempuan usia 14-18 tahun dengan aktivitas ringan memiliki kebutuhan energi harian sekitar 1.800 kkal. Ia mengonsumsi lemak sebanyak 900 kkal per hari. Berdasarkan data tersebut, manakah pernyataan yang paling tepat terkait kondisi tersebut?',
    answer: 'c',
    label: 'C. Jumlah energi dari lemaknya berpotensi tidak seimbang dan bisa menyebabkan kelebihan berat badan.',
    explaination: 'Lemak sebaiknya hanya menyumbang sekitar 20-35% dari total kalori harian. 900 kkal dari 1.800 kkal berarti 50%, yang melebihi batas atas rekomendasi. Konsumsi lemak berlebih secara terus-menerus bisa menimbulkan risiko obesitas dan gangguan metabolik, terutama jika tidak disertai aktivitas fisik yang cukup.',
    img_path: '/element/kalori4.jpg',
    option: [
      { value: 'a', label: 'A. Asupan lemaknya masih dalam batas wajar karena belum mencapai separuh dari total kebutuhan energi harian.' },
      { value: 'b', label: 'B. Komposisi energi dari lemak sudah pas.' },
      { value: 'c', label: 'C. Jumlah energi dari lemaknya berpotensi tidak seimbang dan bisa menyebabkan kelebihan berat badan.' },
      { value: 'd', label: 'D. Asupan lemaknya terlalu rendah.' },
    ]
},
4: {
    id: 10,
    option_id: '005',
    code: 5,
    category: 'karbohidrat',
    question: 'Seorang remaja laki-laki usia 14–18 tahun dengan aktivitas sedang membutuhkan 2.500 kkal per hari. Dalam satu hari, ia mengonsumsi 1.600 kkal dari makanan yang sebagian besar mengandung karbohidrat seperti nasi, mie, dan roti. Manakah pernyataan yang paling tepat?',
    answer: 'b',
    label: 'B. Jumlah kalori dari karbohidrat terlalu rendah dan dapat mengganggu fungsi utama karbohidrat sebagai penghasil energi utama.',
    explaination: 'Karbohidrat merupakan sumber energi utama, biasanya menyumbang 45–65% dari kebutuhan kalori harian. Jika dari 2.500 kkal hanya 1.600 kkal yang terpenuhi dari karbohidrat (dan tanpa diketahui asupan nutrisi lainnya), maka masih ada kekurangan energi total. Ini dapat menyebabkan kelelahan, penurunan performa belajar, dan penurunan massa otot jika berlangsung lama.',
    img_path: '/element/kalori5.jpg',
    option: [
      { value: 'a', label: 'A. Asupan karbohidratnya sudah ideal.' },
      { value: 'b', label: 'B. Jumlah kalori dari karbohidrat terlalu rendah dan dapat mengganggu fungsi utama karbohidrat sebagai penghasil energi utama.' },
      { value: 'c', label: 'C. Asupan kalori dari karbohidrat melebihi batas.' },
      { value: 'd', label: 'D. Komposisi kalori dari karbohidrat tidak dapat dinilai.' },
    ]
  }
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