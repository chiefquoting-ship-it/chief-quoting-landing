// Genera public/index.html (español) y public/en/index.html (inglés)
// a partir de content/textos.mjs. Sin dependencias: `node build.mjs`.
import { mkdirSync, writeFileSync } from 'node:fs';
import { textos, APP_URL, SITE_URL } from './content/textos.mjs';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const arrow = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function page(lang) {
  const t = textos[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const url = SITE_URL + t.path;
  const pad = (i) => String(i + 1).padStart(2, '0');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.metaTitle)}</title>
<meta name="description" content="${esc(t.metaDescription)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="es" href="${SITE_URL}${textos.es.path}">
<link rel="alternate" hreflang="en" href="${SITE_URL}${textos.en.path}">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
<meta name="theme-color" content="#14213d">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Chief Quoting">
<meta property="og:title" content="${esc(t.metaTitle)}">
<meta property="og:description" content="${esc(t.metaDescription)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/assets/og-chiefquoting.jpg">
<meta property="og:locale" content="${lang === 'es' ? 'es_MX' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700;800&display=swap">
<link rel="stylesheet" href="/styles.css">
<script>
  // Primera visita: si el navegador está en inglés, manda a /en/. Después respeta la elección.
  (function () {
    try {
      var saved = localStorage.getItem('cq-lang');
      if (!saved && ${lang === 'es'} && /^en\\b/i.test(navigator.language || '')) { location.replace('/en/'); }
    } catch (e) {}
  })();
