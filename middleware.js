/* ============================================================
   Care page gate
   ------------------------------------------------------------
   Runs at the edge, before anything static is served, so the
   care instructions never leave the server without either the
   shared password or a key from a printed QR card.

   Three ways in:
     1. ?k=<CARE_QR_KEY>   a scanned card. Logs in, then the key
                           is stripped from the address bar so it
                           does not survive a screenshot or a
                           copied link.
     2. a signed cookie    set by either of the other two.
     3. the password       typed into the page below.

   Configuration lives in Vercel environment variables, never in
   this repo, because the repo is public:

     CARE_PASSWORD   the shared password. REQUIRED. While it is
                     unset the gate stays open and the pages
                     behave exactly as they did before, which is
                     unlisted but reachable. That is deliberate:
                     deploying this file must not lock patients
                     out of post-care instructions before the
                     variable exists.
     CARE_QR_KEY     the key baked into the printed card links.
                     Optional. Without it, cards ask for the
                     password like everyone else.
     CARE_SECRET     signing key for the cookie. Optional; falls
                     back to CARE_PASSWORD. Setting it separately
                     means changing the password does not have to
                     sign everyone out, and vice versa.

   Changing CARE_SECRET signs every device out immediately, which
   is the lever to pull if the password gets out.
   ============================================================ */

export const config = {
  // Everything under /care: care.html, care-botox.html and friends,
  // plus care.css. Nothing else on the site runs this code.
  matcher: '/(care.*)',
};

const COOKIE = 'aahana_care';
const MAX_AGE = 60 * 60 * 24 * 180;   // 180 days. Convenience, not a security boundary.

const enc = new TextEncoder();

async function sign(secret, msg) {
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(msg));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* Length-independent compare, so a wrong guess takes the same time
   to reject whichever character it got wrong. */
function safeEqual(a, b) {
  const x = enc.encode(String(a));
  const y = enc.encode(String(b));
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}

async function mint(secret) {
  const expires = Date.now() + MAX_AGE * 1000;
  return expires + '.' + (await sign(secret, String(expires)));
}

async function valid(secret, token) {
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot < 1) return false;
  const expires = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  return safeEqual(mac, await sign(secret, expires));
}

function readCookie(request, name) {
  const raw = request.headers.get('cookie');
  if (!raw) return null;
  for (const part of raw.split(';')) {
    const eq = part.indexOf('=');
    if (eq > 0 && part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return null;
}

function letThemIn(location, token) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
      'Cache-Control': 'no-store',
      'Set-Cookie': COOKIE + '=' + encodeURIComponent(token) +
        '; Path=/; Max-Age=' + MAX_AGE +
        '; HttpOnly; Secure; SameSite=Lax',
    },
  });
}

