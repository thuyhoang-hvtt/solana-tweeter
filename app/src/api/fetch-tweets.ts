import { TweetModel } from '@src/models/tweet.model';
import { useWorkspace } from '@src/hooks/useWorkspace';
import { utils } from '@project-serum/anchor';

export const fetchTweets = async (filters: any[] = []) => {
  const { program } = useWorkspace();
  const tweets = await program.value.account.tweet.all(filters);
  return tweets.map((tweet) => new TweetModel(tweet.publicKey, tweet.account));
};

export const authorFilter = (authorBase58PublicKey: string) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
});

export const topicFilter = (topic: string) => ({
  memcmp: {
    offset:
      8 + // Discriminator.
      32 + // Author public key.
      8 + // Timestamp.
      4, // Topic string prefix.
    bytes: utils.bytes.bs58.encode(Buffer.from(topic)),
  },
});
