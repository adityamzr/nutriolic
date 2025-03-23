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
  'flex justify-center items-center border-2 rounded-full': true,
  'bg-red-200 border-black': props.variant === 'primary',
  'bg-blue-900 border-orange-300': props.variant === 'secondary'
}))

const handleClick = () => emit('click')
</script>