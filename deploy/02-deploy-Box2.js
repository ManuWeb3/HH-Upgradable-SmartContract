const { network } = require("hardhat");
const { developmentChains} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    console.log("-------Deploying BoxV2.sol--------")
    // deploying a Logic contract backed by "OpenZeppelinTransparentproxy"...
    // that has "BoxProxyAdmin" as admin of the proxy itself
    const box2 = await deploy("BoxV2", {
        from: deployer,
        log: true,
        args: [],        // no args needed in Box's constructor
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    // not proxied for now unlike Box.js

    
    // Verifying on (Goerli) testnet
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {        // process.env is accessible here in deploy script
        log(`Verifying on Goerli.Etherscan.......`)
        await verify(box2.address, args)
        // OR verify(box.address, [])
    }
}