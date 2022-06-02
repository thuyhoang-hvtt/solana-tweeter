import { TweetModel } from '@src/models/tweet.model';
import { PublicKey } from '@solana/web3.js';
import { useWorkspace } from '@src/hooks';

export const getTweet = async (publicKey: PublicKey) => {
  const { program } = useWorkspace();
  const account = await program.value.account.tweet.fetch(publicKey);
  return new TweetModel(publicKey, account);
};
