import Caver, { AbiItem, Keyring } from 'caver-js';
import Utils from './utils';

interface rpcUrlTypes {
  [key: string]: string;
}

class CaverKit {
  private _cav: Caver;
  private _address: string;
  private _privateKey: string;
  private _rpcUrl: rpcUrlTypes = {
    1001: 'https://public-node-api.klaytnapi.com/v1/baobab',
    8217: 'https://public-node-api.klaytnapi.com/v1/cypress',
  };
  private _abi: AbiItem[];
  private _ContractAddress: string;
  Keyring: Keyring;
  utils: Utils;

  constructor(
    chainId: string,
    address: string,
    privateKey: string,
    abi: AbiItem[],
    ContractAddress: string,
  ) {
    this._cav = this._getRpcUrl(chainId);
    this._address = address;
    this._privateKey = privateKey;
    this._abi = abi;
    this._ContractAddress = ContractAddress;
    this.Keyring = new this._cav.wallet.keyring.singleKeyring(
      this._address,
      this._privateKey,
    );
    this._cav.wallet.add(this.Keyring);
    this.utils = new Utils(this._rpcUrl, chainId);
  }

  private _getRpcUrl(chainId: string) {
    const rpcUrl: string = this._rpcUrl[chainId];
    return new Caver(rpcUrl);
  }

  async callContract(method: string, params?: string[]) {
    const CONTRACT_INSTANCE = new this._cav.contract(this._abi, this._ContractAddress);

    if (params)
      return await CONTRACT_INSTANCE.methods[method](...params).call({
        from: this._address,
        gas: 300000,
      });
    else if (!params)
      return await CONTRACT_INSTANCE.methods[method]().call({
        from: this._address,
        gas: 300000,
      });
  }

  async sendContract(method: string, params?: string[]) {
    const CONTRACT_INSTANCE = new this._cav.contract(this._abi, this._ContractAddress);

    if (params) {
      return await CONTRACT_INSTANCE.methods[method](...params).send({
        from: this._address,
        gas: 300000,
      });
    } else if (!params)
      return await CONTRACT_INSTANCE.methods[method]().send({
        from: this._address,
        gas: 300000,
      });
  }
}

export default CaverKit;
