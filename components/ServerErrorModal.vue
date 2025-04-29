<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

    <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl z-10 text-center">
      <h2 class="text-xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
      <p class="text-sm text-gray-600 mb-6">Server tidak merespon dengan baik. Silakan coba beberapa saat lagi.</p>
      <button
        @click="$emit('close')"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Tutup
      </button>
    </div>
  </div>
</template>
