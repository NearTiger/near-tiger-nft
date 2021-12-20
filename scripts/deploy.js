const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const { NEAR, Gas } = require("near-units");
const { Account, connect, keyStores, signAndSendTransaction,
  transactions: { deployContract, functionCall }, 
  accountCreator} = require("near-api-js");

  const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

  const config = {
    keyStore,
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
  };
  
const GAS = Gas.parse("200 Tgas");

const isMainnet = () => process.env.NODE_ENV == "mainnet";

//change this
//const contractId = isMainnet() ? "louisa_nft.near" : "tiger7.testnet";
const contractId = "tigercheck4.near";
console.log(contractId)
const linkdrop_contract = isMainnet() ? "near" : "testnet";

const royalties = {
  accounts: {
    // "tenk.sputnik-dao.near": 2,
    // "misfits.sputnikdao.near": 20,
    // "appalabs.near": 39,
    // "siliconpty.near": 39,
  },
  percent: 15,
};

const CONTRACT_PATH = `target/wasm32-unknown-unknown/release/tenk.wasm`;

async function main() {

  
  const near = await connect(config);
 
  const account = await near.account("tigercheck4.near");
  
  const { connection } = near;

  const contractBytes = fs.readFileSync(`${__dirname}/../${CONTRACT_PATH}`);
  const contractAccount = new Account(connection, contractId);

  console.log("\n\n deploying contractBytes:", contractBytes.length, "\n\n");
  const actions = [deployContract(contractBytes)];
  const state = await contractAccount.state();
  console.log(state);
  
  // When ready
  if (true) {
 //   if (state.code_hash === "11111111111111111111111111111111") {
      actions.push(
        functionCall(
          "new_default_meta",
          {
            owner_id: "tigercheck4.near",
            name: "Near Tiger Academy",
            symbol: "NTA",
            uri: "https://ipfs.io/ipfs/bafybeietwqswx3tqom6jjirp7u4h6mjvbrndg2ojbzspums4c4gog7ydpe",
            size: 3, // fill in
            base_cost: NEAR.parse("0.5 N"),
            min_cost: NEAR.parse("0.5 N"),
            after_sale_cost: NEAR.parse("0.5 N"),
            royalties,
          },
          GAS
        )
      );
      // actions.push(
      //   functionCall("start_premint", {
      //     duration: 10000,
      //   })
      // );
      console.log("about to initialize");
  //  }
    console.log(account);
   
    await account.signAndSendTransaction({
      receiverId: contractId,
      actions,
    });
  }
}

main()
//module.exports.main = main;
