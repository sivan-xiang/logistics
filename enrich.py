# -*- coding: utf-8 -*-
"""Enrich Services & Solutions pages. Assertion-checked string edits."""
import io, sys

BASE = "D:/workbuddy/2026-09-20-17-01-45/giraf/"
P_I18N = BASE + "assets/js/i18n.js"
P_MAIN = BASE + "assets/js/main.js"
P_CSS  = BASE + "assets/css/style.css"
P_SERV = BASE + "services.html"
P_SOL  = BASE + "solutions.html"

def rd(p):
    with io.open(p, "r", encoding="utf-8") as f:
        return f.read()

def wr(p, s):
    with io.open(p, "w", encoding="utf-8") as f:
        f.write(s)

def rep(s, old, new, label):
    assert old in s, "ANCHOR MISSING: " + label
    assert s.count(old) == 1, "ANCHOR NOT UNIQUE: " + label + " count=" + str(s.count(old))
    return s.replace(old, new, 1)

# =====================================================================
# 1) i18n.js — COPY keys + DATA services/solutions/process
# =====================================================================
s = rd(P_I18N)

# --- COPY.en insertions (after detail.capLabel en) ---
s = rep(s,
    '    "detail.capLabel": "Key capabilities",',
    '''    "detail.capLabel": "Key capabilities",
    "services.cat.freight": "Global Freight",
    "services.cat.special": "Specialized Cargo & Equipment",
    "services.cat.trade": "Trade & Compliance",
    "services.processEyebrow": "How we work",
    "services.processTitle": "From inquiry to delivered, in four steps",
    "services.processLead": "One partner across the whole journey — so you always know where your cargo is and who to call."''',
    "copy-en-services-keys")

# --- COPY.zh insertions ---
s = rep(s,
    '    "detail.capLabel": "核心能力",',
    '''    "detail.capLabel": "核心能力",
    "services.cat.freight": "全球货运",
    "services.cat.special": "特种货物与设备",
    "services.cat.trade": "贸易与合规",
    "services.processEyebrow": "我们的工作方式",
    "services.processTitle": "从询价到交付，四步到位",
    "services.processLead": "全程由同一伙伴负责——随时掌握货物位置，也随时知道该联系谁。"''',
    "copy-zh-services-keys")

# --- DATA.en services/solutions/process region ---
en_start = s.index("const DATA = {")
en_en = s.index("  en: {", en_start)
en_zh = s.index("  zh: {", en_en)

def replace_data_block(block):
    svc_start = block.index("    services: [")
    off_start = block.index("    offices: [", svc_start)
    new = NEW_SERVICES_EN + "\n" + NEW_SOLUTIONS_EN + "\n" + NEW_PROCESS_EN + "\n"
    return block[:svc_start] + new + block[off_start:]

# (strings defined below; placeholder to keep order)
# We'll redefine replace_data_block per locale with correct constants.

