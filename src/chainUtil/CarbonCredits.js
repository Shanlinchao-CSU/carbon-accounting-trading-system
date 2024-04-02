import {Web3} from 'web3'

const App = {
    web3: null,
    web3Provider: null,
    contract: null,

    init: async function () {
        if (App.web3 == null) {
            // App.web3 = new Web3(Web3.givenProvider || 'http://120.78.1.201:8545');
            App.web3 = new Web3(window.ethereum);
            App.contract = new App.web3.eth.Contract(abi, address)
        }
    },
    authorization: async function () {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    App.web3.eth.defaultAccount = accounts[0]
                    return 0
                })
                .catch((error) => {
                    return 1
                });
        } else {
            return 2
        }
    },
    getTransactionHistory: async function() {
        await App.init()
        let value = undefined
        let date = undefined
        let transaction = await App.contract.getPastEvents("CarbonTransaction", {
            fromBlock: 0,
            toBlock: 'latest'
        })
        console.log(transaction)
        transaction.forEach(item => {
            value = item.returnValues
            App.web3.eth.getBlock(item.blockHash)
                .then(block => {
                date = new Date(Number(block.timestamp)*1000).toISOString()
                value.date = date})
                .catch(error => {
                    value.date = null})
            value._amount = Number(value._amount)
            value._price = Number(App.web3.utils.fromWei(value._price,"ether"))
            value.unit_price = (value._amount / value._price).toFixed(2)
        })
        return transaction.map(item => item.returnValues)
    },
    getCarbonReport: async function() {
        await App.init()
        return await App.contract.getPastEvents("CarbonReportSubmitted", {
            fromBlock: 0,
            toBlock: 'latest'
        })
    },
    uploadReport: async function(report) {
        await App.init()
        return await App.contract.methods.submitCarbonReport(report)
            .send({from: App.web3.eth.defaultAccount})
            .on('receipt',receipt => {
                console.log(receipt)
            })
    },
    carbonTransaction: async function(_to, _amount, _price) {
        await App.init()
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async accounts => {
                    console.log(accounts[0])
                    await App.contract.methods.issueCarbonAllowance(_to,1000)
                        .send({
                            from: accounts[0],
                            gas: '1000000',
                            gasPrice: 1000000000
                        })
                        .on('receipt', receipt => {
                            console.log(receipt)
                        })
                    return 0
                })
                .catch((error) => {
                    console.log(error)
                    return 1
                });
        } else {
            console.log(33333)
            return 2
        }
    }
}
const address = "0xe1fC34A93039d1EAe8B00dbDf5101fAfE8A1dF9E"
const abi = [
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_carbonCoin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_carbonIssuer",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "target",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CarbonAllowanceBurned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "target",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CarbonAllowanceIssued",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "reportText",
                        "type": "string"
                    }
                ],
                "indexed": false,
                "internalType": "struct CarbonCredits.CarbonReport",
                "name": "carbonReport",
                "type": "tuple"
            }
        ],
        "name": "CarbonReportSubmitted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "CarbonTransaction",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "carbonAllowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "carbonCoin",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "carbonReports",
        "outputs": [
            {
                "internalType": "string",
                "name": "reportText",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "issueCarbonAllowance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "burnCarbonAllowance",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "carbonTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "report",
                "type": "string"
            }
        ],
        "name": "submitCarbonReport",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "allowanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "reportOf",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
]
export default App;