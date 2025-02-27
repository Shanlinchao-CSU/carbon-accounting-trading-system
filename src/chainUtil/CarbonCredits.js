import {Web3} from 'web3'

const App = {
    web3: null,
    contract: null,

    init: async function () {
        if (App.web3 == null) {
            App.web3 = new Web3(window.ethereum);
            App.contract = new App.web3.eth.Contract(abi, address)
            App.carbonCoinContract = new App.web3.eth.Contract(carbonCoinABI, carbonCoinAddress)
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
        for (const item of transaction) {
            value = item.returnValues
            await App.web3.eth.getBlock(item.blockHash)
                .then(block => {
                date = new Date(Number(block.timestamp)*1000).toISOString()
                value.date = date})
                .catch(error => {
                    value.date = null
                })
            value._amount = Number(value._amount)
            value._price = Number(App.web3.utils.fromWei(value._price,"ether"))
            value.unit_price = (value._amount / value._price).toFixed(2)
        }
        return transaction.map(item => item.returnValues)
    },
    getCarbonReport: async function() {
        await App.init()
        let resu = await App.contract.getPastEvents("CarbonReportSubmitted", {
            fromBlock: 0,
            toBlock: 'latest'
        })
        resu = resu.map(item => JSON.parse(item.returnValues.carbonReport[0]))
        return resu
    },
    getCoinAmount: async function(public_key) {
        await App.init()
        let coin = await App.carbonCoinContract.methods.balanceOf(public_key).call()
        coin = App.web3.utils.fromWei(coin,'ether')
        const amount = await App.contract.methods.allowanceOf(public_key).call()
        return {coin:coin,remain:amount}
    },
    carbonTransaction: async function(_to, _amount, _price) {
        //code为0则成功,1为交易失败,2为授权失败,3为MetaMask未成功安装
        await App.init()
        if (window.ethereum) {
            let error,accounts = await window.ethereum.request({method:'eth_requestAccounts'})
            if (error) {
                return {code:2}
            }
            await App.carbonCoinContract.methods.approve(address, App.web3.utils.toWei(_price,'ether'))
                .send({
                    from: accounts[0],
                    gas: '1000000',
                    gasPrice: 1000000000
                })
                .on('error', error => {
                    console.log(error)
                    return {code:1}
                })
            await App.contract.methods.carbonTransaction(_to,_amount,App.web3.utils.toWei(_price, 'ether'))
                .send({
                    from: accounts[0],
                    gas: '1000000',
                    gasPrice: 1000000000
                })
                .on('error', error => {
                    console.log(error)
                    return {code:1}
                })
                .on('receipt', receipt => {
                    console.log(receipt)
                })
            return {code:0}
        } else {
            return {code:3}
        }
    },
    //发行额度
    issueAllowance: async function(public_key,amount){
        await App.init()
        if (window.ethereum) {
            let error,accounts = await window.ethereum.request({method:'eth_requestAccounts'})
            if (error) {
                return {code:2}
            }
            await App.contract.methods.resetAllowance(public_key,amount)
                .send({
                    from: accounts[0],
                    gas: '1000000',
                    gasPrice: 1000000000
                })
                .on('receipt',receipt => {
                    console.log(receipt)
                    return 0
                })
                .on('error', error => {
                    console.log(error)
                    return 1
                })
        } else {
            return 3
        }
    }
}
const address = "0x561067595417797Bf55D5e40C75eF0e4561bBF50"
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
                "name": "_admin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_auditor",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_thirdParty",
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
                "name": "_target",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "_amount",
                "type": "int256"
            }
        ],
        "name": "CarbonAllowanceReset",
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
                "internalType": "int256",
                "name": "_amount",
                "type": "int256"
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
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "_amount",
                "type": "int256"
            }
        ],
        "name": "ExceedRecord",
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
                "internalType": "int256",
                "name": "",
                "type": "int256"
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
                "name": "_target",
                "type": "address"
            },
            {
                "internalType": "int256",
                "name": "_amount",
                "type": "int256"
            }
        ],
        "name": "resetAllowance",
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
                "internalType": "int256",
                "name": "_amount",
                "type": "int256"
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
                "internalType": "address",
                "name": "_target",
                "type": "address"
            },
            {
                "internalType": "int256",
                "name": "_amount",
                "type": "int256"
            },
            {
                "internalType": "string",
                "name": "_report",
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
                "internalType": "int256",
                "name": "",
                "type": "int256"
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

const carbonCoinAddress = "0xBeAa1C479D634372b80ba1F538B5a850e56d542E"
const carbonCoinABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
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
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
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
        "name": "balanceOf",
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
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "name",
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
    },
    {
        "inputs": [],
        "name": "symbol",
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
    },
    {
        "inputs": [],
        "name": "totalSupply",
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
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export default App;