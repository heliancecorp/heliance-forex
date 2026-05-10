// ═══════════════════════════════════════════════════════════════
// Heliance Price Engine — prices.js
// NO API — hardcoded real-world base prices (PHP)
// Fictional pump/dump simulation. Max 3 losers at any time.
// ═══════════════════════════════════════════════════════════════

export const INSTR = [
  // ── METALS ──
  { id:'gold',   badge:'XAU',  name:'Gold',        sym:'XAU/PHP',  base:9106.63,  vol:0.008, tag:'🔥 Hot'      },
  { id:'silver', badge:'XAG',  name:'Silver',       sym:'XAG/PHP',  base:5417.80,    vol:0.012, tag:null          },
  { id:'xpt',    badge:'XPT',  name:'Platinum',     sym:'XPT/PHP',  base:152744.30,  vol:0.010, tag:'💎 Exclusive' },
  // ── INDICES ──
  { id:'sp500',  badge:'SPX',  name:'S&P 500',      sym:'SPX/PHP',  base:447487.29,  vol:0.006, tag:'🔥 Hot'      },
  { id:'nas100', badge:'NAS',  name:'NASDAQ 100',   sym:'NAS/PHP',  base:1768132.20, vol:0.009, tag:null          },
  { id:'dow',    badge:'DJI',  name:'Dow Jones',    sym:'DJIA/PHP', base:49609.16, vol:0.005, tag:null          },
  // ── CRYPTO ──
  { id:'btc',    badge:'BTC',  name:'Bitcoin',      sym:'BTC/PHP',  base:4882964.08, vol:0.020, tag:'⚡ Trending'  },
  { id:'eth',    badge:'ETH',  name:'Ethereum',     sym:'ETH/PHP',  base:140816.79,  vol:0.025, tag:'⚡ Trending'  },
  { id:'sol',    badge:'SOL',  name:'Solana',       sym:'SOL/PHP',  base:5645.20,    vol:0.035, tag:null          },
  { id:'xrp',    badge:'XRP',  name:'Ripple',       sym:'XRP/PHP',  base:84.07,  vol:0.040, tag:null          },
  { id:'bnb',    badge:'BNB',  name:'Binance Coin', sym:'BNB/PHP',  base:39371.88,   vol:0.025, tag:null          },
  { id:'ada',    badge:'ADA',  name:'Cardano',      sym:'ADA/PHP',  base:16.68,   vol:0.045, tag:null          },
  // ── COMMODITIES ──
  { id:'oil',    badge:'WTI',  name:'Crude Oil',    sym:'WTI/PHP',  base:4536,    vol:0.015, tag:null          },
  // ── FOREX ──
  { id:'eurusd', badge:'EUR',  name:'EUR / PHP',    sym:'EUR/PHP',  base:71.27,   vol:0.004, tag:null          },
  { id:'gbpusd', badge:'GBP',  name:'GBP / PHP',   sym:'GBP/PHP',  base:82.45,   vol:0.005, tag:null          },
  { id:'usphp',  badge:'PHP',  name:'USD / PHP',    sym:'USD/PHP',  base:62,   vol:0.003, tag:null          },
  // ── STOCKS ──
  { id:'aapl',   badge:'AAPL', name:'Apple',        sym:'AAPL/PHP', base:17736.36,   vol:0.011, tag:'💎 Exclusive' },
  { id:'tsla',   badge:'TSLA', name:'Tesla',        sym:'TSLA/PHP', base:25906.61,   vol:0.025, tag:'🔥 Hot'      },
  { id:'nvda',   badge:'NVDA', name:'Nvidia',       sym:'NVDA/PHP', base:13016.51 ,   vol:0.030, tag:'⚡ Trending'  },
  { id:'amd',    badge:'AMD',  name:'AMD',          sym:'AMD/PHP',  base:27529.89,    vol:0.035, tag:null          },
  { id:'msft',   badge:'MSFT', name:'Microsoft',    sym:'MSFT/PHP', base:25102.83,   vol:0.010, tag:null          },
  { id:'amzn',   badge:'AMZN', name:'Amazon',       sym:'AMZN/PHP', base:16491.69,   vol:0.015, tag:null          },
  { id:'googl',  badge:'GOOG', name:'Alphabet',     sym:'GOOGL/PHP',base:24013.58,    vol:0.015, tag:null          },
  { id:'meta',   badge:'META', name:'Meta',         sym:'META/PHP', base:36870.42,   vol:0.020, tag:'⚡ Trending'  },
  { id:'nflx',   badge:'NFLX', name:'Netflix',      sym:'NFLX/PHP', base:5290.79,   vol:0.025, tag:null          },
];

