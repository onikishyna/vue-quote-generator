<script setup>
import { onMounted } from "vue";
import QuoteCard from "./components/QuoteCard.vue";
import QuoteHistory from "./components/QuoteHistory.vue";
import { useQuoteApi } from "./composables/useQuoteApi";

const {
  quote,
  isLoading,
  error,
  quoteHistory,
  fetchFirstQuote,
  fetchNewQuote,
  deleteFromHistory,
  shareQuoteOnTwitter
} = useQuoteApi();

function copyToClipboard() {
  const text = `"${quote.value.content}" — ${quote.value.author}`;
  navigator.clipboard
    .writeText(text)
    .then(() => alert("Quote successfully copied"));
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
    >
      <QuoteCard
        :quote="quote"
        :isLoading="isLoading"
        :error="error"
        :shareQuoteOnTwitter="shareQuoteOnTwitter"
        @fetchNewQuote="fetchNewQuote"
        @copyToClipboard="copyToClipboard"
      />
    </div>

    <QuoteHistory
      :quoteHistory="quoteHistory"
      :deleteFromHistory="deleteFromHistory"
    />
  </div>
</template>
