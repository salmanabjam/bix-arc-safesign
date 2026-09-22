# BiX Arc SafeSign

A minimal hybrid approval prototype for Arc Mainnet.

## What it proves

A protected action can require two independent approvals:

1. The normal EVM transaction signature, represented on-chain by msg.sender.
2. A post-quantum SLH-DSA-SHA2-128s signature verified by Arc native verifier at 0x1800000000000000000000000000000000000004.

The prototype does not custody funds and does not transfer tokens. It emits an approval proof only after the wallet identity and PQ signature both match.

## Evidence

- Local SLH-DSA keygen/sign/verify: PASS
- Solidity compile: PASS
- Arc Mainnet chain ID: 5042
- Arc Mainnet live SLH-DSA precompile verification: PASS
- Mainnet contract deployment: PENDING USER REAL-MONEY APPROVAL
- Real-money spend so far: $0

## Security

Prototype only. Not audited. Do not use it to protect production assets.
