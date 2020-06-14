const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const {interface, bytecode} = require("./compile");

require("dotenv").config();

const provider = new HDWalletProvider(
    process.env.RINKEBY_MNEMONIC,
    process.env.RINKEBY_INFURA_URL,
);

const web3 = new Web3(provider);

(async () => {

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const result = await (new web3.eth.Contract(JSON.parse(interface)))
        .deploy({
            data: bytecode,
            arguments: [
                "Hello, world!",
            ],
        })
        .send({
            from: account,
        });

    console.log(result.options.address);

})().catch(console.error);
