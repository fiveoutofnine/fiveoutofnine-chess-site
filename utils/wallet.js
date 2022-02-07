/** @return if browser is running MetaMask. */
function getMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
}

/** @return whether MetaMask connected successfuly. */
async function connectMetamask() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        return accounts[0];
    } catch(err) {
        console.error(err);
        return false;
    }
}

/** @return the first `userAddress` from the list of connected addresses. */
async function getUserAddress() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    return accounts[0] || "";
}

export { getUserAddress, getMetaMaskInstalled, connectMetamask }
