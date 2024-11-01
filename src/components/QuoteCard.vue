<script setup>
import { defineProps, defineEmits } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
  shareQuoteOnTwitter: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(["fetchNewQuote", "copyToClipboard"]);
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md min-w-96 max-w-2xl">
    <h2 class="font-bold text-2xl text-green-900">Quote of the day</h2>
    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <div
        class="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-emerald-800"
      ></div>
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else class="flex flex-col space-y-2">
      <div v-if="quote" class="flex justify-center relative">
        <font-awesome-icon
          icon="fa-solid fa-quote-left"
          style="color: #07503a"
          class="mt-1 mr-2.5"
        />
        <span class="mr-1">{{ quote.content }}</span> &nbsp;
        <font-awesome-icon
          icon="fa-solid fa-quote-right"
          style="color: #07503a"
          class="mb-1 ml-2.5 flex absolute right-0 bottom-0 transform translate-x-2.5"
        />
      </div>
      <div v-if="quote">
        <span class="italic">{{ quote.author }}</span>
      </div>
      <hr class="flex-grow border-t border-gray-300" />
      <div class="flex justify-between items-center">
        <div>
          <font-awesome-icon
            @click="emit('copyToClipboard')"
            icon="fa-solid fa-copy"
            size="xl"
            style="color: #07503a"
            class="cursor-pointer hover:animate-beat active:animate-beat"
          />
          &nbsp;
          <font-awesome-icon
            icon="fa-brands fa-square-twitter"
            size="xl"
            style="color: #07503a"
            @click="shareQuoteOnTwitter()"
            class="cursor-pointer hover:animate-beat active:animate-beat"
          />
        </div>
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
