import CaverKit from '../src';

/** Test Initial */
const abiName = 'testABI';
const ABI = require(`./ABI/${abiName}.json`);
const ContractAddress = '0xB5c4650400EFe1f6a32bcA92a01E825503754697';
const chainID = '1001';
const address = '0x3A3608Db6A84F65d356fd4b3bBd5BC3d463ce240';
const privateKey = '0x1289e5274bc4715f174a5e1ef9e99a04e7b2c54bf673e830875ad237da888232';
const Tx = '0xbe0132a68eef8a3f5d2789e53d9b8f9a9af21f934aa78d3e2e4947a3c2057f9a';

const cav = new CaverKit(chainID, address, privateKey, ABI, ContractAddress);

describe('Caver', () => {
  test('Keyring', () => {
    expect(Object.keys(cav.Keyring)).toStrictEqual(['_address', '_key']);
  });

  test('call Contract1 : no param', async () => {
    const callMethod1 = 'totalSupply';
    const callResult1 = await cav.callContract(callMethod1);
    expect(typeof callResult1).toBe('string');
    expect(parseInt(callResult1)).toBeGreaterThan(1000000000000000);
  });

  test('call Contract2 : with param', async () => {
    const callMethod2 = 'balanceOf';
    const params = ['0x3A3608Db6A84F65d356fd4b3bBd5BC3d463ce240'];
    const callResult2 = await cav.callContract(callMethod2, params);
    expect(typeof callResult2).toBe('string');
    expect(parseInt(callResult2)).toBeGreaterThan(1000000000000000);
  });

  test('send Contract1', async () => {
    const sendMethod = 'mint';
    const toPebAmount = await cav.utils.toPeb(1);

    const params = [address, toPebAmount];
    const sendResult = await cav.sendContract(sendMethod, params);
    expect(sendResult.status).toBe(true);
  });
});

describe('utils', () => {
  test('toPeb', async () => {
    const toPebNumTest = await cav.utils.toPeb(1);
    expect(toPebNumTest).toBe('1000000000000000000');
  });

  test('account', async () => {
    const account = await cav.utils.getAccount(address);
    expect(Object.keys(account.account).length).toBe(4);
  });

  test('balance', async () => {
    const balance = await cav.utils.getBalance(address);
    expect(typeof balance).toBe('number');
  });

  test('blockNumber', async () => {
    const blockNumber = await cav.utils.getBlockNumber();
    expect(typeof blockNumber).toBe('number');
  });

  test('getTransactionReceipt', async () => {
    const receipt = await cav.utils.getTransactionReceipt(Tx);
    expect(receipt.status).toBe(true);
  });
});
