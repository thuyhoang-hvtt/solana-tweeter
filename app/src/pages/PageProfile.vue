<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { fetchTweets } from '@src/api';
  import TweetForm from '@src/components/TweetForm.vue';
  import TweetList from '@src/components/TweetList.vue';
  import { ITweet } from '@src/interface';
  import { useWorkspace } from '@src/hooks';

  const tweets = ref<ITweet[]>([]);
  const loading = ref(true);

  watchEffect(() => {
    fetchTweets()
      .then((fetchedTweets) => (tweets.value = fetchedTweets))
      .finally(() => (loading.value = false));
  });

  const addTweet = (tweet: ITweet) => tweets.value.push(tweet);

  const { wallet } = useWorkspace();
</script>

<template>
  <!-- TODO: Check connected wallet -->
  <div v-if="wallet" class="border-b px-8 py-4 bg-gray-50">
    {{ wallet.publicKey.toBase58() }}
  </div>
  <tweet-form @added="addTweet"></tweet-form>
  <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
