import * as anchor from "@project-serum/anchor";
import { AnchorError, Program } from "@project-serum/anchor";
import { assert } from "chai";
import { SolanaTwitter } from "../target/types/solana_twitter";

describe("solana_twitter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  let program: Program<SolanaTwitter>;
  let provider: anchor.AnchorProvider;
  let connection: anchor.web3.Connection;
  let programId: anchor.web3.PublicKey;
  before(() => {
    program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;
    provider = program.provider as anchor.AnchorProvider;
    connection = provider.connection;
    programId = programId;
  });

  it("can send a new tweet", async () => {
    const tweet = anchor.web3.Keypair.generate();
    await program.methods
      .sendTweet("newworld", "Welcome to new world, Hummus!")
      .accounts({
        tweet: tweet.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: programId,
      })
      .signers([tweet])
      .rpc();

    // Fetch the account details of the created tweet.
    const createdTweet = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data
    assert.equal(
      createdTweet.author.toBase58(),
      provider.wallet.publicKey.toBase58()
    );
    assert.equal(createdTweet.topic, "newworld");
    assert.equal(createdTweet.content, "Welcome to new world, Hummus!");
    assert.ok(createdTweet.timestamp);
  });

  it("can send a new tweet without a topic", async () => {
    const tweet = anchor.web3.Keypair.generate();
    await program.methods
      .sendTweet("", "2nd tweet without a topic")
      .accounts({
        tweet: tweet.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: programId,
      })
      .signers([tweet])
      .rpc();

    // Fetch the account details of the created tweet.
    const createdTweet = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    assert.equal(
      createdTweet.author.toBase58(),
      provider.wallet.publicKey.toBase58()
    );
    assert.equal(createdTweet.topic, "");
    assert.equal(createdTweet.content, "2nd tweet without a topic");
    assert.ok(createdTweet.timestamp);
  });

  it("can send a new tweet from a different author", async () => {
    // Create another user and airdrop them some SOL
    const otherUser = anchor.web3.Keypair.generate();
    const signature = await connection.requestAirdrop(otherUser.publicKey, 5e8);
    const latestBlockhash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature,
    });

    // Call the 'SendTweet' instruction on behalf of this other user
    const tweet = anchor.web3.Keypair.generate();
    await program.methods
      .sendTweet("crypto", "Solana will go to the moon 🚀")
      .accounts({
        tweet: tweet.publicKey,
        author: otherUser.publicKey,
        systemProgram: programId,
      })
      .signers([otherUser, tweet])
      .rpc();

    // Fetch the account details of the created tweet.
    const createdTweet = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    assert.equal(
      createdTweet.author.toBase58(),
      otherUser.publicKey.toBase58()
    );
    assert.equal(createdTweet.topic, "crypto");
    assert.equal(createdTweet.content, "Solana will go to the moon 🚀");
    assert.ok(createdTweet.timestamp);
  });

  it("cannot provide a topic with more than 50 characters", async () => {
    try {
      const tweet = anchor.web3.Keypair.generate();
      const topicWith51Chars = "x".repeat(51);
      await program.methods
        .sendTweet(topicWith51Chars, "Hello, world!")
        .accounts({
          tweet: tweet.publicKey,
          author: provider.wallet.publicKey,
          systemProgram: programId,
        })
        .signers([tweet])
        .rpc();
    } catch (error) {
      assert.equal(
        (error as AnchorError).error.errorMessage,
        "The provided topic should be 50 characters long maximum."
      );
      return;
    }

    assert.fail("The instruction should have failed with a 51-character topic");
  });

  it("cannot provide a content with more than 280 characters", async () => {
    try {
      const tweet = anchor.web3.Keypair.generate();
      const contentWith281Chars = "x".repeat(281);
      await program.methods
        .sendTweet("contenttoolong", contentWith281Chars)
        .accounts({
          tweet: tweet.publicKey,
          author: provider.wallet.publicKey,
          systemProgram: programId,
        })
        .signers([tweet])
        .rpc();
    } catch (error) {
      assert.equal(
        (error as AnchorError).error.errorMessage,
        "The provided content should be 280 characters long maximum."
      );
      return;
    }

    assert.fail(
      "The instruction should  have failed with a 281-character content."
    );
  });
});