NEW_SERVICES_EN = '''    services: [
      { icon: "ocean", cat: "freight", tag: "FCL · LCL", title: "Ocean Freight", desc: "FCL & LCL services across major trade lanes with competitive space and schedule control.",
        intro: "GIRAFSAIL contracts with major ocean carriers to secure stable weekly sailings on trans-Pacific, Asia–Europe and Asia–Middle East lanes. We move full containers and consolidated LCL with transparent pricing, proactive schedule management and door-to-door or port-to-port flexibility.",
        features: ["FCL and LCL consolidation with competitive rates", "Space protection and weekly sailing guarantees", "Customs clearance and full documentation", "Real-time container tracking via our IT platform"] },
      { icon: "air", cat: "freight", tag: "1–5 days", title: "Air Freight", desc: "Time-critical air solutions with flexible routings and door-to-door options.",
        intro: "For shipments where speed wins, we consolidate through major hubs and offer direct, transshipment and charter options. Our air team balances cost, transit and capacity so urgent cargo reaches destination within days, not weeks.",
        features: ["Consolidated and direct rate programs", "Charter and onboard-courier solutions", "Global transit in 1–5 days", "Handling for DG and temperature-sensitive goods"] },
      { icon: "railway", cat: "freight", tag: "China–Europe", title: "Railway", desc: "China–Europe and China–Asia block trains for balanced cost and transit time.",
        intro: "Our block-train services on China–Europe and China–Central-Asia corridors deliver a cost-effective middle ground between ocean and air. We manage booking, border customs and last-leg connection under one plan.",
        features: ["FCL and LCL rail to Duisburg, Hamburg, Moscow and beyond", "Stable schedules with border customs coordination", "Lower cost than air, faster than ocean", "Seamless bonded and multimodal connection"] },
      { icon: "inland", cat: "freight", tag: "First & last mile", title: "Inland Delivery", desc: "First-mile and last-mile trucking coordinated with multimodal legs.",
        intro: "Trucking is the connective tissue of every shipment. We coordinate factory pickup, port drayage and final delivery with vetted carriers, ensuring each leg is timed and documented.",
        features: ["Port drayage and container haulage", "Domestic and cross-border trucking", "Full-truckload and less-than-truckload options", "Appointment and timed delivery windows"] },
      { icon: "dg", cat: "special", tag: "IMO 2–9", title: "DG & Special Containers", desc: "Dangerous goods and specialized equipment with full compliance support.",
        intro: "Hazardous cargo and out-of-gauge equipment demand precision. Our certified team advises on classification, packing and documentation so IMO and IMDG requirements are met end-to-end.",
        features: ["Handling of IMO classes 2–9 dangerous goods", "Reefer, open-top, flat-rack and tank equipment", "MSDS review and packing advisory", "Certified packing, marking and labeling"] },
      { icon: "warehouse", cat: "special", tag: "WMS-driven", title: "Warehousing", desc: "Strategic storage and inventory management near key hubs.",
        intro: "Our warehouses near major hubs combine ambient and temperature-controlled space with WMS-driven inventory, cross-docking and value-added services to keep your supply chain responsive.",
        features: ["Ambient and temperature-controlled storage", "WMS-based inventory accuracy", "Cross-dock and distribution", "Kitting, labeling and light assembly"] },
      { icon: "bonded", cat: "special", tag: "Duty deferred", title: "Bonded Logistics", desc: "Bonded warehousing and value-added processing under customs supervision.",
        intro: "Within bonded zones we store goods, defer duties and perform value-added processing under customs supervision — ideal for VMI, consignment and re-export flows.",
        features: ["Bonded storage with duty deferral", "Vendor-managed inventory and consignment", "Repacking, assembly and labeling", "Re-export and transit handling"] },
      { icon: "customs", cat: "trade", tag: "Licensed brokers", title: "Customs & Inspection", desc: "Declaration, inspection and tariff optimization by licensed brokers.",
        intro: "Licensed brokers manage import and export declaration, HS classification and duty optimization, while coordinating inspection and quarantine to keep cargo moving compliantly.",
        features: ["Import and export declaration", "HS classification and duty optimization", "AEO and bonded facilitation", "Inspection and quarantine coordination"] },
      { icon: "port", cat: "trade", tag: "Local clearance", title: "Destination Port Services", desc: "Local clearance, devanning and delivery at overseas gateway ports.",
        intro: "On arrival, our local teams take over: customs clearance, devanning, transloading and delivery to your DC or door. One partner from origin to final mile, in the market that matters.",
        features: ["Local customs clearance at gateway ports", "Devanning and transloading", "Delivery to door or distribution center", "Short-term port storage and stuffing"] },
      { icon: "ecommerce", cat: "trade", tag: "API fulfilment", title: "Cross-border E-commerce", desc: "Fulfilment, line-haul and last-mile for global online sellers.",
        intro: "We help online sellers scale across marketplaces with overseas warehousing, pick-and-pack fulfilment, returns management and multi-carrier last-mile delivery — all connected through API.",
        features: ["Overseas warehouse fulfilment", "Pick, pack and returns handling", "Multiple last-mile carrier integrations", "Marketplace and API connectivity"] }
    ]'''

