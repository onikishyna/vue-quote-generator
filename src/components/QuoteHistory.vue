<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  quoteHistory: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div v-if="quoteHistory.length > 0" class="bg-white p-6 mt-10 rounded-lg shadow-md min-w-full flex-grow">
    <h3 class="font-bold text-2xl text-green-900 pb-5">Previously received quotes</h3>
    <div class="flex flex-col space-y-2">
      <div v-for="(histQuote, index) in quoteHistory" :key="index">
        <span>{{ histQuote.content }}</span>&nbsp;
        <span class="italic">{{ histQuote.author }}</span>
      </div>
    </div>
  </div>
</template>