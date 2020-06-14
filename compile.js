const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const contract = fs.readFileSync(contractPath, "utf-8");

// console.log(solc.compile(contract, 1));

module.exports = solc.compile(contract, 1).contracts[':Inbox'];