NEW_SOLUTIONS_EN = '''    solutions: [
      { icon: "general", tag: "Standard", title: "General Cargo", desc: "Standard commodities with optimized routing and visibility.",
        intro: "For everyday commodities we design the most cost-efficient multimodal route and keep every handoff visible, so standard cargo gets first-class control without premium cost.",
        features: ["Cost-effective multimodal routing", "End-to-end shipment visibility", "Consolidation to reduce spend", "Standardized handling SOP"] },
      { icon: "frozen", tag: "Cold-chain", title: "Frozen Cargo", desc: "Reefer and cold-chain integrity from dock to shelf.",
        intro: "Cold-chain is a promise, not a feature. We pre-trip every reefer, log temperature continuously and connect cold storage and transload so product arrives as it left.",
        features: ["Pre-trip reefer inspection", "Continuous temperature logging", "Cold storage and transload", "GDP-compliant option for pharma"] },
      { icon: "danger", tag: "IMO / IMDG", title: "Dangerous Cargo", desc: "DG classification, packing and documentation handled end-to-end.",
        intro: "Dangerous goods move only when every rule is met. We classify by IMO, pack to standard, prepare compliant documentation and plan emergency response.",
        features: ["IMO classification and SDS review", "Certified DG packing", "IATA / IMDG compliance", "Emergency response planning"] },
      { icon: "project", tag: "Breakbulk", title: "Project & Oversized", desc: "Engineering-led handling for out-of-gauge, heavy-lift and project cargo.",
        intro: "Project cargo demands planning, not just transport. We survey routes, secure permits and coordinate cranes, flat-racks and escort where required, so turbines, machinery and structures move without surprises.",
        features: ["Route survey and method statement", "Heavy-lift and out-of-gauge handling", "Crane, flat-rack and module coordination", "Permit and escort management"] },
      { icon: "lock", tag: "Escort", title: "High-value & Secure", desc: "Chain-of-custody and security escort for high-value shipments.",
        intro: "For high-value goods we apply a controlled chain-of-custody with sealing, monitoring and vetted handlers, plus security escort on sensitive lanes, keeping risk and loss to a minimum.",
        features: ["Sealed and monitored transport", "Vetted, background-checked handlers", "Security escort on request", "Reduced-risk routing"] },
      { icon: "ecommerce", tag: "Pick & pack", title: "E-commerce Fulfilment", desc: "Overseas warehousing and pick-pack fulfilment for online sellers.",
        intro: "We help online sellers scale across marketplaces with overseas warehousing, pick-and-pack fulfilment, returns management and multi-carrier last-mile, all connected through API.",
        features: ["Overseas warehouse storage", "Pick, pack and returns handling", "Multi-carrier last-mile", "Marketplace and API integration"] }
    ]'''

NEW_PROCESS_EN = '''    process: [
      { num: "01", title: "Consult & Quote", desc: "Share your cargo, lanes and deadlines — we return a transparent, all-in quote." },
      { num: "02", title: "Plan & Book", desc: "We design the multimodal route, secure space and handle booking end-to-end." },
      { num: "03", title: "Execute & Track", desc: "Your shipment moves with proactive milestone updates via our IT platform." },
      { num: "04", title: "Deliver & Support", desc: "Local teams clear, deliver and stay on for after-sales support." }
    ]'''

