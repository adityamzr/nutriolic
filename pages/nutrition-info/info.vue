<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-20 lg:w-28 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/material-menu')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="z-10 flex justify-center absolute top-5 lg:top-10 left-1/2 -translate-x-1/2">
      <LilitaText class="text-stroke-4 text-5xl lg:text-8xl min-w-96">INFORMASI GIZI</LilitaText>
    </div>
    <div class="relative flex justify-center items-end w-[75%] h-[75%] p-2 bg-blue-900 bg-opacity-90">
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-16"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-20"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-16"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-25px] right-[-30px] w-16"/>
      <div class="flex flex-col items-center justify-start bg-rose-400 rounded-2xl p-2 w-[85%] h-[90%] z-10">
        <LilitaText class="text-xs md:text-sm lg:text-2xl min-w-96 text-yellow-300">CEGAH PENYAKIT TIDAK MENULAR DENGAN RAJIN CEK INFORMASI GIZI</LilitaText>
        <div class="overflow-auto p-2 lg:p-4">
          <p class="text-white text-justify text-[10px] md:text-xs lg:text-lg">BPOM menekankan pentingnya menerapkan prinsip gizi seimbang dalam kehidupan sehari-hari untuk mencegah penyakit tidak menular. Prinsip ini meliputi mengonsumsi makanan sesuai isi piringku, membaca label gizi sebelum membeli produk makanan atau minuman, serta menjaga pola makan dengan membatasi asupan gula, garam, dan lemak sesuai anjuran Kementerian Kesehatan. Selain itu, menjaga berat badan tetap normal dengan aktivitas fisik yang teratur dan menerapkan perilaku hidup bersih juga merupakan bagian dari upaya menjaga kesehatan. Dalam sebuah diskusi kesehatan tentang obesitas di Jakarta pada 4 Maret 2024, Pengawas Farmasi dan Makanan Ahli Muda BPOM Pratiwi Yuniarti Martoyo menegaskan bahwa pengawasan asupan gizi melalui label kemasan sangat penting dilakukan agar masyarakat dapat memilih makanan sesuai dengan kebutuhan gizinya.</p>
          <p class="text-white text-justify text-[10px] md:text-xs lg:text-lg mt-2">Sebagai langkah mendukung transparansi informasi gizi, BPOM telah mengatur agar produk pangan olahan dalam kemasan, termasuk yang dijual di toko online dan produk UMKM, mencantumkan tabel informasi nilai gizi. Label ini mencantumkan jumlah takaran saji per kemasan, total energi per sajian, kandungan zat gizi seperti lemak, lemak jenuh, protein, karbohidrat (termasuk gula), dan persentase Angka Kecukupan Gizi (AKG) per sajian. Masyarakat diimbau untuk lebih cermat dalam membaca label gizi agar konsumsi makanan tetap seimbang dan sesuai dengan kebutuhan tubuh.</p>
          <div class="flex items-end justify-center grow">
            <Element @click="handleClick('/nutrition-info/material')" src="/element/start.png" customClass="cursor-pointer w-20 my-2 lg:w-40 lg:my-4"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = (path) => {
  router.push(path);
};
</script>