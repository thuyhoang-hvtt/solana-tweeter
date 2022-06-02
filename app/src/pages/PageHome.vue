<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import TweetForm from '@src/components/TweetForm.vue';
  import TweetList from '@src/components/TweetList.vue';
  import { fetchTweets } from '@src/api';
  import { TweetModel } from '@src/models/tweet.model';

  const tweets = ref<TweetModel[]>([]);
  const loading = ref(true);

  onBeforeMount(() => {
    fetchTweets()
      .then((fetchedTweets) => (tweets.value = fetchedTweets))
      .finally(() => (loading.value = false));
  });

  const addTweet = (tweet: TweetModel) => tweets.value.push(tweet);
</script>

<template>
  <tweet-form @added="addTweet"></tweet-form>
  <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