NEW_SERVICES_ZH = '''    services: [
      { icon: "ocean", cat: "freight", tag: "整箱/拼箱", title: "海运", desc: "覆盖主要贸易航线的整箱与拼箱服务，舱位与船期稳定可控。",
        intro: "GIRAFSAIL 与主流船公司签约，锁定跨太平洋、亚欧、亚洲—中东等航线的稳定周班舱位。我们以透明报价、主动的船期管理，以及门到门或港到港的灵活组合，承运整箱与拼箱货物。",
        features: ["整箱/拼箱集运，报价具竞争力", "舱位保障与周班船期承诺", "清关与全套单证办理", "依托 IT 平台实现集装箱实时追踪"] },
      { icon: "air", cat: "freight", tag: "1–5 天", title: "空运", desc: "时效优先的空运方案，灵活航线与门到门服务。",
        intro: "对速度有要求的货物，我们通过主要枢纽港做集运，并提供直飞、中转与包机多种方案。空运团队在成本、时效与舱位之间取得平衡，让紧急货物数日内而非数周抵达。",
        features: ["集运与直飞报价方案", "包机与专差押运方案", "全球 1–5 天通达", "可承接危险品与温敏货物"] },
      { icon: "railway", cat: "freight", tag: "中欧/中亚", title: "铁路", desc: "中欧、中亚班列，兼顾成本与时效的多式联运。",
        intro: "依托中欧、中亚班列，我们提供介于海运与空运之间、性价比更高的铁路运输。从订舱、边境清关到末端衔接，均由同一方案统筹。",
        features: ["整箱/拼箱铁路至杜伊斯堡、汉堡、莫斯科等地", "稳定班期与边境清关协调", "成本低于空运、时效快于海运", "无缝衔接保税与多式联运"] },
      { icon: "inland", cat: "freight", tag: "头程与末端", title: "陆运", desc: "与多式联运无缝衔接的头程与末端拖车配送。",
        intro: "拖车配送是每一票货物的连接纽带。我们协调工厂提货、港口拖运与末端派送，由经过甄选的承运商执行，确保每一段都准时有据。",
        features: ["港口拖运与集装箱接驳", "国内及跨境卡车运输", "整车/零担多种选择", "预约与定时派送窗口"] },
      { icon: "dg", cat: "special", tag: "IMO 2–9 类", title: "危险品及特种箱", desc: "危险品与特种设备的全程合规操作支持。",
        intro: "危险货物与超规设备容不得半点马虎。我们以认证团队提供分类、包装与单证建议，确保 IMO 与 IMDG 要求端到端满足。",
        features: ["IMO 2–9 类危险品操作", "冷藏箱、开顶箱、框架箱、罐箱等设备", "MSDS 审核与包装建议", "认证包装、标记与贴标"] },
      { icon: "warehouse", cat: "special", tag: "WMS 驱动", title: "仓储服务", desc: "核心枢纽附近的策略性仓储与库存管理。",
        intro: "我们在主要枢纽附近布局常温与温控仓储，依托 WMS 驱动库存、越库分拨与增值服务，让供应链保持敏捷。",
        features: ["常温与温控仓储", "基于 WMS 的库存精准管理", "越库与分拨", "贴标、组套与轻量组装"] },
      { icon: "bonded", cat: "special", tag: "缓税", title: "保税物流", desc: "海关监管下的保税仓储与增值加工。",
        intro: "在保税区内，我们提供货物存储、缓税及海关监管下的增值加工，适用于 VMI、寄售与转口等场景。",
        features: ["保税仓储与缓税", "供应商管理库存(VMI)与寄售", "换包、组装与贴标", "转口与过境处理"] },
      { icon: "customs", cat: "trade", tag: "持牌报关", title: "报关报检", desc: "持牌报关行的申报、查验与税则优化。",
        intro: "持牌报关行负责进出口申报、HS 归类与税则优化，并协调查验与检验检疫，确保货物合规顺畅流转。",
        features: ["进出口申报", "HS 归类与税则优化", "AEO 与保税便利", "查验与检验检疫协调"] },
      { icon: "port", cat: "trade", tag: "本地清关", title: "目的港服务", desc: "海外枢纽港的本地清关、拆箱与派送。",
        intro: "货物到港后，由本地团队接手：清关、拆箱、倒柜及门到门或至配送中心的派送。在关键市场，从起运到末端由同一伙伴负责。",
        features: ["枢纽港本地清关", "拆箱与倒柜", "门到门或至配送中心派送", "短期港存与装箱"] },
      { icon: "ecommerce", cat: "trade", tag: "API 履约", title: "跨境电商物流", desc: "面向全球卖家的仓储履约、干线及末端配送。",
        intro: "我们帮助线上卖家跨平台扩张：海外仓履约、拣货打包、退货管理以及多承运商末端配送，全部通过 API 打通。",
        features: ["海外仓履约", "拣货、打包与退货处理", "多家末端承运商对接", "平台与 API 系统对接"] }
    ]'''