</script>
</head>
<body>
<a class="skip" href="#main">${lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>

<header class="site-header">
  <div class="wrap">
    <a class="logo" href="${t.path}">
      <span class="logo__mark" aria-hidden="true">CQ</span>
      <span class="logo__name">Chief Quoting</span>
    </a>
    <nav class="nav">
      <div class="lang" role="group" aria-label="${esc(t.langLabel)}">
        <a href="${textos.es.path}" hreflang="es" lang="es" data-lang="es"${lang === 'es' ? ' aria-current="true"' : ''}>ES</a>
        <a href="${textos.en.path}" hreflang="en" lang="en" data-lang="en"${lang === 'en' ? ' aria-current="true"' : ''}>EN</a>
      </div>
      <a class="nav__login" href="${APP_URL}">${esc(t.login)}</a>
      <a class="btn btn--amber" href="${APP_URL}">${esc(t.cta)}</a>
    </nav>
  </div>
</header>

<main id="main">
<section class="hero">
  <div class="wrap">
    <div class="hero__text">
      <p class="kicker">${esc(t.kicker)}</p>
      <h1>${esc(t.h1a)} <span>${esc(t.h1b)}</span></h1>
      <p class="hero__sub">${esc(t.sub)}</p>
      <div class="hero__ctas">
        <a class="btn btn--amber btn--big" href="${APP_URL}">${esc(t.cta)} ${arrow}</a>
        <span class="hero__note">${esc(t.ctaNote)}</span>
      </div>
      <dl class="stats">
        ${t.heroStats.map((s) => `<div><dt>${esc(s.small)}</dt><dd>${esc(s.big)}</dd></div>`).join('\n        ')}
      </dl>
    </div>

    <div class="phone-col">
      <div class="phone" role="img" aria-label="${esc(t.mockAlt)}">
        <div class="phone__screen" aria-hidden="true">
          <div class="q-head">
            <small>${esc(t.mockQuoteNo)}</small>
            <strong>${esc(t.mockJob)}</strong>
            <span>${esc(t.mockClient)}</span>
          </div>
          <div class="tape tape--mini"></div>
          <div class="q-body">
            ${t.mockItems.map((m) => `<div class="q-item"><div><b>${esc(m.name)}</b><small>${esc(m.qty)}</small></div><span>${esc(m.amt)}</span></div>`).join('\n            ')}
            <div class="q-tax"><span>${esc(t.mockTax)}</span><span>${esc(t.mockTaxAmt)}</span></div>
            <div class="q-total"><span>Total</span><strong>${esc(t.mockTotal)}</strong></div>
            <div class="q-send"><span class="wa">WhatsApp</span><span class="sms">SMS</span><span class="mail">Email</span></div>
          </div>
        </div>
      </div>
      <p class="phone-note">${esc(t.mockNote)}</p>
    </div>
  </div>
</section>

<div class="tape" aria-hidden="true"></div>

<section class="wrap how" aria-labelledby="how-title">
  <div class="section-head">
    <p class="kicker kicker--dark">${esc(t.howKicker)}</p>
    <h2 id="how-title">${esc(t.howTitle)}</h2>
  </div>
  <ol class="steps">
    ${t.steps.map((s) => `<li class="step"><span class="step__n" aria-hidden="true">${esc(s.n)}</span><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`).join('\n    ')}
  </ol>
</section>

<section class="wrap gains-wrap" aria-label="${esc(t.gains.map((g) => g.title).join(' · '))}">
  <picture>
    <source type="image/webp" srcset="/assets/contratista-obra-900.webp 900w, /assets/contratista-obra-1600.webp 1600w" sizes="(max-width: 1180px) 100vw, 1132px">
    <img class="gains-photo" src="/assets/contratista-obra-1600.jpg" srcset="/assets/contratista-obra-900.jpg 900w, /assets/contratista-obra-1600.jpg 1600w" sizes="(max-width: 1180px) 100vw, 1132px" width="1600" height="893" loading="lazy" decoding="async" alt="${esc(t.photoAlt)}">
  </picture>
  <div class="gains">
    ${t.gains.map((g) => `<div><h3>${esc(g.title)}</h3><p>${esc(g.body)}</p></div>`).join('\n    ')}
  </div>
</section>

<section class="wrap features-sec" aria-labelledby="feat-title">
  <div class="section-head">
    <p class="kicker kicker--dark">${esc(t.featKicker)}</p>
    <h2 id="feat-title">${esc(t.featTitle)}</h2>
  </div>
  <ul class="features">
    ${t.features.map((f, i) => `<li class="feature"><div class="feature__rule" aria-hidden="true"><span>${pad(i)}</span><span></span></div><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join('\n    ')}
  </ul>
</section>

<section class="wrap markets-wrap">
  <div class="markets">
    <h2>${esc(t.mktTitle)}</h2>
    <p>${esc(t.mktBody)}</p>
  </div>
</section>

<section class="wrap pricing-wrap" id="precio" aria-labelledby="price-title">
  <div class="pricing">
    <div class="pricing__text">
      <span>${esc(t.priceKicker)}</span>
      <h2 id="price-title">${esc(t.priceTitle)}</h2>
      <p>${esc(t.priceBody)}</p>
    </div>
    <a class="btn btn--navy btn--xl" href="${APP_URL}">${esc(t.cta)}</a>
  </div>
</section>

<section class="wrap faq-wrap" aria-labelledby="faq-title">
  <h2 id="faq-title">${esc(t.faqTitle)}</h2>
  ${t.faq.map((q) => `<div class="faq"><h3>${esc(q.q)}</h3><p>${esc(q.a)}</p></div>`).join('\n  ')}
</section>

<section class="final">
  <div class="tape tape--thin" aria-hidden="true"></div>
  <div class="wrap">
    <h2>${esc(t.finalTitle)}</h2>
    <p>${esc(t.finalBody)}</p>
    <a class="btn btn--amber btn--xl" href="${APP_URL}">${esc(t.cta)}</a>
  </div>
</section>
</main>

<footer class="site-footer">
  <div class="wrap">
    <span>© ${new Date().getFullYear()} Chief Quoting</span>
    <nav aria-label="Legal">
      <a href="${APP_URL}/privacidad">${esc(t.privacy)}</a>
      <a href="mailto:privacidad@chiefquoting.com">privacidad@chiefquoting.com</a>
    </nav>
  </div>
</footer>

<script>
  // Recuerda el idioma que elige la persona.
  document.querySelectorAll('.lang a').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('cq-lang', a.getAttribute('data-lang')); } catch (e) {}
    });
  });
</script>
</body>
</html>
`;
}

mkdirSync('public/en', { recursive: true });
writeFileSync('public/index.html', page('es'));
writeFileSync('public/en/index.html', page('en'));

writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc></url>
  <url><loc>${SITE_URL}/en/</loc></url>
</urlset>
`);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log('Listo: public/index.html y public/en/index.html');
