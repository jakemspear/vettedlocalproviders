/* thankyou.jsx — offer wall + email step + confirmation. Exported to window.
   Funnel order: form -> EmailStep -> Processing -> OfferWall -> Confirmation. */
const { useState: useStateT, useMemo: useMemoT, useEffect: useEffectT } = React;

function saveVCard() {
  const a = document.createElement("a");
  a.href = "casa-concierge.vcf";
  a.download = "casa-concierge.vcf";
  document.body.appendChild(a); a.click(); a.remove();
}

function OfferCard({ icon, eyebrow, head, benefit, on, onToggle, i }) {
  const T = useT();
  const toggle = () => { onToggle(); buzz(10); };
  const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };
  return (
    <div className={`offer${on ? " on" : ""}`} style={{ "--i": i }}
      role="button" tabIndex={0} aria-pressed={on} onClick={toggle} onKeyDown={onKey}>
      <div className="o-ico"><Ico name={icon} weight={on ? "fill" : "duotone"} /></div>
      <div className="o-body">
        <div className="o-eyebrow">{eyebrow}</div>
        <div className="o-head">{head}</div>
        <div className="o-benefit">{benefit}</div>
      </div>
      <div className="o-toggle" aria-hidden="true">
        {on
          ? <><span className="o-check"><CheckDraw on={on} size={18} color="#2A1E08" /></span> {T.ty.toggleAdded}</>
          : <><Ico name="ph-plus" weight="bold" /> {T.ty.toggleAdd}</>}
      </div>
    </div>
  );
}

