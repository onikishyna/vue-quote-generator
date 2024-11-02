<script setup>
import { defineProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "tippy.js/dist/tippy.css";
import { directive } from "vue-tippy";

const vTippy = directive;

const props = defineProps({
  quoteHistory: {
    type: Array,
    required: true,
  },
  deleteFromHistory: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div
    v-if="quoteHistory.length > 0"
    class="bg-amber-50 p-6 mt-10 rounded-lg shadow-md min-w-full fixed bottom-0 overflow-y-auto xs:max-h-80 md:max-h-96"
  >
    <h3 class="font-bold text-2xl text-green-900 pb-5">
      Previously received quotes
    </h3>
    <div class="flex flex-col space-y-2">
      <div v-for="(histQuote, index) in quoteHistory" :key="index">
        <span>{{ histQuote.content }}</span
        >&nbsp; <span class="italic">{{ histQuote.author }}</span> &nbsp;
        <button
          @click="deleteFromHistory(index)"
          v-tippy="{
            content: 'Delete this quote',
            placement: 'top',
          }"
        >
          <font-awesome-icon
            icon="fa-solid fa-trash"
            style="color: #0d4a37"
            class="cursor-pointer hover:animate-beat active:animate-beat"
          />
        </button>
      </div>
    </div>
  </div>
</template>
