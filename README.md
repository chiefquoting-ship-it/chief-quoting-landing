# Chief Quoting — Landing (chiefquoting.com)

Sitio estático en español (`/`) e inglés (`/en/`), publicado con Cloudflare Workers (static assets).
Vive en un repositorio aparte de la app; nada de aquí toca app.chiefquoting.com.

## Estructura

```
content/textos.mjs   ← TODOS los textos (es y en). Aquí se edita.
build.mjs            ← genera public/index.html y public/en/index.html
public/              ← lo que se publica (HTML, styles.css, imágenes, favicon, sitemap)
wrangler.jsonc       ← configuración de Cloudflare (dominio chiefquoting.com)
```

## Publicar por primera vez

1. **GitHub:** crea un repositorio vacío, por ejemplo `chiefquoting-ship-it/chief-quoting-landing`, y sube esta carpeta a la rama `main`.
2. **Cloudflare:** Workers & Pages → Create → Import a repository → elige `chief-quoting-landing`.
   - Build command: `node build.mjs`
   - Deploy command: `npx wrangler deploy`
   - Rama de producción: `main`
3. **Dominio:** `wrangler.jsonc` ya pide `chiefquoting.com` como dominio propio. Requiere que la zona chiefquoting.com esté en Cloudflare (lo está si app.chiefquoting.com ya funciona ahí). Si el dominio raíz tiene un registro DNS o redirección viejo de GoDaddy, bórralo antes de desplegar.
4. **www (opcional):** en Cloudflare → chiefquoting.com → Rules → Redirect Rules, redirige `www.chiefquoting.com/*` a `https://chiefquoting.com/${1}` (301). Necesita un registro DNS `www` con proxy activado.

A partir de ahí, cada push a `main` se publica solo.

## Cambiar textos

1. Edita `content/textos.mjs` (mismo cambio en `es` y `en`).
2. `node build.mjs` para regenerar `public/` (Cloudflare también lo corre al desplegar).
3. Commit y push a `main`.

## Cambios previstos

- **Precio:** cambia `priceKicker`, `priceTitle` y `priceBody`. Si quieres dos tarjetas (Gratis / Pro), se edita la sección `pricing` en `build.mjs`.
- **Google Play / App Store:** agregar las insignias oficiales de cada tienda junto al botón del hero y del cierre, solo cuando la app ya esté publicada.
- **Probar en tu computadora:** `npm run dev` (abre en http://localhost:8787).
