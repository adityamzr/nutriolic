<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="h-16 lg:h-24 w-32 absolute top-0 right-5 flex justify-end items-center">
      <CircleButton class="h-12 w-12 lg:h-16 lg:w-16" @click="handleClick('logout')">
        <Element src="/element/exit-door.png" customClass="h-8 w-8 lg:h-10 lg:w-10" />
      </CircleButton>
    </div>
    <div class="relative flex flex-col justify-center items-center text-center w-[80%] h-[80%] p-2 bg-blue-900 bg-opacity-90">
      <LilitaText class="text-stroke-4 text-6xl lg:text-8xl">Daftar Siswa</LilitaText>
      <Element src="/element/orange.png" customClass="absolute top-[-30px] left-[-20px] w-20"/>
      <Element src="/element/mangosteen.png" customClass="absolute bottom-[-30px] left-[-40px] w-28"/>
      <Element src="/element/watermelon.png" customClass="absolute top-[-20px] right-[-20px] w-20"/>
      <Element src="/element/grape.png" customClass="absolute bottom-[-20px] right-[-20px] w-20"/>
      <div class="flex flex-col items-center w-[90%] h-[90%]">
        <div class="flex flex-col items-center w-full h-full p-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari dengan username atau kelas..."
            class="mb-4 p-2 border rounded w-full max-w-md"
          />

          <div v-if="loading" class="text-gray-500">Loading data...</div>

          <table v-else class="w-full table-auto border border-gray-300">
            <thead class="bg-gray-300">
              <tr>
                <th class="border px-4 py-2 text-center">ID</th>
                <th class="border px-4 py-2 text-center">Username</th>
                <th class="border px-4 py-2 text-center">Class</th>
                <th class="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                class="hover:bg-yellow-300 bg-gray-100"
              >
                <td class="border px-4 py-2">{{ user.id }}</td>
                <td class="border px-4 py-2 text-left">{{ user.username }}</td>
                <td class="border px-4 py-2">{{ user.class }}</td>
                <td class="border px-4 py-2 space-x-2">
                  <NuxtLink :to="`/admin/detail/${user.id}`" class="text-blue-600 hover:underline">Lihat</NuxtLink>
                  <!-- <button @click="deleteUser(user.id)" class="text-red-600 hover:underline">Hapus</button> -->
                </td>
              </tr>
            </tbody>
          </table>

          <div class="mt-4 flex gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Logout -->
  <div class="fixed inset-0 z-50 flex items-center justify-center" v-if="showModalLogout" @close="showModalLogout = false">
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
    <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl z-10 text-center">
      <h2 class="text-xl font-bold text-yellow-600 mb-4">Perhatian!</h2>
      <p class="text-sm text-gray-600 mb-6">Apakah kamu yakin ingin keluar?</p>
      <button
        @click="showModalLogout = false"
        class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
        Batal
      </button>
      <button
        @click="handleLogout()"
        class="px-4 py-2 ml-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
        Keluar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([])
const loading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = 5
const showModalLogout = ref(false);

const API_URL = useRuntimeConfig().public.API_BASE_URL

const fetchUsers = async () => {
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const data = await res.json()
    users.value = data.data
  } catch (err) {
    console.error(err)
    users.value = []
  } finally {
    loading.value = false
  }
}

// const deleteUser = async (id) => {
//   const confirmed = confirm(`Are you sure you want to delete user ID ${id}?`)
//   if (!confirmed) return

//   try {
//     // Simulasi API DELETE
//     await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
//     users.value = users.value.filter((user) => user.id !== id)
//     alert('User deleted!')
//   } catch (err) {
//     console.error('Failed to delete:', err)
//   }
// }

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(
    (user) =>
      user.username.toLowerCase().includes(query) ||
      user.class.toLowerCase().includes(query)
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / perPage)
)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredUsers.value.slice(start, start + perPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const handleClick = (path) => {
  console.log(path)
  if(path === 'logout') showModalLogout.value = true;
  else router.push(path);
};

const handleLogout = () => {
  localStorage.removeItem('token')
  navigateTo('/')
};

onMounted(() => fetchUsers())
</script>
