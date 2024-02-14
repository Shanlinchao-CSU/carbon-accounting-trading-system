pragma solidity ^0.8.0;

abstract contract ERC20 {
    // function name() public view returns (string)
    // function symbol() public view returns (string)
    // function decimals() public view returns (uint8)
    function totalSupply() virtual public view returns (uint totalSupply); // 代币的总发行量
    function balanceOf(address _owner) virtual public view returns (uint balance); // 查看某地址的代币余额
    function transfer(address _to, uint256 _value) virtual public returns (bool success); // 将指定数量的代币从调用者账户转移到指定地址
    function transferFrom(address _from, address _to, uint256 _value) virtual public returns (bool success); // 从from地址转移指定数量代币到to地址，前提是调用者已被授权
    function approve(address _spender, uint256 _value) virtual public returns (bool success); // 授权地址spender可以从调用者账户转移最多value个代币
    function allowance(address _owner, address _spender) virtual public view returns (uint remaining); // 返回地址 owner 授权给 spender 的数量

    event Transfer(address indexed _from, address indexed _to, uint256 _value); // 代币转移时触发事件，记录发起者、接收者以及转移的数量
    event Approval(address indexed _owner, address indexed _spender, uint256 _value); // 授权时触发的事件，记录授权发起者、接收者以及转移的数量

}
