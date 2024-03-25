App = {
    web3Provider: null,
    contracts: {}, 
  
   init: function() {
      return App.initWeb3(); 
   },
  
  /*加载web3*/
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
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }
    web3 = new Web3(App.web3Provider)
    console.log(web3.eth.accounts[0])
    web3.eth.defaultAccount = web3.eth.accounts[0]
    return App.initContract()
  }
,
    //console.log(web3.eth.accounts[0])
    //web3.eth.defaultAccount = "0x873415FaD32cb83C7e311bB2486ce6d804752968";
  
  /*初始化合约，获取合约，不需要使用at()的方式；
    显示合约的姓名和年龄信息*/
    initContract: function() {
      $.getJSON('../../../build/contracts/InfoContract.json', function(data){
        App.contracts.InfoContract = TruffleContract(data);
        App.contracts.InfoContract.setProvider(App.web3Provider);
        App.getInfo();
        App.watchChanged();
      });
      App.bindEvents();
    },  
  
  getInfo: function() {
      App.contracts.InfoContract.deployed().then(function(instance) {
        return instance.getInfo.call();
      }).then(function(result) { 
       $("#loader").hide();
        $("#info").html(result[0]+' ('+result[1]+' years old)'); 
       console.log(result);
      }).catch(function(err) {
        console.error(err); 
     });
    },
  
  /*点击按钮更新姓名和年龄，则需要更新到智能合约上*/
    bindEvents: function() {
      $("#button").click(function() { 
         $("#loader").show();
          App.contracts.InfoContract.deployed().then(function(instance) {
            return instance.setInfo($("#name").val(), $("#age").val(), {gas: 500000}); 
         }).then(function(result) {
            return App.getInfo();
          } ).catch(function(err) {
            console.error(err);
          }); 
       });
    }, 
  
   watchChanged: function() { 
     App.contracts.InfoContract.deployed().then(function(instance) { 
       var infoEvent = instance.Instructor(); 
       return infoEvent.watch(function(err, result) {
          $("#loader").hide();
          $("#info").html(result.args.name +' ('+ result.args.age +' years old)'); 
       }); 
     });
    }
    }
  
  $(function(){  
  $(window).load(function() {
        App.init();
    });
  });