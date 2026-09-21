const { chromium } = require('playwright-core');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const base = 'file://' + process.cwd() + '/';

(async () => {
  const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox'] });
  for (const lang of ['en', 'zh']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('PAGEERR: ' + e.message));
    await page.goto(base + 'about.html', { waitUntil: 'networkidle' });
    if (lang === 'zh') { await page.evaluate(() => { document.querySelectorAll('.lang__btn[data-lang="zh"]')[0].click(); }); }
    await page.waitForTimeout(400);
    // scroll through the page to trigger reveal animations like a real user
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y <= h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `shot_about_${lang}_1280.png`, fullPage: true });
    console.log(`[${lang}] screenshot OK, errors=${errors.length}`, errors.slice(0, 3));
    await ctx.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
