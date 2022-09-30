// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract BoxProxyAdmin is ProxyAdmin {
    // has to have a constructor (i/p - address) to work with Hardhat-deploy-proxies...
    // won't use any address, hence blank
    // similarly, leaving ProxyAdmin constructor as blank
    constructor (address /*owner*/) ProxyAdmin() {}

} 