NEW_SOLUTIONS_ZH = '''    solutions: [
      { icon: "general", tag: "标准品", title: "一般货物", desc: "以优化航线与全程可视化为标准品提供保障。",
        intro: "针对常规品类，我们设计最具性价比的多式联运路线，并让每一次交接都可视可控，让标准货物以非溢价成本获得一等管控。",
        features: ["高性价比多式联运路由", "端到端全程可视", "集运降本", "标准化操作 SOP"] },
      { icon: "frozen", tag: "冷链", title: "冷冻货物", desc: "从码头到货架全程冷链不断链。",
        intro: "冷链是一份承诺，而非一项功能。我们对每台冷箱出运前做 PTI 检测、全程温度记录，并衔接冷库与倒柜，让货品抵达时与离港时一致。",
        features: ["冷箱出运前 PTI 检测", "全程温度记录", "冷库与倒柜衔接", "可提供符合 GDP 的医药方案"] },
      { icon: "danger", tag: "IMO / IMDG", title: "危险货物", desc: "危险品分类、包装与单证端到端处理。",
        intro: "危险品只有在每一条规则都满足时才能运输。我们按 IMO 分类、按标准包装、制备合规单证并制定应急预案。",
        features: ["IMO 分类与 SDS 审核", "认证危险品包装", "符合 IATA / IMDG", "应急预案规划"] },
      { icon: "project", tag: "件杂货", title: "项目货与超大件", desc: "面向超规、大件与项目货的工程化操作。",
        intro: "项目货拼的是方案而非单纯运输。我们做线路勘测、办理许可，并协调吊机、框架箱与必要的安保押运，让涡轮机、机械与构件安全无虞地运抵。",
        features: ["线路勘测与方案说明", "大件与超规货操作", "吊机、框架箱与模块协调", "许可与押运管理"] },
      { icon: "lock", tag: "押运", title: "高价值与安保", desc: "为高风险高价值货物提供监管链与安保押运。",
        intro: "对高价值货物，我们施行受控监管链，全程施封、监控并由经甄选的人员操作，敏感线路可安排安保押运，将风险与货损降至最低。",
        features: ["施封与全程监控运输", "经甄选、背调的操作人员", "按需提供安保押运", "低风险路由规划"] },
      { icon: "ecommerce", tag: "拣货打包", title: "电商履约", desc: "面向线上卖家的海外仓与拣货打包履约。",
        intro: "我们帮助线上卖家跨平台扩张：海外仓存储、拣货打包、退货管理以及多承运商末端配送，全部通过 API 打通。",
        features: ["海外仓存储", "拣货、打包与退货处理", "多家末端承运商对接", "平台与 API 系统对接"] }
    ]'''

NEW_PROCESS_ZH = '''    process: [
      { num: "01", title: "咨询与报价", desc: "告知您的货物、航线与时限，我们提供透明、一口价的报价。" },
      { num: "02", title: "方案与订舱", desc: "我们设计多式联运路线、锁定舱位，并全程负责订舱。" },
      { num: "03", title: "执行与追踪", desc: "货物发运后，依托 IT 平台主动推送各节点进展。" },
      { num: "04", title: "交付与支持", desc: "本地团队负责清关、派送，并提供售后支持。" }
    ]'''

def replace_block(block, svc, sol, proc):
    svc_start = block.index("    services: [")
    off_start = block.index("    offices: [", svc_start)
    new = svc + "\n" + sol + "\n" + proc + "\n"
    return block[:svc_start] + new + block[off_start:]

en_block = s[en_en:en_zh]
zh_block = s[en_zh:]
en_block = replace_block(en_block, NEW_SERVICES_EN, NEW_SOLUTIONS_EN, NEW_PROCESS_EN)
zh_block = replace_block(zh_block, NEW_SERVICES_ZH, NEW_SOLUTIONS_ZH, NEW_PROCESS_ZH)
s = s[:en_en] + en_block + zh_block

