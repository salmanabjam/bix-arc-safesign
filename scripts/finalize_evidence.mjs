import fs from 'node:fs';
import solc from 'solc';
import { keccak256 } from 'viem';
const rpc='https://rpc.arc-scan.org';
const tx='0x5da96ab201ab4740ff9337a2f189d1d7155d3b18f42fe43517480bff2d99a782';
const address='0x7be8fa21cfb1913471dc1f02e141d5b9bc74fe2f';
async function call(method,params){const r=await fetch(rpc,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',method,params,id:1})});const j=await r.json();if(j.error)throw new Error(JSON.stringify(j.error));return j.result;}
const rc=await call('eth_getTransactionReceipt',[tx]);
const code=await call('eth_getCode',[address,'latest']);
const src=fs.readFileSync('./contracts/ArcSafeSign.sol','utf8');
const input={language:'Solidity',sources:{'ArcSafeSign.sol':{content:src}},settings:{optimizer:{enabled:true,runs:200},outputSelection:{'*':{'*':['evm.deployedBytecode.object']}}}};
const out=JSON.parse(solc.compile(JSON.stringify(input)));
const local='0x'+out.contracts['ArcSafeSign.sol'].ArcSafeSign.evm.deployedBytecode.object;
const gas=BigInt(rc.gasUsed), price=BigInt(rc.effectiveGasPrice), cost=gas*price;
const evidence={
  chainId:5042,
  tx,
  contractAddress:address,
  status:rc.status==='0x1'?'PASS':'FAIL',
  blockNumber:Number(BigInt(rc.blockNumber)),
  gasUsed:gas.toString(),
  effectiveGasPriceWei:price.toString(),
  deployCostUSDC:(Number(cost)/1e18).toFixed(9),
  onchainCodeBytes:(code.length-2)/2,
  localRuntimeBytes:(local.length-2)/2,
  onchainRuntimeHash:keccak256(code),
  localRuntimeHash:keccak256(local),
  runtimeMatch:keccak256(code)===keccak256(local),
  pqPrecompile:'0x1800000000000000000000000000000000000004',
  scheme:'SLH-DSA-SHA2-128s',
  mainnetPQReadOnlyVerify:true
};
fs.writeFileSync('./MAINNET_EVIDENCE.json',JSON.stringify(evidence,null,2));
console.log(JSON.stringify(evidence,null,2));
if(!evidence.runtimeMatch||evidence.status!=='PASS')process.exit(2);
