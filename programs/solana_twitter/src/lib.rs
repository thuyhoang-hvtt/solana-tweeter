use anchor_lang::prelude::*;

declare_id!("7GyjqgtmHTsLiS4Vr24GXck1uhJLBvkrxJQ5Ha4tw8at");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
} 

const DISCRIMINATOR_LENGTH: usize = 0;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4;  // Stores the size of the string
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 4;   // 280 chars max.

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH     // Author
        + TIMESTAMP_LENGTH      // Timestamp
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH       // Topic
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH;    // Content
}
