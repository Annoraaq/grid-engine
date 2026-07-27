var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// speedtests/run.ts
var run_exports = {};
module.exports = __toCommonJS(run_exports);

// speedtests/tests/BfsSpeed.ts
var BfsSpeed = {
  name: "Bfs Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    gridEngine.findShortestPath(
      {
        position: { x: startX, y: startY },
        charLayer: void 0
      },
      {
        position: { x: endX, y: endY },
        charLayer: void 0
      },
      {
        shortestPathAlgorithm: "BFS"
      }
    );
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.05
    };
  }
};

// speedtests/tests/BidirSpeed.ts
var BidirSpeed = {
  name: "Bidir Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    gridEngine.findShortestPath(
      {
        position: { x: startX, y: startY },
        charLayer: void 0
      },
      {
        position: { x: endX, y: endY },
        charLayer: void 0
      },
      {
        shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH"
      }
    );
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.1
    };
  }
};

// speedtests/tests/AStarSpeed.ts
var AStarSpeed = {
  name: "AStar Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    gridEngine.findShortestPath(
      {
        position: { x: startX, y: startY },
        charLayer: void 0
      },
      {
        position: { x: endX, y: endY },
        charLayer: void 0
      },
      {
        shortestPathAlgorithm: "A_STAR"
      }
    );
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.1
    };
  }
};

// speedtests/tests/Jps4Speed.ts
var Jps4Speed = {
  name: "JPS4 Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    gridEngine.findShortestPath(
      {
        position: { x: startX, y: startY },
        charLayer: void 0
      },
      {
        position: { x: endX, y: endY },
        charLayer: void 0
      },
      {
        shortestPathAlgorithm: "JPS",
        numberOfDirections: 4
      }
    );
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.1
    };
  }
};

// speedtests/tests/Jps8Speed.ts
var Jps8Speed = {
  name: "JPS8 Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    gridEngine.findShortestPath(
      {
        position: { x: startX, y: startY },
        charLayer: void 0
      },
      {
        position: { x: endX, y: endY },
        charLayer: void 0
      },
      {
        shortestPathAlgorithm: "JPS",
        numberOfDirections: 8
      }
    );
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.1
    };
  }
};

// speedtests/phaser-node-shim.js
var Tilemaps = {};

// dist/GridEngine.esm.min.js
var Sb = Object.create;
var oa = Object.defineProperty;
var Ob = Object.defineProperties;
var Eb = Object.getOwnPropertyDescriptor;
var Db = Object.getOwnPropertyDescriptors;
var Ib = Object.getOwnPropertyNames;
var yl = Object.getOwnPropertySymbols;
var Mb = Object.getPrototypeOf;
var bl = Object.prototype.hasOwnProperty;
var Ab = Object.prototype.propertyIsEnumerable;
var vl = (a3, e, r) => e in a3 ? oa(a3, e, { enumerable: true, configurable: true, writable: true, value: r }) : a3[e] = r;
var q = (a3, e) => {
  for (var r in e || (e = {})) bl.call(e, r) && vl(a3, r, e[r]);
  if (yl) for (var r of yl(e)) Ab.call(e, r) && vl(a3, r, e[r]);
  return a3;
};
var Lt = (a3, e) => Ob(a3, Db(e));
var ve = (a3, e) => () => (e || a3((e = { exports: {} }).exports, e), e.exports);
var Rb = (a3, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of Ib(e)) !bl.call(a3, s) && s !== r && oa(a3, s, { get: () => e[s], enumerable: !(o = Eb(e, s)) || o.enumerable });
  return a3;
};
var Fo = (a3, e, r) => (r = a3 != null ? Sb(Mb(a3)) : {}, Rb(e || !a3 || !a3.__esModule ? oa(r, "default", { value: a3, enumerable: true }) : r, a3));
var da = ve((Oi) => {
  var tT = function(a3, e) {
    return a3 < e ? -1 : a3 > e ? 1 : 0;
  }, eT = function(a3, e) {
    return a3 < e ? 1 : a3 > e ? -1 : 0;
  };
  function rT(a3) {
    return function(e, r) {
      return a3(r, e);
    };
  }
  function iT(a3) {
    return a3 === 2 ? function(e, r) {
      return e[0] < r[0] ? -1 : e[0] > r[0] ? 1 : e[1] < r[1] ? -1 : e[1] > r[1] ? 1 : 0;
    } : function(e, r) {
      for (var o = 0; o < a3; ) {
        if (e[o] < r[o]) return -1;
        if (e[o] > r[o]) return 1;
        o++;
      }
      return 0;
    };
  }
  Oi.DEFAULT_COMPARATOR = tT;
  Oi.DEFAULT_REVERSE_COMPARATOR = eT;
  Oi.reverseComparator = rT;
  Oi.createTupleComparator = iT;
});
var Wl = ve((ga2) => {
  ga2.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer != "undefined";
  ga2.SYMBOL_SUPPORT = typeof Symbol != "undefined";
});
var Ei = ve((VC, $l) => {
  var zl = Wl(), oT = zl.ARRAY_BUFFER_SUPPORT, nT = zl.SYMBOL_SUPPORT;
  $l.exports = function(e, r) {
    var o, s, u, h, f;
    if (!e) throw new Error("obliterator/forEach: invalid iterable.");
    if (typeof r != "function") throw new Error("obliterator/forEach: expecting a callback.");
    if (Array.isArray(e) || oT && ArrayBuffer.isView(e) || typeof e == "string" || e.toString() === "[object Arguments]") {
      for (u = 0, h = e.length; u < h; u++) r(e[u], u);
      return;
    }
    if (typeof e.forEach == "function") {
      e.forEach(r);
      return;
    }
    if (nT && Symbol.iterator in e && typeof e.next != "function" && (e = e[Symbol.iterator]()), typeof e.next == "function") {
      for (o = e, u = 0; f = o.next(), f.done !== true; ) r(f.value, u), u++;
      return;
    }
    for (s in e) e.hasOwnProperty(s) && r(e[s], s);
  };
});
var th = ve((NC, Zl) => {
  var ql = da(), Yl = Ei(), Xl = ql.DEFAULT_COMPARATOR, sT = ql.reverseComparator;
  function It(a3) {
    if (this.clear(), this.comparator = a3 || Xl, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
  }
  It.prototype.clear = function() {
    this.root = null, this.min = null, this.size = 0;
  };
  function aT(a3) {
    return { item: a3, degree: 0 };
  }
  function Ql(a3, e) {
    a3.root ? (e.right = a3.root.right, e.left = a3.root, a3.root.right.left = e, a3.root.right = e) : a3.root = e;
  }
  It.prototype.push = function(a3) {
    var e = aT(a3);
    return e.left = e, e.right = e, Ql(this, e), (!this.min || this.comparator(e.item, this.min.item) <= 0) && (this.min = e), ++this.size;
  };
  It.prototype.peek = function() {
    return this.min ? this.min.item : void 0;
  };
  function Kl(a3) {
    for (var e = [], r = a3, o = false; !(r === a3 && o); ) r === a3 && (o = true), e.push(r), r = r.right;
    return e;
  }
  function Jl(a3, e) {
    a3.root === e && (a3.root = e.right), e.left.right = e.right, e.right.left = e.left;
  }
  function uT(a3, e) {
    a3.child ? (e.right = a3.child.right, e.left = a3.child, a3.child.right.left = e, a3.child.right = e) : a3.child = e;
  }
  function cT(a3, e, r) {
    Jl(a3, e), e.left = e, e.right = e, uT(r, e), r.degree++, e.parent = r;
  }
  function lT(a3) {
    var e = new Array(a3.size), r = Kl(a3.root), o, s, u, h, f, d;
    for (o = 0, s = r.length; o < s; o++) {
      for (u = r[o], f = u.degree; e[f]; ) h = e[f], a3.comparator(u.item, h.item) > 0 && (d = u, u = h, h = d), cT(a3, h, u), e[f] = null, f++;
      e[f] = u;
    }
    for (o = 0; o < a3.size; o++) e[o] && a3.comparator(e[o].item, a3.min.item) <= 0 && (a3.min = e[o]);
  }
  It.prototype.pop = function() {
    if (this.size) {
      var a3 = this.min;
      if (a3.child) {
        var e = Kl(a3.child), r, o, s;
        for (o = 0, s = e.length; o < s; o++) r = e[o], Ql(this, r), delete r.parent;
      }
      return Jl(this, a3), a3 === a3.right ? (this.min = null, this.root = null) : (this.min = a3.right, lT(this)), this.size--, a3.item;
    }
  };
  It.prototype.inspect = function() {
    var a3 = { size: this.size };
    return this.min && "item" in this.min && (a3.top = this.min.item), Object.defineProperty(a3, "constructor", { value: It, enumerable: false }), a3;
  };
  typeof Symbol != "undefined" && (It.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = It.prototype.inspect);
  function mn2(a3) {
    if (this.clear(), this.comparator = a3 || Xl, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
    this.comparator = sT(this.comparator);
  }
  mn2.prototype = It.prototype;
  It.from = function(a3, e) {
    var r = new It(e);
    return Yl(a3, function(o) {
      r.push(o);
    }), r;
  };
  mn2.from = function(a3, e) {
    var r = new mn2(e);
    return Yl(a3, function(o) {
      r.push(o);
    }), r;
  };
  It.MinFibonacciHeap = It;
  It.MaxFibonacciHeap = mn2;
  Zl.exports = It;
});
var ya = ve((we) => {
  var hT = Math.pow(2, 8) - 1, fT = Math.pow(2, 16) - 1, pT = Math.pow(2, 32) - 1, mT = Math.pow(2, 7) - 1, dT = Math.pow(2, 15) - 1, gT = Math.pow(2, 31) - 1;
  we.getPointerArray = function(a3) {
    var e = a3 - 1;
    if (e <= hT) return Uint8Array;
    if (e <= fT) return Uint16Array;
    if (e <= pT) return Uint32Array;
    throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
  };
  we.getSignedPointerArray = function(a3) {
    var e = a3 - 1;
    return e <= mT ? Int8Array : e <= dT ? Int16Array : e <= gT ? Int32Array : Float64Array;
  };
  we.getNumberType = function(a3) {
    return a3 === (a3 | 0) ? Math.sign(a3) === -1 ? a3 <= 127 && a3 >= -128 ? Int8Array : a3 <= 32767 && a3 >= -32768 ? Int16Array : Int32Array : a3 <= 255 ? Uint8Array : a3 <= 65535 ? Uint16Array : Uint32Array : Float64Array;
  };
  var yT = { Uint8Array: 1, Int8Array: 2, Uint16Array: 3, Int16Array: 4, Uint32Array: 5, Int32Array: 6, Float32Array: 7, Float64Array: 8 };
  we.getMinimalRepresentation = function(a3, e) {
    var r = null, o = 0, s, u, h, f, d;
    for (f = 0, d = a3.length; f < d; f++) h = e ? e(a3[f]) : a3[f], u = we.getNumberType(h), s = yT[u.name], s > o && (o = s, r = u);
    return r;
  };
  we.isTypedArray = function(a3) {
    return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView(a3);
  };
  we.concat = function() {
    var a3 = 0, e, r, o;
    for (e = 0, o = arguments.length; e < o; e++) a3 += arguments[e].length;
    var s = new arguments[0].constructor(a3);
    for (e = 0, r = 0; e < o; e++) s.set(arguments[e], r), r += arguments[e].length;
    return s;
  };
  we.indices = function(a3) {
    for (var e = we.getPointerArray(a3), r = new e(a3), o = 0; o < a3; o++) r[o] = o;
    return r;
  };
});
var ba = ve((Di) => {
  var eh = Ei(), rh = ya();
  function vT(a3) {
    return Array.isArray(a3) || rh.isTypedArray(a3);
  }
  function va2(a3) {
    if (typeof a3.length == "number") return a3.length;
    if (typeof a3.size == "number") return a3.size;
  }
  function bT(a3) {
    var e = va2(a3), r = typeof e == "number" ? new Array(e) : [], o = 0;
    return eh(a3, function(s) {
      r[o++] = s;
    }), r;
  }
  function TT(a3) {
    var e = va2(a3), r = typeof e == "number" ? rh.getPointerArray(e) : Array, o = typeof e == "number" ? new Array(e) : [], s = typeof e == "number" ? new r(e) : [], u = 0;
    return eh(a3, function(h) {
      o[u] = h, s[u] = u++;
    }), [o, s];
  }
  Di.isArrayLike = vT;
  Di.guessLength = va2;
  Di.toArray = bT;
  Di.toArrayWithIndices = TT;
});
var ah = ve((UC, sh) => {
  var dn2 = Ei(), ih = da(), Ce = ba(), yn2 = ih.DEFAULT_COMPARATOR, Ta2 = ih.reverseComparator;
  function Pa2(a3, e, r, o) {
    for (var s = e[o], u, h; o > r; ) {
      if (u = o - 1 >> 1, h = e[u], a3(s, h) < 0) {
        e[o] = h, o = u;
        continue;
      }
      break;
    }
    e[o] = s;
  }
  function Ii(a3, e, r) {
    for (var o = e.length, s = r, u = e[r], h = 2 * r + 1, f; h < o; ) f = h + 1, f < o && a3(e[h], e[f]) >= 0 && (h = f), e[r] = e[h], r = h, h = 2 * r + 1;
    e[r] = u, Pa2(a3, e, s, r);
  }
  function oh(a3, e, r) {
    e.push(r), Pa2(a3, e, 0, e.length - 1);
  }
  function xa2(a3, e) {
    var r = e.pop();
    if (e.length !== 0) {
      var o = e[0];
      return e[0] = r, Ii(a3, e, 0), o;
    }
    return r;
  }
  function Wr(a3, e, r) {
    if (e.length === 0) throw new Error("mnemonist/heap.replace: cannot pop an empty heap.");
    var o = e[0];
    return e[0] = r, Ii(a3, e, 0), o;
  }
  function nh(a3, e, r) {
    var o;
    return e.length !== 0 && a3(e[0], r) < 0 && (o = e[0], e[0] = r, r = o, Ii(a3, e, 0)), r;
  }
  function br(a3, e) {
    for (var r = e.length, o = r >> 1, s = o; --s >= 0; ) Ii(a3, e, s);
  }
  function wa2(a3, e) {
    for (var r = e.length, o = 0, s = new Array(r); o < r; ) s[o++] = xa2(a3, e);
    return s;
  }
  function PT(a3, e, r) {
    arguments.length === 2 && (r = e, e = a3, a3 = yn2);
    var o = Ta2(a3), s, u, h, f = 1 / 0, d;
    if (e === 1) {
      if (Ce.isArrayLike(r)) {
        for (s = 0, u = r.length; s < u; s++) h = r[s], (f === 1 / 0 || a3(h, f) < 0) && (f = h);
        return d = new r.constructor(1), d[0] = f, d;
      }
      return dn2(r, function(L2) {
        (f === 1 / 0 || a3(L2, f) < 0) && (f = L2);
      }), [f];
    }
    if (Ce.isArrayLike(r)) {
      if (e >= r.length) return r.slice().sort(a3);
      for (d = r.slice(0, e), br(o, d), s = e, u = r.length; s < u; s++) o(r[s], d[0]) > 0 && Wr(o, d, r[s]);
      return d.sort(a3);
    }
    var P2 = Ce.guessLength(r);
    return P2 !== null && P2 < e && (e = P2), d = new Array(e), s = 0, dn2(r, function(L2) {
      s < e ? d[s] = L2 : (s === e && br(o, d), o(L2, d[0]) > 0 && Wr(o, d, L2)), s++;
    }), d.length > s && (d.length = s), d.sort(a3);
  }
  function xT(a3, e, r) {
    arguments.length === 2 && (r = e, e = a3, a3 = yn2);
    var o = Ta2(a3), s, u, h, f = -1 / 0, d;
    if (e === 1) {
      if (Ce.isArrayLike(r)) {
        for (s = 0, u = r.length; s < u; s++) h = r[s], (f === -1 / 0 || a3(h, f) > 0) && (f = h);
        return d = new r.constructor(1), d[0] = f, d;
      }
      return dn2(r, function(L2) {
        (f === -1 / 0 || a3(L2, f) > 0) && (f = L2);
      }), [f];
    }
    if (Ce.isArrayLike(r)) {
      if (e >= r.length) return r.slice().sort(o);
      for (d = r.slice(0, e), br(a3, d), s = e, u = r.length; s < u; s++) a3(r[s], d[0]) > 0 && Wr(a3, d, r[s]);
      return d.sort(o);
    }
    var P2 = Ce.guessLength(r);
    return P2 !== null && P2 < e && (e = P2), d = new Array(e), s = 0, dn2(r, function(L2) {
      s < e ? d[s] = L2 : (s === e && br(a3, d), a3(L2, d[0]) > 0 && Wr(a3, d, L2)), s++;
    }), d.length > s && (d.length = s), d.sort(o);
  }
  function rt(a3) {
    if (this.clear(), this.comparator = a3 || yn2, typeof this.comparator != "function") throw new Error("mnemonist/Heap.constructor: given comparator should be a function.");
  }
  rt.prototype.clear = function() {
    this.items = [], this.size = 0;
  };
  rt.prototype.push = function(a3) {
    return oh(this.comparator, this.items, a3), ++this.size;
  };
  rt.prototype.peek = function() {
    return this.items[0];
  };
  rt.prototype.pop = function() {
    return this.size !== 0 && this.size--, xa2(this.comparator, this.items);
  };
  rt.prototype.replace = function(a3) {
    return Wr(this.comparator, this.items, a3);
  };
  rt.prototype.pushpop = function(a3) {
    return nh(this.comparator, this.items, a3);
  };
  rt.prototype.consume = function() {
    return this.size = 0, wa2(this.comparator, this.items);
  };
  rt.prototype.toArray = function() {
    return wa2(this.comparator, this.items.slice());
  };
  rt.prototype.inspect = function() {
    var a3 = this.toArray();
    return Object.defineProperty(a3, "constructor", { value: rt, enumerable: false }), a3;
  };
  typeof Symbol != "undefined" && (rt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = rt.prototype.inspect);
  function gn2(a3) {
    if (this.clear(), this.comparator = a3 || yn2, typeof this.comparator != "function") throw new Error("mnemonist/MaxHeap.constructor: given comparator should be a function.");
    this.comparator = Ta2(this.comparator);
  }
  gn2.prototype = rt.prototype;
  rt.from = function(a3, e) {
    var r = new rt(e), o;
    return Ce.isArrayLike(a3) ? o = a3.slice() : o = Ce.toArray(a3), br(r.comparator, o), r.items = o, r.size = o.length, r;
  };
  gn2.from = function(a3, e) {
    var r = new gn2(e), o;
    return Ce.isArrayLike(a3) ? o = a3.slice() : o = Ce.toArray(a3), br(r.comparator, o), r.items = o, r.size = o.length, r;
  };
  rt.siftUp = Ii;
  rt.siftDown = Pa2;
  rt.push = oh;
  rt.pop = xa2;
  rt.replace = Wr;
  rt.pushpop = nh;
  rt.heapify = br;
  rt.consume = wa2;
  rt.nsmallest = PT;
  rt.nlargest = xT;
  rt.MinHeap = rt;
  rt.MaxHeap = gn2;
  sh.exports = rt;
});
var fh = ve((BC, hh) => {
  var uh = "";
  function ch(a3, e, r) {
    for (var o = e.length, s = [], u = o, h = -1, f, d = 0, P2; u--; ) h = Math.max(a3[e[u] + r], h);
    for (P2 = h >> 24 && 32 || h >> 16 && 24 || h >> 8 && 16 || 8; d < P2; d += 4) {
      for (u = 16; u--; ) s[u] = [];
      for (u = o; u--; ) s[a3[e[u] + r] >> d & 15].push(e[u]);
      for (f = 0; f < 16; f++) for (h = s[f].length; h--; ) e[++u] = s[f][h];
    }
  }
  function wT(a3, e, r, o) {
    return a3[r] - a3[o] || (r % 3 === 2 ? a3[r + 1] - a3[o + 1] || e[r + 2] - e[o + 2] : e[r + 1] - e[o + 1]);
  }
  function Ca2(a3, e) {
    var r = [], o = [], s = 2 * e / 3 | 0, u = e - s, h = s + 1 >> 1, f = s, d = 0, P2, L2 = [], D = [];
    if (e === 1) return [0];
    for (; f--; ) r[f] = (f * 3 >> 1) + 1;
    for (f = 3; f--; ) ch(a3, r, f);
    for (d = o[(r[0] / 3 | 0) + (r[0] % 3 === 1 ? 0 : h)] = 1, f = 1; f < s; f++) (a3[r[f]] !== a3[r[f - 1]] || a3[r[f] + 1] !== a3[r[f - 1] + 1] || a3[r[f] + 2] !== a3[r[f - 1] + 2]) && d++, o[(r[f] / 3 | 0) + (r[f] % 3 === 1 ? 0 : h)] = d;
    if (d < s) for (o = Ca2(o, s), f = s; f--; ) r[f] = o[f] < h ? o[f] * 3 + 1 : (o[f] - h) * 3 + 2;
    for (f = s; f--; ) L2[r[f]] = f;
    for (L2[e] = -1, L2[e + 1] = -2, o = e % 3 === 1 ? [e - 1] : [], f = 0; f < s; f++) r[f] % 3 === 1 && o.push(r[f] - 1);
    for (ch(a3, o, 0), f = 0, d = 0, P2 = 0; f < s && d < u; ) D[P2++] = wT(a3, L2, r[f], o[d]) < 0 ? r[f++] : o[d++];
    for (; f < s; ) D[P2++] = r[f++];
    for (; d < u; ) D[P2++] = o[d++];
    return D;
  }
  function lh(a3) {
    var e = a3.length, r = e % 3, o = new Array(e + r), s, u;
    if (typeof a3 != "string") {
      var h = /* @__PURE__ */ Object.create(null);
      for (u = 0; u < e; u++) h[a3[u]] || (h[a3[u]] = true);
      var f = /* @__PURE__ */ Object.create(null), d = Object.keys(h).sort();
      for (u = 0, s = d.length; u < s; u++) f[d[u]] = u + 1;
      for (u = 0; u < e; u++) o[u] = f[a3[u]];
    } else for (u = 0; u < e; u++) o[u] = a3.charCodeAt(u);
    for (u = e; u < e + r; u++) o[u] = 0;
    return o;
  }
  function tr2(a3) {
    this.hasArbitrarySequence = typeof a3 != "string", this.string = a3, this.length = a3.length, this.array = Ca2(lh(a3), this.length);
  }
  tr2.prototype.toString = function() {
    return this.array.join(",");
  };
  tr2.prototype.toJSON = function() {
    return this.array;
  };
  tr2.prototype.inspect = function() {
    for (var a3 = new Array(this.length), e = 0; e < this.length; e++) a3[e] = this.string.slice(this.array[e]);
    return Object.defineProperty(a3, "constructor", { value: tr2, enumerable: false }), a3;
  };
  typeof Symbol != "undefined" && (tr2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = tr2.prototype.inspect);
  function er2(a3) {
    if (this.hasArbitrarySequence = typeof a3[0] != "string", this.size = a3.length, this.hasArbitrarySequence) {
      this.text = [];
      for (var e = 0, r = this.size; e < r; e++) this.text.push.apply(this.text, a3[e]), e < r - 1 && this.text.push(uh);
    } else this.text = a3.join(uh);
    this.firstLength = a3[0].length, this.length = this.text.length, this.array = Ca2(lh(this.text), this.length);
  }
  er2.prototype.longestCommonSubsequence = function() {
    var a3 = this.hasArbitrarySequence ? [] : "", e, r, o, s, u;
    for (r = 1; r < this.length; r++) if (s = this.array[r], u = this.array[r - 1], !(s < this.firstLength && u < this.firstLength) && !(s > this.firstLength && u > this.firstLength)) {
      for (e = Math.min(this.length - s, this.length - u), o = 0; o < e; o++) if (this.text[s + o] !== this.text[u + o]) {
        e = o;
        break;
      }
      e > a3.length && (a3 = this.text.slice(s, s + e));
    }
    return a3;
  };
  er2.prototype.toString = function() {
    return this.array.join(",");
  };
  er2.prototype.toJSON = function() {
    return this.array;
  };
  er2.prototype.inspect = function() {
    for (var a3 = new Array(this.length), e = 0; e < this.length; e++) a3[e] = this.text.slice(this.array[e]);
    return Object.defineProperty(a3, "constructor", { value: er2, enumerable: false }), a3;
  };
  typeof Symbol != "undefined" && (er2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = er2.prototype.inspect);
  tr2.GeneralizedSuffixArray = er2;
  hh.exports = tr2;
});
var mh = ve((HC, ph) => {
  function _e2(a3) {
    if (typeof a3 != "function") throw new Error("obliterator/iterator: expecting a function!");
    this.next = a3;
  }
  typeof Symbol != "undefined" && (_e2.prototype[Symbol.iterator] = function() {
    return this;
  });
  _e2.of = function() {
    var a3 = arguments, e = a3.length, r = 0;
    return new _e2(function() {
      return r >= e ? { done: true } : { done: false, value: a3[r++] };
    });
  };
  _e2.empty = function() {
    var a3 = new _e2(function() {
      return { done: true };
    });
    return a3;
  };
  _e2.fromSequence = function(a3) {
    var e = 0, r = a3.length;
    return new _e2(function() {
      return e >= r ? { done: true } : { done: false, value: a3[e++] };
    });
  };
  _e2.is = function(a3) {
    return a3 instanceof _e2 ? true : typeof a3 == "object" && a3 !== null && typeof a3.next == "function";
  };
  ph.exports = _e2;
});
var vh = ve((WC, yh) => {
  var dh = mh(), CT = Ei(), _T = ba(), gh = ya(), LT = function(a3) {
    return Math.max(1, Math.ceil(a3 * 1.5));
  }, ST = function(a3) {
    var e = gh.getPointerArray(a3);
    return new e(a3);
  };
  function Y(a3, e) {
    if (arguments.length < 1) throw new Error("mnemonist/vector: expecting at least a byte array constructor.");
    var r = e || 0, o = LT, s = 0, u = false;
    typeof e == "object" && (r = e.initialCapacity || 0, s = e.initialLength || 0, o = e.policy || o, u = e.factory === true), this.factory = u ? a3 : null, this.ArrayClass = a3, this.length = s, this.capacity = Math.max(s, r), this.policy = o, this.array = new a3(this.capacity);
  }
  Y.prototype.set = function(a3, e) {
    if (this.length < a3) throw new Error("Vector(" + this.ArrayClass.name + ").set: index out of bounds.");
    return this.array[a3] = e, this;
  };
  Y.prototype.get = function(a3) {
    if (!(this.length < a3)) return this.array[a3];
  };
  Y.prototype.applyPolicy = function(a3) {
    var e = this.policy(a3 || this.capacity);
    if (typeof e != "number" || e < 0) throw new Error("mnemonist/vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
    if (e <= this.capacity) throw new Error("mnemonist/vector.applyPolicy: policy returned a less or equal capacity to allocate.");
    return e;
  };
  Y.prototype.reallocate = function(a3) {
    if (a3 === this.capacity) return this;
    var e = this.array;
    if (a3 < this.length && (this.length = a3), a3 > this.capacity) if (this.factory === null ? this.array = new this.ArrayClass(a3) : this.array = this.factory(a3), gh.isTypedArray(this.array)) this.array.set(e, 0);
    else for (var r = 0, o = this.length; r < o; r++) this.array[r] = e[r];
    else this.array = e.slice(0, a3);
    return this.capacity = a3, this;
  };
  Y.prototype.grow = function(a3) {
    var e;
    if (typeof a3 == "number") {
      if (this.capacity >= a3) return this;
      for (e = this.capacity; e < a3; ) e = this.applyPolicy(e);
      return this.reallocate(e), this;
    }
    return e = this.applyPolicy(), this.reallocate(e), this;
  };
  Y.prototype.resize = function(a3) {
    return a3 === this.length ? this : a3 < this.length ? (this.length = a3, this) : (this.length = a3, this.reallocate(a3), this);
  };
  Y.prototype.push = function(a3) {
    return this.capacity === this.length && this.grow(), this.array[this.length++] = a3, this.length;
  };
  Y.prototype.pop = function() {
    if (this.length !== 0) return this.array[--this.length];
  };
  Y.prototype.values = function() {
    var a3 = this.array, e = this.length, r = 0;
    return new dh(function() {
      if (r >= e) return { done: true };
      var o = a3[r];
      return r++, { value: o, done: false };
    });
  };
  Y.prototype.entries = function() {
    var a3 = this.array, e = this.length, r = 0;
    return new dh(function() {
      if (r >= e) return { done: true };
      var o = a3[r];
      return { value: [r++, o], done: false };
    });
  };
  typeof Symbol != "undefined" && (Y.prototype[Symbol.iterator] = Y.prototype.values);
  Y.prototype.inspect = function() {
    var a3 = this.array.slice(0, this.length);
    return a3.type = this.array.constructor.name, a3.items = this.length, a3.capacity = this.capacity, Object.defineProperty(a3, "constructor", { value: Y, enumerable: false }), a3;
  };
  typeof Symbol != "undefined" && (Y.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Y.prototype.inspect);
  Y.from = function(a3, e, r) {
    if (arguments.length < 3 && (r = _T.guessLength(a3), typeof r != "number")) throw new Error("mnemonist/vector.from: could not guess iterable length. Please provide desired capacity as last argument.");
    var o = new Y(e, r);
    return CT(a3, function(s) {
      o.push(s);
    }), o;
  };
  function Le2(a3) {
    var e = function(o) {
      Y.call(this, a3, o);
    };
    for (var r in Y.prototype) Y.prototype.hasOwnProperty(r) && (e.prototype[r] = Y.prototype[r]);
    return e.from = function(o, s) {
      return Y.from(o, a3, s);
    }, typeof Symbol != "undefined" && (e.prototype[Symbol.iterator] = e.prototype.values), e;
  }
  Y.Int8Vector = Le2(Int8Array);
  Y.Uint8Vector = Le2(Uint8Array);
  Y.Uint8ClampedVector = Le2(Uint8ClampedArray);
  Y.Int16Vector = Le2(Int16Array);
  Y.Uint16Vector = Le2(Uint16Array);
  Y.Int32Vector = Le2(Int32Array);
  Y.Uint32Vector = Le2(Uint32Array);
  Y.Float32Vector = Le2(Float32Array);
  Y.Float64Vector = Le2(Float64Array);
  Y.PointerVector = Le2(ST);
  yh.exports = Y;
});
var T = class a {
  static get ZERO() {
    return new a(0, 0);
  }
  static get ONE() {
    return new a(1, 1);
  }
  static get UP() {
    return new a(0, -1);
  }
  static get DOWN() {
    return new a(0, 1);
  }
  static get LEFT() {
    return new a(-1, 0);
  }
  static get RIGHT() {
    return new a(1, 0);
  }
  static get UP_LEFT() {
    return new a(-1, -1);
  }
  static get UP_RIGHT() {
    return new a(1, -1);
  }
  static get DOWN_RIGHT() {
    return new a(1, 1);
  }
  static get DOWN_LEFT() {
    return new a(-1, 1);
  }
  constructor(e, r) {
    typeof e == "number" ? (this.x = e, this.y = r || 0) : (this.x = e.x, this.y = e.y);
  }
  clone() {
    return new a(this.x, this.y);
  }
  add(e) {
    return new a(this.x + e.x, this.y + e.y);
  }
  multiply(e) {
    return new a(this.x * e.x, this.y * e.y);
  }
  divide(e) {
    return new a(this.x / e.x, this.y / e.y);
  }
  subtract(e) {
    return new a(this.x - e.x, this.y - e.y);
  }
  equals(e) {
    return this.x === e.x && this.y === e.y;
  }
  abs() {
    return new a(Math.abs(this.x), Math.abs(this.y));
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  modulo(e) {
    return new a(this.x % e.x, this.y % e.y);
  }
  scalarModulo(e) {
    return new a(this.x % e, this.y % e);
  }
  scalarMult(e) {
    return new a(this.x * e, this.y * e);
  }
  toPosition() {
    return { x: this.x, y: this.y };
  }
  toString() {
    return `${this.x}#${this.y}`;
  }
};
var V = class {
  static equal(e, r) {
    return e.position.x === r.position.x && e.position.y === r.position.y && e.layer === r.layer;
  }
  static copyOver(e, r) {
    r.position.x = e.position.x, r.position.y = e.position.y, r.layer = e.layer;
  }
  static clone(e) {
    return { position: e.position.clone(), layer: e.layer };
  }
  static toString(e) {
    return `${e.position.toString()}#${e.layer}`;
  }
  static toInternal(e) {
    return { position: new T(e.position.x, e.position.y), layer: e.charLayer };
  }
  static fromInternal(e) {
    return { position: e.position.toPosition(), charLayer: e.layer };
  }
};
var kt = ((P2) => (P2.NONE = "none", P2.LEFT = "left", P2.UP_LEFT = "up-left", P2.UP = "up", P2.UP_RIGHT = "up-right", P2.RIGHT = "right", P2.DOWN_RIGHT = "down-right", P2.DOWN = "down", P2.DOWN_LEFT = "down-left", P2))(kt || {});
var Fb = { up: "down", down: "up", left: "right", right: "left", none: "none", "up-left": "down-right", "up-right": "down-left", "down-right": "up-left", "down-left": "up-right" };
var kb = { up: T.UP, down: T.DOWN, left: T.LEFT, right: T.RIGHT, none: T.ZERO, "up-left": T.UP_LEFT, "up-right": T.UP_RIGHT, "down-right": T.DOWN_RIGHT, "down-left": T.DOWN_LEFT };
var bi = { up: 0, "up-right": 1, right: 2, "down-right": 3, down: 4, "down-left": 5, left: 6, "up-left": 7, none: NaN };
var Tl = ["up", "up-right", "right", "down-right", "down", "down-left", "left", "up-left"];
var Vb = ["down-left", "down-right", "up-right", "up-left"];
function Ti() {
  return ["up", "down", "left", "right", "none", "up-left", "up-right", "down-right", "down-left"];
}
function pr(a3) {
  return Vb.includes(a3);
}
function Pl(a3, e = 1) {
  return a3 === "none" ? "none" : Tl[(bi[a3] + 8 - Math.abs(e) % 8) % 8];
}
function ko(a3, e = 1) {
  return a3 === "none" ? "none" : Tl[(bi[a3] + e) % 8];
}
function Wt(a3) {
  return kb[a3];
}
function Pi(a3) {
  return Fb[a3];
}
function Pt(a3, e) {
  if (a3.x === e.x) {
    if (a3.y > e.y) return "up";
    if (a3.y < e.y) return "down";
  } else if (a3.y === e.y) {
    if (a3.x > e.x) return "left";
    if (a3.x < e.x) return "right";
  } else if (a3.x > e.x) {
    if (a3.y < e.y) return "down-left";
    if (a3.y > e.y) return "up-left";
  } else if (a3.x < e.x) {
    if (a3.y < e.y) return "down-right";
    if (a3.y > e.y) return "up-right";
  }
  return "none";
}
var Nr = ((r) => (r[r.FOUR = 4] = "FOUR", r[r.EIGHT = 8] = "EIGHT", r))(Nr || {});
function Je(a3) {
  return typeof a3 == "string" && Ti().includes(a3);
}
var na = function(a3, e) {
  return na = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, o) {
    r.__proto__ = o;
  } || function(r, o) {
    for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (r[s] = o[s]);
  }, na(a3, e);
};
function Ze(a3, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  na(a3, e);
  function r() {
    this.constructor = a3;
  }
  a3.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function xl(a3, e, r, o) {
  function s(u) {
    return u instanceof r ? u : new r(function(h) {
      h(u);
    });
  }
  return new (r || (r = Promise))(function(u, h) {
    function f(L2) {
      try {
        P2(o.next(L2));
      } catch (D) {
        h(D);
      }
    }
    function d(L2) {
      try {
        P2(o.throw(L2));
      } catch (D) {
        h(D);
      }
    }
    function P2(L2) {
      L2.done ? u(L2.value) : s(L2.value).then(f, d);
    }
    P2((o = o.apply(a3, e || [])).next());
  });
}
function Vo(a3, e) {
  var r = { label: 0, sent: function() {
    if (u[0] & 1) throw u[1];
    return u[1];
  }, trys: [], ops: [] }, o, s, u, h = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return h.next = f(0), h.throw = f(1), h.return = f(2), typeof Symbol == "function" && (h[Symbol.iterator] = function() {
    return this;
  }), h;
  function f(P2) {
    return function(L2) {
      return d([P2, L2]);
    };
  }
  function d(P2) {
    if (o) throw new TypeError("Generator is already executing.");
    for (; h && (h = 0, P2[0] && (r = 0)), r; ) try {
      if (o = 1, s && (u = P2[0] & 2 ? s.return : P2[0] ? s.throw || ((u = s.return) && u.call(s), 0) : s.next) && !(u = u.call(s, P2[1])).done) return u;
      switch (s = 0, u && (P2 = [P2[0] & 2, u.value]), P2[0]) {
        case 0:
        case 1:
          u = P2;
          break;
        case 4:
          return r.label++, { value: P2[1], done: false };
        case 5:
          r.label++, s = P2[1], P2 = [0];
          continue;
        case 7:
          P2 = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (u = r.trys, !(u = u.length > 0 && u[u.length - 1]) && (P2[0] === 6 || P2[0] === 2)) {
            r = 0;
            continue;
          }
          if (P2[0] === 3 && (!u || P2[1] > u[0] && P2[1] < u[3])) {
            r.label = P2[1];
            break;
          }
          if (P2[0] === 6 && r.label < u[1]) {
            r.label = u[1], u = P2;
            break;
          }
          if (u && r.label < u[2]) {
            r.label = u[2], r.ops.push(P2);
            break;
          }
          u[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      P2 = e.call(a3, r);
    } catch (L2) {
      P2 = [6, L2], s = 0;
    } finally {
      o = u = 0;
    }
    if (P2[0] & 5) throw P2[1];
    return { value: P2[0] ? P2[1] : void 0, done: true };
  }
}
function Ne(a3) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && a3[e], o = 0;
  if (r) return r.call(a3);
  if (a3 && typeof a3.length == "number") return { next: function() {
    return a3 && o >= a3.length && (a3 = void 0), { value: a3 && a3[o++], done: !a3 };
  } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function be(a3, e) {
  var r = typeof Symbol == "function" && a3[Symbol.iterator];
  if (!r) return a3;
  var o = r.call(a3), s, u = [], h;
  try {
    for (; (e === void 0 || e-- > 0) && !(s = o.next()).done; ) u.push(s.value);
  } catch (f) {
    h = { error: f };
  } finally {
    try {
      s && !s.done && (r = o.return) && r.call(o);
    } finally {
      if (h) throw h.error;
    }
  }
  return u;
}
function Te(a3, e, r) {
  if (r || arguments.length === 2) for (var o = 0, s = e.length, u; o < s; o++) (u || !(o in e)) && (u || (u = Array.prototype.slice.call(e, 0, o)), u[o] = e[o]);
  return a3.concat(u || Array.prototype.slice.call(e));
}
function mr(a3) {
  return this instanceof mr ? (this.v = a3, this) : new mr(a3);
}
function wl(a3, e, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var o = r.apply(a3, e || []), s, u = [];
  return s = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), f("next"), f("throw"), f("return", h), s[Symbol.asyncIterator] = function() {
    return this;
  }, s;
  function h(M) {
    return function(H) {
      return Promise.resolve(H).then(M, D);
    };
  }
  function f(M, H) {
    o[M] && (s[M] = function(k) {
      return new Promise(function(tt, nt) {
        u.push([M, k, tt, nt]) > 1 || d(M, k);
      });
    }, H && (s[M] = H(s[M])));
  }
  function d(M, H) {
    try {
      P2(o[M](H));
    } catch (k) {
      J(u[0][3], k);
    }
  }
  function P2(M) {
    M.value instanceof mr ? Promise.resolve(M.value.v).then(L2, D) : J(u[0][2], M);
  }
  function L2(M) {
    d("next", M);
  }
  function D(M) {
    d("throw", M);
  }
  function J(M, H) {
    M(H), u.shift(), u.length && d(u[0][0], u[0][1]);
  }
}
function Cl(a3) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = a3[Symbol.asyncIterator], r;
  return e ? e.call(a3) : (a3 = typeof Ne == "function" ? Ne(a3) : a3[Symbol.iterator](), r = {}, o("next"), o("throw"), o("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function o(u) {
    r[u] = a3[u] && function(h) {
      return new Promise(function(f, d) {
        h = a3[u](h), s(f, d, h.done, h.value);
      });
    };
  }
  function s(u, h, f, d) {
    Promise.resolve(d).then(function(P2) {
      u({ value: P2, done: f });
    }, h);
  }
}
function X(a3) {
  return typeof a3 == "function";
}
function No(a3) {
  var e = function(o) {
    Error.call(o), o.stack = new Error().stack;
  }, r = a3(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Go = No(function(a3) {
  return function(r) {
    a3(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(o, s) {
      return s + 1 + ") " + o.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function xi(a3, e) {
  if (a3) {
    var r = a3.indexOf(e);
    0 <= r && a3.splice(r, 1);
  }
}
var Gr = (function() {
  function a3(e) {
    this.initialTeardown = e, this.closed = false, this._parentage = null, this._finalizers = null;
  }
  return a3.prototype.unsubscribe = function() {
    var e, r, o, s, u;
    if (!this.closed) {
      this.closed = true;
      var h = this._parentage;
      if (h) if (this._parentage = null, Array.isArray(h)) try {
        for (var f = Ne(h), d = f.next(); !d.done; d = f.next()) {
          var P2 = d.value;
          P2.remove(this);
        }
      } catch (k) {
        e = { error: k };
      } finally {
        try {
          d && !d.done && (r = f.return) && r.call(f);
        } finally {
          if (e) throw e.error;
        }
      }
      else h.remove(this);
      var L2 = this.initialTeardown;
      if (X(L2)) try {
        L2();
      } catch (k) {
        u = k instanceof Go ? k.errors : [k];
      }
      var D = this._finalizers;
      if (D) {
        this._finalizers = null;
        try {
          for (var J = Ne(D), M = J.next(); !M.done; M = J.next()) {
            var H = M.value;
            try {
              _l(H);
            } catch (k) {
              u = u != null ? u : [], k instanceof Go ? u = Te(Te([], be(u)), be(k.errors)) : u.push(k);
            }
          }
        } catch (k) {
          o = { error: k };
        } finally {
          try {
            M && !M.done && (s = J.return) && s.call(J);
          } finally {
            if (o) throw o.error;
          }
        }
      }
      if (u) throw new Go(u);
    }
  }, a3.prototype.add = function(e) {
    var r;
    if (e && e !== this) if (this.closed) _l(e);
    else {
      if (e instanceof a3) {
        if (e.closed || e._hasParent(this)) return;
        e._addParent(this);
      }
      (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(e);
    }
  }, a3.prototype._hasParent = function(e) {
    var r = this._parentage;
    return r === e || Array.isArray(r) && r.includes(e);
  }, a3.prototype._addParent = function(e) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
  }, a3.prototype._removeParent = function(e) {
    var r = this._parentage;
    r === e ? this._parentage = null : Array.isArray(r) && xi(r, e);
  }, a3.prototype.remove = function(e) {
    var r = this._finalizers;
    r && xi(r, e), e instanceof a3 && e._removeParent(this);
  }, a3.EMPTY = (function() {
    var e = new a3();
    return e.closed = true, e;
  })(), a3;
})();
var sa = Gr.EMPTY;
function jo(a3) {
  return a3 instanceof Gr || a3 && "closed" in a3 && X(a3.remove) && X(a3.add) && X(a3.unsubscribe);
}
function _l(a3) {
  X(a3) ? a3() : a3.unsubscribe();
}
var ce = { onUnhandledError: null, onStoppedNotification: null, Promise: void 0, useDeprecatedSynchronousErrorHandling: false, useDeprecatedNextContext: false };
var jr = { setTimeout: function(a3, e) {
  for (var r = [], o = 2; o < arguments.length; o++) r[o - 2] = arguments[o];
  var s = jr.delegate;
  return s != null && s.setTimeout ? s.setTimeout.apply(s, Te([a3, e], be(r))) : setTimeout.apply(void 0, Te([a3, e], be(r)));
}, clearTimeout: function(a3) {
  var e = jr.delegate;
  return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(a3);
}, delegate: void 0 };
function Uo(a3) {
  jr.setTimeout(function() {
    var e = ce.onUnhandledError;
    if (e) e(a3);
    else throw a3;
  });
}
function wi() {
}
var Ll = (function() {
  return aa("C", void 0, void 0);
})();
function Sl(a3) {
  return aa("E", void 0, a3);
}
function Ol(a3) {
  return aa("N", a3, void 0);
}
function aa(a3, e, r) {
  return { kind: a3, value: e, error: r };
}
var dr = null;
function Ur(a3) {
  if (ce.useDeprecatedSynchronousErrorHandling) {
    var e = !dr;
    if (e && (dr = { errorThrown: false, error: null }), a3(), e) {
      var r = dr, o = r.errorThrown, s = r.error;
      if (dr = null, o) throw s;
    }
  } else a3();
}
function El(a3) {
  ce.useDeprecatedSynchronousErrorHandling && dr && (dr.errorThrown = true, dr.error = a3);
}
var Ci = (function(a3) {
  Ze(e, a3);
  function e(r) {
    var o = a3.call(this) || this;
    return o.isStopped = false, r ? (o.destination = r, jo(r) && r.add(o)) : o.destination = Ub, o;
  }
  return e.create = function(r, o, s) {
    return new Ho(r, o, s);
  }, e.prototype.next = function(r) {
    this.isStopped ? ca(Ol(r), this) : this._next(r);
  }, e.prototype.error = function(r) {
    this.isStopped ? ca(Sl(r), this) : (this.isStopped = true, this._error(r));
  }, e.prototype.complete = function() {
    this.isStopped ? ca(Ll, this) : (this.isStopped = true, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = true, a3.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(r) {
    this.destination.next(r);
  }, e.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
})(Gr);
var Nb = Function.prototype.bind;
function ua(a3, e) {
  return Nb.call(a3, e);
}
var Gb = (function() {
  function a3(e) {
    this.partialObserver = e;
  }
  return a3.prototype.next = function(e) {
    var r = this.partialObserver;
    if (r.next) try {
      r.next(e);
    } catch (o) {
      Bo(o);
    }
  }, a3.prototype.error = function(e) {
    var r = this.partialObserver;
    if (r.error) try {
      r.error(e);
    } catch (o) {
      Bo(o);
    }
    else Bo(e);
  }, a3.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete) try {
      e.complete();
    } catch (r) {
      Bo(r);
    }
  }, a3;
})();
var Ho = (function(a3) {
  Ze(e, a3);
  function e(r, o, s) {
    var u = a3.call(this) || this, h;
    if (X(r) || !r) h = { next: r != null ? r : void 0, error: o != null ? o : void 0, complete: s != null ? s : void 0 };
    else {
      var f;
      u && ce.useDeprecatedNextContext ? (f = Object.create(r), f.unsubscribe = function() {
        return u.unsubscribe();
      }, h = { next: r.next && ua(r.next, f), error: r.error && ua(r.error, f), complete: r.complete && ua(r.complete, f) }) : h = r;
    }
    return u.destination = new Gb(h), u;
  }
  return e;
})(Ci);
function Bo(a3) {
  ce.useDeprecatedSynchronousErrorHandling ? El(a3) : Uo(a3);
}
function jb(a3) {
  throw a3;
}
function ca(a3, e) {
  var r = ce.onStoppedNotification;
  r && jr.setTimeout(function() {
    return r(a3, e);
  });
}
var Ub = { closed: true, next: wi, error: jb, complete: wi };
var Br = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Wo(a3) {
  return a3;
}
function la() {
  for (var a3 = [], e = 0; e < arguments.length; e++) a3[e] = arguments[e];
  return ha(a3);
}
function ha(a3) {
  return a3.length === 0 ? Wo : a3.length === 1 ? a3[0] : function(r) {
    return a3.reduce(function(o, s) {
      return s(o);
    }, r);
  };
}
var vt = (function() {
  function a3(e) {
    e && (this._subscribe = e);
  }
  return a3.prototype.lift = function(e) {
    var r = new a3();
    return r.source = this, r.operator = e, r;
  }, a3.prototype.subscribe = function(e, r, o) {
    var s = this, u = Hb(e) ? e : new Ho(e, r, o);
    return Ur(function() {
      var h = s, f = h.operator, d = h.source;
      u.add(f ? f.call(u, d) : d ? s._subscribe(u) : s._trySubscribe(u));
    }), u;
  }, a3.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (r) {
      e.error(r);
    }
  }, a3.prototype.forEach = function(e, r) {
    var o = this;
    return r = Dl(r), new r(function(s, u) {
      var h = new Ho({ next: function(f) {
        try {
          e(f);
        } catch (d) {
          u(d), h.unsubscribe();
        }
      }, error: u, complete: s });
      o.subscribe(h);
    });
  }, a3.prototype._subscribe = function(e) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(e);
  }, a3.prototype[Br] = function() {
    return this;
  }, a3.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
    return ha(e)(this);
  }, a3.prototype.toPromise = function(e) {
    var r = this;
    return e = Dl(e), new e(function(o, s) {
      var u;
      r.subscribe(function(h) {
        return u = h;
      }, function(h) {
        return s(h);
      }, function() {
        return o(u);
      });
    });
  }, a3.create = function(e) {
    return new a3(e);
  }, a3;
})();
function Dl(a3) {
  var e;
  return (e = a3 != null ? a3 : ce.Promise) !== null && e !== void 0 ? e : Promise;
}
function Bb(a3) {
  return a3 && X(a3.next) && X(a3.error) && X(a3.complete);
}
function Hb(a3) {
  return a3 && a3 instanceof Ci || Bb(a3) && jo(a3);
}
function Wb(a3) {
  return X(a3 == null ? void 0 : a3.lift);
}
function St(a3) {
  return function(e) {
    if (Wb(e)) return e.lift(function(r) {
      try {
        return a3(r, this);
      } catch (o) {
        this.error(o);
      }
    });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function zt(a3, e, r, o, s) {
  return new zb(a3, e, r, o, s);
}
var zb = (function(a3) {
  Ze(e, a3);
  function e(r, o, s, u, h, f) {
    var d = a3.call(this, r) || this;
    return d.onFinalize = h, d.shouldUnsubscribe = f, d._next = o ? function(P2) {
      try {
        o(P2);
      } catch (L2) {
        r.error(L2);
      }
    } : a3.prototype._next, d._error = u ? function(P2) {
      try {
        u(P2);
      } catch (L2) {
        r.error(L2);
      } finally {
        this.unsubscribe();
      }
    } : a3.prototype._error, d._complete = s ? function() {
      try {
        s();
      } catch (P2) {
        r.error(P2);
      } finally {
        this.unsubscribe();
      }
    } : a3.prototype._complete, d;
  }
  return e.prototype.unsubscribe = function() {
    var r;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var o = this.closed;
      a3.prototype.unsubscribe.call(this), !o && ((r = this.onFinalize) === null || r === void 0 || r.call(this));
    }
  }, e;
})(Ci);
var Il = No(function(a3) {
  return function() {
    a3(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
});
var K = (function(a3) {
  Ze(e, a3);
  function e() {
    var r = a3.call(this) || this;
    return r.closed = false, r.currentObservers = null, r.observers = [], r.isStopped = false, r.hasError = false, r.thrownError = null, r;
  }
  return e.prototype.lift = function(r) {
    var o = new Ml(this, this);
    return o.operator = r, o;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed) throw new Il();
  }, e.prototype.next = function(r) {
    var o = this;
    Ur(function() {
      var s, u;
      if (o._throwIfClosed(), !o.isStopped) {
        o.currentObservers || (o.currentObservers = Array.from(o.observers));
        try {
          for (var h = Ne(o.currentObservers), f = h.next(); !f.done; f = h.next()) {
            var d = f.value;
            d.next(r);
          }
        } catch (P2) {
          s = { error: P2 };
        } finally {
          try {
            f && !f.done && (u = h.return) && u.call(h);
          } finally {
            if (s) throw s.error;
          }
        }
      }
    });
  }, e.prototype.error = function(r) {
    var o = this;
    Ur(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.hasError = o.isStopped = true, o.thrownError = r;
        for (var s = o.observers; s.length; ) s.shift().error(r);
      }
    });
  }, e.prototype.complete = function() {
    var r = this;
    Ur(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.isStopped = true;
        for (var o = r.observers; o.length; ) o.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", { get: function() {
    var r;
    return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
  }, enumerable: false, configurable: true }), e.prototype._trySubscribe = function(r) {
    return this._throwIfClosed(), a3.prototype._trySubscribe.call(this, r);
  }, e.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, e.prototype._innerSubscribe = function(r) {
    var o = this, s = this, u = s.hasError, h = s.isStopped, f = s.observers;
    return u || h ? sa : (this.currentObservers = null, f.push(r), new Gr(function() {
      o.currentObservers = null, xi(f, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var o = this, s = o.hasError, u = o.thrownError, h = o.isStopped;
    s ? r.error(u) : h && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new vt();
    return r.source = this, r;
  }, e.create = function(r, o) {
    return new Ml(r, o);
  }, e;
})(vt);
var Ml = (function(a3) {
  Ze(e, a3);
  function e(r, o) {
    var s = a3.call(this) || this;
    return s.destination = r, s.source = o, s;
  }
  return e.prototype.next = function(r) {
    var o, s;
    (s = (o = this.destination) === null || o === void 0 ? void 0 : o.next) === null || s === void 0 || s.call(o, r);
  }, e.prototype.error = function(r) {
    var o, s;
    (s = (o = this.destination) === null || o === void 0 ? void 0 : o.error) === null || s === void 0 || s.call(o, r);
  }, e.prototype.complete = function() {
    var r, o;
    (o = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || o === void 0 || o.call(r);
  }, e.prototype._subscribe = function(r) {
    var o, s;
    return (s = (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(r)) !== null && s !== void 0 ? s : sa;
  }, e;
})(K);
var zo = new vt(function(a3) {
  return a3.complete();
});
function Al(a3) {
  return a3 && X(a3.schedule);
}
function Rl(a3) {
  return a3[a3.length - 1];
}
function $o(a3) {
  return Al(Rl(a3)) ? a3.pop() : void 0;
}
function qo(a3, e) {
  return typeof Rl(a3) == "number" ? a3.pop() : e;
}
var Yo = (function(a3) {
  return a3 && typeof a3.length == "number" && typeof a3 != "function";
});
function Xo(a3) {
  return X(a3 == null ? void 0 : a3.then);
}
function Qo(a3) {
  return X(a3[Br]);
}
function Ko(a3) {
  return Symbol.asyncIterator && X(a3 == null ? void 0 : a3[Symbol.asyncIterator]);
}
function Jo(a3) {
  return new TypeError("You provided " + (a3 !== null && typeof a3 == "object" ? "an invalid object" : "'" + a3 + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function $b() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Zo = $b();
function tn(a3) {
  return X(a3 == null ? void 0 : a3[Zo]);
}
function en(a3) {
  return wl(this, arguments, function() {
    var r, o, s, u;
    return Vo(this, function(h) {
      switch (h.label) {
        case 0:
          r = a3.getReader(), h.label = 1;
        case 1:
          h.trys.push([1, , 9, 10]), h.label = 2;
        case 2:
          return [4, mr(r.read())];
        case 3:
          return o = h.sent(), s = o.value, u = o.done, u ? [4, mr(void 0)] : [3, 5];
        case 4:
          return [2, h.sent()];
        case 5:
          return [4, mr(s)];
        case 6:
          return [4, h.sent()];
        case 7:
          return h.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return r.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function rn(a3) {
  return X(a3 == null ? void 0 : a3.getReader);
}
function Vt(a3) {
  if (a3 instanceof vt) return a3;
  if (a3 != null) {
    if (Qo(a3)) return qb(a3);
    if (Yo(a3)) return Yb(a3);
    if (Xo(a3)) return Xb(a3);
    if (Ko(a3)) return Fl(a3);
    if (tn(a3)) return Qb(a3);
    if (rn(a3)) return Kb(a3);
  }
  throw Jo(a3);
}
function qb(a3) {
  return new vt(function(e) {
    var r = a3[Br]();
    if (X(r.subscribe)) return r.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Yb(a3) {
  return new vt(function(e) {
    for (var r = 0; r < a3.length && !e.closed; r++) e.next(a3[r]);
    e.complete();
  });
}
function Xb(a3) {
  return new vt(function(e) {
    a3.then(function(r) {
      e.closed || (e.next(r), e.complete());
    }, function(r) {
      return e.error(r);
    }).then(null, Uo);
  });
}
function Qb(a3) {
  return new vt(function(e) {
    var r, o;
    try {
      for (var s = Ne(a3), u = s.next(); !u.done; u = s.next()) {
        var h = u.value;
        if (e.next(h), e.closed) return;
      }
    } catch (f) {
      r = { error: f };
    } finally {
      try {
        u && !u.done && (o = s.return) && o.call(s);
      } finally {
        if (r) throw r.error;
      }
    }
    e.complete();
  });
}
function Fl(a3) {
  return new vt(function(e) {
    Jb(a3, e).catch(function(r) {
      return e.error(r);
    });
  });
}
function Kb(a3) {
  return Fl(en(a3));
}
function Jb(a3, e) {
  var r, o, s, u;
  return xl(this, void 0, void 0, function() {
    var h, f;
    return Vo(this, function(d) {
      switch (d.label) {
        case 0:
          d.trys.push([0, 5, 6, 11]), r = Cl(a3), d.label = 1;
        case 1:
          return [4, r.next()];
        case 2:
          if (o = d.sent(), !!o.done) return [3, 4];
          if (h = o.value, e.next(h), e.closed) return [2];
          d.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return f = d.sent(), s = { error: f }, [3, 11];
        case 6:
          return d.trys.push([6, , 9, 10]), o && !o.done && (u = r.return) ? [4, u.call(r)] : [3, 8];
        case 7:
          d.sent(), d.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (s) throw s.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return e.complete(), [2];
      }
    });
  });
}
function ee(a3, e, r, o, s) {
  o === void 0 && (o = 0), s === void 0 && (s = false);
  var u = e.schedule(function() {
    r(), s ? a3.add(this.schedule(null, o)) : this.unsubscribe();
  }, o);
  if (a3.add(u), !s) return u;
}
function on(a3, e) {
  return e === void 0 && (e = 0), St(function(r, o) {
    r.subscribe(zt(o, function(s) {
      return ee(o, a3, function() {
        return o.next(s);
      }, e);
    }, function() {
      return ee(o, a3, function() {
        return o.complete();
      }, e);
    }, function(s) {
      return ee(o, a3, function() {
        return o.error(s);
      }, e);
    }));
  });
}
function nn(a3, e) {
  return e === void 0 && (e = 0), St(function(r, o) {
    o.add(a3.schedule(function() {
      return r.subscribe(o);
    }, e));
  });
}
function kl(a3, e) {
  return Vt(a3).pipe(nn(e), on(e));
}
function Vl(a3, e) {
  return Vt(a3).pipe(nn(e), on(e));
}
function Nl(a3, e) {
  return new vt(function(r) {
    var o = 0;
    return e.schedule(function() {
      o === a3.length ? r.complete() : (r.next(a3[o++]), r.closed || this.schedule());
    });
  });
}
function Gl(a3, e) {
  return new vt(function(r) {
    var o;
    return ee(r, e, function() {
      o = a3[Zo](), ee(r, e, function() {
        var s, u, h;
        try {
          s = o.next(), u = s.value, h = s.done;
        } catch (f) {
          r.error(f);
          return;
        }
        h ? r.complete() : r.next(u);
      }, 0, true);
    }), function() {
      return X(o == null ? void 0 : o.return) && o.return();
    };
  });
}
function sn(a3, e) {
  if (!a3) throw new Error("Iterable cannot be null");
  return new vt(function(r) {
    ee(r, e, function() {
      var o = a3[Symbol.asyncIterator]();
      ee(r, e, function() {
        o.next().then(function(s) {
          s.done ? r.complete() : r.next(s.value);
        });
      }, 0, true);
    });
  });
}
function jl(a3, e) {
  return sn(en(a3), e);
}
function Ul(a3, e) {
  if (a3 != null) {
    if (Qo(a3)) return kl(a3, e);
    if (Yo(a3)) return Nl(a3, e);
    if (Xo(a3)) return Vl(a3, e);
    if (Ko(a3)) return sn(a3, e);
    if (tn(a3)) return Gl(a3, e);
    if (rn(a3)) return jl(a3, e);
  }
  throw Jo(a3);
}
function an(a3, e) {
  return e ? Ul(a3, e) : Vt(a3);
}
function Pe(a3, e) {
  return St(function(r, o) {
    var s = 0;
    r.subscribe(zt(o, function(u) {
      o.next(a3.call(e, u, s++));
    }));
  });
}
function Bl(a3, e, r, o, s, u, h, f) {
  var d = [], P2 = 0, L2 = 0, D = false, J = function() {
    D && !d.length && !P2 && e.complete();
  }, M = function(k) {
    return P2 < o ? H(k) : d.push(k);
  }, H = function(k) {
    u && e.next(k), P2++;
    var tt = false;
    Vt(r(k, L2++)).subscribe(zt(e, function(nt) {
      s == null || s(nt), u ? M(nt) : e.next(nt);
    }, function() {
      tt = true;
    }, void 0, function() {
      if (tt) try {
        P2--;
        for (var nt = function() {
          var $t = d.shift();
          h ? ee(e, h, function() {
            return H($t);
          }) : H($t);
        }; d.length && P2 < o; ) nt();
        J();
      } catch ($t) {
        e.error($t);
      }
    }));
  };
  return a3.subscribe(zt(e, M, function() {
    D = true, J();
  })), function() {
    f == null || f();
  };
}
function fa(a3, e, r) {
  return r === void 0 && (r = 1 / 0), X(e) ? fa(function(o, s) {
    return Pe(function(u, h) {
      return e(o, u, s, h);
    })(Vt(a3(o, s)));
  }, r) : (typeof e == "number" && (r = e), St(function(o, s) {
    return Bl(o, s, a3, r);
  }));
}
function un(a3) {
  return a3 === void 0 && (a3 = 1 / 0), fa(Wo, a3);
}
function pa() {
  for (var a3 = [], e = 0; e < arguments.length; e++) a3[e] = arguments[e];
  var r = $o(a3), o = qo(a3, 1 / 0), s = a3;
  return s.length ? s.length === 1 ? Vt(s[0]) : un(o)(an(s, r)) : zo;
}
function xt(a3, e) {
  return St(function(r, o) {
    var s = 0;
    r.subscribe(zt(o, function(u) {
      return a3.call(e, u, s++) && o.next(u);
    }));
  });
}
function wt(a3) {
  return a3 <= 0 ? function() {
    return zo;
  } : St(function(e, r) {
    var o = 0;
    e.subscribe(zt(r, function(s) {
      ++o <= a3 && (r.next(s), a3 <= o && r.complete());
    }));
  });
}
function Hl() {
  for (var a3 = [], e = 0; e < arguments.length; e++) a3[e] = arguments[e];
  var r = $o(a3), o = qo(a3, 1 / 0);
  return St(function(s, u) {
    un(o)(an(Te([s], be(a3)), r)).subscribe(u);
  });
}
function ma() {
  for (var a3 = [], e = 0; e < arguments.length; e++) a3[e] = arguments[e];
  return Hl.apply(void 0, Te([], be(a3)));
}
function dt(a3) {
  return St(function(e, r) {
    Vt(a3).subscribe(zt(r, function() {
      return r.complete();
    }, wi)), !r.closed && e.subscribe(r);
  });
}
var Ge = 1e3;
var cn = class {
  constructor(e, r) {
    this.id = e;
    this.movementDirection = "none";
    this._tilePos = { position: new T(0, 0), layer: void 0 };
    this.movementStarted$ = new K();
    this.movementStopped$ = new K();
    this.directionChanged$ = new K();
    this.positionChangeStarted$ = new K();
    this.positionChangeFinished$ = new K();
    this.tilePositionSet$ = new K();
    this.autoMovementSet$ = new K();
    this.lastMovementImpulse = "none";
    this.facingDirection = "down";
    this.depthChanged$ = new K();
    this.movementProgress = 0;
    this.currentMovementReverted = false;
    var o, s, u;
    this.tilemap = r.tilemap, this.speed = r.speed, this.collidesWithTilesInternal = r.collidesWithTiles, this._tilePos.layer = r.charLayer, this.ignoreMissingTiles = (o = r.ignoreMissingTiles) != null ? o : false, this.collisionGroups = new Set(r.collisionGroups || []), this.ignoreCollisionGroups = new Set(r.ignoreCollisionGroups || []), this.labels = new Set(r.labels || []), this.numberOfDirections = r.numberOfDirections, r.facingDirection && this.turnTowards(r.facingDirection), this.tileWidth = (s = r.tileWidth) != null ? s : 1, this.tileHeight = (u = r.tileHeight) != null ? u : 1;
  }
  getId() {
    return this.id;
  }
  getSpeed() {
    return this.speed;
  }
  setSpeed(e) {
    this.speed = e;
  }
  setMovement(e) {
    this.autoMovementSet$.next(e), this.movement = e;
  }
  getMovement() {
    return this.movement;
  }
  collidesWithTiles() {
    return this.collidesWithTilesInternal;
  }
  setCollidesWithTiles(e) {
    this.collidesWithTilesInternal = e;
  }
  getIgnoreMissingTiles() {
    return this.ignoreMissingTiles;
  }
  setIgnoreMissingTiles(e) {
    this.ignoreMissingTiles = e;
  }
  setTilePosition(e) {
    this.currentMovementReverted = false, this.isMoving() && this.movementStopped$.next(this.movementDirection), this.tilePositionSet$.next(q({}, e)), this.fire(this.positionChangeStarted$, this.tilePos, e), this.fire(this.positionChangeFinished$, this.tilePos, e), this.movementDirection = "none", this.lastMovementImpulse = "none", this.tilePos = e, this.movementProgress = 0;
  }
  getTilePos() {
    return this.tilePos;
  }
  getNextTilePos() {
    if (!this.isMoving()) return this.tilePos;
    if (this.currentMovementReverted) return this.tilePos;
    let e = this.tilePos.layer, r = this.tilePosInDirection(this.tilePos.position, this.movementDirection), o = this.tilemap.getTransition(r, this.tilePos.layer);
    return o && (e = o), { position: this.tilePosInDirection(this.tilePos.position, this.movementDirection), layer: e };
  }
  getTileWidth() {
    return this.tileWidth;
  }
  getTileHeight() {
    return this.tileHeight;
  }
  move(e) {
    this.lastMovementImpulse = e, e != "none" && (this.isMoving() || (this.isBlockingDirection(e) ? this.changeFacingDirection(e) : this.startMoving(e)));
  }
  update(e) {
    var r;
    (r = this.movement) == null || r.update(e), this.isMoving() && this.updateCharacterPosition(e), this.lastMovementImpulse = "none";
  }
  getMovementDirection() {
    return this.movementDirection;
  }
  isBlockingDirection(e) {
    if (e == "none") return false;
    let r = this.tilePosInDirection(this.getNextTilePos().position, e), o = this.tilemap.getTransition(r, this.getNextTilePos().layer) || this.getNextTilePos().layer;
    return this.collidesWithTilesInternal && this.isTileBlocking(e, o) ? true : this.isCharBlocking(e, o);
  }
  isTileBlocking(e, r) {
    return this.someCharTile((o, s) => {
      let u = this.tilePosInDirection(new T(o, s), e);
      return this.tilemap.hasBlockingTile(u, r, Pi(e), this.ignoreMissingTiles);
    });
  }
  revertCurrentMovement() {
    this.isMoving() && (this.currentMovementReverted = true, this.movementDirection = Pi(this.movementDirection), this.movementStopped$.next(this.facingDirection), this.facingDirection = this.movementDirection, this.movementProgress = Ge - this.movementProgress, this.movementStarted$.next(this.facingDirection));
  }
  isCurrentMovementReverted() {
    return this.currentMovementReverted;
  }
  isCharBlocking(e, r) {
    return this.someCharTile((o, s) => {
      let u = this.tilePosInDirection(new T(o, s), e);
      return this.tilemap.hasBlockingChar(u, r, this.getCollisionGroups(), /* @__PURE__ */ new Set([this.getId()]), this.ignoreCollisionGroups);
    });
  }
  isMoving() {
    return this.movementDirection != "none";
  }
  turnTowards(e) {
    this.isMoving() || e != "none" && this.changeFacingDirection(e);
  }
  changeFacingDirection(e) {
    this.facingDirection !== e && (this.facingDirection = e, this.directionChanged$.next(e));
  }
  getFacingDirection() {
    return this.facingDirection;
  }
  getFacingPosition() {
    return this._tilePos.position.add(Wt(this.facingDirection));
  }
  addCollisionGroup(e) {
    this.collisionGroups.add(e);
  }
  setCollisionGroups(e) {
    this.collisionGroups = new Set(e);
  }
  setIgnoreCollisionGroups(e) {
    this.ignoreCollisionGroups = new Set(e);
  }
  getCollisionGroups() {
    return Array.from(this.collisionGroups);
  }
  getIgnoreCollisionGroups() {
    return Array.from(this.ignoreCollisionGroups);
  }
  hasCollisionGroup(e) {
    return this.collisionGroups.has(e);
  }
  removeCollisionGroup(e) {
    this.collisionGroups.delete(e);
  }
  removeAllCollisionGroups() {
    this.collisionGroups.clear();
  }
  addLabels(e) {
    for (let r of e) this.labels.add(r);
  }
  getLabels() {
    return [...this.labels.values()];
  }
  hasLabel(e) {
    return this.labels.has(e);
  }
  clearLabels() {
    this.labels.clear();
  }
  removeLabels(e) {
    for (let r of e) this.labels.delete(r);
  }
  getNumberOfDirections() {
    return this.numberOfDirections;
  }
  movementStarted() {
    return this.movementStarted$;
  }
  movementStopped() {
    return this.movementStopped$;
  }
  directionChanged() {
    return this.directionChanged$;
  }
  tilePositionSet() {
    return this.tilePositionSet$;
  }
  positionChangeStarted() {
    return this.positionChangeStarted$;
  }
  positionChangeFinished() {
    return this.positionChangeFinished$;
  }
  autoMovementSet() {
    return this.autoMovementSet$;
  }
  depthChanged() {
    return this.depthChanged$;
  }
  getMovementProgress() {
    return this.movementProgress;
  }
  setMovementProgress(e) {
    let r = Math.max(0, Math.min(Ge, e));
    this.movementProgress = r;
  }
  hasWalkedHalfATile() {
    return this.movementProgress > Ge / 2;
  }
  willCrossTileBorderThisUpdate(e) {
    return this.movementProgress + this.maxProgressForDelta(e) >= Ge;
  }
  updateCharacterPosition(e) {
    let r = this.willCrossTileBorderThisUpdate(e), s = 1 - (r ? Ge - this.movementProgress : this.maxProgressForDelta(e)) / this.maxProgressForDelta(e);
    this.movementProgress = Math.min(this.movementProgress + this.maxProgressForDelta(e), Ge), r && (this.movementProgress = 0, this.shouldContinueMoving() ? (this.fire(this.positionChangeFinished$, this.tilePos, this.getNextTilePos()), this.tilePos = this.getNextTilePos(), this.startMoving(this.lastMovementImpulse), s > 0 && this.updateCharacterPosition(e * s)) : this.stopMoving());
  }
  maxProgressForDelta(e) {
    let o = e / 1e3;
    return Math.floor(o * this.speed * Ge);
  }
  get tilePos() {
    return V.clone(this._tilePos);
  }
  set tilePos(e) {
    V.copyOver(e, this._tilePos);
  }
  startMoving(e) {
    e !== "none" && (this.currentMovementReverted = false, e != this.movementDirection && this.movementStarted$.next(e), this.movementDirection = e, this.facingDirection = e, this.fire(this.positionChangeStarted$, this.tilePos, this.getNextTilePos()));
  }
  tilePosInDirection(e, r) {
    return e.add(Wt(this.tilemap.toMapDirection(r)));
  }
  shouldContinueMoving() {
    return this.lastMovementImpulse !== "none" && !this.isBlockingDirection(this.lastMovementImpulse);
  }
  stopMoving() {
    if (this.movementDirection === "none") return;
    let e = this.tilePos, r = this.getNextTilePos(), o = this.movementDirection;
    this.tilePos = this.getNextTilePos(), this.movementDirection = "none", this.movementStopped$.next(o), this.currentMovementReverted = false, this.fire(this.positionChangeFinished$, e, r);
  }
  fire(e, { position: r, layer: o }, { position: s, layer: u }) {
    e.next({ exitTile: r, enterTile: s, exitLayer: o, enterLayer: u });
  }
  someCharTile(e) {
    let r = this.getNextTilePos().position;
    for (let o = r.x; o < r.x + this.getTileWidth(); o++) for (let s = r.y; s < r.y + this.getTileHeight(); s++) if (e(o, s)) return true;
    return false;
  }
};
var gr = class gr2 {
  constructor(e, r) {
    this.walkingAnimationMapping = e;
    this.charsInRow = r;
    this.lastFootLeft = false;
    this.directionToFrameRow = { down: 0, "down-left": 1, "down-right": 2, left: 1, right: 2, up: 3, "up-left": 1, "up-right": 2 };
    this._isEnabled = true;
    this.frameChange$ = new K();
    this.setWalkingAnimationMapping(e);
  }
  frameChange() {
    return this.frameChange$;
  }
  setIsEnabled(e) {
    this._isEnabled = e;
  }
  isEnabled() {
    return this._isEnabled;
  }
  updateCharacterFrame(e, r, o) {
    this._isEnabled && (r ? this.setStandingFrameDuringWalk(e, o) : this.setWalkingFrame(e));
  }
  setStandingFrame(e) {
    this._isEnabled && this._setStandingFrame(e);
  }
  setWalkingAnimationMapping(e) {
    this.walkingAnimationMapping = e, this._isEnabled = this.walkingAnimationMapping !== void 0;
  }
  getWalkingAnimationMapping() {
    return this.walkingAnimationMapping;
  }
  getCharsInRow() {
    return this.charsInRow;
  }
  setStandingFrameDuringWalk(e, r) {
    this.isCurrentFrameStanding(e, r) || (this.lastFootLeft = !this.lastFootLeft), this._setStandingFrame(e);
  }
  setWalkingFrame(e) {
    let r = this.framesOfDirection(e);
    r && this.frameChange$.next(this.lastFootLeft ? r.rightFoot : r.leftFoot);
  }
  _setStandingFrame(e) {
    let r = this.framesOfDirection(e);
    r && this.frameChange$.next(r.standing);
  }
  isCurrentFrameStanding(e, r) {
    var o;
    return r === ((o = this.framesOfDirection(e)) == null ? void 0 : o.standing);
  }
  framesOfDirection(e) {
    return typeof this.walkingAnimationMapping == "number" ? this.getFramesForCharIndex(e, this.walkingAnimationMapping) : this.getFramesForAnimationMapping(e);
  }
  getFramesForAnimationMapping(e) {
    if (!this.walkingAnimationMapping || typeof this.walkingAnimationMapping == "number" || e === "none") return;
    let r = this.fallbackDirection(e);
    if (r !== "none") return this.walkingAnimationMapping[e] || this.walkingAnimationMapping[r];
  }
  fallbackDirection(e) {
    switch (e) {
      case "down-left":
        return "left";
      case "down-right":
        return "right";
      case "up-left":
        return "left";
      case "up-right":
        return "right";
    }
    return e;
  }
  getFramesForCharIndex(e, r) {
    var P2;
    let o = Math.floor(r / this.charsInRow), s = r % this.charsInRow, u = this.charsInRow * gr2.FRAMES_CHAR_ROW, h = gr2.FRAMES_CHAR_ROW * s, f = ((P2 = this.directionToFrameRow[e]) != null ? P2 : 0) + o * gr2.FRAMES_CHAR_COL, d = h + f * u;
    return { rightFoot: d, standing: d + 1, leftFoot: d + 2 };
  }
};
gr.FRAMES_CHAR_ROW = 3, gr.FRAMES_CHAR_COL = 4;
var _i = gr;
var yr = class {
  static shiftPad(e, r) {
    let o = Math.floor(e), u = `${o}`.padStart(r, "0").length;
    return o / Math.pow(10, u);
  }
};
var ft = class a2 {
  static vec2str(e) {
    return `${e.x}#${e.y}`;
  }
  static equal(e, r) {
    return a2.vec2str(e) == a2.vec2str(r);
  }
  static manhattanDistance(e, r) {
    let o = Math.abs(e.x - r.x), s = Math.abs(e.y - r.y);
    return o + s;
  }
  static chebyshevDistance(e, r) {
    let o = Math.abs(e.x - r.x), s = Math.abs(e.y - r.y);
    return Math.max(o, s);
  }
  static scalarMult(e, r) {
    return e.clone().multiply(new T(r, r));
  }
};
var re = class re2 {
  constructor(e) {
    this.tilemap = e;
    this.charLayerDepths = /* @__PURE__ */ new Map();
    this.setLayerDepths();
  }
  getTileWidth() {
    var r, o;
    let e = (o = (r = this.tilemap.layers[0]) == null ? void 0 : r.tilemapLayer.scale) != null ? o : 1;
    return this.tilemap.tileWidth * e;
  }
  getTileHeight() {
    var r, o;
    let e = (o = (r = this.tilemap.layers[0]) == null ? void 0 : r.tilemapLayer.scale) != null ? o : 1;
    return this.tilemap.tileHeight * e;
  }
  getDepthOfCharLayer(e) {
    var r;
    return (r = this.charLayerDepths.get(e)) != null ? r : 0;
  }
  tilePosToPixelPos(e) {
    return this.isIsometric() ? ft.scalarMult(this.getTileSize(), 0.5).multiply(new T(e.x - e.y, e.x + e.y)) : e.clone().multiply(this.getTileSize());
  }
  getTileDistance(e) {
    if (this.isIsometric()) switch (e) {
      case "down-left":
      case "down-right":
      case "up-left":
      case "up-right":
        return ft.scalarMult(this.getTileSize(), 0.5);
      default:
        return this.getTileSize();
    }
    return this.getTileSize();
  }
  getTileSize() {
    return new T(this.getTileWidth(), this.getTileHeight());
  }
  isIsometric() {
    return this.tilemap.orientation == Tilemaps.Orientation.ISOMETRIC.toString();
  }
  isLayerAlwaysOnTop(e) {
    return this.hasLayerProp(e, re2.ALWAYS_TOP_PROP_NAME);
  }
  isCharLayer(e) {
    return this.hasLayerProp(e, re2.CHAR_LAYER_PROP_NAME);
  }
  setLayerDepths() {
    let e = [], r = -1, o = this.tilemap.layers.filter((u) => this.isLayerAlwaysOnTop(u));
    this.tilemap.layers.filter((u) => !this.isLayerAlwaysOnTop(u)).forEach((u) => {
      this.hasLayerProp(u, re2.HEIGHT_SHIFT_PROP_NAME) ? (this.createHeightShiftLayers(u, r), e.push(u.tilemapLayer)) : this.setDepth(u, ++r);
    }), this.charLayerDepths.set(void 0, r), o.forEach((u, h) => {
      u.tilemapLayer.setDepth(h + 1 + r);
    }), e.forEach((u) => u.destroy());
  }
  setDepth(e, r) {
    e.tilemapLayer.setDepth(r), this.isCharLayer(e) && this.charLayerDepths.set(this.getLayerProp(e, re2.CHAR_LAYER_PROP_NAME), r);
  }
  createHeightShiftLayers(e, r) {
    let o = this.getLayerProp(e, re2.HEIGHT_SHIFT_PROP_NAME);
    isNaN(o) && (o = 0);
    let s = 1;
    for (let u = 0; u < e.height; u++) {
      let h = this.copyLayer(e, u);
      if (h) {
        h.scale = e.tilemapLayer.scale;
        let f = this.isIsometric() ? this.getTileHeight() / 2 : this.getTileHeight();
        h.setDepth(r + yr.shiftPad((u + o) * f + s, re2.Z_INDEX_PADDING));
      }
    }
  }
  getLayerProp(e, r) {
    let s = e.properties.find((u) => u.name == r);
    return s == null ? void 0 : s.value;
  }
  hasLayerProp(e, r) {
    return this.getLayerProp(e, r) != null;
  }
  copyLayer(e, r) {
    let o = `${e.name}#${r}`, s = this.tilemap.createBlankLayer(o, e.tilemapLayer.tileset);
    if (s) {
      if (s.name = o, this.isIsometric()) for (let u = r; u >= 0; u--) {
        let h = r - u;
        s.putTileAt(e.data[u][h], h, u);
      }
      else for (let u = 0; u < e.width; u++) s.putTileAt(e.data[r][u], u, r);
      return s;
    }
  }
};
re.ALWAYS_TOP_PROP_NAME = "ge_alwaysTop", re.CHAR_LAYER_PROP_NAME = "ge_charLayer", re.HEIGHT_SHIFT_PROP_NAME = "ge_heightShift", re.Z_INDEX_PADDING = 7;
var vr = re;
var ln = class {
  constructor(e, r, o, s, u) {
    this.charData = e;
    this.scene = r;
    this.tilemap = o;
    this.geHeadless = u;
    this.customOffset = new T(0, 0);
    this.depthOffset = 0;
    this.newSpriteSet$ = new K();
    this.destroy$ = new K();
    var h, f;
    this.layerOverlaySprite = s && e.sprite ? this.scene.add.sprite(0, 0, e.sprite.texture) : void 0, this.walkingAnimationMapping = e.walkingAnimationMapping, this.customOffset = new T(e.offsetX || 0, e.offsetY || 0), this.depthOffset = (h = e.depthOffset) != null ? h : 0, this.sprite = e.sprite, this.container = e.container, this.cachedContainerBounds = (f = e.container) == null ? void 0 : f.getBounds(), this.geHeadless.directionChanged().pipe(xt(({ charId: d }) => d === this.charData.id)).subscribe(({ direction: d }) => {
      var P2;
      (P2 = this.animation) == null || P2.setStandingFrame(d);
    }), this.sprite && (this.sprite.setOrigin(0, 0), this.resetAnimation(this.sprite), this.updateOverlaySprite(), this.updateGridChar());
  }
  destroy() {
    this.destroy$.next(), this.destroy$.complete(), this.newSpriteSet$.complete();
  }
  setSprite(e) {
    e ? (this.sprite && (e.x = this.sprite.x, e.y = this.sprite.y), this.sprite = e, this.newSpriteSet$.next(), this.layerOverlaySprite = this.layerOverlaySprite ? this.scene.add.sprite(0, 0, this.sprite.texture) : void 0, this.updateOverlaySprite(), this.resetAnimation(this.sprite), this.updateDepth()) : (this.layerOverlaySprite = void 0, this.sprite = void 0);
  }
  getSprite() {
    return this.sprite;
  }
  getLayerOverlaySprite() {
    return this.layerOverlaySprite;
  }
  setContainer(e) {
    this.container = e, this.cachedContainerBounds = e == null ? void 0 : e.getBounds();
  }
  getContainer() {
    return this.container;
  }
  getOffsetX() {
    return this.customOffset.x;
  }
  setOffsetX(e) {
    this.customOffset.x = e;
  }
  getOffsetY() {
    return this.customOffset.y;
  }
  setOffsetY(e) {
    this.customOffset.y = e;
  }
  getWalkingAnimationMapping() {
    return this.walkingAnimationMapping;
  }
  turnTowards(e) {
    var r;
    this.geHeadless.isMoving(this.charData.id) || e != "none" && (this.geHeadless.turnTowards(this.charData.id, e), (r = this.animation) == null || r.setStandingFrame(e));
  }
  getAnimation() {
    return this.animation;
  }
  setAnimation(e) {
    this.animation = e;
  }
  update(e) {
    this.updateGridChar();
  }
  getDepthOffset() {
    return this.depthOffset;
  }
  getEngineOffset() {
    var o, s, u, h;
    if (!this.sprite) return T.ZERO;
    let e = this.tilemap.getTileWidth() / 2 - Math.floor(((s = (o = this.sprite) == null ? void 0 : o.displayWidth) != null ? s : 0) / 2), r = -((h = (u = this.sprite) == null ? void 0 : u.displayHeight) != null ? h : 0) + this.tilemap.getTileHeight();
    return new T(e, r);
  }
  updatePixelPos() {
    let e = new T(this.geHeadless.getPosition(this.charData.id));
    this.geHeadless.isCurrentMovementReverted(this.charData.id) && (e = new T(this.geHeadless.getTilePosInDirection(this.geHeadless.getPosition(this.charData.id), this.geHeadless.getCharLayer(this.charData.id), Pi(this.geHeadless.getFacingDirection(this.charData.id))).position));
    let r = this.geHeadless.getMovementProgress(this.charData.id) / 1e3, s = this.tilemap.tilePosToPixelPos(e).add(this.getEngineOffset()).add(this.customOffset).add(Wt(this.geHeadless.getFacingDirection(this.charData.id)).multiply(this.tilemap.getTileDistance(this.geHeadless.getFacingDirection(this.charData.id)).scalarMult(r))), u = this.getGameObj();
    u && (u.x = Math.floor(s.x), u.y = Math.floor(s.y));
  }
  getGameObj() {
    return this.container || this.sprite;
  }
  updateGridChar() {
    var e;
    if (this.updatePixelPos(), this.sprite && this.geHeadless.isMoving(this.charData.id)) {
      let r = this.geHeadless.getMovementProgress(this.charData.id) > Ge / 2;
      (e = this.getAnimation()) == null || e.updateCharacterFrame(this.geHeadless.getFacingDirection(this.charData.id), r, Number(this.sprite.frame.name));
    }
    this.updateDepth();
  }
  resetAnimation(e) {
    let r = new _i(this.walkingAnimationMapping, e.texture.source[0].width / e.width / _i.FRAMES_CHAR_ROW);
    this.setAnimation(r), r.frameChange().pipe(dt(this.newSpriteSet$)).subscribe((o) => {
      e == null || e.setFrame(o);
    }), r.setIsEnabled(this.walkingAnimationMapping !== void 0), r.setStandingFrame(this.geHeadless.getFacingDirection(this.charData.id));
  }
  updateOverlaySprite() {
    if (!this.layerOverlaySprite || !this.sprite) return;
    this.layerOverlaySprite.scale = this.sprite.scale;
    let e = this.tilemap.getTileHeight() / this.layerOverlaySprite.scale;
    this.layerOverlaySprite.setCrop(0, 0, this.layerOverlaySprite.displayWidth, this.sprite.height - e), this.layerOverlaySprite.setOrigin(0, 0);
  }
  updateDepth() {
    if (!this.getGameObj()) return;
    let r = new T(this.geHeadless.getPosition(this.charData.id)), o = this.geHeadless.getCharLayer(this.charData.id);
    this.container ? this.setContainerDepth(this.container, { position: r, layer: o }) : this.sprite && this.setSpriteDepth(this.sprite, { position: r, layer: o });
    let s = this.getLayerOverlaySprite();
    if (s) {
      let u = new T(Lt(q({}, r), { y: r.y - 1 }));
      this.setSpriteDepth(s, { position: u, layer: o });
    }
  }
  setSpriteDepth(e, r) {
    e.setDepth(this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(r)) + this.getPaddedPixelDepthSprite(e));
  }
  setContainerDepth(e, r) {
    e.setDepth(this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(r)) + this.getPaddedPixelDepthContainer(e));
  }
  getPaddedPixelDepthContainer(e) {
    var r, o, s, u;
    return yr.shiftPad(e.y + ((o = (r = this.cachedContainerBounds) == null ? void 0 : r.y) != null ? o : 0) + ((u = (s = this.cachedContainerBounds) == null ? void 0 : s.height) != null ? u : 0) + this.depthOffset, vr.Z_INDEX_PADDING);
  }
  getPaddedPixelDepthSprite(e) {
    return yr.shiftPad(e.y + e.displayHeight + this.depthOffset, vr.Z_INDEX_PADDING);
  }
  getTransitionLayer(e) {
    if (e.layer) return this.geHeadless.getTransition(e.position, e.layer) || e.layer;
  }
};
var hn = ((s) => (s.DONT_BLOCK = "DONT_BLOCK", s.BLOCK_TWO_TILES = "BLOCK_TWO_TILES", s.BLOCK_ONE_TILE_AHEAD = "BLOCK_ONE_TILE_AHEAD", s.BLOCK_ONE_TILE_BEHIND = "BLOCK_ONE_TILE_BEHIND", s))(hn || {});
var Hr = ((s) => (s.STOP = "STOP", s.CLOSEST_REACHABLE = "CLOSEST_REACHABLE", s.RETRY = "RETRY", s.ALTERNATIVE_TARGETS = "ALTERNATIVE_TARGETS", s))(Hr || {});
var fn = class {
  distance(e, r) {
    return ft.manhattanDistance(e, r);
  }
  direction(e, r) {
    if (ft.equal(e, r)) return "none";
    let o = e.clone().subtract(r);
    return Math.abs(o.x) > Math.abs(o.y) ? o.x > 0 ? "left" : "right" : o.y > 0 ? "up" : "down";
  }
  neighbors(e) {
    return [new T(e.x, e.y + 1), new T(e.x + 1, e.y), new T(e.x - 1, e.y), new T(e.x, e.y - 1)];
  }
  getDirections() {
    return ["up", "right", "down", "left"];
  }
};
var pn = class {
  distance(e, r) {
    return ft.chebyshevDistance(e, r);
  }
  neighbors(e) {
    let r = [new T(e.x, e.y + 1), new T(e.x + 1, e.y), new T(e.x - 1, e.y), new T(e.x, e.y - 1)], o = [new T(e.x + 1, e.y + 1), new T(e.x + 1, e.y - 1), new T(e.x - 1, e.y + 1), new T(e.x - 1, e.y - 1)];
    return [...r, ...o];
  }
  direction(e, r) {
    return r.x > e.x ? r.y > e.y ? "down-right" : r.y < e.y ? "up-right" : "right" : r.x < e.x ? r.y > e.y ? "down-left" : r.y < e.y ? "up-left" : "left" : r.y < e.y ? "up" : r.y > e.y ? "down" : "none";
  }
  getDirections() {
    return ["up", "right", "down", "left", "down-left", "down-right", "up-right", "up-left"];
  }
};
var le = class {
  static create(e) {
    switch (e) {
      case 4:
        return new fn();
      case 8:
        return new pn();
    }
  }
};
var Li = class {
  constructor(e, r, o) {
    this.backoffMs = e;
    this.maxRetries = r;
    this.onFinished = o;
    this.retries = 0;
    this.elapsed = 0;
  }
  retry(e, r) {
    this.shouldRetry() ? (this.elapsed += e, this.elapsed >= this.backoffMs && (this.elapsed = 0, this.retries++, r())) : this.onFinished();
  }
  reset() {
    this.retries = 0, this.elapsed = 0;
  }
  getMaxRetries() {
    return this.maxRetries;
  }
  getBackoffMs() {
    return this.backoffMs;
  }
  shouldRetry() {
    return this.maxRetries === -1 || this.retries < this.maxRetries;
  }
};
var Si = ((o) => (o.WAIT = "WAIT", o.RETRY = "RETRY", o.STOP = "STOP", o))(Si || {});
var xe = class {
  constructor(e, { shortestPathAlgorithm: r = "BFS", pathWidth: o = 1, pathHeight: s = 1, numberOfDirections: u = 4, isPositionAllowed: h = (tt, nt) => true, collisionGroups: f = [], ignoredChars: d = [], ignoreTiles: P2 = false, ignoreMapBounds: L2 = false, ignoreBlockedTarget: D = false, maxPathLength: J = 1 / 0, ignoreLayers: M = false, considerCosts: H = false, calculateClosestToTarget: k = true } = {}) {
    this.gridTilemap = e;
    this.options = { shortestPathAlgorithm: r, pathWidth: o, pathHeight: s, numberOfDirections: u, isPositionAllowed: h, collisionGroups: f, ignoredChars: d, ignoreTiles: P2, ignoreMapBounds: L2, ignoreBlockedTarget: D, maxPathLength: J, ignoreLayers: M, considerCosts: H, calculateClosestToTarget: k }, this.ignoredCharsSet = new Set(d);
  }
  findShortestPath(e, r) {
    this.options.ignoreLayers && (this.gridTilemap.fixCacheLayer(e.layer), r.layer = e.layer);
    let o = this.findShortestPathImpl(e, r);
    return this.gridTilemap.unfixCacheLayers(), o;
  }
  getNeighbors(e, r) {
    var h;
    return le.create((h = this.options.numberOfDirections) != null ? h : 4).neighbors(e.position).map((f) => {
      let d = e.layer;
      return this.options.ignoreLayers || (d = this.gridTilemap.getTransition(f, e.layer)), { position: f, layer: d || e.layer };
    }).filter((f) => !this.isBlocking(e, f) || this.options.ignoreBlockedTarget && V.equal(f, r));
  }
  getTransition(e, r) {
    if (!this.options.ignoreLayers) return this.gridTilemap.getTransition(e, r);
  }
  getCosts(e, r) {
    if (!this.options.considerCosts) return 1;
    let o = Pt(r.position, e);
    return this.gridTilemap.getTileCosts(r, o);
  }
  isBlocking(e, r) {
    return !(this.options.ignoreMapBounds || this.gridTilemap.isInRange(r.position)) || !this.options.isPositionAllowed(r.position, r.layer) || !this.options.ignoreTiles && this.hasBlockingTileFrom(e, r, this.options.pathWidth, this.options.pathHeight, this.options.ignoreMapBounds, this.gridTilemap) ? true : this.hasBlockingCharFrom(e, r, this.options.pathWidth, this.options.pathHeight, this.options.collisionGroups, this.ignoredCharsSet, this.gridTilemap);
  }
  distance(e, r) {
    return (this.options.numberOfDirections === 4 ? ft.manhattanDistance : ft.chebyshevDistance)(e, r);
  }
  getTilePosInDir(e, r) {
    return this.options.ignoreLayers ? { position: e.position.add(Wt(this.gridTilemap.toMapDirection(r))), layer: e.layer } : this.gridTilemap.getTilePosInDirection(e, r);
  }
  getReverseNeighbors(e, r) {
    var f;
    let s = le.create((f = this.options.numberOfDirections) != null ? f : 4).neighbors(e.position), u;
    if (!this.options.ignoreLayers) {
      let d = this.gridTilemap.getReverseTransitions(e.position, e.layer);
      u = d ? [...d] : void 0;
    }
    return s.map((d) => u ? u.map((P2) => ({ position: d, layer: P2 || e.layer })) : [{ position: d, layer: e.layer }]).flat().filter((d) => !this.isBlocking(d, e) || this.options.ignoreBlockedTarget && V.equal(e, r));
  }
  hasBlockingCharFrom(e, r, o, s, u, h, f) {
    if (o === 1 && s === 1) return f.hasBlockingChar(r.position, r.layer, u, h);
    let d = (L2) => f.hasBlockingChar(L2, r.layer, u, h), P2 = Pt(e.position, r.position);
    return this.isBlockingMultiTile(e, P2, o, s, d);
  }
  hasBlockingTileFrom(e, r, o, s, u, h) {
    if (o === 1 && s === 1) return h.hasBlockingTile(r.position, r.layer, Pt(r.position, e.position), u);
    let f = Pt(e.position, r.position), d = (P2) => h.hasBlockingTile(P2, r.layer, f, u);
    return this.isBlockingMultiTile(e, f, o, s, d);
  }
  isBlockingMultiTile(e, r, o, s, u) {
    let h = { src: new T(e.position.x + o, e.position.y), dest: new T(e.position.x + o, e.position.y + s - 1) }, f = { src: new T(e.position.x - 1, e.position.y), dest: new T(e.position.x - 1, e.position.y + s - 1) }, d = { src: new T(e.position.x, e.position.y - 1), dest: new T(e.position.x + o - 1, e.position.y - 1) }, P2 = { src: new T(e.position.x, e.position.y + s), dest: new T(e.position.x + o - 1, e.position.y + s) };
    switch (r) {
      case "right":
        return this.checkLine(h, u);
      case "left":
        return this.checkLine(f, u);
      case "up":
        return this.checkLine(d, u);
      case "down":
        return this.checkLine(P2, u);
      case "up-left":
        return this.checkLine({ src: d.src, dest: new T(d.dest.x - 1, d.dest.y) }, u) || this.checkLine({ src: new T(f.src.x, f.src.y - 1), dest: new T(f.dest.x, f.dest.y - 1) }, u);
      case "up-right":
        return this.checkLine({ src: new T(d.src.x + 1, d.src.y), dest: d.dest }, u) || this.checkLine({ src: new T(h.src.x, h.src.y - 1), dest: new T(h.dest.x, h.dest.y - 1) }, u);
      case "down-left":
        return this.checkLine({ src: new T(f.src.x, f.src.y + 1), dest: new T(f.dest.x, f.dest.y + 1) }, u) || this.checkLine({ src: P2.src, dest: new T(P2.dest.x - 1, P2.dest.y) }, u);
      case "down-right":
        return this.checkLine({ src: new T(P2.src.x + 1, P2.src.y), dest: P2.dest }, u) || this.checkLine({ src: new T(h.src.x, h.src.y + 1), dest: new T(h.dest.x, h.dest.y + 1) }, u);
    }
    return false;
  }
  checkLine(e, r) {
    for (let o = e.src.x; o <= e.dest.x; o++) for (let s = e.src.y; s <= e.dest.y; s++) if (r(new T(o, s))) return true;
    return false;
  }
};
var _a = Fo(th(), 1);
var La = Fo(ah(), 1);
var bh = Fo(fh(), 1);
var he = Fo(vh(), 1);
var Mi = _a.default.MinFibonacciHeap;
var zC = _a.default.MaxFibonacciHeap;
var $C = La.default.MinHeap;
var qC = La.default.MaxHeap;
var YC = bh.default.GeneralizedSuffixArray;
var XC = he.default.Uint8Vector;
var QC = he.default.Uint8ClampedVector;
var KC = he.default.Int8Vector;
var JC = he.default.Uint16Vector;
var ZC = he.default.Int16Vector;
var t_ = he.default.Uint32Vector;
var e_ = he.default.Int32Vector;
var r_ = he.default.Float32Vector;
var i_ = he.default.Float64Vector;
var o_ = he.default.PointerVector;
var Ai = 1e5;
var Th = 2 * Ai;
var vn = class extends xe {
  constructor(e, r = {}) {
    super(e, r), this.spatialWidth = Math.max(this.gridTilemap.getWidth() + 2 * Ai, Th);
    let o = Math.max(this.gridTilemap.getHeight() + 2 * Ai, Th);
    this.planeSize = this.spatialWidth * o;
  }
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "A_STAR" };
  }
  getNodeId(e) {
    let r = this.gridTilemap.getLayerIndex(e.layer), o = e.position.x + Ai, s = e.position.y + Ai;
    return r * this.planeSize + s * this.spatialWidth + o;
  }
  shortestPathBfs(e, r) {
    var D, J, M;
    let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), h = new Mi((H, k) => {
      var tt, nt;
      return ((tt = u.get(H.id)) != null ? tt : Number.MAX_VALUE) - ((nt = u.get(k.id)) != null ? nt : Number.MAX_VALUE);
    }), f = e, d = this.distance(e.position, r.position), P2 = 0, L2 = this.getNodeId(e);
    for (h.push({ node: e, id: L2 }), s.set(L2, 0), u.set(L2, this.distance(e.position, r.position)); h.size > 0; ) {
      let H = h.pop();
      if (!H) break;
      let k = H.node, tt = H.id;
      P2++;
      let nt = this.distance(k.position, r.position);
      if (nt < d && (d = nt, f = k), Ph(k, r)) return { previous: o, closestToTarget: f, steps: P2, maxPathLengthReached: false };
      if (((D = s.get(tt)) != null ? D : Number.MAX_VALUE) + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: f, steps: P2, maxPathLengthReached: true };
      for (let $t of this.getNeighbors(k, r)) {
        let bt2 = this.getNodeId($t), fe2 = ((J = s.get(tt)) != null ? J : Number.MAX_VALUE) + this.getCosts(k.position, $t);
        (!s.has(bt2) || fe2 < ((M = s.get(bt2)) != null ? M : Number.MAX_VALUE)) && (o.set(bt2, k), s.set(bt2, fe2), u.set(bt2, fe2 + this.distance($t.position, r.position)), h.push({ node: $t, id: bt2 }));
      }
    }
    return { previous: o, closestToTarget: f, steps: P2, maxPathLengthReached: false };
  }
  returnPath(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !Ph(u, r); ) {
      let h = this.getNodeId(u);
      if (u = e.get(h), !u) return [];
      s.push(u);
    }
    return s.reverse();
  }
};
function Ph(a3, e) {
  return ft.equal(a3.position, e.position) ? a3.layer === e.layer : false;
}
var bn = class {
  constructor(e) {
    this.data = e;
  }
};
var je = class {
  constructor() {
    this.sizeInternal = 0;
  }
  dequeue() {
    if (this.tail === void 0) return;
    this.sizeInternal--;
    let e = this.tail.data;
    return this.tail.prev === void 0 ? (this.tail = void 0, this.head = void 0, e) : (this.tail.prev.next = void 0, this.tail = this.tail.prev, e);
  }
  enqueue(e) {
    if (this.sizeInternal++, this.head === void 0) {
      this.head = new bn(e), this.tail = this.head;
      return;
    }
    let r = new bn(e);
    r.next = this.head, this.head.prev = r, this.head = r;
  }
  peek() {
    return this.tail ? this.tail.data : void 0;
  }
  peekAll() {
    let e = [], r = this.tail;
    for (; r; ) e.push(r.data), r = r.prev;
    return e;
  }
  clear() {
    this.head = void 0, this.tail = void 0, this.sizeInternal = 0;
  }
  peekEnd() {
    var e;
    return (e = this.head) == null ? void 0 : e.data;
  }
  size() {
    return this.sizeInternal;
  }
};
var zr = class extends xe {
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "BFS" };
  }
  equal(e, r) {
    return ft.equal(e.position, r.position) ? e.layer === r.layer : false;
  }
  shortestPathBfs(e, r) {
    let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), u = new je(), h = e, f = this.distance(e.position, r.position), d = 0;
    for (u.enqueue({ node: e, dist: 0 }), s.add(V.toString(e)); u.size() > 0; ) {
      let P2 = u.dequeue();
      if (d++, !P2) break;
      let { node: L2, dist: D } = P2;
      if (D > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: h, steps: d, maxPathLengthReached: true };
      let J = this.distance(L2.position, r.position);
      if (J < f && (f = J, h = L2), this.equal(L2, r)) return { previous: o, closestToTarget: h, steps: d, maxPathLengthReached: false };
      for (let M of this.getNeighbors(L2, r)) s.has(V.toString(M)) || (o.set(V.toString(M), L2), u.enqueue({ node: M, dist: D + 1 }), s.add(V.toString(M)));
    }
    return { previous: o, closestToTarget: h, steps: d, maxPathLengthReached: false };
  }
  returnPath(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !this.equal(u, r); ) {
      if (u = e.get(V.toString(u)), !u) return [];
      s.push(u);
    }
    return s.reverse();
  }
};
var Tn = class {
  constructor() {
    this.previous = /* @__PURE__ */ new Map();
    this.visited = /* @__PURE__ */ new Map();
    this.queue = new je();
    this.minMatching = 1 / 0;
    this.lastDist = 0;
  }
  isNewFrontier() {
    let e = this.queue.peek();
    return !!(e && e.dist > this.lastDist);
  }
  step(e, r, o) {
    var s;
    this.lastDist = o;
    for (let u of e) {
      let h = V.toString(u);
      if (!this.visited.has(h)) {
        this.previous.set(h, r), this.queue.enqueue({ node: u, dist: o + 1 }), this.visited.set(h, o + 1);
        let f = (s = this.otherBfs) == null ? void 0 : s.visited.get(h);
        f !== void 0 && f < this.minMatching && (this.minMatching = f, this.minMatchingNode = u);
      }
    }
  }
};
var Pn = class extends xe {
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, o.previous2, o.matchingPos, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "BIDIRECTIONAL_SEARCH" };
  }
  equal(e, r) {
    return ft.equal(e.position, r.position) ? e.layer === r.layer : false;
  }
  shortestPathBfs(e, r) {
    var d;
    if (V.equal(e, r)) return { previous: /* @__PURE__ */ new Map(), previous2: /* @__PURE__ */ new Map(), closestToTarget: e, steps: 0, maxPathLengthReached: false };
    let o = new Tn(), s = new Tn(), u = 0;
    o.otherBfs = s, s.otherBfs = o;
    let h = e, f = this.distance(e.position, r.position);
    for (o.queue.enqueue({ node: e, dist: 0 }), s.queue.enqueue({ node: r, dist: 0 }), o.visited.set(V.toString(e), 0), s.visited.set(V.toString(r), 0); this.shouldStop(o.queue.size() > 0, s.queue.size() > 0); ) {
      let P2 = o.queue.dequeue();
      if (!P2) break;
      let { node: L2, dist: D } = P2;
      if (D + 1 + (((d = s.queue.peek()) == null ? void 0 : d.dist) || 0) > this.options.maxPathLength) return { previous: o.previous, previous2: s.previous, closestToTarget: this.maybeClosestToTarget(h), steps: u, maxPathLengthReached: true };
      let J = this.distance(L2.position, r.position);
      if (J < f && (f = J, h = L2), u++, o.step(this.getNeighbors(L2, r), L2, D), o.isNewFrontier() && o.minMatchingNode) return { previous: o.previous, previous2: s.previous, closestToTarget: this.maybeClosestToTarget(r), matchingPos: o.minMatchingNode, steps: u, maxPathLengthReached: false };
      let M = s.queue.dequeue();
      if (!M) continue;
      let { node: H, dist: k } = M;
      if (u++, s.step(this.getReverseNeighbors(H, r), H, k), s.isNewFrontier() && s.minMatchingNode) return { previous: o.previous, previous2: s.previous, closestToTarget: this.maybeClosestToTarget(r), matchingPos: s.minMatchingNode, steps: u, maxPathLengthReached: false };
    }
    return { previous: o.previous, previous2: s.previous, closestToTarget: this.maybeClosestToTarget(h), steps: u, maxPathLengthReached: false };
  }
  shouldStop(e, r) {
    return this.options.calculateClosestToTarget ? e || r : e && r;
  }
  maybeClosestToTarget(e) {
    return this.options.calculateClosestToTarget ? e : void 0;
  }
  returnPath(e, r, o, s, u) {
    if (o) {
      let h = this.getPathFromPrev(e, s, o).reverse(), f = this.getPathFromPrev(r, u, o);
      return h.pop(), [...h, ...f];
    } else return this.getPathFromPrev(e, s, u).reverse();
  }
  getPathFromPrev(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !this.equal(u, r); ) {
      if (u = e.get(V.toString(u)), !u) return [];
      s.push(u);
    }
    return s;
  }
};
var $r = class extends xe {
  constructor(r, o = {}) {
    super(r, o);
    this.openSet = new Mi();
    this.g = /* @__PURE__ */ new Map();
    this.f = /* @__PURE__ */ new Map();
    this.closestToTarget = { position: new T(0, 0), layer: void 0 };
    this.smallestDistToTarget = 0;
    this.steps = 0;
    this.visits = [];
    this.maxFrontierSize = 0;
    this.maxJumpSize = 0;
  }
  findShortestPathImpl(r, o) {
    this.maxJumpSize = this.distance(r.position, o.position);
    let s = this.shortestPath(r, o);
    return { path: this.returnPath(s.previous, r, o), closestToTarget: s.closestToTarget, steps: s.steps, maxPathLengthReached: s.maxPathLengthReached, algorithmUsed: "JPS" };
  }
  shortestPath(r, o) {
    this.steps = 0;
    let s = /* @__PURE__ */ new Map();
    this.g = /* @__PURE__ */ new Map(), this.f = /* @__PURE__ */ new Map(), this.closestToTarget = r, this.smallestDistToTarget = this.distance(r.position, o.position), this.openSet = new Mi((h, f) => Ri(this.f, h) - Ri(this.f, f)), this.openSet.push(r);
    let u = V.toString(r);
    for (this.g.set(u, 0), this.f.set(u, this.distance(r.position, o.position)), this.maxFrontierSize = Math.max(this.maxFrontierSize, this.openSet.size); this.openSet.size > 0; ) {
      let h = this.openSet.pop();
      if (!h) break;
      if (this.steps++, V.equal(h, o)) return { previous: s, closestToTarget: o, steps: this.steps, maxPathLengthReached: false };
      if (Ri(this.g, h) + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: this.closestToTarget, steps: this.steps, maxPathLengthReached: true };
      this.updateClosestToTarget(h, o);
      for (let f of this.getNeighborsInternal(h, s.get(V.toString(h)), o)) {
        let d = V.toString(f.p), P2 = Ri(this.g, h) + f.dist;
        (!this.g.has(d) || P2 < Ri(this.g, f.p)) && (s.set(d, h), this.g.set(d, P2), this.f.set(d, P2 + this.distance(f.p.position, o.position)), this.openSet.push(f.p));
      }
    }
    return { previous: s, closestToTarget: this.closestToTarget, steps: this.steps, maxPathLengthReached: false };
  }
  updateClosestToTarget(r, o) {
    let s = this.distance(r.position, o.position);
    s < this.smallestDistToTarget && (this.smallestDistToTarget = s, this.closestToTarget = r);
  }
  addIfNotBlocked(r, o, s) {
    this.blockOrTrans(o, s) || r.push(s);
  }
  blockOrTrans(r, o) {
    return this.isBlocking(r, o) || this.getTransition(o.position, o.layer) !== void 0;
  }
  getNeighborsInternal(r, o, s) {
    if (!o || r.layer !== o.layer) return this.getNeighbors(r, s).map((f) => ({ p: f, dist: 1 }));
    let u = this.prune(o, r).filter((f) => !this.isBlockingIgnoreTarget(r, f, s)).map((f) => {
      let d = this.getTransition(f.position, r.layer);
      return { position: f.position, layer: d || r.layer };
    }), h = [];
    for (let f of u) if (this.isHorizontal(r.position, f.position)) h.push({ p: f, dist: 1 });
    else {
      let d = this.jump(r, f, s, 1, Pt(r.position, f.position));
      d && h.push(d);
    }
    return h;
  }
  isBlockingIgnoreTarget(r, o, s) {
    return this.isBlocking(r, o) && !(this.options.ignoreBlockedTarget && V.equal(o, s));
  }
  jump(r, o, s, u, h) {
    if (!this.isBlockingIgnoreTarget(r, o, s)) return V.equal(o, s) ? { p: o, dist: u } : u >= this.maxJumpSize ? { p: o, dist: u } : this.getTransition(o.position, r.layer) !== void 0 ? { p: o, dist: u } : this.hasForced(r, o) ? { p: o, dist: u } : (this.updateClosestToTarget(o, s), this.jump(o, this.getTilePosInDir(o, h), s, u + 1, h));
  }
  isHorizontal(r, o) {
    return r.y === o.y;
  }
  getForced(r, o, s, u, h, f) {
    let d = [], P2 = r;
    return (this.blockOrTrans(P2, s) || this.blockOrTrans(s, u)) && this.addIfNotBlocked(d, o, u), (this.blockOrTrans(P2, h) || this.blockOrTrans(h, f)) && this.addIfNotBlocked(d, o, f), d;
  }
  hasForced(r, o) {
    let { topLeft: s, downLeft: u, top: h, bottom: f } = this.normalizedPositions(r, o);
    return !!((this.blockOrTrans(r, u) || this.blockOrTrans(u, f)) && !this.blockOrTrans(o, f) || (this.blockOrTrans(r, s) || this.blockOrTrans(s, h)) && !this.blockOrTrans(o, h));
  }
  prune(r, o) {
    let { right: s, top: u, bottom: h, downLeft: f, topLeft: d } = this.normalizedPositions(r, o);
    return this.isHorizontal(r.position, o.position) ? [s, u, h] : [s, ...this.getForced(r, o, f, h, d, u)];
  }
  normalizedPositions(r, o) {
    return r.position.x < o.position.x ? { topLeft: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, top: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, bottom: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, right: { position: new T(o.position.x + 1, o.position.y), layer: o.layer } } : r.position.x > o.position.x ? { topLeft: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, top: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, bottom: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, right: { position: new T(o.position.x - 1, o.position.y), layer: o.layer } } : r.position.y < o.position.y ? { topLeft: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, top: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, bottom: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, right: { position: new T(o.position.x, o.position.y + 1), layer: o.layer } } : { topLeft: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, top: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, bottom: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, right: { position: new T(o.position.x, o.position.y - 1), layer: o.layer } };
  }
  posInDir(r, o) {
    return { position: r.position.add(Wt(o)), layer: r.layer };
  }
  returnPath(r, o, s) {
    let u = [], h = s;
    for (u.push(h); !V.equal(h, o); ) {
      let f = r.get(V.toString(h));
      if (!f) return [];
      this.distance(f.position, h.position) > 1 ? this.fillPath(h, f, u) : u.push(f), h = f;
    }
    return u.reverse();
  }
  fillPath(r, o, s) {
    let u = r;
    do {
      let h = Pt(u.position, o.position);
      u = this.getTilePosInDir(u, h), s.push(u);
    } while (!ft.equal(u.position, o.position));
  }
};
function Ri(a3, e) {
  var r;
  return (r = a3.get(V.toString(e))) != null ? r : Number.MAX_VALUE;
}
var xn = class {
  constructor(e, r, o, s = {}) {
    this.character = e;
    this.gridTilemap = r;
    this.charToFollow = o;
    let u = { distance: 0, noPathFoundStrategy: "STOP", maxPathLength: 1 / 0, shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH", ignoreLayers: false, considerCosts: s.considerCosts || false, facingDirection: "none", isPositionAllowedFn: () => true, ignoredChars: [] };
    this.options = q(q({}, u), s), this.options.considerCosts && this.options.shortestPathAlgorithm !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.options.shortestPathAlgorithm}'. It can only be used with A* algorithm.`), this.options.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1) && console.warn("GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1");
  }
  init() {
    this.updateTarget(this.charToFollow.getTilePos().position, this.charToFollow.getTilePos().layer), this.charToFollow.positionChangeStarted().pipe(dt(this.character.autoMovementSet().pipe(xt((e) => e !== this), wt(1)))).subscribe(({ enterTile: e, enterLayer: r }) => {
      this.updateTarget(e, r);
    });
  }
  update(e) {
    var r;
    (r = this.targetMovement) == null || r.update(e);
  }
  getInfo() {
    return { type: "Follow", config: { charToFollow: this.charToFollow.getId(), distance: this.options.distance, noPathFoundStrategy: this.options.noPathFoundStrategy, maxPathLength: this.options.maxPathLength, ignoreLayers: this.options.ignoreLayers, facingDirection: this.options.facingDirection, shortestPathAlgorithm: this.options.shortestPathAlgorithm, considerCosts: this.options.considerCosts, isPositionAllowedFn: this.options.isPositionAllowedFn, ignoredChars: this.options.ignoredChars } };
  }
  getFacingPos() {
    let e = bi[this.options.facingDirection] + bi[this.charToFollow.getFacingDirection()], r = ko("up", e), o = { x: this.charToFollow.getTilePos().position.x, y: this.charToFollow.getTilePos().position.y };
    return r === "right" ? o.x += this.charToFollow.getTileWidth() - 1 : r === "down" ? o.y += this.charToFollow.getTileWidth() - 1 : r === "down-left" ? o.y += this.charToFollow.getTileWidth() - 1 : r === "down-right" ? (o.y += this.charToFollow.getTileWidth() - 1, o.x += this.charToFollow.getTileWidth() - 1) : r === "up-right" && (o.x += this.charToFollow.getTileWidth() - 1), this.gridTilemap.getTilePosInDirection({ position: new T(o), layer: this.charToFollow.getTilePos().layer }, r).position;
  }
  updateTarget(e, r) {
    let o = this.options.facingDirection !== "none" && this.options.distance === 0;
    o && (e = this.getFacingPos()), this.targetMovement = new qr(this.character, this.gridTilemap, { position: new T(e), layer: r }, { distance: o ? 0 : this.options.distance + 1, config: { algorithm: this.options.shortestPathAlgorithm, noPathFoundStrategy: this.options.noPathFoundStrategy, maxPathLength: this.options.maxPathLength, ignoreLayers: this.options.ignoreLayers, considerCosts: this.options.considerCosts, ignoredChars: [this.charToFollow.getId(), ...this.options.ignoredChars], isPositionAllowedFn: this.options.isPositionAllowedFn } }), this.targetMovement.init();
  }
};
var Fi = class {
  static getRandomInt(e) {
    return Math.floor(Math.random() * Math.floor(e));
  }
};
var wn = class {
  constructor(e, r = 0, o = -1) {
    this.character = e;
    this.delay = r;
    this.radius = o;
    this.stepSize = 0;
    this.delayLeft = this.delay, this.initialRow = e.getNextTilePos().position.y, this.initialCol = e.getNextTilePos().position.x, this.randomizeStepSize(), this.stepsWalked = 0, this.currentMovementDirection = "none", this.character.positionChangeStarted().pipe(dt(this.character.autoMovementSet().pipe(xt((s) => s !== this), wt(1)))).subscribe(() => {
      this.stepsWalked++;
    }), this.distanceUtils = le.create(e.getNumberOfDirections());
  }
  init() {
  }
  update(e) {
    if (this.shouldContinueWalkingCurrentDirection()) this.character.move(this.currentMovementDirection);
    else if (this.delayLeft -= e, this.delayLeft <= 0) {
      this.delayLeft = this.delay;
      let r = this.getFreeRandomDirection();
      this.stepsWalked = 0, this.character.move(r), this.currentMovementDirection = r, this.randomizeStepSize();
    }
  }
  getInfo() {
    return { type: "Random", config: { delay: this.delay, radius: this.radius } };
  }
  shouldContinueWalkingCurrentDirection() {
    return this.stepsWalked < this.stepSize && this.currentMovementDirection !== "none" && !this.character.isBlockingDirection(this.currentMovementDirection) && this.isWithinRadius(this.currentMovementDirection);
  }
  getFreeDirections() {
    return this.distanceUtils.getDirections().filter((r) => !this.character.isBlockingDirection(r)).filter((r) => this.isWithinRadius(r));
  }
  isWithinRadius(e) {
    return this.radius == -1 ? true : this.getDist(e) <= this.radius;
  }
  getDist(e) {
    return this.distanceUtils.distance(this.character.getNextTilePos().position.add(Wt(e)), new T(this.initialCol, this.initialRow));
  }
  getFreeRandomDirection() {
    let e = this.getFreeDirections();
    return e.length == 0 ? "none" : e[Fi.getRandomInt(e.length)];
  }
  randomizeStepSize() {
    this.stepSize = Fi.getRandomInt(this.radius) + 1;
  }
};
function xh(a3, e) {
  return a3.filter((r) => {
    var o, s, u, h, f, d;
    return (o = e.labels) != null && o.withAllLabels ? (s = e.labels) == null ? void 0 : s.withAllLabels.every((P2) => r.hasLabel(P2)) : (u = e.labels) != null && u.withOneOfLabels ? (h = e.labels) == null ? void 0 : h.withOneOfLabels.some((P2) => r.hasLabel(P2)) : (f = e.labels) != null && f.withNoneLabels ? !((d = e.labels) != null && d.withNoneLabels.some((P2) => r.hasLabel(P2))) : true;
  });
}
var Cn = { name: "grid-engine", version: "2.52.1", description: "Phaser3 plugin for grid based movement on a 2D game board.", author: "Johannes Baum", license: "Apache-2.0", main: "dist/GridEngine.min.cjs", module: "dist/GridEngine.esm.min.js", type: "module", scripts: { test: "jest", dev: "prettier --write src/ && eslint src/", "build-web": "esbuild src/main-iife.ts --bundle --minify --alias:phaser=./src/phaser-shim.js --target=es2016 --outfile=dist/GridEngine.min.js", "build-esm": "esbuild src/main-esm.ts --bundle --minify --format=esm --external:phaser --target=es2016 --outfile=dist/GridEngine.esm.min.js", "build-cjs": "esbuild src/main-esm.ts --bundle  --minify --format=cjs --external:phaser --target=node18 --platform=node --outfile=dist/GridEngine.min.cjs", "build-types": "tsc -p tsconfig.emit-cjs.json && tsc -p tsconfig.emit-esm.json", build: "npm run build-web && npm run build-esm && npm run build-cjs && npm run build-types && node createPackageJsons.cjs", "build-speedtest": "esbuild speedtests/run.ts --bundle --format=cjs --target=node18 --platform=node --outfile=speedtests/run.cjs", lint: "eslint .", serve: "esbuild src/main-iife.ts --servedir=serve --outfile=serve/js/GridEngine.js --bundle --target=es2016 --alias:phaser=./src/phaser-shim.js", docs: "typedoc src/GridEngine.ts --excludePrivate --excludeProtected --readme none --excludeInternal --out docs/public/api --sort kind --sort alphabetical --categorizeByGroup false", "docs:dev": "vitepress dev docs", "docs:build": "vitepress build docs", "docs:preview": "vitepress preview docs" }, exports: { ".": { require: { types: "./dist/cjs/src/main-esm.d.ts", default: "./dist/GridEngine.min.cjs" }, import: { types: "./dist/mjs/src/main-esm.d.ts", default: "./dist/GridEngine.esm.min.js" } } }, files: ["dist"], types: "dist/mjs/src/main-esm.d.ts", dependencies: { mnemonist: "^0.40.3", rxjs: "^7.8.2", "tiled-property-flattener": "^1.1.1" }, peerDependencies: { phaser: "~4.0.0" }, devDependencies: { "@babel/core": "^7.28.5", "@babel/preset-env": "^7.28.5", "@eslint/eslintrc": "^3.3.3", "@eslint/js": "^9.39.4", "@stryker-mutator/core": "^9.4.0", "@stryker-mutator/jest-runner": "^9.4.0", "@types/jest": "^30.0.0", "@typescript-eslint/eslint-plugin": "^8.50.0", "@typescript-eslint/parser": "8.58.2", "babel-jest": "^30.2.0", canvas: "^3.2.0", "csv-parse": "^6.2.1", esbuild: "^0.28.0", eslint: "^9.39.4", "eslint-config-prettier": "^10.1.8", "eslint-plugin-jest": "^29.5.0", jest: "^30.2.0", "jest-environment-jsdom": "^30.3.0", phaser: "~4.0.0", phaser3spectorjs: "^0.0.8", prettier: "3.8.2", "random-js": "^2.1.0", "ts-jest": "^29.4.6", typedoc: "^0.28.15", typescript: "^6.0.2", vitepress: "^1.6.4", vue: "^3.5.26", "vue-chartjs": "^5.3.3" }, repository: { type: "git", url: "git+https://github.com/Annoraaq/grid-engine.git" }, bugs: { url: "https://github.com/Annoraaq/grid-engine/issues" }, homepage: "https://github.com/Annoraaq/grid-engine#readme", keywords: ["Phaser", "RPG", "2D", "Movement", "Grid", "Pathfinding", "Tile"] };
var _n = class {
  constructor(e, r) {
    this.collistionStrategy = e;
    this.collisionGroupRelation = r;
    this.tilePosToCharacters = new Sa();
    this.charRemoved$ = new K();
  }
  isCharBlockingAt(e, r, o, s = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set()) {
    if (o.length === 0) return false;
    let h = this.tilePosToCharacters.get(e, r);
    return !!(h && h.size > 0 && [...h].filter((f) => !s.has(f.getId())).filter((f) => !this.doIntersect(f.getCollisionGroups(), u)).some((f) => o.some((d) => f.getCollisionGroups().some((P2) => this.collidesWith(d, P2)))));
  }
  doIntersect(e, r) {
    for (let o of e) if (r.has(o)) return true;
    return false;
  }
  collidesWith(e, r) {
    return this.collisionGroupRelation ? (this.collisionGroupRelation.get(e) || /* @__PURE__ */ new Set()).has(r) : e === r;
  }
  getCharactersAt(e, r) {
    return this.tilePosToCharacters.get(e, r) || /* @__PURE__ */ new Set();
  }
  addCharacter(e) {
    this.addTilePositions(e.getTilePos(), e), this.addTilePositions(e.getNextTilePos(), e), this.addPositionChangeSub(e), this.addPositionChangeFinishedSub(e), this.addTilePosSetSub(e);
  }
  removeCharacter(e) {
    let r = e.getId();
    this.charRemoved$.next(r), this.deleteTilePositions(e.getTilePos(), e), this.deleteTilePositions(e.getNextTilePos(), e);
  }
  add(e, r, o) {
    let s = this.tilePosToCharacters.get(e, r);
    s || this.tilePosToCharacters.set(e, r, /* @__PURE__ */ new Set([o])), s == null || s.add(o);
  }
  addTilePosSetSub(e) {
    e.tilePositionSet().pipe(dt(this.charRemoved(e.getId()))).subscribe((r) => {
      this.deleteTilePositions(e.getNextTilePos(), e), this.addTilePositions(r, e);
    });
  }
  charRemoved(e) {
    var r;
    return (r = this.charRemoved$) == null ? void 0 : r.pipe(wt(1), xt((o) => o == e));
  }
  addPositionChangeSub(e) {
    e.positionChangeStarted().pipe(dt(this.charRemoved(e.getId())), this.posChangeToLayerPos()).subscribe((r) => {
      this.collistionStrategy === "BLOCK_ONE_TILE_AHEAD" && this.deleteTilePositions(r.exit, e), this.addTilePositions(r.enter, e);
    });
  }
  addPositionChangeFinishedSub(e) {
    e.positionChangeFinished().pipe(dt(this.charRemoved(e.getId())), this.posChangeToLayerPos()).subscribe((r) => {
      this.deleteTilePositions(r.exit, e), this.addTilePositions(r.enter, e);
    });
  }
  addTilePositions(e, r) {
    this.forEachCharTile(e, r, (o, s) => {
      this.add(new T(o, s), e.layer, r);
    });
  }
  deleteTilePositions(e, r) {
    this.forEachCharTile(e, r, (o, s) => {
      var u;
      (u = this.tilePosToCharacters.get(new T(o, s), e.layer)) == null || u.delete(r);
    });
  }
  forEachCharTile(e, r, o) {
    let s = e.position;
    for (let u = s.x; u < s.x + r.getTileWidth(); u++) for (let h = s.y; h < s.y + r.getTileHeight(); h++) o(u, h);
  }
  posChangeToLayerPos() {
    return la(Pe((e) => ({ enter: { position: new T(e.enterTile), layer: e.enterLayer }, exit: { position: new T(e.exitTile), layer: e.exitLayer } })));
  }
  posToString(e, r) {
    return `${e.x}#${e.y}#${r}`;
  }
};
var Sa = class {
  constructor() {
    this.memo = /* @__PURE__ */ new Map();
  }
  set(e, r, o) {
    let s = this.memo.get(e.x);
    s || (s = /* @__PURE__ */ new Map(), this.memo.set(e.x, s));
    let u = s.get(e.y);
    u || (u = /* @__PURE__ */ new Map(), s.set(e.y, u)), u.set(r, o);
  }
  get(e, r) {
    let o = this.memo.get(e.x);
    if (!o) return;
    let s = o.get(e.y);
    if (s) return s.get(r);
  }
};
var rr = class {
  constructor(e, r, o, s) {
    this.x = e;
    this.y = r;
    this.width = o;
    this.height = s;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  isInRange(e) {
    return e.x >= this.x && e.x < this.x + this.width && e.y >= this.y && e.y < this.y + this.height;
  }
};
var Yr = "ge_charLayer";
var wh = 0;
var ET = 1;
var Oa = { none: 1, left: 2, "up-left": 3, up: 4, "up-right": 5, right: 6, "down-right": 7, down: 8, "down-left": 9 };
var Sn = class {
  constructor(e, r) {
    this.tilemap = e;
    this.gridTilemap = r;
    this.tileCollisionCache = /* @__PURE__ */ new Map();
  }
  fixLayer(e) {
    this.fixedLayer = this.tileCollisionCache.get(e);
  }
  unfixLayers() {
    this.fixedLayer = void 0;
  }
  rebuild(e) {
    e || (e = new rr(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight()));
    let r = this.tilemap.getLayers().filter((o) => o.isCharLayer());
    for (let o of [...r, void 0]) {
      let s = this.tileCollisionCache.get(o == null ? void 0 : o.getName());
      if (s === void 0) {
        s = new Array(this.tilemap.getWidth());
        for (let u = 0; u < this.tilemap.getWidth(); u++) s[u] = new Array(this.tilemap.getHeight());
        this.tileCollisionCache.set(o == null ? void 0 : o.getName(), s);
      }
      for (let u = e.getY(); u < e.getY() + e.getHeight(); u++) for (let h = e.getX(); h < e.getX() + e.getWidth(); h++) {
        let f = 0;
        !this.gridTilemap.hasNoTileUncached(new T(h, u), o == null ? void 0 : o.getName()) && (f = Ea(f, 0));
        for (let L2 of Ti()) this.gridTilemap.hasBlockingTileUncached(new T(h, u), o == null ? void 0 : o.getName(), L2, true) && (f = Ea(f, Oa[L2]));
        this.gridTilemap.hasBlockingTileUncached(new T(h, u), o == null ? void 0 : o.getName(), void 0, true) && (f = Ea(f, Oa.none)), s[h][u] = f;
      }
    }
  }
  hasTileAt(e, r, o) {
    var h;
    let s = this.fixedLayer || this.tileCollisionCache.get(o), u = (h = s == null ? void 0 : s[e]) == null ? void 0 : h[r];
    if (u !== void 0) return Ln(u, wh);
  }
  isBlockingFrom(e, r, o, s, u) {
    var d;
    let h = this.fixedLayer || this.tileCollisionCache.get(o), f = (d = h == null ? void 0 : h[e]) == null ? void 0 : d[r];
    if (f !== void 0) return !u && !Ln(f, wh) ? true : s === void 0 ? Ln(f, ET) : Ln(f, Oa[s]);
  }
};
function Ea(a3, e) {
  return a3 | 1 << e;
}
function Ln(a3, e) {
  return (a3 >> e & 1) == 1;
}
var Ch = "ge_cost";
var En = class En2 {
  constructor(e, r, o, s = void 0, u = false) {
    this.tilemap = e;
    this.collisionTilePropertyName = r;
    this.useTileCollisionCache = u;
    this.characters = /* @__PURE__ */ new Map();
    this.transitions = /* @__PURE__ */ new Map();
    this.reverseTransitions = /* @__PURE__ */ new Map();
    this.collidesPropNames = /* @__PURE__ */ new Map();
    this.tileCostPropNames = /* @__PURE__ */ new Map();
    this.collisionRelevantLayersFrameCache = /* @__PURE__ */ new Map();
    this.charBlockCache = new _n(o, s);
    for (let h of Ti()) this.collidesPropNames.set(h, En2.ONE_WAY_COLLIDE_PROP_PREFIX + h), this.tileCostPropNames.set(h, `${Ch}_${h}`);
    this.useTileCollisionCache && (this.tileCollisionCache = new Sn(e, this), this.tileCollisionCache.rebuild());
  }
  fixCacheLayer(e) {
    var r;
    (r = this.tileCollisionCache) == null || r.fixLayer(e);
  }
  unfixCacheLayers() {
    var e;
    (e = this.tileCollisionCache) == null || e.unfixLayers();
  }
  addCharacter(e) {
    this.characters.set(e.getId(), e);
    let r = e.getNextTilePos().layer;
    r === void 0 ? e.setTilePosition(Lt(q({}, e.getNextTilePos()), { layer: this.getLowestCharLayer() })) : this.getCharLayerNames().includes(r) || console.warn(`Char layer '${r}' of character '${e.getId()}' is unknown.`), this.charBlockCache.addCharacter(e);
  }
  removeCharacter(e) {
    let r = this.characters.get(e);
    r && (this.charBlockCache.removeCharacter(r), this.characters.delete(e));
  }
  getCharacters() {
    return [...this.characters.values()];
  }
  getCharactersAt(e, r) {
    return this.charBlockCache.getCharactersAt(e, r);
  }
  rebuildTileCollisionCache(e) {
    var r;
    (r = this.tileCollisionCache) == null || r.rebuild(e);
  }
  hasBlockingTileUncached(e, r, o, s) {
    if (!s && this.hasNoTileUncached(e, r)) return true;
    let u = this.getCollisionRelevantLayers(r);
    for (let h of u) if (this.isLayerBlockingAt(h.getName(), e, o)) return true;
    return false;
  }
  hasBlockingTile(e, r, o, s) {
    var h;
    let u = (h = this.tileCollisionCache) == null ? void 0 : h.isBlockingFrom(e.x, e.y, r, o, s);
    return u !== void 0 ? u : this.hasBlockingTileUncached(e, r, o, s);
  }
  getTransition(e, r) {
    let o = this.transitions.get(e.toString());
    if (o) return o.get(r);
  }
  getReverseTransitions(e, r) {
    let o = this.reverseTransitions.get(e.toString());
    if (o) return o.get(r);
  }
  setTransition(e, r, o) {
    var s, u, h, f, d;
    this.transitions.has(e.toString()) || this.transitions.set(e.toString(), /* @__PURE__ */ new Map()), this.reverseTransitions.has(e.toString()) || this.reverseTransitions.set(e.toString(), /* @__PURE__ */ new Map()), (s = this.transitions.get(e.toString())) == null || s.set(r, o), (u = this.reverseTransitions.get(e.toString())) != null && u.has(o) || (h = this.reverseTransitions.get(e.toString())) == null || h.set(o, /* @__PURE__ */ new Set()), (d = (f = this.reverseTransitions.get(e.toString())) == null ? void 0 : f.get(o)) == null || d.add(r);
  }
  getTransitions() {
    return new Map([...this.transitions].map(([e, r]) => [e, new Map(r)]));
  }
  getTileCosts(e, r) {
    let o = this.getCollisionRelevantLayers(e.layer), s = 1;
    for (let u of o) s = Math.max(s, this.getTileCostsForLayer(Lt(q({}, e), { layer: u.getName() }), r));
    return s;
  }
  getTileCostsForLayer(e, r) {
    let o = this.tilemap.getTileAt(e.position.x, e.position.y, e.layer);
    return r && (o == null ? void 0 : o.getProperty(this.tileCostPropNames.get(r) || "")) || (o == null ? void 0 : o.getProperty(Ch)) || 1;
  }
  hasNoTileUncached(e, r) {
    return !this.getCollisionRelevantLayers(r).some((s) => this.tilemap.hasTileAt(e.x, e.y, s.getName()));
  }
  hasNoTile(e, r) {
    var s;
    let o = (s = this.tileCollisionCache) == null ? void 0 : s.hasTileAt(e.x, e.y, r);
    return o !== void 0 ? o : this.hasNoTileUncached(e, r);
  }
  hasBlockingChar(e, r, o, s = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set()) {
    return this.charBlockCache.isCharBlockingAt(e, r, o, s, u);
  }
  isInRange(e) {
    return new rr(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight()).isInRange(e);
  }
  toMapDirection(e) {
    return this.isIsometric() ? Pl(e) : e;
  }
  fromMapDirection(e) {
    return this.isIsometric() ? ko(e) : e;
  }
  isIsometric() {
    return this.tilemap.getOrientation() === "isometric";
  }
  getTilePosInDirection(e, r) {
    let o = e.position.add(Wt(this.toMapDirection(r))), s = this.getTransition(o, e.layer) || e.layer;
    return { position: o, layer: s };
  }
  invalidateFrameCache() {
    this.collisionRelevantLayersFrameCache.clear(), this.charLayerIndices = void 0;
  }
  isLayerBlockingAt(e, r, o) {
    let s = this.tilemap.getTileAt(r.x, r.y, e);
    return s ? !!(s.getProperty(this.collisionTilePropertyName) || o && s.getProperty(this.collidesPropNames.get(o) || "")) : false;
  }
  getCharLayerIndexes() {
    return this.tilemap.getLayers().map((e, r) => ({ layer: e, index: r })).filter(({ layer: e }) => e.isCharLayer()).map(({ index: e }) => e);
  }
  findPrevAndCharLayer(e) {
    let r = this.getCharLayerIndexes(), o = this.tilemap.getLayers(), s = r.findIndex((u) => o[u].getProperty(Yr) == e);
    return s == 0 ? { prevIndex: -1, charLayerIndex: r[s] } : { prevIndex: r[s - 1], charLayerIndex: r[s] };
  }
  getCollisionRelevantLayers(e) {
    if (!e) return this.tilemap.getLayers();
    let r = this.collisionRelevantLayersFrameCache.get(e);
    if (r) return r;
    let { prevIndex: o, charLayerIndex: s } = this.findPrevAndCharLayer(e), u = this.tilemap.getLayers().slice(o + 1, s + 1);
    return this.collisionRelevantLayersFrameCache.set(e, u), u;
  }
  getLowestCharLayer() {
    for (let e of this.tilemap.getLayers()) if (e.isCharLayer()) return e.getProperty(Yr);
  }
  getWidth() {
    return this.tilemap.getWidth();
  }
  getHeight() {
    return this.tilemap.getHeight();
  }
  getLayerIndex(e) {
    var r;
    if (!e) return 0;
    if (!this.charLayerIndices) {
      this.charLayerIndices = /* @__PURE__ */ new Map();
      let o = this.getCharLayerNames();
      for (let s = 0; s < o.length; s++) this.charLayerIndices.set(o[s], s + 1);
    }
    return (r = this.charLayerIndices.get(e)) != null ? r : 0;
  }
  getCharLayerNames() {
    return this.tilemap.getLayers().filter((e) => e.isCharLayer()).map((e) => e.getProperty(Yr)).filter(DT);
  }
};
En.ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
var On = En;
function DT(a3) {
  return a3 != null;
}
var Da = ((r) => (r.REMOVED = "REMOVED", r.ADDED = "ADDED", r))(Da || {});
var _h = ((o) => (o.WAIT = "WAIT", o.SKIP = "SKIP", o.STOP = "STOP", o))(_h || {});
var Dn = class {
  constructor(e, r) {
    this.character = e;
    this.tilemap = r;
    this.queue = new je();
    this.finished$ = new K();
    this.pathBlockedWaitElapsed = 0;
    this.distanceUtils = le.create(e.getNumberOfDirections());
  }
  init() {
    this.character.autoMovementSet().pipe(xt((e) => e !== this), wt(1)).subscribe(() => {
      this.queue.size() > 0 && this.finishMovementTerminated(), this.finished$.complete();
    });
  }
  update(e) {
    (!this.character.isMoving() || this.character.willCrossTileBorderThisUpdate(e)) && this.queue.size() > 0 && this.moveCharOnPath(e);
  }
  getInfo() {
    return { type: "Queue" };
  }
  enqueue(e, r = {}) {
    var s, u, h;
    let o = { pathBlockedStrategy: (s = r.pathBlockedStrategy) != null ? s : "STOP", pathBlockedWaitTimeoutMs: (r == null ? void 0 : r.pathBlockedWaitTimeoutMs) || -1, ignoreInvalidPositions: (u = r.ignoreInvalidPositions) != null ? u : false, skipInvalidPositions: (h = r.skipInvalidPositions) != null ? h : false };
    for (let f of e) {
      let d = { command: f, config: o };
      if (Je(f)) {
        this.queue.enqueue(d);
        continue;
      }
      let P2 = this.queue.peekEnd(), L2 = P2 == null ? void 0 : P2.command;
      if (L2 || (L2 = this.character.getNextTilePos()), Je(L2)) {
        this.queue.enqueue(d);
        continue;
      }
      let D = this.distanceUtils.distance(L2.position, f.position) === 1;
      (!r.ignoreInvalidPositions || D) && this.queue.enqueue(d);
    }
  }
  peekAll() {
    return this.queue.peekAll();
  }
  size() {
    return this.queue.size();
  }
  finished() {
    return this.finished$;
  }
  clear() {
    this.queue.clear();
  }
  moveCharOnPath(e) {
    let r = this.queue.peek();
    if (!r) return;
    let o = r.command, s = r.config;
    if (Je(o) && (o = this.tilemap.getTilePosInDirection(this.character.getNextTilePos(), o)), s.skipInvalidPositions) {
      if (o = this.getNextValidPosition(), !o) {
        this.finishInvalidNextPos(o);
        return;
      }
    } else if (!this.isNeighborPos(o)) {
      this.finishInvalidNextPos(o);
      return;
    }
    if (this.character.isBlockingDirection(Pt(this.character.getNextTilePos().position, o.position))) {
      if (s.pathBlockedStrategy === "STOP") this.finishPathBlocked(o);
      else if (s.pathBlockedStrategy === "SKIP") {
        this.queue.dequeue(), this.moveCharOnPath(e);
        return;
      } else s.pathBlockedStrategy === "WAIT" && s.pathBlockedWaitTimeoutMs > -1 && (this.pathBlockedWaitElapsed += e, this.pathBlockedWaitElapsed >= s.pathBlockedWaitTimeoutMs && this.finishBlockedWaitTimeout(o, s.pathBlockedWaitTimeoutMs));
      return;
    }
    this.pathBlockedWaitElapsed = 0, this.queue.dequeue(), this.character.move(this.getDir(this.character.getNextTilePos().position, o.position)), this.isLastMovement() && this.finish("SUCCESS", "", o);
  }
  getNextValidPosition() {
    var e;
    for (; this.queue.size() > 0; ) {
      let r = (e = this.queue.peek()) == null ? void 0 : e.command;
      if (Je(r) && (r = this.tilemap.getTilePosInDirection(this.character.getNextTilePos(), r)), r && this.isNeighborPos(r)) return r;
      this.queue.dequeue();
    }
  }
  isLastMovement() {
    return this.queue.size() === 0;
  }
  isNeighborPos(e) {
    let r = this.distanceUtils.distance(this.character.getNextTilePos().position, e.position) === 1, o = this.tilemap.getTransition(e.position, this.character.getNextTilePos().layer);
    if (this.character.getNextTilePos().layer !== e.layer) return r && o === e.layer;
    let s = o !== void 0 && o !== e.layer;
    return r && !s;
  }
  finishMovementTerminated() {
    this.finish("MOVEMENT_TERMINATED", "New automatic movement has been set to character.");
  }
  finishInvalidNextPos(e) {
    e ? this.finish("INVALID_NEXT_POS", `Position ${this.posToStr(e)} is not reachable from ${this.posToStr(this.character.getNextTilePos())}.`) : this.finish("INVALID_NEXT_POS", `No enqueued position is reachable from ${this.posToStr(this.character.getNextTilePos())}.`);
  }
  finishPathBlocked(e) {
    this.finish("PATH_BLOCKED", `Position ${this.posToStr(e)} is blocked.`);
  }
  finishBlockedWaitTimeout(e, r) {
    this.finish("PATH_BLOCKED_WAIT_TIMEOUT", `Position ${this.posToStr(e)} is blocked and the wait timeout of ${r} ms has been exceeded.`);
  }
  finish(e, r = "", o = this.character.getNextTilePos()) {
    this.queue = new je(), this.finished$.next({ position: o.position, result: e, description: r, layer: o.layer });
  }
  getDir(e, r) {
    return this.tilemap.fromMapDirection(Pt(e, r));
  }
  posToStr(e) {
    return `(${e.position.x}, ${e.position.y}, ${e.layer})`;
  }
};
var IT = Cn.version;
var In = class {
  constructor(e = true) {
    this.isCreatedInternal = false;
    e && console.log(`Using GridEngine v${IT}`);
  }
  getCharLayer(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getTilePos().layer;
  }
  getTransition(e, r) {
    var o;
    return this.initGuard(), (o = this.gridTilemap) == null ? void 0 : o.getTransition(new T(e), r);
  }
  setTransition(e, r, o) {
    var s;
    return this.initGuard(), (s = this.gridTilemap) == null ? void 0 : s.setTransition(new T(e), r, o);
  }
  create(e, r) {
    this.isCreatedInternal = true, this.gridCharacters = /* @__PURE__ */ new Map();
    let o = this.setConfigDefaults(r);
    this.config = o, this.movementStopped$ = new K(), this.movementStarted$ = new K(), this.directionChanged$ = new K(), this.positionChangeStarted$ = new K(), this.positionChangeFinished$ = new K(), this.queueMovementFinished$ = new K(), this.charRemoved$ = new K(), this.charAdded$ = new K(), this.gridTilemap = new On(e, this.config.collisionTilePropertyName, this.config.characterCollisionStrategy, this.recordToMap(this.config.collisionGroupRelation), this.config.cacheTileCollisions), this.addCharacters();
  }
  recordToMap(e) {
    return e ? new Map(Object.entries(e).map(([o, s]) => [o, new Set(s)])) : void 0;
  }
  getPosition(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getTilePos().position;
  }
  move(e, r) {
    this.moveChar(e, r);
  }
  moveRandomly(e, r = 0, o = -1) {
    var h;
    this.initGuard();
    let s = (h = this.gridCharacters) == null ? void 0 : h.get(e);
    if (!s) throw this.createCharUnknownErr(e);
    let u = new wn(s, r, o);
    s.setMovement(u);
  }
  getMovement(e) {
    var s;
    this.initGuard();
    let r = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    let o = r.getMovement();
    return o ? o.getInfo() : { type: "None" };
  }
  moveTo(e, r, o) {
    var f;
    let s = this.assembleMoveToConfig(o);
    this.initGuard();
    let u = (f = this.gridCharacters) == null ? void 0 : f.get(e);
    if (!u) throw this.createCharUnknownErr(e);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let h = new qr(u, this.gridTilemap, { position: new T(r), layer: (o == null ? void 0 : o.targetLayer) || u.getNextTilePos().layer }, { distance: 0, config: s });
    return u.setMovement(h), h.init(), h.finishedObs().pipe(Pe((d) => ({ charId: e, position: d.position, result: d.result, description: d.description, layer: d.layer, finishedEvent: d.finishedEvent })));
  }
  stopMovement(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    r.setMovement(void 0);
  }
  setSpeed(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.setSpeed(r);
  }
  getSpeed(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getSpeed();
  }
  collidesWithTiles(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.collidesWithTiles();
  }
  update(e, r) {
    var o;
    if (this.isCreatedInternal && this.gridCharacters) for (let [s, u] of this.gridCharacters) u.update(r);
    (o = this.gridTilemap) == null || o.invalidateFrameCache();
  }
  addCharacter(e) {
    var u, h, f, d, P2;
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();
    let r = { speed: e.speed || 4, tilemap: this.gridTilemap, collidesWithTiles: true, collisionGroups: ["geDefault"], ignoreCollisionGroups: [], charLayer: e.charLayer, facingDirection: e.facingDirection, labels: e.labels, numberOfDirections: (u = e.numberOfDirections) != null ? u : this.config.numberOfDirections, tileWidth: e.tileWidth, tileHeight: e.tileHeight };
    typeof e.collides == "boolean" ? e.collides === false && (r.collidesWithTiles = false, r.collisionGroups = []) : e.collides !== void 0 && (e.collides.collidesWithTiles === false && (r.collidesWithTiles = false), e.collides.collisionGroups && (r.collisionGroups = e.collides.collisionGroups), e.collides.ignoreCollisionGroups && (r.ignoreCollisionGroups = e.collides.ignoreCollisionGroups), r.ignoreMissingTiles = (f = (h = e.collides) == null ? void 0 : h.ignoreMissingTiles) != null ? f : false);
    let o = new cn(e.id, r);
    e.startPosition && o.setTilePosition({ position: new T(e.startPosition), layer: o.getTilePos().layer }), (d = this.gridCharacters) == null || d.set(e.id, o), this.gridTilemap.addCharacter(o);
    let s = o.getId();
    o.movementStopped().pipe(dt(this.charRemoved(s))).subscribe((L2) => {
      var D;
      (D = this.movementStopped$) == null || D.next({ charId: s, direction: L2 });
    }), o.movementStarted().pipe(dt(this.charRemoved(s))).subscribe((L2) => {
      var D;
      (D = this.movementStarted$) == null || D.next({ charId: s, direction: L2 });
    }), o.directionChanged().pipe(dt(this.charRemoved(s))).subscribe((L2) => {
      var D;
      (D = this.directionChanged$) == null || D.next({ charId: s, direction: L2 });
    }), o.positionChangeStarted().pipe(dt(this.charRemoved(s))).subscribe((L2) => {
      var D;
      (D = this.positionChangeStarted$) == null || D.next(q({ charId: s }, L2));
    }), o.positionChangeFinished().pipe(dt(this.charRemoved(s))).subscribe((L2) => {
      var D;
      (D = this.positionChangeFinished$) == null || D.next(q({ charId: s }, L2));
    }), (P2 = this.charAdded$) == null || P2.next(s);
  }
  hasCharacter(e) {
    var r;
    return this.initGuard(), !!((r = this.gridCharacters) != null && r.has(e));
  }
  removeCharacter(e) {
    var o, s, u, h;
    if (this.initGuard(), !((o = this.gridCharacters) == null ? void 0 : o.get(e))) throw this.createCharUnknownErr(e);
    (s = this.gridTilemap) == null || s.removeCharacter(e), (u = this.gridCharacters) == null || u.delete(e), (h = this.charRemoved$) == null || h.next(e);
  }
  removeAllCharacters() {
    if (this.initGuard(), !!this.gridCharacters) for (let e of this.gridCharacters.keys()) this.removeCharacter(e);
  }
  getAllCharacters(e) {
    if (this.initGuard(), !this.gridCharacters) return [];
    let r = [...this.gridCharacters.values()];
    return (e ? xh(r, e) : r).map((s) => s.getId());
  }
  getLabels(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getLabels();
  }
  addLabels(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.addLabels(r);
  }
  removeLabels(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.removeLabels(r);
  }
  clearLabels(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    r.clearLabels();
  }
  follow(e, r, o, s) {
    var P2, L2, D, J, M, H, k, tt, nt;
    let u;
    o === void 0 ? u = { distance: 0, closestPointIfBlocked: false } : typeof o == "number" ? (u = { distance: o, closestPointIfBlocked: false }, s && (u.closestPointIfBlocked = true)) : u = o, this.initGuard();
    let h = (P2 = this.gridCharacters) == null ? void 0 : P2.get(e), f = (L2 = this.gridCharacters) == null ? void 0 : L2.get(r);
    if (!h) throw this.createCharUnknownErr(e);
    if (!f) throw this.createCharUnknownErr(r);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let d = new xn(h, this.gridTilemap, f, { distance: (D = u.distance) != null ? D : 0, noPathFoundStrategy: u.closestPointIfBlocked ? "CLOSEST_REACHABLE" : "STOP", maxPathLength: (J = u.maxPathLength) != null ? J : 1 / 0, shortestPathAlgorithm: (M = u.algorithm) != null ? M : "BIDIRECTIONAL_SEARCH", ignoreLayers: !!u.ignoreLayers, facingDirection: (H = u.facingDirection) != null ? H : "none", considerCosts: (k = u.considerCosts) != null ? k : false, isPositionAllowedFn: (tt = u.isPositionAllowedFn) != null ? tt : (() => true), ignoredChars: (nt = u.ignoredChars) != null ? nt : [] });
    h.setMovement(d), d.init();
  }
  isMoving(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.isMoving();
  }
  getFacingDirection(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getFacingDirection();
  }
  getFacingPosition(e) {
    var s;
    this.initGuard();
    let r = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    let o = r.getFacingPosition();
    return { x: o.x, y: o.y };
  }
  turnTowards(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    return o.turnTowards(r);
  }
  getCharactersAt(e, r) {
    if (this.initGuard(), !this.gridTilemap) return [];
    let o = this.gridTilemap.getCharactersAt(new T(e), r);
    return Array.from(o).map((s) => s.getId());
  }
  setPosition(e, r, o) {
    var u;
    this.initGuard();
    let s = (u = this.gridCharacters) == null ? void 0 : u.get(e);
    if (!s) throw this.createCharUnknownErr(e);
    o || s.setTilePosition({ position: new T(r), layer: s.getTilePos().layer }), s.setTilePosition({ position: new T(r), layer: o });
  }
  isBlocked(e, r, o = ["geDefault"]) {
    var u, h;
    this.initGuard();
    let s = new T(e);
    return !!((u = this.gridTilemap) != null && u.hasBlockingTile(s, r) || (h = this.gridTilemap) != null && h.hasBlockingChar(s, r, o));
  }
  isTileBlocked(e, r) {
    var o;
    return this.initGuard(), !!((o = this.gridTilemap) != null && o.hasBlockingTile(new T(e), r));
  }
  getCollisionGroups(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getCollisionGroups() || [];
  }
  setCollisionGroups(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.setCollisionGroups(r);
  }
  getIgnoreCollisionGroups(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getIgnoreCollisionGroups() || [];
  }
  setIgnoreCollisionGroups(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.setIgnoreCollisionGroups(r);
  }
  getTilePosInDirection(e, r, o) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let s = this.gridTilemap.getTilePosInDirection({ position: new T(e), layer: r }, o);
    return { position: s.position.toPosition(), charLayer: s.layer };
  }
  findShortestPath(e, r, o = {}) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let s = o.shortestPathAlgorithm || "BFS";
    o.considerCosts && s !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${s}'. It can only be used with A* algorithm.`);
    let u = o.pathWidth !== void 0 && o.pathWidth !== 1, h = o.pathHeight !== void 0 && o.pathHeight !== 1;
    (u || h) && s === "JPS" && console.warn("GridEngine: Pathfinding options 'pathWidth' and 'pathHeight' > 1 cannot be used with algorithm 'JPS'.");
    let d = new Xr(this.gridTilemap).findShortestPath(V.toInternal(e), V.toInternal(r), Lt(q({}, o), { shortestPathAlgorithm: s }));
    return { path: d.path.map(V.fromInternal), closestToTarget: d.closestToTarget ? V.fromInternal(d.closestToTarget) : void 0, reachedMaxPathLength: false, steps: d.steps };
  }
  steppedOn(e, r, o) {
    return this.positionChangeFinished().pipe(xt((s) => e.includes(s.charId) && r.some((u) => u.x === s.enterTile.x && u.y === s.enterTile.y) && (o === void 0 || o.includes(s.enterLayer))));
  }
  characterShifted() {
    if (!this.charAdded$ || !this.charRemoved$) throw this.createUninitializedErr();
    return this.charAdded$.pipe(Pe((e) => ({ charId: e, action: "ADDED" })), ma(this.charRemoved$.pipe(Pe((e) => ({ charId: e, action: "REMOVED" })))));
  }
  movementStarted() {
    if (!this.movementStarted$) throw this.createUninitializedErr();
    return this.movementStarted$;
  }
  movementStopped() {
    if (!this.movementStopped$) throw this.createUninitializedErr();
    return this.movementStopped$;
  }
  directionChanged() {
    if (!this.directionChanged$) throw this.createUninitializedErr();
    return this.directionChanged$;
  }
  positionChangeStarted() {
    if (!this.positionChangeStarted$) throw this.createUninitializedErr();
    return this.positionChangeStarted$;
  }
  positionChangeFinished() {
    if (!this.positionChangeFinished$) throw this.createUninitializedErr();
    return this.positionChangeFinished$;
  }
  getMovementProgress(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getMovementProgress();
  }
  rebuildTileCollisionCache(e, r, o, s) {
    var u;
    (u = this.gridTilemap) == null || u.rebuildTileCollisionCache(new rr(e, r, o, s));
  }
  addQueueMovements(e, r, o) {
    var h, f;
    this.initGuard();
    let s = (h = this.gridCharacters) == null ? void 0 : h.get(e);
    if (!s) throw this.createCharUnknownErr(e);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let u;
    ((f = s == null ? void 0 : s.getMovement()) == null ? void 0 : f.getInfo().type) === "Queue" ? u = s.getMovement() : (u = new Dn(s, this.gridTilemap), s.setMovement(u), u.init(), u.finished().pipe(dt(pa(this.charRemoved(e), s.autoMovementSet()))).subscribe((d) => {
      var P2;
      (P2 = this.queueMovementFinished$) == null || P2.next(q({ charId: e }, d));
    })), u.enqueue(r.map((d) => Je(d) ? d : { position: new T(d.position), layer: d.charLayer }), o);
  }
  queueMovementFinished() {
    if (!this.queueMovementFinished$) throw this.createUninitializedErr();
    return this.queueMovementFinished$;
  }
  getEnqueuedMovements(e) {
    var o, s;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return ((s = r.getMovement()) == null ? void 0 : s.getInfo().type) === "Queue" ? r.getMovement().peekAll().map((h) => ({ command: Je(h.command) ? h.command : V.fromInternal(h.command), config: h.config })) : [];
  }
  clearEnqueuedMovements(e) {
    var o, s;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    ((s = r.getMovement()) == null ? void 0 : s.getInfo().type) === "Queue" && r.getMovement().clear();
  }
  getTileCost(e, r, o) {
    var s, u;
    return this.initGuard(), (u = (s = this.gridTilemap) == null ? void 0 : s.getTileCosts({ position: new T(e), layer: r }, o)) != null ? u : 1;
  }
  getState() {
    let e = [];
    if (this.gridCharacters) for (let [r, o] of this.gridCharacters.entries()) e.push({ id: r, position: V.fromInternal(o.getTilePos()), facingDirection: o.getFacingDirection(), speed: o.getSpeed(), labels: o.getLabels(), movementProgress: o.getMovementProgress(), collisionConfig: { collisionGroups: o.getCollisionGroups(), ignoreCollisionGroups: o.getIgnoreCollisionGroups(), collidesWithTiles: o.collidesWithTiles(), ignoreMissingTiles: o.getIgnoreMissingTiles() } });
    return { characters: e };
  }
  setState(e) {
    if (this.gridCharacters) for (let r of e.characters) {
      let o = this.gridCharacters.get(r.id);
      if (o) {
        let s = o.getTilePos();
        V.equal(s, V.toInternal(r.position)) || o.setTilePosition(V.toInternal(r.position)), o.setSpeed(r.speed), o.turnTowards(r.facingDirection), r.collisionConfig.collisionGroups && o.setCollisionGroups(r.collisionConfig.collisionGroups), r.collisionConfig.collidesWithTiles !== void 0 && o.setCollidesWithTiles(r.collisionConfig.collidesWithTiles), r.collisionConfig.ignoreMissingTiles !== void 0 && o.setIgnoreMissingTiles(r.collisionConfig.ignoreMissingTiles), o.setMovementProgress(r.movementProgress), o.clearLabels(), o.addLabels(r.labels);
      }
    }
  }
  revertCurrentMovement(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    r.revertCurrentMovement();
  }
  isCurrentMovementReverted(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.isCurrentMovementReverted();
  }
  charRemoved(e) {
    var r;
    if (!this.charRemoved$) throw this.createUninitializedErr();
    return (r = this.charRemoved$) == null ? void 0 : r.pipe(wt(1), xt((o) => o == e));
  }
  initGuard() {
    if (!this.isCreatedInternal) throw this.createUninitializedErr();
  }
  createUninitializedErr() {
    throw new Error("GridEngine not initialized. You need to call create() first.");
  }
  addCharacters() {
    var e;
    (e = this.config) == null || e.characters.forEach((r) => this.addCharacter(r));
  }
  moveChar(e, r) {
    var s, u, h;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    if (o.getNumberOfDirections() === 4) {
      if (!((u = this.gridTilemap) != null && u.isIsometric()) && pr(r)) {
        console.warn(`GridEngine: Character '${e}' can't be moved '${r}' in 4 direction mode.`);
        return;
      } else if ((h = this.gridTilemap) != null && h.isIsometric() && !pr(r)) {
        console.warn(`GridEngine: Character '${e}' can't be moved '${r}' in 4 direction isometric mode.`);
        return;
      }
    }
    o.move(r);
  }
  createCharUnknownErr(e) {
    return new Error(`Character unknown: ${e}`);
  }
  assembleMoveToConfig(e = {}) {
    let r = Lt(q({}, e), { noPathFoundStrategy: "STOP", pathBlockedStrategy: "WAIT" });
    return e != null && e.noPathFoundStrategy && (Object.values(Hr).includes(e.noPathFoundStrategy) ? r.noPathFoundStrategy = e.noPathFoundStrategy : console.warn(`GridEngine: Unknown NoPathFoundStrategy '${e.noPathFoundStrategy}'. Falling back to 'STOP'`)), e != null && e.pathBlockedStrategy && (Object.values(Si).includes(e.pathBlockedStrategy) ? r.pathBlockedStrategy = e.pathBlockedStrategy : console.warn(`GridEngine: Unknown PathBlockedStrategy '${e.pathBlockedStrategy}'. Falling back to 'WAIT'`)), r;
  }
  setConfigDefaults(e) {
    return q({ collisionTilePropertyName: "ge_collide", numberOfDirections: 4, characterCollisionStrategy: "BLOCK_TWO_TILES", cacheTileCollisions: false }, e);
  }
};
var Mn = class extends $r {
  constructor(r, o = {}) {
    super(r, o);
    this.jumpCache = new An();
  }
  findShortestPathImpl(r, o) {
    return this.jumpCache = new An(), super.findShortestPathImpl(r, o);
  }
  getNeighborsInternal(r, o, s) {
    if (!o || r.layer !== o.layer) return this.getNeighbors(r, s).map((f) => ({ p: f, dist: 1 }));
    let u = this.prune(o, r).map((f) => {
      let d = this.getTransition(f.position, r.layer);
      return { position: f.position, layer: d || r.layer };
    }), h = [];
    for (let f of u) {
      let d = this.jump(r, f, s, 1, Pt(r.position, f.position));
      d && (d.dist = this.distance(r.position, d.p.position), h.push(d));
    }
    return h;
  }
  getForced(r, o) {
    let s = [], { topLeft: u, downLeft: h, top: f, bottom: d, topRight: P2, downRight: L2 } = this.normalizedPositions(r, o), D = Pt(r.position, o.position);
    return pr(D) ? (this.blockOrTrans(r, u) && (this.addIfNotBlocked(s, o, f), this.addIfNotBlocked(s, o, P2), this.blockOrTrans(h, u) && this.addIfNotBlocked(s, o, u)), this.blockOrTrans(r, h) && (this.addIfNotBlocked(s, o, d), this.addIfNotBlocked(s, o, L2), this.blockOrTrans(u, h) && this.addIfNotBlocked(s, o, h)), this.blockOrTrans(u, f) && this.addIfNotBlocked(s, o, f), this.blockOrTrans(h, d) && this.addIfNotBlocked(s, o, d), this.blockOrTrans(u, P2) && this.addIfNotBlocked(s, o, P2), this.blockOrTrans(h, L2) && this.addIfNotBlocked(s, o, L2)) : ((this.blockOrTrans(r, f) || this.blockOrTrans(f, P2)) && this.addIfNotBlocked(s, o, P2), (this.blockOrTrans(r, d) || this.blockOrTrans(d, L2)) && this.addIfNotBlocked(s, o, L2), this.blockOrTrans(r, u) && this.blockOrTrans(r, f) && (this.addIfNotBlocked(s, o, f), this.addIfNotBlocked(s, o, u)), this.blockOrTrans(r, h) && this.blockOrTrans(r, d) && (this.addIfNotBlocked(s, o, d), this.addIfNotBlocked(s, o, h)), this.blockOrTrans(u, f) && this.blockOrTrans(r, f) && this.addIfNotBlocked(s, o, f), this.blockOrTrans(h, d) && this.blockOrTrans(r, d) && this.addIfNotBlocked(s, o, d)), s;
  }
  hasForced(r, o) {
    let { topLeft: s, downLeft: u, top: h, bottom: f, topRight: d, downRight: P2 } = this.normalizedPositions(r, o), L2 = Pt(r.position, o.position);
    if (pr(L2)) {
      if (this.blockOrTrans(r, s) && (!this.blockOrTrans(o, h) || !this.blockOrTrans(o, d) || this.blockOrTrans(u, s) && !this.blockOrTrans(o, s)) || this.blockOrTrans(r, u) && (!this.blockOrTrans(o, f) || !this.blockOrTrans(o, P2) || this.blockOrTrans(s, u) && !this.blockOrTrans(o, u)) || this.blockOrTrans(s, h) && !this.blockOrTrans(o, h) || this.blockOrTrans(u, f) && !this.blockOrTrans(o, f) || this.blockOrTrans(s, d) && !this.blockOrTrans(o, d) || this.blockOrTrans(u, P2) && !this.blockOrTrans(o, P2)) return true;
    } else if ((this.blockOrTrans(r, h) || this.blockOrTrans(h, d)) && !this.blockOrTrans(o, d) || (this.blockOrTrans(r, f) || this.blockOrTrans(f, P2)) && !this.blockOrTrans(o, P2) || this.blockOrTrans(r, s) && this.blockOrTrans(r, h) && (!this.blockOrTrans(o, h) || !this.blockOrTrans(o, s)) || this.blockOrTrans(r, u) && this.blockOrTrans(r, f) && (!this.blockOrTrans(o, f) || !this.blockOrTrans(o, u)) || this.blockOrTrans(s, h) && this.blockOrTrans(r, h) && !this.blockOrTrans(o, h) || this.blockOrTrans(u, f) && this.blockOrTrans(r, f) && !this.blockOrTrans(o, f)) return true;
    return false;
  }
  prune(r, o) {
    let { top: s, right: u, topRight: h, downRight: f, bottom: d } = this.normalizedPositions(r, o), P2 = this.getForced(r, o), L2 = Pt(r.position, o.position);
    return pr(L2) ? [s, u, h, f, d, ...P2] : [u, ...P2];
  }
  jump(r, o, s, u, h) {
    let f = this.jumpCache.get(r, o);
    if (f !== null) return f;
    if (this.isBlocking(r, o) && !(V.equal(o, s) && this.options.ignoreBlockedTarget)) {
      this.jumpCache.set(r, o, void 0);
      return;
    }
    if (V.equal(o, s)) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    if (u >= this.maxJumpSize) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    if (this.getTransition(o.position, r.layer) !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    if (this.hasForced(r, o)) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    if (this.updateClosestToTarget(o, s), h === "up-left") {
      if (this.jump(o, this.getTilePosInDir(o, "up"), s, u + 1, "up") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
      if (this.jump(o, this.getTilePosInDir(o, "left"), s, u + 1, "left") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    } else if (h === "down-left") {
      if (this.jump(o, this.getTilePosInDir(o, "down"), s, u + 1, "down") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
      if (this.jump(o, this.getTilePosInDir(o, "left"), s, u + 1, "left") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    } else if (h === "up-right") {
      if (this.jump(o, this.getTilePosInDir(o, "up"), s, u + 1, "up") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
      if (this.jump(o, this.getTilePosInDir(o, "right"), s, u + 1, "right") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    } else if (h === "down-right") {
      if (this.jump(o, this.getTilePosInDir(o, "down"), s, u + 1, "down") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
      if (this.jump(o, this.getTilePosInDir(o, "right"), s, u + 1, "right") !== void 0) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
    }
    let d = this.jump(o, this.getTilePosInDir(o, h), s, u + 1, h);
    return this.jumpCache.set(r, o, d), d;
  }
  normalizedPositions(r, o) {
    return r.position.x < o.position.x && r.position.y === o.position.y ? { topLeft: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, top: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, bottom: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, right: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, topRight: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, downRight: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer } } : r.position.x > o.position.x && r.position.y === o.position.y ? { topLeft: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, top: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, bottom: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, right: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, topRight: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, downRight: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer } } : r.position.y < o.position.y && r.position.x === o.position.x ? { topLeft: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, top: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, bottom: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, right: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, topRight: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, downRight: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer } } : r.position.y > o.position.y && r.position.x === o.position.x ? { topLeft: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, top: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, bottom: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, right: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, topRight: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, downRight: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer } } : r.position.y < o.position.y && r.position.x < o.position.x ? { topLeft: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, downLeft: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, top: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, bottom: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, right: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, topRight: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, downRight: { position: new T(o.position.x, o.position.y + 1), layer: o.layer } } : r.position.y < o.position.y && r.position.x > o.position.x ? { topLeft: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, downLeft: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, top: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, bottom: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, right: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, topRight: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, downRight: { position: new T(o.position.x - 1, o.position.y), layer: o.layer } } : r.position.y > o.position.y && r.position.x < o.position.x ? { topLeft: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, downLeft: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, top: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, bottom: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, right: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, topRight: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, downRight: { position: new T(o.position.x + 1, o.position.y), layer: o.layer } } : { topLeft: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, downLeft: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, top: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, bottom: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, right: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, topRight: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, downRight: { position: new T(o.position.x, o.position.y - 1), layer: o.layer } };
  }
};
var An = class {
  constructor() {
    this.memo = /* @__PURE__ */ new Map();
  }
  set(e, r, o) {
    let s = this.memo.get(e.position.x);
    s || (s = /* @__PURE__ */ new Map(), this.memo.set(e.position.x, s));
    let u = s.get(e.position.y);
    u || (u = /* @__PURE__ */ new Map(), s.set(e.position.y, u));
    let h = u.get(e.layer);
    h || (h = /* @__PURE__ */ new Map(), u.set(e.layer, h));
    let f = h.get(r.position.x);
    f || (f = /* @__PURE__ */ new Map(), h.set(r.position.x, f));
    let d = f.get(r.position.y);
    d || (d = /* @__PURE__ */ new Map(), f.set(r.position.y, d)), d.get(r.layer) || (o === void 0 ? d.set(r.layer, null) : d.set(r.layer, o));
  }
  get(e, r) {
    let o = this.memo.get(e.position.x);
    if (!o) return null;
    let s = o.get(e.position.y);
    if (!s) return null;
    let u = s.get(e.layer);
    if (!u) return null;
    let h = u.get(r.position.x);
    if (!h) return null;
    let f = h.get(r.position.y);
    if (!f) return null;
    let d = f.get(r.layer);
    return d === void 0 ? null : d === null ? void 0 : d;
  }
};
var Xr = class {
  constructor(e) {
    this.gridTilemap = e;
  }
  findShortestPath(e, r, o = {}) {
    return MT(o.shortestPathAlgorithm || "BIDIRECTIONAL_SEARCH", this.gridTilemap, o).findShortestPath(e, r);
  }
};
function MT(a3, e, r) {
  switch (a3) {
    case "BIDIRECTIONAL_SEARCH":
      return new Pn(e, r);
    case "A_STAR":
      return new vn(e, r);
    case "JPS":
      return r.numberOfDirections === 8 ? new Mn(e, r) : new $r(e, r);
  }
  return new zr(e, r);
}
var Ia = ((d) => (d.SUCCESS = "SUCCESS", d.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED", d.PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED", d.PATH_BLOCKED = "PATH_BLOCKED", d.NO_PATH_FOUND = "NO_PATH_FOUND", d.PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT", d.MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED", d.MAX_PATH_LENGTH_REACHED = "MAX_PATH_LENGTH_REACHED", d))(Ia || {});
var qr = class {
  constructor(e, r, o, { config: s, ignoreBlockedTarget: u = false, distance: h = 0 } = {}) {
    this.character = e;
    this.tilemap = r;
    this.targetPos = o;
    this.shortestPath = [];
    this.distOffset = 0;
    this.posOnPath = 0;
    this.stopped = false;
    this.pathBlockedWaitElapsed = 0;
    this.isPositionAllowed = () => true;
    this.shortestPathAlgorithm = "BIDIRECTIONAL_SEARCH";
    this.maxPathLength = 1 / 0;
    this.considerCosts = false;
    this.ignoredChars = [];
    this.isBlocking = (e2, r2) => e2 ? new zr(this.tilemap, this.getPathfindingOptions()).isBlocking(this.character.getTilePos(), { position: e2, layer: r2 }) : true;
    var f, d;
    this.shortestPathAlgorithm = (f = s == null ? void 0 : s.algorithm) != null ? f : this.shortestPathAlgorithm, this.ignoreBlockedTarget = u, this.distance = h, this.noPathFoundStrategy = (s == null ? void 0 : s.noPathFoundStrategy) || "STOP", this.pathBlockedStrategy = (s == null ? void 0 : s.pathBlockedStrategy) || "WAIT", this.noPathFoundRetryable = new Li((s == null ? void 0 : s.noPathFoundRetryBackoffMs) || 200, (s == null ? void 0 : s.noPathFoundMaxRetries) || -1, () => {
      this.stop("NO_PATH_FOUND_MAX_RETRIES_EXCEEDED");
    }), this.pathBlockedRetryable = new Li((s == null ? void 0 : s.pathBlockedRetryBackoffMs) || 200, (s == null ? void 0 : s.pathBlockedMaxRetries) || -1, () => {
      this.stop("PATH_BLOCKED_MAX_RETRIES_EXCEEDED");
    }), s != null && s.isPositionAllowedFn && (this.isPositionAllowed = s.isPositionAllowedFn), s != null && s.maxPathLength && (this.maxPathLength = s.maxPathLength), this.alternativeTargets = s == null ? void 0 : s.alternativeTargets, this.noPathFoundAlternativeTargetsFallbackStrategy = s == null ? void 0 : s.noPathFoundAlternativeTargetsFallbackStrategy, s != null && s.considerCosts && this.shortestPathAlgorithm !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.shortestPathAlgorithm}'. It can only be used with A* algorithm.`), this.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1) && console.warn("GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1"), this.considerCosts = (s == null ? void 0 : s.considerCosts) || false, this.ignoreLayers = !!(s != null && s.ignoreLayers), this.distanceUtils = le.create(e.getNumberOfDirections()), this.pathBlockedWaitTimeoutMs = (s == null ? void 0 : s.pathBlockedWaitTimeoutMs) || -1, this.ignoredChars = (d = s == null ? void 0 : s.ignoredChars) != null ? d : [], this.emitFinishedEvent = (s == null ? void 0 : s.emitFinishedEvent) || "START_MOVEMENT", this.finished$ = new K();
  }
  init() {
    this.noPathFoundRetryable.reset(), this.pathBlockedRetryable.reset(), this.pathBlockedWaitElapsed = 0, this.calcShortestPath(), this.character.autoMovementSet().pipe(xt((e) => e !== this), wt(1)).subscribe(() => {
      this.stop("MOVEMENT_TERMINATED");
    });
  }
  setPathBlockedStrategy(e) {
    this.pathBlockedStrategy = e;
  }
  getPathBlockedStrategy() {
    return this.pathBlockedStrategy;
  }
  getPathfindingOptions() {
    return { shortestPathAlgorithm: this.shortestPathAlgorithm, pathWidth: this.character.getTileWidth(), pathHeight: this.character.getTileHeight(), numberOfDirections: this.character.getNumberOfDirections(), isPositionAllowed: this.isPositionAllowed, collisionGroups: this.character.getCollisionGroups(), ignoredChars: [this.character.getId(), ...this.ignoredChars], ignoreTiles: !this.character.collidesWithTiles(), ignoreMapBounds: this.character.getIgnoreMissingTiles(), ignoreBlockedTarget: this.ignoreBlockedTarget, maxPathLength: this.maxPathLength, ignoreLayers: this.ignoreLayers, considerCosts: this.considerCosts, calculateClosestToTarget: true };
  }
  update(e) {
    var r, o, s, u;
    if (!this.stopped) if (this.noPathFound() && (this.noPathFoundStrategy === "RETRY" ? this.noPathFoundRetryable.retry(e, () => this.calcShortestPath()) : this.noPathFoundStrategy === "STOP" && this.stop("NO_PATH_FOUND")), this.updatePosOnPath(), this.isBlocking((r = this.nextTileOnPath()) == null ? void 0 : r.position, (o = this.character) == null ? void 0 : o.getNextTilePos().layer) ? this.applyPathBlockedStrategy(e) : this.pathBlockedWaitElapsed = 0, this.updatePosOnPath(), this.hasArrived()) if (this.stop("SUCCESS"), this.existsDistToTarget()) {
      let h = this.shortestPath[this.shortestPath.length - 1];
      this.turnTowardsTarget(h.position);
    } else this.hasClosestToTarget() && this.turnTowardsTarget(this.targetPos.position);
    else this.isBlocking((s = this.nextTileOnPath()) == null ? void 0 : s.position, (u = this.character) == null ? void 0 : u.getNextTilePos().layer) || this.moveCharOnPath();
  }
  hasClosestToTarget() {
    return this.distOffset > 0;
  }
  finishedObs() {
    return this.finished$;
  }
  getInfo() {
    return { type: "Target", state: { pathAhead: this.shortestPath.slice(this.posOnPath).map((e) => V.fromInternal(e)) }, config: { algorithm: this.shortestPathAlgorithm, ignoreBlockedTarget: this.ignoreBlockedTarget, distance: this.distance, targetPos: V.fromInternal(this.targetPos), noPathFoundStrategy: this.noPathFoundStrategy, pathBlockedStrategy: this.pathBlockedStrategy, noPathFoundRetryBackoffMs: this.noPathFoundRetryable.getBackoffMs(), noPathFoundMaxRetries: this.noPathFoundRetryable.getMaxRetries() } };
  }
  resultToReason(e) {
    switch (e) {
      case "SUCCESS":
        return "Successfully arrived.";
      case "MOVEMENT_TERMINATED":
        return "Movement of character has been replaced before destination was reached.";
      case "PATH_BLOCKED":
        return "PathBlockedStrategy STOP: Path blocked.";
      case "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED":
        return `NoPathFoundStrategy RETRY: Maximum retries of ${this.noPathFoundRetryable.getMaxRetries()} exceeded.`;
      case "NO_PATH_FOUND":
        return "NoPathFoundStrategy STOP: No path found.";
      case "PATH_BLOCKED_MAX_RETRIES_EXCEEDED":
        return `PathBlockedStrategy RETRY: Maximum retries of ${this.pathBlockedRetryable.getMaxRetries()} exceeded.`;
      case "PATH_BLOCKED_WAIT_TIMEOUT":
        return `PathBlockedStrategy WAIT: Wait timeout of ${this.pathBlockedWaitTimeoutMs}ms exceeded.`;
    }
  }
  applyPathBlockedStrategy(e) {
    this.pathBlockedStrategy === "RETRY" ? this.pathBlockedRetryable.retry(e, () => {
      let r = this.getShortestPath();
      r.path.length > 0 && this.calcShortestPath(r);
    }) : this.pathBlockedStrategy === "STOP" ? this.stop("PATH_BLOCKED") : this.pathBlockedStrategy === "WAIT" && this.pathBlockedWaitTimeoutMs > -1 && (this.pathBlockedWaitElapsed += e, this.pathBlockedWaitElapsed >= this.pathBlockedWaitTimeoutMs && this.stop("PATH_BLOCKED_WAIT_TIMEOUT"));
  }
  moveCharOnPath() {
    let e = this.nextTileOnPath();
    if (!e) return;
    let r = this.getDir(this.character.getNextTilePos().position, e.position);
    this.character.move(r);
  }
  nextTileOnPath() {
    return this.shortestPath[this.posOnPath + 1];
  }
  stop(e) {
    let r = { position: this.character.getNextTilePos().position, result: e, description: this.resultToReason(e), layer: this.character.getNextTilePos().layer, finishedEvent: "START_MOVEMENT" };
    this.emitFinishedEvent === "START_MOVEMENT" ? (this.finished$.next(r), this.finished$.complete()) : this.emitFinishedEvent === "END_MOVEMENT" ? this.character.movementStopped().pipe(wt(1)).subscribe(() => {
      this.finished$.next(Lt(q({}, r), { finishedEvent: "END_MOVEMENT" })), this.finished$.complete();
    }) : this.emitFinishedEvent === "BOTH" && (this.finished$.next(r), this.character.movementStopped().pipe(wt(1)).subscribe(() => {
      this.finished$.next(Lt(q({}, r), { finishedEvent: "END_MOVEMENT" })), this.finished$.complete();
    })), this.stopped = true;
  }
  turnTowardsTarget(e) {
    let r = this.getDir(this.character.getNextTilePos().position, e);
    this.character.movementStopped().pipe(wt(1)).subscribe(() => {
      this.character.turnTowards(r);
    });
  }
  existsDistToTarget() {
    return this.posOnPath < this.shortestPath.length - 1;
  }
  hasArrived() {
    return !this.noPathFound() && this.posOnPath + Math.max(0, this.distance - this.distOffset) >= this.shortestPath.length - 1;
  }
  updatePosOnPath() {
    let e = this.shortestPath[this.posOnPath];
    for (; this.posOnPath < this.shortestPath.length - 1 && (this.character.getNextTilePos().position.x != e.position.x || this.character.getNextTilePos().position.y != e.position.y); ) this.posOnPath++, e = this.shortestPath[this.posOnPath];
  }
  noPathFound() {
    return this.shortestPath.length === 0;
  }
  calcShortestPath(e) {
    e = e != null ? e : this.getShortestPath(), this.posOnPath = 0, this.shortestPath = e.path, this.distOffset = e.distOffset;
  }
  getShortestPath() {
    var u;
    let e = new Xr(this.tilemap), { path: r, closestToTarget: o } = e.findShortestPath(this.character.getNextTilePos(), this.targetPos, this.getPathfindingOptions());
    if (r.length == 0) {
      if (this.noPathFoundStrategy === "CLOSEST_REACHABLE") {
        if (!o) throw Error("ClosestToTarget should never be undefined in TargetMovement.");
        return this.pathToAlternativeTarget(o, e);
      } else if (this.noPathFoundStrategy === "ALTERNATIVE_TARGETS") {
        for (let h of (u = this.alternativeTargets) != null ? u : []) {
          let { path: f, distOffset: d } = this.pathToAlternativeTarget(V.toInternal(h), e);
          if (f.length > 0) return { path: f, distOffset: d };
        }
        return this.noPathFoundStrategy = this.noPathFoundAlternativeTargetsFallbackStrategy || "STOP", this.getShortestPath();
      }
    }
    return { path: r, distOffset: 0 };
  }
  pathToAlternativeTarget(e, r) {
    let o = r.findShortestPath(this.character.getNextTilePos(), e, this.getPathfindingOptions()).path, s = this.distanceUtils.distance(e.position, this.targetPos.position);
    return { path: o, distOffset: s };
  }
  getDir(e, r) {
    return this.tilemap.fromMapDirection(this.distanceUtils.direction(e, r));
  }
};
var AT = Object.create;
var Sh = Object.defineProperty;
var RT = Object.getOwnPropertyDescriptor;
var FT = Object.getOwnPropertyNames;
var kT = Object.getPrototypeOf;
var VT = Object.prototype.hasOwnProperty;
var NT = (a3, e) => () => (e || a3((e = { exports: {} }).exports, e), e.exports);
var GT = (a3, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of FT(e)) !VT.call(a3, s) && s !== r && Sh(a3, s, { get: () => e[s], enumerable: !(o = RT(e, s)) || o.enumerable });
  return a3;
};
var Aa = (a3, e, r) => (r = a3 != null ? AT(kT(a3)) : {}, GT(e || !a3 || !a3.__esModule ? Sh(r, "default", { value: a3, enumerable: true }) : r, a3));
var Ra = NT((a3, e) => {
  (function() {
    var r, o = "4.17.21", s = 200, u = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", h = "Expected a function", f = "Invalid `variable` option passed into `_.template`", d = "__lodash_hash_undefined__", P2 = 500, L2 = "__lodash_placeholder__", D = 1, J = 2, M = 4, H = 1, k = 2, tt = 1, nt = 2, $t = 4, bt2 = 8, fe2 = 16, pe2 = 32, xr2 = 64, Se = 128, Qr2 = 256, kn2 = 512, Ih = 30, Mh = "...", Ah = 800, Rh = 16, Ga = 1, Fh = 2, kh = 3, ir2 = 1 / 0, Ue = 9007199254740991, Vh = 17976931348623157e292, Ui2 = NaN, me2 = 4294967295, Nh = me2 - 1, Gh = me2 >>> 1, jh = [["ary", Se], ["bind", tt], ["bindKey", nt], ["curry", bt2], ["curryRight", fe2], ["flip", kn2], ["partial", pe2], ["partialRight", xr2], ["rearg", Qr2]], wr2 = "[object Arguments]", Bi2 = "[object Array]", Uh = "[object AsyncFunction]", Kr2 = "[object Boolean]", Jr2 = "[object Date]", Bh = "[object DOMException]", Hi2 = "[object Error]", Wi2 = "[object Function]", ja = "[object GeneratorFunction]", ie = "[object Map]", Zr2 = "[object Number]", Hh = "[object Null]", Oe2 = "[object Object]", Ua = "[object Promise]", Wh = "[object Proxy]", ti2 = "[object RegExp]", oe = "[object Set]", ei2 = "[object String]", zi2 = "[object Symbol]", zh = "[object Undefined]", ri2 = "[object WeakMap]", $h = "[object WeakSet]", ii = "[object ArrayBuffer]", Cr = "[object DataView]", Vn = "[object Float32Array]", Nn = "[object Float64Array]", Gn = "[object Int8Array]", jn = "[object Int16Array]", Un = "[object Int32Array]", Bn = "[object Uint8Array]", Hn = "[object Uint8ClampedArray]", Wn = "[object Uint16Array]", zn = "[object Uint32Array]", qh = /\b__p \+= '';/g, Yh = /\b(__p \+=) '' \+/g, Xh = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ba = /&(?:amp|lt|gt|quot|#39);/g, Ha = /[&<>"']/g, Qh = RegExp(Ba.source), Kh = RegExp(Ha.source), Jh = /<%-([\s\S]+?)%>/g, Zh = /<%([\s\S]+?)%>/g, Wa = /<%=([\s\S]+?)%>/g, tf = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ef = /^\w*$/, rf = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, $n2 = /[\\^$.*+?()[\]{}|]/g, of = RegExp($n2.source), qn = /^\s+/, nf = /\s/, sf = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, af = /\{\n\/\* \[wrapped with (.+)\] \*/, uf = /,? & /, cf = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, lf = /[()=,{}\[\]\/\s]/, hf = /\\(\\)?/g, ff = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, za = /\w*$/, pf = /^[-+]0x[0-9a-f]+$/i, mf = /^0b[01]+$/i, df = /^\[object .+?Constructor\]$/, gf = /^0o[0-7]+$/i, yf = /^(?:0|[1-9]\d*)$/, vf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, $i2 = /($^)/, bf = /['\n\r\u2028\u2029\\]/g, qi2 = "\\ud800-\\udfff", Tf = "\\u0300-\\u036f", Pf = "\\ufe20-\\ufe2f", xf = "\\u20d0-\\u20ff", $a = Tf + Pf + xf, qa = "\\u2700-\\u27bf", Ya = "a-z\\xdf-\\xf6\\xf8-\\xff", wf = "\\xac\\xb1\\xd7\\xf7", Cf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", _f = "\\u2000-\\u206f", Lf = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Xa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Qa = "\\ufe0e\\ufe0f", Ka = wf + Cf + _f + Lf, Yn = "['\u2019]", Sf = "[" + qi2 + "]", Ja = "[" + Ka + "]", Yi2 = "[" + $a + "]", Za = "\\d+", Of = "[" + qa + "]", tu = "[" + Ya + "]", eu = "[^" + qi2 + Ka + Za + qa + Ya + Xa + "]", Xn = "\\ud83c[\\udffb-\\udfff]", Ef = "(?:" + Yi2 + "|" + Xn + ")", ru = "[^" + qi2 + "]", Qn2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", Kn = "[\\ud800-\\udbff][\\udc00-\\udfff]", _r2 = "[" + Xa + "]", iu = "\\u200d", ou = "(?:" + tu + "|" + eu + ")", Df = "(?:" + _r2 + "|" + eu + ")", nu = "(?:" + Yn + "(?:d|ll|m|re|s|t|ve))?", su = "(?:" + Yn + "(?:D|LL|M|RE|S|T|VE))?", au = Ef + "?", uu = "[" + Qa + "]?", If = "(?:" + iu + "(?:" + [ru, Qn2, Kn].join("|") + ")" + uu + au + ")*", Mf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Af = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", cu = uu + au + If, Rf = "(?:" + [Of, Qn2, Kn].join("|") + ")" + cu, Ff = "(?:" + [ru + Yi2 + "?", Yi2, Qn2, Kn, Sf].join("|") + ")", kf = RegExp(Yn, "g"), Vf = RegExp(Yi2, "g"), Jn = RegExp(Xn + "(?=" + Xn + ")|" + Ff + cu, "g"), Nf = RegExp([_r2 + "?" + tu + "+" + nu + "(?=" + [Ja, _r2, "$"].join("|") + ")", Df + "+" + su + "(?=" + [Ja, _r2 + ou, "$"].join("|") + ")", _r2 + "?" + ou + "+" + nu, _r2 + "+" + su, Af, Mf, Za, Rf].join("|"), "g"), Gf = RegExp("[" + iu + qi2 + $a + Qa + "]"), jf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Uf = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Bf = -1, st = {};
    st[Vn] = st[Nn] = st[Gn] = st[jn] = st[Un] = st[Bn] = st[Hn] = st[Wn] = st[zn] = true, st[wr2] = st[Bi2] = st[ii] = st[Kr2] = st[Cr] = st[Jr2] = st[Hi2] = st[Wi2] = st[ie] = st[Zr2] = st[Oe2] = st[ti2] = st[oe] = st[ei2] = st[ri2] = false;
    var ot2 = {};
    ot2[wr2] = ot2[Bi2] = ot2[ii] = ot2[Cr] = ot2[Kr2] = ot2[Jr2] = ot2[Vn] = ot2[Nn] = ot2[Gn] = ot2[jn] = ot2[Un] = ot2[ie] = ot2[Zr2] = ot2[Oe2] = ot2[ti2] = ot2[oe] = ot2[ei2] = ot2[zi2] = ot2[Bn] = ot2[Hn] = ot2[Wn] = ot2[zn] = true, ot2[Hi2] = ot2[Wi2] = ot2[ri2] = false;
    var Hf = { \u00C0: "A", \u00C1: "A", \u00C2: "A", \u00C3: "A", \u00C4: "A", \u00C5: "A", \u00E0: "a", \u00E1: "a", \u00E2: "a", \u00E3: "a", \u00E4: "a", \u00E5: "a", \u00C7: "C", \u00E7: "c", \u00D0: "D", \u00F0: "d", \u00C8: "E", \u00C9: "E", \u00CA: "E", \u00CB: "E", \u00E8: "e", \u00E9: "e", \u00EA: "e", \u00EB: "e", \u00CC: "I", \u00CD: "I", \u00CE: "I", \u00CF: "I", \u00EC: "i", \u00ED: "i", \u00EE: "i", \u00EF: "i", \u00D1: "N", \u00F1: "n", \u00D2: "O", \u00D3: "O", \u00D4: "O", \u00D5: "O", \u00D6: "O", \u00D8: "O", \u00F2: "o", \u00F3: "o", \u00F4: "o", \u00F5: "o", \u00F6: "o", \u00F8: "o", \u00D9: "U", \u00DA: "U", \u00DB: "U", \u00DC: "U", \u00F9: "u", \u00FA: "u", \u00FB: "u", \u00FC: "u", \u00DD: "Y", \u00FD: "y", \u00FF: "y", \u00C6: "Ae", \u00E6: "ae", \u00DE: "Th", \u00FE: "th", \u00DF: "ss", \u0100: "A", \u0102: "A", \u0104: "A", \u0101: "a", \u0103: "a", \u0105: "a", \u0106: "C", \u0108: "C", \u010A: "C", \u010C: "C", \u0107: "c", \u0109: "c", \u010B: "c", \u010D: "c", \u010E: "D", \u0110: "D", \u010F: "d", \u0111: "d", \u0112: "E", \u0114: "E", \u0116: "E", \u0118: "E", \u011A: "E", \u0113: "e", \u0115: "e", \u0117: "e", \u0119: "e", \u011B: "e", \u011C: "G", \u011E: "G", \u0120: "G", \u0122: "G", \u011D: "g", \u011F: "g", \u0121: "g", \u0123: "g", \u0124: "H", \u0126: "H", \u0125: "h", \u0127: "h", \u0128: "I", \u012A: "I", \u012C: "I", \u012E: "I", \u0130: "I", \u0129: "i", \u012B: "i", \u012D: "i", \u012F: "i", \u0131: "i", \u0134: "J", \u0135: "j", \u0136: "K", \u0137: "k", \u0138: "k", \u0139: "L", \u013B: "L", \u013D: "L", \u013F: "L", \u0141: "L", \u013A: "l", \u013C: "l", \u013E: "l", \u0140: "l", \u0142: "l", \u0143: "N", \u0145: "N", \u0147: "N", \u014A: "N", \u0144: "n", \u0146: "n", \u0148: "n", \u014B: "n", \u014C: "O", \u014E: "O", \u0150: "O", \u014D: "o", \u014F: "o", \u0151: "o", \u0154: "R", \u0156: "R", \u0158: "R", \u0155: "r", \u0157: "r", \u0159: "r", \u015A: "S", \u015C: "S", \u015E: "S", \u0160: "S", \u015B: "s", \u015D: "s", \u015F: "s", \u0161: "s", \u0162: "T", \u0164: "T", \u0166: "T", \u0163: "t", \u0165: "t", \u0167: "t", \u0168: "U", \u016A: "U", \u016C: "U", \u016E: "U", \u0170: "U", \u0172: "U", \u0169: "u", \u016B: "u", \u016D: "u", \u016F: "u", \u0171: "u", \u0173: "u", \u0174: "W", \u0175: "w", \u0176: "Y", \u0177: "y", \u0178: "Y", \u0179: "Z", \u017B: "Z", \u017D: "Z", \u017A: "z", \u017C: "z", \u017E: "z", \u0132: "IJ", \u0133: "ij", \u0152: "Oe", \u0153: "oe", \u0149: "'n", \u017F: "s" }, Wf = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, zf = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, $f = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, qf = parseFloat, Yf = parseInt, lu = typeof global == "object" && global && global.Object === Object && global, Xf = typeof self == "object" && self && self.Object === Object && self, gt2 = lu || Xf || Function("return this")(), Zn = typeof a3 == "object" && a3 && !a3.nodeType && a3, or2 = Zn && typeof e == "object" && e && !e.nodeType && e, hu = or2 && or2.exports === Zn, ts = hu && lu.process, qt = (function() {
      try {
        var v = or2 && or2.require && or2.require("util").types;
        return v || ts && ts.binding && ts.binding("util");
      } catch (w) {
      }
    })(), fu = qt && qt.isArrayBuffer, pu = qt && qt.isDate, mu = qt && qt.isMap, du = qt && qt.isRegExp, gu = qt && qt.isSet, yu = qt && qt.isTypedArray;
    function Nt(v, w, x2) {
      switch (x2.length) {
        case 0:
          return v.call(w);
        case 1:
          return v.call(w, x2[0]);
        case 2:
          return v.call(w, x2[0], x2[1]);
        case 3:
          return v.call(w, x2[0], x2[1], x2[2]);
      }
      return v.apply(w, x2);
    }
    function Qf(v, w, x2, E) {
      for (var N = -1, Q = v == null ? 0 : v.length; ++N < Q; ) {
        var pt = v[N];
        w(E, pt, x2(pt), v);
      }
      return E;
    }
    function Yt(v, w) {
      for (var x2 = -1, E = v == null ? 0 : v.length; ++x2 < E && w(v[x2], x2, v) !== false; ) ;
      return v;
    }
    function Kf(v, w) {
      for (var x2 = v == null ? 0 : v.length; x2-- && w(v[x2], x2, v) !== false; ) ;
      return v;
    }
    function vu(v, w) {
      for (var x2 = -1, E = v == null ? 0 : v.length; ++x2 < E; ) if (!w(v[x2], x2, v)) return false;
      return true;
    }
    function Be2(v, w) {
      for (var x2 = -1, E = v == null ? 0 : v.length, N = 0, Q = []; ++x2 < E; ) {
        var pt = v[x2];
        w(pt, x2, v) && (Q[N++] = pt);
      }
      return Q;
    }
    function Xi2(v, w) {
      var x2 = v == null ? 0 : v.length;
      return !!x2 && Lr(v, w, 0) > -1;
    }
    function es(v, w, x2) {
      for (var E = -1, N = v == null ? 0 : v.length; ++E < N; ) if (x2(w, v[E])) return true;
      return false;
    }
    function at2(v, w) {
      for (var x2 = -1, E = v == null ? 0 : v.length, N = Array(E); ++x2 < E; ) N[x2] = w(v[x2], x2, v);
      return N;
    }
    function He(v, w) {
      for (var x2 = -1, E = w.length, N = v.length; ++x2 < E; ) v[N + x2] = w[x2];
      return v;
    }
    function rs(v, w, x2, E) {
      var N = -1, Q = v == null ? 0 : v.length;
      for (E && Q && (x2 = v[++N]); ++N < Q; ) x2 = w(x2, v[N], N, v);
      return x2;
    }
    function Jf(v, w, x2, E) {
      var N = v == null ? 0 : v.length;
      for (E && N && (x2 = v[--N]); N--; ) x2 = w(x2, v[N], N, v);
      return x2;
    }
    function is(v, w) {
      for (var x2 = -1, E = v == null ? 0 : v.length; ++x2 < E; ) if (w(v[x2], x2, v)) return true;
      return false;
    }
    var Zf = os("length");
    function tp(v) {
      return v.split("");
    }
    function ep(v) {
      return v.match(cf) || [];
    }
    function bu(v, w, x2) {
      var E;
      return x2(v, function(N, Q, pt) {
        if (w(N, Q, pt)) return E = Q, false;
      }), E;
    }
    function Qi2(v, w, x2, E) {
      for (var N = v.length, Q = x2 + (E ? 1 : -1); E ? Q-- : ++Q < N; ) if (w(v[Q], Q, v)) return Q;
      return -1;
    }
    function Lr(v, w, x2) {
      return w === w ? pp(v, w, x2) : Qi2(v, Tu, x2);
    }
    function rp(v, w, x2, E) {
      for (var N = x2 - 1, Q = v.length; ++N < Q; ) if (E(v[N], w)) return N;
      return -1;
    }
    function Tu(v) {
      return v !== v;
    }
    function Pu(v, w) {
      var x2 = v == null ? 0 : v.length;
      return x2 ? ss(v, w) / x2 : Ui2;
    }
    function os(v) {
      return function(w) {
        return w == null ? r : w[v];
      };
    }
    function ns2(v) {
      return function(w) {
        return v == null ? r : v[w];
      };
    }
    function xu(v, w, x2, E, N) {
      return N(v, function(Q, pt, it2) {
        x2 = E ? (E = false, Q) : w(x2, Q, pt, it2);
      }), x2;
    }
    function ip(v, w) {
      var x2 = v.length;
      for (v.sort(w); x2--; ) v[x2] = v[x2].value;
      return v;
    }
    function ss(v, w) {
      for (var x2, E = -1, N = v.length; ++E < N; ) {
        var Q = w(v[E]);
        Q !== r && (x2 = x2 === r ? Q : x2 + Q);
      }
      return x2;
    }
    function as2(v, w) {
      for (var x2 = -1, E = Array(v); ++x2 < v; ) E[x2] = w(x2);
      return E;
    }
    function op(v, w) {
      return at2(w, function(x2) {
        return [x2, v[x2]];
      });
    }
    function wu(v) {
      return v && v.slice(0, Su(v) + 1).replace(qn, "");
    }
    function Gt(v) {
      return function(w) {
        return v(w);
      };
    }
    function us(v, w) {
      return at2(w, function(x2) {
        return v[x2];
      });
    }
    function oi(v, w) {
      return v.has(w);
    }
    function Cu(v, w) {
      for (var x2 = -1, E = v.length; ++x2 < E && Lr(w, v[x2], 0) > -1; ) ;
      return x2;
    }
    function _u(v, w) {
      for (var x2 = v.length; x2-- && Lr(w, v[x2], 0) > -1; ) ;
      return x2;
    }
    function np(v, w) {
      for (var x2 = v.length, E = 0; x2--; ) v[x2] === w && ++E;
      return E;
    }
    var sp = ns2(Hf), ap = ns2(Wf);
    function up(v) {
      return "\\" + $f[v];
    }
    function cp(v, w) {
      return v == null ? r : v[w];
    }
    function Sr2(v) {
      return Gf.test(v);
    }
    function lp(v) {
      return jf.test(v);
    }
    function hp(v) {
      for (var w, x2 = []; !(w = v.next()).done; ) x2.push(w.value);
      return x2;
    }
    function cs(v) {
      var w = -1, x2 = Array(v.size);
      return v.forEach(function(E, N) {
        x2[++w] = [N, E];
      }), x2;
    }
    function Lu(v, w) {
      return function(x2) {
        return v(w(x2));
      };
    }
    function We(v, w) {
      for (var x2 = -1, E = v.length, N = 0, Q = []; ++x2 < E; ) {
        var pt = v[x2];
        (pt === w || pt === L2) && (v[x2] = L2, Q[N++] = x2);
      }
      return Q;
    }
    function Ki2(v) {
      var w = -1, x2 = Array(v.size);
      return v.forEach(function(E) {
        x2[++w] = E;
      }), x2;
    }
    function fp(v) {
      var w = -1, x2 = Array(v.size);
      return v.forEach(function(E) {
        x2[++w] = [E, E];
      }), x2;
    }
    function pp(v, w, x2) {
      for (var E = x2 - 1, N = v.length; ++E < N; ) if (v[E] === w) return E;
      return -1;
    }
    function mp(v, w, x2) {
      for (var E = x2 + 1; E--; ) if (v[E] === w) return E;
      return E;
    }
    function Or2(v) {
      return Sr2(v) ? gp(v) : Zf(v);
    }
    function ne(v) {
      return Sr2(v) ? yp(v) : tp(v);
    }
    function Su(v) {
      for (var w = v.length; w-- && nf.test(v.charAt(w)); ) ;
      return w;
    }
    var dp = ns2(zf);
    function gp(v) {
      for (var w = Jn.lastIndex = 0; Jn.test(v); ) ++w;
      return w;
    }
    function yp(v) {
      return v.match(Jn) || [];
    }
    function vp(v) {
      return v.match(Nf) || [];
    }
    var bp = function v(w) {
      w = w == null ? gt2 : ze2.defaults(gt2.Object(), w, ze2.pick(gt2, Uf));
      var x2 = w.Array, E = w.Date, N = w.Error, Q = w.Function, pt = w.Math, it2 = w.Object, ls2 = w.RegExp, Tp = w.String, Xt2 = w.TypeError, Ji2 = x2.prototype, Pp = Q.prototype, Er = it2.prototype, Zi2 = w["__core-js_shared__"], to = Pp.toString, et = Er.hasOwnProperty, xp = 0, Ou = (function() {
        var t = /[^.]+$/.exec(Zi2 && Zi2.keys && Zi2.keys.IE_PROTO || "");
        return t ? "Symbol(src)_1." + t : "";
      })(), eo = Er.toString, wp = to.call(it2), Cp = gt2._, _p = ls2("^" + to.call(et).replace($n2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), ro = hu ? w.Buffer : r, $e2 = w.Symbol, io = w.Uint8Array, Eu = ro ? ro.allocUnsafe : r, oo2 = Lu(it2.getPrototypeOf, it2), Du2 = it2.create, Iu = Er.propertyIsEnumerable, no = Ji2.splice, Mu2 = $e2 ? $e2.isConcatSpreadable : r, ni = $e2 ? $e2.iterator : r, nr2 = $e2 ? $e2.toStringTag : r, so = (function() {
        try {
          var t = lr2(it2, "defineProperty");
          return t({}, "", {}), t;
        } catch (i) {
        }
      })(), Lp = w.clearTimeout !== gt2.clearTimeout && w.clearTimeout, Sp = E && E.now !== gt2.Date.now && E.now, Op = w.setTimeout !== gt2.setTimeout && w.setTimeout, ao = pt.ceil, uo2 = pt.floor, hs = it2.getOwnPropertySymbols, Ep = ro ? ro.isBuffer : r, Au = w.isFinite, Dp = Ji2.join, Ip = Lu(it2.keys, it2), mt2 = pt.max, Ct2 = pt.min, Mp = E.now, Ap = w.parseInt, Ru2 = pt.random, Rp = Ji2.reverse, fs3 = lr2(w, "DataView"), si = lr2(w, "Map"), ps = lr2(w, "Promise"), Dr = lr2(w, "Set"), ai = lr2(w, "WeakMap"), ui = lr2(it2, "create"), co2 = ai && new ai(), Ir = {}, Fp = hr2(fs3), kp = hr2(si), Vp = hr2(ps), Np = hr2(Dr), Gp = hr2(ai), lo = $e2 ? $e2.prototype : r, ci2 = lo ? lo.valueOf : r, Fu = lo ? lo.toString : r;
      function p(t) {
        if (ct(t) && !G(t) && !(t instanceof z)) {
          if (t instanceof Qt2) return t;
          if (et.call(t, "__wrapped__")) return kc(t);
        }
        return new Qt2(t);
      }
      var Mr2 = /* @__PURE__ */ (function() {
        function t() {
        }
        return function(i) {
          if (!ut2(i)) return {};
          if (Du2) return Du2(i);
          t.prototype = i;
          var n = new t();
          return t.prototype = r, n;
        };
      })();
      function ho() {
      }
      function Qt2(t, i) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!i, this.__index__ = 0, this.__values__ = r;
      }
      p.templateSettings = { escape: Jh, evaluate: Zh, interpolate: Wa, variable: "", imports: { _: p } }, p.prototype = ho.prototype, p.prototype.constructor = p, Qt2.prototype = Mr2(ho.prototype), Qt2.prototype.constructor = Qt2;
      function z(t) {
        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = me2, this.__views__ = [];
      }
      function jp() {
        var t = new z(this.__wrapped__);
        return t.__actions__ = Mt(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Mt(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Mt(this.__views__), t;
      }
      function Up() {
        if (this.__filtered__) {
          var t = new z(this);
          t.__dir__ = -1, t.__filtered__ = true;
        } else t = this.clone(), t.__dir__ *= -1;
        return t;
      }
      function Bp() {
        var t = this.__wrapped__.value(), i = this.__dir__, n = G(t), c = i < 0, l = n ? t.length : 0, m2 = td(0, l, this.__views__), g = m2.start, y2 = m2.end, b = y2 - g, C = c ? y2 : g - 1, _ = this.__iteratees__, S = _.length, O2 = 0, I = Ct2(b, this.__takeCount__);
        if (!n || !c && l == b && I == b) return nc(t, this.__actions__);
        var R = [];
        t: for (; b-- && O2 < I; ) {
          C += i;
          for (var U = -1, F = t[C]; ++U < S; ) {
            var W2 = _[U], $ = W2.iteratee, Bt2 = W2.type, Dt = $(F);
            if (Bt2 == Fh) F = Dt;
            else if (!Dt) {
              if (Bt2 == Ga) continue t;
              break t;
            }
          }
          R[O2++] = F;
        }
        return R;
      }
      z.prototype = Mr2(ho.prototype), z.prototype.constructor = z;
      function sr2(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function Hp() {
        this.__data__ = ui ? ui(null) : {}, this.size = 0;
      }
      function Wp(t) {
        var i = this.has(t) && delete this.__data__[t];
        return this.size -= i ? 1 : 0, i;
      }
      function zp(t) {
        var i = this.__data__;
        if (ui) {
          var n = i[t];
          return n === d ? r : n;
        }
        return et.call(i, t) ? i[t] : r;
      }
      function $p(t) {
        var i = this.__data__;
        return ui ? i[t] !== r : et.call(i, t);
      }
      function qp(t, i) {
        var n = this.__data__;
        return this.size += this.has(t) ? 0 : 1, n[t] = ui && i === r ? d : i, this;
      }
      sr2.prototype.clear = Hp, sr2.prototype.delete = Wp, sr2.prototype.get = zp, sr2.prototype.has = $p, sr2.prototype.set = qp;
      function Ee2(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function Yp() {
        this.__data__ = [], this.size = 0;
      }
      function Xp(t) {
        var i = this.__data__, n = fo(i, t);
        if (n < 0) return false;
        var c = i.length - 1;
        return n == c ? i.pop() : no.call(i, n, 1), --this.size, true;
      }
      function Qp(t) {
        var i = this.__data__, n = fo(i, t);
        return n < 0 ? r : i[n][1];
      }
      function Kp(t) {
        return fo(this.__data__, t) > -1;
      }
      function Jp(t, i) {
        var n = this.__data__, c = fo(n, t);
        return c < 0 ? (++this.size, n.push([t, i])) : n[c][1] = i, this;
      }
      Ee2.prototype.clear = Yp, Ee2.prototype.delete = Xp, Ee2.prototype.get = Qp, Ee2.prototype.has = Kp, Ee2.prototype.set = Jp;
      function De2(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function Zp() {
        this.size = 0, this.__data__ = { hash: new sr2(), map: new (si || Ee2)(), string: new sr2() };
      }
      function tm(t) {
        var i = _o(this, t).delete(t);
        return this.size -= i ? 1 : 0, i;
      }
      function em(t) {
        return _o(this, t).get(t);
      }
      function rm(t) {
        return _o(this, t).has(t);
      }
      function im(t, i) {
        var n = _o(this, t), c = n.size;
        return n.set(t, i), this.size += n.size == c ? 0 : 1, this;
      }
      De2.prototype.clear = Zp, De2.prototype.delete = tm, De2.prototype.get = em, De2.prototype.has = rm, De2.prototype.set = im;
      function ar2(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.__data__ = new De2(); ++i < n; ) this.add(t[i]);
      }
      function om(t) {
        return this.__data__.set(t, d), this;
      }
      function nm(t) {
        return this.__data__.has(t);
      }
      ar2.prototype.add = ar2.prototype.push = om, ar2.prototype.has = nm;
      function se(t) {
        var i = this.__data__ = new Ee2(t);
        this.size = i.size;
      }
      function sm() {
        this.__data__ = new Ee2(), this.size = 0;
      }
      function am(t) {
        var i = this.__data__, n = i.delete(t);
        return this.size = i.size, n;
      }
      function um(t) {
        return this.__data__.get(t);
      }
      function cm(t) {
        return this.__data__.has(t);
      }
      function lm(t, i) {
        var n = this.__data__;
        if (n instanceof Ee2) {
          var c = n.__data__;
          if (!si || c.length < s - 1) return c.push([t, i]), this.size = ++n.size, this;
          n = this.__data__ = new De2(c);
        }
        return n.set(t, i), this.size = n.size, this;
      }
      se.prototype.clear = sm, se.prototype.delete = am, se.prototype.get = um, se.prototype.has = cm, se.prototype.set = lm;
      function ku(t, i) {
        var n = G(t), c = !n && fr2(t), l = !n && !c && Ke2(t), m2 = !n && !c && !l && kr2(t), g = n || c || l || m2, y2 = g ? as2(t.length, Tp) : [], b = y2.length;
        for (var C in t) (i || et.call(t, C)) && !(g && (C == "length" || l && (C == "offset" || C == "parent") || m2 && (C == "buffer" || C == "byteLength" || C == "byteOffset") || Re2(C, b))) && y2.push(C);
        return y2;
      }
      function Vu(t) {
        var i = t.length;
        return i ? t[Cs(0, i - 1)] : r;
      }
      function hm(t, i) {
        return Lo(Mt(t), ur2(i, 0, t.length));
      }
      function fm(t) {
        return Lo(Mt(t));
      }
      function ms(t, i, n) {
        (n !== r && !ae(t[i], n) || n === r && !(i in t)) && Ie2(t, i, n);
      }
      function li(t, i, n) {
        var c = t[i];
        (!(et.call(t, i) && ae(c, n)) || n === r && !(i in t)) && Ie2(t, i, n);
      }
      function fo(t, i) {
        for (var n = t.length; n--; ) if (ae(t[n][0], i)) return n;
        return -1;
      }
      function pm(t, i, n, c) {
        return qe(t, function(l, m2, g) {
          i(c, l, n(l), g);
        }), c;
      }
      function Nu(t, i) {
        return t && ge2(i, yt(i), t);
      }
      function mm(t, i) {
        return t && ge2(i, Rt(i), t);
      }
      function Ie2(t, i, n) {
        i == "__proto__" && so ? so(t, i, { configurable: true, enumerable: true, value: n, writable: true }) : t[i] = n;
      }
      function ds2(t, i) {
        for (var n = -1, c = i.length, l = x2(c), m2 = t == null; ++n < c; ) l[n] = m2 ? r : Xs(t, i[n]);
        return l;
      }
      function ur2(t, i, n) {
        return t === t && (n !== r && (t = t <= n ? t : n), i !== r && (t = t >= i ? t : i)), t;
      }
      function Kt2(t, i, n, c, l, m2) {
        var g, y2 = i & D, b = i & J, C = i & M;
        if (n && (g = l ? n(t, c, l, m2) : n(t)), g !== r) return g;
        if (!ut2(t)) return t;
        var _ = G(t);
        if (_) {
          if (g = rd(t), !y2) return Mt(t, g);
        } else {
          var S = _t(t), O2 = S == Wi2 || S == ja;
          if (Ke2(t)) return uc(t, y2);
          if (S == Oe2 || S == wr2 || O2 && !l) {
            if (g = b || O2 ? {} : Sc(t), !y2) return b ? zm(t, mm(g, t)) : Wm(t, Nu(g, t));
          } else {
            if (!ot2[S]) return l ? t : {};
            g = id(t, S, y2);
          }
        }
        m2 || (m2 = new se());
        var I = m2.get(t);
        if (I) return I;
        m2.set(t, g), rl(t) ? t.forEach(function(F) {
          g.add(Kt2(F, i, n, F, t, m2));
        }) : tl(t) && t.forEach(function(F, W2) {
          g.set(W2, Kt2(F, i, n, W2, t, m2));
        });
        var R = C ? b ? Fs2 : Rs : b ? Rt : yt, U = _ ? r : R(t);
        return Yt(U || t, function(F, W2) {
          U && (W2 = F, F = t[W2]), li(g, W2, Kt2(F, i, n, W2, t, m2));
        }), g;
      }
      function dm(t) {
        var i = yt(t);
        return function(n) {
          return Gu(n, t, i);
        };
      }
      function Gu(t, i, n) {
        var c = n.length;
        if (t == null) return !c;
        for (t = it2(t); c--; ) {
          var l = n[c], m2 = i[l], g = t[l];
          if (g === r && !(l in t) || !m2(g)) return false;
        }
        return true;
      }
      function ju(t, i, n) {
        if (typeof t != "function") throw new Xt2(h);
        return yi(function() {
          t.apply(r, n);
        }, i);
      }
      function hi(t, i, n, c) {
        var l = -1, m2 = Xi2, g = true, y2 = t.length, b = [], C = i.length;
        if (!y2) return b;
        n && (i = at2(i, Gt(n))), c ? (m2 = es, g = false) : i.length >= s && (m2 = oi, g = false, i = new ar2(i));
        t: for (; ++l < y2; ) {
          var _ = t[l], S = n == null ? _ : n(_);
          if (_ = c || _ !== 0 ? _ : 0, g && S === S) {
            for (var O2 = C; O2--; ) if (i[O2] === S) continue t;
            b.push(_);
          } else m2(i, S, c) || b.push(_);
        }
        return b;
      }
      var qe = pc(de2), Uu = pc(ys, true);
      function gm(t, i) {
        var n = true;
        return qe(t, function(c, l, m2) {
          return n = !!i(c, l, m2), n;
        }), n;
      }
      function po(t, i, n) {
        for (var c = -1, l = t.length; ++c < l; ) {
          var m2 = t[c], g = i(m2);
          if (g != null && (y2 === r ? g === g && !Ut2(g) : n(g, y2))) var y2 = g, b = m2;
        }
        return b;
      }
      function ym(t, i, n, c) {
        var l = t.length;
        for (n = j2(n), n < 0 && (n = -n > l ? 0 : l + n), c = c === r || c > l ? l : j2(c), c < 0 && (c += l), c = n > c ? 0 : ol(c); n < c; ) t[n++] = i;
        return t;
      }
      function Bu(t, i) {
        var n = [];
        return qe(t, function(c, l, m2) {
          i(c, l, m2) && n.push(c);
        }), n;
      }
      function Tt(t, i, n, c, l) {
        var m2 = -1, g = t.length;
        for (n || (n = nd), l || (l = []); ++m2 < g; ) {
          var y2 = t[m2];
          i > 0 && n(y2) ? i > 1 ? Tt(y2, i - 1, n, c, l) : He(l, y2) : c || (l[l.length] = y2);
        }
        return l;
      }
      var gs = mc(), Hu = mc(true);
      function de2(t, i) {
        return t && gs(t, i, yt);
      }
      function ys(t, i) {
        return t && Hu(t, i, yt);
      }
      function mo(t, i) {
        return Be2(i, function(n) {
          return Fe2(t[n]);
        });
      }
      function cr2(t, i) {
        i = Xe2(i, t);
        for (var n = 0, c = i.length; t != null && n < c; ) t = t[ye(i[n++])];
        return n && n == c ? t : r;
      }
      function Wu(t, i, n) {
        var c = i(t);
        return G(t) ? c : He(c, n(t));
      }
      function Ot2(t) {
        return t == null ? t === r ? zh : Hh : nr2 && nr2 in it2(t) ? Zm(t) : fd(t);
      }
      function vs(t, i) {
        return t > i;
      }
      function vm(t, i) {
        return t != null && et.call(t, i);
      }
      function bm(t, i) {
        return t != null && i in it2(t);
      }
      function Tm(t, i, n) {
        return t >= Ct2(i, n) && t < mt2(i, n);
      }
      function bs(t, i, n) {
        for (var c = n ? es : Xi2, l = t[0].length, m2 = t.length, g = m2, y2 = x2(m2), b = 1 / 0, C = []; g--; ) {
          var _ = t[g];
          g && i && (_ = at2(_, Gt(i))), b = Ct2(_.length, b), y2[g] = !n && (i || l >= 120 && _.length >= 120) ? new ar2(g && _) : r;
        }
        _ = t[0];
        var S = -1, O2 = y2[0];
        t: for (; ++S < l && C.length < b; ) {
          var I = _[S], R = i ? i(I) : I;
          if (I = n || I !== 0 ? I : 0, !(O2 ? oi(O2, R) : c(C, R, n))) {
            for (g = m2; --g; ) {
              var U = y2[g];
              if (!(U ? oi(U, R) : c(t[g], R, n))) continue t;
            }
            O2 && O2.push(R), C.push(I);
          }
        }
        return C;
      }
      function Pm(t, i, n, c) {
        return de2(t, function(l, m2, g) {
          i(c, n(l), m2, g);
        }), c;
      }
      function fi(t, i, n) {
        i = Xe2(i, t), t = Ic(t, i);
        var c = t == null ? t : t[ye(Zt2(i))];
        return c == null ? r : Nt(c, t, n);
      }
      function zu(t) {
        return ct(t) && Ot2(t) == wr2;
      }
      function xm(t) {
        return ct(t) && Ot2(t) == ii;
      }
      function wm(t) {
        return ct(t) && Ot2(t) == Jr2;
      }
      function pi(t, i, n, c, l) {
        return t === i ? true : t == null || i == null || !ct(t) && !ct(i) ? t !== t && i !== i : Cm(t, i, n, c, pi, l);
      }
      function Cm(t, i, n, c, l, m2) {
        var g = G(t), y2 = G(i), b = g ? Bi2 : _t(t), C = y2 ? Bi2 : _t(i);
        b = b == wr2 ? Oe2 : b, C = C == wr2 ? Oe2 : C;
        var _ = b == Oe2, S = C == Oe2, O2 = b == C;
        if (O2 && Ke2(t)) {
          if (!Ke2(i)) return false;
          g = true, _ = false;
        }
        if (O2 && !_) return m2 || (m2 = new se()), g || kr2(t) ? Cc(t, i, n, c, l, m2) : Km(t, i, b, n, c, l, m2);
        if (!(n & H)) {
          var I = _ && et.call(t, "__wrapped__"), R = S && et.call(i, "__wrapped__");
          if (I || R) {
            var U = I ? t.value() : t, F = R ? i.value() : i;
            return m2 || (m2 = new se()), l(U, F, n, c, m2);
          }
        }
        return O2 ? (m2 || (m2 = new se()), Jm(t, i, n, c, l, m2)) : false;
      }
      function _m(t) {
        return ct(t) && _t(t) == ie;
      }
      function Ts(t, i, n, c) {
        var l = n.length, m2 = l, g = !c;
        if (t == null) return !m2;
        for (t = it2(t); l--; ) {
          var y2 = n[l];
          if (g && y2[2] ? y2[1] !== t[y2[0]] : !(y2[0] in t)) return false;
        }
        for (; ++l < m2; ) {
          y2 = n[l];
          var b = y2[0], C = t[b], _ = y2[1];
          if (g && y2[2]) {
            if (C === r && !(b in t)) return false;
          } else {
            var S = new se();
            if (c) var O2 = c(C, _, b, t, i, S);
            if (!(O2 === r ? pi(_, C, H | k, c, S) : O2)) return false;
          }
        }
        return true;
      }
      function $u(t) {
        if (!ut2(t) || ad(t)) return false;
        var i = Fe2(t) ? _p : df;
        return i.test(hr2(t));
      }
      function Lm(t) {
        return ct(t) && Ot2(t) == ti2;
      }
      function Sm(t) {
        return ct(t) && _t(t) == oe;
      }
      function Om(t) {
        return ct(t) && Mo(t.length) && !!st[Ot2(t)];
      }
      function qu(t) {
        return typeof t == "function" ? t : t == null ? Ft : typeof t == "object" ? G(t) ? Qu(t[0], t[1]) : Xu(t) : dl(t);
      }
      function Ps(t) {
        if (!gi(t)) return Ip(t);
        var i = [];
        for (var n in it2(t)) et.call(t, n) && n != "constructor" && i.push(n);
        return i;
      }
      function Em(t) {
        if (!ut2(t)) return hd(t);
        var i = gi(t), n = [];
        for (var c in t) c == "constructor" && (i || !et.call(t, c)) || n.push(c);
        return n;
      }
      function xs(t, i) {
        return t < i;
      }
      function Yu(t, i) {
        var n = -1, c = At(t) ? x2(t.length) : [];
        return qe(t, function(l, m2, g) {
          c[++n] = i(l, m2, g);
        }), c;
      }
      function Xu(t) {
        var i = Vs(t);
        return i.length == 1 && i[0][2] ? Ec(i[0][0], i[0][1]) : function(n) {
          return n === t || Ts(n, t, i);
        };
      }
      function Qu(t, i) {
        return Gs(t) && Oc(i) ? Ec(ye(t), i) : function(n) {
          var c = Xs(n, t);
          return c === r && c === i ? Qs2(n, t) : pi(i, c, H | k);
        };
      }
      function go2(t, i, n, c, l) {
        t !== i && gs(i, function(m2, g) {
          if (l || (l = new se()), ut2(m2)) Dm(t, i, g, n, go2, c, l);
          else {
            var y2 = c ? c(Us(t, g), m2, g + "", t, i, l) : r;
            y2 === r && (y2 = m2), ms(t, g, y2);
          }
        }, Rt);
      }
      function Dm(t, i, n, c, l, m2, g) {
        var y2 = Us(t, n), b = Us(i, n), C = g.get(b);
        if (C) {
          ms(t, n, C);
          return;
        }
        var _ = m2 ? m2(y2, b, n + "", t, i, g) : r, S = _ === r;
        if (S) {
          var O2 = G(b), I = !O2 && Ke2(b), R = !O2 && !I && kr2(b);
          _ = b, O2 || I || R ? G(y2) ? _ = y2 : lt2(y2) ? _ = Mt(y2) : I ? (S = false, _ = uc(b, true)) : R ? (S = false, _ = cc(b, true)) : _ = [] : vi(b) || fr2(b) ? (_ = y2, fr2(y2) ? _ = nl(y2) : (!ut2(y2) || Fe2(y2)) && (_ = Sc(b))) : S = false;
        }
        S && (g.set(b, _), l(_, b, c, m2, g), g.delete(b)), ms(t, n, _);
      }
      function Ku(t, i) {
        var n = t.length;
        if (n) return i += i < 0 ? n : 0, Re2(i, n) ? t[i] : r;
      }
      function Ju(t, i, n) {
        i.length ? i = at2(i, function(m2) {
          return G(m2) ? function(g) {
            return cr2(g, m2.length === 1 ? m2[0] : m2);
          } : m2;
        }) : i = [Ft];
        var c = -1;
        i = at2(i, Gt(A2()));
        var l = Yu(t, function(m2, g, y2) {
          var b = at2(i, function(C) {
            return C(m2);
          });
          return { criteria: b, index: ++c, value: m2 };
        });
        return ip(l, function(m2, g) {
          return Hm(m2, g, n);
        });
      }
      function Im(t, i) {
        return Zu(t, i, function(n, c) {
          return Qs2(t, c);
        });
      }
      function Zu(t, i, n) {
        for (var c = -1, l = i.length, m2 = {}; ++c < l; ) {
          var g = i[c], y2 = cr2(t, g);
          n(y2, g) && mi2(m2, Xe2(g, t), y2);
        }
        return m2;
      }
      function Mm(t) {
        return function(i) {
          return cr2(i, t);
        };
      }
      function ws2(t, i, n, c) {
        var l = c ? rp : Lr, m2 = -1, g = i.length, y2 = t;
        for (t === i && (i = Mt(i)), n && (y2 = at2(t, Gt(n))); ++m2 < g; ) for (var b = 0, C = i[m2], _ = n ? n(C) : C; (b = l(y2, _, b, c)) > -1; ) y2 !== t && no.call(y2, b, 1), no.call(t, b, 1);
        return t;
      }
      function tc(t, i) {
        for (var n = t ? i.length : 0, c = n - 1; n--; ) {
          var l = i[n];
          if (n == c || l !== m2) {
            var m2 = l;
            Re2(l) ? no.call(t, l, 1) : Ss2(t, l);
          }
        }
        return t;
      }
      function Cs(t, i) {
        return t + uo2(Ru2() * (i - t + 1));
      }
      function Am(t, i, n, c) {
        for (var l = -1, m2 = mt2(ao((i - t) / (n || 1)), 0), g = x2(m2); m2--; ) g[c ? m2 : ++l] = t, t += n;
        return g;
      }
      function _s(t, i) {
        var n = "";
        if (!t || i < 1 || i > Ue) return n;
        do
          i % 2 && (n += t), i = uo2(i / 2), i && (t += t);
        while (i);
        return n;
      }
      function B(t, i) {
        return Bs2(Dc(t, i, Ft), t + "");
      }
      function Rm(t) {
        return Vu(Vr2(t));
      }
      function Fm(t, i) {
        var n = Vr2(t);
        return Lo(n, ur2(i, 0, n.length));
      }
      function mi2(t, i, n, c) {
        if (!ut2(t)) return t;
        i = Xe2(i, t);
        for (var l = -1, m2 = i.length, g = m2 - 1, y2 = t; y2 != null && ++l < m2; ) {
          var b = ye(i[l]), C = n;
          if (b === "__proto__" || b === "constructor" || b === "prototype") return t;
          if (l != g) {
            var _ = y2[b];
            C = c ? c(_, b, y2) : r, C === r && (C = ut2(_) ? _ : Re2(i[l + 1]) ? [] : {});
          }
          li(y2, b, C), y2 = y2[b];
        }
        return t;
      }
      var ec = co2 ? function(t, i) {
        return co2.set(t, i), t;
      } : Ft, km = so ? function(t, i) {
        return so(t, "toString", { configurable: true, enumerable: false, value: Js(i), writable: true });
      } : Ft;
      function Vm(t) {
        return Lo(Vr2(t));
      }
      function Jt2(t, i, n) {
        var c = -1, l = t.length;
        i < 0 && (i = -i > l ? 0 : l + i), n = n > l ? l : n, n < 0 && (n += l), l = i > n ? 0 : n - i >>> 0, i >>>= 0;
        for (var m2 = x2(l); ++c < l; ) m2[c] = t[c + i];
        return m2;
      }
      function Nm(t, i) {
        var n;
        return qe(t, function(c, l, m2) {
          return n = i(c, l, m2), !n;
        }), !!n;
      }
      function yo(t, i, n) {
        var c = 0, l = t == null ? c : t.length;
        if (typeof i == "number" && i === i && l <= Gh) {
          for (; c < l; ) {
            var m2 = c + l >>> 1, g = t[m2];
            g !== null && !Ut2(g) && (n ? g <= i : g < i) ? c = m2 + 1 : l = m2;
          }
          return l;
        }
        return Ls(t, i, Ft, n);
      }
      function Ls(t, i, n, c) {
        var l = 0, m2 = t == null ? 0 : t.length;
        if (m2 === 0) return 0;
        i = n(i);
        for (var g = i !== i, y2 = i === null, b = Ut2(i), C = i === r; l < m2; ) {
          var _ = uo2((l + m2) / 2), S = n(t[_]), O2 = S !== r, I = S === null, R = S === S, U = Ut2(S);
          if (g) var F = c || R;
          else C ? F = R && (c || O2) : y2 ? F = R && O2 && (c || !I) : b ? F = R && O2 && !I && (c || !U) : I || U ? F = false : F = c ? S <= i : S < i;
          F ? l = _ + 1 : m2 = _;
        }
        return Ct2(m2, Nh);
      }
      function rc(t, i) {
        for (var n = -1, c = t.length, l = 0, m2 = []; ++n < c; ) {
          var g = t[n], y2 = i ? i(g) : g;
          if (!n || !ae(y2, b)) {
            var b = y2;
            m2[l++] = g === 0 ? 0 : g;
          }
        }
        return m2;
      }
      function ic(t) {
        return typeof t == "number" ? t : Ut2(t) ? Ui2 : +t;
      }
      function jt(t) {
        if (typeof t == "string") return t;
        if (G(t)) return at2(t, jt) + "";
        if (Ut2(t)) return Fu ? Fu.call(t) : "";
        var i = t + "";
        return i == "0" && 1 / t == -ir2 ? "-0" : i;
      }
      function Ye2(t, i, n) {
        var c = -1, l = Xi2, m2 = t.length, g = true, y2 = [], b = y2;
        if (n) g = false, l = es;
        else if (m2 >= s) {
          var C = i ? null : Xm(t);
          if (C) return Ki2(C);
          g = false, l = oi, b = new ar2();
        } else b = i ? [] : y2;
        t: for (; ++c < m2; ) {
          var _ = t[c], S = i ? i(_) : _;
          if (_ = n || _ !== 0 ? _ : 0, g && S === S) {
            for (var O2 = b.length; O2--; ) if (b[O2] === S) continue t;
            i && b.push(S), y2.push(_);
          } else l(b, S, n) || (b !== y2 && b.push(S), y2.push(_));
        }
        return y2;
      }
      function Ss2(t, i) {
        return i = Xe2(i, t), t = Ic(t, i), t == null || delete t[ye(Zt2(i))];
      }
      function oc(t, i, n, c) {
        return mi2(t, i, n(cr2(t, i)), c);
      }
      function vo2(t, i, n, c) {
        for (var l = t.length, m2 = c ? l : -1; (c ? m2-- : ++m2 < l) && i(t[m2], m2, t); ) ;
        return n ? Jt2(t, c ? 0 : m2, c ? m2 + 1 : l) : Jt2(t, c ? m2 + 1 : 0, c ? l : m2);
      }
      function nc(t, i) {
        var n = t;
        return n instanceof z && (n = n.value()), rs(i, function(c, l) {
          return l.func.apply(l.thisArg, He([c], l.args));
        }, n);
      }
      function Os2(t, i, n) {
        var c = t.length;
        if (c < 2) return c ? Ye2(t[0]) : [];
        for (var l = -1, m2 = x2(c); ++l < c; ) for (var g = t[l], y2 = -1; ++y2 < c; ) y2 != l && (m2[l] = hi(m2[l] || g, t[y2], i, n));
        return Ye2(Tt(m2, 1), i, n);
      }
      function sc(t, i, n) {
        for (var c = -1, l = t.length, m2 = i.length, g = {}; ++c < l; ) {
          var y2 = c < m2 ? i[c] : r;
          n(g, t[c], y2);
        }
        return g;
      }
      function Es2(t) {
        return lt2(t) ? t : [];
      }
      function Ds2(t) {
        return typeof t == "function" ? t : Ft;
      }
      function Xe2(t, i) {
        return G(t) ? t : Gs(t, i) ? [t] : Fc(Z2(t));
      }
      var Gm = B;
      function Qe2(t, i, n) {
        var c = t.length;
        return n = n === r ? c : n, !i && n >= c ? t : Jt2(t, i, n);
      }
      var ac = Lp || function(t) {
        return gt2.clearTimeout(t);
      };
      function uc(t, i) {
        if (i) return t.slice();
        var n = t.length, c = Eu ? Eu(n) : new t.constructor(n);
        return t.copy(c), c;
      }
      function Is(t) {
        var i = new t.constructor(t.byteLength);
        return new io(i).set(new io(t)), i;
      }
      function jm(t, i) {
        var n = i ? Is(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.byteLength);
      }
      function Um(t) {
        var i = new t.constructor(t.source, za.exec(t));
        return i.lastIndex = t.lastIndex, i;
      }
      function Bm(t) {
        return ci2 ? it2(ci2.call(t)) : {};
      }
      function cc(t, i) {
        var n = i ? Is(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.length);
      }
      function lc(t, i) {
        if (t !== i) {
          var n = t !== r, c = t === null, l = t === t, m2 = Ut2(t), g = i !== r, y2 = i === null, b = i === i, C = Ut2(i);
          if (!y2 && !C && !m2 && t > i || m2 && g && b && !y2 && !C || c && g && b || !n && b || !l) return 1;
          if (!c && !m2 && !C && t < i || C && n && l && !c && !m2 || y2 && n && l || !g && l || !b) return -1;
        }
        return 0;
      }
      function Hm(t, i, n) {
        for (var c = -1, l = t.criteria, m2 = i.criteria, g = l.length, y2 = n.length; ++c < g; ) {
          var b = lc(l[c], m2[c]);
          if (b) {
            if (c >= y2) return b;
            var C = n[c];
            return b * (C == "desc" ? -1 : 1);
          }
        }
        return t.index - i.index;
      }
      function hc(t, i, n, c) {
        for (var l = -1, m2 = t.length, g = n.length, y2 = -1, b = i.length, C = mt2(m2 - g, 0), _ = x2(b + C), S = !c; ++y2 < b; ) _[y2] = i[y2];
        for (; ++l < g; ) (S || l < m2) && (_[n[l]] = t[l]);
        for (; C--; ) _[y2++] = t[l++];
        return _;
      }
      function fc(t, i, n, c) {
        for (var l = -1, m2 = t.length, g = -1, y2 = n.length, b = -1, C = i.length, _ = mt2(m2 - y2, 0), S = x2(_ + C), O2 = !c; ++l < _; ) S[l] = t[l];
        for (var I = l; ++b < C; ) S[I + b] = i[b];
        for (; ++g < y2; ) (O2 || l < m2) && (S[I + n[g]] = t[l++]);
        return S;
      }
      function Mt(t, i) {
        var n = -1, c = t.length;
        for (i || (i = x2(c)); ++n < c; ) i[n] = t[n];
        return i;
      }
      function ge2(t, i, n, c) {
        var l = !n;
        n || (n = {});
        for (var m2 = -1, g = i.length; ++m2 < g; ) {
          var y2 = i[m2], b = c ? c(n[y2], t[y2], y2, n, t) : r;
          b === r && (b = t[y2]), l ? Ie2(n, y2, b) : li(n, y2, b);
        }
        return n;
      }
      function Wm(t, i) {
        return ge2(t, Ns(t), i);
      }
      function zm(t, i) {
        return ge2(t, _c(t), i);
      }
      function bo(t, i) {
        return function(n, c) {
          var l = G(n) ? Qf : pm, m2 = i ? i() : {};
          return l(n, t, A2(c, 2), m2);
        };
      }
      function Ar2(t) {
        return B(function(i, n) {
          var c = -1, l = n.length, m2 = l > 1 ? n[l - 1] : r, g = l > 2 ? n[2] : r;
          for (m2 = t.length > 3 && typeof m2 == "function" ? (l--, m2) : r, g && Et2(n[0], n[1], g) && (m2 = l < 3 ? r : m2, l = 1), i = it2(i); ++c < l; ) {
            var y2 = n[c];
            y2 && t(i, y2, c, m2);
          }
          return i;
        });
      }
      function pc(t, i) {
        return function(n, c) {
          if (n == null) return n;
          if (!At(n)) return t(n, c);
          for (var l = n.length, m2 = i ? l : -1, g = it2(n); (i ? m2-- : ++m2 < l) && c(g[m2], m2, g) !== false; ) ;
          return n;
        };
      }
      function mc(t) {
        return function(i, n, c) {
          for (var l = -1, m2 = it2(i), g = c(i), y2 = g.length; y2--; ) {
            var b = g[t ? y2 : ++l];
            if (n(m2[b], b, m2) === false) break;
          }
          return i;
        };
      }
      function $m(t, i, n) {
        var c = i & tt, l = di(t);
        function m2() {
          var g = this && this !== gt2 && this instanceof m2 ? l : t;
          return g.apply(c ? n : this, arguments);
        }
        return m2;
      }
      function dc(t) {
        return function(i) {
          i = Z2(i);
          var n = Sr2(i) ? ne(i) : r, c = n ? n[0] : i.charAt(0), l = n ? Qe2(n, 1).join("") : i.slice(1);
          return c[t]() + l;
        };
      }
      function Rr(t) {
        return function(i) {
          return rs(pl(fl(i).replace(kf, "")), t, "");
        };
      }
      function di(t) {
        return function() {
          var i = arguments;
          switch (i.length) {
            case 0:
              return new t();
            case 1:
              return new t(i[0]);
            case 2:
              return new t(i[0], i[1]);
            case 3:
              return new t(i[0], i[1], i[2]);
            case 4:
              return new t(i[0], i[1], i[2], i[3]);
            case 5:
              return new t(i[0], i[1], i[2], i[3], i[4]);
            case 6:
              return new t(i[0], i[1], i[2], i[3], i[4], i[5]);
            case 7:
              return new t(i[0], i[1], i[2], i[3], i[4], i[5], i[6]);
          }
          var n = Mr2(t.prototype), c = t.apply(n, i);
          return ut2(c) ? c : n;
        };
      }
      function qm(t, i, n) {
        var c = di(t);
        function l() {
          for (var m2 = arguments.length, g = x2(m2), y2 = m2, b = Fr(l); y2--; ) g[y2] = arguments[y2];
          var C = m2 < 3 && g[0] !== b && g[m2 - 1] !== b ? [] : We(g, b);
          if (m2 -= C.length, m2 < n) return Tc(t, i, To, l.placeholder, r, g, C, r, r, n - m2);
          var _ = this && this !== gt2 && this instanceof l ? c : t;
          return Nt(_, this, g);
        }
        return l;
      }
      function gc(t) {
        return function(i, n, c) {
          var l = it2(i);
          if (!At(i)) {
            var m2 = A2(n, 3);
            i = yt(i), n = function(y2) {
              return m2(l[y2], y2, l);
            };
          }
          var g = t(i, n, c);
          return g > -1 ? l[m2 ? i[g] : g] : r;
        };
      }
      function yc(t) {
        return Ae2(function(i) {
          var n = i.length, c = n, l = Qt2.prototype.thru;
          for (t && i.reverse(); c--; ) {
            var m2 = i[c];
            if (typeof m2 != "function") throw new Xt2(h);
            if (l && !g && Co2(m2) == "wrapper") var g = new Qt2([], true);
          }
          for (c = g ? c : n; ++c < n; ) {
            m2 = i[c];
            var y2 = Co2(m2), b = y2 == "wrapper" ? ks(m2) : r;
            b && js(b[0]) && b[1] == (Se | bt2 | pe2 | Qr2) && !b[4].length && b[9] == 1 ? g = g[Co2(b[0])].apply(g, b[3]) : g = m2.length == 1 && js(m2) ? g[y2]() : g.thru(m2);
          }
          return function() {
            var C = arguments, _ = C[0];
            if (g && C.length == 1 && G(_)) return g.plant(_).value();
            for (var S = 0, O2 = n ? i[S].apply(this, C) : _; ++S < n; ) O2 = i[S].call(this, O2);
            return O2;
          };
        });
      }
      function To(t, i, n, c, l, m2, g, y2, b, C) {
        var _ = i & Se, S = i & tt, O2 = i & nt, I = i & (bt2 | fe2), R = i & kn2, U = O2 ? r : di(t);
        function F() {
          for (var W2 = arguments.length, $ = x2(W2), Bt2 = W2; Bt2--; ) $[Bt2] = arguments[Bt2];
          if (I) var Dt = Fr(F), Ht = np($, Dt);
          if (c && ($ = hc($, c, l, I)), m2 && ($ = fc($, m2, g, I)), W2 -= Ht, I && W2 < C) {
            var ht2 = We($, Dt);
            return Tc(t, i, To, F.placeholder, n, $, ht2, y2, b, C - W2);
          }
          var ue2 = S ? n : this, Ve = O2 ? ue2[t] : t;
          return W2 = $.length, y2 ? $ = pd($, y2) : R && W2 > 1 && $.reverse(), _ && b < W2 && ($.length = b), this && this !== gt2 && this instanceof F && (Ve = U || di(Ve)), Ve.apply(ue2, $);
        }
        return F;
      }
      function vc(t, i) {
        return function(n, c) {
          return Pm(n, t, i(c), {});
        };
      }
      function Po(t, i) {
        return function(n, c) {
          var l;
          if (n === r && c === r) return i;
          if (n !== r && (l = n), c !== r) {
            if (l === r) return c;
            typeof n == "string" || typeof c == "string" ? (n = jt(n), c = jt(c)) : (n = ic(n), c = ic(c)), l = t(n, c);
          }
          return l;
        };
      }
      function Ms2(t) {
        return Ae2(function(i) {
          return i = at2(i, Gt(A2())), B(function(n) {
            var c = this;
            return t(i, function(l) {
              return Nt(l, c, n);
            });
          });
        });
      }
      function xo2(t, i) {
        i = i === r ? " " : jt(i);
        var n = i.length;
        if (n < 2) return n ? _s(i, t) : i;
        var c = _s(i, ao(t / Or2(i)));
        return Sr2(i) ? Qe2(ne(c), 0, t).join("") : c.slice(0, t);
      }
      function Ym(t, i, n, c) {
        var l = i & tt, m2 = di(t);
        function g() {
          for (var y2 = -1, b = arguments.length, C = -1, _ = c.length, S = x2(_ + b), O2 = this && this !== gt2 && this instanceof g ? m2 : t; ++C < _; ) S[C] = c[C];
          for (; b--; ) S[C++] = arguments[++y2];
          return Nt(O2, l ? n : this, S);
        }
        return g;
      }
      function bc(t) {
        return function(i, n, c) {
          return c && typeof c != "number" && Et2(i, n, c) && (n = c = r), i = ke(i), n === r ? (n = i, i = 0) : n = ke(n), c = c === r ? i < n ? 1 : -1 : ke(c), Am(i, n, c, t);
        };
      }
      function wo(t) {
        return function(i, n) {
          return typeof i == "string" && typeof n == "string" || (i = te2(i), n = te2(n)), t(i, n);
        };
      }
      function Tc(t, i, n, c, l, m2, g, y2, b, C) {
        var _ = i & bt2, S = _ ? g : r, O2 = _ ? r : g, I = _ ? m2 : r, R = _ ? r : m2;
        i |= _ ? pe2 : xr2, i &= ~(_ ? xr2 : pe2), i & $t || (i &= ~(tt | nt));
        var U = [t, i, l, I, S, R, O2, y2, b, C], F = n.apply(r, U);
        return js(t) && Mc(F, U), F.placeholder = c, Ac(F, t, i);
      }
      function As(t) {
        var i = pt[t];
        return function(n, c) {
          if (n = te2(n), c = c == null ? 0 : Ct2(j2(c), 292), c && Au(n)) {
            var l = (Z2(n) + "e").split("e"), m2 = i(l[0] + "e" + (+l[1] + c));
            return l = (Z2(m2) + "e").split("e"), +(l[0] + "e" + (+l[1] - c));
          }
          return i(n);
        };
      }
      var Xm = Dr && 1 / Ki2(new Dr([, -0]))[1] == ir2 ? function(t) {
        return new Dr(t);
      } : ea2;
      function Pc(t) {
        return function(i) {
          var n = _t(i);
          return n == ie ? cs(i) : n == oe ? fp(i) : op(i, t(i));
        };
      }
      function Me2(t, i, n, c, l, m2, g, y2) {
        var b = i & nt;
        if (!b && typeof t != "function") throw new Xt2(h);
        var C = c ? c.length : 0;
        if (C || (i &= ~(pe2 | xr2), c = l = r), g = g === r ? g : mt2(j2(g), 0), y2 = y2 === r ? y2 : j2(y2), C -= l ? l.length : 0, i & xr2) {
          var _ = c, S = l;
          c = l = r;
        }
        var O2 = b ? r : ks(t), I = [t, i, n, c, l, _, S, m2, g, y2];
        if (O2 && ld(I, O2), t = I[0], i = I[1], n = I[2], c = I[3], l = I[4], y2 = I[9] = I[9] === r ? b ? 0 : t.length : mt2(I[9] - C, 0), !y2 && i & (bt2 | fe2) && (i &= ~(bt2 | fe2)), !i || i == tt) var R = $m(t, i, n);
        else i == bt2 || i == fe2 ? R = qm(t, i, y2) : (i == pe2 || i == (tt | pe2)) && !l.length ? R = Ym(t, i, n, c) : R = To.apply(r, I);
        var U = O2 ? ec : Mc;
        return Ac(U(R, I), t, i);
      }
      function xc(t, i, n, c) {
        return t === r || ae(t, Er[n]) && !et.call(c, n) ? i : t;
      }
      function wc(t, i, n, c, l, m2) {
        return ut2(t) && ut2(i) && (m2.set(i, t), go2(t, i, r, wc, m2), m2.delete(i)), t;
      }
      function Qm(t) {
        return vi(t) ? r : t;
      }
      function Cc(t, i, n, c, l, m2) {
        var g = n & H, y2 = t.length, b = i.length;
        if (y2 != b && !(g && b > y2)) return false;
        var C = m2.get(t), _ = m2.get(i);
        if (C && _) return C == i && _ == t;
        var S = -1, O2 = true, I = n & k ? new ar2() : r;
        for (m2.set(t, i), m2.set(i, t); ++S < y2; ) {
          var R = t[S], U = i[S];
          if (c) var F = g ? c(U, R, S, i, t, m2) : c(R, U, S, t, i, m2);
          if (F !== r) {
            if (F) continue;
            O2 = false;
            break;
          }
          if (I) {
            if (!is(i, function(W2, $) {
              if (!oi(I, $) && (R === W2 || l(R, W2, n, c, m2))) return I.push($);
            })) {
              O2 = false;
              break;
            }
          } else if (!(R === U || l(R, U, n, c, m2))) {
            O2 = false;
            break;
          }
        }
        return m2.delete(t), m2.delete(i), O2;
      }
      function Km(t, i, n, c, l, m2, g) {
        switch (n) {
          case Cr:
            if (t.byteLength != i.byteLength || t.byteOffset != i.byteOffset) return false;
            t = t.buffer, i = i.buffer;
          case ii:
            return !(t.byteLength != i.byteLength || !m2(new io(t), new io(i)));
          case Kr2:
          case Jr2:
          case Zr2:
            return ae(+t, +i);
          case Hi2:
            return t.name == i.name && t.message == i.message;
          case ti2:
          case ei2:
            return t == i + "";
          case ie:
            var y2 = cs;
          case oe:
            var b = c & H;
            if (y2 || (y2 = Ki2), t.size != i.size && !b) return false;
            var C = g.get(t);
            if (C) return C == i;
            c |= k, g.set(t, i);
            var _ = Cc(y2(t), y2(i), c, l, m2, g);
            return g.delete(t), _;
          case zi2:
            if (ci2) return ci2.call(t) == ci2.call(i);
        }
        return false;
      }
      function Jm(t, i, n, c, l, m2) {
        var g = n & H, y2 = Rs(t), b = y2.length, C = Rs(i), _ = C.length;
        if (b != _ && !g) return false;
        for (var S = b; S--; ) {
          var O2 = y2[S];
          if (!(g ? O2 in i : et.call(i, O2))) return false;
        }
        var I = m2.get(t), R = m2.get(i);
        if (I && R) return I == i && R == t;
        var U = true;
        m2.set(t, i), m2.set(i, t);
        for (var F = g; ++S < b; ) {
          O2 = y2[S];
          var W2 = t[O2], $ = i[O2];
          if (c) var Bt2 = g ? c($, W2, O2, i, t, m2) : c(W2, $, O2, t, i, m2);
          if (!(Bt2 === r ? W2 === $ || l(W2, $, n, c, m2) : Bt2)) {
            U = false;
            break;
          }
          F || (F = O2 == "constructor");
        }
        if (U && !F) {
          var Dt = t.constructor, Ht = i.constructor;
          Dt != Ht && "constructor" in t && "constructor" in i && !(typeof Dt == "function" && Dt instanceof Dt && typeof Ht == "function" && Ht instanceof Ht) && (U = false);
        }
        return m2.delete(t), m2.delete(i), U;
      }
      function Ae2(t) {
        return Bs2(Dc(t, r, Gc), t + "");
      }
      function Rs(t) {
        return Wu(t, yt, Ns);
      }
      function Fs2(t) {
        return Wu(t, Rt, _c);
      }
      var ks = co2 ? function(t) {
        return co2.get(t);
      } : ea2;
      function Co2(t) {
        for (var i = t.name + "", n = Ir[i], c = et.call(Ir, i) ? n.length : 0; c--; ) {
          var l = n[c], m2 = l.func;
          if (m2 == null || m2 == t) return l.name;
        }
        return i;
      }
      function Fr(t) {
        var i = et.call(p, "placeholder") ? p : t;
        return i.placeholder;
      }
      function A2() {
        var t = p.iteratee || Zs2;
        return t = t === Zs2 ? qu : t, arguments.length ? t(arguments[0], arguments[1]) : t;
      }
      function _o(t, i) {
        var n = t.__data__;
        return sd(i) ? n[typeof i == "string" ? "string" : "hash"] : n.map;
      }
      function Vs(t) {
        for (var i = yt(t), n = i.length; n--; ) {
          var c = i[n], l = t[c];
          i[n] = [c, l, Oc(l)];
        }
        return i;
      }
      function lr2(t, i) {
        var n = cp(t, i);
        return $u(n) ? n : r;
      }
      function Zm(t) {
        var i = et.call(t, nr2), n = t[nr2];
        try {
          t[nr2] = r;
          var c = true;
        } catch (m2) {
        }
        var l = eo.call(t);
        return c && (i ? t[nr2] = n : delete t[nr2]), l;
      }
      var Ns = hs ? function(t) {
        return t == null ? [] : (t = it2(t), Be2(hs(t), function(i) {
          return Iu.call(t, i);
        }));
      } : ra2, _c = hs ? function(t) {
        for (var i = []; t; ) He(i, Ns(t)), t = oo2(t);
        return i;
      } : ra2, _t = Ot2;
      (fs3 && _t(new fs3(new ArrayBuffer(1))) != Cr || si && _t(new si()) != ie || ps && _t(ps.resolve()) != Ua || Dr && _t(new Dr()) != oe || ai && _t(new ai()) != ri2) && (_t = function(t) {
        var i = Ot2(t), n = i == Oe2 ? t.constructor : r, c = n ? hr2(n) : "";
        if (c) switch (c) {
          case Fp:
            return Cr;
          case kp:
            return ie;
          case Vp:
            return Ua;
          case Np:
            return oe;
          case Gp:
            return ri2;
        }
        return i;
      });
      function td(t, i, n) {
        for (var c = -1, l = n.length; ++c < l; ) {
          var m2 = n[c], g = m2.size;
          switch (m2.type) {
            case "drop":
              t += g;
              break;
            case "dropRight":
              i -= g;
              break;
            case "take":
              i = Ct2(i, t + g);
              break;
            case "takeRight":
              t = mt2(t, i - g);
              break;
          }
        }
        return { start: t, end: i };
      }
      function ed(t) {
        var i = t.match(af);
        return i ? i[1].split(uf) : [];
      }
      function Lc(t, i, n) {
        i = Xe2(i, t);
        for (var c = -1, l = i.length, m2 = false; ++c < l; ) {
          var g = ye(i[c]);
          if (!(m2 = t != null && n(t, g))) break;
          t = t[g];
        }
        return m2 || ++c != l ? m2 : (l = t == null ? 0 : t.length, !!l && Mo(l) && Re2(g, l) && (G(t) || fr2(t)));
      }
      function rd(t) {
        var i = t.length, n = new t.constructor(i);
        return i && typeof t[0] == "string" && et.call(t, "index") && (n.index = t.index, n.input = t.input), n;
      }
      function Sc(t) {
        return typeof t.constructor == "function" && !gi(t) ? Mr2(oo2(t)) : {};
      }
      function id(t, i, n) {
        var c = t.constructor;
        switch (i) {
          case ii:
            return Is(t);
          case Kr2:
          case Jr2:
            return new c(+t);
          case Cr:
            return jm(t, n);
          case Vn:
          case Nn:
          case Gn:
          case jn:
          case Un:
          case Bn:
          case Hn:
          case Wn:
          case zn:
            return cc(t, n);
          case ie:
            return new c();
          case Zr2:
          case ei2:
            return new c(t);
          case ti2:
            return Um(t);
          case oe:
            return new c();
          case zi2:
            return Bm(t);
        }
      }
      function od(t, i) {
        var n = i.length;
        if (!n) return t;
        var c = n - 1;
        return i[c] = (n > 1 ? "& " : "") + i[c], i = i.join(n > 2 ? ", " : " "), t.replace(sf, `{
/* [wrapped with ` + i + `] */
`);
      }
      function nd(t) {
        return G(t) || fr2(t) || !!(Mu2 && t && t[Mu2]);
      }
      function Re2(t, i) {
        var n = typeof t;
        return i = i != null ? i : Ue, !!i && (n == "number" || n != "symbol" && yf.test(t)) && t > -1 && t % 1 == 0 && t < i;
      }
      function Et2(t, i, n) {
        if (!ut2(n)) return false;
        var c = typeof i;
        return (c == "number" ? At(n) && Re2(i, n.length) : c == "string" && i in n) ? ae(n[i], t) : false;
      }
      function Gs(t, i) {
        if (G(t)) return false;
        var n = typeof t;
        return n == "number" || n == "symbol" || n == "boolean" || t == null || Ut2(t) ? true : ef.test(t) || !tf.test(t) || i != null && t in it2(i);
      }
      function sd(t) {
        var i = typeof t;
        return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? t !== "__proto__" : t === null;
      }
      function js(t) {
        var i = Co2(t), n = p[i];
        if (typeof n != "function" || !(i in z.prototype)) return false;
        if (t === n) return true;
        var c = ks(n);
        return !!c && t === c[0];
      }
      function ad(t) {
        return !!Ou && Ou in t;
      }
      var ud = Zi2 ? Fe2 : ia2;
      function gi(t) {
        var i = t && t.constructor, n = typeof i == "function" && i.prototype || Er;
        return t === n;
      }
      function Oc(t) {
        return t === t && !ut2(t);
      }
      function Ec(t, i) {
        return function(n) {
          return n == null ? false : n[t] === i && (i !== r || t in it2(n));
        };
      }
      function cd(t) {
        var i = Do(t, function(c) {
          return n.size === P2 && n.clear(), c;
        }), n = i.cache;
        return i;
      }
      function ld(t, i) {
        var n = t[1], c = i[1], l = n | c, m2 = l < (tt | nt | Se), g = c == Se && n == bt2 || c == Se && n == Qr2 && t[7].length <= i[8] || c == (Se | Qr2) && i[7].length <= i[8] && n == bt2;
        if (!(m2 || g)) return t;
        c & tt && (t[2] = i[2], l |= n & tt ? 0 : $t);
        var y2 = i[3];
        if (y2) {
          var b = t[3];
          t[3] = b ? hc(b, y2, i[4]) : y2, t[4] = b ? We(t[3], L2) : i[4];
        }
        return y2 = i[5], y2 && (b = t[5], t[5] = b ? fc(b, y2, i[6]) : y2, t[6] = b ? We(t[5], L2) : i[6]), y2 = i[7], y2 && (t[7] = y2), c & Se && (t[8] = t[8] == null ? i[8] : Ct2(t[8], i[8])), t[9] == null && (t[9] = i[9]), t[0] = i[0], t[1] = l, t;
      }
      function hd(t) {
        var i = [];
        if (t != null) for (var n in it2(t)) i.push(n);
        return i;
      }
      function fd(t) {
        return eo.call(t);
      }
      function Dc(t, i, n) {
        return i = mt2(i === r ? t.length - 1 : i, 0), function() {
          for (var c = arguments, l = -1, m2 = mt2(c.length - i, 0), g = x2(m2); ++l < m2; ) g[l] = c[i + l];
          l = -1;
          for (var y2 = x2(i + 1); ++l < i; ) y2[l] = c[l];
          return y2[i] = n(g), Nt(t, this, y2);
        };
      }
      function Ic(t, i) {
        return i.length < 2 ? t : cr2(t, Jt2(i, 0, -1));
      }
      function pd(t, i) {
        for (var n = t.length, c = Ct2(i.length, n), l = Mt(t); c--; ) {
          var m2 = i[c];
          t[c] = Re2(m2, n) ? l[m2] : r;
        }
        return t;
      }
      function Us(t, i) {
        if (!(i === "constructor" && typeof t[i] == "function") && i != "__proto__") return t[i];
      }
      var Mc = Rc(ec), yi = Op || function(t, i) {
        return gt2.setTimeout(t, i);
      }, Bs2 = Rc(km);
      function Ac(t, i, n) {
        var c = i + "";
        return Bs2(t, od(c, md(ed(c), n)));
      }
      function Rc(t) {
        var i = 0, n = 0;
        return function() {
          var c = Mp(), l = Rh - (c - n);
          if (n = c, l > 0) {
            if (++i >= Ah) return arguments[0];
          } else i = 0;
          return t.apply(r, arguments);
        };
      }
      function Lo(t, i) {
        var n = -1, c = t.length, l = c - 1;
        for (i = i === r ? c : i; ++n < i; ) {
          var m2 = Cs(n, l), g = t[m2];
          t[m2] = t[n], t[n] = g;
        }
        return t.length = i, t;
      }
      var Fc = cd(function(t) {
        var i = [];
        return t.charCodeAt(0) === 46 && i.push(""), t.replace(rf, function(n, c, l, m2) {
          i.push(l ? m2.replace(hf, "$1") : c || n);
        }), i;
      });
      function ye(t) {
        if (typeof t == "string" || Ut2(t)) return t;
        var i = t + "";
        return i == "0" && 1 / t == -ir2 ? "-0" : i;
      }
      function hr2(t) {
        if (t != null) {
          try {
            return to.call(t);
          } catch (i) {
          }
          try {
            return t + "";
          } catch (i) {
          }
        }
        return "";
      }
      function md(t, i) {
        return Yt(jh, function(n) {
          var c = "_." + n[0];
          i & n[1] && !Xi2(t, c) && t.push(c);
        }), t.sort();
      }
      function kc(t) {
        if (t instanceof z) return t.clone();
        var i = new Qt2(t.__wrapped__, t.__chain__);
        return i.__actions__ = Mt(t.__actions__), i.__index__ = t.__index__, i.__values__ = t.__values__, i;
      }
      function dd(t, i, n) {
        (n ? Et2(t, i, n) : i === r) ? i = 1 : i = mt2(j2(i), 0);
        var c = t == null ? 0 : t.length;
        if (!c || i < 1) return [];
        for (var l = 0, m2 = 0, g = x2(ao(c / i)); l < c; ) g[m2++] = Jt2(t, l, l += i);
        return g;
      }
      function gd(t) {
        for (var i = -1, n = t == null ? 0 : t.length, c = 0, l = []; ++i < n; ) {
          var m2 = t[i];
          m2 && (l[c++] = m2);
        }
        return l;
      }
      function yd() {
        var t = arguments.length;
        if (!t) return [];
        for (var i = x2(t - 1), n = arguments[0], c = t; c--; ) i[c - 1] = arguments[c];
        return He(G(n) ? Mt(n) : [n], Tt(i, 1));
      }
      var vd = B(function(t, i) {
        return lt2(t) ? hi(t, Tt(i, 1, lt2, true)) : [];
      }), bd = B(function(t, i) {
        var n = Zt2(i);
        return lt2(n) && (n = r), lt2(t) ? hi(t, Tt(i, 1, lt2, true), A2(n, 2)) : [];
      }), Td = B(function(t, i) {
        var n = Zt2(i);
        return lt2(n) && (n = r), lt2(t) ? hi(t, Tt(i, 1, lt2, true), r, n) : [];
      });
      function Pd(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j2(i), Jt2(t, i < 0 ? 0 : i, c)) : [];
      }
      function xd(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j2(i), i = c - i, Jt2(t, 0, i < 0 ? 0 : i)) : [];
      }
      function wd(t, i) {
        return t && t.length ? vo2(t, A2(i, 3), true, true) : [];
      }
      function Cd(t, i) {
        return t && t.length ? vo2(t, A2(i, 3), true) : [];
      }
      function _d(t, i, n, c) {
        var l = t == null ? 0 : t.length;
        return l ? (n && typeof n != "number" && Et2(t, i, n) && (n = 0, c = l), ym(t, i, n, c)) : [];
      }
      function Vc(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = n == null ? 0 : j2(n);
        return l < 0 && (l = mt2(c + l, 0)), Qi2(t, A2(i, 3), l);
      }
      function Nc(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = c - 1;
        return n !== r && (l = j2(n), l = n < 0 ? mt2(c + l, 0) : Ct2(l, c - 1)), Qi2(t, A2(i, 3), l, true);
      }
      function Gc(t) {
        var i = t == null ? 0 : t.length;
        return i ? Tt(t, 1) : [];
      }
      function Ld(t) {
        var i = t == null ? 0 : t.length;
        return i ? Tt(t, ir2) : [];
      }
      function Sd(t, i) {
        var n = t == null ? 0 : t.length;
        return n ? (i = i === r ? 1 : j2(i), Tt(t, i)) : [];
      }
      function Od(t) {
        for (var i = -1, n = t == null ? 0 : t.length, c = {}; ++i < n; ) {
          var l = t[i];
          c[l[0]] = l[1];
        }
        return c;
      }
      function jc(t) {
        return t && t.length ? t[0] : r;
      }
      function Ed(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = n == null ? 0 : j2(n);
        return l < 0 && (l = mt2(c + l, 0)), Lr(t, i, l);
      }
      function Dd(t) {
        var i = t == null ? 0 : t.length;
        return i ? Jt2(t, 0, -1) : [];
      }
      var Id = B(function(t) {
        var i = at2(t, Es2);
        return i.length && i[0] === t[0] ? bs(i) : [];
      }), Md = B(function(t) {
        var i = Zt2(t), n = at2(t, Es2);
        return i === Zt2(n) ? i = r : n.pop(), n.length && n[0] === t[0] ? bs(n, A2(i, 2)) : [];
      }), Ad = B(function(t) {
        var i = Zt2(t), n = at2(t, Es2);
        return i = typeof i == "function" ? i : r, i && n.pop(), n.length && n[0] === t[0] ? bs(n, r, i) : [];
      });
      function Rd(t, i) {
        return t == null ? "" : Dp.call(t, i);
      }
      function Zt2(t) {
        var i = t == null ? 0 : t.length;
        return i ? t[i - 1] : r;
      }
      function Fd(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = c;
        return n !== r && (l = j2(n), l = l < 0 ? mt2(c + l, 0) : Ct2(l, c - 1)), i === i ? mp(t, i, l) : Qi2(t, Tu, l, true);
      }
      function kd(t, i) {
        return t && t.length ? Ku(t, j2(i)) : r;
      }
      var Vd = B(Uc);
      function Uc(t, i) {
        return t && t.length && i && i.length ? ws2(t, i) : t;
      }
      function Nd(t, i, n) {
        return t && t.length && i && i.length ? ws2(t, i, A2(n, 2)) : t;
      }
      function Gd(t, i, n) {
        return t && t.length && i && i.length ? ws2(t, i, r, n) : t;
      }
      var jd = Ae2(function(t, i) {
        var n = t == null ? 0 : t.length, c = ds2(t, i);
        return tc(t, at2(i, function(l) {
          return Re2(l, n) ? +l : l;
        }).sort(lc)), c;
      });
      function Ud(t, i) {
        var n = [];
        if (!(t && t.length)) return n;
        var c = -1, l = [], m2 = t.length;
        for (i = A2(i, 3); ++c < m2; ) {
          var g = t[c];
          i(g, c, t) && (n.push(g), l.push(c));
        }
        return tc(t, l), n;
      }
      function Hs2(t) {
        return t == null ? t : Rp.call(t);
      }
      function Bd(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (n && typeof n != "number" && Et2(t, i, n) ? (i = 0, n = c) : (i = i == null ? 0 : j2(i), n = n === r ? c : j2(n)), Jt2(t, i, n)) : [];
      }
      function Hd(t, i) {
        return yo(t, i);
      }
      function Wd(t, i, n) {
        return Ls(t, i, A2(n, 2));
      }
      function zd(t, i) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var c = yo(t, i);
          if (c < n && ae(t[c], i)) return c;
        }
        return -1;
      }
      function $d(t, i) {
        return yo(t, i, true);
      }
      function qd(t, i, n) {
        return Ls(t, i, A2(n, 2), true);
      }
      function Yd(t, i) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var c = yo(t, i, true) - 1;
          if (ae(t[c], i)) return c;
        }
        return -1;
      }
      function Xd(t) {
        return t && t.length ? rc(t) : [];
      }
      function Qd(t, i) {
        return t && t.length ? rc(t, A2(i, 2)) : [];
      }
      function Kd(t) {
        var i = t == null ? 0 : t.length;
        return i ? Jt2(t, 1, i) : [];
      }
      function Jd(t, i, n) {
        return t && t.length ? (i = n || i === r ? 1 : j2(i), Jt2(t, 0, i < 0 ? 0 : i)) : [];
      }
      function Zd(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j2(i), i = c - i, Jt2(t, i < 0 ? 0 : i, c)) : [];
      }
      function tg(t, i) {
        return t && t.length ? vo2(t, A2(i, 3), false, true) : [];
      }
      function eg(t, i) {
        return t && t.length ? vo2(t, A2(i, 3)) : [];
      }
      var rg = B(function(t) {
        return Ye2(Tt(t, 1, lt2, true));
      }), ig = B(function(t) {
        var i = Zt2(t);
        return lt2(i) && (i = r), Ye2(Tt(t, 1, lt2, true), A2(i, 2));
      }), og = B(function(t) {
        var i = Zt2(t);
        return i = typeof i == "function" ? i : r, Ye2(Tt(t, 1, lt2, true), r, i);
      });
      function ng(t) {
        return t && t.length ? Ye2(t) : [];
      }
      function sg(t, i) {
        return t && t.length ? Ye2(t, A2(i, 2)) : [];
      }
      function ag(t, i) {
        return i = typeof i == "function" ? i : r, t && t.length ? Ye2(t, r, i) : [];
      }
      function Ws(t) {
        if (!(t && t.length)) return [];
        var i = 0;
        return t = Be2(t, function(n) {
          if (lt2(n)) return i = mt2(n.length, i), true;
        }), as2(i, function(n) {
          return at2(t, os(n));
        });
      }
      function Bc(t, i) {
        if (!(t && t.length)) return [];
        var n = Ws(t);
        return i == null ? n : at2(n, function(c) {
          return Nt(i, r, c);
        });
      }
      var ug = B(function(t, i) {
        return lt2(t) ? hi(t, i) : [];
      }), cg = B(function(t) {
        return Os2(Be2(t, lt2));
      }), lg = B(function(t) {
        var i = Zt2(t);
        return lt2(i) && (i = r), Os2(Be2(t, lt2), A2(i, 2));
      }), hg = B(function(t) {
        var i = Zt2(t);
        return i = typeof i == "function" ? i : r, Os2(Be2(t, lt2), r, i);
      }), fg = B(Ws);
      function pg(t, i) {
        return sc(t || [], i || [], li);
      }
      function mg(t, i) {
        return sc(t || [], i || [], mi2);
      }
      var dg = B(function(t) {
        var i = t.length, n = i > 1 ? t[i - 1] : r;
        return n = typeof n == "function" ? (t.pop(), n) : r, Bc(t, n);
      });
      function Hc(t) {
        var i = p(t);
        return i.__chain__ = true, i;
      }
      function gg(t, i) {
        return i(t), t;
      }
      function So(t, i) {
        return i(t);
      }
      var yg = Ae2(function(t) {
        var i = t.length, n = i ? t[0] : 0, c = this.__wrapped__, l = function(m2) {
          return ds2(m2, t);
        };
        return i > 1 || this.__actions__.length || !(c instanceof z) || !Re2(n) ? this.thru(l) : (c = c.slice(n, +n + (i ? 1 : 0)), c.__actions__.push({ func: So, args: [l], thisArg: r }), new Qt2(c, this.__chain__).thru(function(m2) {
          return i && !m2.length && m2.push(r), m2;
        }));
      });
      function vg() {
        return Hc(this);
      }
      function bg() {
        return new Qt2(this.value(), this.__chain__);
      }
      function Tg() {
        this.__values__ === r && (this.__values__ = il(this.value()));
        var t = this.__index__ >= this.__values__.length, i = t ? r : this.__values__[this.__index__++];
        return { done: t, value: i };
      }
      function Pg() {
        return this;
      }
      function xg(t) {
        for (var i, n = this; n instanceof ho; ) {
          var c = kc(n);
          c.__index__ = 0, c.__values__ = r, i ? l.__wrapped__ = c : i = c;
          var l = c;
          n = n.__wrapped__;
        }
        return l.__wrapped__ = t, i;
      }
      function wg() {
        var t = this.__wrapped__;
        if (t instanceof z) {
          var i = t;
          return this.__actions__.length && (i = new z(this)), i = i.reverse(), i.__actions__.push({ func: So, args: [Hs2], thisArg: r }), new Qt2(i, this.__chain__);
        }
        return this.thru(Hs2);
      }
      function Cg() {
        return nc(this.__wrapped__, this.__actions__);
      }
      var _g = bo(function(t, i, n) {
        et.call(t, n) ? ++t[n] : Ie2(t, n, 1);
      });
      function Lg(t, i, n) {
        var c = G(t) ? vu : gm;
        return n && Et2(t, i, n) && (i = r), c(t, A2(i, 3));
      }
      function Sg(t, i) {
        var n = G(t) ? Be2 : Bu;
        return n(t, A2(i, 3));
      }
      var Og = gc(Vc), Eg = gc(Nc);
      function Dg(t, i) {
        return Tt(Oo(t, i), 1);
      }
      function Ig(t, i) {
        return Tt(Oo(t, i), ir2);
      }
      function Mg(t, i, n) {
        return n = n === r ? 1 : j2(n), Tt(Oo(t, i), n);
      }
      function Wc(t, i) {
        var n = G(t) ? Yt : qe;
        return n(t, A2(i, 3));
      }
      function zc(t, i) {
        var n = G(t) ? Kf : Uu;
        return n(t, A2(i, 3));
      }
      var Ag = bo(function(t, i, n) {
        et.call(t, n) ? t[n].push(i) : Ie2(t, n, [i]);
      });
      function Rg(t, i, n, c) {
        t = At(t) ? t : Vr2(t), n = n && !c ? j2(n) : 0;
        var l = t.length;
        return n < 0 && (n = mt2(l + n, 0)), Ao2(t) ? n <= l && t.indexOf(i, n) > -1 : !!l && Lr(t, i, n) > -1;
      }
      var Fg = B(function(t, i, n) {
        var c = -1, l = typeof i == "function", m2 = At(t) ? x2(t.length) : [];
        return qe(t, function(g) {
          m2[++c] = l ? Nt(i, g, n) : fi(g, i, n);
        }), m2;
      }), kg = bo(function(t, i, n) {
        Ie2(t, n, i);
      });
      function Oo(t, i) {
        var n = G(t) ? at2 : Yu;
        return n(t, A2(i, 3));
      }
      function Vg(t, i, n, c) {
        return t == null ? [] : (G(i) || (i = i == null ? [] : [i]), n = c ? r : n, G(n) || (n = n == null ? [] : [n]), Ju(t, i, n));
      }
      var Ng = bo(function(t, i, n) {
        t[n ? 0 : 1].push(i);
      }, function() {
        return [[], []];
      });
      function Gg(t, i, n) {
        var c = G(t) ? rs : xu, l = arguments.length < 3;
        return c(t, A2(i, 4), n, l, qe);
      }
      function jg(t, i, n) {
        var c = G(t) ? Jf : xu, l = arguments.length < 3;
        return c(t, A2(i, 4), n, l, Uu);
      }
      function Ug(t, i) {
        var n = G(t) ? Be2 : Bu;
        return n(t, Io(A2(i, 3)));
      }
      function Bg(t) {
        var i = G(t) ? Vu : Rm;
        return i(t);
      }
      function Hg(t, i, n) {
        (n ? Et2(t, i, n) : i === r) ? i = 1 : i = j2(i);
        var c = G(t) ? hm : Fm;
        return c(t, i);
      }
      function Wg(t) {
        var i = G(t) ? fm : Vm;
        return i(t);
      }
      function zg(t) {
        if (t == null) return 0;
        if (At(t)) return Ao2(t) ? Or2(t) : t.length;
        var i = _t(t);
        return i == ie || i == oe ? t.size : Ps(t).length;
      }
      function $g(t, i, n) {
        var c = G(t) ? is : Nm;
        return n && Et2(t, i, n) && (i = r), c(t, A2(i, 3));
      }
      var qg = B(function(t, i) {
        if (t == null) return [];
        var n = i.length;
        return n > 1 && Et2(t, i[0], i[1]) ? i = [] : n > 2 && Et2(i[0], i[1], i[2]) && (i = [i[0]]), Ju(t, Tt(i, 1), []);
      }), Eo2 = Sp || function() {
        return gt2.Date.now();
      };
      function Yg(t, i) {
        if (typeof i != "function") throw new Xt2(h);
        return t = j2(t), function() {
          if (--t < 1) return i.apply(this, arguments);
        };
      }
      function $c(t, i, n) {
        return i = n ? r : i, i = t && i == null ? t.length : i, Me2(t, Se, r, r, r, r, i);
      }
      function qc(t, i) {
        var n;
        if (typeof i != "function") throw new Xt2(h);
        return t = j2(t), function() {
          return --t > 0 && (n = i.apply(this, arguments)), t <= 1 && (i = r), n;
        };
      }
      var zs = B(function(t, i, n) {
        var c = tt;
        if (n.length) {
          var l = We(n, Fr(zs));
          c |= pe2;
        }
        return Me2(t, c, i, n, l);
      }), Yc = B(function(t, i, n) {
        var c = tt | nt;
        if (n.length) {
          var l = We(n, Fr(Yc));
          c |= pe2;
        }
        return Me2(i, c, t, n, l);
      });
      function Xc(t, i, n) {
        i = n ? r : i;
        var c = Me2(t, bt2, r, r, r, r, r, i);
        return c.placeholder = Xc.placeholder, c;
      }
      function Qc(t, i, n) {
        i = n ? r : i;
        var c = Me2(t, fe2, r, r, r, r, r, i);
        return c.placeholder = Qc.placeholder, c;
      }
      function Kc(t, i, n) {
        var c, l, m2, g, y2, b, C = 0, _ = false, S = false, O2 = true;
        if (typeof t != "function") throw new Xt2(h);
        i = te2(i) || 0, ut2(n) && (_ = !!n.leading, S = "maxWait" in n, m2 = S ? mt2(te2(n.maxWait) || 0, i) : m2, O2 = "trailing" in n ? !!n.trailing : O2);
        function I(ht2) {
          var ue2 = c, Ve = l;
          return c = l = r, C = ht2, g = t.apply(Ve, ue2), g;
        }
        function R(ht2) {
          return C = ht2, y2 = yi(W2, i), _ ? I(ht2) : g;
        }
        function U(ht2) {
          var ue2 = ht2 - b, Ve = ht2 - C, gl = i - ue2;
          return S ? Ct2(gl, m2 - Ve) : gl;
        }
        function F(ht2) {
          var ue2 = ht2 - b, Ve = ht2 - C;
          return b === r || ue2 >= i || ue2 < 0 || S && Ve >= m2;
        }
        function W2() {
          var ht2 = Eo2();
          if (F(ht2)) return $(ht2);
          y2 = yi(W2, U(ht2));
        }
        function $(ht2) {
          return y2 = r, O2 && c ? I(ht2) : (c = l = r, g);
        }
        function Bt2() {
          y2 !== r && ac(y2), C = 0, c = b = l = y2 = r;
        }
        function Dt() {
          return y2 === r ? g : $(Eo2());
        }
        function Ht() {
          var ht2 = Eo2(), ue2 = F(ht2);
          if (c = arguments, l = this, b = ht2, ue2) {
            if (y2 === r) return R(b);
            if (S) return ac(y2), y2 = yi(W2, i), I(b);
          }
          return y2 === r && (y2 = yi(W2, i)), g;
        }
        return Ht.cancel = Bt2, Ht.flush = Dt, Ht;
      }
      var Xg = B(function(t, i) {
        return ju(t, 1, i);
      }), Qg = B(function(t, i, n) {
        return ju(t, te2(i) || 0, n);
      });
      function Kg(t) {
        return Me2(t, kn2);
      }
      function Do(t, i) {
        if (typeof t != "function" || i != null && typeof i != "function") throw new Xt2(h);
        var n = function() {
          var c = arguments, l = i ? i.apply(this, c) : c[0], m2 = n.cache;
          if (m2.has(l)) return m2.get(l);
          var g = t.apply(this, c);
          return n.cache = m2.set(l, g) || m2, g;
        };
        return n.cache = new (Do.Cache || De2)(), n;
      }
      Do.Cache = De2;
      function Io(t) {
        if (typeof t != "function") throw new Xt2(h);
        return function() {
          var i = arguments;
          switch (i.length) {
            case 0:
              return !t.call(this);
            case 1:
              return !t.call(this, i[0]);
            case 2:
              return !t.call(this, i[0], i[1]);
            case 3:
              return !t.call(this, i[0], i[1], i[2]);
          }
          return !t.apply(this, i);
        };
      }
      function Jg(t) {
        return qc(2, t);
      }
      var Zg = Gm(function(t, i) {
        i = i.length == 1 && G(i[0]) ? at2(i[0], Gt(A2())) : at2(Tt(i, 1), Gt(A2()));
        var n = i.length;
        return B(function(c) {
          for (var l = -1, m2 = Ct2(c.length, n); ++l < m2; ) c[l] = i[l].call(this, c[l]);
          return Nt(t, this, c);
        });
      }), $s2 = B(function(t, i) {
        var n = We(i, Fr($s2));
        return Me2(t, pe2, r, i, n);
      }), Jc = B(function(t, i) {
        var n = We(i, Fr(Jc));
        return Me2(t, xr2, r, i, n);
      }), ty = Ae2(function(t, i) {
        return Me2(t, Qr2, r, r, r, i);
      });
      function ey(t, i) {
        if (typeof t != "function") throw new Xt2(h);
        return i = i === r ? i : j2(i), B(t, i);
      }
      function ry(t, i) {
        if (typeof t != "function") throw new Xt2(h);
        return i = i == null ? 0 : mt2(j2(i), 0), B(function(n) {
          var c = n[i], l = Qe2(n, 0, i);
          return c && He(l, c), Nt(t, this, l);
        });
      }
      function iy(t, i, n) {
        var c = true, l = true;
        if (typeof t != "function") throw new Xt2(h);
        return ut2(n) && (c = "leading" in n ? !!n.leading : c, l = "trailing" in n ? !!n.trailing : l), Kc(t, i, { leading: c, maxWait: i, trailing: l });
      }
      function oy(t) {
        return $c(t, 1);
      }
      function ny(t, i) {
        return $s2(Ds2(i), t);
      }
      function sy() {
        if (!arguments.length) return [];
        var t = arguments[0];
        return G(t) ? t : [t];
      }
      function ay(t) {
        return Kt2(t, M);
      }
      function uy(t, i) {
        return i = typeof i == "function" ? i : r, Kt2(t, M, i);
      }
      function cy(t) {
        return Kt2(t, D | M);
      }
      function ly(t, i) {
        return i = typeof i == "function" ? i : r, Kt2(t, D | M, i);
      }
      function hy(t, i) {
        return i == null || Gu(t, i, yt(i));
      }
      function ae(t, i) {
        return t === i || t !== t && i !== i;
      }
      var fy = wo(vs), py = wo(function(t, i) {
        return t >= i;
      }), fr2 = zu(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? zu : function(t) {
        return ct(t) && et.call(t, "callee") && !Iu.call(t, "callee");
      }, G = x2.isArray, my = fu ? Gt(fu) : xm;
      function At(t) {
        return t != null && Mo(t.length) && !Fe2(t);
      }
      function lt2(t) {
        return ct(t) && At(t);
      }
      function dy(t) {
        return t === true || t === false || ct(t) && Ot2(t) == Kr2;
      }
      var Ke2 = Ep || ia2, gy = pu ? Gt(pu) : wm;
      function yy(t) {
        return ct(t) && t.nodeType === 1 && !vi(t);
      }
      function vy(t) {
        if (t == null) return true;
        if (At(t) && (G(t) || typeof t == "string" || typeof t.splice == "function" || Ke2(t) || kr2(t) || fr2(t))) return !t.length;
        var i = _t(t);
        if (i == ie || i == oe) return !t.size;
        if (gi(t)) return !Ps(t).length;
        for (var n in t) if (et.call(t, n)) return false;
        return true;
      }
      function by(t, i) {
        return pi(t, i);
      }
      function Ty(t, i, n) {
        n = typeof n == "function" ? n : r;
        var c = n ? n(t, i) : r;
        return c === r ? pi(t, i, r, n) : !!c;
      }
      function qs(t) {
        if (!ct(t)) return false;
        var i = Ot2(t);
        return i == Hi2 || i == Bh || typeof t.message == "string" && typeof t.name == "string" && !vi(t);
      }
      function Py(t) {
        return typeof t == "number" && Au(t);
      }
      function Fe2(t) {
        if (!ut2(t)) return false;
        var i = Ot2(t);
        return i == Wi2 || i == ja || i == Uh || i == Wh;
      }
      function Zc(t) {
        return typeof t == "number" && t == j2(t);
      }
      function Mo(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Ue;
      }
      function ut2(t) {
        var i = typeof t;
        return t != null && (i == "object" || i == "function");
      }
      function ct(t) {
        return t != null && typeof t == "object";
      }
      var tl = mu ? Gt(mu) : _m;
      function xy(t, i) {
        return t === i || Ts(t, i, Vs(i));
      }
      function wy(t, i, n) {
        return n = typeof n == "function" ? n : r, Ts(t, i, Vs(i), n);
      }
      function Cy(t) {
        return el(t) && t != +t;
      }
      function _y(t) {
        if (ud(t)) throw new N(u);
        return $u(t);
      }
      function Ly(t) {
        return t === null;
      }
      function Sy(t) {
        return t == null;
      }
      function el(t) {
        return typeof t == "number" || ct(t) && Ot2(t) == Zr2;
      }
      function vi(t) {
        if (!ct(t) || Ot2(t) != Oe2) return false;
        var i = oo2(t);
        if (i === null) return true;
        var n = et.call(i, "constructor") && i.constructor;
        return typeof n == "function" && n instanceof n && to.call(n) == wp;
      }
      var Ys = du ? Gt(du) : Lm;
      function Oy(t) {
        return Zc(t) && t >= -Ue && t <= Ue;
      }
      var rl = gu ? Gt(gu) : Sm;
      function Ao2(t) {
        return typeof t == "string" || !G(t) && ct(t) && Ot2(t) == ei2;
      }
      function Ut2(t) {
        return typeof t == "symbol" || ct(t) && Ot2(t) == zi2;
      }
      var kr2 = yu ? Gt(yu) : Om;
      function Ey(t) {
        return t === r;
      }
      function Dy(t) {
        return ct(t) && _t(t) == ri2;
      }
      function Iy(t) {
        return ct(t) && Ot2(t) == $h;
      }
      var My = wo(xs), Ay = wo(function(t, i) {
        return t <= i;
      });
      function il(t) {
        if (!t) return [];
        if (At(t)) return Ao2(t) ? ne(t) : Mt(t);
        if (ni && t[ni]) return hp(t[ni]());
        var i = _t(t), n = i == ie ? cs : i == oe ? Ki2 : Vr2;
        return n(t);
      }
      function ke(t) {
        if (!t) return t === 0 ? t : 0;
        if (t = te2(t), t === ir2 || t === -ir2) {
          var i = t < 0 ? -1 : 1;
          return i * Vh;
        }
        return t === t ? t : 0;
      }
      function j2(t) {
        var i = ke(t), n = i % 1;
        return i === i ? n ? i - n : i : 0;
      }
      function ol(t) {
        return t ? ur2(j2(t), 0, me2) : 0;
      }
      function te2(t) {
        if (typeof t == "number") return t;
        if (Ut2(t)) return Ui2;
        if (ut2(t)) {
          var i = typeof t.valueOf == "function" ? t.valueOf() : t;
          t = ut2(i) ? i + "" : i;
        }
        if (typeof t != "string") return t === 0 ? t : +t;
        t = wu(t);
        var n = mf.test(t);
        return n || gf.test(t) ? Yf(t.slice(2), n ? 2 : 8) : pf.test(t) ? Ui2 : +t;
      }
      function nl(t) {
        return ge2(t, Rt(t));
      }
      function Ry(t) {
        return t ? ur2(j2(t), -Ue, Ue) : t === 0 ? t : 0;
      }
      function Z2(t) {
        return t == null ? "" : jt(t);
      }
      var Fy = Ar2(function(t, i) {
        if (gi(i) || At(i)) {
          ge2(i, yt(i), t);
          return;
        }
        for (var n in i) et.call(i, n) && li(t, n, i[n]);
      }), sl = Ar2(function(t, i) {
        ge2(i, Rt(i), t);
      }), Ro = Ar2(function(t, i, n, c) {
        ge2(i, Rt(i), t, c);
      }), ky = Ar2(function(t, i, n, c) {
        ge2(i, yt(i), t, c);
      }), Vy = Ae2(ds2);
      function Ny(t, i) {
        var n = Mr2(t);
        return i == null ? n : Nu(n, i);
      }
      var Gy = B(function(t, i) {
        t = it2(t);
        var n = -1, c = i.length, l = c > 2 ? i[2] : r;
        for (l && Et2(i[0], i[1], l) && (c = 1); ++n < c; ) for (var m2 = i[n], g = Rt(m2), y2 = -1, b = g.length; ++y2 < b; ) {
          var C = g[y2], _ = t[C];
          (_ === r || ae(_, Er[C]) && !et.call(t, C)) && (t[C] = m2[C]);
        }
        return t;
      }), jy = B(function(t) {
        return t.push(r, wc), Nt(al, r, t);
      });
      function Uy(t, i) {
        return bu(t, A2(i, 3), de2);
      }
      function By(t, i) {
        return bu(t, A2(i, 3), ys);
      }
      function Hy(t, i) {
        return t == null ? t : gs(t, A2(i, 3), Rt);
      }
      function Wy(t, i) {
        return t == null ? t : Hu(t, A2(i, 3), Rt);
      }
      function zy(t, i) {
        return t && de2(t, A2(i, 3));
      }
      function $y(t, i) {
        return t && ys(t, A2(i, 3));
      }
      function qy(t) {
        return t == null ? [] : mo(t, yt(t));
      }
      function Yy(t) {
        return t == null ? [] : mo(t, Rt(t));
      }
      function Xs(t, i, n) {
        var c = t == null ? r : cr2(t, i);
        return c === r ? n : c;
      }
      function Xy(t, i) {
        return t != null && Lc(t, i, vm);
      }
      function Qs2(t, i) {
        return t != null && Lc(t, i, bm);
      }
      var Qy = vc(function(t, i, n) {
        i != null && typeof i.toString != "function" && (i = eo.call(i)), t[i] = n;
      }, Js(Ft)), Ky = vc(function(t, i, n) {
        i != null && typeof i.toString != "function" && (i = eo.call(i)), et.call(t, i) ? t[i].push(n) : t[i] = [n];
      }, A2), Jy = B(fi);
      function yt(t) {
        return At(t) ? ku(t) : Ps(t);
      }
      function Rt(t) {
        return At(t) ? ku(t, true) : Em(t);
      }
      function Zy(t, i) {
        var n = {};
        return i = A2(i, 3), de2(t, function(c, l, m2) {
          Ie2(n, i(c, l, m2), c);
        }), n;
      }
      function tv(t, i) {
        var n = {};
        return i = A2(i, 3), de2(t, function(c, l, m2) {
          Ie2(n, l, i(c, l, m2));
        }), n;
      }
      var ev = Ar2(function(t, i, n) {
        go2(t, i, n);
      }), al = Ar2(function(t, i, n, c) {
        go2(t, i, n, c);
      }), rv = Ae2(function(t, i) {
        var n = {};
        if (t == null) return n;
        var c = false;
        i = at2(i, function(m2) {
          return m2 = Xe2(m2, t), c || (c = m2.length > 1), m2;
        }), ge2(t, Fs2(t), n), c && (n = Kt2(n, D | J | M, Qm));
        for (var l = i.length; l--; ) Ss2(n, i[l]);
        return n;
      });
      function iv(t, i) {
        return ul(t, Io(A2(i)));
      }
      var ov = Ae2(function(t, i) {
        return t == null ? {} : Im(t, i);
      });
      function ul(t, i) {
        if (t == null) return {};
        var n = at2(Fs2(t), function(c) {
          return [c];
        });
        return i = A2(i), Zu(t, n, function(c, l) {
          return i(c, l[0]);
        });
      }
      function nv(t, i, n) {
        i = Xe2(i, t);
        var c = -1, l = i.length;
        for (l || (l = 1, t = r); ++c < l; ) {
          var m2 = t == null ? r : t[ye(i[c])];
          m2 === r && (c = l, m2 = n), t = Fe2(m2) ? m2.call(t) : m2;
        }
        return t;
      }
      function sv(t, i, n) {
        return t == null ? t : mi2(t, i, n);
      }
      function av(t, i, n, c) {
        return c = typeof c == "function" ? c : r, t == null ? t : mi2(t, i, n, c);
      }
      var cl = Pc(yt), ll = Pc(Rt);
      function uv(t, i, n) {
        var c = G(t), l = c || Ke2(t) || kr2(t);
        if (i = A2(i, 4), n == null) {
          var m2 = t && t.constructor;
          l ? n = c ? new m2() : [] : ut2(t) ? n = Fe2(m2) ? Mr2(oo2(t)) : {} : n = {};
        }
        return (l ? Yt : de2)(t, function(g, y2, b) {
          return i(n, g, y2, b);
        }), n;
      }
      function cv(t, i) {
        return t == null ? true : Ss2(t, i);
      }
      function lv(t, i, n) {
        return t == null ? t : oc(t, i, Ds2(n));
      }
      function hv(t, i, n, c) {
        return c = typeof c == "function" ? c : r, t == null ? t : oc(t, i, Ds2(n), c);
      }
      function Vr2(t) {
        return t == null ? [] : us(t, yt(t));
      }
      function fv(t) {
        return t == null ? [] : us(t, Rt(t));
      }
      function pv(t, i, n) {
        return n === r && (n = i, i = r), n !== r && (n = te2(n), n = n === n ? n : 0), i !== r && (i = te2(i), i = i === i ? i : 0), ur2(te2(t), i, n);
      }
      function mv(t, i, n) {
        return i = ke(i), n === r ? (n = i, i = 0) : n = ke(n), t = te2(t), Tm(t, i, n);
      }
      function dv(t, i, n) {
        if (n && typeof n != "boolean" && Et2(t, i, n) && (i = n = r), n === r && (typeof i == "boolean" ? (n = i, i = r) : typeof t == "boolean" && (n = t, t = r)), t === r && i === r ? (t = 0, i = 1) : (t = ke(t), i === r ? (i = t, t = 0) : i = ke(i)), t > i) {
          var c = t;
          t = i, i = c;
        }
        if (n || t % 1 || i % 1) {
          var l = Ru2();
          return Ct2(t + l * (i - t + qf("1e-" + ((l + "").length - 1))), i);
        }
        return Cs(t, i);
      }
      var gv = Rr(function(t, i, n) {
        return i = i.toLowerCase(), t + (n ? hl(i) : i);
      });
      function hl(t) {
        return Ks2(Z2(t).toLowerCase());
      }
      function fl(t) {
        return t = Z2(t), t && t.replace(vf, sp).replace(Vf, "");
      }
      function yv(t, i, n) {
        t = Z2(t), i = jt(i);
        var c = t.length;
        n = n === r ? c : ur2(j2(n), 0, c);
        var l = n;
        return n -= i.length, n >= 0 && t.slice(n, l) == i;
      }
      function vv(t) {
        return t = Z2(t), t && Kh.test(t) ? t.replace(Ha, ap) : t;
      }
      function bv(t) {
        return t = Z2(t), t && of.test(t) ? t.replace($n2, "\\$&") : t;
      }
      var Tv = Rr(function(t, i, n) {
        return t + (n ? "-" : "") + i.toLowerCase();
      }), Pv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + i.toLowerCase();
      }), xv = dc("toLowerCase");
      function wv(t, i, n) {
        t = Z2(t), i = j2(i);
        var c = i ? Or2(t) : 0;
        if (!i || c >= i) return t;
        var l = (i - c) / 2;
        return xo2(uo2(l), n) + t + xo2(ao(l), n);
      }
      function Cv(t, i, n) {
        t = Z2(t), i = j2(i);
        var c = i ? Or2(t) : 0;
        return i && c < i ? t + xo2(i - c, n) : t;
      }
      function _v(t, i, n) {
        t = Z2(t), i = j2(i);
        var c = i ? Or2(t) : 0;
        return i && c < i ? xo2(i - c, n) + t : t;
      }
      function Lv(t, i, n) {
        return n || i == null ? i = 0 : i && (i = +i), Ap(Z2(t).replace(qn, ""), i || 0);
      }
      function Sv(t, i, n) {
        return (n ? Et2(t, i, n) : i === r) ? i = 1 : i = j2(i), _s(Z2(t), i);
      }
      function Ov() {
        var t = arguments, i = Z2(t[0]);
        return t.length < 3 ? i : i.replace(t[1], t[2]);
      }
      var Ev = Rr(function(t, i, n) {
        return t + (n ? "_" : "") + i.toLowerCase();
      });
      function Dv(t, i, n) {
        return n && typeof n != "number" && Et2(t, i, n) && (i = n = r), n = n === r ? me2 : n >>> 0, n ? (t = Z2(t), t && (typeof i == "string" || i != null && !Ys(i)) && (i = jt(i), !i && Sr2(t)) ? Qe2(ne(t), 0, n) : t.split(i, n)) : [];
      }
      var Iv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + Ks2(i);
      });
      function Mv(t, i, n) {
        return t = Z2(t), n = n == null ? 0 : ur2(j2(n), 0, t.length), i = jt(i), t.slice(n, n + i.length) == i;
      }
      function Av(t, i, n) {
        var c = p.templateSettings;
        n && Et2(t, i, n) && (i = r), t = Z2(t), i = Ro({}, i, c, xc);
        var l = Ro({}, i.imports, c.imports, xc), m2 = yt(l), g = us(l, m2), y2, b, C = 0, _ = i.interpolate || $i2, S = "__p += '", O2 = ls2((i.escape || $i2).source + "|" + _.source + "|" + (_ === Wa ? ff : $i2).source + "|" + (i.evaluate || $i2).source + "|$", "g"), I = "//# sourceURL=" + (et.call(i, "sourceURL") ? (i.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Bf + "]") + `
`;
        t.replace(O2, function(F, W2, $, Bt2, Dt, Ht) {
          return $ || ($ = Bt2), S += t.slice(C, Ht).replace(bf, up), W2 && (y2 = true, S += `' +
__e(` + W2 + `) +
'`), Dt && (b = true, S += `';
` + Dt + `;
__p += '`), $ && (S += `' +
((__t = (` + $ + `)) == null ? '' : __t) +
'`), C = Ht + F.length, F;
        }), S += `';
`;
        var R = et.call(i, "variable") && i.variable;
        if (!R) S = `with (obj) {
` + S + `
}
`;
        else if (lf.test(R)) throw new N(f);
        S = (b ? S.replace(qh, "") : S).replace(Yh, "$1").replace(Xh, "$1;"), S = "function(" + (R || "obj") + `) {
` + (R ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (y2 ? ", __e = _.escape" : "") + (b ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + S + `return __p
}`;
        var U = ml(function() {
          return Q(m2, I + "return " + S).apply(r, g);
        });
        if (U.source = S, qs(U)) throw U;
        return U;
      }
      function Rv(t) {
        return Z2(t).toLowerCase();
      }
      function Fv(t) {
        return Z2(t).toUpperCase();
      }
      function kv(t, i, n) {
        if (t = Z2(t), t && (n || i === r)) return wu(t);
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = ne(i), m2 = Cu(c, l), g = _u(c, l) + 1;
        return Qe2(c, m2, g).join("");
      }
      function Vv(t, i, n) {
        if (t = Z2(t), t && (n || i === r)) return t.slice(0, Su(t) + 1);
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = _u(c, ne(i)) + 1;
        return Qe2(c, 0, l).join("");
      }
      function Nv(t, i, n) {
        if (t = Z2(t), t && (n || i === r)) return t.replace(qn, "");
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = Cu(c, ne(i));
        return Qe2(c, l).join("");
      }
      function Gv(t, i) {
        var n = Ih, c = Mh;
        if (ut2(i)) {
          var l = "separator" in i ? i.separator : l;
          n = "length" in i ? j2(i.length) : n, c = "omission" in i ? jt(i.omission) : c;
        }
        t = Z2(t);
        var m2 = t.length;
        if (Sr2(t)) {
          var g = ne(t);
          m2 = g.length;
        }
        if (n >= m2) return t;
        var y2 = n - Or2(c);
        if (y2 < 1) return c;
        var b = g ? Qe2(g, 0, y2).join("") : t.slice(0, y2);
        if (l === r) return b + c;
        if (g && (y2 += b.length - y2), Ys(l)) {
          if (t.slice(y2).search(l)) {
            var C, _ = b;
            for (l.global || (l = ls2(l.source, Z2(za.exec(l)) + "g")), l.lastIndex = 0; C = l.exec(_); ) var S = C.index;
            b = b.slice(0, S === r ? y2 : S);
          }
        } else if (t.indexOf(jt(l), y2) != y2) {
          var O2 = b.lastIndexOf(l);
          O2 > -1 && (b = b.slice(0, O2));
        }
        return b + c;
      }
      function jv(t) {
        return t = Z2(t), t && Qh.test(t) ? t.replace(Ba, dp) : t;
      }
      var Uv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + i.toUpperCase();
      }), Ks2 = dc("toUpperCase");
      function pl(t, i, n) {
        return t = Z2(t), i = n ? r : i, i === r ? lp(t) ? vp(t) : ep(t) : t.match(i) || [];
      }
      var ml = B(function(t, i) {
        try {
          return Nt(t, r, i);
        } catch (n) {
          return qs(n) ? n : new N(n);
        }
      }), Bv = Ae2(function(t, i) {
        return Yt(i, function(n) {
          n = ye(n), Ie2(t, n, zs(t[n], t));
        }), t;
      });
      function Hv(t) {
        var i = t == null ? 0 : t.length, n = A2();
        return t = i ? at2(t, function(c) {
          if (typeof c[1] != "function") throw new Xt2(h);
          return [n(c[0]), c[1]];
        }) : [], B(function(c) {
          for (var l = -1; ++l < i; ) {
            var m2 = t[l];
            if (Nt(m2[0], this, c)) return Nt(m2[1], this, c);
          }
        });
      }
      function Wv(t) {
        return dm(Kt2(t, D));
      }
      function Js(t) {
        return function() {
          return t;
        };
      }
      function zv(t, i) {
        return t == null || t !== t ? i : t;
      }
      var $v = yc(), qv = yc(true);
      function Ft(t) {
        return t;
      }
      function Zs2(t) {
        return qu(typeof t == "function" ? t : Kt2(t, D));
      }
      function Yv(t) {
        return Xu(Kt2(t, D));
      }
      function Xv(t, i) {
        return Qu(t, Kt2(i, D));
      }
      var Qv = B(function(t, i) {
        return function(n) {
          return fi(n, t, i);
        };
      }), Kv = B(function(t, i) {
        return function(n) {
          return fi(t, n, i);
        };
      });
      function ta2(t, i, n) {
        var c = yt(i), l = mo(i, c);
        n == null && !(ut2(i) && (l.length || !c.length)) && (n = i, i = t, t = this, l = mo(i, yt(i)));
        var m2 = !(ut2(n) && "chain" in n) || !!n.chain, g = Fe2(t);
        return Yt(l, function(y2) {
          var b = i[y2];
          t[y2] = b, g && (t.prototype[y2] = function() {
            var C = this.__chain__;
            if (m2 || C) {
              var _ = t(this.__wrapped__), S = _.__actions__ = Mt(this.__actions__);
              return S.push({ func: b, args: arguments, thisArg: t }), _.__chain__ = C, _;
            }
            return b.apply(t, He([this.value()], arguments));
          });
        }), t;
      }
      function Jv() {
        return gt2._ === this && (gt2._ = Cp), this;
      }
      function ea2() {
      }
      function Zv(t) {
        return t = j2(t), B(function(i) {
          return Ku(i, t);
        });
      }
      var tb = Ms2(at2), eb = Ms2(vu), rb = Ms2(is);
      function dl(t) {
        return Gs(t) ? os(ye(t)) : Mm(t);
      }
      function ib(t) {
        return function(i) {
          return t == null ? r : cr2(t, i);
        };
      }
      var ob = bc(), nb = bc(true);
      function ra2() {
        return [];
      }
      function ia2() {
        return false;
      }
      function sb() {
        return {};
      }
      function ab() {
        return "";
      }
      function ub() {
        return true;
      }
      function cb(t, i) {
        if (t = j2(t), t < 1 || t > Ue) return [];
        var n = me2, c = Ct2(t, me2);
        i = A2(i), t -= me2;
        for (var l = as2(c, i); ++n < t; ) i(n);
        return l;
      }
      function lb(t) {
        return G(t) ? at2(t, ye) : Ut2(t) ? [t] : Mt(Fc(Z2(t)));
      }
      function hb(t) {
        var i = ++xp;
        return Z2(t) + i;
      }
      var fb = Po(function(t, i) {
        return t + i;
      }, 0), pb = As("ceil"), mb = Po(function(t, i) {
        return t / i;
      }, 1), db = As("floor");
      function gb(t) {
        return t && t.length ? po(t, Ft, vs) : r;
      }
      function yb(t, i) {
        return t && t.length ? po(t, A2(i, 2), vs) : r;
      }
      function vb(t) {
        return Pu(t, Ft);
      }
      function bb(t, i) {
        return Pu(t, A2(i, 2));
      }
      function Tb(t) {
        return t && t.length ? po(t, Ft, xs) : r;
      }
      function Pb(t, i) {
        return t && t.length ? po(t, A2(i, 2), xs) : r;
      }
      var xb = Po(function(t, i) {
        return t * i;
      }, 1), wb = As("round"), Cb = Po(function(t, i) {
        return t - i;
      }, 0);
      function _b(t) {
        return t && t.length ? ss(t, Ft) : 0;
      }
      function Lb(t, i) {
        return t && t.length ? ss(t, A2(i, 2)) : 0;
      }
      return p.after = Yg, p.ary = $c, p.assign = Fy, p.assignIn = sl, p.assignInWith = Ro, p.assignWith = ky, p.at = Vy, p.before = qc, p.bind = zs, p.bindAll = Bv, p.bindKey = Yc, p.castArray = sy, p.chain = Hc, p.chunk = dd, p.compact = gd, p.concat = yd, p.cond = Hv, p.conforms = Wv, p.constant = Js, p.countBy = _g, p.create = Ny, p.curry = Xc, p.curryRight = Qc, p.debounce = Kc, p.defaults = Gy, p.defaultsDeep = jy, p.defer = Xg, p.delay = Qg, p.difference = vd, p.differenceBy = bd, p.differenceWith = Td, p.drop = Pd, p.dropRight = xd, p.dropRightWhile = wd, p.dropWhile = Cd, p.fill = _d, p.filter = Sg, p.flatMap = Dg, p.flatMapDeep = Ig, p.flatMapDepth = Mg, p.flatten = Gc, p.flattenDeep = Ld, p.flattenDepth = Sd, p.flip = Kg, p.flow = $v, p.flowRight = qv, p.fromPairs = Od, p.functions = qy, p.functionsIn = Yy, p.groupBy = Ag, p.initial = Dd, p.intersection = Id, p.intersectionBy = Md, p.intersectionWith = Ad, p.invert = Qy, p.invertBy = Ky, p.invokeMap = Fg, p.iteratee = Zs2, p.keyBy = kg, p.keys = yt, p.keysIn = Rt, p.map = Oo, p.mapKeys = Zy, p.mapValues = tv, p.matches = Yv, p.matchesProperty = Xv, p.memoize = Do, p.merge = ev, p.mergeWith = al, p.method = Qv, p.methodOf = Kv, p.mixin = ta2, p.negate = Io, p.nthArg = Zv, p.omit = rv, p.omitBy = iv, p.once = Jg, p.orderBy = Vg, p.over = tb, p.overArgs = Zg, p.overEvery = eb, p.overSome = rb, p.partial = $s2, p.partialRight = Jc, p.partition = Ng, p.pick = ov, p.pickBy = ul, p.property = dl, p.propertyOf = ib, p.pull = Vd, p.pullAll = Uc, p.pullAllBy = Nd, p.pullAllWith = Gd, p.pullAt = jd, p.range = ob, p.rangeRight = nb, p.rearg = ty, p.reject = Ug, p.remove = Ud, p.rest = ey, p.reverse = Hs2, p.sampleSize = Hg, p.set = sv, p.setWith = av, p.shuffle = Wg, p.slice = Bd, p.sortBy = qg, p.sortedUniq = Xd, p.sortedUniqBy = Qd, p.split = Dv, p.spread = ry, p.tail = Kd, p.take = Jd, p.takeRight = Zd, p.takeRightWhile = tg, p.takeWhile = eg, p.tap = gg, p.throttle = iy, p.thru = So, p.toArray = il, p.toPairs = cl, p.toPairsIn = ll, p.toPath = lb, p.toPlainObject = nl, p.transform = uv, p.unary = oy, p.union = rg, p.unionBy = ig, p.unionWith = og, p.uniq = ng, p.uniqBy = sg, p.uniqWith = ag, p.unset = cv, p.unzip = Ws, p.unzipWith = Bc, p.update = lv, p.updateWith = hv, p.values = Vr2, p.valuesIn = fv, p.without = ug, p.words = pl, p.wrap = ny, p.xor = cg, p.xorBy = lg, p.xorWith = hg, p.zip = fg, p.zipObject = pg, p.zipObjectDeep = mg, p.zipWith = dg, p.entries = cl, p.entriesIn = ll, p.extend = sl, p.extendWith = Ro, ta2(p, p), p.add = fb, p.attempt = ml, p.camelCase = gv, p.capitalize = hl, p.ceil = pb, p.clamp = pv, p.clone = ay, p.cloneDeep = cy, p.cloneDeepWith = ly, p.cloneWith = uy, p.conformsTo = hy, p.deburr = fl, p.defaultTo = zv, p.divide = mb, p.endsWith = yv, p.eq = ae, p.escape = vv, p.escapeRegExp = bv, p.every = Lg, p.find = Og, p.findIndex = Vc, p.findKey = Uy, p.findLast = Eg, p.findLastIndex = Nc, p.findLastKey = By, p.floor = db, p.forEach = Wc, p.forEachRight = zc, p.forIn = Hy, p.forInRight = Wy, p.forOwn = zy, p.forOwnRight = $y, p.get = Xs, p.gt = fy, p.gte = py, p.has = Xy, p.hasIn = Qs2, p.head = jc, p.identity = Ft, p.includes = Rg, p.indexOf = Ed, p.inRange = mv, p.invoke = Jy, p.isArguments = fr2, p.isArray = G, p.isArrayBuffer = my, p.isArrayLike = At, p.isArrayLikeObject = lt2, p.isBoolean = dy, p.isBuffer = Ke2, p.isDate = gy, p.isElement = yy, p.isEmpty = vy, p.isEqual = by, p.isEqualWith = Ty, p.isError = qs, p.isFinite = Py, p.isFunction = Fe2, p.isInteger = Zc, p.isLength = Mo, p.isMap = tl, p.isMatch = xy, p.isMatchWith = wy, p.isNaN = Cy, p.isNative = _y, p.isNil = Sy, p.isNull = Ly, p.isNumber = el, p.isObject = ut2, p.isObjectLike = ct, p.isPlainObject = vi, p.isRegExp = Ys, p.isSafeInteger = Oy, p.isSet = rl, p.isString = Ao2, p.isSymbol = Ut2, p.isTypedArray = kr2, p.isUndefined = Ey, p.isWeakMap = Dy, p.isWeakSet = Iy, p.join = Rd, p.kebabCase = Tv, p.last = Zt2, p.lastIndexOf = Fd, p.lowerCase = Pv, p.lowerFirst = xv, p.lt = My, p.lte = Ay, p.max = gb, p.maxBy = yb, p.mean = vb, p.meanBy = bb, p.min = Tb, p.minBy = Pb, p.stubArray = ra2, p.stubFalse = ia2, p.stubObject = sb, p.stubString = ab, p.stubTrue = ub, p.multiply = xb, p.nth = kd, p.noConflict = Jv, p.noop = ea2, p.now = Eo2, p.pad = wv, p.padEnd = Cv, p.padStart = _v, p.parseInt = Lv, p.random = dv, p.reduce = Gg, p.reduceRight = jg, p.repeat = Sv, p.replace = Ov, p.result = nv, p.round = wb, p.runInContext = v, p.sample = Bg, p.size = zg, p.snakeCase = Ev, p.some = $g, p.sortedIndex = Hd, p.sortedIndexBy = Wd, p.sortedIndexOf = zd, p.sortedLastIndex = $d, p.sortedLastIndexBy = qd, p.sortedLastIndexOf = Yd, p.startCase = Iv, p.startsWith = Mv, p.subtract = Cb, p.sum = _b, p.sumBy = Lb, p.template = Av, p.times = cb, p.toFinite = ke, p.toInteger = j2, p.toLength = ol, p.toLower = Rv, p.toNumber = te2, p.toSafeInteger = Ry, p.toString = Z2, p.toUpper = Fv, p.trim = kv, p.trimEnd = Vv, p.trimStart = Nv, p.truncate = Gv, p.unescape = jv, p.uniqueId = hb, p.upperCase = Uv, p.upperFirst = Ks2, p.each = Wc, p.eachRight = zc, p.first = jc, ta2(p, (function() {
        var t = {};
        return de2(p, function(i, n) {
          et.call(p.prototype, n) || (t[n] = i);
        }), t;
      })(), { chain: false }), p.VERSION = o, Yt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
        p[t].placeholder = p;
      }), Yt(["drop", "take"], function(t, i) {
        z.prototype[t] = function(n) {
          n = n === r ? 1 : mt2(j2(n), 0);
          var c = this.__filtered__ && !i ? new z(this) : this.clone();
          return c.__filtered__ ? c.__takeCount__ = Ct2(n, c.__takeCount__) : c.__views__.push({ size: Ct2(n, me2), type: t + (c.__dir__ < 0 ? "Right" : "") }), c;
        }, z.prototype[t + "Right"] = function(n) {
          return this.reverse()[t](n).reverse();
        };
      }), Yt(["filter", "map", "takeWhile"], function(t, i) {
        var n = i + 1, c = n == Ga || n == kh;
        z.prototype[t] = function(l) {
          var m2 = this.clone();
          return m2.__iteratees__.push({ iteratee: A2(l, 3), type: n }), m2.__filtered__ = m2.__filtered__ || c, m2;
        };
      }), Yt(["head", "last"], function(t, i) {
        var n = "take" + (i ? "Right" : "");
        z.prototype[t] = function() {
          return this[n](1).value()[0];
        };
      }), Yt(["initial", "tail"], function(t, i) {
        var n = "drop" + (i ? "" : "Right");
        z.prototype[t] = function() {
          return this.__filtered__ ? new z(this) : this[n](1);
        };
      }), z.prototype.compact = function() {
        return this.filter(Ft);
      }, z.prototype.find = function(t) {
        return this.filter(t).head();
      }, z.prototype.findLast = function(t) {
        return this.reverse().find(t);
      }, z.prototype.invokeMap = B(function(t, i) {
        return typeof t == "function" ? new z(this) : this.map(function(n) {
          return fi(n, t, i);
        });
      }), z.prototype.reject = function(t) {
        return this.filter(Io(A2(t)));
      }, z.prototype.slice = function(t, i) {
        t = j2(t);
        var n = this;
        return n.__filtered__ && (t > 0 || i < 0) ? new z(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), i !== r && (i = j2(i), n = i < 0 ? n.dropRight(-i) : n.take(i - t)), n);
      }, z.prototype.takeRightWhile = function(t) {
        return this.reverse().takeWhile(t).reverse();
      }, z.prototype.toArray = function() {
        return this.take(me2);
      }, de2(z.prototype, function(t, i) {
        var n = /^(?:filter|find|map|reject)|While$/.test(i), c = /^(?:head|last)$/.test(i), l = p[c ? "take" + (i == "last" ? "Right" : "") : i], m2 = c || /^find/.test(i);
        l && (p.prototype[i] = function() {
          var g = this.__wrapped__, y2 = c ? [1] : arguments, b = g instanceof z, C = y2[0], _ = b || G(g), S = function(W2) {
            var $ = l.apply(p, He([W2], y2));
            return c && O2 ? $[0] : $;
          };
          _ && n && typeof C == "function" && C.length != 1 && (b = _ = false);
          var O2 = this.__chain__, I = !!this.__actions__.length, R = m2 && !O2, U = b && !I;
          if (!m2 && _) {
            g = U ? g : new z(this);
            var F = t.apply(g, y2);
            return F.__actions__.push({ func: So, args: [S], thisArg: r }), new Qt2(F, O2);
          }
          return R && U ? t.apply(this, y2) : (F = this.thru(S), R ? c ? F.value()[0] : F.value() : F);
        });
      }), Yt(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
        var i = Ji2[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", c = /^(?:pop|shift)$/.test(t);
        p.prototype[t] = function() {
          var l = arguments;
          if (c && !this.__chain__) {
            var m2 = this.value();
            return i.apply(G(m2) ? m2 : [], l);
          }
          return this[n](function(g) {
            return i.apply(G(g) ? g : [], l);
          });
        };
      }), de2(z.prototype, function(t, i) {
        var n = p[i];
        if (n) {
          var c = n.name + "";
          et.call(Ir, c) || (Ir[c] = []), Ir[c].push({ name: i, func: n });
        }
      }), Ir[To(r, nt).name] = [{ name: "wrapper", func: r }], z.prototype.clone = jp, z.prototype.reverse = Up, z.prototype.value = Bp, p.prototype.at = yg, p.prototype.chain = vg, p.prototype.commit = bg, p.prototype.next = Tg, p.prototype.plant = xg, p.prototype.reverse = wg, p.prototype.toJSON = p.prototype.valueOf = p.prototype.value = Cg, p.prototype.first = p.prototype.head, ni && (p.prototype[ni] = Pg), p;
    }, ze2 = bp();
    typeof define == "function" && typeof define.amd == "object" && define.amd ? (gt2._ = ze2, define(function() {
      return ze2;
    })) : or2 ? ((or2.exports = ze2)._ = ze2, Zn._ = ze2) : gt2._ = ze2;
  }).call(a3);
});
var Oh = class extends Set {
  constructor(a3, e = false) {
    super(a3), this.valuesAsFlags = e;
  }
};
function ki(a3) {
  if (a3 instanceof Map) return Object.fromEntries([...a3.entries()].map(([e, r]) => [e, ki(r)]));
  if (a3 instanceof Set) return Array.from(a3.values()).map(ki);
  if (a3 instanceof Oh) return { values: [...a3.values()], valuesAsFlags: a3.valuesAsFlags };
  if (typeof a3 == "object") {
    let e = {};
    return Object.entries(a3).forEach(([r, o]) => {
      e[r] = ki(o);
    }), e;
  } else return a3;
}
var B1 = Aa(Ra(), 1);
var jT = Aa(Ra(), 1);
function Tr(a3, e) {
  if (typeof a3 != "object") throw new Error(`Cannot merge into non-object objectToMergeWith. Received: ${JSON.stringify(a3)}`);
  if (typeof e != "object") throw new Error(`Cannot merge using non-object objectToMergeWith. Received: ${JSON.stringify(e)}`);
  let r = (0, jT.cloneDeep)(a3);
  for (let [o, s] of Object.entries(e)) typeof s != "object" || s instanceof Set || r[o] === void 0 ? r[o] = s : r[o] = Tr(r[o], s);
  return r;
}
function Eh(a3, e) {
  if (!(a3 === void 0 || typeof a3 != "object")) for (let r of Object.keys(a3)) {
    if (r === e) return a3[r];
    let o = a3[r];
    if (typeof o == "object") {
      let s = Eh(o, e);
      if (s !== void 0) return s;
    }
  }
}
var Ma = "@composite:";
var UT = "@inherit:";
var BT = class {
  constructor(a3, e, r) {
    this.tiledClassToMembersMap = a3, this.enumNameToValuesMap = e, this.parserOptions = r, this.memoiser = /* @__PURE__ */ new Map();
  }
  flattenMembers(a3, e) {
    return this.memoiser.has(a3) ? { [a3]: this.memoiser.get(a3) } : (this.memoiser.set(a3, e.reduce((r, o) => q(q({}, r), this.flattenMemberProperty(o)), {})), { [a3]: this.memoiser.get(a3) });
  }
  flattenMemberProperty(a3) {
    var r;
    let e = (r = a3.propertyType) != null ? r : a3.propertytype;
    if (a3.type === "class") {
      if (!this.memoiser.has(e)) {
        let u = this.tiledClassToMembersMap.get(e).reduce((h, f) => Tr(this.flattenMemberProperty(f), h), {});
        this.memoiser.set(e, u);
      }
      let o = this.memoiser.get(e), s = Tr(o, this.flattenValue(a3.value, o));
      return this.checkIfShouldFlatten(a3.name) ? s : { [a3.name.replace(Ma, "")]: s };
    } else return this.enumNameToValuesMap.has(e) ? this.enumNameToValuesMap.get(e).valuesAsFlags ? { [a3.name]: new Set(a3.value.split(",").filter((o) => o !== "")) } : { [a3.name]: a3.value } : { [a3.name]: a3.value };
  }
  get memoisedFlattenedProperties() {
    return this.memoiser;
  }
  flattenValue(a3, e) {
    return Object.entries(a3).reduce((r, [o, s]) => {
      if (typeof s != "object") return Eh(e, o) instanceof Set ? Tr({ [o]: new Set(s.split(",").filter((u) => u !== "")) }, r) : Tr({ [o]: s }, r);
      if (this.checkIfShouldFlatten(o)) return Tr(this.flattenValue(s, e), r);
      {
        let u = o.replace(Ma, "");
        return Tr({ [u]: this.flattenValue(s, e) }, r);
      }
    }, {});
  }
  checkIfShouldFlatten(a3) {
    var e;
    return ((e = this.parserOptions) == null ? void 0 : e.defaultComposite) === true ? a3.startsWith(UT) : !a3.startsWith(Ma);
  }
};
var Lh = Aa(Ra(), 1);
var HT = class {
  constructor(a3) {
    this.flattener = a3;
  }
  flattenPropertiesOnObject(a3) {
    var e, r, o, s;
    return Lt(q(q({}, this.flattener.memoisedFlattenedProperties.get((e = a3.class) != null ? e : a3.type)), (r = a3.properties) == null ? void 0 : r.reduce((u, h) => q(q({}, u), this.flattener.flattenMemberProperty(h)), {})), { name: a3.name, id: a3.id, class: (s = (o = a3.class) != null ? o : a3.type) != null ? s : null, x: a3.x, y: a3.y });
  }
  flattenPropertiesOnTile(a3) {
    var e, r, o, s;
    return Lt(q(q({}, this.flattener.memoisedFlattenedProperties.get((e = a3.class) != null ? e : a3.type)), (r = a3.properties) == null ? void 0 : r.reduce((u, h) => q(q({}, u), this.flattener.flattenMemberProperty(h)), {})), { id: a3.id, class: (s = (o = a3.class) != null ? o : a3.type) != null ? s : null });
  }
  getCustomTypesMap() {
    return new Map([...this.flattener.memoisedFlattenedProperties.entries()].map(([a3, e]) => [a3, (0, Lh.cloneDeep)(e)]));
  }
  getEnumsMap() {
    return new Map([...this.flattener.enumNameToValuesMap.entries()].map(([a3, e]) => [a3, (0, Lh.cloneDeep)(e)]));
  }
  toJSON() {
    return JSON.stringify({ customTypes: ki(this.getCustomTypesMap()), enums: ki(this.getEnumsMap()) }, null, 4);
  }
};
function WT(a3, e) {
  let r = new Map(a3.propertyTypes.filter((u) => u.type === "enum").map((u) => [u.name, new Oh(u.values, u.valuesAsFlags)])), o = new Map(a3.propertyTypes.filter((u) => u.type === "class").map((u) => [u.name, u.members])), s = new BT(o, r, e);
  return o.forEach((u, h) => {
    s.flattenMembers(h, u);
  }), new HT(s);
}
var Dh = { parse: WT };
var Pr = class {
  constructor(e, r) {
    this.phaserTile = e;
    this.tiledProject = r;
  }
  getProperty(e) {
    var s, u;
    let r = {};
    if (this.tiledProject) {
      let h = Dh.parse(this.tiledProject), f = this.getType();
      if (f) {
        let d = (s = h.getCustomTypesMap()) == null ? void 0 : s.get(f);
        if (d) for (let [P2, L2] of Object.entries(d)) r[P2] = L2;
      }
    }
    return (u = this.phaserTile.properties[e]) != null ? u : r[e];
  }
  hasProperty(e) {
    return this.getProperty(e) != null;
  }
  getType() {
    var e, r;
    return (r = ((e = this.phaserTile.tileset) == null ? void 0 : e.tileData)[this.phaserTile.index - 1]) == null ? void 0 : r.type;
  }
};
var Vi = class {
  constructor(e, r) {
    this.phaserTilemapLayer = e;
    this.tiledProject = r;
  }
  getName() {
    return this.phaserTilemapLayer.layer.name;
  }
  getProperty(e) {
    let r = this.phaserTilemapLayer.layer.properties, o = r == null ? void 0 : r.find((s) => s.name == e);
    return o == null ? void 0 : o.value;
  }
  hasProperty(e) {
    return this.getProperty(e) != null;
  }
  isCharLayer() {
    return this.hasProperty(Yr);
  }
  getData() {
    return this.phaserTilemapLayer.layer.data.map((e) => e.map((r) => new Pr(r, this.tiledProject)));
  }
};
var Rn = class {
  constructor(e, r) {
    this.phaserTilemap = e;
    this.tiledProject = r;
    for (let o of this.phaserTilemap.layers) if (o.tilemapLayer == null) throw new Error(`Error initializing tilemap. Layer '${o.name}' has no 'tilemapLayer'. This can happen if you call 'createLayer' with the wrong layer ID.`);
  }
  getTileWidth() {
    return this.phaserTilemap.tileWidth;
  }
  getTileHeight() {
    return this.phaserTilemap.tileHeight;
  }
  getWidth() {
    return this.phaserTilemap.width;
  }
  getHeight() {
    return this.phaserTilemap.height;
  }
  getOrientation() {
    return this.phaserTilemap.orientation == Tilemaps.Orientation.ISOMETRIC.toString() ? "isometric" : "orthogonal";
  }
  getLayers() {
    return this.phaserTilemap.layers.map((e) => new Vi(e.tilemapLayer, this.tiledProject));
  }
  hasTileAt(e, r, o) {
    return !!this.phaserTilemap.hasTileAt(e, r, o);
  }
  getTileAt(e, r, o) {
    let s = this.phaserTilemap.getTileAt(e, r, false, o);
    if (s) return new Pr(s, this.tiledProject);
  }
};
var $T = Cn.version;
var ji = class ji2 {
  constructor(e) {
    this.scene = e;
    this.geHeadless = new In(false);
    this.isCreatedInternal = false;
    ji2.welcomeMessagePrinted || (console.log(`Using GridEngine Phaser Plugin v${$T}`), ji2.welcomeMessagePrinted = true), this.scene.sys.events.once("boot", this.boot, this);
  }
  boot() {
    this.scene.sys.events.on("update", this.update, this);
  }
  getCharLayer(e) {
    return this.geHeadless.getCharLayer(e);
  }
  getTransition(e, r) {
    return this.geHeadless.getTransition(e, r);
  }
  setTransition(e, r, o) {
    this.geHeadless.setTransition(e, r, o);
  }
  create(e, r) {
    this.geHeadless.create(new Rn(e, r.tiledProject), r), this.isCreatedInternal = true, this.gridCharacters = /* @__PURE__ */ new Map();
    let o = this.setConfigDefaults(r);
    this.config = o, this.gridTilemap = new vr(e), this.addCharacters();
  }
  getPosition(e) {
    return this.geHeadless.getPosition(e);
  }
  move(e, r) {
    this.geHeadless.move(e, r);
  }
  moveRandomly(e, r = 0, o = -1) {
    this.geHeadless.moveRandomly(e, r, o);
  }
  getMovement(e) {
    return this.geHeadless.getMovement(e);
  }
  moveTo(e, r, o) {
    return this.geHeadless.moveTo(e, r, o);
  }
  stopMovement(e) {
    this.geHeadless.stopMovement(e);
  }
  setSpeed(e, r) {
    this.geHeadless.setSpeed(e, r);
  }
  getSpeed(e) {
    return this.geHeadless.getSpeed(e);
  }
  setContainer(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.setContainer(r);
  }
  getContainer(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getContainer();
  }
  getOffsetX(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getOffsetX();
  }
  setOffsetX(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.setOffsetX(r);
  }
  getOffsetY(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getOffsetY();
  }
  setOffsetY(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.setOffsetY(r);
  }
  getDepthOffset(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getDepthOffset();
  }
  collidesWithTiles(e) {
    return this.geHeadless.collidesWithTiles(e);
  }
  getWalkingAnimationMapping(e) {
    var s;
    this.initGuard();
    let r = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    let o = r.getAnimation();
    return o == null ? void 0 : o.getWalkingAnimationMapping();
  }
  hasLayerOverlay() {
    var e;
    return this.initGuard(), !!((e = this.config) != null && e.layerOverlay);
  }
  setWalkingAnimationMapping(e, r) {
    var u;
    this.initGuard();
    let o = (u = this.gridCharacters) == null ? void 0 : u.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    let s = o.getAnimation();
    s == null || s.setWalkingAnimationMapping(r);
  }
  update(e, r) {
    if (this.isCreatedInternal && this.gridCharacters) for (let [o, s] of this.gridCharacters) s.update(r);
    this.geHeadless.update(e, r);
  }
  addCharacter(e) {
    this.geHeadless.addCharacter(e), this.addCharacterInternal(e);
  }
  hasCharacter(e) {
    return this.geHeadless.hasCharacter(e);
  }
  removeCharacter(e) {
    var o, s;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    r.destroy(), (s = this.gridCharacters) == null || s.delete(e), this.geHeadless.removeCharacter(e);
  }
  removeAllCharacters() {
    if (this.initGuard(), !!this.gridCharacters) {
      for (let e of this.gridCharacters.keys()) this.removeCharacter(e);
      this.geHeadless.removeAllCharacters();
    }
  }
  getAllCharacters(e) {
    return this.geHeadless.getAllCharacters(e);
  }
  getLabels(e) {
    return this.geHeadless.getLabels(e);
  }
  addLabels(e, r) {
    this.geHeadless.addLabels(e, r);
  }
  removeLabels(e, r) {
    this.geHeadless.removeLabels(e, r);
  }
  clearLabels(e) {
    this.geHeadless.clearLabels(e);
  }
  follow(e, r, o, s) {
    let u;
    o === void 0 ? u = { distance: 0, closestPointIfBlocked: false } : typeof o == "number" ? (u = { distance: o, closestPointIfBlocked: false }, s && (u.closestPointIfBlocked = true)) : u = o, this.geHeadless.follow(e, r, u);
  }
  isMoving(e) {
    return this.geHeadless.isMoving(e);
  }
  getFacingDirection(e) {
    return this.geHeadless.getFacingDirection(e);
  }
  getFacingPosition(e) {
    return this.geHeadless.getFacingPosition(e);
  }
  turnTowards(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    o.turnTowards(r), this.geHeadless.turnTowards(e, r);
  }
  getCharactersAt(e, r) {
    return this.geHeadless.getCharactersAt(e, r);
  }
  setPosition(e, r, o) {
    this.geHeadless.setPosition(e, r, o);
  }
  getSprite(e) {
    var o;
    this.initGuard();
    let r = (o = this.gridCharacters) == null ? void 0 : o.get(e);
    if (!r) throw this.createCharUnknownErr(e);
    return r.getSprite();
  }
  setSprite(e, r) {
    var s;
    this.initGuard();
    let o = (s = this.gridCharacters) == null ? void 0 : s.get(e);
    if (!o) throw this.createCharUnknownErr(e);
    r.setOrigin(0, 0), o.setSprite(r);
  }
  isBlocked(e, r, o = ["geDefault"]) {
    return this.geHeadless.isBlocked(e, r, o);
  }
  isTileBlocked(e, r) {
    return this.geHeadless.isTileBlocked(e, r);
  }
  getCollisionGroups(e) {
    return this.geHeadless.getCollisionGroups(e);
  }
  setCollisionGroups(e, r) {
    this.geHeadless.setCollisionGroups(e, r);
  }
  getIgnoreCollisionGroups(e) {
    return this.geHeadless.getIgnoreCollisionGroups(e);
  }
  setIgnoreCollisionGroups(e, r) {
    this.geHeadless.setIgnoreCollisionGroups(e, r);
  }
  getTilePosInDirection(e, r, o) {
    return this.geHeadless.getTilePosInDirection(e, r, o);
  }
  findShortestPath(e, r, o = {}) {
    return this.geHeadless.findShortestPath(e, r, o);
  }
  steppedOn(e, r, o) {
    return this.geHeadless.steppedOn(e, r, o);
  }
  characterShifted() {
    return this.geHeadless.characterShifted();
  }
  movementStarted() {
    return this.geHeadless.movementStarted();
  }
  movementStopped() {
    return this.geHeadless.movementStopped();
  }
  directionChanged() {
    return this.geHeadless.directionChanged();
  }
  positionChangeStarted() {
    return this.geHeadless.positionChangeStarted();
  }
  positionChangeFinished() {
    return this.geHeadless.positionChangeFinished();
  }
  getMovementProgress(e) {
    return this.geHeadless.getMovementProgress(e);
  }
  rebuildTileCollisionCache(e, r, o, s) {
    this.geHeadless.rebuildTileCollisionCache(e, r, o, s);
  }
  addQueueMovements(e, r, o) {
    this.geHeadless.addQueueMovements(e, r, o);
  }
  getEnqueuedMovements(e) {
    return this.geHeadless.getEnqueuedMovements(e);
  }
  queueMovementFinished() {
    return this.geHeadless.queueMovementFinished();
  }
  clearEnqueuedMovements(e) {
    return this.geHeadless.clearEnqueuedMovements(e);
  }
  getState() {
    return { characters: this.geHeadless.getState().characters.map((e) => Lt(q({}, e), { offsetX: this.getOffsetX(e.id), offsetY: this.getOffsetY(e.id) })) };
  }
  setState(e) {
    if (this.geHeadless.setState(e), this.gridCharacters) for (let r of e.characters) {
      let o = this.gridCharacters.get(r.id);
      o && (o.setOffsetX(r.offsetX), o.setOffsetY(r.offsetY));
    }
  }
  getTileCost(e, r, o) {
    return this.initGuard(), this.geHeadless.getTileCost(e, r, o);
  }
  revertCurrentMovement(e) {
    this.geHeadless.revertCurrentMovement(e);
  }
  isCurrentMovementReverted(e) {
    return this.geHeadless.isCurrentMovementReverted(e);
  }
  setConfigDefaults(e) {
    return q({ collisionTilePropertyName: "ge_collide", numberOfDirections: 4, characterCollisionStrategy: "BLOCK_TWO_TILES", layerOverlay: false, cacheTileCollisions: false }, e);
  }
  initGuard() {
    if (!this.isCreatedInternal) throw this.createUninitializedErr();
  }
  createUninitializedErr() {
    throw new Error("GridEngine not initialized. You need to call create() first.");
  }
  addCharacters() {
    var e;
    (e = this.config) == null || e.characters.forEach((r) => this.addCharacterInternal(r));
  }
  createCharUnknownErr(e) {
    return new Error(`Character unknown: ${e}`);
  }
  addCharacterInternal(e) {
    var o;
    if (this.initGuard(), !this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();
    let r = new ln(e, this.scene, this.gridTilemap, this.config.layerOverlay, this.geHeadless);
    (o = this.gridCharacters) == null || o.set(e.id, r);
  }
};
ji.welcomeMessagePrinted = false;

// speedtests/old/dist/GridEngine.esm.min.js
var ea = Object.create;
var jr2 = Object.defineProperty;
var ra = Object.defineProperties;
var ia = Object.getOwnPropertyDescriptor;
var na2 = Object.getOwnPropertyDescriptors;
var oa2 = Object.getOwnPropertyNames;
var Bi = Object.getOwnPropertySymbols;
var sa2 = Object.getPrototypeOf;
var qi = Object.prototype.hasOwnProperty;
var aa2 = Object.prototype.propertyIsEnumerable;
var Wi = (r, t, e) => t in r ? jr2(r, t, { enumerable: true, configurable: true, writable: true, value: e }) : r[t] = e;
var X2 = (r, t) => {
  for (var e in t || (t = {})) qi.call(t, e) && Wi(r, e, t[e]);
  if (Bi) for (var e of Bi(t)) aa2.call(t, e) && Wi(r, e, t[e]);
  return r;
};
var Qt = (r, t) => ra(r, na2(t));
var y = (r, t) => () => (t || r((t = { exports: {} }).exports, t), t.exports);
var ha2 = (r, t, e, i) => {
  if (t && typeof t == "object" || typeof t == "function") for (let n of oa2(t)) !qi.call(r, n) && n !== e && jr2(r, n, { get: () => t[n], enumerable: !(i = ia(t, n)) || i.enumerable });
  return r;
};
var ji3 = (r, t, e) => (e = r != null ? ea(sa2(r)) : {}, ha2(t || !r || !r.__esModule ? jr2(e, "default", { value: r, enumerable: true }) : e, r));
var _e = y((ke) => {
  var Da2 = function(r, t) {
    return r < t ? -1 : r > t ? 1 : 0;
  }, Ia2 = function(r, t) {
    return r < t ? 1 : r > t ? -1 : 0;
  };
  function Ma2(r) {
    return function(t, e) {
      return r(e, t);
    };
  }
  function Ra2(r) {
    return r === 2 ? function(t, e) {
      return t[0] < e[0] ? -1 : t[0] > e[0] ? 1 : t[1] < e[1] ? -1 : t[1] > e[1] ? 1 : 0;
    } : function(t, e) {
      for (var i = 0; i < r; ) {
        if (t[i] < e[i]) return -1;
        if (t[i] > e[i]) return 1;
        i++;
      }
      return 0;
    };
  }
  ke.DEFAULT_COMPARATOR = Da2;
  ke.DEFAULT_REVERSE_COMPARATOR = Ia2;
  ke.reverseComparator = Ma2;
  ke.createTupleComparator = Ra2;
});
var Cn2 = y((ii) => {
  ii.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer != "undefined";
  ii.SYMBOL_SUPPORT = typeof Symbol != "undefined";
});
var A = y((lm, En3) => {
  var Ln2 = Cn2(), Fa = Ln2.ARRAY_BUFFER_SUPPORT, ka = Ln2.SYMBOL_SUPPORT;
  En3.exports = function(t, e) {
    var i, n, o, s, a3;
    if (!t) throw new Error("obliterator/forEach: invalid iterable.");
    if (typeof e != "function") throw new Error("obliterator/forEach: expecting a callback.");
    if (Array.isArray(t) || Fa && ArrayBuffer.isView(t) || typeof t == "string" || t.toString() === "[object Arguments]") {
      for (o = 0, s = t.length; o < s; o++) e(t[o], o);
      return;
    }
    if (typeof t.forEach == "function") {
      t.forEach(e);
      return;
    }
    if (ka && Symbol.iterator in t && typeof t.next != "function" && (t = t[Symbol.iterator]()), typeof t.next == "function") {
      for (i = t, o = 0; a3 = i.next(), a3.done !== true; ) e(a3.value, o), o++;
      return;
    }
    for (n in t) t.hasOwnProperty(n) && e(t[n], n);
  };
});
var Pr2 = y((cm, Fn) => {
  var On2 = _e(), An2 = A(), Dn2 = On2.DEFAULT_COMPARATOR, _a2 = On2.reverseComparator;
  function nt(r) {
    if (this.clear(), this.comparator = r || Dn2, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
  }
  nt.prototype.clear = function() {
    this.root = null, this.min = null, this.size = 0;
  };
  function za(r) {
    return { item: r, degree: 0 };
  }
  function In2(r, t) {
    r.root ? (t.right = r.root.right, t.left = r.root, r.root.right.left = t, r.root.right = t) : r.root = t;
  }
  nt.prototype.push = function(r) {
    var t = za(r);
    return t.left = t, t.right = t, In2(this, t), (!this.min || this.comparator(t.item, this.min.item) <= 0) && (this.min = t), ++this.size;
  };
  nt.prototype.peek = function() {
    return this.min ? this.min.item : void 0;
  };
  function Mn2(r) {
    for (var t = [], e = r, i = false; !(e === r && i); ) e === r && (i = true), t.push(e), e = e.right;
    return t;
  }
  function Rn2(r, t) {
    r.root === t && (r.root = t.right), t.left.right = t.right, t.right.left = t.left;
  }
  function Va(r, t) {
    r.child ? (t.right = r.child.right, t.left = r.child, r.child.right.left = t, r.child.right = t) : r.child = t;
  }
  function Ha(r, t, e) {
    Rn2(r, t), t.left = t, t.right = t, Va(e, t), e.degree++, t.parent = e;
  }
  function Ua(r) {
    var t = new Array(r.size), e = Mn2(r.root), i, n, o, s, a3, h;
    for (i = 0, n = e.length; i < n; i++) {
      for (o = e[i], a3 = o.degree; t[a3]; ) s = t[a3], r.comparator(o.item, s.item) > 0 && (h = o, o = s, s = h), Ha(r, s, o), t[a3] = null, a3++;
      t[a3] = o;
    }
    for (i = 0; i < r.size; i++) t[i] && r.comparator(t[i].item, r.min.item) <= 0 && (r.min = t[i]);
  }
  nt.prototype.pop = function() {
    if (this.size) {
      var r = this.min;
      if (r.child) {
        var t = Mn2(r.child), e, i, n;
        for (i = 0, n = t.length; i < n; i++) e = t[i], In2(this, e), delete e.parent;
      }
      return Rn2(this, r), r === r.right ? (this.min = null, this.root = null) : (this.min = r.right, Ua(this)), this.size--, r.item;
    }
  };
  nt.prototype.inspect = function() {
    var r = { size: this.size };
    return this.min && "item" in this.min && (r.top = this.min.item), Object.defineProperty(r, "constructor", { value: nt, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (nt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = nt.prototype.inspect);
  function br(r) {
    if (this.clear(), this.comparator = r || Dn2, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
    this.comparator = _a2(this.comparator);
  }
  br.prototype = nt.prototype;
  nt.from = function(r, t) {
    var e = new nt(t);
    return An2(r, function(i) {
      e.push(i);
    }), e;
  };
  br.from = function(r, t) {
    var e = new br(t);
    return An2(r, function(i) {
      e.push(i);
    }), e;
  };
  nt.MinFibonacciHeap = nt;
  nt.MaxFibonacciHeap = br;
  Fn.exports = nt;
});
var ot = y((At) => {
  var Ga = Math.pow(2, 8) - 1, Na = Math.pow(2, 16) - 1, Ba = Math.pow(2, 32) - 1, Wa = Math.pow(2, 7) - 1, qa = Math.pow(2, 15) - 1, ja = Math.pow(2, 31) - 1;
  At.getPointerArray = function(r) {
    var t = r - 1;
    if (t <= Ga) return Uint8Array;
    if (t <= Na) return Uint16Array;
    if (t <= Ba) return Uint32Array;
    throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
  };
  At.getSignedPointerArray = function(r) {
    var t = r - 1;
    return t <= Wa ? Int8Array : t <= qa ? Int16Array : t <= ja ? Int32Array : Float64Array;
  };
  At.getNumberType = function(r) {
    return r === (r | 0) ? Math.sign(r) === -1 ? r <= 127 && r >= -128 ? Int8Array : r <= 32767 && r >= -32768 ? Int16Array : Int32Array : r <= 255 ? Uint8Array : r <= 65535 ? Uint16Array : Uint32Array : Float64Array;
  };
  var $a = { Uint8Array: 1, Int8Array: 2, Uint16Array: 3, Int16Array: 4, Uint32Array: 5, Int32Array: 6, Float32Array: 7, Float64Array: 8 };
  At.getMinimalRepresentation = function(r, t) {
    var e = null, i = 0, n, o, s, a3, h;
    for (a3 = 0, h = r.length; a3 < h; a3++) s = t ? t(r[a3]) : r[a3], o = At.getNumberType(s), n = $a[o.name], n > i && (i = n, e = o);
    return e;
  };
  At.isTypedArray = function(r) {
    return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView(r);
  };
  At.concat = function() {
    var r = 0, t, e, i;
    for (t = 0, i = arguments.length; t < i; t++) r += arguments[t].length;
    var n = new arguments[0].constructor(r);
    for (t = 0, e = 0; t < i; t++) n.set(arguments[t], e), e += arguments[t].length;
    return n;
  };
  At.indices = function(r) {
    for (var t = At.getPointerArray(r), e = new t(r), i = 0; i < r; i++) e[i] = i;
    return e;
  };
});
var at = y((Ve) => {
  var zn = A(), Vn = ot();
  function Ya(r) {
    return Array.isArray(r) || Vn.isTypedArray(r);
  }
  function ni(r) {
    if (typeof r.length == "number") return r.length;
    if (typeof r.size == "number") return r.size;
  }
  function Ka(r) {
    var t = ni(r), e = typeof t == "number" ? new Array(t) : [], i = 0;
    return zn(r, function(n) {
      e[i++] = n;
    }), e;
  }
  function Xa(r) {
    var t = ni(r), e = typeof t == "number" ? Vn.getPointerArray(t) : Array, i = typeof t == "number" ? new Array(t) : [], n = typeof t == "number" ? new e(t) : [], o = 0;
    return zn(r, function(s) {
      i[o] = s, n[o] = o++;
    }), [i, n];
  }
  Ve.isArrayLike = Ya;
  Ve.guessLength = ni;
  Ve.toArray = Ka;
  Ve.toArrayWithIndices = Xa;
});
var Or = y((km, Nn) => {
  var Cr = A(), Hn = _e(), Dt = at(), Er = Hn.DEFAULT_COMPARATOR, oi = Hn.reverseComparator;
  function si(r, t, e, i) {
    for (var n = t[i], o, s; i > e; ) {
      if (o = i - 1 >> 1, s = t[o], r(n, s) < 0) {
        t[i] = s, i = o;
        continue;
      }
      break;
    }
    t[i] = n;
  }
  function He(r, t, e) {
    for (var i = t.length, n = e, o = t[e], s = 2 * e + 1, a3; s < i; ) a3 = s + 1, a3 < i && r(t[s], t[a3]) >= 0 && (s = a3), t[e] = t[s], e = s, s = 2 * e + 1;
    t[e] = o, si(r, t, n, e);
  }
  function Un(r, t, e) {
    t.push(e), si(r, t, 0, t.length - 1);
  }
  function ai(r, t) {
    var e = t.pop();
    if (t.length !== 0) {
      var i = t[0];
      return t[0] = e, He(r, t, 0), i;
    }
    return e;
  }
  function ye(r, t, e) {
    if (t.length === 0) throw new Error("mnemonist/heap.replace: cannot pop an empty heap.");
    var i = t[0];
    return t[0] = e, He(r, t, 0), i;
  }
  function Gn(r, t, e) {
    var i;
    return t.length !== 0 && r(t[0], e) < 0 && (i = t[0], t[0] = e, e = i, He(r, t, 0)), e;
  }
  function ie(r, t) {
    for (var e = t.length, i = e >> 1, n = i; --n >= 0; ) He(r, t, n);
  }
  function hi(r, t) {
    for (var e = t.length, i = 0, n = new Array(e); i < e; ) n[i++] = ai(r, t);
    return n;
  }
  function Ja(r, t, e) {
    arguments.length === 2 && (e = t, t = r, r = Er);
    var i = oi(r), n, o, s, a3 = 1 / 0, h;
    if (t === 1) {
      if (Dt.isArrayLike(e)) {
        for (n = 0, o = e.length; n < o; n++) s = e[n], (a3 === 1 / 0 || r(s, a3) < 0) && (a3 = s);
        return h = new e.constructor(1), h[0] = a3, h;
      }
      return Cr(e, function(l) {
        (a3 === 1 / 0 || r(l, a3) < 0) && (a3 = l);
      }), [a3];
    }
    if (Dt.isArrayLike(e)) {
      if (t >= e.length) return e.slice().sort(r);
      for (h = e.slice(0, t), ie(i, h), n = t, o = e.length; n < o; n++) i(e[n], h[0]) > 0 && ye(i, h, e[n]);
      return h.sort(r);
    }
    var u = Dt.guessLength(e);
    return u !== null && u < t && (t = u), h = new Array(t), n = 0, Cr(e, function(l) {
      n < t ? h[n] = l : (n === t && ie(i, h), i(l, h[0]) > 0 && ye(i, h, l)), n++;
    }), h.length > n && (h.length = n), h.sort(r);
  }
  function Qa(r, t, e) {
    arguments.length === 2 && (e = t, t = r, r = Er);
    var i = oi(r), n, o, s, a3 = -1 / 0, h;
    if (t === 1) {
      if (Dt.isArrayLike(e)) {
        for (n = 0, o = e.length; n < o; n++) s = e[n], (a3 === -1 / 0 || r(s, a3) > 0) && (a3 = s);
        return h = new e.constructor(1), h[0] = a3, h;
      }
      return Cr(e, function(l) {
        (a3 === -1 / 0 || r(l, a3) > 0) && (a3 = l);
      }), [a3];
    }
    if (Dt.isArrayLike(e)) {
      if (t >= e.length) return e.slice().sort(i);
      for (h = e.slice(0, t), ie(r, h), n = t, o = e.length; n < o; n++) r(e[n], h[0]) > 0 && ye(r, h, e[n]);
      return h.sort(i);
    }
    var u = Dt.guessLength(e);
    return u !== null && u < t && (t = u), h = new Array(t), n = 0, Cr(e, function(l) {
      n < t ? h[n] = l : (n === t && ie(r, h), r(l, h[0]) > 0 && ye(r, h, l)), n++;
    }), h.length > n && (h.length = n), h.sort(i);
  }
  function C(r) {
    if (this.clear(), this.comparator = r || Er, typeof this.comparator != "function") throw new Error("mnemonist/Heap.constructor: given comparator should be a function.");
  }
  C.prototype.clear = function() {
    this.items = [], this.size = 0;
  };
  C.prototype.push = function(r) {
    return Un(this.comparator, this.items, r), ++this.size;
  };
  C.prototype.peek = function() {
    return this.items[0];
  };
  C.prototype.pop = function() {
    return this.size !== 0 && this.size--, ai(this.comparator, this.items);
  };
  C.prototype.replace = function(r) {
    return ye(this.comparator, this.items, r);
  };
  C.prototype.pushpop = function(r) {
    return Gn(this.comparator, this.items, r);
  };
  C.prototype.consume = function() {
    return this.size = 0, hi(this.comparator, this.items);
  };
  C.prototype.toArray = function() {
    return hi(this.comparator, this.items.slice());
  };
  C.prototype.inspect = function() {
    var r = this.toArray();
    return Object.defineProperty(r, "constructor", { value: C, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (C.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = C.prototype.inspect);
  function Lr(r) {
    if (this.clear(), this.comparator = r || Er, typeof this.comparator != "function") throw new Error("mnemonist/MaxHeap.constructor: given comparator should be a function.");
    this.comparator = oi(this.comparator);
  }
  Lr.prototype = C.prototype;
  C.from = function(r, t) {
    var e = new C(t), i;
    return Dt.isArrayLike(r) ? i = r.slice() : i = Dt.toArray(r), ie(e.comparator, i), e.items = i, e.size = i.length, e;
  };
  Lr.from = function(r, t) {
    var e = new Lr(t), i;
    return Dt.isArrayLike(r) ? i = r.slice() : i = Dt.toArray(r), ie(e.comparator, i), e.items = i, e.size = i.length, e;
  };
  C.siftUp = He;
  C.siftDown = si;
  C.push = Un;
  C.pop = ai;
  C.replace = ye;
  C.pushpop = Gn;
  C.heapify = ie;
  C.consume = hi;
  C.nsmallest = Ja;
  C.nlargest = Qa;
  C.MinHeap = C;
  C.MaxHeap = Lr;
  Nn.exports = C;
});
var $n = y((_m, jn) => {
  var Bn = "";
  function Wn(r, t, e) {
    for (var i = t.length, n = [], o = i, s = -1, a3, h = 0, u; o--; ) s = Math.max(r[t[o] + e], s);
    for (u = s >> 24 && 32 || s >> 16 && 24 || s >> 8 && 16 || 8; h < u; h += 4) {
      for (o = 16; o--; ) n[o] = [];
      for (o = i; o--; ) n[r[t[o] + e] >> h & 15].push(t[o]);
      for (a3 = 0; a3 < 16; a3++) for (s = n[a3].length; s--; ) t[++o] = n[a3][s];
    }
  }
  function Za(r, t, e, i) {
    return r[e] - r[i] || (e % 3 === 2 ? r[e + 1] - r[i + 1] || t[e + 2] - t[i + 2] : t[e + 1] - t[i + 1]);
  }
  function ui(r, t) {
    var e = [], i = [], n = 2 * t / 3 | 0, o = t - n, s = n + 1 >> 1, a3 = n, h = 0, u, l = [], c = [];
    if (t === 1) return [0];
    for (; a3--; ) e[a3] = (a3 * 3 >> 1) + 1;
    for (a3 = 3; a3--; ) Wn(r, e, a3);
    for (h = i[(e[0] / 3 | 0) + (e[0] % 3 === 1 ? 0 : s)] = 1, a3 = 1; a3 < n; a3++) (r[e[a3]] !== r[e[a3 - 1]] || r[e[a3] + 1] !== r[e[a3 - 1] + 1] || r[e[a3] + 2] !== r[e[a3 - 1] + 2]) && h++, i[(e[a3] / 3 | 0) + (e[a3] % 3 === 1 ? 0 : s)] = h;
    if (h < n) for (i = ui(i, n), a3 = n; a3--; ) e[a3] = i[a3] < s ? i[a3] * 3 + 1 : (i[a3] - s) * 3 + 2;
    for (a3 = n; a3--; ) l[e[a3]] = a3;
    for (l[t] = -1, l[t + 1] = -2, i = t % 3 === 1 ? [t - 1] : [], a3 = 0; a3 < n; a3++) e[a3] % 3 === 1 && i.push(e[a3] - 1);
    for (Wn(r, i, 0), a3 = 0, h = 0, u = 0; a3 < n && h < o; ) c[u++] = Za(r, l, e[a3], i[h]) < 0 ? e[a3++] : i[h++];
    for (; a3 < n; ) c[u++] = e[a3++];
    for (; h < o; ) c[u++] = i[h++];
    return c;
  }
  function qn(r) {
    var t = r.length, e = t % 3, i = new Array(t + e), n, o;
    if (typeof r != "string") {
      var s = /* @__PURE__ */ Object.create(null);
      for (o = 0; o < t; o++) s[r[o]] || (s[r[o]] = true);
      var a3 = /* @__PURE__ */ Object.create(null), h = Object.keys(s).sort();
      for (o = 0, n = h.length; o < n; o++) a3[h[o]] = o + 1;
      for (o = 0; o < t; o++) i[o] = a3[r[o]];
    } else for (o = 0; o < t; o++) i[o] = r.charCodeAt(o);
    for (o = t; o < t + e; o++) i[o] = 0;
    return i;
  }
  function qt(r) {
    this.hasArbitrarySequence = typeof r != "string", this.string = r, this.length = r.length, this.array = ui(qn(r), this.length);
  }
  qt.prototype.toString = function() {
    return this.array.join(",");
  };
  qt.prototype.toJSON = function() {
    return this.array;
  };
  qt.prototype.inspect = function() {
    for (var r = new Array(this.length), t = 0; t < this.length; t++) r[t] = this.string.slice(this.array[t]);
    return Object.defineProperty(r, "constructor", { value: qt, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (qt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = qt.prototype.inspect);
  function jt(r) {
    if (this.hasArbitrarySequence = typeof r[0] != "string", this.size = r.length, this.hasArbitrarySequence) {
      this.text = [];
      for (var t = 0, e = this.size; t < e; t++) this.text.push.apply(this.text, r[t]), t < e - 1 && this.text.push(Bn);
    } else this.text = r.join(Bn);
    this.firstLength = r[0].length, this.length = this.text.length, this.array = ui(qn(this.text), this.length);
  }
  jt.prototype.longestCommonSubsequence = function() {
    var r = this.hasArbitrarySequence ? [] : "", t, e, i, n, o;
    for (e = 1; e < this.length; e++) if (n = this.array[e], o = this.array[e - 1], !(n < this.firstLength && o < this.firstLength) && !(n > this.firstLength && o > this.firstLength)) {
      for (t = Math.min(this.length - n, this.length - o), i = 0; i < t; i++) if (this.text[n + i] !== this.text[o + i]) {
        t = i;
        break;
      }
      t > r.length && (r = this.text.slice(n, n + t));
    }
    return r;
  };
  jt.prototype.toString = function() {
    return this.array.join(",");
  };
  jt.prototype.toJSON = function() {
    return this.array;
  };
  jt.prototype.inspect = function() {
    for (var r = new Array(this.length), t = 0; t < this.length; t++) r[t] = this.text.slice(this.array[t]);
    return Object.defineProperty(r, "constructor", { value: jt, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (jt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = jt.prototype.inspect);
  qt.GeneralizedSuffixArray = jt;
  jn.exports = qt;
});
var Qn = y((zm, Jn) => {
  var th2 = A();
  function Pt2(r) {
    this.size = 0, this.items = /* @__PURE__ */ new Map(), this.inverse = r;
  }
  function ct() {
    this.size = 0, this.items = /* @__PURE__ */ new Map(), this.inverse = new Pt2(this);
  }
  function Yn() {
    this.size = 0, this.items.clear(), this.inverse.items.clear();
  }
  ct.prototype.clear = Yn;
  Pt2.prototype.clear = Yn;
  function Kn(r, t) {
    if (this.items.has(r)) {
      var e = this.items.get(r);
      if (e === t) return this;
      this.inverse.items.delete(e);
    }
    if (this.inverse.items.has(t)) {
      var i = this.inverse.items.get(t);
      if (i === r) return this;
      this.items.delete(i);
    }
    return this.items.set(r, t), this.inverse.items.set(t, r), this.size = this.items.size, this.inverse.size = this.inverse.items.size, this;
  }
  ct.prototype.set = Kn;
  Pt2.prototype.set = Kn;
  function Xn(r) {
    if (this.items.has(r)) {
      var t = this.items.get(r);
      return this.items.delete(r), this.inverse.items.delete(t), this.size = this.items.size, this.inverse.size = this.inverse.items.size, true;
    }
    return false;
  }
  ct.prototype.delete = Xn;
  Pt2.prototype.delete = Xn;
  var eh = ["has", "get", "forEach", "keys", "values", "entries"];
  eh.forEach(function(r) {
    ct.prototype[r] = Pt2.prototype[r] = function() {
      return Map.prototype[r].apply(this.items, arguments);
    };
  });
  typeof Symbol != "undefined" && (ct.prototype[Symbol.iterator] = ct.prototype.entries, Pt2.prototype[Symbol.iterator] = Pt2.prototype.entries);
  ct.prototype.inspect = function() {
    var r = { left: this.items, right: this.inverse.items };
    return Object.defineProperty(r, "constructor", { value: ct, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (ct.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = ct.prototype.inspect);
  Pt2.prototype.inspect = function() {
    var r = { left: this.inverse.items, right: this.items };
    return Object.defineProperty(r, "constructor", { value: Pt2, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (Pt2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Pt2.prototype.inspect);
  ct.from = function(r) {
    var t = new ct();
    return th2(r, function(e, i) {
      t.set(i, e);
    }), t;
  };
  Jn.exports = ct;
});
var j = y((Vm, Zn) => {
  function It(r) {
    if (typeof r != "function") throw new Error("obliterator/iterator: expecting a function!");
    this.next = r;
  }
  typeof Symbol != "undefined" && (It.prototype[Symbol.iterator] = function() {
    return this;
  });
  It.of = function() {
    var r = arguments, t = r.length, e = 0;
    return new It(function() {
      return e >= t ? { done: true } : { done: false, value: r[e++] };
    });
  };
  It.empty = function() {
    var r = new It(function() {
      return { done: true };
    });
    return r;
  };
  It.fromSequence = function(r) {
    var t = 0, e = r.length;
    return new It(function() {
      return t >= e ? { done: true } : { done: false, value: r[t++] };
    });
  };
  It.is = function(r) {
    return r instanceof It ? true : typeof r == "object" && r !== null && typeof r.next == "function";
  };
  Zn.exports = It;
});
var ci = y((wt2) => {
  function eo(r) {
    return r |= r >> 1, r |= r >> 2, r |= r >> 4, r |= r >> 8, r |= r >> 16, r & ~(r >> 1);
  }
  wt2.msb32 = eo;
  function li(r) {
    return r |= r >> 1, r |= r >> 2, r |= r >> 4, r & ~(r >> 1);
  }
  wt2.msb8 = li;
  wt2.test = function(r, t) {
    return r >> t & 1;
  };
  wt2.criticalBit8 = function(r, t) {
    return li(r ^ t);
  };
  wt2.criticalBit8Mask = function(r, t) {
    return ~li(r ^ t) >>> 0 & 255;
  };
  wt2.testCriticalBit8 = function(r, t) {
    return 1 + (r | t) >> 8;
  };
  wt2.criticalBit32Mask = function(r, t) {
    return ~eo(r ^ t) >>> 0 & 4294967295;
  };
  wt2.popcount = function(r) {
    return r -= r >> 1 & 1431655765, r = (r & 858993459) + (r >> 2 & 858993459), r = r + (r >> 4) & 252645135, r += r >> 8, r += r >> 16, r & 127;
  };
  var ve2 = new Uint8Array(Math.pow(2, 8));
  for (Ue = 0, to = ve2.length; Ue < to; Ue++) ve2[Ue] = wt2.popcount(Ue);
  var Ue, to;
  wt2.table8Popcount = function(r) {
    return ve2[r & 255] + ve2[r >> 8 & 255] + ve2[r >> 16 & 255] + ve2[r >> 24 & 255];
  };
});
var oo = y((Um, no) => {
  var io = j(), ro = ci();
  function G(r) {
    this.length = r, this.clear();
  }
  G.prototype.clear = function() {
    this.size = 0, this.array = new Uint32Array(Math.ceil(this.length / 32));
  };
  G.prototype.set = function(r, t) {
    var e = r >> 5, i = r & 31, n = this.array[e], o;
    return t === 0 || t === false ? o = this.array[e] &= ~(1 << i) : o = this.array[e] |= 1 << i, o = o >>> 0, o > n ? this.size++ : o < n && this.size--, this;
  };
  G.prototype.reset = function(r) {
    var t = r >> 5, e = r & 31, i = this.array[t], n;
    return n = this.array[t] &= ~(1 << e), n < i && this.size--, this;
  };
  G.prototype.flip = function(r) {
    var t = r >> 5, e = r & 31, i = this.array[t], n = this.array[t] ^= 1 << e;
    return n = n >>> 0, n > i ? this.size++ : n < i && this.size--, this;
  };
  G.prototype.get = function(r) {
    var t = r >> 5, e = r & 31;
    return this.array[t] >> e & 1;
  };
  G.prototype.test = function(r) {
    return Boolean(this.get(r));
  };
  G.prototype.rank = function(r) {
    if (this.size === 0) return 0;
    for (var t = r >> 5, e = r & 31, i = 0, n = 0; n < t; n++) i += ro.table8Popcount(this.array[n]);
    var o = this.array[t] & (1 << e) - 1;
    return i += ro.table8Popcount(o), i;
  };
  G.prototype.select = function(r) {
    if (this.size === 0 || r >= this.length) return -1;
    for (var t, e = 32, i = 0, n = 0, o = 0, s = this.array.length; o < s; o++) if (t = this.array[o], t !== 0) {
      o === s - 1 && (e = this.length % 32 || 32);
      for (var a3 = 0; a3 < e; a3++, i++) if (n += t >> a3 & 1, n === r) return i;
    }
  };
  G.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = this.length, i, n, o = 32, s = 0, a3 = this.array.length; s < a3; s++) {
      i = this.array[s], s === a3 - 1 && (o = e % 32 || 32);
      for (var h = 0; h < o; h++) n = i >> h & 1, r.call(t, n, s * 32 + h);
    }
  };
  G.prototype.values = function() {
    var r = this.length, t = false, e, i, n = this.array, o = n.length, s = 0, a3 = -1, h = 32;
    return new io(function u() {
      if (!t) {
        if (s >= o) return { done: true };
        s === o - 1 && (h = r % 32 || 32), e = n[s++], t = true, a3 = -1;
      }
      return a3++, a3 >= h ? (t = false, u()) : (i = e >> a3 & 1, { value: i });
    });
  };
  G.prototype.entries = function() {
    var r = this.length, t = false, e, i, n = this.array, o, s = n.length, a3 = 0, h = -1, u = 32;
    return new io(function l() {
      if (!t) {
        if (a3 >= s) return { done: true };
        a3 === s - 1 && (u = r % 32 || 32), e = n[a3++], t = true, h = -1;
      }
      return h++, o = ~-a3 * 32 + h, h >= u ? (t = false, l()) : (i = e >> h & 1, { value: [o, i] });
    });
  };
  typeof Symbol != "undefined" && (G.prototype[Symbol.iterator] = G.prototype.values);
  G.prototype.inspect = function() {
    var r = new Uint8Array(this.length);
    return this.forEach(function(t, e) {
      r[e] = t;
    }), Object.defineProperty(r, "constructor", { value: G, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (G.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = G.prototype.inspect);
  G.prototype.toJSON = function() {
    return Array.from(this.array);
  };
  no.exports = G;
});
var uo = y((Gm, ho) => {
  var ao = j(), so = ci(), rh = function(r) {
    return Math.max(1, Math.ceil(r * 1.5));
  };
  function ih(r) {
    return new Uint32Array(Math.ceil(r / 32));
  }
  function D(r) {
    var t = r || 0, e = rh;
    typeof r == "object" && (t = r.initialLength || r.initialCapacity || 0, e = r.policy || e), this.size = 0, this.length = t, this.capacity = Math.ceil(this.length / 32) * 32, this.policy = e, this.array = ih(this.capacity);
  }
  D.prototype.set = function(r, t) {
    if (this.length < r) throw new Error("BitVector.set: index out of bounds.");
    var e = r >> 5, i = r & 31, n = this.array[e], o;
    return t === 0 || t === false ? o = this.array[e] &= ~(1 << i) : o = this.array[e] |= 1 << i, o = o >>> 0, o > n ? this.size++ : o < n && this.size--, this;
  };
  D.prototype.reset = function(r) {
    var t = r >> 5, e = r & 31, i = this.array[t], n;
    return n = this.array[t] &= ~(1 << e), n < i && this.size--, this;
  };
  D.prototype.flip = function(r) {
    var t = r >> 5, e = r & 31, i = this.array[t], n = this.array[t] ^= 1 << e;
    return n = n >>> 0, n > i ? this.size++ : n < i && this.size--, this;
  };
  D.prototype.applyPolicy = function(r) {
    var t = this.policy(r || this.capacity);
    if (typeof t != "number" || t < 0) throw new Error("mnemonist/bit-vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
    if (t <= this.capacity) throw new Error("mnemonist/bit-vector.applyPolicy: policy returned a less or equal capacity to allocate.");
    return Math.ceil(t / 32) * 32;
  };
  D.prototype.reallocate = function(r) {
    var t = r;
    if (r = Math.ceil(r / 32) * 32, t < this.length && (this.length = t), r === this.capacity) return this;
    var e = this.array, i = r / 32;
    return i === this.array.length ? this : (i > this.array.length ? (this.array = new Uint32Array(i), this.array.set(e, 0)) : this.array = e.slice(0, i), this.capacity = r, this);
  };
  D.prototype.grow = function(r) {
    var t;
    if (typeof r == "number") {
      if (this.capacity >= r) return this;
      for (t = this.capacity; t < r; ) t = this.applyPolicy(t);
      return this.reallocate(t), this;
    }
    return t = this.applyPolicy(), this.reallocate(t), this;
  };
  D.prototype.resize = function(r) {
    return r === this.length ? this : r < this.length ? (this.length = r, this) : (this.length = r, this.reallocate(r), this);
  };
  D.prototype.push = function(r) {
    if (this.capacity === this.length && this.grow(), r === 0 || r === false) return ++this.length;
    this.size++;
    var t = this.length++, e = t >> 5, i = t & 31;
    return this.array[e] |= 1 << i, this.length;
  };
  D.prototype.pop = function() {
    if (this.length !== 0) {
      var r = --this.length, t = r >> 5, e = r & 31;
      return this.array[t] >> e & 1;
    }
  };
  D.prototype.get = function(r) {
    if (!(this.length < r)) {
      var t = r >> 5, e = r & 31;
      return this.array[t] >> e & 1;
    }
  };
  D.prototype.test = function(r) {
    return this.length < r ? false : Boolean(this.get(r));
  };
  D.prototype.rank = function(r) {
    if (this.size === 0) return 0;
    for (var t = r >> 5, e = r & 31, i = 0, n = 0; n < t; n++) i += so.table8Popcount(this.array[n]);
    var o = this.array[t] & (1 << e) - 1;
    return i += so.table8Popcount(o), i;
  };
  D.prototype.select = function(r) {
    if (this.size === 0 || r >= this.length) return -1;
    for (var t, e = 32, i = 0, n = 0, o = 0, s = this.array.length; o < s; o++) if (t = this.array[o], t !== 0) {
      o === s - 1 && (e = this.length % 32 || 32);
      for (var a3 = 0; a3 < e; a3++, i++) if (n += t >> a3 & 1, n === r) return i;
    }
  };
  D.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = this.length, i, n, o = 32, s = 0, a3 = this.array.length; s < a3; s++) {
      i = this.array[s], s === a3 - 1 && (o = e % 32 || 32);
      for (var h = 0; h < o; h++) n = i >> h & 1, r.call(t, n, s * 32 + h);
    }
  };
  D.prototype.values = function() {
    var r = this.length, t = false, e, i, n = this.array, o = n.length, s = 0, a3 = -1, h = 32;
    return new ao(function u() {
      if (!t) {
        if (s >= o) return { done: true };
        s === o - 1 && (h = r % 32 || 32), e = n[s++], t = true, a3 = -1;
      }
      return a3++, a3 >= h ? (t = false, u()) : (i = e >> a3 & 1, { value: i });
    });
  };
  D.prototype.entries = function() {
    var r = this.length, t = false, e, i, n = this.array, o, s = n.length, a3 = 0, h = -1, u = 32;
    return new ao(function l() {
      if (!t) {
        if (a3 >= s) return { done: true };
        a3 === s - 1 && (u = r % 32 || 32), e = n[a3++], t = true, h = -1;
      }
      return h++, o = ~-a3 * 32 + h, h >= u ? (t = false, l()) : (i = e >> h & 1, { value: [o, i] });
    });
  };
  typeof Symbol != "undefined" && (D.prototype[Symbol.iterator] = D.prototype.values);
  D.prototype.inspect = function() {
    var r = new Uint8Array(this.length);
    return this.forEach(function(t, e) {
      r[e] = t;
    }), Object.defineProperty(r, "constructor", { value: D, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (D.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = D.prototype.inspect);
  D.prototype.toJSON = function() {
    return Array.from(this.array.slice(0, (this.length >> 5) + 1));
  };
  ho.exports = D;
});
var co = y((Nm, lo) => {
  function ne(r, t) {
    return (r & 65535) * t + (((r >>> 16) * t & 65535) << 16) & 4294967295;
  }
  function nh(r, t) {
    return (r & 65535) + (t >>> 16) + (((r >>> 16) + t & 65535) << 16) & 4294967295;
  }
  function pi(r, t) {
    return r << t | r >>> 32 - t;
  }
  lo.exports = function(t, e) {
    var i = 3432918353, n = 461845907, o = 15, s = 13, a3 = 5, h = 1801774676, u = t, l, c, p;
    for (c = 0, p = e.length - 4; c <= p; c += 4) l = e[c] | e[c + 1] << 8 | e[c + 2] << 16 | e[c + 3] << 24, l = ne(l, i), l = pi(l, o), l = ne(l, n), u ^= l, u = pi(u, s), u = ne(u, a3), u = nh(u, h);
    switch (l = 0, e.length & 3) {
      case 3:
        l ^= e[c + 2] << 16;
      case 2:
        l ^= e[c + 1] << 8;
      case 1:
        l ^= e[c], l = ne(l, i), l = pi(l, o), l = ne(l, n), u ^= l;
      default:
    }
    return u ^= e.length, u ^= u >>> 16, u = ne(u, 2246822507), u ^= u >>> 13, u = ne(u, 3266489909), u ^= u >>> 16, u >>> 0;
  };
});
var go = y((Bm, mo) => {
  var oh = co(), sh = A(), ah2 = Math.LN2 * Math.LN2, hh = { errorRate: 5e-3 };
  function po(r) {
    var t = new Uint16Array(r.length), e, i;
    for (e = 0, i = r.length; e < i; e++) t[e] = r.charCodeAt(e);
    return t;
  }
  function fo(r, t, e) {
    var i = oh(t * 4221880213 & 4294967295, e);
    return i % (r * 8);
  }
  function oe(r) {
    var t = {};
    if (!r) throw new Error("mnemonist/BloomFilter.constructor: a BloomFilter must be created with a capacity.");
    if (typeof r == "object" ? t = r : t.capacity = r, typeof t.capacity != "number" || t.capacity <= 0) throw new Error("mnemonist/BloomFilter.constructor: `capacity` option should be a positive integer.");
    if (this.capacity = t.capacity, this.errorRate = t.errorRate || hh.errorRate, typeof this.errorRate != "number" || t.errorRate <= 0) throw new Error("mnemonist/BloomFilter.constructor: `errorRate` option should be a positive float.");
    this.clear();
  }
  oe.prototype.clear = function() {
    var r = -1 / ah2 * this.capacity * Math.log(this.errorRate), t = r / 8 | 0;
    this.hashFunctions = t * 8 / this.capacity * Math.LN2 | 0, this.data = new Uint8Array(t);
  };
  oe.prototype.add = function(r) {
    for (var t = po(r), e = 0, i = this.hashFunctions; e < i; e++) {
      var n = fo(this.data.length, e, t), o = 1 << (7 & n);
      this.data[n >> 3] |= o;
    }
    return this;
  };
  oe.prototype.test = function(r) {
    for (var t = po(r), e = 0, i = this.hashFunctions; e < i; e++) {
      var n = fo(this.data.length, e, t);
      if (!(this.data[n >> 3] & 1 << (7 & n))) return false;
    }
    return true;
  };
  oe.prototype.toJSON = function() {
    return this.data;
  };
  oe.from = function(r, t) {
    if (!t && (t = r.length || r.size, typeof t != "number")) throw new Error("BloomFilter.from: could not infer the filter's capacity. Try passing it as second argument.");
    var e = new oe(t);
    return sh(r, function(i) {
      e.add(i);
    }), e;
  };
  mo.exports = oe;
});
var vo = y((Wm, yo) => {
  var uh = A();
  function Tt(r) {
    if (typeof r != "function") throw new Error("mnemonist/BKTree.constructor: given `distance` should be a function.");
    this.distance = r, this.clear();
  }
  Tt.prototype.add = function(r) {
    if (!this.root) return this.root = { item: r, children: {} }, this.size++, this;
    for (var t = this.root, e; e = this.distance(r, t.item), !!t.children[e]; ) t = t.children[e];
    return t.children[e] = { item: r, children: {} }, this.size++, this;
  };
  Tt.prototype.search = function(r, t) {
    if (!this.root) return [];
    for (var e = [], i = [this.root], n, o, s, a3, h; i.length; ) for (n = i.pop(), s = this.distance(t, n.item), s <= r && e.push({ item: n.item, distance: s }), a3 = s - r, h = s + r + 1; a3 < h; a3++) o = n.children[a3], o && i.push(o);
    return e;
  };
  Tt.prototype.clear = function() {
    this.size = 0, this.root = null;
  };
  Tt.prototype.toJSON = function() {
    return this.root;
  };
  Tt.prototype.inspect = function() {
    for (var r = [], t = [this.root], e, i; t.length; ) if (e = t.pop(), !!e) {
      r.push(e.item);
      for (i in e.children) t.push(e.children[i]);
    }
    return Object.defineProperty(r, "constructor", { value: Tt, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (Tt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Tt.prototype.inspect);
  Tt.from = function(r, t) {
    var e = new Tt(t);
    return uh(r, function(i) {
      e.add(i);
    }), e;
  };
  yo.exports = Tt;
});
var mi = y((qm, Po) => {
  var fi = at(), bo = j();
  function k(r, t) {
    if (arguments.length < 2) throw new Error("mnemonist/fixed-deque: expecting an Array class and a capacity.");
    if (typeof t != "number" || t <= 0) throw new Error("mnemonist/fixed-deque: `capacity` should be a positive number.");
    this.ArrayClass = r, this.capacity = t, this.items = new r(this.capacity), this.clear();
  }
  k.prototype.clear = function() {
    this.start = 0, this.size = 0;
  };
  k.prototype.push = function(r) {
    if (this.size === this.capacity) throw new Error("mnemonist/fixed-deque.push: deque capacity (" + this.capacity + ") exceeded!");
    var t = (this.start + this.size) % this.capacity;
    return this.items[t] = r, ++this.size;
  };
  k.prototype.unshift = function(r) {
    if (this.size === this.capacity) throw new Error("mnemonist/fixed-deque.unshift: deque capacity (" + this.capacity + ") exceeded!");
    var t = this.start - 1;
    return this.start === 0 && (t = this.capacity - 1), this.items[t] = r, this.start = t, ++this.size;
  };
  k.prototype.pop = function() {
    if (this.size === 0) return;
    let r = (this.start + this.size - 1) % this.capacity;
    return this.size--, this.items[r];
  };
  k.prototype.shift = function() {
    if (this.size !== 0) {
      var r = this.start;
      return this.size--, this.start++, this.start === this.capacity && (this.start = 0), this.items[r];
    }
  };
  k.prototype.peekFirst = function() {
    if (this.size !== 0) return this.items[this.start];
  };
  k.prototype.peekLast = function() {
    if (this.size !== 0) {
      var r = this.start + this.size - 1;
      return r > this.capacity && (r -= this.capacity), this.items[r];
    }
  };
  k.prototype.get = function(r) {
    if (this.size !== 0) return r = this.start + r, r > this.capacity && (r -= this.capacity), this.items[r];
  };
  k.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = this.capacity, i = this.size, n = this.start, o = 0; o < i; ) r.call(t, this.items[n], o, this), n++, o++, n === e && (n = 0);
  };
  k.prototype.toArray = function() {
    var r = this.start + this.size;
    if (r < this.capacity) return this.items.slice(this.start, r);
    for (var t = new this.ArrayClass(this.size), e = this.capacity, i = this.size, n = this.start, o = 0; o < i; ) t[o] = this.items[n], n++, o++, n === e && (n = 0);
    return t;
  };
  k.prototype.values = function() {
    var r = this.items, t = this.capacity, e = this.size, i = this.start, n = 0;
    return new bo(function() {
      if (n >= e) return { done: true };
      var o = r[i];
      return i++, n++, i === t && (i = 0), { value: o, done: false };
    });
  };
  k.prototype.entries = function() {
    var r = this.items, t = this.capacity, e = this.size, i = this.start, n = 0;
    return new bo(function() {
      if (n >= e) return { done: true };
      var o = r[i];
      return i++, i === t && (i = 0), { value: [n++, o], done: false };
    });
  };
  typeof Symbol != "undefined" && (k.prototype[Symbol.iterator] = k.prototype.values);
  k.prototype.inspect = function() {
    var r = this.toArray();
    return r.type = this.ArrayClass.name, r.capacity = this.capacity, Object.defineProperty(r, "constructor", { value: k, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (k.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = k.prototype.inspect);
  k.from = function(r, t, e) {
    if (arguments.length < 3 && (e = fi.guessLength(r), typeof e != "number")) throw new Error("mnemonist/fixed-deque.from: could not guess iterable length. Please provide desired capacity as last argument.");
    var i = new k(t, e);
    if (fi.isArrayLike(r)) {
      var n, o;
      for (n = 0, o = r.length; n < o; n++) i.items[n] = r[n];
      return i.size = o, i;
    }
    return fi.forEach(r, function(s) {
      i.push(s);
    }), i;
  };
  Po.exports = k;
});
var xo = y((jm, To) => {
  var di = at(), gi = mi();
  function be2(r, t) {
    if (arguments.length < 2) throw new Error("mnemonist/circular-buffer: expecting an Array class and a capacity.");
    if (typeof t != "number" || t <= 0) throw new Error("mnemonist/circular-buffer: `capacity` should be a positive number.");
    this.ArrayClass = r, this.capacity = t, this.items = new r(this.capacity), this.clear();
  }
  function wo(r) {
    be2.prototype[r] = gi.prototype[r];
  }
  Object.keys(gi.prototype).forEach(wo);
  typeof Symbol != "undefined" && Object.getOwnPropertySymbols(gi.prototype).forEach(wo);
  be2.prototype.push = function(r) {
    var t = (this.start + this.size) % this.capacity;
    return this.items[t] = r, this.size === this.capacity ? (this.start = (t + 1) % this.capacity, this.size) : ++this.size;
  };
  be2.prototype.unshift = function(r) {
    var t = this.start - 1;
    return this.start === 0 && (t = this.capacity - 1), this.items[t] = r, this.size === this.capacity ? (this.start = t, this.size) : (this.start = t, ++this.size);
  };
  be2.from = function(r, t, e) {
    if (arguments.length < 3 && (e = di.guessLength(r), typeof e != "number")) throw new Error("mnemonist/circular-buffer.from: could not guess iterable length. Please provide desired capacity as last argument.");
    var i = new be2(t, e);
    if (di.isArrayLike(r)) {
      var n, o;
      for (n = 0, o = r.length; n < o; n++) i.items[n] = r[n];
      return i.size = o, i;
    }
    return di.forEach(r, function(s) {
      i.push(s);
    }), i;
  };
  To.exports = be2;
});
var Co = y(($m, So) => {
  function J(r) {
    if (typeof r != "function") throw new Error("mnemonist/DefaultMap.constructor: expecting a function.");
    this.items = /* @__PURE__ */ new Map(), this.factory = r, this.size = 0;
  }
  J.prototype.clear = function() {
    this.items.clear(), this.size = 0;
  };
  J.prototype.get = function(r) {
    var t = this.items.get(r);
    return typeof t == "undefined" && (t = this.factory(r, this.size), this.items.set(r, t), this.size++), t;
  };
  J.prototype.peek = function(r) {
    return this.items.get(r);
  };
  J.prototype.set = function(r, t) {
    return this.items.set(r, t), this.size = this.items.size, this;
  };
  J.prototype.has = function(r) {
    return this.items.has(r);
  };
  J.prototype.delete = function(r) {
    var t = this.items.delete(r);
    return this.size = this.items.size, t;
  };
  J.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this, this.items.forEach(r, t);
  };
  J.prototype.entries = function() {
    return this.items.entries();
  };
  J.prototype.keys = function() {
    return this.items.keys();
  };
  J.prototype.values = function() {
    return this.items.values();
  };
  typeof Symbol != "undefined" && (J.prototype[Symbol.iterator] = J.prototype.entries);
  J.prototype.inspect = function() {
    return this.items;
  };
  typeof Symbol != "undefined" && (J.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = J.prototype.inspect);
  J.autoIncrement = function() {
    var r = 0;
    return function() {
      return r++;
    };
  };
  So.exports = J;
});
var Eo = y((Ym, Lo) => {
  function Mt(r) {
    if (typeof r != "function") throw new Error("mnemonist/DefaultWeakMap.constructor: expecting a function.");
    this.items = /* @__PURE__ */ new WeakMap(), this.factory = r;
  }
  Mt.prototype.clear = function() {
    this.items = /* @__PURE__ */ new WeakMap();
  };
  Mt.prototype.get = function(r) {
    var t = this.items.get(r);
    return typeof t == "undefined" && (t = this.factory(r), this.items.set(r, t)), t;
  };
  Mt.prototype.peek = function(r) {
    return this.items.get(r);
  };
  Mt.prototype.set = function(r, t) {
    return this.items.set(r, t), this;
  };
  Mt.prototype.has = function(r) {
    return this.items.has(r);
  };
  Mt.prototype.delete = function(r) {
    return this.items.delete(r);
  };
  Mt.prototype.inspect = function() {
    return this.items;
  };
  typeof Symbol != "undefined" && (Mt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Mt.prototype.inspect);
  Lo.exports = Mt;
});
var Ao = y((Km, Oo) => {
  var yi = ot();
  function Rt(r) {
    var t = yi.getPointerArray(r), e = yi.getPointerArray(Math.log2(r));
    this.size = r, this.dimension = r, this.parents = new t(r), this.ranks = new e(r);
    for (var i = 0; i < r; i++) this.parents[i] = i;
  }
  Rt.prototype.find = function(r) {
    for (var t = r, e, i; e = this.parents[t], t !== e; ) t = e;
    for (; i = this.parents[r], i !== t; ) this.parents[r] = t, r = i;
    return t;
  };
  Rt.prototype.union = function(r, t) {
    var e = this.find(r), i = this.find(t);
    if (e === i) return this;
    this.dimension--;
    var n = this.ranks[r], o = this.ranks[t];
    return n < o ? this.parents[e] = i : n > o ? this.parents[i] = e : (this.parents[i] = e, this.ranks[e]++), this;
  };
  Rt.prototype.connected = function(r, t) {
    var e = this.find(r);
    return e === this.find(t);
  };
  Rt.prototype.mapping = function() {
    for (var r = yi.getPointerArray(this.dimension), t = {}, e = new r(this.size), i = 0, n, o = 0, s = this.parents.length; o < s; o++) n = this.find(o), typeof t[n] == "undefined" ? (e[o] = i, t[n] = i++) : e[o] = t[n];
    return e;
  };
  Rt.prototype.compile = function() {
    for (var r = {}, t = new Array(this.dimension), e = 0, i, n = 0, o = this.parents.length; n < o; n++) i = this.find(n), typeof r[i] == "undefined" ? (t[e] = [n], r[i] = e++) : t[r[i]].push(n);
    return t;
  };
  Rt.prototype.inspect = function() {
    var r = this.compile();
    return Object.defineProperty(r, "constructor", { value: Rt, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (Rt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Rt.prototype.inspect);
  Oo.exports = Rt;
});
var Ar = y((Xm, Mo) => {
  var Do = _e(), vi = Or(), lh = Do.DEFAULT_COMPARATOR, ch = Do.reverseComparator;
  function ph(r, t, e, i) {
    for (var n = e, o = i, s = t[i], a3 = 2 * i + 1, h; a3 < n; ) h = a3 + 1, h < n && r(t[a3], t[h]) >= 0 && (a3 = h), t[i] = t[a3], i = a3, a3 = 2 * i + 1;
    t[i] = s, vi.siftDown(r, t, o, i);
  }
  function Io(r, t, e, i) {
    for (var n = i, o = n, s = new r(i), a3, h; o > 0; ) a3 = e[--o], o !== 0 && (h = e[0], e[0] = a3, ph(t, e, --i, 0), a3 = h), s[o] = a3;
    return s;
  }
  function Ft(r, t, e) {
    if (arguments.length === 2 && (e = t, t = null), this.ArrayClass = r, this.capacity = e, this.items = new r(e), this.clear(), this.comparator = t || lh, typeof e != "number" && e <= 0) throw new Error("mnemonist/FixedReverseHeap.constructor: capacity should be a number > 0.");
    if (typeof this.comparator != "function") throw new Error("mnemonist/FixedReverseHeap.constructor: given comparator should be a function.");
    this.comparator = ch(this.comparator);
  }
  Ft.prototype.clear = function() {
    this.size = 0;
  };
  Ft.prototype.push = function(r) {
    return this.size < this.capacity ? (this.items[this.size] = r, vi.siftDown(this.comparator, this.items, 0, this.size), this.size++) : this.comparator(r, this.items[0]) > 0 && vi.replace(this.comparator, this.items, r), this.size;
  };
  Ft.prototype.peek = function() {
    return this.items[0];
  };
  Ft.prototype.consume = function() {
    var r = Io(this.ArrayClass, this.comparator, this.items, this.size);
    return this.size = 0, r;
  };
  Ft.prototype.toArray = function() {
    return Io(this.ArrayClass, this.comparator, this.items.slice(0, this.size), this.size);
  };
  Ft.prototype.inspect = function() {
    var r = this.toArray();
    return Object.defineProperty(r, "constructor", { value: Ft, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (Ft.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Ft.prototype.inspect);
  Mo.exports = Ft;
});
var ko2 = y((Jm, Fo2) => {
  var fh2 = A(), Ro = function(r) {
    return r;
  };
  function tt(r) {
    if (this.items = /* @__PURE__ */ new Map(), this.clear(), Array.isArray(r) ? (this.writeHashFunction = r[0], this.readHashFunction = r[1]) : (this.writeHashFunction = r, this.readHashFunction = r), this.writeHashFunction || (this.writeHashFunction = Ro), this.readHashFunction || (this.readHashFunction = Ro), typeof this.writeHashFunction != "function") throw new Error("mnemonist/FuzzyMap.constructor: invalid hash function given.");
    if (typeof this.readHashFunction != "function") throw new Error("mnemonist/FuzzyMap.constructor: invalid hash function given.");
  }
  tt.prototype.clear = function() {
    this.items.clear(), this.size = 0;
  };
  tt.prototype.add = function(r) {
    var t = this.writeHashFunction(r);
    return this.items.set(t, r), this.size = this.items.size, this;
  };
  tt.prototype.set = function(r, t) {
    return r = this.writeHashFunction(r), this.items.set(r, t), this.size = this.items.size, this;
  };
  tt.prototype.get = function(r) {
    return r = this.readHashFunction(r), this.items.get(r);
  };
  tt.prototype.has = function(r) {
    return r = this.readHashFunction(r), this.items.has(r);
  };
  tt.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this, this.items.forEach(function(e) {
      r.call(t, e, e);
    });
  };
  tt.prototype.values = function() {
    return this.items.values();
  };
  typeof Symbol != "undefined" && (tt.prototype[Symbol.iterator] = tt.prototype.values);
  tt.prototype.inspect = function() {
    var r = Array.from(this.items.values());
    return Object.defineProperty(r, "constructor", { value: tt, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (tt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = tt.prototype.inspect);
  tt.from = function(r, t, e) {
    var i = new tt(t);
    return fh2(r, function(n, o) {
      e ? i.set(o, n) : i.add(n);
    }), i;
  };
  Fo2.exports = tt;
});
var bi2 = y((Qm, _o) => {
  var Dr = j(), mh2 = A();
  function E(r) {
    this.Container = r || Array, this.items = /* @__PURE__ */ new Map(), this.clear(), Object.defineProperty(this.items, "constructor", { value: E, enumerable: false });
  }
  E.prototype.clear = function() {
    this.size = 0, this.dimension = 0, this.items.clear();
  };
  E.prototype.set = function(r, t) {
    var e = this.items.get(r), i;
    return e || (this.dimension++, e = new this.Container(), this.items.set(r, e)), this.Container === Set ? (i = e.size, e.add(t), i < e.size && this.size++) : (e.push(t), this.size++), this;
  };
  E.prototype.delete = function(r) {
    var t = this.items.get(r);
    return t ? (this.size -= this.Container === Set ? t.size : t.length, this.dimension--, this.items.delete(r), true) : false;
  };
  E.prototype.remove = function(r, t) {
    var e = this.items.get(r), i, n;
    return e ? this.Container === Set ? (i = e.delete(t), i && this.size--, e.size === 0 && (this.items.delete(r), this.dimension--), i) : (n = e.indexOf(t), n === -1 ? false : (this.size--, e.length === 1 ? (this.items.delete(r), this.dimension--, true) : (e.splice(n, 1), true))) : false;
  };
  E.prototype.has = function(r) {
    return this.items.has(r);
  };
  E.prototype.get = function(r) {
    return this.items.get(r);
  };
  E.prototype.multiplicity = function(r) {
    var t = this.items.get(r);
    return typeof t == "undefined" ? 0 : this.Container === Set ? t.size : t.length;
  };
  E.prototype.count = E.prototype.multiplicity;
  E.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    var e;
    function i(n) {
      r.call(t, n, e);
    }
    this.items.forEach(function(n, o) {
      e = o, n.forEach(i);
    });
  };
  E.prototype.forEachAssociation = function(r, t) {
    t = arguments.length > 1 ? t : this, this.items.forEach(r, t);
  };
  E.prototype.keys = function() {
    return this.items.keys();
  };
  E.prototype.values = function() {
    var r = this.items.values(), t = false, e, i, n, o;
    return this.Container === Set ? new Dr(function s() {
      if (!t) {
        if (i = r.next(), i.done) return { done: true };
        t = true, e = i.value.values();
      }
      return i = e.next(), i.done ? (t = false, s()) : { done: false, value: i.value };
    }) : new Dr(function s() {
      if (!t) {
        if (i = r.next(), i.done) return { done: true };
        t = true, e = i.value, n = 0, o = e.length;
      }
      return n >= o ? (t = false, s()) : { done: false, value: e[n++] };
    });
  };
  E.prototype.entries = function() {
    var r = this.items.entries(), t = false, e, i, n, o, s;
    return this.Container === Set ? new Dr(function a3() {
      if (!t) {
        if (i = r.next(), i.done) return { done: true };
        t = true, n = i.value[0], e = i.value[1].values();
      }
      return i = e.next(), i.done ? (t = false, a3()) : { done: false, value: [n, i.value] };
    }) : new Dr(function a3() {
      if (!t) {
        if (i = r.next(), i.done) return { done: true };
        t = true, n = i.value[0], e = i.value[1], o = 0, s = e.length;
      }
      return o >= s ? (t = false, a3()) : { done: false, value: [n, e[o++]] };
    });
  };
  E.prototype.containers = function() {
    return this.items.values();
  };
  E.prototype.associations = function() {
    return this.items.entries();
  };
  typeof Symbol != "undefined" && (E.prototype[Symbol.iterator] = E.prototype.entries);
  E.prototype.inspect = function() {
    return this.items;
  };
  typeof Symbol != "undefined" && (E.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = E.prototype.inspect);
  E.prototype.toJSON = function() {
    return this.items;
  };
  E.from = function(r, t) {
    var e = new E(t);
    return mh2(r, function(i, n) {
      e.set(n, i);
    }), e;
  };
  _o.exports = E;
});
var Ho2 = y((Zm, Vo2) => {
  var dh = bi2(), gh = A(), zo2 = function(r) {
    return r;
  };
  function et(r, t) {
    if (this.items = new dh(t), this.clear(), Array.isArray(r) ? (this.writeHashFunction = r[0], this.readHashFunction = r[1]) : (this.writeHashFunction = r, this.readHashFunction = r), this.writeHashFunction || (this.writeHashFunction = zo2), this.readHashFunction || (this.readHashFunction = zo2), typeof this.writeHashFunction != "function") throw new Error("mnemonist/FuzzyMultiMap.constructor: invalid hash function given.");
    if (typeof this.readHashFunction != "function") throw new Error("mnemonist/FuzzyMultiMap.constructor: invalid hash function given.");
  }
  et.prototype.clear = function() {
    this.items.clear(), this.size = 0, this.dimension = 0;
  };
  et.prototype.add = function(r) {
    var t = this.writeHashFunction(r);
    return this.items.set(t, r), this.size = this.items.size, this.dimension = this.items.dimension, this;
  };
  et.prototype.set = function(r, t) {
    return r = this.writeHashFunction(r), this.items.set(r, t), this.size = this.items.size, this.dimension = this.items.dimension, this;
  };
  et.prototype.get = function(r) {
    return r = this.readHashFunction(r), this.items.get(r);
  };
  et.prototype.has = function(r) {
    return r = this.readHashFunction(r), this.items.has(r);
  };
  et.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this, this.items.forEach(function(e) {
      r.call(t, e, e);
    });
  };
  et.prototype.values = function() {
    return this.items.values();
  };
  typeof Symbol != "undefined" && (et.prototype[Symbol.iterator] = et.prototype.values);
  et.prototype.inspect = function() {
    var r = Array.from(this);
    return Object.defineProperty(r, "constructor", { value: et, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (et.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = et.prototype.inspect);
  et.from = function(r, t, e, i) {
    arguments.length === 3 && typeof e == "boolean" && (i = e, e = Array);
    var n = new et(t, e);
    return gh(r, function(o, s) {
      i ? n.set(s, o) : n.add(o);
    }), n;
  };
  Vo2.exports = et;
});
var No2 = y((td, Go2) => {
  var Uo2 = 1024;
  function yh(r) {
    return (r & r - 1) === 0;
  }
  function xt2(r, t) {
    if (arguments.length < 1) throw new Error("mnemonist/hashed-array-tree: expecting at least a byte array constructor.");
    var e = t || 0, i = Uo2, n = 0;
    if (typeof t == "object" && (e = t.initialCapacity || 0, n = t.initialLength || 0, i = t.blockSize || Uo2), !i || !yh(i)) throw new Error("mnemonist/hashed-array-tree: block size should be a power of two.");
    var o = Math.max(n, e), s = Math.ceil(o / i);
    this.ArrayClass = r, this.length = n, this.capacity = s * i, this.blockSize = i, this.offsetMask = i - 1, this.blockMask = Math.log2(i), this.blocks = new Array(s);
    for (var a3 = 0; a3 < s; a3++) this.blocks[a3] = new this.ArrayClass(this.blockSize);
  }
  xt2.prototype.set = function(r, t) {
    if (this.length < r) throw new Error("HashedArrayTree(" + this.ArrayClass.name + ").set: index out of bounds.");
    var e = r >> this.blockMask, i = r & this.offsetMask;
    return this.blocks[e][i] = t, this;
  };
  xt2.prototype.get = function(r) {
    if (!(this.length < r)) {
      var t = r >> this.blockMask, e = r & this.offsetMask;
      return this.blocks[t][e];
    }
  };
  xt2.prototype.grow = function(r) {
    if (typeof r != "number" && (r = this.capacity + this.blockSize), this.capacity >= r) return this;
    for (; this.capacity < r; ) this.blocks.push(new this.ArrayClass(this.blockSize)), this.capacity += this.blockSize;
    return this;
  };
  xt2.prototype.resize = function(r) {
    return r === this.length ? this : r < this.length ? (this.length = r, this) : (this.length = r, this.grow(r), this);
  };
  xt2.prototype.push = function(r) {
    this.capacity === this.length && this.grow();
    var t = this.length, e = t >> this.blockMask, i = t & this.offsetMask;
    return this.blocks[e][i] = r, ++this.length;
  };
  xt2.prototype.pop = function() {
    if (this.length !== 0) {
      var r = this.blocks[this.blocks.length - 1], t = --this.length & this.offsetMask;
      return r[t];
    }
  };
  xt2.prototype.inspect = function() {
    for (var r = new this.ArrayClass(this.length), t, e = 0, i = this.length; e < i; e++) t = e >> this.blockMask, r[e] = this.blocks[t][e & this.offsetMask];
    return r.type = this.ArrayClass.name, r.items = this.length, r.capacity = this.capacity, r.blockSize = this.blockSize, Object.defineProperty(r, "constructor", { value: xt2, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (xt2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = xt2.prototype.inspect);
  Go2.exports = xt2;
});
var wi2 = y((ed, Wo2) => {
  var Bo2 = j(), Pi2 = at();
  function N(r, t) {
    if (arguments.length < 2) throw new Error("mnemonist/fixed-stack: expecting an Array class and a capacity.");
    if (typeof t != "number" || t <= 0) throw new Error("mnemonist/fixed-stack: `capacity` should be a positive number.");
    this.capacity = t, this.ArrayClass = r, this.items = new this.ArrayClass(this.capacity), this.clear();
  }
  N.prototype.clear = function() {
    this.size = 0;
  };
  N.prototype.push = function(r) {
    if (this.size === this.capacity) throw new Error("mnemonist/fixed-stack.push: stack capacity (" + this.capacity + ") exceeded!");
    return this.items[this.size++] = r, this.size;
  };
  N.prototype.pop = function() {
    if (this.size !== 0) return this.items[--this.size];
  };
  N.prototype.peek = function() {
    return this.items[this.size - 1];
  };
  N.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = 0, i = this.items.length; e < i; e++) r.call(t, this.items[i - e - 1], e, this);
  };
  N.prototype.toArray = function() {
    for (var r = new this.ArrayClass(this.size), t = this.size - 1, e = this.size; e--; ) r[e] = this.items[t - e];
    return r;
  };
  N.prototype.values = function() {
    var r = this.items, t = this.size, e = 0;
    return new Bo2(function() {
      if (e >= t) return { done: true };
      var i = r[t - e - 1];
      return e++, { value: i, done: false };
    });
  };
  N.prototype.entries = function() {
    var r = this.items, t = this.size, e = 0;
    return new Bo2(function() {
      if (e >= t) return { done: true };
      var i = r[t - e - 1];
      return { value: [e++, i], done: false };
    });
  };
  typeof Symbol != "undefined" && (N.prototype[Symbol.iterator] = N.prototype.values);
  N.prototype.toString = function() {
    return this.toArray().join(",");
  };
  N.prototype.toJSON = function() {
    return this.toArray();
  };
  N.prototype.inspect = function() {
    var r = this.toArray();
    return r.type = this.ArrayClass.name, r.capacity = this.capacity, Object.defineProperty(r, "constructor", { value: N, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (N.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = N.prototype.inspect);
  N.from = function(r, t, e) {
    if (arguments.length < 3 && (e = Pi2.guessLength(r), typeof e != "number")) throw new Error("mnemonist/fixed-stack.from: could not guess iterable length. Please provide desired capacity as last argument.");
    var i = new N(t, e);
    if (Pi2.isArrayLike(r)) {
      var n, o;
      for (n = 0, o = r.length; n < o; n++) i.items[n] = r[n];
      return i.size = o, i;
    }
    return Pi2.forEach(r, function(s) {
      i.push(s);
    }), i;
  };
  Wo2.exports = N;
});
var jo2 = y((rd, qo2) => {
  var vh2 = at(), bh2 = ot(), Ph2 = wi2();
  function Ti2(r, t, e, i, n, o, s, a3) {
    var h = s + (a3 - s) / 2 | 0, u = ~-h, l = -~h, c = e[h];
    i[o] = c + 1;
    var p = t ? t(r[c]) : r[c][1], f = o * 2 + 1, d = o * 2 + 2, g = -1 / 0, b = -1 / 0;
    s <= u && (g = Ti2(r, t, e, i, n, f, s, u)), l <= a3 && (b = Ti2(r, t, e, i, n, d, l, a3));
    var w = Math.max(p, g, b), v = c;
    return w === g ? v = n[i[f] - 1] : w === b && (v = n[i[d] - 1]), n[c] = v, w;
  }
  function kt2(r, t) {
    this.size = r.length, this.intervals = r;
    var e = null, i = null;
    Array.isArray(t) && (e = t[0], i = t[1]);
    var n = r.length, o = bh2.getPointerArray(n + 1), s = new o(n), a3;
    for (a3 = 1; a3 < n; a3++) s[a3] = a3;
    s.sort(function(p, f) {
      return p = r[p], f = r[f], e ? (p = e(p), f = e(f)) : (p = p[0], f = f[0]), p < f ? -1 : p > f ? 1 : 0;
    });
    var h = Math.ceil(Math.log2(n + 1)), u = Math.pow(2, h) - 1, l = new o(u), c = new o(n);
    Ti2(r, i, s, l, c, 0, 0, n - 1), s = null, this.height = h, this.tree = l, this.augmentations = c, this.startGetter = e, this.endGetter = i, this.stack = new Ph2(o, this.height);
  }
  kt2.prototype.intervalsContainingPoint = function(r) {
    var t = [], e = this.stack;
    e.clear(), e.push(0);
    for (var i = this.tree.length, n, o, s, a3, h, u, l, c, p; e.size; ) n = e.pop(), o = this.tree[n] - 1, s = this.intervals[o], a3 = this.intervals[this.augmentations[o]], l = this.endGetter ? this.endGetter(a3) : a3[1], !(r > l) && (c = n * 2 + 1, c < i && this.tree[c] !== 0 && e.push(c), h = this.startGetter ? this.startGetter(s) : s[0], u = this.endGetter ? this.endGetter(s) : s[1], r >= h && r <= u && t.push(s), !(r < h) && (p = n * 2 + 2, p < i && this.tree[p] !== 0 && e.push(p)));
    return t;
  };
  kt2.prototype.intervalsOverlappingInterval = function(r) {
    var t = this.startGetter ? this.startGetter(r) : r[0], e = this.endGetter ? this.endGetter(r) : r[1], i = [], n = this.stack;
    n.clear(), n.push(0);
    for (var o = this.tree.length, s, a3, h, u, l, c, p, f, d; n.size; ) s = n.pop(), a3 = this.tree[s] - 1, h = this.intervals[a3], u = this.intervals[this.augmentations[a3]], p = this.endGetter ? this.endGetter(u) : u[1], !(t > p) && (f = s * 2 + 1, f < o && this.tree[f] !== 0 && n.push(f), l = this.startGetter ? this.startGetter(h) : h[0], c = this.endGetter ? this.endGetter(h) : h[1], e >= l && t <= c && i.push(h), !(e < l) && (d = s * 2 + 2, d < o && this.tree[d] !== 0 && n.push(d)));
    return i;
  };
  kt2.prototype.inspect = function() {
    var r = this.intervals.slice();
    return Object.defineProperty(r, "constructor", { value: kt2, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (kt2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = kt2.prototype.inspect);
  kt2.from = function(r, t) {
    return vh2.isArrayLike(r) ? new kt2(r, t) : new kt2(Array.from(r), t);
  };
  qo2.exports = kt2;
});
var xi2 = y(($t) => {
  $t.search = function(r, t, e, i) {
    var n = 0;
    e = typeof e != "undefined" ? e : 0, i = typeof i != "undefined" ? i : r.length, i--;
    for (var o; e <= i; ) if (n = e + i >>> 1, o = r[n], o > t) i = ~-n;
    else if (o < t) e = -~n;
    else return n;
    return -1;
  };
  $t.searchWithComparator = function(r, t, e) {
    for (var i = 0, n = 0, o = ~-t.length, s; n <= o; ) if (i = n + o >>> 1, s = r(t[i], e), s > 0) o = ~-i;
    else if (s < 0) n = -~i;
    else return i;
    return -1;
  };
  $t.lowerBound = function(r, t, e, i) {
    var n = 0;
    for (e = typeof e != "undefined" ? e : 0, i = typeof i != "undefined" ? i : r.length; e < i; ) n = e + i >>> 1, t <= r[n] ? i = n : e = -~n;
    return e;
  };
  $t.lowerBoundWithComparator = function(r, t, e) {
    for (var i = 0, n = 0, o = t.length; n < o; ) i = n + o >>> 1, r(e, t[i]) <= 0 ? o = i : n = -~i;
    return n;
  };
  $t.lowerBoundIndices = function(r, t, e, i, n) {
    var o = 0;
    for (i = typeof i != "undefined" ? i : 0, n = typeof n != "undefined" ? n : r.length; i < n; ) o = i + n >>> 1, e <= r[t[o]] ? n = o : i = -~o;
    return i;
  };
  $t.upperBound = function(r, t, e, i) {
    var n = 0;
    for (e = typeof e != "undefined" ? e : 0, i = typeof i != "undefined" ? i : r.length; e < i; ) n = e + i >>> 1, t >= r[n] ? e = -~n : i = n;
    return e;
  };
  $t.upperBoundWithComparator = function(r, t, e) {
    for (var i = 0, n = 0, o = t.length; n < o; ) i = n + o >>> 1, r(e, t[i]) >= 0 ? n = -~i : o = i;
    return n;
  };
});
var Xo2 = y((Yt) => {
  var Pe2 = ot(), we = at().isArrayLike, se = xi2(), $o2 = Pr2();
  function Yo2(r, t) {
    if (r.length === 0) return t.slice();
    if (t.length === 0) return r.slice();
    var e;
    r[0] > t[0] && (e = r, r = t, t = e);
    var i = r[r.length - 1], n = t[0];
    if (i <= n) return Pe2.isTypedArray(r) ? Pe2.concat(r, t) : r.concat(t);
    var o = new r.constructor(r.length + t.length), s, a3, h;
    for (s = 0, a3 = r.length; s < a3 && (h = r[s], h <= n); s++) o[s] = h;
    for (var u = s, l = r.length, c = 0, p = t.length, f, d; u < l && c < p; ) f = r[u], d = t[c], f <= d ? (o[s++] = f, u++) : (o[s++] = d, c++);
    for (; u < l; ) o[s++] = r[u++];
    for (; c < p; ) o[s++] = t[c++];
    return o;
  }
  function Ko2(r, t) {
    if (r.length === 0) return t.slice();
    if (t.length === 0) return r.slice();
    var e;
    r[0] > t[0] && (e = r, r = t, t = e);
    var i = r[r.length - 1], n = t[0];
    if (i < n) return Pe2.isTypedArray(r) ? Pe2.concat(r, t) : r.concat(t);
    var o = new r.constructor(), s, a3, h;
    for (s = 0, a3 = r.length; s < a3 && (h = r[s], h < n); s++) o.push(h);
    for (var u = s, l = r.length, c = 0, p = t.length, f, d; u < l && c < p; ) f = r[u], d = t[c], f <= d ? ((o.length === 0 || o[o.length - 1] !== f) && o.push(f), u++) : ((o.length === 0 || o[o.length - 1] !== d) && o.push(d), c++);
    for (; u < l; ) f = r[u++], (o.length === 0 || o[o.length - 1] !== f) && o.push(f);
    for (; c < p; ) d = t[c++], (o.length === 0 || o[o.length - 1] !== d) && o.push(d);
    return o;
  }
  Yt.intersectionUniqueArrays = function(r, t) {
    if (r.length === 0 || t.length === 0) return new r.constructor(0);
    var e;
    r[0] > t[0] && (e = r, r = t, t = e);
    var i = r[r.length - 1], n = t[0];
    if (i < n) return new r.constructor(0);
    for (var o = new r.constructor(), s = se.lowerBound(r, n), a3 = r.length, h = 0, u = se.upperBound(t, i), l, c; s < a3 && h < u; ) l = r[s], c = t[h], l < c ? s = se.lowerBound(r, c, s + 1) : l > c ? h = se.lowerBound(t, l, h + 1) : (o.push(l), s++, h++);
    return o;
  };
  function wh2(r) {
    var t = 0, e = -1 / 0, i, n, o, s = [];
    for (n = 0, o = r.length; n < o; n++) i = r[n].length, i !== 0 && (s.push(r[n]), t += i, i > e && (e = i));
    if (s.length === 0) return new r[0].constructor(0);
    if (s.length === 1) return s[0].slice();
    if (s.length === 2) return Yo2(s[0], s[1]);
    r = s;
    var a3 = new r[0].constructor(t), h = Pe2.getPointerArray(e), u = new h(r.length), l = new $o2(function(f, d) {
      return f = r[f][u[f]], d = r[d][u[d]], f < d ? -1 : f > d ? 1 : 0;
    });
    for (n = 0; n < o; n++) l.push(n);
    n = 0;
    for (var c, p; l.size; ) c = l.pop(), p = r[c][u[c]++], a3[n++] = p, u[c] < r[c].length && l.push(c);
    return a3;
  }
  function Th2(r) {
    var t = -1 / 0, e, i, n, o = [];
    for (i = 0, n = r.length; i < n; i++) e = r[i].length, e !== 0 && (o.push(r[i]), e > t && (t = e));
    if (o.length === 0) return new r[0].constructor(0);
    if (o.length === 1) return o[0].slice();
    if (o.length === 2) return Ko2(o[0], o[1]);
    r = o;
    var s = new r[0].constructor(), a3 = Pe2.getPointerArray(t), h = new a3(r.length), u = new $o2(function(p, f) {
      return p = r[p][h[p]], f = r[f][h[f]], p < f ? -1 : p > f ? 1 : 0;
    });
    for (i = 0; i < n; i++) u.push(i);
    for (var l, c; u.size; ) l = u.pop(), c = r[l][h[l]++], (s.length === 0 || s[s.length - 1] !== c) && s.push(c), h[l] < r[l].length && u.push(l);
    return s;
  }
  Yt.kWayIntersectionUniqueArrays = function(r) {
    var t = -1 / 0, e = -1 / 0, i = 1 / 0, n, o, s, a3, h;
    for (a3 = 0, h = r.length; a3 < h; a3++) {
      if (s = r[a3].length, s === 0) return [];
      s > t && (t = s), n = r[a3][0], o = r[a3][s - 1], n > e && (e = n), o < i && (i = o);
    }
    if (e > i) return [];
    if (e === i) return [e];
    var u, l, c = r[0], p, f, d, g, b, w, v = e;
    for (a3 = 1; a3 < h; a3++) {
      for (u = c, l = r[a3], c = new Array(), p = 0, f = se.lowerBound(l, v), d = u.length, g = l.length; p < d && f < g; ) b = u[p], w = l[f], b < w ? p = se.lowerBound(u, w, p + 1) : b > w ? f = se.lowerBound(l, b, f + 1) : (c.push(b), p++, f++);
      if (c.length === 0) return c;
      v = c[0];
    }
    return c;
  };
  Yt.merge = function() {
    if (arguments.length === 2) {
      if (we(arguments[0])) return Yo2(arguments[0], arguments[1]);
    } else if (we(arguments[0])) return wh2(arguments);
    return null;
  };
  Yt.unionUnique = function() {
    if (arguments.length === 2) {
      if (we(arguments[0])) return Ko2(arguments[0], arguments[1]);
    } else if (we(arguments[0])) return Th2(arguments);
    return null;
  };
  Yt.intersectionUnique = function() {
    if (arguments.length === 2) {
      if (we(arguments[0])) return Yt.intersectionUniqueArrays(arguments[0], arguments[1]);
    } else if (we(arguments[0])) return Yt.kWayIntersectionUniqueArrays(arguments);
    return null;
  };
});
var Zo2 = y((od, Qo2) => {
  var xh2 = j(), Sh2 = A(), Ch2 = Xo2();
  function Jo2(r) {
    return r;
  }
  function st(r) {
    if (this.clear(), Array.isArray(r) ? (this.documentTokenizer = r[0], this.queryTokenizer = r[1]) : (this.documentTokenizer = r, this.queryTokenizer = r), this.documentTokenizer || (this.documentTokenizer = Jo2), this.queryTokenizer || (this.queryTokenizer = Jo2), typeof this.documentTokenizer != "function") throw new Error("mnemonist/InvertedIndex.constructor: document tokenizer is not a function.");
    if (typeof this.queryTokenizer != "function") throw new Error("mnemonist/InvertedIndex.constructor: query tokenizer is not a function.");
  }
  st.prototype.clear = function() {
    this.items = [], this.mapping = /* @__PURE__ */ new Map(), this.size = 0, this.dimension = 0;
  };
  st.prototype.add = function(r) {
    this.size++;
    var t = this.items.length;
    this.items.push(r);
    var e = this.documentTokenizer(r);
    if (!Array.isArray(e)) throw new Error("mnemonist/InvertedIndex.add: tokenizer function should return an array of tokens.");
    for (var i = /* @__PURE__ */ new Set(), n, o, s = 0, a3 = e.length; s < a3; s++) n = e[s], !i.has(n) && (i.add(n), o = this.mapping.get(n), o || (o = [], this.mapping.set(n, o)), o.push(t));
    return this.dimension = this.mapping.size, this;
  };
  st.prototype.get = function(r) {
    if (!this.size) return [];
    var t = this.queryTokenizer(r);
    if (!Array.isArray(t)) throw new Error("mnemonist/InvertedIndex.query: tokenizer function should return an array of tokens.");
    if (!t.length) return [];
    var e = this.mapping.get(t[0]), i, n, o;
    if (typeof e == "undefined" || e.length === 0) return [];
    if (t.length > 1) for (n = 1, o = t.length; n < o; n++) {
      if (i = this.mapping.get(t[n]), typeof i == "undefined" || i.length === 0) return [];
      e = Ch2.intersectionUniqueArrays(e, i);
    }
    var s = new Array(e.length);
    for (n = 0, o = s.length; n < o; n++) s[n] = this.items[e[n]];
    return s;
  };
  st.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = 0, i = this.documents.length; e < i; e++) r.call(t, this.documents[e], e, this);
  };
  st.prototype.documents = function() {
    var r = this.items, t = r.length, e = 0;
    return new xh2(function() {
      if (e >= t) return { done: true };
      var i = r[e++];
      return { value: i, done: false };
    });
  };
  st.prototype.tokens = function() {
    return this.mapping.keys();
  };
  typeof Symbol != "undefined" && (st.prototype[Symbol.iterator] = st.prototype.documents);
  st.prototype.inspect = function() {
    var r = this.items.slice();
    return Object.defineProperty(r, "constructor", { value: st, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (st.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = st.prototype.inspect);
  st.from = function(r, t) {
    var e = new st(t);
    return Sh2(r, function(i) {
      e.add(i);
    }), e;
  };
  Qo2.exports = st;
});
var Ci2 = y((Si2) => {
  var $ = new Float64Array(64), R = new Float64Array(64);
  function Lh2(r, t, e) {
    var i, n, o, s, a3;
    for ($[0] = t, R[0] = e, n = 0; n >= 0; ) if (o = $[n], s = R[n] - 1, o < s) {
      for (i = r[o]; o < s; ) {
        for (; r[s] >= i && o < s; ) s--;
        for (o < s && (r[o++] = r[s]); r[o] <= i && o < s; ) o++;
        o < s && (r[s--] = r[o]);
      }
      r[o] = i, $[n + 1] = o + 1, R[n + 1] = R[n], R[n++] = o, R[n] - $[n] > R[n - 1] - $[n - 1] && (a3 = $[n], $[n] = $[n - 1], $[n - 1] = a3, a3 = R[n], R[n] = R[n - 1], R[n - 1] = a3);
    } else n--;
    return r;
  }
  Si2.inplaceQuickSort = Lh2;
  function Eh2(r, t, e, i) {
    var n, o, s, a3, h, u;
    for ($[0] = e, R[0] = i, o = 0; o >= 0; ) if (s = $[o], a3 = R[o] - 1, s < a3) {
      for (h = t[s], n = r[h]; s < a3; ) {
        for (; r[t[a3]] >= n && s < a3; ) a3--;
        for (s < a3 && (t[s++] = t[a3]); r[t[s]] <= n && s < a3; ) s++;
        s < a3 && (t[a3--] = t[s]);
      }
      t[s] = h, $[o + 1] = s + 1, R[o + 1] = R[o], R[o++] = s, R[o] - $[o] > R[o - 1] - $[o - 1] && (u = $[o], $[o] = $[o - 1], $[o - 1] = u, u = R[o], R[o] = R[o - 1], R[o - 1] = u);
    } else o--;
    return t;
  }
  Si2.inplaceQuickSortIndices = Eh2;
});
var ns = y((ad, is) => {
  var Oh2 = at(), Ir = ot(), ts = _e().createTupleComparator, es = Ar(), Ah = Ci2().inplaceQuickSortIndices;
  function Li2(r, t, e, i) {
    var n, o = 0, s;
    for (n = 0; n < r; n++) s = t[n][e] - i[n], o += s * s;
    return o;
  }
  function Dh2(r, t) {
    var e = t.length, i = new Array(r), n = new Array(e), o, s = Ir.getPointerArray(e), a3 = new s(e), h, u, l, c = true;
    for (h = 0; h < r; h++) {
      for (o = new Float64Array(e), u = 0; u < e; u++) l = t[u], o[u] = l[1][h], c && (n[u] = l[0], a3[u] = u);
      c = false, i[h] = o;
    }
    return { axes: i, ids: a3, labels: n };
  }
  function rs(r, t, e, i) {
    for (var n = i.length, o = Ir.getPointerArray(n + 1), s = new o(n), a3 = new o(n), h = new o(n), u = [[0, 0, e.length, -1, 0]], l, c, p, f, d, g, b, w, v = 0; u.length !== 0; ) l = u.pop(), w = l[0], g = l[1], b = l[2], c = l[3], p = l[4], Ah(t[w], e, g, b), n = b - g, f = g + (n >>> 1), d = e[f], s[v] = d, c > -1 && (p === 0 ? a3[c] = v + 1 : h[c] = v + 1), w = (w + 1) % r, f !== g && f !== b - 1 && u.push([w, f + 1, b, v, 1]), f !== g && u.push([w, g, f, v, 0]), v++;
    return { axes: t, labels: i, pivots: s, lefts: a3, rights: h };
  }
  function yt(r, t) {
    this.dimensions = r, this.visited = 0, this.axes = t.axes, this.labels = t.labels, this.pivots = t.pivots, this.lefts = t.lefts, this.rights = t.rights, this.size = this.labels.length;
  }
  yt.prototype.nearestNeighbor = function(r) {
    var t = 1 / 0, e = null, i = this.dimensions, n = this.axes, o = this.pivots, s = this.lefts, a3 = this.rights, h = 0;
    function u(l, c) {
      h++;
      var p = s[c], f = a3[c], d = o[c], g = Li2(i, n, d, r);
      if (!(g < t && (e = d, t = g, g === 0))) {
        var b = n[l][d] - r[l];
        l = (l + 1) % i, b > 0 ? p !== 0 && u(l, p - 1) : f !== 0 && u(l, f - 1), b * b < t && (b > 0 ? f !== 0 && u(l, f - 1) : p !== 0 && u(l, p - 1));
      }
    }
    return u(0, 0), this.visited = h, this.labels[e];
  };
  var Ih = ts(3), Mh = ts(2);
  yt.prototype.kNearestNeighbors = function(r, t) {
    if (r <= 0) throw new Error("mnemonist/kd-tree.kNearestNeighbors: k should be a positive number.");
    if (r = Math.min(r, this.size), r === 1) return [this.nearestNeighbor(t)];
    var e = new es(Array, Ih, r), i = this.dimensions, n = this.axes, o = this.pivots, s = this.lefts, a3 = this.rights, h = 0;
    function u(p, f) {
      var d = s[f], g = a3[f], b = o[f], w = Li2(i, n, b, t);
      e.push([w, h++, b]);
      var v = t[p], F = n[p][b], U = v - F;
      p = (p + 1) % i, v < F ? d !== 0 && u(p, d - 1) : g !== 0 && u(p, g - 1), (U * U < e.peek()[0] || e.size < r) && (v < F ? g !== 0 && u(p, g - 1) : d !== 0 && u(p, d - 1));
    }
    u(0, 0), this.visited = h;
    for (var l = e.consume(), c = 0; c < l.length; c++) l[c] = this.labels[l[c][2]];
    return l;
  };
  yt.prototype.linearKNearestNeighbors = function(r, t) {
    if (r <= 0) throw new Error("mnemonist/kd-tree.kNearestNeighbors: k should be a positive number.");
    r = Math.min(r, this.size);
    var e = new es(Array, Mh, r), i, n, o;
    for (i = 0, n = this.size; i < n; i++) o = Li2(this.dimensions, this.axes, this.pivots[i], t), e.push([o, i]);
    var s = e.consume();
    for (i = 0; i < s.length; i++) s[i] = this.labels[this.pivots[s[i][1]]];
    return s;
  };
  yt.prototype.inspect = function() {
    var r = /* @__PURE__ */ new Map();
    r.dimensions = this.dimensions, Object.defineProperty(r, "constructor", { value: yt, enumerable: false });
    var t, e, i;
    for (t = 0; t < this.size; t++) {
      for (i = new Array(this.dimensions), e = 0; e < this.dimensions; e++) i[e] = this.axes[e][t];
      r.set(this.labels[t], i);
    }
    return r;
  };
  typeof Symbol != "undefined" && (yt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = yt.prototype.inspect);
  yt.from = function(r, t) {
    var e = Oh2.toArray(r), i = Dh2(t, e), n = rs(t, i.axes, i.ids, i.labels);
    return new yt(t, n);
  };
  yt.fromAxes = function(r, t) {
    t || (t = Ir.indices(r[0].length));
    var e = r.length, i = rs(r.length, r, Ir.indices(t.length), t);
    return new yt(e, i);
  };
  is.exports = yt;
});
var as = y((hd, ss) => {
  var os = j(), Rh = A();
  function I() {
    this.clear();
  }
  I.prototype.clear = function() {
    this.head = null, this.tail = null, this.size = 0;
  };
  I.prototype.first = function() {
    return this.head ? this.head.item : void 0;
  };
  I.prototype.peek = I.prototype.first;
  I.prototype.last = function() {
    return this.tail ? this.tail.item : void 0;
  };
  I.prototype.push = function(r) {
    var t = { item: r, next: null };
    return this.head ? (this.tail.next = t, this.tail = t) : (this.head = t, this.tail = t), this.size++, this.size;
  };
  I.prototype.unshift = function(r) {
    var t = { item: r, next: null };
    return this.head ? (this.head.next || (this.tail = this.head), t.next = this.head, this.head = t) : (this.head = t, this.tail = t), this.size++, this.size;
  };
  I.prototype.shift = function() {
    if (this.size) {
      var r = this.head;
      return this.head = r.next, this.size--, r.item;
    }
  };
  I.prototype.forEach = function(r, t) {
    if (this.size) {
      t = arguments.length > 1 ? t : this;
      for (var e = this.head, i = 0; e; ) r.call(t, e.item, i, this), e = e.next, i++;
    }
  };
  I.prototype.toArray = function() {
    if (!this.size) return [];
    for (var r = new Array(this.size), t = 0, e = this.size, i = this.head; t < e; t++) r[t] = i.item, i = i.next;
    return r;
  };
  I.prototype.values = function() {
    var r = this.head;
    return new os(function() {
      if (!r) return { done: true };
      var t = r.item;
      return r = r.next, { value: t, done: false };
    });
  };
  I.prototype.entries = function() {
    var r = this.head, t = 0;
    return new os(function() {
      if (!r) return { done: true };
      var e = r.item;
      return r = r.next, t++, { value: [t - 1, e], done: false };
    });
  };
  typeof Symbol != "undefined" && (I.prototype[Symbol.iterator] = I.prototype.values);
  I.prototype.toString = function() {
    return this.toArray().join(",");
  };
  I.prototype.toJSON = function() {
    return this.toArray();
  };
  I.prototype.inspect = function() {
    var r = this.toArray();
    return Object.defineProperty(r, "constructor", { value: I, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (I.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = I.prototype.inspect);
  I.from = function(r) {
    var t = new I();
    return Rh(r, function(e) {
      t.push(e);
    }), t;
  };
  ss.exports = I;
});
var Mr = y((ud, hs) => {
  var Ei2 = j(), Fh = A(), kh = ot(), _h2 = at();
  function H(r, t, e) {
    if (arguments.length < 2 && (e = r, r = null, t = null), this.capacity = e, typeof this.capacity != "number" || this.capacity <= 0) throw new Error("mnemonist/lru-cache: capacity should be positive number.");
    if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity) throw new Error("mnemonist/lru-cache: capacity should be a finite positive integer.");
    var i = kh.getPointerArray(e);
    this.forward = new i(e), this.backward = new i(e), this.K = typeof r == "function" ? new r(e) : new Array(e), this.V = typeof t == "function" ? new t(e) : new Array(e), this.size = 0, this.head = 0, this.tail = 0, this.items = {};
  }
  H.prototype.clear = function() {
    this.size = 0, this.head = 0, this.tail = 0, this.items = {};
  };
  H.prototype.splayOnTop = function(r) {
    var t = this.head;
    if (this.head === r) return this;
    var e = this.backward[r], i = this.forward[r];
    return this.tail === r ? this.tail = e : this.backward[i] = e, this.forward[e] = i, this.backward[t] = r, this.head = r, this.forward[r] = t, this;
  };
  H.prototype.set = function(r, t) {
    var e = this.items[r];
    if (typeof e != "undefined") {
      this.splayOnTop(e), this.V[e] = t;
      return;
    }
    this.size < this.capacity ? e = this.size++ : (e = this.tail, this.tail = this.backward[e], delete this.items[this.K[e]]), this.items[r] = e, this.K[e] = r, this.V[e] = t, this.forward[e] = this.head, this.backward[this.head] = e, this.head = e;
  };
  H.prototype.setpop = function(r, t) {
    var e = null, i = null, n = this.items[r];
    return typeof n != "undefined" ? (this.splayOnTop(n), e = this.V[n], this.V[n] = t, { evicted: false, key: r, value: e }) : (this.size < this.capacity ? n = this.size++ : (n = this.tail, this.tail = this.backward[n], e = this.V[n], i = this.K[n], delete this.items[this.K[n]]), this.items[r] = n, this.K[n] = r, this.V[n] = t, this.forward[n] = this.head, this.backward[this.head] = n, this.head = n, i ? { evicted: true, key: i, value: e } : null);
  };
  H.prototype.has = function(r) {
    return r in this.items;
  };
  H.prototype.get = function(r) {
    var t = this.items[r];
    if (typeof t != "undefined") return this.splayOnTop(t), this.V[t];
  };
  H.prototype.peek = function(r) {
    var t = this.items[r];
    if (typeof t != "undefined") return this.V[t];
  };
  H.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = 0, i = this.size, n = this.head, o = this.K, s = this.V, a3 = this.forward; e < i; ) r.call(t, s[n], o[n], this), n = a3[n], e++;
  };
  H.prototype.keys = function() {
    var r = 0, t = this.size, e = this.head, i = this.K, n = this.forward;
    return new Ei2(function() {
      if (r >= t) return { done: true };
      var o = i[e];
      return r++, r < t && (e = n[e]), { done: false, value: o };
    });
  };
  H.prototype.values = function() {
    var r = 0, t = this.size, e = this.head, i = this.V, n = this.forward;
    return new Ei2(function() {
      if (r >= t) return { done: true };
      var o = i[e];
      return r++, r < t && (e = n[e]), { done: false, value: o };
    });
  };
  H.prototype.entries = function() {
    var r = 0, t = this.size, e = this.head, i = this.K, n = this.V, o = this.forward;
    return new Ei2(function() {
      if (r >= t) return { done: true };
      var s = i[e], a3 = n[e];
      return r++, r < t && (e = o[e]), { done: false, value: [s, a3] };
    });
  };
  typeof Symbol != "undefined" && (H.prototype[Symbol.iterator] = H.prototype.entries);
  H.prototype.inspect = function() {
    for (var r = /* @__PURE__ */ new Map(), t = this.entries(), e; e = t.next(), !e.done; ) r.set(e.value[0], e.value[1]);
    return Object.defineProperty(r, "constructor", { value: H, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (H.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = H.prototype.inspect);
  H.from = function(r, t, e, i) {
    if (arguments.length < 2) {
      if (i = _h2.guessLength(r), typeof i != "number") throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
    } else arguments.length === 2 && (i = t, t = null, e = null);
    var n = new H(t, e, i);
    return Fh(r, function(o, s) {
      n.set(s, o);
    }), n;
  };
  hs.exports = H;
});
var ls = y((ld, us) => {
  var Te2 = Mr(), zh = A(), Vh = ot(), Hh = at();
  function _t(r, t, e) {
    arguments.length < 2 ? Te2.call(this, r) : Te2.call(this, r, t, e);
    var i = Vh.getPointerArray(this.capacity);
    this.deleted = new i(this.capacity), this.deletedSize = 0;
  }
  for (Oi in Te2.prototype) _t.prototype[Oi] = Te2.prototype[Oi];
  var Oi;
  typeof Symbol != "undefined" && (_t.prototype[Symbol.iterator] = Te2.prototype[Symbol.iterator]);
  _t.prototype.clear = function() {
    Te2.prototype.clear.call(this), this.deletedSize = 0;
  };
  _t.prototype.set = function(r, t) {
    var e = this.items[r];
    if (typeof e != "undefined") {
      this.splayOnTop(e), this.V[e] = t;
      return;
    }
    this.size < this.capacity ? (this.deletedSize > 0 ? e = this.deleted[--this.deletedSize] : e = this.size, this.size++) : (e = this.tail, this.tail = this.backward[e], delete this.items[this.K[e]]), this.items[r] = e, this.K[e] = r, this.V[e] = t, this.forward[e] = this.head, this.backward[this.head] = e, this.head = e;
  };
  _t.prototype.setpop = function(r, t) {
    var e = null, i = null, n = this.items[r];
    return typeof n != "undefined" ? (this.splayOnTop(n), e = this.V[n], this.V[n] = t, { evicted: false, key: r, value: e }) : (this.size < this.capacity ? (this.deletedSize > 0 ? n = this.deleted[--this.deletedSize] : n = this.size, this.size++) : (n = this.tail, this.tail = this.backward[n], e = this.V[n], i = this.K[n], delete this.items[this.K[n]]), this.items[r] = n, this.K[n] = r, this.V[n] = t, this.forward[n] = this.head, this.backward[this.head] = n, this.head = n, i ? { evicted: true, key: i, value: e } : null);
  };
  _t.prototype.delete = function(r) {
    var t = this.items[r];
    if (typeof t == "undefined") return false;
    if (delete this.items[r], this.size === 1) return this.size = 0, this.head = 0, this.tail = 0, this.deletedSize = 0, true;
    var e = this.backward[t], i = this.forward[t];
    return this.head === t && (this.head = i), this.tail === t && (this.tail = e), this.forward[e] = i, this.backward[i] = e, this.size--, this.deleted[this.deletedSize++] = t, true;
  };
  _t.prototype.remove = function(r, t = void 0) {
    var e = this.items[r];
    if (typeof e == "undefined") return t;
    var i = this.V[e];
    if (delete this.items[r], this.size === 1) return this.size = 0, this.head = 0, this.tail = 0, this.deletedSize = 0, i;
    var n = this.backward[e], o = this.forward[e];
    return this.head === e && (this.head = o), this.tail === e && (this.tail = n), this.forward[n] = o, this.backward[o] = n, this.size--, this.deleted[this.deletedSize++] = e, i;
  };
  _t.from = function(r, t, e, i) {
    if (arguments.length < 2) {
      if (i = Hh.guessLength(r), typeof i != "number") throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
    } else arguments.length === 2 && (i = t, t = null, e = null);
    var n = new _t(t, e, i);
    return zh(r, function(o, s) {
      n.set(s, o);
    }), n;
  };
  us.exports = _t;
});
var Ai2 = y((cd, cs) => {
  var xe2 = Mr(), Uh = A(), Gh = ot(), Nh = at();
  function Q(r, t, e) {
    if (arguments.length < 2 && (e = r, r = null, t = null), this.capacity = e, typeof this.capacity != "number" || this.capacity <= 0) throw new Error("mnemonist/lru-map: capacity should be positive number.");
    if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity) throw new Error("mnemonist/lru-map: capacity should be a finite positive integer.");
    var i = Gh.getPointerArray(e);
    this.forward = new i(e), this.backward = new i(e), this.K = typeof r == "function" ? new r(e) : new Array(e), this.V = typeof t == "function" ? new t(e) : new Array(e), this.size = 0, this.head = 0, this.tail = 0, this.items = /* @__PURE__ */ new Map();
  }
  Q.prototype.clear = function() {
    this.size = 0, this.head = 0, this.tail = 0, this.items.clear();
  };
  Q.prototype.set = function(r, t) {
    var e = this.items.get(r);
    if (typeof e != "undefined") {
      this.splayOnTop(e), this.V[e] = t;
      return;
    }
    this.size < this.capacity ? e = this.size++ : (e = this.tail, this.tail = this.backward[e], this.items.delete(this.K[e])), this.items.set(r, e), this.K[e] = r, this.V[e] = t, this.forward[e] = this.head, this.backward[this.head] = e, this.head = e;
  };
  Q.prototype.setpop = function(r, t) {
    var e = null, i = null, n = this.items.get(r);
    return typeof n != "undefined" ? (this.splayOnTop(n), e = this.V[n], this.V[n] = t, { evicted: false, key: r, value: e }) : (this.size < this.capacity ? n = this.size++ : (n = this.tail, this.tail = this.backward[n], e = this.V[n], i = this.K[n], this.items.delete(this.K[n])), this.items.set(r, n), this.K[n] = r, this.V[n] = t, this.forward[n] = this.head, this.backward[this.head] = n, this.head = n, i ? { evicted: true, key: i, value: e } : null);
  };
  Q.prototype.has = function(r) {
    return this.items.has(r);
  };
  Q.prototype.get = function(r) {
    var t = this.items.get(r);
    if (typeof t != "undefined") return this.splayOnTop(t), this.V[t];
  };
  Q.prototype.peek = function(r) {
    var t = this.items.get(r);
    if (typeof t != "undefined") return this.V[t];
  };
  Q.prototype.splayOnTop = xe2.prototype.splayOnTop;
  Q.prototype.forEach = xe2.prototype.forEach;
  Q.prototype.keys = xe2.prototype.keys;
  Q.prototype.values = xe2.prototype.values;
  Q.prototype.entries = xe2.prototype.entries;
  typeof Symbol != "undefined" && (Q.prototype[Symbol.iterator] = Q.prototype.entries);
  Q.prototype.inspect = xe2.prototype.inspect;
  Q.from = function(r, t, e, i) {
    if (arguments.length < 2) {
      if (i = Nh.guessLength(r), typeof i != "number") throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
    } else arguments.length === 2 && (i = t, t = null, e = null);
    var n = new Q(t, e, i);
    return Uh(r, function(o, s) {
      n.set(s, o);
    }), n;
  };
  cs.exports = Q;
});
var fs = y((pd, ps) => {
  var Se = Ai2(), Bh = A(), Wh = ot(), qh = at();
  function zt2(r, t, e) {
    arguments.length < 2 ? Se.call(this, r) : Se.call(this, r, t, e);
    var i = Wh.getPointerArray(this.capacity);
    this.deleted = new i(this.capacity), this.deletedSize = 0;
  }
  for (Di in Se.prototype) zt2.prototype[Di] = Se.prototype[Di];
  var Di;
  typeof Symbol != "undefined" && (zt2.prototype[Symbol.iterator] = Se.prototype[Symbol.iterator]);
  zt2.prototype.clear = function() {
    Se.prototype.clear.call(this), this.deletedSize = 0;
  };
  zt2.prototype.set = function(r, t) {
    var e = this.items.get(r);
    if (typeof e != "undefined") {
      this.splayOnTop(e), this.V[e] = t;
      return;
    }
    this.size < this.capacity ? (this.deletedSize > 0 ? e = this.deleted[--this.deletedSize] : e = this.size, this.size++) : (e = this.tail, this.tail = this.backward[e], this.items.delete(this.K[e])), this.items.set(r, e), this.K[e] = r, this.V[e] = t, this.forward[e] = this.head, this.backward[this.head] = e, this.head = e;
  };
  zt2.prototype.setpop = function(r, t) {
    var e = null, i = null, n = this.items.get(r);
    return typeof n != "undefined" ? (this.splayOnTop(n), e = this.V[n], this.V[n] = t, { evicted: false, key: r, value: e }) : (this.size < this.capacity ? (this.deletedSize > 0 ? n = this.deleted[--this.deletedSize] : n = this.size, this.size++) : (n = this.tail, this.tail = this.backward[n], e = this.V[n], i = this.K[n], this.items.delete(this.K[n])), this.items.set(r, n), this.K[n] = r, this.V[n] = t, this.forward[n] = this.head, this.backward[this.head] = n, this.head = n, i ? { evicted: true, key: i, value: e } : null);
  };
  zt2.prototype.delete = function(r) {
    var t = this.items.get(r);
    if (typeof t == "undefined") return false;
    if (this.items.delete(r), this.size === 1) return this.size = 0, this.head = 0, this.tail = 0, this.deletedSize = 0, true;
    var e = this.backward[t], i = this.forward[t];
    return this.head === t && (this.head = i), this.tail === t && (this.tail = e), this.forward[e] = i, this.backward[i] = e, this.size--, this.deleted[this.deletedSize++] = t, true;
  };
  zt2.prototype.remove = function(r, t = void 0) {
    var e = this.items.get(r);
    if (typeof e == "undefined") return t;
    var i = this.V[e];
    if (this.items.delete(r), this.size === 1) return this.size = 0, this.head = 0, this.tail = 0, this.deletedSize = 0, i;
    var n = this.backward[e], o = this.forward[e];
    return this.head === e && (this.head = o), this.tail === e && (this.tail = n), this.forward[n] = o, this.backward[o] = n, this.size--, this.deleted[this.deletedSize++] = e, i;
  };
  zt2.from = function(r, t, e, i) {
    if (arguments.length < 2) {
      if (i = qh.guessLength(r), typeof i != "number") throw new Error("mnemonist/lru-map.from: could not guess iterable length. Please provide desired capacity as last argument.");
    } else arguments.length === 2 && (i = t, t = null, e = null);
    var n = new zt2(t, e, i);
    return Bh(r, function(o, s) {
      n.set(s, o);
    }), n;
  };
  ps.exports = zt2;
});
var ds = y((fd, ms) => {
  var jh = j(), $h = A(), Yh = Ar(), Kh = function(r, t) {
    return r[1] > t[1] ? -1 : r[1] < t[1] ? 1 : 0;
  };
  function S() {
    this.items = /* @__PURE__ */ new Map(), Object.defineProperty(this.items, "constructor", { value: S, enumerable: false }), this.clear();
  }
  S.prototype.clear = function() {
    this.size = 0, this.dimension = 0, this.items.clear();
  };
  S.prototype.add = function(r, t) {
    if (t === 0) return this;
    if (t < 0) return this.remove(r, -t);
    if (t = t || 1, typeof t != "number") throw new Error("mnemonist/multi-set.add: given count should be a number.");
    this.size += t;
    let e = this.items.get(r);
    return e === void 0 ? this.dimension++ : t += e, this.items.set(r, t), this;
  };
  S.prototype.set = function(r, t) {
    var e;
    if (typeof t != "number") throw new Error("mnemonist/multi-set.set: given count should be a number.");
    return t <= 0 ? (e = this.items.get(r), typeof e != "undefined" && (this.size -= e, this.dimension--), this.items.delete(r), this) : (t = t || 1, e = this.items.get(r), typeof e == "number" ? this.items.set(r, e + t) : (this.dimension++, this.items.set(r, t)), this.size += t, this);
  };
  S.prototype.has = function(r) {
    return this.items.has(r);
  };
  S.prototype.delete = function(r) {
    var t = this.items.get(r);
    return t === 0 ? false : (this.size -= t, this.dimension--, this.items.delete(r), true);
  };
  S.prototype.remove = function(r, t) {
    if (t !== 0) {
      if (t < 0) return this.add(r, -t);
      if (t = t || 1, typeof t != "number") throw new Error("mnemonist/multi-set.remove: given count should be a number.");
      var e = this.items.get(r);
      if (typeof e != "undefined") {
        var i = Math.max(0, e - t);
        i === 0 ? (this.items.delete(r), this.size -= e, this.dimension--) : (this.items.set(r, i), this.size -= t);
      }
    }
  };
  S.prototype.edit = function(r, t) {
    var e = this.multiplicity(r);
    if (e !== 0) {
      var i = this.multiplicity(t);
      return this.items.set(t, e + i), this.items.delete(r), this;
    }
  };
  S.prototype.multiplicity = function(r) {
    var t = this.items.get(r);
    return typeof t == "undefined" ? 0 : t;
  };
  S.prototype.get = S.prototype.multiplicity;
  S.prototype.count = S.prototype.multiplicity;
  S.prototype.frequency = function(r) {
    if (this.size === 0) return 0;
    var t = this.multiplicity(r);
    return t / this.size;
  };
  S.prototype.top = function(r) {
    if (typeof r != "number" || r <= 0) throw new Error("mnemonist/multi-set.top: n must be a number > 0.");
    for (var t = new Yh(Array, Kh, r), e = this.items.entries(), i; i = e.next(), !i.done; ) t.push(i.value);
    return t.consume();
  };
  S.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    var e;
    this.items.forEach(function(i, n) {
      for (e = 0; e < i; e++) r.call(t, n, n);
    });
  };
  S.prototype.forEachMultiplicity = function(r, t) {
    t = arguments.length > 1 ? t : this, this.items.forEach(r, t);
  };
  S.prototype.keys = function() {
    return this.items.keys();
  };
  S.prototype.values = function() {
    var r = this.items.entries(), t = false, e, i, n, o;
    return new jh(function s() {
      if (!t) {
        if (e = r.next(), e.done) return { done: true };
        t = true, i = e.value[0], n = e.value[1], o = 0;
      }
      return o >= n ? (t = false, s()) : (o++, { done: false, value: i });
    });
  };
  S.prototype.multiplicities = function() {
    return this.items.entries();
  };
  typeof Symbol != "undefined" && (S.prototype[Symbol.iterator] = S.prototype.values);
  S.prototype.inspect = function() {
    return this.items;
  };
  typeof Symbol != "undefined" && (S.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = S.prototype.inspect);
  S.prototype.toJSON = function() {
    return this.items;
  };
  S.from = function(r) {
    var t = new S();
    return $h(r, function(e) {
      t.add(e);
    }), t;
  };
  S.isSubset = function(r, t) {
    var e = r.multiplicities(), i, n, o;
    if (r === t) return true;
    if (r.dimension > t.dimension) return false;
    for (; i = e.next(), !i.done; ) if (n = i.value[0], o = i.value[1], t.multiplicity(n) < o) return false;
    return true;
  };
  S.isSuperset = function(r, t) {
    return S.isSubset(t, r);
  };
  ms.exports = S;
});
var ws = y((md, Ps) => {
  var Xh = j(), Jh = A();
  function Qh(r, t, e) {
    return ((Math.pow(r, 2) - Math.pow(Math.abs(t - e), 2)) / 2 | 0) + r + 1;
  }
  function Zh(r, t) {
    for (var e = 0, i = 0, n = t + 1; i < n; i++) e += Qh(r, t, i);
    return e;
  }
  function tu(r, t) {
    return r.length > t.length ? -1 : r.length < t.length ? 1 : r < t ? -1 : r > t ? 1 : 0;
  }
  function gs(r, t) {
    var e = r + 1, i = t / e | 0, n = i + 1, o, s, a3 = t - i * e, h = e - a3, u = new Array(r + 1);
    for (o = 0; o < h; o++) u[o] = [o * i, i];
    var l = (o - 1) * i + i;
    for (s = 0; s < a3; s++) u[o + s] = [l + s * n, n];
    return u;
  }
  function ys(r, t) {
    var e = t.length, i = r + 1, n = e / i | 0, o = n + 1, s, a3, h, u = e - n * i, l = i - u, c = new Array(r + 1);
    for (a3 = 0; a3 < l; a3++) s = a3 * n, c[a3] = t.slice(s, s + n);
    var p = (a3 - 1) * n + n;
    for (h = 0; h < u; h++) s = p + h * o, c[a3 + h] = t.slice(s, s + o);
    return c;
  }
  function eu(r, t, e) {
    if (t === 0) return 0;
    var i = e.length, n = r + 1, o = i / n | 0, s = o + 1, a3 = i - o * n, h = n - a3;
    if (t <= h - 1) return t * o;
    var u = t - h;
    return h * o + u * s;
  }
  function vs(r, t, e, i, n, o) {
    var s = n - e, a3 = n + e, h = r - e, u = n + t - h, l = n + t + h, c = i - o;
    return [Math.max(0, s, u), Math.min(a3, l, c)];
  }
  function bs(r, t, e, i, n, o) {
    var s = t.length, a3 = s - e, h = vs(r, a3, i, s, n, o), u = h[0], l = h[1], c = "", p = [], f, d, g;
    for (d = u, g = l + 1; d < g; d++) f = t.slice(d, d + o), f !== c && (p.push(f), c = f);
    return p;
  }
  function _(r, t) {
    if (typeof r != "function") throw new Error("mnemonist/passjoin-index: `levenshtein` should be a function returning edit distance between two strings.");
    if (typeof t != "number" || t < 1) throw new Error("mnemonist/passjoin-index: `k` should be a number > 0");
    this.levenshtein = r, this.k = t, this.clear();
  }
  _.prototype.clear = function() {
    this.size = 0, this.strings = [], this.invertedIndices = {};
  };
  _.prototype.add = function(r) {
    var t = r.length, e = this.size;
    this.strings.push(r), this.size++;
    var i = ys(this.k, r), n = this.invertedIndices[t];
    typeof n == "undefined" && (n = {}, this.invertedIndices[t] = n);
    var o, s, a3, h, u;
    for (h = 0, u = i.length; h < u; h++) o = i[h], a3 = o + h, s = n[a3], typeof s == "undefined" ? (s = [e], n[a3] = s) : s.push(e);
    return this;
  };
  _.prototype.search = function(r) {
    var t = r.length, e = this.k, i = /* @__PURE__ */ new Set(), n, o, s, a3, h, u, l, c, p, f, d, g, b, w, v;
    for (c = Math.max(0, t - e), p = t + e + 1; c < p; c++) {
      var F = this.invertedIndices[c];
      if (typeof F != "undefined") {
        for (l = gs(e, c), f = 0, d = l.length; f < d; f++) for (s = l[f][0], a3 = l[f][1], u = bs(e, r, c, f, s, a3), u.length || (u = [""]), g = 0, b = u.length; g < b; g++) if (h = u[g] + f, n = F[h], typeof n != "undefined") for (w = 0, v = n.length; w < v; w++) o = this.strings[n[w]], (t <= e && c <= e || !i.has(o) && this.levenshtein(r, o) <= e) && i.add(o);
      }
    }
    return i;
  };
  _.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = 0, i = this.strings.length; e < i; e++) r.call(t, this.strings[e], e, this);
  };
  _.prototype.values = function() {
    var r = this.strings, t = r.length, e = 0;
    return new Xh(function() {
      if (e >= t) return { done: true };
      var i = r[e];
      return e++, { value: i, done: false };
    });
  };
  typeof Symbol != "undefined" && (_.prototype[Symbol.iterator] = _.prototype.values);
  _.prototype.inspect = function() {
    var r = this.strings.slice();
    return Object.defineProperty(r, "constructor", { value: _, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (_.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = _.prototype.inspect);
  _.from = function(r, t, e) {
    var i = new _(t, e);
    return Jh(r, function(n) {
      i.add(n);
    }), i;
  };
  _.countKeys = Zh;
  _.comparator = tu;
  _.partition = gs;
  _.segments = ys;
  _.segmentPos = eu;
  _.multiMatchAwareInterval = vs;
  _.multiMatchAwareSubstrings = bs;
  Ps.exports = _;
});
var Ss = y((dd, xs) => {
  var Ts = j(), ru = A();
  function z() {
    this.clear();
  }
  z.prototype.clear = function() {
    this.items = [], this.offset = 0, this.size = 0;
  };
  z.prototype.enqueue = function(r) {
    return this.items.push(r), ++this.size;
  };
  z.prototype.dequeue = function() {
    if (this.size) {
      var r = this.items[this.offset];
      return ++this.offset * 2 >= this.items.length && (this.items = this.items.slice(this.offset), this.offset = 0), this.size--, r;
    }
  };
  z.prototype.peek = function() {
    if (this.size) return this.items[this.offset];
  };
  z.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = this.offset, i = 0, n = this.items.length; e < n; e++, i++) r.call(t, this.items[e], i, this);
  };
  z.prototype.toArray = function() {
    return this.items.slice(this.offset);
  };
  z.prototype.values = function() {
    var r = this.items, t = this.offset;
    return new Ts(function() {
      if (t >= r.length) return { done: true };
      var e = r[t];
      return t++, { value: e, done: false };
    });
  };
  z.prototype.entries = function() {
    var r = this.items, t = this.offset, e = 0;
    return new Ts(function() {
      if (t >= r.length) return { done: true };
      var i = r[t];
      return t++, { value: [e++, i], done: false };
    });
  };
  typeof Symbol != "undefined" && (z.prototype[Symbol.iterator] = z.prototype.values);
  z.prototype.toString = function() {
    return this.toArray().join(",");
  };
  z.prototype.toJSON = function() {
    return this.toArray();
  };
  z.prototype.inspect = function() {
    var r = this.toArray();
    return Object.defineProperty(r, "constructor", { value: z, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (z.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = z.prototype.inspect);
  z.from = function(r) {
    var t = new z();
    return ru(r, function(e) {
      t.enqueue(e);
    }), t;
  };
  z.of = function() {
    return z.from(arguments);
  };
  xs.exports = z;
});
var Es = y((gd, Ls) => {
  var Cs = j(), iu = A();
  function V2() {
    this.clear();
  }
  V2.prototype.clear = function() {
    this.items = [], this.size = 0;
  };
  V2.prototype.push = function(r) {
    return this.items.push(r), ++this.size;
  };
  V2.prototype.pop = function() {
    if (this.size !== 0) return this.size--, this.items.pop();
  };
  V2.prototype.peek = function() {
    return this.items[this.size - 1];
  };
  V2.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = 0, i = this.items.length; e < i; e++) r.call(t, this.items[i - e - 1], e, this);
  };
  V2.prototype.toArray = function() {
    for (var r = new Array(this.size), t = this.size - 1, e = this.size; e--; ) r[e] = this.items[t - e];
    return r;
  };
  V2.prototype.values = function() {
    var r = this.items, t = r.length, e = 0;
    return new Cs(function() {
      if (e >= t) return { done: true };
      var i = r[t - e - 1];
      return e++, { value: i, done: false };
    });
  };
  V2.prototype.entries = function() {
    var r = this.items, t = r.length, e = 0;
    return new Cs(function() {
      if (e >= t) return { done: true };
      var i = r[t - e - 1];
      return { value: [e++, i], done: false };
    });
  };
  typeof Symbol != "undefined" && (V2.prototype[Symbol.iterator] = V2.prototype.values);
  V2.prototype.toString = function() {
    return this.toArray().join(",");
  };
  V2.prototype.toJSON = function() {
    return this.toArray();
  };
  V2.prototype.inspect = function() {
    var r = this.toArray();
    return Object.defineProperty(r, "constructor", { value: V2, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (V2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = V2.prototype.inspect);
  V2.from = function(r) {
    var t = new V2();
    return iu(r, function(e) {
      t.push(e);
    }), t;
  };
  V2.of = function() {
    return V2.from(arguments);
  };
  Ls.exports = V2;
});
var Os = y((B) => {
  B.intersection = function() {
    if (arguments.length < 2) throw new Error("mnemonist/Set.intersection: needs at least two arguments.");
    var r = /* @__PURE__ */ new Set(), t = 1 / 0, e = null, i, n, o = arguments.length;
    for (n = 0; n < o; n++) {
      if (i = arguments[n], i.size === 0) return r;
      i.size < t && (t = i.size, e = i);
    }
    for (var s = e.values(), a3, h, u, l; a3 = s.next(), !a3.done; ) {
      for (h = a3.value, u = true, n = 0; n < o; n++) if (l = arguments[n], l !== e && !l.has(h)) {
        u = false;
        break;
      }
      u && r.add(h);
    }
    return r;
  };
  B.union = function() {
    if (arguments.length < 2) throw new Error("mnemonist/Set.union: needs at least two arguments.");
    var r = /* @__PURE__ */ new Set(), t, e = arguments.length, i, n;
    for (t = 0; t < e; t++) for (i = arguments[t].values(); n = i.next(), !n.done; ) r.add(n.value);
    return r;
  };
  B.difference = function(r, t) {
    if (!r.size) return /* @__PURE__ */ new Set();
    if (!t.size) return new Set(r);
    for (var e = /* @__PURE__ */ new Set(), i = r.values(), n; n = i.next(), !n.done; ) t.has(n.value) || e.add(n.value);
    return e;
  };
  B.symmetricDifference = function(r, t) {
    for (var e = /* @__PURE__ */ new Set(), i = r.values(), n; n = i.next(), !n.done; ) t.has(n.value) || e.add(n.value);
    for (i = t.values(); n = i.next(), !n.done; ) r.has(n.value) || e.add(n.value);
    return e;
  };
  B.isSubset = function(r, t) {
    var e = r.values(), i;
    if (r === t) return true;
    if (r.size > t.size) return false;
    for (; i = e.next(), !i.done; ) if (!t.has(i.value)) return false;
    return true;
  };
  B.isSuperset = function(r, t) {
    return B.isSubset(t, r);
  };
  B.add = function(r, t) {
    for (var e = t.values(), i; i = e.next(), !i.done; ) r.add(i.value);
  };
  B.subtract = function(r, t) {
    for (var e = t.values(), i; i = e.next(), !i.done; ) r.delete(i.value);
  };
  B.intersect = function(r, t) {
    for (var e = r.values(), i; i = e.next(), !i.done; ) t.has(i.value) || r.delete(i.value);
  };
  B.disjunct = function(r, t) {
    for (var e = r.values(), i, n = []; i = e.next(), !i.done; ) t.has(i.value) && n.push(i.value);
    for (e = t.values(); i = e.next(), !i.done; ) r.has(i.value) || r.add(i.value);
    for (var o = 0, s = n.length; o < s; o++) r.delete(n[o]);
  };
  B.intersectionSize = function(r, t) {
    var e;
    if (r.size > t.size && (e = r, r = t, t = e), r.size === 0) return 0;
    if (r === t) return r.size;
    for (var i = r.values(), n, o = 0; n = i.next(), !n.done; ) t.has(n.value) && o++;
    return o;
  };
  B.unionSize = function(r, t) {
    var e = B.intersectionSize(r, t);
    return r.size + t.size - e;
  };
  B.jaccard = function(r, t) {
    var e = B.intersectionSize(r, t);
    if (e === 0) return 0;
    var i = r.size + t.size - e;
    return e / i;
  };
  B.overlap = function(r, t) {
    var e = B.intersectionSize(r, t);
    return e === 0 ? 0 : e / Math.min(r.size, t.size);
  };
});
var Ds = y((vd, As) => {
  var nu = j(), ou = ot().getPointerArray;
  function pt(r) {
    var t = ou(r);
    this.start = 0, this.size = 0, this.capacity = r, this.dense = new t(r), this.sparse = new t(r);
  }
  pt.prototype.clear = function() {
    this.start = 0, this.size = 0;
  };
  pt.prototype.has = function(r) {
    if (this.size === 0) return false;
    var t = this.sparse[r], e = t < this.capacity && t >= this.start && t < this.start + this.size || t < (this.start + this.size) % this.capacity;
    return e && this.dense[t] === r;
  };
  pt.prototype.enqueue = function(r) {
    var t = this.sparse[r];
    if (this.size !== 0) {
      var e = t < this.capacity && t >= this.start && t < this.start + this.size || t < (this.start + this.size) % this.capacity;
      if (e && this.dense[t] === r) return this;
    }
    return t = (this.start + this.size) % this.capacity, this.dense[t] = r, this.sparse[r] = t, this.size++, this;
  };
  pt.prototype.dequeue = function() {
    if (this.size !== 0) {
      var r = this.start;
      this.size--, this.start++, this.start === this.capacity && (this.start = 0);
      var t = this.dense[r];
      return this.sparse[t] = this.capacity, t;
    }
  };
  pt.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = this.capacity, i = this.size, n = this.start, o = 0; o < i; ) r.call(t, this.dense[n], o, this), n++, o++, n === e && (n = 0);
  };
  pt.prototype.values = function() {
    var r = this.dense, t = this.capacity, e = this.size, i = this.start, n = 0;
    return new nu(function() {
      if (n >= e) return { done: true };
      var o = r[i];
      return i++, n++, i === t && (i = 0), { value: o, done: false };
    });
  };
  typeof Symbol != "undefined" && (pt.prototype[Symbol.iterator] = pt.prototype.values);
  pt.prototype.inspect = function() {
    var r = [];
    return this.forEach(function(t) {
      r.push(t);
    }), Object.defineProperty(r, "constructor", { value: pt, enumerable: false }), r.capacity = this.capacity, r;
  };
  typeof Symbol != "undefined" && (pt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = pt.prototype.inspect);
  As.exports = pt;
});
var Ms = y((bd, Is) => {
  var Ii = j(), su = ot().getPointerArray;
  function rt(r, t) {
    arguments.length < 2 && (t = r, r = Array);
    var e = su(t);
    this.size = 0, this.length = t, this.dense = new e(t), this.sparse = new e(t), this.vals = new r(t);
  }
  rt.prototype.clear = function() {
    this.size = 0;
  };
  rt.prototype.has = function(r) {
    var t = this.sparse[r];
    return t < this.size && this.dense[t] === r;
  };
  rt.prototype.get = function(r) {
    var t = this.sparse[r];
    if (t < this.size && this.dense[t] === r) return this.vals[t];
  };
  rt.prototype.set = function(r, t) {
    var e = this.sparse[r];
    return e < this.size && this.dense[e] === r ? (this.vals[e] = t, this) : (this.dense[this.size] = r, this.sparse[r] = this.size, this.vals[this.size] = t, this.size++, this);
  };
  rt.prototype.delete = function(r) {
    var t = this.sparse[r];
    return t >= this.size || this.dense[t] !== r ? false : (t = this.dense[this.size - 1], this.dense[this.sparse[r]] = t, this.sparse[t] = this.sparse[r], this.size--, true);
  };
  rt.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e = 0; e < this.size; e++) r.call(t, this.vals[e], this.dense[e]);
  };
  rt.prototype.keys = function() {
    var r = this.size, t = this.dense, e = 0;
    return new Ii(function() {
      if (e < r) {
        var i = t[e];
        return e++, { value: i };
      }
      return { done: true };
    });
  };
  rt.prototype.values = function() {
    var r = this.size, t = this.vals, e = 0;
    return new Ii(function() {
      if (e < r) {
        var i = t[e];
        return e++, { value: i };
      }
      return { done: true };
    });
  };
  rt.prototype.entries = function() {
    var r = this.size, t = this.dense, e = this.vals, i = 0;
    return new Ii(function() {
      if (i < r) {
        var n = [t[i], e[i]];
        return i++, { value: n };
      }
      return { done: true };
    });
  };
  typeof Symbol != "undefined" && (rt.prototype[Symbol.iterator] = rt.prototype.entries);
  rt.prototype.inspect = function() {
    for (var r = /* @__PURE__ */ new Map(), t = 0; t < this.size; t++) r.set(this.dense[t], this.vals[t]);
    return Object.defineProperty(r, "constructor", { value: rt, enumerable: false }), r.length = this.length, this.vals.constructor !== Array && (r.type = this.vals.constructor.name), r;
  };
  typeof Symbol != "undefined" && (rt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = rt.prototype.inspect);
  Is.exports = rt;
});
var Fs = y((Pd, Rs) => {
  var au = j(), hu = ot().getPointerArray;
  function ft2(r) {
    var t = hu(r);
    this.size = 0, this.length = r, this.dense = new t(r), this.sparse = new t(r);
  }
  ft2.prototype.clear = function() {
    this.size = 0;
  };
  ft2.prototype.has = function(r) {
    var t = this.sparse[r];
    return t < this.size && this.dense[t] === r;
  };
  ft2.prototype.add = function(r) {
    var t = this.sparse[r];
    return t < this.size && this.dense[t] === r ? this : (this.dense[this.size] = r, this.sparse[r] = this.size, this.size++, this);
  };
  ft2.prototype.delete = function(r) {
    var t = this.sparse[r];
    return t >= this.size || this.dense[t] !== r ? false : (t = this.dense[this.size - 1], this.dense[this.sparse[r]] = t, this.sparse[t] = this.sparse[r], this.size--, true);
  };
  ft2.prototype.forEach = function(r, t) {
    t = arguments.length > 1 ? t : this;
    for (var e, i = 0; i < this.size; i++) e = this.dense[i], r.call(t, e, e);
  };
  ft2.prototype.values = function() {
    var r = this.size, t = this.dense, e = 0;
    return new au(function() {
      if (e < r) {
        var i = t[e];
        return e++, { value: i };
      }
      return { done: true };
    });
  };
  typeof Symbol != "undefined" && (ft2.prototype[Symbol.iterator] = ft2.prototype.values);
  ft2.prototype.inspect = function() {
    for (var r = /* @__PURE__ */ new Set(), t = 0; t < this.size; t++) r.add(this.dense[t]);
    return Object.defineProperty(r, "constructor", { value: ft2, enumerable: false }), r.length = this.length, r;
  };
  typeof Symbol != "undefined" && (ft2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = ft2.prototype.inspect);
  Rs.exports = ft2;
});
var Hs = y((wd, Vs) => {
  var uu = A(), lu = 2, cu = 2, pu = /* @__PURE__ */ new Set([0, 1, 2]), fu = { 0: "Returns only the top suggestion", 1: "Returns suggestions with the smallest edit distance", 2: "Returns every suggestion (no early termination)" };
  function Rr(r) {
    var t = /* @__PURE__ */ new Set();
    return typeof r == "number" && t.add(r), { suggestions: t, count: 0 };
  }
  function ks(r, t, e) {
    return { term: r || "", distance: t || 0, count: e || 0 };
  }
  function zs(r, t, e, i) {
    i = i || /* @__PURE__ */ new Set(), t++;
    var n, o = r.length, s;
    if (o > 1) for (s = 0; s < o; s++) n = r.substring(0, s) + r.substring(s + 1), i.has(n) || (i.add(n), t < e && zs(n, t, e, i));
    return i;
  }
  function mu(r, t, e, i, n, o) {
    var s = e.suggestions.values().next().value;
    t < 2 && e.suggestions.size > 0 && r[s].length - o.length > i.length - o.length && (e.suggestions = /* @__PURE__ */ new Set(), e.count = 0), (t === 2 || !e.suggestions.size || r[s].length - o.length >= i.length - o.length) && e.suggestions.add(n);
  }
  function _s(r, t) {
    var e = r.length, i = t.length, n = [[]], o = e + i, s = /* @__PURE__ */ new Map(), a3, h, u;
    for (n[0][0] = o, a3 = 0; a3 <= e; a3++) n[a3 + 1] || (n[a3 + 1] = []), n[a3 + 1][1] = a3, n[a3 + 1][0] = o;
    for (u = 0; u <= i; u++) n[1][u + 1] = u, n[0][u + 1] = o;
    var l = r + t, c;
    for (a3 = 0, h = l.length; a3 < h; a3++) c = l[a3], s.has(c) || s.set(c, 0);
    for (a3 = 1; a3 <= e; a3++) {
      var p = 0;
      for (u = 1; u <= i; u++) {
        var f = s.get(t[u - 1]), d = p;
        r[a3 - 1] === t[u - 1] ? (n[a3 + 1][u + 1] = n[a3][u], p = u) : n[a3 + 1][u + 1] = Math.min(n[a3][u], n[a3 + 1][u], n[a3][u + 1]) + 1, n[a3 + 1][u + 1] = Math.min(n[a3 + 1][u + 1], n[f][d] + (a3 - f - 1) + 1 + (u - d - 1));
      }
      s.set(r[a3 - 1], a3);
    }
    return n[e + 1][i + 1];
  }
  function du(r, t, e, i, n, o) {
    var s = o.length;
    if (s - i > n) return [];
    for (var a3 = [o], h = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), l = [], c, p; a3.length > 0 && (c = a3.shift(), !(e < 2 && l.length > 0 && s - c.length > l[0].distance)); ) {
      if (p = r[c], p !== void 0) {
        if (typeof p == "number" && (p = Rr(p)), p.count > 0 && !u.has(c)) {
          u.add(c);
          var f = ks(c, s - c.length, p.count);
          if (l.push(f), e < 2 && s - c.length === 0) break;
        }
        p.suggestions.forEach((w) => {
          var v = t[w];
          if (!u.has(v)) {
            u.add(v);
            var F = 0;
            if (o !== v) if (v.length === c.length) F = s - c.length;
            else if (s === c.length) F = v.length - c.length;
            else {
              for (var U = 0, Nt = 0, qe = v.length; U < qe && U < s && v[U] === o[U]; ) U++;
              for (; Nt < qe - U && Nt < s && v[qe - Nt - 1] === o[s - Nt - 1]; ) Nt++;
              U > 0 || Nt > 0 ? F = _s(v.substr(U, qe - U - Nt), o.substr(U, s - U - Nt)) : F = _s(v, o);
            }
            if (e < 2 && l.length > 0 && l[0].distance > F && (l = []), !(e < 2 && l.length > 0 && F > l[0].distance) && F <= i) {
              var Ni = r[v];
              Ni !== void 0 && l.push(ks(v, F, Ni.count));
            }
          }
        });
      }
      if (s - c.length < i) {
        if (e < 2 && l.length > 0 && s - c.length >= l[0].distance) continue;
        for (var d = 0, g = c.length; d < g; d++) {
          var b = c.substring(0, d) + c.substring(d + 1);
          h.has(b) || (h.add(b), a3.push(b));
        }
      }
    }
    return e === 0 ? l.slice(0, 1) : l;
  }
  function Vt2(r) {
    if (r = r || {}, this.clear(), this.maxDistance = typeof r.maxDistance == "number" ? r.maxDistance : lu, this.verbosity = typeof r.verbosity == "number" ? r.verbosity : cu, typeof this.maxDistance != "number" || this.maxDistance <= 0) throw Error("mnemonist/SymSpell.constructor: invalid `maxDistance` option. Should be a integer greater than 0.");
    if (!pu.has(this.verbosity)) throw Error("mnemonist/SymSpell.constructor: invalid `verbosity` option. Should be either 0, 1 or 2.");
  }
  Vt2.prototype.clear = function() {
    this.size = 0, this.dictionary = /* @__PURE__ */ Object.create(null), this.maxLength = 0, this.words = [];
  };
  Vt2.prototype.add = function(r) {
    var t = this.dictionary[r];
    if (t !== void 0 ? (typeof t == "number" && (t = Rr(t), this.dictionary[r] = t), t.count++) : (t = Rr(), t.count++, this.dictionary[r] = t, r.length > this.maxLength && (this.maxLength = r.length)), t.count === 1) {
      var e = this.words.length;
      this.words.push(r);
      var i = zs(r, 0, this.maxDistance);
      i.forEach((n) => {
        var o = this.dictionary[n];
        o !== void 0 ? (typeof o == "number" && (o = Rr(o), this.dictionary[n] = o), o.suggestions.has(e) || mu(this.words, this.verbosity, o, r, e, n)) : this.dictionary[n] = e;
      });
    }
    return this.size++, this;
  };
  Vt2.prototype.search = function(r) {
    return du(this.dictionary, this.words, this.verbosity, this.maxDistance, this.maxLength, r);
  };
  Vt2.prototype.inspect = function() {
    var r = [];
    r.size = this.size, r.maxDistance = this.maxDistance, r.verbosity = this.verbosity, r.behavior = fu[this.verbosity];
    for (var t in this.dictionary) typeof this.dictionary[t] == "object" && this.dictionary[t].count && r.push([t, this.dictionary[t].count]);
    return Object.defineProperty(r, "constructor", { value: Vt2, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (Vt2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Vt2.prototype.inspect);
  Vt2.from = function(r, t) {
    var e = new Vt2(t);
    return uu(r, function(i) {
      e.add(i);
    }), e;
  };
  Vs.exports = Vt2;
});
var Mi2 = y((Td, Us) => {
  var gu = A(), Ce = j(), Y = String.fromCharCode(0);
  function M(r) {
    this.mode = r === Array ? "array" : "string", this.clear();
  }
  M.prototype.clear = function() {
    this.root = {}, this.size = 0;
  };
  M.prototype.set = function(r, t) {
    for (var e = this.root, i, n = 0, o = r.length; n < o; n++) i = r[n], e = e[i] || (e[i] = {});
    return Y in e || this.size++, e[Y] = t, this;
  };
  M.prototype.update = function(r, t) {
    for (var e = this.root, i, n = 0, o = r.length; n < o; n++) i = r[n], e = e[i] || (e[i] = {});
    return Y in e || this.size++, e[Y] = t(e[Y]), this;
  };
  M.prototype.get = function(r) {
    var t = this.root, e, i, n;
    for (i = 0, n = r.length; i < n; i++) if (e = r[i], t = t[e], typeof t == "undefined") return;
    if (Y in t) return t[Y];
  };
  M.prototype.delete = function(r) {
    var t = this.root, e = null, i = null, n, o, s, a3;
    for (s = 0, a3 = r.length; s < a3; s++) {
      if (o = r[s], n = t, t = t[o], typeof t == "undefined") return false;
      e !== null ? Object.keys(t).length > 1 && (e = null, i = null) : Object.keys(t).length < 2 && (e = n, i = o);
    }
    return Y in t ? (this.size--, e ? delete e[i] : delete t[Y], true) : false;
  };
  M.prototype.has = function(r) {
    for (var t = this.root, e, i = 0, n = r.length; i < n; i++) if (e = r[i], t = t[e], typeof t == "undefined") return false;
    return Y in t;
  };
  M.prototype.find = function(r) {
    var t = typeof r == "string", e = this.root, i = [], n, o, s;
    for (o = 0, s = r.length; o < s; o++) if (n = r[o], e = e[n], typeof e == "undefined") return i;
    for (var a3 = [e], h = [r], u; a3.length; ) {
      r = h.pop(), e = a3.pop();
      for (u in e) {
        if (u === Y) {
          i.push([r, e[Y]]);
          continue;
        }
        a3.push(e[u]), h.push(t ? r + u : r.concat(u));
      }
    }
    return i;
  };
  M.prototype.values = function(r) {
    var t = this.root, e = [], i, n, o;
    if (r) {
      for (n = 0, o = r.length; n < o; n++) if (i = r[n], t = t[i], typeof t == "undefined") return Ce.empty();
    }
    return e.push(t), new Ce(function() {
      for (var s, a3 = false, h; e.length; ) {
        s = e.pop();
        for (h in s) {
          if (h === Y) {
            a3 = true;
            continue;
          }
          e.push(s[h]);
        }
        if (a3) return { done: false, value: s[Y] };
      }
      return { done: true };
    });
  };
  M.prototype.prefixes = function(r) {
    var t = this.root, e = [], i = [], n, o, s, a3 = this.mode === "string";
    if (r) {
      for (o = 0, s = r.length; o < s; o++) if (n = r[o], t = t[n], typeof t == "undefined") return Ce.empty();
    } else r = a3 ? "" : [];
    return e.push(t), i.push(r), new Ce(function() {
      for (var h, u, l = false, c; e.length; ) {
        h = e.pop(), u = i.pop();
        for (c in h) {
          if (c === Y) {
            l = true;
            continue;
          }
          e.push(h[c]), i.push(a3 ? u + c : u.concat(c));
        }
        if (l) return { done: false, value: u };
      }
      return { done: true };
    });
  };
  M.prototype.keys = M.prototype.prefixes;
  M.prototype.entries = function(r) {
    var t = this.root, e = [], i = [], n, o, s, a3 = this.mode === "string";
    if (r) {
      for (o = 0, s = r.length; o < s; o++) if (n = r[o], t = t[n], typeof t == "undefined") return Ce.empty();
    } else r = a3 ? "" : [];
    return e.push(t), i.push(r), new Ce(function() {
      for (var h, u, l = false, c; e.length; ) {
        h = e.pop(), u = i.pop();
        for (c in h) {
          if (c === Y) {
            l = true;
            continue;
          }
          e.push(h[c]), i.push(a3 ? u + c : u.concat(c));
        }
        if (l) return { done: false, value: [u, h[Y]] };
      }
      return { done: true };
    });
  };
  typeof Symbol != "undefined" && (M.prototype[Symbol.iterator] = M.prototype.entries);
  M.prototype.inspect = function() {
    for (var r = new Array(this.size), t = this.entries(), e, i = 0; e = t.next(), !e.done; ) r[i++] = e.value;
    return Object.defineProperty(r, "constructor", { value: M, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (M.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = M.prototype.inspect);
  M.prototype.toJSON = function() {
    return this.root;
  };
  M.from = function(r) {
    var t = new M();
    return gu(r, function(e, i) {
      t.set(i, e);
    }), t;
  };
  M.SENTINEL = Y;
  Us.exports = M;
});
var Bs = y((xd, Ns) => {
  var yu = A(), Gs = Mi2(), Fr = String.fromCharCode(0);
  function K2(r) {
    this.mode = r === Array ? "array" : "string", this.clear();
  }
  for (Ri2 in Gs.prototype) K2.prototype[Ri2] = Gs.prototype[Ri2];
  var Ri2;
  delete K2.prototype.set;
  delete K2.prototype.get;
  delete K2.prototype.values;
  delete K2.prototype.entries;
  K2.prototype.add = function(r) {
    for (var t = this.root, e, i = 0, n = r.length; i < n; i++) e = r[i], t = t[e] || (t[e] = {});
    return Fr in t || this.size++, t[Fr] = true, this;
  };
  K2.prototype.find = function(r) {
    var t = typeof r == "string", e = this.root, i = [], n, o, s;
    for (o = 0, s = r.length; o < s; o++) if (n = r[o], e = e[n], typeof e == "undefined") return i;
    for (var a3 = [e], h = [r], u; a3.length; ) {
      r = h.pop(), e = a3.pop();
      for (u in e) {
        if (u === Fr) {
          i.push(r);
          continue;
        }
        a3.push(e[u]), h.push(t ? r + u : r.concat(u));
      }
    }
    return i;
  };
  typeof Symbol != "undefined" && (K2.prototype[Symbol.iterator] = K2.prototype.keys);
  K2.prototype.inspect = function() {
    for (var r = /* @__PURE__ */ new Set(), t = this.keys(), e; e = t.next(), !e.done; ) r.add(e.value);
    return Object.defineProperty(r, "constructor", { value: K2, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (K2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = K2.prototype.inspect);
  K2.prototype.toJSON = function() {
    return this.root;
  };
  K2.from = function(r) {
    var t = new K2();
    return yu(r, function(e) {
      t.add(e);
    }), t;
  };
  K2.SENTINEL = Fr;
  Ns.exports = K2;
});
var $s = y((Sd, js) => {
  var Ws = j(), vu = A(), bu = at(), qs = ot(), Pu = function(r) {
    return Math.max(1, Math.ceil(r * 1.5));
  }, wu = function(r) {
    var t = qs.getPointerArray(r);
    return new t(r);
  };
  function T2(r, t) {
    if (arguments.length < 1) throw new Error("mnemonist/vector: expecting at least a byte array constructor.");
    var e = t || 0, i = Pu, n = 0, o = false;
    typeof t == "object" && (e = t.initialCapacity || 0, n = t.initialLength || 0, i = t.policy || i, o = t.factory === true), this.factory = o ? r : null, this.ArrayClass = r, this.length = n, this.capacity = Math.max(n, e), this.policy = i, this.array = new r(this.capacity);
  }
  T2.prototype.set = function(r, t) {
    if (this.length < r) throw new Error("Vector(" + this.ArrayClass.name + ").set: index out of bounds.");
    return this.array[r] = t, this;
  };
  T2.prototype.get = function(r) {
    if (!(this.length < r)) return this.array[r];
  };
  T2.prototype.applyPolicy = function(r) {
    var t = this.policy(r || this.capacity);
    if (typeof t != "number" || t < 0) throw new Error("mnemonist/vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
    if (t <= this.capacity) throw new Error("mnemonist/vector.applyPolicy: policy returned a less or equal capacity to allocate.");
    return t;
  };
  T2.prototype.reallocate = function(r) {
    if (r === this.capacity) return this;
    var t = this.array;
    if (r < this.length && (this.length = r), r > this.capacity) if (this.factory === null ? this.array = new this.ArrayClass(r) : this.array = this.factory(r), qs.isTypedArray(this.array)) this.array.set(t, 0);
    else for (var e = 0, i = this.length; e < i; e++) this.array[e] = t[e];
    else this.array = t.slice(0, r);
    return this.capacity = r, this;
  };
  T2.prototype.grow = function(r) {
    var t;
    if (typeof r == "number") {
      if (this.capacity >= r) return this;
      for (t = this.capacity; t < r; ) t = this.applyPolicy(t);
      return this.reallocate(t), this;
    }
    return t = this.applyPolicy(), this.reallocate(t), this;
  };
  T2.prototype.resize = function(r) {
    return r === this.length ? this : r < this.length ? (this.length = r, this) : (this.length = r, this.reallocate(r), this);
  };
  T2.prototype.push = function(r) {
    return this.capacity === this.length && this.grow(), this.array[this.length++] = r, this.length;
  };
  T2.prototype.pop = function() {
    if (this.length !== 0) return this.array[--this.length];
  };
  T2.prototype.values = function() {
    var r = this.array, t = this.length, e = 0;
    return new Ws(function() {
      if (e >= t) return { done: true };
      var i = r[e];
      return e++, { value: i, done: false };
    });
  };
  T2.prototype.entries = function() {
    var r = this.array, t = this.length, e = 0;
    return new Ws(function() {
      if (e >= t) return { done: true };
      var i = r[e];
      return { value: [e++, i], done: false };
    });
  };
  typeof Symbol != "undefined" && (T2.prototype[Symbol.iterator] = T2.prototype.values);
  T2.prototype.inspect = function() {
    var r = this.array.slice(0, this.length);
    return r.type = this.array.constructor.name, r.items = this.length, r.capacity = this.capacity, Object.defineProperty(r, "constructor", { value: T2, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (T2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = T2.prototype.inspect);
  T2.from = function(r, t, e) {
    if (arguments.length < 3 && (e = bu.guessLength(r), typeof e != "number")) throw new Error("mnemonist/vector.from: could not guess iterable length. Please provide desired capacity as last argument.");
    var i = new T2(t, e);
    return vu(r, function(n) {
      i.push(n);
    }), i;
  };
  function Ht(r) {
    var t = function(i) {
      T2.call(this, r, i);
    };
    for (var e in T2.prototype) T2.prototype.hasOwnProperty(e) && (t.prototype[e] = T2.prototype[e]);
    return t.from = function(i, n) {
      return T2.from(i, r, n);
    }, typeof Symbol != "undefined" && (t.prototype[Symbol.iterator] = t.prototype.values), t;
  }
  T2.Int8Vector = Ht(Int8Array);
  T2.Uint8Vector = Ht(Uint8Array);
  T2.Uint8ClampedVector = Ht(Uint8ClampedArray);
  T2.Int16Vector = Ht(Int16Array);
  T2.Uint16Vector = Ht(Uint16Array);
  T2.Int32Vector = Ht(Int32Array);
  T2.Uint32Vector = Ht(Uint32Array);
  T2.Float32Vector = Ht(Float32Array);
  T2.Float64Vector = Ht(Float64Array);
  T2.PointerVector = Ht(wu);
  js.exports = T2;
});
var Ks = y((Cd, Ys) => {
  var Tu = at(), xu = ot(), Su = Ci2().inplaceQuickSortIndices, Cu = xi2().lowerBoundIndices, Lu = Or(), Eu = xu.getPointerArray;
  function Ou(r, t) {
    return r.distance < t.distance ? 1 : r.distance > t.distance ? -1 : 0;
  }
  function Au(r, t, e) {
    for (var i = e.length, n = Eu(i), o = 0, s = new n(i), a3 = new n(i), h = new n(i), u = new Float64Array(i), l = [0, 0, i], c = new Float64Array(i), p, f, d, g, b, w, v, F, U; l.length; ) if (b = l.pop(), g = l.pop(), p = l.pop(), f = e[b - 1], b--, U = b - g, s[p] = f, U !== 0) {
      if (U === 1) {
        v = r(t[f], t[e[g]]), u[p] = v, o++, h[p] = o, s[o] = e[g];
        continue;
      }
      for (F = g; F < b; F++) c[e[F]] = r(t[f], t[e[F]]);
      Su(c, e, g, b), d = g + U / 2 - 1, d === (d | 0) ? v = (c[e[d]] + c[e[d + 1]]) / 2 : v = c[e[Math.ceil(d)]], u[p] = v, w = Cu(c, e, v, g, b), b - w > 0 && (o++, h[p] = o, l.push(o, w, b)), w - g > 0 && (o++, a3[p] = o, l.push(o, g, w));
    }
    return { nodes: s, lefts: a3, rights: h, mus: u };
  }
  function Gt(r, t) {
    if (typeof r != "function") throw new Error("mnemonist/VPTree.constructor: given `distance` must be a function.");
    if (!t) throw new Error("mnemonist/VPTree.constructor: you must provide items to the tree. A VPTree cannot be updated after its creation.");
    this.distance = r, this.heap = new Lu(Ou), this.D = 0;
    var e = Tu.toArrayWithIndices(t);
    this.items = e[0];
    var i = e[1];
    this.size = i.length;
    var n = Au(r, this.items, i);
    this.nodes = n.nodes, this.lefts = n.lefts, this.rights = n.rights, this.mus = n.mus;
  }
  Gt.prototype.nearestNeighbors = function(r, t) {
    var e = this.heap, i = [0], n = 1 / 0, o, s, a3, h, u, l, c;
    for (this.D = 0; i.length; ) o = i.pop(), s = this.nodes[o], a3 = this.items[s], c = this.distance(a3, t), this.D++, c < n && (e.push({ distance: c, item: a3 }), e.size > r && e.pop(), e.size >= r && (n = e.peek().distance)), h = this.lefts[o], u = this.rights[o], !(!h && !u) && (l = this.mus[o], c < l ? (h && c < l + n && i.push(h), u && c >= l - n && i.push(u)) : (u && c >= l - n && i.push(u), h && c < l + n && i.push(h)));
    for (var p = new Array(e.size), f = e.size - 1; f >= 0; f--) p[f] = e.pop();
    return p;
  };
  Gt.prototype.neighbors = function(r, t) {
    var e = [], i = [0], n, o, s, a3, h, u, l;
    for (this.D = 0; i.length; ) n = i.pop(), o = this.nodes[n], s = this.items[o], l = this.distance(s, t), this.D++, l <= r && e.push({ distance: l, item: s }), a3 = this.lefts[n], h = this.rights[n], !(!a3 && !h) && (u = this.mus[n], l < u ? (a3 && l < u + r && i.push(a3), h && l >= u - r && i.push(h)) : (h && l >= u - r && i.push(h), a3 && l < u + r && i.push(a3)));
    return e;
  };
  Gt.prototype.inspect = function() {
    var r = this.items.slice();
    return Object.defineProperty(r, "constructor", { value: Gt, enumerable: false }), r;
  };
  typeof Symbol != "undefined" && (Gt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Gt.prototype.inspect);
  Gt.from = function(r, t) {
    return new Gt(t, r);
  };
  Ys.exports = Gt;
});
var Qs = y((Ld, Js) => {
  var Fi2 = Or(), ki2 = Pr2(), Xs = $n();
  Js.exports = { BiMap: Qn(), BitSet: oo(), BitVector: uo(), BloomFilter: go(), BKTree: vo(), CircularBuffer: xo(), DefaultMap: Co(), DefaultWeakMap: Eo(), FixedDeque: mi(), StaticDisjointSet: Ao(), FibonacciHeap: ki2, MinFibonacciHeap: ki2.MinFibonacciHeap, MaxFibonacciHeap: ki2.MaxFibonacciHeap, FixedReverseHeap: Ar(), FuzzyMap: ko2(), FuzzyMultiMap: Ho2(), HashedArrayTree: No2(), Heap: Fi2, MinHeap: Fi2.MinHeap, MaxHeap: Fi2.MaxHeap, StaticIntervalTree: jo2(), InvertedIndex: Zo2(), KDTree: ns(), LinkedList: as(), LRUCache: Mr(), LRUCacheWithDelete: ls(), LRUMap: Ai2(), LRUMapWithDelete: fs(), MultiMap: bi2(), MultiSet: ds(), PassjoinIndex: ws(), Queue: Ss(), FixedStack: wi2(), Stack: Es(), SuffixArray: Xs, GeneralizedSuffixArray: Xs.GeneralizedSuffixArray, Set: Os(), SparseQueueSet: Ds(), SparseMap: Ms(), SparseSet: Fs(), SymSpell: Hs(), Trie: Bs(), TrieMap: Mi2(), Vector: $s(), VPTree: Ks() };
});
var m = class {
  static get ZERO() {
    return new m(0, 0);
  }
  static get ONE() {
    return new m(1, 1);
  }
  static get UP() {
    return new m(0, -1);
  }
  static get DOWN() {
    return new m(0, 1);
  }
  static get LEFT() {
    return new m(-1, 0);
  }
  static get RIGHT() {
    return new m(1, 0);
  }
  static get UP_LEFT() {
    return new m(-1, -1);
  }
  static get UP_RIGHT() {
    return new m(1, -1);
  }
  static get DOWN_RIGHT() {
    return new m(1, 1);
  }
  static get DOWN_LEFT() {
    return new m(-1, 1);
  }
  constructor(t, e) {
    typeof t == "number" ? (this.x = t, this.y = e || 0) : (this.x = t.x, this.y = t.y);
  }
  clone() {
    return new m(this.x, this.y);
  }
  add(t) {
    return new m(this.x + t.x, this.y + t.y);
  }
  multiply(t) {
    return new m(this.x * t.x, this.y * t.y);
  }
  divide(t) {
    return new m(this.x / t.x, this.y / t.y);
  }
  subtract(t) {
    return new m(this.x - t.x, this.y - t.y);
  }
  equals(t) {
    return this.x === t.x && this.y === t.y;
  }
  abs() {
    return new m(Math.abs(this.x), Math.abs(this.y));
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  modulo(t) {
    return new m(this.x % t.x, this.y % t.y);
  }
  scalarModulo(t) {
    return new m(this.x % t, this.y % t);
  }
  scalarMult(t) {
    return new m(this.x * t, this.y * t);
  }
  toPosition() {
    return { x: this.x, y: this.y };
  }
  toString() {
    return `${this.x}#${this.y}`;
  }
};
var P = class {
  static equal(t, e) {
    return t.position.x === e.position.x && t.position.y === e.position.y && t.layer === e.layer;
  }
  static copyOver(t, e) {
    e.position.x = t.position.x, e.position.y = t.position.y, e.layer = t.layer;
  }
  static clone(t) {
    return { position: t.position.clone(), layer: t.layer };
  }
  static toString(t) {
    return `${t.position.toString()}#${t.layer}`;
  }
  static toInternal(t) {
    return { position: new m(t.position.x, t.position.y), layer: t.charLayer };
  }
  static fromInternal(t) {
    return { position: t.position.toPosition(), charLayer: t.layer };
  }
};
var ht = ((u) => (u.NONE = "none", u.LEFT = "left", u.UP_LEFT = "up-left", u.UP = "up", u.UP_RIGHT = "up-right", u.RIGHT = "right", u.DOWN_RIGHT = "down-right", u.DOWN = "down", u.DOWN_LEFT = "down-left", u))(ht || {});
var ua2 = { ["up"]: "down", ["down"]: "up", ["left"]: "right", ["right"]: "left", ["none"]: "none", ["up-left"]: "down-right", ["up-right"]: "down-left", ["down-right"]: "up-left", ["down-left"]: "up-right" };
var la2 = { ["up"]: m.UP, ["down"]: m.DOWN, ["left"]: m.LEFT, ["right"]: m.RIGHT, ["none"]: m.ZERO, ["up-left"]: m.UP_LEFT, ["up-right"]: m.UP_RIGHT, ["down-right"]: m.DOWN_RIGHT, ["down-left"]: m.DOWN_LEFT };
var ca2 = { ["left"]: "up-left", ["up-left"]: "up", ["up"]: "up-right", ["up-right"]: "right", ["right"]: "down-right", ["down-right"]: "down", ["down"]: "down-left", ["down-left"]: "left", ["none"]: "none" };
var pa2 = { ["left"]: "down-left", ["up-left"]: "left", ["up"]: "up-left", ["up-right"]: "up", ["right"]: "up-right", ["down-right"]: "right", ["down"]: "down-right", ["down-left"]: "down", ["none"]: "none" };
var fa2 = ["down-left", "down-right", "up-right", "up-left"];
function je2() {
  return ["up", "down", "left", "right", "none", "up-left", "up-right", "down-right", "down-left"];
}
function he2(r) {
  return fa2.includes(r);
}
function $r2(r) {
  return ["left", "right"].includes(r);
}
function $i(r) {
  return ["up", "down"].includes(r);
}
function Yi(r) {
  return pa2[r];
}
function $e(r) {
  return ca2[r];
}
function vt2(r) {
  return la2[r];
}
function Ki(r) {
  return ua2[r];
}
function St2(r, t) {
  if (r.x === t.x) {
    if (r.y > t.y) return "up";
    if (r.y < t.y) return "down";
  } else if (r.y === t.y) {
    if (r.x > t.x) return "left";
    if (r.x < t.x) return "right";
  } else if (r.x > t.x) {
    if (r.y < t.y) return "down-left";
    if (r.y > t.y) return "up-left";
  } else if (r.x < t.x) {
    if (r.y < t.y) return "down-right";
    if (r.y > t.y) return "up-right";
  }
  return "none";
}
var Bt = ((e) => (e[e.FOUR = 4] = "FOUR", e[e.EIGHT = 8] = "EIGHT", e))(Bt || {});
var Yr2 = function(r, t) {
  return Yr2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, Yr2(r, t);
};
function Wt2(r, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Yr2(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function Xi(r, t, e, i) {
  function n(o) {
    return o instanceof e ? o : new e(function(s) {
      s(o);
    });
  }
  return new (e || (e = Promise))(function(o, s) {
    function a3(l) {
      try {
        u(i.next(l));
      } catch (c) {
        s(c);
      }
    }
    function h(l) {
      try {
        u(i.throw(l));
      } catch (c) {
        s(c);
      }
    }
    function u(l) {
      l.done ? o(l.value) : n(l.value).then(a3, h);
    }
    u((i = i.apply(r, t || [])).next());
  });
}
function Ye(r, t) {
  var e = { label: 0, sent: function() {
    if (o[0] & 1) throw o[1];
    return o[1];
  }, trys: [], ops: [] }, i, n, o, s;
  return s = { next: a3(0), throw: a3(1), return: a3(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a3(u) {
    return function(l) {
      return h([u, l]);
    };
  }
  function h(u) {
    if (i) throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, u[0] && (e = 0)), e; ) try {
      if (i = 1, n && (o = u[0] & 2 ? n.return : u[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, u[1])).done) return o;
      switch (n = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
        case 0:
        case 1:
          o = u;
          break;
        case 4:
          return e.label++, { value: u[1], done: false };
        case 5:
          e.label++, n = u[1], u = [0];
          continue;
        case 7:
          u = e.ops.pop(), e.trys.pop();
          continue;
        default:
          if (o = e.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
            e = 0;
            continue;
          }
          if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
            e.label = u[1];
            break;
          }
          if (u[0] === 6 && e.label < o[1]) {
            e.label = o[1], o = u;
            break;
          }
          if (o && e.label < o[2]) {
            e.label = o[2], e.ops.push(u);
            break;
          }
          o[2] && e.ops.pop(), e.trys.pop();
          continue;
      }
      u = t.call(r, e);
    } catch (l) {
      u = [6, l], n = 0;
    } finally {
      i = o = 0;
    }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: true };
  }
}
function Ut(r) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && r[t], i = 0;
  if (e) return e.call(r);
  if (r && typeof r.length == "number") return { next: function() {
    return r && i >= r.length && (r = void 0), { value: r && r[i++], done: !r };
  } };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ct(r, t) {
  var e = typeof Symbol == "function" && r[Symbol.iterator];
  if (!e) return r;
  var i = e.call(r), n, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = i.next()).done; ) o.push(n.value);
  } catch (a3) {
    s = { error: a3 };
  } finally {
    try {
      n && !n.done && (e = i.return) && e.call(i);
    } finally {
      if (s) throw s.error;
    }
  }
  return o;
}
function Lt2(r, t, e) {
  if (e || arguments.length === 2) for (var i = 0, n = t.length, o; i < n; i++) (o || !(i in t)) && (o || (o = Array.prototype.slice.call(t, 0, i)), o[i] = t[i]);
  return r.concat(o || Array.prototype.slice.call(t));
}
function Zt(r) {
  return this instanceof Zt ? (this.v = r, this) : new Zt(r);
}
function Ji(r, t, e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = e.apply(r, t || []), n, o = [];
  return n = {}, s("next"), s("throw"), s("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function s(p) {
    i[p] && (n[p] = function(f) {
      return new Promise(function(d, g) {
        o.push([p, f, d, g]) > 1 || a3(p, f);
      });
    });
  }
  function a3(p, f) {
    try {
      h(i[p](f));
    } catch (d) {
      c(o[0][3], d);
    }
  }
  function h(p) {
    p.value instanceof Zt ? Promise.resolve(p.value.v).then(u, l) : c(o[0][2], p);
  }
  function u(p) {
    a3("next", p);
  }
  function l(p) {
    a3("throw", p);
  }
  function c(p, f) {
    p(f), o.shift(), o.length && a3(o[0][0], o[0][1]);
  }
}
function Qi(r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = r[Symbol.asyncIterator], e;
  return t ? t.call(r) : (r = typeof Ut == "function" ? Ut(r) : r[Symbol.iterator](), e = {}, i("next"), i("throw"), i("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function i(o) {
    e[o] = r[o] && function(s) {
      return new Promise(function(a3, h) {
        s = r[o](s), n(a3, h, s.done, s.value);
      });
    };
  }
  function n(o, s, a3, h) {
    Promise.resolve(h).then(function(u) {
      o({ value: u, done: a3 });
    }, s);
  }
}
function x(r) {
  return typeof r == "function";
}
function Ke(r) {
  var t = function(i) {
    Error.call(i), i.stack = new Error().stack;
  }, e = r(t);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var Xe = Ke(function(r) {
  return function(e) {
    r(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(i, n) {
      return n + 1 + ") " + i.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function Ae(r, t) {
  if (r) {
    var e = r.indexOf(t);
    0 <= e && r.splice(e, 1);
  }
}
var ue = (function() {
  function r(t) {
    this.initialTeardown = t, this.closed = false, this._parentage = null, this._finalizers = null;
  }
  return r.prototype.unsubscribe = function() {
    var t, e, i, n, o;
    if (!this.closed) {
      this.closed = true;
      var s = this._parentage;
      if (s) if (this._parentage = null, Array.isArray(s)) try {
        for (var a3 = Ut(s), h = a3.next(); !h.done; h = a3.next()) {
          var u = h.value;
          u.remove(this);
        }
      } catch (g) {
        t = { error: g };
      } finally {
        try {
          h && !h.done && (e = a3.return) && e.call(a3);
        } finally {
          if (t) throw t.error;
        }
      }
      else s.remove(this);
      var l = this.initialTeardown;
      if (x(l)) try {
        l();
      } catch (g) {
        o = g instanceof Xe ? g.errors : [g];
      }
      var c = this._finalizers;
      if (c) {
        this._finalizers = null;
        try {
          for (var p = Ut(c), f = p.next(); !f.done; f = p.next()) {
            var d = f.value;
            try {
              Zi(d);
            } catch (g) {
              o = o != null ? o : [], g instanceof Xe ? o = Lt2(Lt2([], Ct(o)), Ct(g.errors)) : o.push(g);
            }
          }
        } catch (g) {
          i = { error: g };
        } finally {
          try {
            f && !f.done && (n = p.return) && n.call(p);
          } finally {
            if (i) throw i.error;
          }
        }
      }
      if (o) throw new Xe(o);
    }
  }, r.prototype.add = function(t) {
    var e;
    if (t && t !== this) if (this.closed) Zi(t);
    else {
      if (t instanceof r) {
        if (t.closed || t._hasParent(this)) return;
        t._addParent(this);
      }
      (this._finalizers = (e = this._finalizers) !== null && e !== void 0 ? e : []).push(t);
    }
  }, r.prototype._hasParent = function(t) {
    var e = this._parentage;
    return e === t || Array.isArray(e) && e.includes(t);
  }, r.prototype._addParent = function(t) {
    var e = this._parentage;
    this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
  }, r.prototype._removeParent = function(t) {
    var e = this._parentage;
    e === t ? this._parentage = null : Array.isArray(e) && Ae(e, t);
  }, r.prototype.remove = function(t) {
    var e = this._finalizers;
    e && Ae(e, t), t instanceof r && t._removeParent(this);
  }, r.EMPTY = (function() {
    var t = new r();
    return t.closed = true, t;
  })(), r;
})();
var Kr = ue.EMPTY;
function Je2(r) {
  return r instanceof ue || r && "closed" in r && x(r.remove) && x(r.add) && x(r.unsubscribe);
}
function Zi(r) {
  x(r) ? r() : r.unsubscribe();
}
var bt = { onUnhandledError: null, onStoppedNotification: null, Promise: void 0, useDeprecatedSynchronousErrorHandling: false, useDeprecatedNextContext: false };
var le2 = { setTimeout: function(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++) e[i - 2] = arguments[i];
  var n = le2.delegate;
  return n != null && n.setTimeout ? n.setTimeout.apply(n, Lt2([r, t], Ct(e))) : setTimeout.apply(void 0, Lt2([r, t], Ct(e)));
}, clearTimeout: function(r) {
  var t = le2.delegate;
  return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(r);
}, delegate: void 0 };
function Qe(r) {
  le2.setTimeout(function() {
    var t = bt.onUnhandledError;
    if (t) t(r);
    else throw r;
  });
}
function De() {
}
var tn2 = (function() {
  return Xr2("C", void 0, void 0);
})();
function en2(r) {
  return Xr2("E", void 0, r);
}
function rn2(r) {
  return Xr2("N", r, void 0);
}
function Xr2(r, t, e) {
  return { kind: r, value: t, error: e };
}
var te = null;
function ce2(r) {
  if (bt.useDeprecatedSynchronousErrorHandling) {
    var t = !te;
    if (t && (te = { errorThrown: false, error: null }), r(), t) {
      var e = te, i = e.errorThrown, n = e.error;
      if (te = null, i) throw n;
    }
  } else r();
}
function nn2(r) {
  bt.useDeprecatedSynchronousErrorHandling && te && (te.errorThrown = true, te.error = r);
}
var Ie = (function(r) {
  Wt2(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.isStopped = false, e ? (i.destination = e, Je2(e) && e.add(i)) : i.destination = ya2, i;
  }
  return t.create = function(e, i, n) {
    return new tr(e, i, n);
  }, t.prototype.next = function(e) {
    this.isStopped ? Qr(rn2(e), this) : this._next(e);
  }, t.prototype.error = function(e) {
    this.isStopped ? Qr(en2(e), this) : (this.isStopped = true, this._error(e));
  }, t.prototype.complete = function() {
    this.isStopped ? Qr(tn2, this) : (this.isStopped = true, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = true, r.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(e) {
    this.destination.next(e);
  }, t.prototype._error = function(e) {
    try {
      this.destination.error(e);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
})(ue);
var ma2 = Function.prototype.bind;
function Jr(r, t) {
  return ma2.call(r, t);
}
var da2 = (function() {
  function r(t) {
    this.partialObserver = t;
  }
  return r.prototype.next = function(t) {
    var e = this.partialObserver;
    if (e.next) try {
      e.next(t);
    } catch (i) {
      Ze2(i);
    }
  }, r.prototype.error = function(t) {
    var e = this.partialObserver;
    if (e.error) try {
      e.error(t);
    } catch (i) {
      Ze2(i);
    }
    else Ze2(t);
  }, r.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete) try {
      t.complete();
    } catch (e) {
      Ze2(e);
    }
  }, r;
})();
var tr = (function(r) {
  Wt2(t, r);
  function t(e, i, n) {
    var o = r.call(this) || this, s;
    if (x(e) || !e) s = { next: e != null ? e : void 0, error: i != null ? i : void 0, complete: n != null ? n : void 0 };
    else {
      var a3;
      o && bt.useDeprecatedNextContext ? (a3 = Object.create(e), a3.unsubscribe = function() {
        return o.unsubscribe();
      }, s = { next: e.next && Jr(e.next, a3), error: e.error && Jr(e.error, a3), complete: e.complete && Jr(e.complete, a3) }) : s = e;
    }
    return o.destination = new da2(s), o;
  }
  return t;
})(Ie);
function Ze2(r) {
  bt.useDeprecatedSynchronousErrorHandling ? nn2(r) : Qe(r);
}
function ga(r) {
  throw r;
}
function Qr(r, t) {
  var e = bt.onStoppedNotification;
  e && le2.setTimeout(function() {
    return e(r, t);
  });
}
var ya2 = { closed: true, next: De, error: ga, complete: De };
var pe = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function er(r) {
  return r;
}
function Zr() {
  for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
  return ti(r);
}
function ti(r) {
  return r.length === 0 ? er : r.length === 1 ? r[0] : function(e) {
    return r.reduce(function(i, n) {
      return n(i);
    }, e);
  };
}
var W = (function() {
  function r(t) {
    t && (this._subscribe = t);
  }
  return r.prototype.lift = function(t) {
    var e = new r();
    return e.source = this, e.operator = t, e;
  }, r.prototype.subscribe = function(t, e, i) {
    var n = this, o = ba2(t) ? t : new tr(t, e, i);
    return ce2(function() {
      var s = n, a3 = s.operator, h = s.source;
      o.add(a3 ? a3.call(o, h) : h ? n._subscribe(o) : n._trySubscribe(o));
    }), o;
  }, r.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (e) {
      t.error(e);
    }
  }, r.prototype.forEach = function(t, e) {
    var i = this;
    return e = on2(e), new e(function(n, o) {
      var s = new tr({ next: function(a3) {
        try {
          t(a3);
        } catch (h) {
          o(h), s.unsubscribe();
        }
      }, error: o, complete: n });
      i.subscribe(s);
    });
  }, r.prototype._subscribe = function(t) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(t);
  }, r.prototype[pe] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return ti(t)(this);
  }, r.prototype.toPromise = function(t) {
    var e = this;
    return t = on2(t), new t(function(i, n) {
      var o;
      e.subscribe(function(s) {
        return o = s;
      }, function(s) {
        return n(s);
      }, function() {
        return i(o);
      });
    });
  }, r.create = function(t) {
    return new r(t);
  }, r;
})();
function on2(r) {
  var t;
  return (t = r != null ? r : bt.Promise) !== null && t !== void 0 ? t : Promise;
}
function va(r) {
  return r && x(r.next) && x(r.error) && x(r.complete);
}
function ba2(r) {
  return r && r instanceof Ie || va(r) && Je2(r);
}
function Pa(r) {
  return x(r == null ? void 0 : r.lift);
}
function Z(r) {
  return function(t) {
    if (Pa(t)) return t.lift(function(e) {
      try {
        return r(e, this);
      } catch (i) {
        this.error(i);
      }
    });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function ut(r, t, e, i, n) {
  return new wa(r, t, e, i, n);
}
var wa = (function(r) {
  Wt2(t, r);
  function t(e, i, n, o, s, a3) {
    var h = r.call(this, e) || this;
    return h.onFinalize = s, h.shouldUnsubscribe = a3, h._next = i ? function(u) {
      try {
        i(u);
      } catch (l) {
        e.error(l);
      }
    } : r.prototype._next, h._error = o ? function(u) {
      try {
        o(u);
      } catch (l) {
        e.error(l);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._error, h._complete = n ? function() {
      try {
        n();
      } catch (u) {
        e.error(u);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._complete, h;
  }
  return t.prototype.unsubscribe = function() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var i = this.closed;
      r.prototype.unsubscribe.call(this), !i && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }, t;
})(Ie);
var sn2 = Ke(function(r) {
  return function() {
    r(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
});
var L = (function(r) {
  Wt2(t, r);
  function t() {
    var e = r.call(this) || this;
    return e.closed = false, e.currentObservers = null, e.observers = [], e.isStopped = false, e.hasError = false, e.thrownError = null, e;
  }
  return t.prototype.lift = function(e) {
    var i = new an2(this, this);
    return i.operator = e, i;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed) throw new sn2();
  }, t.prototype.next = function(e) {
    var i = this;
    ce2(function() {
      var n, o;
      if (i._throwIfClosed(), !i.isStopped) {
        i.currentObservers || (i.currentObservers = Array.from(i.observers));
        try {
          for (var s = Ut(i.currentObservers), a3 = s.next(); !a3.done; a3 = s.next()) {
            var h = a3.value;
            h.next(e);
          }
        } catch (u) {
          n = { error: u };
        } finally {
          try {
            a3 && !a3.done && (o = s.return) && o.call(s);
          } finally {
            if (n) throw n.error;
          }
        }
      }
    });
  }, t.prototype.error = function(e) {
    var i = this;
    ce2(function() {
      if (i._throwIfClosed(), !i.isStopped) {
        i.hasError = i.isStopped = true, i.thrownError = e;
        for (var n = i.observers; n.length; ) n.shift().error(e);
      }
    });
  }, t.prototype.complete = function() {
    var e = this;
    ce2(function() {
      if (e._throwIfClosed(), !e.isStopped) {
        e.isStopped = true;
        for (var i = e.observers; i.length; ) i.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", { get: function() {
    var e;
    return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
  }, enumerable: false, configurable: true }), t.prototype._trySubscribe = function(e) {
    return this._throwIfClosed(), r.prototype._trySubscribe.call(this, e);
  }, t.prototype._subscribe = function(e) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
  }, t.prototype._innerSubscribe = function(e) {
    var i = this, n = this, o = n.hasError, s = n.isStopped, a3 = n.observers;
    return o || s ? Kr : (this.currentObservers = null, a3.push(e), new ue(function() {
      i.currentObservers = null, Ae(a3, e);
    }));
  }, t.prototype._checkFinalizedStatuses = function(e) {
    var i = this, n = i.hasError, o = i.thrownError, s = i.isStopped;
    n ? e.error(o) : s && e.complete();
  }, t.prototype.asObservable = function() {
    var e = new W();
    return e.source = this, e;
  }, t.create = function(e, i) {
    return new an2(e, i);
  }, t;
})(W);
var an2 = (function(r) {
  Wt2(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.destination = e, n.source = i, n;
  }
  return t.prototype.next = function(e) {
    var i, n;
    (n = (i = this.destination) === null || i === void 0 ? void 0 : i.next) === null || n === void 0 || n.call(i, e);
  }, t.prototype.error = function(e) {
    var i, n;
    (n = (i = this.destination) === null || i === void 0 ? void 0 : i.error) === null || n === void 0 || n.call(i, e);
  }, t.prototype.complete = function() {
    var e, i;
    (i = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || i === void 0 || i.call(e);
  }, t.prototype._subscribe = function(e) {
    var i, n;
    return (n = (i = this.source) === null || i === void 0 ? void 0 : i.subscribe(e)) !== null && n !== void 0 ? n : Kr;
  }, t;
})(L);
var hn2 = new W(function(r) {
  return r.complete();
});
function un2(r) {
  return r && x(r.schedule);
}
function ln2(r) {
  return r[r.length - 1];
}
function cn2(r) {
  return un2(ln2(r)) ? r.pop() : void 0;
}
function pn2(r, t) {
  return typeof ln2(r) == "number" ? r.pop() : t;
}
var rr2 = function(r) {
  return r && typeof r.length == "number" && typeof r != "function";
};
function ir(r) {
  return x(r == null ? void 0 : r.then);
}
function nr(r) {
  return x(r[pe]);
}
function or(r) {
  return Symbol.asyncIterator && x(r == null ? void 0 : r[Symbol.asyncIterator]);
}
function sr(r) {
  return new TypeError("You provided " + (r !== null && typeof r == "object" ? "an invalid object" : "'" + r + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Ta() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var ar = Ta();
function hr(r) {
  return x(r == null ? void 0 : r[ar]);
}
function ur(r) {
  return Ji(this, arguments, function() {
    var e, i, n, o;
    return Ye(this, function(s) {
      switch (s.label) {
        case 0:
          e = r.getReader(), s.label = 1;
        case 1:
          s.trys.push([1, , 9, 10]), s.label = 2;
        case 2:
          return [4, Zt(e.read())];
        case 3:
          return i = s.sent(), n = i.value, o = i.done, o ? [4, Zt(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, Zt(n)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return e.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function lr(r) {
  return x(r == null ? void 0 : r.getReader);
}
function mt(r) {
  if (r instanceof W) return r;
  if (r != null) {
    if (nr(r)) return xa(r);
    if (rr2(r)) return Sa2(r);
    if (ir(r)) return Ca(r);
    if (or(r)) return fn2(r);
    if (hr(r)) return La2(r);
    if (lr(r)) return Ea2(r);
  }
  throw sr(r);
}
function xa(r) {
  return new W(function(t) {
    var e = r[pe]();
    if (x(e.subscribe)) return e.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Sa2(r) {
  return new W(function(t) {
    for (var e = 0; e < r.length && !t.closed; e++) t.next(r[e]);
    t.complete();
  });
}
function Ca(r) {
  return new W(function(t) {
    r.then(function(e) {
      t.closed || (t.next(e), t.complete());
    }, function(e) {
      return t.error(e);
    }).then(null, Qe);
  });
}
function La2(r) {
  return new W(function(t) {
    var e, i;
    try {
      for (var n = Ut(r), o = n.next(); !o.done; o = n.next()) {
        var s = o.value;
        if (t.next(s), t.closed) return;
      }
    } catch (a3) {
      e = { error: a3 };
    } finally {
      try {
        o && !o.done && (i = n.return) && i.call(n);
      } finally {
        if (e) throw e.error;
      }
    }
    t.complete();
  });
}
function fn2(r) {
  return new W(function(t) {
    Oa2(r, t).catch(function(e) {
      return t.error(e);
    });
  });
}
function Ea2(r) {
  return fn2(ur(r));
}
function Oa2(r, t) {
  var e, i, n, o;
  return Xi(this, void 0, void 0, function() {
    var s, a3;
    return Ye(this, function(h) {
      switch (h.label) {
        case 0:
          h.trys.push([0, 5, 6, 11]), e = Qi(r), h.label = 1;
        case 1:
          return [4, e.next()];
        case 2:
          if (i = h.sent(), !!i.done) return [3, 4];
          if (s = i.value, t.next(s), t.closed) return [2];
          h.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return a3 = h.sent(), n = { error: a3 }, [3, 11];
        case 6:
          return h.trys.push([6, , 9, 10]), i && !i.done && (o = e.return) ? [4, o.call(e)] : [3, 8];
        case 7:
          h.sent(), h.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (n) throw n.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function dt2(r, t, e, i, n) {
  i === void 0 && (i = 0), n === void 0 && (n = false);
  var o = t.schedule(function() {
    e(), n ? r.add(this.schedule(null, i)) : this.unsubscribe();
  }, i);
  if (r.add(o), !n) return o;
}
function cr(r, t) {
  return t === void 0 && (t = 0), Z(function(e, i) {
    e.subscribe(ut(i, function(n) {
      return dt2(i, r, function() {
        return i.next(n);
      }, t);
    }, function() {
      return dt2(i, r, function() {
        return i.complete();
      }, t);
    }, function(n) {
      return dt2(i, r, function() {
        return i.error(n);
      }, t);
    }));
  });
}
function pr2(r, t) {
  return t === void 0 && (t = 0), Z(function(e, i) {
    i.add(r.schedule(function() {
      return e.subscribe(i);
    }, t));
  });
}
function mn(r, t) {
  return mt(r).pipe(pr2(t), cr(t));
}
function dn(r, t) {
  return mt(r).pipe(pr2(t), cr(t));
}
function gn(r, t) {
  return new W(function(e) {
    var i = 0;
    return t.schedule(function() {
      i === r.length ? e.complete() : (e.next(r[i++]), e.closed || this.schedule());
    });
  });
}
function yn(r, t) {
  return new W(function(e) {
    var i;
    return dt2(e, t, function() {
      i = r[ar](), dt2(e, t, function() {
        var n, o, s;
        try {
          n = i.next(), o = n.value, s = n.done;
        } catch (a3) {
          e.error(a3);
          return;
        }
        s ? e.complete() : e.next(o);
      }, 0, true);
    }), function() {
      return x(i == null ? void 0 : i.return) && i.return();
    };
  });
}
function fr(r, t) {
  if (!r) throw new Error("Iterable cannot be null");
  return new W(function(e) {
    dt2(e, t, function() {
      var i = r[Symbol.asyncIterator]();
      dt2(e, t, function() {
        i.next().then(function(n) {
          n.done ? e.complete() : e.next(n.value);
        });
      }, 0, true);
    });
  });
}
function vn2(r, t) {
  return fr(ur(r), t);
}
function bn2(r, t) {
  if (r != null) {
    if (nr(r)) return mn(r, t);
    if (rr2(r)) return gn(r, t);
    if (ir(r)) return dn(r, t);
    if (or(r)) return fr(r, t);
    if (hr(r)) return yn(r, t);
    if (lr(r)) return vn2(r, t);
  }
  throw sr(r);
}
function Pn2(r, t) {
  return t ? bn2(r, t) : mt(r);
}
function Et(r, t) {
  return Z(function(e, i) {
    var n = 0;
    e.subscribe(ut(i, function(o) {
      i.next(r.call(t, o, n++));
    }));
  });
}
function wn2(r, t, e, i, n, o, s, a3) {
  var h = [], u = 0, l = 0, c = false, p = function() {
    c && !h.length && !u && t.complete();
  }, f = function(g) {
    return u < i ? d(g) : h.push(g);
  }, d = function(g) {
    o && t.next(g), u++;
    var b = false;
    mt(e(g, l++)).subscribe(ut(t, function(w) {
      n == null || n(w), o ? f(w) : t.next(w);
    }, function() {
      b = true;
    }, void 0, function() {
      if (b) try {
        u--;
        for (var w = function() {
          var v = h.shift();
          s ? dt2(t, s, function() {
            return d(v);
          }) : d(v);
        }; h.length && u < i; ) w();
        p();
      } catch (v) {
        t.error(v);
      }
    }));
  };
  return r.subscribe(ut(t, f, function() {
    c = true, p();
  })), function() {
    a3 == null || a3();
  };
}
function ei(r, t, e) {
  return e === void 0 && (e = 1 / 0), x(t) ? ei(function(i, n) {
    return Et(function(o, s) {
      return t(i, o, n, s);
    })(mt(r(i, n)));
  }, e) : (typeof t == "number" && (e = t), Z(function(i, n) {
    return wn2(i, n, r, e);
  }));
}
function Tn2(r) {
  return r === void 0 && (r = 1 / 0), ei(er, r);
}
var Aa2 = Array.isArray;
function xn2(r) {
  return r.length === 1 && Aa2(r[0]) ? r[0] : r;
}
function it(r, t) {
  return Z(function(e, i) {
    var n = 0;
    e.subscribe(ut(i, function(o) {
      return r.call(t, o, n++) && i.next(o);
    }));
  });
}
function gt(r) {
  return r <= 0 ? function() {
    return hn2;
  } : Z(function(t, e) {
    var i = 0;
    t.subscribe(ut(e, function(n) {
      ++i <= r && (e.next(n), r <= i && e.complete());
    }));
  });
}
function Sn2() {
  for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
  var e = cn2(r), i = pn2(r, 1 / 0);
  return r = xn2(r), Z(function(n, o) {
    Tn2(i)(Pn2(Lt2([n], Ct(r)), e)).subscribe(o);
  });
}
function ri() {
  for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
  return Sn2.apply(void 0, Lt2([], Ct(r)));
}
function q2(r) {
  return Z(function(t, e) {
    mt(r).subscribe(ut(e, function() {
      return e.complete();
    }, De)), !e.closed && t.subscribe(e);
  });
}
var ee2 = 1e3;
var mr2 = class {
  constructor(t, e) {
    this.id = t;
    this.movementDirection = "none";
    this._tilePos = { position: new m(0, 0), layer: void 0 };
    this.movementStarted$ = new L();
    this.movementStopped$ = new L();
    this.directionChanged$ = new L();
    this.positionChangeStarted$ = new L();
    this.positionChangeFinished$ = new L();
    this.tilePositionSet$ = new L();
    this.autoMovementSet$ = new L();
    this.lastMovementImpulse = "none";
    this.facingDirection = "down";
    this.depthChanged$ = new L();
    this.movementProgress = 0;
    var i, n, o;
    this.tilemap = e.tilemap, this.speed = e.speed, this.collidesWithTilesInternal = e.collidesWithTiles, this._tilePos.layer = e.charLayer, this.ignoreMissingTiles = (i = e.ignoreMissingTiles) != null ? i : false, this.collisionGroups = new Set(e.collisionGroups || []), this.labels = new Set(e.labels || []), this.numberOfDirections = e.numberOfDirections, e.facingDirection && this.turnTowards(e.facingDirection), this.tileWidth = (n = e.tileWidth) != null ? n : 1, this.tileHeight = (o = e.tileHeight) != null ? o : 1;
  }
  getId() {
    return this.id;
  }
  getSpeed() {
    return this.speed;
  }
  setSpeed(t) {
    this.speed = t;
  }
  setMovement(t) {
    this.autoMovementSet$.next(t), this.movement = t;
  }
  getMovement() {
    return this.movement;
  }
  collidesWithTiles() {
    return this.collidesWithTilesInternal;
  }
  getIgnoreMissingTiles() {
    return this.ignoreMissingTiles;
  }
  setTilePosition(t) {
    this.isMoving() && this.movementStopped$.next(this.movementDirection), this.tilePositionSet$.next(X2({}, t)), this.fire(this.positionChangeStarted$, this.tilePos, t), this.fire(this.positionChangeFinished$, this.tilePos, t), this.movementDirection = "none", this.lastMovementImpulse = "none", this.tilePos = t, this.movementProgress = 0;
  }
  getTilePos() {
    return this.tilePos;
  }
  getNextTilePos() {
    if (!this.isMoving()) return this.tilePos;
    let t = this.tilePos.layer, e = this.tilePosInDirection(this.tilePos.position, this.movementDirection), i = this.tilemap.getTransition(e, this.tilePos.layer);
    return i && (t = i), { position: this.tilePosInDirection(this.tilePos.position, this.movementDirection), layer: t };
  }
  getTileWidth() {
    return this.tileWidth;
  }
  getTileHeight() {
    return this.tileHeight;
  }
  move(t) {
    this.lastMovementImpulse = t, t != "none" && (this.isMoving() || (this.isBlockingDirection(t) ? this.changeFacingDirection(t) : this.startMoving(t)));
  }
  update(t) {
    var e;
    (e = this.movement) == null || e.update(t), this.isMoving() && this.updateCharacterPosition(t), this.lastMovementImpulse = "none";
  }
  getMovementDirection() {
    return this.movementDirection;
  }
  isBlockingDirection(t) {
    if (t == "none") return false;
    let e = this.tilePosInDirection(this.getNextTilePos().position, t), i = this.tilemap.getTransition(e, this.getNextTilePos().layer) || this.getNextTilePos().layer;
    return this.collidesWithTilesInternal && this.isTileBlocking(t, i) ? true : this.isCharBlocking(t, i);
  }
  isTileBlocking(t, e) {
    return this.someCharTile((i, n) => {
      let o = this.tilePosInDirection(new m(i, n), t);
      return this.tilemap.hasBlockingTile(o, e, Ki(t), this.ignoreMissingTiles);
    });
  }
  isCharBlocking(t, e) {
    return this.someCharTile((i, n) => {
      let o = this.tilePosInDirection(new m(i, n), t);
      return this.tilemap.hasBlockingChar(o, e, this.getCollisionGroups(), /* @__PURE__ */ new Set([this.getId()]));
    });
  }
  isMoving() {
    return this.movementDirection != "none";
  }
  turnTowards(t) {
    this.isMoving() || t != "none" && this.changeFacingDirection(t);
  }
  changeFacingDirection(t) {
    this.facingDirection !== t && (this.facingDirection = t, this.directionChanged$.next(t));
  }
  getFacingDirection() {
    return this.facingDirection;
  }
  getFacingPosition() {
    return this._tilePos.position.add(vt2(this.facingDirection));
  }
  addCollisionGroup(t) {
    this.collisionGroups.add(t);
  }
  setCollisionGroups(t) {
    this.collisionGroups = new Set(t);
  }
  getCollisionGroups() {
    return Array.from(this.collisionGroups);
  }
  hasCollisionGroup(t) {
    return this.collisionGroups.has(t);
  }
  removeCollisionGroup(t) {
    this.collisionGroups.delete(t);
  }
  removeAllCollisionGroups() {
    this.collisionGroups.clear();
  }
  addLabels(t) {
    for (let e of t) this.labels.add(e);
  }
  getLabels() {
    return [...this.labels.values()];
  }
  hasLabel(t) {
    return this.labels.has(t);
  }
  clearLabels() {
    this.labels.clear();
  }
  removeLabels(t) {
    for (let e of t) this.labels.delete(e);
  }
  getNumberOfDirections() {
    return this.numberOfDirections;
  }
  movementStarted() {
    return this.movementStarted$;
  }
  movementStopped() {
    return this.movementStopped$;
  }
  directionChanged() {
    return this.directionChanged$;
  }
  tilePositionSet() {
    return this.tilePositionSet$;
  }
  positionChangeStarted() {
    return this.positionChangeStarted$;
  }
  positionChangeFinished() {
    return this.positionChangeFinished$;
  }
  autoMovementSet() {
    return this.autoMovementSet$;
  }
  depthChanged() {
    return this.depthChanged$;
  }
  getMovementProgress() {
    return this.movementProgress;
  }
  hasWalkedHalfATile() {
    return this.movementProgress > ee2 / 2;
  }
  updateCharacterPosition(t) {
    let i = t / 1e3, n = Math.floor(i * this.speed * ee2), o = this.movementProgress + n >= ee2, a3 = 1 - (o ? ee2 - this.movementProgress : n) / n;
    this.movementProgress = Math.min(this.movementProgress + n, ee2), o && (this.movementProgress = 0, this.shouldContinueMoving() ? (this.fire(this.positionChangeFinished$, this.tilePos, this.getNextTilePos()), this.tilePos = this.getNextTilePos(), this.startMoving(this.lastMovementImpulse), a3 > 0 && this.updateCharacterPosition(t * a3)) : this.stopMoving());
  }
  get tilePos() {
    return P.clone(this._tilePos);
  }
  set tilePos(t) {
    P.copyOver(t, this._tilePos);
  }
  startMoving(t) {
    t !== "none" && (t != this.movementDirection && this.movementStarted$.next(t), this.movementDirection = t, this.facingDirection = t, this.fire(this.positionChangeStarted$, this.tilePos, this.getNextTilePos()));
  }
  tilePosInDirection(t, e) {
    return t.add(vt2(this.tilemap.toMapDirection(e)));
  }
  shouldContinueMoving() {
    return this.lastMovementImpulse !== "none" && !this.isBlockingDirection(this.lastMovementImpulse);
  }
  stopMoving() {
    if (this.movementDirection === "none") return;
    let t = this.tilePos, e = this.getNextTilePos(), i = this.movementDirection;
    this.tilePos = this.getNextTilePos(), this.movementDirection = "none", this.movementStopped$.next(i), this.fire(this.positionChangeFinished$, t, e);
  }
  fire(t, { position: e, layer: i }, { position: n, layer: o }) {
    t.next({ exitTile: e, enterTile: n, exitLayer: i, enterLayer: o });
  }
  someCharTile(t) {
    let e = this.getNextTilePos().position;
    for (let i = e.x; i < e.x + this.getTileWidth(); i++) for (let n = e.y; n < e.y + this.getTileHeight(); n++) if (t(i, n)) return true;
    return false;
  }
};
var Me = class {
  constructor(t, e) {
    this.walkingAnimationMapping = t;
    this.charsInRow = e;
    this.lastFootLeft = false;
    this.directionToFrameRow = { ["down"]: 0, ["down-left"]: 1, ["down-right"]: 2, ["left"]: 1, ["right"]: 2, ["up"]: 3, ["up-left"]: 1, ["up-right"]: 2 };
    this._isEnabled = true;
    this.frameChange$ = new L();
    this.setWalkingAnimationMapping(t);
  }
  frameChange() {
    return this.frameChange$;
  }
  setIsEnabled(t) {
    this._isEnabled = t;
  }
  isEnabled() {
    return this._isEnabled;
  }
  updateCharacterFrame(t, e, i) {
    this._isEnabled && (e ? this.setStandingFrameDuringWalk(t, i) : this.setWalkingFrame(t));
  }
  setStandingFrame(t) {
    this._isEnabled && this._setStandingFrame(t);
  }
  setWalkingAnimationMapping(t) {
    this.walkingAnimationMapping = t, this._isEnabled = this.walkingAnimationMapping !== void 0;
  }
  getWalkingAnimationMapping() {
    return this.walkingAnimationMapping;
  }
  getCharsInRow() {
    return this.charsInRow;
  }
  setStandingFrameDuringWalk(t, e) {
    this.isCurrentFrameStanding(t, e) || (this.lastFootLeft = !this.lastFootLeft), this._setStandingFrame(t);
  }
  setWalkingFrame(t) {
    let e = this.framesOfDirection(t);
    e && this.frameChange$.next(this.lastFootLeft ? e.rightFoot : e.leftFoot);
  }
  _setStandingFrame(t) {
    let e = this.framesOfDirection(t);
    e && this.frameChange$.next(e.standing);
  }
  isCurrentFrameStanding(t, e) {
    var i;
    return e === ((i = this.framesOfDirection(t)) == null ? void 0 : i.standing);
  }
  framesOfDirection(t) {
    return typeof this.walkingAnimationMapping == "number" ? this.getFramesForCharIndex(t, this.walkingAnimationMapping) : this.getFramesForAnimationMapping(t);
  }
  getFramesForAnimationMapping(t) {
    if (this.walkingAnimationMapping) return this.walkingAnimationMapping[t] || this.walkingAnimationMapping[this.fallbackDirection(t)];
  }
  fallbackDirection(t) {
    switch (t) {
      case "down-left":
        return "left";
      case "down-right":
        return "right";
      case "up-left":
        return "left";
      case "up-right":
        return "right";
    }
    return t;
  }
  getFramesForCharIndex(t, e) {
    var u;
    let i = Math.floor(e / this.charsInRow), n = e % this.charsInRow, o = this.charsInRow * Me.FRAMES_CHAR_ROW, s = Me.FRAMES_CHAR_ROW * n, a3 = ((u = this.directionToFrameRow[t]) != null ? u : 0) + i * Me.FRAMES_CHAR_COL, h = s + a3 * o;
    return { rightFoot: h, standing: h + 1, leftFoot: h + 2 };
  }
};
var re3 = Me;
re3.FRAMES_CHAR_ROW = 3, re3.FRAMES_CHAR_COL = 4;
var fe = class {
  static shiftPad(t, e) {
    let i = Math.floor(t), o = `${i}`.padStart(e, "0").length;
    return i / Math.pow(10, o);
  }
};
var gr3 = ((n) => (n.DONT_BLOCK = "DONT_BLOCK", n.BLOCK_TWO_TILES = "BLOCK_TWO_TILES", n.BLOCK_ONE_TILE_AHEAD = "BLOCK_ONE_TILE_AHEAD", n.BLOCK_ONE_TILE_BEHIND = "BLOCK_ONE_TILE_BEHIND", n))(gr3 || {});
var me = ((i) => (i.STOP = "STOP", i.CLOSEST_REACHABLE = "CLOSEST_REACHABLE", i.RETRY = "RETRY", i))(me || {});
var O = class {
  static vec2str(t) {
    return `${t.x}#${t.y}`;
  }
  static equal(t, e) {
    return O.vec2str(t) == O.vec2str(e);
  }
  static manhattanDistance(t, e) {
    let i = Math.abs(t.x - e.x), n = Math.abs(t.y - e.y);
    return i + n;
  }
  static chebyshevDistance(t, e) {
    let i = Math.abs(t.x - e.x), n = Math.abs(t.y - e.y);
    return Math.max(i, n);
  }
  static scalarMult(t, e) {
    return t.clone().multiply(new m(e, e));
  }
};
var yr2 = class {
  distance(t, e) {
    return O.manhattanDistance(t, e);
  }
  direction(t, e) {
    if (O.equal(t, e)) return "none";
    let i = t.clone().subtract(e);
    return Math.abs(i.x) > Math.abs(i.y) ? i.x > 0 ? "left" : "right" : i.y > 0 ? "up" : "down";
  }
  neighbors(t) {
    return [new m(t.x, t.y + 1), new m(t.x + 1, t.y), new m(t.x - 1, t.y), new m(t.x, t.y - 1)];
  }
  getDirections() {
    return ["up", "right", "down", "left"];
  }
};
var vr2 = class {
  distance(t, e) {
    return O.chebyshevDistance(t, e);
  }
  neighbors(t) {
    let e = [new m(t.x, t.y + 1), new m(t.x + 1, t.y), new m(t.x - 1, t.y), new m(t.x, t.y - 1)], i = [new m(t.x + 1, t.y + 1), new m(t.x + 1, t.y - 1), new m(t.x - 1, t.y + 1), new m(t.x - 1, t.y - 1)];
    return [...e, ...i];
  }
  direction(t, e) {
    return e.x > t.x ? e.y > t.y ? "down-right" : e.y < t.y ? "up-right" : "right" : e.x < t.x ? e.y > t.y ? "down-left" : e.y < t.y ? "up-left" : "left" : e.y < t.y ? "up" : e.y > t.y ? "down" : "none";
  }
  getDirections() {
    return ["up", "right", "down", "left", "down-left", "down-right", "up-right", "up-left"];
  }
};
var lt = class {
  static create(t) {
    switch (t) {
      case 4:
        return new yr2();
      case 8:
        return new vr2();
    }
  }
};
var Re = class {
  constructor(t, e, i) {
    this.backoffMs = t;
    this.maxRetries = e;
    this.onFinished = i;
    this.retries = 0;
    this.elapsed = 0;
  }
  retry(t, e) {
    this.shouldRetry() ? (this.elapsed += t, this.elapsed >= this.backoffMs && (this.elapsed = 0, this.retries++, e())) : this.onFinished();
  }
  reset() {
    this.retries = 0, this.elapsed = 0;
  }
  getMaxRetries() {
    return this.maxRetries;
  }
  getBackoffMs() {
    return this.backoffMs;
  }
  shouldRetry() {
    return this.maxRetries === -1 || this.retries < this.maxRetries;
  }
};
var Fe = ((i) => (i.WAIT = "WAIT", i.RETRY = "RETRY", i.STOP = "STOP", i))(Fe || {});
var Ot = class {
  constructor(t, { shortestPathAlgorithm: e = "BFS", pathWidth: i = 1, pathHeight: n = 1, numberOfDirections: o = 4, isPositionAllowed: s = (d, g) => true, collisionGroups: a3 = [], ignoredChars: h = [], ignoreTiles: u = false, ignoreMapBounds: l = false, ignoreBlockedTarget: c = false, maxPathLength: p = 1 / 0, ignoreLayers: f = false } = {}) {
    this.gridTilemap = t;
    this.options = { shortestPathAlgorithm: e, pathWidth: i, pathHeight: n, numberOfDirections: o, isPositionAllowed: s, collisionGroups: a3, ignoredChars: h, ignoreTiles: u, ignoreMapBounds: l, ignoreBlockedTarget: c, maxPathLength: p, ignoreLayers: f };
  }
  findShortestPath(t, e) {
    this.options.ignoreLayers && (this.gridTilemap.fixCacheLayer(t.layer), e.layer = t.layer);
    let i = this.findShortestPathImpl(t, e);
    return this.gridTilemap.unfixCacheLayers(), i;
  }
  getNeighbors(t, e) {
    var s;
    return lt.create((s = this.options.numberOfDirections) != null ? s : 4).neighbors(t.position).map((a3) => {
      let h = t.layer;
      return this.options.ignoreLayers || (h = this.gridTilemap.getTransition(a3, t.layer)), { position: a3, layer: h || t.layer };
    }).filter((a3) => !this.isBlocking(t, a3) || this.options.ignoreBlockedTarget && P.equal(a3, e));
  }
  getTransition(t, e) {
    if (!this.options.ignoreLayers) return this.gridTilemap.getTransition(t, e);
  }
  isBlocking(t, e) {
    return !(this.options.ignoreMapBounds || this.gridTilemap.isInRange(e.position)) || !this.options.isPositionAllowed(e.position, e.layer) || !this.options.ignoreTiles && this.hasBlockingTileFrom(t, e, this.options.pathWidth, this.options.pathHeight, this.options.ignoreMapBounds, this.gridTilemap) ? true : this.hasBlockingCharFrom(e, this.options.pathWidth, this.options.pathHeight, this.options.collisionGroups, this.options.ignoredChars, this.gridTilemap);
  }
  distance(t, e) {
    return (this.options.numberOfDirections === 4 ? O.manhattanDistance : O.chebyshevDistance)(t, e);
  }
  getTilePosInDir(t, e) {
    return this.gridTilemap.getTilePosInDirection(t, e);
  }
  getReverseNeighbors(t, e) {
    var a3;
    let n = lt.create((a3 = this.options.numberOfDirections) != null ? a3 : 4).neighbors(t.position), o;
    if (!this.options.ignoreLayers) {
      let h = this.gridTilemap.getReverseTransitions(t.position, t.layer);
      o = h ? [...h] : void 0;
    }
    return n.map((h) => o ? o.map((u) => ({ position: h, layer: u || t.layer })) : [{ position: h, layer: t.layer }]).flat().filter((h) => !this.isBlocking(h, t) || this.options.ignoreBlockedTarget && P.equal(t, e));
  }
  hasBlockingCharFrom(t, e, i, n, o, s) {
    for (let a3 = t.position.x; a3 < t.position.x + e; a3++) for (let h = t.position.y; h < t.position.y + i; h++) if (s.hasBlockingChar(new m(a3, h), t.layer, n, new Set(o))) return true;
    return false;
  }
  hasBlockingTileFrom(t, e, i, n, o, s) {
    for (let a3 = e.position.x; a3 < e.position.x + i; a3++) for (let h = e.position.y; h < e.position.y + n; h++) if (s.hasBlockingTile(new m(a3, h), e.layer, St2(e.position, t.position), o)) return true;
    return false;
  }
};
var _n2 = ji3(Pr2());
var wr = class extends Ot {
  findShortestPathImpl(t, e) {
    let i = this.shortestPathBfs(t, e);
    return { path: this.returnPath(i.previous, t, e), closestToTarget: i.closestToTarget, steps: i.steps, maxPathLengthReached: i.maxPathLengthReached, algorithmUsed: "A_STAR" };
  }
  shortestPathBfs(t, e) {
    let i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = new _n2.MinFibonacciHeap((l, c) => ze(o, l) - ze(o, c)), a3 = t, h = this.distance(t.position, e.position), u = 0;
    for (s.push(t), n.set(P.toString(t), 0), o.set(P.toString(t), this.distance(t.position, e.position)); s.size > 0; ) {
      let l = s.pop();
      if (!l) break;
      u++;
      let c = this.distance(l.position, e.position);
      if (c < h && (h = c, a3 = l), kn(l, e)) return { previous: i, closestToTarget: a3, steps: u, maxPathLengthReached: false };
      if (ze(n, l) + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: a3, steps: u, maxPathLengthReached: true };
      for (let p of this.getNeighbors(l, e)) {
        let f = ze(n, l) + 1, d = P.toString(p);
        (!n.has(d) || f < ze(n, p)) && (i.set(d, l), n.set(d, f), o.set(d, f + this.distance(p.position, e.position)), s.push(p));
      }
    }
    return { previous: i, closestToTarget: a3, steps: u, maxPathLengthReached: false };
  }
  returnPath(t, e, i) {
    let n = [], o = i;
    for (n.push(o); !kn(o, e); ) {
      if (o = t.get(P.toString(o)), !o) return [];
      n.push(o);
    }
    return n.reverse();
  }
};
function ze(r, t) {
  var e;
  return (e = r.get(P.toString(t))) != null ? e : Number.MAX_VALUE;
}
function kn(r, t) {
  return O.equal(r.position, t.position) ? r.layer === t.layer : false;
}
var Tr2 = class {
  constructor(t) {
    this.data = t;
  }
};
var de = class {
  constructor() {
    this.sizeInternal = 0;
  }
  dequeue() {
    if (this.tail === void 0) return;
    this.sizeInternal--;
    let t = this.tail.data;
    return this.tail.prev === void 0 ? (this.tail = void 0, this.head = void 0, t) : (this.tail.prev.next = void 0, this.tail = this.tail.prev, t);
  }
  enqueue(t) {
    if (this.sizeInternal++, this.head === void 0) {
      this.head = new Tr2(t), this.tail = this.head;
      return;
    }
    let e = new Tr2(t);
    e.next = this.head, this.head.prev = e, this.head = e;
  }
  peek() {
    return this.tail ? this.tail.data : void 0;
  }
  size() {
    return this.sizeInternal;
  }
};
var ge = class extends Ot {
  findShortestPathImpl(t, e) {
    let i = this.shortestPathBfs(t, e);
    return { path: this.returnPath(i.previous, t, e), closestToTarget: i.closestToTarget, steps: i.steps, maxPathLengthReached: i.maxPathLengthReached, algorithmUsed: "BFS" };
  }
  equal(t, e) {
    return O.equal(t.position, e.position) ? t.layer === e.layer : false;
  }
  shortestPathBfs(t, e) {
    let i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), o = new de(), s = t, a3 = this.distance(t.position, e.position), h = 0;
    for (o.enqueue({ node: t, dist: 0 }), n.add(P.toString(t)); o.size() > 0; ) {
      let u = o.dequeue();
      if (h++, !u) break;
      let { node: l, dist: c } = u;
      if (c > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: s, steps: h, maxPathLengthReached: true };
      let p = this.distance(l.position, e.position);
      if (p < a3 && (a3 = p, s = l), this.equal(l, e)) return { previous: i, closestToTarget: s, steps: h, maxPathLengthReached: false };
      for (let f of this.getNeighbors(l, e)) n.has(P.toString(f)) || (i.set(P.toString(f), l), o.enqueue({ node: f, dist: c + 1 }), n.add(P.toString(f)));
    }
    return { previous: i, closestToTarget: s, steps: h, maxPathLengthReached: false };
  }
  returnPath(t, e, i) {
    let n = [], o = i;
    for (n.push(o); !this.equal(o, e); ) {
      if (o = t.get(P.toString(o)), !o) return [];
      n.push(o);
    }
    return n.reverse();
  }
};
var xr = class {
  constructor() {
    this.previous = /* @__PURE__ */ new Map();
    this.visited = /* @__PURE__ */ new Map();
    this.queue = new de();
    this.minMatching = 1 / 0;
    this.lastDist = 0;
  }
  isNewFrontier() {
    let t = this.queue.peek();
    return !!(t && t.dist > this.lastDist);
  }
  step(t, e, i) {
    var n;
    this.lastDist = i;
    for (let o of t) {
      let s = P.toString(o);
      if (!this.visited.has(s)) {
        this.previous.set(s, e), this.queue.enqueue({ node: o, dist: i + 1 }), this.visited.set(s, i + 1);
        let a3 = (n = this.otherBfs) == null ? void 0 : n.visited.get(s);
        a3 !== void 0 && a3 < this.minMatching && (this.minMatching = a3, this.minMatchingNode = o);
      }
    }
  }
};
var Sr = class extends Ot {
  findShortestPathImpl(t, e) {
    let i = this.shortestPathBfs(t, e);
    return { path: this.returnPath(i.previous, i.previous2, i.matchingPos, t, e), closestToTarget: i.closestToTarget, steps: i.steps, maxPathLengthReached: i.maxPathLengthReached, algorithmUsed: "BIDIRECTIONAL_SEARCH" };
  }
  equal(t, e) {
    return O.equal(t.position, e.position) ? t.layer === e.layer : false;
  }
  shortestPathBfs(t, e) {
    var h;
    if (P.equal(t, e)) return { previous: /* @__PURE__ */ new Map(), previous2: /* @__PURE__ */ new Map(), closestToTarget: t, steps: 0, maxPathLengthReached: false };
    let i = new xr(), n = new xr(), o = 0;
    i.otherBfs = n, n.otherBfs = i;
    let s = t, a3 = this.distance(t.position, e.position);
    for (i.queue.enqueue({ node: t, dist: 0 }), n.queue.enqueue({ node: e, dist: 0 }), i.visited.set(P.toString(t), 0), n.visited.set(P.toString(e), 0); i.queue.size() > 0 || n.queue.size() > 0; ) {
      let u = i.queue.dequeue();
      if (!u) break;
      let { node: l, dist: c } = u;
      if (c + 1 + (((h = n.queue.peek()) == null ? void 0 : h.dist) || 0) > this.options.maxPathLength) return { previous: i.previous, previous2: n.previous, closestToTarget: s, steps: o, maxPathLengthReached: true };
      let p = this.distance(l.position, e.position);
      if (p < a3 && (a3 = p, s = l), o++, i.step(this.getNeighbors(l, e), l, c), i.isNewFrontier() && i.minMatchingNode) return { previous: i.previous, previous2: n.previous, closestToTarget: e, matchingPos: i.minMatchingNode, steps: o, maxPathLengthReached: false };
      let f = n.queue.dequeue();
      if (!f) continue;
      let { node: d, dist: g } = f;
      if (o++, n.step(this.getReverseNeighbors(d, e), d, g), n.isNewFrontier() && n.minMatchingNode) return { previous: i.previous, previous2: n.previous, closestToTarget: e, matchingPos: n.minMatchingNode, steps: o, maxPathLengthReached: false };
    }
    return { previous: i.previous, previous2: n.previous, closestToTarget: s, steps: o, maxPathLengthReached: false };
  }
  returnPath(t, e, i, n, o) {
    if (i) {
      let s = this.getPathFromPrev(t, n, i).reverse(), a3 = this.getPathFromPrev(e, o, i);
      return s.pop(), [...s, ...a3];
    } else return this.getPathFromPrev(t, n, o).reverse();
  }
  getPathFromPrev(t, e, i) {
    let n = [], o = i;
    for (n.push(o); !this.equal(o, e); ) {
      if (o = t.get(P.toString(o)), !o) return [];
      n.push(o);
    }
    return n;
  }
};
var _i2 = ji3(Qs());
var Le = class extends Ot {
  constructor(e, i = {}) {
    super(e, i);
    this.openSet = new _i2.MinFibonacciHeap();
    this.g = /* @__PURE__ */ new Map();
    this.f = /* @__PURE__ */ new Map();
    this.closestToTarget = { position: new m(0, 0), layer: void 0 };
    this.smallestDistToTarget = 0;
    this.steps = 0;
    this.maxFrontierSize = 0;
    this.maxJumpSize = 0;
    this.turnOrder = { ["right"]: 0, ["down-right"]: 1, ["down"]: 2, ["down-left"]: 3, ["left"]: 4, ["up-left"]: 5, ["up"]: 6, ["up-right"]: 7 };
    this.turnTimes = Du();
    this.distanceUtils = lt.create(4);
  }
  findShortestPathImpl(e, i) {
    this.maxJumpSize = this.distance(e.position, i.position);
    let n = this.shortestPath(e, i);
    return { path: this.returnPath(n.previous, e, i), closestToTarget: n.closestToTarget, steps: n.steps, maxPathLengthReached: n.maxPathLengthReached, algorithmUsed: "JPS" };
  }
  shortestPath(e, i) {
    this.steps = 0;
    let n = /* @__PURE__ */ new Map();
    this.g = /* @__PURE__ */ new Map(), this.f = /* @__PURE__ */ new Map(), this.closestToTarget = e, this.smallestDistToTarget = this.distance(e.position, i.position), this.openSet = new _i2.MinFibonacciHeap((s, a3) => Ge2(this.f, s) - Ge2(this.f, a3)), this.openSet.push(e);
    let o = P.toString(e);
    for (this.g.set(o, 0), this.f.set(o, this.distance(e.position, i.position)), this.maxFrontierSize = Math.max(this.maxFrontierSize, this.openSet.size); this.openSet.size > 0; ) {
      let s = this.openSet.pop();
      if (!s) break;
      if (this.steps++, P.equal(s, i)) return { previous: n, closestToTarget: i, steps: this.steps, maxPathLengthReached: false };
      if (Ge2(this.g, s) + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: this.closestToTarget, steps: this.steps, maxPathLengthReached: true };
      this.updateClosestToTarget(s, i);
      for (let a3 of this.getNeighborsInternal(s, n.get(P.toString(s)), i)) {
        let h = P.toString(a3.p), u = Ge2(this.g, s) + a3.dist;
        (!this.g.has(h) || u < Ge2(this.g, a3.p)) && (n.set(h, s), this.g.set(h, u), this.f.set(h, u + this.distance(a3.p.position, i.position)), this.openSet.push(a3.p));
      }
    }
    return { previous: n, closestToTarget: this.closestToTarget, steps: this.steps, maxPathLengthReached: false };
  }
  updateClosestToTarget(e, i) {
    let n = this.distance(e.position, i.position);
    n < this.smallestDistToTarget && (this.smallestDistToTarget = n, this.closestToTarget = e);
  }
  getNeighborsInternal(e, i, n) {
    if (!i || e.layer !== i.layer) return this.getNeighbors(e, n).map((a3) => ({ p: a3, dist: 1 }));
    let o = this.prune(i, e).map((a3) => {
      let h = this.getTransition(a3.position, e.layer);
      return { position: a3.position, layer: h || e.layer };
    }), s = [];
    for (let a3 of o) {
      let h = this.jump(e, a3, n, 1);
      h && s.push(h);
    }
    return s;
  }
  jump(e, i, n, o) {
    let s = this.distanceUtils.direction(e.position, i.position);
    if (!(this.isBlocking(e, i) && !(P.equal(i, n) && this.options.ignoreBlockedTarget))) return P.equal(i, n) ? { p: i, dist: o } : o >= this.maxJumpSize ? { p: i, dist: o } : this.getTransition(i.position, e.layer) !== void 0 ? { p: i, dist: o } : $r2(s) ? { p: i, dist: o } : this.getForced(e, i).length > 0 ? { p: i, dist: o } : (this.updateClosestToTarget(i, n), this.jump(i, this.getTilePosInDir(i, St2(e.position, i.position)), n, o + 1));
  }
  getForced(e, i) {
    let n = [], o = this.posInDir(i, this.distanceUtils.direction(i.position, e.position)), { topLeft: s, downLeft: a3, top: h, bottom: u } = this.normalizedPositions(o, i), l = (p, f) => this.isBlocking(p, f) || this.getTransition(f.position, f.layer) !== void 0, c = this.distanceUtils.direction(e.position, i.position);
    return $i(c) && ((l(o, a3) || l(a3, u)) && !this.isBlocking(i, u) && n.push(u), (l(o, s) || l(s, h)) && !this.isBlocking(i, h) && n.push(h)), n;
  }
  prune(e, i) {
    let { right: n, top: o, bottom: s } = this.normalizedPositions(e, i), a3 = this.getForced(e, i), h = St2(e.position, i.position);
    return $r2(h) ? [n, o, s] : [n, ...a3];
  }
  normalizedPositions(e, i) {
    var o, s, a3, h, u, l, c;
    let n = St2(e.position, i.position);
    return { topLeft: this.posInDir(i, ((o = this.turnTimes.get("up-left")) == null ? void 0 : o.get(this.turnOrder[n])) || "up-left"), downLeft: this.posInDir(i, ((s = this.turnTimes.get("down-left")) == null ? void 0 : s.get(this.turnOrder[n])) || "down-left"), downRight: this.posInDir(i, ((a3 = this.turnTimes.get("down-right")) == null ? void 0 : a3.get(this.turnOrder[n])) || "down-right"), topRight: this.posInDir(i, ((h = this.turnTimes.get("up-right")) == null ? void 0 : h.get(this.turnOrder[n])) || "up-right"), top: this.posInDir(i, ((u = this.turnTimes.get("up")) == null ? void 0 : u.get(this.turnOrder[n])) || "up"), bottom: this.posInDir(i, ((l = this.turnTimes.get("down")) == null ? void 0 : l.get(this.turnOrder[n])) || "down"), right: this.posInDir(i, ((c = this.turnTimes.get("right")) == null ? void 0 : c.get(this.turnOrder[n])) || "right") };
  }
  posInDir(e, i) {
    return { position: e.position.add(vt2(i)), layer: e.layer };
  }
  returnPath(e, i, n) {
    let o = [], s = n;
    for (o.push(s); !P.equal(s, i); ) {
      let a3 = e.get(P.toString(s));
      if (!a3) return [];
      this.distance(a3.position, s.position) > 1 ? this.fillPath(s, a3, o) : o.push(a3), s = a3;
    }
    return o.reverse();
  }
  fillPath(e, i, n) {
    let o = e;
    do {
      let s = St2(o.position, i.position);
      o = this.getTilePosInDir(o, s), n.push(o);
    } while (!O.equal(o.position, i.position));
  }
};
function Ge2(r, t) {
  var e;
  return (e = r.get(P.toString(t))) != null ? e : Number.MAX_VALUE;
}
function Du() {
  let r = ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"], t = /* @__PURE__ */ new Map();
  for (let e = 0; e < r.length; e++) {
    let i = /* @__PURE__ */ new Map(), n = r[e];
    i.set(0, n);
    for (let o = 1; o <= 7; o++) n = $e(n), i.set(o, n);
    t.set(r[e], i);
  }
  return t;
}
var kr = class {
  constructor(t, e, i, n = {}) {
    this.character = t;
    this.gridTilemap = e;
    this.charToFollow = i;
    let o = { distance: 0, noPathFoundStrategy: "STOP", maxPathLength: 1 / 0, shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH", ignoreLayers: false };
    this.options = X2(X2({}, o), n), this.character = t, this.updateTarget(this.charToFollow.getTilePos().position, this.charToFollow.getTilePos().layer), this.charToFollow.positionChangeStarted().pipe(q2(this.character.autoMovementSet().pipe(it((s) => s !== this), gt(1)))).subscribe(({ enterTile: s, enterLayer: a3 }) => {
      this.updateTarget(s, a3);
    });
  }
  update(t) {
    var e;
    (e = this.targetMovement) == null || e.update(t);
  }
  getInfo() {
    return { type: "Follow", config: { charToFollow: this.charToFollow.getId(), distance: this.options.distance, noPathFoundStrategy: this.options.noPathFoundStrategy, maxPathLength: this.options.maxPathLength, ignoreLayers: this.options.ignoreLayers } };
  }
  updateTarget(t, e) {
    this.targetMovement = new Ee(this.character, this.gridTilemap, { position: new m(t), layer: e }, { distance: this.options.distance + 1, config: { algorithm: this.options.shortestPathAlgorithm, noPathFoundStrategy: this.options.noPathFoundStrategy, maxPathLength: this.options.maxPathLength, ignoreLayers: this.options.ignoreLayers }, ignoreBlockedTarget: true });
  }
};
var Ne2 = class {
  static getRandomInt(t) {
    return Math.floor(Math.random() * Math.floor(t));
  }
};
var _r = class {
  constructor(t, e = 0, i = -1) {
    this.character = t;
    this.delay = e;
    this.radius = i;
    this.stepSize = 0;
    this.delayLeft = this.delay, this.initialRow = t.getNextTilePos().position.y, this.initialCol = t.getNextTilePos().position.x, this.randomizeStepSize(), this.stepsWalked = 0, this.currentMovementDirection = "none", this.character.positionChangeStarted().pipe(q2(this.character.autoMovementSet().pipe(it((n) => n !== this), gt(1)))).subscribe(() => {
      this.stepsWalked++;
    }), this.distanceUtils = lt.create(t.getNumberOfDirections());
  }
  update(t) {
    if (this.shouldContinueWalkingCurrentDirection()) this.character.move(this.currentMovementDirection);
    else if (this.delayLeft -= t, this.delayLeft <= 0) {
      this.delayLeft = this.delay;
      let e = this.getFreeRandomDirection();
      this.stepsWalked = 0, this.character.move(e), this.currentMovementDirection = e, this.randomizeStepSize();
    }
  }
  getInfo() {
    return { type: "Random", config: { delay: this.delay, radius: this.radius } };
  }
  shouldContinueWalkingCurrentDirection() {
    return this.stepsWalked < this.stepSize && this.currentMovementDirection !== "none" && !this.character.isBlockingDirection(this.currentMovementDirection) && this.isWithinRadius(this.currentMovementDirection);
  }
  getFreeDirections() {
    return this.distanceUtils.getDirections().filter((e) => !this.character.isBlockingDirection(e)).filter((e) => this.isWithinRadius(e));
  }
  isWithinRadius(t) {
    return this.radius == -1 ? true : this.getDist(t) <= this.radius;
  }
  getDist(t) {
    return this.distanceUtils.distance(this.character.getNextTilePos().position.add(vt2(t)), new m(this.initialCol, this.initialRow));
  }
  getFreeRandomDirection() {
    let t = this.getFreeDirections();
    return t.length == 0 ? "none" : t[Ne2.getRandomInt(t.length)];
  }
  randomizeStepSize() {
    this.stepSize = Ne2.getRandomInt(this.radius) + 1;
  }
};
function Zs(r, t) {
  return r.filter((e) => {
    var i, n, o, s, a3, h;
    return (i = t.labels) != null && i.withAllLabels ? (n = t.labels) == null ? void 0 : n.withAllLabels.every((u) => e.hasLabel(u)) : (o = t.labels) != null && o.withOneOfLabels ? (s = t.labels) == null ? void 0 : s.withOneOfLabels.some((u) => e.hasLabel(u)) : (a3 = t.labels) != null && a3.withNoneLabels ? !((h = t.labels) != null && h.withNoneLabels.some((u) => e.hasLabel(u))) : true;
  });
}
var zr2 = "2.28.0";
var Vr = class {
  constructor(t) {
    this.collistionStrategy = t;
    this.tilePosToCharacters = /* @__PURE__ */ new Map();
    this.charRemoved$ = new L();
  }
  isCharBlockingAt(t, e, i, n = /* @__PURE__ */ new Set()) {
    if (i.length === 0) return false;
    let o = this.posToString(t, e), s = this.tilePosToCharacters.get(o);
    return !!(s && s.size > 0 && [...s].filter((a3) => !n.has(a3.getId())).some((a3) => a3.getCollisionGroups().some((h) => i.includes(h))));
  }
  getCharactersAt(t, e) {
    let i = this.posToString(t, e), n = this.tilePosToCharacters.get(i);
    return new Set(n);
  }
  addCharacter(t) {
    this.addTilePositions(t.getTilePos(), t), this.addTilePositions(t.getNextTilePos(), t), this.addPositionChangeSub(t), this.addPositionChangeFinishedSub(t), this.addTilePosSetSub(t);
  }
  removeCharacter(t) {
    let e = t.getId();
    this.charRemoved$.next(e), this.deleteTilePositions(t.getTilePos(), t), this.deleteTilePositions(t.getNextTilePos(), t);
  }
  add(t, e) {
    var i;
    this.tilePosToCharacters.has(t) || this.tilePosToCharacters.set(t, /* @__PURE__ */ new Set()), (i = this.tilePosToCharacters.get(t)) == null || i.add(e);
  }
  addTilePosSetSub(t) {
    t.tilePositionSet().pipe(q2(this.charRemoved(t.getId()))).subscribe((e) => {
      this.deleteTilePositions(t.getNextTilePos(), t), this.addTilePositions(e, t);
    });
  }
  charRemoved(t) {
    var e;
    return (e = this.charRemoved$) == null ? void 0 : e.pipe(gt(1), it((i) => i == t));
  }
  addPositionChangeSub(t) {
    t.positionChangeStarted().pipe(q2(this.charRemoved(t.getId())), this.posChangeToLayerPos()).subscribe((e) => {
      this.collistionStrategy === "BLOCK_ONE_TILE_AHEAD" && this.deleteTilePositions(e.exit, t), this.addTilePositions(e.enter, t);
    });
  }
  addPositionChangeFinishedSub(t) {
    t.positionChangeFinished().pipe(q2(this.charRemoved(t.getId())), this.posChangeToLayerPos()).subscribe((e) => {
      this.deleteTilePositions(e.exit, t), this.addTilePositions(e.enter, t);
    });
  }
  addTilePositions(t, e) {
    this.forEachCharTile(t, e, (i, n) => {
      this.add(this.posToString(new m(i, n), t.layer), e);
    });
  }
  deleteTilePositions(t, e) {
    this.forEachCharTile(t, e, (i, n) => {
      var o;
      (o = this.tilePosToCharacters.get(this.posToString(new m(i, n), t.layer))) == null || o.delete(e);
    });
  }
  forEachCharTile(t, e, i) {
    let n = t.position;
    for (let o = n.x; o < n.x + e.getTileWidth(); o++) for (let s = n.y; s < n.y + e.getTileHeight(); s++) i(o, s);
  }
  posChangeToLayerPos() {
    return Zr(Et((t) => ({ enter: { position: new m(t.enterTile), layer: t.enterLayer }, exit: { position: new m(t.exitTile), layer: t.exitLayer } })));
  }
  posToString(t, e) {
    return `${t.x}#${t.y}#${e}`;
  }
};
var Kt = class {
  constructor(t, e, i, n) {
    this.x = t;
    this.y = e;
    this.width = i;
    this.height = n;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  isInRange(t) {
    return t.x >= this.x && t.x < this.x + this.width && t.y >= this.y && t.y < this.y + this.height;
  }
};
var Hr2 = "ge_charLayer";
var ta = 0;
var Mu = 1;
var zi = { ["none"]: 1, ["left"]: 2, ["up-left"]: 3, ["up"]: 4, ["up-right"]: 5, ["right"]: 6, ["down-right"]: 7, ["down"]: 8, ["down-left"]: 9 };
var Gr2 = class {
  constructor(t, e) {
    this.tilemap = t;
    this.gridTilemap = e;
    this.tileCollisionCache = /* @__PURE__ */ new Map();
  }
  fixLayer(t) {
    this.fixedLayer = this.tileCollisionCache.get(t);
  }
  unfixLayers() {
    this.fixedLayer = void 0;
  }
  rebuild(t) {
    t || (t = new Kt(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight()));
    let e = this.tilemap.getLayers().filter((i) => i.isCharLayer());
    for (let i of [...e, void 0]) {
      let n = this.tileCollisionCache.get(i == null ? void 0 : i.getName());
      if (n === void 0) {
        n = new Array(this.tilemap.getWidth());
        for (let o = 0; o < this.tilemap.getWidth(); o++) n[o] = new Array(this.tilemap.getHeight());
        this.tileCollisionCache.set(i == null ? void 0 : i.getName(), n);
      }
      for (let o = t.getY(); o < t.getY() + t.getHeight(); o++) for (let s = t.getX(); s < t.getX() + t.getWidth(); s++) {
        let a3 = 0;
        !this.gridTilemap.hasNoTileUncached(new m(s, o), i == null ? void 0 : i.getName()) && (a3 = Vi2(a3, 0));
        for (let l of je2()) this.gridTilemap.hasBlockingTileUncached(new m(s, o), i == null ? void 0 : i.getName(), l, true) && (a3 = Vi2(a3, zi[l]));
        this.gridTilemap.hasBlockingTileUncached(new m(s, o), i == null ? void 0 : i.getName(), void 0, true) && (a3 = Vi2(a3, zi[1])), n[s][o] = a3;
      }
    }
  }
  hasTileAt(t, e, i) {
    var s;
    let n = this.fixedLayer || this.tileCollisionCache.get(i), o = (s = n == null ? void 0 : n[t]) == null ? void 0 : s[e];
    if (o !== void 0) return Ur2(o, ta);
  }
  isBlockingFrom(t, e, i, n, o) {
    var h;
    let s = this.fixedLayer || this.tileCollisionCache.get(i), a3 = (h = s == null ? void 0 : s[t]) == null ? void 0 : h[e];
    if (a3 !== void 0) return !o && !Ur2(a3, ta) ? true : n === void 0 ? Ur2(a3, Mu) : Ur2(a3, zi[n]);
  }
};
function Vi2(r, t) {
  return r | 1 << t;
}
function Ur2(r, t) {
  return (r >> t & 1) == 1;
}
var Hi = class {
  constructor(t, e, i, n = false) {
    this.tilemap = t;
    this.collisionTilePropertyName = e;
    this.useTileCollisionCache = n;
    this.characters = /* @__PURE__ */ new Map();
    this.transitions = /* @__PURE__ */ new Map();
    this.reverseTransitions = /* @__PURE__ */ new Map();
    this.collidesPropNames = /* @__PURE__ */ new Map();
    this.collisionRelevantLayersFrameCache = /* @__PURE__ */ new Map();
    this.charBlockCache = new Vr(i);
    for (let o of je2()) this.collidesPropNames.set(o, Hi.ONE_WAY_COLLIDE_PROP_PREFIX + o);
    this.useTileCollisionCache && (this.tileCollisionCache = new Gr2(t, this), this.tileCollisionCache.rebuild());
  }
  fixCacheLayer(t) {
    var e;
    (e = this.tileCollisionCache) == null || e.fixLayer(t);
  }
  unfixCacheLayers() {
    var t;
    (t = this.tileCollisionCache) == null || t.unfixLayers();
  }
  addCharacter(t) {
    this.characters.set(t.getId(), t), t.getNextTilePos().layer === void 0 && t.setTilePosition(Qt(X2({}, t.getNextTilePos()), { layer: this.getLowestCharLayer() })), this.charBlockCache.addCharacter(t);
  }
  removeCharacter(t) {
    let e = this.characters.get(t);
    e && (this.charBlockCache.removeCharacter(e), this.characters.delete(t));
  }
  getCharacters() {
    return [...this.characters.values()];
  }
  getCharactersAt(t, e) {
    return this.charBlockCache.getCharactersAt(t, e);
  }
  rebuildTileCollisionCache(t) {
    var e;
    (e = this.tileCollisionCache) == null || e.rebuild(t);
  }
  hasBlockingTileUncached(t, e, i, n) {
    if (!n && this.hasNoTileUncached(t, e)) return true;
    let o = this.getCollisionRelevantLayers(e);
    for (let s of o) if (this.isLayerBlockingAt(s.getName(), t, i)) return true;
    return false;
  }
  hasBlockingTile(t, e, i, n) {
    var s;
    let o = (s = this.tileCollisionCache) == null ? void 0 : s.isBlockingFrom(t.x, t.y, e, i, n);
    return o !== void 0 ? o : this.hasBlockingTileUncached(t, e, i, n);
  }
  getTransition(t, e) {
    let i = this.transitions.get(t.toString());
    if (i) return i.get(e);
  }
  getReverseTransitions(t, e) {
    let i = this.reverseTransitions.get(t.toString());
    if (i) return i.get(e);
  }
  setTransition(t, e, i) {
    var n, o, s, a3, h;
    this.transitions.has(t.toString()) || this.transitions.set(t.toString(), /* @__PURE__ */ new Map()), this.reverseTransitions.has(t.toString()) || this.reverseTransitions.set(t.toString(), /* @__PURE__ */ new Map()), (n = this.transitions.get(t.toString())) == null || n.set(e, i), (o = this.reverseTransitions.get(t.toString())) != null && o.has(i) || (s = this.reverseTransitions.get(t.toString())) == null || s.set(i, /* @__PURE__ */ new Set()), (h = (a3 = this.reverseTransitions.get(t.toString())) == null ? void 0 : a3.get(i)) == null || h.add(e);
  }
  getTransitions() {
    return new Map([...this.transitions].map(([t, e]) => [t, new Map(e)]));
  }
  hasNoTileUncached(t, e) {
    return !this.getCollisionRelevantLayers(e).some((n) => this.tilemap.hasTileAt(t.x, t.y, n.getName()));
  }
  hasNoTile(t, e) {
    var n;
    let i = (n = this.tileCollisionCache) == null ? void 0 : n.hasTileAt(t.x, t.y, e);
    return i !== void 0 ? i : this.hasNoTileUncached(t, e);
  }
  hasBlockingChar(t, e, i, n = /* @__PURE__ */ new Set()) {
    return this.charBlockCache.isCharBlockingAt(t, e, i, n);
  }
  isInRange(t) {
    return new Kt(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight()).isInRange(t);
  }
  toMapDirection(t) {
    return this.isIsometric() ? Yi(t) : t;
  }
  fromMapDirection(t) {
    return this.isIsometric() ? $e(t) : t;
  }
  isIsometric() {
    return this.tilemap.getOrientation() === "isometric";
  }
  getTilePosInDirection(t, e) {
    let i = t.position.add(vt2(this.toMapDirection(e))), n = this.getTransition(i, t.layer) || t.layer;
    return { position: i, layer: n };
  }
  invalidateFrameCache() {
    this.collisionRelevantLayersFrameCache.clear();
  }
  isLayerBlockingAt(t, e, i) {
    let n = this.tilemap.getTileAt(e.x, e.y, t);
    return n ? !!(n.getProperty(this.collisionTilePropertyName) || i && n.getProperty(this.collidesPropNames.get(i) || "")) : false;
  }
  getCharLayerIndexes() {
    return this.tilemap.getLayers().map((t, e) => ({ layer: t, index: e })).filter(({ layer: t }) => t.isCharLayer()).map(({ index: t }) => t);
  }
  findPrevAndCharLayer(t) {
    let e = this.getCharLayerIndexes(), i = this.tilemap.getLayers(), n = e.findIndex((o) => i[o].getProperty(Hr2) == t);
    return n == 0 ? { prevIndex: -1, charLayerIndex: e[n] } : { prevIndex: e[n - 1], charLayerIndex: e[n] };
  }
  getCollisionRelevantLayers(t) {
    if (!t) return this.tilemap.getLayers();
    let e = this.collisionRelevantLayersFrameCache.get(t);
    if (e) return e;
    let { prevIndex: i, charLayerIndex: n } = this.findPrevAndCharLayer(t), o = this.tilemap.getLayers().slice(i + 1, n + 1);
    return this.collisionRelevantLayersFrameCache.set(t, o), o;
  }
  getLowestCharLayer() {
    for (let t of this.tilemap.getLayers()) if (t.isCharLayer()) return t.getName();
  }
};
var Be = Hi;
Be.ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
var Ui = ((e) => (e.REMOVED = "REMOVED", e.ADDED = "ADDED", e))(Ui || {});
var Nr2 = class {
  constructor() {
    this.isCreatedInternal = false;
    console.log(`Using GridEngine v${zr2}`);
  }
  getCharLayer(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.getTilePos().layer;
  }
  getTransition(t, e) {
    var i;
    return this.initGuard(), (i = this.gridTilemap) == null ? void 0 : i.getTransition(new m(t), e);
  }
  setTransition(t, e, i) {
    var n;
    return this.initGuard(), (n = this.gridTilemap) == null ? void 0 : n.setTransition(new m(t), e, i);
  }
  create(t, e) {
    this.isCreatedInternal = true, this.gridCharacters = /* @__PURE__ */ new Map();
    let i = this.setConfigDefaults(e);
    this.config = i, this.movementStopped$ = new L(), this.movementStarted$ = new L(), this.directionChanged$ = new L(), this.positionChangeStarted$ = new L(), this.positionChangeFinished$ = new L(), this.charRemoved$ = new L(), this.charAdded$ = new L(), this.gridTilemap = new Be(t, this.config.collisionTilePropertyName, this.config.characterCollisionStrategy, this.config.cacheTileCollisions), this.addCharacters();
  }
  getPosition(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.getTilePos().position;
  }
  move(t, e) {
    this.moveChar(t, e);
  }
  moveRandomly(t, e = 0, i = -1) {
    var s;
    this.initGuard();
    let n = (s = this.gridCharacters) == null ? void 0 : s.get(t);
    if (!n) throw this.createCharUnknownErr(t);
    let o = new _r(n, e, i);
    n.setMovement(o);
  }
  getMovement(t) {
    var n;
    this.initGuard();
    let e = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    let i = e.getMovement();
    return i ? i.getInfo() : { type: "None" };
  }
  moveTo(t, e, i) {
    var a3;
    let n = this.assembleMoveToConfig(i);
    this.initGuard();
    let o = (a3 = this.gridCharacters) == null ? void 0 : a3.get(t);
    if (!o) throw this.createCharUnknownErr(t);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let s = new Ee(o, this.gridTilemap, { position: new m(e), layer: (i == null ? void 0 : i.targetLayer) || o.getNextTilePos().layer }, { distance: 0, config: n });
    return o.setMovement(s), s.finishedObs().pipe(Et((h) => ({ charId: t, position: h.position, result: h.result, description: h.description, layer: h.layer })));
  }
  stopMovement(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    e.setMovement(void 0);
  }
  setSpeed(t, e) {
    var n;
    this.initGuard();
    let i = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!i) throw this.createCharUnknownErr(t);
    i.setSpeed(e);
  }
  getSpeed(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.getSpeed();
  }
  collidesWithTiles(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.collidesWithTiles();
  }
  update(t, e) {
    var i;
    if (this.isCreatedInternal && this.gridCharacters) for (let [n, o] of this.gridCharacters) o.update(e);
    (i = this.gridTilemap) == null || i.invalidateFrameCache();
  }
  addCharacter(t) {
    var o, s, a3, h, u;
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();
    let e = { speed: t.speed || 4, tilemap: this.gridTilemap, collidesWithTiles: true, collisionGroups: ["geDefault"], charLayer: t.charLayer, facingDirection: t.facingDirection, labels: t.labels, numberOfDirections: (o = t.numberOfDirections) != null ? o : this.config.numberOfDirections, tileWidth: t.tileWidth, tileHeight: t.tileHeight };
    typeof t.collides == "boolean" ? t.collides === false && (e.collidesWithTiles = false, e.collisionGroups = []) : t.collides !== void 0 && (t.collides.collidesWithTiles === false && (e.collidesWithTiles = false), t.collides.collisionGroups && (e.collisionGroups = t.collides.collisionGroups), e.ignoreMissingTiles = (a3 = (s = t.collides) == null ? void 0 : s.ignoreMissingTiles) != null ? a3 : false);
    let i = new mr2(t.id, e);
    t.startPosition && i.setTilePosition({ position: new m(t.startPosition), layer: i.getTilePos().layer }), (h = this.gridCharacters) == null || h.set(t.id, i), this.gridTilemap.addCharacter(i);
    let n = i.getId();
    i.movementStopped().pipe(q2(this.charRemoved(n))).subscribe((l) => {
      var c;
      (c = this.movementStopped$) == null || c.next({ charId: n, direction: l });
    }), i.movementStarted().pipe(q2(this.charRemoved(n))).subscribe((l) => {
      var c;
      (c = this.movementStarted$) == null || c.next({ charId: n, direction: l });
    }), i.directionChanged().pipe(q2(this.charRemoved(n))).subscribe((l) => {
      var c;
      (c = this.directionChanged$) == null || c.next({ charId: n, direction: l });
    }), i.positionChangeStarted().pipe(q2(this.charRemoved(n))).subscribe((l) => {
      var c;
      (c = this.positionChangeStarted$) == null || c.next(X2({ charId: n }, l));
    }), i.positionChangeFinished().pipe(q2(this.charRemoved(n))).subscribe((l) => {
      var c;
      (c = this.positionChangeFinished$) == null || c.next(X2({ charId: n }, l));
    }), (u = this.charAdded$) == null || u.next(n);
  }
  hasCharacter(t) {
    var e;
    return this.initGuard(), !!((e = this.gridCharacters) != null && e.has(t));
  }
  removeCharacter(t) {
    var i, n, o, s;
    if (this.initGuard(), !((i = this.gridCharacters) == null ? void 0 : i.get(t))) throw this.createCharUnknownErr(t);
    (n = this.gridTilemap) == null || n.removeCharacter(t), (o = this.gridCharacters) == null || o.delete(t), (s = this.charRemoved$) == null || s.next(t);
  }
  removeAllCharacters() {
    if (this.initGuard(), !!this.gridCharacters) for (let t of this.gridCharacters.keys()) this.removeCharacter(t);
  }
  getAllCharacters(t) {
    if (this.initGuard(), !this.gridCharacters) return [];
    let e = [...this.gridCharacters.values()];
    return (t ? Zs(e, t) : e).map((n) => n.getId());
  }
  getLabels(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.getLabels();
  }
  addLabels(t, e) {
    var n;
    this.initGuard();
    let i = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!i) throw this.createCharUnknownErr(t);
    i.addLabels(e);
  }
  removeLabels(t, e) {
    var n;
    this.initGuard();
    let i = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!i) throw this.createCharUnknownErr(t);
    i.removeLabels(e);
  }
  clearLabels(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    e.clearLabels();
  }
  follow(t, e, i, n) {
    var u, l, c, p;
    let o;
    i === void 0 ? o = { distance: 0, closestPointIfBlocked: false } : typeof i == "number" ? (o = { distance: i, closestPointIfBlocked: false }, n && (o.closestPointIfBlocked = true)) : o = i, this.initGuard();
    let s = (u = this.gridCharacters) == null ? void 0 : u.get(t), a3 = (l = this.gridCharacters) == null ? void 0 : l.get(e);
    if (!s) throw this.createCharUnknownErr(t);
    if (!a3) throw this.createCharUnknownErr(e);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let h = new kr(s, this.gridTilemap, a3, { distance: o.distance, noPathFoundStrategy: o.closestPointIfBlocked ? "CLOSEST_REACHABLE" : "STOP", maxPathLength: (c = o.maxPathLength) != null ? c : 1 / 0, shortestPathAlgorithm: (p = o.algorithm) != null ? p : "BIDIRECTIONAL_SEARCH", ignoreLayers: !!o.ignoreLayers });
    s.setMovement(h);
  }
  isMoving(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.isMoving();
  }
  getFacingDirection(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.getFacingDirection();
  }
  getFacingPosition(t) {
    var n;
    this.initGuard();
    let e = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    let i = e.getFacingPosition();
    return { x: i.x, y: i.y };
  }
  turnTowards(t, e) {
    var n;
    this.initGuard();
    let i = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!i) throw this.createCharUnknownErr(t);
    return i.turnTowards(e);
  }
  getCharactersAt(t, e) {
    if (!this.gridTilemap) return [];
    let i = this.gridTilemap.getCharactersAt(new m(t), e);
    return Array.from(i).map((n) => n.getId());
  }
  setPosition(t, e, i) {
    var o;
    this.initGuard();
    let n = (o = this.gridCharacters) == null ? void 0 : o.get(t);
    if (!n) throw this.createCharUnknownErr(t);
    i || n.setTilePosition({ position: new m(e), layer: n.getTilePos().layer }), n.setTilePosition({ position: new m(e), layer: i });
  }
  isBlocked(t, e, i = ["geDefault"]) {
    var o, s;
    this.initGuard();
    let n = new m(t);
    return !!((o = this.gridTilemap) != null && o.hasBlockingTile(n, e) || (s = this.gridTilemap) != null && s.hasBlockingChar(n, e, i));
  }
  isTileBlocked(t, e) {
    var i;
    return this.initGuard(), !!((i = this.gridTilemap) != null && i.hasBlockingTile(new m(t), e));
  }
  getCollisionGroups(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.getCollisionGroups() || [];
  }
  setCollisionGroups(t, e) {
    var n;
    this.initGuard();
    let i = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!i) throw this.createCharUnknownErr(t);
    i.setCollisionGroups(e);
  }
  getTilePosInDirection(t, e, i) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let n = this.gridTilemap.getTilePosInDirection({ position: new m(t), layer: e }, i);
    return { position: n.position.toPosition(), charLayer: n.layer };
  }
  findShortestPath(t, e, i = {}) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let o = new Oe(this.gridTilemap).findShortestPath(P.toInternal(t), P.toInternal(e), Qt(X2({}, i), { shortestPathAlgorithm: i.shortestPathAlgorithm || "BFS" }));
    return { path: o.path.map(P.fromInternal), closestToTarget: P.fromInternal(o.closestToTarget), reachedMaxPathLength: false, steps: o.steps };
  }
  steppedOn(t, e, i) {
    return this.positionChangeFinished().pipe(it((n) => t.includes(n.charId) && e.some((o) => o.x === n.enterTile.x && o.y === n.enterTile.y) && (i === void 0 || i.includes(n.enterLayer))));
  }
  characterShifted() {
    if (!this.charAdded$ || !this.charRemoved$) throw this.createUninitializedErr();
    return this.charAdded$.pipe(Et((t) => ({ charId: t, action: "ADDED" })), ri(this.charRemoved$.pipe(Et((t) => ({ charId: t, action: "REMOVED" })))));
  }
  movementStarted() {
    if (!this.movementStarted$) throw this.createUninitializedErr();
    return this.movementStarted$;
  }
  movementStopped() {
    if (!this.movementStopped$) throw this.createUninitializedErr();
    return this.movementStopped$;
  }
  directionChanged() {
    if (!this.directionChanged$) throw this.createUninitializedErr();
    return this.directionChanged$;
  }
  positionChangeStarted() {
    if (!this.positionChangeStarted$) throw this.createUninitializedErr();
    return this.positionChangeStarted$;
  }
  positionChangeFinished() {
    if (!this.positionChangeFinished$) throw this.createUninitializedErr();
    return this.positionChangeFinished$;
  }
  getMovementProgress(t) {
    var i;
    this.initGuard();
    let e = (i = this.gridCharacters) == null ? void 0 : i.get(t);
    if (!e) throw this.createCharUnknownErr(t);
    return e.getMovementProgress();
  }
  rebuildTileCollisionCache(t, e, i, n) {
    var o;
    (o = this.gridTilemap) == null || o.rebuildTileCollisionCache(new Kt(t, e, i, n));
  }
  charRemoved(t) {
    var e;
    if (!this.charRemoved$) throw this.createUninitializedErr();
    return (e = this.charRemoved$) == null ? void 0 : e.pipe(gt(1), it((i) => i == t));
  }
  initGuard() {
    if (!this.isCreatedInternal) throw this.createUninitializedErr();
  }
  createUninitializedErr() {
    throw new Error("GridEngine not initialized. You need to call create() first.");
  }
  addCharacters() {
    var t;
    (t = this.config) == null || t.characters.forEach((e) => this.addCharacter(e));
  }
  moveChar(t, e) {
    var n, o, s;
    this.initGuard();
    let i = (n = this.gridCharacters) == null ? void 0 : n.get(t);
    if (!i) throw this.createCharUnknownErr(t);
    if (i.getNumberOfDirections() === 4) {
      if (!((o = this.gridTilemap) != null && o.isIsometric()) && he2(e)) {
        console.warn(`GridEngine: Character '${t}' can't be moved '${e}' in 4 direction mode.`);
        return;
      } else if ((s = this.gridTilemap) != null && s.isIsometric() && !he2(e)) {
        console.warn(`GridEngine: Character '${t}' can't be moved '${e}' in 4 direction isometric mode.`);
        return;
      }
    }
    i.move(e);
  }
  createCharUnknownErr(t) {
    return new Error(`Character unknown: ${t}`);
  }
  assembleMoveToConfig(t = {}) {
    let e = Qt(X2({}, t), { noPathFoundStrategy: "STOP", pathBlockedStrategy: "WAIT" });
    return t != null && t.noPathFoundStrategy && (Object.values(me).includes(t.noPathFoundStrategy) ? e.noPathFoundStrategy = t.noPathFoundStrategy : console.warn(`GridEngine: Unknown NoPathFoundStrategy '${t.noPathFoundStrategy}'. Falling back to '${"STOP"}'`)), t != null && t.pathBlockedStrategy && (Object.values(Fe).includes(t.pathBlockedStrategy) ? e.pathBlockedStrategy = t.pathBlockedStrategy : console.warn(`GridEngine: Unknown PathBlockedStrategy '${t.pathBlockedStrategy}'. Falling back to '${"WAIT"}'`)), e;
  }
  setConfigDefaults(t) {
    return X2({ collisionTilePropertyName: "ge_collide", numberOfDirections: 4, characterCollisionStrategy: "BLOCK_TWO_TILES", cacheTileCollisions: false }, t);
  }
};
var Br2 = class extends Le {
  constructor(t, e = {}) {
    super(t, e), this.distanceUtils = lt.create(8);
  }
  getForced(t, e) {
    let i = [], n = this.posInDir(e, this.distanceUtils.direction(e.position, t.position)), { topLeft: o, downLeft: s, top: a3, bottom: h, topRight: u, downRight: l } = this.normalizedPositions(n, e), c = this.distanceUtils.direction(t.position, e.position), p = (f, d) => this.isBlocking(f, d) || this.getTransition(d.position, d.layer) !== void 0;
    return he2(c) ? (p(t, o) && !this.isBlocking(e, a3) && i.push(a3), p(t, o) && (p(t, s) || p(s, o)) && !this.isBlocking(e, o) && i.push(o), p(t, s) && !this.isBlocking(e, h) && i.push(h), p(t, s) && (p(t, o) || p(o, s)) && !this.isBlocking(e, s) && i.push(s)) : (p(t, a3) && (p(t, o) || p(o, a3)) && (this.isBlocking(e, o) || i.push(o), this.isBlocking(e, a3) || i.push(a3)), p(t, a3) && (p(t, o) || p(o, a3) || p(a3, u)) && !this.isBlocking(e, u) && i.push(u), p(t, h) && (p(t, s) || p(s, a3)) && (this.isBlocking(e, s) || i.push(s), this.isBlocking(e, h) || i.push(h)), p(t, h) && (p(t, s) || p(o, h) || p(a3, l)) && !this.isBlocking(e, l) && i.push(l)), i;
  }
  prune(t, e) {
    let { right: i, topRight: n, downRight: o } = this.normalizedPositions(t, e), s = this.getForced(t, e), a3 = St2(t.position, e.position);
    return he2(a3) ? [i, n, o, ...s] : [i, ...s];
  }
  jump(t, e, i, n) {
    let o = this.distanceUtils.direction(t.position, e.position);
    if (!(this.isBlocking(t, e) && !(P.equal(e, i) && this.options.ignoreBlockedTarget))) {
      if (P.equal(e, i)) return { p: e, dist: n };
      if (n >= this.maxJumpSize) return { p: e, dist: n };
      if (this.getTransition(e.position, t.layer) !== void 0) return { p: e, dist: n };
      if (this.getForced(t, e).length > 0) return { p: e, dist: n };
      if (this.updateClosestToTarget(e, i), o === "up-left") {
        if (this.jump(e, this.getTilePosInDir(e, "up"), i, n + 1) !== void 0) return { p: e, dist: n };
        if (this.jump(e, this.getTilePosInDir(e, "left"), i, n + 1) !== void 0) return { p: e, dist: n };
      } else if (o === "down-left") {
        if (this.jump(e, this.getTilePosInDir(e, "down"), i, n + 1) !== void 0) return { p: e, dist: n };
        if (this.jump(e, this.getTilePosInDir(e, "left"), i, n + 1) !== void 0) return { p: e, dist: n };
      } else if (o === "up-right") {
        if (this.jump(e, this.getTilePosInDir(e, "up"), i, n + 1) !== void 0) return { p: e, dist: n };
        if (this.jump(e, this.getTilePosInDir(e, "right"), i, n + 1) !== void 0) return { p: e, dist: n };
      } else if (o === "down-right") {
        if (this.jump(e, this.getTilePosInDir(e, "down"), i, n + 1) !== void 0) return { p: e, dist: n };
        if (this.jump(e, this.getTilePosInDir(e, "right"), i, n + 1) !== void 0) return { p: e, dist: n };
      }
      return this.jump(e, this.getTilePosInDir(e, St2(t.position, e.position)), i, n + 1);
    }
  }
};
var Oe = class {
  constructor(t) {
    this.gridTilemap = t;
  }
  findShortestPath(t, e, i = {}) {
    return Ru(i.shortestPathAlgorithm || "BIDIRECTIONAL_SEARCH", this.gridTilemap, i).findShortestPath(t, e);
  }
};
function Ru(r, t, e) {
  switch (r) {
    case "BIDIRECTIONAL_SEARCH":
      return new Sr(t, e);
    case "A_STAR":
      return new wr(t, e);
    case "JPS":
      return e.numberOfDirections === 8 ? new Br2(t, e) : new Le(t, e);
  }
  return new ge(t, e);
}
var Gi = ((h) => (h.SUCCESS = "SUCCESS", h.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED", h.PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED", h.PATH_BLOCKED = "PATH_BLOCKED", h.NO_PATH_FOUND = "NO_PATH_FOUND", h.PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT", h.MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED", h.MAX_PATH_LENGTH_REACHED = "MAX_PATH_LENGTH_REACHED", h))(Gi || {});
var Ee = class {
  constructor(t, e, i, { config: n, ignoreBlockedTarget: o = false, distance: s = 0 } = {}) {
    this.character = t;
    this.tilemap = e;
    this.targetPos = i;
    this.shortestPath = [];
    this.distOffset = 0;
    this.posOnPath = 0;
    this.stopped = false;
    this.pathBlockedWaitElapsed = 0;
    this.isPositionAllowed = () => true;
    this.shortestPathAlgorithm = "BIDIRECTIONAL_SEARCH";
    this.maxPathLength = 1 / 0;
    this.isBlocking = (t2, e2) => t2 ? new ge(this.tilemap, this.getPathfindingOptions()).isBlocking(this.character.getTilePos(), { position: t2, layer: e2 }) : true;
    var a3;
    this.shortestPathAlgorithm = (a3 = n == null ? void 0 : n.algorithm) != null ? a3 : this.shortestPathAlgorithm, this.ignoreBlockedTarget = o, this.distance = s, this.noPathFoundStrategy = (n == null ? void 0 : n.noPathFoundStrategy) || "STOP", this.pathBlockedStrategy = (n == null ? void 0 : n.pathBlockedStrategy) || "WAIT", this.noPathFoundRetryable = new Re((n == null ? void 0 : n.noPathFoundRetryBackoffMs) || 200, (n == null ? void 0 : n.noPathFoundMaxRetries) || -1, () => {
      this.stop("NO_PATH_FOUND_MAX_RETRIES_EXCEEDED");
    }), this.pathBlockedRetryable = new Re((n == null ? void 0 : n.pathBlockedRetryBackoffMs) || 200, (n == null ? void 0 : n.pathBlockedMaxRetries) || -1, () => {
      this.stop("PATH_BLOCKED_MAX_RETRIES_EXCEEDED");
    }), n != null && n.isPositionAllowedFn && (this.isPositionAllowed = n.isPositionAllowedFn), n != null && n.maxPathLength && (this.maxPathLength = n.maxPathLength), this.ignoreLayers = !!(n != null && n.ignoreLayers), this.distanceUtils = lt.create(t.getNumberOfDirections()), this.pathBlockedWaitTimeoutMs = (n == null ? void 0 : n.pathBlockedWaitTimeoutMs) || -1, this.finished$ = new L(), this.setCharacter(t);
  }
  setPathBlockedStrategy(t) {
    this.pathBlockedStrategy = t;
  }
  getPathBlockedStrategy() {
    return this.pathBlockedStrategy;
  }
  setCharacter(t) {
    this.character = t, this.noPathFoundRetryable.reset(), this.pathBlockedRetryable.reset(), this.pathBlockedWaitElapsed = 0, this.calcShortestPath(), this.character.autoMovementSet().pipe(it((e) => e !== this), gt(1)).subscribe(() => {
      this.stop("MOVEMENT_TERMINATED");
    });
  }
  getPathfindingOptions() {
    return { shortestPathAlgorithm: this.shortestPathAlgorithm, pathWidth: this.character.getTileWidth(), pathHeight: this.character.getTileHeight(), numberOfDirections: this.character.getNumberOfDirections(), isPositionAllowed: this.isPositionAllowed, collisionGroups: this.character.getCollisionGroups(), ignoredChars: [this.character.getId()], ignoreTiles: !this.character.collidesWithTiles(), ignoreMapBounds: this.character.getIgnoreMissingTiles(), ignoreBlockedTarget: this.ignoreBlockedTarget, maxPathLength: this.maxPathLength, ignoreLayers: this.ignoreLayers };
  }
  update(t) {
    var e, i, n, o;
    this.stopped || (this.noPathFound() && (this.noPathFoundStrategy === "RETRY" ? this.noPathFoundRetryable.retry(t, () => this.calcShortestPath()) : this.noPathFoundStrategy === "STOP" && this.stop("NO_PATH_FOUND")), this.updatePosOnPath(), this.isBlocking((e = this.nextTileOnPath()) == null ? void 0 : e.position, (i = this.character) == null ? void 0 : i.getNextTilePos().layer) ? this.applyPathBlockedStrategy(t) : this.pathBlockedWaitElapsed = 0, this.hasArrived() ? (this.stop("SUCCESS"), this.existsDistToTarget() && this.turnTowardsTarget()) : this.isBlocking((n = this.nextTileOnPath()) == null ? void 0 : n.position, (o = this.character) == null ? void 0 : o.getNextTilePos().layer) || this.moveCharOnPath());
  }
  finishedObs() {
    return this.finished$;
  }
  getInfo() {
    return { type: "Target", config: { algorithm: this.shortestPathAlgorithm, ignoreBlockedTarget: this.ignoreBlockedTarget, distance: this.distance, targetPos: this.targetPos, noPathFoundStrategy: this.noPathFoundStrategy, pathBlockedStrategy: this.pathBlockedStrategy, noPathFoundRetryBackoffMs: this.noPathFoundRetryable.getBackoffMs(), noPathFoundMaxRetries: this.noPathFoundRetryable.getMaxRetries() } };
  }
  resultToReason(t) {
    switch (t) {
      case "SUCCESS":
        return "Successfully arrived.";
      case "MOVEMENT_TERMINATED":
        return "Movement of character has been replaced before destination was reached.";
      case "PATH_BLOCKED":
        return "PathBlockedStrategy STOP: Path blocked.";
      case "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED":
        return `NoPathFoundStrategy RETRY: Maximum retries of ${this.noPathFoundRetryable.getMaxRetries()} exceeded.`;
      case "NO_PATH_FOUND":
        return "NoPathFoundStrategy STOP: No path found.";
      case "PATH_BLOCKED_MAX_RETRIES_EXCEEDED":
        return `PathBlockedStrategy RETRY: Maximum retries of ${this.pathBlockedRetryable.getMaxRetries()} exceeded.`;
      case "PATH_BLOCKED_WAIT_TIMEOUT":
        return `PathBlockedStrategy WAIT: Wait timeout of ${this.pathBlockedWaitTimeoutMs}ms exceeded.`;
    }
  }
  applyPathBlockedStrategy(t) {
    this.pathBlockedStrategy === "RETRY" ? this.pathBlockedRetryable.retry(t, () => {
      let e = this.getShortestPath();
      e.path.length > 0 && this.calcShortestPath(e);
    }) : this.pathBlockedStrategy === "STOP" ? this.stop("PATH_BLOCKED") : this.pathBlockedStrategy === "WAIT" && this.pathBlockedWaitTimeoutMs > -1 && (this.pathBlockedWaitElapsed += t, this.pathBlockedWaitElapsed >= this.pathBlockedWaitTimeoutMs && this.stop("PATH_BLOCKED_WAIT_TIMEOUT"));
  }
  moveCharOnPath() {
    let t = this.nextTileOnPath();
    if (!t) return;
    let e = this.getDir(this.character.getNextTilePos().position, t.position);
    this.character.move(e);
  }
  nextTileOnPath() {
    return this.shortestPath[this.posOnPath + 1];
  }
  stop(t) {
    this.finished$.next({ position: this.character.getTilePos().position, result: t, description: this.resultToReason(t), layer: this.character.getTilePos().layer }), this.finished$.complete(), this.stopped = true;
  }
  turnTowardsTarget() {
    let t = this.shortestPath[this.posOnPath + 1], e = this.getDir(this.character.getNextTilePos().position, t.position);
    this.character.turnTowards(e);
  }
  existsDistToTarget() {
    return this.posOnPath < this.shortestPath.length - 1;
  }
  hasArrived() {
    return !this.noPathFound() && this.posOnPath + Math.max(0, this.distance - this.distOffset) >= this.shortestPath.length - 1;
  }
  updatePosOnPath() {
    let t = this.shortestPath[this.posOnPath];
    for (; this.posOnPath < this.shortestPath.length - 1 && (this.character.getNextTilePos().position.x != t.position.x || this.character.getNextTilePos().position.y != t.position.y); ) this.posOnPath++, t = this.shortestPath[this.posOnPath];
  }
  noPathFound() {
    return this.shortestPath.length === 0;
  }
  calcShortestPath(t) {
    t = t != null ? t : this.getShortestPath(), this.posOnPath = 0, this.shortestPath = t.path, this.distOffset = t.distOffset;
  }
  getShortestPath() {
    let t = new Oe(this.tilemap), { path: e, closestToTarget: i } = t.findShortestPath(this.character.getNextTilePos(), this.targetPos, this.getPathfindingOptions());
    if (e.length == 0 && this.noPathFoundStrategy === "CLOSEST_REACHABLE") {
      let o = t.findShortestPath(this.character.getNextTilePos(), i, this.getPathfindingOptions()).path, s = this.distanceUtils.distance(i.position, this.targetPos.position);
      return { path: o, distOffset: s };
    }
    return { path: e, distOffset: 0 };
  }
  getDir(t, e) {
    return this.tilemap.fromMapDirection(this.distanceUtils.direction(t, e));
  }
};
var Jt = class {
  constructor(t) {
    this.tilemap = t;
    this.charLayerDepths = /* @__PURE__ */ new Map();
    this.setLayerDepths();
  }
  getTileWidth() {
    var e, i;
    let t = (i = (e = this.tilemap.layers[0]) == null ? void 0 : e.tilemapLayer.scale) != null ? i : 1;
    return this.tilemap.tileWidth * t;
  }
  getTileHeight() {
    var e, i;
    let t = (i = (e = this.tilemap.layers[0]) == null ? void 0 : e.tilemapLayer.scale) != null ? i : 1;
    return this.tilemap.tileHeight * t;
  }
  getDepthOfCharLayer(t) {
    var e;
    return (e = this.charLayerDepths.get(t)) != null ? e : 0;
  }
  tilePosToPixelPos(t) {
    return this.isIsometric() ? O.scalarMult(this.getTileSize(), 0.5).multiply(new m(t.x - t.y, t.x + t.y)) : t.clone().multiply(this.getTileSize());
  }
  getTileDistance(t) {
    if (this.isIsometric()) switch (t) {
      case "down-left":
      case "down-right":
      case "up-left":
      case "up-right":
        return O.scalarMult(this.getTileSize(), 0.5);
      default:
        return this.getTileSize();
    }
    return this.getTileSize();
  }
  getTileSize() {
    return new m(this.getTileWidth(), this.getTileHeight());
  }
  isIsometric() {
    return this.tilemap.orientation == Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
  }
  isLayerAlwaysOnTop(t) {
    return this.hasLayerProp(t, Jt.ALWAYS_TOP_PROP_NAME);
  }
  isCharLayer(t) {
    return this.hasLayerProp(t, Jt.CHAR_LAYER_PROP_NAME);
  }
  setLayerDepths() {
    let t = [], e = -1, i = this.tilemap.layers.filter((o) => this.isLayerAlwaysOnTop(o));
    this.tilemap.layers.filter((o) => !this.isLayerAlwaysOnTop(o)).forEach((o) => {
      this.hasLayerProp(o, Jt.HEIGHT_SHIFT_PROP_NAME) ? (this.createHeightShiftLayers(o, e), t.push(o.tilemapLayer)) : this.setDepth(o, ++e);
    }), this.charLayerDepths.set(void 0, e), i.forEach((o, s) => {
      o.tilemapLayer.setDepth(s + 1 + e);
    }), t.forEach((o) => o.destroy());
  }
  setDepth(t, e) {
    t.tilemapLayer.setDepth(e), this.isCharLayer(t) && this.charLayerDepths.set(this.getLayerProp(t, Jt.CHAR_LAYER_PROP_NAME), e);
  }
  createHeightShiftLayers(t, e) {
    let i = this.getLayerProp(t, Jt.HEIGHT_SHIFT_PROP_NAME);
    isNaN(i) && (i = 0);
    let n = 1;
    for (let o = 0; o < t.height; o++) {
      let s = this.copyLayer(t, o);
      s && (s.scale = t.tilemapLayer.scale, s.setDepth(e + fe.shiftPad((o + i) * this.getTileHeight() + n, Jt.Z_INDEX_PADDING)));
    }
  }
  getLayerProp(t, e) {
    let n = t.properties.find((o) => o.name == e);
    return n == null ? void 0 : n.value;
  }
  hasLayerProp(t, e) {
    return this.getLayerProp(t, e) != null;
  }
  copyLayer(t, e) {
    let i = `${t.name}#${e}`, n = this.tilemap.createBlankLayer(i, t.tilemapLayer.tileset);
    if (n) {
      n.name = i;
      for (let o = 0; o < t.width; o++) n.putTileAt(t.data[e][o], o, e);
      return n;
    }
  }
};
var Xt = Jt;
Xt.ALWAYS_TOP_PROP_NAME = "ge_alwaysTop", Xt.CHAR_LAYER_PROP_NAME = "ge_charLayer", Xt.HEIGHT_SHIFT_PROP_NAME = "ge_heightShift", Xt.Z_INDEX_PADDING = 7;

// speedtests/RoomsTilemap.ts
var fs2 = require("fs");
var CHAR_LAYER_PROP_NAME = "ge_charLayer";
var MIN_CHAR_CODE = "z".charCodeAt(0) + 1;
var MAX_CHAR_CODE = MIN_CHAR_CODE + 255;
var RoomsTilemap = class {
  constructor(path2) {
    this.height = 0;
    this.width = 0;
    this.layersByName = /* @__PURE__ */ new Map();
    this.layers = [];
    this.layersByName = /* @__PURE__ */ new Map();
    if (Array.isArray(path2)) {
      path2.forEach((p) => this.addLayer(p));
    } else {
      this.addLayer(path2);
    }
  }
  addLayer(path2) {
    const lastPartArr = path2.split("/")[path2.split("/").length - 1].split(".");
    const layerName = lastPartArr[0];
    try {
      const rawData = fs2.readFileSync(path2, "utf8");
      const rows = rawData.split("\n");
      this.height = Number(rows[1].split(" ")[1]);
      this.width = Number(rows[2].split(" ")[1]);
      const layer = new RoomsTileLayer(rows.slice(4), layerName);
      this.layers.push(layer);
      this.layersByName.set(layerName, layer);
    } catch (err) {
      console.error(err);
    }
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getOrientation() {
    return "orthogonal";
  }
  getLayers() {
    return this.layers;
  }
  hasTileAt(x2, y2, layer) {
    if (x2 < 0 || x2 >= this.width) return false;
    if (y2 < 0 || y2 >= this.height) return false;
    return true;
  }
  getTileAt(x2, y2, layer) {
    if (x2 < 0 || x2 >= this.width) return void 0;
    if (y2 < 0 || y2 >= this.height) return void 0;
    if (!layer) return this.layers[0].getData()[y2][x2];
    return this.layersByName.get(layer)?.getData()[y2][x2];
  }
};
var RoomsTileLayer = class {
  constructor(rows, name) {
    this.name = name;
    this.data = [];
    for (const row of rows) {
      const rowArr = [];
      for (let c = 0; c < row.length; c++) {
        rowArr.push(new RoomsTile(row[c]));
      }
      this.data.push(rowArr);
    }
  }
  getName() {
    return this.name;
  }
  getProperty(name) {
    if (name === CHAR_LAYER_PROP_NAME) {
      return this.name;
    }
  }
  hasProperty(name) {
    return false;
  }
  getData() {
    return this.data;
  }
  isCharLayer() {
    return true;
  }
};
var RoomsTile = class {
  constructor(c) {
    this.c = [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
    if (c === ".") {
      this.c[0] = false;
    } else if (c.charCodeAt(0) >= MIN_CHAR_CODE && c.charCodeAt(0) <= MAX_CHAR_CODE) {
      this.c = charToArr(c);
    }
  }
  getProperty(name) {
    switch (name) {
      case "ge_collide":
        return this.c[0];
      case "ge_collide_up":
        return this.c[1];
      case "ge_collide_down":
        return this.c[2];
      case "ge_collide_left":
        return this.c[3];
      case "ge_collide_right":
        return this.c[4];
      case "ge_collide_up-left":
        return this.c[5];
      case "ge_collide_up-right":
        return this.c[6];
      case "ge_collide_down-left":
        return this.c[7];
      case "ge_collide_down-right":
        return this.c[8];
    }
    return void 0;
  }
  hasProperty(name) {
    if (name.startsWith("ge_collide")) {
      return true;
    }
    return false;
  }
};
function charToArr(char) {
  const arr = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];
  const cnt = char.charCodeAt(0) - MIN_CHAR_CODE;
  for (let i = 0; i < 8; i++) {
    arr[i + 1] = !!(cnt & 1 << i);
  }
  return arr;
}

// speedtests/run.ts
var import_path = __toESM(require("path"), 1);
var mapPath = import_path.default.join(process.cwd(), "speedtests", "8room_000.map");
var geTm = new RoomsTilemap(mapPath);
var geOld = new Nr2();
var geNew = new In();
geOld.create(geTm, { characters: [], cacheTileCollisions: true });
geNew.create(geTm, { characters: [], cacheTileCollisions: true });
var speedTests = [
  AStarSpeed,
  Jps4Speed,
  Jps8Speed,
  BfsSpeed,
  BidirSpeed
];
var hasFailed = false;
for (const t of speedTests) {
  const compRes = compare(t);
  const oldTime = compRes.resultOld.result.toFixed(2);
  const newTime = compRes.resultNew.result.toFixed(2);
  const speedup = ((compRes.resultOld.result - compRes.resultNew.result) / compRes.resultOld.result * 100).toFixed(1);
  if (compRes.failed) {
    console.log(
      `Test "${t.name}" SLOWER. Old: ${oldTime}ms, New: ${newTime}ms (${speedup}% change)`
    );
    hasFailed = true;
  } else {
    console.log(
      `Test "${t.name}" PASSED. Old: ${oldTime}ms, New: ${newTime}ms (${speedup}% faster)`
    );
  }
}
if (hasFailed) {
  process.exit(1);
}
function compare(speedTest) {
  const TEST_RUNS = 5;
  let oldResSum = 0;
  let newResSum = 0;
  let allTolerance = 0;
  for (let i = 0; i < TEST_RUNS; i++) {
    const { result: oldRes, tolerance } = speedTest.run(geOld);
    const { result: newRes } = speedTest.run(geNew);
    oldResSum += oldRes;
    newResSum += newRes;
    allTolerance = tolerance;
  }
  const oldResAvg = oldResSum / TEST_RUNS;
  const newResAvg = newResSum / TEST_RUNS;
  const absTolerance = oldResAvg * allTolerance;
  if (oldResAvg < newResAvg && newResAvg - oldResAvg > absTolerance) {
    return {
      failed: true,
      resultOld: {
        result: oldResAvg,
        tolerance: allTolerance
      },
      resultNew: {
        result: newResAvg,
        tolerance: allTolerance
      }
    };
  }
  return {
    failed: false,
    resultOld: {
      result: oldResAvg,
      tolerance: allTolerance
    },
    resultNew: {
      result: newResAvg,
      tolerance: allTolerance
    }
  };
}
/*! Bundled license information:

tiled-property-flattener/dist/tiled_property_flattener.min.js:
  (*! Bundled license information:
  
  lodash/lodash.js:
    (**
     * @license
     * Lodash <https://lodash.com/>
     * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     *)
  *)
*/
