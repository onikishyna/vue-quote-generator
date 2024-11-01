<script setup>
import { defineProps, defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  quote: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['fetchNewQuote', 'copyToClipboard']);
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md min-w-96">
    <h2 class="font-bold text-2xl text-green-900">Quote of the day</h2>
    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <div class="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-emerald-800"></div>
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else class="flex flex-col space-y-2">
      <div v-if="quote" class="flex flex-col">
        <span>{{ quote.content }}</span>
        <span class="italic">{{ quote.author }}</span>
      </div>
      <hr class="flex-grow border-t border-gray-300" />
      <div class="flex justify-between items-center">
        <font-awesome-icon 
          @click="emit('copyToClipboard')" 
          icon="fa-solid fa-copy" 
          size="xl" 
          style="color: #07503a;"
        />
        <button
          @click="emit('fetchNewQuote')"
          class="bg-green-900 text-white py-2 px-4 rounded"
        >
          Get new quote
        </button>
      </div>
    </div>
  </div>
</template>