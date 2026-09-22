const tx='0x5da96ab201ab4740ff9337a2f189d1d7155d3b18f42fe43517480bff2d99a782';
const rpc='https://rpc.arc-scan.org';
async function call(method,params){const r=await fetch(rpc,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',method,params,id:1})});return await r.json();}
const rc=await call('eth_getTransactionReceipt',[tx]);
console.log(JSON.stringify(rc,null,2));
if(rc.result?.contractAddress){const code=await call('eth_getCode',[rc.result.contractAddress,'latest']);console.log('CONTRACT='+rc.result.contractAddress);console.log('CODE_BYTES='+((code.result.length-2)/2));}
