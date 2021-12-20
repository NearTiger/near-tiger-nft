const { keyStores, connect } = require("near-api-js");
const main = require("deploy")
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const ACCOUNT_ID = "louisa.testnet";
const WASM_PATH = "./wasm-files/status_message.wasm";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

// deployContract(ACCOUNT_ID);

// async function deployContract(accountId) {
//   const near = await connect(config);
//   const account = await near.account(accountId);
//   const result = await account.deployContract(fs.readFileSync(wasmPath));
//   console.log(result);
// }