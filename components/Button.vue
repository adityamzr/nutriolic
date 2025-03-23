<template>
  <button :class="computedClasses" @click="handleClick">
    <slot/>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { 
    type: String,
    default: 'primary'
   }
})

const emit = defineEmits(['click'])

const computedClasses = computed(() => ({
  'py-2 px-4 rounded-lg flex justify-center items-center': true,
  'bg-blue-900': props.variant === 'primary',
  'bg-red-200': props.variant === 'secondary'
}))

const handleClick = () => emit('click')
</script>