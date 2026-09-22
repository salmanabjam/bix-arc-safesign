import fs from 'node:fs';
import solc from 'solc';
const src=fs.readFileSync(new URL('../contracts/ArcSafeSign.sol',import.meta.url),'utf8');
const input={language:'Solidity',sources:{'ArcSafeSign.sol':{content:src}},settings:{optimizer:{enabled:true,runs:200},outputSelection:{'*':{'*':['abi','evm.bytecode.object']}}}};
const out=JSON.parse(solc.compile(JSON.stringify(input)));
if(out.errors){for(const e of out.errors) console.error(e.formattedMessage); if(out.errors.some(e=>e.severity==='error')) process.exit(2);}
const c=out.contracts['ArcSafeSign.sol'].ArcSafeSign;
fs.mkdirSync(new URL('../artifacts/',import.meta.url),{recursive:true});
fs.writeFileSync(new URL('../artifacts/ArcSafeSign.json',import.meta.url),JSON.stringify({abi:c.abi,bytecode:'0x'+c.evm.bytecode.object},null,2));
console.log('COMPILE_PASS bytecode_bytes='+c.evm.bytecode.object.length/2);
