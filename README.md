# BiX Arc SafeSign

A minimal hybrid approval prototype for Arc Mainnet.

## What it proves

A protected action can require two independent approvals:

1. The normal EVM transaction signature, represented on-chain by msg.sender.
2. A post-quantum SLH-DSA-SHA2-128s signature verified by Arc native verifier at 0x1800000000000000000000000000000000000004.

## Arc Mainnet proof

- Contract: 0x7be8fa21cfb1913471dc1f02e141d5b9bc74fe2f
- Deployment tx: 0x5da96ab201ab4740ff9337a2f189d1d7155d3b18f42fe43517480bff2d99a782
- Block: 22171217
- Deployment status: PASS
- Gas used: 443565
- Actual deployment cost: 0.009758430 USDC
- On-chain runtime bytecode: 1805 bytes
- Local runtime bytecode: 1805 bytes
- Runtime hash match: PASS
- Mainnet SLH-DSA precompile verification: PASS

The prototype does not custody funds and does not transfer tokens.

## Security

Prototype only. Not audited. Do not use it to protect production assets.