wr(P_I18N, s)
print("i18n.js OK")

# =====================================================================
# 2) main.js — icons, detailCard tag, grouped renderServices, renderProcess
# =====================================================================
m = rd(P_MAIN)

# add project + lock icons
m = rep(m,
    '  local: \'<path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>\'',
    '''  local: '<path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
  project: '<path d="M3 21V8h7M10 8V5h6M16 5v16M16 9h5M2 21h20"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>\'''',
    "main-icons")

# detailCard tag pill
m = rep(m,
    '          <p class="card__desc">${s.desc}</p>\n        </div>',
    '          <p class="card__desc">${s.desc}</p>\n          ${s.tag ? `<span class="detail-item__tag">${s.tag}</span>` : ""}\n        </div>',
    "main-detailcard-tag")

# grouped renderServices
OLD_RS = '''function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  const items = DATA[current].services;
  grid.innerHTML = grid.classList.contains("detail-list")
    ? items.map((s) => detailCard(s, false)).join("")
    : items.map((s) => `
      <article class="card reveal">
        <div class="card__icon">${svg(s.icon)}</div>
        <h3 class="card__title">${s.title}</h3>
        <p class="card__desc">${s.desc}</p>
      </article>`).join("");
}'''
NEW_RS = '''function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  const items = DATA[current].services;
  const order = ["freight", "special", "trade"];
  const groups = order
    .map((cat) => ({ cat, items: items.filter((s) => s.cat === cat) }))
    .filter((g) => g.items.length);
  grid.innerHTML =
    '<div class="svc-groups">' +
    groups
      .map(
        (g) => `
      <div class="svc-group reveal">
        <div class="svc-group__head">
          <span class="svc-group__title">${t("services.cat." + g.cat)}</span>
          <span class="svc-group__count">${g.items.length}</span>
          <span class="svc-group__rule"></span>
        </div>
        <div class="detail-list">
          ${g.items.map((s) => detailCard(s, false)).join("")}
        </div>
      </div>`
      )
      .join("") +
    "</div>";
}'''
m = rep(m, OLD_RS, NEW_RS, "main-renderservices")

# insert renderProcess before renderSolutions
m = rep(m,
    'function renderSolutions() {',
    '''function renderProcess() {
  const grid = document.getElementById("processGrid");
  if (!grid) return;
  const steps = DATA[current].process || [];
  grid.innerHTML = steps.map((s) => `
    <div class="proc-step reveal">
      <div class="proc-step__num">${s.num}</div>
      <h3 class="proc-step__title">${s.title}</h3>
      <p class="proc-step__desc">${s.desc}</p>
    </div>`).join("");
}

function renderSolutions() {''',
    "main-renderprocess")

# call renderProcess in renderAll
m = rep(m,
    '  if (document.getElementById("solutionsGrid")) renderSolutions();',
    '  if (document.getElementById("solutionsGrid")) renderSolutions();\n  if (document.getElementById("processGrid")) renderProcess();',
    "main-renderall")

wr(P_MAIN, m)
print("main.js OK")

