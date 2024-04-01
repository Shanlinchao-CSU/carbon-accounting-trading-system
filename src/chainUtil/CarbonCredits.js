import {Web3} from 'web3'

const App = {
    web3: null,
    web3Provider: null,
    contract: null,

    init: async function () {
        if (App.web3 == null) {
            App.web3 = new Web3(Web3.givenProvider || 'http://119.23.143.76:8545');
            const accounts = await App.web3.eth.getAccounts();
            App.web3.eth.defaultAccount = accounts[0]
            App.contract = new App.web3.eth.Contract(abi, address)
        }
    },
    getTransactionHistory: async function() {
        // const balance = await App.contracts.cc_Contract.methods.
        // balanceOf("0x1BbC291855D576E335f1C0C2AF71a15ddFe6751E").call()
        await App.init()
        return await App.contract.getPastEvents("CarbonTransaction", {
            fromBlock: 0,
            toBlock: 'latest'
        })
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
    }
}
const address = "0x7E9669D0087Bb44Effba97D7EEc18eC258962dB8"
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
                "name": "account",
                "type": "address"
            },
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
        "inputs": [],
        "name": "carbonIssuer",
        "outputs": [
            {
                "internalType": "address",
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
                "name": "account",
                "type": "address"
            },
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