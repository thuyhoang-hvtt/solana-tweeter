import { PublicKey } from '@solana/web3.js';

export const getTweet = async (publicKey: PublicKey) => {
  return {
    key: publicKey.toBase58(),
    topic: 'solana',
    content: 'gm',
    author: 'B1Af..wtRN',
    created_at: 'Nov 26, 2021 1:03PM',
    created_ago: 'just now',
    timestamp: 1637932864,
  };
};
