import {Web3} from 'web3'
const App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        return App.initWeb3()
    },
    initWeb3: async function() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum
            try {
                await window.ethereum.enable()
            } catch (error) {
                console.error("User denied account access")
            }
        }
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://119.23.143.76:8545')
        }
        let web3 = new Web3(App.web3Provider)
        console.log(web3.eth.accounts[0])
        web3.eth.defaultAccount = "0x96a0cfE920bF1CcD1ef1cAe4b9592C41334CaC81"
        return App.initContract()
    },
    initContract: function() {
        $.getJSON('src/assets/static/CarbonCredits.json', function(data){
            App.contracts.InfoContract = TruffleContract(data);
            App.contracts.InfoContract.setProvider(App.web3Provider);
            App.getInfo();
        });
    },
    getInfo: function() {
        App.contracts.InfoContract.deployed().then(function(instance) {
            return instance.allowanceOf(web3.eth.accounts[0],{gas: 500000});
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.error(err);
        });
    }
}
export default App;