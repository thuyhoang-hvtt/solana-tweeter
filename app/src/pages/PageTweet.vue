<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { PublicKey } from '@solana/web3.js';
  import { getTweet } from '@src/api';
  import { useFromRoute } from '@src/hooks';
  import { TweetModel } from '@src/models/tweet.model';
  import TweetCard from '@src/components/TweetCard.vue';

  const tweetAddress = ref('');
  useFromRoute((route) => (tweetAddress.value = route.params.tweet as string));

  const loading = ref(false);
  const tweet = ref<TweetModel | null>(null);
  watchEffect(async () => {
    try {
      loading.value = true;
      tweet.value = await getTweet(new PublicKey(tweetAddress.value));
    } catch (e) {
      tweet.value = null;
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div v-if="loading" class="p-8 text-gray-500 text-center">Loading...</div>
  <div v-else-if="!tweet" class="p-8 text-gray-500 text-center">
    Tweet not found
  </div>
  <tweet-card v-else :tweet="tweet"></tweet-card>
</template>
