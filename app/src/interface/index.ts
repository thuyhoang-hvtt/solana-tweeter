import { Program, Provider } from '@project-serum/anchor';
import { Connection } from '@solana/web3.js';
import { AnchorWallet } from 'solana-wallets-vue';
import { SolanaTwitter } from '@src/idl/solana_twitter';
import { ComputedRef, Ref } from 'vue';

export interface ITweet {
  key?: string;
  author?: string;
  created_at: string;
  created_ago: string;
  topic: string;
  content: string;
  timestamp: number;
}

export interface IWorkspace {
  wallet?: Ref<AnchorWallet | undefined>;
  provider?: ComputedRef<Provider>;
  program?: ComputedRef<Program<SolanaTwitter>>;
  connection?: Connection;
}
