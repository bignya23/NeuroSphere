(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
var Ff = { exports: {} },
  wo = {},
  jf = { exports: {} },
  _ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qr = Symbol.for("react.element"),
  Pm = Symbol.for("react.portal"),
  km = Symbol.for("react.fragment"),
  Tm = Symbol.for("react.strict_mode"),
  Cm = Symbol.for("react.profiler"),
  Em = Symbol.for("react.provider"),
  Am = Symbol.for("react.context"),
  Mm = Symbol.for("react.forward_ref"),
  Dm = Symbol.for("react.suspense"),
  Vm = Symbol.for("react.memo"),
  Rm = Symbol.for("react.lazy"),
  uu = Symbol.iterator;
function Lm(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (uu && e[uu]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Of = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  If = Object.assign,
  zf = {};
function Hn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = zf),
    (this.updater = n || Of);
}
Hn.prototype.isReactComponent = {};
Hn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Hn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Bf() {}
Bf.prototype = Hn.prototype;
function jl(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = zf),
    (this.updater = n || Of);
}
var Ol = (jl.prototype = new Bf());
Ol.constructor = jl;
If(Ol, Hn.prototype);
Ol.isPureReactComponent = !0;
var cu = Array.isArray,
  Uf = Object.prototype.hasOwnProperty,
  Il = { current: null },
  $f = { key: !0, ref: !0, __self: !0, __source: !0 };
