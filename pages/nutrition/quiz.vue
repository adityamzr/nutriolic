<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div v-if="showQuiz" class="h-14 w-18 absolute top-0 left-2 flex justify-evenly items-center">
      <CircleButton @click="handleClick('exit')" class="h-10 w-10" variant="secondary">
        <Element src="/element/home.png" customClass="h-6" />
      </CircleButton>
    </div>
    <div v-if="showQuizTitle" class="z-10 justify-center absolute top-5 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-6xl">NUTRISI</LilitaText>
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
    id: 1,
    option_id: '001',
    code: 1,
    category: 'nutrisi',
    question: 'Makanan yang dikonsumsi anak harus mengandung berbagai zat gizi seperti karbohidrat, protein, lemak, vitamin, dan mineral agar dapat mendukung tumbuh kembangnya secara optimal. Lemak memiliki peran penting karena sekitar 60% otak terdiri dari lemak. Jika anak mengalami kekurangan lemak dalam makanannya, maka perkembangan otaknya dapat terganggu. Bagaimana pengaruh kekurangan lemak terhadap perkembangan otak anak?',
    answer: 'a',
    label: 'A. Perkembangan otak menjadi lambat karena otak kekurangan komponen struktural penting',
    explaination: 'Otak manusia tersusun sekitar 60% dari lemak, dan sebagian besar terdiri dari asam lemak esensial seperti DHA yang sangat penting untuk membangun struktur sel saraf (neuron) dan menjaga fungsi koneksi antar sel otak. Jika anak mengalami kekurangan asupan lemak, maka otak tidak mendapatkan cukup bahan struktural untuk membentuk dan mempertahankan jaringan saraf. Akibatnya, proses perkembangan otak menjadi lambat karena pertumbuhan sel, pembentukan sinaps, dan transmisi informasi di dalam otak tidak berjalan optimal. Oleh karena itu, cukupnya konsumsi lemak yang sehat sangat penting untuk mendukung pertumbuhan otak dan fungsi kognitif anak secara maksimal.',
    img_path: '/element/n1.png',
    option: [
      { value: 'a', label: 'A. Perkembangan otak menjadi lambat karena otak kekurangan komponen struktural penting.' },
      { value: 'b', label: 'B. Perkembangan otak menjadi lambat karena tubuh menggunakan cadangan energi dari lemak.' },
      { value: 'c', label: 'C. Perkembangan otak menjadi cepat karena otak kekurangan komponen struktural penting.' },
      { value: 'd', label: 'D. Perkembangan otak menjadi cepat karena tubuh menggunakan cadangan energi dari lemak.' },
    ]
  },
  1: {
    id: 2,
    option_id: '002',
    code: 2,
    category: 'nutrisi',
    question: 'Seorang ibu khawatir karena anaknya sulit berkonsentrasi saat belajar dan mudah lelah. Setelah berkonsultasi dengan dokter, ia disarankan untuk memperbaiki pola makan anaknya agar lebih seimbang sesuai kebutuhan gizi anak. Berdasarkan infografis di atas, hipotesis mana yang paling mungkin menjelaskan kondisi anak tersebut?',
    answer: 'b',
    label: 'B. Kekurangan lemak dalam makanan anak menyebabkan gangguan perkembangan otak, yang berdampak pada konsentrasi dan proses kognitifnya.',
    explaination: '🔍 Penjelasan Ilmiah: Otak manusia terdiri dari sekitar 60% lemak, dan salah satu lemak penting adalah asam lemak omega-3 seperti DHA yang berperan penting dalam membentuk dan menjaga fungsi sel-sel otak. Kekurangan lemak, terutama pada masa pertumbuhan, dapat menghambat pembentukan sinaps, transmisi sinyal otak, serta proses kognitif seperti konsentrasi, daya ingat, dan kemampuan belajar. Oleh karena itu, anak membutuhkan asupan lemak yang cukup agar perkembangan otaknya optimal dan ia dapat belajar serta beraktivitas dengan baik. 🧠✨',
    img_path: '/element/n1.png',
    option: [
      { value: 'a', label: 'A. Anak kekurangan asupan karbohidrat sehingga tubuhnya tidak memiliki cukup energi untuk belajar.' },
      { value: 'b', label: 'B. Kekurangan lemak dalam makanan anak menyebabkan gangguan perkembangan otak, yang berdampak pada konsentrasi dan proses kognitifnya.' },
      { value: 'c', label: 'C. Anak terlalu banyak mengonsumsi vitamin dan mineral sehingga mengalami ketidakseimbangan nutrisi dalam tubuhnya.' },
      { value: 'd', label: 'D. Asupan protein yang tinggi menyebabkan gangguan metabolisme yang memengaruhi fokus dan daya tahan tubuh anak.' },
    ]
  },
  2: {
    id: 3,
    option_id: '003',
    code: 3,
    category: 'nutrisi',
    question: 'Sebuah penelitian menemukan bahwa anak-anak di suatu daerah mengalami kesulitan berkonsentrasi saat belajar dan memiliki daya ingat yang rendah. Setelah dilakukan analisis, ditemukan bahwa pola makan mereka cenderung kurang mengandung nutrisi yang mendukung kesehatan otak. Berdasarkan informasi dari infografis, manakah strategi terbaik yang dapat diterapkan untuk mengatasi permasalahan ini?',
    answer: 'a',
    label: 'A. Mengedukasi orang tua tentang pentingnya memberikan makanan seperti ikan, telur, dan susu yang kaya protein serta omega-3 untuk meningkatkan kecerdasan dan daya ingat anak.',
    explaination: 'Infografis menyebutkan bahwa AA (Arachidonic Acid), DHA (Docosahexaenoic Acid), dan Kolin adalah nutrisi penting untuk perkembangan otak, terutama dalam 1.000 hari pertama kehidupan anak. Zat-zat ini banyak ditemukan dalam makanan seperti ikan laut, telur, dan produk hewani lainnya. Kekurangan nutrisi ini dapat menyebabkan gangguan kognitif, seperti kesulitan konsentrasi dan menurunnya daya ingat. Oleh karena itu, solusi terbaik adalah mengedukasi orang tua agar menyediakan makanan bergizi yang kaya akan lemak sehat dan kolin untuk mendukung fungsi otak anak secara optimal. 🧠🥚🐟',
    img_path: '/element/n2.png',
    option: [
      { value: 'a', label: 'A. Mengedukasi orang tua tentang pentingnya memberikan makanan seperti ikan, telur, dan susu yang kaya protein serta omega-3 untuk meningkatkan kecerdasan dan daya ingat anak.' },
      { value: 'b', label: 'B. Mengurangi konsumsi makanan berlemak dan tinggi gula pada anak-anak, serta menggantinya dengan hanya mengkonsumsi sayur dan buah agar perkembangan otaknya lebih optimal.' },
      { value: 'c', label: 'C. Menganjurkan anak-anak untuk menghindari makanan yang mengandung karbohidrat seperti gandum murni dan menggantinya dengan lebih banyak konsumsi yoghurt dan kacang-kacangan.' },
      { value: 'd', label: 'D. Memfokuskan pemberian suplemen vitamin dan mineral pada anak-anak tanpa perlu memperbaiki pola makan sehari-hari agar asupan nutrisi mereka tetap tercukupi.' },
    ]
  },
  3: {
    id: 4,
    option_id: '004',
    code: 4,
    category: 'nutrisi',
    question: 'Seorang anak mengalami kesulitan memahami pelajaran dan cenderung cepat lelah saat belajar. Ia juga mudah lupa meskipun sudah mengulang materi beberapa kali. Ibunya ingin memperbaiki pola makan anak agar daya pikir dan kemampuan mengingatnya meningkat. Jika kamu adalah ahli gizi, pilihan kombinasi makanan mana yang paling efektif untuk membantu meningkatkan fungsi otak anak berdasarkan informasi dalam infografis?',
    answer: 'a',
    label: 'A. Ikan dan kacang-kacangan',
    explaination: 'Berdasarkan infografis, ikan mengandung asam lemak omega-3 yang terbukti dapat meningkatkan kecerdasan dan pertumbuhan otak. Sementara itu, kacang-kacangan merupakan sumber protein dan zinc yang baik untuk daya konsentrasi, serta mengandung vitamin E dan antioksidan yang menjaga otak dari kerusakan akibat radikal bebas. Memilih dua makanan ini memberikan kombinasi nutrisi utama untuk fungsi otak, yaitu lemak sehat dan protein, yang sangat penting bagi anak yang sedang mengalami gangguan konsentrasi dan daya ingat. 🧠✨',
    img_path: '/element/n2.png',
    option: [
      { value: 'a', label: 'A. Ikan dan kacang-kacangan, karena keduanya kaya akan omega-3 dan protein yang mendukung daya konsentrasi dan pertumbuhan otak.' },
      { value: 'b', label: 'B. Gandum murni dan buah-buahan, karena keduanya mengandung vitamin dan serat yang memperkuat sistem imun dan sistem pencernaan anak.' },
      { value: 'c', label: 'C. Ikan dan gandum murni, karena kombinasi ini mengandung omega-3 dan vitamin B kompleks yang berfungsi untuk metabolisme tubuh.' },
      { value: 'd', label: 'D. Buah-buahan dan kacang-kacangan, karena keduanya mengandung antioksidan dan vitamin untuk menjaga daya tahan tubuh.' },
    ]
  },
  4: {
    id: 5,
    option_id: '005',
    code: 5,
    category: 'nutrisi',
    question: 'Seorang remaja mengalami kekurangan asupan omega-3 dan zat besi yang terus-menerus selama masa pertumbuhan. Bagaimana kondisi kekurangan nutrisi ini paling mungkin terlihat dalam kemampuan belajarnya di sekolah?',
    answer: 'd',
    label: 'D. Jadi sulit untuk mengerjakan banyak tugas sekaligus dan mencerna informasi yang rumit dalam waktu yang sama.',
    explaination: 'Omega-3, khususnya DHA (docosahexaenoic acid), adalah komponen struktural utama dalam otak yang membantu pembentukan membran sel saraf dan mendukung transmisi sinyal antar neuron. Kekurangan omega-3 dapat menurunkan fungsi kognitif, daya ingat, dan konsentrasi. Zat besi memiliki peran penting dalam membawa oksigen ke otak melalui hemoglobin dalam darah. Ketika tubuh kekurangan zat besi, suplai oksigen ke otak terganggu, menyebabkan kelelahan mental, penurunan konsentrasi, dan kesulitan dalam berpikir jernih. Kombinasi kekurangan dua nutrisi penting ini menyebabkan otak tidak mampu bekerja secara efisien, khususnya dalam menghadapi tugas kompleks atau saat harus berpikir cepat. Oleh karena itu, kondisi ini paling mungkin membuat remaja kesulitan saat harus memproses informasi yang rumit dan melakukan beberapa tugas sekaligus di sekolah. 🧠📉📚',
    img_path: '/element/n3.png',
    option: [
      { value: 'a', label: 'A. Otaknya jadi lebih pintar menyerap informasi penting saja, jadi yang tidak penting mudah dilupakan.' },
      { value: 'b', label: 'B. Kemampuan fokusnya naik turun tidak jelas, kadang bisa belajar dengan baik, kadang sulit sekali mengerti pelajaran.' },
      { value: 'c', label: 'C. Otaknya jadi mencari cara lain untuk belajar, misalnya lebih mengandalkan gambar atau menghafal gerakan daripada membaca banyak tulisan.' },
      { value: 'd', label: 'D. Jadi sulit untuk mengerjakan banyak tugas sekaligus dan mencerna informasi yang rumit dalam waktu yang sama.' },
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