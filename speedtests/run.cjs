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
var ITERATIONS = 5;
var BfsSpeed = {
  name: "Bfs Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
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
    }
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.05
    };
  }
};

// speedtests/tests/BidirSpeed.ts
var ITERATIONS2 = 5;
var BidirSpeed = {
  name: "Bidir Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    for (let i = 0; i < ITERATIONS2; i++) {
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
    }
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.1
    };
  }
};

// speedtests/tests/AStarSpeed.ts
var ITERATIONS3 = 5;
var AStarSpeed = {
  name: "AStar Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    for (let i = 0; i < ITERATIONS3; i++) {
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
    }
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.1
    };
  }
};

// speedtests/tests/Jps4Speed.ts
var ITERATIONS4 = 5;
var Jps4Speed = {
  name: "JPS4 Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    for (let i = 0; i < ITERATIONS4; i++) {
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
    }
    const end = performance.now();
    const timeMs = end - start;
    return {
      result: timeMs,
      tolerance: 0.1
    };
  }
};

// speedtests/tests/Jps8Speed.ts
var ITERATIONS5 = 5;
var Jps8Speed = {
  name: "JPS8 Speed",
  run: (gridEngine) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;
    const start = performance.now();
    for (let i = 0; i < ITERATIONS5; i++) {
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
    }
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
var Ib = Object.create;
var oa = Object.defineProperty;
var Mb = Object.defineProperties;
var Ab = Object.getOwnPropertyDescriptor;
var Rb = Object.getOwnPropertyDescriptors;
var Fb = Object.getOwnPropertyNames;
var vl = Object.getOwnPropertySymbols;
var kb = Object.getPrototypeOf;
var Tl = Object.prototype.hasOwnProperty;
var Vb = Object.prototype.propertyIsEnumerable;
var bl = (a5, e, r) => e in a5 ? oa(a5, e, { enumerable: true, configurable: true, writable: true, value: r }) : a5[e] = r;
var Y = (a5, e) => {
  for (var r in e || (e = {})) Tl.call(e, r) && bl(a5, r, e[r]);
  if (vl) for (var r of vl(e)) Vb.call(e, r) && bl(a5, r, e[r]);
  return a5;
};
var _t = (a5, e) => Mb(a5, Rb(e));
var ye = (a5, e) => () => (e || a5((e = { exports: {} }).exports, e), e.exports);
var Nb = (a5, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of Fb(e)) !Tl.call(a5, s) && s !== r && oa(a5, s, { get: () => e[s], enumerable: !(o = Ab(e, s)) || o.enumerable });
  return a5;
};
var Fo = (a5, e, r) => (r = a5 != null ? Ib(kb(a5)) : {}, Nb(e || !a5 || !a5.__esModule ? oa(r, "default", { value: a5, enumerable: true }) : r, a5));
var da = ye((Oi) => {
  var oT = function(a5, e) {
    return a5 < e ? -1 : a5 > e ? 1 : 0;
  }, nT = function(a5, e) {
    return a5 < e ? 1 : a5 > e ? -1 : 0;
  };
  function sT(a5) {
    return function(e, r) {
      return a5(r, e);
    };
  }
  function aT(a5) {
    return a5 === 2 ? function(e, r) {
      return e[0] < r[0] ? -1 : e[0] > r[0] ? 1 : e[1] < r[1] ? -1 : e[1] > r[1] ? 1 : 0;
    } : function(e, r) {
      for (var o = 0; o < a5; ) {
        if (e[o] < r[o]) return -1;
        if (e[o] > r[o]) return 1;
        o++;
      }
      return 0;
    };
  }
  Oi.DEFAULT_COMPARATOR = oT;
  Oi.DEFAULT_REVERSE_COMPARATOR = nT;
  Oi.reverseComparator = sT;
  Oi.createTupleComparator = aT;
});
var zl = ye((ga2) => {
  ga2.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer != "undefined";
  ga2.SYMBOL_SUPPORT = typeof Symbol != "undefined";
});
var Ei = ye((UC, ql) => {
  var $l = zl(), uT = $l.ARRAY_BUFFER_SUPPORT, cT = $l.SYMBOL_SUPPORT;
  ql.exports = function(e, r) {
    var o, s, u, h, p;
    if (!e) throw new Error("obliterator/forEach: invalid iterable.");
    if (typeof r != "function") throw new Error("obliterator/forEach: expecting a callback.");
    if (Array.isArray(e) || uT && ArrayBuffer.isView(e) || typeof e == "string" || e.toString() === "[object Arguments]") {
      for (u = 0, h = e.length; u < h; u++) r(e[u], u);
      return;
    }
    if (typeof e.forEach == "function") {
      e.forEach(r);
      return;
    }
    if (cT && Symbol.iterator in e && typeof e.next != "function" && (e = e[Symbol.iterator]()), typeof e.next == "function") {
      for (o = e, u = 0; p = o.next(), p.done !== true; ) r(p.value, u), u++;
      return;
    }
    for (s in e) e.hasOwnProperty(s) && r(e[s], s);
  };
});
var eh = ye((HC, th) => {
  var Yl = da(), Xl = Ei(), Ql = Yl.DEFAULT_COMPARATOR, lT = Yl.reverseComparator;
  function Dt(a5) {
    if (this.clear(), this.comparator = a5 || Ql, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
  }
  Dt.prototype.clear = function() {
    this.root = null, this.min = null, this.size = 0;
  };
  function hT(a5) {
    return { item: a5, degree: 0 };
  }
  function Kl(a5, e) {
    a5.root ? (e.right = a5.root.right, e.left = a5.root, a5.root.right.left = e, a5.root.right = e) : a5.root = e;
  }
  Dt.prototype.push = function(a5) {
    var e = hT(a5);
    return e.left = e, e.right = e, Kl(this, e), (!this.min || this.comparator(e.item, this.min.item) <= 0) && (this.min = e), ++this.size;
  };
  Dt.prototype.peek = function() {
    return this.min ? this.min.item : void 0;
  };
  function Jl(a5) {
    for (var e = [], r = a5, o = false; !(r === a5 && o); ) r === a5 && (o = true), e.push(r), r = r.right;
    return e;
  }
  function Zl(a5, e) {
    a5.root === e && (a5.root = e.right), e.left.right = e.right, e.right.left = e.left;
  }
  function fT(a5, e) {
    a5.child ? (e.right = a5.child.right, e.left = a5.child, a5.child.right.left = e, a5.child.right = e) : a5.child = e;
  }
  function pT(a5, e, r) {
    Zl(a5, e), e.left = e, e.right = e, fT(r, e), r.degree++, e.parent = r;
  }
  function mT(a5) {
    var e = new Array(a5.size), r = Jl(a5.root), o, s, u, h, p, d;
    for (o = 0, s = r.length; o < s; o++) {
      for (u = r[o], p = u.degree; e[p]; ) h = e[p], a5.comparator(u.item, h.item) > 0 && (d = u, u = h, h = d), pT(a5, h, u), e[p] = null, p++;
      e[p] = u;
    }
    for (o = 0; o < a5.size; o++) e[o] && a5.comparator(e[o].item, a5.min.item) <= 0 && (a5.min = e[o]);
  }
  Dt.prototype.pop = function() {
    if (this.size) {
      var a5 = this.min;
      if (a5.child) {
        var e = Jl(a5.child), r, o, s;
        for (o = 0, s = e.length; o < s; o++) r = e[o], Kl(this, r), delete r.parent;
      }
      return Zl(this, a5), a5 === a5.right ? (this.min = null, this.root = null) : (this.min = a5.right, mT(this)), this.size--, a5.item;
    }
  };
  Dt.prototype.inspect = function() {
    var a5 = { size: this.size };
    return this.min && "item" in this.min && (a5.top = this.min.item), Object.defineProperty(a5, "constructor", { value: Dt, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (Dt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Dt.prototype.inspect);
  function mn2(a5) {
    if (this.clear(), this.comparator = a5 || Ql, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
    this.comparator = lT(this.comparator);
  }
  mn2.prototype = Dt.prototype;
  Dt.from = function(a5, e) {
    var r = new Dt(e);
    return Xl(a5, function(o) {
      r.push(o);
    }), r;
  };
  mn2.from = function(a5, e) {
    var r = new mn2(e);
    return Xl(a5, function(o) {
      r.push(o);
    }), r;
  };
  Dt.MinFibonacciHeap = Dt;
  Dt.MaxFibonacciHeap = mn2;
  th.exports = Dt;
});
var ya = ye((xe2) => {
  var dT = Math.pow(2, 8) - 1, gT = Math.pow(2, 16) - 1, yT = Math.pow(2, 32) - 1, vT = Math.pow(2, 7) - 1, bT = Math.pow(2, 15) - 1, TT = Math.pow(2, 31) - 1;
  xe2.getPointerArray = function(a5) {
    var e = a5 - 1;
    if (e <= dT) return Uint8Array;
    if (e <= gT) return Uint16Array;
    if (e <= yT) return Uint32Array;
    throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
  };
  xe2.getSignedPointerArray = function(a5) {
    var e = a5 - 1;
    return e <= vT ? Int8Array : e <= bT ? Int16Array : e <= TT ? Int32Array : Float64Array;
  };
  xe2.getNumberType = function(a5) {
    return a5 === (a5 | 0) ? Math.sign(a5) === -1 ? a5 <= 127 && a5 >= -128 ? Int8Array : a5 <= 32767 && a5 >= -32768 ? Int16Array : Int32Array : a5 <= 255 ? Uint8Array : a5 <= 65535 ? Uint16Array : Uint32Array : Float64Array;
  };
  var PT = { Uint8Array: 1, Int8Array: 2, Uint16Array: 3, Int16Array: 4, Uint32Array: 5, Int32Array: 6, Float32Array: 7, Float64Array: 8 };
  xe2.getMinimalRepresentation = function(a5, e) {
    var r = null, o = 0, s, u, h, p, d;
    for (p = 0, d = a5.length; p < d; p++) h = e ? e(a5[p]) : a5[p], u = xe2.getNumberType(h), s = PT[u.name], s > o && (o = s, r = u);
    return r;
  };
  xe2.isTypedArray = function(a5) {
    return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView(a5);
  };
  xe2.concat = function() {
    var a5 = 0, e, r, o;
    for (e = 0, o = arguments.length; e < o; e++) a5 += arguments[e].length;
    var s = new arguments[0].constructor(a5);
    for (e = 0, r = 0; e < o; e++) s.set(arguments[e], r), r += arguments[e].length;
    return s;
  };
  xe2.indices = function(a5) {
    for (var e = xe2.getPointerArray(a5), r = new e(a5), o = 0; o < a5; o++) r[o] = o;
    return r;
  };
});
var ba = ye((Di) => {
  var rh = Ei(), ih = ya();
  function xT(a5) {
    return Array.isArray(a5) || ih.isTypedArray(a5);
  }
  function va2(a5) {
    if (typeof a5.length == "number") return a5.length;
    if (typeof a5.size == "number") return a5.size;
  }
  function wT(a5) {
    var e = va2(a5), r = typeof e == "number" ? new Array(e) : [], o = 0;
    return rh(a5, function(s) {
      r[o++] = s;
    }), r;
  }
  function CT(a5) {
    var e = va2(a5), r = typeof e == "number" ? ih.getPointerArray(e) : Array, o = typeof e == "number" ? new Array(e) : [], s = typeof e == "number" ? new r(e) : [], u = 0;
    return rh(a5, function(h) {
      o[u] = h, s[u] = u++;
    }), [o, s];
  }
  Di.isArrayLike = xT;
  Di.guessLength = va2;
  Di.toArray = wT;
  Di.toArrayWithIndices = CT;
});
var uh = ye((zC, ah) => {
  var dn = Ei(), oh = da(), we = ba(), yn = oh.DEFAULT_COMPARATOR, Ta2 = oh.reverseComparator;
  function Pa(a5, e, r, o) {
    for (var s = e[o], u, h; o > r; ) {
      if (u = o - 1 >> 1, h = e[u], a5(s, h) < 0) {
        e[o] = h, o = u;
        continue;
      }
      break;
    }
    e[o] = s;
  }
  function Ii(a5, e, r) {
    for (var o = e.length, s = r, u = e[r], h = 2 * r + 1, p; h < o; ) p = h + 1, p < o && a5(e[h], e[p]) >= 0 && (h = p), e[r] = e[h], r = h, h = 2 * r + 1;
    e[r] = u, Pa(a5, e, s, r);
  }
  function nh(a5, e, r) {
    e.push(r), Pa(a5, e, 0, e.length - 1);
  }
  function xa(a5, e) {
    var r = e.pop();
    if (e.length !== 0) {
      var o = e[0];
      return e[0] = r, Ii(a5, e, 0), o;
    }
    return r;
  }
  function Wr(a5, e, r) {
    if (e.length === 0) throw new Error("mnemonist/heap.replace: cannot pop an empty heap.");
    var o = e[0];
    return e[0] = r, Ii(a5, e, 0), o;
  }
  function sh(a5, e, r) {
    var o;
    return e.length !== 0 && a5(e[0], r) < 0 && (o = e[0], e[0] = r, r = o, Ii(a5, e, 0)), r;
  }
  function vr2(a5, e) {
    for (var r = e.length, o = r >> 1, s = o; --s >= 0; ) Ii(a5, e, s);
  }
  function wa(a5, e) {
    for (var r = e.length, o = 0, s = new Array(r); o < r; ) s[o++] = xa(a5, e);
    return s;
  }
  function _T(a5, e, r) {
    arguments.length === 2 && (r = e, e = a5, a5 = yn);
    var o = Ta2(a5), s, u, h, p = 1 / 0, d;
    if (e === 1) {
      if (we.isArrayLike(r)) {
        for (s = 0, u = r.length; s < u; s++) h = r[s], (p === 1 / 0 || a5(h, p) < 0) && (p = h);
        return d = new r.constructor(1), d[0] = p, d;
      }
      return dn(r, function(C) {
        (p === 1 / 0 || a5(C, p) < 0) && (p = C);
      }), [p];
    }
    if (we.isArrayLike(r)) {
      if (e >= r.length) return r.slice().sort(a5);
      for (d = r.slice(0, e), vr2(o, d), s = e, u = r.length; s < u; s++) o(r[s], d[0]) > 0 && Wr(o, d, r[s]);
      return d.sort(a5);
    }
    var T2 = we.guessLength(r);
    return T2 !== null && T2 < e && (e = T2), d = new Array(e), s = 0, dn(r, function(C) {
      s < e ? d[s] = C : (s === e && vr2(o, d), o(C, d[0]) > 0 && Wr(o, d, C)), s++;
    }), d.length > s && (d.length = s), d.sort(a5);
  }
  function LT(a5, e, r) {
    arguments.length === 2 && (r = e, e = a5, a5 = yn);
    var o = Ta2(a5), s, u, h, p = -1 / 0, d;
    if (e === 1) {
      if (we.isArrayLike(r)) {
        for (s = 0, u = r.length; s < u; s++) h = r[s], (p === -1 / 0 || a5(h, p) > 0) && (p = h);
        return d = new r.constructor(1), d[0] = p, d;
      }
      return dn(r, function(C) {
        (p === -1 / 0 || a5(C, p) > 0) && (p = C);
      }), [p];
    }
    if (we.isArrayLike(r)) {
      if (e >= r.length) return r.slice().sort(o);
      for (d = r.slice(0, e), vr2(a5, d), s = e, u = r.length; s < u; s++) a5(r[s], d[0]) > 0 && Wr(a5, d, r[s]);
      return d.sort(o);
    }
    var T2 = we.guessLength(r);
    return T2 !== null && T2 < e && (e = T2), d = new Array(e), s = 0, dn(r, function(C) {
      s < e ? d[s] = C : (s === e && vr2(a5, d), a5(C, d[0]) > 0 && Wr(a5, d, C)), s++;
    }), d.length > s && (d.length = s), d.sort(o);
  }
  function rt(a5) {
    if (this.clear(), this.comparator = a5 || yn, typeof this.comparator != "function") throw new Error("mnemonist/Heap.constructor: given comparator should be a function.");
  }
  rt.prototype.clear = function() {
    this.items = [], this.size = 0;
  };
  rt.prototype.push = function(a5) {
    return nh(this.comparator, this.items, a5), ++this.size;
  };
  rt.prototype.peek = function() {
    return this.items[0];
  };
  rt.prototype.pop = function() {
    return this.size !== 0 && this.size--, xa(this.comparator, this.items);
  };
  rt.prototype.replace = function(a5) {
    return Wr(this.comparator, this.items, a5);
  };
  rt.prototype.pushpop = function(a5) {
    return sh(this.comparator, this.items, a5);
  };
  rt.prototype.consume = function() {
    return this.size = 0, wa(this.comparator, this.items);
  };
  rt.prototype.toArray = function() {
    return wa(this.comparator, this.items.slice());
  };
  rt.prototype.inspect = function() {
    var a5 = this.toArray();
    return Object.defineProperty(a5, "constructor", { value: rt, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (rt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = rt.prototype.inspect);
  function gn(a5) {
    if (this.clear(), this.comparator = a5 || yn, typeof this.comparator != "function") throw new Error("mnemonist/MaxHeap.constructor: given comparator should be a function.");
    this.comparator = Ta2(this.comparator);
  }
  gn.prototype = rt.prototype;
  rt.from = function(a5, e) {
    var r = new rt(e), o;
    return we.isArrayLike(a5) ? o = a5.slice() : o = we.toArray(a5), vr2(r.comparator, o), r.items = o, r.size = o.length, r;
  };
  gn.from = function(a5, e) {
    var r = new gn(e), o;
    return we.isArrayLike(a5) ? o = a5.slice() : o = we.toArray(a5), vr2(r.comparator, o), r.items = o, r.size = o.length, r;
  };
  rt.siftUp = Ii;
  rt.siftDown = Pa;
  rt.push = nh;
  rt.pop = xa;
  rt.replace = Wr;
  rt.pushpop = sh;
  rt.heapify = vr2;
  rt.consume = wa;
  rt.nsmallest = _T;
  rt.nlargest = LT;
  rt.MinHeap = rt;
  rt.MaxHeap = gn;
  ah.exports = rt;
});
var ph = ye(($C, fh) => {
  var ch = "";
  function lh(a5, e, r) {
    for (var o = e.length, s = [], u = o, h = -1, p, d = 0, T2; u--; ) h = Math.max(a5[e[u] + r], h);
    for (T2 = h >> 24 && 32 || h >> 16 && 24 || h >> 8 && 16 || 8; d < T2; d += 4) {
      for (u = 16; u--; ) s[u] = [];
      for (u = o; u--; ) s[a5[e[u] + r] >> d & 15].push(e[u]);
      for (p = 0; p < 16; p++) for (h = s[p].length; h--; ) e[++u] = s[p][h];
    }
  }
  function ST(a5, e, r, o) {
    return a5[r] - a5[o] || (r % 3 === 2 ? a5[r + 1] - a5[o + 1] || e[r + 2] - e[o + 2] : e[r + 1] - e[o + 1]);
  }
  function Ca(a5, e) {
    var r = [], o = [], s = 2 * e / 3 | 0, u = e - s, h = s + 1 >> 1, p = s, d = 0, T2, C = [], O = [];
    if (e === 1) return [0];
    for (; p--; ) r[p] = (p * 3 >> 1) + 1;
    for (p = 3; p--; ) lh(a5, r, p);
    for (d = o[(r[0] / 3 | 0) + (r[0] % 3 === 1 ? 0 : h)] = 1, p = 1; p < s; p++) (a5[r[p]] !== a5[r[p - 1]] || a5[r[p] + 1] !== a5[r[p - 1] + 1] || a5[r[p] + 2] !== a5[r[p - 1] + 2]) && d++, o[(r[p] / 3 | 0) + (r[p] % 3 === 1 ? 0 : h)] = d;
    if (d < s) for (o = Ca(o, s), p = s; p--; ) r[p] = o[p] < h ? o[p] * 3 + 1 : (o[p] - h) * 3 + 2;
    for (p = s; p--; ) C[r[p]] = p;
    for (C[e] = -1, C[e + 1] = -2, o = e % 3 === 1 ? [e - 1] : [], p = 0; p < s; p++) r[p] % 3 === 1 && o.push(r[p] - 1);
    for (lh(a5, o, 0), p = 0, d = 0, T2 = 0; p < s && d < u; ) O[T2++] = ST(a5, C, r[p], o[d]) < 0 ? r[p++] : o[d++];
    for (; p < s; ) O[T2++] = r[p++];
    for (; d < u; ) O[T2++] = o[d++];
    return O;
  }
  function hh(a5) {
    var e = a5.length, r = e % 3, o = new Array(e + r), s, u;
    if (typeof a5 != "string") {
      var h = /* @__PURE__ */ Object.create(null);
      for (u = 0; u < e; u++) h[a5[u]] || (h[a5[u]] = true);
      var p = /* @__PURE__ */ Object.create(null), d = Object.keys(h).sort();
      for (u = 0, s = d.length; u < s; u++) p[d[u]] = u + 1;
      for (u = 0; u < e; u++) o[u] = p[a5[u]];
    } else for (u = 0; u < e; u++) o[u] = a5.charCodeAt(u);
    for (u = e; u < e + r; u++) o[u] = 0;
    return o;
  }
  function Ze2(a5) {
    this.hasArbitrarySequence = typeof a5 != "string", this.string = a5, this.length = a5.length, this.array = Ca(hh(a5), this.length);
  }
  Ze2.prototype.toString = function() {
    return this.array.join(",");
  };
  Ze2.prototype.toJSON = function() {
    return this.array;
  };
  Ze2.prototype.inspect = function() {
    for (var a5 = new Array(this.length), e = 0; e < this.length; e++) a5[e] = this.string.slice(this.array[e]);
    return Object.defineProperty(a5, "constructor", { value: Ze2, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (Ze2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Ze2.prototype.inspect);
  function tr(a5) {
    if (this.hasArbitrarySequence = typeof a5[0] != "string", this.size = a5.length, this.hasArbitrarySequence) {
      this.text = [];
      for (var e = 0, r = this.size; e < r; e++) this.text.push.apply(this.text, a5[e]), e < r - 1 && this.text.push(ch);
    } else this.text = a5.join(ch);
    this.firstLength = a5[0].length, this.length = this.text.length, this.array = Ca(hh(this.text), this.length);
  }
  tr.prototype.longestCommonSubsequence = function() {
    var a5 = this.hasArbitrarySequence ? [] : "", e, r, o, s, u;
    for (r = 1; r < this.length; r++) if (s = this.array[r], u = this.array[r - 1], !(s < this.firstLength && u < this.firstLength) && !(s > this.firstLength && u > this.firstLength)) {
      for (e = Math.min(this.length - s, this.length - u), o = 0; o < e; o++) if (this.text[s + o] !== this.text[u + o]) {
        e = o;
        break;
      }
      e > a5.length && (a5 = this.text.slice(s, s + e));
    }
    return a5;
  };
  tr.prototype.toString = function() {
    return this.array.join(",");
  };
  tr.prototype.toJSON = function() {
    return this.array;
  };
  tr.prototype.inspect = function() {
    for (var a5 = new Array(this.length), e = 0; e < this.length; e++) a5[e] = this.text.slice(this.array[e]);
    return Object.defineProperty(a5, "constructor", { value: tr, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (tr.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = tr.prototype.inspect);
  Ze2.GeneralizedSuffixArray = tr;
  fh.exports = Ze2;
});
var dh = ye((qC, mh) => {
  function Ce(a5) {
    if (typeof a5 != "function") throw new Error("obliterator/iterator: expecting a function!");
    this.next = a5;
  }
  typeof Symbol != "undefined" && (Ce.prototype[Symbol.iterator] = function() {
    return this;
  });
  Ce.of = function() {
    var a5 = arguments, e = a5.length, r = 0;
    return new Ce(function() {
      return r >= e ? { done: true } : { done: false, value: a5[r++] };
    });
  };
  Ce.empty = function() {
    var a5 = new Ce(function() {
      return { done: true };
    });
    return a5;
  };
  Ce.fromSequence = function(a5) {
    var e = 0, r = a5.length;
    return new Ce(function() {
      return e >= r ? { done: true } : { done: false, value: a5[e++] };
    });
  };
  Ce.is = function(a5) {
    return a5 instanceof Ce ? true : typeof a5 == "object" && a5 !== null && typeof a5.next == "function";
  };
  mh.exports = Ce;
});
var bh = ye((YC2, vh) => {
  var gh = dh(), OT = Ei(), ET = ba(), yh = ya(), DT = function(a5) {
    return Math.max(1, Math.ceil(a5 * 1.5));
  }, IT = function(a5) {
    var e = yh.getPointerArray(a5);
    return new e(a5);
  };
  function X2(a5, e) {
    if (arguments.length < 1) throw new Error("mnemonist/vector: expecting at least a byte array constructor.");
    var r = e || 0, o = DT, s = 0, u = false;
    typeof e == "object" && (r = e.initialCapacity || 0, s = e.initialLength || 0, o = e.policy || o, u = e.factory === true), this.factory = u ? a5 : null, this.ArrayClass = a5, this.length = s, this.capacity = Math.max(s, r), this.policy = o, this.array = new a5(this.capacity);
  }
  X2.prototype.set = function(a5, e) {
    if (this.length < a5) throw new Error("Vector(" + this.ArrayClass.name + ").set: index out of bounds.");
    return this.array[a5] = e, this;
  };
  X2.prototype.get = function(a5) {
    if (!(this.length < a5)) return this.array[a5];
  };
  X2.prototype.applyPolicy = function(a5) {
    var e = this.policy(a5 || this.capacity);
    if (typeof e != "number" || e < 0) throw new Error("mnemonist/vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
    if (e <= this.capacity) throw new Error("mnemonist/vector.applyPolicy: policy returned a less or equal capacity to allocate.");
    return e;
  };
  X2.prototype.reallocate = function(a5) {
    if (a5 === this.capacity) return this;
    var e = this.array;
    if (a5 < this.length && (this.length = a5), a5 > this.capacity) if (this.factory === null ? this.array = new this.ArrayClass(a5) : this.array = this.factory(a5), yh.isTypedArray(this.array)) this.array.set(e, 0);
    else for (var r = 0, o = this.length; r < o; r++) this.array[r] = e[r];
    else this.array = e.slice(0, a5);
    return this.capacity = a5, this;
  };
  X2.prototype.grow = function(a5) {
    var e;
    if (typeof a5 == "number") {
      if (this.capacity >= a5) return this;
      for (e = this.capacity; e < a5; ) e = this.applyPolicy(e);
      return this.reallocate(e), this;
    }
    return e = this.applyPolicy(), this.reallocate(e), this;
  };
  X2.prototype.resize = function(a5) {
    return a5 === this.length ? this : a5 < this.length ? (this.length = a5, this) : (this.length = a5, this.reallocate(a5), this);
  };
  X2.prototype.push = function(a5) {
    return this.capacity === this.length && this.grow(), this.array[this.length++] = a5, this.length;
  };
  X2.prototype.pop = function() {
    if (this.length !== 0) return this.array[--this.length];
  };
  X2.prototype.values = function() {
    var a5 = this.array, e = this.length, r = 0;
    return new gh(function() {
      if (r >= e) return { done: true };
      var o = a5[r];
      return r++, { value: o, done: false };
    });
  };
  X2.prototype.entries = function() {
    var a5 = this.array, e = this.length, r = 0;
    return new gh(function() {
      if (r >= e) return { done: true };
      var o = a5[r];
      return { value: [r++, o], done: false };
    });
  };
  typeof Symbol != "undefined" && (X2.prototype[Symbol.iterator] = X2.prototype.values);
  X2.prototype.inspect = function() {
    var a5 = this.array.slice(0, this.length);
    return a5.type = this.array.constructor.name, a5.items = this.length, a5.capacity = this.capacity, Object.defineProperty(a5, "constructor", { value: X2, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (X2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = X2.prototype.inspect);
  X2.from = function(a5, e, r) {
    if (arguments.length < 3 && (r = ET.guessLength(a5), typeof r != "number")) throw new Error("mnemonist/vector.from: could not guess iterable length. Please provide desired capacity as last argument.");
    var o = new X2(e, r);
    return OT(a5, function(s) {
      o.push(s);
    }), o;
  };
  function _e(a5) {
    var e = function(o) {
      X2.call(this, a5, o);
    };
    for (var r in X2.prototype) X2.prototype.hasOwnProperty(r) && (e.prototype[r] = X2.prototype[r]);
    return e.from = function(o, s) {
      return X2.from(o, a5, s);
    }, typeof Symbol != "undefined" && (e.prototype[Symbol.iterator] = e.prototype.values), e;
  }
  X2.Int8Vector = _e(Int8Array);
  X2.Uint8Vector = _e(Uint8Array);
  X2.Uint8ClampedVector = _e(Uint8ClampedArray);
  X2.Int16Vector = _e(Int16Array);
  X2.Uint16Vector = _e(Uint16Array);
  X2.Int32Vector = _e(Int32Array);
  X2.Uint32Vector = _e(Uint32Array);
  X2.Float32Vector = _e(Float32Array);
  X2.Float64Vector = _e(Float64Array);
  X2.PointerVector = _e(IT);
  vh.exports = X2;
});
var P = class a {
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
var W = class {
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
    return { position: new P(e.position.x, e.position.y), layer: e.charLayer };
  }
  static fromInternal(e) {
    return { position: e.position.toPosition(), charLayer: e.layer };
  }
};
var Ft = ((T2) => (T2.NONE = "none", T2.LEFT = "left", T2.UP_LEFT = "up-left", T2.UP = "up", T2.UP_RIGHT = "up-right", T2.RIGHT = "right", T2.DOWN_RIGHT = "down-right", T2.DOWN = "down", T2.DOWN_LEFT = "down-left", T2))(Ft || {});
var Gb = { up: "down", down: "up", left: "right", right: "left", none: "none", "up-left": "down-right", "up-right": "down-left", "down-right": "up-left", "down-left": "up-right" };
var jb = { up: P.UP, down: P.DOWN, left: P.LEFT, right: P.RIGHT, none: P.ZERO, "up-left": P.UP_LEFT, "up-right": P.UP_RIGHT, "down-right": P.DOWN_RIGHT, "down-left": P.DOWN_LEFT };
var bi = { up: 0, "up-right": 1, right: 2, "down-right": 3, down: 4, "down-left": 5, left: 6, "up-left": 7, none: NaN };
var Pl = ["up", "up-right", "right", "down-right", "down", "down-left", "left", "up-left"];
var Ub = ["down-left", "down-right", "up-right", "up-left"];
function Ti() {
  return ["up", "down", "left", "right", "none", "up-left", "up-right", "down-right", "down-left"];
}
function fr(a5) {
  return Ub.includes(a5);
}
function xl(a5, e = 1) {
  return a5 === "none" ? "none" : Pl[(bi[a5] + 8 - Math.abs(e) % 8) % 8];
}
function ko(a5, e = 1) {
  return a5 === "none" ? "none" : Pl[(bi[a5] + e) % 8];
}
function Wt(a5) {
  return jb[a5];
}
function Pi(a5) {
  return Gb[a5];
}
function Tt(a5, e) {
  if (a5.x === e.x) {
    if (a5.y > e.y) return "up";
    if (a5.y < e.y) return "down";
  } else if (a5.y === e.y) {
    if (a5.x > e.x) return "left";
    if (a5.x < e.x) return "right";
  } else if (a5.x > e.x) {
    if (a5.y < e.y) return "down-left";
    if (a5.y > e.y) return "up-left";
  } else if (a5.x < e.x) {
    if (a5.y < e.y) return "down-right";
    if (a5.y > e.y) return "up-right";
  }
  return "none";
}
var Nr = ((r) => (r[r.FOUR = 4] = "FOUR", r[r.EIGHT = 8] = "EIGHT", r))(Nr || {});
function Ke(a5) {
  return typeof a5 == "string" && Ti().includes(a5);
}
var na = function(a5, e) {
  return na = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, o) {
    r.__proto__ = o;
  } || function(r, o) {
    for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (r[s] = o[s]);
  }, na(a5, e);
};
function Je(a5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  na(a5, e);
  function r() {
    this.constructor = a5;
  }
  a5.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function wl(a5, e, r, o) {
  function s(u) {
    return u instanceof r ? u : new r(function(h) {
      h(u);
    });
  }
  return new (r || (r = Promise))(function(u, h) {
    function p(C) {
      try {
        T2(o.next(C));
      } catch (O) {
        h(O);
      }
    }
    function d(C) {
      try {
        T2(o.throw(C));
      } catch (O) {
        h(O);
      }
    }
    function T2(C) {
      C.done ? u(C.value) : s(C.value).then(p, d);
    }
    T2((o = o.apply(a5, e || [])).next());
  });
}
function Vo(a5, e) {
  var r = { label: 0, sent: function() {
    if (u[0] & 1) throw u[1];
    return u[1];
  }, trys: [], ops: [] }, o, s, u, h = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return h.next = p(0), h.throw = p(1), h.return = p(2), typeof Symbol == "function" && (h[Symbol.iterator] = function() {
    return this;
  }), h;
  function p(T2) {
    return function(C) {
      return d([T2, C]);
    };
  }
  function d(T2) {
    if (o) throw new TypeError("Generator is already executing.");
    for (; h && (h = 0, T2[0] && (r = 0)), r; ) try {
      if (o = 1, s && (u = T2[0] & 2 ? s.return : T2[0] ? s.throw || ((u = s.return) && u.call(s), 0) : s.next) && !(u = u.call(s, T2[1])).done) return u;
      switch (s = 0, u && (T2 = [T2[0] & 2, u.value]), T2[0]) {
        case 0:
        case 1:
          u = T2;
          break;
        case 4:
          return r.label++, { value: T2[1], done: false };
        case 5:
          r.label++, s = T2[1], T2 = [0];
          continue;
        case 7:
          T2 = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (u = r.trys, !(u = u.length > 0 && u[u.length - 1]) && (T2[0] === 6 || T2[0] === 2)) {
            r = 0;
            continue;
          }
          if (T2[0] === 3 && (!u || T2[1] > u[0] && T2[1] < u[3])) {
            r.label = T2[1];
            break;
          }
          if (T2[0] === 6 && r.label < u[1]) {
            r.label = u[1], u = T2;
            break;
          }
          if (u && r.label < u[2]) {
            r.label = u[2], r.ops.push(T2);
            break;
          }
          u[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      T2 = e.call(a5, r);
    } catch (C) {
      T2 = [6, C], s = 0;
    } finally {
      o = u = 0;
    }
    if (T2[0] & 5) throw T2[1];
    return { value: T2[0] ? T2[1] : void 0, done: true };
  }
}
function Ve(a5) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && a5[e], o = 0;
  if (r) return r.call(a5);
  if (a5 && typeof a5.length == "number") return { next: function() {
    return a5 && o >= a5.length && (a5 = void 0), { value: a5 && a5[o++], done: !a5 };
  } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ve(a5, e) {
  var r = typeof Symbol == "function" && a5[Symbol.iterator];
  if (!r) return a5;
  var o = r.call(a5), s, u = [], h;
  try {
    for (; (e === void 0 || e-- > 0) && !(s = o.next()).done; ) u.push(s.value);
  } catch (p) {
    h = { error: p };
  } finally {
    try {
      s && !s.done && (r = o.return) && r.call(o);
    } finally {
      if (h) throw h.error;
    }
  }
  return u;
}
function be(a5, e, r) {
  if (r || arguments.length === 2) for (var o = 0, s = e.length, u; o < s; o++) (u || !(o in e)) && (u || (u = Array.prototype.slice.call(e, 0, o)), u[o] = e[o]);
  return a5.concat(u || Array.prototype.slice.call(e));
}
function pr(a5) {
  return this instanceof pr ? (this.v = a5, this) : new pr(a5);
}
function Cl(a5, e, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var o = r.apply(a5, e || []), s, u = [];
  return s = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), p("next"), p("throw"), p("return", h), s[Symbol.asyncIterator] = function() {
    return this;
  }, s;
  function h(D) {
    return function(k) {
      return Promise.resolve(k).then(D, O);
    };
  }
  function p(D, k) {
    o[D] && (s[D] = function(G) {
      return new Promise(function(Q2, nt) {
        u.push([D, G, Q2, nt]) > 1 || d(D, G);
      });
    }, k && (s[D] = k(s[D])));
  }
  function d(D, k) {
    try {
      T2(o[D](k));
    } catch (G) {
      H(u[0][3], G);
    }
  }
  function T2(D) {
    D.value instanceof pr ? Promise.resolve(D.value.v).then(C, O) : H(u[0][2], D);
  }
  function C(D) {
    d("next", D);
  }
  function O(D) {
    d("throw", D);
  }
  function H(D, k) {
    D(k), u.shift(), u.length && d(u[0][0], u[0][1]);
  }
}
function _l(a5) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = a5[Symbol.asyncIterator], r;
  return e ? e.call(a5) : (a5 = typeof Ve == "function" ? Ve(a5) : a5[Symbol.iterator](), r = {}, o("next"), o("throw"), o("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function o(u) {
    r[u] = a5[u] && function(h) {
      return new Promise(function(p, d) {
        h = a5[u](h), s(p, d, h.done, h.value);
      });
    };
  }
  function s(u, h, p, d) {
    Promise.resolve(d).then(function(T2) {
      u({ value: T2, done: p });
    }, h);
  }
}
function K(a5) {
  return typeof a5 == "function";
}
function No(a5) {
  var e = function(o) {
    Error.call(o), o.stack = new Error().stack;
  }, r = a5(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Go = No(function(a5) {
  return function(r) {
    a5(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(o, s) {
      return s + 1 + ") " + o.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function xi(a5, e) {
  if (a5) {
    var r = a5.indexOf(e);
    0 <= r && a5.splice(r, 1);
  }
}
var Gr = (function() {
  function a5(e) {
    this.initialTeardown = e, this.closed = false, this._parentage = null, this._finalizers = null;
  }
  return a5.prototype.unsubscribe = function() {
    var e, r, o, s, u;
    if (!this.closed) {
      this.closed = true;
      var h = this._parentage;
      if (h) if (this._parentage = null, Array.isArray(h)) try {
        for (var p = Ve(h), d = p.next(); !d.done; d = p.next()) {
          var T2 = d.value;
          T2.remove(this);
        }
      } catch (G) {
        e = { error: G };
      } finally {
        try {
          d && !d.done && (r = p.return) && r.call(p);
        } finally {
          if (e) throw e.error;
        }
      }
      else h.remove(this);
      var C = this.initialTeardown;
      if (K(C)) try {
        C();
      } catch (G) {
        u = G instanceof Go ? G.errors : [G];
      }
      var O = this._finalizers;
      if (O) {
        this._finalizers = null;
        try {
          for (var H = Ve(O), D = H.next(); !D.done; D = H.next()) {
            var k = D.value;
            try {
              Ll(k);
            } catch (G) {
              u = u != null ? u : [], G instanceof Go ? u = be(be([], ve(u)), ve(G.errors)) : u.push(G);
            }
          }
        } catch (G) {
          o = { error: G };
        } finally {
          try {
            D && !D.done && (s = H.return) && s.call(H);
          } finally {
            if (o) throw o.error;
          }
        }
      }
      if (u) throw new Go(u);
    }
  }, a5.prototype.add = function(e) {
    var r;
    if (e && e !== this) if (this.closed) Ll(e);
    else {
      if (e instanceof a5) {
        if (e.closed || e._hasParent(this)) return;
        e._addParent(this);
      }
      (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(e);
    }
  }, a5.prototype._hasParent = function(e) {
    var r = this._parentage;
    return r === e || Array.isArray(r) && r.includes(e);
  }, a5.prototype._addParent = function(e) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
  }, a5.prototype._removeParent = function(e) {
    var r = this._parentage;
    r === e ? this._parentage = null : Array.isArray(r) && xi(r, e);
  }, a5.prototype.remove = function(e) {
    var r = this._finalizers;
    r && xi(r, e), e instanceof a5 && e._removeParent(this);
  }, a5.EMPTY = (function() {
    var e = new a5();
    return e.closed = true, e;
  })(), a5;
})();
var sa = Gr.EMPTY;
function jo(a5) {
  return a5 instanceof Gr || a5 && "closed" in a5 && K(a5.remove) && K(a5.add) && K(a5.unsubscribe);
}
function Ll(a5) {
  K(a5) ? a5() : a5.unsubscribe();
}
var ce = { onUnhandledError: null, onStoppedNotification: null, Promise: void 0, useDeprecatedSynchronousErrorHandling: false, useDeprecatedNextContext: false };
var jr = { setTimeout: function(a5, e) {
  for (var r = [], o = 2; o < arguments.length; o++) r[o - 2] = arguments[o];
  var s = jr.delegate;
  return s != null && s.setTimeout ? s.setTimeout.apply(s, be([a5, e], ve(r))) : setTimeout.apply(void 0, be([a5, e], ve(r)));
}, clearTimeout: function(a5) {
  var e = jr.delegate;
  return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(a5);
}, delegate: void 0 };
function Uo(a5) {
  jr.setTimeout(function() {
    var e = ce.onUnhandledError;
    if (e) e(a5);
    else throw a5;
  });
}
function wi() {
}
var Sl = (function() {
  return aa("C", void 0, void 0);
})();
function Ol(a5) {
  return aa("E", void 0, a5);
}
function El(a5) {
  return aa("N", a5, void 0);
}
function aa(a5, e, r) {
  return { kind: a5, value: e, error: r };
}
var mr = null;
function Ur(a5) {
  if (ce.useDeprecatedSynchronousErrorHandling) {
    var e = !mr;
    if (e && (mr = { errorThrown: false, error: null }), a5(), e) {
      var r = mr, o = r.errorThrown, s = r.error;
      if (mr = null, o) throw s;
    }
  } else a5();
}
function Dl(a5) {
  ce.useDeprecatedSynchronousErrorHandling && mr && (mr.errorThrown = true, mr.error = a5);
}
var Ci = (function(a5) {
  Je(e, a5);
  function e(r) {
    var o = a5.call(this) || this;
    return o.isStopped = false, r ? (o.destination = r, jo(r) && r.add(o)) : o.destination = zb, o;
  }
  return e.create = function(r, o, s) {
    return new Bo(r, o, s);
  }, e.prototype.next = function(r) {
    this.isStopped ? ca(El(r), this) : this._next(r);
  }, e.prototype.error = function(r) {
    this.isStopped ? ca(Ol(r), this) : (this.isStopped = true, this._error(r));
  }, e.prototype.complete = function() {
    this.isStopped ? ca(Sl, this) : (this.isStopped = true, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = true, a5.prototype.unsubscribe.call(this), this.destination = null);
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
var Hb = Function.prototype.bind;
function ua(a5, e) {
  return Hb.call(a5, e);
}
var Bb = (function() {
  function a5(e) {
    this.partialObserver = e;
  }
  return a5.prototype.next = function(e) {
    var r = this.partialObserver;
    if (r.next) try {
      r.next(e);
    } catch (o) {
      Ho(o);
    }
  }, a5.prototype.error = function(e) {
    var r = this.partialObserver;
    if (r.error) try {
      r.error(e);
    } catch (o) {
      Ho(o);
    }
    else Ho(e);
  }, a5.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete) try {
      e.complete();
    } catch (r) {
      Ho(r);
    }
  }, a5;
})();
var Bo = (function(a5) {
  Je(e, a5);
  function e(r, o, s) {
    var u = a5.call(this) || this, h;
    if (K(r) || !r) h = { next: r != null ? r : void 0, error: o != null ? o : void 0, complete: s != null ? s : void 0 };
    else {
      var p;
      u && ce.useDeprecatedNextContext ? (p = Object.create(r), p.unsubscribe = function() {
        return u.unsubscribe();
      }, h = { next: r.next && ua(r.next, p), error: r.error && ua(r.error, p), complete: r.complete && ua(r.complete, p) }) : h = r;
    }
    return u.destination = new Bb(h), u;
  }
  return e;
})(Ci);
function Ho(a5) {
  ce.useDeprecatedSynchronousErrorHandling ? Dl(a5) : Uo(a5);
}
function Wb(a5) {
  throw a5;
}
function ca(a5, e) {
  var r = ce.onStoppedNotification;
  r && jr.setTimeout(function() {
    return r(a5, e);
  });
}
var zb = { closed: true, next: wi, error: Wb, complete: wi };
var Hr = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Wo(a5) {
  return a5;
}
function la() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  return ha(a5);
}
function ha(a5) {
  return a5.length === 0 ? Wo : a5.length === 1 ? a5[0] : function(r) {
    return a5.reduce(function(o, s) {
      return s(o);
    }, r);
  };
}
var vt = (function() {
  function a5(e) {
    e && (this._subscribe = e);
  }
  return a5.prototype.lift = function(e) {
    var r = new a5();
    return r.source = this, r.operator = e, r;
  }, a5.prototype.subscribe = function(e, r, o) {
    var s = this, u = qb(e) ? e : new Bo(e, r, o);
    return Ur(function() {
      var h = s, p = h.operator, d = h.source;
      u.add(p ? p.call(u, d) : d ? s._subscribe(u) : s._trySubscribe(u));
    }), u;
  }, a5.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (r) {
      e.error(r);
    }
  }, a5.prototype.forEach = function(e, r) {
    var o = this;
    return r = Il(r), new r(function(s, u) {
      var h = new Bo({ next: function(p) {
        try {
          e(p);
        } catch (d) {
          u(d), h.unsubscribe();
        }
      }, error: u, complete: s });
      o.subscribe(h);
    });
  }, a5.prototype._subscribe = function(e) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(e);
  }, a5.prototype[Hr] = function() {
    return this;
  }, a5.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
    return ha(e)(this);
  }, a5.prototype.toPromise = function(e) {
    var r = this;
    return e = Il(e), new e(function(o, s) {
      var u;
      r.subscribe(function(h) {
        return u = h;
      }, function(h) {
        return s(h);
      }, function() {
        return o(u);
      });
    });
  }, a5.create = function(e) {
    return new a5(e);
  }, a5;
})();
function Il(a5) {
  var e;
  return (e = a5 != null ? a5 : ce.Promise) !== null && e !== void 0 ? e : Promise;
}
function $b(a5) {
  return a5 && K(a5.next) && K(a5.error) && K(a5.complete);
}
function qb(a5) {
  return a5 && a5 instanceof Ci || $b(a5) && jo(a5);
}
function Yb(a5) {
  return K(a5 == null ? void 0 : a5.lift);
}
function Lt(a5) {
  return function(e) {
    if (Yb(e)) return e.lift(function(r) {
      try {
        return a5(r, this);
      } catch (o) {
        this.error(o);
      }
    });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function zt(a5, e, r, o, s) {
  return new Xb(a5, e, r, o, s);
}
var Xb = (function(a5) {
  Je(e, a5);
  function e(r, o, s, u, h, p) {
    var d = a5.call(this, r) || this;
    return d.onFinalize = h, d.shouldUnsubscribe = p, d._next = o ? function(T2) {
      try {
        o(T2);
      } catch (C) {
        r.error(C);
      }
    } : a5.prototype._next, d._error = u ? function(T2) {
      try {
        u(T2);
      } catch (C) {
        r.error(C);
      } finally {
        this.unsubscribe();
      }
    } : a5.prototype._error, d._complete = s ? function() {
      try {
        s();
      } catch (T2) {
        r.error(T2);
      } finally {
        this.unsubscribe();
      }
    } : a5.prototype._complete, d;
  }
  return e.prototype.unsubscribe = function() {
    var r;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var o = this.closed;
      a5.prototype.unsubscribe.call(this), !o && ((r = this.onFinalize) === null || r === void 0 || r.call(this));
    }
  }, e;
})(Ci);
var Ml = No(function(a5) {
  return function() {
    a5(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
});
var Z = (function(a5) {
  Je(e, a5);
  function e() {
    var r = a5.call(this) || this;
    return r.closed = false, r.currentObservers = null, r.observers = [], r.isStopped = false, r.hasError = false, r.thrownError = null, r;
  }
  return e.prototype.lift = function(r) {
    var o = new Al(this, this);
    return o.operator = r, o;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed) throw new Ml();
  }, e.prototype.next = function(r) {
    var o = this;
    Ur(function() {
      var s, u;
      if (o._throwIfClosed(), !o.isStopped) {
        o.currentObservers || (o.currentObservers = Array.from(o.observers));
        try {
          for (var h = Ve(o.currentObservers), p = h.next(); !p.done; p = h.next()) {
            var d = p.value;
            d.next(r);
          }
        } catch (T2) {
          s = { error: T2 };
        } finally {
          try {
            p && !p.done && (u = h.return) && u.call(h);
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
    return this._throwIfClosed(), a5.prototype._trySubscribe.call(this, r);
  }, e.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, e.prototype._innerSubscribe = function(r) {
    var o = this, s = this, u = s.hasError, h = s.isStopped, p = s.observers;
    return u || h ? sa : (this.currentObservers = null, p.push(r), new Gr(function() {
      o.currentObservers = null, xi(p, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var o = this, s = o.hasError, u = o.thrownError, h = o.isStopped;
    s ? r.error(u) : h && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new vt();
    return r.source = this, r;
  }, e.create = function(r, o) {
    return new Al(r, o);
  }, e;
})(vt);
var Al = (function(a5) {
  Je(e, a5);
  function e(r, o) {
    var s = a5.call(this) || this;
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
})(Z);
var zo = new vt(function(a5) {
  return a5.complete();
});
function Rl(a5) {
  return a5 && K(a5.schedule);
}
function Fl(a5) {
  return a5[a5.length - 1];
}
function $o(a5) {
  return Rl(Fl(a5)) ? a5.pop() : void 0;
}
function qo(a5, e) {
  return typeof Fl(a5) == "number" ? a5.pop() : e;
}
var Yo = (function(a5) {
  return a5 && typeof a5.length == "number" && typeof a5 != "function";
});
function Xo(a5) {
  return K(a5 == null ? void 0 : a5.then);
}
function Qo(a5) {
  return K(a5[Hr]);
}
function Ko(a5) {
  return Symbol.asyncIterator && K(a5 == null ? void 0 : a5[Symbol.asyncIterator]);
}
function Jo(a5) {
  return new TypeError("You provided " + (a5 !== null && typeof a5 == "object" ? "an invalid object" : "'" + a5 + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Qb() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Zo = Qb();
function tn(a5) {
  return K(a5 == null ? void 0 : a5[Zo]);
}
function en(a5) {
  return Cl(this, arguments, function() {
    var r, o, s, u;
    return Vo(this, function(h) {
      switch (h.label) {
        case 0:
          r = a5.getReader(), h.label = 1;
        case 1:
          h.trys.push([1, , 9, 10]), h.label = 2;
        case 2:
          return [4, pr(r.read())];
        case 3:
          return o = h.sent(), s = o.value, u = o.done, u ? [4, pr(void 0)] : [3, 5];
        case 4:
          return [2, h.sent()];
        case 5:
          return [4, pr(s)];
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
function rn(a5) {
  return K(a5 == null ? void 0 : a5.getReader);
}
function kt(a5) {
  if (a5 instanceof vt) return a5;
  if (a5 != null) {
    if (Qo(a5)) return Kb(a5);
    if (Yo(a5)) return Jb(a5);
    if (Xo(a5)) return Zb(a5);
    if (Ko(a5)) return kl(a5);
    if (tn(a5)) return tT(a5);
    if (rn(a5)) return eT(a5);
  }
  throw Jo(a5);
}
function Kb(a5) {
  return new vt(function(e) {
    var r = a5[Hr]();
    if (K(r.subscribe)) return r.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Jb(a5) {
  return new vt(function(e) {
    for (var r = 0; r < a5.length && !e.closed; r++) e.next(a5[r]);
    e.complete();
  });
}
function Zb(a5) {
  return new vt(function(e) {
    a5.then(function(r) {
      e.closed || (e.next(r), e.complete());
    }, function(r) {
      return e.error(r);
    }).then(null, Uo);
  });
}
function tT(a5) {
  return new vt(function(e) {
    var r, o;
    try {
      for (var s = Ve(a5), u = s.next(); !u.done; u = s.next()) {
        var h = u.value;
        if (e.next(h), e.closed) return;
      }
    } catch (p) {
      r = { error: p };
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
function kl(a5) {
  return new vt(function(e) {
    rT(a5, e).catch(function(r) {
      return e.error(r);
    });
  });
}
function eT(a5) {
  return kl(en(a5));
}
function rT(a5, e) {
  var r, o, s, u;
  return wl(this, void 0, void 0, function() {
    var h, p;
    return Vo(this, function(d) {
      switch (d.label) {
        case 0:
          d.trys.push([0, 5, 6, 11]), r = _l(a5), d.label = 1;
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
          return p = d.sent(), s = { error: p }, [3, 11];
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
function ee(a5, e, r, o, s) {
  o === void 0 && (o = 0), s === void 0 && (s = false);
  var u = e.schedule(function() {
    r(), s ? a5.add(this.schedule(null, o)) : this.unsubscribe();
  }, o);
  if (a5.add(u), !s) return u;
}
function on(a5, e) {
  return e === void 0 && (e = 0), Lt(function(r, o) {
    r.subscribe(zt(o, function(s) {
      return ee(o, a5, function() {
        return o.next(s);
      }, e);
    }, function() {
      return ee(o, a5, function() {
        return o.complete();
      }, e);
    }, function(s) {
      return ee(o, a5, function() {
        return o.error(s);
      }, e);
    }));
  });
}
function nn(a5, e) {
  return e === void 0 && (e = 0), Lt(function(r, o) {
    o.add(a5.schedule(function() {
      return r.subscribe(o);
    }, e));
  });
}
function Vl(a5, e) {
  return kt(a5).pipe(nn(e), on(e));
}
function Nl(a5, e) {
  return kt(a5).pipe(nn(e), on(e));
}
function Gl(a5, e) {
  return new vt(function(r) {
    var o = 0;
    return e.schedule(function() {
      o === a5.length ? r.complete() : (r.next(a5[o++]), r.closed || this.schedule());
    });
  });
}
function jl(a5, e) {
  return new vt(function(r) {
    var o;
    return ee(r, e, function() {
      o = a5[Zo](), ee(r, e, function() {
        var s, u, h;
        try {
          s = o.next(), u = s.value, h = s.done;
        } catch (p) {
          r.error(p);
          return;
        }
        h ? r.complete() : r.next(u);
      }, 0, true);
    }), function() {
      return K(o == null ? void 0 : o.return) && o.return();
    };
  });
}
function sn(a5, e) {
  if (!a5) throw new Error("Iterable cannot be null");
  return new vt(function(r) {
    ee(r, e, function() {
      var o = a5[Symbol.asyncIterator]();
      ee(r, e, function() {
        o.next().then(function(s) {
          s.done ? r.complete() : r.next(s.value);
        });
      }, 0, true);
    });
  });
}
function Ul(a5, e) {
  return sn(en(a5), e);
}
function Hl(a5, e) {
  if (a5 != null) {
    if (Qo(a5)) return Vl(a5, e);
    if (Yo(a5)) return Gl(a5, e);
    if (Xo(a5)) return Nl(a5, e);
    if (Ko(a5)) return sn(a5, e);
    if (tn(a5)) return jl(a5, e);
    if (rn(a5)) return Ul(a5, e);
  }
  throw Jo(a5);
}
function an(a5, e) {
  return e ? Hl(a5, e) : kt(a5);
}
function Te(a5, e) {
  return Lt(function(r, o) {
    var s = 0;
    r.subscribe(zt(o, function(u) {
      o.next(a5.call(e, u, s++));
    }));
  });
}
function Bl(a5, e, r, o, s, u, h, p) {
  var d = [], T2 = 0, C = 0, O = false, H = function() {
    O && !d.length && !T2 && e.complete();
  }, D = function(G) {
    return T2 < o ? k(G) : d.push(G);
  }, k = function(G) {
    u && e.next(G), T2++;
    var Q2 = false;
    kt(r(G, C++)).subscribe(zt(e, function(nt) {
      s == null || s(nt), u ? D(nt) : e.next(nt);
    }, function() {
      Q2 = true;
    }, void 0, function() {
      if (Q2) try {
        T2--;
        for (var nt = function() {
          var $t = d.shift();
          h ? ee(e, h, function() {
            return k($t);
          }) : k($t);
        }; d.length && T2 < o; ) nt();
        H();
      } catch ($t) {
        e.error($t);
      }
    }));
  };
  return a5.subscribe(zt(e, D, function() {
    O = true, H();
  })), function() {
    p == null || p();
  };
}
function fa(a5, e, r) {
  return r === void 0 && (r = 1 / 0), K(e) ? fa(function(o, s) {
    return Te(function(u, h) {
      return e(o, u, s, h);
    })(kt(a5(o, s)));
  }, r) : (typeof e == "number" && (r = e), Lt(function(o, s) {
    return Bl(o, s, a5, r);
  }));
}
function un(a5) {
  return a5 === void 0 && (a5 = 1 / 0), fa(Wo, a5);
}
function pa() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  var r = $o(a5), o = qo(a5, 1 / 0), s = a5;
  return s.length ? s.length === 1 ? kt(s[0]) : un(o)(an(s, r)) : zo;
}
function Pt(a5, e) {
  return Lt(function(r, o) {
    var s = 0;
    r.subscribe(zt(o, function(u) {
      return a5.call(e, u, s++) && o.next(u);
    }));
  });
}
function xt(a5) {
  return a5 <= 0 ? function() {
    return zo;
  } : Lt(function(e, r) {
    var o = 0;
    e.subscribe(zt(r, function(s) {
      ++o <= a5 && (r.next(s), a5 <= o && r.complete());
    }));
  });
}
function Wl() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  var r = $o(a5), o = qo(a5, 1 / 0);
  return Lt(function(s, u) {
    un(o)(an(be([s], ve(a5)), r)).subscribe(u);
  });
}
function ma() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  return Wl.apply(void 0, be([], ve(a5)));
}
function dt(a5) {
  return Lt(function(e, r) {
    kt(a5).subscribe(zt(r, function() {
      return r.complete();
    }, wi)), !r.closed && e.subscribe(r);
  });
}
var Ne = 1e3;
var cn = class {
  constructor(e, r) {
    this.id = e;
    this.movementDirection = "none";
    this._tilePos = { position: new P(0, 0), layer: void 0 };
    this.movementStarted$ = new Z();
    this.movementStopped$ = new Z();
    this.directionChanged$ = new Z();
    this.positionChangeStarted$ = new Z();
    this.positionChangeFinished$ = new Z();
    this.tilePositionSet$ = new Z();
    this.autoMovementSet$ = new Z();
    this.lastMovementImpulse = "none";
    this.facingDirection = "down";
    this.depthChanged$ = new Z();
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
    this.currentMovementReverted = false, this.isMoving() && this.movementStopped$.next(this.movementDirection), this.tilePositionSet$.next(Y({}, e)), this.fire(this.positionChangeStarted$, this.tilePos, e), this.fire(this.positionChangeFinished$, this.tilePos, e), this.movementDirection = "none", this.lastMovementImpulse = "none", this.tilePos = e, this.movementProgress = 0;
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
      let u = this.tilePosInDirection(new P(o, s), e);
      return this.tilemap.hasBlockingTile(u, r, Pi(e), this.ignoreMissingTiles);
    });
  }
  revertCurrentMovement() {
    this.isMoving() && (this.currentMovementReverted = true, this.movementDirection = Pi(this.movementDirection), this.movementStopped$.next(this.facingDirection), this.facingDirection = this.movementDirection, this.movementProgress = Ne - this.movementProgress, this.movementStarted$.next(this.facingDirection));
  }
  isCurrentMovementReverted() {
    return this.currentMovementReverted;
  }
  isCharBlocking(e, r) {
    return this.someCharTile((o, s) => {
      let u = this.tilePosInDirection(new P(o, s), e);
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
    let r = Math.max(0, Math.min(Ne, e));
    this.movementProgress = r;
  }
  hasWalkedHalfATile() {
    return this.movementProgress > Ne / 2;
  }
  willCrossTileBorderThisUpdate(e) {
    return this.movementProgress + this.maxProgressForDelta(e) >= Ne;
  }
  updateCharacterPosition(e) {
    let r = this.willCrossTileBorderThisUpdate(e), s = 1 - (r ? Ne - this.movementProgress : this.maxProgressForDelta(e)) / this.maxProgressForDelta(e);
    this.movementProgress = Math.min(this.movementProgress + this.maxProgressForDelta(e), Ne), r && (this.movementProgress = 0, this.shouldContinueMoving() ? (this.fire(this.positionChangeFinished$, this.tilePos, this.getNextTilePos()), this.tilePos = this.getNextTilePos(), this.startMoving(this.lastMovementImpulse), s > 0 && this.updateCharacterPosition(e * s)) : this.stopMoving());
  }
  maxProgressForDelta(e) {
    let o = e / 1e3;
    return Math.floor(o * this.speed * Ne);
  }
  get tilePos() {
    return W.clone(this._tilePos);
  }
  set tilePos(e) {
    W.copyOver(e, this._tilePos);
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
var dr = class dr2 {
  constructor(e, r) {
    this.walkingAnimationMapping = e;
    this.charsInRow = r;
    this.lastFootLeft = false;
    this.directionToFrameRow = { down: 0, "down-left": 1, "down-right": 2, left: 1, right: 2, up: 3, "up-left": 1, "up-right": 2 };
    this._isEnabled = true;
    this.frameChange$ = new Z();
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
    var T2;
    let o = Math.floor(r / this.charsInRow), s = r % this.charsInRow, u = this.charsInRow * dr2.FRAMES_CHAR_ROW, h = dr2.FRAMES_CHAR_ROW * s, p = ((T2 = this.directionToFrameRow[e]) != null ? T2 : 0) + o * dr2.FRAMES_CHAR_COL, d = h + p * u;
    return { rightFoot: d, standing: d + 1, leftFoot: d + 2 };
  }
};
dr.FRAMES_CHAR_ROW = 3, dr.FRAMES_CHAR_COL = 4;
var _i = dr;
var gr = class {
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
    return e.clone().multiply(new P(r, r));
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
    return this.isIsometric() ? ft.scalarMult(this.getTileSize(), 0.5).multiply(new P(e.x - e.y, e.x + e.y)) : e.clone().multiply(this.getTileSize());
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
    return new P(this.getTileWidth(), this.getTileHeight());
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
        let p = this.isIsometric() ? this.getTileHeight() / 2 : this.getTileHeight();
        h.setDepth(r + gr.shiftPad((u + o) * p + s, re2.Z_INDEX_PADDING));
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
var yr = re;
var ln = class {
  constructor(e, r, o, s, u) {
    this.charData = e;
    this.scene = r;
    this.tilemap = o;
    this.geHeadless = u;
    this.customOffset = new P(0, 0);
    this.depthOffset = 0;
    this.newSpriteSet$ = new Z();
    this.destroy$ = new Z();
    var h, p;
    this.layerOverlaySprite = s && e.sprite ? this.scene.add.sprite(0, 0, e.sprite.texture) : void 0, this.walkingAnimationMapping = e.walkingAnimationMapping, this.customOffset = new P(e.offsetX || 0, e.offsetY || 0), this.depthOffset = (h = e.depthOffset) != null ? h : 0, this.sprite = e.sprite, this.container = e.container, this.cachedContainerBounds = (p = e.container) == null ? void 0 : p.getBounds(), this.geHeadless.directionChanged().pipe(Pt(({ charId: d }) => d === this.charData.id)).subscribe(({ direction: d }) => {
      var T2;
      (T2 = this.animation) == null || T2.setStandingFrame(d);
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
    if (!this.sprite) return P.ZERO;
    let e = this.tilemap.getTileWidth() / 2 - Math.floor(((s = (o = this.sprite) == null ? void 0 : o.displayWidth) != null ? s : 0) / 2), r = -((h = (u = this.sprite) == null ? void 0 : u.displayHeight) != null ? h : 0) + this.tilemap.getTileHeight();
    return new P(e, r);
  }
  updatePixelPos() {
    let e = new P(this.geHeadless.getPosition(this.charData.id));
    this.geHeadless.isCurrentMovementReverted(this.charData.id) && (e = new P(this.geHeadless.getTilePosInDirection(this.geHeadless.getPosition(this.charData.id), this.geHeadless.getCharLayer(this.charData.id), Pi(this.geHeadless.getFacingDirection(this.charData.id))).position));
    let r = this.geHeadless.getMovementProgress(this.charData.id) / 1e3, s = this.tilemap.tilePosToPixelPos(e).add(this.getEngineOffset()).add(this.customOffset).add(Wt(this.geHeadless.getFacingDirection(this.charData.id)).multiply(this.tilemap.getTileDistance(this.geHeadless.getFacingDirection(this.charData.id)).scalarMult(r))), u = this.getGameObj();
    u && (u.x = Math.floor(s.x), u.y = Math.floor(s.y));
  }
  getGameObj() {
    return this.container || this.sprite;
  }
  updateGridChar() {
    var e;
    if (this.updatePixelPos(), this.sprite && this.geHeadless.isMoving(this.charData.id)) {
      let r = this.geHeadless.getMovementProgress(this.charData.id) > Ne / 2;
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
    let r = new P(this.geHeadless.getPosition(this.charData.id)), o = this.geHeadless.getCharLayer(this.charData.id);
    this.container ? this.setContainerDepth(this.container, { position: r, layer: o }) : this.sprite && this.setSpriteDepth(this.sprite, { position: r, layer: o });
    let s = this.getLayerOverlaySprite();
    if (s) {
      let u = new P(_t(Y({}, r), { y: r.y - 1 }));
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
    return gr.shiftPad(e.y + ((o = (r = this.cachedContainerBounds) == null ? void 0 : r.y) != null ? o : 0) + ((u = (s = this.cachedContainerBounds) == null ? void 0 : s.height) != null ? u : 0) + this.depthOffset, yr.Z_INDEX_PADDING);
  }
  getPaddedPixelDepthSprite(e) {
    return gr.shiftPad(e.y + e.displayHeight + this.depthOffset, yr.Z_INDEX_PADDING);
  }
  getTransitionLayer(e) {
    if (e.layer) return this.geHeadless.getTransition(e.position, e.layer) || e.layer;
  }
};
var hn = ((s) => (s.DONT_BLOCK = "DONT_BLOCK", s.BLOCK_TWO_TILES = "BLOCK_TWO_TILES", s.BLOCK_ONE_TILE_AHEAD = "BLOCK_ONE_TILE_AHEAD", s.BLOCK_ONE_TILE_BEHIND = "BLOCK_ONE_TILE_BEHIND", s))(hn || {});
var Br = ((s) => (s.STOP = "STOP", s.CLOSEST_REACHABLE = "CLOSEST_REACHABLE", s.RETRY = "RETRY", s.ALTERNATIVE_TARGETS = "ALTERNATIVE_TARGETS", s))(Br || {});
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
    return [new P(e.x, e.y + 1), new P(e.x + 1, e.y), new P(e.x - 1, e.y), new P(e.x, e.y - 1)];
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
    let r = [new P(e.x, e.y + 1), new P(e.x + 1, e.y), new P(e.x - 1, e.y), new P(e.x, e.y - 1)], o = [new P(e.x + 1, e.y + 1), new P(e.x + 1, e.y - 1), new P(e.x - 1, e.y + 1), new P(e.x - 1, e.y - 1)];
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
var Pe = class {
  constructor(e, { shortestPathAlgorithm: r = "BFS", pathWidth: o = 1, pathHeight: s = 1, numberOfDirections: u = 4, isPositionAllowed: h = (Q2, nt) => true, collisionGroups: p = [], ignoredChars: d = [], ignoreTiles: T2 = false, ignoreMapBounds: C = false, ignoreBlockedTarget: O = false, maxPathLength: H = 1 / 0, ignoreLayers: D = false, considerCosts: k = false, calculateClosestToTarget: G = true } = {}) {
    this.gridTilemap = e;
    var Q2;
    this.options = { shortestPathAlgorithm: r, pathWidth: o, pathHeight: s, numberOfDirections: u, isPositionAllowed: h, collisionGroups: p, ignoredChars: d, ignoreTiles: T2, ignoreMapBounds: C, ignoreBlockedTarget: O, maxPathLength: H, ignoreLayers: D, considerCosts: k, calculateClosestToTarget: G }, this.ignoredCharsSet = new Set(d), this.distanceUtils = le.create((Q2 = this.options.numberOfDirections) != null ? Q2 : 4);
  }
  findShortestPath(e, r) {
    this.options.ignoreLayers && (this.gridTilemap.fixCacheLayer(e.layer), r.layer = e.layer);
    let o = this.findShortestPathImpl(e, r);
    return this.gridTilemap.unfixCacheLayers(), o;
  }
  getNeighbors(e, r) {
    let o = this.distanceUtils.neighbors(e.position), s = [], u = this.options.ignoreLayers, h = this.options.ignoreBlockedTarget;
    for (let p = 0; p < o.length; p++) {
      let d = o[p], T2 = u ? e.layer : this.gridTilemap.getTransition(d, e.layer), C = { position: d, layer: T2 || e.layer };
      (!this.isBlocking(e, C) || h && W.equal(C, r)) && s.push(C);
    }
    return s;
  }
  getTransition(e, r) {
    if (!this.options.ignoreLayers) return this.gridTilemap.getTransition(e, r);
  }
  getCosts(e, r) {
    if (!this.options.considerCosts) return 1;
    let o = Tt(r.position, e);
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
    var p;
    let s = le.create((p = this.options.numberOfDirections) != null ? p : 4).neighbors(e.position), u;
    if (!this.options.ignoreLayers) {
      let d = this.gridTilemap.getReverseTransitions(e.position, e.layer);
      u = d ? [...d] : void 0;
    }
    return s.map((d) => u ? u.map((T2) => ({ position: d, layer: T2 || e.layer })) : [{ position: d, layer: e.layer }]).flat().filter((d) => !this.isBlocking(d, e) || this.options.ignoreBlockedTarget && W.equal(e, r));
  }
  hasBlockingCharFrom(e, r, o, s, u, h, p) {
    if (o === 1 && s === 1) return p.hasBlockingChar(r.position, r.layer, u, h);
    let d = (C) => p.hasBlockingChar(C, r.layer, u, h), T2 = Tt(e.position, r.position);
    return this.isBlockingMultiTile(e, T2, o, s, d);
  }
  hasBlockingTileFrom(e, r, o, s, u, h) {
    if (o === 1 && s === 1) return h.hasBlockingTile(r.position, r.layer, Tt(r.position, e.position), u);
    let p = Tt(e.position, r.position), d = (T2) => h.hasBlockingTile(T2, r.layer, p, u);
    return this.isBlockingMultiTile(e, p, o, s, d);
  }
  isBlockingMultiTile(e, r, o, s, u) {
    let h = { src: new P(e.position.x + o, e.position.y), dest: new P(e.position.x + o, e.position.y + s - 1) }, p = { src: new P(e.position.x - 1, e.position.y), dest: new P(e.position.x - 1, e.position.y + s - 1) }, d = { src: new P(e.position.x, e.position.y - 1), dest: new P(e.position.x + o - 1, e.position.y - 1) }, T2 = { src: new P(e.position.x, e.position.y + s), dest: new P(e.position.x + o - 1, e.position.y + s) };
    switch (r) {
      case "right":
        return this.checkLine(h, u);
      case "left":
        return this.checkLine(p, u);
      case "up":
        return this.checkLine(d, u);
      case "down":
        return this.checkLine(T2, u);
      case "up-left":
        return this.checkLine({ src: d.src, dest: new P(d.dest.x - 1, d.dest.y) }, u) || this.checkLine({ src: new P(p.src.x, p.src.y - 1), dest: new P(p.dest.x, p.dest.y - 1) }, u);
      case "up-right":
        return this.checkLine({ src: new P(d.src.x + 1, d.src.y), dest: d.dest }, u) || this.checkLine({ src: new P(h.src.x, h.src.y - 1), dest: new P(h.dest.x, h.dest.y - 1) }, u);
      case "down-left":
        return this.checkLine({ src: new P(p.src.x, p.src.y + 1), dest: new P(p.dest.x, p.dest.y + 1) }, u) || this.checkLine({ src: T2.src, dest: new P(T2.dest.x - 1, T2.dest.y) }, u);
      case "down-right":
        return this.checkLine({ src: new P(T2.src.x + 1, T2.src.y), dest: T2.dest }, u) || this.checkLine({ src: new P(h.src.x, h.src.y + 1), dest: new P(h.dest.x, h.dest.y + 1) }, u);
    }
    return false;
  }
  checkLine(e, r) {
    for (let o = e.src.x; o <= e.dest.x; o++) for (let s = e.src.y; s <= e.dest.y; s++) if (r(new P(o, s))) return true;
    return false;
  }
};
var _a = Fo(eh(), 1);
var Sa = Fo(uh(), 1);
var Ph = Fo(ph(), 1);
var he = Fo(bh(), 1);
var La = _a.default.MinFibonacciHeap;
var XC = _a.default.MaxFibonacciHeap;
var Th = Sa.default.MinHeap;
var QC = Sa.default.MaxHeap;
var KC = Ph.default.GeneralizedSuffixArray;
var JC = he.default.Uint8Vector;
var ZC = he.default.Uint8ClampedVector;
var t_ = he.default.Int8Vector;
var e_ = he.default.Uint16Vector;
var r_ = he.default.Int16Vector;
var i_ = he.default.Uint32Vector;
var o_ = he.default.Int32Vector;
var n_ = he.default.Float32Vector;
var s_ = he.default.Float64Vector;
var a_ = he.default.PointerVector;
var Mi = 1e5;
var xh = 2 * Mi;
var vn = class extends Pe {
  constructor(e, r = {}) {
    super(e, r);
    let o = Number.isFinite(this.gridTilemap.getWidth()) ? this.gridTilemap.getWidth() : 0, s = Number.isFinite(this.gridTilemap.getHeight()) ? this.gridTilemap.getHeight() : 0;
    this.spatialWidth = Math.max(o + 2 * Mi, xh);
    let u = Math.max(s + 2 * Mi, xh);
    this.planeSize = this.spatialWidth * u;
  }
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "A_STAR" };
  }
  getNodeId(e) {
    let r = this.gridTilemap.getLayerIndex(e.layer), o = e.position.x + Mi, s = e.position.y + Mi;
    return r * this.planeSize + s * this.spatialWidth + o;
  }
  shortestPathBfs(e, r) {
    let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), h = new Th((O, H) => {
      var D, k;
      return ((D = u.get(O.id)) != null ? D : Number.MAX_VALUE) - ((k = u.get(H.id)) != null ? k : Number.MAX_VALUE);
    }), p = e, d = this.distance(e.position, r.position), T2 = 0, C = this.getNodeId(e);
    for (h.push({ node: e, id: C, g: 0 }), s.set(C, 0), u.set(C, this.distance(e.position, r.position)); h.size > 0; ) {
      let O = h.pop();
      if (!O) break;
      let H = O.id, D = s.get(H);
      if (D === void 0 || O.g > D) continue;
      let k = O.node;
      T2++;
      let G = this.distance(k.position, r.position);
      if (G < d && (d = G, p = k), wh(k, r)) return { previous: o, closestToTarget: p, steps: T2, maxPathLengthReached: false };
      if (D + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: p, steps: T2, maxPathLengthReached: true };
      for (let Q2 of this.getNeighbors(k, r)) {
        let nt = this.getNodeId(Q2), $t = D + this.getCosts(k.position, Q2), Vt2 = s.get(nt);
        (Vt2 === void 0 || $t < Vt2) && (o.set(nt, k), s.set(nt, $t), u.set(nt, $t + this.distance(Q2.position, r.position)), h.push({ node: Q2, id: nt, g: $t }));
      }
    }
    return { previous: o, closestToTarget: p, steps: T2, maxPathLengthReached: false };
  }
  returnPath(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !wh(u, r); ) {
      let h = this.getNodeId(u);
      if (u = e.get(h), !u) return [];
      s.push(u);
    }
    return s.reverse();
  }
};
function wh(a5, e) {
  return ft.equal(a5.position, e.position) ? a5.layer === e.layer : false;
}
var bn = class {
  constructor(e) {
    this.data = e;
  }
};
var Ge = class {
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
var zr = class extends Pe {
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "BFS" };
  }
  equal(e, r) {
    return ft.equal(e.position, r.position) ? e.layer === r.layer : false;
  }
  shortestPathBfs(e, r) {
    let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), u = new Ge(), h = e, p = this.distance(e.position, r.position), d = 0;
    for (u.enqueue({ node: e, dist: 0 }), s.add(W.toString(e)); u.size() > 0; ) {
      let T2 = u.dequeue();
      if (d++, !T2) break;
      let { node: C, dist: O } = T2;
      if (O > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: h, steps: d, maxPathLengthReached: true };
      let H = this.distance(C.position, r.position);
      if (H < p && (p = H, h = C), this.equal(C, r)) return { previous: o, closestToTarget: h, steps: d, maxPathLengthReached: false };
      for (let D of this.getNeighbors(C, r)) s.has(W.toString(D)) || (o.set(W.toString(D), C), u.enqueue({ node: D, dist: O + 1 }), s.add(W.toString(D)));
    }
    return { previous: o, closestToTarget: h, steps: d, maxPathLengthReached: false };
  }
  returnPath(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !this.equal(u, r); ) {
      if (u = e.get(W.toString(u)), !u) return [];
      s.push(u);
    }
    return s.reverse();
  }
};
var Ai = 1e5;
var Ch = 2 * Ai;
var Tn = class {
  constructor(e) {
    this.getNodeId = e;
    this.previous = /* @__PURE__ */ new Map();
    this.visited = /* @__PURE__ */ new Map();
    this.queue = new Ge();
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
      let h = this.getNodeId(u);
      if (!this.visited.has(h)) {
        this.previous.set(h, r), this.queue.enqueue({ node: u, dist: o + 1 }), this.visited.set(h, o + 1);
        let p = (s = this.otherBfs) == null ? void 0 : s.visited.get(h);
        p !== void 0 && p < this.minMatching && (this.minMatching = p, this.minMatchingNode = u);
      }
    }
  }
};
var Pn = class extends Pe {
  constructor(e, r = {}) {
    super(e, r), this.spatialWidth = Math.max(this.gridTilemap.getWidth() + 2 * Ai, Ch);
    let o = Math.max(this.gridTilemap.getHeight() + 2 * Ai, Ch);
    this.planeSize = this.spatialWidth * o;
  }
  getNodeId(e) {
    let r = this.gridTilemap.getLayerIndex(e.layer), o = e.position.x + Ai, s = e.position.y + Ai;
    return r * this.planeSize + s * this.spatialWidth + o;
  }
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, o.previous2, o.matchingPos, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "BIDIRECTIONAL_SEARCH" };
  }
  equal(e, r) {
    return ft.equal(e.position, r.position) ? e.layer === r.layer : false;
  }
  shortestPathBfs(e, r) {
    var T2;
    if (W.equal(e, r)) return { previous: /* @__PURE__ */ new Map(), previous2: /* @__PURE__ */ new Map(), closestToTarget: e, steps: 0, maxPathLengthReached: false };
    let o = (C) => this.getNodeId(C), s = new Tn(o), u = new Tn(o), h = 0;
    s.otherBfs = u, u.otherBfs = s;
    let p = e, d = this.distance(e.position, r.position);
    for (s.queue.enqueue({ node: e, dist: 0 }), u.queue.enqueue({ node: r, dist: 0 }), s.visited.set(this.getNodeId(e), 0), u.visited.set(this.getNodeId(r), 0); this.shouldStop(s.queue.size() > 0, u.queue.size() > 0); ) {
      let C = s.queue.dequeue();
      if (!C) break;
      let { node: O, dist: H } = C;
      if (H + 1 + (((T2 = u.queue.peek()) == null ? void 0 : T2.dist) || 0) > this.options.maxPathLength) return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(p), steps: h, maxPathLengthReached: true };
      let D = this.distance(O.position, r.position);
      if (D < d && (d = D, p = O), h++, s.step(this.getNeighbors(O, r), O, H), s.isNewFrontier() && s.minMatchingNode) return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(r), matchingPos: s.minMatchingNode, steps: h, maxPathLengthReached: false };
      let k = u.queue.dequeue();
      if (!k) continue;
      let { node: G, dist: Q2 } = k;
      if (h++, u.step(this.getReverseNeighbors(G, r), G, Q2), u.isNewFrontier() && u.minMatchingNode) return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(r), matchingPos: u.minMatchingNode, steps: h, maxPathLengthReached: false };
    }
    return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(p), steps: h, maxPathLengthReached: false };
  }
  shouldStop(e, r) {
    return this.options.calculateClosestToTarget ? e || r : e && r;
  }
  maybeClosestToTarget(e) {
    return this.options.calculateClosestToTarget ? e : void 0;
  }
  returnPath(e, r, o, s, u) {
    if (o) {
      let h = this.getPathFromPrev(e, s, o).reverse(), p = this.getPathFromPrev(r, u, o);
      return h.pop(), [...h, ...p];
    } else return this.getPathFromPrev(e, s, u).reverse();
  }
  getPathFromPrev(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !this.equal(u, r); ) {
      if (u = e.get(this.getNodeId(u)), !u) return [];
      s.push(u);
    }
    return s;
  }
};
var Ri = 1e5;
var _h = 2 * Ri;
var $r = class extends Pe {
  constructor(r, o = {}) {
    super(r, o);
    this.openSet = new La();
    this.g = /* @__PURE__ */ new Map();
    this.f = /* @__PURE__ */ new Map();
    this.closestToTarget = { position: new P(0, 0), layer: void 0 };
    this.smallestDistToTarget = 0;
    this.steps = 0;
    this.visits = [];
    this.maxFrontierSize = 0;
    this.maxJumpSize = 0;
    let s = Number.isFinite(this.gridTilemap.getWidth()) ? this.gridTilemap.getWidth() : 0, u = Number.isFinite(this.gridTilemap.getHeight()) ? this.gridTilemap.getHeight() : 0;
    this.spatialWidth = Math.max(s + 2 * Ri, _h);
    let h = Math.max(u + 2 * Ri, _h);
    this.planeSize = this.spatialWidth * h;
  }
  getNodeId(r) {
    let o = this.gridTilemap.getLayerIndex(r.layer), s = r.position.x + Ri, u = r.position.y + Ri;
    return o * this.planeSize + u * this.spatialWidth + s;
  }
  findShortestPathImpl(r, o) {
    this.maxJumpSize = this.distance(r.position, o.position);
    let s = this.shortestPath(r, o);
    return { path: this.returnPath(s.previous, r, o), closestToTarget: s.closestToTarget, steps: s.steps, maxPathLengthReached: s.maxPathLengthReached, algorithmUsed: "JPS" };
  }
  shortestPath(r, o) {
    var h, p, d;
    this.steps = 0;
    let s = /* @__PURE__ */ new Map();
    this.g = /* @__PURE__ */ new Map(), this.f = /* @__PURE__ */ new Map(), this.closestToTarget = r, this.smallestDistToTarget = this.distance(r.position, o.position), this.openSet = new La((T2, C) => {
      var O, H;
      return ((O = this.f.get(T2.id)) != null ? O : Number.MAX_VALUE) - ((H = this.f.get(C.id)) != null ? H : Number.MAX_VALUE);
    });
    let u = this.getNodeId(r);
    for (this.openSet.push({ node: r, id: u }), this.g.set(u, 0), this.f.set(u, this.distance(r.position, o.position)), this.maxFrontierSize = Math.max(this.maxFrontierSize, this.openSet.size); this.openSet.size > 0; ) {
      let T2 = this.openSet.pop();
      if (!T2) break;
      let C = T2.node, O = T2.id;
      if (this.steps++, W.equal(C, o)) return { previous: s, closestToTarget: o, steps: this.steps, maxPathLengthReached: false };
      if (((h = this.g.get(O)) != null ? h : Number.MAX_VALUE) + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: this.closestToTarget, steps: this.steps, maxPathLengthReached: true };
      this.updateClosestToTarget(C, o);
      for (let H of this.getNeighborsInternal(C, s.get(O), o)) {
        let D = this.getNodeId(H.p), k = ((p = this.g.get(O)) != null ? p : Number.MAX_VALUE) + H.dist;
        (!this.g.has(D) || k < ((d = this.g.get(D)) != null ? d : Number.MAX_VALUE)) && (s.set(D, C), this.g.set(D, k), this.f.set(D, k + this.distance(H.p.position, o.position)), this.openSet.push({ node: H.p, id: D }));
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
    if (!o || r.layer !== o.layer) return this.getNeighbors(r, s).map((p) => ({ p, dist: 1 }));
    let u = this.prune(o, r).filter((p) => !this.isBlockingIgnoreTarget(r, p, s)).map((p) => {
      let d = this.getTransition(p.position, r.layer);
      return { position: p.position, layer: d || r.layer };
    }), h = [];
    for (let p of u) if (this.isHorizontal(r.position, p.position)) h.push({ p, dist: 1 });
    else {
      let d = this.jump(r, p, s, 1, Tt(r.position, p.position));
      d && h.push(d);
    }
    return h;
  }
  isBlockingIgnoreTarget(r, o, s) {
    return this.isBlocking(r, o) && !(this.options.ignoreBlockedTarget && W.equal(o, s));
  }
  jump(r, o, s, u, h) {
    if (!this.isBlockingIgnoreTarget(r, o, s)) return W.equal(o, s) ? { p: o, dist: u } : u >= this.maxJumpSize ? { p: o, dist: u } : this.getTransition(o.position, r.layer) !== void 0 ? { p: o, dist: u } : this.hasForced(r, o) ? { p: o, dist: u } : (this.updateClosestToTarget(o, s), this.jump(o, this.getTilePosInDir(o, h), s, u + 1, h));
  }
  isHorizontal(r, o) {
    return r.y === o.y;
  }
  getForced(r, o, s, u, h, p) {
    let d = [], T2 = r;
    return (this.blockOrTrans(T2, s) || this.blockOrTrans(s, u)) && this.addIfNotBlocked(d, o, u), (this.blockOrTrans(T2, h) || this.blockOrTrans(h, p)) && this.addIfNotBlocked(d, o, p), d;
  }
  hasForced(r, o) {
    let { topLeft: s, downLeft: u, top: h, bottom: p } = this.normalizedPositions(r, o);
    return !!((this.blockOrTrans(r, u) || this.blockOrTrans(u, p)) && !this.blockOrTrans(o, p) || (this.blockOrTrans(r, s) || this.blockOrTrans(s, h)) && !this.blockOrTrans(o, h));
  }
  prune(r, o) {
    let { right: s, top: u, bottom: h, downLeft: p, topLeft: d } = this.normalizedPositions(r, o);
    return this.isHorizontal(r.position, o.position) ? [s, u, h] : [s, ...this.getForced(r, o, p, h, d, u)];
  }
  normalizedPositions(r, o) {
    return r.position.x < o.position.x ? { topLeft: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, top: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, bottom: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, right: { position: new P(o.position.x + 1, o.position.y), layer: o.layer } } : r.position.x > o.position.x ? { topLeft: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, top: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, bottom: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, right: { position: new P(o.position.x - 1, o.position.y), layer: o.layer } } : r.position.y < o.position.y ? { topLeft: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, top: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, bottom: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, right: { position: new P(o.position.x, o.position.y + 1), layer: o.layer } } : { topLeft: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, top: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, bottom: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, right: { position: new P(o.position.x, o.position.y - 1), layer: o.layer } };
  }
  posInDir(r, o) {
    return { position: r.position.add(Wt(o)), layer: r.layer };
  }
  returnPath(r, o, s) {
    let u = [], h = s;
    for (u.push(h); !W.equal(h, o); ) {
      let p = r.get(this.getNodeId(h));
      if (!p) return [];
      this.distance(p.position, h.position) > 1 ? this.fillPath(h, p, u) : u.push(p), h = p;
    }
    return u.reverse();
  }
  fillPath(r, o, s) {
    let u = r;
    do {
      let h = Tt(u.position, o.position);
      u = this.getTilePosInDir(u, h), s.push(u);
    } while (!ft.equal(u.position, o.position));
  }
};
var xn = class {
  constructor(e, r, o, s = {}) {
    this.character = e;
    this.gridTilemap = r;
    this.charToFollow = o;
    let u = { distance: 0, noPathFoundStrategy: "STOP", maxPathLength: 1 / 0, shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH", ignoreLayers: false, considerCosts: s.considerCosts || false, facingDirection: "none", isPositionAllowedFn: () => true, ignoredChars: [] };
    this.options = Y(Y({}, u), s), this.options.considerCosts && this.options.shortestPathAlgorithm !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.options.shortestPathAlgorithm}'. It can only be used with A* algorithm.`), this.options.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1) && console.warn("GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1");
  }
  init() {
    this.updateTarget(this.charToFollow.getTilePos().position, this.charToFollow.getTilePos().layer), this.charToFollow.positionChangeStarted().pipe(dt(this.character.autoMovementSet().pipe(Pt((e) => e !== this), xt(1)))).subscribe(({ enterTile: e, enterLayer: r }) => {
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
    return r === "right" ? o.x += this.charToFollow.getTileWidth() - 1 : r === "down" ? o.y += this.charToFollow.getTileWidth() - 1 : r === "down-left" ? o.y += this.charToFollow.getTileWidth() - 1 : r === "down-right" ? (o.y += this.charToFollow.getTileWidth() - 1, o.x += this.charToFollow.getTileWidth() - 1) : r === "up-right" && (o.x += this.charToFollow.getTileWidth() - 1), this.gridTilemap.getTilePosInDirection({ position: new P(o), layer: this.charToFollow.getTilePos().layer }, r).position;
  }
  updateTarget(e, r) {
    let o = this.options.facingDirection !== "none" && this.options.distance === 0;
    o && (e = this.getFacingPos()), this.targetMovement = new qr(this.character, this.gridTilemap, { position: new P(e), layer: r }, { distance: o ? 0 : this.options.distance + 1, config: { algorithm: this.options.shortestPathAlgorithm, noPathFoundStrategy: this.options.noPathFoundStrategy, maxPathLength: this.options.maxPathLength, ignoreLayers: this.options.ignoreLayers, considerCosts: this.options.considerCosts, ignoredChars: [this.charToFollow.getId(), ...this.options.ignoredChars], isPositionAllowedFn: this.options.isPositionAllowedFn } }), this.targetMovement.init();
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
    this.delayLeft = this.delay, this.initialRow = e.getNextTilePos().position.y, this.initialCol = e.getNextTilePos().position.x, this.randomizeStepSize(), this.stepsWalked = 0, this.currentMovementDirection = "none", this.character.positionChangeStarted().pipe(dt(this.character.autoMovementSet().pipe(Pt((s) => s !== this), xt(1)))).subscribe(() => {
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
    return this.distanceUtils.distance(this.character.getNextTilePos().position.add(Wt(e)), new P(this.initialCol, this.initialRow));
  }
  getFreeRandomDirection() {
    let e = this.getFreeDirections();
    return e.length == 0 ? "none" : e[Fi.getRandomInt(e.length)];
  }
  randomizeStepSize() {
    this.stepSize = Fi.getRandomInt(this.radius) + 1;
  }
};
function Lh(a5, e) {
  return a5.filter((r) => {
    var o, s, u, h, p, d;
    return (o = e.labels) != null && o.withAllLabels ? (s = e.labels) == null ? void 0 : s.withAllLabels.every((T2) => r.hasLabel(T2)) : (u = e.labels) != null && u.withOneOfLabels ? (h = e.labels) == null ? void 0 : h.withOneOfLabels.some((T2) => r.hasLabel(T2)) : (p = e.labels) != null && p.withNoneLabels ? !((d = e.labels) != null && d.withNoneLabels.some((T2) => r.hasLabel(T2))) : true;
  });
}
var Cn = { name: "grid-engine", version: "2.52.1", description: "Phaser3 plugin for grid based movement on a 2D game board.", author: "Johannes Baum", license: "Apache-2.0", main: "dist/GridEngine.min.cjs", module: "dist/GridEngine.esm.min.js", type: "module", scripts: { test: "jest", dev: "prettier --write src/ && eslint src/", "build-web": "esbuild src/main-iife.ts --bundle --minify --alias:phaser=./src/phaser-shim.js --target=es2016 --outfile=dist/GridEngine.min.js", "build-esm": "esbuild src/main-esm.ts --bundle --minify --format=esm --external:phaser --target=es2016 --outfile=dist/GridEngine.esm.min.js", "build-cjs": "esbuild src/main-esm.ts --bundle  --minify --format=cjs --external:phaser --target=node18 --platform=node --outfile=dist/GridEngine.min.cjs", "build-types": "tsc -p tsconfig.emit-cjs.json && tsc -p tsconfig.emit-esm.json", build: "npm run build-web && npm run build-esm && npm run build-cjs && npm run build-types && node createPackageJsons.cjs", "build-speedtest": "esbuild speedtests/run.ts --bundle --format=cjs --target=node18 --platform=node --alias:phaser=./speedtests/phaser-node-shim.js --outfile=speedtests/run.cjs", lint: "eslint .", serve: "esbuild src/main-iife.ts --servedir=serve --outfile=serve/js/GridEngine.js --bundle --target=es2016 --alias:phaser=./src/phaser-shim.js", docs: "typedoc src/GridEngine.ts --excludePrivate --excludeProtected --readme none --excludeInternal --out docs/public/api --sort kind --sort alphabetical --categorizeByGroup false", "docs:dev": "vitepress dev docs", "docs:build": "vitepress build docs", "docs:preview": "vitepress preview docs" }, exports: { ".": { require: { types: "./dist/cjs/src/main-esm.d.ts", default: "./dist/GridEngine.min.cjs" }, import: { types: "./dist/mjs/src/main-esm.d.ts", default: "./dist/GridEngine.esm.min.js" } } }, files: ["dist"], types: "dist/mjs/src/main-esm.d.ts", dependencies: { mnemonist: "^0.40.3", rxjs: "^7.8.2", "tiled-property-flattener": "^1.1.1" }, peerDependencies: { phaser: "~4.0.0" }, devDependencies: { "@babel/core": "^7.28.5", "@babel/preset-env": "^7.28.5", "@eslint/eslintrc": "^3.3.3", "@eslint/js": "^9.39.4", "@stryker-mutator/core": "^9.4.0", "@stryker-mutator/jest-runner": "^9.4.0", "@types/jest": "^30.0.0", "@typescript-eslint/eslint-plugin": "^8.50.0", "@typescript-eslint/parser": "8.58.2", "babel-jest": "^30.2.0", canvas: "^3.2.0", "csv-parse": "^6.2.1", esbuild: "^0.28.0", eslint: "^9.39.4", "eslint-config-prettier": "^10.1.8", "eslint-plugin-jest": "^29.5.0", jest: "^30.2.0", "jest-environment-jsdom": "^30.3.0", phaser: "~4.0.0", phaser3spectorjs: "^0.0.8", prettier: "3.8.2", "random-js": "^2.1.0", "ts-jest": "^29.4.6", typedoc: "^0.28.15", typescript: "^6.0.2", vitepress: "^1.6.4", vue: "^3.5.26", "vue-chartjs": "^5.3.3" }, repository: { type: "git", url: "git+https://github.com/Annoraaq/grid-engine.git" }, bugs: { url: "https://github.com/Annoraaq/grid-engine/issues" }, homepage: "https://github.com/Annoraaq/grid-engine#readme", keywords: ["Phaser", "RPG", "2D", "Movement", "Grid", "Pathfinding", "Tile"] };
var _n = class {
  constructor(e, r) {
    this.collistionStrategy = e;
    this.collisionGroupRelation = r;
    this.tilePosToCharacters = new Oa();
    this.charRemoved$ = new Z();
  }
  isCharBlockingAt(e, r, o, s = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set()) {
    if (o.length === 0) return false;
    let h = this.tilePosToCharacters.get(e, r);
    return !!(h && h.size > 0 && [...h].filter((p) => !s.has(p.getId())).filter((p) => !this.doIntersect(p.getCollisionGroups(), u)).some((p) => o.some((d) => p.getCollisionGroups().some((T2) => this.collidesWith(d, T2)))));
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
    return (r = this.charRemoved$) == null ? void 0 : r.pipe(xt(1), Pt((o) => o == e));
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
      this.add(new P(o, s), e.layer, r);
    });
  }
  deleteTilePositions(e, r) {
    this.forEachCharTile(e, r, (o, s) => {
      var u;
      (u = this.tilePosToCharacters.get(new P(o, s), e.layer)) == null || u.delete(r);
    });
  }
  forEachCharTile(e, r, o) {
    let s = e.position;
    for (let u = s.x; u < s.x + r.getTileWidth(); u++) for (let h = s.y; h < s.y + r.getTileHeight(); h++) o(u, h);
  }
  posChangeToLayerPos() {
    return la(Te((e) => ({ enter: { position: new P(e.enterTile), layer: e.enterLayer }, exit: { position: new P(e.exitTile), layer: e.exitLayer } })));
  }
  posToString(e, r) {
    return `${e.x}#${e.y}#${r}`;
  }
};
var Oa = class {
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
var er = class {
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
var Sh = 0;
var AT = 1;
var Ea = { none: 1, left: 2, "up-left": 3, up: 4, "up-right": 5, right: 6, "down-right": 7, down: 8, "down-left": 9 };
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
    e || (e = new er(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight()));
    let r = this.tilemap.getLayers().filter((o) => o.isCharLayer());
    for (let o of [...r, void 0]) {
      let s = this.tileCollisionCache.get(o == null ? void 0 : o.getName());
      if (s === void 0) {
        s = new Array(this.tilemap.getWidth());
        for (let u = 0; u < this.tilemap.getWidth(); u++) s[u] = new Array(this.tilemap.getHeight());
        this.tileCollisionCache.set(o == null ? void 0 : o.getName(), s);
      }
      for (let u = e.getY(); u < e.getY() + e.getHeight(); u++) for (let h = e.getX(); h < e.getX() + e.getWidth(); h++) {
        let p = 0;
        !this.gridTilemap.hasNoTileUncached(new P(h, u), o == null ? void 0 : o.getName()) && (p = Da(p, 0));
        for (let C of Ti()) this.gridTilemap.hasBlockingTileUncached(new P(h, u), o == null ? void 0 : o.getName(), C, true) && (p = Da(p, Ea[C]));
        this.gridTilemap.hasBlockingTileUncached(new P(h, u), o == null ? void 0 : o.getName(), void 0, true) && (p = Da(p, Ea.none)), s[h][u] = p;
      }
    }
  }
  hasTileAt(e, r, o) {
    var h;
    let s = this.fixedLayer || this.tileCollisionCache.get(o), u = (h = s == null ? void 0 : s[e]) == null ? void 0 : h[r];
    if (u !== void 0) return Ln(u, Sh);
  }
  isBlockingFrom(e, r, o, s, u) {
    var d;
    let h = this.fixedLayer || this.tileCollisionCache.get(o), p = (d = h == null ? void 0 : h[e]) == null ? void 0 : d[r];
    if (p !== void 0) return !u && !Ln(p, Sh) ? true : s === void 0 ? Ln(p, AT) : Ln(p, Ea[s]);
  }
};
function Da(a5, e) {
  return a5 | 1 << e;
}
function Ln(a5, e) {
  return (a5 >> e & 1) == 1;
}
var Oh = "ge_cost";
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
    for (let h of Ti()) this.collidesPropNames.set(h, En2.ONE_WAY_COLLIDE_PROP_PREFIX + h), this.tileCostPropNames.set(h, `${Oh}_${h}`);
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
    r === void 0 ? e.setTilePosition(_t(Y({}, e.getNextTilePos()), { layer: this.getLowestCharLayer() })) : this.getCharLayerNames().includes(r) || console.warn(`Char layer '${r}' of character '${e.getId()}' is unknown.`), this.charBlockCache.addCharacter(e);
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
    if (this.transitions.size === 0) return;
    let o = this.transitions.get(e.toString());
    if (o) return o.get(r);
  }
  getReverseTransitions(e, r) {
    let o = this.reverseTransitions.get(e.toString());
    if (o) return o.get(r);
  }
  setTransition(e, r, o) {
    var s, u, h, p, d;
    this.transitions.has(e.toString()) || this.transitions.set(e.toString(), /* @__PURE__ */ new Map()), this.reverseTransitions.has(e.toString()) || this.reverseTransitions.set(e.toString(), /* @__PURE__ */ new Map()), (s = this.transitions.get(e.toString())) == null || s.set(r, o), (u = this.reverseTransitions.get(e.toString())) != null && u.has(o) || (h = this.reverseTransitions.get(e.toString())) == null || h.set(o, /* @__PURE__ */ new Set()), (d = (p = this.reverseTransitions.get(e.toString())) == null ? void 0 : p.get(o)) == null || d.add(r);
  }
  getTransitions() {
    return new Map([...this.transitions].map(([e, r]) => [e, new Map(r)]));
  }
  getTileCosts(e, r) {
    let o = this.getCollisionRelevantLayers(e.layer), s = 1;
    for (let u of o) s = Math.max(s, this.getTileCostsForLayer(_t(Y({}, e), { layer: u.getName() }), r));
    return s;
  }
  getTileCostsForLayer(e, r) {
    let o = this.tilemap.getTileAt(e.position.x, e.position.y, e.layer);
    return r && (o == null ? void 0 : o.getProperty(this.tileCostPropNames.get(r) || "")) || (o == null ? void 0 : o.getProperty(Oh)) || 1;
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
    return new er(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight()).isInRange(e);
  }
  toMapDirection(e) {
    return this.isIsometric() ? xl(e) : e;
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
    return this.tilemap.getLayers().filter((e) => e.isCharLayer()).map((e) => e.getProperty(Yr)).filter(RT);
  }
};
En.ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
var On = En;
function RT(a5) {
  return a5 != null;
}
var Ia = ((r) => (r.REMOVED = "REMOVED", r.ADDED = "ADDED", r))(Ia || {});
var Eh = ((o) => (o.WAIT = "WAIT", o.SKIP = "SKIP", o.STOP = "STOP", o))(Eh || {});
var Dn = class {
  constructor(e, r) {
    this.character = e;
    this.tilemap = r;
    this.queue = new Ge();
    this.finished$ = new Z();
    this.pathBlockedWaitElapsed = 0;
    this.distanceUtils = le.create(e.getNumberOfDirections());
  }
  init() {
    this.character.autoMovementSet().pipe(Pt((e) => e !== this), xt(1)).subscribe(() => {
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
    for (let p of e) {
      let d = { command: p, config: o };
      if (Ke(p)) {
        this.queue.enqueue(d);
        continue;
      }
      let T2 = this.queue.peekEnd(), C = T2 == null ? void 0 : T2.command;
      if (C || (C = this.character.getNextTilePos()), Ke(C)) {
        this.queue.enqueue(d);
        continue;
      }
      let O = this.distanceUtils.distance(C.position, p.position) === 1;
      (!r.ignoreInvalidPositions || O) && this.queue.enqueue(d);
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
    if (Ke(o) && (o = this.tilemap.getTilePosInDirection(this.character.getNextTilePos(), o)), s.skipInvalidPositions) {
      if (o = this.getNextValidPosition(), !o) {
        this.finishInvalidNextPos(o);
        return;
      }
    } else if (!this.isNeighborPos(o)) {
      this.finishInvalidNextPos(o);
      return;
    }
    if (this.character.isBlockingDirection(Tt(this.character.getNextTilePos().position, o.position))) {
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
      if (Ke(r) && (r = this.tilemap.getTilePosInDirection(this.character.getNextTilePos(), r)), r && this.isNeighborPos(r)) return r;
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
    this.queue = new Ge(), this.finished$.next({ position: o.position, result: e, description: r, layer: o.layer });
  }
  getDir(e, r) {
    return this.tilemap.fromMapDirection(Tt(e, r));
  }
  posToStr(e) {
    return `(${e.position.x}, ${e.position.y}, ${e.layer})`;
  }
};
var FT = Cn.version;
var In = class {
  constructor(e = true) {
    this.isCreatedInternal = false;
    e && console.log(`Using GridEngine v${FT}`);
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
    return this.initGuard(), (o = this.gridTilemap) == null ? void 0 : o.getTransition(new P(e), r);
  }
  setTransition(e, r, o) {
    var s;
    return this.initGuard(), (s = this.gridTilemap) == null ? void 0 : s.setTransition(new P(e), r, o);
  }
  create(e, r) {
    this.isCreatedInternal = true, this.gridCharacters = /* @__PURE__ */ new Map();
    let o = this.setConfigDefaults(r);
    this.config = o, this.movementStopped$ = new Z(), this.movementStarted$ = new Z(), this.directionChanged$ = new Z(), this.positionChangeStarted$ = new Z(), this.positionChangeFinished$ = new Z(), this.queueMovementFinished$ = new Z(), this.charRemoved$ = new Z(), this.charAdded$ = new Z(), this.gridTilemap = new On(e, this.config.collisionTilePropertyName, this.config.characterCollisionStrategy, this.recordToMap(this.config.collisionGroupRelation), this.config.cacheTileCollisions), this.addCharacters();
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
    var p;
    let s = this.assembleMoveToConfig(o);
    this.initGuard();
    let u = (p = this.gridCharacters) == null ? void 0 : p.get(e);
    if (!u) throw this.createCharUnknownErr(e);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let h = new qr(u, this.gridTilemap, { position: new P(r), layer: (o == null ? void 0 : o.targetLayer) || u.getNextTilePos().layer }, { distance: 0, config: s });
    return u.setMovement(h), h.init(), h.finishedObs().pipe(Te((d) => ({ charId: e, position: d.position, result: d.result, description: d.description, layer: d.layer, finishedEvent: d.finishedEvent })));
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
    var u, h, p, d, T2;
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();
    let r = { speed: e.speed || 4, tilemap: this.gridTilemap, collidesWithTiles: true, collisionGroups: ["geDefault"], ignoreCollisionGroups: [], charLayer: e.charLayer, facingDirection: e.facingDirection, labels: e.labels, numberOfDirections: (u = e.numberOfDirections) != null ? u : this.config.numberOfDirections, tileWidth: e.tileWidth, tileHeight: e.tileHeight };
    typeof e.collides == "boolean" ? e.collides === false && (r.collidesWithTiles = false, r.collisionGroups = []) : e.collides !== void 0 && (e.collides.collidesWithTiles === false && (r.collidesWithTiles = false), e.collides.collisionGroups && (r.collisionGroups = e.collides.collisionGroups), e.collides.ignoreCollisionGroups && (r.ignoreCollisionGroups = e.collides.ignoreCollisionGroups), r.ignoreMissingTiles = (p = (h = e.collides) == null ? void 0 : h.ignoreMissingTiles) != null ? p : false);
    let o = new cn(e.id, r);
    e.startPosition && o.setTilePosition({ position: new P(e.startPosition), layer: o.getTilePos().layer }), (d = this.gridCharacters) == null || d.set(e.id, o), this.gridTilemap.addCharacter(o);
    let s = o.getId();
    o.movementStopped().pipe(dt(this.charRemoved(s))).subscribe((C) => {
      var O;
      (O = this.movementStopped$) == null || O.next({ charId: s, direction: C });
    }), o.movementStarted().pipe(dt(this.charRemoved(s))).subscribe((C) => {
      var O;
      (O = this.movementStarted$) == null || O.next({ charId: s, direction: C });
    }), o.directionChanged().pipe(dt(this.charRemoved(s))).subscribe((C) => {
      var O;
      (O = this.directionChanged$) == null || O.next({ charId: s, direction: C });
    }), o.positionChangeStarted().pipe(dt(this.charRemoved(s))).subscribe((C) => {
      var O;
      (O = this.positionChangeStarted$) == null || O.next(Y({ charId: s }, C));
    }), o.positionChangeFinished().pipe(dt(this.charRemoved(s))).subscribe((C) => {
      var O;
      (O = this.positionChangeFinished$) == null || O.next(Y({ charId: s }, C));
    }), (T2 = this.charAdded$) == null || T2.next(s);
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
    return (e ? Lh(r, e) : r).map((s) => s.getId());
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
    var T2, C, O, H, D, k, G, Q2, nt;
    let u;
    o === void 0 ? u = { distance: 0, closestPointIfBlocked: false } : typeof o == "number" ? (u = { distance: o, closestPointIfBlocked: false }, s && (u.closestPointIfBlocked = true)) : u = o, this.initGuard();
    let h = (T2 = this.gridCharacters) == null ? void 0 : T2.get(e), p = (C = this.gridCharacters) == null ? void 0 : C.get(r);
    if (!h) throw this.createCharUnknownErr(e);
    if (!p) throw this.createCharUnknownErr(r);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let d = new xn(h, this.gridTilemap, p, { distance: (O = u.distance) != null ? O : 0, noPathFoundStrategy: u.closestPointIfBlocked ? "CLOSEST_REACHABLE" : "STOP", maxPathLength: (H = u.maxPathLength) != null ? H : 1 / 0, shortestPathAlgorithm: (D = u.algorithm) != null ? D : "BIDIRECTIONAL_SEARCH", ignoreLayers: !!u.ignoreLayers, facingDirection: (k = u.facingDirection) != null ? k : "none", considerCosts: (G = u.considerCosts) != null ? G : false, isPositionAllowedFn: (Q2 = u.isPositionAllowedFn) != null ? Q2 : (() => true), ignoredChars: (nt = u.ignoredChars) != null ? nt : [] });
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
    let o = this.gridTilemap.getCharactersAt(new P(e), r);
    return Array.from(o).map((s) => s.getId());
  }
  setPosition(e, r, o) {
    var u;
    this.initGuard();
    let s = (u = this.gridCharacters) == null ? void 0 : u.get(e);
    if (!s) throw this.createCharUnknownErr(e);
    o || s.setTilePosition({ position: new P(r), layer: s.getTilePos().layer }), s.setTilePosition({ position: new P(r), layer: o });
  }
  isBlocked(e, r, o = ["geDefault"]) {
    var u, h;
    this.initGuard();
    let s = new P(e);
    return !!((u = this.gridTilemap) != null && u.hasBlockingTile(s, r) || (h = this.gridTilemap) != null && h.hasBlockingChar(s, r, o));
  }
  isTileBlocked(e, r) {
    var o;
    return this.initGuard(), !!((o = this.gridTilemap) != null && o.hasBlockingTile(new P(e), r));
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
    let s = this.gridTilemap.getTilePosInDirection({ position: new P(e), layer: r }, o);
    return { position: s.position.toPosition(), charLayer: s.layer };
  }
  findShortestPath(e, r, o = {}) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let s = o.shortestPathAlgorithm || "BFS";
    o.considerCosts && s !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${s}'. It can only be used with A* algorithm.`);
    let u = o.pathWidth !== void 0 && o.pathWidth !== 1, h = o.pathHeight !== void 0 && o.pathHeight !== 1;
    (u || h) && s === "JPS" && console.warn("GridEngine: Pathfinding options 'pathWidth' and 'pathHeight' > 1 cannot be used with algorithm 'JPS'.");
    let d = new Xr(this.gridTilemap).findShortestPath(W.toInternal(e), W.toInternal(r), _t(Y({}, o), { shortestPathAlgorithm: s }));
    return { path: d.path.map(W.fromInternal), closestToTarget: d.closestToTarget ? W.fromInternal(d.closestToTarget) : void 0, reachedMaxPathLength: false, steps: d.steps };
  }
  steppedOn(e, r, o) {
    return this.positionChangeFinished().pipe(Pt((s) => e.includes(s.charId) && r.some((u) => u.x === s.enterTile.x && u.y === s.enterTile.y) && (o === void 0 || o.includes(s.enterLayer))));
  }
  characterShifted() {
    if (!this.charAdded$ || !this.charRemoved$) throw this.createUninitializedErr();
    return this.charAdded$.pipe(Te((e) => ({ charId: e, action: "ADDED" })), ma(this.charRemoved$.pipe(Te((e) => ({ charId: e, action: "REMOVED" })))));
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
    (u = this.gridTilemap) == null || u.rebuildTileCollisionCache(new er(e, r, o, s));
  }
  addQueueMovements(e, r, o) {
    var h, p;
    this.initGuard();
    let s = (h = this.gridCharacters) == null ? void 0 : h.get(e);
    if (!s) throw this.createCharUnknownErr(e);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let u;
    ((p = s == null ? void 0 : s.getMovement()) == null ? void 0 : p.getInfo().type) === "Queue" ? u = s.getMovement() : (u = new Dn(s, this.gridTilemap), s.setMovement(u), u.init(), u.finished().pipe(dt(pa(this.charRemoved(e), s.autoMovementSet()))).subscribe((d) => {
      var T2;
      (T2 = this.queueMovementFinished$) == null || T2.next(Y({ charId: e }, d));
    })), u.enqueue(r.map((d) => Ke(d) ? d : { position: new P(d.position), layer: d.charLayer }), o);
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
    return ((s = r.getMovement()) == null ? void 0 : s.getInfo().type) === "Queue" ? r.getMovement().peekAll().map((h) => ({ command: Ke(h.command) ? h.command : W.fromInternal(h.command), config: h.config })) : [];
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
    return this.initGuard(), (u = (s = this.gridTilemap) == null ? void 0 : s.getTileCosts({ position: new P(e), layer: r }, o)) != null ? u : 1;
  }
  getState() {
    let e = [];
    if (this.gridCharacters) for (let [r, o] of this.gridCharacters.entries()) e.push({ id: r, position: W.fromInternal(o.getTilePos()), facingDirection: o.getFacingDirection(), speed: o.getSpeed(), labels: o.getLabels(), movementProgress: o.getMovementProgress(), collisionConfig: { collisionGroups: o.getCollisionGroups(), ignoreCollisionGroups: o.getIgnoreCollisionGroups(), collidesWithTiles: o.collidesWithTiles(), ignoreMissingTiles: o.getIgnoreMissingTiles() } });
    return { characters: e };
  }
  setState(e) {
    if (this.gridCharacters) for (let r of e.characters) {
      let o = this.gridCharacters.get(r.id);
      if (o) {
        let s = o.getTilePos();
        W.equal(s, W.toInternal(r.position)) || o.setTilePosition(W.toInternal(r.position)), o.setSpeed(r.speed), o.turnTowards(r.facingDirection), r.collisionConfig.collisionGroups && o.setCollisionGroups(r.collisionConfig.collisionGroups), r.collisionConfig.collidesWithTiles !== void 0 && o.setCollidesWithTiles(r.collisionConfig.collidesWithTiles), r.collisionConfig.ignoreMissingTiles !== void 0 && o.setIgnoreMissingTiles(r.collisionConfig.ignoreMissingTiles), o.setMovementProgress(r.movementProgress), o.clearLabels(), o.addLabels(r.labels);
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
    return (r = this.charRemoved$) == null ? void 0 : r.pipe(xt(1), Pt((o) => o == e));
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
      if (!((u = this.gridTilemap) != null && u.isIsometric()) && fr(r)) {
        console.warn(`GridEngine: Character '${e}' can't be moved '${r}' in 4 direction mode.`);
        return;
      } else if ((h = this.gridTilemap) != null && h.isIsometric() && !fr(r)) {
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
    let r = _t(Y({}, e), { noPathFoundStrategy: "STOP", pathBlockedStrategy: "WAIT" });
    return e != null && e.noPathFoundStrategy && (Object.values(Br).includes(e.noPathFoundStrategy) ? r.noPathFoundStrategy = e.noPathFoundStrategy : console.warn(`GridEngine: Unknown NoPathFoundStrategy '${e.noPathFoundStrategy}'. Falling back to 'STOP'`)), e != null && e.pathBlockedStrategy && (Object.values(Si).includes(e.pathBlockedStrategy) ? r.pathBlockedStrategy = e.pathBlockedStrategy : console.warn(`GridEngine: Unknown PathBlockedStrategy '${e.pathBlockedStrategy}'. Falling back to 'WAIT'`)), r;
  }
  setConfigDefaults(e) {
    return Y({ collisionTilePropertyName: "ge_collide", numberOfDirections: 4, characterCollisionStrategy: "BLOCK_TWO_TILES", cacheTileCollisions: false }, e);
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
    if (!o || r.layer !== o.layer) return this.getNeighbors(r, s).map((p) => ({ p, dist: 1 }));
    let u = this.prune(o, r).map((p) => {
      let d = this.getTransition(p.position, r.layer);
      return { position: p.position, layer: d || r.layer };
    }), h = [];
    for (let p of u) {
      let d = this.jump(r, p, s, 1, Tt(r.position, p.position));
      d && (d.dist = this.distance(r.position, d.p.position), h.push(d));
    }
    return h;
  }
  getForced(r, o) {
    let s = [], { topLeft: u, downLeft: h, top: p, bottom: d, topRight: T2, downRight: C } = this.normalizedPositions(r, o), O = Tt(r.position, o.position);
    return fr(O) ? (this.blockOrTrans(r, u) && (this.addIfNotBlocked(s, o, p), this.addIfNotBlocked(s, o, T2), this.blockOrTrans(h, u) && this.addIfNotBlocked(s, o, u)), this.blockOrTrans(r, h) && (this.addIfNotBlocked(s, o, d), this.addIfNotBlocked(s, o, C), this.blockOrTrans(u, h) && this.addIfNotBlocked(s, o, h)), this.blockOrTrans(u, p) && this.addIfNotBlocked(s, o, p), this.blockOrTrans(h, d) && this.addIfNotBlocked(s, o, d), this.blockOrTrans(u, T2) && this.addIfNotBlocked(s, o, T2), this.blockOrTrans(h, C) && this.addIfNotBlocked(s, o, C)) : ((this.blockOrTrans(r, p) || this.blockOrTrans(p, T2)) && this.addIfNotBlocked(s, o, T2), (this.blockOrTrans(r, d) || this.blockOrTrans(d, C)) && this.addIfNotBlocked(s, o, C), this.blockOrTrans(r, u) && this.blockOrTrans(r, p) && (this.addIfNotBlocked(s, o, p), this.addIfNotBlocked(s, o, u)), this.blockOrTrans(r, h) && this.blockOrTrans(r, d) && (this.addIfNotBlocked(s, o, d), this.addIfNotBlocked(s, o, h)), this.blockOrTrans(u, p) && this.blockOrTrans(r, p) && this.addIfNotBlocked(s, o, p), this.blockOrTrans(h, d) && this.blockOrTrans(r, d) && this.addIfNotBlocked(s, o, d)), s;
  }
  hasForced(r, o) {
    let { topLeft: s, downLeft: u, top: h, bottom: p, topRight: d, downRight: T2 } = this.normalizedPositions(r, o), C = Tt(r.position, o.position);
    if (fr(C)) {
      if (this.blockOrTrans(r, s) && (!this.blockOrTrans(o, h) || !this.blockOrTrans(o, d) || this.blockOrTrans(u, s) && !this.blockOrTrans(o, s)) || this.blockOrTrans(r, u) && (!this.blockOrTrans(o, p) || !this.blockOrTrans(o, T2) || this.blockOrTrans(s, u) && !this.blockOrTrans(o, u)) || this.blockOrTrans(s, h) && !this.blockOrTrans(o, h) || this.blockOrTrans(u, p) && !this.blockOrTrans(o, p) || this.blockOrTrans(s, d) && !this.blockOrTrans(o, d) || this.blockOrTrans(u, T2) && !this.blockOrTrans(o, T2)) return true;
    } else if ((this.blockOrTrans(r, h) || this.blockOrTrans(h, d)) && !this.blockOrTrans(o, d) || (this.blockOrTrans(r, p) || this.blockOrTrans(p, T2)) && !this.blockOrTrans(o, T2) || this.blockOrTrans(r, s) && this.blockOrTrans(r, h) && (!this.blockOrTrans(o, h) || !this.blockOrTrans(o, s)) || this.blockOrTrans(r, u) && this.blockOrTrans(r, p) && (!this.blockOrTrans(o, p) || !this.blockOrTrans(o, u)) || this.blockOrTrans(s, h) && this.blockOrTrans(r, h) && !this.blockOrTrans(o, h) || this.blockOrTrans(u, p) && this.blockOrTrans(r, p) && !this.blockOrTrans(o, p)) return true;
    return false;
  }
  prune(r, o) {
    let { top: s, right: u, topRight: h, downRight: p, bottom: d } = this.normalizedPositions(r, o), T2 = this.getForced(r, o), C = Tt(r.position, o.position);
    return fr(C) ? [s, u, h, p, d, ...T2] : [u, ...T2];
  }
  jump(r, o, s, u, h) {
    let p = this.jumpCache.get(r, o);
    if (p !== null) return p;
    if (this.isBlocking(r, o) && !(W.equal(o, s) && this.options.ignoreBlockedTarget)) {
      this.jumpCache.set(r, o, void 0);
      return;
    }
    if (W.equal(o, s)) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
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
    return r.position.x < o.position.x && r.position.y === o.position.y ? { topLeft: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, top: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, bottom: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, right: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, topRight: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, downRight: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer } } : r.position.x > o.position.x && r.position.y === o.position.y ? { topLeft: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, top: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, bottom: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, right: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, topRight: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, downRight: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer } } : r.position.y < o.position.y && r.position.x === o.position.x ? { topLeft: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, top: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, bottom: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, right: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, topRight: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, downRight: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer } } : r.position.y > o.position.y && r.position.x === o.position.x ? { topLeft: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, top: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, bottom: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, right: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, topRight: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, downRight: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer } } : r.position.y < o.position.y && r.position.x < o.position.x ? { topLeft: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, downLeft: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, top: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, bottom: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, right: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, topRight: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, downRight: { position: new P(o.position.x, o.position.y + 1), layer: o.layer } } : r.position.y < o.position.y && r.position.x > o.position.x ? { topLeft: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, downLeft: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, top: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, bottom: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, right: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, topRight: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, downRight: { position: new P(o.position.x - 1, o.position.y), layer: o.layer } } : r.position.y > o.position.y && r.position.x < o.position.x ? { topLeft: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, downLeft: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, top: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, bottom: { position: new P(o.position.x + 1, o.position.y + 1), layer: o.layer }, right: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, topRight: { position: new P(o.position.x, o.position.y - 1), layer: o.layer }, downRight: { position: new P(o.position.x + 1, o.position.y), layer: o.layer } } : { topLeft: { position: new P(o.position.x, o.position.y + 1), layer: o.layer }, downLeft: { position: new P(o.position.x + 1, o.position.y), layer: o.layer }, top: { position: new P(o.position.x - 1, o.position.y + 1), layer: o.layer }, bottom: { position: new P(o.position.x + 1, o.position.y - 1), layer: o.layer }, right: { position: new P(o.position.x - 1, o.position.y - 1), layer: o.layer }, topRight: { position: new P(o.position.x - 1, o.position.y), layer: o.layer }, downRight: { position: new P(o.position.x, o.position.y - 1), layer: o.layer } };
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
    let p = h.get(r.position.x);
    p || (p = /* @__PURE__ */ new Map(), h.set(r.position.x, p));
    let d = p.get(r.position.y);
    d || (d = /* @__PURE__ */ new Map(), p.set(r.position.y, d)), d.get(r.layer) || (o === void 0 ? d.set(r.layer, null) : d.set(r.layer, o));
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
    let p = h.get(r.position.y);
    if (!p) return null;
    let d = p.get(r.layer);
    return d === void 0 ? null : d === null ? void 0 : d;
  }
};
var Xr = class {
  constructor(e) {
    this.gridTilemap = e;
  }
  findShortestPath(e, r, o = {}) {
    return kT(o.shortestPathAlgorithm || "BIDIRECTIONAL_SEARCH", this.gridTilemap, o).findShortestPath(e, r);
  }
};
function kT(a5, e, r) {
  switch (a5) {
    case "BIDIRECTIONAL_SEARCH":
      return new Pn(e, r);
    case "A_STAR":
      return new vn(e, r);
    case "JPS":
      return r.numberOfDirections === 8 ? new Mn(e, r) : new $r(e, r);
  }
  return new zr(e, r);
}
var Ma = ((d) => (d.SUCCESS = "SUCCESS", d.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED", d.PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED", d.PATH_BLOCKED = "PATH_BLOCKED", d.NO_PATH_FOUND = "NO_PATH_FOUND", d.PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT", d.MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED", d.MAX_PATH_LENGTH_REACHED = "MAX_PATH_LENGTH_REACHED", d))(Ma || {});
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
    var p, d;
    this.shortestPathAlgorithm = (p = s == null ? void 0 : s.algorithm) != null ? p : this.shortestPathAlgorithm, this.ignoreBlockedTarget = u, this.distance = h, this.noPathFoundStrategy = (s == null ? void 0 : s.noPathFoundStrategy) || "STOP", this.pathBlockedStrategy = (s == null ? void 0 : s.pathBlockedStrategy) || "WAIT", this.noPathFoundRetryable = new Li((s == null ? void 0 : s.noPathFoundRetryBackoffMs) || 200, (s == null ? void 0 : s.noPathFoundMaxRetries) || -1, () => {
      this.stop("NO_PATH_FOUND_MAX_RETRIES_EXCEEDED");
    }), this.pathBlockedRetryable = new Li((s == null ? void 0 : s.pathBlockedRetryBackoffMs) || 200, (s == null ? void 0 : s.pathBlockedMaxRetries) || -1, () => {
      this.stop("PATH_BLOCKED_MAX_RETRIES_EXCEEDED");
    }), s != null && s.isPositionAllowedFn && (this.isPositionAllowed = s.isPositionAllowedFn), s != null && s.maxPathLength && (this.maxPathLength = s.maxPathLength), this.alternativeTargets = s == null ? void 0 : s.alternativeTargets, this.noPathFoundAlternativeTargetsFallbackStrategy = s == null ? void 0 : s.noPathFoundAlternativeTargetsFallbackStrategy, s != null && s.considerCosts && this.shortestPathAlgorithm !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.shortestPathAlgorithm}'. It can only be used with A* algorithm.`), this.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1) && console.warn("GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1"), this.considerCosts = (s == null ? void 0 : s.considerCosts) || false, this.ignoreLayers = !!(s != null && s.ignoreLayers), this.distanceUtils = le.create(e.getNumberOfDirections()), this.pathBlockedWaitTimeoutMs = (s == null ? void 0 : s.pathBlockedWaitTimeoutMs) || -1, this.ignoredChars = (d = s == null ? void 0 : s.ignoredChars) != null ? d : [], this.emitFinishedEvent = (s == null ? void 0 : s.emitFinishedEvent) || "START_MOVEMENT", this.finished$ = new Z();
  }
  init() {
    this.noPathFoundRetryable.reset(), this.pathBlockedRetryable.reset(), this.pathBlockedWaitElapsed = 0, this.calcShortestPath(), this.character.autoMovementSet().pipe(Pt((e) => e !== this), xt(1)).subscribe(() => {
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
    return { type: "Target", state: { pathAhead: this.shortestPath.slice(this.posOnPath).map((e) => W.fromInternal(e)) }, config: { algorithm: this.shortestPathAlgorithm, ignoreBlockedTarget: this.ignoreBlockedTarget, distance: this.distance, targetPos: W.fromInternal(this.targetPos), noPathFoundStrategy: this.noPathFoundStrategy, pathBlockedStrategy: this.pathBlockedStrategy, noPathFoundRetryBackoffMs: this.noPathFoundRetryable.getBackoffMs(), noPathFoundMaxRetries: this.noPathFoundRetryable.getMaxRetries() } };
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
    this.emitFinishedEvent === "START_MOVEMENT" ? (this.finished$.next(r), this.finished$.complete()) : this.emitFinishedEvent === "END_MOVEMENT" ? this.character.movementStopped().pipe(xt(1)).subscribe(() => {
      this.finished$.next(_t(Y({}, r), { finishedEvent: "END_MOVEMENT" })), this.finished$.complete();
    }) : this.emitFinishedEvent === "BOTH" && (this.finished$.next(r), this.character.movementStopped().pipe(xt(1)).subscribe(() => {
      this.finished$.next(_t(Y({}, r), { finishedEvent: "END_MOVEMENT" })), this.finished$.complete();
    })), this.stopped = true;
  }
  turnTowardsTarget(e) {
    let r = this.getDir(this.character.getNextTilePos().position, e);
    this.character.movementStopped().pipe(xt(1)).subscribe(() => {
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
          let { path: p, distOffset: d } = this.pathToAlternativeTarget(W.toInternal(h), e);
          if (p.length > 0) return { path: p, distOffset: d };
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
var VT = Object.create;
var Ih = Object.defineProperty;
var NT = Object.getOwnPropertyDescriptor;
var GT = Object.getOwnPropertyNames;
var jT = Object.getPrototypeOf;
var UT = Object.prototype.hasOwnProperty;
var HT = (a5, e) => () => (e || a5((e = { exports: {} }).exports, e), e.exports);
var BT = (a5, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of GT(e)) !UT.call(a5, s) && s !== r && Ih(a5, s, { get: () => e[s], enumerable: !(o = NT(e, s)) || o.enumerable });
  return a5;
};
var Ra = (a5, e, r) => (r = a5 != null ? VT(jT(a5)) : {}, BT(e || !a5 || !a5.__esModule ? Ih(r, "default", { value: a5, enumerable: true }) : r, a5));
var Fa = HT((a5, e) => {
  (function() {
    var r, o = "4.17.21", s = 200, u = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", h = "Expected a function", p = "Invalid `variable` option passed into `_.template`", d = "__lodash_hash_undefined__", T2 = 500, C = "__lodash_placeholder__", O = 1, H = 2, D = 4, k = 1, G = 2, Q2 = 1, nt = 2, $t = 4, Vt2 = 8, Pr2 = 16, fe = 32, xr = 64, Le = 128, Qr = 256, kn = 512, Fh = 30, kh = "...", Vh = 800, Nh = 16, ja = 1, Gh = 2, jh = 3, rr2 = 1 / 0, je2 = 9007199254740991, Uh = 17976931348623157e292, Ui3 = NaN, pe = 4294967295, Hh = pe - 1, Bh = pe >>> 1, Wh = [["ary", Le], ["bind", Q2], ["bindKey", nt], ["curry", Vt2], ["curryRight", Pr2], ["flip", kn], ["partial", fe], ["partialRight", xr], ["rearg", Qr]], wr = "[object Arguments]", Hi = "[object Array]", zh = "[object AsyncFunction]", Kr = "[object Boolean]", Jr = "[object Date]", $h = "[object DOMException]", Bi = "[object Error]", Wi = "[object Function]", Ua = "[object GeneratorFunction]", ie = "[object Map]", Zr = "[object Number]", qh = "[object Null]", Se = "[object Object]", Ha = "[object Promise]", Yh = "[object Proxy]", ti = "[object RegExp]", oe = "[object Set]", ei = "[object String]", zi = "[object Symbol]", Xh = "[object Undefined]", ri = "[object WeakMap]", Qh = "[object WeakSet]", ii = "[object ArrayBuffer]", Cr = "[object DataView]", Vn = "[object Float32Array]", Nn = "[object Float64Array]", Gn = "[object Int8Array]", jn = "[object Int16Array]", Un = "[object Int32Array]", Hn = "[object Uint8Array]", Bn = "[object Uint8ClampedArray]", Wn = "[object Uint16Array]", zn = "[object Uint32Array]", Kh = /\b__p \+= '';/g, Jh = /\b(__p \+=) '' \+/g, Zh = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ba = /&(?:amp|lt|gt|quot|#39);/g, Wa = /[&<>"']/g, tf = RegExp(Ba.source), ef = RegExp(Wa.source), rf = /<%-([\s\S]+?)%>/g, of = /<%([\s\S]+?)%>/g, za = /<%=([\s\S]+?)%>/g, nf = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, sf = /^\w*$/, af = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, $n = /[\\^$.*+?()[\]{}|]/g, uf = RegExp($n.source), qn = /^\s+/, cf = /\s/, lf = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, hf = /\{\n\/\* \[wrapped with (.+)\] \*/, ff = /,? & /, pf = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, mf = /[()=,{}\[\]\/\s]/, df = /\\(\\)?/g, gf = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, $a = /\w*$/, yf = /^[-+]0x[0-9a-f]+$/i, vf = /^0b[01]+$/i, bf = /^\[object .+?Constructor\]$/, Tf = /^0o[0-7]+$/i, Pf = /^(?:0|[1-9]\d*)$/, xf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, $i = /($^)/, wf = /['\n\r\u2028\u2029\\]/g, qi = "\\ud800-\\udfff", Cf = "\\u0300-\\u036f", _f = "\\ufe20-\\ufe2f", Lf = "\\u20d0-\\u20ff", qa = Cf + _f + Lf, Ya = "\\u2700-\\u27bf", Xa = "a-z\\xdf-\\xf6\\xf8-\\xff", Sf = "\\xac\\xb1\\xd7\\xf7", Of = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Ef = "\\u2000-\\u206f", Df = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Qa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ka = "\\ufe0e\\ufe0f", Ja = Sf + Of + Ef + Df, Yn = "['\u2019]", If = "[" + qi + "]", Za = "[" + Ja + "]", Yi = "[" + qa + "]", tu = "\\d+", Mf = "[" + Ya + "]", eu = "[" + Xa + "]", ru = "[^" + qi + Ja + tu + Ya + Xa + Qa + "]", Xn = "\\ud83c[\\udffb-\\udfff]", Af = "(?:" + Yi + "|" + Xn + ")", iu = "[^" + qi + "]", Qn = "(?:\\ud83c[\\udde6-\\uddff]){2}", Kn = "[\\ud800-\\udbff][\\udc00-\\udfff]", _r = "[" + Qa + "]", ou = "\\u200d", nu = "(?:" + eu + "|" + ru + ")", Rf = "(?:" + _r + "|" + ru + ")", su = "(?:" + Yn + "(?:d|ll|m|re|s|t|ve))?", au = "(?:" + Yn + "(?:D|LL|M|RE|S|T|VE))?", uu = Af + "?", cu = "[" + Ka + "]?", Ff = "(?:" + ou + "(?:" + [iu, Qn, Kn].join("|") + ")" + cu + uu + ")*", kf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Vf = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", lu = cu + uu + Ff, Nf = "(?:" + [Mf, Qn, Kn].join("|") + ")" + lu, Gf = "(?:" + [iu + Yi + "?", Yi, Qn, Kn, If].join("|") + ")", jf = RegExp(Yn, "g"), Uf = RegExp(Yi, "g"), Jn = RegExp(Xn + "(?=" + Xn + ")|" + Gf + lu, "g"), Hf = RegExp([_r + "?" + eu + "+" + su + "(?=" + [Za, _r, "$"].join("|") + ")", Rf + "+" + au + "(?=" + [Za, _r + nu, "$"].join("|") + ")", _r + "?" + nu + "+" + su, _r + "+" + au, Vf, kf, tu, Nf].join("|"), "g"), Bf = RegExp("[" + ou + qi + qa + Ka + "]"), Wf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, zf = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], $f = -1, st = {};
    st[Vn] = st[Nn] = st[Gn] = st[jn] = st[Un] = st[Hn] = st[Bn] = st[Wn] = st[zn] = true, st[wr] = st[Hi] = st[ii] = st[Kr] = st[Cr] = st[Jr] = st[Bi] = st[Wi] = st[ie] = st[Zr] = st[Se] = st[ti] = st[oe] = st[ei] = st[ri] = false;
    var ot = {};
    ot[wr] = ot[Hi] = ot[ii] = ot[Cr] = ot[Kr] = ot[Jr] = ot[Vn] = ot[Nn] = ot[Gn] = ot[jn] = ot[Un] = ot[ie] = ot[Zr] = ot[Se] = ot[ti] = ot[oe] = ot[ei] = ot[zi] = ot[Hn] = ot[Bn] = ot[Wn] = ot[zn] = true, ot[Bi] = ot[Wi] = ot[ri] = false;
    var qf = { \u00C0: "A", \u00C1: "A", \u00C2: "A", \u00C3: "A", \u00C4: "A", \u00C5: "A", \u00E0: "a", \u00E1: "a", \u00E2: "a", \u00E3: "a", \u00E4: "a", \u00E5: "a", \u00C7: "C", \u00E7: "c", \u00D0: "D", \u00F0: "d", \u00C8: "E", \u00C9: "E", \u00CA: "E", \u00CB: "E", \u00E8: "e", \u00E9: "e", \u00EA: "e", \u00EB: "e", \u00CC: "I", \u00CD: "I", \u00CE: "I", \u00CF: "I", \u00EC: "i", \u00ED: "i", \u00EE: "i", \u00EF: "i", \u00D1: "N", \u00F1: "n", \u00D2: "O", \u00D3: "O", \u00D4: "O", \u00D5: "O", \u00D6: "O", \u00D8: "O", \u00F2: "o", \u00F3: "o", \u00F4: "o", \u00F5: "o", \u00F6: "o", \u00F8: "o", \u00D9: "U", \u00DA: "U", \u00DB: "U", \u00DC: "U", \u00F9: "u", \u00FA: "u", \u00FB: "u", \u00FC: "u", \u00DD: "Y", \u00FD: "y", \u00FF: "y", \u00C6: "Ae", \u00E6: "ae", \u00DE: "Th", \u00FE: "th", \u00DF: "ss", \u0100: "A", \u0102: "A", \u0104: "A", \u0101: "a", \u0103: "a", \u0105: "a", \u0106: "C", \u0108: "C", \u010A: "C", \u010C: "C", \u0107: "c", \u0109: "c", \u010B: "c", \u010D: "c", \u010E: "D", \u0110: "D", \u010F: "d", \u0111: "d", \u0112: "E", \u0114: "E", \u0116: "E", \u0118: "E", \u011A: "E", \u0113: "e", \u0115: "e", \u0117: "e", \u0119: "e", \u011B: "e", \u011C: "G", \u011E: "G", \u0120: "G", \u0122: "G", \u011D: "g", \u011F: "g", \u0121: "g", \u0123: "g", \u0124: "H", \u0126: "H", \u0125: "h", \u0127: "h", \u0128: "I", \u012A: "I", \u012C: "I", \u012E: "I", \u0130: "I", \u0129: "i", \u012B: "i", \u012D: "i", \u012F: "i", \u0131: "i", \u0134: "J", \u0135: "j", \u0136: "K", \u0137: "k", \u0138: "k", \u0139: "L", \u013B: "L", \u013D: "L", \u013F: "L", \u0141: "L", \u013A: "l", \u013C: "l", \u013E: "l", \u0140: "l", \u0142: "l", \u0143: "N", \u0145: "N", \u0147: "N", \u014A: "N", \u0144: "n", \u0146: "n", \u0148: "n", \u014B: "n", \u014C: "O", \u014E: "O", \u0150: "O", \u014D: "o", \u014F: "o", \u0151: "o", \u0154: "R", \u0156: "R", \u0158: "R", \u0155: "r", \u0157: "r", \u0159: "r", \u015A: "S", \u015C: "S", \u015E: "S", \u0160: "S", \u015B: "s", \u015D: "s", \u015F: "s", \u0161: "s", \u0162: "T", \u0164: "T", \u0166: "T", \u0163: "t", \u0165: "t", \u0167: "t", \u0168: "U", \u016A: "U", \u016C: "U", \u016E: "U", \u0170: "U", \u0172: "U", \u0169: "u", \u016B: "u", \u016D: "u", \u016F: "u", \u0171: "u", \u0173: "u", \u0174: "W", \u0175: "w", \u0176: "Y", \u0177: "y", \u0178: "Y", \u0179: "Z", \u017B: "Z", \u017D: "Z", \u017A: "z", \u017C: "z", \u017E: "z", \u0132: "IJ", \u0133: "ij", \u0152: "Oe", \u0153: "oe", \u0149: "'n", \u017F: "s" }, Yf = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Xf = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Qf = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, Kf = parseFloat, Jf = parseInt, hu = typeof global == "object" && global && global.Object === Object && global, Zf = typeof self == "object" && self && self.Object === Object && self, gt = hu || Zf || Function("return this")(), Zn = typeof a5 == "object" && a5 && !a5.nodeType && a5, ir = Zn && typeof e == "object" && e && !e.nodeType && e, fu = ir && ir.exports === Zn, ts = fu && hu.process, qt = (function() {
      try {
        var v = ir && ir.require && ir.require("util").types;
        return v || ts && ts.binding && ts.binding("util");
      } catch (w) {
      }
    })(), pu = qt && qt.isArrayBuffer, mu = qt && qt.isDate, du = qt && qt.isMap, gu = qt && qt.isRegExp, yu = qt && qt.isSet, vu = qt && qt.isTypedArray;
    function Nt(v, w, x) {
      switch (x.length) {
        case 0:
          return v.call(w);
        case 1:
          return v.call(w, x[0]);
        case 2:
          return v.call(w, x[0], x[1]);
        case 3:
          return v.call(w, x[0], x[1], x[2]);
      }
      return v.apply(w, x);
    }
    function tp(v, w, x, I) {
      for (var V = -1, J = v == null ? 0 : v.length; ++V < J; ) {
        var pt = v[V];
        w(I, pt, x(pt), v);
      }
      return I;
    }
    function Yt(v, w) {
      for (var x = -1, I = v == null ? 0 : v.length; ++x < I && w(v[x], x, v) !== false; ) ;
      return v;
    }
    function ep(v, w) {
      for (var x = v == null ? 0 : v.length; x-- && w(v[x], x, v) !== false; ) ;
      return v;
    }
    function bu(v, w) {
      for (var x = -1, I = v == null ? 0 : v.length; ++x < I; ) if (!w(v[x], x, v)) return false;
      return true;
    }
    function Ue(v, w) {
      for (var x = -1, I = v == null ? 0 : v.length, V = 0, J = []; ++x < I; ) {
        var pt = v[x];
        w(pt, x, v) && (J[V++] = pt);
      }
      return J;
    }
    function Xi(v, w) {
      var x = v == null ? 0 : v.length;
      return !!x && Lr(v, w, 0) > -1;
    }
    function es(v, w, x) {
      for (var I = -1, V = v == null ? 0 : v.length; ++I < V; ) if (x(w, v[I])) return true;
      return false;
    }
    function at(v, w) {
      for (var x = -1, I = v == null ? 0 : v.length, V = Array(I); ++x < I; ) V[x] = w(v[x], x, v);
      return V;
    }
    function He(v, w) {
      for (var x = -1, I = w.length, V = v.length; ++x < I; ) v[V + x] = w[x];
      return v;
    }
    function rs(v, w, x, I) {
      var V = -1, J = v == null ? 0 : v.length;
      for (I && J && (x = v[++V]); ++V < J; ) x = w(x, v[V], V, v);
      return x;
    }
    function rp(v, w, x, I) {
      var V = v == null ? 0 : v.length;
      for (I && V && (x = v[--V]); V--; ) x = w(x, v[V], V, v);
      return x;
    }
    function is(v, w) {
      for (var x = -1, I = v == null ? 0 : v.length; ++x < I; ) if (w(v[x], x, v)) return true;
      return false;
    }
    var ip = os("length");
    function op(v) {
      return v.split("");
    }
    function np(v) {
      return v.match(pf) || [];
    }
    function Tu(v, w, x) {
      var I;
      return x(v, function(V, J, pt) {
        if (w(V, J, pt)) return I = J, false;
      }), I;
    }
    function Qi(v, w, x, I) {
      for (var V = v.length, J = x + (I ? 1 : -1); I ? J-- : ++J < V; ) if (w(v[J], J, v)) return J;
      return -1;
    }
    function Lr(v, w, x) {
      return w === w ? yp(v, w, x) : Qi(v, Pu, x);
    }
    function sp(v, w, x, I) {
      for (var V = x - 1, J = v.length; ++V < J; ) if (I(v[V], w)) return V;
      return -1;
    }
    function Pu(v) {
      return v !== v;
    }
    function xu(v, w) {
      var x = v == null ? 0 : v.length;
      return x ? ss(v, w) / x : Ui3;
    }
    function os(v) {
      return function(w) {
        return w == null ? r : w[v];
      };
    }
    function ns(v) {
      return function(w) {
        return v == null ? r : v[w];
      };
    }
    function wu(v, w, x, I, V) {
      return V(v, function(J, pt, it) {
        x = I ? (I = false, J) : w(x, J, pt, it);
      }), x;
    }
    function ap(v, w) {
      var x = v.length;
      for (v.sort(w); x--; ) v[x] = v[x].value;
      return v;
    }
    function ss(v, w) {
      for (var x, I = -1, V = v.length; ++I < V; ) {
        var J = w(v[I]);
        J !== r && (x = x === r ? J : x + J);
      }
      return x;
    }
    function as(v, w) {
      for (var x = -1, I = Array(v); ++x < v; ) I[x] = w(x);
      return I;
    }
    function up(v, w) {
      return at(w, function(x) {
        return [x, v[x]];
      });
    }
    function Cu(v) {
      return v && v.slice(0, Ou(v) + 1).replace(qn, "");
    }
    function Gt(v) {
      return function(w) {
        return v(w);
      };
    }
    function us(v, w) {
      return at(w, function(x) {
        return v[x];
      });
    }
    function oi(v, w) {
      return v.has(w);
    }
    function _u(v, w) {
      for (var x = -1, I = v.length; ++x < I && Lr(w, v[x], 0) > -1; ) ;
      return x;
    }
    function Lu(v, w) {
      for (var x = v.length; x-- && Lr(w, v[x], 0) > -1; ) ;
      return x;
    }
    function cp(v, w) {
      for (var x = v.length, I = 0; x--; ) v[x] === w && ++I;
      return I;
    }
    var lp = ns(qf), hp = ns(Yf);
    function fp(v) {
      return "\\" + Qf[v];
    }
    function pp(v, w) {
      return v == null ? r : v[w];
    }
    function Sr(v) {
      return Bf.test(v);
    }
    function mp(v) {
      return Wf.test(v);
    }
    function dp(v) {
      for (var w, x = []; !(w = v.next()).done; ) x.push(w.value);
      return x;
    }
    function cs(v) {
      var w = -1, x = Array(v.size);
      return v.forEach(function(I, V) {
        x[++w] = [V, I];
      }), x;
    }
    function Su(v, w) {
      return function(x) {
        return v(w(x));
      };
    }
    function Be(v, w) {
      for (var x = -1, I = v.length, V = 0, J = []; ++x < I; ) {
        var pt = v[x];
        (pt === w || pt === C) && (v[x] = C, J[V++] = x);
      }
      return J;
    }
    function Ki(v) {
      var w = -1, x = Array(v.size);
      return v.forEach(function(I) {
        x[++w] = I;
      }), x;
    }
    function gp(v) {
      var w = -1, x = Array(v.size);
      return v.forEach(function(I) {
        x[++w] = [I, I];
      }), x;
    }
    function yp(v, w, x) {
      for (var I = x - 1, V = v.length; ++I < V; ) if (v[I] === w) return I;
      return -1;
    }
    function vp(v, w, x) {
      for (var I = x + 1; I--; ) if (v[I] === w) return I;
      return I;
    }
    function Or(v) {
      return Sr(v) ? Tp(v) : ip(v);
    }
    function ne(v) {
      return Sr(v) ? Pp(v) : op(v);
    }
    function Ou(v) {
      for (var w = v.length; w-- && cf.test(v.charAt(w)); ) ;
      return w;
    }
    var bp = ns(Xf);
    function Tp(v) {
      for (var w = Jn.lastIndex = 0; Jn.test(v); ) ++w;
      return w;
    }
    function Pp(v) {
      return v.match(Jn) || [];
    }
    function xp(v) {
      return v.match(Hf) || [];
    }
    var wp = function v(w) {
      w = w == null ? gt : We.defaults(gt.Object(), w, We.pick(gt, zf));
      var x = w.Array, I = w.Date, V = w.Error, J = w.Function, pt = w.Math, it = w.Object, ls = w.RegExp, Cp = w.String, Xt = w.TypeError, Ji = x.prototype, _p = J.prototype, Er = it.prototype, Zi = w["__core-js_shared__"], to = _p.toString, et = Er.hasOwnProperty, Lp = 0, Eu = (function() {
        var t = /[^.]+$/.exec(Zi && Zi.keys && Zi.keys.IE_PROTO || "");
        return t ? "Symbol(src)_1." + t : "";
      })(), eo = Er.toString, Sp = to.call(it), Op = gt._, Ep = ls("^" + to.call(et).replace($n, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), ro = fu ? w.Buffer : r, ze = w.Symbol, io = w.Uint8Array, Du = ro ? ro.allocUnsafe : r, oo = Su(it.getPrototypeOf, it), Iu = it.create, Mu = Er.propertyIsEnumerable, no = Ji.splice, Au = ze ? ze.isConcatSpreadable : r, ni = ze ? ze.iterator : r, or = ze ? ze.toStringTag : r, so = (function() {
        try {
          var t = cr(it, "defineProperty");
          return t({}, "", {}), t;
        } catch (i) {
        }
      })(), Dp = w.clearTimeout !== gt.clearTimeout && w.clearTimeout, Ip = I && I.now !== gt.Date.now && I.now, Mp = w.setTimeout !== gt.setTimeout && w.setTimeout, ao = pt.ceil, uo = pt.floor, hs = it.getOwnPropertySymbols, Ap = ro ? ro.isBuffer : r, Ru = w.isFinite, Rp = Ji.join, Fp = Su(it.keys, it), mt = pt.max, wt2 = pt.min, kp = I.now, Vp = w.parseInt, Fu = pt.random, Np = Ji.reverse, fs2 = cr(w, "DataView"), si = cr(w, "Map"), ps = cr(w, "Promise"), Dr = cr(w, "Set"), ai = cr(w, "WeakMap"), ui = cr(it, "create"), co = ai && new ai(), Ir = {}, Gp = lr(fs2), jp = lr(si), Up = lr(ps), Hp = lr(Dr), Bp = lr(ai), lo = ze ? ze.prototype : r, ci = lo ? lo.valueOf : r, ku = lo ? lo.toString : r;
      function f(t) {
        if (ct(t) && !N(t) && !(t instanceof $)) {
          if (t instanceof Qt) return t;
          if (et.call(t, "__wrapped__")) return Vc(t);
        }
        return new Qt(t);
      }
      var Mr = /* @__PURE__ */ (function() {
        function t() {
        }
        return function(i) {
          if (!ut(i)) return {};
          if (Iu) return Iu(i);
          t.prototype = i;
          var n = new t();
          return t.prototype = r, n;
        };
      })();
      function ho() {
      }
      function Qt(t, i) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!i, this.__index__ = 0, this.__values__ = r;
      }
      f.templateSettings = { escape: rf, evaluate: of, interpolate: za, variable: "", imports: { _: f } }, f.prototype = ho.prototype, f.prototype.constructor = f, Qt.prototype = Mr(ho.prototype), Qt.prototype.constructor = Qt;
      function $(t) {
        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = pe, this.__views__ = [];
      }
      function Wp() {
        var t = new $(this.__wrapped__);
        return t.__actions__ = It(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = It(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = It(this.__views__), t;
      }
      function zp() {
        if (this.__filtered__) {
          var t = new $(this);
          t.__dir__ = -1, t.__filtered__ = true;
        } else t = this.clone(), t.__dir__ *= -1;
        return t;
      }
      function $p() {
        var t = this.__wrapped__.value(), i = this.__dir__, n = N(t), c = i < 0, l = n ? t.length : 0, m = od(0, l, this.__views__), g = m.start, y = m.end, b = y - g, _ = c ? y : g - 1, L = this.__iteratees__, S = L.length, E = 0, M = wt2(b, this.__takeCount__);
        if (!n || !c && l == b && M == b) return sc(t, this.__actions__);
        var R = [];
        t: for (; b-- && E < M; ) {
          _ += i;
          for (var U = -1, F = t[_]; ++U < S; ) {
            var z = L[U], q = z.iteratee, Ht = z.type, Et = q(F);
            if (Ht == Gh) F = Et;
            else if (!Et) {
              if (Ht == ja) continue t;
              break t;
            }
          }
          R[E++] = F;
        }
        return R;
      }
      $.prototype = Mr(ho.prototype), $.prototype.constructor = $;
      function nr(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function qp() {
        this.__data__ = ui ? ui(null) : {}, this.size = 0;
      }
      function Yp(t) {
        var i = this.has(t) && delete this.__data__[t];
        return this.size -= i ? 1 : 0, i;
      }
      function Xp(t) {
        var i = this.__data__;
        if (ui) {
          var n = i[t];
          return n === d ? r : n;
        }
        return et.call(i, t) ? i[t] : r;
      }
      function Qp(t) {
        var i = this.__data__;
        return ui ? i[t] !== r : et.call(i, t);
      }
      function Kp(t, i) {
        var n = this.__data__;
        return this.size += this.has(t) ? 0 : 1, n[t] = ui && i === r ? d : i, this;
      }
      nr.prototype.clear = qp, nr.prototype.delete = Yp, nr.prototype.get = Xp, nr.prototype.has = Qp, nr.prototype.set = Kp;
      function Oe(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function Jp() {
        this.__data__ = [], this.size = 0;
      }
      function Zp(t) {
        var i = this.__data__, n = fo(i, t);
        if (n < 0) return false;
        var c = i.length - 1;
        return n == c ? i.pop() : no.call(i, n, 1), --this.size, true;
      }
      function tm(t) {
        var i = this.__data__, n = fo(i, t);
        return n < 0 ? r : i[n][1];
      }
      function em(t) {
        return fo(this.__data__, t) > -1;
      }
      function rm(t, i) {
        var n = this.__data__, c = fo(n, t);
        return c < 0 ? (++this.size, n.push([t, i])) : n[c][1] = i, this;
      }
      Oe.prototype.clear = Jp, Oe.prototype.delete = Zp, Oe.prototype.get = tm, Oe.prototype.has = em, Oe.prototype.set = rm;
      function Ee(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function im() {
        this.size = 0, this.__data__ = { hash: new nr(), map: new (si || Oe)(), string: new nr() };
      }
      function om(t) {
        var i = _o(this, t).delete(t);
        return this.size -= i ? 1 : 0, i;
      }
      function nm(t) {
        return _o(this, t).get(t);
      }
      function sm(t) {
        return _o(this, t).has(t);
      }
      function am(t, i) {
        var n = _o(this, t), c = n.size;
        return n.set(t, i), this.size += n.size == c ? 0 : 1, this;
      }
      Ee.prototype.clear = im, Ee.prototype.delete = om, Ee.prototype.get = nm, Ee.prototype.has = sm, Ee.prototype.set = am;
      function sr(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.__data__ = new Ee(); ++i < n; ) this.add(t[i]);
      }
      function um(t) {
        return this.__data__.set(t, d), this;
      }
      function cm(t) {
        return this.__data__.has(t);
      }
      sr.prototype.add = sr.prototype.push = um, sr.prototype.has = cm;
      function se(t) {
        var i = this.__data__ = new Oe(t);
        this.size = i.size;
      }
      function lm() {
        this.__data__ = new Oe(), this.size = 0;
      }
      function hm(t) {
        var i = this.__data__, n = i.delete(t);
        return this.size = i.size, n;
      }
      function fm(t) {
        return this.__data__.get(t);
      }
      function pm(t) {
        return this.__data__.has(t);
      }
      function mm(t, i) {
        var n = this.__data__;
        if (n instanceof Oe) {
          var c = n.__data__;
          if (!si || c.length < s - 1) return c.push([t, i]), this.size = ++n.size, this;
          n = this.__data__ = new Ee(c);
        }
        return n.set(t, i), this.size = n.size, this;
      }
      se.prototype.clear = lm, se.prototype.delete = hm, se.prototype.get = fm, se.prototype.has = pm, se.prototype.set = mm;
      function Vu(t, i) {
        var n = N(t), c = !n && hr(t), l = !n && !c && Qe(t), m = !n && !c && !l && kr(t), g = n || c || l || m, y = g ? as(t.length, Cp) : [], b = y.length;
        for (var _ in t) (i || et.call(t, _)) && !(g && (_ == "length" || l && (_ == "offset" || _ == "parent") || m && (_ == "buffer" || _ == "byteLength" || _ == "byteOffset") || Ae(_, b))) && y.push(_);
        return y;
      }
      function Nu(t) {
        var i = t.length;
        return i ? t[Cs(0, i - 1)] : r;
      }
      function dm(t, i) {
        return Lo(It(t), ar(i, 0, t.length));
      }
      function gm(t) {
        return Lo(It(t));
      }
      function ms(t, i, n) {
        (n !== r && !ae(t[i], n) || n === r && !(i in t)) && De(t, i, n);
      }
      function li(t, i, n) {
        var c = t[i];
        (!(et.call(t, i) && ae(c, n)) || n === r && !(i in t)) && De(t, i, n);
      }
      function fo(t, i) {
        for (var n = t.length; n--; ) if (ae(t[n][0], i)) return n;
        return -1;
      }
      function ym(t, i, n, c) {
        return $e(t, function(l, m, g) {
          i(c, l, n(l), g);
        }), c;
      }
      function Gu(t, i) {
        return t && de(i, yt(i), t);
      }
      function vm(t, i) {
        return t && de(i, At(i), t);
      }
      function De(t, i, n) {
        i == "__proto__" && so ? so(t, i, { configurable: true, enumerable: true, value: n, writable: true }) : t[i] = n;
      }
      function ds(t, i) {
        for (var n = -1, c = i.length, l = x(c), m = t == null; ++n < c; ) l[n] = m ? r : Xs(t, i[n]);
        return l;
      }
      function ar(t, i, n) {
        return t === t && (n !== r && (t = t <= n ? t : n), i !== r && (t = t >= i ? t : i)), t;
      }
      function Kt(t, i, n, c, l, m) {
        var g, y = i & O, b = i & H, _ = i & D;
        if (n && (g = l ? n(t, c, l, m) : n(t)), g !== r) return g;
        if (!ut(t)) return t;
        var L = N(t);
        if (L) {
          if (g = sd(t), !y) return It(t, g);
        } else {
          var S = Ct(t), E = S == Wi || S == Ua;
          if (Qe(t)) return cc(t, y);
          if (S == Se || S == wr || E && !l) {
            if (g = b || E ? {} : Oc(t), !y) return b ? Xm(t, vm(g, t)) : Ym(t, Gu(g, t));
          } else {
            if (!ot[S]) return l ? t : {};
            g = ad(t, S, y);
          }
        }
        m || (m = new se());
        var M = m.get(t);
        if (M) return M;
        m.set(t, g), il(t) ? t.forEach(function(F) {
          g.add(Kt(F, i, n, F, t, m));
        }) : el(t) && t.forEach(function(F, z) {
          g.set(z, Kt(F, i, n, z, t, m));
        });
        var R = _ ? b ? Fs : Rs : b ? At : yt, U = L ? r : R(t);
        return Yt(U || t, function(F, z) {
          U && (z = F, F = t[z]), li(g, z, Kt(F, i, n, z, t, m));
        }), g;
      }
      function bm(t) {
        var i = yt(t);
        return function(n) {
          return ju(n, t, i);
        };
      }
      function ju(t, i, n) {
        var c = n.length;
        if (t == null) return !c;
        for (t = it(t); c--; ) {
          var l = n[c], m = i[l], g = t[l];
          if (g === r && !(l in t) || !m(g)) return false;
        }
        return true;
      }
      function Uu(t, i, n) {
        if (typeof t != "function") throw new Xt(h);
        return yi(function() {
          t.apply(r, n);
        }, i);
      }
      function hi(t, i, n, c) {
        var l = -1, m = Xi, g = true, y = t.length, b = [], _ = i.length;
        if (!y) return b;
        n && (i = at(i, Gt(n))), c ? (m = es, g = false) : i.length >= s && (m = oi, g = false, i = new sr(i));
        t: for (; ++l < y; ) {
          var L = t[l], S = n == null ? L : n(L);
          if (L = c || L !== 0 ? L : 0, g && S === S) {
            for (var E = _; E--; ) if (i[E] === S) continue t;
            b.push(L);
          } else m(i, S, c) || b.push(L);
        }
        return b;
      }
      var $e = mc(me), Hu = mc(ys, true);
      function Tm(t, i) {
        var n = true;
        return $e(t, function(c, l, m) {
          return n = !!i(c, l, m), n;
        }), n;
      }
      function po(t, i, n) {
        for (var c = -1, l = t.length; ++c < l; ) {
          var m = t[c], g = i(m);
          if (g != null && (y === r ? g === g && !Ut(g) : n(g, y))) var y = g, b = m;
        }
        return b;
      }
      function Pm(t, i, n, c) {
        var l = t.length;
        for (n = j(n), n < 0 && (n = -n > l ? 0 : l + n), c = c === r || c > l ? l : j(c), c < 0 && (c += l), c = n > c ? 0 : nl(c); n < c; ) t[n++] = i;
        return t;
      }
      function Bu(t, i) {
        var n = [];
        return $e(t, function(c, l, m) {
          i(c, l, m) && n.push(c);
        }), n;
      }
      function bt(t, i, n, c, l) {
        var m = -1, g = t.length;
        for (n || (n = cd), l || (l = []); ++m < g; ) {
          var y = t[m];
          i > 0 && n(y) ? i > 1 ? bt(y, i - 1, n, c, l) : He(l, y) : c || (l[l.length] = y);
        }
        return l;
      }
      var gs = dc(), Wu = dc(true);
      function me(t, i) {
        return t && gs(t, i, yt);
      }
      function ys(t, i) {
        return t && Wu(t, i, yt);
      }
      function mo(t, i) {
        return Ue(i, function(n) {
          return Re(t[n]);
        });
      }
      function ur(t, i) {
        i = Ye(i, t);
        for (var n = 0, c = i.length; t != null && n < c; ) t = t[ge(i[n++])];
        return n && n == c ? t : r;
      }
      function zu(t, i, n) {
        var c = i(t);
        return N(t) ? c : He(c, n(t));
      }
      function St2(t) {
        return t == null ? t === r ? Xh : qh : or && or in it(t) ? id(t) : gd(t);
      }
      function vs(t, i) {
        return t > i;
      }
      function xm(t, i) {
        return t != null && et.call(t, i);
      }
      function wm(t, i) {
        return t != null && i in it(t);
      }
      function Cm(t, i, n) {
        return t >= wt2(i, n) && t < mt(i, n);
      }
      function bs(t, i, n) {
        for (var c = n ? es : Xi, l = t[0].length, m = t.length, g = m, y = x(m), b = 1 / 0, _ = []; g--; ) {
          var L = t[g];
          g && i && (L = at(L, Gt(i))), b = wt2(L.length, b), y[g] = !n && (i || l >= 120 && L.length >= 120) ? new sr(g && L) : r;
        }
        L = t[0];
        var S = -1, E = y[0];
        t: for (; ++S < l && _.length < b; ) {
          var M = L[S], R = i ? i(M) : M;
          if (M = n || M !== 0 ? M : 0, !(E ? oi(E, R) : c(_, R, n))) {
            for (g = m; --g; ) {
              var U = y[g];
              if (!(U ? oi(U, R) : c(t[g], R, n))) continue t;
            }
            E && E.push(R), _.push(M);
          }
        }
        return _;
      }
      function _m(t, i, n, c) {
        return me(t, function(l, m, g) {
          i(c, n(l), m, g);
        }), c;
      }
      function fi(t, i, n) {
        i = Ye(i, t), t = Mc(t, i);
        var c = t == null ? t : t[ge(Zt(i))];
        return c == null ? r : Nt(c, t, n);
      }
      function $u(t) {
        return ct(t) && St2(t) == wr;
      }
      function Lm(t) {
        return ct(t) && St2(t) == ii;
      }
      function Sm(t) {
        return ct(t) && St2(t) == Jr;
      }
      function pi(t, i, n, c, l) {
        return t === i ? true : t == null || i == null || !ct(t) && !ct(i) ? t !== t && i !== i : Om(t, i, n, c, pi, l);
      }
      function Om(t, i, n, c, l, m) {
        var g = N(t), y = N(i), b = g ? Hi : Ct(t), _ = y ? Hi : Ct(i);
        b = b == wr ? Se : b, _ = _ == wr ? Se : _;
        var L = b == Se, S = _ == Se, E = b == _;
        if (E && Qe(t)) {
          if (!Qe(i)) return false;
          g = true, L = false;
        }
        if (E && !L) return m || (m = new se()), g || kr(t) ? _c(t, i, n, c, l, m) : ed(t, i, b, n, c, l, m);
        if (!(n & k)) {
          var M = L && et.call(t, "__wrapped__"), R = S && et.call(i, "__wrapped__");
          if (M || R) {
            var U = M ? t.value() : t, F = R ? i.value() : i;
            return m || (m = new se()), l(U, F, n, c, m);
          }
        }
        return E ? (m || (m = new se()), rd(t, i, n, c, l, m)) : false;
      }
      function Em(t) {
        return ct(t) && Ct(t) == ie;
      }
      function Ts(t, i, n, c) {
        var l = n.length, m = l, g = !c;
        if (t == null) return !m;
        for (t = it(t); l--; ) {
          var y = n[l];
          if (g && y[2] ? y[1] !== t[y[0]] : !(y[0] in t)) return false;
        }
        for (; ++l < m; ) {
          y = n[l];
          var b = y[0], _ = t[b], L = y[1];
          if (g && y[2]) {
            if (_ === r && !(b in t)) return false;
          } else {
            var S = new se();
            if (c) var E = c(_, L, b, t, i, S);
            if (!(E === r ? pi(L, _, k | G, c, S) : E)) return false;
          }
        }
        return true;
      }
      function qu(t) {
        if (!ut(t) || hd(t)) return false;
        var i = Re(t) ? Ep : bf;
        return i.test(lr(t));
      }
      function Dm(t) {
        return ct(t) && St2(t) == ti;
      }
      function Im(t) {
        return ct(t) && Ct(t) == oe;
      }
      function Mm(t) {
        return ct(t) && Mo(t.length) && !!st[St2(t)];
      }
      function Yu(t) {
        return typeof t == "function" ? t : t == null ? Rt : typeof t == "object" ? N(t) ? Ku(t[0], t[1]) : Qu(t) : gl(t);
      }
      function Ps(t) {
        if (!gi(t)) return Fp(t);
        var i = [];
        for (var n in it(t)) et.call(t, n) && n != "constructor" && i.push(n);
        return i;
      }
      function Am(t) {
        if (!ut(t)) return dd(t);
        var i = gi(t), n = [];
        for (var c in t) c == "constructor" && (i || !et.call(t, c)) || n.push(c);
        return n;
      }
      function xs(t, i) {
        return t < i;
      }
      function Xu(t, i) {
        var n = -1, c = Mt(t) ? x(t.length) : [];
        return $e(t, function(l, m, g) {
          c[++n] = i(l, m, g);
        }), c;
      }
      function Qu(t) {
        var i = Vs(t);
        return i.length == 1 && i[0][2] ? Dc(i[0][0], i[0][1]) : function(n) {
          return n === t || Ts(n, t, i);
        };
      }
      function Ku(t, i) {
        return Gs(t) && Ec(i) ? Dc(ge(t), i) : function(n) {
          var c = Xs(n, t);
          return c === r && c === i ? Qs(n, t) : pi(i, c, k | G);
        };
      }
      function go(t, i, n, c, l) {
        t !== i && gs(i, function(m, g) {
          if (l || (l = new se()), ut(m)) Rm(t, i, g, n, go, c, l);
          else {
            var y = c ? c(Us(t, g), m, g + "", t, i, l) : r;
            y === r && (y = m), ms(t, g, y);
          }
        }, At);
      }
      function Rm(t, i, n, c, l, m, g) {
        var y = Us(t, n), b = Us(i, n), _ = g.get(b);
        if (_) {
          ms(t, n, _);
          return;
        }
        var L = m ? m(y, b, n + "", t, i, g) : r, S = L === r;
        if (S) {
          var E = N(b), M = !E && Qe(b), R = !E && !M && kr(b);
          L = b, E || M || R ? N(y) ? L = y : lt(y) ? L = It(y) : M ? (S = false, L = cc(b, true)) : R ? (S = false, L = lc(b, true)) : L = [] : vi(b) || hr(b) ? (L = y, hr(y) ? L = sl(y) : (!ut(y) || Re(y)) && (L = Oc(b))) : S = false;
        }
        S && (g.set(b, L), l(L, b, c, m, g), g.delete(b)), ms(t, n, L);
      }
      function Ju(t, i) {
        var n = t.length;
        if (n) return i += i < 0 ? n : 0, Ae(i, n) ? t[i] : r;
      }
      function Zu(t, i, n) {
        i.length ? i = at(i, function(m) {
          return N(m) ? function(g) {
            return ur(g, m.length === 1 ? m[0] : m);
          } : m;
        }) : i = [Rt];
        var c = -1;
        i = at(i, Gt(A()));
        var l = Xu(t, function(m, g, y) {
          var b = at(i, function(_) {
            return _(m);
          });
          return { criteria: b, index: ++c, value: m };
        });
        return ap(l, function(m, g) {
          return qm(m, g, n);
        });
      }
      function Fm(t, i) {
        return tc(t, i, function(n, c) {
          return Qs(t, c);
        });
      }
      function tc(t, i, n) {
        for (var c = -1, l = i.length, m = {}; ++c < l; ) {
          var g = i[c], y = ur(t, g);
          n(y, g) && mi(m, Ye(g, t), y);
        }
        return m;
      }
      function km(t) {
        return function(i) {
          return ur(i, t);
        };
      }
      function ws(t, i, n, c) {
        var l = c ? sp : Lr, m = -1, g = i.length, y = t;
        for (t === i && (i = It(i)), n && (y = at(t, Gt(n))); ++m < g; ) for (var b = 0, _ = i[m], L = n ? n(_) : _; (b = l(y, L, b, c)) > -1; ) y !== t && no.call(y, b, 1), no.call(t, b, 1);
        return t;
      }
      function ec(t, i) {
        for (var n = t ? i.length : 0, c = n - 1; n--; ) {
          var l = i[n];
          if (n == c || l !== m) {
            var m = l;
            Ae(l) ? no.call(t, l, 1) : Ss(t, l);
          }
        }
        return t;
      }
      function Cs(t, i) {
        return t + uo(Fu() * (i - t + 1));
      }
      function Vm(t, i, n, c) {
        for (var l = -1, m = mt(ao((i - t) / (n || 1)), 0), g = x(m); m--; ) g[c ? m : ++l] = t, t += n;
        return g;
      }
      function _s(t, i) {
        var n = "";
        if (!t || i < 1 || i > je2) return n;
        do
          i % 2 && (n += t), i = uo(i / 2), i && (t += t);
        while (i);
        return n;
      }
      function B(t, i) {
        return Hs(Ic(t, i, Rt), t + "");
      }
      function Nm(t) {
        return Nu(Vr(t));
      }
      function Gm(t, i) {
        var n = Vr(t);
        return Lo(n, ar(i, 0, n.length));
      }
      function mi(t, i, n, c) {
        if (!ut(t)) return t;
        i = Ye(i, t);
        for (var l = -1, m = i.length, g = m - 1, y = t; y != null && ++l < m; ) {
          var b = ge(i[l]), _ = n;
          if (b === "__proto__" || b === "constructor" || b === "prototype") return t;
          if (l != g) {
            var L = y[b];
            _ = c ? c(L, b, y) : r, _ === r && (_ = ut(L) ? L : Ae(i[l + 1]) ? [] : {});
          }
          li(y, b, _), y = y[b];
        }
        return t;
      }
      var rc = co ? function(t, i) {
        return co.set(t, i), t;
      } : Rt, jm = so ? function(t, i) {
        return so(t, "toString", { configurable: true, enumerable: false, value: Js(i), writable: true });
      } : Rt;
      function Um(t) {
        return Lo(Vr(t));
      }
      function Jt(t, i, n) {
        var c = -1, l = t.length;
        i < 0 && (i = -i > l ? 0 : l + i), n = n > l ? l : n, n < 0 && (n += l), l = i > n ? 0 : n - i >>> 0, i >>>= 0;
        for (var m = x(l); ++c < l; ) m[c] = t[c + i];
        return m;
      }
      function Hm(t, i) {
        var n;
        return $e(t, function(c, l, m) {
          return n = i(c, l, m), !n;
        }), !!n;
      }
      function yo(t, i, n) {
        var c = 0, l = t == null ? c : t.length;
        if (typeof i == "number" && i === i && l <= Bh) {
          for (; c < l; ) {
            var m = c + l >>> 1, g = t[m];
            g !== null && !Ut(g) && (n ? g <= i : g < i) ? c = m + 1 : l = m;
          }
          return l;
        }
        return Ls(t, i, Rt, n);
      }
      function Ls(t, i, n, c) {
        var l = 0, m = t == null ? 0 : t.length;
        if (m === 0) return 0;
        i = n(i);
        for (var g = i !== i, y = i === null, b = Ut(i), _ = i === r; l < m; ) {
          var L = uo((l + m) / 2), S = n(t[L]), E = S !== r, M = S === null, R = S === S, U = Ut(S);
          if (g) var F = c || R;
          else _ ? F = R && (c || E) : y ? F = R && E && (c || !M) : b ? F = R && E && !M && (c || !U) : M || U ? F = false : F = c ? S <= i : S < i;
          F ? l = L + 1 : m = L;
        }
        return wt2(m, Hh);
      }
      function ic(t, i) {
        for (var n = -1, c = t.length, l = 0, m = []; ++n < c; ) {
          var g = t[n], y = i ? i(g) : g;
          if (!n || !ae(y, b)) {
            var b = y;
            m[l++] = g === 0 ? 0 : g;
          }
        }
        return m;
      }
      function oc(t) {
        return typeof t == "number" ? t : Ut(t) ? Ui3 : +t;
      }
      function jt(t) {
        if (typeof t == "string") return t;
        if (N(t)) return at(t, jt) + "";
        if (Ut(t)) return ku ? ku.call(t) : "";
        var i = t + "";
        return i == "0" && 1 / t == -rr2 ? "-0" : i;
      }
      function qe(t, i, n) {
        var c = -1, l = Xi, m = t.length, g = true, y = [], b = y;
        if (n) g = false, l = es;
        else if (m >= s) {
          var _ = i ? null : Zm(t);
          if (_) return Ki(_);
          g = false, l = oi, b = new sr();
        } else b = i ? [] : y;
        t: for (; ++c < m; ) {
          var L = t[c], S = i ? i(L) : L;
          if (L = n || L !== 0 ? L : 0, g && S === S) {
            for (var E = b.length; E--; ) if (b[E] === S) continue t;
            i && b.push(S), y.push(L);
          } else l(b, S, n) || (b !== y && b.push(S), y.push(L));
        }
        return y;
      }
      function Ss(t, i) {
        return i = Ye(i, t), t = Mc(t, i), t == null || delete t[ge(Zt(i))];
      }
      function nc(t, i, n, c) {
        return mi(t, i, n(ur(t, i)), c);
      }
      function vo(t, i, n, c) {
        for (var l = t.length, m = c ? l : -1; (c ? m-- : ++m < l) && i(t[m], m, t); ) ;
        return n ? Jt(t, c ? 0 : m, c ? m + 1 : l) : Jt(t, c ? m + 1 : 0, c ? l : m);
      }
      function sc(t, i) {
        var n = t;
        return n instanceof $ && (n = n.value()), rs(i, function(c, l) {
          return l.func.apply(l.thisArg, He([c], l.args));
        }, n);
      }
      function Os(t, i, n) {
        var c = t.length;
        if (c < 2) return c ? qe(t[0]) : [];
        for (var l = -1, m = x(c); ++l < c; ) for (var g = t[l], y = -1; ++y < c; ) y != l && (m[l] = hi(m[l] || g, t[y], i, n));
        return qe(bt(m, 1), i, n);
      }
      function ac(t, i, n) {
        for (var c = -1, l = t.length, m = i.length, g = {}; ++c < l; ) {
          var y = c < m ? i[c] : r;
          n(g, t[c], y);
        }
        return g;
      }
      function Es(t) {
        return lt(t) ? t : [];
      }
      function Ds(t) {
        return typeof t == "function" ? t : Rt;
      }
      function Ye(t, i) {
        return N(t) ? t : Gs(t, i) ? [t] : kc(tt(t));
      }
      var Bm = B;
      function Xe(t, i, n) {
        var c = t.length;
        return n = n === r ? c : n, !i && n >= c ? t : Jt(t, i, n);
      }
      var uc = Dp || function(t) {
        return gt.clearTimeout(t);
      };
      function cc(t, i) {
        if (i) return t.slice();
        var n = t.length, c = Du ? Du(n) : new t.constructor(n);
        return t.copy(c), c;
      }
      function Is(t) {
        var i = new t.constructor(t.byteLength);
        return new io(i).set(new io(t)), i;
      }
      function Wm(t, i) {
        var n = i ? Is(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.byteLength);
      }
      function zm(t) {
        var i = new t.constructor(t.source, $a.exec(t));
        return i.lastIndex = t.lastIndex, i;
      }
      function $m(t) {
        return ci ? it(ci.call(t)) : {};
      }
      function lc(t, i) {
        var n = i ? Is(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.length);
      }
      function hc(t, i) {
        if (t !== i) {
          var n = t !== r, c = t === null, l = t === t, m = Ut(t), g = i !== r, y = i === null, b = i === i, _ = Ut(i);
          if (!y && !_ && !m && t > i || m && g && b && !y && !_ || c && g && b || !n && b || !l) return 1;
          if (!c && !m && !_ && t < i || _ && n && l && !c && !m || y && n && l || !g && l || !b) return -1;
        }
        return 0;
      }
      function qm(t, i, n) {
        for (var c = -1, l = t.criteria, m = i.criteria, g = l.length, y = n.length; ++c < g; ) {
          var b = hc(l[c], m[c]);
          if (b) {
            if (c >= y) return b;
            var _ = n[c];
            return b * (_ == "desc" ? -1 : 1);
          }
        }
        return t.index - i.index;
      }
      function fc(t, i, n, c) {
        for (var l = -1, m = t.length, g = n.length, y = -1, b = i.length, _ = mt(m - g, 0), L = x(b + _), S = !c; ++y < b; ) L[y] = i[y];
        for (; ++l < g; ) (S || l < m) && (L[n[l]] = t[l]);
        for (; _--; ) L[y++] = t[l++];
        return L;
      }
      function pc(t, i, n, c) {
        for (var l = -1, m = t.length, g = -1, y = n.length, b = -1, _ = i.length, L = mt(m - y, 0), S = x(L + _), E = !c; ++l < L; ) S[l] = t[l];
        for (var M = l; ++b < _; ) S[M + b] = i[b];
        for (; ++g < y; ) (E || l < m) && (S[M + n[g]] = t[l++]);
        return S;
      }
      function It(t, i) {
        var n = -1, c = t.length;
        for (i || (i = x(c)); ++n < c; ) i[n] = t[n];
        return i;
      }
      function de(t, i, n, c) {
        var l = !n;
        n || (n = {});
        for (var m = -1, g = i.length; ++m < g; ) {
          var y = i[m], b = c ? c(n[y], t[y], y, n, t) : r;
          b === r && (b = t[y]), l ? De(n, y, b) : li(n, y, b);
        }
        return n;
      }
      function Ym(t, i) {
        return de(t, Ns(t), i);
      }
      function Xm(t, i) {
        return de(t, Lc(t), i);
      }
      function bo(t, i) {
        return function(n, c) {
          var l = N(n) ? tp : ym, m = i ? i() : {};
          return l(n, t, A(c, 2), m);
        };
      }
      function Ar(t) {
        return B(function(i, n) {
          var c = -1, l = n.length, m = l > 1 ? n[l - 1] : r, g = l > 2 ? n[2] : r;
          for (m = t.length > 3 && typeof m == "function" ? (l--, m) : r, g && Ot(n[0], n[1], g) && (m = l < 3 ? r : m, l = 1), i = it(i); ++c < l; ) {
            var y = n[c];
            y && t(i, y, c, m);
          }
          return i;
        });
      }
      function mc(t, i) {
        return function(n, c) {
          if (n == null) return n;
          if (!Mt(n)) return t(n, c);
          for (var l = n.length, m = i ? l : -1, g = it(n); (i ? m-- : ++m < l) && c(g[m], m, g) !== false; ) ;
          return n;
        };
      }
      function dc(t) {
        return function(i, n, c) {
          for (var l = -1, m = it(i), g = c(i), y = g.length; y--; ) {
            var b = g[t ? y : ++l];
            if (n(m[b], b, m) === false) break;
          }
          return i;
        };
      }
      function Qm(t, i, n) {
        var c = i & Q2, l = di(t);
        function m() {
          var g = this && this !== gt && this instanceof m ? l : t;
          return g.apply(c ? n : this, arguments);
        }
        return m;
      }
      function gc(t) {
        return function(i) {
          i = tt(i);
          var n = Sr(i) ? ne(i) : r, c = n ? n[0] : i.charAt(0), l = n ? Xe(n, 1).join("") : i.slice(1);
          return c[t]() + l;
        };
      }
      function Rr(t) {
        return function(i) {
          return rs(ml(pl(i).replace(jf, "")), t, "");
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
          var n = Mr(t.prototype), c = t.apply(n, i);
          return ut(c) ? c : n;
        };
      }
      function Km(t, i, n) {
        var c = di(t);
        function l() {
          for (var m = arguments.length, g = x(m), y = m, b = Fr(l); y--; ) g[y] = arguments[y];
          var _ = m < 3 && g[0] !== b && g[m - 1] !== b ? [] : Be(g, b);
          if (m -= _.length, m < n) return Pc(t, i, To, l.placeholder, r, g, _, r, r, n - m);
          var L = this && this !== gt && this instanceof l ? c : t;
          return Nt(L, this, g);
        }
        return l;
      }
      function yc(t) {
        return function(i, n, c) {
          var l = it(i);
          if (!Mt(i)) {
            var m = A(n, 3);
            i = yt(i), n = function(y) {
              return m(l[y], y, l);
            };
          }
          var g = t(i, n, c);
          return g > -1 ? l[m ? i[g] : g] : r;
        };
      }
      function vc(t) {
        return Me(function(i) {
          var n = i.length, c = n, l = Qt.prototype.thru;
          for (t && i.reverse(); c--; ) {
            var m = i[c];
            if (typeof m != "function") throw new Xt(h);
            if (l && !g && Co(m) == "wrapper") var g = new Qt([], true);
          }
          for (c = g ? c : n; ++c < n; ) {
            m = i[c];
            var y = Co(m), b = y == "wrapper" ? ks(m) : r;
            b && js(b[0]) && b[1] == (Le | Vt2 | fe | Qr) && !b[4].length && b[9] == 1 ? g = g[Co(b[0])].apply(g, b[3]) : g = m.length == 1 && js(m) ? g[y]() : g.thru(m);
          }
          return function() {
            var _ = arguments, L = _[0];
            if (g && _.length == 1 && N(L)) return g.plant(L).value();
            for (var S = 0, E = n ? i[S].apply(this, _) : L; ++S < n; ) E = i[S].call(this, E);
            return E;
          };
        });
      }
      function To(t, i, n, c, l, m, g, y, b, _) {
        var L = i & Le, S = i & Q2, E = i & nt, M = i & (Vt2 | Pr2), R = i & kn, U = E ? r : di(t);
        function F() {
          for (var z = arguments.length, q = x(z), Ht = z; Ht--; ) q[Ht] = arguments[Ht];
          if (M) var Et = Fr(F), Bt = cp(q, Et);
          if (c && (q = fc(q, c, l, M)), m && (q = pc(q, m, g, M)), z -= Bt, M && z < _) {
            var ht = Be(q, Et);
            return Pc(t, i, To, F.placeholder, n, q, ht, y, b, _ - z);
          }
          var ue = S ? n : this, ke = E ? ue[t] : t;
          return z = q.length, y ? q = yd(q, y) : R && z > 1 && q.reverse(), L && b < z && (q.length = b), this && this !== gt && this instanceof F && (ke = U || di(ke)), ke.apply(ue, q);
        }
        return F;
      }
      function bc(t, i) {
        return function(n, c) {
          return _m(n, t, i(c), {});
        };
      }
      function Po(t, i) {
        return function(n, c) {
          var l;
          if (n === r && c === r) return i;
          if (n !== r && (l = n), c !== r) {
            if (l === r) return c;
            typeof n == "string" || typeof c == "string" ? (n = jt(n), c = jt(c)) : (n = oc(n), c = oc(c)), l = t(n, c);
          }
          return l;
        };
      }
      function Ms(t) {
        return Me(function(i) {
          return i = at(i, Gt(A())), B(function(n) {
            var c = this;
            return t(i, function(l) {
              return Nt(l, c, n);
            });
          });
        });
      }
      function xo(t, i) {
        i = i === r ? " " : jt(i);
        var n = i.length;
        if (n < 2) return n ? _s(i, t) : i;
        var c = _s(i, ao(t / Or(i)));
        return Sr(i) ? Xe(ne(c), 0, t).join("") : c.slice(0, t);
      }
      function Jm(t, i, n, c) {
        var l = i & Q2, m = di(t);
        function g() {
          for (var y = -1, b = arguments.length, _ = -1, L = c.length, S = x(L + b), E = this && this !== gt && this instanceof g ? m : t; ++_ < L; ) S[_] = c[_];
          for (; b--; ) S[_++] = arguments[++y];
          return Nt(E, l ? n : this, S);
        }
        return g;
      }
      function Tc(t) {
        return function(i, n, c) {
          return c && typeof c != "number" && Ot(i, n, c) && (n = c = r), i = Fe(i), n === r ? (n = i, i = 0) : n = Fe(n), c = c === r ? i < n ? 1 : -1 : Fe(c), Vm(i, n, c, t);
        };
      }
      function wo(t) {
        return function(i, n) {
          return typeof i == "string" && typeof n == "string" || (i = te(i), n = te(n)), t(i, n);
        };
      }
      function Pc(t, i, n, c, l, m, g, y, b, _) {
        var L = i & Vt2, S = L ? g : r, E = L ? r : g, M = L ? m : r, R = L ? r : m;
        i |= L ? fe : xr, i &= ~(L ? xr : fe), i & $t || (i &= ~(Q2 | nt));
        var U = [t, i, l, M, S, R, E, y, b, _], F = n.apply(r, U);
        return js(t) && Ac(F, U), F.placeholder = c, Rc(F, t, i);
      }
      function As(t) {
        var i = pt[t];
        return function(n, c) {
          if (n = te(n), c = c == null ? 0 : wt2(j(c), 292), c && Ru(n)) {
            var l = (tt(n) + "e").split("e"), m = i(l[0] + "e" + (+l[1] + c));
            return l = (tt(m) + "e").split("e"), +(l[0] + "e" + (+l[1] - c));
          }
          return i(n);
        };
      }
      var Zm = Dr && 1 / Ki(new Dr([, -0]))[1] == rr2 ? function(t) {
        return new Dr(t);
      } : ea;
      function xc(t) {
        return function(i) {
          var n = Ct(i);
          return n == ie ? cs(i) : n == oe ? gp(i) : up(i, t(i));
        };
      }
      function Ie(t, i, n, c, l, m, g, y) {
        var b = i & nt;
        if (!b && typeof t != "function") throw new Xt(h);
        var _ = c ? c.length : 0;
        if (_ || (i &= ~(fe | xr), c = l = r), g = g === r ? g : mt(j(g), 0), y = y === r ? y : j(y), _ -= l ? l.length : 0, i & xr) {
          var L = c, S = l;
          c = l = r;
        }
        var E = b ? r : ks(t), M = [t, i, n, c, l, L, S, m, g, y];
        if (E && md(M, E), t = M[0], i = M[1], n = M[2], c = M[3], l = M[4], y = M[9] = M[9] === r ? b ? 0 : t.length : mt(M[9] - _, 0), !y && i & (Vt2 | Pr2) && (i &= ~(Vt2 | Pr2)), !i || i == Q2) var R = Qm(t, i, n);
        else i == Vt2 || i == Pr2 ? R = Km(t, i, y) : (i == fe || i == (Q2 | fe)) && !l.length ? R = Jm(t, i, n, c) : R = To.apply(r, M);
        var U = E ? rc : Ac;
        return Rc(U(R, M), t, i);
      }
      function wc(t, i, n, c) {
        return t === r || ae(t, Er[n]) && !et.call(c, n) ? i : t;
      }
      function Cc(t, i, n, c, l, m) {
        return ut(t) && ut(i) && (m.set(i, t), go(t, i, r, Cc, m), m.delete(i)), t;
      }
      function td(t) {
        return vi(t) ? r : t;
      }
      function _c(t, i, n, c, l, m) {
        var g = n & k, y = t.length, b = i.length;
        if (y != b && !(g && b > y)) return false;
        var _ = m.get(t), L = m.get(i);
        if (_ && L) return _ == i && L == t;
        var S = -1, E = true, M = n & G ? new sr() : r;
        for (m.set(t, i), m.set(i, t); ++S < y; ) {
          var R = t[S], U = i[S];
          if (c) var F = g ? c(U, R, S, i, t, m) : c(R, U, S, t, i, m);
          if (F !== r) {
            if (F) continue;
            E = false;
            break;
          }
          if (M) {
            if (!is(i, function(z, q) {
              if (!oi(M, q) && (R === z || l(R, z, n, c, m))) return M.push(q);
            })) {
              E = false;
              break;
            }
          } else if (!(R === U || l(R, U, n, c, m))) {
            E = false;
            break;
          }
        }
        return m.delete(t), m.delete(i), E;
      }
      function ed(t, i, n, c, l, m, g) {
        switch (n) {
          case Cr:
            if (t.byteLength != i.byteLength || t.byteOffset != i.byteOffset) return false;
            t = t.buffer, i = i.buffer;
          case ii:
            return !(t.byteLength != i.byteLength || !m(new io(t), new io(i)));
          case Kr:
          case Jr:
          case Zr:
            return ae(+t, +i);
          case Bi:
            return t.name == i.name && t.message == i.message;
          case ti:
          case ei:
            return t == i + "";
          case ie:
            var y = cs;
          case oe:
            var b = c & k;
            if (y || (y = Ki), t.size != i.size && !b) return false;
            var _ = g.get(t);
            if (_) return _ == i;
            c |= G, g.set(t, i);
            var L = _c(y(t), y(i), c, l, m, g);
            return g.delete(t), L;
          case zi:
            if (ci) return ci.call(t) == ci.call(i);
        }
        return false;
      }
      function rd(t, i, n, c, l, m) {
        var g = n & k, y = Rs(t), b = y.length, _ = Rs(i), L = _.length;
        if (b != L && !g) return false;
        for (var S = b; S--; ) {
          var E = y[S];
          if (!(g ? E in i : et.call(i, E))) return false;
        }
        var M = m.get(t), R = m.get(i);
        if (M && R) return M == i && R == t;
        var U = true;
        m.set(t, i), m.set(i, t);
        for (var F = g; ++S < b; ) {
          E = y[S];
          var z = t[E], q = i[E];
          if (c) var Ht = g ? c(q, z, E, i, t, m) : c(z, q, E, t, i, m);
          if (!(Ht === r ? z === q || l(z, q, n, c, m) : Ht)) {
            U = false;
            break;
          }
          F || (F = E == "constructor");
        }
        if (U && !F) {
          var Et = t.constructor, Bt = i.constructor;
          Et != Bt && "constructor" in t && "constructor" in i && !(typeof Et == "function" && Et instanceof Et && typeof Bt == "function" && Bt instanceof Bt) && (U = false);
        }
        return m.delete(t), m.delete(i), U;
      }
      function Me(t) {
        return Hs(Ic(t, r, jc), t + "");
      }
      function Rs(t) {
        return zu(t, yt, Ns);
      }
      function Fs(t) {
        return zu(t, At, Lc);
      }
      var ks = co ? function(t) {
        return co.get(t);
      } : ea;
      function Co(t) {
        for (var i = t.name + "", n = Ir[i], c = et.call(Ir, i) ? n.length : 0; c--; ) {
          var l = n[c], m = l.func;
          if (m == null || m == t) return l.name;
        }
        return i;
      }
      function Fr(t) {
        var i = et.call(f, "placeholder") ? f : t;
        return i.placeholder;
      }
      function A() {
        var t = f.iteratee || Zs;
        return t = t === Zs ? Yu : t, arguments.length ? t(arguments[0], arguments[1]) : t;
      }
      function _o(t, i) {
        var n = t.__data__;
        return ld(i) ? n[typeof i == "string" ? "string" : "hash"] : n.map;
      }
      function Vs(t) {
        for (var i = yt(t), n = i.length; n--; ) {
          var c = i[n], l = t[c];
          i[n] = [c, l, Ec(l)];
        }
        return i;
      }
      function cr(t, i) {
        var n = pp(t, i);
        return qu(n) ? n : r;
      }
      function id(t) {
        var i = et.call(t, or), n = t[or];
        try {
          t[or] = r;
          var c = true;
        } catch (m) {
        }
        var l = eo.call(t);
        return c && (i ? t[or] = n : delete t[or]), l;
      }
      var Ns = hs ? function(t) {
        return t == null ? [] : (t = it(t), Ue(hs(t), function(i) {
          return Mu.call(t, i);
        }));
      } : ra, Lc = hs ? function(t) {
        for (var i = []; t; ) He(i, Ns(t)), t = oo(t);
        return i;
      } : ra, Ct = St2;
      (fs2 && Ct(new fs2(new ArrayBuffer(1))) != Cr || si && Ct(new si()) != ie || ps && Ct(ps.resolve()) != Ha || Dr && Ct(new Dr()) != oe || ai && Ct(new ai()) != ri) && (Ct = function(t) {
        var i = St2(t), n = i == Se ? t.constructor : r, c = n ? lr(n) : "";
        if (c) switch (c) {
          case Gp:
            return Cr;
          case jp:
            return ie;
          case Up:
            return Ha;
          case Hp:
            return oe;
          case Bp:
            return ri;
        }
        return i;
      });
      function od(t, i, n) {
        for (var c = -1, l = n.length; ++c < l; ) {
          var m = n[c], g = m.size;
          switch (m.type) {
            case "drop":
              t += g;
              break;
            case "dropRight":
              i -= g;
              break;
            case "take":
              i = wt2(i, t + g);
              break;
            case "takeRight":
              t = mt(t, i - g);
              break;
          }
        }
        return { start: t, end: i };
      }
      function nd(t) {
        var i = t.match(hf);
        return i ? i[1].split(ff) : [];
      }
      function Sc(t, i, n) {
        i = Ye(i, t);
        for (var c = -1, l = i.length, m = false; ++c < l; ) {
          var g = ge(i[c]);
          if (!(m = t != null && n(t, g))) break;
          t = t[g];
        }
        return m || ++c != l ? m : (l = t == null ? 0 : t.length, !!l && Mo(l) && Ae(g, l) && (N(t) || hr(t)));
      }
      function sd(t) {
        var i = t.length, n = new t.constructor(i);
        return i && typeof t[0] == "string" && et.call(t, "index") && (n.index = t.index, n.input = t.input), n;
      }
      function Oc(t) {
        return typeof t.constructor == "function" && !gi(t) ? Mr(oo(t)) : {};
      }
      function ad(t, i, n) {
        var c = t.constructor;
        switch (i) {
          case ii:
            return Is(t);
          case Kr:
          case Jr:
            return new c(+t);
          case Cr:
            return Wm(t, n);
          case Vn:
          case Nn:
          case Gn:
          case jn:
          case Un:
          case Hn:
          case Bn:
          case Wn:
          case zn:
            return lc(t, n);
          case ie:
            return new c();
          case Zr:
          case ei:
            return new c(t);
          case ti:
            return zm(t);
          case oe:
            return new c();
          case zi:
            return $m(t);
        }
      }
      function ud(t, i) {
        var n = i.length;
        if (!n) return t;
        var c = n - 1;
        return i[c] = (n > 1 ? "& " : "") + i[c], i = i.join(n > 2 ? ", " : " "), t.replace(lf, `{
/* [wrapped with ` + i + `] */
`);
      }
      function cd(t) {
        return N(t) || hr(t) || !!(Au && t && t[Au]);
      }
      function Ae(t, i) {
        var n = typeof t;
        return i = i != null ? i : je2, !!i && (n == "number" || n != "symbol" && Pf.test(t)) && t > -1 && t % 1 == 0 && t < i;
      }
      function Ot(t, i, n) {
        if (!ut(n)) return false;
        var c = typeof i;
        return (c == "number" ? Mt(n) && Ae(i, n.length) : c == "string" && i in n) ? ae(n[i], t) : false;
      }
      function Gs(t, i) {
        if (N(t)) return false;
        var n = typeof t;
        return n == "number" || n == "symbol" || n == "boolean" || t == null || Ut(t) ? true : sf.test(t) || !nf.test(t) || i != null && t in it(i);
      }
      function ld(t) {
        var i = typeof t;
        return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? t !== "__proto__" : t === null;
      }
      function js(t) {
        var i = Co(t), n = f[i];
        if (typeof n != "function" || !(i in $.prototype)) return false;
        if (t === n) return true;
        var c = ks(n);
        return !!c && t === c[0];
      }
      function hd(t) {
        return !!Eu && Eu in t;
      }
      var fd = Zi ? Re : ia;
      function gi(t) {
        var i = t && t.constructor, n = typeof i == "function" && i.prototype || Er;
        return t === n;
      }
      function Ec(t) {
        return t === t && !ut(t);
      }
      function Dc(t, i) {
        return function(n) {
          return n == null ? false : n[t] === i && (i !== r || t in it(n));
        };
      }
      function pd(t) {
        var i = Do(t, function(c) {
          return n.size === T2 && n.clear(), c;
        }), n = i.cache;
        return i;
      }
      function md(t, i) {
        var n = t[1], c = i[1], l = n | c, m = l < (Q2 | nt | Le), g = c == Le && n == Vt2 || c == Le && n == Qr && t[7].length <= i[8] || c == (Le | Qr) && i[7].length <= i[8] && n == Vt2;
        if (!(m || g)) return t;
        c & Q2 && (t[2] = i[2], l |= n & Q2 ? 0 : $t);
        var y = i[3];
        if (y) {
          var b = t[3];
          t[3] = b ? fc(b, y, i[4]) : y, t[4] = b ? Be(t[3], C) : i[4];
        }
        return y = i[5], y && (b = t[5], t[5] = b ? pc(b, y, i[6]) : y, t[6] = b ? Be(t[5], C) : i[6]), y = i[7], y && (t[7] = y), c & Le && (t[8] = t[8] == null ? i[8] : wt2(t[8], i[8])), t[9] == null && (t[9] = i[9]), t[0] = i[0], t[1] = l, t;
      }
      function dd(t) {
        var i = [];
        if (t != null) for (var n in it(t)) i.push(n);
        return i;
      }
      function gd(t) {
        return eo.call(t);
      }
      function Ic(t, i, n) {
        return i = mt(i === r ? t.length - 1 : i, 0), function() {
          for (var c = arguments, l = -1, m = mt(c.length - i, 0), g = x(m); ++l < m; ) g[l] = c[i + l];
          l = -1;
          for (var y = x(i + 1); ++l < i; ) y[l] = c[l];
          return y[i] = n(g), Nt(t, this, y);
        };
      }
      function Mc(t, i) {
        return i.length < 2 ? t : ur(t, Jt(i, 0, -1));
      }
      function yd(t, i) {
        for (var n = t.length, c = wt2(i.length, n), l = It(t); c--; ) {
          var m = i[c];
          t[c] = Ae(m, n) ? l[m] : r;
        }
        return t;
      }
      function Us(t, i) {
        if (!(i === "constructor" && typeof t[i] == "function") && i != "__proto__") return t[i];
      }
      var Ac = Fc(rc), yi = Mp || function(t, i) {
        return gt.setTimeout(t, i);
      }, Hs = Fc(jm);
      function Rc(t, i, n) {
        var c = i + "";
        return Hs(t, ud(c, vd(nd(c), n)));
      }
      function Fc(t) {
        var i = 0, n = 0;
        return function() {
          var c = kp(), l = Nh - (c - n);
          if (n = c, l > 0) {
            if (++i >= Vh) return arguments[0];
          } else i = 0;
          return t.apply(r, arguments);
        };
      }
      function Lo(t, i) {
        var n = -1, c = t.length, l = c - 1;
        for (i = i === r ? c : i; ++n < i; ) {
          var m = Cs(n, l), g = t[m];
          t[m] = t[n], t[n] = g;
        }
        return t.length = i, t;
      }
      var kc = pd(function(t) {
        var i = [];
        return t.charCodeAt(0) === 46 && i.push(""), t.replace(af, function(n, c, l, m) {
          i.push(l ? m.replace(df, "$1") : c || n);
        }), i;
      });
      function ge(t) {
        if (typeof t == "string" || Ut(t)) return t;
        var i = t + "";
        return i == "0" && 1 / t == -rr2 ? "-0" : i;
      }
      function lr(t) {
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
      function vd(t, i) {
        return Yt(Wh, function(n) {
          var c = "_." + n[0];
          i & n[1] && !Xi(t, c) && t.push(c);
        }), t.sort();
      }
      function Vc(t) {
        if (t instanceof $) return t.clone();
        var i = new Qt(t.__wrapped__, t.__chain__);
        return i.__actions__ = It(t.__actions__), i.__index__ = t.__index__, i.__values__ = t.__values__, i;
      }
      function bd(t, i, n) {
        (n ? Ot(t, i, n) : i === r) ? i = 1 : i = mt(j(i), 0);
        var c = t == null ? 0 : t.length;
        if (!c || i < 1) return [];
        for (var l = 0, m = 0, g = x(ao(c / i)); l < c; ) g[m++] = Jt(t, l, l += i);
        return g;
      }
      function Td(t) {
        for (var i = -1, n = t == null ? 0 : t.length, c = 0, l = []; ++i < n; ) {
          var m = t[i];
          m && (l[c++] = m);
        }
        return l;
      }
      function Pd() {
        var t = arguments.length;
        if (!t) return [];
        for (var i = x(t - 1), n = arguments[0], c = t; c--; ) i[c - 1] = arguments[c];
        return He(N(n) ? It(n) : [n], bt(i, 1));
      }
      var xd = B(function(t, i) {
        return lt(t) ? hi(t, bt(i, 1, lt, true)) : [];
      }), wd = B(function(t, i) {
        var n = Zt(i);
        return lt(n) && (n = r), lt(t) ? hi(t, bt(i, 1, lt, true), A(n, 2)) : [];
      }), Cd = B(function(t, i) {
        var n = Zt(i);
        return lt(n) && (n = r), lt(t) ? hi(t, bt(i, 1, lt, true), r, n) : [];
      });
      function _d(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j(i), Jt(t, i < 0 ? 0 : i, c)) : [];
      }
      function Ld(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j(i), i = c - i, Jt(t, 0, i < 0 ? 0 : i)) : [];
      }
      function Sd(t, i) {
        return t && t.length ? vo(t, A(i, 3), true, true) : [];
      }
      function Od(t, i) {
        return t && t.length ? vo(t, A(i, 3), true) : [];
      }
      function Ed(t, i, n, c) {
        var l = t == null ? 0 : t.length;
        return l ? (n && typeof n != "number" && Ot(t, i, n) && (n = 0, c = l), Pm(t, i, n, c)) : [];
      }
      function Nc(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = n == null ? 0 : j(n);
        return l < 0 && (l = mt(c + l, 0)), Qi(t, A(i, 3), l);
      }
      function Gc(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = c - 1;
        return n !== r && (l = j(n), l = n < 0 ? mt(c + l, 0) : wt2(l, c - 1)), Qi(t, A(i, 3), l, true);
      }
      function jc(t) {
        var i = t == null ? 0 : t.length;
        return i ? bt(t, 1) : [];
      }
      function Dd(t) {
        var i = t == null ? 0 : t.length;
        return i ? bt(t, rr2) : [];
      }
      function Id(t, i) {
        var n = t == null ? 0 : t.length;
        return n ? (i = i === r ? 1 : j(i), bt(t, i)) : [];
      }
      function Md(t) {
        for (var i = -1, n = t == null ? 0 : t.length, c = {}; ++i < n; ) {
          var l = t[i];
          c[l[0]] = l[1];
        }
        return c;
      }
      function Uc(t) {
        return t && t.length ? t[0] : r;
      }
      function Ad(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = n == null ? 0 : j(n);
        return l < 0 && (l = mt(c + l, 0)), Lr(t, i, l);
      }
      function Rd(t) {
        var i = t == null ? 0 : t.length;
        return i ? Jt(t, 0, -1) : [];
      }
      var Fd = B(function(t) {
        var i = at(t, Es);
        return i.length && i[0] === t[0] ? bs(i) : [];
      }), kd = B(function(t) {
        var i = Zt(t), n = at(t, Es);
        return i === Zt(n) ? i = r : n.pop(), n.length && n[0] === t[0] ? bs(n, A(i, 2)) : [];
      }), Vd = B(function(t) {
        var i = Zt(t), n = at(t, Es);
        return i = typeof i == "function" ? i : r, i && n.pop(), n.length && n[0] === t[0] ? bs(n, r, i) : [];
      });
      function Nd(t, i) {
        return t == null ? "" : Rp.call(t, i);
      }
      function Zt(t) {
        var i = t == null ? 0 : t.length;
        return i ? t[i - 1] : r;
      }
      function Gd(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = c;
        return n !== r && (l = j(n), l = l < 0 ? mt(c + l, 0) : wt2(l, c - 1)), i === i ? vp(t, i, l) : Qi(t, Pu, l, true);
      }
      function jd(t, i) {
        return t && t.length ? Ju(t, j(i)) : r;
      }
      var Ud = B(Hc);
      function Hc(t, i) {
        return t && t.length && i && i.length ? ws(t, i) : t;
      }
      function Hd(t, i, n) {
        return t && t.length && i && i.length ? ws(t, i, A(n, 2)) : t;
      }
      function Bd(t, i, n) {
        return t && t.length && i && i.length ? ws(t, i, r, n) : t;
      }
      var Wd = Me(function(t, i) {
        var n = t == null ? 0 : t.length, c = ds(t, i);
        return ec(t, at(i, function(l) {
          return Ae(l, n) ? +l : l;
        }).sort(hc)), c;
      });
      function zd(t, i) {
        var n = [];
        if (!(t && t.length)) return n;
        var c = -1, l = [], m = t.length;
        for (i = A(i, 3); ++c < m; ) {
          var g = t[c];
          i(g, c, t) && (n.push(g), l.push(c));
        }
        return ec(t, l), n;
      }
      function Bs(t) {
        return t == null ? t : Np.call(t);
      }
      function $d(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (n && typeof n != "number" && Ot(t, i, n) ? (i = 0, n = c) : (i = i == null ? 0 : j(i), n = n === r ? c : j(n)), Jt(t, i, n)) : [];
      }
      function qd(t, i) {
        return yo(t, i);
      }
      function Yd(t, i, n) {
        return Ls(t, i, A(n, 2));
      }
      function Xd(t, i) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var c = yo(t, i);
          if (c < n && ae(t[c], i)) return c;
        }
        return -1;
      }
      function Qd(t, i) {
        return yo(t, i, true);
      }
      function Kd(t, i, n) {
        return Ls(t, i, A(n, 2), true);
      }
      function Jd(t, i) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var c = yo(t, i, true) - 1;
          if (ae(t[c], i)) return c;
        }
        return -1;
      }
      function Zd(t) {
        return t && t.length ? ic(t) : [];
      }
      function tg(t, i) {
        return t && t.length ? ic(t, A(i, 2)) : [];
      }
      function eg(t) {
        var i = t == null ? 0 : t.length;
        return i ? Jt(t, 1, i) : [];
      }
      function rg(t, i, n) {
        return t && t.length ? (i = n || i === r ? 1 : j(i), Jt(t, 0, i < 0 ? 0 : i)) : [];
      }
      function ig(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j(i), i = c - i, Jt(t, i < 0 ? 0 : i, c)) : [];
      }
      function og(t, i) {
        return t && t.length ? vo(t, A(i, 3), false, true) : [];
      }
      function ng(t, i) {
        return t && t.length ? vo(t, A(i, 3)) : [];
      }
      var sg = B(function(t) {
        return qe(bt(t, 1, lt, true));
      }), ag = B(function(t) {
        var i = Zt(t);
        return lt(i) && (i = r), qe(bt(t, 1, lt, true), A(i, 2));
      }), ug = B(function(t) {
        var i = Zt(t);
        return i = typeof i == "function" ? i : r, qe(bt(t, 1, lt, true), r, i);
      });
      function cg(t) {
        return t && t.length ? qe(t) : [];
      }
      function lg(t, i) {
        return t && t.length ? qe(t, A(i, 2)) : [];
      }
      function hg(t, i) {
        return i = typeof i == "function" ? i : r, t && t.length ? qe(t, r, i) : [];
      }
      function Ws(t) {
        if (!(t && t.length)) return [];
        var i = 0;
        return t = Ue(t, function(n) {
          if (lt(n)) return i = mt(n.length, i), true;
        }), as(i, function(n) {
          return at(t, os(n));
        });
      }
      function Bc(t, i) {
        if (!(t && t.length)) return [];
        var n = Ws(t);
        return i == null ? n : at(n, function(c) {
          return Nt(i, r, c);
        });
      }
      var fg = B(function(t, i) {
        return lt(t) ? hi(t, i) : [];
      }), pg = B(function(t) {
        return Os(Ue(t, lt));
      }), mg = B(function(t) {
        var i = Zt(t);
        return lt(i) && (i = r), Os(Ue(t, lt), A(i, 2));
      }), dg = B(function(t) {
        var i = Zt(t);
        return i = typeof i == "function" ? i : r, Os(Ue(t, lt), r, i);
      }), gg = B(Ws);
      function yg(t, i) {
        return ac(t || [], i || [], li);
      }
      function vg(t, i) {
        return ac(t || [], i || [], mi);
      }
      var bg = B(function(t) {
        var i = t.length, n = i > 1 ? t[i - 1] : r;
        return n = typeof n == "function" ? (t.pop(), n) : r, Bc(t, n);
      });
      function Wc(t) {
        var i = f(t);
        return i.__chain__ = true, i;
      }
      function Tg(t, i) {
        return i(t), t;
      }
      function So(t, i) {
        return i(t);
      }
      var Pg = Me(function(t) {
        var i = t.length, n = i ? t[0] : 0, c = this.__wrapped__, l = function(m) {
          return ds(m, t);
        };
        return i > 1 || this.__actions__.length || !(c instanceof $) || !Ae(n) ? this.thru(l) : (c = c.slice(n, +n + (i ? 1 : 0)), c.__actions__.push({ func: So, args: [l], thisArg: r }), new Qt(c, this.__chain__).thru(function(m) {
          return i && !m.length && m.push(r), m;
        }));
      });
      function xg() {
        return Wc(this);
      }
      function wg() {
        return new Qt(this.value(), this.__chain__);
      }
      function Cg() {
        this.__values__ === r && (this.__values__ = ol(this.value()));
        var t = this.__index__ >= this.__values__.length, i = t ? r : this.__values__[this.__index__++];
        return { done: t, value: i };
      }
      function _g() {
        return this;
      }
      function Lg(t) {
        for (var i, n = this; n instanceof ho; ) {
          var c = Vc(n);
          c.__index__ = 0, c.__values__ = r, i ? l.__wrapped__ = c : i = c;
          var l = c;
          n = n.__wrapped__;
        }
        return l.__wrapped__ = t, i;
      }
      function Sg() {
        var t = this.__wrapped__;
        if (t instanceof $) {
          var i = t;
          return this.__actions__.length && (i = new $(this)), i = i.reverse(), i.__actions__.push({ func: So, args: [Bs], thisArg: r }), new Qt(i, this.__chain__);
        }
        return this.thru(Bs);
      }
      function Og() {
        return sc(this.__wrapped__, this.__actions__);
      }
      var Eg = bo(function(t, i, n) {
        et.call(t, n) ? ++t[n] : De(t, n, 1);
      });
      function Dg(t, i, n) {
        var c = N(t) ? bu : Tm;
        return n && Ot(t, i, n) && (i = r), c(t, A(i, 3));
      }
      function Ig(t, i) {
        var n = N(t) ? Ue : Bu;
        return n(t, A(i, 3));
      }
      var Mg = yc(Nc), Ag = yc(Gc);
      function Rg(t, i) {
        return bt(Oo(t, i), 1);
      }
      function Fg(t, i) {
        return bt(Oo(t, i), rr2);
      }
      function kg(t, i, n) {
        return n = n === r ? 1 : j(n), bt(Oo(t, i), n);
      }
      function zc(t, i) {
        var n = N(t) ? Yt : $e;
        return n(t, A(i, 3));
      }
      function $c(t, i) {
        var n = N(t) ? ep : Hu;
        return n(t, A(i, 3));
      }
      var Vg = bo(function(t, i, n) {
        et.call(t, n) ? t[n].push(i) : De(t, n, [i]);
      });
      function Ng(t, i, n, c) {
        t = Mt(t) ? t : Vr(t), n = n && !c ? j(n) : 0;
        var l = t.length;
        return n < 0 && (n = mt(l + n, 0)), Ao(t) ? n <= l && t.indexOf(i, n) > -1 : !!l && Lr(t, i, n) > -1;
      }
      var Gg = B(function(t, i, n) {
        var c = -1, l = typeof i == "function", m = Mt(t) ? x(t.length) : [];
        return $e(t, function(g) {
          m[++c] = l ? Nt(i, g, n) : fi(g, i, n);
        }), m;
      }), jg = bo(function(t, i, n) {
        De(t, n, i);
      });
      function Oo(t, i) {
        var n = N(t) ? at : Xu;
        return n(t, A(i, 3));
      }
      function Ug(t, i, n, c) {
        return t == null ? [] : (N(i) || (i = i == null ? [] : [i]), n = c ? r : n, N(n) || (n = n == null ? [] : [n]), Zu(t, i, n));
      }
      var Hg = bo(function(t, i, n) {
        t[n ? 0 : 1].push(i);
      }, function() {
        return [[], []];
      });
      function Bg(t, i, n) {
        var c = N(t) ? rs : wu, l = arguments.length < 3;
        return c(t, A(i, 4), n, l, $e);
      }
      function Wg(t, i, n) {
        var c = N(t) ? rp : wu, l = arguments.length < 3;
        return c(t, A(i, 4), n, l, Hu);
      }
      function zg(t, i) {
        var n = N(t) ? Ue : Bu;
        return n(t, Io(A(i, 3)));
      }
      function $g(t) {
        var i = N(t) ? Nu : Nm;
        return i(t);
      }
      function qg(t, i, n) {
        (n ? Ot(t, i, n) : i === r) ? i = 1 : i = j(i);
        var c = N(t) ? dm : Gm;
        return c(t, i);
      }
      function Yg(t) {
        var i = N(t) ? gm : Um;
        return i(t);
      }
      function Xg(t) {
        if (t == null) return 0;
        if (Mt(t)) return Ao(t) ? Or(t) : t.length;
        var i = Ct(t);
        return i == ie || i == oe ? t.size : Ps(t).length;
      }
      function Qg(t, i, n) {
        var c = N(t) ? is : Hm;
        return n && Ot(t, i, n) && (i = r), c(t, A(i, 3));
      }
      var Kg = B(function(t, i) {
        if (t == null) return [];
        var n = i.length;
        return n > 1 && Ot(t, i[0], i[1]) ? i = [] : n > 2 && Ot(i[0], i[1], i[2]) && (i = [i[0]]), Zu(t, bt(i, 1), []);
      }), Eo = Ip || function() {
        return gt.Date.now();
      };
      function Jg(t, i) {
        if (typeof i != "function") throw new Xt(h);
        return t = j(t), function() {
          if (--t < 1) return i.apply(this, arguments);
        };
      }
      function qc(t, i, n) {
        return i = n ? r : i, i = t && i == null ? t.length : i, Ie(t, Le, r, r, r, r, i);
      }
      function Yc(t, i) {
        var n;
        if (typeof i != "function") throw new Xt(h);
        return t = j(t), function() {
          return --t > 0 && (n = i.apply(this, arguments)), t <= 1 && (i = r), n;
        };
      }
      var zs = B(function(t, i, n) {
        var c = Q2;
        if (n.length) {
          var l = Be(n, Fr(zs));
          c |= fe;
        }
        return Ie(t, c, i, n, l);
      }), Xc = B(function(t, i, n) {
        var c = Q2 | nt;
        if (n.length) {
          var l = Be(n, Fr(Xc));
          c |= fe;
        }
        return Ie(i, c, t, n, l);
      });
      function Qc(t, i, n) {
        i = n ? r : i;
        var c = Ie(t, Vt2, r, r, r, r, r, i);
        return c.placeholder = Qc.placeholder, c;
      }
      function Kc(t, i, n) {
        i = n ? r : i;
        var c = Ie(t, Pr2, r, r, r, r, r, i);
        return c.placeholder = Kc.placeholder, c;
      }
      function Jc(t, i, n) {
        var c, l, m, g, y, b, _ = 0, L = false, S = false, E = true;
        if (typeof t != "function") throw new Xt(h);
        i = te(i) || 0, ut(n) && (L = !!n.leading, S = "maxWait" in n, m = S ? mt(te(n.maxWait) || 0, i) : m, E = "trailing" in n ? !!n.trailing : E);
        function M(ht) {
          var ue = c, ke = l;
          return c = l = r, _ = ht, g = t.apply(ke, ue), g;
        }
        function R(ht) {
          return _ = ht, y = yi(z, i), L ? M(ht) : g;
        }
        function U(ht) {
          var ue = ht - b, ke = ht - _, yl = i - ue;
          return S ? wt2(yl, m - ke) : yl;
        }
        function F(ht) {
          var ue = ht - b, ke = ht - _;
          return b === r || ue >= i || ue < 0 || S && ke >= m;
        }
        function z() {
          var ht = Eo();
          if (F(ht)) return q(ht);
          y = yi(z, U(ht));
        }
        function q(ht) {
          return y = r, E && c ? M(ht) : (c = l = r, g);
        }
        function Ht() {
          y !== r && uc(y), _ = 0, c = b = l = y = r;
        }
        function Et() {
          return y === r ? g : q(Eo());
        }
        function Bt() {
          var ht = Eo(), ue = F(ht);
          if (c = arguments, l = this, b = ht, ue) {
            if (y === r) return R(b);
            if (S) return uc(y), y = yi(z, i), M(b);
          }
          return y === r && (y = yi(z, i)), g;
        }
        return Bt.cancel = Ht, Bt.flush = Et, Bt;
      }
      var Zg = B(function(t, i) {
        return Uu(t, 1, i);
      }), ty = B(function(t, i, n) {
        return Uu(t, te(i) || 0, n);
      });
      function ey(t) {
        return Ie(t, kn);
      }
      function Do(t, i) {
        if (typeof t != "function" || i != null && typeof i != "function") throw new Xt(h);
        var n = function() {
          var c = arguments, l = i ? i.apply(this, c) : c[0], m = n.cache;
          if (m.has(l)) return m.get(l);
          var g = t.apply(this, c);
          return n.cache = m.set(l, g) || m, g;
        };
        return n.cache = new (Do.Cache || Ee)(), n;
      }
      Do.Cache = Ee;
      function Io(t) {
        if (typeof t != "function") throw new Xt(h);
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
      function ry(t) {
        return Yc(2, t);
      }
      var iy = Bm(function(t, i) {
        i = i.length == 1 && N(i[0]) ? at(i[0], Gt(A())) : at(bt(i, 1), Gt(A()));
        var n = i.length;
        return B(function(c) {
          for (var l = -1, m = wt2(c.length, n); ++l < m; ) c[l] = i[l].call(this, c[l]);
          return Nt(t, this, c);
        });
      }), $s = B(function(t, i) {
        var n = Be(i, Fr($s));
        return Ie(t, fe, r, i, n);
      }), Zc = B(function(t, i) {
        var n = Be(i, Fr(Zc));
        return Ie(t, xr, r, i, n);
      }), oy = Me(function(t, i) {
        return Ie(t, Qr, r, r, r, i);
      });
      function ny(t, i) {
        if (typeof t != "function") throw new Xt(h);
        return i = i === r ? i : j(i), B(t, i);
      }
      function sy(t, i) {
        if (typeof t != "function") throw new Xt(h);
        return i = i == null ? 0 : mt(j(i), 0), B(function(n) {
          var c = n[i], l = Xe(n, 0, i);
          return c && He(l, c), Nt(t, this, l);
        });
      }
      function ay(t, i, n) {
        var c = true, l = true;
        if (typeof t != "function") throw new Xt(h);
        return ut(n) && (c = "leading" in n ? !!n.leading : c, l = "trailing" in n ? !!n.trailing : l), Jc(t, i, { leading: c, maxWait: i, trailing: l });
      }
      function uy(t) {
        return qc(t, 1);
      }
      function cy(t, i) {
        return $s(Ds(i), t);
      }
      function ly() {
        if (!arguments.length) return [];
        var t = arguments[0];
        return N(t) ? t : [t];
      }
      function hy(t) {
        return Kt(t, D);
      }
      function fy(t, i) {
        return i = typeof i == "function" ? i : r, Kt(t, D, i);
      }
      function py(t) {
        return Kt(t, O | D);
      }
      function my(t, i) {
        return i = typeof i == "function" ? i : r, Kt(t, O | D, i);
      }
      function dy(t, i) {
        return i == null || ju(t, i, yt(i));
      }
      function ae(t, i) {
        return t === i || t !== t && i !== i;
      }
      var gy = wo(vs), yy = wo(function(t, i) {
        return t >= i;
      }), hr = $u(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? $u : function(t) {
        return ct(t) && et.call(t, "callee") && !Mu.call(t, "callee");
      }, N = x.isArray, vy = pu ? Gt(pu) : Lm;
      function Mt(t) {
        return t != null && Mo(t.length) && !Re(t);
      }
      function lt(t) {
        return ct(t) && Mt(t);
      }
      function by(t) {
        return t === true || t === false || ct(t) && St2(t) == Kr;
      }
      var Qe = Ap || ia, Ty = mu ? Gt(mu) : Sm;
      function Py(t) {
        return ct(t) && t.nodeType === 1 && !vi(t);
      }
      function xy(t) {
        if (t == null) return true;
        if (Mt(t) && (N(t) || typeof t == "string" || typeof t.splice == "function" || Qe(t) || kr(t) || hr(t))) return !t.length;
        var i = Ct(t);
        if (i == ie || i == oe) return !t.size;
        if (gi(t)) return !Ps(t).length;
        for (var n in t) if (et.call(t, n)) return false;
        return true;
      }
      function wy(t, i) {
        return pi(t, i);
      }
      function Cy(t, i, n) {
        n = typeof n == "function" ? n : r;
        var c = n ? n(t, i) : r;
        return c === r ? pi(t, i, r, n) : !!c;
      }
      function qs(t) {
        if (!ct(t)) return false;
        var i = St2(t);
        return i == Bi || i == $h || typeof t.message == "string" && typeof t.name == "string" && !vi(t);
      }
      function _y(t) {
        return typeof t == "number" && Ru(t);
      }
      function Re(t) {
        if (!ut(t)) return false;
        var i = St2(t);
        return i == Wi || i == Ua || i == zh || i == Yh;
      }
      function tl(t) {
        return typeof t == "number" && t == j(t);
      }
      function Mo(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= je2;
      }
      function ut(t) {
        var i = typeof t;
        return t != null && (i == "object" || i == "function");
      }
      function ct(t) {
        return t != null && typeof t == "object";
      }
      var el = du ? Gt(du) : Em;
      function Ly(t, i) {
        return t === i || Ts(t, i, Vs(i));
      }
      function Sy(t, i, n) {
        return n = typeof n == "function" ? n : r, Ts(t, i, Vs(i), n);
      }
      function Oy(t) {
        return rl(t) && t != +t;
      }
      function Ey(t) {
        if (fd(t)) throw new V(u);
        return qu(t);
      }
      function Dy(t) {
        return t === null;
      }
      function Iy(t) {
        return t == null;
      }
      function rl(t) {
        return typeof t == "number" || ct(t) && St2(t) == Zr;
      }
      function vi(t) {
        if (!ct(t) || St2(t) != Se) return false;
        var i = oo(t);
        if (i === null) return true;
        var n = et.call(i, "constructor") && i.constructor;
        return typeof n == "function" && n instanceof n && to.call(n) == Sp;
      }
      var Ys = gu ? Gt(gu) : Dm;
      function My(t) {
        return tl(t) && t >= -je2 && t <= je2;
      }
      var il = yu ? Gt(yu) : Im;
      function Ao(t) {
        return typeof t == "string" || !N(t) && ct(t) && St2(t) == ei;
      }
      function Ut(t) {
        return typeof t == "symbol" || ct(t) && St2(t) == zi;
      }
      var kr = vu ? Gt(vu) : Mm;
      function Ay(t) {
        return t === r;
      }
      function Ry(t) {
        return ct(t) && Ct(t) == ri;
      }
      function Fy(t) {
        return ct(t) && St2(t) == Qh;
      }
      var ky = wo(xs), Vy = wo(function(t, i) {
        return t <= i;
      });
      function ol(t) {
        if (!t) return [];
        if (Mt(t)) return Ao(t) ? ne(t) : It(t);
        if (ni && t[ni]) return dp(t[ni]());
        var i = Ct(t), n = i == ie ? cs : i == oe ? Ki : Vr;
        return n(t);
      }
      function Fe(t) {
        if (!t) return t === 0 ? t : 0;
        if (t = te(t), t === rr2 || t === -rr2) {
          var i = t < 0 ? -1 : 1;
          return i * Uh;
        }
        return t === t ? t : 0;
      }
      function j(t) {
        var i = Fe(t), n = i % 1;
        return i === i ? n ? i - n : i : 0;
      }
      function nl(t) {
        return t ? ar(j(t), 0, pe) : 0;
      }
      function te(t) {
        if (typeof t == "number") return t;
        if (Ut(t)) return Ui3;
        if (ut(t)) {
          var i = typeof t.valueOf == "function" ? t.valueOf() : t;
          t = ut(i) ? i + "" : i;
        }
        if (typeof t != "string") return t === 0 ? t : +t;
        t = Cu(t);
        var n = vf.test(t);
        return n || Tf.test(t) ? Jf(t.slice(2), n ? 2 : 8) : yf.test(t) ? Ui3 : +t;
      }
      function sl(t) {
        return de(t, At(t));
      }
      function Ny(t) {
        return t ? ar(j(t), -je2, je2) : t === 0 ? t : 0;
      }
      function tt(t) {
        return t == null ? "" : jt(t);
      }
      var Gy = Ar(function(t, i) {
        if (gi(i) || Mt(i)) {
          de(i, yt(i), t);
          return;
        }
        for (var n in i) et.call(i, n) && li(t, n, i[n]);
      }), al = Ar(function(t, i) {
        de(i, At(i), t);
      }), Ro = Ar(function(t, i, n, c) {
        de(i, At(i), t, c);
      }), jy = Ar(function(t, i, n, c) {
        de(i, yt(i), t, c);
      }), Uy = Me(ds);
      function Hy(t, i) {
        var n = Mr(t);
        return i == null ? n : Gu(n, i);
      }
      var By = B(function(t, i) {
        t = it(t);
        var n = -1, c = i.length, l = c > 2 ? i[2] : r;
        for (l && Ot(i[0], i[1], l) && (c = 1); ++n < c; ) for (var m = i[n], g = At(m), y = -1, b = g.length; ++y < b; ) {
          var _ = g[y], L = t[_];
          (L === r || ae(L, Er[_]) && !et.call(t, _)) && (t[_] = m[_]);
        }
        return t;
      }), Wy = B(function(t) {
        return t.push(r, Cc), Nt(ul, r, t);
      });
      function zy(t, i) {
        return Tu(t, A(i, 3), me);
      }
      function $y(t, i) {
        return Tu(t, A(i, 3), ys);
      }
      function qy(t, i) {
        return t == null ? t : gs(t, A(i, 3), At);
      }
      function Yy(t, i) {
        return t == null ? t : Wu(t, A(i, 3), At);
      }
      function Xy(t, i) {
        return t && me(t, A(i, 3));
      }
      function Qy(t, i) {
        return t && ys(t, A(i, 3));
      }
      function Ky(t) {
        return t == null ? [] : mo(t, yt(t));
      }
      function Jy(t) {
        return t == null ? [] : mo(t, At(t));
      }
      function Xs(t, i, n) {
        var c = t == null ? r : ur(t, i);
        return c === r ? n : c;
      }
      function Zy(t, i) {
        return t != null && Sc(t, i, xm);
      }
      function Qs(t, i) {
        return t != null && Sc(t, i, wm);
      }
      var tv = bc(function(t, i, n) {
        i != null && typeof i.toString != "function" && (i = eo.call(i)), t[i] = n;
      }, Js(Rt)), ev = bc(function(t, i, n) {
        i != null && typeof i.toString != "function" && (i = eo.call(i)), et.call(t, i) ? t[i].push(n) : t[i] = [n];
      }, A), rv = B(fi);
      function yt(t) {
        return Mt(t) ? Vu(t) : Ps(t);
      }
      function At(t) {
        return Mt(t) ? Vu(t, true) : Am(t);
      }
      function iv(t, i) {
        var n = {};
        return i = A(i, 3), me(t, function(c, l, m) {
          De(n, i(c, l, m), c);
        }), n;
      }
      function ov(t, i) {
        var n = {};
        return i = A(i, 3), me(t, function(c, l, m) {
          De(n, l, i(c, l, m));
        }), n;
      }
      var nv = Ar(function(t, i, n) {
        go(t, i, n);
      }), ul = Ar(function(t, i, n, c) {
        go(t, i, n, c);
      }), sv = Me(function(t, i) {
        var n = {};
        if (t == null) return n;
        var c = false;
        i = at(i, function(m) {
          return m = Ye(m, t), c || (c = m.length > 1), m;
        }), de(t, Fs(t), n), c && (n = Kt(n, O | H | D, td));
        for (var l = i.length; l--; ) Ss(n, i[l]);
        return n;
      });
      function av(t, i) {
        return cl(t, Io(A(i)));
      }
      var uv = Me(function(t, i) {
        return t == null ? {} : Fm(t, i);
      });
      function cl(t, i) {
        if (t == null) return {};
        var n = at(Fs(t), function(c) {
          return [c];
        });
        return i = A(i), tc(t, n, function(c, l) {
          return i(c, l[0]);
        });
      }
      function cv(t, i, n) {
        i = Ye(i, t);
        var c = -1, l = i.length;
        for (l || (l = 1, t = r); ++c < l; ) {
          var m = t == null ? r : t[ge(i[c])];
          m === r && (c = l, m = n), t = Re(m) ? m.call(t) : m;
        }
        return t;
      }
      function lv(t, i, n) {
        return t == null ? t : mi(t, i, n);
      }
      function hv(t, i, n, c) {
        return c = typeof c == "function" ? c : r, t == null ? t : mi(t, i, n, c);
      }
      var ll = xc(yt), hl = xc(At);
      function fv(t, i, n) {
        var c = N(t), l = c || Qe(t) || kr(t);
        if (i = A(i, 4), n == null) {
          var m = t && t.constructor;
          l ? n = c ? new m() : [] : ut(t) ? n = Re(m) ? Mr(oo(t)) : {} : n = {};
        }
        return (l ? Yt : me)(t, function(g, y, b) {
          return i(n, g, y, b);
        }), n;
      }
      function pv(t, i) {
        return t == null ? true : Ss(t, i);
      }
      function mv(t, i, n) {
        return t == null ? t : nc(t, i, Ds(n));
      }
      function dv(t, i, n, c) {
        return c = typeof c == "function" ? c : r, t == null ? t : nc(t, i, Ds(n), c);
      }
      function Vr(t) {
        return t == null ? [] : us(t, yt(t));
      }
      function gv(t) {
        return t == null ? [] : us(t, At(t));
      }
      function yv(t, i, n) {
        return n === r && (n = i, i = r), n !== r && (n = te(n), n = n === n ? n : 0), i !== r && (i = te(i), i = i === i ? i : 0), ar(te(t), i, n);
      }
      function vv(t, i, n) {
        return i = Fe(i), n === r ? (n = i, i = 0) : n = Fe(n), t = te(t), Cm(t, i, n);
      }
      function bv(t, i, n) {
        if (n && typeof n != "boolean" && Ot(t, i, n) && (i = n = r), n === r && (typeof i == "boolean" ? (n = i, i = r) : typeof t == "boolean" && (n = t, t = r)), t === r && i === r ? (t = 0, i = 1) : (t = Fe(t), i === r ? (i = t, t = 0) : i = Fe(i)), t > i) {
          var c = t;
          t = i, i = c;
        }
        if (n || t % 1 || i % 1) {
          var l = Fu();
          return wt2(t + l * (i - t + Kf("1e-" + ((l + "").length - 1))), i);
        }
        return Cs(t, i);
      }
      var Tv = Rr(function(t, i, n) {
        return i = i.toLowerCase(), t + (n ? fl(i) : i);
      });
      function fl(t) {
        return Ks(tt(t).toLowerCase());
      }
      function pl(t) {
        return t = tt(t), t && t.replace(xf, lp).replace(Uf, "");
      }
      function Pv(t, i, n) {
        t = tt(t), i = jt(i);
        var c = t.length;
        n = n === r ? c : ar(j(n), 0, c);
        var l = n;
        return n -= i.length, n >= 0 && t.slice(n, l) == i;
      }
      function xv(t) {
        return t = tt(t), t && ef.test(t) ? t.replace(Wa, hp) : t;
      }
      function wv(t) {
        return t = tt(t), t && uf.test(t) ? t.replace($n, "\\$&") : t;
      }
      var Cv = Rr(function(t, i, n) {
        return t + (n ? "-" : "") + i.toLowerCase();
      }), _v = Rr(function(t, i, n) {
        return t + (n ? " " : "") + i.toLowerCase();
      }), Lv = gc("toLowerCase");
      function Sv(t, i, n) {
        t = tt(t), i = j(i);
        var c = i ? Or(t) : 0;
        if (!i || c >= i) return t;
        var l = (i - c) / 2;
        return xo(uo(l), n) + t + xo(ao(l), n);
      }
      function Ov(t, i, n) {
        t = tt(t), i = j(i);
        var c = i ? Or(t) : 0;
        return i && c < i ? t + xo(i - c, n) : t;
      }
      function Ev(t, i, n) {
        t = tt(t), i = j(i);
        var c = i ? Or(t) : 0;
        return i && c < i ? xo(i - c, n) + t : t;
      }
      function Dv(t, i, n) {
        return n || i == null ? i = 0 : i && (i = +i), Vp(tt(t).replace(qn, ""), i || 0);
      }
      function Iv(t, i, n) {
        return (n ? Ot(t, i, n) : i === r) ? i = 1 : i = j(i), _s(tt(t), i);
      }
      function Mv() {
        var t = arguments, i = tt(t[0]);
        return t.length < 3 ? i : i.replace(t[1], t[2]);
      }
      var Av = Rr(function(t, i, n) {
        return t + (n ? "_" : "") + i.toLowerCase();
      });
      function Rv(t, i, n) {
        return n && typeof n != "number" && Ot(t, i, n) && (i = n = r), n = n === r ? pe : n >>> 0, n ? (t = tt(t), t && (typeof i == "string" || i != null && !Ys(i)) && (i = jt(i), !i && Sr(t)) ? Xe(ne(t), 0, n) : t.split(i, n)) : [];
      }
      var Fv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + Ks(i);
      });
      function kv(t, i, n) {
        return t = tt(t), n = n == null ? 0 : ar(j(n), 0, t.length), i = jt(i), t.slice(n, n + i.length) == i;
      }
      function Vv(t, i, n) {
        var c = f.templateSettings;
        n && Ot(t, i, n) && (i = r), t = tt(t), i = Ro({}, i, c, wc);
        var l = Ro({}, i.imports, c.imports, wc), m = yt(l), g = us(l, m), y, b, _ = 0, L = i.interpolate || $i, S = "__p += '", E = ls((i.escape || $i).source + "|" + L.source + "|" + (L === za ? gf : $i).source + "|" + (i.evaluate || $i).source + "|$", "g"), M = "//# sourceURL=" + (et.call(i, "sourceURL") ? (i.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++$f + "]") + `
`;
        t.replace(E, function(F, z, q, Ht, Et, Bt) {
          return q || (q = Ht), S += t.slice(_, Bt).replace(wf, fp), z && (y = true, S += `' +
__e(` + z + `) +
'`), Et && (b = true, S += `';
` + Et + `;
__p += '`), q && (S += `' +
((__t = (` + q + `)) == null ? '' : __t) +
'`), _ = Bt + F.length, F;
        }), S += `';
`;
        var R = et.call(i, "variable") && i.variable;
        if (!R) S = `with (obj) {
` + S + `
}
`;
        else if (mf.test(R)) throw new V(p);
        S = (b ? S.replace(Kh, "") : S).replace(Jh, "$1").replace(Zh, "$1;"), S = "function(" + (R || "obj") + `) {
` + (R ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (y ? ", __e = _.escape" : "") + (b ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + S + `return __p
}`;
        var U = dl(function() {
          return J(m, M + "return " + S).apply(r, g);
        });
        if (U.source = S, qs(U)) throw U;
        return U;
      }
      function Nv(t) {
        return tt(t).toLowerCase();
      }
      function Gv(t) {
        return tt(t).toUpperCase();
      }
      function jv(t, i, n) {
        if (t = tt(t), t && (n || i === r)) return Cu(t);
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = ne(i), m = _u(c, l), g = Lu(c, l) + 1;
        return Xe(c, m, g).join("");
      }
      function Uv(t, i, n) {
        if (t = tt(t), t && (n || i === r)) return t.slice(0, Ou(t) + 1);
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = Lu(c, ne(i)) + 1;
        return Xe(c, 0, l).join("");
      }
      function Hv(t, i, n) {
        if (t = tt(t), t && (n || i === r)) return t.replace(qn, "");
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = _u(c, ne(i));
        return Xe(c, l).join("");
      }
      function Bv(t, i) {
        var n = Fh, c = kh;
        if (ut(i)) {
          var l = "separator" in i ? i.separator : l;
          n = "length" in i ? j(i.length) : n, c = "omission" in i ? jt(i.omission) : c;
        }
        t = tt(t);
        var m = t.length;
        if (Sr(t)) {
          var g = ne(t);
          m = g.length;
        }
        if (n >= m) return t;
        var y = n - Or(c);
        if (y < 1) return c;
        var b = g ? Xe(g, 0, y).join("") : t.slice(0, y);
        if (l === r) return b + c;
        if (g && (y += b.length - y), Ys(l)) {
          if (t.slice(y).search(l)) {
            var _, L = b;
            for (l.global || (l = ls(l.source, tt($a.exec(l)) + "g")), l.lastIndex = 0; _ = l.exec(L); ) var S = _.index;
            b = b.slice(0, S === r ? y : S);
          }
        } else if (t.indexOf(jt(l), y) != y) {
          var E = b.lastIndexOf(l);
          E > -1 && (b = b.slice(0, E));
        }
        return b + c;
      }
      function Wv(t) {
        return t = tt(t), t && tf.test(t) ? t.replace(Ba, bp) : t;
      }
      var zv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + i.toUpperCase();
      }), Ks = gc("toUpperCase");
      function ml(t, i, n) {
        return t = tt(t), i = n ? r : i, i === r ? mp(t) ? xp(t) : np(t) : t.match(i) || [];
      }
      var dl = B(function(t, i) {
        try {
          return Nt(t, r, i);
        } catch (n) {
          return qs(n) ? n : new V(n);
        }
      }), $v = Me(function(t, i) {
        return Yt(i, function(n) {
          n = ge(n), De(t, n, zs(t[n], t));
        }), t;
      });
      function qv(t) {
        var i = t == null ? 0 : t.length, n = A();
        return t = i ? at(t, function(c) {
          if (typeof c[1] != "function") throw new Xt(h);
          return [n(c[0]), c[1]];
        }) : [], B(function(c) {
          for (var l = -1; ++l < i; ) {
            var m = t[l];
            if (Nt(m[0], this, c)) return Nt(m[1], this, c);
          }
        });
      }
      function Yv(t) {
        return bm(Kt(t, O));
      }
      function Js(t) {
        return function() {
          return t;
        };
      }
      function Xv(t, i) {
        return t == null || t !== t ? i : t;
      }
      var Qv = vc(), Kv = vc(true);
      function Rt(t) {
        return t;
      }
      function Zs(t) {
        return Yu(typeof t == "function" ? t : Kt(t, O));
      }
      function Jv(t) {
        return Qu(Kt(t, O));
      }
      function Zv(t, i) {
        return Ku(t, Kt(i, O));
      }
      var tb = B(function(t, i) {
        return function(n) {
          return fi(n, t, i);
        };
      }), eb = B(function(t, i) {
        return function(n) {
          return fi(t, n, i);
        };
      });
      function ta(t, i, n) {
        var c = yt(i), l = mo(i, c);
        n == null && !(ut(i) && (l.length || !c.length)) && (n = i, i = t, t = this, l = mo(i, yt(i)));
        var m = !(ut(n) && "chain" in n) || !!n.chain, g = Re(t);
        return Yt(l, function(y) {
          var b = i[y];
          t[y] = b, g && (t.prototype[y] = function() {
            var _ = this.__chain__;
            if (m || _) {
              var L = t(this.__wrapped__), S = L.__actions__ = It(this.__actions__);
              return S.push({ func: b, args: arguments, thisArg: t }), L.__chain__ = _, L;
            }
            return b.apply(t, He([this.value()], arguments));
          });
        }), t;
      }
      function rb() {
        return gt._ === this && (gt._ = Op), this;
      }
      function ea() {
      }
      function ib(t) {
        return t = j(t), B(function(i) {
          return Ju(i, t);
        });
      }
      var ob = Ms(at), nb = Ms(bu), sb = Ms(is);
      function gl(t) {
        return Gs(t) ? os(ge(t)) : km(t);
      }
      function ab(t) {
        return function(i) {
          return t == null ? r : ur(t, i);
        };
      }
      var ub = Tc(), cb = Tc(true);
      function ra() {
        return [];
      }
      function ia() {
        return false;
      }
      function lb() {
        return {};
      }
      function hb() {
        return "";
      }
      function fb() {
        return true;
      }
      function pb(t, i) {
        if (t = j(t), t < 1 || t > je2) return [];
        var n = pe, c = wt2(t, pe);
        i = A(i), t -= pe;
        for (var l = as(c, i); ++n < t; ) i(n);
        return l;
      }
      function mb(t) {
        return N(t) ? at(t, ge) : Ut(t) ? [t] : It(kc(tt(t)));
      }
      function db(t) {
        var i = ++Lp;
        return tt(t) + i;
      }
      var gb = Po(function(t, i) {
        return t + i;
      }, 0), yb = As("ceil"), vb = Po(function(t, i) {
        return t / i;
      }, 1), bb = As("floor");
      function Tb(t) {
        return t && t.length ? po(t, Rt, vs) : r;
      }
      function Pb(t, i) {
        return t && t.length ? po(t, A(i, 2), vs) : r;
      }
      function xb(t) {
        return xu(t, Rt);
      }
      function wb(t, i) {
        return xu(t, A(i, 2));
      }
      function Cb(t) {
        return t && t.length ? po(t, Rt, xs) : r;
      }
      function _b(t, i) {
        return t && t.length ? po(t, A(i, 2), xs) : r;
      }
      var Lb = Po(function(t, i) {
        return t * i;
      }, 1), Sb = As("round"), Ob = Po(function(t, i) {
        return t - i;
      }, 0);
      function Eb(t) {
        return t && t.length ? ss(t, Rt) : 0;
      }
      function Db2(t, i) {
        return t && t.length ? ss(t, A(i, 2)) : 0;
      }
      return f.after = Jg, f.ary = qc, f.assign = Gy, f.assignIn = al, f.assignInWith = Ro, f.assignWith = jy, f.at = Uy, f.before = Yc, f.bind = zs, f.bindAll = $v, f.bindKey = Xc, f.castArray = ly, f.chain = Wc, f.chunk = bd, f.compact = Td, f.concat = Pd, f.cond = qv, f.conforms = Yv, f.constant = Js, f.countBy = Eg, f.create = Hy, f.curry = Qc, f.curryRight = Kc, f.debounce = Jc, f.defaults = By, f.defaultsDeep = Wy, f.defer = Zg, f.delay = ty, f.difference = xd, f.differenceBy = wd, f.differenceWith = Cd, f.drop = _d, f.dropRight = Ld, f.dropRightWhile = Sd, f.dropWhile = Od, f.fill = Ed, f.filter = Ig, f.flatMap = Rg, f.flatMapDeep = Fg, f.flatMapDepth = kg, f.flatten = jc, f.flattenDeep = Dd, f.flattenDepth = Id, f.flip = ey, f.flow = Qv, f.flowRight = Kv, f.fromPairs = Md, f.functions = Ky, f.functionsIn = Jy, f.groupBy = Vg, f.initial = Rd, f.intersection = Fd, f.intersectionBy = kd, f.intersectionWith = Vd, f.invert = tv, f.invertBy = ev, f.invokeMap = Gg, f.iteratee = Zs, f.keyBy = jg, f.keys = yt, f.keysIn = At, f.map = Oo, f.mapKeys = iv, f.mapValues = ov, f.matches = Jv, f.matchesProperty = Zv, f.memoize = Do, f.merge = nv, f.mergeWith = ul, f.method = tb, f.methodOf = eb, f.mixin = ta, f.negate = Io, f.nthArg = ib, f.omit = sv, f.omitBy = av, f.once = ry, f.orderBy = Ug, f.over = ob, f.overArgs = iy, f.overEvery = nb, f.overSome = sb, f.partial = $s, f.partialRight = Zc, f.partition = Hg, f.pick = uv, f.pickBy = cl, f.property = gl, f.propertyOf = ab, f.pull = Ud, f.pullAll = Hc, f.pullAllBy = Hd, f.pullAllWith = Bd, f.pullAt = Wd, f.range = ub, f.rangeRight = cb, f.rearg = oy, f.reject = zg, f.remove = zd, f.rest = ny, f.reverse = Bs, f.sampleSize = qg, f.set = lv, f.setWith = hv, f.shuffle = Yg, f.slice = $d, f.sortBy = Kg, f.sortedUniq = Zd, f.sortedUniqBy = tg, f.split = Rv, f.spread = sy, f.tail = eg, f.take = rg, f.takeRight = ig, f.takeRightWhile = og, f.takeWhile = ng, f.tap = Tg, f.throttle = ay, f.thru = So, f.toArray = ol, f.toPairs = ll, f.toPairsIn = hl, f.toPath = mb, f.toPlainObject = sl, f.transform = fv, f.unary = uy, f.union = sg, f.unionBy = ag, f.unionWith = ug, f.uniq = cg, f.uniqBy = lg, f.uniqWith = hg, f.unset = pv, f.unzip = Ws, f.unzipWith = Bc, f.update = mv, f.updateWith = dv, f.values = Vr, f.valuesIn = gv, f.without = fg, f.words = ml, f.wrap = cy, f.xor = pg, f.xorBy = mg, f.xorWith = dg, f.zip = gg, f.zipObject = yg, f.zipObjectDeep = vg, f.zipWith = bg, f.entries = ll, f.entriesIn = hl, f.extend = al, f.extendWith = Ro, ta(f, f), f.add = gb, f.attempt = dl, f.camelCase = Tv, f.capitalize = fl, f.ceil = yb, f.clamp = yv, f.clone = hy, f.cloneDeep = py, f.cloneDeepWith = my, f.cloneWith = fy, f.conformsTo = dy, f.deburr = pl, f.defaultTo = Xv, f.divide = vb, f.endsWith = Pv, f.eq = ae, f.escape = xv, f.escapeRegExp = wv, f.every = Dg, f.find = Mg, f.findIndex = Nc, f.findKey = zy, f.findLast = Ag, f.findLastIndex = Gc, f.findLastKey = $y, f.floor = bb, f.forEach = zc, f.forEachRight = $c, f.forIn = qy, f.forInRight = Yy, f.forOwn = Xy, f.forOwnRight = Qy, f.get = Xs, f.gt = gy, f.gte = yy, f.has = Zy, f.hasIn = Qs, f.head = Uc, f.identity = Rt, f.includes = Ng, f.indexOf = Ad, f.inRange = vv, f.invoke = rv, f.isArguments = hr, f.isArray = N, f.isArrayBuffer = vy, f.isArrayLike = Mt, f.isArrayLikeObject = lt, f.isBoolean = by, f.isBuffer = Qe, f.isDate = Ty, f.isElement = Py, f.isEmpty = xy, f.isEqual = wy, f.isEqualWith = Cy, f.isError = qs, f.isFinite = _y, f.isFunction = Re, f.isInteger = tl, f.isLength = Mo, f.isMap = el, f.isMatch = Ly, f.isMatchWith = Sy, f.isNaN = Oy, f.isNative = Ey, f.isNil = Iy, f.isNull = Dy, f.isNumber = rl, f.isObject = ut, f.isObjectLike = ct, f.isPlainObject = vi, f.isRegExp = Ys, f.isSafeInteger = My, f.isSet = il, f.isString = Ao, f.isSymbol = Ut, f.isTypedArray = kr, f.isUndefined = Ay, f.isWeakMap = Ry, f.isWeakSet = Fy, f.join = Nd, f.kebabCase = Cv, f.last = Zt, f.lastIndexOf = Gd, f.lowerCase = _v, f.lowerFirst = Lv, f.lt = ky, f.lte = Vy, f.max = Tb, f.maxBy = Pb, f.mean = xb, f.meanBy = wb, f.min = Cb, f.minBy = _b, f.stubArray = ra, f.stubFalse = ia, f.stubObject = lb, f.stubString = hb, f.stubTrue = fb, f.multiply = Lb, f.nth = jd, f.noConflict = rb, f.noop = ea, f.now = Eo, f.pad = Sv, f.padEnd = Ov, f.padStart = Ev, f.parseInt = Dv, f.random = bv, f.reduce = Bg, f.reduceRight = Wg, f.repeat = Iv, f.replace = Mv, f.result = cv, f.round = Sb, f.runInContext = v, f.sample = $g, f.size = Xg, f.snakeCase = Av, f.some = Qg, f.sortedIndex = qd, f.sortedIndexBy = Yd, f.sortedIndexOf = Xd, f.sortedLastIndex = Qd, f.sortedLastIndexBy = Kd, f.sortedLastIndexOf = Jd, f.startCase = Fv, f.startsWith = kv, f.subtract = Ob, f.sum = Eb, f.sumBy = Db2, f.template = Vv, f.times = pb, f.toFinite = Fe, f.toInteger = j, f.toLength = nl, f.toLower = Nv, f.toNumber = te, f.toSafeInteger = Ny, f.toString = tt, f.toUpper = Gv, f.trim = jv, f.trimEnd = Uv, f.trimStart = Hv, f.truncate = Bv, f.unescape = Wv, f.uniqueId = db, f.upperCase = zv, f.upperFirst = Ks, f.each = zc, f.eachRight = $c, f.first = Uc, ta(f, (function() {
        var t = {};
        return me(f, function(i, n) {
          et.call(f.prototype, n) || (t[n] = i);
        }), t;
      })(), { chain: false }), f.VERSION = o, Yt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
        f[t].placeholder = f;
      }), Yt(["drop", "take"], function(t, i) {
        $.prototype[t] = function(n) {
          n = n === r ? 1 : mt(j(n), 0);
          var c = this.__filtered__ && !i ? new $(this) : this.clone();
          return c.__filtered__ ? c.__takeCount__ = wt2(n, c.__takeCount__) : c.__views__.push({ size: wt2(n, pe), type: t + (c.__dir__ < 0 ? "Right" : "") }), c;
        }, $.prototype[t + "Right"] = function(n) {
          return this.reverse()[t](n).reverse();
        };
      }), Yt(["filter", "map", "takeWhile"], function(t, i) {
        var n = i + 1, c = n == ja || n == jh;
        $.prototype[t] = function(l) {
          var m = this.clone();
          return m.__iteratees__.push({ iteratee: A(l, 3), type: n }), m.__filtered__ = m.__filtered__ || c, m;
        };
      }), Yt(["head", "last"], function(t, i) {
        var n = "take" + (i ? "Right" : "");
        $.prototype[t] = function() {
          return this[n](1).value()[0];
        };
      }), Yt(["initial", "tail"], function(t, i) {
        var n = "drop" + (i ? "" : "Right");
        $.prototype[t] = function() {
          return this.__filtered__ ? new $(this) : this[n](1);
        };
      }), $.prototype.compact = function() {
        return this.filter(Rt);
      }, $.prototype.find = function(t) {
        return this.filter(t).head();
      }, $.prototype.findLast = function(t) {
        return this.reverse().find(t);
      }, $.prototype.invokeMap = B(function(t, i) {
        return typeof t == "function" ? new $(this) : this.map(function(n) {
          return fi(n, t, i);
        });
      }), $.prototype.reject = function(t) {
        return this.filter(Io(A(t)));
      }, $.prototype.slice = function(t, i) {
        t = j(t);
        var n = this;
        return n.__filtered__ && (t > 0 || i < 0) ? new $(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), i !== r && (i = j(i), n = i < 0 ? n.dropRight(-i) : n.take(i - t)), n);
      }, $.prototype.takeRightWhile = function(t) {
        return this.reverse().takeWhile(t).reverse();
      }, $.prototype.toArray = function() {
        return this.take(pe);
      }, me($.prototype, function(t, i) {
        var n = /^(?:filter|find|map|reject)|While$/.test(i), c = /^(?:head|last)$/.test(i), l = f[c ? "take" + (i == "last" ? "Right" : "") : i], m = c || /^find/.test(i);
        l && (f.prototype[i] = function() {
          var g = this.__wrapped__, y = c ? [1] : arguments, b = g instanceof $, _ = y[0], L = b || N(g), S = function(z) {
            var q = l.apply(f, He([z], y));
            return c && E ? q[0] : q;
          };
          L && n && typeof _ == "function" && _.length != 1 && (b = L = false);
          var E = this.__chain__, M = !!this.__actions__.length, R = m && !E, U = b && !M;
          if (!m && L) {
            g = U ? g : new $(this);
            var F = t.apply(g, y);
            return F.__actions__.push({ func: So, args: [S], thisArg: r }), new Qt(F, E);
          }
          return R && U ? t.apply(this, y) : (F = this.thru(S), R ? c ? F.value()[0] : F.value() : F);
        });
      }), Yt(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
        var i = Ji[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", c = /^(?:pop|shift)$/.test(t);
        f.prototype[t] = function() {
          var l = arguments;
          if (c && !this.__chain__) {
            var m = this.value();
            return i.apply(N(m) ? m : [], l);
          }
          return this[n](function(g) {
            return i.apply(N(g) ? g : [], l);
          });
        };
      }), me($.prototype, function(t, i) {
        var n = f[i];
        if (n) {
          var c = n.name + "";
          et.call(Ir, c) || (Ir[c] = []), Ir[c].push({ name: i, func: n });
        }
      }), Ir[To(r, nt).name] = [{ name: "wrapper", func: r }], $.prototype.clone = Wp, $.prototype.reverse = zp, $.prototype.value = $p, f.prototype.at = Pg, f.prototype.chain = xg, f.prototype.commit = wg, f.prototype.next = Cg, f.prototype.plant = Lg, f.prototype.reverse = Sg, f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = Og, f.prototype.first = f.prototype.head, ni && (f.prototype[ni] = _g), f;
    }, We = wp();
    typeof define == "function" && typeof define.amd == "object" && define.amd ? (gt._ = We, define(function() {
      return We;
    })) : ir ? ((ir.exports = We)._ = We, Zn._ = We) : gt._ = We;
  }).call(a5);
});
var Mh = class extends Set {
  constructor(a5, e = false) {
    super(a5), this.valuesAsFlags = e;
  }
};
function ki(a5) {
  if (a5 instanceof Map) return Object.fromEntries([...a5.entries()].map(([e, r]) => [e, ki(r)]));
  if (a5 instanceof Set) return Array.from(a5.values()).map(ki);
  if (a5 instanceof Mh) return { values: [...a5.values()], valuesAsFlags: a5.valuesAsFlags };
  if (typeof a5 == "object") {
    let e = {};
    return Object.entries(a5).forEach(([r, o]) => {
      e[r] = ki(o);
    }), e;
  } else return a5;
}
var z1 = Ra(Fa(), 1);
var WT = Ra(Fa(), 1);
function br(a5, e) {
  if (typeof a5 != "object") throw new Error(`Cannot merge into non-object objectToMergeWith. Received: ${JSON.stringify(a5)}`);
  if (typeof e != "object") throw new Error(`Cannot merge using non-object objectToMergeWith. Received: ${JSON.stringify(e)}`);
  let r = (0, WT.cloneDeep)(a5);
  for (let [o, s] of Object.entries(e)) typeof s != "object" || s instanceof Set || r[o] === void 0 ? r[o] = s : r[o] = br(r[o], s);
  return r;
}
function Ah(a5, e) {
  if (!(a5 === void 0 || typeof a5 != "object")) for (let r of Object.keys(a5)) {
    if (r === e) return a5[r];
    let o = a5[r];
    if (typeof o == "object") {
      let s = Ah(o, e);
      if (s !== void 0) return s;
    }
  }
}
var Aa = "@composite:";
var zT = "@inherit:";
var $T = class {
  constructor(a5, e, r) {
    this.tiledClassToMembersMap = a5, this.enumNameToValuesMap = e, this.parserOptions = r, this.memoiser = /* @__PURE__ */ new Map();
  }
  flattenMembers(a5, e) {
    return this.memoiser.has(a5) ? { [a5]: this.memoiser.get(a5) } : (this.memoiser.set(a5, e.reduce((r, o) => Y(Y({}, r), this.flattenMemberProperty(o)), {})), { [a5]: this.memoiser.get(a5) });
  }
  flattenMemberProperty(a5) {
    var r;
    let e = (r = a5.propertyType) != null ? r : a5.propertytype;
    if (a5.type === "class") {
      if (!this.memoiser.has(e)) {
        let u = this.tiledClassToMembersMap.get(e).reduce((h, p) => br(this.flattenMemberProperty(p), h), {});
        this.memoiser.set(e, u);
      }
      let o = this.memoiser.get(e), s = br(o, this.flattenValue(a5.value, o));
      return this.checkIfShouldFlatten(a5.name) ? s : { [a5.name.replace(Aa, "")]: s };
    } else return this.enumNameToValuesMap.has(e) ? this.enumNameToValuesMap.get(e).valuesAsFlags ? { [a5.name]: new Set(a5.value.split(",").filter((o) => o !== "")) } : { [a5.name]: a5.value } : { [a5.name]: a5.value };
  }
  get memoisedFlattenedProperties() {
    return this.memoiser;
  }
  flattenValue(a5, e) {
    return Object.entries(a5).reduce((r, [o, s]) => {
      if (typeof s != "object") return Ah(e, o) instanceof Set ? br({ [o]: new Set(s.split(",").filter((u) => u !== "")) }, r) : br({ [o]: s }, r);
      if (this.checkIfShouldFlatten(o)) return br(this.flattenValue(s, e), r);
      {
        let u = o.replace(Aa, "");
        return br({ [u]: this.flattenValue(s, e) }, r);
      }
    }, {});
  }
  checkIfShouldFlatten(a5) {
    var e;
    return ((e = this.parserOptions) == null ? void 0 : e.defaultComposite) === true ? a5.startsWith(zT) : !a5.startsWith(Aa);
  }
};
var Dh = Ra(Fa(), 1);
var qT = class {
  constructor(a5) {
    this.flattener = a5;
  }
  flattenPropertiesOnObject(a5) {
    var e, r, o, s;
    return _t(Y(Y({}, this.flattener.memoisedFlattenedProperties.get((e = a5.class) != null ? e : a5.type)), (r = a5.properties) == null ? void 0 : r.reduce((u, h) => Y(Y({}, u), this.flattener.flattenMemberProperty(h)), {})), { name: a5.name, id: a5.id, class: (s = (o = a5.class) != null ? o : a5.type) != null ? s : null, x: a5.x, y: a5.y });
  }
  flattenPropertiesOnTile(a5) {
    var e, r, o, s;
    return _t(Y(Y({}, this.flattener.memoisedFlattenedProperties.get((e = a5.class) != null ? e : a5.type)), (r = a5.properties) == null ? void 0 : r.reduce((u, h) => Y(Y({}, u), this.flattener.flattenMemberProperty(h)), {})), { id: a5.id, class: (s = (o = a5.class) != null ? o : a5.type) != null ? s : null });
  }
  getCustomTypesMap() {
    return new Map([...this.flattener.memoisedFlattenedProperties.entries()].map(([a5, e]) => [a5, (0, Dh.cloneDeep)(e)]));
  }
  getEnumsMap() {
    return new Map([...this.flattener.enumNameToValuesMap.entries()].map(([a5, e]) => [a5, (0, Dh.cloneDeep)(e)]));
  }
  toJSON() {
    return JSON.stringify({ customTypes: ki(this.getCustomTypesMap()), enums: ki(this.getEnumsMap()) }, null, 4);
  }
};
function YT(a5, e) {
  let r = new Map(a5.propertyTypes.filter((u) => u.type === "enum").map((u) => [u.name, new Mh(u.values, u.valuesAsFlags)])), o = new Map(a5.propertyTypes.filter((u) => u.type === "class").map((u) => [u.name, u.members])), s = new $T(o, r, e);
  return o.forEach((u, h) => {
    s.flattenMembers(h, u);
  }), new qT(s);
}
var Rh = { parse: YT };
var Tr = class {
  constructor(e, r) {
    this.phaserTile = e;
    this.tiledProject = r;
  }
  getProperty(e) {
    var s, u;
    let r = {};
    if (this.tiledProject) {
      let h = Rh.parse(this.tiledProject), p = this.getType();
      if (p) {
        let d = (s = h.getCustomTypesMap()) == null ? void 0 : s.get(p);
        if (d) for (let [T2, C] of Object.entries(d)) r[T2] = C;
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
    return this.phaserTilemapLayer.layer.data.map((e) => e.map((r) => new Tr(r, this.tiledProject)));
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
    if (s) return new Tr(s, this.tiledProject);
  }
};
var QT = Cn.version;
var ji = class ji2 {
  constructor(e) {
    this.scene = e;
    this.geHeadless = new In(false);
    this.isCreatedInternal = false;
    ji2.welcomeMessagePrinted || (console.log(`Using GridEngine Phaser Plugin v${QT}`), ji2.welcomeMessagePrinted = true), this.scene.sys.events.once("boot", this.boot, this);
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
    this.config = o, this.gridTilemap = new yr(e), this.addCharacters();
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
    return { characters: this.geHeadless.getState().characters.map((e) => _t(Y({}, e), { offsetX: this.getOffsetX(e.id), offsetY: this.getOffsetY(e.id) })) };
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
    return Y({ collisionTilePropertyName: "ge_collide", numberOfDirections: 4, characterCollisionStrategy: "BLOCK_TWO_TILES", layerOverlay: false, cacheTileCollisions: false }, e);
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
var Db = Object.create;
var na2 = Object.defineProperty;
var Ib2 = Object.defineProperties;
var Mb2 = Object.getOwnPropertyDescriptor;
var Ab2 = Object.getOwnPropertyDescriptors;
var Rb2 = Object.getOwnPropertyNames;
var vl2 = Object.getOwnPropertySymbols;
var Fb2 = Object.getPrototypeOf;
var Tl2 = Object.prototype.hasOwnProperty;
var kb2 = Object.prototype.propertyIsEnumerable;
var bl2 = (a5, e, r) => e in a5 ? na2(a5, e, { enumerable: true, configurable: true, writable: true, value: r }) : a5[e] = r;
var X = (a5, e) => {
  for (var r in e || (e = {})) Tl2.call(e, r) && bl2(a5, r, e[r]);
  if (vl2) for (var r of vl2(e)) kb2.call(e, r) && bl2(a5, r, e[r]);
  return a5;
};
var Lt2 = (a5, e) => Ib2(a5, Ab2(e));
var ve2 = (a5, e) => () => (e || a5((e = { exports: {} }).exports, e), e.exports);
var Vb2 = (a5, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of Rb2(e)) !Tl2.call(a5, s) && s !== r && na2(a5, s, { get: () => e[s], enumerable: !(o = Mb2(e, s)) || o.enumerable });
  return a5;
};
var ko2 = (a5, e, r) => (r = a5 != null ? Db(Fb2(a5)) : {}, Vb2(e || !a5 || !a5.__esModule ? na2(r, "default", { value: a5, enumerable: true }) : r, a5));
var ga = ve2((Oi) => {
  var iT = function(a5, e) {
    return a5 < e ? -1 : a5 > e ? 1 : 0;
  }, oT = function(a5, e) {
    return a5 < e ? 1 : a5 > e ? -1 : 0;
  };
  function nT(a5) {
    return function(e, r) {
      return a5(r, e);
    };
  }
  function sT(a5) {
    return a5 === 2 ? function(e, r) {
      return e[0] < r[0] ? -1 : e[0] > r[0] ? 1 : e[1] < r[1] ? -1 : e[1] > r[1] ? 1 : 0;
    } : function(e, r) {
      for (var o = 0; o < a5; ) {
        if (e[o] < r[o]) return -1;
        if (e[o] > r[o]) return 1;
        o++;
      }
      return 0;
    };
  }
  Oi.DEFAULT_COMPARATOR = iT;
  Oi.DEFAULT_REVERSE_COMPARATOR = oT;
  Oi.reverseComparator = nT;
  Oi.createTupleComparator = sT;
});
var zl2 = ve2((ya2) => {
  ya2.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer != "undefined";
  ya2.SYMBOL_SUPPORT = typeof Symbol != "undefined";
});
var Ei2 = ve2((jC, ql) => {
  var $l = zl2(), aT = $l.ARRAY_BUFFER_SUPPORT, uT = $l.SYMBOL_SUPPORT;
  ql.exports = function(e, r) {
    var o, s, u, h, p;
    if (!e) throw new Error("obliterator/forEach: invalid iterable.");
    if (typeof r != "function") throw new Error("obliterator/forEach: expecting a callback.");
    if (Array.isArray(e) || aT && ArrayBuffer.isView(e) || typeof e == "string" || e.toString() === "[object Arguments]") {
      for (u = 0, h = e.length; u < h; u++) r(e[u], u);
      return;
    }
    if (typeof e.forEach == "function") {
      e.forEach(r);
      return;
    }
    if (uT && Symbol.iterator in e && typeof e.next != "function" && (e = e[Symbol.iterator]()), typeof e.next == "function") {
      for (o = e, u = 0; p = o.next(), p.done !== true; ) r(p.value, u), u++;
      return;
    }
    for (s in e) e.hasOwnProperty(s) && r(e[s], s);
  };
});
var eh2 = ve2((UC, th) => {
  var Xl = ga(), Yl = Ei2(), Ql = Xl.DEFAULT_COMPARATOR, cT = Xl.reverseComparator;
  function It(a5) {
    if (this.clear(), this.comparator = a5 || Ql, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
  }
  It.prototype.clear = function() {
    this.root = null, this.min = null, this.size = 0;
  };
  function lT(a5) {
    return { item: a5, degree: 0 };
  }
  function Kl(a5, e) {
    a5.root ? (e.right = a5.root.right, e.left = a5.root, a5.root.right.left = e, a5.root.right = e) : a5.root = e;
  }
  It.prototype.push = function(a5) {
    var e = lT(a5);
    return e.left = e, e.right = e, Kl(this, e), (!this.min || this.comparator(e.item, this.min.item) <= 0) && (this.min = e), ++this.size;
  };
  It.prototype.peek = function() {
    return this.min ? this.min.item : void 0;
  };
  function Jl(a5) {
    for (var e = [], r = a5, o = false; !(r === a5 && o); ) r === a5 && (o = true), e.push(r), r = r.right;
    return e;
  }
  function Zl(a5, e) {
    a5.root === e && (a5.root = e.right), e.left.right = e.right, e.right.left = e.left;
  }
  function hT(a5, e) {
    a5.child ? (e.right = a5.child.right, e.left = a5.child, a5.child.right.left = e, a5.child.right = e) : a5.child = e;
  }
  function fT(a5, e, r) {
    Zl(a5, e), e.left = e, e.right = e, hT(r, e), r.degree++, e.parent = r;
  }
  function pT(a5) {
    var e = new Array(a5.size), r = Jl(a5.root), o, s, u, h, p, d;
    for (o = 0, s = r.length; o < s; o++) {
      for (u = r[o], p = u.degree; e[p]; ) h = e[p], a5.comparator(u.item, h.item) > 0 && (d = u, u = h, h = d), fT(a5, h, u), e[p] = null, p++;
      e[p] = u;
    }
    for (o = 0; o < a5.size; o++) e[o] && a5.comparator(e[o].item, a5.min.item) <= 0 && (a5.min = e[o]);
  }
  It.prototype.pop = function() {
    if (this.size) {
      var a5 = this.min;
      if (a5.child) {
        var e = Jl(a5.child), r, o, s;
        for (o = 0, s = e.length; o < s; o++) r = e[o], Kl(this, r), delete r.parent;
      }
      return Zl(this, a5), a5 === a5.right ? (this.min = null, this.root = null) : (this.min = a5.right, pT(this)), this.size--, a5.item;
    }
  };
  It.prototype.inspect = function() {
    var a5 = { size: this.size };
    return this.min && "item" in this.min && (a5.top = this.min.item), Object.defineProperty(a5, "constructor", { value: It, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (It.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = It.prototype.inspect);
  function dn(a5) {
    if (this.clear(), this.comparator = a5 || Ql, typeof this.comparator != "function") throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
    this.comparator = cT(this.comparator);
  }
  dn.prototype = It.prototype;
  It.from = function(a5, e) {
    var r = new It(e);
    return Yl(a5, function(o) {
      r.push(o);
    }), r;
  };
  dn.from = function(a5, e) {
    var r = new dn(e);
    return Yl(a5, function(o) {
      r.push(o);
    }), r;
  };
  It.MinFibonacciHeap = It;
  It.MaxFibonacciHeap = dn;
  th.exports = It;
});
var va = ve2((we) => {
  var mT = Math.pow(2, 8) - 1, dT = Math.pow(2, 16) - 1, gT = Math.pow(2, 32) - 1, yT = Math.pow(2, 7) - 1, vT = Math.pow(2, 15) - 1, bT = Math.pow(2, 31) - 1;
  we.getPointerArray = function(a5) {
    var e = a5 - 1;
    if (e <= mT) return Uint8Array;
    if (e <= dT) return Uint16Array;
    if (e <= gT) return Uint32Array;
    throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
  };
  we.getSignedPointerArray = function(a5) {
    var e = a5 - 1;
    return e <= yT ? Int8Array : e <= vT ? Int16Array : e <= bT ? Int32Array : Float64Array;
  };
  we.getNumberType = function(a5) {
    return a5 === (a5 | 0) ? Math.sign(a5) === -1 ? a5 <= 127 && a5 >= -128 ? Int8Array : a5 <= 32767 && a5 >= -32768 ? Int16Array : Int32Array : a5 <= 255 ? Uint8Array : a5 <= 65535 ? Uint16Array : Uint32Array : Float64Array;
  };
  var TT = { Uint8Array: 1, Int8Array: 2, Uint16Array: 3, Int16Array: 4, Uint32Array: 5, Int32Array: 6, Float32Array: 7, Float64Array: 8 };
  we.getMinimalRepresentation = function(a5, e) {
    var r = null, o = 0, s, u, h, p, d;
    for (p = 0, d = a5.length; p < d; p++) h = e ? e(a5[p]) : a5[p], u = we.getNumberType(h), s = TT[u.name], s > o && (o = s, r = u);
    return r;
  };
  we.isTypedArray = function(a5) {
    return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView(a5);
  };
  we.concat = function() {
    var a5 = 0, e, r, o;
    for (e = 0, o = arguments.length; e < o; e++) a5 += arguments[e].length;
    var s = new arguments[0].constructor(a5);
    for (e = 0, r = 0; e < o; e++) s.set(arguments[e], r), r += arguments[e].length;
    return s;
  };
  we.indices = function(a5) {
    for (var e = we.getPointerArray(a5), r = new e(a5), o = 0; o < a5; o++) r[o] = o;
    return r;
  };
});
var Ta = ve2((Di) => {
  var rh = Ei2(), ih = va();
  function PT(a5) {
    return Array.isArray(a5) || ih.isTypedArray(a5);
  }
  function ba2(a5) {
    if (typeof a5.length == "number") return a5.length;
    if (typeof a5.size == "number") return a5.size;
  }
  function xT(a5) {
    var e = ba2(a5), r = typeof e == "number" ? new Array(e) : [], o = 0;
    return rh(a5, function(s) {
      r[o++] = s;
    }), r;
  }
  function wT(a5) {
    var e = ba2(a5), r = typeof e == "number" ? ih.getPointerArray(e) : Array, o = typeof e == "number" ? new Array(e) : [], s = typeof e == "number" ? new r(e) : [], u = 0;
    return rh(a5, function(h) {
      o[u] = h, s[u] = u++;
    }), [o, s];
  }
  Di.isArrayLike = PT;
  Di.guessLength = ba2;
  Di.toArray = xT;
  Di.toArrayWithIndices = wT;
});
var uh2 = ve2((WC, ah) => {
  var gn = Ei2(), oh = ga(), Ce = Ta(), vn2 = oh.DEFAULT_COMPARATOR, Pa = oh.reverseComparator;
  function xa(a5, e, r, o) {
    for (var s = e[o], u, h; o > r; ) {
      if (u = o - 1 >> 1, h = e[u], a5(s, h) < 0) {
        e[o] = h, o = u;
        continue;
      }
      break;
    }
    e[o] = s;
  }
  function Ii(a5, e, r) {
    for (var o = e.length, s = r, u = e[r], h = 2 * r + 1, p; h < o; ) p = h + 1, p < o && a5(e[h], e[p]) >= 0 && (h = p), e[r] = e[h], r = h, h = 2 * r + 1;
    e[r] = u, xa(a5, e, s, r);
  }
  function nh(a5, e, r) {
    e.push(r), xa(a5, e, 0, e.length - 1);
  }
  function wa(a5, e) {
    var r = e.pop();
    if (e.length !== 0) {
      var o = e[0];
      return e[0] = r, Ii(a5, e, 0), o;
    }
    return r;
  }
  function Wr(a5, e, r) {
    if (e.length === 0) throw new Error("mnemonist/heap.replace: cannot pop an empty heap.");
    var o = e[0];
    return e[0] = r, Ii(a5, e, 0), o;
  }
  function sh(a5, e, r) {
    var o;
    return e.length !== 0 && a5(e[0], r) < 0 && (o = e[0], e[0] = r, r = o, Ii(a5, e, 0)), r;
  }
  function br2(a5, e) {
    for (var r = e.length, o = r >> 1, s = o; --s >= 0; ) Ii(a5, e, s);
  }
  function Ca(a5, e) {
    for (var r = e.length, o = 0, s = new Array(r); o < r; ) s[o++] = wa(a5, e);
    return s;
  }
  function CT(a5, e, r) {
    arguments.length === 2 && (r = e, e = a5, a5 = vn2);
    var o = Pa(a5), s, u, h, p = 1 / 0, d;
    if (e === 1) {
      if (Ce.isArrayLike(r)) {
        for (s = 0, u = r.length; s < u; s++) h = r[s], (p === 1 / 0 || a5(h, p) < 0) && (p = h);
        return d = new r.constructor(1), d[0] = p, d;
      }
      return gn(r, function(L) {
        (p === 1 / 0 || a5(L, p) < 0) && (p = L);
      }), [p];
    }
    if (Ce.isArrayLike(r)) {
      if (e >= r.length) return r.slice().sort(a5);
      for (d = r.slice(0, e), br2(o, d), s = e, u = r.length; s < u; s++) o(r[s], d[0]) > 0 && Wr(o, d, r[s]);
      return d.sort(a5);
    }
    var P2 = Ce.guessLength(r);
    return P2 !== null && P2 < e && (e = P2), d = new Array(e), s = 0, gn(r, function(L) {
      s < e ? d[s] = L : (s === e && br2(o, d), o(L, d[0]) > 0 && Wr(o, d, L)), s++;
    }), d.length > s && (d.length = s), d.sort(a5);
  }
  function _T(a5, e, r) {
    arguments.length === 2 && (r = e, e = a5, a5 = vn2);
    var o = Pa(a5), s, u, h, p = -1 / 0, d;
    if (e === 1) {
      if (Ce.isArrayLike(r)) {
        for (s = 0, u = r.length; s < u; s++) h = r[s], (p === -1 / 0 || a5(h, p) > 0) && (p = h);
        return d = new r.constructor(1), d[0] = p, d;
      }
      return gn(r, function(L) {
        (p === -1 / 0 || a5(L, p) > 0) && (p = L);
      }), [p];
    }
    if (Ce.isArrayLike(r)) {
      if (e >= r.length) return r.slice().sort(o);
      for (d = r.slice(0, e), br2(a5, d), s = e, u = r.length; s < u; s++) a5(r[s], d[0]) > 0 && Wr(a5, d, r[s]);
      return d.sort(o);
    }
    var P2 = Ce.guessLength(r);
    return P2 !== null && P2 < e && (e = P2), d = new Array(e), s = 0, gn(r, function(L) {
      s < e ? d[s] = L : (s === e && br2(a5, d), a5(L, d[0]) > 0 && Wr(a5, d, L)), s++;
    }), d.length > s && (d.length = s), d.sort(o);
  }
  function rt(a5) {
    if (this.clear(), this.comparator = a5 || vn2, typeof this.comparator != "function") throw new Error("mnemonist/Heap.constructor: given comparator should be a function.");
  }
  rt.prototype.clear = function() {
    this.items = [], this.size = 0;
  };
  rt.prototype.push = function(a5) {
    return nh(this.comparator, this.items, a5), ++this.size;
  };
  rt.prototype.peek = function() {
    return this.items[0];
  };
  rt.prototype.pop = function() {
    return this.size !== 0 && this.size--, wa(this.comparator, this.items);
  };
  rt.prototype.replace = function(a5) {
    return Wr(this.comparator, this.items, a5);
  };
  rt.prototype.pushpop = function(a5) {
    return sh(this.comparator, this.items, a5);
  };
  rt.prototype.consume = function() {
    return this.size = 0, Ca(this.comparator, this.items);
  };
  rt.prototype.toArray = function() {
    return Ca(this.comparator, this.items.slice());
  };
  rt.prototype.inspect = function() {
    var a5 = this.toArray();
    return Object.defineProperty(a5, "constructor", { value: rt, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (rt.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = rt.prototype.inspect);
  function yn(a5) {
    if (this.clear(), this.comparator = a5 || vn2, typeof this.comparator != "function") throw new Error("mnemonist/MaxHeap.constructor: given comparator should be a function.");
    this.comparator = Pa(this.comparator);
  }
  yn.prototype = rt.prototype;
  rt.from = function(a5, e) {
    var r = new rt(e), o;
    return Ce.isArrayLike(a5) ? o = a5.slice() : o = Ce.toArray(a5), br2(r.comparator, o), r.items = o, r.size = o.length, r;
  };
  yn.from = function(a5, e) {
    var r = new yn(e), o;
    return Ce.isArrayLike(a5) ? o = a5.slice() : o = Ce.toArray(a5), br2(r.comparator, o), r.items = o, r.size = o.length, r;
  };
  rt.siftUp = Ii;
  rt.siftDown = xa;
  rt.push = nh;
  rt.pop = wa;
  rt.replace = Wr;
  rt.pushpop = sh;
  rt.heapify = br2;
  rt.consume = Ca;
  rt.nsmallest = CT;
  rt.nlargest = _T;
  rt.MinHeap = rt;
  rt.MaxHeap = yn;
  ah.exports = rt;
});
var ph2 = ve2((zC, fh) => {
  var ch = "";
  function lh(a5, e, r) {
    for (var o = e.length, s = [], u = o, h = -1, p, d = 0, P2; u--; ) h = Math.max(a5[e[u] + r], h);
    for (P2 = h >> 24 && 32 || h >> 16 && 24 || h >> 8 && 16 || 8; d < P2; d += 4) {
      for (u = 16; u--; ) s[u] = [];
      for (u = o; u--; ) s[a5[e[u] + r] >> d & 15].push(e[u]);
      for (p = 0; p < 16; p++) for (h = s[p].length; h--; ) e[++u] = s[p][h];
    }
  }
  function LT(a5, e, r, o) {
    return a5[r] - a5[o] || (r % 3 === 2 ? a5[r + 1] - a5[o + 1] || e[r + 2] - e[o + 2] : e[r + 1] - e[o + 1]);
  }
  function _a2(a5, e) {
    var r = [], o = [], s = 2 * e / 3 | 0, u = e - s, h = s + 1 >> 1, p = s, d = 0, P2, L = [], E = [];
    if (e === 1) return [0];
    for (; p--; ) r[p] = (p * 3 >> 1) + 1;
    for (p = 3; p--; ) lh(a5, r, p);
    for (d = o[(r[0] / 3 | 0) + (r[0] % 3 === 1 ? 0 : h)] = 1, p = 1; p < s; p++) (a5[r[p]] !== a5[r[p - 1]] || a5[r[p] + 1] !== a5[r[p - 1] + 1] || a5[r[p] + 2] !== a5[r[p - 1] + 2]) && d++, o[(r[p] / 3 | 0) + (r[p] % 3 === 1 ? 0 : h)] = d;
    if (d < s) for (o = _a2(o, s), p = s; p--; ) r[p] = o[p] < h ? o[p] * 3 + 1 : (o[p] - h) * 3 + 2;
    for (p = s; p--; ) L[r[p]] = p;
    for (L[e] = -1, L[e + 1] = -2, o = e % 3 === 1 ? [e - 1] : [], p = 0; p < s; p++) r[p] % 3 === 1 && o.push(r[p] - 1);
    for (lh(a5, o, 0), p = 0, d = 0, P2 = 0; p < s && d < u; ) E[P2++] = LT(a5, L, r[p], o[d]) < 0 ? r[p++] : o[d++];
    for (; p < s; ) E[P2++] = r[p++];
    for (; d < u; ) E[P2++] = o[d++];
    return E;
  }
  function hh(a5) {
    var e = a5.length, r = e % 3, o = new Array(e + r), s, u;
    if (typeof a5 != "string") {
      var h = /* @__PURE__ */ Object.create(null);
      for (u = 0; u < e; u++) h[a5[u]] || (h[a5[u]] = true);
      var p = /* @__PURE__ */ Object.create(null), d = Object.keys(h).sort();
      for (u = 0, s = d.length; u < s; u++) p[d[u]] = u + 1;
      for (u = 0; u < e; u++) o[u] = p[a5[u]];
    } else for (u = 0; u < e; u++) o[u] = a5.charCodeAt(u);
    for (u = e; u < e + r; u++) o[u] = 0;
    return o;
  }
  function tr(a5) {
    this.hasArbitrarySequence = typeof a5 != "string", this.string = a5, this.length = a5.length, this.array = _a2(hh(a5), this.length);
  }
  tr.prototype.toString = function() {
    return this.array.join(",");
  };
  tr.prototype.toJSON = function() {
    return this.array;
  };
  tr.prototype.inspect = function() {
    for (var a5 = new Array(this.length), e = 0; e < this.length; e++) a5[e] = this.string.slice(this.array[e]);
    return Object.defineProperty(a5, "constructor", { value: tr, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (tr.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = tr.prototype.inspect);
  function er2(a5) {
    if (this.hasArbitrarySequence = typeof a5[0] != "string", this.size = a5.length, this.hasArbitrarySequence) {
      this.text = [];
      for (var e = 0, r = this.size; e < r; e++) this.text.push.apply(this.text, a5[e]), e < r - 1 && this.text.push(ch);
    } else this.text = a5.join(ch);
    this.firstLength = a5[0].length, this.length = this.text.length, this.array = _a2(hh(this.text), this.length);
  }
  er2.prototype.longestCommonSubsequence = function() {
    var a5 = this.hasArbitrarySequence ? [] : "", e, r, o, s, u;
    for (r = 1; r < this.length; r++) if (s = this.array[r], u = this.array[r - 1], !(s < this.firstLength && u < this.firstLength) && !(s > this.firstLength && u > this.firstLength)) {
      for (e = Math.min(this.length - s, this.length - u), o = 0; o < e; o++) if (this.text[s + o] !== this.text[u + o]) {
        e = o;
        break;
      }
      e > a5.length && (a5 = this.text.slice(s, s + e));
    }
    return a5;
  };
  er2.prototype.toString = function() {
    return this.array.join(",");
  };
  er2.prototype.toJSON = function() {
    return this.array;
  };
  er2.prototype.inspect = function() {
    for (var a5 = new Array(this.length), e = 0; e < this.length; e++) a5[e] = this.text.slice(this.array[e]);
    return Object.defineProperty(a5, "constructor", { value: er2, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (er2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = er2.prototype.inspect);
  tr.GeneralizedSuffixArray = er2;
  fh.exports = tr;
});
var dh2 = ve2(($C, mh) => {
  function _e(a5) {
    if (typeof a5 != "function") throw new Error("obliterator/iterator: expecting a function!");
    this.next = a5;
  }
  typeof Symbol != "undefined" && (_e.prototype[Symbol.iterator] = function() {
    return this;
  });
  _e.of = function() {
    var a5 = arguments, e = a5.length, r = 0;
    return new _e(function() {
      return r >= e ? { done: true } : { done: false, value: a5[r++] };
    });
  };
  _e.empty = function() {
    var a5 = new _e(function() {
      return { done: true };
    });
    return a5;
  };
  _e.fromSequence = function(a5) {
    var e = 0, r = a5.length;
    return new _e(function() {
      return e >= r ? { done: true } : { done: false, value: a5[e++] };
    });
  };
  _e.is = function(a5) {
    return a5 instanceof _e ? true : typeof a5 == "object" && a5 !== null && typeof a5.next == "function";
  };
  mh.exports = _e;
});
var bh2 = ve2((qC, vh) => {
  var gh = dh2(), ST = Ei2(), OT = Ta(), yh = va(), ET = function(a5) {
    return Math.max(1, Math.ceil(a5 * 1.5));
  }, DT = function(a5) {
    var e = yh.getPointerArray(a5);
    return new e(a5);
  };
  function Y2(a5, e) {
    if (arguments.length < 1) throw new Error("mnemonist/vector: expecting at least a byte array constructor.");
    var r = e || 0, o = ET, s = 0, u = false;
    typeof e == "object" && (r = e.initialCapacity || 0, s = e.initialLength || 0, o = e.policy || o, u = e.factory === true), this.factory = u ? a5 : null, this.ArrayClass = a5, this.length = s, this.capacity = Math.max(s, r), this.policy = o, this.array = new a5(this.capacity);
  }
  Y2.prototype.set = function(a5, e) {
    if (this.length < a5) throw new Error("Vector(" + this.ArrayClass.name + ").set: index out of bounds.");
    return this.array[a5] = e, this;
  };
  Y2.prototype.get = function(a5) {
    if (!(this.length < a5)) return this.array[a5];
  };
  Y2.prototype.applyPolicy = function(a5) {
    var e = this.policy(a5 || this.capacity);
    if (typeof e != "number" || e < 0) throw new Error("mnemonist/vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
    if (e <= this.capacity) throw new Error("mnemonist/vector.applyPolicy: policy returned a less or equal capacity to allocate.");
    return e;
  };
  Y2.prototype.reallocate = function(a5) {
    if (a5 === this.capacity) return this;
    var e = this.array;
    if (a5 < this.length && (this.length = a5), a5 > this.capacity) if (this.factory === null ? this.array = new this.ArrayClass(a5) : this.array = this.factory(a5), yh.isTypedArray(this.array)) this.array.set(e, 0);
    else for (var r = 0, o = this.length; r < o; r++) this.array[r] = e[r];
    else this.array = e.slice(0, a5);
    return this.capacity = a5, this;
  };
  Y2.prototype.grow = function(a5) {
    var e;
    if (typeof a5 == "number") {
      if (this.capacity >= a5) return this;
      for (e = this.capacity; e < a5; ) e = this.applyPolicy(e);
      return this.reallocate(e), this;
    }
    return e = this.applyPolicy(), this.reallocate(e), this;
  };
  Y2.prototype.resize = function(a5) {
    return a5 === this.length ? this : a5 < this.length ? (this.length = a5, this) : (this.length = a5, this.reallocate(a5), this);
  };
  Y2.prototype.push = function(a5) {
    return this.capacity === this.length && this.grow(), this.array[this.length++] = a5, this.length;
  };
  Y2.prototype.pop = function() {
    if (this.length !== 0) return this.array[--this.length];
  };
  Y2.prototype.values = function() {
    var a5 = this.array, e = this.length, r = 0;
    return new gh(function() {
      if (r >= e) return { done: true };
      var o = a5[r];
      return r++, { value: o, done: false };
    });
  };
  Y2.prototype.entries = function() {
    var a5 = this.array, e = this.length, r = 0;
    return new gh(function() {
      if (r >= e) return { done: true };
      var o = a5[r];
      return { value: [r++, o], done: false };
    });
  };
  typeof Symbol != "undefined" && (Y2.prototype[Symbol.iterator] = Y2.prototype.values);
  Y2.prototype.inspect = function() {
    var a5 = this.array.slice(0, this.length);
    return a5.type = this.array.constructor.name, a5.items = this.length, a5.capacity = this.capacity, Object.defineProperty(a5, "constructor", { value: Y2, enumerable: false }), a5;
  };
  typeof Symbol != "undefined" && (Y2.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Y2.prototype.inspect);
  Y2.from = function(a5, e, r) {
    if (arguments.length < 3 && (r = OT.guessLength(a5), typeof r != "number")) throw new Error("mnemonist/vector.from: could not guess iterable length. Please provide desired capacity as last argument.");
    var o = new Y2(e, r);
    return ST(a5, function(s) {
      o.push(s);
    }), o;
  };
  function Le(a5) {
    var e = function(o) {
      Y2.call(this, a5, o);
    };
    for (var r in Y2.prototype) Y2.prototype.hasOwnProperty(r) && (e.prototype[r] = Y2.prototype[r]);
    return e.from = function(o, s) {
      return Y2.from(o, a5, s);
    }, typeof Symbol != "undefined" && (e.prototype[Symbol.iterator] = e.prototype.values), e;
  }
  Y2.Int8Vector = Le(Int8Array);
  Y2.Uint8Vector = Le(Uint8Array);
  Y2.Uint8ClampedVector = Le(Uint8ClampedArray);
  Y2.Int16Vector = Le(Int16Array);
  Y2.Uint16Vector = Le(Uint16Array);
  Y2.Int32Vector = Le(Int32Array);
  Y2.Uint32Vector = Le(Uint32Array);
  Y2.Float32Vector = Le(Float32Array);
  Y2.Float64Vector = Le(Float64Array);
  Y2.PointerVector = Le(DT);
  vh.exports = Y2;
});
var T = class a3 {
  static get ZERO() {
    return new a3(0, 0);
  }
  static get ONE() {
    return new a3(1, 1);
  }
  static get UP() {
    return new a3(0, -1);
  }
  static get DOWN() {
    return new a3(0, 1);
  }
  static get LEFT() {
    return new a3(-1, 0);
  }
  static get RIGHT() {
    return new a3(1, 0);
  }
  static get UP_LEFT() {
    return new a3(-1, -1);
  }
  static get UP_RIGHT() {
    return new a3(1, -1);
  }
  static get DOWN_RIGHT() {
    return new a3(1, 1);
  }
  static get DOWN_LEFT() {
    return new a3(-1, 1);
  }
  constructor(e, r) {
    typeof e == "number" ? (this.x = e, this.y = r || 0) : (this.x = e.x, this.y = e.y);
  }
  clone() {
    return new a3(this.x, this.y);
  }
  add(e) {
    return new a3(this.x + e.x, this.y + e.y);
  }
  multiply(e) {
    return new a3(this.x * e.x, this.y * e.y);
  }
  divide(e) {
    return new a3(this.x / e.x, this.y / e.y);
  }
  subtract(e) {
    return new a3(this.x - e.x, this.y - e.y);
  }
  equals(e) {
    return this.x === e.x && this.y === e.y;
  }
  abs() {
    return new a3(Math.abs(this.x), Math.abs(this.y));
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  modulo(e) {
    return new a3(this.x % e.x, this.y % e.y);
  }
  scalarModulo(e) {
    return new a3(this.x % e, this.y % e);
  }
  scalarMult(e) {
    return new a3(this.x * e, this.y * e);
  }
  toPosition() {
    return { x: this.x, y: this.y };
  }
  toString() {
    return `${this.x}#${this.y}`;
  }
};
var W2 = class {
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
var kt2 = ((P2) => (P2.NONE = "none", P2.LEFT = "left", P2.UP_LEFT = "up-left", P2.UP = "up", P2.UP_RIGHT = "up-right", P2.RIGHT = "right", P2.DOWN_RIGHT = "down-right", P2.DOWN = "down", P2.DOWN_LEFT = "down-left", P2))(kt2 || {});
var Nb2 = { up: "down", down: "up", left: "right", right: "left", none: "none", "up-left": "down-right", "up-right": "down-left", "down-right": "up-left", "down-left": "up-right" };
var Gb2 = { up: T.UP, down: T.DOWN, left: T.LEFT, right: T.RIGHT, none: T.ZERO, "up-left": T.UP_LEFT, "up-right": T.UP_RIGHT, "down-right": T.DOWN_RIGHT, "down-left": T.DOWN_LEFT };
var bi2 = { up: 0, "up-right": 1, right: 2, "down-right": 3, down: 4, "down-left": 5, left: 6, "up-left": 7, none: NaN };
var Pl2 = ["up", "up-right", "right", "down-right", "down", "down-left", "left", "up-left"];
var jb2 = ["down-left", "down-right", "up-right", "up-left"];
function Ti2() {
  return ["up", "down", "left", "right", "none", "up-left", "up-right", "down-right", "down-left"];
}
function pr2(a5) {
  return jb2.includes(a5);
}
function xl2(a5, e = 1) {
  return a5 === "none" ? "none" : Pl2[(bi2[a5] + 8 - Math.abs(e) % 8) % 8];
}
function Vo2(a5, e = 1) {
  return a5 === "none" ? "none" : Pl2[(bi2[a5] + e) % 8];
}
function Wt2(a5) {
  return Gb2[a5];
}
function Pi2(a5) {
  return Nb2[a5];
}
function Pt2(a5, e) {
  if (a5.x === e.x) {
    if (a5.y > e.y) return "up";
    if (a5.y < e.y) return "down";
  } else if (a5.y === e.y) {
    if (a5.x > e.x) return "left";
    if (a5.x < e.x) return "right";
  } else if (a5.x > e.x) {
    if (a5.y < e.y) return "down-left";
    if (a5.y > e.y) return "up-left";
  } else if (a5.x < e.x) {
    if (a5.y < e.y) return "down-right";
    if (a5.y > e.y) return "up-right";
  }
  return "none";
}
var Nr2 = ((r) => (r[r.FOUR = 4] = "FOUR", r[r.EIGHT = 8] = "EIGHT", r))(Nr2 || {});
function Je2(a5) {
  return typeof a5 == "string" && Ti2().includes(a5);
}
var sa2 = function(a5, e) {
  return sa2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, o) {
    r.__proto__ = o;
  } || function(r, o) {
    for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (r[s] = o[s]);
  }, sa2(a5, e);
};
function Ze(a5, e) {
  if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  sa2(a5, e);
  function r() {
    this.constructor = a5;
  }
  a5.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function wl2(a5, e, r, o) {
  function s(u) {
    return u instanceof r ? u : new r(function(h) {
      h(u);
    });
  }
  return new (r || (r = Promise))(function(u, h) {
    function p(L) {
      try {
        P2(o.next(L));
      } catch (E) {
        h(E);
      }
    }
    function d(L) {
      try {
        P2(o.throw(L));
      } catch (E) {
        h(E);
      }
    }
    function P2(L) {
      L.done ? u(L.value) : s(L.value).then(p, d);
    }
    P2((o = o.apply(a5, e || [])).next());
  });
}
function No2(a5, e) {
  var r = { label: 0, sent: function() {
    if (u[0] & 1) throw u[1];
    return u[1];
  }, trys: [], ops: [] }, o, s, u, h = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return h.next = p(0), h.throw = p(1), h.return = p(2), typeof Symbol == "function" && (h[Symbol.iterator] = function() {
    return this;
  }), h;
  function p(P2) {
    return function(L) {
      return d([P2, L]);
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
      P2 = e.call(a5, r);
    } catch (L) {
      P2 = [6, L], s = 0;
    } finally {
      o = u = 0;
    }
    if (P2[0] & 5) throw P2[1];
    return { value: P2[0] ? P2[1] : void 0, done: true };
  }
}
function Ne2(a5) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && a5[e], o = 0;
  if (r) return r.call(a5);
  if (a5 && typeof a5.length == "number") return { next: function() {
    return a5 && o >= a5.length && (a5 = void 0), { value: a5 && a5[o++], done: !a5 };
  } };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function be2(a5, e) {
  var r = typeof Symbol == "function" && a5[Symbol.iterator];
  if (!r) return a5;
  var o = r.call(a5), s, u = [], h;
  try {
    for (; (e === void 0 || e-- > 0) && !(s = o.next()).done; ) u.push(s.value);
  } catch (p) {
    h = { error: p };
  } finally {
    try {
      s && !s.done && (r = o.return) && r.call(o);
    } finally {
      if (h) throw h.error;
    }
  }
  return u;
}
function Te2(a5, e, r) {
  if (r || arguments.length === 2) for (var o = 0, s = e.length, u; o < s; o++) (u || !(o in e)) && (u || (u = Array.prototype.slice.call(e, 0, o)), u[o] = e[o]);
  return a5.concat(u || Array.prototype.slice.call(e));
}
function mr2(a5) {
  return this instanceof mr2 ? (this.v = a5, this) : new mr2(a5);
}
function Cl2(a5, e, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var o = r.apply(a5, e || []), s, u = [];
  return s = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), p("next"), p("throw"), p("return", h), s[Symbol.asyncIterator] = function() {
    return this;
  }, s;
  function h(I) {
    return function(G) {
      return Promise.resolve(G).then(I, E);
    };
  }
  function p(I, G) {
    o[I] && (s[I] = function(k) {
      return new Promise(function(K2, nt) {
        u.push([I, k, K2, nt]) > 1 || d(I, k);
      });
    }, G && (s[I] = G(s[I])));
  }
  function d(I, G) {
    try {
      P2(o[I](G));
    } catch (k) {
      B(u[0][3], k);
    }
  }
  function P2(I) {
    I.value instanceof mr2 ? Promise.resolve(I.value.v).then(L, E) : B(u[0][2], I);
  }
  function L(I) {
    d("next", I);
  }
  function E(I) {
    d("throw", I);
  }
  function B(I, G) {
    I(G), u.shift(), u.length && d(u[0][0], u[0][1]);
  }
}
function _l2(a5) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = a5[Symbol.asyncIterator], r;
  return e ? e.call(a5) : (a5 = typeof Ne2 == "function" ? Ne2(a5) : a5[Symbol.iterator](), r = {}, o("next"), o("throw"), o("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function o(u) {
    r[u] = a5[u] && function(h) {
      return new Promise(function(p, d) {
        h = a5[u](h), s(p, d, h.done, h.value);
      });
    };
  }
  function s(u, h, p, d) {
    Promise.resolve(d).then(function(P2) {
      u({ value: P2, done: p });
    }, h);
  }
}
function Q(a5) {
  return typeof a5 == "function";
}
function Go2(a5) {
  var e = function(o) {
    Error.call(o), o.stack = new Error().stack;
  }, r = a5(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var jo2 = Go2(function(a5) {
  return function(r) {
    a5(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(o, s) {
      return s + 1 + ") " + o.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function xi2(a5, e) {
  if (a5) {
    var r = a5.indexOf(e);
    0 <= r && a5.splice(r, 1);
  }
}
var Gr2 = (function() {
  function a5(e) {
    this.initialTeardown = e, this.closed = false, this._parentage = null, this._finalizers = null;
  }
  return a5.prototype.unsubscribe = function() {
    var e, r, o, s, u;
    if (!this.closed) {
      this.closed = true;
      var h = this._parentage;
      if (h) if (this._parentage = null, Array.isArray(h)) try {
        for (var p = Ne2(h), d = p.next(); !d.done; d = p.next()) {
          var P2 = d.value;
          P2.remove(this);
        }
      } catch (k) {
        e = { error: k };
      } finally {
        try {
          d && !d.done && (r = p.return) && r.call(p);
        } finally {
          if (e) throw e.error;
        }
      }
      else h.remove(this);
      var L = this.initialTeardown;
      if (Q(L)) try {
        L();
      } catch (k) {
        u = k instanceof jo2 ? k.errors : [k];
      }
      var E = this._finalizers;
      if (E) {
        this._finalizers = null;
        try {
          for (var B = Ne2(E), I = B.next(); !I.done; I = B.next()) {
            var G = I.value;
            try {
              Ll2(G);
            } catch (k) {
              u = u != null ? u : [], k instanceof jo2 ? u = Te2(Te2([], be2(u)), be2(k.errors)) : u.push(k);
            }
          }
        } catch (k) {
          o = { error: k };
        } finally {
          try {
            I && !I.done && (s = B.return) && s.call(B);
          } finally {
            if (o) throw o.error;
          }
        }
      }
      if (u) throw new jo2(u);
    }
  }, a5.prototype.add = function(e) {
    var r;
    if (e && e !== this) if (this.closed) Ll2(e);
    else {
      if (e instanceof a5) {
        if (e.closed || e._hasParent(this)) return;
        e._addParent(this);
      }
      (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(e);
    }
  }, a5.prototype._hasParent = function(e) {
    var r = this._parentage;
    return r === e || Array.isArray(r) && r.includes(e);
  }, a5.prototype._addParent = function(e) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
  }, a5.prototype._removeParent = function(e) {
    var r = this._parentage;
    r === e ? this._parentage = null : Array.isArray(r) && xi2(r, e);
  }, a5.prototype.remove = function(e) {
    var r = this._finalizers;
    r && xi2(r, e), e instanceof a5 && e._removeParent(this);
  }, a5.EMPTY = (function() {
    var e = new a5();
    return e.closed = true, e;
  })(), a5;
})();
var aa2 = Gr2.EMPTY;
function Uo2(a5) {
  return a5 instanceof Gr2 || a5 && "closed" in a5 && Q(a5.remove) && Q(a5.add) && Q(a5.unsubscribe);
}
function Ll2(a5) {
  Q(a5) ? a5() : a5.unsubscribe();
}
var ce2 = { onUnhandledError: null, onStoppedNotification: null, Promise: void 0, useDeprecatedSynchronousErrorHandling: false, useDeprecatedNextContext: false };
var jr2 = { setTimeout: function(a5, e) {
  for (var r = [], o = 2; o < arguments.length; o++) r[o - 2] = arguments[o];
  var s = jr2.delegate;
  return s != null && s.setTimeout ? s.setTimeout.apply(s, Te2([a5, e], be2(r))) : setTimeout.apply(void 0, Te2([a5, e], be2(r)));
}, clearTimeout: function(a5) {
  var e = jr2.delegate;
  return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(a5);
}, delegate: void 0 };
function Ho2(a5) {
  jr2.setTimeout(function() {
    var e = ce2.onUnhandledError;
    if (e) e(a5);
    else throw a5;
  });
}
function wi2() {
}
var Sl2 = (function() {
  return ua2("C", void 0, void 0);
})();
function Ol2(a5) {
  return ua2("E", void 0, a5);
}
function El2(a5) {
  return ua2("N", a5, void 0);
}
function ua2(a5, e, r) {
  return { kind: a5, value: e, error: r };
}
var dr3 = null;
function Ur2(a5) {
  if (ce2.useDeprecatedSynchronousErrorHandling) {
    var e = !dr3;
    if (e && (dr3 = { errorThrown: false, error: null }), a5(), e) {
      var r = dr3, o = r.errorThrown, s = r.error;
      if (dr3 = null, o) throw s;
    }
  } else a5();
}
function Dl2(a5) {
  ce2.useDeprecatedSynchronousErrorHandling && dr3 && (dr3.errorThrown = true, dr3.error = a5);
}
var Ci2 = (function(a5) {
  Ze(e, a5);
  function e(r) {
    var o = a5.call(this) || this;
    return o.isStopped = false, r ? (o.destination = r, Uo2(r) && r.add(o)) : o.destination = Wb2, o;
  }
  return e.create = function(r, o, s) {
    return new Wo2(r, o, s);
  }, e.prototype.next = function(r) {
    this.isStopped ? la2(El2(r), this) : this._next(r);
  }, e.prototype.error = function(r) {
    this.isStopped ? la2(Ol2(r), this) : (this.isStopped = true, this._error(r));
  }, e.prototype.complete = function() {
    this.isStopped ? la2(Sl2, this) : (this.isStopped = true, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = true, a5.prototype.unsubscribe.call(this), this.destination = null);
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
})(Gr2);
var Ub2 = Function.prototype.bind;
function ca2(a5, e) {
  return Ub2.call(a5, e);
}
var Hb2 = (function() {
  function a5(e) {
    this.partialObserver = e;
  }
  return a5.prototype.next = function(e) {
    var r = this.partialObserver;
    if (r.next) try {
      r.next(e);
    } catch (o) {
      Bo2(o);
    }
  }, a5.prototype.error = function(e) {
    var r = this.partialObserver;
    if (r.error) try {
      r.error(e);
    } catch (o) {
      Bo2(o);
    }
    else Bo2(e);
  }, a5.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete) try {
      e.complete();
    } catch (r) {
      Bo2(r);
    }
  }, a5;
})();
var Wo2 = (function(a5) {
  Ze(e, a5);
  function e(r, o, s) {
    var u = a5.call(this) || this, h;
    if (Q(r) || !r) h = { next: r != null ? r : void 0, error: o != null ? o : void 0, complete: s != null ? s : void 0 };
    else {
      var p;
      u && ce2.useDeprecatedNextContext ? (p = Object.create(r), p.unsubscribe = function() {
        return u.unsubscribe();
      }, h = { next: r.next && ca2(r.next, p), error: r.error && ca2(r.error, p), complete: r.complete && ca2(r.complete, p) }) : h = r;
    }
    return u.destination = new Hb2(h), u;
  }
  return e;
})(Ci2);
function Bo2(a5) {
  ce2.useDeprecatedSynchronousErrorHandling ? Dl2(a5) : Ho2(a5);
}
function Bb2(a5) {
  throw a5;
}
function la2(a5, e) {
  var r = ce2.onStoppedNotification;
  r && jr2.setTimeout(function() {
    return r(a5, e);
  });
}
var Wb2 = { closed: true, next: wi2, error: Bb2, complete: wi2 };
var Hr2 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function zo2(a5) {
  return a5;
}
function ha2() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  return fa2(a5);
}
function fa2(a5) {
  return a5.length === 0 ? zo2 : a5.length === 1 ? a5[0] : function(r) {
    return a5.reduce(function(o, s) {
      return s(o);
    }, r);
  };
}
var vt2 = (function() {
  function a5(e) {
    e && (this._subscribe = e);
  }
  return a5.prototype.lift = function(e) {
    var r = new a5();
    return r.source = this, r.operator = e, r;
  }, a5.prototype.subscribe = function(e, r, o) {
    var s = this, u = $b2(e) ? e : new Wo2(e, r, o);
    return Ur2(function() {
      var h = s, p = h.operator, d = h.source;
      u.add(p ? p.call(u, d) : d ? s._subscribe(u) : s._trySubscribe(u));
    }), u;
  }, a5.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (r) {
      e.error(r);
    }
  }, a5.prototype.forEach = function(e, r) {
    var o = this;
    return r = Il2(r), new r(function(s, u) {
      var h = new Wo2({ next: function(p) {
        try {
          e(p);
        } catch (d) {
          u(d), h.unsubscribe();
        }
      }, error: u, complete: s });
      o.subscribe(h);
    });
  }, a5.prototype._subscribe = function(e) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(e);
  }, a5.prototype[Hr2] = function() {
    return this;
  }, a5.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
    return fa2(e)(this);
  }, a5.prototype.toPromise = function(e) {
    var r = this;
    return e = Il2(e), new e(function(o, s) {
      var u;
      r.subscribe(function(h) {
        return u = h;
      }, function(h) {
        return s(h);
      }, function() {
        return o(u);
      });
    });
  }, a5.create = function(e) {
    return new a5(e);
  }, a5;
})();
function Il2(a5) {
  var e;
  return (e = a5 != null ? a5 : ce2.Promise) !== null && e !== void 0 ? e : Promise;
}
function zb2(a5) {
  return a5 && Q(a5.next) && Q(a5.error) && Q(a5.complete);
}
function $b2(a5) {
  return a5 && a5 instanceof Ci2 || zb2(a5) && Uo2(a5);
}
function qb2(a5) {
  return Q(a5 == null ? void 0 : a5.lift);
}
function St(a5) {
  return function(e) {
    if (qb2(e)) return e.lift(function(r) {
      try {
        return a5(r, this);
      } catch (o) {
        this.error(o);
      }
    });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function zt2(a5, e, r, o, s) {
  return new Xb2(a5, e, r, o, s);
}
var Xb2 = (function(a5) {
  Ze(e, a5);
  function e(r, o, s, u, h, p) {
    var d = a5.call(this, r) || this;
    return d.onFinalize = h, d.shouldUnsubscribe = p, d._next = o ? function(P2) {
      try {
        o(P2);
      } catch (L) {
        r.error(L);
      }
    } : a5.prototype._next, d._error = u ? function(P2) {
      try {
        u(P2);
      } catch (L) {
        r.error(L);
      } finally {
        this.unsubscribe();
      }
    } : a5.prototype._error, d._complete = s ? function() {
      try {
        s();
      } catch (P2) {
        r.error(P2);
      } finally {
        this.unsubscribe();
      }
    } : a5.prototype._complete, d;
  }
  return e.prototype.unsubscribe = function() {
    var r;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var o = this.closed;
      a5.prototype.unsubscribe.call(this), !o && ((r = this.onFinalize) === null || r === void 0 || r.call(this));
    }
  }, e;
})(Ci2);
var Ml2 = Go2(function(a5) {
  return function() {
    a5(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
});
var Z2 = (function(a5) {
  Ze(e, a5);
  function e() {
    var r = a5.call(this) || this;
    return r.closed = false, r.currentObservers = null, r.observers = [], r.isStopped = false, r.hasError = false, r.thrownError = null, r;
  }
  return e.prototype.lift = function(r) {
    var o = new Al2(this, this);
    return o.operator = r, o;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed) throw new Ml2();
  }, e.prototype.next = function(r) {
    var o = this;
    Ur2(function() {
      var s, u;
      if (o._throwIfClosed(), !o.isStopped) {
        o.currentObservers || (o.currentObservers = Array.from(o.observers));
        try {
          for (var h = Ne2(o.currentObservers), p = h.next(); !p.done; p = h.next()) {
            var d = p.value;
            d.next(r);
          }
        } catch (P2) {
          s = { error: P2 };
        } finally {
          try {
            p && !p.done && (u = h.return) && u.call(h);
          } finally {
            if (s) throw s.error;
          }
        }
      }
    });
  }, e.prototype.error = function(r) {
    var o = this;
    Ur2(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.hasError = o.isStopped = true, o.thrownError = r;
        for (var s = o.observers; s.length; ) s.shift().error(r);
      }
    });
  }, e.prototype.complete = function() {
    var r = this;
    Ur2(function() {
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
    return this._throwIfClosed(), a5.prototype._trySubscribe.call(this, r);
  }, e.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, e.prototype._innerSubscribe = function(r) {
    var o = this, s = this, u = s.hasError, h = s.isStopped, p = s.observers;
    return u || h ? aa2 : (this.currentObservers = null, p.push(r), new Gr2(function() {
      o.currentObservers = null, xi2(p, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var o = this, s = o.hasError, u = o.thrownError, h = o.isStopped;
    s ? r.error(u) : h && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new vt2();
    return r.source = this, r;
  }, e.create = function(r, o) {
    return new Al2(r, o);
  }, e;
})(vt2);
var Al2 = (function(a5) {
  Ze(e, a5);
  function e(r, o) {
    var s = a5.call(this) || this;
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
    return (s = (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(r)) !== null && s !== void 0 ? s : aa2;
  }, e;
})(Z2);
var $o2 = new vt2(function(a5) {
  return a5.complete();
});
function Rl2(a5) {
  return a5 && Q(a5.schedule);
}
function Fl2(a5) {
  return a5[a5.length - 1];
}
function qo2(a5) {
  return Rl2(Fl2(a5)) ? a5.pop() : void 0;
}
function Xo2(a5, e) {
  return typeof Fl2(a5) == "number" ? a5.pop() : e;
}
var Yo2 = (function(a5) {
  return a5 && typeof a5.length == "number" && typeof a5 != "function";
});
function Qo2(a5) {
  return Q(a5 == null ? void 0 : a5.then);
}
function Ko2(a5) {
  return Q(a5[Hr2]);
}
function Jo2(a5) {
  return Symbol.asyncIterator && Q(a5 == null ? void 0 : a5[Symbol.asyncIterator]);
}
function Zo2(a5) {
  return new TypeError("You provided " + (a5 !== null && typeof a5 == "object" ? "an invalid object" : "'" + a5 + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Yb2() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var tn2 = Yb2();
function en2(a5) {
  return Q(a5 == null ? void 0 : a5[tn2]);
}
function rn2(a5) {
  return Cl2(this, arguments, function() {
    var r, o, s, u;
    return No2(this, function(h) {
      switch (h.label) {
        case 0:
          r = a5.getReader(), h.label = 1;
        case 1:
          h.trys.push([1, , 9, 10]), h.label = 2;
        case 2:
          return [4, mr2(r.read())];
        case 3:
          return o = h.sent(), s = o.value, u = o.done, u ? [4, mr2(void 0)] : [3, 5];
        case 4:
          return [2, h.sent()];
        case 5:
          return [4, mr2(s)];
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
function on2(a5) {
  return Q(a5 == null ? void 0 : a5.getReader);
}
function Vt(a5) {
  if (a5 instanceof vt2) return a5;
  if (a5 != null) {
    if (Ko2(a5)) return Qb2(a5);
    if (Yo2(a5)) return Kb2(a5);
    if (Qo2(a5)) return Jb2(a5);
    if (Jo2(a5)) return kl2(a5);
    if (en2(a5)) return Zb2(a5);
    if (on2(a5)) return tT2(a5);
  }
  throw Zo2(a5);
}
function Qb2(a5) {
  return new vt2(function(e) {
    var r = a5[Hr2]();
    if (Q(r.subscribe)) return r.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Kb2(a5) {
  return new vt2(function(e) {
    for (var r = 0; r < a5.length && !e.closed; r++) e.next(a5[r]);
    e.complete();
  });
}
function Jb2(a5) {
  return new vt2(function(e) {
    a5.then(function(r) {
      e.closed || (e.next(r), e.complete());
    }, function(r) {
      return e.error(r);
    }).then(null, Ho2);
  });
}
function Zb2(a5) {
  return new vt2(function(e) {
    var r, o;
    try {
      for (var s = Ne2(a5), u = s.next(); !u.done; u = s.next()) {
        var h = u.value;
        if (e.next(h), e.closed) return;
      }
    } catch (p) {
      r = { error: p };
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
function kl2(a5) {
  return new vt2(function(e) {
    eT2(a5, e).catch(function(r) {
      return e.error(r);
    });
  });
}
function tT2(a5) {
  return kl2(rn2(a5));
}
function eT2(a5, e) {
  var r, o, s, u;
  return wl2(this, void 0, void 0, function() {
    var h, p;
    return No2(this, function(d) {
      switch (d.label) {
        case 0:
          d.trys.push([0, 5, 6, 11]), r = _l2(a5), d.label = 1;
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
          return p = d.sent(), s = { error: p }, [3, 11];
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
function ee2(a5, e, r, o, s) {
  o === void 0 && (o = 0), s === void 0 && (s = false);
  var u = e.schedule(function() {
    r(), s ? a5.add(this.schedule(null, o)) : this.unsubscribe();
  }, o);
  if (a5.add(u), !s) return u;
}
function nn2(a5, e) {
  return e === void 0 && (e = 0), St(function(r, o) {
    r.subscribe(zt2(o, function(s) {
      return ee2(o, a5, function() {
        return o.next(s);
      }, e);
    }, function() {
      return ee2(o, a5, function() {
        return o.complete();
      }, e);
    }, function(s) {
      return ee2(o, a5, function() {
        return o.error(s);
      }, e);
    }));
  });
}
function sn2(a5, e) {
  return e === void 0 && (e = 0), St(function(r, o) {
    o.add(a5.schedule(function() {
      return r.subscribe(o);
    }, e));
  });
}
function Vl2(a5, e) {
  return Vt(a5).pipe(sn2(e), nn2(e));
}
function Nl2(a5, e) {
  return Vt(a5).pipe(sn2(e), nn2(e));
}
function Gl2(a5, e) {
  return new vt2(function(r) {
    var o = 0;
    return e.schedule(function() {
      o === a5.length ? r.complete() : (r.next(a5[o++]), r.closed || this.schedule());
    });
  });
}
function jl2(a5, e) {
  return new vt2(function(r) {
    var o;
    return ee2(r, e, function() {
      o = a5[tn2](), ee2(r, e, function() {
        var s, u, h;
        try {
          s = o.next(), u = s.value, h = s.done;
        } catch (p) {
          r.error(p);
          return;
        }
        h ? r.complete() : r.next(u);
      }, 0, true);
    }), function() {
      return Q(o == null ? void 0 : o.return) && o.return();
    };
  });
}
function an2(a5, e) {
  if (!a5) throw new Error("Iterable cannot be null");
  return new vt2(function(r) {
    ee2(r, e, function() {
      var o = a5[Symbol.asyncIterator]();
      ee2(r, e, function() {
        o.next().then(function(s) {
          s.done ? r.complete() : r.next(s.value);
        });
      }, 0, true);
    });
  });
}
function Ul2(a5, e) {
  return an2(rn2(a5), e);
}
function Hl2(a5, e) {
  if (a5 != null) {
    if (Ko2(a5)) return Vl2(a5, e);
    if (Yo2(a5)) return Gl2(a5, e);
    if (Qo2(a5)) return Nl2(a5, e);
    if (Jo2(a5)) return an2(a5, e);
    if (en2(a5)) return jl2(a5, e);
    if (on2(a5)) return Ul2(a5, e);
  }
  throw Zo2(a5);
}
function un2(a5, e) {
  return e ? Hl2(a5, e) : Vt(a5);
}
function Pe2(a5, e) {
  return St(function(r, o) {
    var s = 0;
    r.subscribe(zt2(o, function(u) {
      o.next(a5.call(e, u, s++));
    }));
  });
}
function Bl2(a5, e, r, o, s, u, h, p) {
  var d = [], P2 = 0, L = 0, E = false, B = function() {
    E && !d.length && !P2 && e.complete();
  }, I = function(k) {
    return P2 < o ? G(k) : d.push(k);
  }, G = function(k) {
    u && e.next(k), P2++;
    var K2 = false;
    Vt(r(k, L++)).subscribe(zt2(e, function(nt) {
      s == null || s(nt), u ? I(nt) : e.next(nt);
    }, function() {
      K2 = true;
    }, void 0, function() {
      if (K2) try {
        P2--;
        for (var nt = function() {
          var $t = d.shift();
          h ? ee2(e, h, function() {
            return G($t);
          }) : G($t);
        }; d.length && P2 < o; ) nt();
        B();
      } catch ($t) {
        e.error($t);
      }
    }));
  };
  return a5.subscribe(zt2(e, I, function() {
    E = true, B();
  })), function() {
    p == null || p();
  };
}
function pa2(a5, e, r) {
  return r === void 0 && (r = 1 / 0), Q(e) ? pa2(function(o, s) {
    return Pe2(function(u, h) {
      return e(o, u, s, h);
    })(Vt(a5(o, s)));
  }, r) : (typeof e == "number" && (r = e), St(function(o, s) {
    return Bl2(o, s, a5, r);
  }));
}
function cn2(a5) {
  return a5 === void 0 && (a5 = 1 / 0), pa2(zo2, a5);
}
function ma2() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  var r = qo2(a5), o = Xo2(a5, 1 / 0), s = a5;
  return s.length ? s.length === 1 ? Vt(s[0]) : cn2(o)(un2(s, r)) : $o2;
}
function xt2(a5, e) {
  return St(function(r, o) {
    var s = 0;
    r.subscribe(zt2(o, function(u) {
      return a5.call(e, u, s++) && o.next(u);
    }));
  });
}
function wt(a5) {
  return a5 <= 0 ? function() {
    return $o2;
  } : St(function(e, r) {
    var o = 0;
    e.subscribe(zt2(r, function(s) {
      ++o <= a5 && (r.next(s), a5 <= o && r.complete());
    }));
  });
}
function Wl2() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  var r = qo2(a5), o = Xo2(a5, 1 / 0);
  return St(function(s, u) {
    cn2(o)(un2(Te2([s], be2(a5)), r)).subscribe(u);
  });
}
function da2() {
  for (var a5 = [], e = 0; e < arguments.length; e++) a5[e] = arguments[e];
  return Wl2.apply(void 0, Te2([], be2(a5)));
}
function dt2(a5) {
  return St(function(e, r) {
    Vt(a5).subscribe(zt2(r, function() {
      return r.complete();
    }, wi2)), !r.closed && e.subscribe(r);
  });
}
var Ge2 = 1e3;
var ln2 = class {
  constructor(e, r) {
    this.id = e;
    this.movementDirection = "none";
    this._tilePos = { position: new T(0, 0), layer: void 0 };
    this.movementStarted$ = new Z2();
    this.movementStopped$ = new Z2();
    this.directionChanged$ = new Z2();
    this.positionChangeStarted$ = new Z2();
    this.positionChangeFinished$ = new Z2();
    this.tilePositionSet$ = new Z2();
    this.autoMovementSet$ = new Z2();
    this.lastMovementImpulse = "none";
    this.facingDirection = "down";
    this.depthChanged$ = new Z2();
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
    this.currentMovementReverted = false, this.isMoving() && this.movementStopped$.next(this.movementDirection), this.tilePositionSet$.next(X({}, e)), this.fire(this.positionChangeStarted$, this.tilePos, e), this.fire(this.positionChangeFinished$, this.tilePos, e), this.movementDirection = "none", this.lastMovementImpulse = "none", this.tilePos = e, this.movementProgress = 0;
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
      return this.tilemap.hasBlockingTile(u, r, Pi2(e), this.ignoreMissingTiles);
    });
  }
  revertCurrentMovement() {
    this.isMoving() && (this.currentMovementReverted = true, this.movementDirection = Pi2(this.movementDirection), this.movementStopped$.next(this.facingDirection), this.facingDirection = this.movementDirection, this.movementProgress = Ge2 - this.movementProgress, this.movementStarted$.next(this.facingDirection));
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
    return this._tilePos.position.add(Wt2(this.facingDirection));
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
    let r = Math.max(0, Math.min(Ge2, e));
    this.movementProgress = r;
  }
  hasWalkedHalfATile() {
    return this.movementProgress > Ge2 / 2;
  }
  willCrossTileBorderThisUpdate(e) {
    return this.movementProgress + this.maxProgressForDelta(e) >= Ge2;
  }
  updateCharacterPosition(e) {
    let r = this.willCrossTileBorderThisUpdate(e), s = 1 - (r ? Ge2 - this.movementProgress : this.maxProgressForDelta(e)) / this.maxProgressForDelta(e);
    this.movementProgress = Math.min(this.movementProgress + this.maxProgressForDelta(e), Ge2), r && (this.movementProgress = 0, this.shouldContinueMoving() ? (this.fire(this.positionChangeFinished$, this.tilePos, this.getNextTilePos()), this.tilePos = this.getNextTilePos(), this.startMoving(this.lastMovementImpulse), s > 0 && this.updateCharacterPosition(e * s)) : this.stopMoving());
  }
  maxProgressForDelta(e) {
    let o = e / 1e3;
    return Math.floor(o * this.speed * Ge2);
  }
  get tilePos() {
    return W2.clone(this._tilePos);
  }
  set tilePos(e) {
    W2.copyOver(e, this._tilePos);
  }
  startMoving(e) {
    e !== "none" && (this.currentMovementReverted = false, e != this.movementDirection && this.movementStarted$.next(e), this.movementDirection = e, this.facingDirection = e, this.fire(this.positionChangeStarted$, this.tilePos, this.getNextTilePos()));
  }
  tilePosInDirection(e, r) {
    return e.add(Wt2(this.tilemap.toMapDirection(r)));
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
var gr2 = class gr3 {
  constructor(e, r) {
    this.walkingAnimationMapping = e;
    this.charsInRow = r;
    this.lastFootLeft = false;
    this.directionToFrameRow = { down: 0, "down-left": 1, "down-right": 2, left: 1, right: 2, up: 3, "up-left": 1, "up-right": 2 };
    this._isEnabled = true;
    this.frameChange$ = new Z2();
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
    let o = Math.floor(r / this.charsInRow), s = r % this.charsInRow, u = this.charsInRow * gr3.FRAMES_CHAR_ROW, h = gr3.FRAMES_CHAR_ROW * s, p = ((P2 = this.directionToFrameRow[e]) != null ? P2 : 0) + o * gr3.FRAMES_CHAR_COL, d = h + p * u;
    return { rightFoot: d, standing: d + 1, leftFoot: d + 2 };
  }
};
gr2.FRAMES_CHAR_ROW = 3, gr2.FRAMES_CHAR_COL = 4;
var _i2 = gr2;
var yr2 = class {
  static shiftPad(e, r) {
    let o = Math.floor(e), u = `${o}`.padStart(r, "0").length;
    return o / Math.pow(10, u);
  }
};
var ft2 = class a4 {
  static vec2str(e) {
    return `${e.x}#${e.y}`;
  }
  static equal(e, r) {
    return a4.vec2str(e) == a4.vec2str(r);
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
var re3 = class re4 {
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
    return this.isIsometric() ? ft2.scalarMult(this.getTileSize(), 0.5).multiply(new T(e.x - e.y, e.x + e.y)) : e.clone().multiply(this.getTileSize());
  }
  getTileDistance(e) {
    if (this.isIsometric()) switch (e) {
      case "down-left":
      case "down-right":
      case "up-left":
      case "up-right":
        return ft2.scalarMult(this.getTileSize(), 0.5);
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
    return this.hasLayerProp(e, re4.ALWAYS_TOP_PROP_NAME);
  }
  isCharLayer(e) {
    return this.hasLayerProp(e, re4.CHAR_LAYER_PROP_NAME);
  }
  setLayerDepths() {
    let e = [], r = -1, o = this.tilemap.layers.filter((u) => this.isLayerAlwaysOnTop(u));
    this.tilemap.layers.filter((u) => !this.isLayerAlwaysOnTop(u)).forEach((u) => {
      this.hasLayerProp(u, re4.HEIGHT_SHIFT_PROP_NAME) ? (this.createHeightShiftLayers(u, r), e.push(u.tilemapLayer)) : this.setDepth(u, ++r);
    }), this.charLayerDepths.set(void 0, r), o.forEach((u, h) => {
      u.tilemapLayer.setDepth(h + 1 + r);
    }), e.forEach((u) => u.destroy());
  }
  setDepth(e, r) {
    e.tilemapLayer.setDepth(r), this.isCharLayer(e) && this.charLayerDepths.set(this.getLayerProp(e, re4.CHAR_LAYER_PROP_NAME), r);
  }
  createHeightShiftLayers(e, r) {
    let o = this.getLayerProp(e, re4.HEIGHT_SHIFT_PROP_NAME);
    isNaN(o) && (o = 0);
    let s = 1;
    for (let u = 0; u < e.height; u++) {
      let h = this.copyLayer(e, u);
      if (h) {
        h.scale = e.tilemapLayer.scale;
        let p = this.isIsometric() ? this.getTileHeight() / 2 : this.getTileHeight();
        h.setDepth(r + yr2.shiftPad((u + o) * p + s, re4.Z_INDEX_PADDING));
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
re3.ALWAYS_TOP_PROP_NAME = "ge_alwaysTop", re3.CHAR_LAYER_PROP_NAME = "ge_charLayer", re3.HEIGHT_SHIFT_PROP_NAME = "ge_heightShift", re3.Z_INDEX_PADDING = 7;
var vr = re3;
var hn2 = class {
  constructor(e, r, o, s, u) {
    this.charData = e;
    this.scene = r;
    this.tilemap = o;
    this.geHeadless = u;
    this.customOffset = new T(0, 0);
    this.depthOffset = 0;
    this.newSpriteSet$ = new Z2();
    this.destroy$ = new Z2();
    var h, p;
    this.layerOverlaySprite = s && e.sprite ? this.scene.add.sprite(0, 0, e.sprite.texture) : void 0, this.walkingAnimationMapping = e.walkingAnimationMapping, this.customOffset = new T(e.offsetX || 0, e.offsetY || 0), this.depthOffset = (h = e.depthOffset) != null ? h : 0, this.sprite = e.sprite, this.container = e.container, this.cachedContainerBounds = (p = e.container) == null ? void 0 : p.getBounds(), this.geHeadless.directionChanged().pipe(xt2(({ charId: d }) => d === this.charData.id)).subscribe(({ direction: d }) => {
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
    this.geHeadless.isCurrentMovementReverted(this.charData.id) && (e = new T(this.geHeadless.getTilePosInDirection(this.geHeadless.getPosition(this.charData.id), this.geHeadless.getCharLayer(this.charData.id), Pi2(this.geHeadless.getFacingDirection(this.charData.id))).position));
    let r = this.geHeadless.getMovementProgress(this.charData.id) / 1e3, s = this.tilemap.tilePosToPixelPos(e).add(this.getEngineOffset()).add(this.customOffset).add(Wt2(this.geHeadless.getFacingDirection(this.charData.id)).multiply(this.tilemap.getTileDistance(this.geHeadless.getFacingDirection(this.charData.id)).scalarMult(r))), u = this.getGameObj();
    u && (u.x = Math.floor(s.x), u.y = Math.floor(s.y));
  }
  getGameObj() {
    return this.container || this.sprite;
  }
  updateGridChar() {
    var e;
    if (this.updatePixelPos(), this.sprite && this.geHeadless.isMoving(this.charData.id)) {
      let r = this.geHeadless.getMovementProgress(this.charData.id) > Ge2 / 2;
      (e = this.getAnimation()) == null || e.updateCharacterFrame(this.geHeadless.getFacingDirection(this.charData.id), r, Number(this.sprite.frame.name));
    }
    this.updateDepth();
  }
  resetAnimation(e) {
    let r = new _i2(this.walkingAnimationMapping, e.texture.source[0].width / e.width / _i2.FRAMES_CHAR_ROW);
    this.setAnimation(r), r.frameChange().pipe(dt2(this.newSpriteSet$)).subscribe((o) => {
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
      let u = new T(Lt2(X({}, r), { y: r.y - 1 }));
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
    return yr2.shiftPad(e.y + ((o = (r = this.cachedContainerBounds) == null ? void 0 : r.y) != null ? o : 0) + ((u = (s = this.cachedContainerBounds) == null ? void 0 : s.height) != null ? u : 0) + this.depthOffset, vr.Z_INDEX_PADDING);
  }
  getPaddedPixelDepthSprite(e) {
    return yr2.shiftPad(e.y + e.displayHeight + this.depthOffset, vr.Z_INDEX_PADDING);
  }
  getTransitionLayer(e) {
    if (e.layer) return this.geHeadless.getTransition(e.position, e.layer) || e.layer;
  }
};
var fn2 = ((s) => (s.DONT_BLOCK = "DONT_BLOCK", s.BLOCK_TWO_TILES = "BLOCK_TWO_TILES", s.BLOCK_ONE_TILE_AHEAD = "BLOCK_ONE_TILE_AHEAD", s.BLOCK_ONE_TILE_BEHIND = "BLOCK_ONE_TILE_BEHIND", s))(fn2 || {});
var Br2 = ((s) => (s.STOP = "STOP", s.CLOSEST_REACHABLE = "CLOSEST_REACHABLE", s.RETRY = "RETRY", s.ALTERNATIVE_TARGETS = "ALTERNATIVE_TARGETS", s))(Br2 || {});
var pn2 = class {
  distance(e, r) {
    return ft2.manhattanDistance(e, r);
  }
  direction(e, r) {
    if (ft2.equal(e, r)) return "none";
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
var mn = class {
  distance(e, r) {
    return ft2.chebyshevDistance(e, r);
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
var le2 = class {
  static create(e) {
    switch (e) {
      case 4:
        return new pn2();
      case 8:
        return new mn();
    }
  }
};
var Li2 = class {
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
var Si2 = ((o) => (o.WAIT = "WAIT", o.RETRY = "RETRY", o.STOP = "STOP", o))(Si2 || {});
var xe = class {
  constructor(e, { shortestPathAlgorithm: r = "BFS", pathWidth: o = 1, pathHeight: s = 1, numberOfDirections: u = 4, isPositionAllowed: h = (K2, nt) => true, collisionGroups: p = [], ignoredChars: d = [], ignoreTiles: P2 = false, ignoreMapBounds: L = false, ignoreBlockedTarget: E = false, maxPathLength: B = 1 / 0, ignoreLayers: I = false, considerCosts: G = false, calculateClosestToTarget: k = true } = {}) {
    this.gridTilemap = e;
    this.options = { shortestPathAlgorithm: r, pathWidth: o, pathHeight: s, numberOfDirections: u, isPositionAllowed: h, collisionGroups: p, ignoredChars: d, ignoreTiles: P2, ignoreMapBounds: L, ignoreBlockedTarget: E, maxPathLength: B, ignoreLayers: I, considerCosts: G, calculateClosestToTarget: k }, this.ignoredCharsSet = new Set(d);
  }
  findShortestPath(e, r) {
    this.options.ignoreLayers && (this.gridTilemap.fixCacheLayer(e.layer), r.layer = e.layer);
    let o = this.findShortestPathImpl(e, r);
    return this.gridTilemap.unfixCacheLayers(), o;
  }
  getNeighbors(e, r) {
    var h;
    return le2.create((h = this.options.numberOfDirections) != null ? h : 4).neighbors(e.position).map((p) => {
      let d = e.layer;
      return this.options.ignoreLayers || (d = this.gridTilemap.getTransition(p, e.layer)), { position: p, layer: d || e.layer };
    }).filter((p) => !this.isBlocking(e, p) || this.options.ignoreBlockedTarget && W2.equal(p, r));
  }
  getTransition(e, r) {
    if (!this.options.ignoreLayers) return this.gridTilemap.getTransition(e, r);
  }
  getCosts(e, r) {
    if (!this.options.considerCosts) return 1;
    let o = Pt2(r.position, e);
    return this.gridTilemap.getTileCosts(r, o);
  }
  isBlocking(e, r) {
    return !(this.options.ignoreMapBounds || this.gridTilemap.isInRange(r.position)) || !this.options.isPositionAllowed(r.position, r.layer) || !this.options.ignoreTiles && this.hasBlockingTileFrom(e, r, this.options.pathWidth, this.options.pathHeight, this.options.ignoreMapBounds, this.gridTilemap) ? true : this.hasBlockingCharFrom(e, r, this.options.pathWidth, this.options.pathHeight, this.options.collisionGroups, this.ignoredCharsSet, this.gridTilemap);
  }
  distance(e, r) {
    return (this.options.numberOfDirections === 4 ? ft2.manhattanDistance : ft2.chebyshevDistance)(e, r);
  }
  getTilePosInDir(e, r) {
    return this.options.ignoreLayers ? { position: e.position.add(Wt2(this.gridTilemap.toMapDirection(r))), layer: e.layer } : this.gridTilemap.getTilePosInDirection(e, r);
  }
  getReverseNeighbors(e, r) {
    var p;
    let s = le2.create((p = this.options.numberOfDirections) != null ? p : 4).neighbors(e.position), u;
    if (!this.options.ignoreLayers) {
      let d = this.gridTilemap.getReverseTransitions(e.position, e.layer);
      u = d ? [...d] : void 0;
    }
    return s.map((d) => u ? u.map((P2) => ({ position: d, layer: P2 || e.layer })) : [{ position: d, layer: e.layer }]).flat().filter((d) => !this.isBlocking(d, e) || this.options.ignoreBlockedTarget && W2.equal(e, r));
  }
  hasBlockingCharFrom(e, r, o, s, u, h, p) {
    if (o === 1 && s === 1) return p.hasBlockingChar(r.position, r.layer, u, h);
    let d = (L) => p.hasBlockingChar(L, r.layer, u, h), P2 = Pt2(e.position, r.position);
    return this.isBlockingMultiTile(e, P2, o, s, d);
  }
  hasBlockingTileFrom(e, r, o, s, u, h) {
    if (o === 1 && s === 1) return h.hasBlockingTile(r.position, r.layer, Pt2(r.position, e.position), u);
    let p = Pt2(e.position, r.position), d = (P2) => h.hasBlockingTile(P2, r.layer, p, u);
    return this.isBlockingMultiTile(e, p, o, s, d);
  }
  isBlockingMultiTile(e, r, o, s, u) {
    let h = { src: new T(e.position.x + o, e.position.y), dest: new T(e.position.x + o, e.position.y + s - 1) }, p = { src: new T(e.position.x - 1, e.position.y), dest: new T(e.position.x - 1, e.position.y + s - 1) }, d = { src: new T(e.position.x, e.position.y - 1), dest: new T(e.position.x + o - 1, e.position.y - 1) }, P2 = { src: new T(e.position.x, e.position.y + s), dest: new T(e.position.x + o - 1, e.position.y + s) };
    switch (r) {
      case "right":
        return this.checkLine(h, u);
      case "left":
        return this.checkLine(p, u);
      case "up":
        return this.checkLine(d, u);
      case "down":
        return this.checkLine(P2, u);
      case "up-left":
        return this.checkLine({ src: d.src, dest: new T(d.dest.x - 1, d.dest.y) }, u) || this.checkLine({ src: new T(p.src.x, p.src.y - 1), dest: new T(p.dest.x, p.dest.y - 1) }, u);
      case "up-right":
        return this.checkLine({ src: new T(d.src.x + 1, d.src.y), dest: d.dest }, u) || this.checkLine({ src: new T(h.src.x, h.src.y - 1), dest: new T(h.dest.x, h.dest.y - 1) }, u);
      case "down-left":
        return this.checkLine({ src: new T(p.src.x, p.src.y + 1), dest: new T(p.dest.x, p.dest.y + 1) }, u) || this.checkLine({ src: P2.src, dest: new T(P2.dest.x - 1, P2.dest.y) }, u);
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
var La2 = ko2(eh2(), 1);
var Sa2 = ko2(uh2(), 1);
var Th2 = ko2(ph2(), 1);
var he2 = ko2(bh2(), 1);
var Mi2 = La2.default.MinFibonacciHeap;
var XC2 = La2.default.MaxFibonacciHeap;
var YC = Sa2.default.MinHeap;
var QC2 = Sa2.default.MaxHeap;
var KC2 = Th2.default.GeneralizedSuffixArray;
var JC2 = he2.default.Uint8Vector;
var ZC2 = he2.default.Uint8ClampedVector;
var t_2 = he2.default.Int8Vector;
var e_2 = he2.default.Uint16Vector;
var r_2 = he2.default.Int16Vector;
var i_2 = he2.default.Uint32Vector;
var o_2 = he2.default.Int32Vector;
var n_2 = he2.default.Float32Vector;
var s_2 = he2.default.Float64Vector;
var a_2 = he2.default.PointerVector;
var Ai2 = 1e5;
var Ph2 = 2 * Ai2;
var bn2 = class extends xe {
  constructor(e, r = {}) {
    super(e, r), this.spatialWidth = Math.max(this.gridTilemap.getWidth() + 2 * Ai2, Ph2);
    let o = Math.max(this.gridTilemap.getHeight() + 2 * Ai2, Ph2);
    this.planeSize = this.spatialWidth * o;
  }
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "A_STAR" };
  }
  getNodeId(e) {
    let r = this.gridTilemap.getLayerIndex(e.layer), o = e.position.x + Ai2, s = e.position.y + Ai2;
    return r * this.planeSize + s * this.spatialWidth + o;
  }
  shortestPathBfs(e, r) {
    var E, B, I;
    let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), h = new Mi2((G, k) => {
      var K2, nt;
      return ((K2 = u.get(G.id)) != null ? K2 : Number.MAX_VALUE) - ((nt = u.get(k.id)) != null ? nt : Number.MAX_VALUE);
    }), p = e, d = this.distance(e.position, r.position), P2 = 0, L = this.getNodeId(e);
    for (h.push({ node: e, id: L }), s.set(L, 0), u.set(L, this.distance(e.position, r.position)); h.size > 0; ) {
      let G = h.pop();
      if (!G) break;
      let k = G.node, K2 = G.id;
      P2++;
      let nt = this.distance(k.position, r.position);
      if (nt < d && (d = nt, p = k), xh2(k, r)) return { previous: o, closestToTarget: p, steps: P2, maxPathLengthReached: false };
      if (((E = s.get(K2)) != null ? E : Number.MAX_VALUE) + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: p, steps: P2, maxPathLengthReached: true };
      for (let $t of this.getNeighbors(k, r)) {
        let bt = this.getNodeId($t), fe = ((B = s.get(K2)) != null ? B : Number.MAX_VALUE) + this.getCosts(k.position, $t);
        (!s.has(bt) || fe < ((I = s.get(bt)) != null ? I : Number.MAX_VALUE)) && (o.set(bt, k), s.set(bt, fe), u.set(bt, fe + this.distance($t.position, r.position)), h.push({ node: $t, id: bt }));
      }
    }
    return { previous: o, closestToTarget: p, steps: P2, maxPathLengthReached: false };
  }
  returnPath(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !xh2(u, r); ) {
      let h = this.getNodeId(u);
      if (u = e.get(h), !u) return [];
      s.push(u);
    }
    return s.reverse();
  }
};
function xh2(a5, e) {
  return ft2.equal(a5.position, e.position) ? a5.layer === e.layer : false;
}
var Tn2 = class {
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
      this.head = new Tn2(e), this.tail = this.head;
      return;
    }
    let r = new Tn2(e);
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
var zr2 = class extends xe {
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "BFS" };
  }
  equal(e, r) {
    return ft2.equal(e.position, r.position) ? e.layer === r.layer : false;
  }
  shortestPathBfs(e, r) {
    let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), u = new je(), h = e, p = this.distance(e.position, r.position), d = 0;
    for (u.enqueue({ node: e, dist: 0 }), s.add(W2.toString(e)); u.size() > 0; ) {
      let P2 = u.dequeue();
      if (d++, !P2) break;
      let { node: L, dist: E } = P2;
      if (E > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: h, steps: d, maxPathLengthReached: true };
      let B = this.distance(L.position, r.position);
      if (B < p && (p = B, h = L), this.equal(L, r)) return { previous: o, closestToTarget: h, steps: d, maxPathLengthReached: false };
      for (let I of this.getNeighbors(L, r)) s.has(W2.toString(I)) || (o.set(W2.toString(I), L), u.enqueue({ node: I, dist: E + 1 }), s.add(W2.toString(I)));
    }
    return { previous: o, closestToTarget: h, steps: d, maxPathLengthReached: false };
  }
  returnPath(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !this.equal(u, r); ) {
      if (u = e.get(W2.toString(u)), !u) return [];
      s.push(u);
    }
    return s.reverse();
  }
};
var Ri2 = 1e5;
var wh2 = 2 * Ri2;
var Pn2 = class {
  constructor(e) {
    this.getNodeId = e;
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
      let h = this.getNodeId(u);
      if (!this.visited.has(h)) {
        this.previous.set(h, r), this.queue.enqueue({ node: u, dist: o + 1 }), this.visited.set(h, o + 1);
        let p = (s = this.otherBfs) == null ? void 0 : s.visited.get(h);
        p !== void 0 && p < this.minMatching && (this.minMatching = p, this.minMatchingNode = u);
      }
    }
  }
};
var xn2 = class extends xe {
  constructor(e, r = {}) {
    super(e, r), this.spatialWidth = Math.max(this.gridTilemap.getWidth() + 2 * Ri2, wh2);
    let o = Math.max(this.gridTilemap.getHeight() + 2 * Ri2, wh2);
    this.planeSize = this.spatialWidth * o;
  }
  getNodeId(e) {
    let r = this.gridTilemap.getLayerIndex(e.layer), o = e.position.x + Ri2, s = e.position.y + Ri2;
    return r * this.planeSize + s * this.spatialWidth + o;
  }
  findShortestPathImpl(e, r) {
    let o = this.shortestPathBfs(e, r);
    return { path: this.returnPath(o.previous, o.previous2, o.matchingPos, e, r), closestToTarget: o.closestToTarget, steps: o.steps, maxPathLengthReached: o.maxPathLengthReached, algorithmUsed: "BIDIRECTIONAL_SEARCH" };
  }
  equal(e, r) {
    return ft2.equal(e.position, r.position) ? e.layer === r.layer : false;
  }
  shortestPathBfs(e, r) {
    var P2;
    if (W2.equal(e, r)) return { previous: /* @__PURE__ */ new Map(), previous2: /* @__PURE__ */ new Map(), closestToTarget: e, steps: 0, maxPathLengthReached: false };
    let o = (L) => this.getNodeId(L), s = new Pn2(o), u = new Pn2(o), h = 0;
    s.otherBfs = u, u.otherBfs = s;
    let p = e, d = this.distance(e.position, r.position);
    for (s.queue.enqueue({ node: e, dist: 0 }), u.queue.enqueue({ node: r, dist: 0 }), s.visited.set(this.getNodeId(e), 0), u.visited.set(this.getNodeId(r), 0); this.shouldStop(s.queue.size() > 0, u.queue.size() > 0); ) {
      let L = s.queue.dequeue();
      if (!L) break;
      let { node: E, dist: B } = L;
      if (B + 1 + (((P2 = u.queue.peek()) == null ? void 0 : P2.dist) || 0) > this.options.maxPathLength) return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(p), steps: h, maxPathLengthReached: true };
      let I = this.distance(E.position, r.position);
      if (I < d && (d = I, p = E), h++, s.step(this.getNeighbors(E, r), E, B), s.isNewFrontier() && s.minMatchingNode) return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(r), matchingPos: s.minMatchingNode, steps: h, maxPathLengthReached: false };
      let G = u.queue.dequeue();
      if (!G) continue;
      let { node: k, dist: K2 } = G;
      if (h++, u.step(this.getReverseNeighbors(k, r), k, K2), u.isNewFrontier() && u.minMatchingNode) return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(r), matchingPos: u.minMatchingNode, steps: h, maxPathLengthReached: false };
    }
    return { previous: s.previous, previous2: u.previous, closestToTarget: this.maybeClosestToTarget(p), steps: h, maxPathLengthReached: false };
  }
  shouldStop(e, r) {
    return this.options.calculateClosestToTarget ? e || r : e && r;
  }
  maybeClosestToTarget(e) {
    return this.options.calculateClosestToTarget ? e : void 0;
  }
  returnPath(e, r, o, s, u) {
    if (o) {
      let h = this.getPathFromPrev(e, s, o).reverse(), p = this.getPathFromPrev(r, u, o);
      return h.pop(), [...h, ...p];
    } else return this.getPathFromPrev(e, s, u).reverse();
  }
  getPathFromPrev(e, r, o) {
    let s = [], u = o;
    for (s.push(u); !this.equal(u, r); ) {
      if (u = e.get(this.getNodeId(u)), !u) return [];
      s.push(u);
    }
    return s;
  }
};
var Fi2 = 1e5;
var Ch2 = 2 * Fi2;
var $r2 = class extends xe {
  constructor(r, o = {}) {
    super(r, o);
    this.openSet = new Mi2();
    this.g = /* @__PURE__ */ new Map();
    this.f = /* @__PURE__ */ new Map();
    this.closestToTarget = { position: new T(0, 0), layer: void 0 };
    this.smallestDistToTarget = 0;
    this.steps = 0;
    this.visits = [];
    this.maxFrontierSize = 0;
    this.maxJumpSize = 0;
    let s = Number.isFinite(this.gridTilemap.getWidth()) ? this.gridTilemap.getWidth() : 0, u = Number.isFinite(this.gridTilemap.getHeight()) ? this.gridTilemap.getHeight() : 0;
    this.spatialWidth = Math.max(s + 2 * Fi2, Ch2);
    let h = Math.max(u + 2 * Fi2, Ch2);
    this.planeSize = this.spatialWidth * h;
  }
  getNodeId(r) {
    let o = this.gridTilemap.getLayerIndex(r.layer), s = r.position.x + Fi2, u = r.position.y + Fi2;
    return o * this.planeSize + u * this.spatialWidth + s;
  }
  findShortestPathImpl(r, o) {
    this.maxJumpSize = this.distance(r.position, o.position);
    let s = this.shortestPath(r, o);
    return { path: this.returnPath(s.previous, r, o), closestToTarget: s.closestToTarget, steps: s.steps, maxPathLengthReached: s.maxPathLengthReached, algorithmUsed: "JPS" };
  }
  shortestPath(r, o) {
    var h, p, d;
    this.steps = 0;
    let s = /* @__PURE__ */ new Map();
    this.g = /* @__PURE__ */ new Map(), this.f = /* @__PURE__ */ new Map(), this.closestToTarget = r, this.smallestDistToTarget = this.distance(r.position, o.position), this.openSet = new Mi2((P2, L) => {
      var E, B;
      return ((E = this.f.get(P2.id)) != null ? E : Number.MAX_VALUE) - ((B = this.f.get(L.id)) != null ? B : Number.MAX_VALUE);
    });
    let u = this.getNodeId(r);
    for (this.openSet.push({ node: r, id: u }), this.g.set(u, 0), this.f.set(u, this.distance(r.position, o.position)), this.maxFrontierSize = Math.max(this.maxFrontierSize, this.openSet.size); this.openSet.size > 0; ) {
      let P2 = this.openSet.pop();
      if (!P2) break;
      let L = P2.node, E = P2.id;
      if (this.steps++, W2.equal(L, o)) return { previous: s, closestToTarget: o, steps: this.steps, maxPathLengthReached: false };
      if (((h = this.g.get(E)) != null ? h : Number.MAX_VALUE) + 1 > this.options.maxPathLength) return { previous: /* @__PURE__ */ new Map(), closestToTarget: this.closestToTarget, steps: this.steps, maxPathLengthReached: true };
      this.updateClosestToTarget(L, o);
      for (let B of this.getNeighborsInternal(L, s.get(E), o)) {
        let I = this.getNodeId(B.p), G = ((p = this.g.get(E)) != null ? p : Number.MAX_VALUE) + B.dist;
        (!this.g.has(I) || G < ((d = this.g.get(I)) != null ? d : Number.MAX_VALUE)) && (s.set(I, L), this.g.set(I, G), this.f.set(I, G + this.distance(B.p.position, o.position)), this.openSet.push({ node: B.p, id: I }));
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
    if (!o || r.layer !== o.layer) return this.getNeighbors(r, s).map((p) => ({ p, dist: 1 }));
    let u = this.prune(o, r).filter((p) => !this.isBlockingIgnoreTarget(r, p, s)).map((p) => {
      let d = this.getTransition(p.position, r.layer);
      return { position: p.position, layer: d || r.layer };
    }), h = [];
    for (let p of u) if (this.isHorizontal(r.position, p.position)) h.push({ p, dist: 1 });
    else {
      let d = this.jump(r, p, s, 1, Pt2(r.position, p.position));
      d && h.push(d);
    }
    return h;
  }
  isBlockingIgnoreTarget(r, o, s) {
    return this.isBlocking(r, o) && !(this.options.ignoreBlockedTarget && W2.equal(o, s));
  }
  jump(r, o, s, u, h) {
    if (!this.isBlockingIgnoreTarget(r, o, s)) return W2.equal(o, s) ? { p: o, dist: u } : u >= this.maxJumpSize ? { p: o, dist: u } : this.getTransition(o.position, r.layer) !== void 0 ? { p: o, dist: u } : this.hasForced(r, o) ? { p: o, dist: u } : (this.updateClosestToTarget(o, s), this.jump(o, this.getTilePosInDir(o, h), s, u + 1, h));
  }
  isHorizontal(r, o) {
    return r.y === o.y;
  }
  getForced(r, o, s, u, h, p) {
    let d = [], P2 = r;
    return (this.blockOrTrans(P2, s) || this.blockOrTrans(s, u)) && this.addIfNotBlocked(d, o, u), (this.blockOrTrans(P2, h) || this.blockOrTrans(h, p)) && this.addIfNotBlocked(d, o, p), d;
  }
  hasForced(r, o) {
    let { topLeft: s, downLeft: u, top: h, bottom: p } = this.normalizedPositions(r, o);
    return !!((this.blockOrTrans(r, u) || this.blockOrTrans(u, p)) && !this.blockOrTrans(o, p) || (this.blockOrTrans(r, s) || this.blockOrTrans(s, h)) && !this.blockOrTrans(o, h));
  }
  prune(r, o) {
    let { right: s, top: u, bottom: h, downLeft: p, topLeft: d } = this.normalizedPositions(r, o);
    return this.isHorizontal(r.position, o.position) ? [s, u, h] : [s, ...this.getForced(r, o, p, h, d, u)];
  }
  normalizedPositions(r, o) {
    return r.position.x < o.position.x ? { topLeft: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, top: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, bottom: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, right: { position: new T(o.position.x + 1, o.position.y), layer: o.layer } } : r.position.x > o.position.x ? { topLeft: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, top: { position: new T(o.position.x, o.position.y + 1), layer: o.layer }, bottom: { position: new T(o.position.x, o.position.y - 1), layer: o.layer }, right: { position: new T(o.position.x - 1, o.position.y), layer: o.layer } } : r.position.y < o.position.y ? { topLeft: { position: new T(o.position.x + 1, o.position.y - 1), layer: o.layer }, downLeft: { position: new T(o.position.x - 1, o.position.y - 1), layer: o.layer }, top: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, bottom: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, right: { position: new T(o.position.x, o.position.y + 1), layer: o.layer } } : { topLeft: { position: new T(o.position.x - 1, o.position.y + 1), layer: o.layer }, downLeft: { position: new T(o.position.x + 1, o.position.y + 1), layer: o.layer }, top: { position: new T(o.position.x - 1, o.position.y), layer: o.layer }, bottom: { position: new T(o.position.x + 1, o.position.y), layer: o.layer }, right: { position: new T(o.position.x, o.position.y - 1), layer: o.layer } };
  }
  posInDir(r, o) {
    return { position: r.position.add(Wt2(o)), layer: r.layer };
  }
  returnPath(r, o, s) {
    let u = [], h = s;
    for (u.push(h); !W2.equal(h, o); ) {
      let p = r.get(this.getNodeId(h));
      if (!p) return [];
      this.distance(p.position, h.position) > 1 ? this.fillPath(h, p, u) : u.push(p), h = p;
    }
    return u.reverse();
  }
  fillPath(r, o, s) {
    let u = r;
    do {
      let h = Pt2(u.position, o.position);
      u = this.getTilePosInDir(u, h), s.push(u);
    } while (!ft2.equal(u.position, o.position));
  }
};
var wn2 = class {
  constructor(e, r, o, s = {}) {
    this.character = e;
    this.gridTilemap = r;
    this.charToFollow = o;
    let u = { distance: 0, noPathFoundStrategy: "STOP", maxPathLength: 1 / 0, shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH", ignoreLayers: false, considerCosts: s.considerCosts || false, facingDirection: "none", isPositionAllowedFn: () => true, ignoredChars: [] };
    this.options = X(X({}, u), s), this.options.considerCosts && this.options.shortestPathAlgorithm !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.options.shortestPathAlgorithm}'. It can only be used with A* algorithm.`), this.options.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1) && console.warn("GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1");
  }
  init() {
    this.updateTarget(this.charToFollow.getTilePos().position, this.charToFollow.getTilePos().layer), this.charToFollow.positionChangeStarted().pipe(dt2(this.character.autoMovementSet().pipe(xt2((e) => e !== this), wt(1)))).subscribe(({ enterTile: e, enterLayer: r }) => {
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
    let e = bi2[this.options.facingDirection] + bi2[this.charToFollow.getFacingDirection()], r = Vo2("up", e), o = { x: this.charToFollow.getTilePos().position.x, y: this.charToFollow.getTilePos().position.y };
    return r === "right" ? o.x += this.charToFollow.getTileWidth() - 1 : r === "down" ? o.y += this.charToFollow.getTileWidth() - 1 : r === "down-left" ? o.y += this.charToFollow.getTileWidth() - 1 : r === "down-right" ? (o.y += this.charToFollow.getTileWidth() - 1, o.x += this.charToFollow.getTileWidth() - 1) : r === "up-right" && (o.x += this.charToFollow.getTileWidth() - 1), this.gridTilemap.getTilePosInDirection({ position: new T(o), layer: this.charToFollow.getTilePos().layer }, r).position;
  }
  updateTarget(e, r) {
    let o = this.options.facingDirection !== "none" && this.options.distance === 0;
    o && (e = this.getFacingPos()), this.targetMovement = new qr2(this.character, this.gridTilemap, { position: new T(e), layer: r }, { distance: o ? 0 : this.options.distance + 1, config: { algorithm: this.options.shortestPathAlgorithm, noPathFoundStrategy: this.options.noPathFoundStrategy, maxPathLength: this.options.maxPathLength, ignoreLayers: this.options.ignoreLayers, considerCosts: this.options.considerCosts, ignoredChars: [this.charToFollow.getId(), ...this.options.ignoredChars], isPositionAllowedFn: this.options.isPositionAllowedFn } }), this.targetMovement.init();
  }
};
var ki2 = class {
  static getRandomInt(e) {
    return Math.floor(Math.random() * Math.floor(e));
  }
};
var Cn2 = class {
  constructor(e, r = 0, o = -1) {
    this.character = e;
    this.delay = r;
    this.radius = o;
    this.stepSize = 0;
    this.delayLeft = this.delay, this.initialRow = e.getNextTilePos().position.y, this.initialCol = e.getNextTilePos().position.x, this.randomizeStepSize(), this.stepsWalked = 0, this.currentMovementDirection = "none", this.character.positionChangeStarted().pipe(dt2(this.character.autoMovementSet().pipe(xt2((s) => s !== this), wt(1)))).subscribe(() => {
      this.stepsWalked++;
    }), this.distanceUtils = le2.create(e.getNumberOfDirections());
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
    return this.distanceUtils.distance(this.character.getNextTilePos().position.add(Wt2(e)), new T(this.initialCol, this.initialRow));
  }
  getFreeRandomDirection() {
    let e = this.getFreeDirections();
    return e.length == 0 ? "none" : e[ki2.getRandomInt(e.length)];
  }
  randomizeStepSize() {
    this.stepSize = ki2.getRandomInt(this.radius) + 1;
  }
};
function _h2(a5, e) {
  return a5.filter((r) => {
    var o, s, u, h, p, d;
    return (o = e.labels) != null && o.withAllLabels ? (s = e.labels) == null ? void 0 : s.withAllLabels.every((P2) => r.hasLabel(P2)) : (u = e.labels) != null && u.withOneOfLabels ? (h = e.labels) == null ? void 0 : h.withOneOfLabels.some((P2) => r.hasLabel(P2)) : (p = e.labels) != null && p.withNoneLabels ? !((d = e.labels) != null && d.withNoneLabels.some((P2) => r.hasLabel(P2))) : true;
  });
}
var _n2 = { name: "grid-engine", version: "2.52.1", description: "Phaser3 plugin for grid based movement on a 2D game board.", author: "Johannes Baum", license: "Apache-2.0", main: "dist/GridEngine.min.cjs", module: "dist/GridEngine.esm.min.js", type: "module", scripts: { test: "jest", dev: "prettier --write src/ && eslint src/", "build-web": "esbuild src/main-iife.ts --bundle --minify --alias:phaser=./src/phaser-shim.js --target=es2016 --outfile=dist/GridEngine.min.js", "build-esm": "esbuild src/main-esm.ts --bundle --minify --format=esm --external:phaser --target=es2016 --outfile=dist/GridEngine.esm.min.js", "build-cjs": "esbuild src/main-esm.ts --bundle  --minify --format=cjs --external:phaser --target=node18 --platform=node --outfile=dist/GridEngine.min.cjs", "build-types": "tsc -p tsconfig.emit-cjs.json && tsc -p tsconfig.emit-esm.json", build: "npm run build-web && npm run build-esm && npm run build-cjs && npm run build-types && node createPackageJsons.cjs", "build-speedtest": "esbuild speedtests/run.ts --bundle --format=cjs --target=node18 --platform=node --alias:phaser=./speedtests/phaser-node-shim.js --outfile=speedtests/run.cjs", lint: "eslint .", serve: "esbuild src/main-iife.ts --servedir=serve --outfile=serve/js/GridEngine.js --bundle --target=es2016 --alias:phaser=./src/phaser-shim.js", docs: "typedoc src/GridEngine.ts --excludePrivate --excludeProtected --readme none --excludeInternal --out docs/public/api --sort kind --sort alphabetical --categorizeByGroup false", "docs:dev": "vitepress dev docs", "docs:build": "vitepress build docs", "docs:preview": "vitepress preview docs" }, exports: { ".": { require: { types: "./dist/cjs/src/main-esm.d.ts", default: "./dist/GridEngine.min.cjs" }, import: { types: "./dist/mjs/src/main-esm.d.ts", default: "./dist/GridEngine.esm.min.js" } } }, files: ["dist"], types: "dist/mjs/src/main-esm.d.ts", dependencies: { mnemonist: "^0.40.3", rxjs: "^7.8.2", "tiled-property-flattener": "^1.1.1" }, peerDependencies: { phaser: "~4.0.0" }, devDependencies: { "@babel/core": "^7.28.5", "@babel/preset-env": "^7.28.5", "@eslint/eslintrc": "^3.3.3", "@eslint/js": "^9.39.4", "@stryker-mutator/core": "^9.4.0", "@stryker-mutator/jest-runner": "^9.4.0", "@types/jest": "^30.0.0", "@typescript-eslint/eslint-plugin": "^8.50.0", "@typescript-eslint/parser": "8.58.2", "babel-jest": "^30.2.0", canvas: "^3.2.0", "csv-parse": "^6.2.1", esbuild: "^0.28.0", eslint: "^9.39.4", "eslint-config-prettier": "^10.1.8", "eslint-plugin-jest": "^29.5.0", jest: "^30.2.0", "jest-environment-jsdom": "^30.3.0", phaser: "~4.0.0", phaser3spectorjs: "^0.0.8", prettier: "3.8.2", "random-js": "^2.1.0", "ts-jest": "^29.4.6", typedoc: "^0.28.15", typescript: "^6.0.2", vitepress: "^1.6.4", vue: "^3.5.26", "vue-chartjs": "^5.3.3" }, repository: { type: "git", url: "git+https://github.com/Annoraaq/grid-engine.git" }, bugs: { url: "https://github.com/Annoraaq/grid-engine/issues" }, homepage: "https://github.com/Annoraaq/grid-engine#readme", keywords: ["Phaser", "RPG", "2D", "Movement", "Grid", "Pathfinding", "Tile"] };
var Ln2 = class {
  constructor(e, r) {
    this.collistionStrategy = e;
    this.collisionGroupRelation = r;
    this.tilePosToCharacters = new Oa2();
    this.charRemoved$ = new Z2();
  }
  isCharBlockingAt(e, r, o, s = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set()) {
    if (o.length === 0) return false;
    let h = this.tilePosToCharacters.get(e, r);
    return !!(h && h.size > 0 && [...h].filter((p) => !s.has(p.getId())).filter((p) => !this.doIntersect(p.getCollisionGroups(), u)).some((p) => o.some((d) => p.getCollisionGroups().some((P2) => this.collidesWith(d, P2)))));
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
    e.tilePositionSet().pipe(dt2(this.charRemoved(e.getId()))).subscribe((r) => {
      this.deleteTilePositions(e.getNextTilePos(), e), this.addTilePositions(r, e);
    });
  }
  charRemoved(e) {
    var r;
    return (r = this.charRemoved$) == null ? void 0 : r.pipe(wt(1), xt2((o) => o == e));
  }
  addPositionChangeSub(e) {
    e.positionChangeStarted().pipe(dt2(this.charRemoved(e.getId())), this.posChangeToLayerPos()).subscribe((r) => {
      this.collistionStrategy === "BLOCK_ONE_TILE_AHEAD" && this.deleteTilePositions(r.exit, e), this.addTilePositions(r.enter, e);
    });
  }
  addPositionChangeFinishedSub(e) {
    e.positionChangeFinished().pipe(dt2(this.charRemoved(e.getId())), this.posChangeToLayerPos()).subscribe((r) => {
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
    return ha2(Pe2((e) => ({ enter: { position: new T(e.enterTile), layer: e.enterLayer }, exit: { position: new T(e.exitTile), layer: e.exitLayer } })));
  }
  posToString(e, r) {
    return `${e.x}#${e.y}#${r}`;
  }
};
var Oa2 = class {
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
var Xr2 = "ge_charLayer";
var Lh2 = 0;
var MT = 1;
var Ea2 = { none: 1, left: 2, "up-left": 3, up: 4, "up-right": 5, right: 6, "down-right": 7, down: 8, "down-left": 9 };
var On2 = class {
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
        let p = 0;
        !this.gridTilemap.hasNoTileUncached(new T(h, u), o == null ? void 0 : o.getName()) && (p = Da2(p, 0));
        for (let L of Ti2()) this.gridTilemap.hasBlockingTileUncached(new T(h, u), o == null ? void 0 : o.getName(), L, true) && (p = Da2(p, Ea2[L]));
        this.gridTilemap.hasBlockingTileUncached(new T(h, u), o == null ? void 0 : o.getName(), void 0, true) && (p = Da2(p, Ea2.none)), s[h][u] = p;
      }
    }
  }
  hasTileAt(e, r, o) {
    var h;
    let s = this.fixedLayer || this.tileCollisionCache.get(o), u = (h = s == null ? void 0 : s[e]) == null ? void 0 : h[r];
    if (u !== void 0) return Sn2(u, Lh2);
  }
  isBlockingFrom(e, r, o, s, u) {
    var d;
    let h = this.fixedLayer || this.tileCollisionCache.get(o), p = (d = h == null ? void 0 : h[e]) == null ? void 0 : d[r];
    if (p !== void 0) return !u && !Sn2(p, Lh2) ? true : s === void 0 ? Sn2(p, MT) : Sn2(p, Ea2[s]);
  }
};
function Da2(a5, e) {
  return a5 | 1 << e;
}
function Sn2(a5, e) {
  return (a5 >> e & 1) == 1;
}
var Sh2 = "ge_cost";
var Dn2 = class Dn3 {
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
    this.charBlockCache = new Ln2(o, s);
    for (let h of Ti2()) this.collidesPropNames.set(h, Dn3.ONE_WAY_COLLIDE_PROP_PREFIX + h), this.tileCostPropNames.set(h, `${Sh2}_${h}`);
    this.useTileCollisionCache && (this.tileCollisionCache = new On2(e, this), this.tileCollisionCache.rebuild());
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
    r === void 0 ? e.setTilePosition(Lt2(X({}, e.getNextTilePos()), { layer: this.getLowestCharLayer() })) : this.getCharLayerNames().includes(r) || console.warn(`Char layer '${r}' of character '${e.getId()}' is unknown.`), this.charBlockCache.addCharacter(e);
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
    if (this.transitions.size === 0) return;
    let o = this.transitions.get(e.toString());
    if (o) return o.get(r);
  }
  getReverseTransitions(e, r) {
    let o = this.reverseTransitions.get(e.toString());
    if (o) return o.get(r);
  }
  setTransition(e, r, o) {
    var s, u, h, p, d;
    this.transitions.has(e.toString()) || this.transitions.set(e.toString(), /* @__PURE__ */ new Map()), this.reverseTransitions.has(e.toString()) || this.reverseTransitions.set(e.toString(), /* @__PURE__ */ new Map()), (s = this.transitions.get(e.toString())) == null || s.set(r, o), (u = this.reverseTransitions.get(e.toString())) != null && u.has(o) || (h = this.reverseTransitions.get(e.toString())) == null || h.set(o, /* @__PURE__ */ new Set()), (d = (p = this.reverseTransitions.get(e.toString())) == null ? void 0 : p.get(o)) == null || d.add(r);
  }
  getTransitions() {
    return new Map([...this.transitions].map(([e, r]) => [e, new Map(r)]));
  }
  getTileCosts(e, r) {
    let o = this.getCollisionRelevantLayers(e.layer), s = 1;
    for (let u of o) s = Math.max(s, this.getTileCostsForLayer(Lt2(X({}, e), { layer: u.getName() }), r));
    return s;
  }
  getTileCostsForLayer(e, r) {
    let o = this.tilemap.getTileAt(e.position.x, e.position.y, e.layer);
    return r && (o == null ? void 0 : o.getProperty(this.tileCostPropNames.get(r) || "")) || (o == null ? void 0 : o.getProperty(Sh2)) || 1;
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
    return this.isIsometric() ? xl2(e) : e;
  }
  fromMapDirection(e) {
    return this.isIsometric() ? Vo2(e) : e;
  }
  isIsometric() {
    return this.tilemap.getOrientation() === "isometric";
  }
  getTilePosInDirection(e, r) {
    let o = e.position.add(Wt2(this.toMapDirection(r))), s = this.getTransition(o, e.layer) || e.layer;
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
    let r = this.getCharLayerIndexes(), o = this.tilemap.getLayers(), s = r.findIndex((u) => o[u].getProperty(Xr2) == e);
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
    for (let e of this.tilemap.getLayers()) if (e.isCharLayer()) return e.getProperty(Xr2);
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
    return this.tilemap.getLayers().filter((e) => e.isCharLayer()).map((e) => e.getProperty(Xr2)).filter(AT2);
  }
};
Dn2.ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
var En3 = Dn2;
function AT2(a5) {
  return a5 != null;
}
var Ia2 = ((r) => (r.REMOVED = "REMOVED", r.ADDED = "ADDED", r))(Ia2 || {});
var Oh2 = ((o) => (o.WAIT = "WAIT", o.SKIP = "SKIP", o.STOP = "STOP", o))(Oh2 || {});
var In2 = class {
  constructor(e, r) {
    this.character = e;
    this.tilemap = r;
    this.queue = new je();
    this.finished$ = new Z2();
    this.pathBlockedWaitElapsed = 0;
    this.distanceUtils = le2.create(e.getNumberOfDirections());
  }
  init() {
    this.character.autoMovementSet().pipe(xt2((e) => e !== this), wt(1)).subscribe(() => {
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
    for (let p of e) {
      let d = { command: p, config: o };
      if (Je2(p)) {
        this.queue.enqueue(d);
        continue;
      }
      let P2 = this.queue.peekEnd(), L = P2 == null ? void 0 : P2.command;
      if (L || (L = this.character.getNextTilePos()), Je2(L)) {
        this.queue.enqueue(d);
        continue;
      }
      let E = this.distanceUtils.distance(L.position, p.position) === 1;
      (!r.ignoreInvalidPositions || E) && this.queue.enqueue(d);
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
    if (Je2(o) && (o = this.tilemap.getTilePosInDirection(this.character.getNextTilePos(), o)), s.skipInvalidPositions) {
      if (o = this.getNextValidPosition(), !o) {
        this.finishInvalidNextPos(o);
        return;
      }
    } else if (!this.isNeighborPos(o)) {
      this.finishInvalidNextPos(o);
      return;
    }
    if (this.character.isBlockingDirection(Pt2(this.character.getNextTilePos().position, o.position))) {
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
      if (Je2(r) && (r = this.tilemap.getTilePosInDirection(this.character.getNextTilePos(), r)), r && this.isNeighborPos(r)) return r;
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
    return this.tilemap.fromMapDirection(Pt2(e, r));
  }
  posToStr(e) {
    return `(${e.position.x}, ${e.position.y}, ${e.layer})`;
  }
};
var RT2 = _n2.version;
var Mn2 = class {
  constructor(e = true) {
    this.isCreatedInternal = false;
    e && console.log(`Using GridEngine v${RT2}`);
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
    this.config = o, this.movementStopped$ = new Z2(), this.movementStarted$ = new Z2(), this.directionChanged$ = new Z2(), this.positionChangeStarted$ = new Z2(), this.positionChangeFinished$ = new Z2(), this.queueMovementFinished$ = new Z2(), this.charRemoved$ = new Z2(), this.charAdded$ = new Z2(), this.gridTilemap = new En3(e, this.config.collisionTilePropertyName, this.config.characterCollisionStrategy, this.recordToMap(this.config.collisionGroupRelation), this.config.cacheTileCollisions), this.addCharacters();
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
    let u = new Cn2(s, r, o);
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
    var p;
    let s = this.assembleMoveToConfig(o);
    this.initGuard();
    let u = (p = this.gridCharacters) == null ? void 0 : p.get(e);
    if (!u) throw this.createCharUnknownErr(e);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let h = new qr2(u, this.gridTilemap, { position: new T(r), layer: (o == null ? void 0 : o.targetLayer) || u.getNextTilePos().layer }, { distance: 0, config: s });
    return u.setMovement(h), h.init(), h.finishedObs().pipe(Pe2((d) => ({ charId: e, position: d.position, result: d.result, description: d.description, layer: d.layer, finishedEvent: d.finishedEvent })));
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
    var u, h, p, d, P2;
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();
    let r = { speed: e.speed || 4, tilemap: this.gridTilemap, collidesWithTiles: true, collisionGroups: ["geDefault"], ignoreCollisionGroups: [], charLayer: e.charLayer, facingDirection: e.facingDirection, labels: e.labels, numberOfDirections: (u = e.numberOfDirections) != null ? u : this.config.numberOfDirections, tileWidth: e.tileWidth, tileHeight: e.tileHeight };
    typeof e.collides == "boolean" ? e.collides === false && (r.collidesWithTiles = false, r.collisionGroups = []) : e.collides !== void 0 && (e.collides.collidesWithTiles === false && (r.collidesWithTiles = false), e.collides.collisionGroups && (r.collisionGroups = e.collides.collisionGroups), e.collides.ignoreCollisionGroups && (r.ignoreCollisionGroups = e.collides.ignoreCollisionGroups), r.ignoreMissingTiles = (p = (h = e.collides) == null ? void 0 : h.ignoreMissingTiles) != null ? p : false);
    let o = new ln2(e.id, r);
    e.startPosition && o.setTilePosition({ position: new T(e.startPosition), layer: o.getTilePos().layer }), (d = this.gridCharacters) == null || d.set(e.id, o), this.gridTilemap.addCharacter(o);
    let s = o.getId();
    o.movementStopped().pipe(dt2(this.charRemoved(s))).subscribe((L) => {
      var E;
      (E = this.movementStopped$) == null || E.next({ charId: s, direction: L });
    }), o.movementStarted().pipe(dt2(this.charRemoved(s))).subscribe((L) => {
      var E;
      (E = this.movementStarted$) == null || E.next({ charId: s, direction: L });
    }), o.directionChanged().pipe(dt2(this.charRemoved(s))).subscribe((L) => {
      var E;
      (E = this.directionChanged$) == null || E.next({ charId: s, direction: L });
    }), o.positionChangeStarted().pipe(dt2(this.charRemoved(s))).subscribe((L) => {
      var E;
      (E = this.positionChangeStarted$) == null || E.next(X({ charId: s }, L));
    }), o.positionChangeFinished().pipe(dt2(this.charRemoved(s))).subscribe((L) => {
      var E;
      (E = this.positionChangeFinished$) == null || E.next(X({ charId: s }, L));
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
    return (e ? _h2(r, e) : r).map((s) => s.getId());
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
    var P2, L, E, B, I, G, k, K2, nt;
    let u;
    o === void 0 ? u = { distance: 0, closestPointIfBlocked: false } : typeof o == "number" ? (u = { distance: o, closestPointIfBlocked: false }, s && (u.closestPointIfBlocked = true)) : u = o, this.initGuard();
    let h = (P2 = this.gridCharacters) == null ? void 0 : P2.get(e), p = (L = this.gridCharacters) == null ? void 0 : L.get(r);
    if (!h) throw this.createCharUnknownErr(e);
    if (!p) throw this.createCharUnknownErr(r);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let d = new wn2(h, this.gridTilemap, p, { distance: (E = u.distance) != null ? E : 0, noPathFoundStrategy: u.closestPointIfBlocked ? "CLOSEST_REACHABLE" : "STOP", maxPathLength: (B = u.maxPathLength) != null ? B : 1 / 0, shortestPathAlgorithm: (I = u.algorithm) != null ? I : "BIDIRECTIONAL_SEARCH", ignoreLayers: !!u.ignoreLayers, facingDirection: (G = u.facingDirection) != null ? G : "none", considerCosts: (k = u.considerCosts) != null ? k : false, isPositionAllowedFn: (K2 = u.isPositionAllowedFn) != null ? K2 : (() => true), ignoredChars: (nt = u.ignoredChars) != null ? nt : [] });
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
    let d = new Yr2(this.gridTilemap).findShortestPath(W2.toInternal(e), W2.toInternal(r), Lt2(X({}, o), { shortestPathAlgorithm: s }));
    return { path: d.path.map(W2.fromInternal), closestToTarget: d.closestToTarget ? W2.fromInternal(d.closestToTarget) : void 0, reachedMaxPathLength: false, steps: d.steps };
  }
  steppedOn(e, r, o) {
    return this.positionChangeFinished().pipe(xt2((s) => e.includes(s.charId) && r.some((u) => u.x === s.enterTile.x && u.y === s.enterTile.y) && (o === void 0 || o.includes(s.enterLayer))));
  }
  characterShifted() {
    if (!this.charAdded$ || !this.charRemoved$) throw this.createUninitializedErr();
    return this.charAdded$.pipe(Pe2((e) => ({ charId: e, action: "ADDED" })), da2(this.charRemoved$.pipe(Pe2((e) => ({ charId: e, action: "REMOVED" })))));
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
    var h, p;
    this.initGuard();
    let s = (h = this.gridCharacters) == null ? void 0 : h.get(e);
    if (!s) throw this.createCharUnknownErr(e);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let u;
    ((p = s == null ? void 0 : s.getMovement()) == null ? void 0 : p.getInfo().type) === "Queue" ? u = s.getMovement() : (u = new In2(s, this.gridTilemap), s.setMovement(u), u.init(), u.finished().pipe(dt2(ma2(this.charRemoved(e), s.autoMovementSet()))).subscribe((d) => {
      var P2;
      (P2 = this.queueMovementFinished$) == null || P2.next(X({ charId: e }, d));
    })), u.enqueue(r.map((d) => Je2(d) ? d : { position: new T(d.position), layer: d.charLayer }), o);
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
    return ((s = r.getMovement()) == null ? void 0 : s.getInfo().type) === "Queue" ? r.getMovement().peekAll().map((h) => ({ command: Je2(h.command) ? h.command : W2.fromInternal(h.command), config: h.config })) : [];
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
    if (this.gridCharacters) for (let [r, o] of this.gridCharacters.entries()) e.push({ id: r, position: W2.fromInternal(o.getTilePos()), facingDirection: o.getFacingDirection(), speed: o.getSpeed(), labels: o.getLabels(), movementProgress: o.getMovementProgress(), collisionConfig: { collisionGroups: o.getCollisionGroups(), ignoreCollisionGroups: o.getIgnoreCollisionGroups(), collidesWithTiles: o.collidesWithTiles(), ignoreMissingTiles: o.getIgnoreMissingTiles() } });
    return { characters: e };
  }
  setState(e) {
    if (this.gridCharacters) for (let r of e.characters) {
      let o = this.gridCharacters.get(r.id);
      if (o) {
        let s = o.getTilePos();
        W2.equal(s, W2.toInternal(r.position)) || o.setTilePosition(W2.toInternal(r.position)), o.setSpeed(r.speed), o.turnTowards(r.facingDirection), r.collisionConfig.collisionGroups && o.setCollisionGroups(r.collisionConfig.collisionGroups), r.collisionConfig.collidesWithTiles !== void 0 && o.setCollidesWithTiles(r.collisionConfig.collidesWithTiles), r.collisionConfig.ignoreMissingTiles !== void 0 && o.setIgnoreMissingTiles(r.collisionConfig.ignoreMissingTiles), o.setMovementProgress(r.movementProgress), o.clearLabels(), o.addLabels(r.labels);
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
    return (r = this.charRemoved$) == null ? void 0 : r.pipe(wt(1), xt2((o) => o == e));
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
      if (!((u = this.gridTilemap) != null && u.isIsometric()) && pr2(r)) {
        console.warn(`GridEngine: Character '${e}' can't be moved '${r}' in 4 direction mode.`);
        return;
      } else if ((h = this.gridTilemap) != null && h.isIsometric() && !pr2(r)) {
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
    let r = Lt2(X({}, e), { noPathFoundStrategy: "STOP", pathBlockedStrategy: "WAIT" });
    return e != null && e.noPathFoundStrategy && (Object.values(Br2).includes(e.noPathFoundStrategy) ? r.noPathFoundStrategy = e.noPathFoundStrategy : console.warn(`GridEngine: Unknown NoPathFoundStrategy '${e.noPathFoundStrategy}'. Falling back to 'STOP'`)), e != null && e.pathBlockedStrategy && (Object.values(Si2).includes(e.pathBlockedStrategy) ? r.pathBlockedStrategy = e.pathBlockedStrategy : console.warn(`GridEngine: Unknown PathBlockedStrategy '${e.pathBlockedStrategy}'. Falling back to 'WAIT'`)), r;
  }
  setConfigDefaults(e) {
    return X({ collisionTilePropertyName: "ge_collide", numberOfDirections: 4, characterCollisionStrategy: "BLOCK_TWO_TILES", cacheTileCollisions: false }, e);
  }
};
var An2 = class extends $r2 {
  constructor(r, o = {}) {
    super(r, o);
    this.jumpCache = new Rn2();
  }
  findShortestPathImpl(r, o) {
    return this.jumpCache = new Rn2(), super.findShortestPathImpl(r, o);
  }
  getNeighborsInternal(r, o, s) {
    if (!o || r.layer !== o.layer) return this.getNeighbors(r, s).map((p) => ({ p, dist: 1 }));
    let u = this.prune(o, r).map((p) => {
      let d = this.getTransition(p.position, r.layer);
      return { position: p.position, layer: d || r.layer };
    }), h = [];
    for (let p of u) {
      let d = this.jump(r, p, s, 1, Pt2(r.position, p.position));
      d && (d.dist = this.distance(r.position, d.p.position), h.push(d));
    }
    return h;
  }
  getForced(r, o) {
    let s = [], { topLeft: u, downLeft: h, top: p, bottom: d, topRight: P2, downRight: L } = this.normalizedPositions(r, o), E = Pt2(r.position, o.position);
    return pr2(E) ? (this.blockOrTrans(r, u) && (this.addIfNotBlocked(s, o, p), this.addIfNotBlocked(s, o, P2), this.blockOrTrans(h, u) && this.addIfNotBlocked(s, o, u)), this.blockOrTrans(r, h) && (this.addIfNotBlocked(s, o, d), this.addIfNotBlocked(s, o, L), this.blockOrTrans(u, h) && this.addIfNotBlocked(s, o, h)), this.blockOrTrans(u, p) && this.addIfNotBlocked(s, o, p), this.blockOrTrans(h, d) && this.addIfNotBlocked(s, o, d), this.blockOrTrans(u, P2) && this.addIfNotBlocked(s, o, P2), this.blockOrTrans(h, L) && this.addIfNotBlocked(s, o, L)) : ((this.blockOrTrans(r, p) || this.blockOrTrans(p, P2)) && this.addIfNotBlocked(s, o, P2), (this.blockOrTrans(r, d) || this.blockOrTrans(d, L)) && this.addIfNotBlocked(s, o, L), this.blockOrTrans(r, u) && this.blockOrTrans(r, p) && (this.addIfNotBlocked(s, o, p), this.addIfNotBlocked(s, o, u)), this.blockOrTrans(r, h) && this.blockOrTrans(r, d) && (this.addIfNotBlocked(s, o, d), this.addIfNotBlocked(s, o, h)), this.blockOrTrans(u, p) && this.blockOrTrans(r, p) && this.addIfNotBlocked(s, o, p), this.blockOrTrans(h, d) && this.blockOrTrans(r, d) && this.addIfNotBlocked(s, o, d)), s;
  }
  hasForced(r, o) {
    let { topLeft: s, downLeft: u, top: h, bottom: p, topRight: d, downRight: P2 } = this.normalizedPositions(r, o), L = Pt2(r.position, o.position);
    if (pr2(L)) {
      if (this.blockOrTrans(r, s) && (!this.blockOrTrans(o, h) || !this.blockOrTrans(o, d) || this.blockOrTrans(u, s) && !this.blockOrTrans(o, s)) || this.blockOrTrans(r, u) && (!this.blockOrTrans(o, p) || !this.blockOrTrans(o, P2) || this.blockOrTrans(s, u) && !this.blockOrTrans(o, u)) || this.blockOrTrans(s, h) && !this.blockOrTrans(o, h) || this.blockOrTrans(u, p) && !this.blockOrTrans(o, p) || this.blockOrTrans(s, d) && !this.blockOrTrans(o, d) || this.blockOrTrans(u, P2) && !this.blockOrTrans(o, P2)) return true;
    } else if ((this.blockOrTrans(r, h) || this.blockOrTrans(h, d)) && !this.blockOrTrans(o, d) || (this.blockOrTrans(r, p) || this.blockOrTrans(p, P2)) && !this.blockOrTrans(o, P2) || this.blockOrTrans(r, s) && this.blockOrTrans(r, h) && (!this.blockOrTrans(o, h) || !this.blockOrTrans(o, s)) || this.blockOrTrans(r, u) && this.blockOrTrans(r, p) && (!this.blockOrTrans(o, p) || !this.blockOrTrans(o, u)) || this.blockOrTrans(s, h) && this.blockOrTrans(r, h) && !this.blockOrTrans(o, h) || this.blockOrTrans(u, p) && this.blockOrTrans(r, p) && !this.blockOrTrans(o, p)) return true;
    return false;
  }
  prune(r, o) {
    let { top: s, right: u, topRight: h, downRight: p, bottom: d } = this.normalizedPositions(r, o), P2 = this.getForced(r, o), L = Pt2(r.position, o.position);
    return pr2(L) ? [s, u, h, p, d, ...P2] : [u, ...P2];
  }
  jump(r, o, s, u, h) {
    let p = this.jumpCache.get(r, o);
    if (p !== null) return p;
    if (this.isBlocking(r, o) && !(W2.equal(o, s) && this.options.ignoreBlockedTarget)) {
      this.jumpCache.set(r, o, void 0);
      return;
    }
    if (W2.equal(o, s)) return this.jumpCache.set(r, o, { p: o, dist: 0 }), { p: o, dist: 0 };
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
var Rn2 = class {
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
    let p = h.get(r.position.x);
    p || (p = /* @__PURE__ */ new Map(), h.set(r.position.x, p));
    let d = p.get(r.position.y);
    d || (d = /* @__PURE__ */ new Map(), p.set(r.position.y, d)), d.get(r.layer) || (o === void 0 ? d.set(r.layer, null) : d.set(r.layer, o));
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
    let p = h.get(r.position.y);
    if (!p) return null;
    let d = p.get(r.layer);
    return d === void 0 ? null : d === null ? void 0 : d;
  }
};
var Yr2 = class {
  constructor(e) {
    this.gridTilemap = e;
  }
  findShortestPath(e, r, o = {}) {
    return FT2(o.shortestPathAlgorithm || "BIDIRECTIONAL_SEARCH", this.gridTilemap, o).findShortestPath(e, r);
  }
};
function FT2(a5, e, r) {
  switch (a5) {
    case "BIDIRECTIONAL_SEARCH":
      return new xn2(e, r);
    case "A_STAR":
      return new bn2(e, r);
    case "JPS":
      return r.numberOfDirections === 8 ? new An2(e, r) : new $r2(e, r);
  }
  return new zr2(e, r);
}
var Ma2 = ((d) => (d.SUCCESS = "SUCCESS", d.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED", d.PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED", d.PATH_BLOCKED = "PATH_BLOCKED", d.NO_PATH_FOUND = "NO_PATH_FOUND", d.PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT", d.MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED", d.MAX_PATH_LENGTH_REACHED = "MAX_PATH_LENGTH_REACHED", d))(Ma2 || {});
var qr2 = class {
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
    this.isBlocking = (e2, r2) => e2 ? new zr2(this.tilemap, this.getPathfindingOptions()).isBlocking(this.character.getTilePos(), { position: e2, layer: r2 }) : true;
    var p, d;
    this.shortestPathAlgorithm = (p = s == null ? void 0 : s.algorithm) != null ? p : this.shortestPathAlgorithm, this.ignoreBlockedTarget = u, this.distance = h, this.noPathFoundStrategy = (s == null ? void 0 : s.noPathFoundStrategy) || "STOP", this.pathBlockedStrategy = (s == null ? void 0 : s.pathBlockedStrategy) || "WAIT", this.noPathFoundRetryable = new Li2((s == null ? void 0 : s.noPathFoundRetryBackoffMs) || 200, (s == null ? void 0 : s.noPathFoundMaxRetries) || -1, () => {
      this.stop("NO_PATH_FOUND_MAX_RETRIES_EXCEEDED");
    }), this.pathBlockedRetryable = new Li2((s == null ? void 0 : s.pathBlockedRetryBackoffMs) || 200, (s == null ? void 0 : s.pathBlockedMaxRetries) || -1, () => {
      this.stop("PATH_BLOCKED_MAX_RETRIES_EXCEEDED");
    }), s != null && s.isPositionAllowedFn && (this.isPositionAllowed = s.isPositionAllowedFn), s != null && s.maxPathLength && (this.maxPathLength = s.maxPathLength), this.alternativeTargets = s == null ? void 0 : s.alternativeTargets, this.noPathFoundAlternativeTargetsFallbackStrategy = s == null ? void 0 : s.noPathFoundAlternativeTargetsFallbackStrategy, s != null && s.considerCosts && this.shortestPathAlgorithm !== "A_STAR" && console.warn(`GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.shortestPathAlgorithm}'. It can only be used with A* algorithm.`), this.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1) && console.warn("GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1"), this.considerCosts = (s == null ? void 0 : s.considerCosts) || false, this.ignoreLayers = !!(s != null && s.ignoreLayers), this.distanceUtils = le2.create(e.getNumberOfDirections()), this.pathBlockedWaitTimeoutMs = (s == null ? void 0 : s.pathBlockedWaitTimeoutMs) || -1, this.ignoredChars = (d = s == null ? void 0 : s.ignoredChars) != null ? d : [], this.emitFinishedEvent = (s == null ? void 0 : s.emitFinishedEvent) || "START_MOVEMENT", this.finished$ = new Z2();
  }
  init() {
    this.noPathFoundRetryable.reset(), this.pathBlockedRetryable.reset(), this.pathBlockedWaitElapsed = 0, this.calcShortestPath(), this.character.autoMovementSet().pipe(xt2((e) => e !== this), wt(1)).subscribe(() => {
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
    return { type: "Target", state: { pathAhead: this.shortestPath.slice(this.posOnPath).map((e) => W2.fromInternal(e)) }, config: { algorithm: this.shortestPathAlgorithm, ignoreBlockedTarget: this.ignoreBlockedTarget, distance: this.distance, targetPos: W2.fromInternal(this.targetPos), noPathFoundStrategy: this.noPathFoundStrategy, pathBlockedStrategy: this.pathBlockedStrategy, noPathFoundRetryBackoffMs: this.noPathFoundRetryable.getBackoffMs(), noPathFoundMaxRetries: this.noPathFoundRetryable.getMaxRetries() } };
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
      this.finished$.next(Lt2(X({}, r), { finishedEvent: "END_MOVEMENT" })), this.finished$.complete();
    }) : this.emitFinishedEvent === "BOTH" && (this.finished$.next(r), this.character.movementStopped().pipe(wt(1)).subscribe(() => {
      this.finished$.next(Lt2(X({}, r), { finishedEvent: "END_MOVEMENT" })), this.finished$.complete();
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
    let e = new Yr2(this.tilemap), { path: r, closestToTarget: o } = e.findShortestPath(this.character.getNextTilePos(), this.targetPos, this.getPathfindingOptions());
    if (r.length == 0) {
      if (this.noPathFoundStrategy === "CLOSEST_REACHABLE") {
        if (!o) throw Error("ClosestToTarget should never be undefined in TargetMovement.");
        return this.pathToAlternativeTarget(o, e);
      } else if (this.noPathFoundStrategy === "ALTERNATIVE_TARGETS") {
        for (let h of (u = this.alternativeTargets) != null ? u : []) {
          let { path: p, distOffset: d } = this.pathToAlternativeTarget(W2.toInternal(h), e);
          if (p.length > 0) return { path: p, distOffset: d };
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
var kT2 = Object.create;
var Dh2 = Object.defineProperty;
var VT2 = Object.getOwnPropertyDescriptor;
var NT2 = Object.getOwnPropertyNames;
var GT2 = Object.getPrototypeOf;
var jT2 = Object.prototype.hasOwnProperty;
var UT2 = (a5, e) => () => (e || a5((e = { exports: {} }).exports, e), e.exports);
var HT2 = (a5, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (let s of NT2(e)) !jT2.call(a5, s) && s !== r && Dh2(a5, s, { get: () => e[s], enumerable: !(o = VT2(e, s)) || o.enumerable });
  return a5;
};
var Ra2 = (a5, e, r) => (r = a5 != null ? kT2(GT2(a5)) : {}, HT2(e || !a5 || !a5.__esModule ? Dh2(r, "default", { value: a5, enumerable: true }) : r, a5));
var Fa2 = UT2((a5, e) => {
  (function() {
    var r, o = "4.17.21", s = 200, u = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", h = "Expected a function", p = "Invalid `variable` option passed into `_.template`", d = "__lodash_hash_undefined__", P2 = 500, L = "__lodash_placeholder__", E = 1, B = 2, I = 4, G = 1, k = 2, K2 = 1, nt = 2, $t = 4, bt = 8, fe = 16, pe = 32, xr = 64, Se = 128, Qr = 256, Vn = 512, Rh2 = 30, Fh = "...", kh = 800, Vh = 16, ja = 1, Nh = 2, Gh = 3, ir = 1 / 0, Ue = 9007199254740991, jh = 17976931348623157e292, Hi = NaN, me = 4294967295, Uh = me - 1, Hh = me >>> 1, Bh = [["ary", Se], ["bind", K2], ["bindKey", nt], ["curry", bt], ["curryRight", fe], ["flip", Vn], ["partial", pe], ["partialRight", xr], ["rearg", Qr]], wr = "[object Arguments]", Bi = "[object Array]", Wh = "[object AsyncFunction]", Kr = "[object Boolean]", Jr = "[object Date]", zh = "[object DOMException]", Wi = "[object Error]", zi = "[object Function]", Ua = "[object GeneratorFunction]", ie = "[object Map]", Zr = "[object Number]", $h = "[object Null]", Oe = "[object Object]", Ha = "[object Promise]", qh = "[object Proxy]", ti = "[object RegExp]", oe = "[object Set]", ei = "[object String]", $i = "[object Symbol]", Xh = "[object Undefined]", ri = "[object WeakMap]", Yh = "[object WeakSet]", ii = "[object ArrayBuffer]", Cr = "[object DataView]", Nn = "[object Float32Array]", Gn = "[object Float64Array]", jn = "[object Int8Array]", Un = "[object Int16Array]", Hn = "[object Int32Array]", Bn = "[object Uint8Array]", Wn = "[object Uint8ClampedArray]", zn = "[object Uint16Array]", $n = "[object Uint32Array]", Qh = /\b__p \+= '';/g, Kh = /\b(__p \+=) '' \+/g, Jh = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ba = /&(?:amp|lt|gt|quot|#39);/g, Wa = /[&<>"']/g, Zh = RegExp(Ba.source), tf = RegExp(Wa.source), ef = /<%-([\s\S]+?)%>/g, rf = /<%([\s\S]+?)%>/g, za = /<%=([\s\S]+?)%>/g, of = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, nf = /^\w*$/, sf = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, qn = /[\\^$.*+?()[\]{}|]/g, af = RegExp(qn.source), Xn = /^\s+/, uf = /\s/, cf = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, lf = /\{\n\/\* \[wrapped with (.+)\] \*/, hf = /,? & /, ff = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, pf = /[()=,{}\[\]\/\s]/, mf = /\\(\\)?/g, df = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, $a = /\w*$/, gf = /^[-+]0x[0-9a-f]+$/i, yf = /^0b[01]+$/i, vf = /^\[object .+?Constructor\]$/, bf = /^0o[0-7]+$/i, Tf = /^(?:0|[1-9]\d*)$/, Pf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, qi = /($^)/, xf = /['\n\r\u2028\u2029\\]/g, Xi = "\\ud800-\\udfff", wf = "\\u0300-\\u036f", Cf = "\\ufe20-\\ufe2f", _f = "\\u20d0-\\u20ff", qa = wf + Cf + _f, Xa = "\\u2700-\\u27bf", Ya = "a-z\\xdf-\\xf6\\xf8-\\xff", Lf = "\\xac\\xb1\\xd7\\xf7", Sf = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Of = "\\u2000-\\u206f", Ef = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Qa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ka = "\\ufe0e\\ufe0f", Ja = Lf + Sf + Of + Ef, Yn = "['\u2019]", Df = "[" + Xi + "]", Za = "[" + Ja + "]", Yi = "[" + qa + "]", tu = "\\d+", If = "[" + Xa + "]", eu = "[" + Ya + "]", ru = "[^" + Xi + Ja + tu + Xa + Ya + Qa + "]", Qn = "\\ud83c[\\udffb-\\udfff]", Mf = "(?:" + Yi + "|" + Qn + ")", iu = "[^" + Xi + "]", Kn = "(?:\\ud83c[\\udde6-\\uddff]){2}", Jn = "[\\ud800-\\udbff][\\udc00-\\udfff]", _r = "[" + Qa + "]", ou = "\\u200d", nu = "(?:" + eu + "|" + ru + ")", Af = "(?:" + _r + "|" + ru + ")", su = "(?:" + Yn + "(?:d|ll|m|re|s|t|ve))?", au = "(?:" + Yn + "(?:D|LL|M|RE|S|T|VE))?", uu = Mf + "?", cu = "[" + Ka + "]?", Rf = "(?:" + ou + "(?:" + [iu, Kn, Jn].join("|") + ")" + cu + uu + ")*", Ff = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", kf = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", lu = cu + uu + Rf, Vf = "(?:" + [If, Kn, Jn].join("|") + ")" + lu, Nf = "(?:" + [iu + Yi + "?", Yi, Kn, Jn, Df].join("|") + ")", Gf = RegExp(Yn, "g"), jf = RegExp(Yi, "g"), Zn = RegExp(Qn + "(?=" + Qn + ")|" + Nf + lu, "g"), Uf = RegExp([_r + "?" + eu + "+" + su + "(?=" + [Za, _r, "$"].join("|") + ")", Af + "+" + au + "(?=" + [Za, _r + nu, "$"].join("|") + ")", _r + "?" + nu + "+" + su, _r + "+" + au, kf, Ff, tu, Vf].join("|"), "g"), Hf = RegExp("[" + ou + Xi + qa + Ka + "]"), Bf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Wf = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], zf = -1, st = {};
    st[Nn] = st[Gn] = st[jn] = st[Un] = st[Hn] = st[Bn] = st[Wn] = st[zn] = st[$n] = true, st[wr] = st[Bi] = st[ii] = st[Kr] = st[Cr] = st[Jr] = st[Wi] = st[zi] = st[ie] = st[Zr] = st[Oe] = st[ti] = st[oe] = st[ei] = st[ri] = false;
    var ot = {};
    ot[wr] = ot[Bi] = ot[ii] = ot[Cr] = ot[Kr] = ot[Jr] = ot[Nn] = ot[Gn] = ot[jn] = ot[Un] = ot[Hn] = ot[ie] = ot[Zr] = ot[Oe] = ot[ti] = ot[oe] = ot[ei] = ot[$i] = ot[Bn] = ot[Wn] = ot[zn] = ot[$n] = true, ot[Wi] = ot[zi] = ot[ri] = false;
    var $f = { \u00C0: "A", \u00C1: "A", \u00C2: "A", \u00C3: "A", \u00C4: "A", \u00C5: "A", \u00E0: "a", \u00E1: "a", \u00E2: "a", \u00E3: "a", \u00E4: "a", \u00E5: "a", \u00C7: "C", \u00E7: "c", \u00D0: "D", \u00F0: "d", \u00C8: "E", \u00C9: "E", \u00CA: "E", \u00CB: "E", \u00E8: "e", \u00E9: "e", \u00EA: "e", \u00EB: "e", \u00CC: "I", \u00CD: "I", \u00CE: "I", \u00CF: "I", \u00EC: "i", \u00ED: "i", \u00EE: "i", \u00EF: "i", \u00D1: "N", \u00F1: "n", \u00D2: "O", \u00D3: "O", \u00D4: "O", \u00D5: "O", \u00D6: "O", \u00D8: "O", \u00F2: "o", \u00F3: "o", \u00F4: "o", \u00F5: "o", \u00F6: "o", \u00F8: "o", \u00D9: "U", \u00DA: "U", \u00DB: "U", \u00DC: "U", \u00F9: "u", \u00FA: "u", \u00FB: "u", \u00FC: "u", \u00DD: "Y", \u00FD: "y", \u00FF: "y", \u00C6: "Ae", \u00E6: "ae", \u00DE: "Th", \u00FE: "th", \u00DF: "ss", \u0100: "A", \u0102: "A", \u0104: "A", \u0101: "a", \u0103: "a", \u0105: "a", \u0106: "C", \u0108: "C", \u010A: "C", \u010C: "C", \u0107: "c", \u0109: "c", \u010B: "c", \u010D: "c", \u010E: "D", \u0110: "D", \u010F: "d", \u0111: "d", \u0112: "E", \u0114: "E", \u0116: "E", \u0118: "E", \u011A: "E", \u0113: "e", \u0115: "e", \u0117: "e", \u0119: "e", \u011B: "e", \u011C: "G", \u011E: "G", \u0120: "G", \u0122: "G", \u011D: "g", \u011F: "g", \u0121: "g", \u0123: "g", \u0124: "H", \u0126: "H", \u0125: "h", \u0127: "h", \u0128: "I", \u012A: "I", \u012C: "I", \u012E: "I", \u0130: "I", \u0129: "i", \u012B: "i", \u012D: "i", \u012F: "i", \u0131: "i", \u0134: "J", \u0135: "j", \u0136: "K", \u0137: "k", \u0138: "k", \u0139: "L", \u013B: "L", \u013D: "L", \u013F: "L", \u0141: "L", \u013A: "l", \u013C: "l", \u013E: "l", \u0140: "l", \u0142: "l", \u0143: "N", \u0145: "N", \u0147: "N", \u014A: "N", \u0144: "n", \u0146: "n", \u0148: "n", \u014B: "n", \u014C: "O", \u014E: "O", \u0150: "O", \u014D: "o", \u014F: "o", \u0151: "o", \u0154: "R", \u0156: "R", \u0158: "R", \u0155: "r", \u0157: "r", \u0159: "r", \u015A: "S", \u015C: "S", \u015E: "S", \u0160: "S", \u015B: "s", \u015D: "s", \u015F: "s", \u0161: "s", \u0162: "T", \u0164: "T", \u0166: "T", \u0163: "t", \u0165: "t", \u0167: "t", \u0168: "U", \u016A: "U", \u016C: "U", \u016E: "U", \u0170: "U", \u0172: "U", \u0169: "u", \u016B: "u", \u016D: "u", \u016F: "u", \u0171: "u", \u0173: "u", \u0174: "W", \u0175: "w", \u0176: "Y", \u0177: "y", \u0178: "Y", \u0179: "Z", \u017B: "Z", \u017D: "Z", \u017A: "z", \u017C: "z", \u017E: "z", \u0132: "IJ", \u0133: "ij", \u0152: "Oe", \u0153: "oe", \u0149: "'n", \u017F: "s" }, qf = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Xf = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Yf = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, Qf = parseFloat, Kf = parseInt, hu = typeof global == "object" && global && global.Object === Object && global, Jf = typeof self == "object" && self && self.Object === Object && self, gt = hu || Jf || Function("return this")(), ts = typeof a5 == "object" && a5 && !a5.nodeType && a5, or = ts && typeof e == "object" && e && !e.nodeType && e, fu = or && or.exports === ts, es = fu && hu.process, qt = (function() {
      try {
        var v = or && or.require && or.require("util").types;
        return v || es && es.binding && es.binding("util");
      } catch (w) {
      }
    })(), pu = qt && qt.isArrayBuffer, mu = qt && qt.isDate, du = qt && qt.isMap, gu = qt && qt.isRegExp, yu = qt && qt.isSet, vu = qt && qt.isTypedArray;
    function Nt(v, w, x) {
      switch (x.length) {
        case 0:
          return v.call(w);
        case 1:
          return v.call(w, x[0]);
        case 2:
          return v.call(w, x[0], x[1]);
        case 3:
          return v.call(w, x[0], x[1], x[2]);
      }
      return v.apply(w, x);
    }
    function Zf(v, w, x, D) {
      for (var V = -1, J = v == null ? 0 : v.length; ++V < J; ) {
        var pt = v[V];
        w(D, pt, x(pt), v);
      }
      return D;
    }
    function Xt(v, w) {
      for (var x = -1, D = v == null ? 0 : v.length; ++x < D && w(v[x], x, v) !== false; ) ;
      return v;
    }
    function tp(v, w) {
      for (var x = v == null ? 0 : v.length; x-- && w(v[x], x, v) !== false; ) ;
      return v;
    }
    function bu(v, w) {
      for (var x = -1, D = v == null ? 0 : v.length; ++x < D; ) if (!w(v[x], x, v)) return false;
      return true;
    }
    function He(v, w) {
      for (var x = -1, D = v == null ? 0 : v.length, V = 0, J = []; ++x < D; ) {
        var pt = v[x];
        w(pt, x, v) && (J[V++] = pt);
      }
      return J;
    }
    function Qi(v, w) {
      var x = v == null ? 0 : v.length;
      return !!x && Lr(v, w, 0) > -1;
    }
    function rs(v, w, x) {
      for (var D = -1, V = v == null ? 0 : v.length; ++D < V; ) if (x(w, v[D])) return true;
      return false;
    }
    function at(v, w) {
      for (var x = -1, D = v == null ? 0 : v.length, V = Array(D); ++x < D; ) V[x] = w(v[x], x, v);
      return V;
    }
    function Be(v, w) {
      for (var x = -1, D = w.length, V = v.length; ++x < D; ) v[V + x] = w[x];
      return v;
    }
    function is(v, w, x, D) {
      var V = -1, J = v == null ? 0 : v.length;
      for (D && J && (x = v[++V]); ++V < J; ) x = w(x, v[V], V, v);
      return x;
    }
    function ep(v, w, x, D) {
      var V = v == null ? 0 : v.length;
      for (D && V && (x = v[--V]); V--; ) x = w(x, v[V], V, v);
      return x;
    }
    function os(v, w) {
      for (var x = -1, D = v == null ? 0 : v.length; ++x < D; ) if (w(v[x], x, v)) return true;
      return false;
    }
    var rp = ns("length");
    function ip(v) {
      return v.split("");
    }
    function op(v) {
      return v.match(ff) || [];
    }
    function Tu(v, w, x) {
      var D;
      return x(v, function(V, J, pt) {
        if (w(V, J, pt)) return D = J, false;
      }), D;
    }
    function Ki(v, w, x, D) {
      for (var V = v.length, J = x + (D ? 1 : -1); D ? J-- : ++J < V; ) if (w(v[J], J, v)) return J;
      return -1;
    }
    function Lr(v, w, x) {
      return w === w ? gp(v, w, x) : Ki(v, Pu, x);
    }
    function np(v, w, x, D) {
      for (var V = x - 1, J = v.length; ++V < J; ) if (D(v[V], w)) return V;
      return -1;
    }
    function Pu(v) {
      return v !== v;
    }
    function xu(v, w) {
      var x = v == null ? 0 : v.length;
      return x ? as(v, w) / x : Hi;
    }
    function ns(v) {
      return function(w) {
        return w == null ? r : w[v];
      };
    }
    function ss(v) {
      return function(w) {
        return v == null ? r : v[w];
      };
    }
    function wu(v, w, x, D, V) {
      return V(v, function(J, pt, it) {
        x = D ? (D = false, J) : w(x, J, pt, it);
      }), x;
    }
    function sp(v, w) {
      var x = v.length;
      for (v.sort(w); x--; ) v[x] = v[x].value;
      return v;
    }
    function as(v, w) {
      for (var x, D = -1, V = v.length; ++D < V; ) {
        var J = w(v[D]);
        J !== r && (x = x === r ? J : x + J);
      }
      return x;
    }
    function us(v, w) {
      for (var x = -1, D = Array(v); ++x < v; ) D[x] = w(x);
      return D;
    }
    function ap(v, w) {
      return at(w, function(x) {
        return [x, v[x]];
      });
    }
    function Cu(v) {
      return v && v.slice(0, Ou(v) + 1).replace(Xn, "");
    }
    function Gt(v) {
      return function(w) {
        return v(w);
      };
    }
    function cs(v, w) {
      return at(w, function(x) {
        return v[x];
      });
    }
    function oi(v, w) {
      return v.has(w);
    }
    function _u(v, w) {
      for (var x = -1, D = v.length; ++x < D && Lr(w, v[x], 0) > -1; ) ;
      return x;
    }
    function Lu(v, w) {
      for (var x = v.length; x-- && Lr(w, v[x], 0) > -1; ) ;
      return x;
    }
    function up(v, w) {
      for (var x = v.length, D = 0; x--; ) v[x] === w && ++D;
      return D;
    }
    var cp = ss($f), lp = ss(qf);
    function hp(v) {
      return "\\" + Yf[v];
    }
    function fp(v, w) {
      return v == null ? r : v[w];
    }
    function Sr(v) {
      return Hf.test(v);
    }
    function pp(v) {
      return Bf.test(v);
    }
    function mp(v) {
      for (var w, x = []; !(w = v.next()).done; ) x.push(w.value);
      return x;
    }
    function ls(v) {
      var w = -1, x = Array(v.size);
      return v.forEach(function(D, V) {
        x[++w] = [V, D];
      }), x;
    }
    function Su(v, w) {
      return function(x) {
        return v(w(x));
      };
    }
    function We(v, w) {
      for (var x = -1, D = v.length, V = 0, J = []; ++x < D; ) {
        var pt = v[x];
        (pt === w || pt === L) && (v[x] = L, J[V++] = x);
      }
      return J;
    }
    function Ji(v) {
      var w = -1, x = Array(v.size);
      return v.forEach(function(D) {
        x[++w] = D;
      }), x;
    }
    function dp(v) {
      var w = -1, x = Array(v.size);
      return v.forEach(function(D) {
        x[++w] = [D, D];
      }), x;
    }
    function gp(v, w, x) {
      for (var D = x - 1, V = v.length; ++D < V; ) if (v[D] === w) return D;
      return -1;
    }
    function yp(v, w, x) {
      for (var D = x + 1; D--; ) if (v[D] === w) return D;
      return D;
    }
    function Or(v) {
      return Sr(v) ? bp(v) : rp(v);
    }
    function ne(v) {
      return Sr(v) ? Tp(v) : ip(v);
    }
    function Ou(v) {
      for (var w = v.length; w-- && uf.test(v.charAt(w)); ) ;
      return w;
    }
    var vp = ss(Xf);
    function bp(v) {
      for (var w = Zn.lastIndex = 0; Zn.test(v); ) ++w;
      return w;
    }
    function Tp(v) {
      return v.match(Zn) || [];
    }
    function Pp(v) {
      return v.match(Uf) || [];
    }
    var xp = function v(w) {
      w = w == null ? gt : ze.defaults(gt.Object(), w, ze.pick(gt, Wf));
      var x = w.Array, D = w.Date, V = w.Error, J = w.Function, pt = w.Math, it = w.Object, hs = w.RegExp, wp = w.String, Yt = w.TypeError, Zi = x.prototype, Cp = J.prototype, Er = it.prototype, to = w["__core-js_shared__"], eo = Cp.toString, et = Er.hasOwnProperty, _p = 0, Eu = (function() {
        var t = /[^.]+$/.exec(to && to.keys && to.keys.IE_PROTO || "");
        return t ? "Symbol(src)_1." + t : "";
      })(), ro = Er.toString, Lp = eo.call(it), Sp = gt._, Op = hs("^" + eo.call(et).replace(qn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), io = fu ? w.Buffer : r, $e = w.Symbol, oo = w.Uint8Array, Du = io ? io.allocUnsafe : r, no = Su(it.getPrototypeOf, it), Iu = it.create, Mu = Er.propertyIsEnumerable, so = Zi.splice, Au = $e ? $e.isConcatSpreadable : r, ni = $e ? $e.iterator : r, nr = $e ? $e.toStringTag : r, ao = (function() {
        try {
          var t = lr(it, "defineProperty");
          return t({}, "", {}), t;
        } catch (i) {
        }
      })(), Ep = w.clearTimeout !== gt.clearTimeout && w.clearTimeout, Dp = D && D.now !== gt.Date.now && D.now, Ip = w.setTimeout !== gt.setTimeout && w.setTimeout, uo = pt.ceil, co = pt.floor, fs2 = it.getOwnPropertySymbols, Mp = io ? io.isBuffer : r, Ru = w.isFinite, Ap = Zi.join, Rp = Su(it.keys, it), mt = pt.max, Ct = pt.min, Fp = D.now, kp = w.parseInt, Fu = pt.random, Vp = Zi.reverse, ps = lr(w, "DataView"), si = lr(w, "Map"), ms = lr(w, "Promise"), Dr = lr(w, "Set"), ai = lr(w, "WeakMap"), ui = lr(it, "create"), lo = ai && new ai(), Ir = {}, Np = hr(ps), Gp = hr(si), jp = hr(ms), Up = hr(Dr), Hp = hr(ai), ho = $e ? $e.prototype : r, ci = ho ? ho.valueOf : r, ku = ho ? ho.toString : r;
      function f(t) {
        if (ct(t) && !N(t) && !(t instanceof $)) {
          if (t instanceof Qt) return t;
          if (et.call(t, "__wrapped__")) return Vc(t);
        }
        return new Qt(t);
      }
      var Mr = /* @__PURE__ */ (function() {
        function t() {
        }
        return function(i) {
          if (!ut(i)) return {};
          if (Iu) return Iu(i);
          t.prototype = i;
          var n = new t();
          return t.prototype = r, n;
        };
      })();
      function fo() {
      }
      function Qt(t, i) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!i, this.__index__ = 0, this.__values__ = r;
      }
      f.templateSettings = { escape: ef, evaluate: rf, interpolate: za, variable: "", imports: { _: f } }, f.prototype = fo.prototype, f.prototype.constructor = f, Qt.prototype = Mr(fo.prototype), Qt.prototype.constructor = Qt;
      function $(t) {
        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = me, this.__views__ = [];
      }
      function Bp() {
        var t = new $(this.__wrapped__);
        return t.__actions__ = Mt(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Mt(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Mt(this.__views__), t;
      }
      function Wp() {
        if (this.__filtered__) {
          var t = new $(this);
          t.__dir__ = -1, t.__filtered__ = true;
        } else t = this.clone(), t.__dir__ *= -1;
        return t;
      }
      function zp() {
        var t = this.__wrapped__.value(), i = this.__dir__, n = N(t), c = i < 0, l = n ? t.length : 0, m = id(0, l, this.__views__), g = m.start, y = m.end, b = y - g, C = c ? y : g - 1, _ = this.__iteratees__, S = _.length, O = 0, M = Ct(b, this.__takeCount__);
        if (!n || !c && l == b && M == b) return sc(t, this.__actions__);
        var R = [];
        t: for (; b-- && O < M; ) {
          C += i;
          for (var U = -1, F = t[C]; ++U < S; ) {
            var z = _[U], q = z.iteratee, Ht = z.type, Dt = q(F);
            if (Ht == Nh) F = Dt;
            else if (!Dt) {
              if (Ht == ja) continue t;
              break t;
            }
          }
          R[O++] = F;
        }
        return R;
      }
      $.prototype = Mr(fo.prototype), $.prototype.constructor = $;
      function sr(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function $p() {
        this.__data__ = ui ? ui(null) : {}, this.size = 0;
      }
      function qp(t) {
        var i = this.has(t) && delete this.__data__[t];
        return this.size -= i ? 1 : 0, i;
      }
      function Xp(t) {
        var i = this.__data__;
        if (ui) {
          var n = i[t];
          return n === d ? r : n;
        }
        return et.call(i, t) ? i[t] : r;
      }
      function Yp(t) {
        var i = this.__data__;
        return ui ? i[t] !== r : et.call(i, t);
      }
      function Qp(t, i) {
        var n = this.__data__;
        return this.size += this.has(t) ? 0 : 1, n[t] = ui && i === r ? d : i, this;
      }
      sr.prototype.clear = $p, sr.prototype.delete = qp, sr.prototype.get = Xp, sr.prototype.has = Yp, sr.prototype.set = Qp;
      function Ee(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function Kp() {
        this.__data__ = [], this.size = 0;
      }
      function Jp(t) {
        var i = this.__data__, n = po(i, t);
        if (n < 0) return false;
        var c = i.length - 1;
        return n == c ? i.pop() : so.call(i, n, 1), --this.size, true;
      }
      function Zp(t) {
        var i = this.__data__, n = po(i, t);
        return n < 0 ? r : i[n][1];
      }
      function tm(t) {
        return po(this.__data__, t) > -1;
      }
      function em(t, i) {
        var n = this.__data__, c = po(n, t);
        return c < 0 ? (++this.size, n.push([t, i])) : n[c][1] = i, this;
      }
      Ee.prototype.clear = Kp, Ee.prototype.delete = Jp, Ee.prototype.get = Zp, Ee.prototype.has = tm, Ee.prototype.set = em;
      function De(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.clear(); ++i < n; ) {
          var c = t[i];
          this.set(c[0], c[1]);
        }
      }
      function rm() {
        this.size = 0, this.__data__ = { hash: new sr(), map: new (si || Ee)(), string: new sr() };
      }
      function im(t) {
        var i = Lo(this, t).delete(t);
        return this.size -= i ? 1 : 0, i;
      }
      function om(t) {
        return Lo(this, t).get(t);
      }
      function nm(t) {
        return Lo(this, t).has(t);
      }
      function sm(t, i) {
        var n = Lo(this, t), c = n.size;
        return n.set(t, i), this.size += n.size == c ? 0 : 1, this;
      }
      De.prototype.clear = rm, De.prototype.delete = im, De.prototype.get = om, De.prototype.has = nm, De.prototype.set = sm;
      function ar(t) {
        var i = -1, n = t == null ? 0 : t.length;
        for (this.__data__ = new De(); ++i < n; ) this.add(t[i]);
      }
      function am(t) {
        return this.__data__.set(t, d), this;
      }
      function um(t) {
        return this.__data__.has(t);
      }
      ar.prototype.add = ar.prototype.push = am, ar.prototype.has = um;
      function se(t) {
        var i = this.__data__ = new Ee(t);
        this.size = i.size;
      }
      function cm() {
        this.__data__ = new Ee(), this.size = 0;
      }
      function lm(t) {
        var i = this.__data__, n = i.delete(t);
        return this.size = i.size, n;
      }
      function hm(t) {
        return this.__data__.get(t);
      }
      function fm(t) {
        return this.__data__.has(t);
      }
      function pm(t, i) {
        var n = this.__data__;
        if (n instanceof Ee) {
          var c = n.__data__;
          if (!si || c.length < s - 1) return c.push([t, i]), this.size = ++n.size, this;
          n = this.__data__ = new De(c);
        }
        return n.set(t, i), this.size = n.size, this;
      }
      se.prototype.clear = cm, se.prototype.delete = lm, se.prototype.get = hm, se.prototype.has = fm, se.prototype.set = pm;
      function Vu(t, i) {
        var n = N(t), c = !n && fr2(t), l = !n && !c && Ke2(t), m = !n && !c && !l && kr(t), g = n || c || l || m, y = g ? us(t.length, wp) : [], b = y.length;
        for (var C in t) (i || et.call(t, C)) && !(g && (C == "length" || l && (C == "offset" || C == "parent") || m && (C == "buffer" || C == "byteLength" || C == "byteOffset") || Re(C, b))) && y.push(C);
        return y;
      }
      function Nu(t) {
        var i = t.length;
        return i ? t[_s(0, i - 1)] : r;
      }
      function mm(t, i) {
        return So(Mt(t), ur(i, 0, t.length));
      }
      function dm(t) {
        return So(Mt(t));
      }
      function ds(t, i, n) {
        (n !== r && !ae(t[i], n) || n === r && !(i in t)) && Ie(t, i, n);
      }
      function li(t, i, n) {
        var c = t[i];
        (!(et.call(t, i) && ae(c, n)) || n === r && !(i in t)) && Ie(t, i, n);
      }
      function po(t, i) {
        for (var n = t.length; n--; ) if (ae(t[n][0], i)) return n;
        return -1;
      }
      function gm(t, i, n, c) {
        return qe(t, function(l, m, g) {
          i(c, l, n(l), g);
        }), c;
      }
      function Gu(t, i) {
        return t && ge(i, yt(i), t);
      }
      function ym(t, i) {
        return t && ge(i, Rt(i), t);
      }
      function Ie(t, i, n) {
        i == "__proto__" && ao ? ao(t, i, { configurable: true, enumerable: true, value: n, writable: true }) : t[i] = n;
      }
      function gs(t, i) {
        for (var n = -1, c = i.length, l = x(c), m = t == null; ++n < c; ) l[n] = m ? r : Qs(t, i[n]);
        return l;
      }
      function ur(t, i, n) {
        return t === t && (n !== r && (t = t <= n ? t : n), i !== r && (t = t >= i ? t : i)), t;
      }
      function Kt(t, i, n, c, l, m) {
        var g, y = i & E, b = i & B, C = i & I;
        if (n && (g = l ? n(t, c, l, m) : n(t)), g !== r) return g;
        if (!ut(t)) return t;
        var _ = N(t);
        if (_) {
          if (g = nd(t), !y) return Mt(t, g);
        } else {
          var S = _t2(t), O = S == zi || S == Ua;
          if (Ke2(t)) return cc(t, y);
          if (S == Oe || S == wr || O && !l) {
            if (g = b || O ? {} : Oc(t), !y) return b ? Xm(t, ym(g, t)) : qm(t, Gu(g, t));
          } else {
            if (!ot[S]) return l ? t : {};
            g = sd(t, S, y);
          }
        }
        m || (m = new se());
        var M = m.get(t);
        if (M) return M;
        m.set(t, g), il(t) ? t.forEach(function(F) {
          g.add(Kt(F, i, n, F, t, m));
        }) : el(t) && t.forEach(function(F, z) {
          g.set(z, Kt(F, i, n, z, t, m));
        });
        var R = C ? b ? ks : Fs : b ? Rt : yt, U = _ ? r : R(t);
        return Xt(U || t, function(F, z) {
          U && (z = F, F = t[z]), li(g, z, Kt(F, i, n, z, t, m));
        }), g;
      }
      function vm(t) {
        var i = yt(t);
        return function(n) {
          return ju(n, t, i);
        };
      }
      function ju(t, i, n) {
        var c = n.length;
        if (t == null) return !c;
        for (t = it(t); c--; ) {
          var l = n[c], m = i[l], g = t[l];
          if (g === r && !(l in t) || !m(g)) return false;
        }
        return true;
      }
      function Uu(t, i, n) {
        if (typeof t != "function") throw new Yt(h);
        return yi(function() {
          t.apply(r, n);
        }, i);
      }
      function hi(t, i, n, c) {
        var l = -1, m = Qi, g = true, y = t.length, b = [], C = i.length;
        if (!y) return b;
        n && (i = at(i, Gt(n))), c ? (m = rs, g = false) : i.length >= s && (m = oi, g = false, i = new ar(i));
        t: for (; ++l < y; ) {
          var _ = t[l], S = n == null ? _ : n(_);
          if (_ = c || _ !== 0 ? _ : 0, g && S === S) {
            for (var O = C; O--; ) if (i[O] === S) continue t;
            b.push(_);
          } else m(i, S, c) || b.push(_);
        }
        return b;
      }
      var qe = mc(de), Hu = mc(vs, true);
      function bm(t, i) {
        var n = true;
        return qe(t, function(c, l, m) {
          return n = !!i(c, l, m), n;
        }), n;
      }
      function mo(t, i, n) {
        for (var c = -1, l = t.length; ++c < l; ) {
          var m = t[c], g = i(m);
          if (g != null && (y === r ? g === g && !Ut(g) : n(g, y))) var y = g, b = m;
        }
        return b;
      }
      function Tm(t, i, n, c) {
        var l = t.length;
        for (n = j(n), n < 0 && (n = -n > l ? 0 : l + n), c = c === r || c > l ? l : j(c), c < 0 && (c += l), c = n > c ? 0 : nl(c); n < c; ) t[n++] = i;
        return t;
      }
      function Bu(t, i) {
        var n = [];
        return qe(t, function(c, l, m) {
          i(c, l, m) && n.push(c);
        }), n;
      }
      function Tt2(t, i, n, c, l) {
        var m = -1, g = t.length;
        for (n || (n = ud), l || (l = []); ++m < g; ) {
          var y = t[m];
          i > 0 && n(y) ? i > 1 ? Tt2(y, i - 1, n, c, l) : Be(l, y) : c || (l[l.length] = y);
        }
        return l;
      }
      var ys = dc(), Wu = dc(true);
      function de(t, i) {
        return t && ys(t, i, yt);
      }
      function vs(t, i) {
        return t && Wu(t, i, yt);
      }
      function go(t, i) {
        return He(i, function(n) {
          return Fe(t[n]);
        });
      }
      function cr(t, i) {
        i = Ye(i, t);
        for (var n = 0, c = i.length; t != null && n < c; ) t = t[ye2(i[n++])];
        return n && n == c ? t : r;
      }
      function zu(t, i, n) {
        var c = i(t);
        return N(t) ? c : Be(c, n(t));
      }
      function Ot(t) {
        return t == null ? t === r ? Xh : $h : nr && nr in it(t) ? rd(t) : dd(t);
      }
      function bs(t, i) {
        return t > i;
      }
      function Pm(t, i) {
        return t != null && et.call(t, i);
      }
      function xm(t, i) {
        return t != null && i in it(t);
      }
      function wm(t, i, n) {
        return t >= Ct(i, n) && t < mt(i, n);
      }
      function Ts(t, i, n) {
        for (var c = n ? rs : Qi, l = t[0].length, m = t.length, g = m, y = x(m), b = 1 / 0, C = []; g--; ) {
          var _ = t[g];
          g && i && (_ = at(_, Gt(i))), b = Ct(_.length, b), y[g] = !n && (i || l >= 120 && _.length >= 120) ? new ar(g && _) : r;
        }
        _ = t[0];
        var S = -1, O = y[0];
        t: for (; ++S < l && C.length < b; ) {
          var M = _[S], R = i ? i(M) : M;
          if (M = n || M !== 0 ? M : 0, !(O ? oi(O, R) : c(C, R, n))) {
            for (g = m; --g; ) {
              var U = y[g];
              if (!(U ? oi(U, R) : c(t[g], R, n))) continue t;
            }
            O && O.push(R), C.push(M);
          }
        }
        return C;
      }
      function Cm(t, i, n, c) {
        return de(t, function(l, m, g) {
          i(c, n(l), m, g);
        }), c;
      }
      function fi(t, i, n) {
        i = Ye(i, t), t = Mc(t, i);
        var c = t == null ? t : t[ye2(Zt(i))];
        return c == null ? r : Nt(c, t, n);
      }
      function $u(t) {
        return ct(t) && Ot(t) == wr;
      }
      function _m(t) {
        return ct(t) && Ot(t) == ii;
      }
      function Lm(t) {
        return ct(t) && Ot(t) == Jr;
      }
      function pi(t, i, n, c, l) {
        return t === i ? true : t == null || i == null || !ct(t) && !ct(i) ? t !== t && i !== i : Sm(t, i, n, c, pi, l);
      }
      function Sm(t, i, n, c, l, m) {
        var g = N(t), y = N(i), b = g ? Bi : _t2(t), C = y ? Bi : _t2(i);
        b = b == wr ? Oe : b, C = C == wr ? Oe : C;
        var _ = b == Oe, S = C == Oe, O = b == C;
        if (O && Ke2(t)) {
          if (!Ke2(i)) return false;
          g = true, _ = false;
        }
        if (O && !_) return m || (m = new se()), g || kr(t) ? _c(t, i, n, c, l, m) : td(t, i, b, n, c, l, m);
        if (!(n & G)) {
          var M = _ && et.call(t, "__wrapped__"), R = S && et.call(i, "__wrapped__");
          if (M || R) {
            var U = M ? t.value() : t, F = R ? i.value() : i;
            return m || (m = new se()), l(U, F, n, c, m);
          }
        }
        return O ? (m || (m = new se()), ed(t, i, n, c, l, m)) : false;
      }
      function Om(t) {
        return ct(t) && _t2(t) == ie;
      }
      function Ps(t, i, n, c) {
        var l = n.length, m = l, g = !c;
        if (t == null) return !m;
        for (t = it(t); l--; ) {
          var y = n[l];
          if (g && y[2] ? y[1] !== t[y[0]] : !(y[0] in t)) return false;
        }
        for (; ++l < m; ) {
          y = n[l];
          var b = y[0], C = t[b], _ = y[1];
          if (g && y[2]) {
            if (C === r && !(b in t)) return false;
          } else {
            var S = new se();
            if (c) var O = c(C, _, b, t, i, S);
            if (!(O === r ? pi(_, C, G | k, c, S) : O)) return false;
          }
        }
        return true;
      }
      function qu(t) {
        if (!ut(t) || ld(t)) return false;
        var i = Fe(t) ? Op : vf;
        return i.test(hr(t));
      }
      function Em(t) {
        return ct(t) && Ot(t) == ti;
      }
      function Dm(t) {
        return ct(t) && _t2(t) == oe;
      }
      function Im(t) {
        return ct(t) && Ao(t.length) && !!st[Ot(t)];
      }
      function Xu(t) {
        return typeof t == "function" ? t : t == null ? Ft2 : typeof t == "object" ? N(t) ? Ku(t[0], t[1]) : Qu(t) : gl(t);
      }
      function xs(t) {
        if (!gi(t)) return Rp(t);
        var i = [];
        for (var n in it(t)) et.call(t, n) && n != "constructor" && i.push(n);
        return i;
      }
      function Mm(t) {
        if (!ut(t)) return md(t);
        var i = gi(t), n = [];
        for (var c in t) c == "constructor" && (i || !et.call(t, c)) || n.push(c);
        return n;
      }
      function ws(t, i) {
        return t < i;
      }
      function Yu(t, i) {
        var n = -1, c = At(t) ? x(t.length) : [];
        return qe(t, function(l, m, g) {
          c[++n] = i(l, m, g);
        }), c;
      }
      function Qu(t) {
        var i = Ns(t);
        return i.length == 1 && i[0][2] ? Dc(i[0][0], i[0][1]) : function(n) {
          return n === t || Ps(n, t, i);
        };
      }
      function Ku(t, i) {
        return js(t) && Ec(i) ? Dc(ye2(t), i) : function(n) {
          var c = Qs(n, t);
          return c === r && c === i ? Ks(n, t) : pi(i, c, G | k);
        };
      }
      function yo(t, i, n, c, l) {
        t !== i && ys(i, function(m, g) {
          if (l || (l = new se()), ut(m)) Am(t, i, g, n, yo, c, l);
          else {
            var y = c ? c(Hs(t, g), m, g + "", t, i, l) : r;
            y === r && (y = m), ds(t, g, y);
          }
        }, Rt);
      }
      function Am(t, i, n, c, l, m, g) {
        var y = Hs(t, n), b = Hs(i, n), C = g.get(b);
        if (C) {
          ds(t, n, C);
          return;
        }
        var _ = m ? m(y, b, n + "", t, i, g) : r, S = _ === r;
        if (S) {
          var O = N(b), M = !O && Ke2(b), R = !O && !M && kr(b);
          _ = b, O || M || R ? N(y) ? _ = y : lt(y) ? _ = Mt(y) : M ? (S = false, _ = cc(b, true)) : R ? (S = false, _ = lc(b, true)) : _ = [] : vi(b) || fr2(b) ? (_ = y, fr2(y) ? _ = sl(y) : (!ut(y) || Fe(y)) && (_ = Oc(b))) : S = false;
        }
        S && (g.set(b, _), l(_, b, c, m, g), g.delete(b)), ds(t, n, _);
      }
      function Ju(t, i) {
        var n = t.length;
        if (n) return i += i < 0 ? n : 0, Re(i, n) ? t[i] : r;
      }
      function Zu(t, i, n) {
        i.length ? i = at(i, function(m) {
          return N(m) ? function(g) {
            return cr(g, m.length === 1 ? m[0] : m);
          } : m;
        }) : i = [Ft2];
        var c = -1;
        i = at(i, Gt(A()));
        var l = Yu(t, function(m, g, y) {
          var b = at(i, function(C) {
            return C(m);
          });
          return { criteria: b, index: ++c, value: m };
        });
        return sp(l, function(m, g) {
          return $m(m, g, n);
        });
      }
      function Rm(t, i) {
        return tc(t, i, function(n, c) {
          return Ks(t, c);
        });
      }
      function tc(t, i, n) {
        for (var c = -1, l = i.length, m = {}; ++c < l; ) {
          var g = i[c], y = cr(t, g);
          n(y, g) && mi(m, Ye(g, t), y);
        }
        return m;
      }
      function Fm(t) {
        return function(i) {
          return cr(i, t);
        };
      }
      function Cs(t, i, n, c) {
        var l = c ? np : Lr, m = -1, g = i.length, y = t;
        for (t === i && (i = Mt(i)), n && (y = at(t, Gt(n))); ++m < g; ) for (var b = 0, C = i[m], _ = n ? n(C) : C; (b = l(y, _, b, c)) > -1; ) y !== t && so.call(y, b, 1), so.call(t, b, 1);
        return t;
      }
      function ec(t, i) {
        for (var n = t ? i.length : 0, c = n - 1; n--; ) {
          var l = i[n];
          if (n == c || l !== m) {
            var m = l;
            Re(l) ? so.call(t, l, 1) : Os(t, l);
          }
        }
        return t;
      }
      function _s(t, i) {
        return t + co(Fu() * (i - t + 1));
      }
      function km(t, i, n, c) {
        for (var l = -1, m = mt(uo((i - t) / (n || 1)), 0), g = x(m); m--; ) g[c ? m : ++l] = t, t += n;
        return g;
      }
      function Ls(t, i) {
        var n = "";
        if (!t || i < 1 || i > Ue) return n;
        do
          i % 2 && (n += t), i = co(i / 2), i && (t += t);
        while (i);
        return n;
      }
      function H(t, i) {
        return Bs(Ic(t, i, Ft2), t + "");
      }
      function Vm(t) {
        return Nu(Vr(t));
      }
      function Nm(t, i) {
        var n = Vr(t);
        return So(n, ur(i, 0, n.length));
      }
      function mi(t, i, n, c) {
        if (!ut(t)) return t;
        i = Ye(i, t);
        for (var l = -1, m = i.length, g = m - 1, y = t; y != null && ++l < m; ) {
          var b = ye2(i[l]), C = n;
          if (b === "__proto__" || b === "constructor" || b === "prototype") return t;
          if (l != g) {
            var _ = y[b];
            C = c ? c(_, b, y) : r, C === r && (C = ut(_) ? _ : Re(i[l + 1]) ? [] : {});
          }
          li(y, b, C), y = y[b];
        }
        return t;
      }
      var rc = lo ? function(t, i) {
        return lo.set(t, i), t;
      } : Ft2, Gm = ao ? function(t, i) {
        return ao(t, "toString", { configurable: true, enumerable: false, value: Zs(i), writable: true });
      } : Ft2;
      function jm(t) {
        return So(Vr(t));
      }
      function Jt(t, i, n) {
        var c = -1, l = t.length;
        i < 0 && (i = -i > l ? 0 : l + i), n = n > l ? l : n, n < 0 && (n += l), l = i > n ? 0 : n - i >>> 0, i >>>= 0;
        for (var m = x(l); ++c < l; ) m[c] = t[c + i];
        return m;
      }
      function Um(t, i) {
        var n;
        return qe(t, function(c, l, m) {
          return n = i(c, l, m), !n;
        }), !!n;
      }
      function vo(t, i, n) {
        var c = 0, l = t == null ? c : t.length;
        if (typeof i == "number" && i === i && l <= Hh) {
          for (; c < l; ) {
            var m = c + l >>> 1, g = t[m];
            g !== null && !Ut(g) && (n ? g <= i : g < i) ? c = m + 1 : l = m;
          }
          return l;
        }
        return Ss(t, i, Ft2, n);
      }
      function Ss(t, i, n, c) {
        var l = 0, m = t == null ? 0 : t.length;
        if (m === 0) return 0;
        i = n(i);
        for (var g = i !== i, y = i === null, b = Ut(i), C = i === r; l < m; ) {
          var _ = co((l + m) / 2), S = n(t[_]), O = S !== r, M = S === null, R = S === S, U = Ut(S);
          if (g) var F = c || R;
          else C ? F = R && (c || O) : y ? F = R && O && (c || !M) : b ? F = R && O && !M && (c || !U) : M || U ? F = false : F = c ? S <= i : S < i;
          F ? l = _ + 1 : m = _;
        }
        return Ct(m, Uh);
      }
      function ic(t, i) {
        for (var n = -1, c = t.length, l = 0, m = []; ++n < c; ) {
          var g = t[n], y = i ? i(g) : g;
          if (!n || !ae(y, b)) {
            var b = y;
            m[l++] = g === 0 ? 0 : g;
          }
        }
        return m;
      }
      function oc(t) {
        return typeof t == "number" ? t : Ut(t) ? Hi : +t;
      }
      function jt(t) {
        if (typeof t == "string") return t;
        if (N(t)) return at(t, jt) + "";
        if (Ut(t)) return ku ? ku.call(t) : "";
        var i = t + "";
        return i == "0" && 1 / t == -ir ? "-0" : i;
      }
      function Xe(t, i, n) {
        var c = -1, l = Qi, m = t.length, g = true, y = [], b = y;
        if (n) g = false, l = rs;
        else if (m >= s) {
          var C = i ? null : Jm(t);
          if (C) return Ji(C);
          g = false, l = oi, b = new ar();
        } else b = i ? [] : y;
        t: for (; ++c < m; ) {
          var _ = t[c], S = i ? i(_) : _;
          if (_ = n || _ !== 0 ? _ : 0, g && S === S) {
            for (var O = b.length; O--; ) if (b[O] === S) continue t;
            i && b.push(S), y.push(_);
          } else l(b, S, n) || (b !== y && b.push(S), y.push(_));
        }
        return y;
      }
      function Os(t, i) {
        return i = Ye(i, t), t = Mc(t, i), t == null || delete t[ye2(Zt(i))];
      }
      function nc(t, i, n, c) {
        return mi(t, i, n(cr(t, i)), c);
      }
      function bo(t, i, n, c) {
        for (var l = t.length, m = c ? l : -1; (c ? m-- : ++m < l) && i(t[m], m, t); ) ;
        return n ? Jt(t, c ? 0 : m, c ? m + 1 : l) : Jt(t, c ? m + 1 : 0, c ? l : m);
      }
      function sc(t, i) {
        var n = t;
        return n instanceof $ && (n = n.value()), is(i, function(c, l) {
          return l.func.apply(l.thisArg, Be([c], l.args));
        }, n);
      }
      function Es(t, i, n) {
        var c = t.length;
        if (c < 2) return c ? Xe(t[0]) : [];
        for (var l = -1, m = x(c); ++l < c; ) for (var g = t[l], y = -1; ++y < c; ) y != l && (m[l] = hi(m[l] || g, t[y], i, n));
        return Xe(Tt2(m, 1), i, n);
      }
      function ac(t, i, n) {
        for (var c = -1, l = t.length, m = i.length, g = {}; ++c < l; ) {
          var y = c < m ? i[c] : r;
          n(g, t[c], y);
        }
        return g;
      }
      function Ds(t) {
        return lt(t) ? t : [];
      }
      function Is(t) {
        return typeof t == "function" ? t : Ft2;
      }
      function Ye(t, i) {
        return N(t) ? t : js(t, i) ? [t] : kc(tt(t));
      }
      var Hm = H;
      function Qe(t, i, n) {
        var c = t.length;
        return n = n === r ? c : n, !i && n >= c ? t : Jt(t, i, n);
      }
      var uc = Ep || function(t) {
        return gt.clearTimeout(t);
      };
      function cc(t, i) {
        if (i) return t.slice();
        var n = t.length, c = Du ? Du(n) : new t.constructor(n);
        return t.copy(c), c;
      }
      function Ms(t) {
        var i = new t.constructor(t.byteLength);
        return new oo(i).set(new oo(t)), i;
      }
      function Bm(t, i) {
        var n = i ? Ms(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.byteLength);
      }
      function Wm(t) {
        var i = new t.constructor(t.source, $a.exec(t));
        return i.lastIndex = t.lastIndex, i;
      }
      function zm(t) {
        return ci ? it(ci.call(t)) : {};
      }
      function lc(t, i) {
        var n = i ? Ms(t.buffer) : t.buffer;
        return new t.constructor(n, t.byteOffset, t.length);
      }
      function hc(t, i) {
        if (t !== i) {
          var n = t !== r, c = t === null, l = t === t, m = Ut(t), g = i !== r, y = i === null, b = i === i, C = Ut(i);
          if (!y && !C && !m && t > i || m && g && b && !y && !C || c && g && b || !n && b || !l) return 1;
          if (!c && !m && !C && t < i || C && n && l && !c && !m || y && n && l || !g && l || !b) return -1;
        }
        return 0;
      }
      function $m(t, i, n) {
        for (var c = -1, l = t.criteria, m = i.criteria, g = l.length, y = n.length; ++c < g; ) {
          var b = hc(l[c], m[c]);
          if (b) {
            if (c >= y) return b;
            var C = n[c];
            return b * (C == "desc" ? -1 : 1);
          }
        }
        return t.index - i.index;
      }
      function fc(t, i, n, c) {
        for (var l = -1, m = t.length, g = n.length, y = -1, b = i.length, C = mt(m - g, 0), _ = x(b + C), S = !c; ++y < b; ) _[y] = i[y];
        for (; ++l < g; ) (S || l < m) && (_[n[l]] = t[l]);
        for (; C--; ) _[y++] = t[l++];
        return _;
      }
      function pc(t, i, n, c) {
        for (var l = -1, m = t.length, g = -1, y = n.length, b = -1, C = i.length, _ = mt(m - y, 0), S = x(_ + C), O = !c; ++l < _; ) S[l] = t[l];
        for (var M = l; ++b < C; ) S[M + b] = i[b];
        for (; ++g < y; ) (O || l < m) && (S[M + n[g]] = t[l++]);
        return S;
      }
      function Mt(t, i) {
        var n = -1, c = t.length;
        for (i || (i = x(c)); ++n < c; ) i[n] = t[n];
        return i;
      }
      function ge(t, i, n, c) {
        var l = !n;
        n || (n = {});
        for (var m = -1, g = i.length; ++m < g; ) {
          var y = i[m], b = c ? c(n[y], t[y], y, n, t) : r;
          b === r && (b = t[y]), l ? Ie(n, y, b) : li(n, y, b);
        }
        return n;
      }
      function qm(t, i) {
        return ge(t, Gs(t), i);
      }
      function Xm(t, i) {
        return ge(t, Lc(t), i);
      }
      function To(t, i) {
        return function(n, c) {
          var l = N(n) ? Zf : gm, m = i ? i() : {};
          return l(n, t, A(c, 2), m);
        };
      }
      function Ar(t) {
        return H(function(i, n) {
          var c = -1, l = n.length, m = l > 1 ? n[l - 1] : r, g = l > 2 ? n[2] : r;
          for (m = t.length > 3 && typeof m == "function" ? (l--, m) : r, g && Et(n[0], n[1], g) && (m = l < 3 ? r : m, l = 1), i = it(i); ++c < l; ) {
            var y = n[c];
            y && t(i, y, c, m);
          }
          return i;
        });
      }
      function mc(t, i) {
        return function(n, c) {
          if (n == null) return n;
          if (!At(n)) return t(n, c);
          for (var l = n.length, m = i ? l : -1, g = it(n); (i ? m-- : ++m < l) && c(g[m], m, g) !== false; ) ;
          return n;
        };
      }
      function dc(t) {
        return function(i, n, c) {
          for (var l = -1, m = it(i), g = c(i), y = g.length; y--; ) {
            var b = g[t ? y : ++l];
            if (n(m[b], b, m) === false) break;
          }
          return i;
        };
      }
      function Ym(t, i, n) {
        var c = i & K2, l = di(t);
        function m() {
          var g = this && this !== gt && this instanceof m ? l : t;
          return g.apply(c ? n : this, arguments);
        }
        return m;
      }
      function gc(t) {
        return function(i) {
          i = tt(i);
          var n = Sr(i) ? ne(i) : r, c = n ? n[0] : i.charAt(0), l = n ? Qe(n, 1).join("") : i.slice(1);
          return c[t]() + l;
        };
      }
      function Rr(t) {
        return function(i) {
          return is(ml(pl(i).replace(Gf, "")), t, "");
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
          var n = Mr(t.prototype), c = t.apply(n, i);
          return ut(c) ? c : n;
        };
      }
      function Qm(t, i, n) {
        var c = di(t);
        function l() {
          for (var m = arguments.length, g = x(m), y = m, b = Fr(l); y--; ) g[y] = arguments[y];
          var C = m < 3 && g[0] !== b && g[m - 1] !== b ? [] : We(g, b);
          if (m -= C.length, m < n) return Pc(t, i, Po, l.placeholder, r, g, C, r, r, n - m);
          var _ = this && this !== gt && this instanceof l ? c : t;
          return Nt(_, this, g);
        }
        return l;
      }
      function yc(t) {
        return function(i, n, c) {
          var l = it(i);
          if (!At(i)) {
            var m = A(n, 3);
            i = yt(i), n = function(y) {
              return m(l[y], y, l);
            };
          }
          var g = t(i, n, c);
          return g > -1 ? l[m ? i[g] : g] : r;
        };
      }
      function vc(t) {
        return Ae(function(i) {
          var n = i.length, c = n, l = Qt.prototype.thru;
          for (t && i.reverse(); c--; ) {
            var m = i[c];
            if (typeof m != "function") throw new Yt(h);
            if (l && !g && _o(m) == "wrapper") var g = new Qt([], true);
          }
          for (c = g ? c : n; ++c < n; ) {
            m = i[c];
            var y = _o(m), b = y == "wrapper" ? Vs(m) : r;
            b && Us(b[0]) && b[1] == (Se | bt | pe | Qr) && !b[4].length && b[9] == 1 ? g = g[_o(b[0])].apply(g, b[3]) : g = m.length == 1 && Us(m) ? g[y]() : g.thru(m);
          }
          return function() {
            var C = arguments, _ = C[0];
            if (g && C.length == 1 && N(_)) return g.plant(_).value();
            for (var S = 0, O = n ? i[S].apply(this, C) : _; ++S < n; ) O = i[S].call(this, O);
            return O;
          };
        });
      }
      function Po(t, i, n, c, l, m, g, y, b, C) {
        var _ = i & Se, S = i & K2, O = i & nt, M = i & (bt | fe), R = i & Vn, U = O ? r : di(t);
        function F() {
          for (var z = arguments.length, q = x(z), Ht = z; Ht--; ) q[Ht] = arguments[Ht];
          if (M) var Dt = Fr(F), Bt = up(q, Dt);
          if (c && (q = fc(q, c, l, M)), m && (q = pc(q, m, g, M)), z -= Bt, M && z < C) {
            var ht = We(q, Dt);
            return Pc(t, i, Po, F.placeholder, n, q, ht, y, b, C - z);
          }
          var ue = S ? n : this, Ve2 = O ? ue[t] : t;
          return z = q.length, y ? q = gd(q, y) : R && z > 1 && q.reverse(), _ && b < z && (q.length = b), this && this !== gt && this instanceof F && (Ve2 = U || di(Ve2)), Ve2.apply(ue, q);
        }
        return F;
      }
      function bc(t, i) {
        return function(n, c) {
          return Cm(n, t, i(c), {});
        };
      }
      function xo(t, i) {
        return function(n, c) {
          var l;
          if (n === r && c === r) return i;
          if (n !== r && (l = n), c !== r) {
            if (l === r) return c;
            typeof n == "string" || typeof c == "string" ? (n = jt(n), c = jt(c)) : (n = oc(n), c = oc(c)), l = t(n, c);
          }
          return l;
        };
      }
      function As(t) {
        return Ae(function(i) {
          return i = at(i, Gt(A())), H(function(n) {
            var c = this;
            return t(i, function(l) {
              return Nt(l, c, n);
            });
          });
        });
      }
      function wo(t, i) {
        i = i === r ? " " : jt(i);
        var n = i.length;
        if (n < 2) return n ? Ls(i, t) : i;
        var c = Ls(i, uo(t / Or(i)));
        return Sr(i) ? Qe(ne(c), 0, t).join("") : c.slice(0, t);
      }
      function Km(t, i, n, c) {
        var l = i & K2, m = di(t);
        function g() {
          for (var y = -1, b = arguments.length, C = -1, _ = c.length, S = x(_ + b), O = this && this !== gt && this instanceof g ? m : t; ++C < _; ) S[C] = c[C];
          for (; b--; ) S[C++] = arguments[++y];
          return Nt(O, l ? n : this, S);
        }
        return g;
      }
      function Tc(t) {
        return function(i, n, c) {
          return c && typeof c != "number" && Et(i, n, c) && (n = c = r), i = ke(i), n === r ? (n = i, i = 0) : n = ke(n), c = c === r ? i < n ? 1 : -1 : ke(c), km(i, n, c, t);
        };
      }
      function Co(t) {
        return function(i, n) {
          return typeof i == "string" && typeof n == "string" || (i = te(i), n = te(n)), t(i, n);
        };
      }
      function Pc(t, i, n, c, l, m, g, y, b, C) {
        var _ = i & bt, S = _ ? g : r, O = _ ? r : g, M = _ ? m : r, R = _ ? r : m;
        i |= _ ? pe : xr, i &= ~(_ ? xr : pe), i & $t || (i &= ~(K2 | nt));
        var U = [t, i, l, M, S, R, O, y, b, C], F = n.apply(r, U);
        return Us(t) && Ac(F, U), F.placeholder = c, Rc(F, t, i);
      }
      function Rs(t) {
        var i = pt[t];
        return function(n, c) {
          if (n = te(n), c = c == null ? 0 : Ct(j(c), 292), c && Ru(n)) {
            var l = (tt(n) + "e").split("e"), m = i(l[0] + "e" + (+l[1] + c));
            return l = (tt(m) + "e").split("e"), +(l[0] + "e" + (+l[1] - c));
          }
          return i(n);
        };
      }
      var Jm = Dr && 1 / Ji(new Dr([, -0]))[1] == ir ? function(t) {
        return new Dr(t);
      } : ra;
      function xc(t) {
        return function(i) {
          var n = _t2(i);
          return n == ie ? ls(i) : n == oe ? dp(i) : ap(i, t(i));
        };
      }
      function Me(t, i, n, c, l, m, g, y) {
        var b = i & nt;
        if (!b && typeof t != "function") throw new Yt(h);
        var C = c ? c.length : 0;
        if (C || (i &= ~(pe | xr), c = l = r), g = g === r ? g : mt(j(g), 0), y = y === r ? y : j(y), C -= l ? l.length : 0, i & xr) {
          var _ = c, S = l;
          c = l = r;
        }
        var O = b ? r : Vs(t), M = [t, i, n, c, l, _, S, m, g, y];
        if (O && pd(M, O), t = M[0], i = M[1], n = M[2], c = M[3], l = M[4], y = M[9] = M[9] === r ? b ? 0 : t.length : mt(M[9] - C, 0), !y && i & (bt | fe) && (i &= ~(bt | fe)), !i || i == K2) var R = Ym(t, i, n);
        else i == bt || i == fe ? R = Qm(t, i, y) : (i == pe || i == (K2 | pe)) && !l.length ? R = Km(t, i, n, c) : R = Po.apply(r, M);
        var U = O ? rc : Ac;
        return Rc(U(R, M), t, i);
      }
      function wc(t, i, n, c) {
        return t === r || ae(t, Er[n]) && !et.call(c, n) ? i : t;
      }
      function Cc(t, i, n, c, l, m) {
        return ut(t) && ut(i) && (m.set(i, t), yo(t, i, r, Cc, m), m.delete(i)), t;
      }
      function Zm(t) {
        return vi(t) ? r : t;
      }
      function _c(t, i, n, c, l, m) {
        var g = n & G, y = t.length, b = i.length;
        if (y != b && !(g && b > y)) return false;
        var C = m.get(t), _ = m.get(i);
        if (C && _) return C == i && _ == t;
        var S = -1, O = true, M = n & k ? new ar() : r;
        for (m.set(t, i), m.set(i, t); ++S < y; ) {
          var R = t[S], U = i[S];
          if (c) var F = g ? c(U, R, S, i, t, m) : c(R, U, S, t, i, m);
          if (F !== r) {
            if (F) continue;
            O = false;
            break;
          }
          if (M) {
            if (!os(i, function(z, q) {
              if (!oi(M, q) && (R === z || l(R, z, n, c, m))) return M.push(q);
            })) {
              O = false;
              break;
            }
          } else if (!(R === U || l(R, U, n, c, m))) {
            O = false;
            break;
          }
        }
        return m.delete(t), m.delete(i), O;
      }
      function td(t, i, n, c, l, m, g) {
        switch (n) {
          case Cr:
            if (t.byteLength != i.byteLength || t.byteOffset != i.byteOffset) return false;
            t = t.buffer, i = i.buffer;
          case ii:
            return !(t.byteLength != i.byteLength || !m(new oo(t), new oo(i)));
          case Kr:
          case Jr:
          case Zr:
            return ae(+t, +i);
          case Wi:
            return t.name == i.name && t.message == i.message;
          case ti:
          case ei:
            return t == i + "";
          case ie:
            var y = ls;
          case oe:
            var b = c & G;
            if (y || (y = Ji), t.size != i.size && !b) return false;
            var C = g.get(t);
            if (C) return C == i;
            c |= k, g.set(t, i);
            var _ = _c(y(t), y(i), c, l, m, g);
            return g.delete(t), _;
          case $i:
            if (ci) return ci.call(t) == ci.call(i);
        }
        return false;
      }
      function ed(t, i, n, c, l, m) {
        var g = n & G, y = Fs(t), b = y.length, C = Fs(i), _ = C.length;
        if (b != _ && !g) return false;
        for (var S = b; S--; ) {
          var O = y[S];
          if (!(g ? O in i : et.call(i, O))) return false;
        }
        var M = m.get(t), R = m.get(i);
        if (M && R) return M == i && R == t;
        var U = true;
        m.set(t, i), m.set(i, t);
        for (var F = g; ++S < b; ) {
          O = y[S];
          var z = t[O], q = i[O];
          if (c) var Ht = g ? c(q, z, O, i, t, m) : c(z, q, O, t, i, m);
          if (!(Ht === r ? z === q || l(z, q, n, c, m) : Ht)) {
            U = false;
            break;
          }
          F || (F = O == "constructor");
        }
        if (U && !F) {
          var Dt = t.constructor, Bt = i.constructor;
          Dt != Bt && "constructor" in t && "constructor" in i && !(typeof Dt == "function" && Dt instanceof Dt && typeof Bt == "function" && Bt instanceof Bt) && (U = false);
        }
        return m.delete(t), m.delete(i), U;
      }
      function Ae(t) {
        return Bs(Ic(t, r, jc), t + "");
      }
      function Fs(t) {
        return zu(t, yt, Gs);
      }
      function ks(t) {
        return zu(t, Rt, Lc);
      }
      var Vs = lo ? function(t) {
        return lo.get(t);
      } : ra;
      function _o(t) {
        for (var i = t.name + "", n = Ir[i], c = et.call(Ir, i) ? n.length : 0; c--; ) {
          var l = n[c], m = l.func;
          if (m == null || m == t) return l.name;
        }
        return i;
      }
      function Fr(t) {
        var i = et.call(f, "placeholder") ? f : t;
        return i.placeholder;
      }
      function A() {
        var t = f.iteratee || ta;
        return t = t === ta ? Xu : t, arguments.length ? t(arguments[0], arguments[1]) : t;
      }
      function Lo(t, i) {
        var n = t.__data__;
        return cd(i) ? n[typeof i == "string" ? "string" : "hash"] : n.map;
      }
      function Ns(t) {
        for (var i = yt(t), n = i.length; n--; ) {
          var c = i[n], l = t[c];
          i[n] = [c, l, Ec(l)];
        }
        return i;
      }
      function lr(t, i) {
        var n = fp(t, i);
        return qu(n) ? n : r;
      }
      function rd(t) {
        var i = et.call(t, nr), n = t[nr];
        try {
          t[nr] = r;
          var c = true;
        } catch (m) {
        }
        var l = ro.call(t);
        return c && (i ? t[nr] = n : delete t[nr]), l;
      }
      var Gs = fs2 ? function(t) {
        return t == null ? [] : (t = it(t), He(fs2(t), function(i) {
          return Mu.call(t, i);
        }));
      } : ia, Lc = fs2 ? function(t) {
        for (var i = []; t; ) Be(i, Gs(t)), t = no(t);
        return i;
      } : ia, _t2 = Ot;
      (ps && _t2(new ps(new ArrayBuffer(1))) != Cr || si && _t2(new si()) != ie || ms && _t2(ms.resolve()) != Ha || Dr && _t2(new Dr()) != oe || ai && _t2(new ai()) != ri) && (_t2 = function(t) {
        var i = Ot(t), n = i == Oe ? t.constructor : r, c = n ? hr(n) : "";
        if (c) switch (c) {
          case Np:
            return Cr;
          case Gp:
            return ie;
          case jp:
            return Ha;
          case Up:
            return oe;
          case Hp:
            return ri;
        }
        return i;
      });
      function id(t, i, n) {
        for (var c = -1, l = n.length; ++c < l; ) {
          var m = n[c], g = m.size;
          switch (m.type) {
            case "drop":
              t += g;
              break;
            case "dropRight":
              i -= g;
              break;
            case "take":
              i = Ct(i, t + g);
              break;
            case "takeRight":
              t = mt(t, i - g);
              break;
          }
        }
        return { start: t, end: i };
      }
      function od(t) {
        var i = t.match(lf);
        return i ? i[1].split(hf) : [];
      }
      function Sc(t, i, n) {
        i = Ye(i, t);
        for (var c = -1, l = i.length, m = false; ++c < l; ) {
          var g = ye2(i[c]);
          if (!(m = t != null && n(t, g))) break;
          t = t[g];
        }
        return m || ++c != l ? m : (l = t == null ? 0 : t.length, !!l && Ao(l) && Re(g, l) && (N(t) || fr2(t)));
      }
      function nd(t) {
        var i = t.length, n = new t.constructor(i);
        return i && typeof t[0] == "string" && et.call(t, "index") && (n.index = t.index, n.input = t.input), n;
      }
      function Oc(t) {
        return typeof t.constructor == "function" && !gi(t) ? Mr(no(t)) : {};
      }
      function sd(t, i, n) {
        var c = t.constructor;
        switch (i) {
          case ii:
            return Ms(t);
          case Kr:
          case Jr:
            return new c(+t);
          case Cr:
            return Bm(t, n);
          case Nn:
          case Gn:
          case jn:
          case Un:
          case Hn:
          case Bn:
          case Wn:
          case zn:
          case $n:
            return lc(t, n);
          case ie:
            return new c();
          case Zr:
          case ei:
            return new c(t);
          case ti:
            return Wm(t);
          case oe:
            return new c();
          case $i:
            return zm(t);
        }
      }
      function ad(t, i) {
        var n = i.length;
        if (!n) return t;
        var c = n - 1;
        return i[c] = (n > 1 ? "& " : "") + i[c], i = i.join(n > 2 ? ", " : " "), t.replace(cf, `{
/* [wrapped with ` + i + `] */
`);
      }
      function ud(t) {
        return N(t) || fr2(t) || !!(Au && t && t[Au]);
      }
      function Re(t, i) {
        var n = typeof t;
        return i = i != null ? i : Ue, !!i && (n == "number" || n != "symbol" && Tf.test(t)) && t > -1 && t % 1 == 0 && t < i;
      }
      function Et(t, i, n) {
        if (!ut(n)) return false;
        var c = typeof i;
        return (c == "number" ? At(n) && Re(i, n.length) : c == "string" && i in n) ? ae(n[i], t) : false;
      }
      function js(t, i) {
        if (N(t)) return false;
        var n = typeof t;
        return n == "number" || n == "symbol" || n == "boolean" || t == null || Ut(t) ? true : nf.test(t) || !of.test(t) || i != null && t in it(i);
      }
      function cd(t) {
        var i = typeof t;
        return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? t !== "__proto__" : t === null;
      }
      function Us(t) {
        var i = _o(t), n = f[i];
        if (typeof n != "function" || !(i in $.prototype)) return false;
        if (t === n) return true;
        var c = Vs(n);
        return !!c && t === c[0];
      }
      function ld(t) {
        return !!Eu && Eu in t;
      }
      var hd = to ? Fe : oa2;
      function gi(t) {
        var i = t && t.constructor, n = typeof i == "function" && i.prototype || Er;
        return t === n;
      }
      function Ec(t) {
        return t === t && !ut(t);
      }
      function Dc(t, i) {
        return function(n) {
          return n == null ? false : n[t] === i && (i !== r || t in it(n));
        };
      }
      function fd(t) {
        var i = Io(t, function(c) {
          return n.size === P2 && n.clear(), c;
        }), n = i.cache;
        return i;
      }
      function pd(t, i) {
        var n = t[1], c = i[1], l = n | c, m = l < (K2 | nt | Se), g = c == Se && n == bt || c == Se && n == Qr && t[7].length <= i[8] || c == (Se | Qr) && i[7].length <= i[8] && n == bt;
        if (!(m || g)) return t;
        c & K2 && (t[2] = i[2], l |= n & K2 ? 0 : $t);
        var y = i[3];
        if (y) {
          var b = t[3];
          t[3] = b ? fc(b, y, i[4]) : y, t[4] = b ? We(t[3], L) : i[4];
        }
        return y = i[5], y && (b = t[5], t[5] = b ? pc(b, y, i[6]) : y, t[6] = b ? We(t[5], L) : i[6]), y = i[7], y && (t[7] = y), c & Se && (t[8] = t[8] == null ? i[8] : Ct(t[8], i[8])), t[9] == null && (t[9] = i[9]), t[0] = i[0], t[1] = l, t;
      }
      function md(t) {
        var i = [];
        if (t != null) for (var n in it(t)) i.push(n);
        return i;
      }
      function dd(t) {
        return ro.call(t);
      }
      function Ic(t, i, n) {
        return i = mt(i === r ? t.length - 1 : i, 0), function() {
          for (var c = arguments, l = -1, m = mt(c.length - i, 0), g = x(m); ++l < m; ) g[l] = c[i + l];
          l = -1;
          for (var y = x(i + 1); ++l < i; ) y[l] = c[l];
          return y[i] = n(g), Nt(t, this, y);
        };
      }
      function Mc(t, i) {
        return i.length < 2 ? t : cr(t, Jt(i, 0, -1));
      }
      function gd(t, i) {
        for (var n = t.length, c = Ct(i.length, n), l = Mt(t); c--; ) {
          var m = i[c];
          t[c] = Re(m, n) ? l[m] : r;
        }
        return t;
      }
      function Hs(t, i) {
        if (!(i === "constructor" && typeof t[i] == "function") && i != "__proto__") return t[i];
      }
      var Ac = Fc(rc), yi = Ip || function(t, i) {
        return gt.setTimeout(t, i);
      }, Bs = Fc(Gm);
      function Rc(t, i, n) {
        var c = i + "";
        return Bs(t, ad(c, yd(od(c), n)));
      }
      function Fc(t) {
        var i = 0, n = 0;
        return function() {
          var c = Fp(), l = Vh - (c - n);
          if (n = c, l > 0) {
            if (++i >= kh) return arguments[0];
          } else i = 0;
          return t.apply(r, arguments);
        };
      }
      function So(t, i) {
        var n = -1, c = t.length, l = c - 1;
        for (i = i === r ? c : i; ++n < i; ) {
          var m = _s(n, l), g = t[m];
          t[m] = t[n], t[n] = g;
        }
        return t.length = i, t;
      }
      var kc = fd(function(t) {
        var i = [];
        return t.charCodeAt(0) === 46 && i.push(""), t.replace(sf, function(n, c, l, m) {
          i.push(l ? m.replace(mf, "$1") : c || n);
        }), i;
      });
      function ye2(t) {
        if (typeof t == "string" || Ut(t)) return t;
        var i = t + "";
        return i == "0" && 1 / t == -ir ? "-0" : i;
      }
      function hr(t) {
        if (t != null) {
          try {
            return eo.call(t);
          } catch (i) {
          }
          try {
            return t + "";
          } catch (i) {
          }
        }
        return "";
      }
      function yd(t, i) {
        return Xt(Bh, function(n) {
          var c = "_." + n[0];
          i & n[1] && !Qi(t, c) && t.push(c);
        }), t.sort();
      }
      function Vc(t) {
        if (t instanceof $) return t.clone();
        var i = new Qt(t.__wrapped__, t.__chain__);
        return i.__actions__ = Mt(t.__actions__), i.__index__ = t.__index__, i.__values__ = t.__values__, i;
      }
      function vd(t, i, n) {
        (n ? Et(t, i, n) : i === r) ? i = 1 : i = mt(j(i), 0);
        var c = t == null ? 0 : t.length;
        if (!c || i < 1) return [];
        for (var l = 0, m = 0, g = x(uo(c / i)); l < c; ) g[m++] = Jt(t, l, l += i);
        return g;
      }
      function bd(t) {
        for (var i = -1, n = t == null ? 0 : t.length, c = 0, l = []; ++i < n; ) {
          var m = t[i];
          m && (l[c++] = m);
        }
        return l;
      }
      function Td() {
        var t = arguments.length;
        if (!t) return [];
        for (var i = x(t - 1), n = arguments[0], c = t; c--; ) i[c - 1] = arguments[c];
        return Be(N(n) ? Mt(n) : [n], Tt2(i, 1));
      }
      var Pd = H(function(t, i) {
        return lt(t) ? hi(t, Tt2(i, 1, lt, true)) : [];
      }), xd = H(function(t, i) {
        var n = Zt(i);
        return lt(n) && (n = r), lt(t) ? hi(t, Tt2(i, 1, lt, true), A(n, 2)) : [];
      }), wd = H(function(t, i) {
        var n = Zt(i);
        return lt(n) && (n = r), lt(t) ? hi(t, Tt2(i, 1, lt, true), r, n) : [];
      });
      function Cd(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j(i), Jt(t, i < 0 ? 0 : i, c)) : [];
      }
      function _d(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j(i), i = c - i, Jt(t, 0, i < 0 ? 0 : i)) : [];
      }
      function Ld(t, i) {
        return t && t.length ? bo(t, A(i, 3), true, true) : [];
      }
      function Sd(t, i) {
        return t && t.length ? bo(t, A(i, 3), true) : [];
      }
      function Od(t, i, n, c) {
        var l = t == null ? 0 : t.length;
        return l ? (n && typeof n != "number" && Et(t, i, n) && (n = 0, c = l), Tm(t, i, n, c)) : [];
      }
      function Nc(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = n == null ? 0 : j(n);
        return l < 0 && (l = mt(c + l, 0)), Ki(t, A(i, 3), l);
      }
      function Gc(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = c - 1;
        return n !== r && (l = j(n), l = n < 0 ? mt(c + l, 0) : Ct(l, c - 1)), Ki(t, A(i, 3), l, true);
      }
      function jc(t) {
        var i = t == null ? 0 : t.length;
        return i ? Tt2(t, 1) : [];
      }
      function Ed(t) {
        var i = t == null ? 0 : t.length;
        return i ? Tt2(t, ir) : [];
      }
      function Dd(t, i) {
        var n = t == null ? 0 : t.length;
        return n ? (i = i === r ? 1 : j(i), Tt2(t, i)) : [];
      }
      function Id(t) {
        for (var i = -1, n = t == null ? 0 : t.length, c = {}; ++i < n; ) {
          var l = t[i];
          c[l[0]] = l[1];
        }
        return c;
      }
      function Uc(t) {
        return t && t.length ? t[0] : r;
      }
      function Md(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = n == null ? 0 : j(n);
        return l < 0 && (l = mt(c + l, 0)), Lr(t, i, l);
      }
      function Ad(t) {
        var i = t == null ? 0 : t.length;
        return i ? Jt(t, 0, -1) : [];
      }
      var Rd = H(function(t) {
        var i = at(t, Ds);
        return i.length && i[0] === t[0] ? Ts(i) : [];
      }), Fd = H(function(t) {
        var i = Zt(t), n = at(t, Ds);
        return i === Zt(n) ? i = r : n.pop(), n.length && n[0] === t[0] ? Ts(n, A(i, 2)) : [];
      }), kd = H(function(t) {
        var i = Zt(t), n = at(t, Ds);
        return i = typeof i == "function" ? i : r, i && n.pop(), n.length && n[0] === t[0] ? Ts(n, r, i) : [];
      });
      function Vd(t, i) {
        return t == null ? "" : Ap.call(t, i);
      }
      function Zt(t) {
        var i = t == null ? 0 : t.length;
        return i ? t[i - 1] : r;
      }
      function Nd(t, i, n) {
        var c = t == null ? 0 : t.length;
        if (!c) return -1;
        var l = c;
        return n !== r && (l = j(n), l = l < 0 ? mt(c + l, 0) : Ct(l, c - 1)), i === i ? yp(t, i, l) : Ki(t, Pu, l, true);
      }
      function Gd(t, i) {
        return t && t.length ? Ju(t, j(i)) : r;
      }
      var jd = H(Hc);
      function Hc(t, i) {
        return t && t.length && i && i.length ? Cs(t, i) : t;
      }
      function Ud(t, i, n) {
        return t && t.length && i && i.length ? Cs(t, i, A(n, 2)) : t;
      }
      function Hd(t, i, n) {
        return t && t.length && i && i.length ? Cs(t, i, r, n) : t;
      }
      var Bd = Ae(function(t, i) {
        var n = t == null ? 0 : t.length, c = gs(t, i);
        return ec(t, at(i, function(l) {
          return Re(l, n) ? +l : l;
        }).sort(hc)), c;
      });
      function Wd(t, i) {
        var n = [];
        if (!(t && t.length)) return n;
        var c = -1, l = [], m = t.length;
        for (i = A(i, 3); ++c < m; ) {
          var g = t[c];
          i(g, c, t) && (n.push(g), l.push(c));
        }
        return ec(t, l), n;
      }
      function Ws(t) {
        return t == null ? t : Vp.call(t);
      }
      function zd(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (n && typeof n != "number" && Et(t, i, n) ? (i = 0, n = c) : (i = i == null ? 0 : j(i), n = n === r ? c : j(n)), Jt(t, i, n)) : [];
      }
      function $d(t, i) {
        return vo(t, i);
      }
      function qd(t, i, n) {
        return Ss(t, i, A(n, 2));
      }
      function Xd(t, i) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var c = vo(t, i);
          if (c < n && ae(t[c], i)) return c;
        }
        return -1;
      }
      function Yd(t, i) {
        return vo(t, i, true);
      }
      function Qd(t, i, n) {
        return Ss(t, i, A(n, 2), true);
      }
      function Kd(t, i) {
        var n = t == null ? 0 : t.length;
        if (n) {
          var c = vo(t, i, true) - 1;
          if (ae(t[c], i)) return c;
        }
        return -1;
      }
      function Jd(t) {
        return t && t.length ? ic(t) : [];
      }
      function Zd(t, i) {
        return t && t.length ? ic(t, A(i, 2)) : [];
      }
      function tg(t) {
        var i = t == null ? 0 : t.length;
        return i ? Jt(t, 1, i) : [];
      }
      function eg(t, i, n) {
        return t && t.length ? (i = n || i === r ? 1 : j(i), Jt(t, 0, i < 0 ? 0 : i)) : [];
      }
      function rg(t, i, n) {
        var c = t == null ? 0 : t.length;
        return c ? (i = n || i === r ? 1 : j(i), i = c - i, Jt(t, i < 0 ? 0 : i, c)) : [];
      }
      function ig(t, i) {
        return t && t.length ? bo(t, A(i, 3), false, true) : [];
      }
      function og(t, i) {
        return t && t.length ? bo(t, A(i, 3)) : [];
      }
      var ng = H(function(t) {
        return Xe(Tt2(t, 1, lt, true));
      }), sg = H(function(t) {
        var i = Zt(t);
        return lt(i) && (i = r), Xe(Tt2(t, 1, lt, true), A(i, 2));
      }), ag = H(function(t) {
        var i = Zt(t);
        return i = typeof i == "function" ? i : r, Xe(Tt2(t, 1, lt, true), r, i);
      });
      function ug(t) {
        return t && t.length ? Xe(t) : [];
      }
      function cg(t, i) {
        return t && t.length ? Xe(t, A(i, 2)) : [];
      }
      function lg(t, i) {
        return i = typeof i == "function" ? i : r, t && t.length ? Xe(t, r, i) : [];
      }
      function zs(t) {
        if (!(t && t.length)) return [];
        var i = 0;
        return t = He(t, function(n) {
          if (lt(n)) return i = mt(n.length, i), true;
        }), us(i, function(n) {
          return at(t, ns(n));
        });
      }
      function Bc(t, i) {
        if (!(t && t.length)) return [];
        var n = zs(t);
        return i == null ? n : at(n, function(c) {
          return Nt(i, r, c);
        });
      }
      var hg = H(function(t, i) {
        return lt(t) ? hi(t, i) : [];
      }), fg = H(function(t) {
        return Es(He(t, lt));
      }), pg = H(function(t) {
        var i = Zt(t);
        return lt(i) && (i = r), Es(He(t, lt), A(i, 2));
      }), mg = H(function(t) {
        var i = Zt(t);
        return i = typeof i == "function" ? i : r, Es(He(t, lt), r, i);
      }), dg = H(zs);
      function gg(t, i) {
        return ac(t || [], i || [], li);
      }
      function yg(t, i) {
        return ac(t || [], i || [], mi);
      }
      var vg = H(function(t) {
        var i = t.length, n = i > 1 ? t[i - 1] : r;
        return n = typeof n == "function" ? (t.pop(), n) : r, Bc(t, n);
      });
      function Wc(t) {
        var i = f(t);
        return i.__chain__ = true, i;
      }
      function bg(t, i) {
        return i(t), t;
      }
      function Oo(t, i) {
        return i(t);
      }
      var Tg = Ae(function(t) {
        var i = t.length, n = i ? t[0] : 0, c = this.__wrapped__, l = function(m) {
          return gs(m, t);
        };
        return i > 1 || this.__actions__.length || !(c instanceof $) || !Re(n) ? this.thru(l) : (c = c.slice(n, +n + (i ? 1 : 0)), c.__actions__.push({ func: Oo, args: [l], thisArg: r }), new Qt(c, this.__chain__).thru(function(m) {
          return i && !m.length && m.push(r), m;
        }));
      });
      function Pg() {
        return Wc(this);
      }
      function xg() {
        return new Qt(this.value(), this.__chain__);
      }
      function wg() {
        this.__values__ === r && (this.__values__ = ol(this.value()));
        var t = this.__index__ >= this.__values__.length, i = t ? r : this.__values__[this.__index__++];
        return { done: t, value: i };
      }
      function Cg() {
        return this;
      }
      function _g(t) {
        for (var i, n = this; n instanceof fo; ) {
          var c = Vc(n);
          c.__index__ = 0, c.__values__ = r, i ? l.__wrapped__ = c : i = c;
          var l = c;
          n = n.__wrapped__;
        }
        return l.__wrapped__ = t, i;
      }
      function Lg() {
        var t = this.__wrapped__;
        if (t instanceof $) {
          var i = t;
          return this.__actions__.length && (i = new $(this)), i = i.reverse(), i.__actions__.push({ func: Oo, args: [Ws], thisArg: r }), new Qt(i, this.__chain__);
        }
        return this.thru(Ws);
      }
      function Sg() {
        return sc(this.__wrapped__, this.__actions__);
      }
      var Og = To(function(t, i, n) {
        et.call(t, n) ? ++t[n] : Ie(t, n, 1);
      });
      function Eg(t, i, n) {
        var c = N(t) ? bu : bm;
        return n && Et(t, i, n) && (i = r), c(t, A(i, 3));
      }
      function Dg(t, i) {
        var n = N(t) ? He : Bu;
        return n(t, A(i, 3));
      }
      var Ig = yc(Nc), Mg = yc(Gc);
      function Ag(t, i) {
        return Tt2(Eo(t, i), 1);
      }
      function Rg(t, i) {
        return Tt2(Eo(t, i), ir);
      }
      function Fg(t, i, n) {
        return n = n === r ? 1 : j(n), Tt2(Eo(t, i), n);
      }
      function zc(t, i) {
        var n = N(t) ? Xt : qe;
        return n(t, A(i, 3));
      }
      function $c(t, i) {
        var n = N(t) ? tp : Hu;
        return n(t, A(i, 3));
      }
      var kg = To(function(t, i, n) {
        et.call(t, n) ? t[n].push(i) : Ie(t, n, [i]);
      });
      function Vg(t, i, n, c) {
        t = At(t) ? t : Vr(t), n = n && !c ? j(n) : 0;
        var l = t.length;
        return n < 0 && (n = mt(l + n, 0)), Ro(t) ? n <= l && t.indexOf(i, n) > -1 : !!l && Lr(t, i, n) > -1;
      }
      var Ng = H(function(t, i, n) {
        var c = -1, l = typeof i == "function", m = At(t) ? x(t.length) : [];
        return qe(t, function(g) {
          m[++c] = l ? Nt(i, g, n) : fi(g, i, n);
        }), m;
      }), Gg = To(function(t, i, n) {
        Ie(t, n, i);
      });
      function Eo(t, i) {
        var n = N(t) ? at : Yu;
        return n(t, A(i, 3));
      }
      function jg(t, i, n, c) {
        return t == null ? [] : (N(i) || (i = i == null ? [] : [i]), n = c ? r : n, N(n) || (n = n == null ? [] : [n]), Zu(t, i, n));
      }
      var Ug = To(function(t, i, n) {
        t[n ? 0 : 1].push(i);
      }, function() {
        return [[], []];
      });
      function Hg(t, i, n) {
        var c = N(t) ? is : wu, l = arguments.length < 3;
        return c(t, A(i, 4), n, l, qe);
      }
      function Bg(t, i, n) {
        var c = N(t) ? ep : wu, l = arguments.length < 3;
        return c(t, A(i, 4), n, l, Hu);
      }
      function Wg(t, i) {
        var n = N(t) ? He : Bu;
        return n(t, Mo(A(i, 3)));
      }
      function zg(t) {
        var i = N(t) ? Nu : Vm;
        return i(t);
      }
      function $g(t, i, n) {
        (n ? Et(t, i, n) : i === r) ? i = 1 : i = j(i);
        var c = N(t) ? mm : Nm;
        return c(t, i);
      }
      function qg(t) {
        var i = N(t) ? dm : jm;
        return i(t);
      }
      function Xg(t) {
        if (t == null) return 0;
        if (At(t)) return Ro(t) ? Or(t) : t.length;
        var i = _t2(t);
        return i == ie || i == oe ? t.size : xs(t).length;
      }
      function Yg(t, i, n) {
        var c = N(t) ? os : Um;
        return n && Et(t, i, n) && (i = r), c(t, A(i, 3));
      }
      var Qg = H(function(t, i) {
        if (t == null) return [];
        var n = i.length;
        return n > 1 && Et(t, i[0], i[1]) ? i = [] : n > 2 && Et(i[0], i[1], i[2]) && (i = [i[0]]), Zu(t, Tt2(i, 1), []);
      }), Do = Dp || function() {
        return gt.Date.now();
      };
      function Kg(t, i) {
        if (typeof i != "function") throw new Yt(h);
        return t = j(t), function() {
          if (--t < 1) return i.apply(this, arguments);
        };
      }
      function qc(t, i, n) {
        return i = n ? r : i, i = t && i == null ? t.length : i, Me(t, Se, r, r, r, r, i);
      }
      function Xc(t, i) {
        var n;
        if (typeof i != "function") throw new Yt(h);
        return t = j(t), function() {
          return --t > 0 && (n = i.apply(this, arguments)), t <= 1 && (i = r), n;
        };
      }
      var $s = H(function(t, i, n) {
        var c = K2;
        if (n.length) {
          var l = We(n, Fr($s));
          c |= pe;
        }
        return Me(t, c, i, n, l);
      }), Yc = H(function(t, i, n) {
        var c = K2 | nt;
        if (n.length) {
          var l = We(n, Fr(Yc));
          c |= pe;
        }
        return Me(i, c, t, n, l);
      });
      function Qc(t, i, n) {
        i = n ? r : i;
        var c = Me(t, bt, r, r, r, r, r, i);
        return c.placeholder = Qc.placeholder, c;
      }
      function Kc(t, i, n) {
        i = n ? r : i;
        var c = Me(t, fe, r, r, r, r, r, i);
        return c.placeholder = Kc.placeholder, c;
      }
      function Jc(t, i, n) {
        var c, l, m, g, y, b, C = 0, _ = false, S = false, O = true;
        if (typeof t != "function") throw new Yt(h);
        i = te(i) || 0, ut(n) && (_ = !!n.leading, S = "maxWait" in n, m = S ? mt(te(n.maxWait) || 0, i) : m, O = "trailing" in n ? !!n.trailing : O);
        function M(ht) {
          var ue = c, Ve2 = l;
          return c = l = r, C = ht, g = t.apply(Ve2, ue), g;
        }
        function R(ht) {
          return C = ht, y = yi(z, i), _ ? M(ht) : g;
        }
        function U(ht) {
          var ue = ht - b, Ve2 = ht - C, yl = i - ue;
          return S ? Ct(yl, m - Ve2) : yl;
        }
        function F(ht) {
          var ue = ht - b, Ve2 = ht - C;
          return b === r || ue >= i || ue < 0 || S && Ve2 >= m;
        }
        function z() {
          var ht = Do();
          if (F(ht)) return q(ht);
          y = yi(z, U(ht));
        }
        function q(ht) {
          return y = r, O && c ? M(ht) : (c = l = r, g);
        }
        function Ht() {
          y !== r && uc(y), C = 0, c = b = l = y = r;
        }
        function Dt() {
          return y === r ? g : q(Do());
        }
        function Bt() {
          var ht = Do(), ue = F(ht);
          if (c = arguments, l = this, b = ht, ue) {
            if (y === r) return R(b);
            if (S) return uc(y), y = yi(z, i), M(b);
          }
          return y === r && (y = yi(z, i)), g;
        }
        return Bt.cancel = Ht, Bt.flush = Dt, Bt;
      }
      var Jg = H(function(t, i) {
        return Uu(t, 1, i);
      }), Zg = H(function(t, i, n) {
        return Uu(t, te(i) || 0, n);
      });
      function ty(t) {
        return Me(t, Vn);
      }
      function Io(t, i) {
        if (typeof t != "function" || i != null && typeof i != "function") throw new Yt(h);
        var n = function() {
          var c = arguments, l = i ? i.apply(this, c) : c[0], m = n.cache;
          if (m.has(l)) return m.get(l);
          var g = t.apply(this, c);
          return n.cache = m.set(l, g) || m, g;
        };
        return n.cache = new (Io.Cache || De)(), n;
      }
      Io.Cache = De;
      function Mo(t) {
        if (typeof t != "function") throw new Yt(h);
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
      function ey(t) {
        return Xc(2, t);
      }
      var ry = Hm(function(t, i) {
        i = i.length == 1 && N(i[0]) ? at(i[0], Gt(A())) : at(Tt2(i, 1), Gt(A()));
        var n = i.length;
        return H(function(c) {
          for (var l = -1, m = Ct(c.length, n); ++l < m; ) c[l] = i[l].call(this, c[l]);
          return Nt(t, this, c);
        });
      }), qs = H(function(t, i) {
        var n = We(i, Fr(qs));
        return Me(t, pe, r, i, n);
      }), Zc = H(function(t, i) {
        var n = We(i, Fr(Zc));
        return Me(t, xr, r, i, n);
      }), iy = Ae(function(t, i) {
        return Me(t, Qr, r, r, r, i);
      });
      function oy(t, i) {
        if (typeof t != "function") throw new Yt(h);
        return i = i === r ? i : j(i), H(t, i);
      }
      function ny(t, i) {
        if (typeof t != "function") throw new Yt(h);
        return i = i == null ? 0 : mt(j(i), 0), H(function(n) {
          var c = n[i], l = Qe(n, 0, i);
          return c && Be(l, c), Nt(t, this, l);
        });
      }
      function sy(t, i, n) {
        var c = true, l = true;
        if (typeof t != "function") throw new Yt(h);
        return ut(n) && (c = "leading" in n ? !!n.leading : c, l = "trailing" in n ? !!n.trailing : l), Jc(t, i, { leading: c, maxWait: i, trailing: l });
      }
      function ay(t) {
        return qc(t, 1);
      }
      function uy(t, i) {
        return qs(Is(i), t);
      }
      function cy() {
        if (!arguments.length) return [];
        var t = arguments[0];
        return N(t) ? t : [t];
      }
      function ly(t) {
        return Kt(t, I);
      }
      function hy(t, i) {
        return i = typeof i == "function" ? i : r, Kt(t, I, i);
      }
      function fy(t) {
        return Kt(t, E | I);
      }
      function py(t, i) {
        return i = typeof i == "function" ? i : r, Kt(t, E | I, i);
      }
      function my(t, i) {
        return i == null || ju(t, i, yt(i));
      }
      function ae(t, i) {
        return t === i || t !== t && i !== i;
      }
      var dy = Co(bs), gy = Co(function(t, i) {
        return t >= i;
      }), fr2 = $u(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? $u : function(t) {
        return ct(t) && et.call(t, "callee") && !Mu.call(t, "callee");
      }, N = x.isArray, yy = pu ? Gt(pu) : _m;
      function At(t) {
        return t != null && Ao(t.length) && !Fe(t);
      }
      function lt(t) {
        return ct(t) && At(t);
      }
      function vy(t) {
        return t === true || t === false || ct(t) && Ot(t) == Kr;
      }
      var Ke2 = Mp || oa2, by = mu ? Gt(mu) : Lm;
      function Ty(t) {
        return ct(t) && t.nodeType === 1 && !vi(t);
      }
      function Py(t) {
        if (t == null) return true;
        if (At(t) && (N(t) || typeof t == "string" || typeof t.splice == "function" || Ke2(t) || kr(t) || fr2(t))) return !t.length;
        var i = _t2(t);
        if (i == ie || i == oe) return !t.size;
        if (gi(t)) return !xs(t).length;
        for (var n in t) if (et.call(t, n)) return false;
        return true;
      }
      function xy(t, i) {
        return pi(t, i);
      }
      function wy(t, i, n) {
        n = typeof n == "function" ? n : r;
        var c = n ? n(t, i) : r;
        return c === r ? pi(t, i, r, n) : !!c;
      }
      function Xs(t) {
        if (!ct(t)) return false;
        var i = Ot(t);
        return i == Wi || i == zh || typeof t.message == "string" && typeof t.name == "string" && !vi(t);
      }
      function Cy(t) {
        return typeof t == "number" && Ru(t);
      }
      function Fe(t) {
        if (!ut(t)) return false;
        var i = Ot(t);
        return i == zi || i == Ua || i == Wh || i == qh;
      }
      function tl(t) {
        return typeof t == "number" && t == j(t);
      }
      function Ao(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Ue;
      }
      function ut(t) {
        var i = typeof t;
        return t != null && (i == "object" || i == "function");
      }
      function ct(t) {
        return t != null && typeof t == "object";
      }
      var el = du ? Gt(du) : Om;
      function _y(t, i) {
        return t === i || Ps(t, i, Ns(i));
      }
      function Ly(t, i, n) {
        return n = typeof n == "function" ? n : r, Ps(t, i, Ns(i), n);
      }
      function Sy(t) {
        return rl(t) && t != +t;
      }
      function Oy(t) {
        if (hd(t)) throw new V(u);
        return qu(t);
      }
      function Ey(t) {
        return t === null;
      }
      function Dy(t) {
        return t == null;
      }
      function rl(t) {
        return typeof t == "number" || ct(t) && Ot(t) == Zr;
      }
      function vi(t) {
        if (!ct(t) || Ot(t) != Oe) return false;
        var i = no(t);
        if (i === null) return true;
        var n = et.call(i, "constructor") && i.constructor;
        return typeof n == "function" && n instanceof n && eo.call(n) == Lp;
      }
      var Ys = gu ? Gt(gu) : Em;
      function Iy(t) {
        return tl(t) && t >= -Ue && t <= Ue;
      }
      var il = yu ? Gt(yu) : Dm;
      function Ro(t) {
        return typeof t == "string" || !N(t) && ct(t) && Ot(t) == ei;
      }
      function Ut(t) {
        return typeof t == "symbol" || ct(t) && Ot(t) == $i;
      }
      var kr = vu ? Gt(vu) : Im;
      function My(t) {
        return t === r;
      }
      function Ay(t) {
        return ct(t) && _t2(t) == ri;
      }
      function Ry(t) {
        return ct(t) && Ot(t) == Yh;
      }
      var Fy = Co(ws), ky = Co(function(t, i) {
        return t <= i;
      });
      function ol(t) {
        if (!t) return [];
        if (At(t)) return Ro(t) ? ne(t) : Mt(t);
        if (ni && t[ni]) return mp(t[ni]());
        var i = _t2(t), n = i == ie ? ls : i == oe ? Ji : Vr;
        return n(t);
      }
      function ke(t) {
        if (!t) return t === 0 ? t : 0;
        if (t = te(t), t === ir || t === -ir) {
          var i = t < 0 ? -1 : 1;
          return i * jh;
        }
        return t === t ? t : 0;
      }
      function j(t) {
        var i = ke(t), n = i % 1;
        return i === i ? n ? i - n : i : 0;
      }
      function nl(t) {
        return t ? ur(j(t), 0, me) : 0;
      }
      function te(t) {
        if (typeof t == "number") return t;
        if (Ut(t)) return Hi;
        if (ut(t)) {
          var i = typeof t.valueOf == "function" ? t.valueOf() : t;
          t = ut(i) ? i + "" : i;
        }
        if (typeof t != "string") return t === 0 ? t : +t;
        t = Cu(t);
        var n = yf.test(t);
        return n || bf.test(t) ? Kf(t.slice(2), n ? 2 : 8) : gf.test(t) ? Hi : +t;
      }
      function sl(t) {
        return ge(t, Rt(t));
      }
      function Vy(t) {
        return t ? ur(j(t), -Ue, Ue) : t === 0 ? t : 0;
      }
      function tt(t) {
        return t == null ? "" : jt(t);
      }
      var Ny = Ar(function(t, i) {
        if (gi(i) || At(i)) {
          ge(i, yt(i), t);
          return;
        }
        for (var n in i) et.call(i, n) && li(t, n, i[n]);
      }), al = Ar(function(t, i) {
        ge(i, Rt(i), t);
      }), Fo2 = Ar(function(t, i, n, c) {
        ge(i, Rt(i), t, c);
      }), Gy = Ar(function(t, i, n, c) {
        ge(i, yt(i), t, c);
      }), jy = Ae(gs);
      function Uy(t, i) {
        var n = Mr(t);
        return i == null ? n : Gu(n, i);
      }
      var Hy = H(function(t, i) {
        t = it(t);
        var n = -1, c = i.length, l = c > 2 ? i[2] : r;
        for (l && Et(i[0], i[1], l) && (c = 1); ++n < c; ) for (var m = i[n], g = Rt(m), y = -1, b = g.length; ++y < b; ) {
          var C = g[y], _ = t[C];
          (_ === r || ae(_, Er[C]) && !et.call(t, C)) && (t[C] = m[C]);
        }
        return t;
      }), By = H(function(t) {
        return t.push(r, Cc), Nt(ul, r, t);
      });
      function Wy(t, i) {
        return Tu(t, A(i, 3), de);
      }
      function zy(t, i) {
        return Tu(t, A(i, 3), vs);
      }
      function $y(t, i) {
        return t == null ? t : ys(t, A(i, 3), Rt);
      }
      function qy(t, i) {
        return t == null ? t : Wu(t, A(i, 3), Rt);
      }
      function Xy(t, i) {
        return t && de(t, A(i, 3));
      }
      function Yy(t, i) {
        return t && vs(t, A(i, 3));
      }
      function Qy(t) {
        return t == null ? [] : go(t, yt(t));
      }
      function Ky(t) {
        return t == null ? [] : go(t, Rt(t));
      }
      function Qs(t, i, n) {
        var c = t == null ? r : cr(t, i);
        return c === r ? n : c;
      }
      function Jy(t, i) {
        return t != null && Sc(t, i, Pm);
      }
      function Ks(t, i) {
        return t != null && Sc(t, i, xm);
      }
      var Zy = bc(function(t, i, n) {
        i != null && typeof i.toString != "function" && (i = ro.call(i)), t[i] = n;
      }, Zs(Ft2)), tv = bc(function(t, i, n) {
        i != null && typeof i.toString != "function" && (i = ro.call(i)), et.call(t, i) ? t[i].push(n) : t[i] = [n];
      }, A), ev = H(fi);
      function yt(t) {
        return At(t) ? Vu(t) : xs(t);
      }
      function Rt(t) {
        return At(t) ? Vu(t, true) : Mm(t);
      }
      function rv(t, i) {
        var n = {};
        return i = A(i, 3), de(t, function(c, l, m) {
          Ie(n, i(c, l, m), c);
        }), n;
      }
      function iv(t, i) {
        var n = {};
        return i = A(i, 3), de(t, function(c, l, m) {
          Ie(n, l, i(c, l, m));
        }), n;
      }
      var ov = Ar(function(t, i, n) {
        yo(t, i, n);
      }), ul = Ar(function(t, i, n, c) {
        yo(t, i, n, c);
      }), nv = Ae(function(t, i) {
        var n = {};
        if (t == null) return n;
        var c = false;
        i = at(i, function(m) {
          return m = Ye(m, t), c || (c = m.length > 1), m;
        }), ge(t, ks(t), n), c && (n = Kt(n, E | B | I, Zm));
        for (var l = i.length; l--; ) Os(n, i[l]);
        return n;
      });
      function sv(t, i) {
        return cl(t, Mo(A(i)));
      }
      var av = Ae(function(t, i) {
        return t == null ? {} : Rm(t, i);
      });
      function cl(t, i) {
        if (t == null) return {};
        var n = at(ks(t), function(c) {
          return [c];
        });
        return i = A(i), tc(t, n, function(c, l) {
          return i(c, l[0]);
        });
      }
      function uv(t, i, n) {
        i = Ye(i, t);
        var c = -1, l = i.length;
        for (l || (l = 1, t = r); ++c < l; ) {
          var m = t == null ? r : t[ye2(i[c])];
          m === r && (c = l, m = n), t = Fe(m) ? m.call(t) : m;
        }
        return t;
      }
      function cv(t, i, n) {
        return t == null ? t : mi(t, i, n);
      }
      function lv(t, i, n, c) {
        return c = typeof c == "function" ? c : r, t == null ? t : mi(t, i, n, c);
      }
      var ll = xc(yt), hl = xc(Rt);
      function hv(t, i, n) {
        var c = N(t), l = c || Ke2(t) || kr(t);
        if (i = A(i, 4), n == null) {
          var m = t && t.constructor;
          l ? n = c ? new m() : [] : ut(t) ? n = Fe(m) ? Mr(no(t)) : {} : n = {};
        }
        return (l ? Xt : de)(t, function(g, y, b) {
          return i(n, g, y, b);
        }), n;
      }
      function fv(t, i) {
        return t == null ? true : Os(t, i);
      }
      function pv(t, i, n) {
        return t == null ? t : nc(t, i, Is(n));
      }
      function mv(t, i, n, c) {
        return c = typeof c == "function" ? c : r, t == null ? t : nc(t, i, Is(n), c);
      }
      function Vr(t) {
        return t == null ? [] : cs(t, yt(t));
      }
      function dv(t) {
        return t == null ? [] : cs(t, Rt(t));
      }
      function gv(t, i, n) {
        return n === r && (n = i, i = r), n !== r && (n = te(n), n = n === n ? n : 0), i !== r && (i = te(i), i = i === i ? i : 0), ur(te(t), i, n);
      }
      function yv(t, i, n) {
        return i = ke(i), n === r ? (n = i, i = 0) : n = ke(n), t = te(t), wm(t, i, n);
      }
      function vv(t, i, n) {
        if (n && typeof n != "boolean" && Et(t, i, n) && (i = n = r), n === r && (typeof i == "boolean" ? (n = i, i = r) : typeof t == "boolean" && (n = t, t = r)), t === r && i === r ? (t = 0, i = 1) : (t = ke(t), i === r ? (i = t, t = 0) : i = ke(i)), t > i) {
          var c = t;
          t = i, i = c;
        }
        if (n || t % 1 || i % 1) {
          var l = Fu();
          return Ct(t + l * (i - t + Qf("1e-" + ((l + "").length - 1))), i);
        }
        return _s(t, i);
      }
      var bv = Rr(function(t, i, n) {
        return i = i.toLowerCase(), t + (n ? fl(i) : i);
      });
      function fl(t) {
        return Js(tt(t).toLowerCase());
      }
      function pl(t) {
        return t = tt(t), t && t.replace(Pf, cp).replace(jf, "");
      }
      function Tv(t, i, n) {
        t = tt(t), i = jt(i);
        var c = t.length;
        n = n === r ? c : ur(j(n), 0, c);
        var l = n;
        return n -= i.length, n >= 0 && t.slice(n, l) == i;
      }
      function Pv(t) {
        return t = tt(t), t && tf.test(t) ? t.replace(Wa, lp) : t;
      }
      function xv(t) {
        return t = tt(t), t && af.test(t) ? t.replace(qn, "\\$&") : t;
      }
      var wv = Rr(function(t, i, n) {
        return t + (n ? "-" : "") + i.toLowerCase();
      }), Cv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + i.toLowerCase();
      }), _v = gc("toLowerCase");
      function Lv(t, i, n) {
        t = tt(t), i = j(i);
        var c = i ? Or(t) : 0;
        if (!i || c >= i) return t;
        var l = (i - c) / 2;
        return wo(co(l), n) + t + wo(uo(l), n);
      }
      function Sv(t, i, n) {
        t = tt(t), i = j(i);
        var c = i ? Or(t) : 0;
        return i && c < i ? t + wo(i - c, n) : t;
      }
      function Ov(t, i, n) {
        t = tt(t), i = j(i);
        var c = i ? Or(t) : 0;
        return i && c < i ? wo(i - c, n) + t : t;
      }
      function Ev(t, i, n) {
        return n || i == null ? i = 0 : i && (i = +i), kp(tt(t).replace(Xn, ""), i || 0);
      }
      function Dv(t, i, n) {
        return (n ? Et(t, i, n) : i === r) ? i = 1 : i = j(i), Ls(tt(t), i);
      }
      function Iv() {
        var t = arguments, i = tt(t[0]);
        return t.length < 3 ? i : i.replace(t[1], t[2]);
      }
      var Mv = Rr(function(t, i, n) {
        return t + (n ? "_" : "") + i.toLowerCase();
      });
      function Av(t, i, n) {
        return n && typeof n != "number" && Et(t, i, n) && (i = n = r), n = n === r ? me : n >>> 0, n ? (t = tt(t), t && (typeof i == "string" || i != null && !Ys(i)) && (i = jt(i), !i && Sr(t)) ? Qe(ne(t), 0, n) : t.split(i, n)) : [];
      }
      var Rv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + Js(i);
      });
      function Fv(t, i, n) {
        return t = tt(t), n = n == null ? 0 : ur(j(n), 0, t.length), i = jt(i), t.slice(n, n + i.length) == i;
      }
      function kv(t, i, n) {
        var c = f.templateSettings;
        n && Et(t, i, n) && (i = r), t = tt(t), i = Fo2({}, i, c, wc);
        var l = Fo2({}, i.imports, c.imports, wc), m = yt(l), g = cs(l, m), y, b, C = 0, _ = i.interpolate || qi, S = "__p += '", O = hs((i.escape || qi).source + "|" + _.source + "|" + (_ === za ? df : qi).source + "|" + (i.evaluate || qi).source + "|$", "g"), M = "//# sourceURL=" + (et.call(i, "sourceURL") ? (i.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++zf + "]") + `
`;
        t.replace(O, function(F, z, q, Ht, Dt, Bt) {
          return q || (q = Ht), S += t.slice(C, Bt).replace(xf, hp), z && (y = true, S += `' +
__e(` + z + `) +
'`), Dt && (b = true, S += `';
` + Dt + `;
__p += '`), q && (S += `' +
((__t = (` + q + `)) == null ? '' : __t) +
'`), C = Bt + F.length, F;
        }), S += `';
`;
        var R = et.call(i, "variable") && i.variable;
        if (!R) S = `with (obj) {
` + S + `
}
`;
        else if (pf.test(R)) throw new V(p);
        S = (b ? S.replace(Qh, "") : S).replace(Kh, "$1").replace(Jh, "$1;"), S = "function(" + (R || "obj") + `) {
` + (R ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (y ? ", __e = _.escape" : "") + (b ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + S + `return __p
}`;
        var U = dl(function() {
          return J(m, M + "return " + S).apply(r, g);
        });
        if (U.source = S, Xs(U)) throw U;
        return U;
      }
      function Vv(t) {
        return tt(t).toLowerCase();
      }
      function Nv(t) {
        return tt(t).toUpperCase();
      }
      function Gv(t, i, n) {
        if (t = tt(t), t && (n || i === r)) return Cu(t);
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = ne(i), m = _u(c, l), g = Lu(c, l) + 1;
        return Qe(c, m, g).join("");
      }
      function jv(t, i, n) {
        if (t = tt(t), t && (n || i === r)) return t.slice(0, Ou(t) + 1);
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = Lu(c, ne(i)) + 1;
        return Qe(c, 0, l).join("");
      }
      function Uv(t, i, n) {
        if (t = tt(t), t && (n || i === r)) return t.replace(Xn, "");
        if (!t || !(i = jt(i))) return t;
        var c = ne(t), l = _u(c, ne(i));
        return Qe(c, l).join("");
      }
      function Hv(t, i) {
        var n = Rh2, c = Fh;
        if (ut(i)) {
          var l = "separator" in i ? i.separator : l;
          n = "length" in i ? j(i.length) : n, c = "omission" in i ? jt(i.omission) : c;
        }
        t = tt(t);
        var m = t.length;
        if (Sr(t)) {
          var g = ne(t);
          m = g.length;
        }
        if (n >= m) return t;
        var y = n - Or(c);
        if (y < 1) return c;
        var b = g ? Qe(g, 0, y).join("") : t.slice(0, y);
        if (l === r) return b + c;
        if (g && (y += b.length - y), Ys(l)) {
          if (t.slice(y).search(l)) {
            var C, _ = b;
            for (l.global || (l = hs(l.source, tt($a.exec(l)) + "g")), l.lastIndex = 0; C = l.exec(_); ) var S = C.index;
            b = b.slice(0, S === r ? y : S);
          }
        } else if (t.indexOf(jt(l), y) != y) {
          var O = b.lastIndexOf(l);
          O > -1 && (b = b.slice(0, O));
        }
        return b + c;
      }
      function Bv(t) {
        return t = tt(t), t && Zh.test(t) ? t.replace(Ba, vp) : t;
      }
      var Wv = Rr(function(t, i, n) {
        return t + (n ? " " : "") + i.toUpperCase();
      }), Js = gc("toUpperCase");
      function ml(t, i, n) {
        return t = tt(t), i = n ? r : i, i === r ? pp(t) ? Pp(t) : op(t) : t.match(i) || [];
      }
      var dl = H(function(t, i) {
        try {
          return Nt(t, r, i);
        } catch (n) {
          return Xs(n) ? n : new V(n);
        }
      }), zv = Ae(function(t, i) {
        return Xt(i, function(n) {
          n = ye2(n), Ie(t, n, $s(t[n], t));
        }), t;
      });
      function $v(t) {
        var i = t == null ? 0 : t.length, n = A();
        return t = i ? at(t, function(c) {
          if (typeof c[1] != "function") throw new Yt(h);
          return [n(c[0]), c[1]];
        }) : [], H(function(c) {
          for (var l = -1; ++l < i; ) {
            var m = t[l];
            if (Nt(m[0], this, c)) return Nt(m[1], this, c);
          }
        });
      }
      function qv(t) {
        return vm(Kt(t, E));
      }
      function Zs(t) {
        return function() {
          return t;
        };
      }
      function Xv(t, i) {
        return t == null || t !== t ? i : t;
      }
      var Yv = vc(), Qv = vc(true);
      function Ft2(t) {
        return t;
      }
      function ta(t) {
        return Xu(typeof t == "function" ? t : Kt(t, E));
      }
      function Kv(t) {
        return Qu(Kt(t, E));
      }
      function Jv(t, i) {
        return Ku(t, Kt(i, E));
      }
      var Zv = H(function(t, i) {
        return function(n) {
          return fi(n, t, i);
        };
      }), tb = H(function(t, i) {
        return function(n) {
          return fi(t, n, i);
        };
      });
      function ea(t, i, n) {
        var c = yt(i), l = go(i, c);
        n == null && !(ut(i) && (l.length || !c.length)) && (n = i, i = t, t = this, l = go(i, yt(i)));
        var m = !(ut(n) && "chain" in n) || !!n.chain, g = Fe(t);
        return Xt(l, function(y) {
          var b = i[y];
          t[y] = b, g && (t.prototype[y] = function() {
            var C = this.__chain__;
            if (m || C) {
              var _ = t(this.__wrapped__), S = _.__actions__ = Mt(this.__actions__);
              return S.push({ func: b, args: arguments, thisArg: t }), _.__chain__ = C, _;
            }
            return b.apply(t, Be([this.value()], arguments));
          });
        }), t;
      }
      function eb() {
        return gt._ === this && (gt._ = Sp), this;
      }
      function ra() {
      }
      function rb(t) {
        return t = j(t), H(function(i) {
          return Ju(i, t);
        });
      }
      var ib = As(at), ob = As(bu), nb = As(os);
      function gl(t) {
        return js(t) ? ns(ye2(t)) : Fm(t);
      }
      function sb(t) {
        return function(i) {
          return t == null ? r : cr(t, i);
        };
      }
      var ab = Tc(), ub = Tc(true);
      function ia() {
        return [];
      }
      function oa2() {
        return false;
      }
      function cb() {
        return {};
      }
      function lb() {
        return "";
      }
      function hb() {
        return true;
      }
      function fb(t, i) {
        if (t = j(t), t < 1 || t > Ue) return [];
        var n = me, c = Ct(t, me);
        i = A(i), t -= me;
        for (var l = us(c, i); ++n < t; ) i(n);
        return l;
      }
      function pb(t) {
        return N(t) ? at(t, ye2) : Ut(t) ? [t] : Mt(kc(tt(t)));
      }
      function mb(t) {
        var i = ++_p;
        return tt(t) + i;
      }
      var db = xo(function(t, i) {
        return t + i;
      }, 0), gb = Rs("ceil"), yb = xo(function(t, i) {
        return t / i;
      }, 1), vb = Rs("floor");
      function bb(t) {
        return t && t.length ? mo(t, Ft2, bs) : r;
      }
      function Tb(t, i) {
        return t && t.length ? mo(t, A(i, 2), bs) : r;
      }
      function Pb(t) {
        return xu(t, Ft2);
      }
      function xb(t, i) {
        return xu(t, A(i, 2));
      }
      function wb(t) {
        return t && t.length ? mo(t, Ft2, ws) : r;
      }
      function Cb(t, i) {
        return t && t.length ? mo(t, A(i, 2), ws) : r;
      }
      var _b = xo(function(t, i) {
        return t * i;
      }, 1), Lb = Rs("round"), Sb = xo(function(t, i) {
        return t - i;
      }, 0);
      function Ob(t) {
        return t && t.length ? as(t, Ft2) : 0;
      }
      function Eb(t, i) {
        return t && t.length ? as(t, A(i, 2)) : 0;
      }
      return f.after = Kg, f.ary = qc, f.assign = Ny, f.assignIn = al, f.assignInWith = Fo2, f.assignWith = Gy, f.at = jy, f.before = Xc, f.bind = $s, f.bindAll = zv, f.bindKey = Yc, f.castArray = cy, f.chain = Wc, f.chunk = vd, f.compact = bd, f.concat = Td, f.cond = $v, f.conforms = qv, f.constant = Zs, f.countBy = Og, f.create = Uy, f.curry = Qc, f.curryRight = Kc, f.debounce = Jc, f.defaults = Hy, f.defaultsDeep = By, f.defer = Jg, f.delay = Zg, f.difference = Pd, f.differenceBy = xd, f.differenceWith = wd, f.drop = Cd, f.dropRight = _d, f.dropRightWhile = Ld, f.dropWhile = Sd, f.fill = Od, f.filter = Dg, f.flatMap = Ag, f.flatMapDeep = Rg, f.flatMapDepth = Fg, f.flatten = jc, f.flattenDeep = Ed, f.flattenDepth = Dd, f.flip = ty, f.flow = Yv, f.flowRight = Qv, f.fromPairs = Id, f.functions = Qy, f.functionsIn = Ky, f.groupBy = kg, f.initial = Ad, f.intersection = Rd, f.intersectionBy = Fd, f.intersectionWith = kd, f.invert = Zy, f.invertBy = tv, f.invokeMap = Ng, f.iteratee = ta, f.keyBy = Gg, f.keys = yt, f.keysIn = Rt, f.map = Eo, f.mapKeys = rv, f.mapValues = iv, f.matches = Kv, f.matchesProperty = Jv, f.memoize = Io, f.merge = ov, f.mergeWith = ul, f.method = Zv, f.methodOf = tb, f.mixin = ea, f.negate = Mo, f.nthArg = rb, f.omit = nv, f.omitBy = sv, f.once = ey, f.orderBy = jg, f.over = ib, f.overArgs = ry, f.overEvery = ob, f.overSome = nb, f.partial = qs, f.partialRight = Zc, f.partition = Ug, f.pick = av, f.pickBy = cl, f.property = gl, f.propertyOf = sb, f.pull = jd, f.pullAll = Hc, f.pullAllBy = Ud, f.pullAllWith = Hd, f.pullAt = Bd, f.range = ab, f.rangeRight = ub, f.rearg = iy, f.reject = Wg, f.remove = Wd, f.rest = oy, f.reverse = Ws, f.sampleSize = $g, f.set = cv, f.setWith = lv, f.shuffle = qg, f.slice = zd, f.sortBy = Qg, f.sortedUniq = Jd, f.sortedUniqBy = Zd, f.split = Av, f.spread = ny, f.tail = tg, f.take = eg, f.takeRight = rg, f.takeRightWhile = ig, f.takeWhile = og, f.tap = bg, f.throttle = sy, f.thru = Oo, f.toArray = ol, f.toPairs = ll, f.toPairsIn = hl, f.toPath = pb, f.toPlainObject = sl, f.transform = hv, f.unary = ay, f.union = ng, f.unionBy = sg, f.unionWith = ag, f.uniq = ug, f.uniqBy = cg, f.uniqWith = lg, f.unset = fv, f.unzip = zs, f.unzipWith = Bc, f.update = pv, f.updateWith = mv, f.values = Vr, f.valuesIn = dv, f.without = hg, f.words = ml, f.wrap = uy, f.xor = fg, f.xorBy = pg, f.xorWith = mg, f.zip = dg, f.zipObject = gg, f.zipObjectDeep = yg, f.zipWith = vg, f.entries = ll, f.entriesIn = hl, f.extend = al, f.extendWith = Fo2, ea(f, f), f.add = db, f.attempt = dl, f.camelCase = bv, f.capitalize = fl, f.ceil = gb, f.clamp = gv, f.clone = ly, f.cloneDeep = fy, f.cloneDeepWith = py, f.cloneWith = hy, f.conformsTo = my, f.deburr = pl, f.defaultTo = Xv, f.divide = yb, f.endsWith = Tv, f.eq = ae, f.escape = Pv, f.escapeRegExp = xv, f.every = Eg, f.find = Ig, f.findIndex = Nc, f.findKey = Wy, f.findLast = Mg, f.findLastIndex = Gc, f.findLastKey = zy, f.floor = vb, f.forEach = zc, f.forEachRight = $c, f.forIn = $y, f.forInRight = qy, f.forOwn = Xy, f.forOwnRight = Yy, f.get = Qs, f.gt = dy, f.gte = gy, f.has = Jy, f.hasIn = Ks, f.head = Uc, f.identity = Ft2, f.includes = Vg, f.indexOf = Md, f.inRange = yv, f.invoke = ev, f.isArguments = fr2, f.isArray = N, f.isArrayBuffer = yy, f.isArrayLike = At, f.isArrayLikeObject = lt, f.isBoolean = vy, f.isBuffer = Ke2, f.isDate = by, f.isElement = Ty, f.isEmpty = Py, f.isEqual = xy, f.isEqualWith = wy, f.isError = Xs, f.isFinite = Cy, f.isFunction = Fe, f.isInteger = tl, f.isLength = Ao, f.isMap = el, f.isMatch = _y, f.isMatchWith = Ly, f.isNaN = Sy, f.isNative = Oy, f.isNil = Dy, f.isNull = Ey, f.isNumber = rl, f.isObject = ut, f.isObjectLike = ct, f.isPlainObject = vi, f.isRegExp = Ys, f.isSafeInteger = Iy, f.isSet = il, f.isString = Ro, f.isSymbol = Ut, f.isTypedArray = kr, f.isUndefined = My, f.isWeakMap = Ay, f.isWeakSet = Ry, f.join = Vd, f.kebabCase = wv, f.last = Zt, f.lastIndexOf = Nd, f.lowerCase = Cv, f.lowerFirst = _v, f.lt = Fy, f.lte = ky, f.max = bb, f.maxBy = Tb, f.mean = Pb, f.meanBy = xb, f.min = wb, f.minBy = Cb, f.stubArray = ia, f.stubFalse = oa2, f.stubObject = cb, f.stubString = lb, f.stubTrue = hb, f.multiply = _b, f.nth = Gd, f.noConflict = eb, f.noop = ra, f.now = Do, f.pad = Lv, f.padEnd = Sv, f.padStart = Ov, f.parseInt = Ev, f.random = vv, f.reduce = Hg, f.reduceRight = Bg, f.repeat = Dv, f.replace = Iv, f.result = uv, f.round = Lb, f.runInContext = v, f.sample = zg, f.size = Xg, f.snakeCase = Mv, f.some = Yg, f.sortedIndex = $d, f.sortedIndexBy = qd, f.sortedIndexOf = Xd, f.sortedLastIndex = Yd, f.sortedLastIndexBy = Qd, f.sortedLastIndexOf = Kd, f.startCase = Rv, f.startsWith = Fv, f.subtract = Sb, f.sum = Ob, f.sumBy = Eb, f.template = kv, f.times = fb, f.toFinite = ke, f.toInteger = j, f.toLength = nl, f.toLower = Vv, f.toNumber = te, f.toSafeInteger = Vy, f.toString = tt, f.toUpper = Nv, f.trim = Gv, f.trimEnd = jv, f.trimStart = Uv, f.truncate = Hv, f.unescape = Bv, f.uniqueId = mb, f.upperCase = Wv, f.upperFirst = Js, f.each = zc, f.eachRight = $c, f.first = Uc, ea(f, (function() {
        var t = {};
        return de(f, function(i, n) {
          et.call(f.prototype, n) || (t[n] = i);
        }), t;
      })(), { chain: false }), f.VERSION = o, Xt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
        f[t].placeholder = f;
      }), Xt(["drop", "take"], function(t, i) {
        $.prototype[t] = function(n) {
          n = n === r ? 1 : mt(j(n), 0);
          var c = this.__filtered__ && !i ? new $(this) : this.clone();
          return c.__filtered__ ? c.__takeCount__ = Ct(n, c.__takeCount__) : c.__views__.push({ size: Ct(n, me), type: t + (c.__dir__ < 0 ? "Right" : "") }), c;
        }, $.prototype[t + "Right"] = function(n) {
          return this.reverse()[t](n).reverse();
        };
      }), Xt(["filter", "map", "takeWhile"], function(t, i) {
        var n = i + 1, c = n == ja || n == Gh;
        $.prototype[t] = function(l) {
          var m = this.clone();
          return m.__iteratees__.push({ iteratee: A(l, 3), type: n }), m.__filtered__ = m.__filtered__ || c, m;
        };
      }), Xt(["head", "last"], function(t, i) {
        var n = "take" + (i ? "Right" : "");
        $.prototype[t] = function() {
          return this[n](1).value()[0];
        };
      }), Xt(["initial", "tail"], function(t, i) {
        var n = "drop" + (i ? "" : "Right");
        $.prototype[t] = function() {
          return this.__filtered__ ? new $(this) : this[n](1);
        };
      }), $.prototype.compact = function() {
        return this.filter(Ft2);
      }, $.prototype.find = function(t) {
        return this.filter(t).head();
      }, $.prototype.findLast = function(t) {
        return this.reverse().find(t);
      }, $.prototype.invokeMap = H(function(t, i) {
        return typeof t == "function" ? new $(this) : this.map(function(n) {
          return fi(n, t, i);
        });
      }), $.prototype.reject = function(t) {
        return this.filter(Mo(A(t)));
      }, $.prototype.slice = function(t, i) {
        t = j(t);
        var n = this;
        return n.__filtered__ && (t > 0 || i < 0) ? new $(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), i !== r && (i = j(i), n = i < 0 ? n.dropRight(-i) : n.take(i - t)), n);
      }, $.prototype.takeRightWhile = function(t) {
        return this.reverse().takeWhile(t).reverse();
      }, $.prototype.toArray = function() {
        return this.take(me);
      }, de($.prototype, function(t, i) {
        var n = /^(?:filter|find|map|reject)|While$/.test(i), c = /^(?:head|last)$/.test(i), l = f[c ? "take" + (i == "last" ? "Right" : "") : i], m = c || /^find/.test(i);
        l && (f.prototype[i] = function() {
          var g = this.__wrapped__, y = c ? [1] : arguments, b = g instanceof $, C = y[0], _ = b || N(g), S = function(z) {
            var q = l.apply(f, Be([z], y));
            return c && O ? q[0] : q;
          };
          _ && n && typeof C == "function" && C.length != 1 && (b = _ = false);
          var O = this.__chain__, M = !!this.__actions__.length, R = m && !O, U = b && !M;
          if (!m && _) {
            g = U ? g : new $(this);
            var F = t.apply(g, y);
            return F.__actions__.push({ func: Oo, args: [S], thisArg: r }), new Qt(F, O);
          }
          return R && U ? t.apply(this, y) : (F = this.thru(S), R ? c ? F.value()[0] : F.value() : F);
        });
      }), Xt(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
        var i = Zi[t], n = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", c = /^(?:pop|shift)$/.test(t);
        f.prototype[t] = function() {
          var l = arguments;
          if (c && !this.__chain__) {
            var m = this.value();
            return i.apply(N(m) ? m : [], l);
          }
          return this[n](function(g) {
            return i.apply(N(g) ? g : [], l);
          });
        };
      }), de($.prototype, function(t, i) {
        var n = f[i];
        if (n) {
          var c = n.name + "";
          et.call(Ir, c) || (Ir[c] = []), Ir[c].push({ name: i, func: n });
        }
      }), Ir[Po(r, nt).name] = [{ name: "wrapper", func: r }], $.prototype.clone = Bp, $.prototype.reverse = Wp, $.prototype.value = zp, f.prototype.at = Tg, f.prototype.chain = Pg, f.prototype.commit = xg, f.prototype.next = wg, f.prototype.plant = _g, f.prototype.reverse = Lg, f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = Sg, f.prototype.first = f.prototype.head, ni && (f.prototype[ni] = Cg), f;
    }, ze = xp();
    typeof define == "function" && typeof define.amd == "object" && define.amd ? (gt._ = ze, define(function() {
      return ze;
    })) : or ? ((or.exports = ze)._ = ze, ts._ = ze) : gt._ = ze;
  }).call(a5);
});
var Ih2 = class extends Set {
  constructor(a5, e = false) {
    super(a5), this.valuesAsFlags = e;
  }
};
function Vi2(a5) {
  if (a5 instanceof Map) return Object.fromEntries([...a5.entries()].map(([e, r]) => [e, Vi2(r)]));
  if (a5 instanceof Set) return Array.from(a5.values()).map(Vi2);
  if (a5 instanceof Ih2) return { values: [...a5.values()], valuesAsFlags: a5.valuesAsFlags };
  if (typeof a5 == "object") {
    let e = {};
    return Object.entries(a5).forEach(([r, o]) => {
      e[r] = Vi2(o);
    }), e;
  } else return a5;
}
var z12 = Ra2(Fa2(), 1);
var BT2 = Ra2(Fa2(), 1);
function Tr2(a5, e) {
  if (typeof a5 != "object") throw new Error(`Cannot merge into non-object objectToMergeWith. Received: ${JSON.stringify(a5)}`);
  if (typeof e != "object") throw new Error(`Cannot merge using non-object objectToMergeWith. Received: ${JSON.stringify(e)}`);
  let r = (0, BT2.cloneDeep)(a5);
  for (let [o, s] of Object.entries(e)) typeof s != "object" || s instanceof Set || r[o] === void 0 ? r[o] = s : r[o] = Tr2(r[o], s);
  return r;
}
function Mh2(a5, e) {
  if (!(a5 === void 0 || typeof a5 != "object")) for (let r of Object.keys(a5)) {
    if (r === e) return a5[r];
    let o = a5[r];
    if (typeof o == "object") {
      let s = Mh2(o, e);
      if (s !== void 0) return s;
    }
  }
}
var Aa2 = "@composite:";
var WT2 = "@inherit:";
var zT2 = class {
  constructor(a5, e, r) {
    this.tiledClassToMembersMap = a5, this.enumNameToValuesMap = e, this.parserOptions = r, this.memoiser = /* @__PURE__ */ new Map();
  }
  flattenMembers(a5, e) {
    return this.memoiser.has(a5) ? { [a5]: this.memoiser.get(a5) } : (this.memoiser.set(a5, e.reduce((r, o) => X(X({}, r), this.flattenMemberProperty(o)), {})), { [a5]: this.memoiser.get(a5) });
  }
  flattenMemberProperty(a5) {
    var r;
    let e = (r = a5.propertyType) != null ? r : a5.propertytype;
    if (a5.type === "class") {
      if (!this.memoiser.has(e)) {
        let u = this.tiledClassToMembersMap.get(e).reduce((h, p) => Tr2(this.flattenMemberProperty(p), h), {});
        this.memoiser.set(e, u);
      }
      let o = this.memoiser.get(e), s = Tr2(o, this.flattenValue(a5.value, o));
      return this.checkIfShouldFlatten(a5.name) ? s : { [a5.name.replace(Aa2, "")]: s };
    } else return this.enumNameToValuesMap.has(e) ? this.enumNameToValuesMap.get(e).valuesAsFlags ? { [a5.name]: new Set(a5.value.split(",").filter((o) => o !== "")) } : { [a5.name]: a5.value } : { [a5.name]: a5.value };
  }
  get memoisedFlattenedProperties() {
    return this.memoiser;
  }
  flattenValue(a5, e) {
    return Object.entries(a5).reduce((r, [o, s]) => {
      if (typeof s != "object") return Mh2(e, o) instanceof Set ? Tr2({ [o]: new Set(s.split(",").filter((u) => u !== "")) }, r) : Tr2({ [o]: s }, r);
      if (this.checkIfShouldFlatten(o)) return Tr2(this.flattenValue(s, e), r);
      {
        let u = o.replace(Aa2, "");
        return Tr2({ [u]: this.flattenValue(s, e) }, r);
      }
    }, {});
  }
  checkIfShouldFlatten(a5) {
    var e;
    return ((e = this.parserOptions) == null ? void 0 : e.defaultComposite) === true ? a5.startsWith(WT2) : !a5.startsWith(Aa2);
  }
};
var Eh2 = Ra2(Fa2(), 1);
var $T2 = class {
  constructor(a5) {
    this.flattener = a5;
  }
  flattenPropertiesOnObject(a5) {
    var e, r, o, s;
    return Lt2(X(X({}, this.flattener.memoisedFlattenedProperties.get((e = a5.class) != null ? e : a5.type)), (r = a5.properties) == null ? void 0 : r.reduce((u, h) => X(X({}, u), this.flattener.flattenMemberProperty(h)), {})), { name: a5.name, id: a5.id, class: (s = (o = a5.class) != null ? o : a5.type) != null ? s : null, x: a5.x, y: a5.y });
  }
  flattenPropertiesOnTile(a5) {
    var e, r, o, s;
    return Lt2(X(X({}, this.flattener.memoisedFlattenedProperties.get((e = a5.class) != null ? e : a5.type)), (r = a5.properties) == null ? void 0 : r.reduce((u, h) => X(X({}, u), this.flattener.flattenMemberProperty(h)), {})), { id: a5.id, class: (s = (o = a5.class) != null ? o : a5.type) != null ? s : null });
  }
  getCustomTypesMap() {
    return new Map([...this.flattener.memoisedFlattenedProperties.entries()].map(([a5, e]) => [a5, (0, Eh2.cloneDeep)(e)]));
  }
  getEnumsMap() {
    return new Map([...this.flattener.enumNameToValuesMap.entries()].map(([a5, e]) => [a5, (0, Eh2.cloneDeep)(e)]));
  }
  toJSON() {
    return JSON.stringify({ customTypes: Vi2(this.getCustomTypesMap()), enums: Vi2(this.getEnumsMap()) }, null, 4);
  }
};
function qT2(a5, e) {
  let r = new Map(a5.propertyTypes.filter((u) => u.type === "enum").map((u) => [u.name, new Ih2(u.values, u.valuesAsFlags)])), o = new Map(a5.propertyTypes.filter((u) => u.type === "class").map((u) => [u.name, u.members])), s = new zT2(o, r, e);
  return o.forEach((u, h) => {
    s.flattenMembers(h, u);
  }), new $T2(s);
}
var Ah2 = { parse: qT2 };
var Pr = class {
  constructor(e, r) {
    this.phaserTile = e;
    this.tiledProject = r;
  }
  getProperty(e) {
    var s, u;
    let r = {};
    if (this.tiledProject) {
      let h = Ah2.parse(this.tiledProject), p = this.getType();
      if (p) {
        let d = (s = h.getCustomTypesMap()) == null ? void 0 : s.get(p);
        if (d) for (let [P2, L] of Object.entries(d)) r[P2] = L;
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
var Ni = class {
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
    return this.hasProperty(Xr2);
  }
  getData() {
    return this.phaserTilemapLayer.layer.data.map((e) => e.map((r) => new Pr(r, this.tiledProject)));
  }
};
var Fn = class {
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
    return this.phaserTilemap.layers.map((e) => new Ni(e.tilemapLayer, this.tiledProject));
  }
  hasTileAt(e, r, o) {
    return !!this.phaserTilemap.hasTileAt(e, r, o);
  }
  getTileAt(e, r, o) {
    let s = this.phaserTilemap.getTileAt(e, r, false, o);
    if (s) return new Pr(s, this.tiledProject);
  }
};
var YT2 = _n2.version;
var Ui = class Ui2 {
  constructor(e) {
    this.scene = e;
    this.geHeadless = new Mn2(false);
    this.isCreatedInternal = false;
    Ui2.welcomeMessagePrinted || (console.log(`Using GridEngine Phaser Plugin v${YT2}`), Ui2.welcomeMessagePrinted = true), this.scene.sys.events.once("boot", this.boot, this);
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
    this.geHeadless.create(new Fn(e, r.tiledProject), r), this.isCreatedInternal = true, this.gridCharacters = /* @__PURE__ */ new Map();
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
    return { characters: this.geHeadless.getState().characters.map((e) => Lt2(X({}, e), { offsetX: this.getOffsetX(e.id), offsetY: this.getOffsetY(e.id) })) };
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
    return X({ collisionTilePropertyName: "ge_collide", numberOfDirections: 4, characterCollisionStrategy: "BLOCK_TWO_TILES", layerOverlay: false, cacheTileCollisions: false }, e);
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
    let r = new hn2(e, this.scene, this.gridTilemap, this.config.layerOverlay, this.geHeadless);
    (o = this.gridCharacters) == null || o.set(e.id, r);
  }
};
Ui.welcomeMessagePrinted = false;

// speedtests/RoomsTilemap.ts
var fs = require("fs");
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
      const rawData = fs.readFileSync(path2, "utf8");
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
  hasTileAt(x, y, layer) {
    if (x < 0 || x >= this.width) return false;
    if (y < 0 || y >= this.height) return false;
    return true;
  }
  getTileAt(x, y, layer) {
    if (x < 0 || x >= this.width) return void 0;
    if (y < 0 || y >= this.height) return void 0;
    if (!layer) return this.layers[0].getData()[y][x];
    return this.layersByName.get(layer)?.getData()[y][x];
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
var geOld = new Mn2();
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
