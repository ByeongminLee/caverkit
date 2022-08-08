# CaverKit

[![npm version](https://badge.fury.io/js/caverkit.svg)](https://badge.fury.io/js/caverkit)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)

<br />

## 🛠️ Install

```sh
npm install caverkit
```

<br />

## 💡 Usage

```ts
import CaverKit from 'CaverKit';

const cav = new CaverKit(chainId, address, privateKey, ABI, ContractAddress);
```

### Keyring

```ts
import CaverKit from 'CaverKit';

const ABI = require(`@/ABI/abi.json`);

const cav = new CaverKit(
  'chainId', // main: 8217  // test: 1001
  'address',
  'privateKey',
  ABI,
  'ContractAddress',
);

console.log(cav.Keyring);
```

### Transaction

_Call Transaction_

```ts
const callMethod = 'balanceOf';
const params2 = ['balanceOf address : 0x12...'];
const callResult2 = await cav.callContract(callMethod, params);
```

_Send Transaction_

```ts
const to = 'toAddress: 0x12...';
const sendMethod = 'mint';
const toPebAmount = await cav.utils.toPeb(1);

const params = [to, toPebAmount];
const sendResult = await cav.sendContract(sendMethod, params);
```

#### Utils

_Convert To Peb_

```ts
const toPebNumTest = await cav.utils.toPeb(1);
```

_Get Wallet Information_

```ts
const address = '0x....';
const account = await cav.utils.getAccount(address);
```

_Check The Amount Of Klay In Wallet_

```ts
const address = '0x....';
const balance = await cav.utils.getBalance(address);
```

_Get Current BlockNumber_

```ts
const blockNumber = await cav.utils.getBlockNumber();
```

_Get TransactionReceipt_

```ts
const Tx = '0x....';
const receipt = await cav.utils.getTransactionReceipt(Tx);
```
