// manual way...
// though hardhat also has in-built deploy scripts to upgrade our Box.sol to BoxV2.sol

const { ethers } = require("hardhat")

async function main() {
    // "BoxProxyAdmin" renamed to "DefaultProxyAdmin" by HH itself
    const boxProxyAdmin = await ethers.getContract("DefaultProxyAdmin")     // B#1: re-deployed
    // "name" in getContract() is the name with which HH deployed our contract, not the original name
    const transparentProxy = await ethers.getContract("Box_Proxy")          // B#2: before Proxy, Box gets re-deployed
                                                                            // B#3: Proxy re-deployed
    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
    const versionV1 = await proxyBoxV1.version()
    console.log("Checking Box_version on transparentProxy.address")
    console.log(`Version: ${versionV1}`)
    
    // needed boxV2, to call 'upgrade()' f()
    const boxV2 = await ethers.getContract("BoxV2")                         // B#4: re-deployed
    // manually upgrading... 
    // ProxyAdmin -> upgrade(TUP proxy, address impl)                       // B#5: upgrade() called
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)
    // Now...
    // to work with our f() of BoxV2.sol, we're gonna give "BoxV2.sol"'s ABI...
    // however, we're gonna load it at transparentProxy.address...
    // this way ethers knows that: OK, we're gonna call all our f() at transparentProxy.address...
    // BUT, proxyBox is going to have the ABI of "BoxV2.sol"
    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    const versionV2 = await proxyBoxV2.version()
    console.log("Post-upgradation...Checking Box_version on transparentProxy.address ")
    console.log(`Version: ${versionV2}`)
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error)
    process.exit(1)
})
