1. Upgrade Box -> BoxV2
2. Initially, Proxy -> Box
3. Later, Proxy -> BoxV2

2 options to create Proxy contract:
1. Manually: SmallProxy - sublesson
2. Hardhat's deploy() in-built proxies: 
    - without any modification of the contract itself,
    - but ensuring that all the constructor args have been passed in proxy init/update f(),
    - setting {proxy: true} in the same deploy f()
3. Openzeppelin: Upgrade plugins (scripts)