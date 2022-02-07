import Web3 from 'web3'
import { ethers } from 'ethers'

import CONTRACT_ABI from './abi'

const PROVIDER = ethers.providers.getDefaultProvider()

const CONTRACT_ADDRESS = '0xb543f9043b387ce5b3d1f0d916e42d8ea2eba2e0'

const ethersContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    PROVIDER,
)

let web3Contract;
async function loadWeb3Contract() {
    if (typeof web3Contract === 'undefined') {
        window.web3 = new Web3(window.ethereum)
        web3Contract = await new window.web3.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
        )
    }
}

async function estimateMintMoveGas(userAddress, move, depth) {
    return await web3Contract.methods.mintMove(move, depth).estimateGas({
        from: userAddress,
        to: CONTRACT_ADDRESS
    })
}

async function mintMove(userAddress, move, depth) {
    try {
        await web3Contract.methods.mintMove(move, depth).send({
            from: userAddress,
            to: CONTRACT_ADDRESS,
            gas: Math.floor(estimateMintMoveGas(userAddress, move, depth) * 1.1),
        })
    } catch (err) {
        if (typeof err === 'string') window.alert(err)
        else window.alert(err.message)
    }
}

export { CONTRACT_ADDRESS, ethersContract, loadWeb3Contract, mintMove }
