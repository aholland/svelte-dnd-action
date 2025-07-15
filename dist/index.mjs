const Ot = "finalize", At = "consider";
function te(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(Ot, {
      detail: { items: t, info: n }
    })
  );
}
function V(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(At, {
      detail: { items: t, info: n }
    })
  );
}
const Oe = "draggedEntered", fe = "draggedLeft", Ae = "draggedOverIndex", Ge = "draggedLeftDocument", Ee = {
  LEFT_FOR_ANOTHER: "leftForAnother",
  OUTSIDE_OF_ANY: "outsideOfAny"
};
function _t(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(Oe, {
      detail: { indexObj: t, draggedEl: n }
    })
  );
}
function It(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(fe, {
      detail: { draggedEl: t, type: Ee.LEFT_FOR_ANOTHER, theOtherDz: n }
    })
  );
}
function xt(e, t) {
  e.dispatchEvent(
    new CustomEvent(fe, {
      detail: { draggedEl: t, type: Ee.OUTSIDE_OF_ANY }
    })
  );
}
function Rt(e, t, n) {
  e.dispatchEvent(
    new CustomEvent(Ae, {
      detail: { indexObj: t, draggedEl: n }
    })
  );
}
function St(e) {
  window.dispatchEvent(
    new CustomEvent(Ge, {
      detail: { draggedEl: e }
    })
  );
}
const x = {
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
}, R = {
  POINTER: "pointer",
  KEYBOARD: "keyboard"
}, le = "isDndShadowItem", _e = "data-is-dnd-shadow-item-internal", Nt = "data-is-dnd-shadow-item-hint", Lt = "id:dnd-shadow-placeholder-0000", Ct = "dnd-action-dragged-el", Ce = "dndShadowBackupId";
let O = "id", De = 0;
function rt() {
  De++;
}
function it() {
  if (De === 0)
    throw new Error("Bug! trying to decrement when there are no dropzones");
  De--;
}
function xn(e) {
  if (De > 0)
    throw new Error("can only override the id key before initialising any dndzone");
  if (typeof e != "string")
    throw new Error("item id key has to be a string");
  u(() => ["overriding item id key name", e]), O = e;
}
function Rn(e) {
  return e[Ce] ? e[Ce] : e[O];
}
const Be = typeof window > "u";
let u = () => {
};
function Sn(e) {
  e ? u = (t, n = console.debug) => {
    const r = t();
    Array.isArray(r) ? n(...r) : n(r);
  } : u = () => {
  };
}
function Me(e, t = !0) {
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
function ot(e) {
  const t = Me(e);
  return {
    top: t.top + window.scrollY,
    bottom: t.bottom + window.scrollY,
    left: t.left + window.scrollX,
    right: t.right + window.scrollX
  };
}
function st(e) {
  const t = e.getBoundingClientRect();
  return {
    top: t.top + window.scrollY,
    bottom: t.bottom + window.scrollY,
    left: t.left + window.scrollX,
    right: t.right + window.scrollX
  };
}
function at(e) {
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
  return at(st(e));
}
function We(e, t) {
  const n = ce(e), r = ot(t);
  return Ie(n, r);
}
function Pt(e, t) {
  const n = ce(e), r = ce(t);
  return Mt(n, r);
}
function Ft(e) {
  const t = st(e);
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
function Ze() {
  u(() => "resetting indexes cache"), J = /* @__PURE__ */ new Map();
}
Ze();
function kt(e) {
  const t = Array.from(e.children).findIndex((n) => n.getAttribute(_e));
  if (t >= 0)
    return J.has(e) || J.set(e, /* @__PURE__ */ new Map()), J.get(e).set(t, ot(e.children[t])), t;
}
function zt(e, t) {
  if (!We(e, t))
    return null;
  const n = t.children;
  if (n.length === 0)
    return { index: 0, isProximityBased: !0 };
  const r = kt(t);
  for (let a = 0; a < n.length; a++)
    if (We(e, n[a])) {
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
  return dt(e, 0);
}
function dt(e, t = 0) {
  return e.parentElement ? dt(e.parentElement, t + 1) : t - 1;
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
const Zt = 200, Ye = 10;
let Pe;
function Ut(e, t, n = Zt, r) {
  let i, o, a = !1, s;
  const c = Array.from(t).sort((l, m) => ye(m) - ye(l));
  function g() {
    const l = ce(e), m = r.multiScrollIfNeeded();
    if (!m && s && Math.abs(s.x - l.x) < Ye && Math.abs(s.y - l.y) < Ye) {
      Pe = window.setTimeout(g, n);
      return;
    }
    if (Ft(e)) {
      u(() => "off document"), St(e);
      return;
    }
    s = l;
    let d = !1;
    for (const f of c) {
      m && Ze();
      const h = zt(e, f);
      if (h === null)
        continue;
      const { index: L } = h;
      d = !0, f !== i ? (i && It(i, e, f), _t(f, h, e), i = f) : L !== o && (Rt(f, h, e), o = L);
      break;
    }
    !d && a && i ? (xt(i, e), i = void 0, o = void 0, a = !1) : a = !0, Pe = window.setTimeout(g, n);
  }
  g();
}
function Ht() {
  u(() => "unobserving"), clearTimeout(Pe), Ze();
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
}), lt = {
  [q.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT]: !1
};
function Nn(e, t) {
  if (!q[e])
    throw new Error(`Can't set non existing feature flag ${e}! Supported flags: ${Object.keys(q)}`);
  lt[e] = !!t;
}
function ct(e) {
  if (!q[e])
    throw new Error(`Can't get non existing feature flag ${e}! Supported flags: ${Object.keys(q)}`);
  return lt[e];
}
const qt = 0.2;
function j(e) {
  return `${e} ${qt}s ease`;
}
function Jt(e, t) {
  const n = e.getBoundingClientRect(), r = Kt(e);
  ut(e, r), r.id = Ct, r.style.position = "fixed";
  let i = n.top, o = n.left;
  if (r.style.top = `${i}px`, r.style.left = `${o}px`, t) {
    const a = at(n);
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
  ut(t, e);
  const i = t.getBoundingClientRect(), o = e.getBoundingClientRect(), a = i.width - o.width, s = i.height - o.height;
  if (a || s) {
    const c = {
      left: (n - o.left) / o.width,
      top: (r - o.top) / o.height
    };
    ct(q.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT) || (e.style.height = `${i.height}px`, e.style.width = `${i.width}px`), e.style.left = `${parseFloat(e.style.left) - c.left * a}px`, e.style.top = `${parseFloat(e.style.top) - c.top * s}px`;
  }
}
function ut(e, t) {
  const n = window.getComputedStyle(e);
  Array.from(n).filter(
    (r) => r.startsWith("background") || r.startsWith("padding") || r.startsWith("font") || r.startsWith("text") || r.startsWith("align") || r.startsWith("justify") || r.startsWith("display") || r.startsWith("flex") || r.startsWith("border") || r === "opacity" || r === "color" || r === "list-style-type" || // copying with and height to make up for rect update timing issues in some browsers
    ct(q.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT) && (r === "width" || r === "height")
  ).forEach((r) => t.style.setProperty(r, n.getPropertyValue(r), n.getPropertyPriority(r)));
}
function tn(e, t) {
  e.draggable = !1, e.ondragstart = () => !1, t ? (e.style.userSelect = "", e.style.WebkitUserSelect = "", e.style.cursor = "") : (e.style.userSelect = "none", e.style.WebkitUserSelect = "none", e.style.cursor = "grab");
}
function ft(e) {
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
const sn = "--any--", an = 100, dn = 20, me = 3, ln = 80, Ve = {
  outline: "rgba(255, 255, 102, 0.7) solid 2px"
}, je = "data-is-dnd-original-dragged-item";
let A, T, M, xe, p, Re, ne, w, Z, _, W = !1, Ue = !1, He, ge = !1, se = [], de, U, ae = !1;
const G = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Map(), Le = /* @__PURE__ */ new WeakMap();
function cn(e, t) {
  u(() => "registering drop-zone if absent"), G.has(t) || G.set(t, /* @__PURE__ */ new Set()), G.get(t).has(e) || (G.get(t).add(e), rt());
}
function Xe(e, t) {
  G.get(t).delete(e), it(), G.get(t).size === 0 && G.delete(t);
}
function un() {
  u(() => "watching dragged element");
  const e = G.get(xe);
  for (const r of e)
    r.addEventListener(Oe, gt), r.addEventListener(fe, ht), r.addEventListener(Ae, mt);
  window.addEventListener(Ge, re);
  const t = Math.max(...Array.from(e.keys()).map((r) => D.get(r).dropAnimationDurationMs)), n = t === 0 ? dn : Math.max(t, an);
  de = Vt(e, () => _), Ut(T, e, n * 1.07, de);
}
function fn() {
  u(() => "unwatching dragged element");
  const e = G.get(xe);
  for (const t of e)
    t.removeEventListener(Oe, gt), t.removeEventListener(fe, ht), t.removeEventListener(Ae, mt);
  window.removeEventListener(Ge, re), de && (de.destroy(), de = void 0), Ht();
}
function Se(e) {
  return e.findIndex((t) => !!t[le]);
}
function gn(e) {
  return {
    ...e,
    [le]: !0,
    [O]: Lt,
    [Ce]: e[O]
  };
}
function gt(e) {
  u(() => ["dragged entered", e.currentTarget, e.detail]);
  let { items: t, dropFromOthersDisabled: n } = D.get(e.currentTarget);
  if (n && e.currentTarget !== p) {
    u(() => "ignoring dragged entered because drop is currently disabled");
    return;
  }
  if (ge = !1, t = t.filter((a) => !a[le]), u(() => `dragged entered items ${k(t)}`), p !== e.currentTarget) {
    const s = D.get(p).items.filter((c) => !c[le]);
    V(p, s, {
      trigger: x.DRAGGED_ENTERED_ANOTHER,
      id: M[O],
      source: R.POINTER
    });
  }
  const { index: r, isProximityBased: i } = e.detail.indexObj, o = i && r === e.currentTarget.children.length - 1 ? r + 1 : r;
  w = e.currentTarget, t.splice(o, 0, ne), V(e.currentTarget, t, { trigger: x.DRAGGED_ENTERED, id: M[O], source: R.POINTER });
}
function ht(e) {
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
      trigger: x.DRAGGED_LEFT_ALL,
      id: M[O],
      source: R.POINTER
    });
  }
  V(e.currentTarget, r, {
    trigger: x.DRAGGED_LEFT,
    id: M[O],
    source: R.POINTER
  });
}
function mt(e) {
  u(() => ["dragged is over index", e.currentTarget, e.detail]);
  const { items: t, dropFromOthersDisabled: n } = D.get(e.currentTarget);
  if (n && e.currentTarget !== p) {
    u(() => "drop is currently disabled");
    return;
  }
  const r = [...t];
  ge = !1;
  const { index: i } = e.detail.indexObj, o = Se(r);
  o !== -1 && r.splice(o, 1), r.splice(i, 0, ne), V(e.currentTarget, r, { trigger: x.DRAGGED_OVER_INDEX, id: M[O], source: R.POINTER });
}
function Te(e) {
  e.preventDefault();
  const t = e.touches ? e.touches[0] : e;
  _ = { x: t.clientX, y: t.clientY }, T.style.transform = `translate3d(${_.x - Z.x}px, ${_.y - Z.y}px, 0)`;
}
function re() {
  u(() => "dropped"), Ue = !0, window.removeEventListener("mousemove", Te), window.removeEventListener("touchmove", Te), window.removeEventListener("mouseup", re), window.removeEventListener("touchend", re), fn(), Qt(T), w || (u(() => "element was dropped right after it left origin but before entering somewhere else"), w = p), u(() => ["dropped in dz", w]);
  let { items: e, type: t } = D.get(w);
  we(
    G.get(t),
    (i) => D.get(i).dropTargetStyle,
    (i) => D.get(i).dropTargetClasses
  );
  let n = Se(e);
  n === -1 && w === p && (n = Re), e = e.map((i) => i[le] ? M : i);
  function r() {
    He(), te(w, e, {
      trigger: ge ? x.DROPPED_OUTSIDE_OF_ANY : x.DROPPED_INTO_ZONE,
      id: M[O],
      source: R.POINTER
    }), w !== p && te(p, D.get(p).items, {
      trigger: x.DROPPED_INTO_ANOTHER,
      id: M[O],
      source: R.POINTER
    });
    const i = Array.from(w.children).find((o) => o.getAttribute(_e));
    i && rn(i), pn();
  }
  D.get(w).dropAnimationDisabled ? r() : hn(n, r);
}
function hn(e, t) {
  const n = e > -1 ? Me(w.children[e], !1) : Me(w, !1), r = {
    x: n.left - parseFloat(T.style.left),
    y: n.top - parseFloat(T.style.top)
  }, { dropAnimationDurationMs: i } = D.get(w), o = `transform ${i}ms ease`;
  T.style.transition = T.style.transition ? T.style.transition + "," + o : o, T.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`, window.setTimeout(t, i);
}
function mn(e, t) {
  se.push({ dz: e, destroy: t }), window.requestAnimationFrame(() => {
    ft(e), document.body.appendChild(e);
  });
}
function pn() {
  T && T.remove && T.remove(), A && A.remove && A.remove(), T = void 0, A = void 0, M = void 0, xe = void 0, p = void 0, Re = void 0, ne = void 0, w = void 0, Z = void 0, _ = void 0, W = !1, Ue = !1, He = void 0, ge = !1, U && clearTimeout(U), U = void 0, ae = !1, se.length && (u(() => ["will destroy zones that were removed during drag", se]), se.forEach(({ dz: e, destroy: t }) => {
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
    dropTargetStyle: Ve,
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
    if (a(), A = void 0, Z = void 0, _ = void 0, d.type === "touchend") {
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
      _ = { x: h.clientX, y: h.clientY }, (Math.abs(_.x - Z.x) >= me || Math.abs(_.y - Z.y) >= me) && (U && (clearTimeout(U), U = void 0), s(d));
      return;
    }
    d.preventDefault(), _ = { x: h.clientX, y: h.clientY }, (Math.abs(_.x - Z.x) >= me || Math.abs(_.y - Z.y) >= me) && (a(), l());
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
    Z = { x: L.clientX, y: L.clientY }, _ = { ...Z }, A = d.currentTarget, h && (ae = !1, U = window.setTimeout(() => {
      A && (ae = !0, a(), l());
    }, r.delayTouchStartMs)), o();
  }
  function l() {
    u(() => [`drag start config: ${k(r)}`, A]), W = !0;
    const d = i.get(A);
    Re = d, p = A.parentElement;
    const f = p.closest("dialog") || p.closest("[popover]") || p.getRootNode(), h = f.body || f, { items: L, type: H, centreDraggedOnCursor: B } = r, S = [...L];
    M = S[d], xe = H, ne = gn(M), T = Jt(A, B && _), h.appendChild(T);
    function N() {
      if (!A) {
        u(() => "originalDragTarget became undefined, aborting keepOriginalElementInDom");
        return;
      }
      A.parentElement ? window.requestAnimationFrame(N) : (A.setAttribute(je, !0), h.appendChild(A), un(), ft(A), T.focus());
    }
    window.requestAnimationFrame(N), pe(
      Array.from(G.get(r.type)).filter((E) => E === p || !D.get(E).dropFromOthersDisabled),
      (E) => D.get(E).dropTargetStyle,
      (E) => D.get(E).dropTargetClasses
    ), S.splice(d, 1, ne), He = on(p), V(p, S, { trigger: x.DRAG_STARTED, id: M[O], source: R.POINTER }), window.addEventListener("mousemove", Te, { passive: !1 }), window.addEventListener("touchmove", Te, { passive: !1, capture: !1 }), window.addEventListener("mouseup", re, { passive: !1 }), window.addEventListener("touchend", re, { passive: !1 });
  }
  function m({
    items: d = void 0,
    flipDurationMs: f = 0,
    type: h = sn,
    dragDisabled: L = !1,
    morphDisabled: H = !1,
    dropFromOthersDisabled: B = !1,
    dropTargetStyle: S = Ve,
    dropTargetClasses: N = [],
    transformDraggedElement: E = () => {
    },
    centreDraggedOnCursor: Tt = !1,
    dropAnimationDisabled: bt = !1,
    delayTouchStart: ie = !1
  }) {
    r.dropAnimationDurationMs = f;
    let Ne = 0;
    ie === !0 ? Ne = ln : typeof ie == "number" && isFinite(ie) && ie >= 0 && (Ne = ie), r.delayTouchStartMs = Ne, r.type && h !== r.type && Xe(e, r.type), r.type = h, r.items = [...d], r.dragDisabled = L, r.morphDisabled = H, r.transformDraggedElement = E, r.centreDraggedOnCursor = Tt, r.dropAnimationDisabled = bt, n && W && !Ue && (!Gt(S, r.dropTargetStyle) || !Bt(N, r.dropTargetClasses)) && (we(
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
    const vt = W ? Se(r.items) : -1;
    for (let b = 0; b < e.children.length; b++) {
      const C = e.children[b];
      if (tn(C, L), b === vt) {
        H || en(T, C, _.x, _.y), r.transformDraggedElement(T, M, b), nn(C);
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
        u(() => "pointer dndzone will destroy"), Xe(e, D.get(e).type), D.delete(e);
      }
      W && !e.closest(`[${je}]`) ? (u(() => "pointer dndzone will be scheduled for destruction"), mn(e, d)) : d();
    }
  };
}
const Fe = {
  DND_ZONE_ACTIVE: "dnd-zone-active",
  DND_ZONE_DRAG_DISABLED: "dnd-zone-drag-disabled"
}, pt = {
  [Fe.DND_ZONE_ACTIVE]: "Tab to one the items and press space-bar or enter to start dragging it",
  [Fe.DND_ZONE_DRAG_DISABLED]: "This is a disabled drag and drop list"
}, Dn = "dnd-action-aria-alert";
let y;
function $e() {
  y || (y = document.createElement("div"), function() {
    y.id = Dn, y.style.position = "fixed", y.style.bottom = "0", y.style.left = "0", y.style.zIndex = "-5", y.style.opacity = "0", y.style.height = "0", y.style.width = "0", y.setAttribute("role", "alert");
  }(), document.body.prepend(y), Object.entries(pt).forEach(([e, t]) => document.body.prepend(Tn(e, t))));
}
function yn() {
  return Be ? null : (document.readyState === "complete" ? $e() : window.addEventListener("DOMContentLoaded", $e), { ...Fe });
}
function wn() {
  Be || !y || (Object.keys(pt).forEach((e) => document.getElementById(e)?.remove()), y.remove(), y = void 0);
}
function Tn(e, t) {
  const n = document.createElement("div");
  return n.id = e, n.innerHTML = `<p>${t}</p>`, n.style.display = "none", n.style.position = "fixed", n.style.zIndex = "-5", n;
}
function Q(e) {
  if (Be) return;
  y || $e(), y.innerHTML = "";
  const t = document.createTextNode(e);
  y.appendChild(t), y.style.display = "none", y.style.display = "inline";
}
const bn = "--any--", Ke = {
  outline: "rgba(255, 255, 102, 0.7) solid 2px"
};
let P = !1, ke, I, K = "", X, F, Y = "";
const be = /* @__PURE__ */ new WeakSet(), qe = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map();
let ve;
function vn(e, t) {
  u(() => "registering drop-zone if absent"), z.size === 0 && (u(() => "adding global keydown and click handlers"), ve = yn(), window.addEventListener("keydown", Et), window.addEventListener("click", Dt)), z.has(t) || z.set(t, /* @__PURE__ */ new Set()), z.get(t).has(e) || (z.get(t).add(e), rt());
}
function Qe(e, t) {
  u(() => "unregistering drop-zone"), I === e && ue(), z.get(t).delete(e), it(), z.get(t).size === 0 && z.delete(t), z.size === 0 && (u(() => "removing global keydown and click handlers"), window.removeEventListener("keydown", Et), window.removeEventListener("click", Dt), ve = void 0, wn());
}
function Et(e) {
  if (P)
    switch (e.key) {
      case "Escape": {
        ue();
        break;
      }
    }
}
function Dt() {
  P && (be.has(document.activeElement) || (u(() => "clicked outside of any draggable"), ue()));
}
function On(e) {
  if (u(() => "zone focus"), !P) return;
  const t = e.currentTarget;
  if (t === I) return;
  K = t.getAttribute("aria-label") || "";
  const { items: n } = v.get(I), r = n.find((g) => g[O] === F), i = n.indexOf(r), o = n.splice(i, 1)[0], { items: a, autoAriaDisabled: s } = v.get(t);
  t.getBoundingClientRect().top < I.getBoundingClientRect().top || t.getBoundingClientRect().left < I.getBoundingClientRect().left ? (a.push(o), s || Q(`Moved item ${Y} to the end of the list ${K}`)) : (a.unshift(o), s || Q(`Moved item ${Y} to the beginning of the list ${K}`)), te(I, n, { trigger: x.DROPPED_INTO_ANOTHER, id: F, source: R.KEYBOARD }), te(t, a, { trigger: x.DROPPED_INTO_ZONE, id: F, source: R.KEYBOARD }), I = t;
}
function yt() {
  ze.forEach(({ update: e }, t) => e(v.get(t)));
}
function ue(e = !0) {
  u(() => "drop"), v.get(I).autoAriaDisabled || Q(`Stopped dragging item ${Y}`), be.has(document.activeElement) && document.activeElement.blur(), e && V(I, v.get(I).items, {
    trigger: x.DRAG_STOPPED,
    id: F,
    source: R.KEYBOARD
  }), we(
    z.get(ke),
    (t) => v.get(t).dropTargetStyle,
    (t) => v.get(t).dropTargetClasses
  ), X = null, F = null, Y = "", ke = null, I = null, K = "", P = !1, yt();
}
function An(e, t) {
  const n = {
    items: void 0,
    type: void 0,
    dragDisabled: !1,
    zoneTabIndex: 0,
    zoneItemTabIndex: 0,
    dropFromOthersDisabled: !1,
    dropTargetStyle: Ke,
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
        u(() => ["arrow down", f]), f < d.length - 1 && (n.autoAriaDisabled || Q(`Moved item ${Y} to position ${f + 2} in the list ${K}`), r(m, f, f + 1), te(e, m, { trigger: x.DROPPED_INTO_ZONE, id: F, source: R.KEYBOARD }));
        break;
      }
      case "ArrowUp":
      case "ArrowLeft": {
        if (!P) return;
        l.preventDefault(), l.stopPropagation();
        const { items: m } = v.get(e), f = Array.from(e.children).indexOf(l.currentTarget);
        u(() => ["arrow up", f]), f > 0 && (n.autoAriaDisabled || Q(`Moved item ${Y} to position ${f} in the list ${K}`), r(m, f, f - 1), te(e, m, { trigger: x.DROPPED_INTO_ZONE, id: F, source: R.KEYBOARD }));
        break;
      }
    }
  }
  function o(l) {
    u(() => "drag start"), s(l.currentTarget), I = e, ke = n.type, P = !0;
    const m = Array.from(z.get(n.type)).filter((d) => d === I || !v.get(d).dropFromOthersDisabled);
    if (pe(
      m,
      (d) => v.get(d).dropTargetStyle,
      (d) => v.get(d).dropTargetClasses
    ), !n.autoAriaDisabled) {
      let d = `Started dragging item ${Y}. Use the arrow keys to move it within its list ${K}`;
      m.length > 1 && (d += ", or tab to another list in order to move the item into it"), Q(d);
    }
    V(e, v.get(e).items, { trigger: x.DRAG_STARTED, id: F, source: R.KEYBOARD }), yt();
  }
  function a(l) {
    P && l.currentTarget !== X && (l.stopPropagation(), ue(!1), o(l));
  }
  function s(l) {
    const { items: m } = v.get(e), d = Array.from(e.children), f = d.indexOf(l);
    X = l, X.tabIndex = n.zoneItemTabIndex, F = m[f][O], Y = d[f].getAttribute("aria-label") || "";
  }
  function c({
    items: l = [],
    type: m = bn,
    dragDisabled: d = !1,
    zoneTabIndex: f = 0,
    zoneItemTabIndex: h = 0,
    dropFromOthersDisabled: L = !1,
    dropTargetStyle: H = Ke,
    dropTargetClasses: B = [],
    autoAriaDisabled: S = !1
  }) {
    n.items = [...l], n.dragDisabled = d, n.dropFromOthersDisabled = L, n.zoneTabIndex = f, n.zoneItemTabIndex = h, n.dropTargetStyle = H, n.dropTargetClasses = B, n.autoAriaDisabled = S, n.type && m !== n.type && Qe(e, n.type), n.type = m, vn(e, m), S || (e.setAttribute("aria-disabled", d), e.setAttribute("role", "list"), e.setAttribute("aria-describedby", d ? ve.DND_ZONE_DRAG_DISABLED : ve.DND_ZONE_ACTIVE)), v.set(e, n), P ? e.tabIndex = e === I || X.contains(e) || n.dropFromOthersDisabled || I && n.type !== v.get(I).type ? -1 : 0 : e.tabIndex = n.zoneTabIndex, e.addEventListener("focus", On);
    for (let N = 0; N < e.children.length; N++) {
      const E = e.children[N];
      be.add(E), E.tabIndex = P ? -1 : n.zoneItemTabIndex, S || E.setAttribute("role", "listitem"), E.removeEventListener("keydown", qe.get(E)), E.removeEventListener("click", Je.get(E)), d || (E.addEventListener("keydown", i), qe.set(E, i), E.addEventListener("click", a), Je.set(E, a)), P && n.items[N][O] === F && (u(() => ["focusing on", { i: N, focusedItemId: F }]), X = E, X.tabIndex = n.zoneItemTabIndex, E.focus());
    }
  }
  c(t);
  const g = {
    update: (l) => {
      u(() => `keyboard dndzone will update newOptions: ${k(l)}`), c(l);
    },
    destroy: () => {
      u(() => "keyboard dndzone will destroy"), Qe(e, n.type), v.delete(e), ze.delete(e);
    }
  };
  return ze.set(e, g), g;
}
function _n(e, t) {
  if (In(e))
    return {
      update: () => {
      },
      destroy: () => {
      }
    };
  et(t);
  const n = En(e, t), r = An(e, t);
  return {
    update: (i) => {
      et(i), n.update(i), r.update(i);
    },
    destroy: () => {
      n.destroy(), r.destroy();
    }
  };
}
function In(e) {
  return !!e.closest(`[${Nt}="true"]`);
}
function et(e) {
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
  const B = t.find((S) => !{}.hasOwnProperty.call(S, O));
  if (B)
    throw new Error(`missing '${O}' property for item ${k(B)}`);
  if (l && !Array.isArray(l))
    throw new Error(`dropTargetClasses should be an array but instead it is a ${typeof l}, ${k(l)}`);
  if (s && !tt(s))
    throw new Error(`zoneTabIndex should be a number but instead it is a ${typeof s}, ${k(s)}`);
  if (c && !tt(c))
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
function tt(e) {
  return !isNaN(e) && function(t) {
    return (t | 0) === t;
  }(parseFloat(e));
}
function wt(e) {
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
const $ = wt(!0), ee = wt(!1);
function nt() {
  return {
    dragDisabled: ee.get() || $.get(),
    zoneItemTabIndex: -1
  };
}
function Ln(e, t) {
  ee.set(t?.dragDisabled ?? !1);
  let n = t;
  const r = _n(e, {
    ...n,
    ...nt()
  });
  function i() {
    r.update({
      ...n,
      ...nt()
    });
  }
  $.subscribe(i);
  function o(s) {
    const {
      info: { source: c, trigger: g }
    } = s.detail;
    c === R.KEYBOARD && g === x.DRAG_STOPPED && $.set(!0);
  }
  function a(s) {
    const {
      info: { source: c }
    } = s.detail;
    c === R.POINTER && $.set(!0);
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
function Cn(e) {
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
  Ct as DRAGGED_ELEMENT_ID,
  q as FEATURE_FLAG_NAMES,
  Ce as SHADOW_BACKUP_ID_PROPERTY_NAME,
  le as SHADOW_ITEM_MARKER_PROPERTY_NAME,
  Lt as SHADOW_PLACEHOLDER_ITEM_ID,
  R as SOURCES,
  x as TRIGGERS,
  Q as alertToScreenReader,
  _n as dndzone,
  Cn as dragHandle,
  Ln as dragHandleZone,
  Rn as getTrueItemId,
  xn as overrideItemIdKeyNameBeforeInitialisingDndZones,
  Sn as setDebugMode,
  Nn as setFeatureFlag
};
//# sourceMappingURL=index.mjs.map
