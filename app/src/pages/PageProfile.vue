<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { fetchTweets, authorFilter } from '@src/api';
  import TweetForm from '@src/components/TweetForm.vue';
  import TweetList from '@src/components/TweetList.vue';
  import { TweetModel } from '@src/models/tweet.model';
  import { useWorkspace } from '@src/hooks';

  const { wallet } = useWorkspace();

  const tweets = ref<TweetModel[]>([]);
  const loading = ref(true);

  watchEffect(() => {
    if (!wallet.value) return;
    fetchTweets([authorFilter(wallet.value.publicKey.toBase58())])
      .then((fetchedTweets) => (tweets.value = fetchedTweets))
      .finally(() => (loading.value = false));
  });

  const addTweet = (tweet: TweetModel) => tweets.value.push(tweet);
</script>

<template>
  <!-- TODO: Check connected wallet -->
  <div v-if="wallet" class="border-b px-8 py-4 bg-gray-50">
    {{ wallet.publicKey.toBase58() }}
  </div>
  <tweet-form @added="addTweet"></tweet-form>
  <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
