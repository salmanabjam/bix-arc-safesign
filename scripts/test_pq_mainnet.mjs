import { slh_dsa_sha2_128s as slh } from '@noble/post-quantum/slh-dsa.js';
import { createPublicClient, http, encodeFunctionData, parseAbi } from 'viem';

const RPC = 'https://rpc.mainnet.arc.io';
const PQ = '0x1800000000000000000000000000000000000004';
const abi = parseAbi(['function verifySlhDsaSha2128s(bytes vk, bytes msg, bytes sig) external view returns (bool)']);
const hex = b => '0x'+Buffer.from(b).toString('hex');

const keys = slh.keygen();
const msg = new TextEncoder().encode('BiX Arc SafeSign mainnet compatibility test');
const sig = slh.sign(msg, keys.secretKey);
const local = slh.verify(sig, msg, keys.publicKey);

const client = createPublicClient({ transport: http(RPC) });
const chainId = await client.getChainId();
const data = encodeFunctionData({ abi, functionName:'verifySlhDsaSha2128s', args:[hex(keys.publicKey),hex(msg),hex(sig)] });
const result = await client.call({ to:PQ, data });
const ok = result.data === '0x'+''.padStart(63,'0')+'1';

console.log(JSON.stringify({
  chainId,
  precompile:PQ,
  scheme:'SLH-DSA-SHA2-128s',
  publicKeyBytes:keys.publicKey.length,
  signatureBytes:sig.length,
  localVerify:local,
  arcMainnetVerify:ok,
  readOnly:true
}, null, 2));
if (!local || !ok || chainId !== 5042) process.exit(2);