# =====================================================================
# 3) style.css — append new component styles
# =====================================================================
c = rd(P_CSS)
ADD = '''
/* ---- Services: grouped categories ---- */
.svc-container { display: block; }
.svc-groups { display: flex; flex-direction: column; gap: 56px; }
.svc-group__head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 24px; }
.svc-group__title {
  font-family: var(--font-display); font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 600; color: var(--navy); letter-spacing: -0.01em;
}
.svc-group__count {
  font-family: var(--font-display); font-size: 12px; font-weight: 700; color: var(--blue);
  background: rgba(0,113,227,.10); border-radius: 999px; padding: 3px 11px; flex: none;
}
.svc-group__rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--line), transparent); }

/* ---- detail card tag pill ---- */
.detail-item__tag {
  display: inline-block; margin-top: 10px;
  font-size: 12px; font-weight: 600; letter-spacing: .02em;
  color: var(--blue); background: rgba(0,113,227,.10);
  padding: 3px 11px; border-radius: 999px;
}
.card--accent .detail-item__tag { color: var(--gold-deep); background: rgba(232,163,61,.16); }

/* ---- Services: process steps ---- */
.process { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.proc-step {
  position: relative; overflow: hidden; isolation: isolate;
  background: #fff; border: 1px solid var(--line); border-radius: var(--radius);
  padding: 30px 24px; transition: transform .25s, box-shadow .25s;
}
.proc-step > * { position: relative; z-index: 1; }
.proc-step::before {
  content: ""; position: absolute; left: 0; right: 0; top: 0; height: 4px; z-index: 1;
  background: linear-gradient(90deg, var(--blue), var(--gold));
}
.proc-step:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(11,30,58,.10); }
.proc-step__num {
  font-family: var(--font-display); font-size: 40px; font-weight: 700; line-height: 1;
  background: linear-gradient(120deg, var(--blue), var(--gold));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
  margin-bottom: 14px;
}
.proc-step__title { font-size: 18px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.01em; }
.proc-step__desc { font-size: 14px; color: var(--ink-soft); line-height: 1.6; }

@media (max-width: 900px) {
  .process { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .process { grid-template-columns: 1fr; }
  .svc-groups { gap: 44px; }
}
'''
assert ADD not in c, "CSS already appended?"
c = c.rstrip() + "\n" + ADD
wr(P_CSS, c)
print("style.css OK")

# =====================================================================
# 4) services.html — drop detail-list on grid, add process section
# =====================================================================
sv = rd(P_SERV)
sv = rep(sv,
    '        <div class="detail-list" id="servicesGrid"><!-- rendered by JS --></div>',
    '        <div id="servicesGrid"><!-- rendered by JS --></div>',
    "serv-grid-class")
sv = rep(sv,
    '    </section>\n\n    <section class="cta">',
    '''    </section>

    <section class="section section--gray">
      <div class="wrap">
        <div class="section__head reveal">
          <p class="section__eyebrow" data-i18n="services.processEyebrow">How we work</p>
          <h2 class="section__title" data-i18n="services.processTitle">From inquiry to delivered, in four steps</h2>
          <p class="section__lead" data-i18n="services.processLead">One partner across the whole journey — so you always know where your cargo is and who to call.</p>
        </div>
        <div class="process" id="processGrid"><!-- rendered by JS --></div>
      </div>
    </section>

    <section class="cta">''',
    "serv-process-section")
wr(P_SERV, sv)
print("services.html OK")

# =====================================================================
# 5) solutions.html — add industries band before CTA
# =====================================================================
so = rd(P_SOL)
so = rep(so,
    '    </section>\n\n    <section class="cta">',
    '''    </section>

    <section class="section section--gray">
      <div class="wrap">
        <div class="section__head reveal">
          <p class="section__eyebrow" data-i18n="industries.eyebrow">Who we serve</p>
          <h2 class="section__title" data-i18n="industries.title">Trusted across industries</h2>
          <p class="section__lead" data-i18n="industries.lead">We provide end-to-end logistics management for Fortune 500 companies, listed firms, and category leaders.</p>
        </div>
        <div class="chips" id="industriesGrid"><!-- rendered by JS --></div>
      </div>
    </section>

    <section class="cta">''',
    "sol-industries-section")
wr(P_SOL, so)
print("solutions.html OK")

# =====================================================================
# 6) sanity asserts
# =====================================================================
final = rd(P_I18N) + rd(P_MAIN) + rd(P_CSS) + rd(P_SERV) + rd(P_SOL)
for token in [
    "services.cat.freight", "services.processTitle", "process:", "proc-step",
    "detail-item__tag", "svc-groups", "processGrid", "industriesGrid",
    'icon: "project"', 'icon: "lock"', "Project & Oversized", "E-commerce Fulfilment",
    "项目货与超大件", "电商履约"
]:
    assert token in final, "MISSING TOKEN: " + token
print("ALL ASSERTIONS PASSED")
