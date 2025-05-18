<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-20 lg:w-24 absolute top-0 left-0 flex justify-evenly items-center">
      <CircleButton @click="handleClick('/admin')" class="h-12 w-12 lg:h-16 lg:w-16" variant="secondary">
        <Element src="/element/arrow-left.png" customClass="h-6 lg:h-9" />
      </CircleButton>
    </div>
    <div class="relative flex flex-col justify-center items-center text-center w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">Detail Respon Siswa</LilitaText>
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-20px] right-[-20px] w-20"/>
      <div class="flex flex-col items-start w-[90%] h-[90%] overflow-auto my-2 p-5">
        <div class="w-full h-full">

          <div v-if="loading">Loading...</div>
          <div v-else-if="detail">
          <!-- Accordion 1: Personal Info -->
          <div class="border rounded">
            <button @click="toggleAccordion(1)" :class="activeAccordion === 1 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              Informasi Siswa
            </button>
            <div v-show="activeAccordion === 1" class="px-4 py-2 flex justify-start">
              <div class=" bg-gray-100 w-1/2 h-fit text-left p-4 rounded-lg">
                <p><strong>ID:</strong> {{ detail?.user?.id }}</p>
                <p><strong>Username:</strong> {{ detail?.user?.username }}</p>
                <p><strong>Kelas:</strong> {{ detail?.user?.username }}</p>
              </div>
            </div>
          </div>

          <!-- Accordion 8: Personal Info -->
          <div class="border rounded my-4">
            <button @click="toggleAccordion(8)" :class="activeAccordion === 8 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              On Boarding
            </button>
            <div v-show="activeAccordion === 8" class="px-4 py-2 flex justify-center">
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg">
                <p>Berdasarkan angka yang ditampilkan dalam infografis?mengapa anak-anak usia 5-12 tahun rentan mengalami obesitas?</p>
                <span><strong>Jawaban:</strong> {{ detail?.onboarding?.response }}</span>
              </div>
            </div>
          </div>

          <!-- Accordion 2: Nutrisi -->
          <div class="border rounded my-4">
            <button @click="toggleAccordion(2)" :class="activeAccordion === 2 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              Nutrisi - Materi dan Quiz
            </button>
            <div v-show="activeAccordion === 2" class="py-4 px-2">
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg mb-4">
                <span class="text-xl font-bold">Materi</span>
                <p class="py-1"><strong>Merumuskan Masalah:</strong> <div v-html="detail?.nutrisi?.q1"></div></p>
                <p class="py-1"><strong>Menuliskan Hipotesis:</strong> <div v-html="detail?.nutrisi?.q2"></div></p>
                <p class="py-1"><strong>Mengumpulkan Data A:</strong> <div v-html="detail?.nutrisi?.q3"></div></p>
                <p class="py-1"><strong>Mengumpulkan Data B:</strong> 
                  <p><strong>1. Karbohidrat:</strong></p>
                  <div v-html="detail?.nutrisi?.carbs"></div>
                  <p><strong>2. Protein:</strong></p>
                  <div v-html="detail?.nutrisi?.proteins"></div>
                  <p><strong>3. Lemak:</strong></p>
                  <div v-html="detail?.nutrisi?.fats"></div>
                  <p><strong>4. Mineral:</strong></p>
                  <div v-html="detail?.nutrisi?.minerals"></div>
                </p>
                <p class="py-1"><strong>Variabel Independen:</strong> <div v-html="detail?.nutrisi?.p4"></div></p>
                <p class="py-1"><strong>Variabel Tergantung:</strong> <div v-html="detail?.nutrisi?.p5"></div></p>
                <p class="py-1"><strong>Variabel Kontrol:</strong> <div v-html="detail?.nutrisi?.p6"></div></p>
                <p class="py-1"><strong>Bahan dan Peralatan:</strong> <div v-html="detail?.nutrisi?.p7"></div></p>
                <p class="py-1"><strong>Langkah-langkah Eskperimen:</strong> <div v-html="detail?.nutrisi?.p8"></div></p>
                <p class="py-1"><strong>Data Hasil Eksperimen:</strong></p>
                <table class="table-auto bg-white border border-gray-400 w-full mt-1">
                  <thead>
                    <tr class="bg-yellow-400">
                      <th class="border p-2">No</th>
                      <th class="border p-2">Nama</th>
                      <th class="border p-2">Usia</th>
                      <th class="border p-2">Makanan yang Dikonsumsi Setiap Hari</th>
                      <th class="border p-2">Kualitas Nutrisi</th>
                      <th class="border p-2">Dampak terhadap Tubuh</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(n, i) in 3" :key="i">
                      <td class="border text-center">{{ i+1 }}</td>
                      <td class="border text-center">{{ detail?.nutrisi?.p9['data' + (i + 1)].name }}</td>
                      <td class="border text-center">{{ detail?.nutrisi?.p9['data' + (i + 1)].age }}</td>
                      <td class="border text-center">{{ detail?.nutrisi?.p9['data' + (i + 1)].meals }}</td>
                      <td class="border text-center">{{ detail?.nutrisi?.p9['data' + (i + 1)].nutrition }}</td>
                      <td class="border text-center">{{ detail?.nutrisi?.p9['data' + (i + 1)].impact }}</td>
                    </tr>
                  </tbody>
                </table>
                <p class="py-1"><strong>Mengapa makanan penting untuk tubuh:</strong> <div v-html="detail?.nutrisi?.a1"></div></p>
                <p class="py-1"><strong>Analisislah apa yang akan terjadi pada tubuh jika kita kekurangan nutrisi:</strong> <div v-html="detail?.nutrisi?.a2"></div></p>
                <p class="py-1"><strong>Mengapa makanan dianggap sebagai sumber energi bagi tubuh?:</strong> <div v-html="detail?.nutrisi?.a3"></div></p>
                <p class="py-1"><strong>Kesimpulan:</strong> <div v-html="detail?.nutrisi?.conclusion"></div></p>
              </div>
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg">
                <span class="text-xl font-bold">Quiz</span>
                <div v-for="item in detail?.nutrisiQuiz" :key="item.id">
                  <span>{{ item.question_id }}. {{ item.response.toUpperCase() }} {{ item.score == 0 ? "(Salah)" : "(Benar)" }} </span>
                </div>
                <p class="font-bold">Poin: {{ points.nutrisi }}</p>
              </div>
            </div>
          </div>

          <!-- Accordion 3: Kalori -->
          <div class="border rounded my-4">
            <button @click="toggleAccordion(3)" :class="activeAccordion === 3 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              Kalori - Materi dan Quiz
            </button>
            <div v-show="activeAccordion === 3" class="py-4 px-2">
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg mb-4">
                <span class="text-xl font-bold">Materi</span>
                <p class="py-1"><strong>Merumuskan Masalah:</strong> <div v-html="detail?.kalori?.q1"></div></p>
                <p class="py-1"><strong>Menuliskan Hipotesis:</strong> <div v-html="detail?.kalori?.q2"></div></p>
                <p class="py-1"><strong>Mengumpulkan Data:</strong></p>
                <table class="table-auto bg-white border border-gray-400 w-full mt-1">
                  <thead>
                    <tr>
                      <th class="border text-center">Ringan</th>
                      <th class="border text-center">Sedang</th>
                      <th class="border text-center">Berat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="n in 3" :key="n">
                      <td class="border text-center">{{ detail?.kalori?.activities.light['r' + n] }}</td>
                      <td class="border text-center">{{ detail?.kalori?.activities.currently['r' + n] }}</td>
                      <td class="border text-center">{{ detail?.kalori?.activities.heavy['r' + n] }}</td>
                    </tr>
                  </tbody>
                </table>
                <p class="py-1"><strong>Berdasarkan data aktivitas di atas, seorang siswa termasuk dalam kelompok yang memiliki aktivitas ringan, sedang, atau berat, mengapa?</strong> <div v-html="detail?.kalori?.q3"></div></p>
                <p class="py-1"><strong>Berdasarkan tabel kebutuhan energi, mengapa kebutuhan kalori pria lebih tinggi daripada wanita pada semua rentang usia?</strong> <div v-html="detail?.kalori?.q4"></div></p>
                <p class="py-1"><strong>Bagaimana perbedaan kebutuhan kalori antara seseorang yang beraktivitas ringan, sedang, dan berat? Berikan contoh aktivitas yang termasuk ke dalam masing-masing kategori!</strong> <div v-html="detail?.kalori?.q5"></div></p>
                <table class="table-auto bg-white border border-gray-400 w-full mt-1">
                  <thead>
                    <tr class="bg-yellow-400">
                      <th colspan="2" class="border text-center">Menu</th>
                      <th class="border text-center">Kuantitas</th>
                      <th class="border text-center">Jumlah Energi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border text-center px-2 font-bold">Karbohidrat</td>
                      <td class="border text-center">Nasi Putih</td>
                      <td class="border text-center">1 mangkuk</td>
                      <td class="border text-center">630 kal</td>
                    </tr>
                    <tr v-for="n in 3" :key="n">
                      <td class="border text-center font-bold">{{ items[n-1] }}</td>
                      <td class="border text-center">{{ detail?.kalori?.food_items.protein[context[n-1]] }}</td>
                      <td class="border text-center">{{ detail?.kalori?.food_items.fat[context[n-1]] }}</td>
                      <td class="border text-center">{{ detail?.kalori?.food_items.vitamin[context[n-1]] }}</td>
                    </tr>
                  </tbody>
                </table>
                <p class="py-1"><strong>Berdasarkan menu makanan yang Anda buat, apakah menu tersebut sudah memenuhi kebutuhan energi dan gizi harian siswa? Jika tidak, apa yang perlu ditambahkan atau dikurangi?</strong> <div v-html="detail?.kalori?.q6"></div></p>
                <p class="py-1"><strong>Variabel Independen:</strong> <div v-html="detail?.kalori?.p4"></div></p>
                <p class="py-1"><strong>Variabel Tergantung:</strong> <div v-html="detail?.kalori?.p5"></div></p>
                <p class="py-1"><strong>Variabel Kontrol:</strong> <div v-html="detail?.kalori?.p6"></div></p>
                <p class="py-1"><strong>Bahan dan Peralatan:</strong> <div v-html="detail?.kalori?.p7"></div></p>
                <p class="py-1"><strong>Langkah-langkah Eskperimen:</strong> <div v-html="detail?.kalori?.p8"></div></p>
                <p class="py-1"><strong>Data Hasil Eksperimen:</strong></p>
                <div class="overflow-auto w-full">
                  <table class="table-auto bg-white border border-gray-400 w-full mt-1">
                    <thead>
                      <tr class="bg-yellow-400">
                        <th class="border p-2">No</th>
                        <th class="border p-2">Nama</th>
                        <th class="border p-2">Jenis Kelamin</th>
                        <th class="border p-2">Usia</th>
                        <th class="border p-2">Aktivitas Harian</th>
                        <th class="border p-2">Hari 1</th>
                        <th class="border p-2">Hari 2</th>
                        <th class="border p-2">Hari 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(n, index) in 3" :key="n">
                        <td class="border text-center">{{ index+1 }}</td>
                        <td class="border text-center">{{ detail?.kalori?.p9['data' + (index + 1)].name }}</td>
                        <td class="border text-center">{{ detail?.kalori?.p9['data' + (index + 1)].gender }}</td>
                        <td class="border text-center">{{ detail?.kalori?.p9['data' + (index + 1)].age }}</td>
                        <td class="border text-center">{{ detail?.kalori?.p9['data' + (index + 1)].activities }}</td>
                        <td class="border text-center">{{ detail?.kalori?.p9['data' + (index + 1)].day1 }}</td>
                        <td class="border text-center">{{ detail?.kalori?.p9['data' + (index + 1)].day2 }}</td>
                        <td class="border text-center">{{ detail?.kalori?.p9['data' + (index + 1)].day3 }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p class="py-1"><strong>Kesimpulan:</strong> <div v-html="detail?.kalori?.conclusion"></div></p>
              </div>
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg">
                <span class="text-xl font-bold">Quiz</span>
                <div v-for="item in detail?.kaloriQuiz" :key="item.id">
                  <span>{{ item.question_id }}. {{ item.response.toUpperCase() }} {{ item.score == 0 ? "(Salah)" : "(Benar)" }} </span>
                </div>
                <p class="font-bold">Poin: {{ points.kalori }}</p>
              </div>
            </div>
          </div>

          <!-- Accordion 4: Informasi Gizi -->
          <div class="border rounded my-4">
            <button @click="toggleAccordion(4)" :class="activeAccordion === 4 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              Informasi Gizi - Materi dan Quiz
            </button>
            <div v-show="activeAccordion === 4" class="py-4 px-2">
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg mb-4">
                <span class="text-xl font-bold">Materi</span>
                <p class="py-1"><strong>Merumuskan Masalah:</strong> <div v-html="detail?.gizi?.q1"></div></p>
                <p class="py-1"><strong>Menuliskan Hipotesis:</strong> <div v-html="detail?.gizi?.q2"></div></p>
                <p class="py-1"><strong>Mengumpulkan Data A:</strong> <div v-html="detail?.gizi?.q3"></div></p>
                <p class="py-1"><strong>Variabel Independen:</strong> <div v-html="detail?.gizi?.p4"></div></p>
                <p class="py-1"><strong>Variabel Tergantung:</strong> <div v-html="detail?.gizi?.p5"></div></p>
                <p class="py-1"><strong>Variabel Kontrol:</strong> <div v-html="detail?.gizi?.p6"></div></p>
                <p class="py-1"><strong>Bahan dan Peralatan:</strong> <div v-html="detail?.gizi?.p7"></div></p>
                <p class="py-1"><strong>Langkah-langkah Eskperimen:</strong> <div v-html="detail?.gizi?.p8"></div></p>
                <p class="py-1"><strong>Data Hasil Eksperimen:</strong></p>
                <table class="table-auto bg-white border border-gray-400 w-full mt-1">
                  <thead>
                    <tr class="bg-yellow-400">
                      <th class="border p-2">Karakteristik Nutrisi</th>
                      <th class="border p-2">Produk A</th>
                      <th class="border p-2">Produk B</th>
                      <th class="border p-2">Catatan Perbandingan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(n, i) in charItems" :key="i">
                      <td class="border text-center">{{ charItems[i] }}</td>
                      <td class="border text-center">{{ detail?.gizi?.p9[Object.keys(detail?.gizi?.p9)[i]].productA }}</td>
                      <td class="border text-center">{{ detail?.gizi?.p9[Object.keys(detail?.gizi?.p9)[i]].productB }}</td>
                      <td class="border text-center">{{ detail?.gizi?.p9[Object.keys(detail?.gizi?.p9)[i]].comparison }}</td>
                    </tr>
                  </tbody>
                </table>
                <p class="py-1"><strong>Kesimpulan:</strong> <div v-html="detail?.gizi?.conclusion"></div></p>
              </div>
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg">
                <span class="text-xl font-bold">Quiz</span>
                <div v-for="item in detail?.giziQuiz" :key="item.id">
                  <span>{{ item.question_id }}. {{ item.response.toUpperCase() }} {{ item.score == 0 ? "(Salah)" : "(Benar)" }} </span>
                </div>
                <p class="font-bold">Poin: {{ points.gizi }}</p>
              </div>
            </div>
          </div>

          <!-- Accordion 5: Isi Piringku -->
          <div class="border rounded my-4">
            <button @click="toggleAccordion(5)" :class="activeAccordion === 5 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              Isi Piringku - Materi dan Quiz
            </button>
            <div v-show="activeAccordion === 5" class="py-4 px-2">
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg mb-4">
                <span class="text-xl font-bold">Materi</span>
                <p class="py-1"><strong>Merumuskan Masalah:</strong> <div v-html="detail?.piringku?.q1"></div></p>
                <p class="py-1"><strong>Menuliskan Hipotesis:</strong> <div v-html="detail?.piringku?.q2"></div></p>
                <p class="py-1"><strong>Mengumpulkan Data A:</strong> <div v-html="detail?.piringku?.q3"></div></p>
                <p class="py-1"><strong>Variabel Independen:</strong> <div v-html="detail?.piringku?.p4"></div></p>
                <p class="py-1"><strong>Variabel Tergantung:</strong> <div v-html="detail?.piringku?.p5"></div></p>
                <p class="py-1"><strong>Variabel Kontrol:</strong> <div v-html="detail?.piringku?.p6"></div></p>
                <p class="py-1"><strong>Bahan dan Peralatan:</strong> <div v-html="detail?.piringku?.p7"></div></p>
                <p class="py-1"><strong>Langkah-langkah Eskperimen:</strong> <div v-html="detail?.piringku?.p8"></div></p>
                <p class="py-1"><strong>Data Hasil Eksperimen:</strong></p>
                <div class="overflow-auto">

                  <table class="table-auto bg-white border border-gray-400 w-full mt-1">
                    <thead>
                      <tr class="bg-yellow-400">
                        <th class="border p-2">No</th>
                        <th class="border p-2">Usia</th>
                        <th class="border p-2">Jenis Kelamin</th>
                        <th class="border p-2">Aktivitas Fisik</th>
                        <th class="border p-2">Kebutuhan Kalori (kkal)</th>
                        <th class="border p-2">Menu Makan Siang (disesuaikan)</th>
                        <th class="border p-2">Proporsi MyPlate</th>
                        <th class="border p-2">Total Kalori</th>
                        <th class="border p-2">Analisis Proporsi</th>
                        <th class="border p-2">Dampak</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(n, i) in 3" :key="i">
                        <td class="border text-center">{{ i+1 }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].age }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].gender }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].activities }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].calorieNeeded }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].lunchMenu }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].proportion }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].totalCalorie }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].analysis }}</td>
                        <td class="border text-center">{{ detail?.piringku?.p9['data' + (i+1)].impact }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p class="py-1"><strong>Mengapa makanan kaya serat, seperti biji-bijian dan sayuran, penting bagi tubuh?</strong> <div v-html="detail?.piringku?.a1"></div></p>
                <p class="py-1"><strong>Analisislah apa yang akan terjadi pada tubuh jika kita tidak mengonsumsi cukup protein:</strong> <div v-html="detail?.piringku?.a2"></div></p>
                <p class="py-1"><strong>Mengapa buah dan sayuran harus mengisi setengah dari piring dalam konsep MyPlate?</strong> <div v-html="detail?.piringku?.a3"></div></p>
                <p class="py-1"><strong>Berdasarkan tabel pengamatan, zat gizi manakah yang merupakan sumber serat utama bagi tubuh? Jelaskan alasannya.</strong> <div v-html="detail?.piringku?.a4"></div></p>
                <p class="py-1"><strong>Kesimpulan:</strong> <div v-html="detail?.piringku?.conclusion"></div></p>
              </div>
              <div class=" bg-gray-100 w-full h-fit text-left p-4 rounded-lg">
                <span class="text-xl font-bold">Quiz</span>
                <div v-for="item in detail?.piringkuQuiz" :key="item.id">
                  <span>{{ item.question_id }}. {{ item.response.toUpperCase() }} {{ item.score == 0 ? "(Salah)" : "(Benar)" }} </span>
                </div>
                <p class="font-bold">Poin: {{ points.piringku }}</p>
              </div>
            </div>
          </div>

          <!-- Accordion 6: Game -->
          <div class="border rounded my-4">
            <button @click="toggleAccordion(6)" :class="activeAccordion === 6 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              Game
            </button>
            <div v-show="activeAccordion === 6" class="px-4 py-2 justify-start flex">
              <div class=" bg-gray-100 w-1/2 h-fit text-left p-4 rounded-lg">
                <p class="py-1"><strong>Jumlah BMI:</strong> <span v-html="detail?.game?.bmi"></span></p>
                <p class="py-1"><strong>Piring Besar:</strong> <span v-html="detail?.game?.big_plate.map(item => item.name).join(', ')"></span></p>
                <p class="py-1"><strong>Piring Kecil:</strong> <span v-html="detail?.game?.little_plate.map(item => item.name).join(', ')"></span></p>
              </div>
            </div>
          </div>

          <!-- Accordion 7: Refleksi -->
          <div class="border rounded my-4">
            <button @click="toggleAccordion(7)" :class="activeAccordion === 7 ? 'bg-rose-300' : 'bg-gray-100'" class="w-full text-left px-4 py-2 font-semibold hover:bg-rose-300">
              Refleksi
            </button>
            <div v-show="activeAccordion === 7" class="px-4 py-2 justify-start flex">
              <div class=" bg-gray-100 w-1/2 h-fit text-left p-4 rounded-lg">
                <p class="py-1"><strong>Kesan:</strong> <span v-html="detail?.refleksi?.kesan"></span></p>
                <p class="py-1"><strong>Pesan:</strong> <span v-html="detail?.refleksi?.pesan"></span></p>
                <p class="py-1"><strong>Saran:</strong> <span v-html="detail?.refleksi?.saran"></span></p>
              </div>
            </div>
          </div>

        </div>

        <div v-else class="text-red-600">User not found.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter();
const detail = ref()
const loading = ref(true)
const activeAccordion = ref(null)
const apiUrl = useRuntimeConfig().public.API_BASE_URL
const points = ref(
  {
    nutrisi: 0,
    kalori: 0,
    gizi: 0,
    piringku: 0,
  }
)
const items = ['Protein', 'Lemak', 'Vitamin'];
const context = ['menu', 'amount', 'energy_amount'];
const charItems = [
  'Kalori per Porsi',
  'Lemak Total (g)',
  'Gula Total (g)',
  'Serat Pangan (g)',
  'Protein (g)',
  'Natrium (mg)',
  'Vitamin D (% AKG)',
  'Kalsium (% AKG)',
  'Zat Besi (% AKG)',
  'Kesimpulan Sementara',
  'Potensi Dampak Kesehatan',
];

const fetchDetail = async () => {
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`${apiUrl}/users/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if (!res.ok) throw new Error('User not found')
    const data = await res.json()
    detail.value = data.data
    data.data.nutrisiQuiz.forEach(element => {
      points.value.nutrisi += element.score
    });
    data.data.kaloriQuiz.forEach(element => {
      points.value.kalori += element.score
    });
    data.data.giziQuiz.forEach(element => {
      points.value.gizi += element.score
    });
    data.data.piringkuQuiz.forEach(element => {
      points.value.piringku += element.score
    });
  } catch (err) {
    detail.value = null
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleAccordion = (section) => {
  activeAccordion.value = activeAccordion.value === section ? null : section
}

const handleClick = (path) => {
  router.push(path);
};

onMounted(() => fetchDetail())
</script>
