const assert = require("assert");
const ganache = require("ganache-cli");

const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require("../compile");

let accounts;
let inbox;
let initialMessage = "Hello, world!";

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those account to deploy the contract
    inbox = await (new web3.eth.Contract(JSON.parse(interface)))
        .deploy({
            data: bytecode,
            arguments: [
                initialMessage,
            ],
        })
        .send({
            from: accounts.pop(),
            gas: 1000000,
        });
})

describe("Inbox", () => {
    it("should be deployed successful", () => {
        // We should have the address of the deployed contract
        // after put it into ganache.
        assert.ok(inbox.options.address);
    });

    it("should has default initialMessage", async () => {
        await assertMessage(initialMessage);
    })

    it("should updates the message successful", async () => {
        let newMessage = "Hi, John!";

        await inbox.methods.setMessage(newMessage).send({
            from: accounts.pop(),
        });

        await assertMessage(newMessage);
    })
});

async function assertMessage(expected) {
    let message = await inbox.methods.message().call();
    assert.strictEqual(message, expected);
}
