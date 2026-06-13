/* i18n.jsx — locale dictionaries + language context. Exported to window.
   Shared structural META (icons, ids, values) stays language-neutral;
   all human copy lives in STRINGS.en / STRINGS.es keyed by id. */

const BRAND = "Casa Concierge";
const LEGAL_NAME = "Scaling Adventures, LLC";
const LEGAL_DBA = "Scaling Adventures, LLC d/b/a Casa Concierge";
const PHONE = "(520) 277-2778";
const PHONE_TEL = "+15202772778";
const EMAIL = "hello@textcasaconcierge.com";
const ADDRESS = "30 N Gould St Ste R, Sheridan, WY 82801";
const ADDRESS_VCARD = "30 N Gould St Ste R;Sheridan;WY;82801;United States";
const PRIVACY_PAGE = "privacy-policy.html";
const TERMS_PAGE = "terms-of-service.html";

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
    { id: "landscape", icon: "ph-plant" }, { id: "windowcleaning", icon: "ph-sparkle" } ],
  offersRenter: [
    { id: "pest", icon: "ph-bug-beetle" }, { id: "alarms", icon: "ph-shield-check" }, { id: "hvac", icon: "ph-wind" },
    { id: "windowcleaning", icon: "ph-sparkle" }, { id: "housecleaning", icon: "ph-broom" }, { id: "plumbing", icon: "ph-wrench" } ],
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
    "1234 E Camelback Rd, Phoenix, AZ 85016",
    "2211 N Scottsdale Rd, Scottsdale, AZ 85257",
    "875 W Ray Rd, Chandler, AZ 85225",
    "1430 E University Dr, Mesa, AZ 85203",
    "990 N Gilbert Rd, Gilbert, AZ 85234",
    "4500 N Oracle Rd, Tucson, AZ 85705",
    "7014 E Broadway Blvd, Tucson, AZ 85710",
    "2020 S Mill Ave, Tempe, AZ 85282",
    "1845 E Baseline Rd, Phoenix, AZ 85042",
    "3030 W Happy Valley Rd, Phoenix, AZ 85083",
    "1601 N Litchfield Rd, Goodyear, AZ 85395",
    "1455 W Southern Ave, Apache Junction, AZ 85120" ],
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
  BRAND, LEGAL_NAME, LEGAL_DBA, PHONE, PHONE_TEL, EMAIL, ADDRESS, ADDRESS_VCARD, PRIVACY_PAGE, TERMS_PAGE, META, OFFER_LABELS,
  detectLang, persistLang, LangCtx, useT, useLang,
});
