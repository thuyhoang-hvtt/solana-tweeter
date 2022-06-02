import { computed } from 'vue';
import { useWallet, useAnchorWallet } from 'solana-wallets-vue';
import { Connection, PublicKey } from '@solana/web3.js';
import { Idl, Program, AnchorProvider, Wallet } from '@project-serum/anchor';
import { SolanaTwitter } from '@src/idl/solana_twitter';
import { IWorkspace } from '@src/interface';
import idl from '@src/idl/solana_twitter.json';

const preflightCommitment = 'processed';
const commitment = 'processed';
const programId = new PublicKey((idl as Idl).metadata.address);
let workspace: IWorkspace;

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection(
    import.meta.env.RPC_URL ?? 'http://127.0.0.1:8899',
    commitment
  );
  const provider = computed(
    () =>
      new AnchorProvider(connection, wallet.value as Wallet, {
        preflightCommitment,
        commitment,
      })
  );
  const program = computed(
    // @ts-ignore
    () => new Program<SolanaTwitter>(idl, programId, provider.value)
  );

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};
