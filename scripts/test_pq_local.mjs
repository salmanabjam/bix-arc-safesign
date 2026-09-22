import { slh_dsa_sha2_128s as slh } from '@noble/post-quantum/slh-dsa.js';
const msg = new TextEncoder().encode('BiX Arc SafeSign local compatibility test');
const keys = slh.keygen();
const sig = slh.sign(msg, keys.secretKey);
const ok = slh.verify(sig, msg, keys.publicKey);
console.log(JSON.stringify({
  scheme:'SLH-DSA-SHA2-128s',
  publicKeyBytes:keys.publicKey.length,
  secretKeyBytes:keys.secretKey.length,
  signatureBytes:sig.length,
  localVerify:ok
}, null, 2));
if(!ok) process.exit(2);
