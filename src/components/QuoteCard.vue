<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "tippy.js/dist/tippy.css";
import { directive } from "vue-tippy";

const vTippy = directive;
const tooltipText = ref('Copy this quote');
const emit = defineEmits(["fetchNewQuote", "copyToClipboard"]);

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
    required: true,
  },
});

const handleCopy = async () => {
  emit('copyToClipboard');
  tooltipText.value = 'Copied!';
  
  setTimeout(() => {
    tooltipText.value = 'Copy this quote';
  }, 5000);
};

</script>

<template>
  <div class="bg-amber-50 p-6 rounded-lg shadow-md xs:min-w-72 min-w-96 max-w-2xl">
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
          <button
           @click="handleCopy"
            v-tippy="{
              content: tooltipText,
              placement: 'top',
            }"
          >
            <font-awesome-icon
              icon="fa-solid fa-copy"
              size="xl"
              style="color: #07503a"
              class="cursor-pointer hover:animate-beat active:animate-beat"
            />
          </button>
          &nbsp;
          <button
            @click="shareQuoteOnTwitter()"
            v-tippy="{
              content: 'Share this quote on Twitter',
              placement: 'top',
            }"
          >
            <font-awesome-icon
              icon="fa-brands fa-square-twitter"
              size="xl"
              style="color: #07503a"
              class="cursor-pointer hover:animate-beat active:animate-beat"
            />
          </button>
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
