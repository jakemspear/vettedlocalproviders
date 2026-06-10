/* ui.jsx — shared primitives + motion helpers. Exported to window. */
const { useState, useEffect, useRef, useContext, createContext, useCallback } = React;

/* ── motion plumbing ─────────────────────────────────────────────
   MotionCtx carries the A/B motion flag. useMotion() ANDs it with the
   OS reduced-motion preference, so any animation can gate on one call. */
const MotionCtx = createContext(true);

function usePrefersReduced() {
  const get = () => typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
  const [reduced, setReduced] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on);
  }, []);
  return reduced;
}

function useMotion() {
  const flag = useContext(MotionCtx);
  const reduced = usePrefersReduced();
  return flag && !reduced;
}

/* light haptic; graceful no-op where unsupported */
function buzz(ms = 10) {
  try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {}
}

/* fire callback once when el scrolls into view (with a safety fallback so the
   value can never stay stuck at its pre-animation state if IO never fires) */
function useInView(opts) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.4, ...(opts || {}) });
    io.observe(el);
    const fallback = setTimeout(() => setSeen(true), 2600);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [seen]);
  return [ref, seen];
}

/* ── icons / bits ───────────────────────────────────────────────── */
function Ico({ name, weight, className = "", style }) {
  const base = weight ? `ph-${weight}` : "ph";
  return <i className={`${base} ${name} ${className}`} style={style} aria-hidden="true" />;
}

function Stars({ n = 5 }) {
  return (
    <span className="stars" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => <Ico key={i} name="ph-star" weight="fill" />)}
    </span>
  );
}

/* animated checkmark: stroke draws on when `on` flips true */
function CheckDraw({ on, size = 20, color = "#2A1E08" }) {
  return (
    <svg className={`checkdraw${on ? " on" : ""}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 13l4 4L19 7" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* progress bar: fill color eases sage -> gold approaching completion */
function lerp(a, b, t) { return a + (b - a) * t; }
function mix(c1, c2, t) {
  const p = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [r1, g1, b1] = p(c1), [r2, g2, b2] = p(c2);
  return `rgb(${Math.round(lerp(r1, r2, t))},${Math.round(lerp(g1, g2, t))},${Math.round(lerp(b1, b2, t))})`;
}
function Progress({ value }) {
  const col = mix("#8A9A86", "#E0A23B", Math.min(1, value * 1.1));
  return (
    <div className="progress" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${Math.max(4, value * 100)}%`, background: col }} />
    </div>
  );
}

function Chip({ icon, label, spam }) {
  return (
    <span className={`chip${spam ? " spam" : ""}`}>
      <Ico name={icon} weight={spam ? "fill" : undefined} />
      <span>{label}</span>
    </span>
  );
}

/* count-up number, triggers on scroll into view */
function CountUp({ value, suffix = "", decimals = 0, dur = 1100 }) {
  const motion = useMotion();
  const [ref, seen] = useInView();
  const [n, setN] = useState(motion ? 0 : value);
  useEffect(() => {
    if (!seen) return;
    if (!motion) { setN(value); return; }
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // guarantee the final value even if rAF is throttled/paused (background tab)
    const guard = setTimeout(() => setN(value), dur + 250);
    return () => { cancelAnimationFrame(raf); clearTimeout(guard); };
  }, [seen, motion, value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

/* odometer-style rolling integer (used for offer count) */
function Odometer({ value }) {
  const motion = useMotion();
  const prev = useRef(value);
  const dir = value >= prev.current ? 1 : -1;
  useEffect(() => { prev.current = value; });
  if (!motion) return <span className="odo"><span className="odo-d">{value}</span></span>;
  return (
    <span className="odo">
      <span key={value} className="odo-d" style={{ animationName: dir > 0 ? "odoUp" : "odoDown" }}>{value}</span>
    </span>
  );
}

/* brief, low-density celebration burst in brand colors */
function Celebration({ fire }) {
  const motion = useMotion();
  if (!motion || !fire) return null;
  const colors = ["#1F4D45", "#E0A23B", "#8A9A86", "#F2EDE4"];
  const bits = Array.from({ length: 18 }).map((_, i) => {
    const ang = (i / 18) * Math.PI * 2 + (i % 2 ? 0.2 : -0.2);
    const dist = 60 + (i % 4) * 22;
    return {
      x: Math.cos(ang) * dist, y: Math.sin(ang) * dist,
      c: colors[i % colors.length], d: (i % 5) * 30,
    };
  });
  return (
    <div className="celebrate" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} className="confetti"
          style={{ "--tx": `${b.x}px`, "--ty": `${b.y}px`, background: b.c, animationDelay: `${b.d}ms` }} />
      ))}
    </div>
  );
}

function fmt(s) {
  const m = Math.floor(s / 60);
  const ss = String(s % 60).padStart(2, "0");
  return `${m}:${ss}`;
}

/* Countdown ring: draws itself in on mount, pulses while live,
   settles into a "connecting" state at zero. */
function CountdownRing({ total = 120, label = "", onExpire }) {
  const motion = useMotion();
  const [left, setLeft] = useState(total);
  const [drawn, setDrawn] = useState(!motion);
  const R = 76, C = 2 * Math.PI * R;

  useEffect(() => {
    const r = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    if (left <= 0) { onExpire && onExpire(); return; }
    const id = setInterval(() => setLeft((v) => (v <= 1 ? 0 : v - 1)), 1000);
    return () => clearInterval(id);
  }, [left]);

  const frac = left / total;
  const liveOffset = C * (1 - frac);
  const done = left <= 0;
  const offset = !drawn ? C : (done ? 0 : liveOffset);

  return (
    <div className={`ring-wrap${motion ? " ring-anim" : ""}`} aria-live="polite">
      <svg width="168" height="168" viewBox="0 0 168 168">
        <circle className="ring-bg" cx="84" cy="84" r={R} strokeWidth="9" />
        <circle
          className={`ring-fg${drawn ? " drawn" : ""}`}
          cx="84" cy="84" r={R} strokeWidth="9"
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-center">
        <div className="ring-time">{fmt(left)}</div>
        <div className="ring-label">{label}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MotionCtx, usePrefersReduced, useMotion, useInView, buzz,
  Ico, Stars, CheckDraw, Progress, Chip, CountUp, Odometer, Celebration,
  CountdownRing, fmtTime: fmt,
});
