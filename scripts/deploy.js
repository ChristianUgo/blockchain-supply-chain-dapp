const hre = require("hardhat");

async function main() {
    // 1. Get the contract factory layout
    const SupplyChainFactory = await hre.ethers.getContractFactory("SupplyChain");

    // 2. Deploy the contract instance
    const supplyChain = await SupplyChainFactory.deploy();

    // 3. Wait for the transaction to complete mining on the block
    await supplyChain.deployed();

    // 4. Print your live contract address
    console.log(`SupplyChain contract successfully deployed to: ${supplyChain.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});