# Arc Microgrant Submission — BiX Arc SafeSign

## Project name
BiX Arc SafeSign

## One-line pitch
A tiny Arc-native security primitive that requires both a normal wallet transaction and a post-quantum SLH-DSA approval before a protected action is accepted.

## Short description
Arc SafeSign turns Arc Mainnet's native post-quantum signature verifier into an application-layer approval pattern. A user registers a post-quantum public-key hash, signs a protected action locally with SLH-DSA-SHA2-128s, and submits the action from their normal EVM wallet. The contract accepts the approval only when the wallet identity and the independent post-quantum signature both match.

The prototype is intentionally small: no custody, no token transfer, no backend, and no trusted signer service.

## Why Arc
Arc is essential to the project because the prototype uses Arc's native post-quantum verifier at:
0x1800000000000000000000000000000000000004

The SLH-DSA signature path was verified live on Arc Mainnet before deployment.

## Mainnet proof
Contract:
https://explorer.arc.io/address/0x7be8fa21cfb1913471dc1f02e141d5b9bc74fe2f

Deployment transaction:
https://explorer.arc.io/tx/0x5da96ab201ab4740ff9337a2f189d1d7155d3b18f42fe43517480bff2d99a782

Block: 22171217
Gas used: 443565
Deployment cost: 0.009758430 USDC
On-chain runtime bytecode matches the local compiled runtime exactly.

## Live demo
https://salmanabjam.github.io/bix-arc-safesign/

## Public repository
https://github.com/salmanabjam/bix-arc-safesign

## Builder profile
https://github.com/salmanabjam

## What makes it worth continuing
The same primitive can later protect high-value wallet, treasury, recovery, or autonomous-agent actions without replacing the user's normal wallet. The microgrant prototype proves the smallest useful version first.

## Current status
- Local SLH-DSA key generation/sign/verify: PASS
- Arc Mainnet SLH-DSA verifier compatibility: PASS
- Solidity compile: PASS
- Arc Mainnet deployment: PASS
- Runtime bytecode match: PASS
- Public repo: PASS
- Live demo: PASS

## Funding history
This distinct project has not received Circle or Arc grant funding.

## Prior Arc deployment before this project
No.
