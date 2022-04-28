import { ethers } from 'ethers';

import {
    WEB3_NETWORK,
    WEB3_ETHERSCAN_API_KEY
} from '@/web3/domain/common/constants';

export class Web3ConnectionService {

    provider;

    static createConnectionProvider() {
        return new Web3ConnectionService();
    }

    async getProvider() {
        if (!this.provider) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            this.provider = provider;
        }

        return this.provider;
    }

    async getSigner() {
        const provider = await this.getProvider();

        return await provider.getSigner();
    } 

    async metamaskLogin() {
        const provider = await this.getProvider();
        await provider.send("eth_requestAccounts", []);
    }

    async getMetamaskAddress() {
        const signer = await this.getSigner();
        
        return signer.getAddress();
    }

    async getMetamaskBalance() {
        const signer = await this.getSigner();
        
        const balance = await signer.getBalance();

        return ethers.utils.formatEther(balance);
    }

    async getTransactionsHistory(address) {
        const provider = new ethers.providers.EtherscanProvider(WEB3_NETWORK, WEB3_ETHERSCAN_API_KEY);
        const history = await provider.getHistory(address);
        return history;
    }

    async startFundTransfer(transferAddress, transferAmount) {
        const tx = {
            to: transferAddress,
            value: this.parseEther(transferAmount)
        }

        const signer = await this.getSigner();

        const transactionResult = await signer.sendTransaction(tx)
        return transactionResult;
    }

    parseEther(value) {
        return ethers.utils.parseEther(value.toString());
    }

    formatEther(value) {
        return ethers.utils.formatEther(value.toString());
    }
    
}