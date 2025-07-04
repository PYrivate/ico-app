import { ethers } from "ethers";
import { stakingICOAddress, stakingICOAbi } from "./constants";
import { toast } from "react-toastify";

async function loadContract(signer, chainId, setContract, address) {
  if (chainId !== 31337) {
    toast.error(
      "Please Change your network to Goerli Network for Buying Tokens"
    );
    return;
  }
  const _SYSTICOContract = new ethers.Contract(
    stakingICOAddress,
    stakingICOAbi,
    signer
  );

  setContract({
    SYSTICO: _SYSTICOContract,
  });

  //Read From Contract

  const tokensAvailable = ethers.utils.formatEther(
    await _SYSTICOContract.getICOTokenBalance()
  );

  const investorBalance = ethers.utils.formatEther(
    await _SYSTICOContract.investorBalanceOf(address)
  );

  return {
    tokensAvailable,
    investorBalance,
  };
}

export default loadContract;
