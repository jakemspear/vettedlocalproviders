/* form.jsx — screen 2: multi-step roofing form + processing. Exported to window. */
const { useState: useStateF, useEffect: useEffectF } = React;

function normalizeAddr(v) {
  return (v || "").toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreAddressMatch(query, candidate) {
  const q = normalizeAddr(query);
  const c = normalizeAddr(candidate);
  if (!q || !c) return -1;
  if (c.startsWith(q)) return 400 - c.length;
  const qNoNumber = q.replace(/^\d+\s*/, "");
  if (qNoNumber && c.startsWith(qNoNumber)) return 320 - c.length;

  const tokens = q.split(" ").filter(Boolean);
  if (!tokens.length) return -1;
  let score = 0;
  for (const token of tokens) {
    if (c.startsWith(token)) score += 90;
    else if (c.includes(` ${token}`)) score += 60;
    else if (c.includes(token)) score += 35;
    else return -1;
  }
  return score - c.length * 0.01;
}

function getFallbackAddressMatches(query) {
  const ranked = META.azSuggest
    .map((candidate) => ({ candidate, score: scoreAddressMatch(query, candidate) }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  const labels = ranked.map((item) => item.candidate);
  const trimmed = query.trim();
  if (trimmed.length >= 5 && !labels.includes(trimmed)) labels.unshift(trimmed);
  return labels.slice(0, 6);
}

function cityFromAddress(addr) {
  if (!addr) return "your area";
  const parts = addr.split(",").map((s) => s.trim()).filter(Boolean);
  const azIdx = parts.findIndex((p) => /\bAZ\b/i.test(p));
  if (azIdx > 0) return parts[azIdx - 1];
  if (parts.length >= 2) return parts[1];
  return "your area";
}

function fetchPlacePredictions(query, lang, signal) {
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("limit", "5");
  url.searchParams.set("q", /\b(usa|united states)\b/i.test(query) ? query : `${query}, USA`);
  url.searchParams.set("lang", lang === "es" ? "es" : "en");

  return fetch(url.toString(), {
    signal,
    headers: {
      Accept: "application/json",
    },
  }).then(async (res) => {
    if (!res.ok) throw new Error(`photon-${res.status}`);
    const data = await res.json();
    const next = [];
    for (const item of Array.isArray(data?.features) ? data.features : []) {
      const props = item?.properties || {};
      const streetLine = [props.housenumber, props.street].filter(Boolean).join(" ").trim();
      const locality = [props.city || props.town || props.village || props.county, props.state, props.postcode]
        .filter(Boolean)
        .join(", ");
      const label = [streetLine || props.name, locality, props.country]
        .filter(Boolean)
        .join(", ");
      if (label && !next.some((entry) => entry.label === label)) {
        next.push({ id: item?.properties?.osm_id || label, label });
      }
    }
    return next;
  });
}

function StepHead({ id }) {
  const motion = useMotion();
  const T = useT();
  const s = T.form.steps[id];
  return (
    <div className="form-q">
      <h2 className="display form-q-text">{s.q}</h2>
      {s.why ? <p className={`form-why${motion ? " delay" : ""}`}>{s.why}</p> : null}
    </div>
  );
}

function ChoiceStep({ meta, value, onPick }) {
  const T = useT();
  const s = T.form.steps[meta.id];
  const renter = meta.id === "owner" && value === "rent";
  return (
    <div>
      <StepHead id={meta.id} />
      <div className="choices">
        {meta.options.map((o) => {
          const on = value === o.v;
          return (
            <button key={o.v} className={`choice${on ? " selected" : ""}`} onClick={() => onPick(meta, o.v)}>
              <span className="c-ico"><Ico name={o.icon} /></span>
              <span className="c-label">{s.options[o.v]}</span>
              {on
                ? <span className="c-check"><CheckDraw on={on} size={22} color="var(--gold-deep)" /></span>
                : <Ico name="ph-arrow-right" weight="bold" className="c-arrow" />}
            </button>
          );
        })}
      </div>
      {renter && (
        <div className="renter-note rise">
          <Ico name="ph-info" weight="fill" />
          <div>
            <strong>{T.form.renter.strong}</strong>
            <span>{T.form.renter.body}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AddressStep({ data, set, onNext }) {
  const T = useT();
  const [lang] = useLang();
  const s = T.form.steps.address;
  const [open, setOpen] = useStateF(false);
  const [found, setFound] = useStateF(false);
  const [active, setActive] = useStateF(0);
  const [matches, setMatches] = useStateF(() => META.azSuggest.slice(0, 4).map((label) => ({ id: label, label })));
  const [loadingMatches, setLoadingMatches] = useStateF(false);
  const [lookupFallback, setLookupFallback] = useStateF(false);
  const val = data.address || "";
  useEffectF(() => { setActive(0); }, [val, matches.length]);

  useEffectF(() => {
    const ctrl = new AbortController();

    if (val.trim().length <= 1) {
      setLoadingMatches(false);
      setLookupFallback(false);
      setMatches(META.azSuggest.slice(0, 4).map((label) => ({ id: label, label })));
      return undefined;
    }

    setLoadingMatches(true);
    setLookupFallback(false);
    const timer = setTimeout(() => {
      fetchPlacePredictions(val, lang, ctrl.signal)
        .then((predictions) => {
          if (predictions.length) {
            setMatches(predictions);
            return;
          }
          setMatches(getFallbackAddressMatches(val).map((label) => ({ id: label, label })));
          setLookupFallback(true);
        })
        .catch((err) => {
          if (err && err.name === "AbortError") return;
          setMatches(getFallbackAddressMatches(val).map((label) => ({ id: label, label })));
          setLookupFallback(true);
        })
        .finally(() => {
          if (!ctrl.signal.aborted) setLoadingMatches(false);
        });
    }, 280);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [lang, val]);

  const pick = (match) => {
    set("address", match.label);
    setOpen(false);
    setFound(true);
  };

  const onKeyDown = (e) => {
    if (!open || !matches.length) {
      if (e.key === "ArrowDown" && matches.length) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (matches[active]) {
        e.preventDefault();
        pick(matches[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };
  return (
    <div>
      <StepHead id="address" />
      <div className="field" style={{ position: "relative" }}>
        <label htmlFor="addr">{s.label}</label>
        <div className="input-ico-wrap">
          <Ico name="ph-map-pin" className="input-ico" />
          <input id="addr" className="input has-ico" autoComplete="off" placeholder={s.placeholder} value={val}
            onChange={(e) => { set("address", e.target.value); setOpen(true); setFound(false); }}
            onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={onKeyDown} />
        </div>
        {loadingMatches && <p className="submit-hint" style={{ textAlign: "left", marginTop: 8 }}>{s.loading}</p>}
        {lookupFallback && val.trim().length > 1 && !loadingMatches && (
          <p className="submit-hint" style={{ textAlign: "left", marginTop: 8 }}>{s.fallback}</p>
        )}
        {open && matches.length > 0 && (
          <ul className="suggest">
            {matches.map((m, idx) => (
              <li key={m.id} className={idx === active ? "active" : ""} onMouseDown={() => pick(m)}>
                <Ico name="ph-map-pin" /> <span>{m.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {found && !open && (
        <div className="addr-found">
          <span className="addr-found-check"><Ico name="ph-check-circle" weight="fill" /></span>
          <div><strong>{s.found}</strong><span>{val}</span></div>
        </div>
      )}
      <ContinueBar disabled={val.trim().length < 4} onNext={onNext} />
    </div>
  );
}

function NameStep({ data, set, onNext }) {
  const T = useT();
  const s = T.form.steps.name;
  const ok = (data.first || "").trim() && (data.last || "").trim();
  return (
    <div>
      <StepHead id="name" />
      <div className="row-2">
        <div className="field">
          <label htmlFor="first">{s.first}</label>
          <input id="first" className="input" value={data.first || ""} onChange={(e) => set("first", e.target.value)} placeholder={s.first} />
        </div>
        <div className="field">
          <label htmlFor="last">{s.last}</label>
          <input id="last" className="input" value={data.last || ""} onChange={(e) => set("last", e.target.value)} placeholder={s.last} />
        </div>
      </div>
      <ContinueBar disabled={!ok} onNext={onNext} />
    </div>
  );
}

function ContactStep({ data, set, onSubmit, offer }) {
  const T = useT();
  const s = T.form.steps.contact;
  const [focusPhone, setFocusPhone] = useStateF(false);
  const [submitting, setSubmitting] = useStateF(false);
  const digits = (data.phone || "").replace(/\D/g, "");
  const ok = digits.length >= 10;
  const submitLabel = offer?.cta || s.submit;
  const consentText = (T.form.tcpa || "").replace("{cta}", submitLabel);
  const go = () => { if (!ok || submitting) return; setSubmitting(true); buzz(14); setTimeout(onSubmit, 360); };
  return (
    <div>
      <StepHead id="contact" />
      <div className="field">
        <label htmlFor="phone">{s.phoneLabel}</label>
        <div className="input-ico-wrap">
          <Ico name={focusPhone ? "ph-lock-key" : "ph-phone"} weight={focusPhone ? "fill" : undefined} className={`input-ico${focusPhone ? " lock-lit" : ""}`} />
          <input id="phone" type="tel" inputMode="tel" className="input has-ico" placeholder={s.phonePlaceholder} value={data.phone || ""}
            onFocus={() => setFocusPhone(true)} onBlur={() => setFocusPhone(false)}
            onChange={(e) => set("phone", fmtPhone(e.target.value))} />
        </div>
        <div className="antispam">
          <Ico name="ph-shield-check" weight="fill" />
          <p>{T.form.antispam.lead} <strong>{T.form.antispam.emphasis}</strong><br />{T.form.antispam.tail}</p>
        </div>
      </div>
      <label className={`consent${data.consent ? " on" : ""}`}>
        <input type="checkbox" checked={!!data.consent} onChange={(e) => set("consent", e.target.checked)} />
        <span className="consent-box"><Ico name="ph-check" weight="bold" /></span>
        <span className="consent-text">
          <strong>{T.form.smsOptInLabel}</strong>{" "}
          <span>{consentText}</span>
          <span className="consent-meta">{T.form.tcpaMeta}</span>
          <span className="consent-links">
            <a href={PRIVACY_PAGE} target="_blank" rel="noreferrer">Privacy Policy</a>
            <span>·</span>
            <a href={TERMS_PAGE} target="_blank" rel="noreferrer">Terms of Service</a>
          </span>
        </span>
      </label>
      <button className={`btn btn-gold submit${submitting ? " loading" : ""}`} disabled={!ok || submitting} onClick={go} style={{ marginTop: 4 }}>
        {submitting ? <span className="spin" /> : <>{submitLabel} <Ico name="ph-arrow-right" weight="bold" /></>}
      </button>
      {!ok && <p className="submit-hint">{s.hint}</p>}
    </div>
  );
}

function ContinueBar({ disabled, onNext }) {
  const T = useT();
  return (
    <button className="btn btn-pine" disabled={disabled} onClick={onNext} style={{ marginTop: 8 }}>
      {T.form.continue} <Ico name="ph-arrow-right" weight="bold" />
    </button>
  );
}

function fmtPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function Form({ offer, onComplete, onBackToStart }) {
  const motion = useMotion();
  const T = useT();
  const [i, setI] = useStateF(0);
  const [dir, setDir] = useStateF(1);
  const [data, setData] = useStateF({});
  const steps = META.formSteps;
  const total = steps.length;
  const meta = steps[i];
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const advance = () => { if (i + 1 >= total) return; setDir(1); setI(i + 1); requestAnimationFrame(() => window.scrollTo({ top: 0 })); };
  const back = () => { if (i === 0) { onBackToStart(); return; } setDir(-1); setI(i - 1); requestAnimationFrame(() => window.scrollTo({ top: 0 })); };

  const onPick = (m, v) => {
    set(m.id, v); buzz(10);
    if (m.id === "owner" && v === "rent") return;
    setTimeout(advance, motion ? 420 : 120);
  };

  const submit = () => onComplete({ ...data, owner: data.owner || "own" });
  const progress = (i + 1) / total;
  const enterClass = motion ? (dir > 0 ? " enter-right" : " enter-left") : "";

  return (
    <div className="form-wrap screen-enter">
      <div className="form-top">
        <button className="form-back" onClick={back} aria-label={T.form.back}><Ico name="ph-arrow-left" weight="bold" /></button>
        <Progress value={progress} />
        <div className="form-count">{i + 1}<span>/{total}</span></div>
      </div>

      <div className={`form-body${enterClass}`} key={meta.id}>
        {meta.kind === "choice" && <ChoiceStep meta={meta} value={data[meta.id]} onPick={onPick} />}
        {meta.kind === "address" && <AddressStep data={data} set={set} onNext={advance} />}
        {meta.kind === "name" && <NameStep data={data} set={set} onNext={advance} />}
        {meta.kind === "contact" && <ContactStep data={data} set={set} onSubmit={submit} offer={offer} />}

        {meta.id === "owner" && data.owner === "rent" && (
          <button className="btn btn-pine" onClick={advance} style={{ marginTop: 16 }}>
            {T.form.continueAnyway} <Ico name="ph-arrow-right" weight="bold" />
          </button>
        )}
      </div>

      <div className="form-foot"><Ico name="ph-lock-simple" weight="fill" /> {T.form.foot}</div>
    </div>
  );
}

function Processing({ answers, onDone }) {
  const motion = useMotion();
  const T = useT();
  const city = cityFromAddress(answers && answers.address);
  const items = [
    { icon: "ph-users-three", label: T.processing.items.match },
    { icon: "ph-map-pin", label: T.processing.items.confirm.replace("{city}", city) },
    { icon: "ph-phone-call", label: T.processing.items.reserve },
  ];
  const [done, setDone] = useStateF(0);
  useEffectF(() => {
    const per = motion ? 950 : 220;
    const id = setInterval(() => {
      setDone((n) => {
        const next = n + 1;
        if (next >= items.length) { clearInterval(id); setTimeout(onDone, motion ? 600 : 150); }
        return next;
      });
    }, per);
    return () => clearInterval(id);
  }, []);
  const progress = Math.min(1, (done + 0.35) / items.length);
  return (
    <div className="processing screen-enter">
      <div className="proc-inner">
        <div className="proc-brand"><Ico name="ph-house" weight="duotone" /></div>
        <h2 className="display proc-title">{T.processing.title}</h2>
        <Progress value={progress} />
        <ul className="proc-list">
          {items.map((it, idx) => {
            const state = idx < done ? "done" : idx === done ? "active" : "idle";
            return (
              <li key={idx} className={`proc-item ${state}`}>
                <span className="proc-mark">
                  {state === "done" ? <Ico name="ph-check-circle" weight="fill" />
                    : state === "active" ? <span className="spin dark" /> : <Ico name={it.icon} />}
                </span>
                <span className="proc-label">{it.label}</span>
              </li>
            );
          })}
        </ul>
        <p className="proc-foot"><Ico name="ph-shield-check" weight="fill" /> {T.processing.foot}</p>
      </div>
    </div>
  );
}

Object.assign(window, { Form, Processing, cityFromAddress });