function Wf(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Uf.call(t, r) && !$f.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    i.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) i[r] === void 0 && (i[r] = l[r]);
  return {
    $$typeof: Qr,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: Il.current,
  };
}
function _m(e, t) {
  return {
    $$typeof: Qr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function zl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Qr;
}
function Nm(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var fu = /\/+/g;
function Uo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Nm("" + e.key)
    : t.toString(36);
}
function Ei(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (o) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Qr:
          case Pm:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + Uo(s, 0) : r),
      cu(i)
        ? ((n = ""),
          e != null && (n = e.replace(fu, "$&/") + "/"),
          Ei(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (zl(i) &&
            (i = _m(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(fu, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), cu(e)))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var a = r + Uo(o, l);
      s += Ei(o, t, n, a, i);
    }
  else if (((a = Lm(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + Uo(o, l++)), (s += Ei(o, t, n, a, i));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return s;
}
function si(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Ei(e, r, "", "", function (o) {
      return t.call(n, o, i++);
    }),
    r
  );
}
function Fm(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ve = { current: null },
  Ai = { transition: null },
  jm = {
    ReactCurrentDispatcher: ve,
    ReactCurrentBatchConfig: Ai,
    ReactCurrentOwner: Il,
  };
function Hf() {
  throw Error("act(...) is not supported in production builds of React.");
}
_.Children = {
  map: si,
  forEach: function (e, t, n) {
    si(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      si(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      si(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!zl(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
_.Component = Hn;
_.Fragment = km;
_.Profiler = Cm;
_.PureComponent = jl;
_.StrictMode = Tm;
_.Suspense = Dm;
_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = jm;
_.act = Hf;
_.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = If({}, e.props),
    i = e.key,
    o = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (s = Il.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      Uf.call(t, a) &&
        !$f.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: Qr, type: e.type, key: i, ref: o, props: r, _owner: s };
};
_.createContext = function (e) {
  return (
    (e = {
      $$typeof: Am,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Em, _context: e }),
    (e.Consumer = e)
  );
};
_.createElement = Wf;
_.createFactory = function (e) {
  var t = Wf.bind(null, e);
  return (t.type = e), t;
};
_.createRef = function () {
  return { current: null };
};
_.forwardRef = function (e) {
  return { $$typeof: Mm, render: e };
};
_.isValidElement = zl;
_.lazy = function (e) {
  return { $$typeof: Rm, _payload: { _status: -1, _result: e }, _init: Fm };
};
_.memo = function (e, t) {
  return { $$typeof: Vm, type: e, compare: t === void 0 ? null : t };
};
_.startTransition = function (e) {
  var t = Ai.transition;
  Ai.transition = {};
  try {
    e();
  } finally {
    Ai.transition = t;
  }
};
_.unstable_act = Hf;
_.useCallback = function (e, t) {
  return ve.current.useCallback(e, t);
};
_.useContext = function (e) {
  return ve.current.useContext(e);
};
_.useDebugValue = function () {};
_.useDeferredValue = function (e) {
  return ve.current.useDeferredValue(e);
};
_.useEffect = function (e, t) {
  return ve.current.useEffect(e, t);
};
_.useId = function () {
  return ve.current.useId();
};
_.useImperativeHandle = function (e, t, n) {
  return ve.current.useImperativeHandle(e, t, n);
};
_.useInsertionEffect = function (e, t) {
  return ve.current.useInsertionEffect(e, t);
};
_.useLayoutEffect = function (e, t) {
  return ve.current.useLayoutEffect(e, t);
};
_.useMemo = function (e, t) {
  return ve.current.useMemo(e, t);
};
_.useReducer = function (e, t, n) {
  return ve.current.useReducer(e, t, n);
};
_.useRef = function (e) {
  return ve.current.useRef(e);
};
_.useState = function (e) {
  return ve.current.useState(e);
};
_.useSyncExternalStore = function (e, t, n) {
  return ve.current.useSyncExternalStore(e, t, n);
};
_.useTransition = function () {
  return ve.current.useTransition();
};
_.version = "18.3.1";
jf.exports = _;
var M = jf.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Om = M,
  Im = Symbol.for("react.element"),
  zm = Symbol.for("react.fragment"),
  Bm = Object.prototype.hasOwnProperty,
  Um = Om.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  $m = { key: !0, ref: !0, __self: !0, __source: !0 };
function Kf(e, t, n) {
  var r,
    i = {},
    o = null,
    s = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) Bm.call(t, r) && !$m.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Im,
    type: e,
    key: o,
    ref: s,
    props: i,
    _owner: Um.current,
  };
}
wo.Fragment = zm;
wo.jsx = Kf;
wo.jsxs = Kf;
Ff.exports = wo;
var j = Ff.exports,
  Gf = { exports: {} },
  Re = {},
  Qf = { exports: {} },
  Xf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(E, R) {
    var L = E.length;
    E.push(R);
    e: for (; 0 < L; ) {
      var Y = (L - 1) >>> 1,
        re = E[Y];
      if (0 < i(re, R)) (E[Y] = R), (E[L] = re), (L = Y);
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var R = E[0],
      L = E.pop();
    if (L !== R) {
      E[0] = L;
      e: for (var Y = 0, re = E.length, ii = re >>> 1; Y < ii; ) {
        var Ut = 2 * (Y + 1) - 1,
          Bo = E[Ut],
          $t = Ut + 1,
          oi = E[$t];
        if (0 > i(Bo, L))
          $t < re && 0 > i(oi, Bo)
            ? ((E[Y] = oi), (E[$t] = L), (Y = $t))
            : ((E[Y] = Bo), (E[Ut] = L), (Y = Ut));
        else if ($t < re && 0 > i(oi, L)) (E[Y] = oi), (E[$t] = L), (Y = $t);
        else break e;
      }
    }
    return R;
  }
  function i(E, R) {
    var L = E.sortIndex - R.sortIndex;
    return L !== 0 ? L : E.id - R.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    u = [],
    c = 1,
    f = null,
    d = 3,
    g = !1,
    v = !1,
    y = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(E) {
    for (var R = n(u); R !== null; ) {
      if (R.callback === null) r(u);
      else if (R.startTime <= E)
        r(u), (R.sortIndex = R.expirationTime), t(a, R);
      else break;
      R = n(u);
    }
  }
  function w(E) {
    if (((y = !1), m(E), !v))
      if (n(a) !== null) (v = !0), ri(S);
      else {
        var R = n(u);
        R !== null && b(w, R.startTime - E);
      }
  }
  function S(E, R) {
    (v = !1), y && ((y = !1), p(k), (k = -1)), (g = !0);
    var L = d;
    try {
      for (
        m(R), f = n(a);
        f !== null && (!(f.expirationTime > R) || (E && !ne()));

      ) {
        var Y = f.callback;
        if (typeof Y == "function") {
          (f.callback = null), (d = f.priorityLevel);
          var re = Y(f.expirationTime <= R);
          (R = e.unstable_now()),
            typeof re == "function" ? (f.callback = re) : f === n(a) && r(a),
            m(R);
        } else r(a);
        f = n(a);
      }
      if (f !== null) var ii = !0;
      else {
        var Ut = n(u);
        Ut !== null && b(w, Ut.startTime - R), (ii = !1);
      }
      return ii;
    } finally {
      (f = null), (d = L), (g = !1);
    }
  }
  var T = !1,
    C = null,
    k = -1,
    N = 5,
    V = -1;
  function ne() {
    return !(e.unstable_now() - V < N);
  }
  function mt() {
    if (C !== null) {
      var E = e.unstable_now();
      V = E;
      var R = !0;
      try {
        R = C(!0, E);
      } finally {
        R ? Bt() : ((T = !1), (C = null));
      }
    } else T = !1;
  }
  var Bt;
  if (typeof h == "function")
    Bt = function () {
      h(mt);
    };
  else if (typeof MessageChannel < "u") {
    var Yn = new MessageChannel(),
      au = Yn.port2;
    (Yn.port1.onmessage = mt),
      (Bt = function () {
        au.postMessage(null);
      });
  } else
    Bt = function () {
      x(mt, 0);
    };
  function ri(E) {
    (C = E), T || ((T = !0), Bt());
  }
  function b(E, R) {
    k = x(function () {
      E(e.unstable_now());
    }, R);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (E) {
      E.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || g || ((v = !0), ri(S));
    }),
    (e.unstable_forceFrameRate = function (E) {
      0 > E || 125 < E
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (N = 0 < E ? Math.floor(1e3 / E) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (E) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = d;
      }
      var L = d;
      d = R;
      try {
        return E();
      } finally {
        d = L;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (E, R) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var L = d;
      d = E;
      try {
        return R();
      } finally {
        d = L;
      }
    }),
    (e.unstable_scheduleCallback = function (E, R, L) {
      var Y = e.unstable_now();
      switch (
        (typeof L == "object" && L !== null
          ? ((L = L.delay), (L = typeof L == "number" && 0 < L ? Y + L : Y))
          : (L = Y),
        E)
      ) {
        case 1:
          var re = -1;
          break;
        case 2:
          re = 250;
          break;
        case 5:
          re = 1073741823;
          break;
        case 4:
          re = 1e4;
          break;
        default:
          re = 5e3;
      }
      return (
        (re = L + re),
        (E = {
          id: c++,
          callback: R,
          priorityLevel: E,
          startTime: L,
          expirationTime: re,
          sortIndex: -1,
        }),
        L > Y
          ? ((E.sortIndex = L),
            t(u, E),
            n(a) === null &&
              E === n(u) &&
              (y ? (p(k), (k = -1)) : (y = !0), b(w, L - Y)))
          : ((E.sortIndex = re), t(a, E), v || g || ((v = !0), ri(S))),
        E
      );
    }),
    (e.unstable_shouldYield = ne),
    (e.unstable_wrapCallback = function (E) {
      var R = d;
      return function () {
        var L = d;
        d = R;
        try {
          return E.apply(this, arguments);
        } finally {
          d = L;
        }
      };
    });
})(Xf);
Qf.exports = Xf;
var Wm = Qf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hm = M,
  De = Wm;
function P(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Yf = new Set(),
  Cr = {};
function ln(e, t) {
  Nn(e, t), Nn(e + "Capture", t);
}
function Nn(e, t) {
  for (Cr[e] = t, e = 0; e < t.length; e++) Yf.add(t[e]);
}
var ut = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  As = Object.prototype.hasOwnProperty,
  Km =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  du = {},
  hu = {};
function Gm(e) {
  return As.call(hu, e)
    ? !0
    : As.call(du, e)
    ? !1
    : Km.test(e)
    ? (hu[e] = !0)
    : ((du[e] = !0), !1);
}
function Qm(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Xm(e, t, n, r) {
  if (t === null || typeof t > "u" || Qm(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function we(e, t, n, r, i, o, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = s);
}
var ue = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ue[e] = new we(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ue[t] = new we(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ue[e] = new we(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ue[e] = new we(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ue[e] = new we(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ue[e] = new we(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ue[e] = new we(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ue[e] = new we(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ue[e] = new we(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Bl = /[\-:]([a-z])/g;
function Ul(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Bl, Ul);
    ue[t] = new we(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Bl, Ul);
    ue[t] = new we(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Bl, Ul);
  ue[t] = new we(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ue[e] = new we(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ue.xlinkHref = new we(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ue[e] = new we(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function $l(e, t, n, r) {
  var i = ue.hasOwnProperty(t) ? ue[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Xm(t, n, i, r) && (n = null),
    r || i === null
      ? Gm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var pt = Hm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  li = Symbol.for("react.element"),
  fn = Symbol.for("react.portal"),
  dn = Symbol.for("react.fragment"),
  Wl = Symbol.for("react.strict_mode"),
  Ms = Symbol.for("react.profiler"),
  Zf = Symbol.for("react.provider"),
  qf = Symbol.for("react.context"),
  Hl = Symbol.for("react.forward_ref"),
  Ds = Symbol.for("react.suspense"),
  Vs = Symbol.for("react.suspense_list"),
  Kl = Symbol.for("react.memo"),
  vt = Symbol.for("react.lazy"),
  Jf = Symbol.for("react.offscreen"),
  pu = Symbol.iterator;
function Zn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (pu && e[pu]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var G = Object.assign,
  $o;
function or(e) {
  if ($o === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      $o = (t && t[1]) || "";
    }
  return (
    `
` +
    $o +
    e
  );
}
var Wo = !1;
function Ho(e, t) {
  if (!e || Wo) return "";
  Wo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          o = r.stack.split(`
`),
          s = i.length - 1,
          l = o.length - 1;
        1 <= s && 0 <= l && i[s] !== o[l];

      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (i[s] !== o[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || i[s] !== o[l])) {
                var a =
                  `
` + i[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    (Wo = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? or(e) : "";
}
function Ym(e) {
  switch (e.tag) {
    case 5:
      return or(e.type);
    case 16:
      return or("Lazy");
    case 13:
      return or("Suspense");
    case 19:
      return or("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Ho(e.type, !1)), e;
    case 11:
      return (e = Ho(e.type.render, !1)), e;
    case 1:
      return (e = Ho(e.type, !0)), e;
    default:
      return "";
  }
}
function Rs(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case dn:
      return "Fragment";
    case fn:
      return "Portal";
    case Ms:
      return "Profiler";
    case Wl:
      return "StrictMode";
    case Ds:
      return "Suspense";
    case Vs:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case qf:
        return (e.displayName || "Context") + ".Consumer";
      case Zf:
        return (e._context.displayName || "Context") + ".Provider";
      case Hl:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Kl:
        return (
          (t = e.displayName || null), t !== null ? t : Rs(e.type) || "Memo"
        );
      case vt:
        (t = e._payload), (e = e._init);
        try {
          return Rs(e(t));
        } catch {}
    }
  return null;
}
function Zm(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Rs(t);
    case 8:
      return t === Wl ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Lt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function bf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function qm(e) {
  var t = bf(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          (r = "" + s), o.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function ai(e) {
  e._valueTracker || (e._valueTracker = qm(e));
}
function ed(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = bf(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Ui(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ls(e, t) {
  var n = t.checked;
  return G({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function mu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Lt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function td(e, t) {
  (t = t.checked), t != null && $l(e, "checked", t, !1);
}
function _s(e, t) {
  td(e, t);
  var n = Lt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Ns(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ns(e, t.type, Lt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function gu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Ns(e, t, n) {
  (t !== "number" || Ui(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var sr = Array.isArray;
function Mn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Lt(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Fs(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(P(91));
  return G({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function yu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(P(92));
      if (sr(n)) {
        if (1 < n.length) throw Error(P(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Lt(n) };
}
function nd(e, t) {
  var n = Lt(t.value),
    r = Lt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function vu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function rd(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function js(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? rd(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var ui,
  id = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        ui = ui || document.createElement("div"),
          ui.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = ui.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Er(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var dr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Jm = ["Webkit", "ms", "Moz", "O"];
Object.keys(dr).forEach(function (e) {
  Jm.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (dr[t] = dr[e]);
  });
});
function od(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (dr.hasOwnProperty(e) && dr[e])
    ? ("" + t).trim()
    : t + "px";
}
function sd(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = od(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var bm = G(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Os(e, t) {
  if (t) {
    if (bm[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(P(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(P(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(P(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(P(62));
  }
}
function Is(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var zs = null;
function Gl(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Bs = null,
  Dn = null,
  Vn = null;
function wu(e) {
  if ((e = Zr(e))) {
    if (typeof Bs != "function") throw Error(P(280));
    var t = e.stateNode;
    t && ((t = To(t)), Bs(e.stateNode, e.type, t));
  }
}
function ld(e) {
  Dn ? (Vn ? Vn.push(e) : (Vn = [e])) : (Dn = e);
}
function ad() {
  if (Dn) {
    var e = Dn,
      t = Vn;
    if (((Vn = Dn = null), wu(e), t)) for (e = 0; e < t.length; e++) wu(t[e]);
  }
}
function ud(e, t) {
  return e(t);
}
function cd() {}
var Ko = !1;
function fd(e, t, n) {
  if (Ko) return e(t, n);
  Ko = !0;
  try {
    return ud(e, t, n);
  } finally {
    (Ko = !1), (Dn !== null || Vn !== null) && (cd(), ad());
  }
}
function Ar(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = To(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(P(231, t, typeof n));
  return n;
}
var Us = !1;
if (ut)
  try {
    var qn = {};
    Object.defineProperty(qn, "passive", {
      get: function () {
        Us = !0;
      },
    }),
      window.addEventListener("test", qn, qn),
      window.removeEventListener("test", qn, qn);
  } catch {
    Us = !1;
  }
function eg(e, t, n, r, i, o, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var hr = !1,
  $i = null,
  Wi = !1,
  $s = null,
  tg = {
    onError: function (e) {
      (hr = !0), ($i = e);
    },
  };
function ng(e, t, n, r, i, o, s, l, a) {
  (hr = !1), ($i = null), eg.apply(tg, arguments);
}
function rg(e, t, n, r, i, o, s, l, a) {
  if ((ng.apply(this, arguments), hr)) {
    if (hr) {
      var u = $i;
      (hr = !1), ($i = null);
    } else throw Error(P(198));
    Wi || ((Wi = !0), ($s = u));
  }
}
function an(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function dd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Su(e) {
  if (an(e) !== e) throw Error(P(188));
}
function ig(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = an(e)), t === null)) throw Error(P(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return Su(i), e;
        if (o === r) return Su(i), t;
        o = o.sibling;
      }
      throw Error(P(188));
    }
    if (n.return !== r.return) (n = i), (r = o);
    else {
      for (var s = !1, l = i.child; l; ) {
        if (l === n) {
          (s = !0), (n = i), (r = o);
          break;
        }
        if (l === r) {
          (s = !0), (r = i), (n = o);
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = o.child; l; ) {
          if (l === n) {
            (s = !0), (n = o), (r = i);
            break;
          }
          if (l === r) {
            (s = !0), (r = o), (n = i);
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(P(189));
      }
    }
    if (n.alternate !== r) throw Error(P(190));
  }
  if (n.tag !== 3) throw Error(P(188));
  return n.stateNode.current === n ? e : t;
}
function hd(e) {
  return (e = ig(e)), e !== null ? pd(e) : null;
}
function pd(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = pd(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var md = De.unstable_scheduleCallback,
  xu = De.unstable_cancelCallback,
  og = De.unstable_shouldYield,
  sg = De.unstable_requestPaint,
  q = De.unstable_now,
  lg = De.unstable_getCurrentPriorityLevel,
  Ql = De.unstable_ImmediatePriority,
  gd = De.unstable_UserBlockingPriority,
  Hi = De.unstable_NormalPriority,
  ag = De.unstable_LowPriority,
  yd = De.unstable_IdlePriority,
  So = null,
  Je = null;
function ug(e) {
  if (Je && typeof Je.onCommitFiberRoot == "function")
    try {
      Je.onCommitFiberRoot(So, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ge = Math.clz32 ? Math.clz32 : dg,
  cg = Math.log,
  fg = Math.LN2;
function dg(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((cg(e) / fg) | 0)) | 0;
}
var ci = 64,
  fi = 4194304;
function lr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ki(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    o = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~i;
    l !== 0 ? (r = lr(l)) : ((o &= s), o !== 0 && (r = lr(o)));
  } else (s = n & ~i), s !== 0 ? (r = lr(s)) : o !== 0 && (r = lr(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (o = t & -t), i >= o || (i === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Ge(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function hg(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function pg(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var s = 31 - Ge(o),
      l = 1 << s,
      a = i[s];
    a === -1
      ? (!(l & n) || l & r) && (i[s] = hg(l, t))
      : a <= t && (e.expiredLanes |= l),
      (o &= ~l);
  }
}
function Ws(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function vd() {
  var e = ci;
  return (ci <<= 1), !(ci & 4194240) && (ci = 64), e;
}
function Go(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Xr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ge(t)),
    (e[t] = n);
}
function mg(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Ge(n),
      o = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o);
  }
}
function Xl(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ge(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var O = 0;
function wd(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Sd,
  Yl,
  xd,
  Pd,
  kd,
  Hs = !1,
  di = [],
  Tt = null,
  Ct = null,
  Et = null,
  Mr = new Map(),
  Dr = new Map(),
  St = [],
  gg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Pu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Tt = null;
      break;
    case "dragenter":
    case "dragleave":
      Ct = null;
      break;
    case "mouseover":
    case "mouseout":
      Et = null;
      break;
    case "pointerover":
    case "pointerout":
      Mr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Dr.delete(t.pointerId);
  }
}
function Jn(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i],
      }),
      t !== null && ((t = Zr(t)), t !== null && Yl(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function yg(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Tt = Jn(Tt, e, t, n, r, i)), !0;
    case "dragenter":
      return (Ct = Jn(Ct, e, t, n, r, i)), !0;
    case "mouseover":
      return (Et = Jn(Et, e, t, n, r, i)), !0;
    case "pointerover":
      var o = i.pointerId;
      return Mr.set(o, Jn(Mr.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (o = i.pointerId), Dr.set(o, Jn(Dr.get(o) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function Td(e) {
  var t = Xt(e.target);
  if (t !== null) {
    var n = an(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = dd(n)), t !== null)) {
          (e.blockedOn = t),
            kd(e.priority, function () {
              xd(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Mi(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ks(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (zs = r), n.target.dispatchEvent(r), (zs = null);
    } else return (t = Zr(n)), t !== null && Yl(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function ku(e, t, n) {
  Mi(e) && n.delete(t);
}
function vg() {
  (Hs = !1),
    Tt !== null && Mi(Tt) && (Tt = null),
    Ct !== null && Mi(Ct) && (Ct = null),
    Et !== null && Mi(Et) && (Et = null),
    Mr.forEach(ku),
    Dr.forEach(ku);
}
function bn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Hs ||
      ((Hs = !0),
      De.unstable_scheduleCallback(De.unstable_NormalPriority, vg)));
}
function Vr(e) {
  function t(i) {
    return bn(i, e);
  }
  if (0 < di.length) {
    bn(di[0], e);
    for (var n = 1; n < di.length; n++) {
      var r = di[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Tt !== null && bn(Tt, e),
      Ct !== null && bn(Ct, e),
      Et !== null && bn(Et, e),
      Mr.forEach(t),
      Dr.forEach(t),
      n = 0;
    n < St.length;
    n++
  )
    (r = St[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < St.length && ((n = St[0]), n.blockedOn === null); )
    Td(n), n.blockedOn === null && St.shift();
}
var Rn = pt.ReactCurrentBatchConfig,
  Gi = !0;
function wg(e, t, n, r) {
  var i = O,
    o = Rn.transition;
  Rn.transition = null;
  try {
    (O = 1), Zl(e, t, n, r);
  } finally {
    (O = i), (Rn.transition = o);
  }
}
function Sg(e, t, n, r) {
  var i = O,
    o = Rn.transition;
  Rn.transition = null;
  try {
    (O = 4), Zl(e, t, n, r);
  } finally {
    (O = i), (Rn.transition = o);
  }
}
function Zl(e, t, n, r) {
  if (Gi) {
    var i = Ks(e, t, n, r);
    if (i === null) ns(e, t, r, Qi, n), Pu(e, r);
    else if (yg(i, e, t, n, r)) r.stopPropagation();
    else if ((Pu(e, r), t & 4 && -1 < gg.indexOf(e))) {
      for (; i !== null; ) {
        var o = Zr(i);
        if (
          (o !== null && Sd(o),
          (o = Ks(e, t, n, r)),
          o === null && ns(e, t, r, Qi, n),
          o === i)
        )
          break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else ns(e, t, r, null, n);
  }
}
var Qi = null;
function Ks(e, t, n, r) {
  if (((Qi = null), (e = Gl(r)), (e = Xt(e)), e !== null))
    if (((t = an(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = dd(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Qi = e), null;
}
function Cd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (lg()) {
        case Ql:
          return 1;
        case gd:
          return 4;
        case Hi:
        case ag:
          return 16;
        case yd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Pt = null,
  ql = null,
  Di = null;
function Ed() {
  if (Di) return Di;
  var e,
    t = ql,
    n = t.length,
    r,
    i = "value" in Pt ? Pt.value : Pt.textContent,
    o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
  return (Di = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Vi(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function hi() {
  return !0;
}
function Tu() {
  return !1;
}
function Le(e) {
  function t(n, r, i, o, s) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = s),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(o) : o[l]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? hi
        : Tu),
      (this.isPropagationStopped = Tu),
      this
    );
  }
  return (
    G(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = hi));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = hi));
      },
      persist: function () {},
      isPersistent: hi,
    }),
    t
  );
}
var Kn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Jl = Le(Kn),
  Yr = G({}, Kn, { view: 0, detail: 0 }),
  xg = Le(Yr),
  Qo,
  Xo,
  er,
  xo = G({}, Yr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: bl,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== er &&
            (er && e.type === "mousemove"
              ? ((Qo = e.screenX - er.screenX), (Xo = e.screenY - er.screenY))
              : (Xo = Qo = 0),
            (er = e)),
          Qo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Xo;
    },
  }),
  Cu = Le(xo),
  Pg = G({}, xo, { dataTransfer: 0 }),
  kg = Le(Pg),
  Tg = G({}, Yr, { relatedTarget: 0 }),
  Yo = Le(Tg),
  Cg = G({}, Kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Eg = Le(Cg),
  Ag = G({}, Kn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Mg = Le(Ag),
  Dg = G({}, Kn, { data: 0 }),
  Eu = Le(Dg),
  Vg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Rg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Lg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function _g(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Lg[e]) ? !!t[e] : !1;
}
function bl() {
  return _g;
}
var Ng = G({}, Yr, {
    key: function (e) {
      if (e.key) {
        var t = Vg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Vi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Rg[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bl,
    charCode: function (e) {
      return e.type === "keypress" ? Vi(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Vi(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Fg = Le(Ng),
  jg = G({}, xo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Au = Le(jg),
  Og = G({}, Yr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bl,
  }),
  Ig = Le(Og),
  zg = G({}, Kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Bg = Le(zg),
  Ug = G({}, xo, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  $g = Le(Ug),
  Wg = [9, 13, 27, 32],
  ea = ut && "CompositionEvent" in window,
  pr = null;
ut && "documentMode" in document && (pr = document.documentMode);
var Hg = ut && "TextEvent" in window && !pr,
  Ad = ut && (!ea || (pr && 8 < pr && 11 >= pr)),
  Mu = " ",
  Du = !1;
function Md(e, t) {
  switch (e) {
    case "keyup":
      return Wg.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Dd(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var hn = !1;
function Kg(e, t) {
  switch (e) {
    case "compositionend":
      return Dd(t);
    case "keypress":
      return t.which !== 32 ? null : ((Du = !0), Mu);
    case "textInput":
      return (e = t.data), e === Mu && Du ? null : e;
    default:
      return null;
  }
}
function Gg(e, t) {
  if (hn)
    return e === "compositionend" || (!ea && Md(e, t))
      ? ((e = Ed()), (Di = ql = Pt = null), (hn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Ad && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Qg = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Vu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Qg[e.type] : t === "textarea";
}
function Vd(e, t, n, r) {
  ld(r),
    (t = Xi(t, "onChange")),
    0 < t.length &&
      ((n = new Jl("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var mr = null,
  Rr = null;
function Xg(e) {
  Ud(e, 0);
}
function Po(e) {
  var t = gn(e);
  if (ed(t)) return e;
}
function Yg(e, t) {
  if (e === "change") return t;
}
var Rd = !1;
if (ut) {
  var Zo;
  if (ut) {
    var qo = "oninput" in document;
    if (!qo) {
      var Ru = document.createElement("div");
      Ru.setAttribute("oninput", "return;"),
        (qo = typeof Ru.oninput == "function");
    }
    Zo = qo;
  } else Zo = !1;
  Rd = Zo && (!document.documentMode || 9 < document.documentMode);
}
function Lu() {
  mr && (mr.detachEvent("onpropertychange", Ld), (Rr = mr = null));
}
function Ld(e) {
  if (e.propertyName === "value" && Po(Rr)) {
    var t = [];
    Vd(t, Rr, e, Gl(e)), fd(Xg, t);
  }
}
function Zg(e, t, n) {
  e === "focusin"
    ? (Lu(), (mr = t), (Rr = n), mr.attachEvent("onpropertychange", Ld))
    : e === "focusout" && Lu();
}
function qg(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Po(Rr);
}
function Jg(e, t) {
  if (e === "click") return Po(t);
}
function bg(e, t) {
  if (e === "input" || e === "change") return Po(t);
}
function ey(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Xe = typeof Object.is == "function" ? Object.is : ey;
function Lr(e, t) {
  if (Xe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!As.call(t, i) || !Xe(e[i], t[i])) return !1;
  }
  return !0;
}
function _u(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Nu(e, t) {
  var n = _u(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = _u(n);
  }
}
function _d(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? _d(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Nd() {
  for (var e = window, t = Ui(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ui(e.document);
  }
  return t;
}
function ta(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function ty(e) {
  var t = Nd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    _d(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && ta(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          o = Math.min(r.start, i);
        (r = r.end === void 0 ? o : Math.min(r.end, i)),
          !e.extend && o > r && ((i = r), (r = o), (o = i)),
          (i = Nu(n, o));
        var s = Nu(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var ny = ut && "documentMode" in document && 11 >= document.documentMode,
  pn = null,
  Gs = null,
  gr = null,
  Qs = !1;
function Fu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Qs ||
    pn == null ||
    pn !== Ui(r) ||
    ((r = pn),
    "selectionStart" in r && ta(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (gr && Lr(gr, r)) ||
      ((gr = r),
      (r = Xi(Gs, "onSelect")),
      0 < r.length &&
        ((t = new Jl("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = pn))));
}
function pi(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var mn = {
    animationend: pi("Animation", "AnimationEnd"),
    animationiteration: pi("Animation", "AnimationIteration"),
    animationstart: pi("Animation", "AnimationStart"),
    transitionend: pi("Transition", "TransitionEnd"),
  },
  Jo = {},
  Fd = {};
ut &&
  ((Fd = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete mn.animationend.animation,
    delete mn.animationiteration.animation,
    delete mn.animationstart.animation),
  "TransitionEvent" in window || delete mn.transitionend.transition);
function ko(e) {
  if (Jo[e]) return Jo[e];
  if (!mn[e]) return e;
  var t = mn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Fd) return (Jo[e] = t[n]);
  return e;
}
var jd = ko("animationend"),
  Od = ko("animationiteration"),
  Id = ko("animationstart"),
  zd = ko("transitionend"),
  Bd = new Map(),
  ju =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function jt(e, t) {
  Bd.set(e, t), ln(t, [e]);
}
for (var bo = 0; bo < ju.length; bo++) {
  var es = ju[bo],
    ry = es.toLowerCase(),
    iy = es[0].toUpperCase() + es.slice(1);
  jt(ry, "on" + iy);
}
jt(jd, "onAnimationEnd");
jt(Od, "onAnimationIteration");
jt(Id, "onAnimationStart");
jt("dblclick", "onDoubleClick");
jt("focusin", "onFocus");
jt("focusout", "onBlur");
jt(zd, "onTransitionEnd");
Nn("onMouseEnter", ["mouseout", "mouseover"]);
Nn("onMouseLeave", ["mouseout", "mouseover"]);
Nn("onPointerEnter", ["pointerout", "pointerover"]);
Nn("onPointerLeave", ["pointerout", "pointerover"]);
ln(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
ln(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
ln("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ln(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
ln(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
ln(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var ar =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  oy = new Set("cancel close invalid load scroll toggle".split(" ").concat(ar));
function Ou(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), rg(r, t, void 0, e), (e.currentTarget = null);
}
function Ud(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== o && i.isPropagationStopped())) break e;
          Ou(i, l, u), (o = a);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((l = r[s]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== o && i.isPropagationStopped())
          )
            break e;
          Ou(i, l, u), (o = a);
        }
    }
  }
  if (Wi) throw ((e = $s), (Wi = !1), ($s = null), e);
}
function z(e, t) {
  var n = t[Js];
  n === void 0 && (n = t[Js] = new Set());
  var r = e + "__bubble";
  n.has(r) || ($d(t, e, 2, !1), n.add(r));
}
function ts(e, t, n) {
  var r = 0;
  t && (r |= 4), $d(n, e, r, t);
}
var mi = "_reactListening" + Math.random().toString(36).slice(2);
function _r(e) {
  if (!e[mi]) {
    (e[mi] = !0),
      Yf.forEach(function (n) {
        n !== "selectionchange" && (oy.has(n) || ts(n, !1, e), ts(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[mi] || ((t[mi] = !0), ts("selectionchange", !1, t));
  }
}
function $d(e, t, n, r) {
  switch (Cd(t)) {
    case 1:
      var i = wg;
      break;
    case 4:
      i = Sg;
      break;
    default:
      i = Zl;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Us ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function ns(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === i || (l.nodeType === 8 && l.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === i || (a.nodeType === 8 && a.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = Xt(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = o = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  fd(function () {
    var u = o,
      c = Gl(n),
      f = [];
    e: {
      var d = Bd.get(e);
      if (d !== void 0) {
        var g = Jl,
          v = e;
        switch (e) {
          case "keypress":
            if (Vi(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Fg;
            break;
          case "focusin":
            (v = "focus"), (g = Yo);
            break;
          case "focusout":
            (v = "blur"), (g = Yo);
            break;
          case "beforeblur":
          case "afterblur":
            g = Yo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = Cu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = kg;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Ig;
            break;
          case jd:
          case Od:
          case Id:
            g = Eg;
            break;
          case zd:
            g = Bg;
            break;
          case "scroll":
            g = xg;
            break;
          case "wheel":
            g = $g;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Mg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Au;
        }
        var y = (t & 4) !== 0,
          x = !y && e === "scroll",
          p = y ? (d !== null ? d + "Capture" : null) : d;
        y = [];
        for (var h = u, m; h !== null; ) {
          m = h;
          var w = m.stateNode;
          if (
            (m.tag === 5 &&
              w !== null &&
              ((m = w),
              p !== null && ((w = Ar(h, p)), w != null && y.push(Nr(h, w, m)))),
            x)
          )
            break;
          h = h.return;
        }
        0 < y.length &&
          ((d = new g(d, v, null, n, c)), f.push({ event: d, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((d = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          d &&
            n !== zs &&
            (v = n.relatedTarget || n.fromElement) &&
            (Xt(v) || v[ct]))
        )
          break e;
        if (
          (g || d) &&
          ((d =
            c.window === c
              ? c
              : (d = c.ownerDocument)
              ? d.defaultView || d.parentWindow
              : window),
          g
            ? ((v = n.relatedTarget || n.toElement),
              (g = u),
              (v = v ? Xt(v) : null),
              v !== null &&
                ((x = an(v)), v !== x || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((g = null), (v = u)),
          g !== v)
        ) {
          if (
            ((y = Cu),
            (w = "onMouseLeave"),
            (p = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = Au),
              (w = "onPointerLeave"),
              (p = "onPointerEnter"),
              (h = "pointer")),
            (x = g == null ? d : gn(g)),
            (m = v == null ? d : gn(v)),
            (d = new y(w, h + "leave", g, n, c)),
            (d.target = x),
            (d.relatedTarget = m),
            (w = null),
            Xt(c) === u &&
              ((y = new y(p, h + "enter", v, n, c)),
              (y.target = m),
              (y.relatedTarget = x),
              (w = y)),
            (x = w),
            g && v)
          )
            t: {
              for (y = g, p = v, h = 0, m = y; m; m = cn(m)) h++;
              for (m = 0, w = p; w; w = cn(w)) m++;
              for (; 0 < h - m; ) (y = cn(y)), h--;
              for (; 0 < m - h; ) (p = cn(p)), m--;
              for (; h--; ) {
                if (y === p || (p !== null && y === p.alternate)) break t;
                (y = cn(y)), (p = cn(p));
              }
              y = null;
            }
          else y = null;
          g !== null && Iu(f, d, g, y, !1),
            v !== null && x !== null && Iu(f, x, v, y, !0);
        }
      }
      e: {
        if (
          ((d = u ? gn(u) : window),
          (g = d.nodeName && d.nodeName.toLowerCase()),
          g === "select" || (g === "input" && d.type === "file"))
        )
          var S = Yg;
        else if (Vu(d))
          if (Rd) S = bg;
          else {
            S = qg;
            var T = Zg;
          }
        else
          (g = d.nodeName) &&
            g.toLowerCase() === "input" &&
            (d.type === "checkbox" || d.type === "radio") &&
            (S = Jg);
        if (S && (S = S(e, u))) {
          Vd(f, S, n, c);
          break e;
        }
        T && T(e, d, u),
          e === "focusout" &&
            (T = d._wrapperState) &&
            T.controlled &&
            d.type === "number" &&
            Ns(d, "number", d.value);
      }
      switch (((T = u ? gn(u) : window), e)) {
        case "focusin":
          (Vu(T) || T.contentEditable === "true") &&
            ((pn = T), (Gs = u), (gr = null));
          break;
        case "focusout":
          gr = Gs = pn = null;
          break;
        case "mousedown":
          Qs = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Qs = !1), Fu(f, n, c);
          break;
        case "selectionchange":
          if (ny) break;
        case "keydown":
        case "keyup":
          Fu(f, n, c);
      }
      var C;
      if (ea)
        e: {
          switch (e) {
            case "compositionstart":
              var k = "onCompositionStart";
              break e;
            case "compositionend":
              k = "onCompositionEnd";
              break e;
            case "compositionupdate":
              k = "onCompositionUpdate";
              break e;
          }
          k = void 0;
        }
      else
        hn
          ? Md(e, n) && (k = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      k &&
        (Ad &&
          n.locale !== "ko" &&
          (hn || k !== "onCompositionStart"
            ? k === "onCompositionEnd" && hn && (C = Ed())
            : ((Pt = c),
              (ql = "value" in Pt ? Pt.value : Pt.textContent),
              (hn = !0))),
        (T = Xi(u, k)),
        0 < T.length &&
          ((k = new Eu(k, e, null, n, c)),
          f.push({ event: k, listeners: T }),
          C ? (k.data = C) : ((C = Dd(n)), C !== null && (k.data = C)))),
        (C = Hg ? Kg(e, n) : Gg(e, n)) &&
          ((u = Xi(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new Eu("onBeforeInput", "beforeinput", null, n, c)),
            f.push({ event: c, listeners: u }),
            (c.data = C)));
    }
    Ud(f, t);
  });
}
function Nr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Xi(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      o = i.stateNode;
    i.tag === 5 &&
      o !== null &&
      ((i = o),
      (o = Ar(e, n)),
      o != null && r.unshift(Nr(e, o, i)),
      (o = Ar(e, t)),
      o != null && r.push(Nr(e, o, i))),
      (e = e.return);
  }
  return r;
}
function cn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Iu(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      i
        ? ((a = Ar(n, o)), a != null && s.unshift(Nr(n, a, l)))
        : i || ((a = Ar(n, o)), a != null && s.push(Nr(n, a, l)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var sy = /\r\n?/g,
  ly = /\u0000|\uFFFD/g;
function zu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      sy,
      `
`
    )
    .replace(ly, "");
}
function gi(e, t, n) {
  if (((t = zu(t)), zu(e) !== t && n)) throw Error(P(425));
}
function Yi() {}
var Xs = null,
  Ys = null;
function Zs(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var qs = typeof setTimeout == "function" ? setTimeout : void 0,
  ay = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Bu = typeof Promise == "function" ? Promise : void 0,
  uy =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Bu < "u"
      ? function (e) {
          return Bu.resolve(null).then(e).catch(cy);
        }
      : qs;
function cy(e) {
  setTimeout(function () {
    throw e;
  });
}
function rs(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), Vr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  Vr(t);
}
function At(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Uu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Gn = Math.random().toString(36).slice(2),
  qe = "__reactFiber$" + Gn,
  Fr = "__reactProps$" + Gn,
  ct = "__reactContainer$" + Gn,
  Js = "__reactEvents$" + Gn,
  fy = "__reactListeners$" + Gn,
  dy = "__reactHandles$" + Gn;
function Xt(e) {
  var t = e[qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[ct] || n[qe])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Uu(e); e !== null; ) {
          if ((n = e[qe])) return n;
          e = Uu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Zr(e) {
  return (
    (e = e[qe] || e[ct]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function gn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(P(33));
}
function To(e) {
  return e[Fr] || null;
}
var bs = [],
  yn = -1;
function Ot(e) {
  return { current: e };
}
function B(e) {
  0 > yn || ((e.current = bs[yn]), (bs[yn] = null), yn--);
}
function I(e, t) {
  yn++, (bs[yn] = e.current), (e.current = t);
}
var _t = {},
  me = Ot(_t),
  Pe = Ot(!1),
  tn = _t;
function Fn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return _t;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    o;
  for (o in n) i[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function ke(e) {
  return (e = e.childContextTypes), e != null;
}
function Zi() {
  B(Pe), B(me);
}
function $u(e, t, n) {
  if (me.current !== _t) throw Error(P(168));
  I(me, t), I(Pe, n);
}
function Wd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(P(108, Zm(e) || "Unknown", i));
  return G({}, n, r);
}
function qi(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || _t),
    (tn = me.current),
    I(me, e),
    I(Pe, Pe.current),
    !0
  );
}
function Wu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(P(169));
  n
    ? ((e = Wd(e, t, tn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      B(Pe),
      B(me),
      I(me, e))
    : B(Pe),
    I(Pe, n);
}
var rt = null,
  Co = !1,
  is = !1;
function Hd(e) {
  rt === null ? (rt = [e]) : rt.push(e);
}
function hy(e) {
  (Co = !0), Hd(e);
}
function It() {
  if (!is && rt !== null) {
    is = !0;
    var e = 0,
      t = O;
    try {
      var n = rt;
      for (O = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (rt = null), (Co = !1);
    } catch (i) {
      throw (rt !== null && (rt = rt.slice(e + 1)), md(Ql, It), i);
    } finally {
      (O = t), (is = !1);
    }
  }
  return null;
}
var vn = [],
  wn = 0,
  Ji = null,
  bi = 0,
  Fe = [],
  je = 0,
  nn = null,
  it = 1,
  ot = "";
function Ht(e, t) {
  (vn[wn++] = bi), (vn[wn++] = Ji), (Ji = e), (bi = t);
}
function Kd(e, t, n) {
  (Fe[je++] = it), (Fe[je++] = ot), (Fe[je++] = nn), (nn = e);
  var r = it;
  e = ot;
  var i = 32 - Ge(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var o = 32 - Ge(t) + i;
  if (30 < o) {
    var s = i - (i % 5);
    (o = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (it = (1 << (32 - Ge(t) + i)) | (n << i) | r),
      (ot = o + e);
  } else (it = (1 << o) | (n << i) | r), (ot = e);
}
function na(e) {
  e.return !== null && (Ht(e, 1), Kd(e, 1, 0));
}
function ra(e) {
  for (; e === Ji; )
    (Ji = vn[--wn]), (vn[wn] = null), (bi = vn[--wn]), (vn[wn] = null);
  for (; e === nn; )
    (nn = Fe[--je]),
      (Fe[je] = null),
      (ot = Fe[--je]),
      (Fe[je] = null),
      (it = Fe[--je]),
      (Fe[je] = null);
}
var Ae = null,
  Ee = null,
  $ = !1,
  Ke = null;
function Gd(e, t) {
  var n = Oe(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Hu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ae = e), (Ee = At(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ae = e), (Ee = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = nn !== null ? { id: it, overflow: ot } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Oe(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ae = e),
            (Ee = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function el(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function tl(e) {
  if ($) {
    var t = Ee;
    if (t) {
      var n = t;
      if (!Hu(e, t)) {
        if (el(e)) throw Error(P(418));
        t = At(n.nextSibling);
        var r = Ae;
        t && Hu(e, t)
          ? Gd(r, n)
          : ((e.flags = (e.flags & -4097) | 2), ($ = !1), (Ae = e));
      }
    } else {
      if (el(e)) throw Error(P(418));
      (e.flags = (e.flags & -4097) | 2), ($ = !1), (Ae = e);
    }
  }
}
function Ku(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ae = e;
}
function yi(e) {
  if (e !== Ae) return !1;
  if (!$) return Ku(e), ($ = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Zs(e.type, e.memoizedProps))),
    t && (t = Ee))
  ) {
    if (el(e)) throw (Qd(), Error(P(418)));
    for (; t; ) Gd(e, t), (t = At(t.nextSibling));
  }
  if ((Ku(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(P(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ee = At(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ee = null;
    }
  } else Ee = Ae ? At(e.stateNode.nextSibling) : null;
  return !0;
}
function Qd() {
  for (var e = Ee; e; ) e = At(e.nextSibling);
}
function jn() {
  (Ee = Ae = null), ($ = !1);
}
function ia(e) {
  Ke === null ? (Ke = [e]) : Ke.push(e);
}
var py = pt.ReactCurrentBatchConfig;
function tr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(P(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(P(147, e));
      var i = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (s) {
            var l = i.refs;
            s === null ? delete l[o] : (l[o] = s);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(P(284));
    if (!n._owner) throw Error(P(290, e));
  }
  return e;
}
function vi(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      P(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Gu(e) {
  var t = e._init;
  return t(e._payload);
}
function Xd(e) {
  function t(p, h) {
    if (e) {
      var m = p.deletions;
      m === null ? ((p.deletions = [h]), (p.flags |= 16)) : m.push(h);
    }
  }
  function n(p, h) {
    if (!e) return null;
    for (; h !== null; ) t(p, h), (h = h.sibling);
    return null;
  }
  function r(p, h) {
    for (p = new Map(); h !== null; )
      h.key !== null ? p.set(h.key, h) : p.set(h.index, h), (h = h.sibling);
    return p;
  }
  function i(p, h) {
    return (p = Rt(p, h)), (p.index = 0), (p.sibling = null), p;
  }
  function o(p, h, m) {
    return (
      (p.index = m),
      e
        ? ((m = p.alternate),
          m !== null
            ? ((m = m.index), m < h ? ((p.flags |= 2), h) : m)
            : ((p.flags |= 2), h))
        : ((p.flags |= 1048576), h)
    );
  }
  function s(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, h, m, w) {
    return h === null || h.tag !== 6
      ? ((h = fs(m, p.mode, w)), (h.return = p), h)
      : ((h = i(h, m)), (h.return = p), h);
  }
  function a(p, h, m, w) {
    var S = m.type;
    return S === dn
      ? c(p, h, m.props.children, w, m.key)
      : h !== null &&
        (h.elementType === S ||
          (typeof S == "object" &&
            S !== null &&
            S.$$typeof === vt &&
            Gu(S) === h.type))
      ? ((w = i(h, m.props)), (w.ref = tr(p, h, m)), (w.return = p), w)
      : ((w = Oi(m.type, m.key, m.props, null, p.mode, w)),
        (w.ref = tr(p, h, m)),
        (w.return = p),
        w);
  }
  function u(p, h, m, w) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== m.containerInfo ||
      h.stateNode.implementation !== m.implementation
      ? ((h = ds(m, p.mode, w)), (h.return = p), h)
      : ((h = i(h, m.children || [])), (h.return = p), h);
  }
  function c(p, h, m, w, S) {
    return h === null || h.tag !== 7
      ? ((h = bt(m, p.mode, w, S)), (h.return = p), h)
      : ((h = i(h, m)), (h.return = p), h);
  }
  function f(p, h, m) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = fs("" + h, p.mode, m)), (h.return = p), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case li:
          return (
            (m = Oi(h.type, h.key, h.props, null, p.mode, m)),
            (m.ref = tr(p, null, h)),
            (m.return = p),
            m
          );
        case fn:
          return (h = ds(h, p.mode, m)), (h.return = p), h;
        case vt:
          var w = h._init;
          return f(p, w(h._payload), m);
      }
      if (sr(h) || Zn(h))
        return (h = bt(h, p.mode, m, null)), (h.return = p), h;
      vi(p, h);
    }
    return null;
  }
  function d(p, h, m, w) {
    var S = h !== null ? h.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return S !== null ? null : l(p, h, "" + m, w);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case li:
          return m.key === S ? a(p, h, m, w) : null;
        case fn:
          return m.key === S ? u(p, h, m, w) : null;
        case vt:
          return (S = m._init), d(p, h, S(m._payload), w);
      }
      if (sr(m) || Zn(m)) return S !== null ? null : c(p, h, m, w, null);
      vi(p, m);
    }
    return null;
  }
  function g(p, h, m, w, S) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return (p = p.get(m) || null), l(h, p, "" + w, S);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case li:
          return (p = p.get(w.key === null ? m : w.key) || null), a(h, p, w, S);
        case fn:
          return (p = p.get(w.key === null ? m : w.key) || null), u(h, p, w, S);
        case vt:
          var T = w._init;
          return g(p, h, m, T(w._payload), S);
      }
      if (sr(w) || Zn(w)) return (p = p.get(m) || null), c(h, p, w, S, null);
      vi(h, w);
    }
    return null;
  }
  function v(p, h, m, w) {
    for (
      var S = null, T = null, C = h, k = (h = 0), N = null;
      C !== null && k < m.length;
      k++
    ) {
      C.index > k ? ((N = C), (C = null)) : (N = C.sibling);
      var V = d(p, C, m[k], w);
      if (V === null) {
        C === null && (C = N);
        break;
      }
      e && C && V.alternate === null && t(p, C),
        (h = o(V, h, k)),
        T === null ? (S = V) : (T.sibling = V),
        (T = V),
        (C = N);
    }
    if (k === m.length) return n(p, C), $ && Ht(p, k), S;
    if (C === null) {
      for (; k < m.length; k++)
        (C = f(p, m[k], w)),
          C !== null &&
            ((h = o(C, h, k)), T === null ? (S = C) : (T.sibling = C), (T = C));
      return $ && Ht(p, k), S;
    }
    for (C = r(p, C); k < m.length; k++)
      (N = g(C, p, k, m[k], w)),
        N !== null &&
          (e && N.alternate !== null && C.delete(N.key === null ? k : N.key),
          (h = o(N, h, k)),
          T === null ? (S = N) : (T.sibling = N),
          (T = N));
    return (
      e &&
        C.forEach(function (ne) {
          return t(p, ne);
        }),
      $ && Ht(p, k),
      S
    );
  }
  function y(p, h, m, w) {
    var S = Zn(m);
    if (typeof S != "function") throw Error(P(150));
    if (((m = S.call(m)), m == null)) throw Error(P(151));
    for (
      var T = (S = null), C = h, k = (h = 0), N = null, V = m.next();
      C !== null && !V.done;
      k++, V = m.next()
    ) {
      C.index > k ? ((N = C), (C = null)) : (N = C.sibling);
      var ne = d(p, C, V.value, w);
      if (ne === null) {
        C === null && (C = N);
        break;
      }
      e && C && ne.alternate === null && t(p, C),
        (h = o(ne, h, k)),
        T === null ? (S = ne) : (T.sibling = ne),
        (T = ne),
        (C = N);
    }
    if (V.done) return n(p, C), $ && Ht(p, k), S;
    if (C === null) {
      for (; !V.done; k++, V = m.next())
        (V = f(p, V.value, w)),
          V !== null &&
            ((h = o(V, h, k)), T === null ? (S = V) : (T.sibling = V), (T = V));
      return $ && Ht(p, k), S;
    }
    for (C = r(p, C); !V.done; k++, V = m.next())
      (V = g(C, p, k, V.value, w)),
        V !== null &&
          (e && V.alternate !== null && C.delete(V.key === null ? k : V.key),
          (h = o(V, h, k)),
          T === null ? (S = V) : (T.sibling = V),
          (T = V));
    return (
      e &&
        C.forEach(function (mt) {
          return t(p, mt);
        }),
      $ && Ht(p, k),
      S
    );
  }
  function x(p, h, m, w) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === dn &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case li:
          e: {
            for (var S = m.key, T = h; T !== null; ) {
              if (T.key === S) {
                if (((S = m.type), S === dn)) {
                  if (T.tag === 7) {
                    n(p, T.sibling),
                      (h = i(T, m.props.children)),
                      (h.return = p),
                      (p = h);
                    break e;
                  }
                } else if (
                  T.elementType === S ||
                  (typeof S == "object" &&
                    S !== null &&
                    S.$$typeof === vt &&
                    Gu(S) === T.type)
                ) {
                  n(p, T.sibling),
                    (h = i(T, m.props)),
                    (h.ref = tr(p, T, m)),
                    (h.return = p),
                    (p = h);
                  break e;
                }
                n(p, T);
                break;
              } else t(p, T);
              T = T.sibling;
            }
            m.type === dn
              ? ((h = bt(m.props.children, p.mode, w, m.key)),
                (h.return = p),
                (p = h))
              : ((w = Oi(m.type, m.key, m.props, null, p.mode, w)),
                (w.ref = tr(p, h, m)),
                (w.return = p),
                (p = w));
          }
          return s(p);
        case fn:
          e: {
            for (T = m.key; h !== null; ) {
              if (h.key === T)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === m.containerInfo &&
                  h.stateNode.implementation === m.implementation
                ) {
                  n(p, h.sibling),
                    (h = i(h, m.children || [])),
                    (h.return = p),
                    (p = h);
                  break e;
                } else {
                  n(p, h);
                  break;
                }
              else t(p, h);
              h = h.sibling;
            }
            (h = ds(m, p.mode, w)), (h.return = p), (p = h);
          }
          return s(p);
        case vt:
          return (T = m._init), x(p, h, T(m._payload), w);
      }
      if (sr(m)) return v(p, h, m, w);
      if (Zn(m)) return y(p, h, m, w);
      vi(p, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        h !== null && h.tag === 6
          ? (n(p, h.sibling), (h = i(h, m)), (h.return = p), (p = h))
          : (n(p, h), (h = fs(m, p.mode, w)), (h.return = p), (p = h)),
        s(p))
      : n(p, h);
  }
  return x;
}
var On = Xd(!0),
  Yd = Xd(!1),
  eo = Ot(null),
  to = null,
  Sn = null,
  oa = null;
function sa() {
  oa = Sn = to = null;
}
function la(e) {
  var t = eo.current;
  B(eo), (e._currentValue = t);
}
function nl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Ln(e, t) {
  (to = e),
    (oa = Sn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (xe = !0), (e.firstContext = null));
}
function ze(e) {
  var t = e._currentValue;
  if (oa !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Sn === null)) {
      if (to === null) throw Error(P(308));
      (Sn = e), (to.dependencies = { lanes: 0, firstContext: e });
    } else Sn = Sn.next = e;
  return t;
}
var Yt = null;
function aa(e) {
  Yt === null ? (Yt = [e]) : Yt.push(e);
}
function Zd(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), aa(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    ft(e, r)
  );
}
function ft(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var wt = !1;
function ua(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function qd(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function st(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Mt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), F & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      ft(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), aa(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    ft(e, n)
  );
}
function Ri(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Xl(e, n);
  }
}
function Qu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (i = o = s) : (o = o.next = s), (n = n.next);
      } while (n !== null);
      o === null ? (i = o = t) : (o = o.next = t);
    } else i = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function no(e, t, n, r) {
  var i = e.updateQueue;
  wt = !1;
  var o = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var a = l,
      u = a.next;
    (a.next = null), s === null ? (o = u) : (s.next = u), (s = a);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (l = c.lastBaseUpdate),
      l !== s &&
        (l === null ? (c.firstBaseUpdate = u) : (l.next = u),
        (c.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var f = i.baseState;
    (s = 0), (c = u = a = null), (l = o);
    do {
      var d = l.lane,
        g = l.eventTime;
      if ((r & d) === d) {
        c !== null &&
          (c = c.next =
            {
              eventTime: g,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var v = e,
            y = l;
          switch (((d = t), (g = n), y.tag)) {
            case 1:
              if (((v = y.payload), typeof v == "function")) {
                f = v.call(g, f, d);
                break e;
              }
              f = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = y.payload),
                (d = typeof v == "function" ? v.call(g, f, d) : v),
                d == null)
              )
                break e;
              f = G({}, f, d);
              break e;
            case 2:
              wt = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (d = i.effects),
          d === null ? (i.effects = [l]) : d.push(l));
      } else
        (g = {
          eventTime: g,
          lane: d,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          c === null ? ((u = c = g), (a = f)) : (c = c.next = g),
          (s |= d);
      if (((l = l.next), l === null)) {
        if (((l = i.shared.pending), l === null)) break;
        (d = l),
          (l = d.next),
          (d.next = null),
          (i.lastBaseUpdate = d),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (a = f),
      (i.baseState = a),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (s |= i.lane), (i = i.next);
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    (on |= s), (e.lanes = s), (e.memoizedState = f);
  }
}
function Xu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(P(191, i));
        i.call(r);
      }
    }
}
var qr = {},
  be = Ot(qr),
  jr = Ot(qr),
  Or = Ot(qr);
function Zt(e) {
  if (e === qr) throw Error(P(174));
  return e;
}
function ca(e, t) {
  switch ((I(Or, t), I(jr, e), I(be, qr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : js(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = js(t, e));
  }
  B(be), I(be, t);
}
function In() {
  B(be), B(jr), B(Or);
}
function Jd(e) {
  Zt(Or.current);
  var t = Zt(be.current),
    n = js(t, e.type);
  t !== n && (I(jr, e), I(be, n));
}
function fa(e) {
  jr.current === e && (B(be), B(jr));
}
var W = Ot(0);
function ro(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var os = [];
function da() {
  for (var e = 0; e < os.length; e++)
    os[e]._workInProgressVersionPrimary = null;
  os.length = 0;
}
var Li = pt.ReactCurrentDispatcher,
  ss = pt.ReactCurrentBatchConfig,
  rn = 0,
  K = null,
  ee = null,
  ie = null,
  io = !1,
  yr = !1,
  Ir = 0,
  my = 0;
function ce() {
  throw Error(P(321));
}
function ha(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Xe(e[n], t[n])) return !1;
  return !0;
}
function pa(e, t, n, r, i, o) {
  if (
    ((rn = o),
    (K = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Li.current = e === null || e.memoizedState === null ? wy : Sy),
    (e = n(r, i)),
    yr)
  ) {
    o = 0;
    do {
      if (((yr = !1), (Ir = 0), 25 <= o)) throw Error(P(301));
      (o += 1),
        (ie = ee = null),
        (t.updateQueue = null),
        (Li.current = xy),
        (e = n(r, i));
    } while (yr);
  }
  if (
    ((Li.current = oo),
    (t = ee !== null && ee.next !== null),
    (rn = 0),
    (ie = ee = K = null),
    (io = !1),
    t)
  )
    throw Error(P(300));
  return e;
}
function ma() {
  var e = Ir !== 0;
  return (Ir = 0), e;
}
function Ze() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return ie === null ? (K.memoizedState = ie = e) : (ie = ie.next = e), ie;
}
function Be() {
  if (ee === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = ie === null ? K.memoizedState : ie.next;
  if (t !== null) (ie = t), (ee = e);
  else {
    if (e === null) throw Error(P(310));
    (ee = e),
      (e = {
        memoizedState: ee.memoizedState,
        baseState: ee.baseState,
        baseQueue: ee.baseQueue,
        queue: ee.queue,
        next: null,
      }),
      ie === null ? (K.memoizedState = ie = e) : (ie = ie.next = e);
  }
  return ie;
}
function zr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ls(e) {
  var t = Be(),
    n = t.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = e;
  var r = ee,
    i = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      (i.next = o.next), (o.next = s);
    }
    (r.baseQueue = i = o), (n.pending = null);
  }
  if (i !== null) {
    (o = i.next), (r = r.baseState);
    var l = (s = null),
      a = null,
      u = o;
    do {
      var c = u.lane;
      if ((rn & c) === c)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((l = a = f), (s = r)) : (a = a.next = f),
          (K.lanes |= c),
          (on |= c);
      }
      u = u.next;
    } while (u !== null && u !== o);
    a === null ? (s = r) : (a.next = l),
      Xe(r, t.memoizedState) || (xe = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (o = i.lane), (K.lanes |= o), (on |= o), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function as(e) {
  var t = Be(),
    n = t.queue;
  if (n === null) throw Error(P(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (o = e(o, s.action)), (s = s.next);
    while (s !== i);
    Xe(o, t.memoizedState) || (xe = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function bd() {}
function eh(e, t) {
  var n = K,
    r = Be(),
    i = t(),
    o = !Xe(r.memoizedState, i);
  if (
    (o && ((r.memoizedState = i), (xe = !0)),
    (r = r.queue),
    ga(rh.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ie !== null && ie.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Br(9, nh.bind(null, n, r, i, t), void 0, null),
      oe === null)
    )
      throw Error(P(349));
    rn & 30 || th(n, t, i);
  }
  return i;
}
function th(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function nh(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), ih(t) && oh(e);
}
function rh(e, t, n) {
  return n(function () {
    ih(t) && oh(e);
  });
}
function ih(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Xe(e, n);
  } catch {
    return !0;
  }
}
function oh(e) {
  var t = ft(e, 1);
  t !== null && Qe(t, e, 1, -1);
}
function Yu(e) {
  var t = Ze();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: zr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = vy.bind(null, K, e)),
    [t.memoizedState, e]
  );
}
function Br(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function sh() {
  return Be().memoizedState;
}
function _i(e, t, n, r) {
  var i = Ze();
  (K.flags |= e),
    (i.memoizedState = Br(1 | t, n, void 0, r === void 0 ? null : r));
}
function Eo(e, t, n, r) {
  var i = Be();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var s = ee.memoizedState;
    if (((o = s.destroy), r !== null && ha(r, s.deps))) {
      i.memoizedState = Br(t, n, o, r);
      return;
    }
  }
  (K.flags |= e), (i.memoizedState = Br(1 | t, n, o, r));
}
function Zu(e, t) {
  return _i(8390656, 8, e, t);
}
function ga(e, t) {
  return Eo(2048, 8, e, t);
}
function lh(e, t) {
  return Eo(4, 2, e, t);
}
function ah(e, t) {
  return Eo(4, 4, e, t);
}
function uh(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function ch(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Eo(4, 4, uh.bind(null, t, e), n)
  );
}
function ya() {}
function fh(e, t) {
  var n = Be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ha(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function dh(e, t) {
  var n = Be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ha(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function hh(e, t, n) {
  return rn & 21
    ? (Xe(n, t) || ((n = vd()), (K.lanes |= n), (on |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (xe = !0)), (e.memoizedState = n));
}
function gy(e, t) {
  var n = O;
  (O = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = ss.transition;
  ss.transition = {};
  try {
    e(!1), t();
  } finally {
    (O = n), (ss.transition = r);
  }
}
function ph() {
  return Be().memoizedState;
}
function yy(e, t, n) {
  var r = Vt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    mh(e))
  )
    gh(t, n);
  else if (((n = Zd(e, t, n, r)), n !== null)) {
    var i = ye();
    Qe(n, e, r, i), yh(n, t, r);
  }
}
function vy(e, t, n) {
  var r = Vt(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (mh(e)) gh(t, i);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var s = t.lastRenderedState,
          l = o(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = l), Xe(l, s))) {
          var a = t.interleaved;
          a === null
            ? ((i.next = i), aa(t))
            : ((i.next = a.next), (a.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = Zd(e, t, i, r)),
      n !== null && ((i = ye()), Qe(n, e, r, i), yh(n, t, r));
  }
}
function mh(e) {
  var t = e.alternate;
  return e === K || (t !== null && t === K);
}
function gh(e, t) {
  yr = io = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function yh(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Xl(e, n);
  }
}
var oo = {
    readContext: ze,
    useCallback: ce,
    useContext: ce,
    useEffect: ce,
    useImperativeHandle: ce,
    useInsertionEffect: ce,
    useLayoutEffect: ce,
    useMemo: ce,
    useReducer: ce,
    useRef: ce,
    useState: ce,
    useDebugValue: ce,
    useDeferredValue: ce,
    useTransition: ce,
    useMutableSource: ce,
    useSyncExternalStore: ce,
    useId: ce,
    unstable_isNewReconciler: !1,
  },
  wy = {
    readContext: ze,
    useCallback: function (e, t) {
      return (Ze().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: ze,
    useEffect: Zu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        _i(4194308, 4, uh.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return _i(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return _i(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ze();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ze();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = yy.bind(null, K, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ze();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Yu,
    useDebugValue: ya,
    useDeferredValue: function (e) {
      return (Ze().memoizedState = e);
    },
    useTransition: function () {
      var e = Yu(!1),
        t = e[0];
      return (e = gy.bind(null, e[1])), (Ze().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = K,
        i = Ze();
      if ($) {
        if (n === void 0) throw Error(P(407));
        n = n();
      } else {
        if (((n = t()), oe === null)) throw Error(P(349));
        rn & 30 || th(r, t, n);
      }
      i.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (i.queue = o),
        Zu(rh.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        Br(9, nh.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ze(),
        t = oe.identifierPrefix;
      if ($) {
        var n = ot,
          r = it;
        (n = (r & ~(1 << (32 - Ge(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ir++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = my++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Sy = {
    readContext: ze,
    useCallback: fh,
    useContext: ze,
    useEffect: ga,
    useImperativeHandle: ch,
    useInsertionEffect: lh,
    useLayoutEffect: ah,
    useMemo: dh,
    useReducer: ls,
    useRef: sh,
    useState: function () {
      return ls(zr);
    },
    useDebugValue: ya,
    useDeferredValue: function (e) {
      var t = Be();
      return hh(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = ls(zr)[0],
        t = Be().memoizedState;
      return [e, t];
    },
    useMutableSource: bd,
    useSyncExternalStore: eh,
    useId: ph,
    unstable_isNewReconciler: !1,
  },
  xy = {
    readContext: ze,
    useCallback: fh,
    useContext: ze,
    useEffect: ga,
    useImperativeHandle: ch,
    useInsertionEffect: lh,
    useLayoutEffect: ah,
    useMemo: dh,
    useReducer: as,
    useRef: sh,
    useState: function () {
      return as(zr);
    },
    useDebugValue: ya,
    useDeferredValue: function (e) {
      var t = Be();
      return ee === null ? (t.memoizedState = e) : hh(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = as(zr)[0],
        t = Be().memoizedState;
      return [e, t];
    },
    useMutableSource: bd,
    useSyncExternalStore: eh,
    useId: ph,
    unstable_isNewReconciler: !1,
  };
function We(e, t) {
  if (e && e.defaultProps) {
    (t = G({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function rl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : G({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ao = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? an(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ye(),
      i = Vt(e),
      o = st(r, i);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = Mt(e, o, i)),
      t !== null && (Qe(t, e, i, r), Ri(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ye(),
      i = Vt(e),
      o = st(r, i);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Mt(e, o, i)),
      t !== null && (Qe(t, e, i, r), Ri(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ye(),
      r = Vt(e),
      i = st(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = Mt(e, i, r)),
      t !== null && (Qe(t, e, r, n), Ri(t, e, r));
  },
};
function qu(e, t, n, r, i, o, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Lr(n, r) || !Lr(i, o)
      : !0
  );
}
function vh(e, t, n) {
  var r = !1,
    i = _t,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = ze(o))
      : ((i = ke(t) ? tn : me.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? Fn(e, i) : _t)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ao),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Ju(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ao.enqueueReplaceState(t, t.state, null);
}
function il(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), ua(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (i.context = ze(o))
    : ((o = ke(t) ? tn : me.current), (i.context = Fn(e, o))),
    (i.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (rl(e, t, o, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Ao.enqueueReplaceState(i, i.state, null),
      no(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function zn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Ym(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (o) {
    i =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function us(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ol(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Py = typeof WeakMap == "function" ? WeakMap : Map;
function wh(e, t, n) {
  (n = st(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      lo || ((lo = !0), (ml = r)), ol(e, t);
    }),
    n
  );
}
function Sh(e, t, n) {
  (n = st(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        ol(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        ol(e, t),
          typeof r != "function" &&
            (Dt === null ? (Dt = new Set([this])) : Dt.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function bu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Py();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = jy.bind(null, e, t, n)), t.then(e, e));
}
function ec(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function tc(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = st(-1, 1)), (t.tag = 2), Mt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var ky = pt.ReactCurrentOwner,
  xe = !1;
function ge(e, t, n, r) {
  t.child = e === null ? Yd(t, null, n, r) : On(t, e.child, n, r);
}
function nc(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return (
    Ln(t, i),
    (r = pa(e, t, n, r, o, i)),
    (n = ma()),
    e !== null && !xe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        dt(e, t, i))
      : ($ && n && na(t), (t.flags |= 1), ge(e, t, r, i), t.child)
  );
}
function rc(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Ca(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), xh(e, t, o, r, i))
      : ((e = Oi(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & i))) {
    var s = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Lr), n(s, r) && e.ref === t.ref)
    )
      return dt(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Rt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function xh(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Lr(o, r) && e.ref === t.ref)
      if (((xe = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
        e.flags & 131072 && (xe = !0);
      else return (t.lanes = e.lanes), dt(e, t, i);
  }
  return sl(e, t, n, r, i);
}
function Ph(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        I(Pn, Ce),
        (Ce |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          I(Pn, Ce),
          (Ce |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        I(Pn, Ce),
        (Ce |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      I(Pn, Ce),
      (Ce |= r);
  return ge(e, t, i, n), t.child;
}
function kh(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function sl(e, t, n, r, i) {
  var o = ke(n) ? tn : me.current;
  return (
    (o = Fn(t, o)),
    Ln(t, i),
    (n = pa(e, t, n, r, o, i)),
    (r = ma()),
    e !== null && !xe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        dt(e, t, i))
      : ($ && r && na(t), (t.flags |= 1), ge(e, t, n, i), t.child)
  );
}
function ic(e, t, n, r, i) {
  if (ke(n)) {
    var o = !0;
    qi(t);
  } else o = !1;
  if ((Ln(t, i), t.stateNode === null))
    Ni(e, t), vh(t, n, r), il(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = ze(u))
      : ((u = ke(n) ? tn : me.current), (u = Fn(t, u)));
    var c = n.getDerivedStateFromProps,
      f =
        typeof c == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== r || a !== u) && Ju(t, s, r, u)),
      (wt = !1);
    var d = t.memoizedState;
    (s.state = d),
      no(t, r, s, i),
      (a = t.memoizedState),
      l !== r || d !== a || Pe.current || wt
        ? (typeof c == "function" && (rl(t, n, c, r), (a = t.memoizedState)),
          (l = wt || qu(t, n, l, r, d, a, u))
            ? (f ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = u),
          (r = l))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      qd(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : We(t.type, l)),
      (s.props = u),
      (f = t.pendingProps),
      (d = s.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = ze(a))
        : ((a = ke(n) ? tn : me.current), (a = Fn(t, a)));
    var g = n.getDerivedStateFromProps;
    (c =
      typeof g == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((l !== f || d !== a) && Ju(t, s, r, a)),
      (wt = !1),
      (d = t.memoizedState),
      (s.state = d),
      no(t, r, s, i);
    var v = t.memoizedState;
    l !== f || d !== v || Pe.current || wt
      ? (typeof g == "function" && (rl(t, n, g, r), (v = t.memoizedState)),
        (u = wt || qu(t, n, u, r, d, v, a) || !1)
          ? (c ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, v, a),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, v, a)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (l === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (s.props = r),
        (s.state = v),
        (s.context = a),
        (r = u))
      : (typeof s.componentDidUpdate != "function" ||
          (l === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ll(e, t, n, r, o, i);
}
function ll(e, t, n, r, i, o) {
  kh(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && Wu(t, n, !1), dt(e, t, o);
  (r = t.stateNode), (ky.current = t);
  var l =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = On(t, e.child, null, o)), (t.child = On(t, null, l, o)))
      : ge(e, t, l, o),
    (t.memoizedState = r.state),
    i && Wu(t, n, !0),
    t.child
  );
}
function Th(e) {
  var t = e.stateNode;
  t.pendingContext
    ? $u(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && $u(e, t.context, !1),
    ca(e, t.containerInfo);
}
function oc(e, t, n, r, i) {
  return jn(), ia(i), (t.flags |= 256), ge(e, t, n, r), t.child;
}
var al = { dehydrated: null, treeContext: null, retryLane: 0 };
function ul(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ch(e, t, n) {
  var r = t.pendingProps,
    i = W.current,
    o = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    l
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    I(W, i & 1),
    e === null)
  )
    return (
      tl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = s))
                : (o = Vo(s, r, 0, null)),
              (e = bt(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = ul(n)),
              (t.memoizedState = al),
              e)
            : va(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((l = i.dehydrated), l !== null)))
    return Ty(e, t, s, r, l, i, n);
  if (o) {
    (o = r.fallback), (s = t.mode), (i = e.child), (l = i.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = Rt(i, a)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      l !== null ? (o = Rt(l, o)) : ((o = bt(o, s, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? ul(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = al),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Rt(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function va(e, t) {
  return (
    (t = Vo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function wi(e, t, n, r) {
  return (
    r !== null && ia(r),
    On(t, e.child, null, n),
    (e = va(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Ty(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = us(Error(P(422)))), wi(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (i = t.mode),
        (r = Vo({ mode: "visible", children: r.children }, i, 0, null)),
        (o = bt(o, i, s, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && On(t, e.child, null, s),
        (t.child.memoizedState = ul(s)),
        (t.memoizedState = al),
        o);
  if (!(t.mode & 1)) return wi(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (o = Error(P(419))), (r = us(o, r, void 0)), wi(e, t, s, r);
  }
  if (((l = (s & e.childLanes) !== 0), xe || l)) {
    if (((r = oe), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== o.retryLane &&
          ((o.retryLane = i), ft(e, i), Qe(r, e, i, -1));
    }
    return Ta(), (r = us(Error(P(421)))), wi(e, t, s, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Oy.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ee = At(i.nextSibling)),
      (Ae = t),
      ($ = !0),
      (Ke = null),
      e !== null &&
        ((Fe[je++] = it),
        (Fe[je++] = ot),
        (Fe[je++] = nn),
        (it = e.id),
        (ot = e.overflow),
        (nn = t)),
      (t = va(t, r.children)),
      (t.flags |= 4096),
      t);
}
function sc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), nl(e.return, t, n);
}
function cs(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = i));
}
function Eh(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    o = r.tail;
  if ((ge(e, t, r.children, n), (r = W.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && sc(e, n, t);
        else if (e.tag === 19) sc(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((I(W, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && ro(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          cs(t, !1, i, n, o);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && ro(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        cs(t, !0, n, null, o);
        break;
      case "together":
        cs(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ni(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function dt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (on |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(P(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Rt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Rt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Cy(e, t, n) {
  switch (t.tag) {
    case 3:
      Th(t), jn();
      break;
    case 5:
      Jd(t);
      break;
    case 1:
      ke(t.type) && qi(t);
      break;
    case 4:
      ca(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      I(eo, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (I(W, W.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Ch(e, t, n)
          : (I(W, W.current & 1),
            (e = dt(e, t, n)),
            e !== null ? e.sibling : null);
      I(W, W.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Eh(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        I(W, W.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Ph(e, t, n);
  }
  return dt(e, t, n);
}
var Ah, cl, Mh, Dh;
Ah = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
cl = function () {};
Mh = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Zt(be.current);
    var o = null;
    switch (n) {
      case "input":
        (i = Ls(e, i)), (r = Ls(e, r)), (o = []);
        break;
      case "select":
        (i = G({}, i, { value: void 0 })),
          (r = G({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (i = Fs(e, i)), (r = Fs(e, r)), (o = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Yi);
    }
    Os(n, r);
    var s;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var l = i[u];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Cr.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in a)
              a.hasOwnProperty(s) &&
                l[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else n || (o || (o = []), o.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (o = o || []).push(u, a))
            : u === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (o = o || []).push(u, "" + a)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (Cr.hasOwnProperty(u)
                ? (a != null && u === "onScroll" && z("scroll", e),
                  o || l === a || (o = []))
                : (o = o || []).push(u, a));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Dh = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function nr(e, t) {
  if (!$)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function fe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Ey(e, t, n) {
  var r = t.pendingProps;
  switch ((ra(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return fe(t), null;
    case 1:
      return ke(t.type) && Zi(), fe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        In(),
        B(Pe),
        B(me),
        da(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (yi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ke !== null && (vl(Ke), (Ke = null)))),
        cl(e, t),
        fe(t),
        null
      );
    case 5:
      fa(t);
      var i = Zt(Or.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Mh(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(P(166));
          return fe(t), null;
        }
        if (((e = Zt(be.current)), yi(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[qe] = t), (r[Fr] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              z("cancel", r), z("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              z("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < ar.length; i++) z(ar[i], r);
              break;
            case "source":
              z("error", r);
              break;
            case "img":
            case "image":
            case "link":
              z("error", r), z("load", r);
              break;
            case "details":
              z("toggle", r);
              break;
            case "input":
              mu(r, o), z("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                z("invalid", r);
              break;
            case "textarea":
              yu(r, o), z("invalid", r);
          }
          Os(n, o), (i = null);
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var l = o[s];
              s === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (o.suppressHydrationWarning !== !0 &&
                      gi(r.textContent, l, e),
                    (i = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (o.suppressHydrationWarning !== !0 &&
                      gi(r.textContent, l, e),
                    (i = ["children", "" + l]))
                : Cr.hasOwnProperty(s) &&
                  l != null &&
                  s === "onScroll" &&
                  z("scroll", r);
            }
          switch (n) {
            case "input":
              ai(r), gu(r, o, !0);
              break;
            case "textarea":
              ai(r), vu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Yi);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = rd(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = s.createElement(n, { is: r.is }))
                : ((e = s.createElement(n)),
                  n === "select" &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[qe] = t),
            (e[Fr] = r),
            Ah(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = Is(n, r)), n)) {
              case "dialog":
                z("cancel", e), z("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                z("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < ar.length; i++) z(ar[i], e);
                i = r;
                break;
              case "source":
                z("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                z("error", e), z("load", e), (i = r);
                break;
              case "details":
                z("toggle", e), (i = r);
                break;
              case "input":
                mu(e, r), (i = Ls(e, r)), z("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = G({}, r, { value: void 0 })),
                  z("invalid", e);
                break;
              case "textarea":
                yu(e, r), (i = Fs(e, r)), z("invalid", e);
                break;
              default:
                i = r;
            }
            Os(n, i), (l = i);
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var a = l[o];
                o === "style"
                  ? sd(e, a)
                  : o === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && id(e, a))
                  : o === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && Er(e, a)
                    : typeof a == "number" && Er(e, "" + a)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Cr.hasOwnProperty(o)
                      ? a != null && o === "onScroll" && z("scroll", e)
                      : a != null && $l(e, o, a, s));
              }
            switch (n) {
              case "input":
                ai(e), gu(e, r, !1);
                break;
              case "textarea":
                ai(e), vu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Lt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Mn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Mn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Yi);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return fe(t), null;
    case 6:
      if (e && t.stateNode != null) Dh(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(P(166));
        if (((n = Zt(Or.current)), Zt(be.current), yi(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[qe] = t),
            (o = r.nodeValue !== n) && ((e = Ae), e !== null))
          )
            switch (e.tag) {
              case 3:
                gi(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  gi(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[qe] = t),
            (t.stateNode = r);
      }
      return fe(t), null;
    case 13:
      if (
        (B(W),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if ($ && Ee !== null && t.mode & 1 && !(t.flags & 128))
          Qd(), jn(), (t.flags |= 98560), (o = !1);
        else if (((o = yi(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(P(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(P(317));
            o[qe] = t;
          } else
            jn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          fe(t), (o = !1);
        } else Ke !== null && (vl(Ke), (Ke = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || W.current & 1 ? te === 0 && (te = 3) : Ta())),
          t.updateQueue !== null && (t.flags |= 4),
          fe(t),
          null);
    case 4:
      return (
        In(), cl(e, t), e === null && _r(t.stateNode.containerInfo), fe(t), null
      );
    case 10:
      return la(t.type._context), fe(t), null;
    case 17:
      return ke(t.type) && Zi(), fe(t), null;
    case 19:
      if ((B(W), (o = t.memoizedState), o === null)) return fe(t), null;
      if (((r = (t.flags & 128) !== 0), (s = o.rendering), s === null))
        if (r) nr(o, !1);
        else {
          if (te !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = ro(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    nr(o, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (s = o.alternate),
                    s === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = s.childLanes),
                        (o.lanes = s.lanes),
                        (o.child = s.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = s.memoizedProps),
                        (o.memoizedState = s.memoizedState),
                        (o.updateQueue = s.updateQueue),
                        (o.type = s.type),
                        (e = s.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return I(W, (W.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            q() > Bn &&
            ((t.flags |= 128), (r = !0), nr(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ro(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              nr(o, !0),
              o.tail === null && o.tailMode === "hidden" && !s.alternate && !$)
            )
              return fe(t), null;
          } else
            2 * q() - o.renderingStartTime > Bn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), nr(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = o.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (o.last = s));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = q()),
          (t.sibling = null),
          (n = W.current),
          I(W, r ? (n & 1) | 2 : n & 1),
          t)
        : (fe(t), null);
    case 22:
    case 23:
      return (
        ka(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ce & 1073741824 && (fe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : fe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(P(156, t.tag));
}
function Ay(e, t) {
  switch ((ra(t), t.tag)) {
    case 1:
      return (
        ke(t.type) && Zi(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        In(),
        B(Pe),
        B(me),
        da(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return fa(t), null;
    case 13:
      if ((B(W), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(P(340));
        jn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return B(W), null;
    case 4:
      return In(), null;
    case 10:
      return la(t.type._context), null;
    case 22:
    case 23:
      return ka(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Si = !1,
  he = !1,
  My = typeof WeakSet == "function" ? WeakSet : Set,
  A = null;
function xn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        X(e, t, r);
      }
    else n.current = null;
}
function fl(e, t, n) {
  try {
    n();
  } catch (r) {
    X(e, t, r);
  }
}
var lc = !1;
function Dy(e, t) {
  if (((Xs = Gi), (e = Nd()), ta(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            u = 0,
            c = 0,
            f = e,
            d = null;
          t: for (;;) {
            for (
              var g;
              f !== n || (i !== 0 && f.nodeType !== 3) || (l = s + i),
                f !== o || (r !== 0 && f.nodeType !== 3) || (a = s + r),
                f.nodeType === 3 && (s += f.nodeValue.length),
                (g = f.firstChild) !== null;

            )
              (d = f), (f = g);
            for (;;) {
              if (f === e) break t;
              if (
                (d === n && ++u === i && (l = s),
                d === o && ++c === r && (a = s),
                (g = f.nextSibling) !== null)
              )
                break;
              (f = d), (d = f.parentNode);
            }
            f = g;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ys = { focusedElem: e, selectionRange: n }, Gi = !1, A = t; A !== null; )
    if (((t = A), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (A = e);
    else
      for (; A !== null; ) {
        t = A;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var y = v.memoizedProps,
                    x = v.memoizedState,
                    p = t.stateNode,
                    h = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : We(t.type, y),
                      x
                    );
                  p.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(P(163));
            }
        } catch (w) {
          X(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (A = e);
          break;
        }
        A = t.return;
      }
  return (v = lc), (lc = !1), v;
}
function vr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        (i.destroy = void 0), o !== void 0 && fl(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Mo(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function dl(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Vh(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Vh(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[qe], delete t[Fr], delete t[Js], delete t[fy], delete t[dy])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Rh(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ac(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Rh(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function hl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Yi));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (hl(e, t, n), e = e.sibling; e !== null; ) hl(e, t, n), (e = e.sibling);
}
function pl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (pl(e, t, n), e = e.sibling; e !== null; ) pl(e, t, n), (e = e.sibling);
}
var se = null,
  He = !1;
function gt(e, t, n) {
  for (n = n.child; n !== null; ) Lh(e, t, n), (n = n.sibling);
}
function Lh(e, t, n) {
  if (Je && typeof Je.onCommitFiberUnmount == "function")
    try {
      Je.onCommitFiberUnmount(So, n);
    } catch {}
  switch (n.tag) {
    case 5:
      he || xn(n, t);
    case 6:
      var r = se,
        i = He;
      (se = null),
        gt(e, t, n),
        (se = r),
        (He = i),
        se !== null &&
          (He
            ? ((e = se),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : se.removeChild(n.stateNode));
      break;
    case 18:
      se !== null &&
        (He
          ? ((e = se),
            (n = n.stateNode),
            e.nodeType === 8
              ? rs(e.parentNode, n)
              : e.nodeType === 1 && rs(e, n),
            Vr(e))
          : rs(se, n.stateNode));
      break;
    case 4:
      (r = se),
        (i = He),
        (se = n.stateNode.containerInfo),
        (He = !0),
        gt(e, t, n),
        (se = r),
        (He = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !he &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var o = i,
            s = o.destroy;
          (o = o.tag),
            s !== void 0 && (o & 2 || o & 4) && fl(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      gt(e, t, n);
      break;
    case 1:
      if (
        !he &&
        (xn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          X(n, t, l);
        }
      gt(e, t, n);
      break;
    case 21:
      gt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((he = (r = he) || n.memoizedState !== null), gt(e, t, n), (he = r))
        : gt(e, t, n);
      break;
    default:
      gt(e, t, n);
  }
}
function uc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new My()),
      t.forEach(function (r) {
        var i = Iy.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function Ue(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var o = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (se = l.stateNode), (He = !1);
              break e;
            case 3:
              (se = l.stateNode.containerInfo), (He = !0);
              break e;
            case 4:
              (se = l.stateNode.containerInfo), (He = !0);
              break e;
          }
          l = l.return;
        }
        if (se === null) throw Error(P(160));
        Lh(o, s, i), (se = null), (He = !1);
        var a = i.alternate;
        a !== null && (a.return = null), (i.return = null);
      } catch (u) {
        X(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) _h(t, e), (t = t.sibling);
}
function _h(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ue(t, e), Ye(e), r & 4)) {
        try {
          vr(3, e, e.return), Mo(3, e);
        } catch (y) {
          X(e, e.return, y);
        }
        try {
          vr(5, e, e.return);
        } catch (y) {
          X(e, e.return, y);
        }
      }
      break;
    case 1:
      Ue(t, e), Ye(e), r & 512 && n !== null && xn(n, n.return);
      break;
    case 5:
      if (
        (Ue(t, e),
        Ye(e),
        r & 512 && n !== null && xn(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Er(i, "");
        } catch (y) {
          X(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var o = e.memoizedProps,
          s = n !== null ? n.memoizedProps : o,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === "input" && o.type === "radio" && o.name != null && td(i, o),
              Is(l, s);
            var u = Is(l, o);
            for (s = 0; s < a.length; s += 2) {
              var c = a[s],
                f = a[s + 1];
              c === "style"
                ? sd(i, f)
                : c === "dangerouslySetInnerHTML"
                ? id(i, f)
                : c === "children"
                ? Er(i, f)
                : $l(i, c, f, u);
            }
            switch (l) {
              case "input":
                _s(i, o);
                break;
              case "textarea":
                nd(i, o);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var g = o.value;
                g != null
                  ? Mn(i, !!o.multiple, g, !1)
                  : d !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Mn(i, !!o.multiple, o.defaultValue, !0)
                      : Mn(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[Fr] = o;
          } catch (y) {
            X(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((Ue(t, e), Ye(e), r & 4)) {
        if (e.stateNode === null) throw Error(P(162));
        (i = e.stateNode), (o = e.memoizedProps);
        try {
          i.nodeValue = o;
        } catch (y) {
          X(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (Ue(t, e), Ye(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Vr(t.containerInfo);
        } catch (y) {
          X(e, e.return, y);
        }
      break;
    case 4:
      Ue(t, e), Ye(e);
      break;
    case 13:
      Ue(t, e),
        Ye(e),
        (i = e.child),
        i.flags & 8192 &&
          ((o = i.memoizedState !== null),
          (i.stateNode.isHidden = o),
          !o ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (xa = q())),
        r & 4 && uc(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((he = (u = he) || c), Ue(t, e), (he = u)) : Ue(t, e),
        Ye(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (A = e, c = e.child; c !== null; ) {
            for (f = A = c; A !== null; ) {
              switch (((d = A), (g = d.child), d.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  vr(4, d, d.return);
                  break;
                case 1:
                  xn(d, d.return);
                  var v = d.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    (r = d), (n = d.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (y) {
                      X(r, n, y);
                    }
                  }
                  break;
                case 5:
                  xn(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    fc(f);
                    continue;
                  }
              }
              g !== null ? ((g.return = d), (A = g)) : fc(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (i = f.stateNode),
                  u
                    ? ((o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((l = f.stateNode),
                      (a = f.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = od("display", s)));
              } catch (y) {
                X(e, e.return, y);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (y) {
                X(e, e.return, y);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Ue(t, e), Ye(e), r & 4 && uc(e);
      break;
    case 21:
      break;
    default:
      Ue(t, e), Ye(e);
  }
}
function Ye(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Rh(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(P(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Er(i, ""), (r.flags &= -33));
          var o = ac(e);
          pl(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = ac(e);
          hl(e, l, s);
          break;
        default:
          throw Error(P(161));
      }
    } catch (a) {
      X(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Vy(e, t, n) {
  (A = e), Nh(e);
}
function Nh(e, t, n) {
  for (var r = (e.mode & 1) !== 0; A !== null; ) {
    var i = A,
      o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || Si;
      if (!s) {
        var l = i.alternate,
          a = (l !== null && l.memoizedState !== null) || he;
        l = Si;
        var u = he;
        if (((Si = s), (he = a) && !u))
          for (A = i; A !== null; )
            (s = A),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? dc(i)
                : a !== null
                ? ((a.return = s), (A = a))
                : dc(i);
        for (; o !== null; ) (A = o), Nh(o), (o = o.sibling);
        (A = i), (Si = l), (he = u);
      }
      cc(e);
    } else
      i.subtreeFlags & 8772 && o !== null ? ((o.return = i), (A = o)) : cc(e);
  }
}
function cc(e) {
  for (; A !== null; ) {
    var t = A;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              he || Mo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !he)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : We(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Xu(t, o, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Xu(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && Vr(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(P(163));
          }
        he || (t.flags & 512 && dl(t));
      } catch (d) {
        X(t, t.return, d);
      }
    }
    if (t === e) {
      A = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (A = n);
      break;
    }
    A = t.return;
  }
}
function fc(e) {
  for (; A !== null; ) {
    var t = A;
    if (t === e) {
      A = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (A = n);
      break;
    }
    A = t.return;
  }
}
function dc(e) {
  for (; A !== null; ) {
    var t = A;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Mo(4, t);
          } catch (a) {
            X(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              X(t, i, a);
            }
          }
          var o = t.return;
          try {
            dl(t);
          } catch (a) {
            X(t, o, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            dl(t);
          } catch (a) {
            X(t, s, a);
          }
      }
    } catch (a) {
      X(t, t.return, a);
    }
    if (t === e) {
      A = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (A = l);
      break;
    }
    A = t.return;
  }
}
var Ry = Math.ceil,
  so = pt.ReactCurrentDispatcher,
  wa = pt.ReactCurrentOwner,
  Ie = pt.ReactCurrentBatchConfig,
  F = 0,
  oe = null,
  J = null,
  ae = 0,
  Ce = 0,
  Pn = Ot(0),
  te = 0,
  Ur = null,
  on = 0,
  Do = 0,
  Sa = 0,
  wr = null,
  Se = null,
  xa = 0,
  Bn = 1 / 0,
  nt = null,
  lo = !1,
  ml = null,
  Dt = null,
  xi = !1,
  kt = null,
  ao = 0,
  Sr = 0,
  gl = null,
  Fi = -1,
  ji = 0;
function ye() {
  return F & 6 ? q() : Fi !== -1 ? Fi : (Fi = q());
}
function Vt(e) {
  return e.mode & 1
    ? F & 2 && ae !== 0
      ? ae & -ae
      : py.transition !== null
      ? (ji === 0 && (ji = vd()), ji)
      : ((e = O),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Cd(e.type))),
        e)
    : 1;
}
function Qe(e, t, n, r) {
  if (50 < Sr) throw ((Sr = 0), (gl = null), Error(P(185)));
  Xr(e, n, r),
    (!(F & 2) || e !== oe) &&
      (e === oe && (!(F & 2) && (Do |= n), te === 4 && xt(e, ae)),
      Te(e, r),
      n === 1 && F === 0 && !(t.mode & 1) && ((Bn = q() + 500), Co && It()));
}
function Te(e, t) {
  var n = e.callbackNode;
  pg(e, t);
  var r = Ki(e, e === oe ? ae : 0);
  if (r === 0)
    n !== null && xu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && xu(n), t === 1))
      e.tag === 0 ? hy(hc.bind(null, e)) : Hd(hc.bind(null, e)),
        uy(function () {
          !(F & 6) && It();
        }),
        (n = null);
    else {
      switch (wd(r)) {
        case 1:
          n = Ql;
          break;
        case 4:
          n = gd;
          break;
        case 16:
          n = Hi;
          break;
        case 536870912:
          n = yd;
          break;
        default:
          n = Hi;
      }
      n = $h(n, Fh.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Fh(e, t) {
  if (((Fi = -1), (ji = 0), F & 6)) throw Error(P(327));
  var n = e.callbackNode;
  if (_n() && e.callbackNode !== n) return null;
  var r = Ki(e, e === oe ? ae : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = uo(e, r);
  else {
    t = r;
    var i = F;
    F |= 2;
    var o = Oh();
    (oe !== e || ae !== t) && ((nt = null), (Bn = q() + 500), Jt(e, t));
    do
      try {
        Ny();
        break;
      } catch (l) {
        jh(e, l);
      }
    while (!0);
    sa(),
      (so.current = o),
      (F = i),
      J !== null ? (t = 0) : ((oe = null), (ae = 0), (t = te));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Ws(e)), i !== 0 && ((r = i), (t = yl(e, i)))), t === 1)
    )
      throw ((n = Ur), Jt(e, 0), xt(e, r), Te(e, q()), n);
    if (t === 6) xt(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Ly(i) &&
          ((t = uo(e, r)),
          t === 2 && ((o = Ws(e)), o !== 0 && ((r = o), (t = yl(e, o)))),
          t === 1))
      )
        throw ((n = Ur), Jt(e, 0), xt(e, r), Te(e, q()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(P(345));
        case 2:
          Kt(e, Se, nt);
          break;
        case 3:
          if (
            (xt(e, r), (r & 130023424) === r && ((t = xa + 500 - q()), 10 < t))
          ) {
            if (Ki(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              ye(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = qs(Kt.bind(null, e, Se, nt), t);
            break;
          }
          Kt(e, Se, nt);
          break;
        case 4:
          if ((xt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - Ge(r);
            (o = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~o);
          }
          if (
            ((r = i),
            (r = q() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Ry(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = qs(Kt.bind(null, e, Se, nt), r);
            break;
          }
          Kt(e, Se, nt);
          break;
        case 5:
          Kt(e, Se, nt);
          break;
        default:
          throw Error(P(329));
      }
    }
  }
  return Te(e, q()), e.callbackNode === n ? Fh.bind(null, e) : null;
}
function yl(e, t) {
  var n = wr;
  return (
    e.current.memoizedState.isDehydrated && (Jt(e, t).flags |= 256),
    (e = uo(e, t)),
    e !== 2 && ((t = Se), (Se = n), t !== null && vl(t)),
    e
  );
}
function vl(e) {
  Se === null ? (Se = e) : Se.push.apply(Se, e);
}
function Ly(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            o = i.getSnapshot;
          i = i.value;
          try {
            if (!Xe(o(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function xt(e, t) {
  for (
    t &= ~Sa,
      t &= ~Do,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ge(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function hc(e) {
  if (F & 6) throw Error(P(327));
  _n();
  var t = Ki(e, 0);
  if (!(t & 1)) return Te(e, q()), null;
  var n = uo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ws(e);
    r !== 0 && ((t = r), (n = yl(e, r)));
  }
  if (n === 1) throw ((n = Ur), Jt(e, 0), xt(e, t), Te(e, q()), n);
  if (n === 6) throw Error(P(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Kt(e, Se, nt),
    Te(e, q()),
    null
  );
}
function Pa(e, t) {
  var n = F;
  F |= 1;
  try {
    return e(t);
  } finally {
    (F = n), F === 0 && ((Bn = q() + 500), Co && It());
  }
}
function sn(e) {
  kt !== null && kt.tag === 0 && !(F & 6) && _n();
  var t = F;
  F |= 1;
  var n = Ie.transition,
    r = O;
  try {
    if (((Ie.transition = null), (O = 1), e)) return e();
  } finally {
    (O = r), (Ie.transition = n), (F = t), !(F & 6) && It();
  }
}
function ka() {
  (Ce = Pn.current), B(Pn);
}
function Jt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), ay(n)), J !== null))
    for (n = J.return; n !== null; ) {
      var r = n;
      switch ((ra(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Zi();
          break;
        case 3:
          In(), B(Pe), B(me), da();
          break;
        case 5:
          fa(r);
          break;
        case 4:
          In();
          break;
        case 13:
          B(W);
          break;
        case 19:
          B(W);
          break;
        case 10:
          la(r.type._context);
          break;
        case 22:
        case 23:
          ka();
      }
      n = n.return;
    }
  if (
    ((oe = e),
    (J = e = Rt(e.current, null)),
    (ae = Ce = t),
    (te = 0),
    (Ur = null),
    (Sa = Do = on = 0),
    (Se = wr = null),
    Yt !== null)
  ) {
    for (t = 0; t < Yt.length; t++)
      if (((n = Yt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          o = n.pending;
        if (o !== null) {
          var s = o.next;
          (o.next = i), (r.next = s);
        }
        n.pending = r;
      }
    Yt = null;
  }
  return e;
}
function jh(e, t) {
  do {
    var n = J;
    try {
      if ((sa(), (Li.current = oo), io)) {
        for (var r = K.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        io = !1;
      }
      if (
        ((rn = 0),
        (ie = ee = K = null),
        (yr = !1),
        (Ir = 0),
        (wa.current = null),
        n === null || n.return === null)
      ) {
        (te = 1), (Ur = t), (J = null);
        break;
      }
      e: {
        var o = e,
          s = n.return,
          l = n,
          a = t;
        if (
          ((t = ae),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            c = l,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d
              ? ((c.updateQueue = d.updateQueue),
                (c.memoizedState = d.memoizedState),
                (c.lanes = d.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var g = ec(s);
          if (g !== null) {
            (g.flags &= -257),
              tc(g, s, l, o, t),
              g.mode & 1 && bu(o, u, t),
              (t = g),
              (a = u);
            var v = t.updateQueue;
            if (v === null) {
              var y = new Set();
              y.add(a), (t.updateQueue = y);
            } else v.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              bu(o, u, t), Ta();
              break e;
            }
            a = Error(P(426));
          }
        } else if ($ && l.mode & 1) {
          var x = ec(s);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              tc(x, s, l, o, t),
              ia(zn(a, l));
            break e;
          }
        }
        (o = a = zn(a, l)),
          te !== 4 && (te = 2),
          wr === null ? (wr = [o]) : wr.push(o),
          (o = s);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var p = wh(o, a, t);
              Qu(o, p);
              break e;
            case 1:
              l = a;
              var h = o.type,
                m = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (Dt === null || !Dt.has(m))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var w = Sh(o, l, t);
                Qu(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      zh(n);
    } catch (S) {
      (t = S), J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Oh() {
  var e = so.current;
  return (so.current = oo), e === null ? oo : e;
}
function Ta() {
  (te === 0 || te === 3 || te === 2) && (te = 4),
    oe === null || (!(on & 268435455) && !(Do & 268435455)) || xt(oe, ae);
}
function uo(e, t) {
  var n = F;
  F |= 2;
  var r = Oh();
  (oe !== e || ae !== t) && ((nt = null), Jt(e, t));
  do
    try {
      _y();
      break;
    } catch (i) {
      jh(e, i);
    }
  while (!0);
  if ((sa(), (F = n), (so.current = r), J !== null)) throw Error(P(261));
  return (oe = null), (ae = 0), te;
}
function _y() {
  for (; J !== null; ) Ih(J);
}
function Ny() {
  for (; J !== null && !og(); ) Ih(J);
}
function Ih(e) {
  var t = Uh(e.alternate, e, Ce);
  (e.memoizedProps = e.pendingProps),
    t === null ? zh(e) : (J = t),
    (wa.current = null);
}
function zh(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ay(n, t)), n !== null)) {
        (n.flags &= 32767), (J = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (te = 6), (J = null);
        return;
      }
    } else if (((n = Ey(n, t, Ce)), n !== null)) {
      J = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function Kt(e, t, n) {
  var r = O,
    i = Ie.transition;
  try {
    (Ie.transition = null), (O = 1), Fy(e, t, n, r);
  } finally {
    (Ie.transition = i), (O = r);
  }
  return null;
}
function Fy(e, t, n, r) {
  do _n();
  while (kt !== null);
  if (F & 6) throw Error(P(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(P(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (mg(e, o),
    e === oe && ((J = oe = null), (ae = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      xi ||
      ((xi = !0),
      $h(Hi, function () {
        return _n(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Ie.transition), (Ie.transition = null);
    var s = O;
    O = 1;
    var l = F;
    (F |= 4),
      (wa.current = null),
      Dy(e, n),
      _h(n, e),
      ty(Ys),
      (Gi = !!Xs),
      (Ys = Xs = null),
      (e.current = n),
      Vy(n),
      sg(),
      (F = l),
      (O = s),
      (Ie.transition = o);
  } else e.current = n;
  if (
    (xi && ((xi = !1), (kt = e), (ao = i)),
    (o = e.pendingLanes),
    o === 0 && (Dt = null),
    ug(n.stateNode),
    Te(e, q()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (lo) throw ((lo = !1), (e = ml), (ml = null), e);
  return (
    ao & 1 && e.tag !== 0 && _n(),
    (o = e.pendingLanes),
    o & 1 ? (e === gl ? Sr++ : ((Sr = 0), (gl = e))) : (Sr = 0),
    It(),
    null
  );
}
function _n() {
  if (kt !== null) {
    var e = wd(ao),
      t = Ie.transition,
      n = O;
    try {
      if (((Ie.transition = null), (O = 16 > e ? 16 : e), kt === null))
        var r = !1;
      else {
        if (((e = kt), (kt = null), (ao = 0), F & 6)) throw Error(P(331));
        var i = F;
        for (F |= 4, A = e.current; A !== null; ) {
          var o = A,
            s = o.child;
          if (A.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (A = u; A !== null; ) {
                  var c = A;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      vr(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (A = f);
                  else
                    for (; A !== null; ) {
                      c = A;
                      var d = c.sibling,
                        g = c.return;
                      if ((Vh(c), c === u)) {
                        A = null;
                        break;
                      }
                      if (d !== null) {
                        (d.return = g), (A = d);
                        break;
                      }
                      A = g;
                    }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var y = v.child;
                if (y !== null) {
                  v.child = null;
                  do {
                    var x = y.sibling;
                    (y.sibling = null), (y = x);
                  } while (y !== null);
                }
              }
              A = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) (s.return = o), (A = s);
          else
            e: for (; A !== null; ) {
              if (((o = A), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    vr(9, o, o.return);
                }
              var p = o.sibling;
              if (p !== null) {
                (p.return = o.return), (A = p);
                break e;
              }
              A = o.return;
            }
        }
        var h = e.current;
        for (A = h; A !== null; ) {
          s = A;
          var m = s.child;
          if (s.subtreeFlags & 2064 && m !== null) (m.return = s), (A = m);
          else
            e: for (s = h; A !== null; ) {
              if (((l = A), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Mo(9, l);
                  }
                } catch (S) {
                  X(l, l.return, S);
                }
              if (l === s) {
                A = null;
                break e;
              }
              var w = l.sibling;
              if (w !== null) {
                (w.return = l.return), (A = w);
                break e;
              }
              A = l.return;
            }
        }
        if (
          ((F = i), It(), Je && typeof Je.onPostCommitFiberRoot == "function")
        )
          try {
            Je.onPostCommitFiberRoot(So, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (O = n), (Ie.transition = t);
    }
  }
  return !1;
}
function pc(e, t, n) {
  (t = zn(n, t)),
    (t = wh(e, t, 1)),
    (e = Mt(e, t, 1)),
    (t = ye()),
    e !== null && (Xr(e, 1, t), Te(e, t));
}
function X(e, t, n) {
  if (e.tag === 3) pc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        pc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Dt === null || !Dt.has(r)))
        ) {
          (e = zn(n, e)),
            (e = Sh(t, e, 1)),
            (t = Mt(t, e, 1)),
            (e = ye()),
            t !== null && (Xr(t, 1, e), Te(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function jy(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = ye()),
    (e.pingedLanes |= e.suspendedLanes & n),
    oe === e &&
      (ae & n) === n &&
      (te === 4 || (te === 3 && (ae & 130023424) === ae && 500 > q() - xa)
        ? Jt(e, 0)
        : (Sa |= n)),
    Te(e, t);
}
function Bh(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = fi), (fi <<= 1), !(fi & 130023424) && (fi = 4194304))
      : (t = 1));
  var n = ye();
  (e = ft(e, t)), e !== null && (Xr(e, t, n), Te(e, n));
}
function Oy(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Bh(e, n);
}
function Iy(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(P(314));
  }
  r !== null && r.delete(t), Bh(e, n);
}
var Uh;
Uh = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Pe.current) xe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (xe = !1), Cy(e, t, n);
      xe = !!(e.flags & 131072);
    }
  else (xe = !1), $ && t.flags & 1048576 && Kd(t, bi, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Ni(e, t), (e = t.pendingProps);
      var i = Fn(t, me.current);
      Ln(t, n), (i = pa(null, t, r, e, i, n));
      var o = ma();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ke(r) ? ((o = !0), qi(t)) : (o = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            ua(t),
            (i.updater = Ao),
            (t.stateNode = i),
            (i._reactInternals = t),
            il(t, r, e, n),
            (t = ll(null, t, r, !0, o, n)))
          : ((t.tag = 0), $ && o && na(t), ge(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Ni(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = By(r)),
          (e = We(r, e)),
          i)
        ) {
          case 0:
            t = sl(null, t, r, e, n);
            break e;
          case 1:
            t = ic(null, t, r, e, n);
            break e;
          case 11:
            t = nc(null, t, r, e, n);
            break e;
          case 14:
            t = rc(null, t, r, We(r.type, e), n);
            break e;
        }
        throw Error(P(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : We(r, i)),
        sl(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : We(r, i)),
        ic(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Th(t), e === null)) throw Error(P(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (i = o.element),
          qd(e, t),
          no(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (i = zn(Error(P(423)), t)), (t = oc(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = zn(Error(P(424)), t)), (t = oc(e, t, r, n, i));
            break e;
          } else
            for (
              Ee = At(t.stateNode.containerInfo.firstChild),
                Ae = t,
                $ = !0,
                Ke = null,
                n = Yd(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((jn(), r === i)) {
            t = dt(e, t, n);
            break e;
          }
          ge(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Jd(t),
        e === null && tl(t),
        (r = t.type),
        (i = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (s = i.children),
        Zs(r, i) ? (s = null) : o !== null && Zs(r, o) && (t.flags |= 32),
        kh(e, t),
        ge(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && tl(t), null;
    case 13:
      return Ch(e, t, n);
    case 4:
      return (
        ca(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = On(t, null, r, n)) : ge(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : We(r, i)),
        nc(e, t, r, i, n)
      );
    case 7:
      return ge(e, t, t.pendingProps, n), t.child;
    case 8:
      return ge(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ge(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (o = t.memoizedProps),
          (s = i.value),
          I(eo, r._currentValue),
          (r._currentValue = s),
          o !== null)
        )
          if (Xe(o.value, s)) {
            if (o.children === i.children && !Pe.current) {
              t = dt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var l = o.dependencies;
              if (l !== null) {
                s = o.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = st(-1, n & -n)), (a.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (a.next = a)
                          : ((a.next = c.next), (c.next = a)),
                          (u.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      nl(o.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((s = o.return), s === null)) throw Error(P(341));
                (s.lanes |= n),
                  (l = s.alternate),
                  l !== null && (l.lanes |= n),
                  nl(s, n, t),
                  (s = o.sibling);
              } else s = o.child;
              if (s !== null) s.return = o;
              else
                for (s = o; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((o = s.sibling), o !== null)) {
                    (o.return = s.return), (s = o);
                    break;
                  }
                  s = s.return;
                }
              o = s;
            }
        ge(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Ln(t, n),
        (i = ze(i)),
        (r = r(i)),
        (t.flags |= 1),
        ge(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = We(r, t.pendingProps)),
        (i = We(r.type, i)),
        rc(e, t, r, i, n)
      );
    case 15:
      return xh(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : We(r, i)),
        Ni(e, t),
        (t.tag = 1),
        ke(r) ? ((e = !0), qi(t)) : (e = !1),
        Ln(t, n),
        vh(t, r, i),
        il(t, r, i, n),
        ll(null, t, r, !0, e, n)
      );
    case 19:
      return Eh(e, t, n);
    case 22:
      return Ph(e, t, n);
  }
  throw Error(P(156, t.tag));
};
function $h(e, t) {
  return md(e, t);
}
function zy(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Oe(e, t, n, r) {
  return new zy(e, t, n, r);
}
function Ca(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function By(e) {
  if (typeof e == "function") return Ca(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Hl)) return 11;
    if (e === Kl) return 14;
  }
  return 2;
}
function Rt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Oe(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Oi(e, t, n, r, i, o) {
  var s = 2;
  if (((r = e), typeof e == "function")) Ca(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case dn:
        return bt(n.children, i, o, t);
      case Wl:
        (s = 8), (i |= 8);
        break;
      case Ms:
        return (
          (e = Oe(12, n, t, i | 2)), (e.elementType = Ms), (e.lanes = o), e
        );
      case Ds:
        return (e = Oe(13, n, t, i)), (e.elementType = Ds), (e.lanes = o), e;
      case Vs:
        return (e = Oe(19, n, t, i)), (e.elementType = Vs), (e.lanes = o), e;
      case Jf:
        return Vo(n, i, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Zf:
              s = 10;
              break e;
            case qf:
              s = 9;
              break e;
            case Hl:
              s = 11;
              break e;
            case Kl:
              s = 14;
              break e;
            case vt:
              (s = 16), (r = null);
              break e;
          }
        throw Error(P(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Oe(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function bt(e, t, n, r) {
  return (e = Oe(7, e, r, t)), (e.lanes = n), e;
}
function Vo(e, t, n, r) {
  return (
    (e = Oe(22, e, r, t)),
    (e.elementType = Jf),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function fs(e, t, n) {
  return (e = Oe(6, e, null, t)), (e.lanes = n), e;
}
function ds(e, t, n) {
  return (
    (t = Oe(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Uy(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Go(0)),
    (this.expirationTimes = Go(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Go(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Ea(e, t, n, r, i, o, s, l, a) {
  return (
    (e = new Uy(e, t, n, l, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Oe(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    ua(o),
    e
  );
}
function $y(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: fn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Wh(e) {
  if (!e) return _t;
  e = e._reactInternals;
  e: {
    if (an(e) !== e || e.tag !== 1) throw Error(P(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ke(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(P(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ke(n)) return Wd(e, n, t);
  }
  return t;
}
function Hh(e, t, n, r, i, o, s, l, a) {
  return (
    (e = Ea(n, r, !0, e, i, o, s, l, a)),
    (e.context = Wh(null)),
    (n = e.current),
    (r = ye()),
    (i = Vt(n)),
    (o = st(r, i)),
    (o.callback = t ?? null),
    Mt(n, o, i),
    (e.current.lanes = i),
    Xr(e, i, r),
    Te(e, r),
    e
  );
}
function Ro(e, t, n, r) {
  var i = t.current,
    o = ye(),
    s = Vt(i);
  return (
    (n = Wh(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = st(o, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Mt(i, t, s)),
    e !== null && (Qe(e, i, s, o), Ri(e, i, s)),
    s
  );
}
function co(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function mc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Aa(e, t) {
  mc(e, t), (e = e.alternate) && mc(e, t);
}
function Wy() {
  return null;
}
var Kh =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ma(e) {
  this._internalRoot = e;
}
Lo.prototype.render = Ma.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(P(409));
  Ro(e, t, null, null);
};
Lo.prototype.unmount = Ma.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    sn(function () {
      Ro(null, e, null, null);
    }),
      (t[ct] = null);
  }
};
function Lo(e) {
  this._internalRoot = e;
}
Lo.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Pd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < St.length && t !== 0 && t < St[n].priority; n++);
    St.splice(n, 0, e), n === 0 && Td(e);
  }
};
function Da(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function _o(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function gc() {}
function Hy(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var u = co(s);
        o.call(u);
      };
    }
    var s = Hh(t, r, e, 0, null, !1, !1, "", gc);
    return (
      (e._reactRootContainer = s),
      (e[ct] = s.current),
      _r(e.nodeType === 8 ? e.parentNode : e),
      sn(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = co(a);
      l.call(u);
    };
  }
  var a = Ea(e, 0, !1, null, null, !1, !1, "", gc);
  return (
    (e._reactRootContainer = a),
    (e[ct] = a.current),
    _r(e.nodeType === 8 ? e.parentNode : e),
    sn(function () {
      Ro(t, a, n, r);
    }),
    a
  );
}
function No(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var l = i;
      i = function () {
        var a = co(s);
        l.call(a);
      };
    }
    Ro(t, s, e, i);
  } else s = Hy(n, t, e, i, r);
  return co(s);
}
Sd = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = lr(t.pendingLanes);
        n !== 0 &&
          (Xl(t, n | 1), Te(t, q()), !(F & 6) && ((Bn = q() + 500), It()));
      }
      break;
    case 13:
      sn(function () {
        var r = ft(e, 1);
        if (r !== null) {
          var i = ye();
          Qe(r, e, 1, i);
        }
      }),
        Aa(e, 1);
  }
};
Yl = function (e) {
  if (e.tag === 13) {
    var t = ft(e, 134217728);
    if (t !== null) {
      var n = ye();
      Qe(t, e, 134217728, n);
    }
    Aa(e, 134217728);
  }
};
xd = function (e) {
  if (e.tag === 13) {
    var t = Vt(e),
      n = ft(e, t);
    if (n !== null) {
      var r = ye();
      Qe(n, e, t, r);
    }
    Aa(e, t);
  }
};
Pd = function () {
  return O;
};
kd = function (e, t) {
  var n = O;
  try {
    return (O = e), t();
  } finally {
    O = n;
  }
};
Bs = function (e, t, n) {
  switch (t) {
    case "input":
      if ((_s(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = To(r);
            if (!i) throw Error(P(90));
            ed(r), _s(r, i);
          }
        }
      }
      break;
    case "textarea":
      nd(e, n);
      break;
    case "select":
      (t = n.value), t != null && Mn(e, !!n.multiple, t, !1);
  }
};
ud = Pa;
cd = sn;
var Ky = { usingClientEntryPoint: !1, Events: [Zr, gn, To, ld, ad, Pa] },
  rr = {
    findFiberByHostInstance: Xt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Gy = {
    bundleType: rr.bundleType,
    version: rr.version,
    rendererPackageName: rr.rendererPackageName,
    rendererConfig: rr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: pt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = hd(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: rr.findFiberByHostInstance || Wy,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Pi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Pi.isDisabled && Pi.supportsFiber)
    try {
      (So = Pi.inject(Gy)), (Je = Pi);
    } catch {}
}
Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ky;
Re.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Da(t)) throw Error(P(200));
  return $y(e, t, null, n);
};
Re.createRoot = function (e, t) {
  if (!Da(e)) throw Error(P(299));
  var n = !1,
    r = "",
    i = Kh;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Ea(e, 1, !1, null, null, n, !1, r, i)),
    (e[ct] = t.current),
    _r(e.nodeType === 8 ? e.parentNode : e),
    new Ma(t)
  );
};
Re.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(P(188))
      : ((e = Object.keys(e).join(",")), Error(P(268, e)));
  return (e = hd(t)), (e = e === null ? null : e.stateNode), e;
};
Re.flushSync = function (e) {
  return sn(e);
};
Re.hydrate = function (e, t, n) {
  if (!_o(t)) throw Error(P(200));
  return No(null, e, t, !0, n);
};
Re.hydrateRoot = function (e, t, n) {
  if (!Da(e)) throw Error(P(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    o = "",
    s = Kh;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = Hh(t, null, e, 1, n ?? null, i, !1, o, s)),
    (e[ct] = t.current),
    _r(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Lo(t);
};
Re.render = function (e, t, n) {
  if (!_o(t)) throw Error(P(200));
  return No(null, e, t, !1, n);
};
Re.unmountComponentAtNode = function (e) {
  if (!_o(e)) throw Error(P(40));
  return e._reactRootContainer
    ? (sn(function () {
        No(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[ct] = null);
        });
      }),
      !0)
    : !1;
};
Re.unstable_batchedUpdates = Pa;
Re.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!_o(n)) throw Error(P(200));
  if (e == null || e._reactInternals === void 0) throw Error(P(38));
  return No(e, t, n, !1, r);
};
Re.version = "18.3.1-next-f1338f8080-20240426";
function Gh() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gh);
    } catch (e) {
      console.error(e);
    }
}
Gh(), (Gf.exports = Re);
var Qy = Gf.exports,
  Qh,
  yc = Qy;
(Qh = yc.createRoot), yc.hydrateRoot;
const Xh = M.createContext({});
function Xy(e) {
  const t = M.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const Va = M.createContext(null),
  Yh = M.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  });
function Yy(e = !0) {
  const t = M.useContext(Va);
  if (t === null) return [!0, null];
  const { isPresent: n, onExitComplete: r, register: i } = t,
    o = M.useId();
  M.useEffect(() => {
    e && i(o);
  }, [e]);
  const s = M.useCallback(() => e && r && r(o), [o, r, e]);
  return !n && r ? [!1, s] : [!0];
}
const Ra = typeof window < "u",
  Zy = Ra ? M.useLayoutEffect : M.useEffect,
  Me = (e) => e;
let wl = Me;
function La(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Un = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  lt = (e) => e * 1e3,
  at = (e) => e / 1e3,
  qy = { skipAnimations: !1, useManualTiming: !1 };
function Jy(e) {
  let t = new Set(),
    n = new Set(),
    r = !1,
    i = !1;
  const o = new WeakSet();
  let s = { delta: 0, timestamp: 0, isProcessing: !1 };
  function l(u) {
    o.has(u) && (a.schedule(u), e()), u(s);
  }
  const a = {
    schedule: (u, c = !1, f = !1) => {
      const g = f && r ? t : n;
      return c && o.add(u), g.has(u) || g.add(u), u;
    },
    cancel: (u) => {
      n.delete(u), o.delete(u);
    },
    process: (u) => {
      if (((s = u), r)) {
        i = !0;
        return;
      }
      (r = !0),
        ([t, n] = [n, t]),
        t.forEach(l),
        t.clear(),
        (r = !1),
        i && ((i = !1), a.process(u));
    },
  };
  return a;
}
const ki = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender",
  ],
  by = 40;
function Zh(e, t) {
  let n = !1,
    r = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    o = () => (n = !0),
    s = ki.reduce((p, h) => ((p[h] = Jy(o)), p), {}),
    {
      read: l,
      resolveKeyframes: a,
      update: u,
      preRender: c,
      render: f,
      postRender: d,
    } = s,
    g = () => {
      const p = performance.now();
      (n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(p - i.timestamp, by), 1)),
        (i.timestamp = p),
        (i.isProcessing = !0),
        l.process(i),
        a.process(i),
        u.process(i),
        c.process(i),
        f.process(i),
        d.process(i),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(g));
    },
    v = () => {
      (n = !0), (r = !0), i.isProcessing || e(g);
    };
  return {
    schedule: ki.reduce((p, h) => {
      const m = s[h];
      return (p[h] = (w, S = !1, T = !1) => (n || v(), m.schedule(w, S, T))), p;
    }, {}),
    cancel: (p) => {
      for (let h = 0; h < ki.length; h++) s[ki[h]].cancel(p);
    },
    state: i,
    steps: s,
  };
}
const {
    schedule: U,
    cancel: Nt,
    state: le,
    steps: hs,
  } = Zh(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Me, !0),
  qh = M.createContext({ strict: !1 }),
  vc = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  $n = {};
for (const e in vc) $n[e] = { isEnabled: (t) => vc[e].some((n) => !!t[n]) };
function ev(e) {
  for (const t in e) $n[t] = { ...$n[t], ...e[t] };
}
const tv = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function fo(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    tv.has(e)
  );
}
let Jh = (e) => !fo(e);
function nv(e) {
  e && (Jh = (t) => (t.startsWith("on") ? !fo(t) : e(t)));
}
try {
  nv(require("@emotion/is-prop-valid").default);
} catch {}
function rv(e, t, n) {
  const r = {};
  for (const i in e)
    (i === "values" && typeof e.values == "object") ||
      ((Jh(i) ||
        (n === !0 && fo(i)) ||
        (!t && !fo(i)) ||
        (e.draggable && i.startsWith("onDrag"))) &&
        (r[i] = e[i]));
  return r;
}
function iv(e) {
  if (typeof Proxy > "u") return e;
  const t = new Map(),
    n = (...r) => e(...r);
  return new Proxy(n, {
    get: (r, i) =>
      i === "create" ? e : (t.has(i) || t.set(i, e(i)), t.get(i)),
  });
}
const Fo = M.createContext({});
function $r(e) {
  return typeof e == "string" || Array.isArray(e);
}
function jo(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
const _a = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Na = ["initial", ..._a];
function Oo(e) {
  return jo(e.animate) || Na.some((t) => $r(e[t]));
}
function bh(e) {
  return !!(Oo(e) || e.variants);
}
function ov(e, t) {
  if (Oo(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || $r(n) ? n : void 0,
      animate: $r(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function sv(e) {
  const { initial: t, animate: n } = ov(e, M.useContext(Fo));
  return M.useMemo(() => ({ initial: t, animate: n }), [wc(t), wc(n)]);
}
function wc(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const lv = Symbol.for("motionComponentSymbol");
function kn(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function av(e, t, n) {
  return M.useCallback(
    (r) => {
      r && e.onMount && e.onMount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == "function" ? n(r) : kn(n) && (n.current = r));
    },
    [t]
  );
}
const Fa = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  uv = "framerAppearId",
  ep = "data-" + Fa(uv),
  { schedule: ja, cancel: AS } = Zh(queueMicrotask, !1),
  tp = M.createContext({});
function cv(e, t, n, r, i) {
  var o, s;
  const { visualElement: l } = M.useContext(Fo),
    a = M.useContext(qh),
    u = M.useContext(Va),
    c = M.useContext(Yh).reducedMotion,
    f = M.useRef(null);
  (r = r || a.renderer),
    !f.current &&
      r &&
      (f.current = r(e, {
        visualState: t,
        parent: l,
        props: n,
        presenceContext: u,
        blockInitialAnimation: u ? u.initial === !1 : !1,
        reducedMotionConfig: c,
      }));
  const d = f.current,
    g = M.useContext(tp);
  d &&
    !d.projection &&
    i &&
    (d.type === "html" || d.type === "svg") &&
    fv(f.current, n, i, g);
  const v = M.useRef(!1);
  M.useInsertionEffect(() => {
    d && v.current && d.update(n, u);
  });
  const y = n[ep],
    x = M.useRef(
      !!y &&
        !(
          !((o = window.MotionHandoffIsComplete) === null || o === void 0) &&
          o.call(window, y)
        ) &&
        ((s = window.MotionHasOptimisedAnimation) === null || s === void 0
          ? void 0
          : s.call(window, y))
    );
  return (
    Zy(() => {
      d &&
        ((v.current = !0),
        (window.MotionIsMounted = !0),
        d.updateFeatures(),
        ja.render(d.render),
        x.current && d.animationState && d.animationState.animateChanges());
    }),
    M.useEffect(() => {
      d &&
        (!x.current && d.animationState && d.animationState.animateChanges(),
        x.current &&
          (queueMicrotask(() => {
            var p;
            (p = window.MotionHandoffMarkAsComplete) === null ||
              p === void 0 ||
              p.call(window, y);
          }),
          (x.current = !1)));
    }),
    d
  );
}
function fv(e, t, n, r) {
  const {
    layoutId: i,
    layout: o,
    drag: s,
    dragConstraints: l,
    layoutScroll: a,
    layoutRoot: u,
  } = t;
  (e.projection = new n(
    e.latestValues,
    t["data-framer-portal-id"] ? void 0 : np(e.parent)
  )),
    e.projection.setOptions({
      layoutId: i,
      layout: o,
      alwaysMeasureLayout: !!s || (l && kn(l)),
      visualElement: e,
      animationType: typeof o == "string" ? o : "both",
      initialPromotionConfig: r,
      layoutScroll: a,
      layoutRoot: u,
    });
}
function np(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : np(e.parent);
}
function dv({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  var o, s;
  e && ev(e);
  function l(u, c) {
    let f;
    const d = { ...M.useContext(Yh), ...u, layoutId: hv(u) },
      { isStatic: g } = d,
      v = sv(u),
      y = r(u, g);
    if (!g && Ra) {
      pv();
      const x = mv(d);
      (f = x.MeasureLayout),
        (v.visualElement = cv(i, y, d, t, x.ProjectionNode));
    }
    return j.jsxs(Fo.Provider, {
      value: v,
      children: [
        f && v.visualElement
          ? j.jsx(f, { visualElement: v.visualElement, ...d })
          : null,
        n(i, u, av(y, v.visualElement, c), y, g, v.visualElement),
      ],
    });
  }
  l.displayName = `motion.${
    typeof i == "string"
      ? i
      : `create(${
          (s = (o = i.displayName) !== null && o !== void 0 ? o : i.name) !==
            null && s !== void 0
            ? s
            : ""
        })`
  }`;
  const a = M.forwardRef(l);
  return (a[lv] = i), a;
}
function hv({ layoutId: e }) {
  const t = M.useContext(Xh).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function pv(e, t) {
  M.useContext(qh).strict;
}
function mv(e) {
  const { drag: t, layout: n } = $n;
  if (!t && !n) return {};
  const r = { ...t, ...n };
  return {
    MeasureLayout:
      (t != null && t.isEnabled(e)) || (n != null && n.isEnabled(e))
        ? r.MeasureLayout
        : void 0,
    ProjectionNode: r.ProjectionNode,
  };
}
const gv = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Oa(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!(gv.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function Sc(e) {
  const t = [{}, {}];
  return (
    e == null ||
      e.values.forEach((n, r) => {
        (t[0][r] = n.get()), (t[1][r] = n.getVelocity());
      }),
    t
  );
}
function Ia(e, t, n, r) {
  if (typeof t == "function") {
    const [i, o] = Sc(r);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  if (
    (typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function")
  ) {
    const [i, o] = Sc(r);
    t = t(n !== void 0 ? n : e.custom, i, o);
  }
  return t;
}
const Sl = (e) => Array.isArray(e),
  yv = (e) => !!(e && typeof e == "object" && e.mix && e.toValue),
  vv = (e) => (Sl(e) ? e[e.length - 1] || 0 : e),
  pe = (e) => !!(e && e.getVelocity);
function Ii(e) {
  const t = pe(e) ? e.get() : e;
  return yv(t) ? t.toValue() : t;
}
function wv(
  { scrapeMotionValuesFromProps: e, createRenderState: t, onUpdate: n },
  r,
  i,
  o
) {
  const s = { latestValues: Sv(r, i, o, e), renderState: t() };
  return (
    n &&
      ((s.onMount = (l) => n({ props: r, current: l, ...s })),
      (s.onUpdate = (l) => n(l))),
    s
  );
}
const rp = (e) => (t, n) => {
  const r = M.useContext(Fo),
    i = M.useContext(Va),
    o = () => wv(e, t, r, i);
  return n ? o() : Xy(o);
};
function Sv(e, t, n, r) {
  const i = {},
    o = r(e, {});
  for (const d in o) i[d] = Ii(o[d]);
  let { initial: s, animate: l } = e;
  const a = Oo(e),
    u = bh(e);
  t &&
    u &&
    !a &&
    e.inherit !== !1 &&
    (s === void 0 && (s = t.initial), l === void 0 && (l = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || s === !1;
  const f = c ? l : s;
  if (f && typeof f != "boolean" && !jo(f)) {
    const d = Array.isArray(f) ? f : [f];
    for (let g = 0; g < d.length; g++) {
      const v = Ia(e, d[g]);
      if (v) {
        const { transitionEnd: y, transition: x, ...p } = v;
        for (const h in p) {
          let m = p[h];
          if (Array.isArray(m)) {
            const w = c ? m.length - 1 : 0;
            m = m[w];
          }
          m !== null && (i[h] = m);
        }
        for (const h in y) i[h] = y[h];
      }
    }
  }
  return i;
}
const Qn = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  un = new Set(Qn),
  ip = (e) => (t) => typeof t == "string" && t.startsWith(e),
  op = ip("--"),
  xv = ip("var(--"),
  za = (e) => (xv(e) ? Pv.test(e.split("/*")[0].trim()) : !1),
  Pv =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  sp = (e, t) => (t && typeof e == "number" ? t.transform(e) : e),
  ht = (e, t, n) => (n > t ? t : n < e ? e : n),
  Xn = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  Wr = { ...Xn, transform: (e) => ht(0, 1, e) },
  Ti = { ...Xn, default: 1 },
  Jr = (e) => ({
    test: (t) =>
      typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  yt = Jr("deg"),
  et = Jr("%"),
  D = Jr("px"),
  kv = Jr("vh"),
  Tv = Jr("vw"),
  xc = {
    ...et,
    parse: (e) => et.parse(e) / 100,
    transform: (e) => et.transform(e * 100),
  },
  Cv = {
    borderWidth: D,
    borderTopWidth: D,
    borderRightWidth: D,
    borderBottomWidth: D,
    borderLeftWidth: D,
    borderRadius: D,
    radius: D,
    borderTopLeftRadius: D,
    borderTopRightRadius: D,
    borderBottomRightRadius: D,
    borderBottomLeftRadius: D,
    width: D,
    maxWidth: D,
    height: D,
    maxHeight: D,
    top: D,
    right: D,
    bottom: D,
    left: D,
    padding: D,
    paddingTop: D,
    paddingRight: D,
    paddingBottom: D,
    paddingLeft: D,
    margin: D,
    marginTop: D,
    marginRight: D,
    marginBottom: D,
    marginLeft: D,
    backgroundPositionX: D,
    backgroundPositionY: D,
  },
  Ev = {
    rotate: yt,
    rotateX: yt,
    rotateY: yt,
    rotateZ: yt,
    scale: Ti,
    scaleX: Ti,
    scaleY: Ti,
    scaleZ: Ti,
    skew: yt,
    skewX: yt,
    skewY: yt,
    distance: D,
    translateX: D,
    translateY: D,
    translateZ: D,
    x: D,
    y: D,
    z: D,
    perspective: D,
    transformPerspective: D,
    opacity: Wr,
    originX: xc,
    originY: xc,
    originZ: D,
  },
  Pc = { ...Xn, transform: Math.round },
  Ba = {
    ...Cv,
    ...Ev,
    zIndex: Pc,
    size: D,
    fillOpacity: Wr,
    strokeOpacity: Wr,
    numOctaves: Pc,
  },
  Av = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  Mv = Qn.length;
function Dv(e, t, n) {
  let r = "",
    i = !0;
  for (let o = 0; o < Mv; o++) {
    const s = Qn[o],
      l = e[s];
    if (l === void 0) continue;
    let a = !0;
    if (
      (typeof l == "number"
        ? (a = l === (s.startsWith("scale") ? 1 : 0))
        : (a = parseFloat(l) === 0),
      !a || n)
    ) {
      const u = sp(l, Ba[s]);
      if (!a) {
        i = !1;
        const c = Av[s] || s;
        r += `${c}(${u}) `;
      }
      n && (t[s] = u);
    }
  }
  return (r = r.trim()), n ? (r = n(t, i ? "" : r)) : i && (r = "none"), r;
}
function Ua(e, t, n) {
  const { style: r, vars: i, transformOrigin: o } = e;
  let s = !1,
    l = !1;
  for (const a in t) {
    const u = t[a];
    if (un.has(a)) {
      s = !0;
      continue;
    } else if (op(a)) {
      i[a] = u;
      continue;
    } else {
      const c = sp(u, Ba[a]);
      a.startsWith("origin") ? ((l = !0), (o[a] = c)) : (r[a] = c);
    }
  }
  if (
    (t.transform ||
      (s || n
        ? (r.transform = Dv(t, e.transform, n))
        : r.transform && (r.transform = "none")),
    l)
  ) {
    const { originX: a = "50%", originY: u = "50%", originZ: c = 0 } = o;
    r.transformOrigin = `${a} ${u} ${c}`;
  }
}
const Vv = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  Rv = { offset: "strokeDashoffset", array: "strokeDasharray" };
function Lv(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const o = i ? Vv : Rv;
  e[o.offset] = D.transform(-r);
  const s = D.transform(t),
    l = D.transform(n);
  e[o.array] = `${s} ${l}`;
}
function kc(e, t, n) {
  return typeof e == "string" ? e : D.transform(t + n * e);
}
function _v(e, t, n) {
  const r = kc(t, e.x, e.width),
    i = kc(n, e.y, e.height);
  return `${r} ${i}`;
}
function $a(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: o,
    pathLength: s,
    pathSpacing: l = 1,
    pathOffset: a = 0,
    ...u
  },
  c,
  f
) {
  if ((Ua(e, u, f), c)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: d, style: g, dimensions: v } = e;
  d.transform && (v && (g.transform = d.transform), delete d.transform),
    v &&
      (i !== void 0 || o !== void 0 || g.transform) &&
      (g.transformOrigin = _v(
        v,
        i !== void 0 ? i : 0.5,
        o !== void 0 ? o : 0.5
      )),
    t !== void 0 && (d.x = t),
    n !== void 0 && (d.y = n),
    r !== void 0 && (d.scale = r),
    s !== void 0 && Lv(d, s, l, a, !1);
}
const Wa = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  lp = () => ({ ...Wa(), attrs: {} }),
  Ha = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function ap(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const o in n) e.style.setProperty(o, n[o]);
}
const up = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function cp(e, t, n, r) {
  ap(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(up.has(i) ? i : Fa(i), t.attrs[i]);
}
const ho = {};
function Nv(e) {
  Object.assign(ho, e);
}
function fp(e, { layout: t, layoutId: n }) {
  return (
    un.has(e) ||
    e.startsWith("origin") ||
    ((t || n !== void 0) && (!!ho[e] || e === "opacity"))
  );
}
function Ka(e, t, n) {
  var r;
  const { style: i } = e,
    o = {};
  for (const s in i)
    (pe(i[s]) ||
      (t.style && pe(t.style[s])) ||
      fp(s, e) ||
      ((r = n == null ? void 0 : n.getValue(s)) === null || r === void 0
        ? void 0
        : r.liveStyle) !== void 0) &&
      (o[s] = i[s]);
  return o;
}
function dp(e, t, n) {
  const r = Ka(e, t, n);
  for (const i in e)
    if (pe(e[i]) || pe(t[i])) {
      const o =
        Qn.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      r[o] = e[i];
    }
  return r;
}
function Fv(e, t) {
  try {
    t.dimensions =
      typeof e.getBBox == "function" ? e.getBBox() : e.getBoundingClientRect();
  } catch {
    t.dimensions = { x: 0, y: 0, width: 0, height: 0 };
  }
}
const Tc = ["x", "y", "width", "height", "cx", "cy", "r"],
  jv = {
    useVisualState: rp({
      scrapeMotionValuesFromProps: dp,
      createRenderState: lp,
      onUpdate: ({
        props: e,
        prevProps: t,
        current: n,
        renderState: r,
        latestValues: i,
      }) => {
        if (!n) return;
        let o = !!e.drag;
        if (!o) {
          for (const l in i)
            if (un.has(l)) {
              o = !0;
              break;
            }
        }
        if (!o) return;
        let s = !t;
        if (t)
          for (let l = 0; l < Tc.length; l++) {
            const a = Tc[l];
            e[a] !== t[a] && (s = !0);
          }
        s &&
          U.read(() => {
            Fv(n, r),
              U.render(() => {
                $a(r, i, Ha(n.tagName), e.transformTemplate), cp(n, r);
              });
          });
      },
    }),
  },
  Ov = {
    useVisualState: rp({
      scrapeMotionValuesFromProps: Ka,
      createRenderState: Wa,
    }),
  };
function hp(e, t, n) {
  for (const r in t) !pe(t[r]) && !fp(r, n) && (e[r] = t[r]);
}
function Iv({ transformTemplate: e }, t) {
  return M.useMemo(() => {
    const n = Wa();
    return Ua(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function zv(e, t) {
  const n = e.style || {},
    r = {};
  return hp(r, n, e), Object.assign(r, Iv(e, t)), r;
}
function Bv(e, t) {
  const n = {},
    r = zv(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none"),
      (r.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (n.tabIndex = 0),
    (n.style = r),
    n
  );
}
function Uv(e, t, n, r) {
  const i = M.useMemo(() => {
    const o = lp();
    return (
      $a(o, t, Ha(r), e.transformTemplate),
      { ...o.attrs, style: { ...o.style } }
    );
  }, [t]);
  if (e.style) {
    const o = {};
    hp(o, e.style, e), (i.style = { ...o, ...i.style });
  }
  return i;
}
function $v(e = !1) {
  return (n, r, i, { latestValues: o }, s) => {
    const a = (Oa(n) ? Uv : Bv)(r, o, s, n),
      u = rv(r, typeof n == "string", e),
      c = n !== M.Fragment ? { ...u, ...a, ref: i } : {},
      { children: f } = r,
      d = M.useMemo(() => (pe(f) ? f.get() : f), [f]);
    return M.createElement(n, { ...c, children: d });
  };
}
function Wv(e, t) {
  return function (r, { forwardMotionProps: i } = { forwardMotionProps: !1 }) {
    const s = {
      ...(Oa(r) ? jv : Ov),
      preloadedFeatures: e,
      useRender: $v(i),
      createVisualElement: t,
      Component: r,
    };
    return dv(s);
  };
}
function pp(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function Io(e, t, n) {
  const r = e.getProps();
  return Ia(r, t, n !== void 0 ? n : r.custom, e);
}
const Hv = La(() => window.ScrollTimeline !== void 0);
class Kv {
  constructor(t) {
    (this.stop = () => this.runAll("stop")),
      (this.animations = t.filter(Boolean));
  }
  get finished() {
    return Promise.all(
      this.animations.map((t) => ("finished" in t ? t.finished : t))
    );
  }
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let r = 0; r < this.animations.length; r++) this.animations[r][t] = n;
  }
  attachTimeline(t, n) {
    const r = this.animations.map((i) => {
      if (Hv() && i.attachTimeline) return i.attachTimeline(t);
      if (typeof n == "function") return n(i);
    });
    return () => {
      r.forEach((i, o) => {
        i && i(), this.animations[o].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let t = 0;
    for (let n = 0; n < this.animations.length; n++)
      t = Math.max(t, this.animations[n].duration);
    return t;
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class Gv extends Kv {
  then(t, n) {
    return Promise.all(this.animations).then(t).catch(n);
  }
}
function Ga(e, t) {
  return e ? e[t] || e.default || e : void 0;
}
const xl = 2e4;
function mp(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < xl; ) (t += n), (r = e.next(t));
  return t >= xl ? 1 / 0 : t;
}
function Qa(e) {
  return typeof e == "function";
}
function Cc(e, t) {
  (e.timeline = t), (e.onfinish = null);
}
const Xa = (e) => Array.isArray(e) && typeof e[0] == "number",
  Qv = { linearEasing: void 0 };
function Xv(e, t) {
  const n = La(e);
  return () => {
    var r;
    return (r = Qv[t]) !== null && r !== void 0 ? r : n();
  };
}
const po = Xv(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  gp = (e, t, n = 10) => {
    let r = "";
    const i = Math.max(Math.round(t / n), 2);
    for (let o = 0; o < i; o++) r += e(Un(0, i - 1, o)) + ", ";
    return `linear(${r.substring(0, r.length - 2)})`;
  };
function yp(e) {
  return !!(
    (typeof e == "function" && po()) ||
    !e ||
    (typeof e == "string" && (e in Pl || po())) ||
    Xa(e) ||
    (Array.isArray(e) && e.every(yp))
  );
}
const ur = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Pl = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: ur([0, 0.65, 0.55, 1]),
    circOut: ur([0.55, 0, 1, 0.45]),
    backIn: ur([0.31, 0.01, 0.66, -0.59]),
    backOut: ur([0.33, 1.53, 0.69, 0.99]),
  };
function vp(e, t) {
  if (e)
    return typeof e == "function" && po()
      ? gp(e, t)
      : Xa(e)
      ? ur(e)
      : Array.isArray(e)
      ? e.map((n) => vp(n, t) || Pl.easeOut)
      : Pl[e];
}
const $e = { x: !1, y: !1 };
function wp() {
  return $e.x || $e.y;
}
function Yv(e, t, n) {
  var r;
  if (e instanceof Element) return [e];
  if (typeof e == "string") {
    let i = document;
    const o = (r = void 0) !== null && r !== void 0 ? r : i.querySelectorAll(e);
    return o ? Array.from(o) : [];
  }
  return Array.from(e);
}
function Sp(e, t) {
  const n = Yv(e),
    r = new AbortController(),
    i = { passive: !0, ...t, signal: r.signal };
  return [n, i, () => r.abort()];
}
function Ec(e) {
  return (t) => {
    t.pointerType === "touch" || wp() || e(t);
  };
}
function Zv(e, t, n = {}) {
  const [r, i, o] = Sp(e, n),
    s = Ec((l) => {
      const { target: a } = l,
        u = t(l);
      if (typeof u != "function" || !a) return;
      const c = Ec((f) => {
        u(f), a.removeEventListener("pointerleave", c);
      });
      a.addEventListener("pointerleave", c, i);
    });
  return (
    r.forEach((l) => {
      l.addEventListener("pointerenter", s, i);
    }),
    o
  );
}
const xp = (e, t) => (t ? (e === t ? !0 : xp(e, t.parentElement)) : !1),
  Ya = (e) =>
    e.pointerType === "mouse"
      ? typeof e.button != "number" || e.button <= 0
      : e.isPrimary !== !1,
  qv = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function Jv(e) {
  return qv.has(e.tagName) || e.tabIndex !== -1;
}
const cr = new WeakSet();
function Ac(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function ps(e, t) {
  e.dispatchEvent(
    new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 })
  );
}
const bv = (e, t) => {
  const n = e.currentTarget;
  if (!n) return;
  const r = Ac(() => {
    if (cr.has(n)) return;
    ps(n, "down");
    const i = Ac(() => {
        ps(n, "up");
      }),
      o = () => ps(n, "cancel");
    n.addEventListener("keyup", i, t), n.addEventListener("blur", o, t);
  });
  n.addEventListener("keydown", r, t),
    n.addEventListener("blur", () => n.removeEventListener("keydown", r), t);
};
function Mc(e) {
  return Ya(e) && !wp();
}
function e0(e, t, n = {}) {
  const [r, i, o] = Sp(e, n),
    s = (l) => {
      const a = l.currentTarget;
      if (!Mc(l) || cr.has(a)) return;
      cr.add(a);
      const u = t(l),
        c = (g, v) => {
          window.removeEventListener("pointerup", f),
            window.removeEventListener("pointercancel", d),
            !(!Mc(g) || !cr.has(a)) &&
              (cr.delete(a), typeof u == "function" && u(g, { success: v }));
        },
        f = (g) => {
          c(g, n.useGlobalTarget || xp(a, g.target));
        },
        d = (g) => {
          c(g, !1);
        };
      window.addEventListener("pointerup", f, i),
        window.addEventListener("pointercancel", d, i);
    };
  return (
    r.forEach((l) => {
      !Jv(l) && l.getAttribute("tabindex") === null && (l.tabIndex = 0),
        (n.useGlobalTarget ? window : l).addEventListener("pointerdown", s, i),
        l.addEventListener("focus", (u) => bv(u, i), i);
    }),
    o
  );
}
function t0(e) {
  return e === "x" || e === "y"
    ? $e[e]
      ? null
      : (($e[e] = !0),
        () => {
          $e[e] = !1;
        })
    : $e.x || $e.y
    ? null
    : (($e.x = $e.y = !0),
      () => {
        $e.x = $e.y = !1;
      });
}
const Pp = new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Qn,
]);
let zi;
function n0() {
  zi = void 0;
}
const tt = {
  now: () => (
    zi === void 0 &&
      tt.set(
        le.isProcessing || qy.useManualTiming ? le.timestamp : performance.now()
      ),
    zi
  ),
  set: (e) => {
    (zi = e), queueMicrotask(n0);
  },
};
function Za(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function qa(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class Ja {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Za(this.subscriptions, t), () => qa(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let o = 0; o < i; o++) {
          const s = this.subscriptions[o];
          s && s(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function kp(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Dc = 30,
  r0 = (e) => !isNaN(parseFloat(e));
class i0 {
  constructor(t, n = {}) {
    (this.version = "11.18.2"),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r, i = !0) => {
        const o = tt.now();
        this.updatedAt !== o && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          i &&
            this.events.renderRequest &&
            this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = n.owner);
  }
  setCurrent(t) {
    (this.current = t),
      (this.updatedAt = tt.now()),
      this.canTrackVelocity === null &&
        t !== void 0 &&
        (this.canTrackVelocity = r0(this.current));
  }
  setPrevFrameValue(t = this.current) {
    (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Ja());
    const r = this.events[t].add(n);
    return t === "change"
      ? () => {
          r(),
            U.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, n) {
    (this.passiveEffect = t), (this.stopPassiveEffect = n);
  }
  set(t, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(t, n)
      : this.passiveEffect(t, this.updateAndNotify);
  }
  setWithVelocity(t, n, r) {
    this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - r);
  }
  jump(t, n = !0) {
    this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const t = tt.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      t - this.updatedAt > Dc
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Dc);
    return kp(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Hr(e, t) {
  return new i0(e, t);
}
function o0(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Hr(n));
}
function s0(e, t) {
  const n = Io(e, t);
  let { transitionEnd: r = {}, transition: i = {}, ...o } = n || {};
  o = { ...o, ...r };
  for (const s in o) {
    const l = vv(o[s]);
    o0(e, s, l);
  }
}
function l0(e) {
  return !!(pe(e) && e.add);
}
function kl(e, t) {
  const n = e.getValue("willChange");
  if (l0(n)) return n.add(t);
}
function Tp(e) {
  return e.props[ep];
}
const Cp = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  a0 = 1e-7,
  u0 = 12;
function c0(e, t, n, r, i) {
  let o,
    s,
    l = 0;
  do (s = t + (n - t) / 2), (o = Cp(s, r, i) - e), o > 0 ? (n = s) : (t = s);
  while (Math.abs(o) > a0 && ++l < u0);
  return s;
}
function br(e, t, n, r) {
  if (e === t && n === r) return Me;
  const i = (o) => c0(o, 0, 1, e, n);
  return (o) => (o === 0 || o === 1 ? o : Cp(i(o), t, r));
}
const Ep = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
  Ap = (e) => (t) => 1 - e(1 - t),
  Mp = br(0.33, 1.53, 0.69, 0.99),
  ba = Ap(Mp),
  Dp = Ep(ba),
  Vp = (e) =>
    (e *= 2) < 1 ? 0.5 * ba(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  eu = (e) => 1 - Math.sin(Math.acos(e)),
  Rp = Ap(eu),
  Lp = Ep(eu),
  _p = (e) => /^0[^.\s]+$/u.test(e);
function f0(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
    ? e === "none" || e === "0" || _p(e)
    : !0;
}
const xr = (e) => Math.round(e * 1e5) / 1e5,
  tu = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function d0(e) {
  return e == null;
}
const h0 =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  nu = (e, t) => (n) =>
    !!(
      (typeof n == "string" && h0.test(n) && n.startsWith(e)) ||
      (t && !d0(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Np = (e, t, n) => (r) => {
    if (typeof r != "string") return r;
    const [i, o, s, l] = r.match(tu);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(o),
      [n]: parseFloat(s),
      alpha: l !== void 0 ? parseFloat(l) : 1,
    };
  },
  p0 = (e) => ht(0, 255, e),
  ms = { ...Xn, transform: (e) => Math.round(p0(e)) },
  qt = {
    test: nu("rgb", "red"),
    parse: Np("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      "rgba(" +
      ms.transform(e) +
      ", " +
      ms.transform(t) +
      ", " +
      ms.transform(n) +
      ", " +
      xr(Wr.transform(r)) +
      ")",
  };
function m0(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const Tl = { test: nu("#"), parse: m0, transform: qt.transform },
  Tn = {
    test: nu("hsl", "hue"),
    parse: Np("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      et.transform(xr(t)) +
      ", " +
      et.transform(xr(n)) +
      ", " +
      xr(Wr.transform(r)) +
      ")",
  },
  de = {
    test: (e) => qt.test(e) || Tl.test(e) || Tn.test(e),
    parse: (e) =>
      qt.test(e) ? qt.parse(e) : Tn.test(e) ? Tn.parse(e) : Tl.parse(e),
    transform: (e) =>
      typeof e == "string"
        ? e
        : e.hasOwnProperty("red")
        ? qt.transform(e)
        : Tn.transform(e),
  },
  g0 =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function y0(e) {
  var t, n;
  return (
    isNaN(e) &&
    typeof e == "string" &&
    (((t = e.match(tu)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((n = e.match(g0)) === null || n === void 0 ? void 0 : n.length) || 0) >
      0
  );
}
const Fp = "number",
  jp = "color",
  v0 = "var",
  w0 = "var(",
  Vc = "${}",
  S0 =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Kr(e) {
  const t = e.toString(),
    n = [],
    r = { color: [], number: [], var: [] },
    i = [];
  let o = 0;
  const l = t
    .replace(
      S0,
      (a) => (
        de.test(a)
          ? (r.color.push(o), i.push(jp), n.push(de.parse(a)))
          : a.startsWith(w0)
          ? (r.var.push(o), i.push(v0), n.push(a))
          : (r.number.push(o), i.push(Fp), n.push(parseFloat(a))),
        ++o,
        Vc
      )
    )
    .split(Vc);
  return { values: n, split: l, indexes: r, types: i };
}
function Op(e) {
  return Kr(e).values;
}
function Ip(e) {
  const { split: t, types: n } = Kr(e),
    r = t.length;
  return (i) => {
    let o = "";
    for (let s = 0; s < r; s++)
      if (((o += t[s]), i[s] !== void 0)) {
        const l = n[s];
        l === Fp
          ? (o += xr(i[s]))
          : l === jp
          ? (o += de.transform(i[s]))
          : (o += i[s]);
      }
    return o;
  };
}
const x0 = (e) => (typeof e == "number" ? 0 : e);
function P0(e) {
  const t = Op(e);
  return Ip(e)(t.map(x0));
}
const Ft = {
    test: y0,
    parse: Op,
    createTransformer: Ip,
    getAnimatableNone: P0,
  },
  k0 = new Set(["brightness", "contrast", "saturate", "opacity"]);
function T0(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [r] = n.match(tu) || [];
  if (!r) return e;
  const i = n.replace(r, "");
  let o = k0.has(t) ? 1 : 0;
  return r !== n && (o *= 100), t + "(" + o + i + ")";
}
const C0 = /\b([a-z-]*)\(.*?\)/gu,
  Cl = {
    ...Ft,
    getAnimatableNone: (e) => {
      const t = e.match(C0);
      return t ? t.map(T0).join(" ") : e;
    },
  },
  E0 = {
    ...Ba,
    color: de,
    backgroundColor: de,
    outlineColor: de,
    fill: de,
    stroke: de,
    borderColor: de,
    borderTopColor: de,
    borderRightColor: de,
    borderBottomColor: de,
    borderLeftColor: de,
    filter: Cl,
    WebkitFilter: Cl,
  },
  ru = (e) => E0[e];
function zp(e, t) {
  let n = ru(e);
  return (
    n !== Cl && (n = Ft), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
  );
}
const A0 = new Set(["auto", "none", "0"]);
function M0(e, t, n) {
  let r = 0,
    i;
  for (; r < e.length && !i; ) {
    const o = e[r];
    typeof o == "string" && !A0.has(o) && Kr(o).values.length && (i = e[r]),
      r++;
  }
  if (i && n) for (const o of t) e[o] = zp(n, i);
}
const Rc = (e) => e === Xn || e === D,
  Lc = (e, t) => parseFloat(e.split(", ")[t]),
  _c =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === "none" || !r) return 0;
      const i = r.match(/^matrix3d\((.+)\)$/u);
      if (i) return Lc(i[1], t);
      {
        const o = r.match(/^matrix\((.+)\)$/u);
        return o ? Lc(o[1], e) : 0;
      }
    },
  D0 = new Set(["x", "y", "z"]),
  V0 = Qn.filter((e) => !D0.has(e));
function R0(e) {
  const t = [];
  return (
    V0.forEach((n) => {
      const r = e.getValue(n);
      r !== void 0 &&
        (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const Wn = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: _c(4, 13),
  y: _c(5, 14),
};
Wn.translateX = Wn.x;
Wn.translateY = Wn.y;
const en = new Set();
let El = !1,
  Al = !1;
function Bp() {
  if (Al) {
    const e = Array.from(en).filter((r) => r.needsMeasurement),
      t = new Set(e.map((r) => r.element)),
      n = new Map();
    t.forEach((r) => {
      const i = R0(r);
      i.length && (n.set(r, i), r.render());
    }),
      e.forEach((r) => r.measureInitialState()),
      t.forEach((r) => {
        r.render();
        const i = n.get(r);
        i &&
          i.forEach(([o, s]) => {
            var l;
            (l = r.getValue(o)) === null || l === void 0 || l.set(s);
          });
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      });
  }
  (Al = !1), (El = !1), en.forEach((e) => e.complete()), en.clear();
}
function Up() {
  en.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Al = !0);
  });
}
function L0() {
  Up(), Bp();
}
class iu {
  constructor(t, n, r, i, o, s = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = r),
      (this.motionValue = i),
      (this.element = o),
      (this.isAsync = s);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (en.add(this), El || ((El = !0), U.read(Up), U.resolveKeyframes(Bp)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n,
      element: r,
      motionValue: i,
    } = this;
    for (let o = 0; o < t.length; o++)
      if (t[o] === null)
        if (o === 0) {
          const s = i == null ? void 0 : i.get(),
            l = t[t.length - 1];
          if (s !== void 0) t[0] = s;
          else if (r && n) {
            const a = r.readValue(n, l);
            a != null && (t[0] = a);
          }
          t[0] === void 0 && (t[0] = l), i && s === void 0 && i.set(t[0]);
        } else t[o] = t[o - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      en.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), en.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const $p = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  _0 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function N0(e) {
  const t = _0.exec(e);
  if (!t) return [,];
  const [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
function Wp(e, t, n = 1) {
  const [r, i] = N0(e);
  if (!r) return;
  const o = window.getComputedStyle(t).getPropertyValue(r);
  if (o) {
    const s = o.trim();
    return $p(s) ? parseFloat(s) : s;
  }
  return za(i) ? Wp(i, t, n + 1) : i;
}
const Hp = (e) => (t) => t.test(e),
  F0 = { test: (e) => e === "auto", parse: (e) => e },
  Kp = [Xn, D, et, yt, Tv, kv, F0],
  Nc = (e) => Kp.find(Hp(e));
class Gp extends iu {
  constructor(t, n, r, i, o) {
    super(t, n, r, i, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let a = 0; a < t.length; a++) {
      let u = t[a];
      if (typeof u == "string" && ((u = u.trim()), za(u))) {
        const c = Wp(u, n.current);
        c !== void 0 && (t[a] = c),
          a === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if ((this.resolveNoneKeyframes(), !Pp.has(r) || t.length !== 2)) return;
    const [i, o] = t,
      s = Nc(i),
      l = Nc(o);
    if (s !== l)
      if (Rc(s) && Rc(l))
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          typeof u == "string" && (t[a] = parseFloat(u));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      r = [];
    for (let i = 0; i < t.length; i++) f0(t[i]) && r.push(i);
    r.length && M0(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t || !t.current) return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Wn[r](
        t.measureViewportBox(),
        window.getComputedStyle(t.current)
      )),
      (n[0] = this.measuredOrigin);
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    var t;
    const { element: n, name: r, unresolvedKeyframes: i } = this;
    if (!n || !n.current) return;
    const o = n.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const s = i.length - 1,
      l = i[s];
    (i[s] = Wn[r](n.measureViewportBox(), window.getComputedStyle(n.current))),
      l !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = l),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([a, u]) => {
          n.getValue(a).set(u);
        }),
      this.resolveNoneKeyframes();
  }
}
const Fc = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" &&
          (Ft.test(e) || e === "0") &&
          !e.startsWith("url("))
      );
function j0(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function O0(e, t, n, r) {
  const i = e[0];
  if (i === null) return !1;
  if (t === "display" || t === "visibility") return !0;
  const o = e[e.length - 1],
    s = Fc(i, t),
    l = Fc(o, t);
  return !s || !l ? !1 : j0(e) || ((n === "spring" || Qa(n)) && r);
}
const I0 = (e) => e !== null;
function zo(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(I0),
    o = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return !o || r === void 0 ? i[o] : r;
}
const z0 = 40;
class Qp {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = "keyframes",
    repeat: i = 0,
    repeatDelay: o = 0,
    repeatType: s = "loop",
    ...l
  }) {
    (this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = tt.now()),
      (this.options = {
        autoplay: t,
        delay: n,
        type: r,
        repeat: i,
        repeatDelay: o,
        repeatType: s,
        ...l,
      }),
      this.updateFinishedPromise();
  }
  calcStartTime() {
    return this.resolvedAt
      ? this.resolvedAt - this.createdAt > z0
        ? this.resolvedAt
        : this.createdAt
      : this.createdAt;
  }
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && L0(), this._resolved;
  }
  onKeyframesResolved(t, n) {
    (this.resolvedAt = tt.now()), (this.hasAttemptedResolve = !0);
    const {
      name: r,
      type: i,
      velocity: o,
      delay: s,
      onComplete: l,
      onUpdate: a,
      isGenerator: u,
    } = this.options;
    if (!u && !O0(t, r, i, o))
      if (s) this.options.duration = 0;
      else {
        a && a(zo(t, this.options, n)), l && l(), this.resolveFinishedPromise();
        return;
      }
    const c = this.initPlayback(t, n);
    c !== !1 &&
      ((this._resolved = { keyframes: t, finalKeyframe: n, ...c }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(t, n) {
    return this.currentFinishedPromise.then(t, n);
  }
  flatten() {
    (this.options.type = "keyframes"), (this.options.ease = "linear");
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((t) => {
      this.resolveFinishedPromise = t;
    });
  }
}
const H = (e, t, n) => e + (t - e) * n;
function gs(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function B0({ hue: e, saturation: t, lightness: n, alpha: r }) {
  (e /= 360), (t /= 100), (n /= 100);
  let i = 0,
    o = 0,
    s = 0;
  if (!t) i = o = s = n;
  else {
    const l = n < 0.5 ? n * (1 + t) : n + t - n * t,
      a = 2 * n - l;
    (i = gs(a, l, e + 1 / 3)), (o = gs(a, l, e)), (s = gs(a, l, e - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(o * 255),
    blue: Math.round(s * 255),
    alpha: r,
  };
}
function mo(e, t) {
  return (n) => (n > 0 ? t : e);
}
const ys = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  U0 = [Tl, qt, Tn],
  $0 = (e) => U0.find((t) => t.test(e));
function jc(e) {
  const t = $0(e);
  if (!t) return !1;
  let n = t.parse(e);
  return t === Tn && (n = B0(n)), n;
}
const Oc = (e, t) => {
    const n = jc(e),
      r = jc(t);
    if (!n || !r) return mo(e, t);
    const i = { ...n };
    return (o) => (
      (i.red = ys(n.red, r.red, o)),
      (i.green = ys(n.green, r.green, o)),
      (i.blue = ys(n.blue, r.blue, o)),
      (i.alpha = H(n.alpha, r.alpha, o)),
      qt.transform(i)
    );
  },
  W0 = (e, t) => (n) => t(e(n)),
  ei = (...e) => e.reduce(W0),
  Ml = new Set(["none", "hidden"]);
function H0(e, t) {
  return Ml.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function K0(e, t) {
  return (n) => H(e, t, n);
}
function ou(e) {
  return typeof e == "number"
    ? K0
    : typeof e == "string"
    ? za(e)
      ? mo
      : de.test(e)
      ? Oc
      : X0
    : Array.isArray(e)
    ? Xp
    : typeof e == "object"
    ? de.test(e)
      ? Oc
      : G0
    : mo;
}
function Xp(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((o, s) => ou(o)(o, t[s]));
  return (o) => {
    for (let s = 0; s < r; s++) n[s] = i[s](o);
    return n;
  };
}
function G0(e, t) {
  const n = { ...e, ...t },
    r = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (r[i] = ou(e[i])(e[i], t[i]));
  return (i) => {
    for (const o in r) n[o] = r[o](i);
    return n;
  };
}
function Q0(e, t) {
  var n;
  const r = [],
    i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < t.values.length; o++) {
    const s = t.types[o],
      l = e.indexes[s][i[s]],
      a = (n = e.values[l]) !== null && n !== void 0 ? n : 0;
    (r[o] = a), i[s]++;
  }
  return r;
}
const X0 = (e, t) => {
  const n = Ft.createTransformer(t),
    r = Kr(e),
    i = Kr(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (Ml.has(e) && !i.values.length) || (Ml.has(t) && !r.values.length)
      ? H0(e, t)
      : ei(Xp(Q0(r, i), i.values), n)
    : mo(e, t);
};
function Yp(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number"
    ? H(e, t, n)
    : ou(e)(e, t);
}
const Y0 = 5;
function Zp(e, t, n) {
  const r = Math.max(t - Y0, 0);
  return kp(n - e(r), t - r);
}
const Q = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  vs = 0.001;
function Z0({
  duration: e = Q.duration,
  bounce: t = Q.bounce,
  velocity: n = Q.velocity,
  mass: r = Q.mass,
}) {
  let i,
    o,
    s = 1 - t;
  (s = ht(Q.minDamping, Q.maxDamping, s)),
    (e = ht(Q.minDuration, Q.maxDuration, at(e))),
    s < 1
      ? ((i = (u) => {
          const c = u * s,
            f = c * e,
            d = c - n,
            g = Dl(u, s),
            v = Math.exp(-f);
          return vs - (d / g) * v;
        }),
        (o = (u) => {
          const f = u * s * e,
            d = f * n + n,
            g = Math.pow(s, 2) * Math.pow(u, 2) * e,
            v = Math.exp(-f),
            y = Dl(Math.pow(u, 2), s);
          return ((-i(u) + vs > 0 ? -1 : 1) * ((d - g) * v)) / y;
        }))
      : ((i = (u) => {
          const c = Math.exp(-u * e),
            f = (u - n) * e + 1;
          return -vs + c * f;
        }),
        (o = (u) => {
          const c = Math.exp(-u * e),
            f = (n - u) * (e * e);
          return c * f;
        }));
  const l = 5 / e,
    a = J0(i, o, l);
  if (((e = lt(e)), isNaN(a)))
    return { stiffness: Q.stiffness, damping: Q.damping, duration: e };
  {
    const u = Math.pow(a, 2) * r;
    return { stiffness: u, damping: s * 2 * Math.sqrt(r * u), duration: e };
  }
}
const q0 = 12;
function J0(e, t, n) {
  let r = n;
  for (let i = 1; i < q0; i++) r = r - e(r) / t(r);
  return r;
}
function Dl(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const b0 = ["duration", "bounce"],
  e1 = ["stiffness", "damping", "mass"];
function Ic(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function t1(e) {
  let t = {
    velocity: Q.velocity,
    stiffness: Q.stiffness,
    damping: Q.damping,
    mass: Q.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!Ic(e, e1) && Ic(e, b0))
    if (e.visualDuration) {
      const n = e.visualDuration,
        r = (2 * Math.PI) / (n * 1.2),
        i = r * r,
        o = 2 * ht(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = { ...t, mass: Q.mass, stiffness: i, damping: o };
    } else {
      const n = Z0(e);
      (t = { ...t, ...n, mass: Q.mass }), (t.isResolvedFromDuration = !0);
    }
  return t;
}
function qp(e = Q.visualDuration, t = Q.bounce) {
  const n =
    typeof e != "object"
      ? { visualDuration: e, keyframes: [0, 1], bounce: t }
      : e;
  let { restSpeed: r, restDelta: i } = n;
  const o = n.keyframes[0],
    s = n.keyframes[n.keyframes.length - 1],
    l = { done: !1, value: o },
    {
      stiffness: a,
      damping: u,
      mass: c,
      duration: f,
      velocity: d,
      isResolvedFromDuration: g,
    } = t1({ ...n, velocity: -at(n.velocity || 0) }),
    v = d || 0,
    y = u / (2 * Math.sqrt(a * c)),
    x = s - o,
    p = at(Math.sqrt(a / c)),
    h = Math.abs(x) < 5;
  r || (r = h ? Q.restSpeed.granular : Q.restSpeed.default),
    i || (i = h ? Q.restDelta.granular : Q.restDelta.default);
  let m;
  if (y < 1) {
    const S = Dl(p, y);
    m = (T) => {
      const C = Math.exp(-y * p * T);
      return (
        s - C * (((v + y * p * x) / S) * Math.sin(S * T) + x * Math.cos(S * T))
      );
    };
  } else if (y === 1) m = (S) => s - Math.exp(-p * S) * (x + (v + p * x) * S);
  else {
    const S = p * Math.sqrt(y * y - 1);
    m = (T) => {
      const C = Math.exp(-y * p * T),
        k = Math.min(S * T, 300);
      return (
        s - (C * ((v + y * p * x) * Math.sinh(k) + S * x * Math.cosh(k))) / S
      );
    };
  }
  const w = {
    calculatedDuration: (g && f) || null,
    next: (S) => {
      const T = m(S);
      if (g) l.done = S >= f;
      else {
        let C = 0;
        y < 1 && (C = S === 0 ? lt(v) : Zp(m, S, T));
        const k = Math.abs(C) <= r,
          N = Math.abs(s - T) <= i;
        l.done = k && N;
      }
      return (l.value = l.done ? s : T), l;
    },
    toString: () => {
      const S = Math.min(mp(w), xl),
        T = gp((C) => w.next(S * C).value, S, 30);
      return S + "ms " + T;
    },
  };
  return w;
}
function zc({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: o = 500,
  modifyTarget: s,
  min: l,
  max: a,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const f = e[0],
    d = { done: !1, value: f },
    g = (k) => (l !== void 0 && k < l) || (a !== void 0 && k > a),
    v = (k) =>
      l === void 0
        ? a
        : a === void 0 || Math.abs(l - k) < Math.abs(a - k)
        ? l
        : a;
  let y = n * t;
  const x = f + y,
    p = s === void 0 ? x : s(x);
  p !== x && (y = p - f);
  const h = (k) => -y * Math.exp(-k / r),
    m = (k) => p + h(k),
    w = (k) => {
      const N = h(k),
        V = m(k);
      (d.done = Math.abs(N) <= u), (d.value = d.done ? p : V);
    };
  let S, T;
  const C = (k) => {
    g(d.value) &&
      ((S = k),
      (T = qp({
        keyframes: [d.value, v(d.value)],
        velocity: Zp(m, k, d.value),
        damping: i,
        stiffness: o,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    C(0),
    {
      calculatedDuration: null,
      next: (k) => {
        let N = !1;
        return (
          !T && S === void 0 && ((N = !0), w(k), C(k)),
          S !== void 0 && k >= S ? T.next(k - S) : (!N && w(k), d)
        );
      },
    }
  );
}
const n1 = br(0.42, 0, 1, 1),
  r1 = br(0, 0, 0.58, 1),
  Jp = br(0.42, 0, 0.58, 1),
  i1 = (e) => Array.isArray(e) && typeof e[0] != "number",
  Bc = {
    linear: Me,
    easeIn: n1,
    easeInOut: Jp,
    easeOut: r1,
    circIn: eu,
    circInOut: Lp,
    circOut: Rp,
    backIn: ba,
    backInOut: Dp,
    backOut: Mp,
    anticipate: Vp,
  },
  Uc = (e) => {
    if (Xa(e)) {
      wl(e.length === 4);
      const [t, n, r, i] = e;
      return br(t, n, r, i);
    } else if (typeof e == "string") return wl(Bc[e] !== void 0), Bc[e];
    return e;
  };
function o1(e, t, n) {
  const r = [],
    i = n || Yp,
    o = e.length - 1;
  for (let s = 0; s < o; s++) {
    let l = i(e[s], e[s + 1]);
    if (t) {
      const a = Array.isArray(t) ? t[s] || Me : t;
      l = ei(a, l);
    }
    r.push(l);
  }
  return r;
}
function s1(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const o = e.length;
  if ((wl(o === t.length), o === 1)) return () => t[0];
  if (o === 2 && t[0] === t[1]) return () => t[1];
  const s = e[0] === e[1];
  e[0] > e[o - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const l = o1(t, r, i),
    a = l.length,
    u = (c) => {
      if (s && c < e[0]) return t[0];
      let f = 0;
      if (a > 1) for (; f < e.length - 2 && !(c < e[f + 1]); f++);
      const d = Un(e[f], e[f + 1], c);
      return l[f](d);
    };
  return n ? (c) => u(ht(e[0], e[o - 1], c)) : u;
}
function l1(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = Un(0, t, r);
    e.push(H(n, 1, i));
  }
}
function a1(e) {
  const t = [0];
  return l1(t, e.length - 1), t;
}
function u1(e, t) {
  return e.map((n) => n * t);
}
function c1(e, t) {
  return e.map(() => t || Jp).splice(0, e.length - 1);
}
function go({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: r = "easeInOut",
}) {
  const i = i1(r) ? r.map(Uc) : Uc(r),
    o = { done: !1, value: t[0] },
    s = u1(n && n.length === t.length ? n : a1(t), e),
    l = s1(s, t, { ease: Array.isArray(i) ? i : c1(t, i) });
  return {
    calculatedDuration: e,
    next: (a) => ((o.value = l(a)), (o.done = a >= e), o),
  };
}
const f1 = (e) => {
    const t = ({ timestamp: n }) => e(n);
    return {
      start: () => U.update(t, !0),
      stop: () => Nt(t),
      now: () => (le.isProcessing ? le.timestamp : tt.now()),
    };
  },
  d1 = { decay: zc, inertia: zc, tween: go, keyframes: go, spring: qp },
  h1 = (e) => e / 100;
class su extends Qp {
  constructor(t) {
    super(t),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = "running"),
      (this.startTime = null),
      (this.state = "idle"),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === "idle")
        )
          return;
        this.teardown();
        const { onStop: a } = this.options;
        a && a();
      });
    const { name: n, motionValue: r, element: i, keyframes: o } = this.options,
      s = (i == null ? void 0 : i.KeyframeResolver) || iu,
      l = (a, u) => this.onKeyframesResolved(a, u);
    (this.resolver = new s(o, l, n, r, i)), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(),
      this._resolved &&
        Object.assign(
          this._resolved,
          this.initPlayback(this._resolved.keyframes)
        );
  }
  initPlayback(t) {
    const {
        type: n = "keyframes",
        repeat: r = 0,
        repeatDelay: i = 0,
        repeatType: o,
        velocity: s = 0,
      } = this.options,
      l = Qa(n) ? n : d1[n] || go;
    let a, u;
    l !== go &&
      typeof t[0] != "number" &&
      ((a = ei(h1, Yp(t[0], t[1]))), (t = [0, 100]));
    const c = l({ ...this.options, keyframes: t });
    o === "mirror" &&
      (u = l({ ...this.options, keyframes: [...t].reverse(), velocity: -s })),
      c.calculatedDuration === null && (c.calculatedDuration = mp(c));
    const { calculatedDuration: f } = c,
      d = f + i,
      g = d * (r + 1) - i;
    return {
      generator: c,
      mirroredGenerator: u,
      mapPercentToKeyframes: a,
      calculatedDuration: f,
      resolvedDuration: d,
      totalDuration: g,
    };
  }
  onPostResolved() {
    const { autoplay: t = !0 } = this.options;
    this.play(),
      this.pendingPlayState === "paused" || !t
        ? this.pause()
        : (this.state = this.pendingPlayState);
  }
  tick(t, n = !1) {
    const { resolved: r } = this;
    if (!r) {
      const { keyframes: k } = this.options;
      return { done: !0, value: k[k.length - 1] };
    }
    const {
      finalKeyframe: i,
      generator: o,
      mirroredGenerator: s,
      mapPercentToKeyframes: l,
      keyframes: a,
      calculatedDuration: u,
      totalDuration: c,
      resolvedDuration: f,
    } = r;
    if (this.startTime === null) return o.next(0);
    const {
      delay: d,
      repeat: g,
      repeatType: v,
      repeatDelay: y,
      onUpdate: x,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 &&
        (this.startTime = Math.min(t - c / this.speed, this.startTime)),
      n
        ? (this.currentTime = t)
        : this.holdTime !== null
        ? (this.currentTime = this.holdTime)
        : (this.currentTime = Math.round(t - this.startTime) * this.speed);
    const p = this.currentTime - d * (this.speed >= 0 ? 1 : -1),
      h = this.speed >= 0 ? p < 0 : p > c;
    (this.currentTime = Math.max(p, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = c);
    let m = this.currentTime,
      w = o;
    if (g) {
      const k = Math.min(this.currentTime, c) / f;
      let N = Math.floor(k),
        V = k % 1;
      !V && k >= 1 && (V = 1),
        V === 1 && N--,
        (N = Math.min(N, g + 1)),
        !!(N % 2) &&
          (v === "reverse"
            ? ((V = 1 - V), y && (V -= y / f))
            : v === "mirror" && (w = s)),
        (m = ht(0, 1, V) * f);
    }
    const S = h ? { done: !1, value: a[0] } : w.next(m);
    l && (S.value = l(S.value));
    let { done: T } = S;
    !h &&
      u !== null &&
      (T = this.speed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const C =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && T));
    return (
      C && i !== void 0 && (S.value = zo(a, this.options, i)),
      x && x(S.value),
      C && this.finish(),
      S
    );
  }
  get duration() {
    const { resolved: t } = this;
    return t ? at(t.calculatedDuration) : 0;
  }
  get time() {
    return at(this.currentTime);
  }
  set time(t) {
    (t = lt(t)),
      (this.currentTime = t),
      this.holdTime !== null || this.speed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    (this.playbackSpeed = t), n && (this.time = at(this.currentTime));
  }
  play() {
    if (
      (this.resolver.isScheduled || this.resolver.resume(), !this._resolved)
    ) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped) return;
    const { driver: t = f1, onPlay: n, startTime: r } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), n && n();
    const i = this.driver.now();
    this.holdTime !== null
      ? (this.startTime = i - this.holdTime)
      : this.startTime
      ? this.state === "finished" && (this.startTime = i)
      : (this.startTime = r ?? this.calcStartTime()),
      this.state === "finished" && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    var t;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    (this.state = "paused"),
      (this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.pendingPlayState = this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.teardown(), (this.state = "finished");
    const { onComplete: t } = this.options;
    t && t();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return (this.startTime = 0), this.tick(t, !0);
  }
}
const p1 = new Set(["opacity", "clipPath", "filter", "transform"]);
function m1(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: o = 0,
    repeatType: s = "loop",
    ease: l = "easeInOut",
    times: a,
  } = {}
) {
  const u = { [t]: n };
  a && (u.offset = a);
  const c = vp(l, i);
  return (
    Array.isArray(c) && (u.easing = c),
    e.animate(u, {
      delay: r,
      duration: i,
      easing: Array.isArray(c) ? "linear" : c,
      fill: "both",
      iterations: o + 1,
      direction: s === "reverse" ? "alternate" : "normal",
    })
  );
}
const g1 = La(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
  yo = 10,
  y1 = 2e4;
function v1(e) {
  return Qa(e.type) || e.type === "spring" || !yp(e.ease);
}
function w1(e, t) {
  const n = new su({
    ...t,
    keyframes: e,
    repeat: 0,
    delay: 0,
    isGenerator: !0,
  });
  let r = { done: !1, value: e[0] };
  const i = [];
  let o = 0;
  for (; !r.done && o < y1; ) (r = n.sample(o)), i.push(r.value), (o += yo);
  return { times: void 0, keyframes: i, duration: o - yo, ease: "linear" };
}
const bp = { anticipate: Vp, backInOut: Dp, circInOut: Lp };
function S1(e) {
  return e in bp;
}
class $c extends Qp {
  constructor(t) {
    super(t);
    const { name: n, motionValue: r, element: i, keyframes: o } = this.options;
    (this.resolver = new Gp(
      o,
      (s, l) => this.onKeyframesResolved(s, l),
      n,
      r,
      i
    )),
      this.resolver.scheduleResolve();
  }
  initPlayback(t, n) {
    let {
      duration: r = 300,
      times: i,
      ease: o,
      type: s,
      motionValue: l,
      name: a,
      startTime: u,
    } = this.options;
    if (!l.owner || !l.owner.current) return !1;
    if (
      (typeof o == "string" && po() && S1(o) && (o = bp[o]), v1(this.options))
    ) {
      const {
          onComplete: f,
          onUpdate: d,
          motionValue: g,
          element: v,
          ...y
        } = this.options,
        x = w1(t, y);
      (t = x.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (r = x.duration),
        (i = x.times),
        (o = x.ease),
        (s = "keyframes");
    }
    const c = m1(l.owner.current, a, t, {
      ...this.options,
      duration: r,
      times: i,
      ease: o,
    });
    return (
      (c.startTime = u ?? this.calcStartTime()),
      this.pendingTimeline
        ? (Cc(c, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (c.onfinish = () => {
            const { onComplete: f } = this.options;
            l.set(zo(t, this.options, n)),
              f && f(),
              this.cancel(),
              this.resolveFinishedPromise();
          }),
      { animation: c, duration: r, times: i, type: s, ease: o, keyframes: t }
    );
  }
  get duration() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { duration: n } = t;
    return at(n);
  }
  get time() {
    const { resolved: t } = this;
    if (!t) return 0;
    const { animation: n } = t;
    return at(n.currentTime || 0);
  }
  set time(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.currentTime = lt(t);
  }
  get speed() {
    const { resolved: t } = this;
    if (!t) return 1;
    const { animation: n } = t;
    return n.playbackRate;
  }
  set speed(t) {
    const { resolved: n } = this;
    if (!n) return;
    const { animation: r } = n;
    r.playbackRate = t;
  }
  get state() {
    const { resolved: t } = this;
    if (!t) return "idle";
    const { animation: n } = t;
    return n.playState;
  }
  get startTime() {
    const { resolved: t } = this;
    if (!t) return null;
    const { animation: n } = t;
    return n.startTime;
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      const { resolved: n } = this;
      if (!n) return Me;
      const { animation: r } = n;
      Cc(r, t);
    }
    return Me;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === "idle"))
      return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: t } = this;
    if (!t) return;
    const {
      animation: n,
      keyframes: r,
      duration: i,
      type: o,
      ease: s,
      times: l,
    } = t;
    if (n.playState === "idle" || n.playState === "finished") return;
    if (this.time) {
      const {
          motionValue: u,
          onUpdate: c,
          onComplete: f,
          element: d,
          ...g
        } = this.options,
        v = new su({
          ...g,
          keyframes: r,
          duration: i,
          type: o,
          ease: s,
          times: l,
          isGenerator: !0,
        }),
        y = lt(this.time);
      u.setWithVelocity(v.sample(y - yo).value, v.sample(y).value, yo);
    }
    const { onStop: a } = this.options;
    a && a(), this.cancel();
  }
  complete() {
    const { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    const { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    const {
      motionValue: n,
      name: r,
      repeatDelay: i,
      repeatType: o,
      damping: s,
      type: l,
    } = t;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    const { onUpdate: a, transformTemplate: u } = n.owner.getProps();
    return (
      g1() &&
      r &&
      p1.has(r) &&
      !a &&
      !u &&
      !i &&
      o !== "mirror" &&
      s !== 0 &&
      l !== "inertia"
    );
  }
}
const x1 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  P1 = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  k1 = { type: "keyframes", duration: 0.8 },
  T1 = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  C1 = (e, { keyframes: t }) =>
    t.length > 2
      ? k1
      : un.has(e)
      ? e.startsWith("scale")
        ? P1(t[1])
        : x1
      : T1;
function E1({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: o,
  repeatType: s,
  repeatDelay: l,
  from: a,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
const lu =
  (e, t, n, r = {}, i, o) =>
  (s) => {
    const l = Ga(r, e) || {},
      a = l.delay || r.delay || 0;
    let { elapsed: u = 0 } = r;
    u = u - lt(a);
    let c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...l,
      delay: -u,
      onUpdate: (d) => {
        t.set(d), l.onUpdate && l.onUpdate(d);
      },
      onComplete: () => {
        s(), l.onComplete && l.onComplete();
      },
      name: e,
      motionValue: t,
      element: o ? void 0 : i,
    };
    E1(l) || (c = { ...c, ...C1(e, c) }),
      c.duration && (c.duration = lt(c.duration)),
      c.repeatDelay && (c.repeatDelay = lt(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from);
    let f = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        ((c.duration = 0), c.delay === 0 && (f = !0)),
      f && !o && t.get() !== void 0)
    ) {
      const d = zo(c.keyframes, l);
      if (d !== void 0)
        return (
          U.update(() => {
            c.onUpdate(d), c.onComplete();
          }),
          new Gv([])
        );
    }
    return !o && $c.supports(c) ? new $c(c) : new su(c);
  };
function A1({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return (t[n] = !1), r;
}
function em(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var o;
  let { transition: s = e.getDefaultTransition(), transitionEnd: l, ...a } = t;
  r && (s = r);
  const u = [],
    c = i && e.animationState && e.animationState.getState()[i];
  for (const f in a) {
    const d = e.getValue(
        f,
        (o = e.latestValues[f]) !== null && o !== void 0 ? o : null
      ),
      g = a[f];
    if (g === void 0 || (c && A1(c, f))) continue;
    const v = { delay: n, ...Ga(s || {}, f) };
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const p = Tp(e);
      if (p) {
        const h = window.MotionHandoffAnimation(p, f, U);
        h !== null && ((v.startTime = h), (y = !0));
      }
    }
    kl(e, f),
      d.start(
        lu(f, d, g, e.shouldReduceMotion && Pp.has(f) ? { type: !1 } : v, e, y)
      );
    const x = d.animation;
    x && u.push(x);
  }
  return (
    l &&
      Promise.all(u).then(() => {
        U.update(() => {
          l && s0(e, l);
        });
      }),
    u
  );
}
function Vl(e, t, n = {}) {
  var r;
  const i = Io(
    e,
    t,
    n.type === "exit"
      ? (r = e.presenceContext) === null || r === void 0
        ? void 0
        : r.custom
      : void 0
  );
  let { transition: o = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (o = n.transitionOverride);
  const s = i ? () => Promise.all(em(e, i, n)) : () => Promise.resolve(),
    l =
      e.variantChildren && e.variantChildren.size
        ? (u = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: f,
              staggerDirection: d,
            } = o;
            return M1(e, t, c + u, f, d, n);
          }
        : () => Promise.resolve(),
    { when: a } = o;
  if (a) {
    const [u, c] = a === "beforeChildren" ? [s, l] : [l, s];
    return u().then(() => c());
  } else return Promise.all([s(), l(n.delay)]);
}
function M1(e, t, n = 0, r = 0, i = 1, o) {
  const s = [],
    l = (e.variantChildren.size - 1) * r,
    a = i === 1 ? (u = 0) => u * r : (u = 0) => l - u * r;
  return (
    Array.from(e.variantChildren)
      .sort(D1)
      .forEach((u, c) => {
        u.notify("AnimationStart", t),
          s.push(
            Vl(u, t, { ...o, delay: n + a(c) }).then(() =>
              u.notify("AnimationComplete", t)
            )
          );
      }),
    Promise.all(s)
  );
}
function D1(e, t) {
  return e.sortNodePosition(t);
}
function V1(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((o) => Vl(e, o, n));
    r = Promise.all(i);
  } else if (typeof t == "string") r = Vl(e, t, n);
  else {
    const i = typeof t == "function" ? Io(e, t, n.custom) : t;
    r = Promise.all(em(e, i, n));
  }
  return r.then(() => {
    e.notify("AnimationComplete", t);
  });
}
const R1 = Na.length;
function tm(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const n = e.parent ? tm(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < R1; n++) {
    const r = Na[n],
      i = e.props[r];
    ($r(i) || i === !1) && (t[r] = i);
  }
  return t;
}
const L1 = [..._a].reverse(),
  _1 = _a.length;
function N1(e) {
  return (t) =>
    Promise.all(t.map(({ animation: n, options: r }) => V1(e, n, r)));
}
function F1(e) {
  let t = N1(e),
    n = Wc(),
    r = !0;
  const i = (a) => (u, c) => {
    var f;
    const d = Io(
      e,
      c,
      a === "exit"
        ? (f = e.presenceContext) === null || f === void 0
          ? void 0
          : f.custom
        : void 0
    );
    if (d) {
      const { transition: g, transitionEnd: v, ...y } = d;
      u = { ...u, ...y, ...v };
    }
    return u;
  };
  function o(a) {
    t = a(e);
  }
  function s(a) {
    const { props: u } = e,
      c = tm(e.parent) || {},
      f = [],
      d = new Set();
    let g = {},
      v = 1 / 0;
    for (let x = 0; x < _1; x++) {
      const p = L1[x],
        h = n[p],
        m = u[p] !== void 0 ? u[p] : c[p],
        w = $r(m),
        S = p === a ? h.isActive : null;
      S === !1 && (v = x);
      let T = m === c[p] && m !== u[p] && w;
      if (
        (T && r && e.manuallyAnimateOnMount && (T = !1),
        (h.protectedKeys = { ...g }),
        (!h.isActive && S === null) ||
          (!m && !h.prevProp) ||
          jo(m) ||
          typeof m == "boolean")
      )
        continue;
      const C = j1(h.prevProp, m);
      let k = C || (p === a && h.isActive && !T && w) || (x > v && w),
        N = !1;
      const V = Array.isArray(m) ? m : [m];
      let ne = V.reduce(i(p), {});
      S === !1 && (ne = {});
      const { prevResolvedValues: mt = {} } = h,
        Bt = { ...mt, ...ne },
        Yn = (b) => {
          (k = !0),
            d.has(b) && ((N = !0), d.delete(b)),
            (h.needsAnimating[b] = !0);
          const E = e.getValue(b);
          E && (E.liveStyle = !1);
        };
      for (const b in Bt) {
        const E = ne[b],
          R = mt[b];
        if (g.hasOwnProperty(b)) continue;
        let L = !1;
        Sl(E) && Sl(R) ? (L = !pp(E, R)) : (L = E !== R),
          L
            ? E != null
              ? Yn(b)
              : d.add(b)
            : E !== void 0 && d.has(b)
            ? Yn(b)
            : (h.protectedKeys[b] = !0);
      }
      (h.prevProp = m),
        (h.prevResolvedValues = ne),
        h.isActive && (g = { ...g, ...ne }),
        r && e.blockInitialAnimation && (k = !1),
        k &&
          (!(T && C) || N) &&
          f.push(...V.map((b) => ({ animation: b, options: { type: p } })));
    }
    if (d.size) {
      const x = {};
      d.forEach((p) => {
        const h = e.getBaseTarget(p),
          m = e.getValue(p);
        m && (m.liveStyle = !0), (x[p] = h ?? null);
      }),
        f.push({ animation: x });
    }
    let y = !!f.length;
    return (
      r &&
        (u.initial === !1 || u.initial === u.animate) &&
        !e.manuallyAnimateOnMount &&
        (y = !1),
      (r = !1),
      y ? t(f) : Promise.resolve()
    );
  }
  function l(a, u) {
    var c;
    if (n[a].isActive === u) return Promise.resolve();
    (c = e.variantChildren) === null ||
      c === void 0 ||
      c.forEach((d) => {
        var g;
        return (g = d.animationState) === null || g === void 0
          ? void 0
          : g.setActive(a, u);
      }),
      (n[a].isActive = u);
    const f = s(a);
    for (const d in n) n[d].protectedKeys = {};
    return f;
  }
  return {
    animateChanges: s,
    setActive: l,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      (n = Wc()), (r = !0);
    },
  };
}
function j1(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !pp(t, e) : !1;
}
function Wt(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function Wc() {
  return {
    animate: Wt(!0),
    whileInView: Wt(),
    whileHover: Wt(),
    whileTap: Wt(),
    whileDrag: Wt(),
    whileFocus: Wt(),
    exit: Wt(),
  };
}
class zt {
  constructor(t) {
    (this.isMounted = !1), (this.node = t);
  }
  update() {}
}
class O1 extends zt {
  constructor(t) {
    super(t), t.animationState || (t.animationState = F1(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    jo(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    this.node.animationState.reset(),
      (t = this.unmountControls) === null || t === void 0 || t.call(this);
  }
}
let I1 = 0;
class z1 extends zt {
  constructor() {
    super(...arguments), (this.id = I1++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r) return;
    const i = this.node.animationState.setActive("exit", !t);
    n && !t && i.then(() => n(this.id));
  }
  mount() {
    const { register: t } = this.node.presenceContext || {};
    t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const B1 = { animation: { Feature: O1 }, exit: { Feature: z1 } };
function Gr(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
function ti(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
const U1 = (e) => (t) => Ya(t) && e(t, ti(t));
function Pr(e, t, n, r) {
  return Gr(e, t, U1(n), r);
}
const Hc = (e, t) => Math.abs(e - t);
function $1(e, t) {
  const n = Hc(e.x, t.x),
    r = Hc(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class nm {
  constructor(
    t,
    n,
    { transformPagePoint: r, contextWindow: i, dragSnapToOrigin: o = !1 } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const f = Ss(this.lastMoveEventInfo, this.history),
          d = this.startEvent !== null,
          g = $1(f.offset, { x: 0, y: 0 }) >= 3;
        if (!d && !g) return;
        const { point: v } = f,
          { timestamp: y } = le;
        this.history.push({ ...v, timestamp: y });
        const { onStart: x, onMove: p } = this.handlers;
        d ||
          (x && x(this.lastMoveEvent, f),
          (this.startEvent = this.lastMoveEvent)),
          p && p(this.lastMoveEvent, f);
      }),
      (this.handlePointerMove = (f, d) => {
        (this.lastMoveEvent = f),
          (this.lastMoveEventInfo = ws(d, this.transformPagePoint)),
          U.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (f, d) => {
        this.end();
        const { onEnd: g, onSessionEnd: v, resumeAnimation: y } = this.handlers;
        if (
          (this.dragSnapToOrigin && y && y(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const x = Ss(
          f.type === "pointercancel"
            ? this.lastMoveEventInfo
            : ws(d, this.transformPagePoint),
          this.history
        );
        this.startEvent && g && g(f, x), v && v(f, x);
      }),
      !Ya(t))
    )
      return;
    (this.dragSnapToOrigin = o),
      (this.handlers = n),
      (this.transformPagePoint = r),
      (this.contextWindow = i || window);
    const s = ti(t),
      l = ws(s, this.transformPagePoint),
      { point: a } = l,
      { timestamp: u } = le;
    this.history = [{ ...a, timestamp: u }];
    const { onSessionStart: c } = n;
    c && c(t, Ss(l, this.history)),
      (this.removeListeners = ei(
        Pr(this.contextWindow, "pointermove", this.handlePointerMove),
        Pr(this.contextWindow, "pointerup", this.handlePointerUp),
        Pr(this.contextWindow, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), Nt(this.updatePoint);
  }
}
function ws(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Kc(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Ss({ point: e }, t) {
  return {
    point: e,
    delta: Kc(e, rm(t)),
    offset: Kc(e, W1(t)),
    velocity: H1(t, 0.1),
  };
}
function W1(e) {
  return e[0];
}
function rm(e) {
  return e[e.length - 1];
}
function H1(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null;
  const i = rm(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > lt(t))); ) n--;
  if (!r) return { x: 0, y: 0 };
  const o = at(i.timestamp - r.timestamp);
  if (o === 0) return { x: 0, y: 0 };
  const s = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
  return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
const im = 1e-4,
  K1 = 1 - im,
  G1 = 1 + im,
  om = 0.01,
  Q1 = 0 - om,
  X1 = 0 + om;
function Ve(e) {
  return e.max - e.min;
}
function Y1(e, t, n) {
  return Math.abs(e - t) <= n;
}
function Gc(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = H(t.min, t.max, e.origin)),
    (e.scale = Ve(n) / Ve(t)),
    (e.translate = H(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= K1 && e.scale <= G1) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= Q1 && e.translate <= X1) || isNaN(e.translate)) &&
      (e.translate = 0);
}
function kr(e, t, n, r) {
  Gc(e.x, t.x, n.x, r ? r.originX : void 0),
    Gc(e.y, t.y, n.y, r ? r.originY : void 0);
}
function Qc(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + Ve(t));
}
function Z1(e, t, n) {
  Qc(e.x, t.x, n.x), Qc(e.y, t.y, n.y);
}
function Xc(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + Ve(t));
}
function Tr(e, t, n) {
  Xc(e.x, t.x, n.x), Xc(e.y, t.y, n.y);
}
function q1(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? H(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? H(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function Yc(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function J1(e, { top: t, left: n, bottom: r, right: i }) {
  return { x: Yc(e.x, n, i), y: Yc(e.y, t, r) };
}
function Zc(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function b1(e, t) {
  return { x: Zc(e.x, t.x), y: Zc(e.y, t.y) };
}
function ew(e, t) {
  let n = 0.5;
  const r = Ve(e),
    i = Ve(t);
  return (
    i > r
      ? (n = Un(t.min, t.max - r, e.min))
      : r > i && (n = Un(e.min, e.max - i, t.min)),
    ht(0, 1, n)
  );
}
function tw(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const Rl = 0.35;
function nw(e = Rl) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Rl),
    { x: qc(e, "left", "right"), y: qc(e, "top", "bottom") }
  );
}
function qc(e, t, n) {
  return { min: Jc(e, t), max: Jc(e, n) };
}
function Jc(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const bc = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Cn = () => ({ x: bc(), y: bc() }),
  ef = () => ({ min: 0, max: 0 }),
  Z = () => ({ x: ef(), y: ef() });
function Ne(e) {
  return [e("x"), e("y")];
}
function sm({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function rw({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function iw(e, t) {
  if (!t) return e;
  const n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function xs(e) {
  return e === void 0 || e === 1;
}
function Ll({ scale: e, scaleX: t, scaleY: n }) {
  return !xs(e) || !xs(t) || !xs(n);
}
function Gt(e) {
  return (
    Ll(e) ||
    lm(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function lm(e) {
  return tf(e.x) || tf(e.y);
}
function tf(e) {
  return e && e !== "0%";
}
function vo(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i;
}
function nf(e, t, n, r, i) {
  return i !== void 0 && (e = vo(e, i, r)), vo(e, n, r) + t;
}
function _l(e, t = 0, n = 1, r, i) {
  (e.min = nf(e.min, t, n, r, i)), (e.max = nf(e.max, t, n, r, i));
}
function am(e, { x: t, y: n }) {
  _l(e.x, t.translate, t.scale, t.originPoint),
    _l(e.y, n.translate, n.scale, n.originPoint);
}
const rf = 0.999999999999,
  of = 1.0000000000001;
function ow(e, t, n, r = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let o, s;
  for (let l = 0; l < i; l++) {
    (o = n[l]), (s = o.projectionDelta);
    const { visualElement: a } = o.options;
    (a && a.props.style && a.props.style.display === "contents") ||
      (r &&
        o.options.layoutScroll &&
        o.scroll &&
        o !== o.root &&
        An(e, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), am(e, s)),
      r && Gt(o.latestValues) && An(e, o.latestValues));
  }
  t.x < of && t.x > rf && (t.x = 1), t.y < of && t.y > rf && (t.y = 1);
}
function En(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function sf(e, t, n, r, i = 0.5) {
  const o = H(e.min, e.max, i);
  _l(e, t, n, o, r);
}
function An(e, t) {
  sf(e.x, t.x, t.scaleX, t.scale, t.originX),
    sf(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function um(e, t) {
  return sm(iw(e.getBoundingClientRect(), t));
}
function sw(e, t, n) {
  const r = um(e, n),
    { scroll: i } = t;
  return i && (En(r.x, i.offset.x), En(r.y, i.offset.y)), r;
}
const cm = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  lw = new WeakMap();
class aw {
  constructor(t) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Z()),
      (this.visualElement = t);
  }
  start(t, { snapToCursor: n = !1 } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1) return;
    const i = (c) => {
        const { dragSnapToOrigin: f } = this.getProps();
        f ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(ti(c).point);
      },
      o = (c, f) => {
        const { drag: d, dragPropagation: g, onDragStart: v } = this.getProps();
        if (
          d &&
          !g &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = t0(d)),
          !this.openDragLock)
        )
          return;
        (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          Ne((x) => {
            let p = this.getAxisMotionValue(x).get() || 0;
            if (et.test(p)) {
              const { projection: h } = this.visualElement;
              if (h && h.layout) {
                const m = h.layout.layoutBox[x];
                m && (p = Ve(m) * (parseFloat(p) / 100));
              }
            }
            this.originPoint[x] = p;
          }),
          v && U.postRender(() => v(c, f)),
          kl(this.visualElement, "transform");
        const { animationState: y } = this.visualElement;
        y && y.setActive("whileDrag", !0);
      },
      s = (c, f) => {
        const {
          dragPropagation: d,
          dragDirectionLock: g,
          onDirectionLock: v,
          onDrag: y,
        } = this.getProps();
        if (!d && !this.openDragLock) return;
        const { offset: x } = f;
        if (g && this.currentDirection === null) {
          (this.currentDirection = uw(x)),
            this.currentDirection !== null && v && v(this.currentDirection);
          return;
        }
        this.updateAxis("x", f.point, x),
          this.updateAxis("y", f.point, x),
          this.visualElement.render(),
          y && y(c, f);
      },
      l = (c, f) => this.stop(c, f),
      a = () =>
        Ne((c) => {
          var f;
          return (
            this.getAnimationState(c) === "paused" &&
            ((f = this.getAxisMotionValue(c).animation) === null || f === void 0
              ? void 0
              : f.play())
          );
        }),
      { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new nm(
      t,
      {
        onSessionStart: i,
        onStart: o,
        onMove: s,
        onSessionEnd: l,
        resumeAnimation: a,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: u,
        contextWindow: cm(this.visualElement),
      }
    );
  }
  stop(t, n) {
    const r = this.isDragging;
    if ((this.cancel(), !r)) return;
    const { velocity: i } = n;
    this.startAnimation(i);
    const { onDragEnd: o } = this.getProps();
    o && U.postRender(() => o(t, n));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: r } = this.getProps();
    !r &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Ci(t, i, this.currentDirection)) return;
    const o = this.getAxisMotionValue(t);
    let s = this.originPoint[t] + r[t];
    this.constraints &&
      this.constraints[t] &&
      (s = q1(s, this.constraints[t], this.elastic[t])),
      o.set(s);
  }
  resolveConstraints() {
    var t;
    const { dragConstraints: n, dragElastic: r } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (t = this.visualElement.projection) === null || t === void 0
          ? void 0
          : t.layout,
      o = this.constraints;
    n && kn(n)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : n && i
      ? (this.constraints = J1(i.layoutBox, n))
      : (this.constraints = !1),
      (this.elastic = nw(r)),
      o !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        Ne((s) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(s) &&
            (this.constraints[s] = tw(i.layoutBox[s], this.constraints[s]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !kn(t)) return !1;
    const r = t.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const o = sw(r, i.root, this.visualElement.getTransformPagePoint());
    let s = b1(i.layout.layoutBox, o);
    if (n) {
      const l = n(rw(s));
      (this.hasMutatedConstraints = !!l), l && (s = sm(l));
    }
    return s;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: o,
        dragSnapToOrigin: s,
        onDragTransitionEnd: l,
      } = this.getProps(),
      a = this.constraints || {},
      u = Ne((c) => {
        if (!Ci(c, n, this.currentDirection)) return;
        let f = (a && a[c]) || {};
        s && (f = { min: 0, max: 0 });
        const d = i ? 200 : 1e6,
          g = i ? 40 : 1e7,
          v = {
            type: "inertia",
            velocity: r ? t[c] : 0,
            bounceStiffness: d,
            bounceDamping: g,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...o,
            ...f,
          };
        return this.startAxisValueAnimation(c, v);
      });
    return Promise.all(u).then(l);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return (
      kl(this.visualElement, t), r.start(lu(t, r, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    Ne((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    Ne((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) === null || n === void 0
      ? void 0
      : n.state;
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      r = this.visualElement.getProps(),
      i = r[n];
    return (
      i ||
      this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    Ne((n) => {
      const { drag: r } = this.getProps();
      if (!Ci(n, r, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        o = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: s, max: l } = i.layout.layoutBox[n];
        o.set(t[n] - H(s, l, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!kn(n) || !r || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    Ne((s) => {
      const l = this.getAxisMotionValue(s);
      if (l && this.constraints !== !1) {
        const a = l.get();
        i[s] = ew({ min: a, max: a }, this.constraints[s]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = o ? o({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      Ne((s) => {
        if (!Ci(s, t, null)) return;
        const l = this.getAxisMotionValue(s),
          { min: a, max: u } = this.constraints[s];
        l.set(H(a, u, i[s]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    lw.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = Pr(t, "pointerdown", (a) => {
        const { drag: u, dragListener: c = !0 } = this.getProps();
        u && c && this.start(a);
      }),
      r = () => {
        const { dragConstraints: a } = this.getProps();
        kn(a) && a.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      o = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
      U.read(r);
    const s = Gr(window, "resize", () => this.scalePositionWithinConstraints()),
      l = i.addEventListener(
        "didUpdate",
        ({ delta: a, hasLayoutChanged: u }) => {
          this.isDragging &&
            u &&
            (Ne((c) => {
              const f = this.getAxisMotionValue(c);
              f &&
                ((this.originPoint[c] += a[c].translate),
                f.set(f.get() + a[c].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      s(), n(), o(), l && l();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: o = !1,
        dragElastic: s = Rl,
        dragMomentum: l = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: o,
      dragElastic: s,
      dragMomentum: l,
    };
  }
}
function Ci(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function uw(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n;
}
class cw extends zt {
  constructor(t) {
    super(t),
      (this.removeGroupControls = Me),
      (this.removeListeners = Me),
      (this.controls = new aw(t));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Me);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const lf = (e) => (t, n) => {
  e && U.postRender(() => e(t, n));
};
class fw extends zt {
  constructor() {
    super(...arguments), (this.removePointerDownListener = Me);
  }
  onPointerDown(t) {
    this.session = new nm(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: cm(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: r,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: lf(t),
      onStart: lf(n),
      onMove: r,
      onEnd: (o, s) => {
        delete this.session, i && U.postRender(() => i(o, s));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Pr(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const Bi = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function af(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const ir = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (D.test(e)) e = parseFloat(e);
        else return e;
      const n = af(e, t.target.x),
        r = af(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  dw = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = Ft.parse(e);
      if (i.length > 5) return r;
      const o = Ft.createTransformer(e),
        s = typeof i[0] != "number" ? 1 : 0,
        l = n.x.scale * t.x,
        a = n.y.scale * t.y;
      (i[0 + s] /= l), (i[1 + s] /= a);
      const u = H(l, a, 0.5);
      return (
        typeof i[2 + s] == "number" && (i[2 + s] /= u),
        typeof i[3 + s] == "number" && (i[3 + s] /= u),
        o(i)
      );
    },
  };
class hw extends M.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
        layoutId: i,
      } = this.props,
      { projection: o } = t;
    Nv(pw),
      o &&
        (n.group && n.group.add(o),
        r && r.register && i && r.register(o),
        o.root.didUpdate(),
        o.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        o.setOptions({
          ...o.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Bi.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: r,
        drag: i,
        isPresent: o,
      } = this.props,
      s = r.projection;
    return (
      s &&
        ((s.isPresent = o),
        i || t.layoutDependency !== n || n === void 0
          ? s.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== o &&
          (o
            ? s.promote()
            : s.relegate() ||
              U.postRender(() => {
                const l = s.getStack();
                (!l || !l.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      ja.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
      } = this.props,
      { projection: i } = t;
    i &&
      (i.scheduleCheckAfterUnmount(),
      n && n.group && n.group.remove(i),
      r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function fm(e) {
  const [t, n] = Yy(),
    r = M.useContext(Xh);
  return j.jsx(hw, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: M.useContext(tp),
    isPresent: t,
    safeToRemove: n,
  });
}
const pw = {
  borderRadius: {
    ...ir,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: ir,
  borderTopRightRadius: ir,
  borderBottomLeftRadius: ir,
  borderBottomRightRadius: ir,
  boxShadow: dw,
};
function mw(e, t, n) {
  const r = pe(e) ? e : Hr(e);
  return r.start(lu("", r, t, n)), r.animation;
}
function gw(e) {
  return e instanceof SVGElement && e.tagName !== "svg";
}
const yw = (e, t) => e.depth - t.depth;
class vw {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    Za(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    qa(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(yw),
      (this.isDirty = !1),
      this.children.forEach(t);
  }
}
function ww(e, t) {
  const n = tt.now(),
    r = ({ timestamp: i }) => {
      const o = i - n;
      o >= t && (Nt(r), e(o - t));
    };
  return U.read(r, !0), () => Nt(r);
}
const dm = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  Sw = dm.length,
  uf = (e) => (typeof e == "string" ? parseFloat(e) : e),
  cf = (e) => typeof e == "number" || D.test(e);
function xw(e, t, n, r, i, o) {
  i
    ? ((e.opacity = H(0, n.opacity !== void 0 ? n.opacity : 1, Pw(r))),
      (e.opacityExit = H(t.opacity !== void 0 ? t.opacity : 1, 0, kw(r))))
    : o &&
      (e.opacity = H(
        t.opacity !== void 0 ? t.opacity : 1,
        n.opacity !== void 0 ? n.opacity : 1,
        r
      ));
  for (let s = 0; s < Sw; s++) {
    const l = `border${dm[s]}Radius`;
    let a = ff(t, l),
      u = ff(n, l);
    if (a === void 0 && u === void 0) continue;
    a || (a = 0),
      u || (u = 0),
      a === 0 || u === 0 || cf(a) === cf(u)
        ? ((e[l] = Math.max(H(uf(a), uf(u), r), 0)),
          (et.test(u) || et.test(a)) && (e[l] += "%"))
        : (e[l] = u);
  }
  (t.rotate || n.rotate) && (e.rotate = H(t.rotate || 0, n.rotate || 0, r));
}
function ff(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const Pw = hm(0, 0.5, Rp),
  kw = hm(0.5, 0.95, Me);
function hm(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(Un(e, t, r)));
}
function df(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function _e(e, t) {
  df(e.x, t.x), df(e.y, t.y);
}
function hf(e, t) {
  (e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin);
}
function pf(e, t, n, r, i) {
  return (
    (e -= t), (e = vo(e, 1 / n, r)), i !== void 0 && (e = vo(e, 1 / i, r)), e
  );
}
function Tw(e, t = 0, n = 1, r = 0.5, i, o = e, s = e) {
  if (
    (et.test(t) &&
      ((t = parseFloat(t)), (t = H(s.min, s.max, t / 100) - s.min)),
    typeof t != "number")
  )
    return;
  let l = H(o.min, o.max, r);
  e === o && (l -= t),
    (e.min = pf(e.min, t, n, l, i)),
    (e.max = pf(e.max, t, n, l, i));
}
function mf(e, t, [n, r, i], o, s) {
  Tw(e, t[n], t[r], t[i], t.scale, o, s);
}
const Cw = ["x", "scaleX", "originX"],
  Ew = ["y", "scaleY", "originY"];
function gf(e, t, n, r) {
  mf(e.x, t, Cw, n ? n.x : void 0, r ? r.x : void 0),
    mf(e.y, t, Ew, n ? n.y : void 0, r ? r.y : void 0);
}
function yf(e) {
  return e.translate === 0 && e.scale === 1;
}
function pm(e) {
  return yf(e.x) && yf(e.y);
}
function vf(e, t) {
  return e.min === t.min && e.max === t.max;
}
function Aw(e, t) {
  return vf(e.x, t.x) && vf(e.y, t.y);
}
function wf(e, t) {
  return (
    Math.round(e.min) === Math.round(t.min) &&
    Math.round(e.max) === Math.round(t.max)
  );
}
function mm(e, t) {
  return wf(e.x, t.x) && wf(e.y, t.y);
}
function Sf(e) {
  return Ve(e.x) / Ve(e.y);
}
function xf(e, t) {
  return (
    e.translate === t.translate &&
    e.scale === t.scale &&
    e.originPoint === t.originPoint
  );
}
class Mw {
  constructor() {
    this.members = [];
  }
  add(t) {
    Za(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (
      (qa(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const o = this.members[i];
      if (o.isPresent !== !1) {
        r = o;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot &&
          ((t.snapshot = r.snapshot),
          (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(),
        r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Dw(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x,
    o = e.y.translate / t.y,
    s = (n == null ? void 0 : n.z) || 0;
  if (
    ((i || o || s) && (r = `translate3d(${i}px, ${o}px, ${s}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const {
      transformPerspective: u,
      rotate: c,
      rotateX: f,
      rotateY: d,
      skewX: g,
      skewY: v,
    } = n;
    u && (r = `perspective(${u}px) ${r}`),
      c && (r += `rotate(${c}deg) `),
      f && (r += `rotateX(${f}deg) `),
      d && (r += `rotateY(${d}deg) `),
      g && (r += `skewX(${g}deg) `),
      v && (r += `skewY(${v}deg) `);
  }
  const l = e.x.scale * t.x,
    a = e.y.scale * t.y;
  return (l !== 1 || a !== 1) && (r += `scale(${l}, ${a})`), r || "none";
}
const Qt = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  fr = typeof window < "u" && window.MotionDebug !== void 0,
  Ps = ["", "X", "Y", "Z"],
  Vw = { visibility: "hidden" },
  Pf = 1e3;
let Rw = 0;
function ks(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function gm(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: t } = e.options;
  if (!t) return;
  const n = Tp(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: o } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", U, !(i || o));
  }
  const { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && gm(r);
}
function ym({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(s = {}, l = t == null ? void 0 : t()) {
      (this.id = Rw++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            fr &&
              (Qt.totalNodes =
                Qt.resolvedTargetDeltas =
                Qt.recalculatedProjection =
                  0),
            this.nodes.forEach(Nw),
            this.nodes.forEach(zw),
            this.nodes.forEach(Bw),
            this.nodes.forEach(Fw),
            fr && window.MotionDebug.record(Qt);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = l ? l.root || l : this),
        (this.path = l ? [...l.path, l] : []),
        (this.parent = l),
        (this.depth = l ? l.depth + 1 : 0);
      for (let a = 0; a < this.path.length; a++)
        this.path[a].shouldResetTransform = !0;
      this.root === this && (this.nodes = new vw());
    }
    addEventListener(s, l) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new Ja()),
        this.eventHandlers.get(s).add(l)
      );
    }
    notifyListeners(s, ...l) {
      const a = this.eventHandlers.get(s);
      a && a.notify(...l);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    mount(s, l = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = gw(s)), (this.instance = s);
      const { layoutId: a, layout: u, visualElement: c } = this.options;
      if (
        (c && !c.current && c.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        l && (u || a) && (this.isLayoutDirty = !0),
        e)
      ) {
        let f;
        const d = () => (this.root.updateBlockedByResize = !1);
        e(s, () => {
          (this.root.updateBlockedByResize = !0),
            f && f(),
            (f = ww(d, 250)),
            Bi.hasAnimatedSinceResize &&
              ((Bi.hasAnimatedSinceResize = !1), this.nodes.forEach(Tf));
        });
      }
      a && this.root.registerSharedNode(a, this),
        this.options.animate !== !1 &&
          c &&
          (a || u) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: f,
              hasLayoutChanged: d,
              hasRelativeTargetChanged: g,
              layout: v,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const y =
                  this.options.transition || c.getDefaultTransition() || Kw,
                { onLayoutAnimationStart: x, onLayoutAnimationComplete: p } =
                  c.getProps(),
                h = !this.targetLayout || !mm(this.targetLayout, v) || g,
                m = !d && g;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                m ||
                (d && (h || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(f, m);
                const w = { ...Ga(y, "layout"), onPlay: x, onComplete: p };
                (c.shouldReduceMotion || this.options.layoutRoot) &&
                  ((w.delay = 0), (w.type = !1)),
                  this.startAnimation(w);
              } else
                d || Tf(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = v;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const s = this.getStack();
      s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Nt(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(Uw),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          gm(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        (f.shouldResetTransform = !0),
          f.updateScroll("snapshot"),
          f.options.layoutRoot && f.willUpdate(!1);
      }
      const { layoutId: l, layout: a } = this.options;
      if (l === void 0 && !a) return;
      const u = this.getTransformTemplate();
      (this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(kf);
        return;
      }
      this.isUpdating || this.nodes.forEach(Ow),
        (this.isUpdating = !1),
        this.nodes.forEach(Iw),
        this.nodes.forEach(Lw),
        this.nodes.forEach(_w),
        this.clearAllSnapshots();
      const l = tt.now();
      (le.delta = ht(0, 1e3 / 60, l - le.timestamp)),
        (le.timestamp = l),
        (le.isProcessing = !0),
        hs.update.process(le),
        hs.preRender.process(le),
        hs.render.process(le),
        (le.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), ja.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(jw), this.sharedNodes.forEach($w);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        U.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      U.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let a = 0; a < this.path.length; a++) this.path[a].updateScroll();
      const s = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = Z()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: l } = this.options;
      l &&
        l.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          s ? s.layoutBox : void 0
        );
    }
    updateScroll(s = "measure") {
      let l = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === s &&
          (l = !1),
        l)
      ) {
        const a = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: a,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : a,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const s =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        l = this.projectionDelta && !pm(this.projectionDelta),
        a = this.getTransformTemplate(),
        u = a ? a(this.latestValues, "") : void 0,
        c = u !== this.prevTransformTemplateValue;
      s &&
        (l || Gt(this.latestValues) || c) &&
        (i(this.instance, u),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(s = !0) {
      const l = this.measurePageBox();
      let a = this.removeElementScroll(l);
      return (
        s && (a = this.removeTransform(a)),
        Gw(a),
        {
          animationId: this.root.animationId,
          measuredBox: l,
          layoutBox: a,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var s;
      const { visualElement: l } = this.options;
      if (!l) return Z();
      const a = l.measureViewportBox();
      if (
        !(
          ((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) ||
          this.path.some(Qw)
        )
      ) {
        const { scroll: c } = this.root;
        c && (En(a.x, c.offset.x), En(a.y, c.offset.y));
      }
      return a;
    }
    removeElementScroll(s) {
      var l;
      const a = Z();
      if (
        (_e(a, s), !((l = this.scroll) === null || l === void 0) && l.wasRoot)
      )
        return a;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u],
          { scroll: f, options: d } = c;
        c !== this.root &&
          f &&
          d.layoutScroll &&
          (f.wasRoot && _e(a, s), En(a.x, f.offset.x), En(a.y, f.offset.y));
      }
      return a;
    }
    applyTransform(s, l = !1) {
      const a = Z();
      _e(a, s);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !l &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          An(a, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          Gt(c.latestValues) && An(a, c.latestValues);
      }
      return Gt(this.latestValues) && An(a, this.latestValues), a;
    }
    removeTransform(s) {
      const l = Z();
      _e(l, s);
      for (let a = 0; a < this.path.length; a++) {
        const u = this.path[a];
        if (!u.instance || !Gt(u.latestValues)) continue;
        Ll(u.latestValues) && u.updateSnapshot();
        const c = Z(),
          f = u.measurePageBox();
        _e(c, f),
          gf(l, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return Gt(this.latestValues) && gf(l, this.latestValues), l;
    }
    setTargetDelta(s) {
      (this.targetDelta = s),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== le.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(s = !1) {
      var l;
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const u = !!this.resumingFrom || this !== a;
      if (
        !(
          s ||
          (u && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((l = this.parent) === null || l === void 0) &&
            l.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: f, layoutId: d } = this.options;
      if (!(!this.layout || !(f || d))) {
        if (
          ((this.resolvedRelativeTargetAt = le.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const g = this.getClosestProjectingParent();
          g && g.layout && this.animationProgress !== 1
            ? ((this.relativeParent = g),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Z()),
              (this.relativeTargetOrigin = Z()),
              Tr(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                g.layout.layoutBox
              ),
              _e(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = Z()), (this.targetWithTransforms = Z())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                Z1(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target
                ))
              : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : _e(this.target, this.layout.layoutBox),
                am(this.target, this.targetDelta))
              : _e(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const g = this.getClosestProjectingParent();
            g &&
            !!g.resumingFrom == !!this.resumingFrom &&
            !g.options.layoutScroll &&
            g.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = g),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = Z()),
                (this.relativeTargetOrigin = Z()),
                Tr(this.relativeTargetOrigin, this.target, g.target),
                _e(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          fr && Qt.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Ll(this.parent.latestValues) ||
          lm(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var s;
      const l = this.getLead(),
        a = !!this.resumingFrom || this !== l;
      let u = !0;
      if (
        ((this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) &&
            s.isProjectionDirty)) &&
          (u = !1),
        a &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (u = !1),
        this.resolvedRelativeTargetAt === le.timestamp && (u = !1),
        u)
      )
        return;
      const { layout: c, layoutId: f } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || f))
      )
        return;
      _e(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x,
        g = this.treeScale.y;
      ow(this.layoutCorrected, this.treeScale, this.path, a),
        l.layout &&
          !l.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((l.target = l.layout.layoutBox), (l.targetWithTransforms = Z()));
      const { target: v } = l;
      if (!v) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (hf(this.prevProjectionDelta.x, this.projectionDelta.x),
          hf(this.prevProjectionDelta.y, this.projectionDelta.y)),
        kr(this.projectionDelta, this.layoutCorrected, v, this.latestValues),
        (this.treeScale.x !== d ||
          this.treeScale.y !== g ||
          !xf(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !xf(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", v)),
        fr && Qt.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      var l;
      if (
        ((l = this.options.visualElement) === null ||
          l === void 0 ||
          l.scheduleRender(),
        s)
      ) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = Cn()),
        (this.projectionDelta = Cn()),
        (this.projectionDeltaWithTransform = Cn());
    }
    setAnimationOrigin(s, l = !1) {
      const a = this.snapshot,
        u = a ? a.latestValues : {},
        c = { ...this.latestValues },
        f = Cn();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !l);
      const d = Z(),
        g = a ? a.source : void 0,
        v = this.layout ? this.layout.source : void 0,
        y = g !== v,
        x = this.getStack(),
        p = !x || x.members.length <= 1,
        h = !!(y && !p && this.options.crossfade === !0 && !this.path.some(Hw));
      this.animationProgress = 0;
      let m;
      (this.mixTargetDelta = (w) => {
        const S = w / 1e3;
        Cf(f.x, s.x, S),
          Cf(f.y, s.y, S),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Tr(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            Ww(this.relativeTarget, this.relativeTargetOrigin, d, S),
            m && Aw(this.relativeTarget, m) && (this.isProjectionDirty = !1),
            m || (m = Z()),
            _e(m, this.relativeTarget)),
          y &&
            ((this.animationValues = c), xw(c, u, this.latestValues, S, h, p)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = S);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(s) {
      this.notifyListeners("animationStart"),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (Nt(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = U.update(() => {
          (Bi.hasAnimatedSinceResize = !0),
            (this.currentAnimation = mw(0, Pf, {
              ...s,
              onUpdate: (l) => {
                this.mixTargetDelta(l), s.onUpdate && s.onUpdate(l);
              },
              onComplete: () => {
                s.onComplete && s.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const s = this.getStack();
      s && s.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Pf),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const s = this.getLead();
      let {
        targetWithTransforms: l,
        target: a,
        layout: u,
        latestValues: c,
      } = s;
      if (!(!l || !a || !u)) {
        if (
          this !== s &&
          this.layout &&
          u &&
          vm(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          a = this.target || Z();
          const f = Ve(this.layout.layoutBox.x);
          (a.x.min = s.target.x.min), (a.x.max = a.x.min + f);
          const d = Ve(this.layout.layoutBox.y);
          (a.y.min = s.target.y.min), (a.y.max = a.y.min + d);
        }
        _e(l, a),
          An(l, c),
          kr(this.projectionDeltaWithTransform, this.layoutCorrected, l, c);
      }
    }
    registerSharedNode(s, l) {
      this.sharedNodes.has(s) || this.sharedNodes.set(s, new Mw()),
        this.sharedNodes.get(s).add(l);
      const u = l.options.initialPromotionConfig;
      l.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity
            ? u.shouldPreserveFollowOpacity(l)
            : void 0,
      });
    }
    isLead() {
      const s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      const { layoutId: l } = this.options;
      return l
        ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var s;
      const { layoutId: l } = this.options;
      return l
        ? (s = this.getStack()) === null || s === void 0
          ? void 0
          : s.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: s } = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: l, preserveFollowOpacity: a } = {}) {
      const u = this.getStack();
      u && u.promote(this, a),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        l && this.setOptions({ transition: l });
    }
    relegate() {
      const s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options;
      if (!s) return;
      let l = !1;
      const { latestValues: a } = s;
      if (
        ((a.z ||
          a.rotate ||
          a.rotateX ||
          a.rotateY ||
          a.rotateZ ||
          a.skewX ||
          a.skewY) &&
          (l = !0),
        !l)
      )
        return;
      const u = {};
      a.z && ks("z", s, u, this.animationValues);
      for (let c = 0; c < Ps.length; c++)
        ks(`rotate${Ps[c]}`, s, u, this.animationValues),
          ks(`skew${Ps[c]}`, s, u, this.animationValues);
      s.render();
      for (const c in u)
        s.setStaticValue(c, u[c]),
          this.animationValues && (this.animationValues[c] = u[c]);
      s.scheduleRender();
    }
    getProjectionStyles(s) {
      var l, a;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return Vw;
      const u = { visibility: "" },
        c = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ""),
          (u.pointerEvents = Ii(s == null ? void 0 : s.pointerEvents) || ""),
          (u.transform = c ? c(this.latestValues, "") : "none"),
          u
        );
      const f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        const y = {};
        return (
          this.options.layoutId &&
            ((y.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (y.pointerEvents = Ii(s == null ? void 0 : s.pointerEvents) || "")),
          this.hasProjected &&
            !Gt(this.latestValues) &&
            ((y.transform = c ? c({}, "") : "none"), (this.hasProjected = !1)),
          y
        );
      }
      const d = f.animationValues || f.latestValues;
      this.applyTransformsToTarget(),
        (u.transform = Dw(
          this.projectionDeltaWithTransform,
          this.treeScale,
          d
        )),
        c && (u.transform = c(d, u.transform));
      const { x: g, y: v } = this.projectionDelta;
      (u.transformOrigin = `${g.origin * 100}% ${v.origin * 100}% 0`),
        f.animationValues
          ? (u.opacity =
              f === this
                ? (a =
                    (l = d.opacity) !== null && l !== void 0
                      ? l
                      : this.latestValues.opacity) !== null && a !== void 0
                  ? a
                  : 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : d.opacityExit)
          : (u.opacity =
              f === this
                ? d.opacity !== void 0
                  ? d.opacity
                  : ""
                : d.opacityExit !== void 0
                ? d.opacityExit
                : 0);
      for (const y in ho) {
        if (d[y] === void 0) continue;
        const { correct: x, applyTo: p } = ho[y],
          h = u.transform === "none" ? d[y] : x(d[y], f);
        if (p) {
          const m = p.length;
          for (let w = 0; w < m; w++) u[p[w]] = h;
        } else u[y] = h;
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents =
            f === this
              ? Ii(s == null ? void 0 : s.pointerEvents) || ""
              : "none"),
        u
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((s) => {
        var l;
        return (l = s.currentAnimation) === null || l === void 0
          ? void 0
          : l.stop();
      }),
        this.root.nodes.forEach(kf),
        this.root.sharedNodes.clear();
    }
  };
}
function Lw(e) {
  e.updateLayout();
}
function _w(e) {
  var t;
  const n =
    ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
    e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout,
      { animationType: o } = e.options,
      s = n.source !== e.layout.source;
    o === "size"
      ? Ne((f) => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            g = Ve(d);
          (d.min = r[f].min), (d.max = d.min + g);
        })
      : vm(o, n.layoutBox, r) &&
        Ne((f) => {
          const d = s ? n.measuredBox[f] : n.layoutBox[f],
            g = Ve(r[f]);
          (d.max = d.min + g),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[f].max = e.relativeTarget[f].min + g));
        });
    const l = Cn();
    kr(l, r, n.layoutBox);
    const a = Cn();
    s ? kr(a, e.applyTransform(i, !0), n.measuredBox) : kr(a, r, n.layoutBox);
    const u = !pm(l);
    let c = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const { snapshot: d, layout: g } = f;
        if (d && g) {
          const v = Z();
          Tr(v, n.layoutBox, d.layoutBox);
          const y = Z();
          Tr(y, r, g.layoutBox),
            mm(v, y) || (c = !0),
            f.options.layoutRoot &&
              ((e.relativeTarget = y),
              (e.relativeTargetOrigin = v),
              (e.relativeParent = f));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: n,
      delta: a,
      layoutDelta: l,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: c,
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function Nw(e) {
  fr && Qt.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function Fw(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function jw(e) {
  e.clearSnapshot();
}
function kf(e) {
  e.clearMeasurements();
}
function Ow(e) {
  e.isLayoutDirty = !1;
}
function Iw(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform();
}
function Tf(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function zw(e) {
  e.resolveTargetDelta();
}
function Bw(e) {
  e.calcProjection();
}
function Uw(e) {
  e.resetSkewAndRotation();
}
function $w(e) {
  e.removeLeadSnapshot();
}
function Cf(e, t, n) {
  (e.translate = H(t.translate, 0, n)),
    (e.scale = H(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function Ef(e, t, n, r) {
  (e.min = H(t.min, n.min, r)), (e.max = H(t.max, n.max, r));
}
function Ww(e, t, n, r) {
  Ef(e.x, t.x, n.x, r), Ef(e.y, t.y, n.y, r);
}
function Hw(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Kw = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Af = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  Mf = Af("applewebkit/") && !Af("chrome/") ? Math.round : Me;
function Df(e) {
  (e.min = Mf(e.min)), (e.max = Mf(e.max));
}
function Gw(e) {
  Df(e.x), Df(e.y);
}
function vm(e, t, n) {
  return (
    e === "position" || (e === "preserve-aspect" && !Y1(Sf(t), Sf(n), 0.2))
  );
}
function Qw(e) {
  var t;
  return (
    e !== e.root &&
    ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot)
  );
}
const Xw = ym({
    attachResizeListener: (e, t) => Gr(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Ts = { current: void 0 },
  wm = ym({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Ts.current) {
        const e = new Xw({});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (Ts.current = e);
      }
      return Ts.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  Yw = {
    pan: { Feature: fw },
    drag: { Feature: cw, ProjectionNode: wm, MeasureLayout: fm },
  };
function Vf(e, t, n) {
  const { props: r } = e;
  e.animationState &&
    r.whileHover &&
    e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    o = r[i];
  o && U.postRender(() => o(t, ti(t)));
}
class Zw extends zt {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = Zv(
        t,
        (n) => (Vf(this.node, n, "Start"), (r) => Vf(this.node, r, "End"))
      ));
  }
  unmount() {}
}
class qw extends zt {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = ei(
      Gr(this.node.current, "focus", () => this.onFocus()),
      Gr(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
function Rf(e, t, n) {
  const { props: r } = e;
  e.animationState &&
    r.whileTap &&
    e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    o = r[i];
  o && U.postRender(() => o(t, ti(t)));
}
class Jw extends zt {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = e0(
        t,
        (n) => (
          Rf(this.node, n, "Start"),
          (r, { success: i }) => Rf(this.node, r, i ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ));
  }
  unmount() {}
}
const Nl = new WeakMap(),
  Cs = new WeakMap(),
  bw = (e) => {
    const t = Nl.get(e.target);
    t && t(e);
  },
  eS = (e) => {
    e.forEach(bw);
  };
function tS({ root: e, ...t }) {
  const n = e || document;
  Cs.has(n) || Cs.set(n, {});
  const r = Cs.get(n),
    i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(eS, { root: e, ...t })), r[i];
}
function nS(e, t, n) {
  const r = tS(t);
  return (
    Nl.set(e, n),
    r.observe(e),
    () => {
      Nl.delete(e), r.unobserve(e);
    }
  );
}
const rS = { some: 0, all: 1 };
class iS extends zt {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: r, amount: i = "some", once: o } = t,
      s = {
        root: n ? n.current : void 0,
        rootMargin: r,
        threshold: typeof i == "number" ? i : rS[i],
      },
      l = (a) => {
        const { isIntersecting: u } = a;
        if (
          this.isInView === u ||
          ((this.isInView = u), o && !u && this.hasEnteredView)
        )
          return;
        u && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", u);
        const { onViewportEnter: c, onViewportLeave: f } = this.node.getProps(),
          d = u ? c : f;
        d && d(a);
      };
    return nS(this.node.current, s, l);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(oS(t, n)) && this.startObserver();
  }
  unmount() {}
}
function oS({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const sS = {
    inView: { Feature: iS },
    tap: { Feature: Jw },
    focus: { Feature: qw },
    hover: { Feature: Zw },
  },
  lS = { layout: { ProjectionNode: wm, MeasureLayout: fm } },
  Fl = { current: null },
  Sm = { current: !1 };
function aS() {
  if (((Sm.current = !0), !!Ra))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (Fl.current = e.matches);
      e.addListener(t), t();
    } else Fl.current = !1;
}
const uS = [...Kp, de, Ft],
  cS = (e) => uS.find(Hp(e)),
  Lf = new WeakMap();
function fS(e, t, n) {
  for (const r in t) {
    const i = t[r],
      o = n[r];
    if (pe(i)) e.addValue(r, i);
    else if (pe(o)) e.addValue(r, Hr(i, { owner: e }));
    else if (o !== i)
      if (e.hasValue(r)) {
        const s = e.getValue(r);
        s.liveStyle === !0 ? s.jump(i) : s.hasAnimated || s.set(i);
      } else {
        const s = e.getStaticValue(r);
        e.addValue(r, Hr(s !== void 0 ? s : i, { owner: e }));
      }
  }
  for (const r in n) t[r] === void 0 && e.removeValue(r);
  return t;
}
const _f = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class dS {
  scrapeMotionValuesFromProps(t, n, r) {
    return {};
  }
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: r,
      reducedMotionConfig: i,
      blockInitialAnimation: o,
      visualState: s,
    },
    l = {}
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = iu),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const g = tt.now();
        this.renderScheduledAt < g &&
          ((this.renderScheduledAt = g), U.render(this.render, !1, !0));
      });
    const { latestValues: a, renderState: u, onUpdate: c } = s;
    (this.onUpdate = c),
      (this.latestValues = a),
      (this.baseTarget = { ...a }),
      (this.initialValues = n.initial ? { ...a } : {}),
      (this.renderState = u),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = l),
      (this.blockInitialAnimation = !!o),
      (this.isControllingVariants = Oo(n)),
      (this.isVariantNode = bh(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const { willChange: f, ...d } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this
    );
    for (const g in d) {
      const v = d[g];
      a[g] !== void 0 && pe(v) && v.set(a[g], !1);
    }
  }
  mount(t) {
    (this.current = t),
      Lf.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      Sm.current || aS(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : Fl.current),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    Lf.delete(this.current),
      this.projection && this.projection.unmount(),
      Nt(this.notifyUpdate),
      Nt(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const t in this.events) this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const r = un.has(t),
      i = n.on("change", (l) => {
        (this.latestValues[t] = l),
          this.props.onUpdate && U.preRender(this.notifyUpdate),
          r && this.projection && (this.projection.isTransformDirty = !0);
      }),
      o = n.on("renderRequest", this.scheduleRender);
    let s;
    window.MotionCheckAppearSync &&
      (s = window.MotionCheckAppearSync(this, t, n)),
      this.valueSubscriptions.set(t, () => {
        i(), o(), s && s(), n.owner && n.stop();
      });
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in $n) {
      const n = $n[t];
      if (!n) continue;
      const { isEnabled: r, Feature: i } = n;
      if (
        (!this.features[t] &&
          i &&
          r(this.props) &&
          (this.features[t] = new i(this)),
        this.features[t])
      ) {
        const o = this.features[t];
        o.isMounted ? o.update() : (o.mount(), (o.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : Z();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n);
    for (let r = 0; r < _f.length; r++) {
      const i = _f[r];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const o = "on" + i,
        s = t[o];
      s && (this.propEventSubscriptions[i] = this.on(i, s));
    }
    (this.prevMotionValues = fS(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue(),
      this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(t),
        () => n.variantChildren.delete(t)
      );
  }
  addValue(t, n) {
    const r = this.values.get(t);
    n !== r &&
      (r && this.removeValue(t),
      this.bindToMotionValue(t, n),
      this.values.set(t, n),
      (this.latestValues[t] = n.get()));
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = Hr(n === null ? void 0 : n, { owner: this })),
        this.addValue(t, r)),
      r
    );
  }
  readValue(t, n) {
    var r;
    let i =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (r = this.getBaseTargetFromProps(this.props, t)) !== null &&
          r !== void 0
        ? r
        : this.readValueFromInstance(this.current, t, this.options);
    return (
      i != null &&
        (typeof i == "string" && ($p(i) || _p(i))
          ? (i = parseFloat(i))
          : !cS(i) && Ft.test(n) && (i = zp(t, n)),
        this.setBaseTarget(t, pe(i) ? i.get() : i)),
      pe(i) ? i.get() : i
    );
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var n;
    const { initial: r } = this.props;
    let i;
    if (typeof r == "string" || typeof r == "object") {
      const s = Ia(
        this.props,
        r,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom
      );
      s && (i = s[t]);
    }
    if (r && i !== void 0) return i;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !pe(o)
      ? o
      : this.initialValues[t] !== void 0 && i === void 0
      ? void 0
      : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Ja()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
}
class xm extends dS {
  constructor() {
    super(...arguments), (this.KeyframeResolver = Gp);
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    pe(t) &&
      (this.childSubscription = t.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function hS(e) {
  return window.getComputedStyle(e);
}
class pS extends xm {
  constructor() {
    super(...arguments), (this.type = "html"), (this.renderInstance = ap);
  }
  readValueFromInstance(t, n) {
    if (un.has(n)) {
      const r = ru(n);
      return (r && r.default) || 0;
    } else {
      const r = hS(t),
        i = (op(n) ? r.getPropertyValue(n) : r[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return um(t, n);
  }
  build(t, n, r) {
    Ua(t, n, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return Ka(t, n, r);
  }
}
class mS extends xm {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Z);
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (un.has(n)) {
      const r = ru(n);
      return (r && r.default) || 0;
    }
    return (n = up.has(n) ? n : Fa(n)), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return dp(t, n, r);
  }
  build(t, n, r) {
    $a(t, n, this.isSVGTag, r.transformTemplate);
  }
  renderInstance(t, n, r, i) {
    cp(t, n, r, i);
  }
  mount(t) {
    (this.isSVGTag = Ha(t.tagName)), super.mount(t);
  }
}
const gS = (e, t) =>
    Oa(e) ? new mS(t) : new pS(t, { allowProjection: e !== M.Fragment }),
  yS = Wv({ ...B1, ...sS, ...Yw, ...lS }, gS),
  Es = iv(yS);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var vS = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wS = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .trim(),
  ni = (e, t) => {
    const n = M.forwardRef(
      (
        {
          color: r = "currentColor",
          size: i = 24,
          strokeWidth: o = 2,
          absoluteStrokeWidth: s,
          className: l = "",
          children: a,
          ...u
        },
        c
      ) =>
        M.createElement(
          "svg",
          {
            ref: c,
            ...vS,
            width: i,
            height: i,
            stroke: r,
            strokeWidth: s ? (Number(o) * 24) / Number(i) : o,
            className: ["lucide", `lucide-${wS(e)}`, l].join(" "),
            ...u,
          },
          [
            ...t.map(([f, d]) => M.createElement(f, d)),
            ...(Array.isArray(a) ? a : [a]),
          ]
        )
    );
    return (n.displayName = `${e}`), n;
  };
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const SS = ni("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xS = ni("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const PS = ni("Volume2", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "16drj5" }],
  ["path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07", key: "ltjumu" }],
  ["path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14", key: "1kegas" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kS = ni("VolumeX", [
  ["polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", key: "16drj5" }],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }],
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const TS = ni("Wind", [
    ["path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2", key: "1k4u03" }],
    ["path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2", key: "b7d0fd" }],
    ["path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2", key: "1p5cb3" }],
  ]),
  Nf = [
    {
      name: "Box Breathing",
      icon: j.jsx(SS, { className: "w-6 h-6" }),
      inhale: 4,
      hold: 4,
      exhale: 4,
      rest: 4,
    },
    {
      name: "4-7-8 Breathing",
      icon: j.jsx(xS, { className: "w-6 h-6" }),
      inhale: 4,
      hold: 7,
      exhale: 8,
      rest: 0,
    },
    {
      name: "Resonance Breathing",
      icon: j.jsx(TS, { className: "w-6 h-6" }),
      inhale: 5,
      hold: 0,
      exhale: 5,
      rest: 0,
    },
  ],
  CS = () => {
    const [e, t] = M.useState(!1),
      [n, r] = M.useState(Nf[0]),
      [i, o] = M.useState("inhale"),
      [s, l] = M.useState(0),
      [a, u] = M.useState(!1),
      c = M.useRef(null),
      f = M.useCallback((y) => {
        const x = new SpeechSynthesisUtterance(y);
        (x.rate = 0.8), (x.pitch = 1.2), (x.volume = 0.8);
        const h = window.speechSynthesis
          .getVoices()
          .find((m) => m.name.includes("female") || m.name.includes("Female"));
        h && (x.voice = h), window.speechSynthesis.speak(x);
      }, []);
    M.useEffect(
      () => (
        (c.current = new Audio(
          "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3"
        )),
        (c.current.loop = !0),
        (c.current.volume = 0.3),
        () => {
          c.current && (c.current.pause(), (c.current = null));
        }
      ),
      []
    );
    const d = () => {
      c.current && (a ? c.current.pause() : c.current.play(), u(!a));
    };
    M.useEffect(() => {
      if (!e) {
        window.speechSynthesis.cancel();
        return;
      }
      const y = n.inhale + n.hold + n.exhale + n.rest,
        x = setInterval(() => {
          l((p) => {
            const h = p + 1;
            return h >= y ? 0 : h;
          });
        }, 1e3);
      return () => {
        clearInterval(x), window.speechSynthesis.cancel();
      };
    }, [e, n]),
      M.useEffect(() => {
        if (!e) return;
        const { inhale: y, hold: x, exhale: p } = n;
        s < y
          ? (o("inhale"), s === 0 && f("Breathe in deeply"))
          : s < y + x
          ? (o("hold"), s === y && f("Hold your breath"))
          : s < y + x + p
          ? (o("exhale"), s === y + x && f("Release and breathe out"))
          : (o("rest"), s === y + x + p && f("Rest and relax"));
      }, [s, n, e, f]);
    const g = () => {
        switch (i) {
          case "inhale":
            return "Breathe In";
          case "hold":
            return "Hold";
          case "exhale":
            return "Breathe Out";
          case "rest":
            return "Rest";
        }
      },
      v = {
        initial: { scale: 1 },
        inhale: {
          scale: 1.3,
          transition: { duration: n.inhale, ease: "easeInOut" },
        },
        hold: { scale: 1.3, transition: { duration: n.hold } },
        exhale: {
          scale: 1,
          transition: { duration: n.exhale, ease: "easeInOut" },
        },
        rest: { scale: 1, transition: { duration: n.rest } },
      };
    return j.jsxs("div", {
      className: "flex flex-col items-center justify-center gap-12",
      children: [
        j.jsx("div", {
          className: "flex flex-wrap justify-center gap-4 mb-8",
          children: Nf.map((y) =>
            j.jsxs(
              "button",
              {
                onClick: () => {
                  r(y),
                    l(0),
                    o("inhale"),
                    e && (t(!1), setTimeout(() => t(!0), 100));
                },
                className: `px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  n.name === y.name
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`,
                children: [y.icon, j.jsx("span", { children: y.name })],
              },
              y.name
            )
          ),
        }),
        j.jsx("div", {
          className:
            "relative w-[320px] h-[320px] flex items-center justify-center",
          children: j.jsx(Es.div, {
            initial: "initial",
            animate: e ? i : "initial",
            variants: v,
            className:
              "w-72 h-72 bg-indigo-100 rounded-full flex items-center justify-center absolute",
            children: j.jsx(Es.div, {
              initial: "initial",
              animate: e ? i : "initial",
              variants: v,
              className:
                "w-56 h-56 bg-indigo-200 rounded-full flex items-center justify-center",
              children: j.jsx(Es.div, {
                initial: "initial",
                animate: e ? i : "initial",
                variants: v,
                className:
                  "w-40 h-40 bg-indigo-300 rounded-full flex items-center justify-center",
                children: j.jsx("span", {
                  className: "text-2xl font-medium text-indigo-900 text-center",
                  children: g(),
                }),
              }),
            }),
          }),
        }),
        j.jsxs("div", {
          className: "flex flex-col gap-4 items-center",
          children: [
            j.jsxs("button", {
              onClick: d,
              className:
                "px-4 py-2 rounded-lg flex items-center space-x-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors",
              children: [
                a
                  ? j.jsx(kS, { className: "w-5 h-5" })
                  : j.jsx(PS, { className: "w-5 h-5" }),
                j.jsx("span", { children: a ? "Mute Music" : "Play Music" }),
              ],
            }),
            j.jsx("button", {
              onClick: () => {
                t(!e), l(0), o("inhale");
              },
              className: `px-8 py-4 rounded-lg text-lg font-medium transition-colors ${
                e
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`,
              children: e ? "Stop" : "Start",
            }),
          ],
        }),
      ],
    });
  };
function ES() {
  return j.jsxs("div", {
    className:
      "h-screen w-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-between p-8",
    children: [
      j.jsx("h1", {
        className: "text-4xl font-bold text-indigo-900",
        children: "Mindful Breathing",
      }),
      j.jsx("div", {
        className: "flex-1 flex items-center justify-center w-full",
        children: j.jsx("div", {
          className: "bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-xl",
          children: j.jsx(CS, {}),
        }),
      }),
      j.jsx("p", {
        className: "text-indigo-700 max-w-md text-center",
        children:
          "Take a moment to breathe and find your center. Choose a breathing pattern and follow the visual guide.",
      }),
    ],
  });
}
Qh(document.getElementById("root")).render(
  j.jsx(M.StrictMode, { children: j.jsx(ES, {}) })
);
