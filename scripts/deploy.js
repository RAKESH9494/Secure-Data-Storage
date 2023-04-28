const hre = require("hardhat");
async function main() {
    const Rviews = await hre.ethers.getContractFactory('DataStoringOrg');
    const contract = await Rviews.deploy();
     await contract.deployed();
     console.log("Address of Contract : ",contract.address);  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });