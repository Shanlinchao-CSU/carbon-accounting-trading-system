pragma  solidity ^0.8.0;

import "./ERC20.sol";

contract CarbonCoin is ERC20{
    uint256 _totalSupply; // 总供应量
    address public  _owner; // 部署合约的人
    uint8 public decimals = 18;  // 18 是建议的默认值
    mapping(address=>uint256) _balances; // address的余额
    mapping(address=>mapping(address=>uint256)) _approves; // a授权给b多少余额


    // 转账事件，转过之后让人能看到
    // event Transfer(address indexed _from, address indexed _to, uint256 _value);
    // 授权事件，授权之后让人能看到
    // event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(uint256 totalSupply)  {
        _owner = msg.sender; // _owner初始化为部署合约的人
        _totalSupply = totalSupply * 10 ** uint256(decimals);
        _balances[msg.sender] = _totalSupply; // 初始由合约创建者拥有所有的代币
    }

    // 设置权限
    modifier onlyOwner(){
        require(msg.sender == _owner);

        _;
    }


    //给指定账户投钱，只有部署合约的人有这个权限
    function airDrop(address _to, uint256 _value)  public {
        require(_to != address(0) && _value > 0);
        _balances[_to] = _value;
        _totalSupply += _value; // 投过钱后，总供应量增加
    }

    // 返回总供应量
    function totalSupply() override public view returns(uint totalSupply){
        totalSupply = _totalSupply;
        return totalSupply;
    }

    function balanceOf(address _owner) override public view returns(uint balance){
        require(_owner != address(0), "owner should not be empty! ");
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) override public returns (bool success){
        require(_to != address(0), "_to should not be empty !");
        require(_balances[msg.sender] >= _value && _value>0, "value should be valid !!");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        success = true;
        emit Transfer(msg.sender, _to, _value);
        return success;
    }

    // 被授权者来调用此函数，可理解为自己取钱，_from是授权的人
    function transferFrom(address _from, address _to, uint256 _value) override public returns (bool success){
        require(_from != address(0) && _to != address(0));
        require(_approves[_from][msg.sender] >= _value); // _from 授权给 msg.sender 的钱必须大于 _value
        _approves[_from][msg.sender] -= _value; // 取了钱后，_from 授权给 msg.sender 的钱就要减少
        _balances[_to] += _value;
        success = true;
        emit Transfer(_from, _to, _value);
        return success;
    }

    // 调用此函数，意为调用者（msg.sender）授权给_spender多少可动的钱
    function approve(address _spender, uint256 _value) override public returns (bool success){
        require(_spender != address(0));
        require(_balances[msg.sender] >= _value && _value > 0);
        _approves[msg.sender][_spender] += _value; // 授权
        _balances[msg.sender] -= _value;
        success = true;
        emit Approval(msg.sender, _spender, _value);
        return success;
    }

    function allowance(address _owner, address _spender) override public view returns (uint remaining){
        return _approves[_owner][_spender];
    }

}

