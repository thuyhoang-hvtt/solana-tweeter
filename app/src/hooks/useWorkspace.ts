import { computed } from 'vue';
import { useAnchorWallet } from 'solana-wallets-vue';
import { Connection, PublicKey } from '@solana/web3.js';
import { Idl, Program, AnchorProvider, Wallet } from '@project-serum/anchor';
import { SolanaTwitter } from '@src/idl/solana_twitter';
import { IWorkspace } from '@src/interface';
import idl from '@src/idl/solana_twitter.json';

const programId = new PublicKey((idl as Idl).metadata.address);
let workspace: IWorkspace | null = null;

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection(
    import.meta.env.RPC_URL ?? 'http://127.0.0.1:8899'
  );
  const provider = computed(
    () => new AnchorProvider(connection, wallet.value as Wallet, {})
  );
  const program = computed(
    () =>
      new Program(
        idl as SolanaTwitter,
        programId,
        provider.value
      ) as Program<SolanaTwitter>
  );

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};
