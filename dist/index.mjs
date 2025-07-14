const vt = "finalize", Ot = "consider";
function te(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(vt, {
      detail: { items: t, info: n }
    })
  );
}
function V(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(Ot, {
      detail: { items: t, info: n }
    })
  );
}
const Oe = "draggedEntered", fe = "draggedLeft", Ae = "draggedOverIndex", ze = "draggedLeftDocument", Ee = {
  LEFT_FOR_ANOTHER: "leftForAnother",
  OUTSIDE_OF_ANY: "outsideOfAny"
};
function At(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(Oe, {
      detail: { indexObj: t, draggedEl: n }
    })
  );
}
function _t(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(fe, {
      detail: { draggedEl: t, type: Ee.LEFT_FOR_ANOTHER, theOtherDz: n }
    })
  );
}
function It(e, t) {
  e.dispatchEvent(
    new CustomEvent(fe, {
      detail: { draggedEl: t, type: Ee.OUTSIDE_OF_ANY }
    })
  );
}
function xt(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(Ae, {
      detail: { indexObj: t, draggedEl: n }
    })
  );
}
function Rt(e) {
  window.dispatchEvent(
    new CustomEvent(ze, {
      detail: { draggedEl: e }
    })
  );
}
const I = {
  DRAG_STARTED: "dragStarted",
  DRAGGED_ENTERED: Oe,
  DRAGGED_ENTERED_ANOTHER: "dragEnteredAnother",
  DRAGGED_OVER_INDEX: Ae,
  DRAGGED_LEFT: fe,
  DRAGGED_LEFT_ALL: "draggedLeftAll",
  DROPPED_INTO_ZONE: "droppedIntoZone",
  DROPPED_INTO_ANOTHER: "droppedIntoAnother",
  DROPPED_OUTSIDE_OF_ANY: "droppedOutsideOfAny",
  DRAG_STOPPED: "dragStopped"
}, x = {
  POINTER: "pointer",
  KEYBOARD: "keyboard"
}, le = "isDndShadowItem", _e = "data-is-dnd-shadow-item-internal", St = "data-is-dnd-shadow-item-hint", Nt = "id:dnd-shadow-placeholder-0000", Lt = "dnd-action-dragged-el", Ct = "dndPermanentId";
let R = "id", De = 0;
function nt() {
  De++;
}
function rt() {
  if (De === 0)
    throw new Error("Bug! trying to decrement when there are no dropzones");
  De--;
}
function xn(e) {
  if (De > 0)
    throw new Error("can only override the id key before initialising any dndzone");
  if (typeof e != "string")
    throw new Error("item id key has to be a string");
  u(() => ["overriding item id key name", e]), R = e;
}
const Ge = typeof window > "u";
let u = () => {
};
function Rn(e) {
  e ? u = (t, n = console.debug) => {
    const r = t();
    Array.isArray(r) ? n(...r) : n(r);
  } : u = () => {
  };
}
function Ce(e, t = !0) {
  let n;
  const r = t ? $t(e) : e.getBoundingClientRect(), i = getComputedStyle(e), o = i.transform;
  if (o) {
    let a, s, c, g;
    if (o.startsWith("matrix3d("))
      n = o.slice(9, -1).split(/, /), a = +n[0], s = +n[5], c = +n[12], g = +n[13];
    else if (o.startsWith("matrix("))
      n = o.slice(7, -1).split(/, /), a = +n[0], s = +n[3], c = +n[4], g = +n[5];
    else
      return r;
    const l = i.transformOrigin, m = r.x - c - (1 - a) * parseFloat(l), d = r.y - g - (1 - s) * parseFloat(l.slice(l.indexOf(" ") + 1)), f = a ? r.width / a : e.offsetWidth, h = s ? r.height / s : e.offsetHeight;
    return {
      x: m,
      y: d,
      width: f,
      height: h,
      top: d,
      right: m + f,
      bottom: d + h,
      left: m
    };
  } else
    return r;
}
function it(e) {
  const t = Ce(e);
  return {
    top: t.top + window.scrollY,
    bottom: t.bottom + window.scrollY,
    left: t.left + window.scrollX,
    right: t.right + window.scrollX
  };
}
function ot(e) {
  const t = e.getBoundingClientRect();
  return {
    top: t.top + window.scrollY,
    bottom: t.bottom + window.scrollY,
    left: t.left + window.scrollX,
    right: t.right + window.scrollX
  };
}
function st(e) {
  return {
    x: (e.left + e.right) / 2,
    y: (e.top + e.bottom) / 2
  };
}
function Mt(e, t) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function Ie(e, t) {
  return e.y <= t.bottom && e.y >= t.top && e.x >= t.left && e.x <= t.right;
}
function ce(e) {
  return st(ot(e));
}
function He(e, t) {
  const n = ce(e), r = it(t);
  return Ie(n, r);
}
function Pt(e, t) {
  const n = ce(e), r = ce(t);
  return Mt(n, r);
}
function Ft(e) {
  const t = ot(e);
  return t.right < 0 || t.left > document.documentElement.scrollWidth || t.bottom < 0 || t.top > document.documentElement.scrollHeight;
}
function $t(e) {
  let t = e.getBoundingClientRect(), n = {
    top: t.top,
    bottom: t.bottom,
    left: t.left,
    right: t.right
  }, r = e.parentElement;
  for (; r && r !== document.body; ) {
    let i = r.getBoundingClientRect();
    const o = window.getComputedStyle(r).overflowY, a = window.getComputedStyle(r).overflowX, s = o === "scroll" || o === "auto", c = a === "scroll" || a === "auto";
    s && (n.top = Math.max(n.top, i.top), n.bottom = Math.min(n.bottom, i.bottom)), c && (n.left = Math.max(n.left, i.left), n.right = Math.min(n.right, i.right)), r = r.parentElement;
  }
  return n.top = Math.max(n.top, 0), n.bottom = Math.min(n.bottom, window.innerHeight), n.left = Math.max(n.left, 0), n.right = Math.min(n.right, window.innerWidth), {
    top: n.top,
    bottom: n.bottom,
    left: n.left,
    right: n.right,
    width: Math.max(0, n.right - n.left),
    height: Math.max(0, n.bottom - n.top)
  };
}
let J;
function Be() {
  u(() => "resetting indexes cache"), J = /* @__PURE__ */ new Map();
}
Be();
function kt(e) {
  const t = Array.from(e.children).findIndex((n) => n.getAttribute(_e));
  if (t >= 0)
    return J.has(e) || J.set(e, /* @__PURE__ */ new Map()), J.get(e).set(t, it(e.children[t])), t;
}
function zt(e, t) {
  if (!He(e, t))
    return null;
  const n = t.children;
  if (n.length === 0)
    return { index: 0, isProximityBased: !0 };
  const r = kt(t);
  for (let a = 0; a < n.length; a++)
    if (He(e, n[a])) {
      const s = J.has(t) && J.get(t).get(a);
      return s && !Ie(ce(e), s) ? { index: r, isProximityBased: !1 } : { index: a, isProximityBased: !1 };
    }
  let i = Number.MAX_VALUE, o;
  for (let a = 0; a < n.length; a++) {
    const s = Pt(e, n[a]);
    s < i && (i = s, o = a);
  }
  return { index: o, isProximityBased: !0 };
}
function k(e) {
  return JSON.stringify(e, null, 2);
}
function ye(e) {
  if (!e)
    throw new Error("cannot get depth of a falsy node");
  return at(e, 0);
}
function at(e, t = 0) {
  return e.parentElement ? at(e.parentElement, t + 1) : t - 1;
}
function Gt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!{}.hasOwnProperty.call(t, n) || t[n] !== e[n])
      return !1;
  return !0;
}
function Bt(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
const Zt = 200, We = 10;
let Me;
function Ut(e, t, n = Zt, r) {
  let i, o, a = !1, s;
  const c = Array.from(t).sort((l, m) => ye(m) - ye(l));
  function g() {
    const l = ce(e), m = r.multiScrollIfNeeded();
    if (!m && s && Math.abs(s.x - l.x) < We && Math.abs(s.y - l.y) < We) {
      Me = window.setTimeout(g, n);
      return;
    }
    if (Ft(e)) {
      u(() => "off document"), Rt(e);
      return;
    }
    s = l;
    let d = !1;
    for (const f of c) {
      m && Be();
      const h = zt(e, f);
      if (h === null)
        continue;
      const { index: L } = h;
      d = !0, f !== i ? (i && _t(i, e, f), At(f, h, e), i = f) : L !== o && (xt(f, h, e), o = L);
      break;
    }
    !d && a && i ? (It(i, e), i = void 0, o = void 0, a = !1) : a = !0, Me = window.setTimeout(g, n);
  }
  g();
}
function Ht() {
  u(() => "unobserving"), clearTimeout(Me), Be();
}
const oe = 30;
function Wt() {
  let e;
  function t() {
    e = { directionObj: void 0, stepPx: 0 };
  }
  t();
  function n(o) {
    const { directionObj: a, stepPx: s } = e;
    a && (o.scrollBy(a.x * s, a.y * s), window.requestAnimationFrame(() => n(o)));
  }
  function r(o) {
    return oe - o;
  }
  function i(o, a) {
    if (!a)
      return !1;
    const s = Yt(o, a), c = !!e.directionObj;
    if (s === null)
      return c && t(), !1;
    let [g, l] = [!1, !1];
    return a.scrollHeight > a.clientHeight && (s.bottom < oe ? (g = !0, e.directionObj = { x: 0, y: 1 }, e.stepPx = r(s.bottom)) : s.top < oe && (g = !0, e.directionObj = { x: 0, y: -1 }, e.stepPx = r(s.top)), !c && g) || a.scrollWidth > a.clientWidth && (s.right < oe ? (l = !0, e.directionObj = { x: 1, y: 0 }, e.stepPx = r(s.right)) : s.left < oe && (l = !0, e.directionObj = { x: -1, y: 0 }, e.stepPx = r(s.left)), !c && l) ? (n(a), !0) : (t(), !1);
  }
  return {
    scrollIfNeeded: i,
    resetScrolling: t
  };
}
function Yt(e, t) {
  const n = t === document.scrollingElement ? {
    top: 0,
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth
  } : t.getBoundingClientRect();
  return Ie(e, n) ? {
    top: e.y - n.top,
    bottom: n.bottom - e.y,
    left: e.x - n.left,
    right: n.right - e.x
  } : null;
}
function Vt(e = [], t) {
  u(() => "creating multi-scroller");
  const n = Xt(e), r = Array.from(n).sort((s, c) => ye(c) - ye(s)), { scrollIfNeeded: i, resetScrolling: o } = Wt();
  function a() {
    const s = t();
    if (!s || !r)
      return !1;
    const c = r.filter(
      (g) => Ie(s, g.getBoundingClientRect()) || g === document.scrollingElement
    );
    for (let g = 0; g < c.length; g++)
      if (i(s, c[g]))
        return !0;
    return !1;
  }
  return {
    multiScrollIfNeeded: n.size > 0 ? a : () => !1,
    destroy: () => o()
  };
}
function jt(e) {
  if (!e)
    return [];
  const t = [];
  let n = e;
  for (; n; ) {
    const { overflow: r } = window.getComputedStyle(n);
    r.split(" ").some((i) => i.includes("auto") || i.includes("scroll")) && t.push(n), n = n.parentElement;
  }
  return t;
}
function Xt(e) {
  const t = /* @__PURE__ */ new Set();
  for (let n of e)
    jt(n).forEach((r) => t.add(r));
  return (document.scrollingElement.scrollHeight > document.scrollingElement.clientHeight || document.scrollingElement.scrollWidth > document.scrollingElement.clientHeight) && t.add(document.scrollingElement), t;
}
function Kt(e) {
  const t = e.cloneNode(!0), n = [], r = e.tagName === "SELECT", i = r ? [e] : [...e.querySelectorAll("select")];
  for (const s of i)
    n.push(s.value);
  if (i.length > 0) {
    const s = r ? [t] : [...t.querySelectorAll("select")];
    for (let c = 0; c < s.length; c++) {
      const g = s[c], l = n[c], m = g.querySelector(`option[value="${l}"`);
      m && m.setAttribute("selected", !0);
    }
  }
  const o = e.tagName === "CANVAS", a = o ? [e] : [...e.querySelectorAll("canvas")];
  if (a.length > 0) {
    const s = o ? [t] : [...t.querySelectorAll("canvas")];
    for (let c = 0; c < s.length; c++) {
      const g = a[c], l = s[c];
      l.width = g.width, l.height = g.height, g.width > 0 && g.height > 0 && l.getContext("2d").drawImage(g, 0, 0);
    }
  }
  return t;
}
const q = Object.freeze({
  // This flag exists as a workaround for issue 454 (basically a browser bug) - seems like these rect values take time to update when in grid layout. Setting it to true can cause strange behaviour in the REPL for non-grid zones, see issue 470
  USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT: "USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT"
}), dt = {
  [q.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT]: !1
};
function Sn(e, t) {
  if (!q[e])
    throw new Error(`Can't set non existing feature flag ${e}! Supported flags: ${Object.keys(q)}`);
  dt[e] = !!t;
}
function lt(e) {
  if (!q[e])
    throw new Error(`Can't get non existing feature flag ${e}! Supported flags: ${Object.keys(q)}`);
  return dt[e];
}
const qt = 0.2;
function j(e) {
  return `${e} ${qt}s ease`;
}
function Jt(e, t) {
  const n = e.getBoundingClientRect(), r = Kt(e);
  ct(e, r), r.id = Lt, r.style.position = "fixed";
  let i = n.top, o = n.left;
  if (r.style.top = `${i}px`, r.style.left = `${o}px`, t) {
    const a = st(n);
    i -= a.y - t.y, o -= a.x - t.x, window.setTimeout(() => {
      r.style.top = `${i}px`, r.style.left = `${o}px`;
    }, 0);
  }
  return r.style.margin = "0", r.style.boxSizing = "border-box", r.style.height = `${n.height}px`, r.style.width = `${n.width}px`, r.style.transition = `${j("top")}, ${j("left")}, ${j("background-color")}, ${j("opacity")}, ${j("color")} `, window.setTimeout(() => r.style.transition += `, ${j("width")}, ${j("height")}`, 0), r.style.zIndex = "9999", r.style.cursor = "grabbing", r;
}
function Qt(e) {
  e.style.cursor = "grab";
}
function en(e, t, n, r) {
  ct(t, e);
  const i = t.getBoundingClientRect(), o = e.getBoundingClientRect(), a = i.width - o.width, s = i.height - o.height;
  if (a || s) {
    const c = {
      left: (n - o.left) / o.width,
      top: (r - o.top) / o.height
    };
    lt(q.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT) || (e.style.height = `${i.height}px`, e.style.width = `${i.width}px`), e.style.left = `${parseFloat(e.style.left) - c.left * a}px`, e.style.top = `${parseFloat(e.style.top) - c.top * s}px`;
  }
}
function ct(e, t) {
  const n = window.getComputedStyle(e);
  Array.from(n).filter(
    (r) => r.startsWith("background") || r.startsWith("padding") || r.startsWith("font") || r.startsWith("text") || r.startsWith("align") || r.startsWith("justify") || r.startsWith("display") || r.startsWith("flex") || r.startsWith("border") || r === "opacity" || r === "color" || r === "list-style-type" || // copying with and height to make up for rect update timing issues in some browsers
    lt(q.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT) && (r === "width" || r === "height")
  ).forEach((r) => t.style.setProperty(r, n.getPropertyValue(r), n.getPropertyPriority(r)));
}
function tn(e, t) {
  e.draggable = !1, e.ondragstart = () => !1, t ? (e.style.userSelect = "", e.style.WebkitUserSelect = "", e.style.cursor = "") : (e.style.userSelect = "none", e.style.WebkitUserSelect = "none", e.style.cursor = "grab");
}
function ut(e) {
  e.style.display = "none", e.style.position = "fixed", e.style.zIndex = "-5";
}
function nn(e) {
  e.style.visibility = "hidden", e.setAttribute(_e, "true");
}
function rn(e) {
  e.style.visibility = "", e.removeAttribute(_e);
}
function pe(e, t = () => {
}, n = () => []) {
  e.forEach((r) => {
    const i = t(r);
    Object.keys(i).forEach((o) => {
      r.style[o] = i[o];
    }), n(r).forEach((o) => r.classList.add(o));
  });
}
function we(e, t = () => {
}, n = () => []) {
  e.forEach((r) => {
    const i = t(r);
    Object.keys(i).forEach((o) => {
      r.style[o] = "";
    }), n(r).forEach((o) => r.classList.contains(o) && r.classList.remove(o));
  });
}
function on(e) {
  const t = e.style.minHeight;
  e.style.minHeight = window.getComputedStyle(e).getPropertyValue("height");
  const n = e.style.minWidth;
  return e.style.minWidth = window.getComputedStyle(e).getPropertyValue("width"), function() {
    e.style.minHeight = t, e.style.minWidth = n;
  };
}
const sn = "--any--", an = 100, dn = 20, me = 3, ln = 80, Ye = {
  outline: "rgba(255, 255, 102, 0.7) solid 2px"
}, Ve = "data-is-dnd-original-dragged-item";
let O, T, M, xe, p, Re, ne, w, Z, A, W = !1, Ze = !1, Ue, ge = !1, se = [], de, U, ae = !1;
const G = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Map(), Le = /* @__PURE__ */ new WeakMap();
function cn(e, t) {
  u(() => "registering drop-zone if absent"), G.has(t) || G.set(t, /* @__PURE__ */ new Set()), G.get(t).has(e) || (G.get(t).add(e), nt());
}
function je(e, t) {
  G.get(t).delete(e), rt(), G.get(t).size === 0 && G.delete(t);
}
function un() {
  u(() => "watching dragged element");
  const e = G.get(xe);
  for (const r of e)
    r.addEventListener(Oe, ft), r.addEventListener(fe, gt), r.addEventListener(Ae, ht);
  window.addEventListener(ze, re);
  const t = Math.max(...Array.from(e.keys()).map((r) => D.get(r).dropAnimationDurationMs)), n = t === 0 ? dn : Math.max(t, an);
  de = Vt(e, () => A), Ut(T, e, n * 1.07, de);
}
function fn() {
  u(() => "unwatching dragged element");
  const e = G.get(xe);
  for (const t of e)
    t.removeEventListener(Oe, ft), t.removeEventListener(fe, gt), t.removeEventListener(Ae, ht);
  window.removeEventListener(ze, re), de && (de.destroy(), de = void 0), Ht();
}
function Se(e) {
  return e.findIndex((t) => !!t[le]);
}
function gn(e) {
  return {
    ...e,
    [le]: !0,
    [R]: Nt,
    [Ct]: e[R]
  };
}
function ft(e) {
  u(() => ["dragged entered", e.currentTarget, e.detail]);
  let { items: t, dropFromOthersDisabled: n } = D.get(e.currentTarget);
  if (n && e.currentTarget !== p) {
    u(() => "ignoring dragged entered because drop is currently disabled");
    return;
  }
  if (ge = !1, t = t.filter((a) => !a[le]), u(() => `dragged entered items ${k(t)}`), p !== e.currentTarget) {
    const s = D.get(p).items.filter((c) => !c[le]);
    V(p, s, {
      trigger: I.DRAGGED_ENTERED_ANOTHER,
      id: M[R],
      source: x.POINTER
    });
  }
  const { index: r, isProximityBased: i } = e.detail.indexObj, o = i && r === e.currentTarget.children.length - 1 ? r + 1 : r;
  w = e.currentTarget, t.splice(o, 0, ne), V(e.currentTarget, t, { trigger: I.DRAGGED_ENTERED, id: M[R], source: x.POINTER });
}
function gt(e) {
  if (!W) return;
  u(() => ["dragged left", e.currentTarget, e.detail]);
  const { items: t, dropFromOthersDisabled: n } = D.get(e.currentTarget);
  if (n && e.currentTarget !== p && e.currentTarget !== w) {
    u(() => "drop is currently disabled");
    return;
  }
  const r = [...t], i = Se(r);
  i !== -1 && r.splice(i, 1);
  const o = w;
  w = void 0;
  const { type: a, theOtherDz: s } = e.detail;
  if (a === Ee.OUTSIDE_OF_ANY || a === Ee.LEFT_FOR_ANOTHER && s !== p && D.get(s).dropFromOthersDisabled) {
    u(() => "dragged left all, putting shadow element back in the origin dz"), ge = !0, w = p;
    const c = o === p ? r : [...D.get(p).items];
    c.splice(Re, 0, ne), V(p, c, {
      trigger: I.DRAGGED_LEFT_ALL,
      id: M[R],
      source: x.POINTER
    });
  }
  V(e.currentTarget, r, {
    trigger: I.DRAGGED_LEFT,
    id: M[R],
    source: x.POINTER
  });
}
function ht(e) {
  u(() => ["dragged is over index", e.currentTarget, e.detail]);
  const { items: t, dropFromOthersDisabled: n } = D.get(e.currentTarget);
  if (n && e.currentTarget !== p) {
    u(() => "drop is currently disabled");
    return;
  }
  const r = [...t];
  ge = !1;
  const { index: i } = e.detail.indexObj, o = Se(r);
  o !== -1 && r.splice(o, 1), r.splice(i, 0, ne), V(e.currentTarget, r, { trigger: I.DRAGGED_OVER_INDEX, id: M[R], source: x.POINTER });
}
function Te(e) {
  e.preventDefault();
  const t = e.touches ? e.touches[0] : e;
  A = { x: t.clientX, y: t.clientY }, T.style.transform = `translate3d(${A.x - Z.x}px, ${A.y - Z.y}px, 0)`;
}
function re() {
  u(() => "dropped"), Ze = !0, window.removeEventListener("mousemove", Te), window.removeEventListener("touchmove", Te), window.removeEventListener("mouseup", re), window.removeEventListener("touchend", re), fn(), Qt(T), w || (u(() => "element was dropped right after it left origin but before entering somewhere else"), w = p), u(() => ["dropped in dz", w]);
  let { items: e, type: t } = D.get(w);
  we(
    G.get(t),
    (i) => D.get(i).dropTargetStyle,
    (i) => D.get(i).dropTargetClasses
  );
  let n = Se(e);
  n === -1 && w === p && (n = Re), e = e.map((i) => i[le] ? M : i);
  function r() {
    Ue(), te(w, e, {
      trigger: ge ? I.DROPPED_OUTSIDE_OF_ANY : I.DROPPED_INTO_ZONE,
      id: M[R],
      source: x.POINTER
    }), w !== p && te(p, D.get(p).items, {
      trigger: I.DROPPED_INTO_ANOTHER,
      id: M[R],
      source: x.POINTER
    });
    const i = Array.from(w.children).find((o) => o.getAttribute(_e));
    i && rn(i), pn();
  }
  D.get(w).dropAnimationDisabled ? r() : hn(n, r);
}
function hn(e, t) {
  const n = e > -1 ? Ce(w.children[e], !1) : Ce(w, !1), r = {
    x: n.left - parseFloat(T.style.left),
    y: n.top - parseFloat(T.style.top)
  }, { dropAnimationDurationMs: i } = D.get(w), o = `transform ${i}ms ease`;
  T.style.transition = T.style.transition ? T.style.transition + "," + o : o, T.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`, window.setTimeout(t, i);
}
function mn(e, t) {
  se.push({ dz: e, destroy: t }), window.requestAnimationFrame(() => {
    ut(e), document.body.appendChild(e);
  });
}
function pn() {
  T && T.remove && T.remove(), O && O.remove && O.remove(), T = void 0, O = void 0, M = void 0, xe = void 0, p = void 0, Re = void 0, ne = void 0, w = void 0, Z = void 0, A = void 0, W = !1, Ze = !1, Ue = void 0, ge = !1, U && clearTimeout(U), U = void 0, ae = !1, se.length && (u(() => ["will destroy zones that were removed during drag", se]), se.forEach(({ dz: e, destroy: t }) => {
    t(), e.remove();
  }), se = []);
}
function En(e, t) {
  let n = !1;
  const r = {
    items: void 0,
    type: void 0,
    flipDurationMs: 0,
    dragDisabled: !1,
    morphDisabled: !1,
    dropFromOthersDisabled: !1,
    dropTargetStyle: Ye,
    dropTargetClasses: [],
    transformDraggedElement: () => {
    },
    centreDraggedOnCursor: !1,
    dropAnimationDisabled: !1,
    delayTouchStartMs: 0
  };
  u(() => [`dndzone good to go options: ${k(t)}, config: ${k(r)}`, { node: e }]);
  let i = /* @__PURE__ */ new Map();
  function o() {
    window.addEventListener("mousemove", c, { passive: !1 }), window.addEventListener("touchmove", c, { passive: !1, capture: !1 }), window.addEventListener("mouseup", s, { passive: !1 }), window.addEventListener("touchend", s, { passive: !1 });
  }
  function a() {
    window.removeEventListener("mousemove", c), window.removeEventListener("touchmove", c), window.removeEventListener("mouseup", s), window.removeEventListener("touchend", s), U && (clearTimeout(U), U = void 0, ae = !1);
  }
  function s(d) {
    if (a(), O = void 0, Z = void 0, A = void 0, d.type === "touchend") {
      const f = new Event("click", {
        bubbles: !0,
        cancelable: !0
      });
      d.target.dispatchEvent(f);
    }
  }
  function c(d) {
    const f = !!d.touches, h = f ? d.touches[0] : d;
    if (f && r.delayTouchStartMs > 0 && !ae) {
      A = { x: h.clientX, y: h.clientY }, (Math.abs(A.x - Z.x) >= me || Math.abs(A.y - Z.y) >= me) && (U && (clearTimeout(U), U = void 0), s(d));
      return;
    }
    d.preventDefault(), A = { x: h.clientX, y: h.clientY }, (Math.abs(A.x - Z.x) >= me || Math.abs(A.y - Z.y) >= me) && (a(), l());
  }
  function g(d) {
    if (d.target !== d.currentTarget && (d.target.value !== void 0 || d.target.isContentEditable)) {
      u(() => "won't initiate drag on a nested input element");
      return;
    }
    if (d.button) {
      u(() => `ignoring none left click button: ${d.button}`);
      return;
    }
    if (W) {
      u(() => "cannot start a new drag before finalizing previous one");
      return;
    }
    const f = !!d.touches, h = f && r.delayTouchStartMs > 0;
    h || d.preventDefault(), d.stopPropagation();
    const L = f ? d.touches[0] : d;
    Z = { x: L.clientX, y: L.clientY }, A = { ...Z }, O = d.currentTarget, h && (ae = !1, U = window.setTimeout(() => {
      O && (ae = !0, a(), l());
    }, r.delayTouchStartMs)), o();
  }
  function l() {
    u(() => [`drag start config: ${k(r)}`, O]), W = !0;
    const d = i.get(O);
    Re = d, p = O.parentElement;
    const f = p.closest("dialog") || p.closest("[popover]") || p.getRootNode(), h = f.body || f, { items: L, type: H, centreDraggedOnCursor: B } = r, S = [...L];
    M = S[d], xe = H, ne = gn(M), T = Jt(O, B && A), h.appendChild(T);
    function N() {
      if (!O) {
        u(() => "originalDragTarget became undefined, aborting keepOriginalElementInDom");
        return;
      }
      O.parentElement ? window.requestAnimationFrame(N) : (O.setAttribute(Ve, !0), h.appendChild(O), un(), ut(O), T.focus());
    }
    window.requestAnimationFrame(N), pe(
      Array.from(G.get(r.type)).filter((E) => E === p || !D.get(E).dropFromOthersDisabled),
      (E) => D.get(E).dropTargetStyle,
      (E) => D.get(E).dropTargetClasses
    ), S.splice(d, 1, ne), Ue = on(p), V(p, S, { trigger: I.DRAG_STARTED, id: M[R], source: x.POINTER }), window.addEventListener("mousemove", Te, { passive: !1 }), window.addEventListener("touchmove", Te, { passive: !1, capture: !1 }), window.addEventListener("mouseup", re, { passive: !1 }), window.addEventListener("touchend", re, { passive: !1 });
  }
  function m({
    items: d = void 0,
    flipDurationMs: f = 0,
    type: h = sn,
    dragDisabled: L = !1,
    morphDisabled: H = !1,
    dropFromOthersDisabled: B = !1,
    dropTargetStyle: S = Ye,
    dropTargetClasses: N = [],
    transformDraggedElement: E = () => {
    },
    centreDraggedOnCursor: wt = !1,
    dropAnimationDisabled: Tt = !1,
    delayTouchStart: ie = !1
  }) {
    r.dropAnimationDurationMs = f;
    let Ne = 0;
    ie === !0 ? Ne = ln : typeof ie == "number" && isFinite(ie) && ie >= 0 && (Ne = ie), r.delayTouchStartMs = Ne, r.type && h !== r.type && je(e, r.type), r.type = h, r.items = [...d], r.dragDisabled = L, r.morphDisabled = H, r.transformDraggedElement = E, r.centreDraggedOnCursor = wt, r.dropAnimationDisabled = Tt, n && W && !Ze && (!Gt(S, r.dropTargetStyle) || !Bt(N, r.dropTargetClasses)) && (we(
      [e],
      () => r.dropTargetStyle,
      () => N
    ), pe(
      [e],
      () => S,
      () => N
    )), r.dropTargetStyle = S, r.dropTargetClasses = [...N];
    function he(b, C) {
      return D.get(b) ? D.get(b)[C] : r[C];
    }
    n && W && r.dropFromOthersDisabled !== B && (B ? we(
      [e],
      (b) => he(b, "dropTargetStyle"),
      (b) => he(b, "dropTargetClasses")
    ) : pe(
      [e],
      (b) => he(b, "dropTargetStyle"),
      (b) => he(b, "dropTargetClasses")
    )), r.dropFromOthersDisabled = B, D.set(e, r), cn(e, h);
    const bt = W ? Se(r.items) : -1;
    for (let b = 0; b < e.children.length; b++) {
      const C = e.children[b];
      if (tn(C, L), b === bt) {
        H || en(T, C, A.x, A.y), r.transformDraggedElement(T, M, b), nn(C);
        continue;
      }
      C.removeEventListener("mousedown", Le.get(C)), C.removeEventListener("touchstart", Le.get(C)), L || (C.addEventListener("mousedown", g), C.addEventListener("touchstart", g), Le.set(C, g)), i.set(C, b), n || (n = !0);
    }
  }
  return m(t), {
    update: (d) => {
      u(() => `pointer dndzone will update newOptions: ${k(d)}`), m(d);
    },
    destroy: () => {
      function d() {
        u(() => "pointer dndzone will destroy"), je(e, D.get(e).type), D.delete(e);
      }
      W && !e.closest(`[${Ve}]`) ? (u(() => "pointer dndzone will be scheduled for destruction"), mn(e, d)) : d();
    }
  };
}
const Pe = {
  DND_ZONE_ACTIVE: "dnd-zone-active",
  DND_ZONE_DRAG_DISABLED: "dnd-zone-drag-disabled"
}, mt = {
  [Pe.DND_ZONE_ACTIVE]: "Tab to one the items and press space-bar or enter to start dragging it",
  [Pe.DND_ZONE_DRAG_DISABLED]: "This is a disabled drag and drop list"
}, Dn = "dnd-action-aria-alert";
let y;
function Fe() {
  y || (y = document.createElement("div"), function() {
    y.id = Dn, y.style.position = "fixed", y.style.bottom = "0", y.style.left = "0", y.style.zIndex = "-5", y.style.opacity = "0", y.style.height = "0", y.style.width = "0", y.setAttribute("role", "alert");
  }(), document.body.prepend(y), Object.entries(mt).forEach(([e, t]) => document.body.prepend(Tn(e, t))));
}
function yn() {
  return Ge ? null : (document.readyState === "complete" ? Fe() : window.addEventListener("DOMContentLoaded", Fe), { ...Pe });
}
function wn() {
  Ge || !y || (Object.keys(mt).forEach((e) => document.getElementById(e)?.remove()), y.remove(), y = void 0);
}
function Tn(e, t) {
  const n = document.createElement("div");
  return n.id = e, n.innerHTML = `<p>${t}</p>`, n.style.display = "none", n.style.position = "fixed", n.style.zIndex = "-5", n;
}
function Q(e) {
  if (Ge) return;
  y || Fe(), y.innerHTML = "";
  const t = document.createTextNode(e);
  y.appendChild(t), y.style.display = "none", y.style.display = "inline";
}
const bn = "--any--", Xe = {
  outline: "rgba(255, 255, 102, 0.7) solid 2px"
};
let P = !1, $e, _, K = "", X, F, Y = "";
const be = /* @__PURE__ */ new WeakSet(), Ke = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map();
let ve;
function vn(e, t) {
  u(() => "registering drop-zone if absent"), z.size === 0 && (u(() => "adding global keydown and click handlers"), ve = yn(), window.addEventListener("keydown", pt), window.addEventListener("click", Et)), z.has(t) || z.set(t, /* @__PURE__ */ new Set()), z.get(t).has(e) || (z.get(t).add(e), nt());
}
function Je(e, t) {
  u(() => "unregistering drop-zone"), _ === e && ue(), z.get(t).delete(e), rt(), z.get(t).size === 0 && z.delete(t), z.size === 0 && (u(() => "removing global keydown and click handlers"), window.removeEventListener("keydown", pt), window.removeEventListener("click", Et), ve = void 0, wn());
}
function pt(e) {
  if (P)
    switch (e.key) {
      case "Escape": {
        ue();
        break;
      }
    }
}
function Et() {
  P && (be.has(document.activeElement) || (u(() => "clicked outside of any draggable"), ue()));
}
function On(e) {
  if (u(() => "zone focus"), !P) return;
  const t = e.currentTarget;
  if (t === _) return;
  K = t.getAttribute("aria-label") || "";
  const { items: n } = v.get(_), r = n.find((g) => g[R] === F), i = n.indexOf(r), o = n.splice(i, 1)[0], { items: a, autoAriaDisabled: s } = v.get(t);
  t.getBoundingClientRect().top < _.getBoundingClientRect().top || t.getBoundingClientRect().left < _.getBoundingClientRect().left ? (a.push(o), s || Q(`Moved item ${Y} to the end of the list ${K}`)) : (a.unshift(o), s || Q(`Moved item ${Y} to the beginning of the list ${K}`)), te(_, n, { trigger: I.DROPPED_INTO_ANOTHER, id: F, source: x.KEYBOARD }), te(t, a, { trigger: I.DROPPED_INTO_ZONE, id: F, source: x.KEYBOARD }), _ = t;
}
function Dt() {
  ke.forEach(({ update: e }, t) => e(v.get(t)));
}
function ue(e = !0) {
  u(() => "drop"), v.get(_).autoAriaDisabled || Q(`Stopped dragging item ${Y}`), be.has(document.activeElement) && document.activeElement.blur(), e && V(_, v.get(_).items, {
    trigger: I.DRAG_STOPPED,
    id: F,
    source: x.KEYBOARD
  }), we(
    z.get($e),
    (t) => v.get(t).dropTargetStyle,
    (t) => v.get(t).dropTargetClasses
  ), X = null, F = null, Y = "", $e = null, _ = null, K = "", P = !1, Dt();
}
function An(e, t) {
  const n = {
    items: void 0,
    type: void 0,
    dragDisabled: !1,
    zoneTabIndex: 0,
    zoneItemTabIndex: 0,
    dropFromOthersDisabled: !1,
    dropTargetStyle: Xe,
    dropTargetClasses: [],
    autoAriaDisabled: !1
  };
  function r(l, m, d) {
    l.length <= 1 || l.splice(d, 1, l.splice(m, 1, l[d])[0]);
  }
  function i(l) {
    switch (u(() => ["handling key down", l.key]), l.key) {
      case "Enter":
      case " ": {
        if ((l.target.disabled !== void 0 || l.target.href || l.target.isContentEditable) && !be.has(l.target))
          return;
        l.preventDefault(), l.stopPropagation(), P ? ue() : o(l);
        break;
      }
      case "ArrowDown":
      case "ArrowRight": {
        if (!P) return;
        l.preventDefault(), l.stopPropagation();
        const { items: m } = v.get(e), d = Array.from(e.children), f = d.indexOf(l.currentTarget);
        u(() => ["arrow down", f]), f < d.length - 1 && (n.autoAriaDisabled || Q(`Moved item ${Y} to position ${f + 2} in the list ${K}`), r(m, f, f + 1), te(e, m, { trigger: I.DROPPED_INTO_ZONE, id: F, source: x.KEYBOARD }));
        break;
      }
      case "ArrowUp":
      case "ArrowLeft": {
        if (!P) return;
        l.preventDefault(), l.stopPropagation();
        const { items: m } = v.get(e), f = Array.from(e.children).indexOf(l.currentTarget);
        u(() => ["arrow up", f]), f > 0 && (n.autoAriaDisabled || Q(`Moved item ${Y} to position ${f} in the list ${K}`), r(m, f, f - 1), te(e, m, { trigger: I.DROPPED_INTO_ZONE, id: F, source: x.KEYBOARD }));
        break;
      }
    }
  }
  function o(l) {
    u(() => "drag start"), s(l.currentTarget), _ = e, $e = n.type, P = !0;
    const m = Array.from(z.get(n.type)).filter((d) => d === _ || !v.get(d).dropFromOthersDisabled);
    if (pe(
      m,
      (d) => v.get(d).dropTargetStyle,
      (d) => v.get(d).dropTargetClasses
    ), !n.autoAriaDisabled) {
      let d = `Started dragging item ${Y}. Use the arrow keys to move it within its list ${K}`;
      m.length > 1 && (d += ", or tab to another list in order to move the item into it"), Q(d);
    }
    V(e, v.get(e).items, { trigger: I.DRAG_STARTED, id: F, source: x.KEYBOARD }), Dt();
  }
  function a(l) {
    P && l.currentTarget !== X && (l.stopPropagation(), ue(!1), o(l));
  }
  function s(l) {
    const { items: m } = v.get(e), d = Array.from(e.children), f = d.indexOf(l);
    X = l, X.tabIndex = n.zoneItemTabIndex, F = m[f][R], Y = d[f].getAttribute("aria-label") || "";
  }
  function c({
    items: l = [],
    type: m = bn,
    dragDisabled: d = !1,
    zoneTabIndex: f = 0,
    zoneItemTabIndex: h = 0,
    dropFromOthersDisabled: L = !1,
    dropTargetStyle: H = Xe,
    dropTargetClasses: B = [],
    autoAriaDisabled: S = !1
  }) {
    n.items = [...l], n.dragDisabled = d, n.dropFromOthersDisabled = L, n.zoneTabIndex = f, n.zoneItemTabIndex = h, n.dropTargetStyle = H, n.dropTargetClasses = B, n.autoAriaDisabled = S, n.type && m !== n.type && Je(e, n.type), n.type = m, vn(e, m), S || (e.setAttribute("aria-disabled", d), e.setAttribute("role", "list"), e.setAttribute("aria-describedby", d ? ve.DND_ZONE_DRAG_DISABLED : ve.DND_ZONE_ACTIVE)), v.set(e, n), P ? e.tabIndex = e === _ || X.contains(e) || n.dropFromOthersDisabled || _ && n.type !== v.get(_).type ? -1 : 0 : e.tabIndex = n.zoneTabIndex, e.addEventListener("focus", On);
    for (let N = 0; N < e.children.length; N++) {
      const E = e.children[N];
      be.add(E), E.tabIndex = P ? -1 : n.zoneItemTabIndex, S || E.setAttribute("role", "listitem"), E.removeEventListener("keydown", Ke.get(E)), E.removeEventListener("click", qe.get(E)), d || (E.addEventListener("keydown", i), Ke.set(E, i), E.addEventListener("click", a), qe.set(E, a)), P && n.items[N][R] === F && (u(() => ["focusing on", { i: N, focusedItemId: F }]), X = E, X.tabIndex = n.zoneItemTabIndex, E.focus());
    }
  }
  c(t);
  const g = {
    update: (l) => {
      u(() => `keyboard dndzone will update newOptions: ${k(l)}`), c(l);
    },
    destroy: () => {
      u(() => "keyboard dndzone will destroy"), Je(e, n.type), v.delete(e), ke.delete(e);
    }
  };
  return ke.set(e, g), g;
}
function _n(e, t) {
  if (In(e))
    return {
      update: () => {
      },
      destroy: () => {
      }
    };
  Qe(t);
  const n = En(e, t), r = An(e, t);
  return {
    update: (i) => {
      Qe(i), n.update(i), r.update(i);
    },
    destroy: () => {
      n.destroy(), r.destroy();
    }
  };
}
function In(e) {
  return !!e.closest(`[${St}="true"]`);
}
function Qe(e) {
  const {
    items: t,
    flipDurationMs: n,
    type: r,
    dragDisabled: i,
    morphDisabled: o,
    dropFromOthersDisabled: a,
    zoneTabIndex: s,
    zoneItemTabIndex: c,
    dropTargetStyle: g,
    dropTargetClasses: l,
    transformDraggedElement: m,
    autoAriaDisabled: d,
    centreDraggedOnCursor: f,
    delayTouchStart: h,
    dropAnimationDisabled: L,
    ...H
  } = e;
  if (Object.keys(H).length > 0 && console.warn("dndzone will ignore unknown options", H), !t)
    throw new Error("no 'items' key provided to dndzone");
  const B = t.find((S) => !{}.hasOwnProperty.call(S, R));
  if (B)
    throw new Error(`missing '${R}' property for item ${k(B)}`);
  if (l && !Array.isArray(l))
    throw new Error(`dropTargetClasses should be an array but instead it is a ${typeof l}, ${k(l)}`);
  if (s && !et(s))
    throw new Error(`zoneTabIndex should be a number but instead it is a ${typeof s}, ${k(s)}`);
  if (c && !et(c))
    throw new Error(`zoneItemTabIndex should be a number but instead it is a ${typeof c}, ${k(c)}`);
  if (h !== void 0 && h !== !1) {
    const S = h === !0, N = typeof h == "number" && isFinite(h) && h >= 0;
    if (!S && !N)
      throw new Error(
        `delayTouchStart should be a boolean (true/false) or a non-negative number but instead it is a ${typeof h}, ${k(
          h
        )}`
      );
  }
}
function et(e) {
  return !isNaN(e) && function(t) {
    return (t | 0) === t;
  }(parseFloat(e));
}
function yt(e) {
  let t = e;
  const n = /* @__PURE__ */ new Set();
  return {
    get: () => t,
    set: (r) => {
      t = r, Array.from(n).forEach((i) => i(t));
    },
    subscribe: (r) => {
      n.add(r), r(t);
    },
    unsubscribe: (r) => {
      n.delete(r);
    }
  };
}
const $ = yt(!0), ee = yt(!1);
function tt() {
  return {
    dragDisabled: ee.get() || $.get(),
    zoneItemTabIndex: -1
  };
}
function Nn(e, t) {
  ee.set(t?.dragDisabled ?? !1);
  let n = t;
  const r = _n(e, {
    ...n,
    ...tt()
  });
  function i() {
    r.update({
      ...n,
      ...tt()
    });
  }
  $.subscribe(i);
  function o(s) {
    const {
      info: { source: c, trigger: g }
    } = s.detail;
    c === x.KEYBOARD && g === I.DRAG_STOPPED && $.set(!0);
  }
  function a(s) {
    const {
      info: { source: c }
    } = s.detail;
    c === x.POINTER && $.set(!0);
  }
  return e.addEventListener("consider", o), e.addEventListener("finalize", a), {
    update: (s) => {
      n = s, ee.set(n?.dragDisabled ?? !1), i();
    },
    destroy: () => {
      e.removeEventListener("consider", o), e.removeEventListener("finalize", a), $.unsubscribe(i);
    }
  };
}
function Ln(e) {
  e.setAttribute("role", "button");
  function t(o) {
    o.preventDefault(), $.set(!1), window.addEventListener("mouseup", r), window.addEventListener("touchend", r);
  }
  function n(o) {
    (o.key === "Enter" || o.key === " ") && $.set(!1);
  }
  function r() {
    $.set(!0), window.removeEventListener("mouseup", r), window.removeEventListener("touchend", r);
  }
  const i = () => {
    const o = ee.get(), a = $.get();
    o ? (e.tabIndex = -1, e.style.cursor = "") : (e.tabIndex = a ? 0 : -1, e.style.cursor = a ? "grab" : "grabbing");
  };
  return ee.subscribe(i), $.subscribe(i), e.addEventListener("mousedown", t), e.addEventListener("touchstart", t), e.addEventListener("keydown", n), {
    update: () => {
    },
    destroy: () => {
      e.removeEventListener("mousedown", t), e.removeEventListener("touchstart", t), e.removeEventListener("keydown", n), ee.unsubscribe(i), $.unsubscribe(i);
    }
  };
}
export {
  Ct as DND_PERMANENT_ID_KEY,
  Lt as DRAGGED_ELEMENT_ID,
  q as FEATURE_FLAG_NAMES,
  le as SHADOW_ITEM_MARKER_PROPERTY_NAME,
  Nt as SHADOW_PLACEHOLDER_ITEM_ID,
  x as SOURCES,
  I as TRIGGERS,
  Q as alertToScreenReader,
  _n as dndzone,
  Ln as dragHandle,
  Nn as dragHandleZone,
  xn as overrideItemIdKeyNameBeforeInitialisingDndZones,
  Rn as setDebugMode,
  Sn as setFeatureFlag
};
//# sourceMappingURL=index.mjs.map
