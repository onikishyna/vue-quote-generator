<script setup>
import { onMounted, computed } from "vue";
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
  navigator.clipboard.writeText(text);
}

const containerClasses = computed(() => {
  const isCenteringNeeded = quoteHistory.value.length === 0;
  return [
    "bg-emerald-800 min-h-screen flex flex-col items-center text-center",
    isCenteringNeeded ? "justify-center" : "",
    "xs:text-xs md:text-main",
  ];
});

onMounted(() => fetchFirstQuote());
</script>

<template>
  <div
    :class="containerClasses"
  >
    <div
      :class="
        quoteHistory.length > 0 ? 'xs:mt-20 md:mt-60 lg:mt-40 mb-10 mr-20 ml-20' : 'mr-20 ml-20'
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
