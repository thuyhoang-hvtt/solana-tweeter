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
