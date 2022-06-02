import { PublicKey } from '@solana/web3.js';
import { format, formatRelative } from 'date-fns';

export interface ITweet {
  publicKey: PublicKey;
  author: PublicKey;
  topic: string;
  content: string;
  timestamp: number;
}

export class TweetModel implements ITweet {
  publicKey: PublicKey;
  author: PublicKey;
  topic: string;
  content: string;
  timestamp: number;

  constructor(publicKey: PublicKey, accountData: any) {
    this.publicKey = publicKey;
    this.author = accountData.author;
    this.timestamp = accountData.timestamp.toNumber() * 1000;
    this.topic = accountData.topic;
    this.content = accountData.content;
  }

  get key() {
    return this.publicKey.toBase58();
  }

  get author_display() {
    const author = this.author.toBase58();
    return author.slice(0, 4) + '..' + author.slice(-4);
  }

  get created_at() {
    return format(this.timestamp, 'LLL');
  }

  get created_ago() {
    return formatRelative(this.timestamp, new Date());
  }
}
