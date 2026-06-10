/* i18n.jsx — locale dictionaries + language context. Exported to window.
   Shared structural META (icons, ids, values) stays language-neutral;
   all human copy lives in STRINGS.en / STRINGS.es keyed by id. */

const BRAND = "Vetted Local Providers";
const PHONE = "(480) 555-0147";
const PHONE_TEL = "+14805550147"; // replace with the real tracked line at launch

const META = {
  offerOrder: ["free_quote", "free_inspection", "qualify_quiz", "zero_down", "insurance_storm"],
  offerQualify: { qualify_quiz: true, insurance_storm: true },
  formSteps: [
    { id: "need", kind: "choice", options: [
      { v: "replace", icon: "ph-house-line" }, { v: "repair", icon: "ph-wrench" },
      { v: "inspect", icon: "ph-magnifying-glass" }, { v: "explore", icon: "ph-binoculars" } ] },
    { id: "material", kind: "choice", options: [
      { v: "tile", icon: "ph-stack" }, { v: "shingle", icon: "ph-squares-four" },
      { v: "foam", icon: "ph-rectangle" }, { v: "metal", icon: "ph-rows" }, { v: "unsure", icon: "ph-question" } ] },
    { id: "condition", kind: "choice", options: [
      { v: "leaking", icon: "ph-drop" }, { v: "damage", icon: "ph-warning" }, { v: "aging", icon: "ph-calendar-dots" } ] },
    { id: "owner", kind: "choice", options: [
      { v: "own", icon: "ph-key" }, { v: "rent", icon: "ph-buildings" } ] },
    { id: "address", kind: "address" },
    { id: "name", kind: "name" },
    { id: "contact", kind: "contact" },
  ],
  offersOwner: [
    { id: "solar", icon: "ph-sun" }, { id: "windows", icon: "ph-grid-nine" }, { id: "hvac", icon: "ph-wind" },
    { id: "pest", icon: "ph-bug-beetle" }, { id: "gutters", icon: "ph-cloud-rain" },
    { id: "landscape", icon: "ph-plant" }, { id: "windowcln", icon: "ph-sparkle" } ],
  offersRenter: [
    { id: "pest", icon: "ph-bug-beetle" }, { id: "security", icon: "ph-shield-check" }, { id: "hvac", icon: "ph-wind" },
    { id: "windowcln", icon: "ph-sparkle" }, { id: "rinsure", icon: "ph-umbrella" }, { id: "internet", icon: "ph-wifi-high" } ],
  trust: [
    { id: "licensed", icon: "ph-seal-check" }, { id: "local", icon: "ph-map-pin" },
    { id: "free", icon: "ph-hand-coins" }, { id: "spam", icon: "ph-shield-slash", spam: true } ],
  stats: [
    { id: "rating", value: 4.9, suffix: "", decimals: 1 },
    { id: "matched", value: 2800, suffix: "+", decimals: 0 },
    { id: "speed", value: 2, suffix: " min", decimals: 0 } ],
  steps: [
    { id: "s1", n: 1, icon: "ph-house" }, { id: "s2", n: 2, icon: "ph-users-three" }, { id: "s3", n: 3, icon: "ph-phone-call" } ],
  azSuggest: [
    "E Camelback Rd, Phoenix, AZ 85016", "N Gilbert Rd, Gilbert, AZ 85234", "W Ray Rd, Chandler, AZ 85224",
    "E University Dr, Mesa, AZ 85203", "N Scottsdale Rd, Scottsdale, AZ 85257" ],
};

const OFFER_LABELS = {
  free_quote: "Free quote", free_inspection: "Free inspection", qualify_quiz: "Qualify quiz",
  zero_down: "$0 down", insurance_storm: "Insurance / storm",
};

function detectLang() {
  try {
    const p = new URLSearchParams(location.search).get("lang");
    if (p === "es" || p === "en") return p;
    const ls = localStorage.getItem("vhp_lang");
    if (ls === "es" || ls === "en") return ls;
    if ((navigator.language || "").toLowerCase().startsWith("es")) return "es";
  } catch (e) {}
  return "en";
}
function persistLang(l) { try { localStorage.setItem("vhp_lang", l); } catch (e) {} }

const LangCtx = React.createContext({ lang: "en", t: null, setLang: () => {} });
function useT() { return React.useContext(LangCtx).t; }
function useLang() { const c = React.useContext(LangCtx); return [c.lang, c.setLang]; }

Object.assign(window, {
  BRAND, PHONE, PHONE_TEL, META, OFFER_LABELS,
  detectLang, persistLang, LangCtx, useT, useLang,
});
