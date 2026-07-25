# Blockchain Supply Chain DApp — V1

The original interface for a decentralized shipment-tracking application built with Solidity, Next.js, Ethers.js, MetaMask, and Polygon Amoy.

[Portfolio](https://christianugo.com) · [V1 source](https://github.com/ChristianUgo/blockchain-supply-chain-dapp/tree/v1) · [V2 source](https://github.com/ChristianUgo/blockchain-supply-chain-dapp/tree/v2)

## Overview

V1 demonstrates the initial end-to-end shipment workflow: creating a shipment with escrowed test POL, moving it into transit, completing delivery, releasing payment, and reading shipment history from the smart contract.

## Features

- Connect MetaMask and request the Polygon Amoy network.
- Create a shipment with receiver, pickup time, distance, and escrowed test POL.
- Start a pending shipment.
- Complete a shipment and release its escrowed payment.
- View shipment status and transaction history.
- Configure the deployed contract through a public environment variable.

## Stack

- Next.js 13 and React 18
- Solidity and Hardhat
- Ethers.js and MetaMask
- Tailwind CSS
- Polygon Amoy
- Vercel

## Local Setup

```bash
git clone https://github.com/ChristianUgo/blockchain-supply-chain-dapp.git
cd blockchain-supply-chain-dapp
git checkout v1
npm install
```

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_SUPPLY_CHAIN_ADDRESS=0x2d3d3072b0fadf16fb6365766fdedba0ddd2478a
```

Start the application:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run lint
npm run build
```

## Deployment

The shared `SupplyChain.sol` contract is deployed on Polygon Amoy at
[`0x2d3d3072b0fadf16fb6365766fdedba0ddd2478a`](https://amoy.polygonscan.com/address/0x2d3d3072b0fadf16fb6365766fdedba0ddd2478a).
Add this address to `NEXT_PUBLIC_SUPPLY_CHAIN_ADDRESS` in Vercel for Production and Preview, then redeploy the project.

Planned live versions:

- V1: [supply-v1.christianugo.com](https://supply-v1.christianugo.com)
- V2: [supply-v2.christianugo.com](https://supply-v2.christianugo.com)

## Security Notice

This is an unaudited testnet portfolio project. Use Polygon Amoy test POL only. Never commit wallet private keys, seed phrases, RPC secrets, or `.env.local`.

## Author

Developed and maintained by **Christian Ugo**.

- [Portfolio](https://christianugo.com)
- [GitHub](https://github.com/ChristianUgo)
