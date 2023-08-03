import { getDefaultProvider, Wallet } from "ethers";
import { Provider, TransactionResponse } from "@ethersproject/providers";
import { ERC721PermissionedMintable } from "@imtbl/sdk";

const CONTRACT_ADDRESS = "0x4d5f1F53FF2b3ebD0ab5e84e9Ca1937C423df158";
const PRIVATE_KEY = "7db1646c95fa3039b0c0b3ee0284f6984b4dbef87ab1465fd97a324d05b45951";
const provider = getDefaultProvider(
    "https://zkevm-rpc.sandbox.x.immutable.com/"
);

const grantMinterRole = async (
    provider: Provider
): Promise<TransactionResponse> => {
    // Bound contract instance
    const contract = new ERC721PermissionedMintable(CONTRACT_ADDRESS);
    // The wallet of the intended signer of the mint request
    const wallet = new Wallet(PRIVATE_KEY, provider);

    // Give the wallet minter role access
    const populatedTransaction = await contract.populateGrantMinterRole(
        wallet.address
    );
    const result = await wallet.sendTransaction(populatedTransaction);
    return result;
};

grantMinterRole(provider);