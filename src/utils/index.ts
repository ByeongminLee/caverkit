import Caver from 'caver-js';

interface rpcUrlTypes {
  [key: string]: string;
}

class Utils {
  private _cav: Caver;
  private _rpcUrl: rpcUrlTypes;

  constructor(rpcUrl: rpcUrlTypes, chainId: string) {
    this._rpcUrl = rpcUrl;
    this._cav = this._getRpcUrl(chainId);
  }

  private _getRpcUrl(chainId: string) {
    const rpcUrl: string = this._rpcUrl[chainId];
    return new Caver(rpcUrl);
  }

  async toPeb(num: number) {
    try {
      return await this._cav.utils.toPeb(num);
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }

  async getAccount(account: string) {
    try {
      return await this._cav.klay.getAccount(account);
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }

  async getBalance(balance: string) {
    try {
      return parseInt(await this._cav.klay.getBalance(balance)) / 10 ** 18;
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }

  async getBlockNumber() {
    try {
      const blockNumber = await this._cav.rpc.klay.getBlockNumber();
      return parseInt(blockNumber);
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }

  async getTransactionReceipt(transactionHash: string) {
    try {
      const value = await this._cav.klay.getTransactionReceipt(transactionHash);
      return value;
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }
}

export default Utils;
