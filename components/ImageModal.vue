<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
    <div class="relative rounded-2xl p-6 max-w-screen-sm lg:max-w-screen-lg w-full h-full max-h-[90vh] z-10 text-center">
      <Element :src="src" customClass="w-full h-full object-contain" />
      <button
        @click="$emit('close')"
        class="mt-4 px-2 py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition duration-300">
        Tutup
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>