/* funnel step 5: cross-sell wall (after the loading sequence) */
function OfferWall({ t, answers, onContinue }) {
  const motion = useMotion();
  const T = useT();
  const isRenter = answers && answers.owner === "rent";
  const metaOffers = isRenter ? META.offersRenter : META.offersOwner;
  const copyOffers = isRenter ? T.ty.offersRenter : T.ty.offersOwner;
  const [picked, setPicked] = useStateT({});
  const count = useMemoT(() => Object.values(picked).filter(Boolean).length, [picked]);
  const toggle = (id) => setPicked((p) => ({ ...p, [id]: !p[id] }));

  const wallClass = t.offers === "list" ? "wall list" : t.offers === "tile" ? "wall tile" : "wall";
  const ctaParts = T.ty.ctaN.split("{n}");

  return (
    <div className="ty offerwall screen-enter">
      <section className="section ty-narr ow-top">
        <div className="eyebrow">{T.ty.narrEyebrow}</div>
        <h2 className="display sec-h2">{T.ty.narrTitle}</h2>
        <span className="ty-narr-loc"><Ico name="ph-map-pin" weight="fill" /> {T.ty.narrSub}</span>
        <p className="ty-narr-body">{T.ty.narrSubDetail}</p>
      </section>

      <section className="section tight ty-wall-sec">
        <div className="ty-wall-head">
          <h2 className="display sec-h2">{isRenter ? T.ty.wallHeadRenter : T.ty.wallHeadOwner}</h2>
          <span className="ty-wall-tag"><Ico name="ph-hand-tap" weight="fill" /> {T.ty.tapToAdd}</span>
        </div>
        <div className={`${wallClass}${motion ? " stagger" : ""}`}>
          {metaOffers.map((o, idx) => (
            <OfferCard key={o.id} icon={o.icon} eyebrow={copyOffers[o.id].eyebrow}
              head={copyOffers[o.id].head} benefit={copyOffers[o.id].benefit}
              on={!!picked[o.id]} onToggle={() => toggle(o.id)} i={idx} />
          ))}
        </div>
      </section>

      <div className="ty-addbar">
        <div className="ty-addbar-inner">
          <button className="btn btn-gold cta" onClick={() => onContinue(Object.keys(picked).filter((id) => picked[id]))}>
            {count === 0
              ? <>{T.ty.ctaZero} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></>
              : <>{ctaParts[0]}<Odometer value={count} />{ctaParts[1]} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" /></>}
          </button>
          {count >= 1 && (
            <button className="ty-skip" onClick={() => onContinue([])}>
              {T.ty.skip} <Ico name="ph-arrow-right" weight="bold" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* funnel step 3: optional, skippable email step (right after form submit) */
function EmailStep({ onDone }) {
  const T = useT();
  const [val, setVal] = useStateT("");
  const ok = /\S+@\S+\.\S+/.test(val);
  return (
    <div className="email-step screen-enter">
      <div className="email-step-inner">
        <div className="email-step-ico"><Ico name="ph-envelope-simple" weight="duotone" /></div>
        <h2 className="display email-step-h">{T.ty.emailStepH}</h2>
        <p className="email-step-sub">{T.ty.emailStepSub}</p>
        <form className="email-step-form" onSubmit={(e) => { e.preventDefault(); onDone({ email: val, emailCaptureStatus: "submitted" }); }}>
          <div className="input-ico-wrap">
            <Ico name="ph-envelope-simple" className="input-ico" />
            <input type="email" inputMode="email" className="input has-ico" placeholder={T.ty.emailPlaceholder}
              value={val} onChange={(e) => setVal(e.target.value)} autoFocus />
          </div>
          <button type="submit" className="btn btn-gold cta" disabled={!ok}>
            {T.ty.emailBtn} <Ico name="ph-arrow-right" weight="bold" className="cta-arrow" />
          </button>
        </form>
        <button className="email-step-skip" onClick={() => onDone({ email: "", emailCaptureStatus: "skipped" })}>{T.ty.emailSkip}</button>
      </div>
    </div>
  );
}

/* funnel step 6: confirmation with the 2-minute countdown + what-happens-next */
function Confirmation({ offer, answers, count, onRestart }) {
  const motion = useMotion();
  const T = useT();
  const c = T.confirmed;
  const tst = T.testimonials[0];
  const isRenter = answers && answers.owner === "rent";
  const celebrate = !!(offer && offer.qualify) && !isRenter;

  const [expired, setExpired] = useStateT(false);
  const [fire, setFire] = useStateT(false);
  useEffectT(() => {
    if (!celebrate) return;
    const id = setTimeout(() => setFire(true), motion ? 700 : 0);
    return () => clearTimeout(id);
  }, []);

  const callParts = T.ty.callfrom.split("{phone}");
  const nextIcons = ["ph-users-three", "ph-phone-call", "ph-chat-circle-text"];

  return (
    <div className="ty confirmation screen-enter">
      <section className="ty-hero">
        {expired ? (
          <div className="ty-expired">
            <div className="ty-expired-ico"><Ico name="ph-phone-call" weight="fill" /></div>
            <h1 className="display ty-h1">{T.ty.expiredH}</h1>
            <a className="btn btn-gold cta ty-callbtn" href={`tel:${PHONE_TEL}`}>
              <Ico name="ph-phone-call" weight="bold" /> {T.ty.callNow}
            </a>
          </div>
        ) : (
          <>
            <div className="ty-ring">
              <Celebration fire={fire} />
              <CountdownRing total={120} label={T.ty.ringLabel} onExpire={() => setExpired(true)} />
            </div>
            {celebrate && (
              <div className="ty-qualify"><Ico name="ph-seal-check" weight="fill" /> {T.ty.qualify}</div>
            )}
            <h1 className="display ty-h1">{T.ty.h}</h1>
            <p className="ty-callfrom">
              <Ico name="ph-phone-outgoing" weight="fill" />
              <span>{callParts[0]}<strong className={motion ? "ty-phone-in" : ""}>{PHONE}</strong>{callParts[1]}</span>
            </p>
          </>
        )}
      </section>

      <section className="section confirmed-body-sec">
        <div className="next-card">
          <div className="next-h">{c.nextH}</div>
          <ol className="next-list">
            {c.next.map((n, i) => (
              <li key={i}>
                <span className="next-num">{i + 1}</span>
                <span className="next-ico"><Ico name={nextIcons[i]} weight="duotone" /></span>
                <span className="next-label">{n.replace("{phone}", PHONE)}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="save-card">
          <div className="save-ico"><Ico name="ph-address-book" weight="duotone" /></div>
          <div className="save-body">
            <div className="save-h">{c.saveH}</div>
            <p className="save-sub">{c.saveSub}</p>
          </div>
          <button className="btn btn-pine save-btn" onClick={saveVCard}>
            <Ico name="ph-download-simple" weight="bold" /> {c.saveBtn}
          </button>
        </div>

        <figure className="confirmed-tst">
          <Ico name="ph-quotes" weight="fill" className="confirmed-tst-mark" />
          <blockquote>{tst.quote}</blockquote>
          <figcaption><span>{tst.name}</span> · <span>{tst.city}</span></figcaption>
        </figure>

        <button className="confirmed-restart" onClick={onRestart}>
          <Ico name="ph-arrow-counter-clockwise" weight="bold" /> {c.restart}
        </button>
      </section>
    </div>
  );
}

Object.assign(window, { OfferWall, EmailStep, Confirmation });
