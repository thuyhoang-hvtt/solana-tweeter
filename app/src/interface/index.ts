import { Program, Provider } from '@project-serum/anchor';
import { Connection } from '@solana/web3.js';
import { AnchorWallet } from 'solana-wallets-vue';
import { SolanaTwitter } from '@src/idl/solana_twitter';
import { ComputedRef, Ref } from 'vue';

export interface IWorkspace {
  wallet: Ref<AnchorWallet | undefined>;
  provider: ComputedRef<Provider>;
  program: ComputedRef<Program<SolanaTwitter>>;
  connection: Connection;
}
