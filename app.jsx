/* app.jsx — root: routing + tweaks + i18n + mount. */
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "view": "auto",
  "offer": "free_inspection",
  "monsoon": false,
  "motion": true,
  "offers": "cards",
  "accent": ["#E0A23B", "#C7861E"]
}/*EDITMODE-END*/;

/* Force-preview the desktop or mobile layout regardless of viewport. */
function applyView(mode) {
  const html = document.documentElement;
  const vw = window.innerWidth;
  const desktop = mode === "desktop" ? true : mode === "mobile" ? false : vw >= 900;
  html.classList.toggle("is-desktop", desktop);
  const scaled = mode === "desktop" && vw < 1180;
  html.classList.toggle("ds-scaled", scaled);
  if (scaled) html.style.setProperty("--ds-zoom", Math.max(0.3, vw / 1180).toFixed(4));
  else html.style.removeProperty("--ds-zoom");
}

function resolveOffer(T, id, monsoon) {
  const base = T.presets[id] || T.presets.free_quote;
  const qualify = !!META.offerQualify[id];
  if (monsoon) return { ...base, eyebrow: T.monsoon.eyebrow, headline: T.monsoon.headline, cta: T.monsoon.cta, qualify };
  return { ...base, qualify };
}

function resolveOfferLabel(offerId, monsoon) {
  if (monsoon) return "monsoon-ready roof inspection";
  const offerLabels = {
    free_quote: "free roof quote",
    free_inspection: "roof inspection",
    qualify_quiz: "roof qualification review",
    zero_down: "$0 down roof quote",
    insurance_storm: "storm damage roof review",
  };
  return offerLabels[offerId] || "roof inspection";
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLangState] = useStateA(detectLang());
  const [route, setRoute] = useStateA("landing");
  const [answers, setAnswers] = useStateA(null);
  const [picked, setPicked] = useStateA([]);
  const [editModeActive, setEditModeActive] = useStateA(false);

  const T = window.STRINGS[lang] || window.STRINGS.en;
  const setLang = (l) => { setLangState(l); persistLang(l); document.documentElement.lang = l; };
  const offer = resolveOffer(T, t.offer, t.monsoon);

  useEffectA(() => { document.documentElement.lang = lang; }, [lang]);

  useEffectA(() => {
    const pal = Array.isArray(t.accent) ? t.accent : [t.accent, t.accent];
    const root = document.documentElement;
    root.style.setProperty("--accent", pal[0]);
    root.style.setProperty("--accent-deep", pal[1] || pal[0]);
    root.style.setProperty("--gold", pal[0]);
    root.style.setProperty("--gold-deep", pal[1] || pal[0]);
  }, [t.accent]);

  useEffectA(() => { document.documentElement.classList.toggle("no-motion", !t.motion); }, [t.motion]);

  useEffectA(() => {
    const onMsg = (e) => {
      const type = e?.data?.type;
      if (type === "__activate_edit_mode") setEditModeActive(true);
      if (type === "__deactivate_edit_mode" || type === "__edit_mode_dismissed") setEditModeActive(false);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffectA(() => {
    const mode = editModeActive ? t.view : "auto";
    applyView(mode);
    const on = () => applyView(mode);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [editModeActive, t.view]);

  const go = (r) => { setRoute(r); requestAnimationFrame(() => window.scrollTo({ top: 0 })); };
  const syncLead = async (checkpoint, data) => {
    if (typeof window.submitLeadCheckpoint !== "function") return;
    await window.submitLeadCheckpoint(checkpoint, data);
  };

  const handleInitialComplete = async (nextAnswers) => {
    const leadAnswers = {
      ...nextAnswers,
      offer: resolveOfferLabel(t.offer, t.monsoon),
      offerId: t.offer,
      opportunityValue: 350,
    };
    setAnswers(leadAnswers);
    await syncLead("initial_form", leadAnswers);
    go("email");
  };

  const handleEmailDone = async ({ email, emailCaptureStatus }) => {
    const nextAnswers = { ...(answers || {}), email: email || "", emailCaptureStatus };
    setAnswers(nextAnswers);
    await syncLead("email_capture", nextAnswers);
    go("processing");
  };

  const handleAdditionalServices = async (selectedServices) => {
    const nextPicked = Array.isArray(selectedServices) ? selectedServices : [];
    const nextAnswers = { ...(answers || {}), additionalServices: nextPicked };
    setPicked(nextPicked);
    setAnswers(nextAnswers);
    await syncLead("additional_services", nextAnswers);
    go("confirmation");
  };

  return (
    <LangCtx.Provider value={{ lang, t: T, setLang }}>
      <MotionCtx.Provider value={!!t.motion}>
        {route === "landing" && <Landing offer={offer} onStart={() => go("form")} />}
        {route === "form" && (
          <Form offer={offer} onBackToStart={() => go("landing")} onComplete={handleInitialComplete} />
        )}
        {route === "email" && <EmailStep onDone={handleEmailDone} />}
        {route === "processing" && <Processing answers={answers} onDone={() => go("offerwall")} />}
        {route === "offerwall" && (
          <OfferWall t={t} answers={answers} onContinue={handleAdditionalServices} />
        )}
        {route === "confirmation" && (
          <Confirmation offer={offer} answers={answers} count={picked.length}
            onRestart={() => { setAnswers(null); setPicked([]); go("landing"); }} />
        )}

        {ReactDOM.createPortal(
        <TweaksPanel>
          <TweakSection label="View" />
          <TweakRadio label="Layout" value={t.view} options={["auto", "mobile", "desktop"]} onChange={(v) => setTweak("view", v)} />

          <TweakSection label="Language" />
          <TweakRadio label="Locale" value={lang} options={["en", "es"]} onChange={(v) => setLang(v)} />

          <TweakSection label="Offer (A/B headline)" />
          <TweakSelect label="Angle" value={t.offer}
            options={META.offerOrder.map((id) => ({ value: id, label: OFFER_LABELS[id] }))}
            onChange={(v) => setTweak("offer", v)} />
          <TweakToggle label="Monsoon urgency" value={t.monsoon} onChange={(v) => setTweak("monsoon", v)} />

          <TweakSection label="Motion" />
          <TweakToggle label="Animations on" value={t.motion} onChange={(v) => setTweak("motion", v)} />

          <TweakSection label="Offer wall" />
          <TweakRadio label="Card style" value={t.offers} options={["cards", "list", "tile"]} onChange={(v) => setTweak("offers", v)} />

          <TweakSection label="Accent" />
          <TweakColor label="CTA color" value={t.accent}
            options={[["#E0A23B", "#C7861E"], ["#E8B84B", "#CC9A2A"], ["#CE823C", "#AE6526"], ["#D69A4E", "#B97E2F"]]}
            onChange={(v) => setTweak("accent", v)} />
        </TweaksPanel>, document.body)}
      </MotionCtx.Provider>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
