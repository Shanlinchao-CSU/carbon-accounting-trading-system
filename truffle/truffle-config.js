/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * Hands-off deployment with Infura
 * --------------------------------
 *
 * Do you have a complex application that requires lots of transactions to deploy?
 * Use this approach to make deployment a breeze 🏖️:
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node.
 * Infura accounts are available for free at 🔍: https://infura.io/register
 *
 * You'll need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. You can store your secrets 🤐 in a .env file.
 * In your project root, run `$ npm install dotenv`.
 * Create .env (which should be .gitignored) and declare your MNEMONIC
 * and Infura PROJECT_ID variables inside.
 * For example, your .env file will have the following structure:
 *
 * MNEMONIC = <Your 12 phrase mnemonic>
 * PROJECT_ID = <Your Infura project id>
 *
 * Deployment with Truffle Dashboard (Recommended for best security practice)
 * --------------------------------------------------------------------------
 *
 * Are you concerned about security and minimizing rekt status 🤔?
 * Use this method for best security:
 *
 * Truffle Dashboard lets you review transactions in detail, and leverages
 * MetaMask for signing, so there's no need to copy-paste your mnemonic.
 * More details can be found at 🔎:
 *
 * https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
 */

// require('dotenv').config();
// const { MNEMONIC, PROJECT_ID } = process.env;
const mnemonic = "<Your mnemonic>"; //自己的助记词
//carbon coin contract address:0xc68d6eA44cB2da6603B5e35668b2448A9E552dE6
//carbon credits contract address:0x1163628F4d327FbA344A272e8bd7EE6B6E8c5d05
const HDWalletProvider = require('@truffle/hdwallet-provider');


// 系统： 给新账号发送碳币，每月重置额度（到默认额度)，拥有碳币管理权
// 数据审核员： 碳报告上链
// 第三方机构： 查看所有信息
const accounts = ["0x90E672df02F2aed9A98a16324e6eE00344f6c7C3", // 0 系统
                  "0x46d9Be20C17CA09e09efC293f8e0BFc3B3efFb22", // 1 数据审核员
                  "0xd078d8bEADc71ae788f13F79F4CA6346DF2400CE"] // 2 第三方机构

module.exports = {
    /**
     * Networks define how you connect to your ethereum client and let you set the
     * defaults web3 uses to send transactions. If you don't specify one truffle
     * will spin up a managed Ganache instance for you on port 9545 when you
     * run `develop` or `test`. You can ask a truffle command to use a specific
     * network from the command line, e.g
     *
     * $ truffle test --network <network-name>
     */

    networks: {
        // Useful for testing. The `development` name is special - truffle uses it by default
        // if it's defined here and no other network is specified at the command line.
        // You should run a client (like ganache, geth, or parity) in a separate terminal
        // tab if you use this network and you must also set the `host`, `port` and `network_id`
        // options below to some value.
        //
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 8545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
            from : "0xdaE9E94287B4Afe7B4E7e28DF9d59161ceA283B0"
        },
        sepolia: {
            provider: function () {
                return new HDWalletProvider(mnemonic, "https://sepolia.infura.io/v3/d364d4ee1f6948d7ac8a9f352c4d4a40")
            },
            network_id: 11155111
        },
        cchain: {
            host: "120.78.1.201",
            port: 8545,
            network_id: "826",
            from: accounts[0] ,
            password: "123456mm"
        }
        //
        // An additional network, but with some advanced options…
        // advanced: {
        //   port: 8777,             // Custom port
        //   network_id: 1342,       // Custom network
        //   gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
        //   gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
        //   from: <address>,        // Account to send transactions from (default: accounts[0])
        //   websocket: true         // Enable EventEmitter interface for web3 (default: false)
        // },
        //
        // Useful for deploying to a public network.
        // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
        // goerli: {
        //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
        //   network_id: 5,       // Goerli's id
        //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
        //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
        //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        // },
        //
        // Useful for private networks
        // private: {
        //   provider: () => new HDWalletProvider(MNEMONIC, `https://network.io`),
        //   network_id: 2111,   // This network is yours, in the cloud.
        //   production: true    // Treats this network as if it was a public net. (default: false)
        // }
    },

    // Set default mocha options here, use special reporters, etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.21",      // Fetch exact version from solc-bin (default: truffle's version)
            docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: {          // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: false,
                    runs: 200
                },
                evmVersion: "byzantium"
            }
        }
    },

    // Truffle DB is currently disabled by default; to enable it, change enabled:
    // false to enabled: true. The default storage location can also be
    // overridden by specifying the adapter settings, as shown in the commented code below.
    //
    // NOTE: It is not possible to migrate your contracts to truffle DB and you should
    // make a backup of your artifacts to a safe location before enabling this feature.
    //
    // After you backed up your artifacts you can utilize db by running migrate as follows:
    // $ truffle migrate --reset --compile-all
    //
    // db: {
    //   enabled: false,
    //   host: "127.0.0.1",
    //   adapter: {
    //     name: "indexeddb",
    //     settings: {
    //       directory: ".db"
    //     }
    //   }
    // }
};
