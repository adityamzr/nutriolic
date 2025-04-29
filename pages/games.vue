<template>
  <div class="flex flex-col items-center p-8 space-y-8">
    <h1 class="text-2xl font-bold">Buat Piring Anda!</h1>

    <!-- Area Drag Makanan -->
    <div class="border-2 p-4 rounded-lg w-full max-w-md bg-orange-100">
      <h2 class="font-semibold mb-4">Pilih Makanan</h2>
      <draggable :list="foodItems" group="foods" item-key="id" class="grid grid-cols-4 gap-4">
        <template #item="{ element }">
          <div class="p-2 bg-white border rounded shadow text-center cursor-move">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>

    <!-- Area Piring -->
    <div class="border-2 p-4 rounded-full w-80 h-80 flex flex-wrap content-center justify-center bg-green-50">
      <draggable :list="plateItems" group="foods" item-key="id" class="grid grid-cols-2 gap-2">
        <template #item="{ element }">
          <div class="p-2 bg-white border rounded shadow text-center">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>

    <!-- Tombol Simpan -->
    <button @click="submitPlate" class="mt-4 px-6 py-2 bg-green-500 text-white rounded">
      Simpan Pilihan
    </button>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref } from 'vue'

const foodItems = ref([
  { id: 1, name: 'Ikan' },
  { id: 2, name: 'Roti' },
  { id: 3, name: 'Sayur' },
  { id: 4, name: 'Ayam' },
  { id: 5, name: 'Yogurt' },
  { id: 6, name: 'Nasi' },
  { id: 7, name: 'Pisang' },
])

const plateItems = ref([])

const submitPlate = async () => {
  console.log('Piring berisi:', plateItems.value)

  try {
    await $fetch('/api/submit-plate', {
      method: 'POST',
      body: { plate: plateItems.value }
    })
    alert('Piring berhasil disimpan!')
  } catch (error) {
    console.error(error)
    alert('Gagal menyimpan piring')
  }
}
</script>

<style scoped>
/* Style biar grid di dalam piring lebih rapi */
</style>
