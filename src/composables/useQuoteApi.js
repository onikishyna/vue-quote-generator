import { ref, watch } from 'vue';

export function useQuoteApi() {
  const quote = ref({ content: '', author: '' });
  const isLoading = ref(true);
  const error = ref(null);
  const quoteHistory = ref(
    JSON.parse(localStorage.getItem('quoteHistory') || '[]')
  );
  const maxQuotesLength = 5;

  watch(quoteHistory, (newHistory) => {
    localStorage.setItem('quoteHistory', JSON.stringify(newHistory));
  }, { deep: true });

  async function fetchFirstQuote() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      quote.value = {
        content: data.quote.replace(/^['"]|['"]$/g, ''),
        author: data.author,
      };
      
      isLoading.value = false;
    } catch (err) {
      error.value = "Failed to fetch quote. Please try again.";
      isLoading.value = false;
    }
  }

  async function fetchNewQuote() {
    try {
      if (quote.value) {
        quoteHistory.value.unshift({ ...quote.value });
        if (quoteHistory.value.length > maxQuotesLength) {
            quoteHistory.value = quoteHistory.value.slice(0, maxQuotesLength);
        }
      }
      await fetchFirstQuote();
    } catch (err) {
      error.value = "Failed to fetch new quote";
    }
  }

  function deleteFromHistory(index) {
    quoteHistory.value.splice(index, 1);
  };

  function shareQuoteOnTwitter(quoteToShare = quote.value) {
    try {
      const tweetText = `"${quoteToShare.content}" — ${quoteToShare.author}`;

      if (tweetText.length > 280) {
        throw new Error('Quote exceeds Twitter character limit');
      }

      const encodedText = encodeURIComponent(tweetText);
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
      
      window.open(twitterUrl, '_blank');
    } catch (error) {
      console.error('Error sharing to Twitter:', error);
      error.value = 'Failed to share quote on Twitter';
    }
  }


  return {
    quote,
    isLoading,
    error,
    quoteHistory,
    fetchFirstQuote,
    fetchNewQuote,
    deleteFromHistory,
    shareQuoteOnTwitter
  };
}