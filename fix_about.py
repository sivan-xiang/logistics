# -*- coding: utf-8 -*-
import io, sys

def patch(path, repls):
    with io.open(path, "r", encoding="utf-8") as f:
        s = f.read()
    for old, new in repls:
        assert old in s, "MISSING in %s:\n%s" % (path, old[:120])
        s = s.replace(old, new, 1)
    with io.open(path, "w", encoding="utf-8") as f:
        f.write(s)
    print("OK", path)

# ---------- about.html: drop the "Our mission" section ----------
patch("about.html", [(
    '    <section class="section about-mission">\n'
    '      <div class="wrap">\n'
    '        <header class="section__head reveal">\n'
    '          <p class="section__eyebrow" data-i18n="about.missionTitle">Our mission</p>\n'
    '          <h2 class="about-mission__title" data-i18n="about.mission">We are committed to advancing the logistics service industry through advanced IT systems that fully integrate resources, providing customers with comprehensive logistics and value-added services.</h2>\n'
    '        </header>\n'
    '      </div>\n'
    '    </section>\n'
    '\n'
    '    <section class="section about-story">',
    '    <section class="section about-story">'
)])

# ---------- style.css: remove .about-mission rules, add gap below .about-promise ----------
patch("assets/css/style.css", [
    (
        '/* ---------- About: mission statement + service promise (enriched from Longsail) ---------- */\n'
        '.about-mission { padding: 96px 0; }\n'
        '.about-mission .section__head { text-align: left; max-width: 960px; margin-left: 0; margin-right: 0; }\n'
        '.about-mission__title {\n'
        '  font-family: var(--font-display);\n'
        '  font-size: clamp(24px, 3.4vw, 40px); font-weight: 600; line-height: 1.32;\n'
        '  letter-spacing: -0.01em; color: var(--navy); max-width: 920px; text-wrap: balance;\n'
        '}\n'
        '.about-promise {\n'
        '  display: flex; gap: 22px; align-items: center;\n'
        '  margin-top: 40px; padding: 26px 30px;\n'
        '  background: linear-gradient(135deg, rgb(108 92 224 / .10), rgb(0 113 227 / .05));\n'
        '  border: 1px solid var(--line); border-left: 3px solid rgb(108 92 224);\n'
        '  border-radius: 18px;\n'
        '}',
        '/* ---------- About: service promise (enriched from Longsail) ---------- */\n'
        '.about-promise {\n'
        '  display: flex; gap: 22px; align-items: center;\n'
        '  margin-top: 40px; margin-bottom: 56px; padding: 26px 30px;\n'
        '  background: linear-gradient(135deg, rgb(108 92 224 / .10), rgb(0 113 227 / .05));\n'
        '  border: 1px solid var(--line); border-left: 3px solid rgb(108 92 224);\n'
        '  border-radius: 18px;\n'
        '}'
    ),
    (
        '@media (max-width: 640px) {\n'
        '  .about-mission { padding: 72px 0; }\n'
        '  .about-promise { flex-direction: column; align-items: flex-start; gap: 16px; }\n'
        '}',
        '@media (max-width: 640px) {\n'
        '  .about-promise { flex-direction: column; align-items: flex-start; gap: 16px; }\n'
        '}'
    )
])

# ---------- i18n.js: remove dead mission keys (en + zh) ----------
patch("assets/js/i18n.js", [
    (
        '    "about.presenceLabel": "Local teams established in",\n'
        '    "about.missionTitle": "Our mission",\n'
        '    "about.mission": "We are committed to advancing the logistics service industry through advanced IT systems that fully integrate resources, providing customers with comprehensive logistics and value-added services.",\n'
        '    "about.promiseTitle": "Professional & efficient service",',
        '    "about.presenceLabel": "Local teams established in",\n'
        '    "about.promiseTitle": "Professional & efficient service",'
    ),
    (
        '    "about.presenceLabel": "本地团队已设立于",\n'
        '    "about.missionTitle": "我们的使命",\n'
        '    "about.mission": "我们致力于以先进的物流 IT 系统充分整合资源，推动物流服务行业快速发展，为客户提供更全面的物流与增值服务。",\n'
        '    "about.promiseTitle": "专业高效的服务",',
        '    "about.presenceLabel": "本地团队已设立于",\n'
        '    "about.promiseTitle": "专业高效的服务",'
    )
])

print("ALL DONE")
