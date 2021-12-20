const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const { NEAR, Gas } = require("near-units");
 
let config = {
    networkId: "mainnet",
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    GAS: '200000000000000',
    DEFAULT_NEW_ACCOUNT_AMOUNT: '5',
    contractMethods: {
      changeMethods: [
        'nft_mint_one',
        'nft_mint_many',
        'create_linkdrop',
        'nft_transfer',
      ],
      viewMethods: [
        'cost_per_token',
        'discount',
        'token_storage_cost',
        'total_cost',
        'nft_supply_for_owner',
        'nft_total_supply',
        'nft_tokens',
        'nft_token',
        'nft_tokens_for_owner',
        'tokens_left',
        'cost_of_linkdrop',
        'nft_metadata',
        'get_key_balance',
        'check_key',
      ],
    },
  };

const { Account, connect, keyStores, signAndSendTransaction,
  transactions: { deployContract, functionCall }, 
  accountCreator} = require("near-api-js");

  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
  const config_near = {
    keyStore,
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
  };

//change this
//const contractId = isMainnet() ? "louisa_nft.near" : "tiger7.testnet";
const contractId = "tigeracademy.near";
console.log(contractId)


async function main() {

    const near = await connect(config_near);
    const contract = await near.loadContract(contractId, {
        ...config.contractMethods,
      });
   console.log(await contract.tokens_left());

   let metadata  = await contract.nft_token({ "token_id": "1" })
   for (let i = 1000; i < 2000; i ++) {
    let metadata  = await contract.nft_token({ "token_id": i.toString() })
    if (metadata != null) {
        console.log("Token:", i, "Owner:", metadata.owner_id);
    }
   }
}

main()
