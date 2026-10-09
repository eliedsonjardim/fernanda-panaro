const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const code = fs.readFileSync('guiadosofa/meta-pixel.js', 'utf8');
function run(hostname, pathname) {
  const handlers=[], scripts=[];
  const window={location:{hostname,pathname}};
  const document={head:{appendChild:s=>scripts.push(s)},createElement:()=>({}),querySelectorAll:()=>Array.from({length:5},()=>({addEventListener:(name,fn,capture)=>handlers.push({name,fn,capture})}))};
  const context=vm.createContext({window,document});
  vm.runInContext(code,context);
  return {window,handlers,scripts,context};
}
for (const [host,path] of [['localhost','/guiadosofa/'],['127.0.0.1','/v3/guiadosofa/'],['fernandapanaro.com.br','/'],['fernandapanaro.com.br','/consultoria-online/'],['fernandapanaro.com.br','/revisao/']]) {
  assert.equal(run(host,path).scripts.length,0);
}
const r=run('fernandapanaro.com.br','/guiadosofa/');
assert.equal(r.scripts.length,1);
assert.equal(r.scripts[0].async,true);
let queue=()=>Array.from(r.window.fbq.queue,a=>Array.from(a));
assert.deepEqual(queue().map(a=>a.slice(0,3)),[['init','1456076653085395'],['trackSingle','1456076653085395','PageView'],['trackSingle','1456076653085395','ViewContent']]);
assert.equal(queue()[2][3].currency,'BRL'); assert.equal(queue()[2][3].value,47);
assert.equal(queue()[2][3].content_ids[0],'190039');
vm.runInContext(code,r.context); assert.equal(r.scripts.length,1); assert.equal(queue().length,3);
r.handlers.forEach(h=>{assert.equal(h.capture,true);h.fn();});
assert.equal(queue().filter(a=>a[2]==='ClickCheckout').length,5);
assert.equal(queue().filter(a=>['Purchase','InitiateCheckout','AddToCart'].includes(a[2])).length,0);
r.window.fbq=()=>{throw Error('blocked')}; assert.doesNotThrow(()=>r.handlers[0].fn());
console.log('PASS: production scope, single initialization, five CTA intents, product/value, no false Purchase/checkout, blocked tracking does not block click.');