// ── FIXED: ITEM-SPECIFIC MARKET TIERS ──
export const MARKET_TIERS = {
  // Cap 1000 | Mult 2x | Min ₱500
  'xrp': { cap: 1000, mult: 2, min: 500 },
  'gbpusd': { cap: 1000, mult: 2, min: 500 },
  'eurusd': { cap: 1000, mult: 2, min: 500 },
  'ada': { cap: 1000, mult: 2, min: 500 },
  'gold': { cap: 1000, mult: 2, min: 500 },
  'bnb': { cap: 1000, mult: 2, min: 500 },
  'googl': { cap: 1000, mult: 2, min: 500 },

  // Cap 800 | Mult 2.5x | Min ₱1,000
  'silver': { cap: 800, mult: 2.5, min: 1000 },
  'usphp': { cap: 800, mult: 2.5, min: 1000 },

  // Cap 600 | Mult 3x | Min ₱1,500
  'oil': { cap: 600, mult: 3, min: 1500 },
  'xpt': { cap: 600, mult: 3, min: 1500 },

  // Cap 400 | Mult 3.5x | Min ₱3,000
  'sol': { cap: 400, mult: 3.5, min: 3000 },
  'amd': { cap: 400, mult: 3.5, min: 3000 },

  // Cap 200 | Mult 4x | Min ₱6,000
  'dow': { cap: 200, mult: 4, min: 6000 },
  'nflx': { cap: 200, mult: 4, min: 6000 },
  'amzn': { cap: 200, mult: 4, min: 6000 },

  // Cap 100 | Mult 4.5x | Min ₱12,000
  'sp500': { cap: 100, mult: 4.5, min: 12000 },
  'nas100': { cap: 100, mult: 4.5, min: 12000 },
  'meta': { cap: 100, mult: 4.5, min: 12000 },

  // Cap 50 | Mult 5x | Min ₱20,000
  'eth': { cap: 50, mult: 5, min: 20000 },
  'aapl': { cap: 50, mult: 5, min: 20000 },
  'tsla': { cap: 50, mult: 5, min: 20000 },
  'msft': { cap: 50, mult: 5, min: 20000 },

  // Cap 20 | Mult 10x | Min ₱50,000
  'btc': { cap: 20, mult: 10, min: 50000 },
  'nvda': { cap: 20, mult: 10, min: 50000 }
};

export let prices  = {};
export let changes = {};
export let volume  = {};
export let hist    = {};
export const phpRate = 57.5;

let openPrice = {};
let onTickCb  = null;
const pumpState = {};
let losers = new Set();

INSTR.forEach(i => {
  prices[i.id]   = i.base;
  changes[i.id]  = 0;
  openPrice[i.id]= i.base;
  volume[i.id]   = Math.floor(Math.random() * 60000 + 15000);
  hist[i.id]     = _seedHist(i.base, i.vol, 80);
  pumpState[i.id]= { dir:1, steps:0, maxSteps:_ri(10,28), str:Math.random()*0.5+0.2 };
});

function _pickLosers() {
  const ids = INSTR.map(i=>i.id);
  losers = new Set(ids.sort(()=>Math.random()-0.5).slice(0,3));
}
_pickLosers();

function _seedHist(base, vol, n) {
  let v = base * (1 - Math.random()*0.02);
  return Array.from({length:n}, () => {
    v += v * (Math.random()-0.47) * vol * 0.7;
    v  = Math.max(v, base*0.82);
    return +v.toFixed(4);
  });
}
function _ri(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

export function onTick(cb){ onTickCb = cb; }

export function registerInstrument(inst) {
  const id = inst.id;
  if(prices[id] !== undefined) return;
  prices[id]    = inst.base || 1000;
  changes[id]   = (Math.random()-0.5)*3;
  volume[id]    = Math.floor(Math.random()*50000+10000);
  hist[id]      = _seedHist(inst.base||1000, inst.vol||0.015, 80);
  openPrice[id] = inst.base || 1000;
  pumpState[id] = { dir:1, steps:0, maxSteps:_ri(10,28), str:Math.random()*0.5+0.2 };
}

export function fmtPHP(id, v) {
  v = Number(v||0);
  if(id==='usphp') return '₱'+v.toFixed(4);
  if(id==='eurusd'||id==='gbpusd'){
    return v>=1000 ? '₱'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}) : '₱'+v.toFixed(2);
  }
  if(v>=1000000) return '₱'+(v/1e6).toFixed(2)+'M';
  if(v>=1000)    return '₱'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  return '₱'+v.toFixed(2);
}
export function fmtShort(v){
  v=Number(v||0);
  if(v>=1000000) return '₱'+(v/1e6).toFixed(1)+'M';
  if(v>=1000)    return '₱'+v.toLocaleString('en-US',{maximumFractionDigits:0});
  return '₱'+v.toFixed(0);
}
export function fmtVol(id){
  const v=volume[id]||0;
  if(v>=1000000) return (v/1e6).toFixed(2)+'M';
  if(v>=1000)    return (v/1000).toFixed(1)+'K';
  return String(v);
}

function simulateTick() {
  if(Math.random() < 0.05) _pickLosers();
  INSTR.forEach(inst => {
    const id  = inst.id;
    const ps  = pumpState[id];
    if(!ps) return;
    const cur = prices[id];
    const isLoser = losers.has(id);
    ps.steps++;
    if(ps.steps >= ps.maxSteps) {
      ps.dir = isLoser ? -1 : -ps.dir;
      ps.steps = 0; ps.maxSteps = _ri(8,30); ps.str = Math.random()*0.6+0.15;
    }
    const pumpMag   = inst.vol * 0.5 * ps.dir * ps.str * (1 - ps.steps/ps.maxSteps);
    const noise     = (Math.random()-0.5) * inst.vol * 1.0;
    const loserBias = isLoser ? -inst.vol*0.3 : inst.vol*0.08;
    const delta     = cur * (pumpMag + noise + loserBias) * 0.010;
    let next = cur + delta;
    const open = openPrice[id];
    next = Math.max(next, open*(isLoser?0.94:0.92));
    next = Math.min(next, open*1.08);
    prices[id]  = +next.toFixed(4);
    changes[id] = open ? ((next-open)/open)*100 : 0;
    hist[id].push(+next.toFixed(4));
    if(hist[id].length > 120) hist[id].shift();
    const absMov = Math.abs(delta/cur);
    volume[id] = Math.floor(volume[id]*0.95 + absMov*6000000 + Math.random()*2000);
    if(onTickCb) onTickCb(id);
  });
}

export async function initPrices(onReady) {
  if(onReady) onReady();
  setInterval(simulateTick, 2000);
}