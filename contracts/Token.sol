// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TestToken is a basic ERC20 Token
 */
contract Token is ERC20, Ownable {
    /**
     * @dev assign totalSupply to account creating this contract
     */

    constructor(string memory _TokenName, string memory _TokenSymbol)
        ERC20(_TokenName, _TokenSymbol)
    {
        _mint(msg.sender, 5000000000000);
    }

    function FreeTest() public {
        _mint(msg.sender, 5000000);
    }
}
