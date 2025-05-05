<style>
.ql-toolbar {
  border-radius: 12px;
  z-index: 100;
}
</style>

<template>
  <div>
    <div ref="editorRef" class="bg-white border rounded-xl text-xs md:text-md lg:text-lg" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const modelValue = defineModel('modelValue')
const editorRef = ref(null)

onMounted(() => {
  if (window.Quill) {
    const quill = new Quill(editorRef.value, {
      theme: 'bubble',
    });

    // Optional: akses isi editor
    quill.on('text-change', () => {
      modelValue.value = quill.root.innerHTML;
      console.log('Editor content:', modelValue.value);
    });
  } else {
    console.error('Quill not loaded!');
  }
});
</script>
