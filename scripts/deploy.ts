import { ethers } from "hardhat";
import { MyERC721, MyERC721__factory } from "../typechain-types";

async function deploy() {
  // get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // check account balance
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );

  // deploy MyERC721 contract
  const MyERC721: MyERC721__factory = await ethers.getContractFactory(
    "MyERC721"
  );
  const contract: MyERC721 = await MyERC721.connect(deployer).deploy(
    deployer.address, // owner
    "Blockchain Logos", // name
    "BLOGOS", // symbol
    "https://emerald-successive-armadillo-196.mypinata.cloud/ipfs/QmWEBicB62ZXZJ9QSMTHT9hbGXF8tqgMh9KCQNiaNpzqXt/nft-metadata/", // baseURI
    "https://emerald-successive-armadillo-196.mypinata.cloud/ipfs/QmWEBicB62ZXZJ9QSMTHT9hbGXF8tqgMh9KCQNiaNpzqXt/contract-metadata/contract.json", // contractURI
    deployer.address, // royalty recipient
    ethers.BigNumber.from("2000"), // fee numerator
  );
  await contract.deployed();

  // log deployed contract address
  console.log(`MyERC721 contract deployed to ${contract.address}`);
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
