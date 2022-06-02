<script setup lang="ts">
  import { computed, toRefs } from 'vue';
  import TweetCard from '@src/components/TweetCard.vue';
  import { TweetModel } from '@src/models/tweet.model';

  interface IProps {
    tweets: Array<TweetModel>;
    loading: boolean;
  }

  const props = defineProps<IProps>();

  const { tweets, loading } = toRefs(props);
  const orderedTweets = computed(() => {
    return tweets.value.slice().sort((a, b) => b.timestamp - a.timestamp);
  });
</script>

<template>
  <div v-if="loading" class="p-8 text-gray-500 text-center">Loading...</div>
  <div v-else class="divide-y">
    <tweet-card
      v-for="tweet in orderedTweets"
      :key="tweet.key"
      :tweet="tweet"
    ></tweet-card>
  </div>
</template>
