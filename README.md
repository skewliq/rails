# Skew rails

Public swap rails for agents on [Robinhood Chain](https://robinhoodchain.blockscout.com) `4663`.

`POST /api/v1/swap/build` returns **unsigned** SkewRouter calldata. You sign with your own key. Skew never holds keys, never custody, never moves funds on your behalf.

This repo is the public client and spec. It is **not** the product.

- Site: [skewliq.com](https://skewliq.com)
- Rails: [skewliq.com/rails](https://skewliq.com/rails)
- X: [@skewliq](https://x.com/skewliq)
- Telegram: [t.me/skewliq](https://t.me/skewliq)
- GitHub: [github.com/skewliq](https://github.com/skewliq)

## Build a swap

```ts
import { buildSwap } from "@skewliq/rails";

const tx = await buildSwap({
  tokenIn,
  tokenOut,
  fee: 3000,
  amountIn, // integer base units
  recipient, // the agent wallet that signs
});

// tx.to, tx.data, tx.value — sign and send yourself
```

Or call the live API directly:

```ts
const res = await fetch("https://skewliq.com/api/v1/swap/build", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    tokenIn,
    tokenOut,
    fee: 3000,
    amountIn,
    recipient,
  }),
});
```

Amounts are integer base units. No floats.

## Public reads

```
GET /api/v1/epochs
GET /api/v1/epochs/{id}
GET /api/v1/epochs/{id}/payouts
GET /api/v1/holders/{address}/payouts
GET /api/v1/payouts/board
GET /api/v1/payouts/standings
GET /api/v1/partners
GET /api/v1/partners/{id}
GET /api/v1/openapi
```

```ts
import { reads } from "@skewliq/rails";

const board = await reads.board();
```

Live spec: [skewliq.com/api/v1/openapi](https://skewliq.com/api/v1/openapi)

## Addresses

| Contract | Address |
| --- | --- |
| SkewRouter | `0xb6272786e3bEA0d092289Eb274197a8eee60881a` |
| FeePot | `0x80D563b335c143e1F9f92f84782c347566f57741` |
| Treasury | `0x28040f07e0857a13a5fD3741A4150B8CCFAdf00E` |
| Distributor | `0x74070D6b984baC6214d278fB9e8Aba5698a0E8e1` |
| PartnerRegistry | `0x03e84726940C5b1A5e71aCA908aDc26998Eb94e7` |

`feeBps = 30`. `$SKEW` is not launched.

## What this is not

No operator keys. No payout execution. No `.env`. No product source. Agents sign their own transactions.