function ask(pathname, wrong) {
  return new Response(page(pathname, wrong), {
    status: wrong ? 401 : 401,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

/* Self-contained: no stylesheet from the site, because the
   stylesheet lives behind this same gate. The mark is fetched
   from /aahana-mark.svg, which is public. */
function page(pathname, wrong) {
  const notice = wrong
    ? '<p class="err" role="alert">That password did not match. Try again, or ask us for the current one.</p>'
    : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Patient care instructions | Aahana Medical Aesthetics</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500&family=Spectral:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
<style>
  :root { --ivory:#EDE8E1; --espresso:#4A3328; --clay:#B48A7A; --light:#F2DACE; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 32px 24px;
    background: var(--espresso); color: var(--ivory);
    font-family: 'Cairo', system-ui, sans-serif; font-weight: 300;
  }
  .card { width: 100%; max-width: 420px; }
  .brand { display: flex; align-items: center; gap: 14px; margin-bottom: 44px; }
  .mark {
    width: 34px; height: 36px; flex: 0 0 auto; background-color: var(--ivory);
    -webkit-mask: url(/aahana-mark.svg) no-repeat center / contain;
            mask: url(/aahana-mark.svg) no-repeat center / contain;
  }
  .rule { width: .5px; height: 32px; background: rgba(243,236,228,.34); }
  .name { font-size: 19px; letter-spacing: .3em; line-height: 1; }
  .sub { font-size: 8.5px; letter-spacing: .19em; text-transform: uppercase;
         color: var(--light); margin-top: 5px; }
  h1 { font-family: 'Spectral', Georgia, serif; font-weight: 300;
       font-size: 30px; line-height: 1.25; letter-spacing: .01em; margin: 0 0 14px; }
  p { font-size: 15px; line-height: 1.75; color: rgba(237,232,225,.86); margin: 0 0 28px; }
  label { display: block; font-size: 11px; letter-spacing: .16em;
          text-transform: uppercase; color: var(--light); margin-bottom: 9px; }
  input {
    width: 100%; padding: 14px 16px;
    background: rgba(255,255,255,.07); color: var(--ivory);
    border: .5px solid rgba(243,236,228,.3); border-radius: 2px;
    font-family: inherit; font-size: 16px; font-weight: 300;
  }
  input:focus-visible { outline: 2px solid var(--light); outline-offset: 2px; }
  button {
    width: 100%; margin-top: 18px; padding: 15px 20px; min-height: 44px;
    background: var(--ivory); color: var(--espresso);
    border: none; border-radius: 2px; cursor: pointer;
    font-family: inherit; font-size: 11px; font-weight: 500;
    letter-spacing: .14em; text-transform: uppercase;
  }
  button:hover { opacity: .88; }
  .err { color: #F6C9B4; font-size: 14px; margin: 0 0 20px; }
  .foot { margin: 36px 0 0; font-size: 13px; line-height: 1.7;
          color: rgba(237,232,225,.62); }
  .foot a { color: var(--light); text-underline-offset: 3px; }
</style>
</head>
<body>
  <main class="card">
    <div class="brand">
      <span class="mark" aria-hidden="true"></span>
      <span class="rule" aria-hidden="true"></span>
      <span>
        <span class="name">AAHANA</span>
        <span class="sub" style="display:block">Medical Aesthetics</span>
      </span>
    </div>

    <h1>Care instructions for our patients</h1>
    <p>Before and after care for every treatment we offer. Enter the password we gave you, or scan the card from your appointment to skip this step.</p>

    ${notice}

    <form method="POST" action="${escapeAttr(pathname)}">
      <label for="p">Password</label>
      <input id="p" name="password" type="password" autocomplete="current-password"
             autocapitalize="off" autocorrect="off" spellcheck="false" required autofocus>
      <button type="submit">View instructions</button>
    </form>

    <p class="foot">Not a patient yet? See <a href="/services.html">what we offer</a> or
      <a href="/">visit the main site</a>. If you have had a treatment with us and need
      your instructions now, email <a href="mailto:hello@aahanaskin.com">hello@aahanaskin.com</a>.</p>
  </main>
</body>
</html>`;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default async function middleware(request) {
  const PASSWORD = process.env.CARE_PASSWORD;
  // Unconfigured: leave the pages exactly as they were.
  if (!PASSWORD) return;

  const url = new URL(request.url);
  if (!url.pathname.startsWith('/care')) return;

  const SECRET = process.env.CARE_SECRET || PASSWORD;
  const QR_KEY = process.env.CARE_QR_KEY;

  // A submitted password always resolves here; it never falls through
  // to the static file, which would answer a POST with 405.
  if (request.method === 'POST') {
    let given = '';
    try {
      given = String((await request.formData()).get('password') || '');
    } catch (e) {
      given = '';
    }
    if (safeEqual(given, PASSWORD)) {
      url.searchParams.delete('k');
      return letThemIn(url.pathname + url.search, await mint(SECRET));
    }
    return ask(url.pathname, true);
  }

  // A scanned card. Strip the key on the way in so it does not linger.
  if (QR_KEY && safeEqual(url.searchParams.get('k') || '', QR_KEY)) {
    url.searchParams.delete('k');
    return letThemIn(url.pathname + url.search, await mint(SECRET));
  }

  if (await valid(SECRET, readCookie(request, COOKIE))) return;

  return ask(url.pathname, false);
}
