const { network } = require("hardhat");
const { developmentChains} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    console.log("-------Deploying Box.sol--------")
    // deploying a Logic contract backed by "OpenZeppelinTransparentproxy"...
    // that has "BoxProxyAdmin" as admin of the proxy itself
    const box = await deploy("Box", {
        from: deployer,
        log: true,
        args: [],        // no args needed in Box's constructor
        waitConfirmations: network.config.blockConfirmations || 1,
        proxy: {
            // Proxy: TransparentUpgradableProxy.sol in OZ npm pkg.
            proxyContract: "OpenZeppelinTransparentProxy",
            // we're Not assigning a single admin address, rather an Admin Contract...
            // best practice for # of reasons
            
            // Admin of above Proxy: BoxProxyAdmin
            viaAdminProxy: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })
    
    // Verifying on (Goerli) testnet
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {        // process.env is accessible here in deploy script
        log(`Verifying on Goerli.Etherscan.......`)
        await verify(box.address, args)
        // OR verify(box.address, [])
    }
}