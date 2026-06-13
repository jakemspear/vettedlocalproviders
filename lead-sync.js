(function () {
  const STORAGE_KEY = "vlp_lead_session_id";
  const SOURCE_PARAM_KEYS = ["source_id", "source", "src"];
  const PRIMARY_SERVICE_FALLBACK = "roofing";

  const SOURCE_ALIASES = [
    { match: ["meta", "facebook", "fb", "instagram", "ig"], value: "meta" },
    { match: ["google-local", "google_local", "googlemaps", "google-maps", "gmb", "gbp"], value: "google-local" },
    { match: ["google"], value: "google" },
    { match: ["chatgpt", "chat.openai", "openai"], value: "chatgpt" },
    { match: ["bing"], value: "bing" },
    { match: ["tiktok"], value: "tiktok" },
    { match: ["youtube", "youtu.be"], value: "youtube" },
    { match: ["yelp"], value: "yelp" },
  ];

  function slugify(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function uniq(values) {
    return Array.from(new Set((values || []).filter(Boolean)));
  }

  function getLeadSessionId() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) return existing;
      const next = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    } catch (e) {
      return `lead_${Date.now()}`;
    }
  }

  function getPrimaryServiceId() {
    if (window.PRIMARY_SERVICE_ID) return slugify(window.PRIMARY_SERVICE_ID);
    if (window.VERTICAL) return slugify(window.VERTICAL);
    const path = (location.pathname || "").toLowerCase();
    if (path.includes("roof")) return "roofing";
    return PRIMARY_SERVICE_FALLBACK;
  }

  function readSourceId(params) {
    for (const key of SOURCE_PARAM_KEYS) {
      const value = params.get(key);
      if (value) return slugify(value);
    }
    return "";
  }

  function normalizeKnownSource(value) {
    const normalized = slugify(value);
    if (!normalized) return "";
    for (const alias of SOURCE_ALIASES) {
      if (alias.match.some((token) => normalized.includes(token))) return alias.value;
    }
    return normalized;
  }

  function detectReferrerSource() {
    const referrer = document.referrer || "";
    if (!referrer) return "direct";

    try {
      const refUrl = new URL(referrer);
      const host = refUrl.hostname.toLowerCase();
      const path = refUrl.pathname.toLowerCase();
      if (host.includes("chatgpt.com") || host.includes("chat.openai.com")) return "chatgpt";
      if (host.includes("google.")) return path.includes("/maps") ? "google-local" : "google";
      if (host.includes("facebook.com") || host.includes("instagram.com")) return "meta";
      if (host.includes("bing.com")) return "bing";
      if (host.includes("tiktok.com")) return "tiktok";
      if (host.includes("youtube.com") || host.includes("youtu.be")) return "youtube";
      if (host.includes("yelp.com")) return "yelp";
      return slugify(host.replace(/^www\./, ""));
    } catch (e) {
      return "direct";
    }
  }

  function resolveSourceInfo() {
    const params = new URLSearchParams(location.search || "");
    const explicitSource = normalizeKnownSource(readSourceId(params));
    const utmSource = normalizeKnownSource(params.get("utm_source"));
    const utmMedium = slugify(params.get("utm_medium"));
    const utmCampaign = slugify(params.get("utm_campaign"));
    const gclid = params.get("gclid") || "";
    const fbclid = params.get("fbclid") || "";

    let sourceId = explicitSource || utmSource;
    if (!sourceId && gclid) sourceId = "google";
    if (!sourceId && fbclid) sourceId = "meta";
    if (!sourceId) sourceId = detectReferrerSource();

    if (sourceId === "google" && (utmMedium.includes("local") || utmCampaign.includes("local"))) {
      sourceId = "google-local";
    }

    return {
      source_id: sourceId || "direct",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      gclid,
      fbclid,
      referrer: document.referrer || "",
      landing_path: location.pathname || "",
      landing_url: location.href,
    };
  }

  function normalizeAdditionalServices(values) {
    return uniq((values || []).map((value) => slugify(value)));
  }

  function buildTags(checkpoint, data, sourceInfo) {
    const tags = [
      `service_primary:${getPrimaryServiceId()}`,
      `lead_checkpoint:${slugify(checkpoint)}`,
      `source:${sourceInfo.source_id || "direct"}`,
    ];

    const offerId = slugify(data.offerId || data.offer);
    if (offerId) tags.push(`offer:${offerId}`);

    const additionalServices = normalizeAdditionalServices(data.additionalServices);
    additionalServices.forEach((serviceId) => {
      tags.push(`service_additional:${serviceId}`);
    });

    if (data.email) tags.push("lead_has_email:true");
    if (data.emailCaptureStatus === "skipped") tags.push("lead_email_capture:skipped");
    if (data.emailCaptureStatus === "submitted") tags.push("lead_email_capture:submitted");

    // two-CTA variant: how to reach them + consent flags, for GHL routing/automation
    if (data.channel) tags.push(`contact_channel:${slugify(data.channel)}`);
    if (data.funnelVariant) tags.push(`funnel_variant:${slugify(data.funnelVariant)}`);
    if (data.transactional_consent) tags.push("consent_transactional:true");
    if (data.marketing_consent) tags.push("consent_marketing:true");

    return uniq(tags);
  }

  function buildLeadPayload(checkpoint, data) {
    const sourceInfo = resolveSourceInfo();
    const primaryService = getPrimaryServiceId();
    const additionalServices = normalizeAdditionalServices(data.additionalServices);
    const opportunityValue = data.opportunityValue != null
      ? data.opportunityValue
      : primaryService === "roofing" ? 350 : "";

    return {
      checkpoint,
      lead_session_id: getLeadSessionId(),
      submitted_at: new Date().toISOString(),
      source: sourceInfo,
      source_id: sourceInfo.source_id,
      primary_service: primaryService,
      offer: data.offer || "",
      offer_id: data.offerId || "",
      additional_services: additionalServices,
      tags: buildTags(checkpoint, { ...data, additionalServices }, sourceInfo),
      first_name: data.first || "",
      last_name: data.last || "",
      phone: data.phone || "",
      email: data.email || "",
      address: data.address || "",
      homeowner_status: data.owner || "",
      roof_need: data.need || "",
      roof_material: data.material || "",
      roof_condition: data.condition || "",
      opportunity_value: opportunityValue,
      email_capture_status: data.emailCaptureStatus || "",
      consent: !!data.consent,
      // two-CTA variant: chosen channel + dual consent (with exact displayed text for the audit record)
      funnel_variant: data.funnelVariant || "",
      contact_channel: data.channel || "",
      transactional_consent: !!data.transactional_consent,
      marketing_consent: !!data.marketing_consent,
      transactional_consent_text: data.transactional_consent_text || "",
      marketing_consent_text: data.marketing_consent_text || "",
      page_title: document.title,
    };
  }

  async function submitLeadCheckpoint(checkpoint, data) {
    const webhookUrl = window.GHL_WEBHOOK_URL;
    const payload = buildLeadPayload(checkpoint, data || {});

    if (!webhookUrl) {
      console.warn("GHL webhook URL is not configured. Payload was not sent.", payload);
      return { ok: false, skipped: true, payload };
    }

    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 4500);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
        keepalive: true,
      });
      return { ok: res.ok, status: res.status, payload };
    } catch (err) {
      console.warn(`Lead sync failed for checkpoint "${checkpoint}".`, err);
      return { ok: false, error: err, payload };
    } finally {
      clearTimeout(timeout);
    }
  }

  Object.assign(window, {
    getLeadSessionId,
    getPrimaryServiceId,
    resolveSourceInfo,
    buildLeadPayload,
    submitLeadCheckpoint,
  });
}());
