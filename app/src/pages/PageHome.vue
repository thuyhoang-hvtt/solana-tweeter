<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import TweetForm from '@src/components/TweetForm.vue';
  import TweetList from '@src/components/TweetList.vue';
  import { fetchTweets } from '@src/api';
  import { ITweet } from '@src/interface';

  const tweets = ref<ITweet[]>([]);
  const loading = ref(true);

  onBeforeMount(() => {
    fetchTweets()
      .then((fetchedTweets) => (tweets.value = fetchedTweets))
      .finally(() => (loading.value = false));
  });

  const addTweet = (tweet: ITweet) => tweets.value.push(tweet);
</script>

<template>
  <tweet-form @added="addTweet"></tweet-form>
  <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
