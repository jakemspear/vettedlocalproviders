/* page-legal.jsx — renders Privacy Policy and Terms of Service pages. */

const LEGAL_COPY = {
  en: {
    privacy: {
      title: "Privacy Policy",
      eyebrow: "Business privacy notice",
      sub: "How Vetted Local Providers collects, uses, shares, and protects personal information across our website, quote requests, and text-message opt-in flows.",
      crumbs: [{ label: "Home", href: HOMEPAGE }, { label: "Privacy Policy" }],
      summaryTitle: "Business details",
      summaryItems: [
        { label: "Legal entity", value: LEGAL_NAME },
        { label: "DBA", value: "Vetted Local Providers" },
        { label: "Mailing address", value: ADDRESS },
        { label: "Public phone", value: PHONE },
        { label: "Email", value: EMAIL },
      ],
      sections: [
        {
          id: "overview",
          h: "Who we are",
          body: [
            "Scaling Adventures, LLC does business as Vetted Local Providers. We operate a homeowner referral and concierge service that helps people request quotes, inspections, appointments, and related follow-up from independent local service providers.",
            "This Privacy Policy applies to information collected on vettedlocalproviders.com, on our landing pages and forms, and through related calls and text messages that you choose to receive from us."
          ]
        },
        {
          id: "information-we-collect",
          h: "Information we collect",
          body: [
            "We may collect your name, service address, city, email address, phone number, homeowner status, project details, scheduling preferences, and any information you submit in a form, call, text, or email.",
            "We may also collect basic technical information such as IP address, browser type, device information, referring page, and on-site activity through cookies and analytics tools."
          ]
        },
        {
          id: "how-we-use-information",
          h: "How we use information",
          body: [
            "We use personal information to review your request, contact you about the services you asked about, coordinate inspections or quotes, support customer service, send service-related updates, and improve our website and marketing performance.",
            "If you opt in, we may also send text messages related to your quote request, appointment scheduling, follow-up, service updates, or other messages directly tied to your request."
          ]
        },
        {
          id: "sharing",
          h: "How we share information",
          body: [
            "We share your information only as needed to operate the service. This may include the independent providers you ask us to connect you with, companies that help us host or operate the website, communications providers, analytics vendors, and legal or regulatory authorities when required.",
            "We do not sell your personal information to third parties for their own marketing. We do not share mobile information, phone numbers, SMS opt-in consent, or related messaging records with third parties or affiliates for their own marketing or promotional purposes."
          ]
        },
        {
          id: "sms-consent",
          h: "Text messaging and consent records",
          body: [
            "When you optionally check an SMS consent box on our website or otherwise opt in through an approved lead form, we store the form submission details, timestamp, page URL or source, and the consent language presented at the time of submission so we can document your opt-in.",
            "If you opt in, we may send conversational, transactional, and promotional text messages about quote requests, appointment scheduling, service follow-up, requested provider coordination, and closely related service updates. Message frequency may vary. Message and data rates may apply. To stop receiving messages, reply STOP to any text message. Reply HELP for assistance."
          ]
        },
        {
          id: "cookies",
          h: "Cookies and analytics",
          body: [
            "We may use cookies, pixels, and similar tools to understand website traffic, improve page performance, measure advertising, and remember basic preferences.",
            "You can control cookies through your browser settings. Disabling cookies may affect how some parts of the site work."
          ]
        },
        {
          id: "retention-security",
          h: "Data retention and security",
          body: [
            "We keep information only as long as reasonably necessary for business operations, legal compliance, dispute resolution, recordkeeping, and opt-in verification.",
            "We use reasonable administrative, technical, and organizational safeguards, but no internet transmission or storage system can be guaranteed to be completely secure."
          ]
        },
        {
          id: "your-choices",
          h: "Your choices",
          body: [
            "You may contact us to request access to, correction of, or deletion of your personal information where applicable. You may unsubscribe from marketing emails using the unsubscribe link in the message.",
            "For text messages, reply STOP to opt out or HELP for assistance. SMS consent is optional and is not a condition of purchase."
          ]
        },
        {
          id: "contact",
          h: "Contact us",
          body: [
            `For privacy questions, contact ${LEGAL_DBA} at ${EMAIL}, call ${PHONE}, or write to ${ADDRESS}.`
          ]
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      eyebrow: "Website terms",
      sub: "Terms governing the use of Vetted Local Providers, our website, our referral service, and our text-message consent flows.",
      crumbs: [{ label: "Home", href: HOMEPAGE }, { label: "Terms of Service" }],
      summaryTitle: "Business details",
      summaryItems: [
        { label: "Legal entity", value: LEGAL_NAME },
        { label: "DBA", value: "Vetted Local Providers" },
        { label: "Mailing address", value: ADDRESS },
        { label: "Public phone", value: PHONE },
        { label: "Email", value: EMAIL },
      ],
      sections: [
        {
          id: "acceptance",
          h: "Acceptance of these terms",
          body: [
            "By using this website, submitting a request, or communicating with us through phone, email, or text, you agree to these Terms of Service and our Privacy Policy."
          ]
        },
        {
          id: "service-disclaimer",
          h: "Referral-service disclaimer",
          body: [
            "Scaling Adventures, LLC d/b/a Vetted Local Providers is a referral and concierge service. We help connect consumers with independent local providers. We are not a licensed contractor, do not perform home-improvement work ourselves, and do not guarantee that any particular provider will be available, selected, or hired.",
            "Any contract for services is between you and the provider you choose. Pricing, timing, workmanship, warranties, and outcomes are determined by that provider, not by Vetted Local Providers."
          ]
        },
        {
          id: "website-use",
          h: "Use of the website",
          body: [
            "You agree to use the website only for lawful purposes and to provide accurate information. You may not misuse the website, interfere with its operation, submit false requests, impersonate another person, or attempt unauthorized access to our systems."
          ]
        },
        {
          id: "sms-messaging",
          h: "SMS messaging terms",
          body: [
            "Vetted Local Providers, operated by Scaling Adventures, LLC, offers an SMS program for homeowners and leads who choose to opt in. If you opt in to receive text messages from us, you agree to receive conversational, transactional, and promotional messages related to your quote request, appointment scheduling, service follow-up, requested provider coordination, and closely related updates.",
            "Message frequency may vary. Message and data rates may apply. To stop receiving messages, reply STOP to any text message. Reply HELP for assistance. Consent is not a condition of purchase. Carriers are not liable for delayed or undelivered messages."
          ]
        },
        {
          id: "sms-program-rules",
          h: "SMS program eligibility and support",
          body: [
            `Our SMS program is intended for U.S. users who are 18 years of age or older and who provide their own mobile number or are authorized to provide it. SMS consent is optional and is not required to use our website or submit a service request.`,
            `For SMS support, contact ${EMAIL} or call ${PHONE}. Our Privacy Policy explains what information we collect, how it is used, how to opt out, and that mobile information, SMS opt-in consent, and phone numbers collected for SMS are not shared with third parties or affiliates for their own marketing or promotional purposes.`
          ]
        },
        {
          id: "communications",
          h: "Calls, emails, and electronic communications",
          body: [
            "By submitting your information, you authorize us to contact you about the services you requested using the contact details you provide, including by phone, email, and, where you have consented, text message."
          ]
        },
        {
          id: "no-guarantee",
          h: "No guarantees",
          body: [
            "We make no promise that you will receive a quote, obtain a particular price, achieve savings, or hire a provider through the service. Website content, offers, availability, and service areas may change without notice."
          ]
        },
        {
          id: "intellectual-property",
          h: "Intellectual property",
          body: [
            "All website content, design, branding, graphics, copy, and related materials are owned by or licensed to Vetted Local Providers and may not be copied, reproduced, or reused without permission except as allowed by law."
          ]
        },
        {
          id: "accessibility",
          h: "Accessibility",
          body: [
            "We aim to keep the site usable and accessible. If you have trouble accessing any content or form, contact us at hello@vettedlocalproviders.com or call (520) 277-2778 and we will work to assist you."
          ]
        },
        {
          id: "limitation-liability",
          h: "Limitation of liability",
          body: [
            "To the fullest extent allowed by law, Vetted Local Providers is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the website or from services provided by third-party providers."
          ]
        },
        {
          id: "changes-contact",
          h: "Changes and contact information",
          body: [
            "We may update these terms from time to time by posting a revised version on this page. Questions about these terms can be sent to hello@vettedlocalproviders.com, called in to (520) 277-2778, or mailed to 30 N Gould St Ste R, Sheridan, WY 82801."
          ]
        }
      ]
    }
  },
  es: {
    privacy: {
      title: "Politica de Privacidad",
      eyebrow: "Aviso de privacidad",
      sub: "Como Vetted Local Providers recopila, usa, comparte y protege la informacion personal en nuestro sitio, formularios de cotizacion y flujos de consentimiento por mensaje de texto.",
      crumbs: [{ label: "Inicio", href: HOMEPAGE }, { label: "Politica de Privacidad" }],
      summaryTitle: "Datos del negocio",
      summaryItems: [
        { label: "Entidad legal", value: LEGAL_NAME },
        { label: "Nombre comercial", value: "Vetted Local Providers" },
        { label: "Direccion postal", value: ADDRESS },
        { label: "Telefono publico", value: PHONE },
        { label: "Correo electronico", value: EMAIL },
      ],
      sections: [
        {
          id: "overview",
          h: "Quienes somos",
          body: [
            "Scaling Adventures, LLC opera comercialmente como Vetted Local Providers. Operamos un servicio de referencia y concierge para propietarios que ayuda a solicitar cotizaciones, inspecciones, citas y seguimientos relacionados con proveedores locales independientes.",
            "Esta Politica de Privacidad aplica a la informacion recopilada en vettedlocalproviders.com, en nuestras paginas de aterrizaje y formularios, y mediante llamadas y mensajes de texto relacionados que usted elija recibir."
          ]
        },
        {
          id: "information-we-collect",
          h: "Informacion que recopilamos",
          body: [
            "Podemos recopilar su nombre, direccion del servicio, ciudad, correo electronico, numero de telefono, condicion de propietario o inquilino, detalles del proyecto, preferencias de horario y cualquier informacion que envie en un formulario, llamada, mensaje de texto o correo electronico.",
            "Tambien podemos recopilar informacion tecnica basica como direccion IP, tipo de navegador, informacion del dispositivo, pagina de referencia y actividad en el sitio mediante cookies y herramientas de analisis."
          ]
        },
        {
          id: "how-we-use-information",
          h: "Como usamos la informacion",
          body: [
            "Usamos la informacion personal para revisar su solicitud, contactarlo sobre los servicios que pidio, coordinar inspecciones o cotizaciones, brindar atencion al cliente y mejorar nuestro sitio y desempeno de marketing.",
            "Si usted da su consentimiento, tambien podemos enviar mensajes de texto relacionados con su solicitud de cotizacion, programacion de citas, seguimiento, actualizaciones del servicio u otros mensajes directamente vinculados con su solicitud."
          ]
        },
        {
          id: "sharing",
          h: "Como compartimos la informacion",
          body: [
            "Compartimos su informacion solo cuando es necesario para operar el servicio. Esto puede incluir a los proveedores independientes que usted nos pide contactar, empresas que nos ayudan a alojar u operar el sitio, proveedores de comunicaciones, servicios de analisis y autoridades legales o regulatorias cuando sea necesario.",
            "No vendemos su informacion personal a terceros para su propio marketing. No compartimos informacion movil, numeros de telefono, consentimiento SMS ni registros relacionados con terceros o afiliados para sus propios fines de marketing o promocion."
          ]
        },
        {
          id: "sms-consent",
          h: "Mensajes de texto y registros de consentimiento",
          body: [
            "Cuando marca una casilla opcional de consentimiento por SMS en nuestro sitio o da su consentimiento por otro formulario aprobado, guardamos los detalles del formulario, la fecha y hora, la URL o fuente y el texto de consentimiento presentado en ese momento para documentar su opt-in.",
            "Si da su consentimiento, podemos enviar mensajes conversacionales, transaccionales y promocionales sobre solicitudes de cotizacion, programacion de citas, seguimiento del servicio, coordinacion con proveedores solicitados y actualizaciones estrechamente relacionadas. La frecuencia de mensajes puede variar. Pueden aplicarse tarifas de mensajes y datos. Para dejar de recibir mensajes, responda STOP a cualquier mensaje de texto. Responda HELP para obtener ayuda."
          ]
        },
        {
          id: "cookies",
          h: "Cookies y analitica",
          body: [
            "Podemos usar cookies, pixeles y herramientas similares para comprender el trafico del sitio, mejorar el rendimiento de las paginas, medir publicidad y recordar preferencias basicas.",
            "Puede controlar las cookies desde la configuracion de su navegador. Desactivarlas puede afectar el funcionamiento de algunas partes del sitio."
          ]
        },
        {
          id: "retention-security",
          h: "Retencion y seguridad de datos",
          body: [
            "Conservamos la informacion solo durante el tiempo razonablemente necesario para operaciones comerciales, cumplimiento legal, resolucion de disputas, mantenimiento de registros y verificacion de opt-in.",
            "Usamos salvaguardas administrativas, tecnicas y organizativas razonables, pero ninguna transmision por internet o sistema de almacenamiento puede garantizarse como completamente seguro."
          ]
        },
        {
          id: "your-choices",
          h: "Sus opciones",
          body: [
            "Puede contactarnos para solicitar acceso, correccion o eliminacion de su informacion personal cuando corresponda. Puede darse de baja de correos de marketing mediante el enlace de cancelacion dentro del mensaje.",
            "Para mensajes de texto, responda STOP para salir o HELP para obtener ayuda. El consentimiento SMS es opcional y no es una condicion de compra."
          ]
        },
        {
          id: "contact",
          h: "Contactenos",
          body: [
            `Para preguntas de privacidad, contacte a ${LEGAL_DBA} en ${EMAIL}, llame al ${PHONE} o escriba a ${ADDRESS}.`
          ]
        }
      ]
    },
    terms: {
      title: "Terminos de Servicio",
      eyebrow: "Terminos del sitio",
      sub: "Terminos que rigen el uso de Vetted Local Providers, nuestro sitio web, nuestro servicio de referencia y nuestros flujos de consentimiento por mensaje de texto.",
      crumbs: [{ label: "Inicio", href: HOMEPAGE }, { label: "Terminos de Servicio" }],
      summaryTitle: "Datos del negocio",
      summaryItems: [
        { label: "Entidad legal", value: LEGAL_NAME },
        { label: "Nombre comercial", value: "Vetted Local Providers" },
        { label: "Direccion postal", value: ADDRESS },
        { label: "Telefono publico", value: PHONE },
        { label: "Correo electronico", value: EMAIL },
      ],
      sections: [
        {
          id: "acceptance",
          h: "Aceptacion de estos terminos",
          body: [
            "Al usar este sitio, enviar una solicitud o comunicarse con nosotros por telefono, correo electronico o mensaje de texto, usted acepta estos Terminos de Servicio y nuestra Politica de Privacidad."
          ]
        },
        {
          id: "service-disclaimer",
          h: "Aviso sobre el servicio de referencia",
          body: [
            "Scaling Adventures, LLC d/b/a Vetted Local Providers es un servicio de referencia y concierge. Ayudamos a conectar consumidores con proveedores locales independientes. No somos un contratista con licencia, no realizamos trabajos de mejoras del hogar nosotros mismos y no garantizamos que un proveedor especifico estara disponible, sera seleccionado o sera contratado.",
            "Cualquier contrato por servicios se celebra entre usted y el proveedor que elija. Los precios, tiempos, mano de obra, garantias y resultados son determinados por ese proveedor, no por Vetted Local Providers."
          ]
        },
        {
          id: "website-use",
          h: "Uso del sitio web",
          body: [
            "Usted acepta usar el sitio solo para fines legales y proporcionar informacion exacta. No puede hacer un uso indebido del sitio, interferir con su operacion, enviar solicitudes falsas, hacerse pasar por otra persona ni intentar acceso no autorizado a nuestros sistemas."
          ]
        },
        {
          id: "sms-messaging",
          h: "Terminos de mensajeria SMS",
          body: [
            "Vetted Local Providers, operado por Scaling Adventures, LLC, ofrece un programa de SMS para propietarios y prospectos que decidan dar su consentimiento. Si da su consentimiento para recibir mensajes de texto, acepta recibir mensajes conversacionales, transaccionales y promocionales relacionados con su solicitud de cotizacion, programacion de citas, seguimiento del servicio, coordinacion con proveedores solicitados y actualizaciones estrechamente relacionadas.",
            "La frecuencia de mensajes puede variar. Pueden aplicarse tarifas de mensajes y datos. Para dejar de recibir mensajes, responda STOP a cualquier mensaje de texto. Responda HELP para obtener ayuda. El consentimiento no es condicion de compra. Los operadores no son responsables por mensajes demorados o no entregados."
          ]
        },
        {
          id: "sms-program-rules",
          h: "Elegibilidad y soporte del programa SMS",
          body: [
            "Nuestro programa SMS esta destinado a usuarios de Estados Unidos de 18 anos o mas que proporcionen su propio numero movil o esten autorizados para proporcionarlo. El consentimiento SMS es opcional y no es necesario para usar el sitio ni enviar una solicitud de servicio.",
            `Para soporte de SMS, escriba a ${EMAIL} o llame al ${PHONE}. Nuestra Politica de Privacidad explica que informacion recopilamos, como se usa, como cancelar la suscripcion y que la informacion movil, el consentimiento SMS y los numeros de telefono recopilados para SMS no se comparten con terceros ni afiliados para su propio marketing o promocion.`
          ]
        },
        {
          id: "communications",
          h: "Llamadas, correos y comunicaciones electronicas",
          body: [
            "Al enviar su informacion, nos autoriza a contactarlo sobre los servicios que solicito usando los datos de contacto que proporciono, incluso por telefono, correo electronico y, cuando haya dado consentimiento, mensaje de texto."
          ]
        },
        {
          id: "no-guarantee",
          h: "Sin garantias",
          body: [
            "No prometemos que recibira una cotizacion, obtendra un precio especifico, lograra ahorros o contratara a un proveedor por medio del servicio. El contenido del sitio, las ofertas, la disponibilidad y las areas de servicio pueden cambiar sin previo aviso."
          ]
        },
        {
          id: "intellectual-property",
          h: "Propiedad intelectual",
          body: [
            "Todo el contenido del sitio, diseno, marca, graficos, textos y materiales relacionados son propiedad de Vetted Local Providers o se usan bajo licencia y no pueden copiarse, reproducirse o reutilizarse sin permiso, salvo lo permitido por la ley."
          ]
        },
        {
          id: "accessibility",
          h: "Accesibilidad",
          body: [
            "Buscamos mantener el sitio utilizable y accesible. Si tiene problemas para acceder a cualquier contenido o formulario, escribanos a hello@vettedlocalproviders.com o llame al (520) 277-2778 y haremos lo posible por ayudar."
          ]
        },
        {
          id: "limitation-liability",
          h: "Limitacion de responsabilidad",
          body: [
            "En la medida maxima permitida por la ley, Vetted Local Providers no sera responsable por danos indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso del sitio o de servicios prestados por proveedores terceros."
          ]
        },
        {
          id: "changes-contact",
          h: "Cambios y contacto",
          body: [
            "Podemos actualizar estos terminos ocasionalmente publicando una version revisada en esta pagina. Las preguntas sobre estos terminos pueden enviarse a hello@vettedlocalproviders.com, llamarse al (520) 277-2778 o enviarse por correo a 30 N Gould St Ste R, Sheridan, WY 82801."
          ]
        }
      ]
    }
  }
};

function LegalSummary({ title, items }) {
  return (
    <aside className="legal-card">
      <div className="legal-card-h">{title}</div>
      <div className="legal-kv">
        {items.map((item) => (
          <div key={item.label} className="legal-kv-row">
            <div className="legal-kv-label">{item.label}</div>
            <div className="legal-kv-value">{item.value}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function LegalSections({ sections }) {
  return (
    <div className="sp-prose">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="legal-section">
          <h2 className="sp-prose-h legal-anchor">{section.h}</h2>
          {section.body.map((paragraph, idx) => (
            <p key={idx} className="sp-prose-p">{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

function LegalComplianceLinks() {
  const [lang] = useLang();
  const isEs = lang === "es";
  return (
    <div className="legal-links-card">
      <div className="legal-links-h">{isEs ? "Enlaces de cumplimiento SMS" : "SMS compliance links"}</div>
      <p className="sp-prose-p legal-links-copy">
        {isEs
          ? "Revise estos enlaces para conocer los terminos de mensajeria SMS, el uso de datos, las opciones de baja, el soporte y nuestro aviso de no compartir datos de opt-in por SMS con terceros para su propio marketing."
          : "Review these links for SMS messaging terms, data use, opt-out options, support contact information, and our statement that SMS opt-in data is not shared with third parties for their own marketing."}
      </p>
      <div className="legal-links-row">
        <a href={PRIVACY_PAGE}>{isEs ? "Politica de Privacidad" : "Privacy Policy"}</a>
        <a href={TERMS_PAGE}>{isEs ? "Terminos de Servicio" : "Terms of Service"}</a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
      </div>
    </div>
  );
}

function LegalPage() {
  const [lang] = useLang();
  const locale = LEGAL_COPY[lang] || LEGAL_COPY.en;
  const pageKey = window.LEGAL_PAGE === "terms" ? "terms" : "privacy";
  const page = locale[pageKey];
  const alternateLabel = pageKey === "terms"
    ? (lang === "es" ? "Politica de Privacidad" : "Privacy Policy")
    : (lang === "es" ? "Terminos de Servicio" : "Terms of Service");

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        h={page.title}
        sub={page.sub}
        crumbs={page.crumbs}
        ctaLabel={alternateLabel}
        ctaHref={pageKey === "terms" ? PRIVACY_PAGE : TERMS_PAGE}
        secondaryLabel={lang === "es" ? "Ir al formulario" : "Go to the opt-in form"}
        secondaryHref={FUNNEL}
      />
      <section className="section" id="body">
        <div className="legal-grid">
          <div>
            <LegalSections sections={page.sections} />
            <LegalComplianceLinks />
          </div>
          <LegalSummary title={page.summaryTitle} items={page.summaryItems} />
        </div>
        <p className="legal-last-updated">
          {lang === "es" ? "Ultima actualizacion: 11 de junio de 2026" : "Last updated: June 11, 2026"}
        </p>
      </section>
    </>
  );
}

function LegalApp() {
  const lang0 = detectLang();
  const quoteLabel = ((window.STRINGS[lang0] || window.STRINGS.en).home || {}).nav?.quote || "Get a free quote";
  return <SitePage ctaHref={FUNNEL} ctaLabel={quoteLabel}><LegalPage /></SitePage>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<LegalApp />);
