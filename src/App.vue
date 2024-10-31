<script setup>
import { ref, onMounted } from "vue";
const quote = ref(null);
const isLoading = ref(true);
const error = ref(null);
const quoteHistory = ref([]);
const maxQuotesLength = 5;

async function fetchFirstQuote() {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch("https://quotes-api-self.vercel.app/quote");
    if (!response.ok) {
      throw new Error("Smth went wrong");
    }

    const data = await response.json();

    quote.value = {
      content: data.quote,
      author: data.author,
    };

    isLoading.value = false;
  } catch (error) {
    error.value = "Failed to fetch quote. Please try again.";
    isLoading.value = false;
  }
}

async function fetchNewQuote() {
  try {
    if (quote.value) {
      quoteHistory.value.unshift({
        ...quote.value,
      });

      if (quoteHistory.value.length > maxQuotesLength) {
        quoteHistory.value.pop();
      }
    }

    await fetchFirstQuote();
  } catch (error) {
    error.value = "Failed to fetch new quote";
  }
}

function copyToClipboard() {
  const text = `"${quote.value.content}" — ${quote.value.author}`;
  navigator.clipboard
    .writeText(text)
    .then(() => alert("Quote succesfully copied"));
}

onMounted(() => fetchFirstQuote());
</script>

<template>
  <div
    class="bg-emerald-800 h-screen flex flex-col justify-center items-center text-center text-main"
  >
    <div
      :class="
        quoteHistory.length > 0 ? 'mt-56 mb-10 mr-20 ml-20' : 'mr-20 ml-20'
      "
      class="bg-white p-6 rounded-lg shadow-md min-w-96"
    >
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
        <div v-if="quote" class="flex flex-col">
          <span>{{ quote.content }}</span>
          <span class="italic">{{ quote.author }}</span>
        </div>
        <hr class="flex-grow border-t border-gray-300" />
        <div class="flex justify-between items-center">
          <font-awesome-icon @click="copyToClipboard" icon="fa-solid fa-copy" size="xl" style="color: #07503a;"/>
          <button
            @click="fetchNewQuote"
            class="bg-green-900 text-white py-2 px-4 rounded"
          >
            Get new quote
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="quoteHistory.length > 0"
      class="bg-white p-6 mt-10 rounded-lg shadow-md min-w-full flex-grow"
    >
      <h3 class="font-bold text-2xl text-green-900 pb-5">
        Previously received quotes
      </h3>
      <div class="flex flex-col space-y-2">
        <div v-for="(histQuote, index) in quoteHistory" :key="index">
          <span>{{ histQuote.content }}</span
          >&nbsp;
          <span class="italic">{{ histQuote.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
