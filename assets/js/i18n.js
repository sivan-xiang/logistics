/* =====================================================================
 * GIRAF Logistics — Internationalization layer
 * ---------------------------------------------------------------------
 * How to extend to a new language (e.g. Spanish "es"):
 *   1. Add an `es` object to COPY with the same keys as `en`.
 *   2. Add an `es` object to DATA with the same structure as `en`.
 *   3. Add a button in #langSwitch with data-lang="es" (see index.html).
 * No other code changes are required — main.js renders from these maps.
 * ===================================================================== */

const COPY = {
  en: {
    "nav.services": "Services",
    "nav.solutions": "Solutions",
    "nav.network": "Network",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.eyebrow": "GIRAFSAIL · A Longsail Sub-Brand",
    "hero.title": "Simplify the<br><span class=\"stroke\">cross-border</span> trade.",
    "hero.sub": "One-stop global logistics built on localized operations and globalized resources — powered by a self-developed IT platform and an AAAAA-level network.",
    "heroSlogans": [
      { "text": "Simplify the cross-border trade.", "accent": "cross-border" },
      { "text": "Move the world with confidence.", "accent": "world" },
      { "text": "Ship smarter, reach further.", "accent": "further" },
      { "text": "From port to door, with care.", "accent": "care" },
      { "text": "Your cargo, our commitment.", "accent": "commitment" },
      { "text": "One partner, from door to door.", "accent": "door to door" },
      { "text": "Global network, local expertise.", "accent": "local expertise" },
      { "text": "Logistics, made simple.", "accent": "simple" },
      { "text": "We move your world forward.", "accent": "forward" },
      { "text": "Clear quotes, zero surprises.", "accent": "surprises" }
    ],
    "hero.cta1": "Explore services",
    "hero.cta2": "Talk to our team",

    "services.eyebrow": "What we do",
    "services.title": "A full-spectrum logistics portfolio",
    "services.lead": "From origin to destination, one call or one email is all it takes. Our team with 28 years of experience designs the plan that fits you.",
    "detail.capLabel": "Key capabilities",
    "services.cat.freight": "Global Freight",
    "services.cat.special": "Specialized Cargo & Equipment",
    "services.cat.trade": "Trade & Compliance",
    "services.processEyebrow": "How we work",
    "services.processTitle": "From inquiry to delivered, in four steps",
    "services.processLead": "One partner across the whole journey — so you always know where your cargo is and who to call.",

    "solutions.eyebrow": "Cargo solutions",
    "solutions.title": "Engineered for every cargo type",
    "solutions.lead": "Specialized handling and compliance for the cargo that moves the world.",

    "network.eyebrow": "Where we are",
    "network.title": "Local teams, global reach",
    "network.lead": "GIRAFSAIL runs its own teams in key markets, backed by 33 branches of Longsail International Logistics across the globe.",

    "industries.eyebrow": "Who we serve",
    "industries.title": "Trusted across industries",
    "industries.lead": "We provide end-to-end logistics management for Fortune 500 companies, listed firms, and category leaders.",

    "why.eyebrow": "Why GIRAF",
    "why.title": "Global resources, local compliance",
    "why.lead": "GIRAFSAIL is an international logistics sub-brand of Longsail International Logistics Co., Ltd., committed to helping customers efficiently open up new markets.",

    "cta.title": "Ready to simplify your global trade?",
    "cta.sub": "Tell us about your shipment. One email, one call — we build the plan.",
    "cta.email": "Email us",
    "cta.call": "Call us",

    "footer.tag": "Simplify the cross-border trade.",
    "footer.nav": "Explore",
    "footer.contact": "Contact",
    "footer.addr": "Shenzhen · London · Hamburg · Mexico City",
    "footer.rights": "All rights reserved.",
    "footer.parent": "A sub-brand of Longsail International Logistics Co., Ltd.",

    "about.eyebrow": "Our story",
    "about.title": "A global sub-brand of Longsail",
    "about.lead": "GIRAFSAIL is an international logistics sub-brand of Longsail International Logistics Co., Ltd. — committed to making cross-border trade simple, transparent and efficient.",
    "about.story": "Backed by Longsail’s AAAAA-level qualification, a global network of 33 branches, and the self-developed Sowoll IT platform, GIRAFSAIL turns complex cross-border trade into a simple, reliable plan — with local teams in the world’s key hubs.",
    "about.presenceLabel": "Local teams established in",
    "about.promiseTitle": "Professional & efficient service",
    "about.promise": "With one phone call or email, our team — drawing on 28 years of professional experience — tailors the most suitable logistics plan for you, delivering efficient, stable and professional service.",
    "about.promiseBadge": "28+ years",
    "network.subsTitle": "The Longsail network",
    "network.subsLead": "GIRAFSAIL is part of the Longsail group — 33 branches worldwide.",
    "about.historyEyebrow": "Our journey",
    "about.historyTitle": "Three decades of sailing forward",
    "network.mapEyebrow": "Our global presence",
    "network.mapTitle": "A network that reaches every market",
    "about.history": [
      { year: "2025", title: "New milestones", text: "Launched Sowoll & Xiaofan overseas editions; annual price checks exceeded 3 million; Shenzhen HQ moved to Runhong Building; established Beijing & Malaysia branches; shipped 600,000 TEUs in 2025." },
      { year: "2024", title: "Global recognition", text: "Ranked among the Global Top 50 Ocean Freight Forwarders; recognised as a key enterprise in China's International Freight Forwarding Industry; SOWOLL platform inquiries approached 1 million; opened Changsha (domestic) and Saudi Arabia (overseas) branches." },
      { year: "2023", title: "Top-tier certification", text: "Awarded 5A Logistics Enterprise by the China Federation of Logistics and Purchasing; the Dayu system rolled out globally." },
      { year: "2022", title: "Worldwide expansion", text: "Established SAFESAIL Supply Chain, SOWOLL Chengdu branch, GIRAF Bangkok & London branches, GIRAFSAIL Hanoi branch, and the U.S. overseas warehouse." },
      { year: "2021", title: "New subsidiaries", text: "Established LONGSAIL Supply Chain, REXPRESS and ESAN International Logistics; opened Wuhan and Nanjing branches." },
      { year: "2020", title: "Global supply chain", text: "Established the Mexico branch; reached 25 global branches and 360,000 TEUs; annual turnover exceeded RMB 3.3 billion; refreshed our Vision & Values." },
      { year: "2019", title: "Brand & credit", text: "Opened the Chengdu branch; launched the Xiaofan mascot; awarded AAA, the highest credit rating; established the Party branch." },
      { year: "2018", title: "20th anniversary", text: "Celebrated 20 years in Shenzhen; launched a new logo; employees surpassed 900; founded the Employee Growth Institute." },
      { year: "2016", title: "Going global", text: "Opened the first overseas branch in the USA; passed national ISO9001 certification." },
      { year: "2015", title: "International strategy", text: "Adopted the international development strategy; served multiple Fortune Global 500 companies, listed firms and well-known enterprises." },
      { year: "2011", title: "North China", text: "Opened Tianjin and Qingdao branches, entering the North China market." },
      { year: "2010", title: "Industry recognition", text: "First listed among China's Top 50 International Freight Forwarders in Ocean Shipping, and remained on the list for twelve consecutive years." },
      { year: "2007", title: "Leapfrog growth", text: "Opened Foshan and Shanghai branches; employees surpassed 100, beginning a leapfrog growth path." },
      { year: "Explore", title: "The beginning", text: "Opened the first Guangzhou branch and began the journey of national business development." },
      { year: "2000", title: "First-class forwarder", text: "Approved by China's Ministry of Commerce as a National First-Class Freight Forwarding Enterprise; joined WCA, CGLN, WFN and X2; Vice Chairman of the Shenzhen Freight Forwarding Association; among the first NVOCCs." },
      { year: "1997", title: "Founded", text: "Established in Shenzhen with a team of four. The name LONGSAIL comes from Li Bai's poem: 'A time will come to ride the wind and cleave the waves; I'll set my cloud-like sail to cross the sea which raves.'" }
    ],
    "contact.eyebrow": "Get in touch",
    "contact.title": "Let's move your cargo",
    "contact.lead": "Tell us about your shipment. One email, one call — we build the plan.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "How can we help?",
    "contact.submit": "Send inquiry",
    "contact.info": "Contact details",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Phone",
    "contact.addrLabel": "Offices"
  },

  zh: {
    "nav.services": "服务项目",
    "nav.solutions": "解决方案",
    "nav.network": "网络",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",

    "hero.eyebrow": "GIRAFSAIL · 长帆国际物流子品牌",
    "hero.title": "让<span class=\"stroke\">跨境</span>贸易<br>更简单。",
    "hero.sub": "以本地化运营与全球化资源，提供一站式全球物流解决方案——依托自主研发的 IT 平台与 AAAAA 级服务网络。",
    "heroSlogans": [
      { "text": "让跨境贸易更简单。", "accent": "跨境" },
      { "text": "以信心，运达世界。", "accent": "世界" },
      { "text": "运得更智，走得更远。", "accent": "更远" },
      { "text": "从港口到门，用心托付。", "accent": "用心" },
      { "text": "您的货物，我们的承诺。", "accent": "承诺" },
      { "text": "从门到门，一个伙伴。", "accent": "一个伙伴" },
      { "text": "全球网络，本地专精。", "accent": "本地专精" },
      { "text": "物流，化繁为简。", "accent": "化繁为简" },
      { "text": "推动您的世界向前。", "accent": "向前" },
      { "text": "报价透明，绝无意外。", "accent": "意外" }
    ],
    "hero.cta1": "浏览服务",
    "hero.cta2": "联系我们",

    "services.eyebrow": "我们做什么",
    "services.title": "全谱系物流服务组合",
    "services.lead": "从起运地到目的港，一个电话或一封邮件即可。拥有 28 年专业经验的团队为您量身定制方案。",
    "detail.capLabel": "核心能力",
    "services.cat.freight": "全球货运",
    "services.cat.special": "特种货物与设备",
    "services.cat.trade": "贸易与合规",
    "services.processEyebrow": "我们的工作方式",
    "services.processTitle": "从询价到交付，四步到位",
    "services.processLead": "全程由同一伙伴负责——随时掌握货物位置，也随时知道该联系谁。",

    "solutions.eyebrow": "货物解决方案",
    "solutions.title": "为每一种货物量身打造",
    "solutions.lead": "为驱动世界的货物提供专业操作与合规保障。",

    "network.eyebrow": "我们在哪里",
    "network.title": "本地团队，全球触达",
    "network.lead": "GIRAFSAIL 在重点市场设有直属团队，背靠长帆国际物流全球 33 家分支机构。",

    "industries.eyebrow": "我们的客户",
    "industries.title": "深受各行业信赖",
    "industries.lead": "为众多世界 500 强企业、海内外上市公司及行业知名企业提供端到端物流管理服务。",

    "why.eyebrow": "为什么选择 GIRAF",
    "why.title": "全球资源，本地合规",
    "why.lead": "GIRAFSAIL 是长帆国际物流股份有限公司旗下的国际物流子品牌，致力于帮助客户高效开拓新市场。",

    "cta.title": "准备好让全球贸易更简单了吗？",
    "cta.sub": "告诉我们您的货物运输需求，一封邮件、一个电话，方案由我们构建。",
    "cta.email": "发送邮件",
    "cta.call": "拨打热线",

    "footer.tag": "让跨境贸易更简单。",
    "footer.nav": "快速导航",
    "footer.contact": "联系方式",
    "footer.addr": "深圳 · 伦敦 · 汉堡 · 墨西哥城",
    "footer.rights": "保留所有权利。",
    "footer.parent": "长帆国际物流股份有限公司旗下子品牌。",

    "about.eyebrow": "我们的故事",
    "about.title": "长帆国际物流旗下全球子品牌",
    "about.lead": "GIRAFSAIL 是长帆国际物流股份有限公司旗下的国际物流子品牌——致力于让跨境贸易更简单、透明、高效。",
    "about.story": "依托长帆 AAAAA 级资质、覆盖全球 33 家分支机构的网络，以及自主研发的索威尔（Sowoll）IT 平台，GIRAFSAIL 将复杂的跨境贸易化为简单可靠的方案——在各大核心枢纽均设有本地团队。",
    "about.presenceLabel": "本地团队已设立于",
    "about.promiseTitle": "专业高效的服务",
    "about.promise": "一个电话或一封邮件，我们的团队便凭借 28 年专业经验，为您量身定制最合适的物流方案，提供高效、稳定、专业的服务。",
    "about.promiseBadge": "28 年专业经验",
    "network.subsTitle": "长帆集团网络",
    "network.subsLead": "GIRAFSAIL 隶属长帆集团，全球拥有 33 家分支机构。",
    "about.historyEyebrow": "发展历程",
    "about.historyTitle": "三十载乘风破浪",
    "network.mapEyebrow": "全球布局",
    "network.mapTitle": "连接每一个市场的服务网络",
    "about.history": [
      { year: "2025", title: "新的里程碑", text: "上线索威尔（Sowoll）与“小帆”海外版；年度询价超 300 万次；深圳总部乔迁润弘大厦；设立北京与马来西亚分公司；2025 年集装箱运量达 60 万 TEU。" },
      { year: "2024", title: "走向全球前列", text: "跻身全球海运货代 50 强；入选中国国际货代行业重点企业；索威尔平台年查询量近 100 万次；设立长沙（国内）与沙特（海外）分公司。" },
      { year: "2023", title: "顶级资质认证", text: "获中国物流与采购联合会授予 5A 级物流企业；“大禹”系统全球上线。" },
      { year: "2022", title: "全球版图扩张", text: "成立赛孚供应链、索威尔成都分公司、GIRAF 曼谷与伦敦分公司、GIRAFSAIL 河内分公司，美国海外仓正式投用。" },
      { year: "2021", title: "新设多家子公司", text: "成立长帆供应链、睿速（REXPRESS）与易三（ESAN）国际物流；设立武汉、南京分公司。" },
      { year: "2020", title: "全球供应链成型", text: "设立墨西哥分公司；全球分支机构达 25 家、年集装箱运量 36 万 TEU、年营收超 33 亿元；升级企业愿景与价值观。" },
      { year: "2019", title: "品牌与信用", text: "设立成都分公司；诞生长帆吉祥物“小帆”；获评全信联最高信用等级 AAA；成立长帆党支部。" },
      { year: "2018", title: "成立二十周年", text: "在深圳隆重庆祝成立 20 周年；发布全新品牌标识；员工数突破 900 人；成立长帆员工成长学院。" },
      { year: "2016", title: "扬帆出海", text: "设立首个海外（美国）分公司；通过国家 ISO9001 体系认证。" },
      { year: "2015", title: "国际化战略", text: "提出国际化发展战略；为多家世界 500 强、上市公司及知名企业提供物流服务。" },
      { year: "2011", title: "布局华北", text: "设立天津、青岛分公司，打开华北市场。" },
      { year: "2010", title: "行业认可", text: "首次跻身中国海运货代 50 强，并连续十二年上榜。" },
      { year: "2007", title: "跨越式增长", text: "设立佛山、上海分公司，完成华南与华东布局；员工数突破 100 人。" },
      { year: "探索期", title: "创业之初", text: "设立首个广州分公司，积极拓展业务版图，开启全国化发展的征程。" },
      { year: "2000", title: "一级货代资质", text: "获原外经贸部批准为国家一级货运代理企业；加入 WCA、CGLN、WFN、X2 等全球物流联盟；任深圳市货代协会副会长单位，并跻身首批无船承运人（NVOCC）。" },
      { year: "1997", title: "扬帆起航", text: "在深圳正式成立，专注综合第三方物流。公司名“LONGSAIL”取自李白诗句“长风破浪会有时，直挂云帆济沧海”。四人的小团队由此启航。" }
    ],
    "contact.eyebrow": "联系我们",
    "contact.title": "让您的货物动起来",
    "contact.lead": "告诉我们您的运输需求，一封邮件、一个电话，方案由我们构建。",
    "contact.name": "姓名",
    "contact.email": "邮箱",
    "contact.message": "您的需求",
    "contact.submit": "提交咨询",
    "contact.info": "联系方式",
    "contact.emailLabel": "邮箱",
    "contact.phoneLabel": "电话",
    "contact.addrLabel": "办公地点"
  }

  /* es: { ... }  // <- add a full locale here to extend */
};

/* ---------------------- DATA (arrays / structured) ---------------------- */
const DATA = {
  en: {
    stats: [
      { value: 600000, suffix: "+", label: "Containers (2025)" },
      { value: 110000, suffix: "+", label: "Customers" },
      { value: 33, suffix: "+", label: "Global branches" },
      { value: 28, suffix: "+", label: "Years of experience" }
    ],
    services: [
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
    ],
    solutions: [
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
    ],
    process: [
      { num: "01", title: "Consult & Quote", desc: "Share your cargo, lanes and deadlines — we return a transparent, all-in quote." },
      { num: "02", title: "Plan & Book", desc: "We design the multimodal route, secure space and handle booking end-to-end." },
      { num: "03", title: "Execute & Track", desc: "Your shipment moves with proactive milestone updates via our IT platform." },
      { num: "04", title: "Deliver & Support", desc: "Local teams clear, deliver and stay on for after-sales support." }
    ],
    offices: [
      { city: "Bangkok", country: "Thailand" },
      { city: "Hanoi", country: "Vietnam" },
      { city: "Ho Chi Minh City", country: "Vietnam" },
      { city: "Klang (Malaysia)", country: "Malaysia" },
      { city: "Singapore", country: "Singapore" },
      { city: "London", country: "United Kingdom" },
      { city: "Hamburg", country: "Germany" },
      { city: "Los Angeles", country: "United States" },
      { city: "Mexico City", country: "Mexico" },
      { city: "Riyadh", country: "Saudi Arabia" },
      { city: "Casablanca", country: "Morocco" }
    ],
    industries: [
      "New Energy", "Telecom Equipment", "Automotive Parts",
      "Smart Home", "Engineering Machinery", "Chemicals", "EPC"
    ],
    why: [
      { icon: "grade", title: "AAAAA-level network", desc: "Backed by Longsail's top-tier qualification and 33 global branches." },
      { icon: "platform", title: "Self-developed IT platform", desc: "A proprietary system connects every node for transparent, efficient service." },
      { icon: "experience", title: "28 years of expertise", desc: "A seasoned team turns complex trade into a simple, reliable plan." },
      { icon: "local", title: "Localized + global", desc: "Local compliance and agile response in every key market we serve." }
    ],
    aboutFoundations: [
      { icon: "grade", title: "AAAAA-level qualification", desc: "Top-tier national logistics certification behind every shipment." },
      { icon: "local", title: "33 global branches", desc: "Owned offices and local teams across the world's key markets." },
      { icon: "platform", title: "Self-developed IT platform", desc: "A proprietary system connects every node for full visibility." }
    ],
    subsidiaries: [
      { region: "Americas", items: [
        { city: "Los Angeles", address: "14750 Nelson Ave, Unit H, City of Industry, CA 91744", phone: "+1 626-386-8828", email: "" , lat: 34.052, lon: -118.244 },
        { city: "Mexico City", address: "Hamburgo 206 piso 3 oficina 301, Colonia Juarez, alcaldia Cuauhtemoc, CP 06600, Ciudad de Mexico", phone: "+52 5524865705", email: "" , lat: 19.433, lon: -99.133 }
      ] },
      { region: "Europe", items: [
        { city: "London", address: "Airivo Chiswick Gable House, 18-24 Turnham Green Terrace, Chiswick, London W4 1QP", phone: "+44 790 4077141", email: "" , lat: 51.507, lon: -0.128 },
        { city: "Hamburg", address: "Hamburger Str. 11, 22083 Hamburg, Germany", phone: "+49 40 822178905", email: "" , lat: 53.551, lon: 9.994 }
      ] },
      { region: "Southeast Asia", items: [
        { city: "Bangkok", address: "Room No. 32/37 15th Floor Zone A Unit B Sino-Thai Tower, Sukhumvit 21 Rd (Asok), Klongtoey, Nua, Wattana, Bangkok 10110", phone: "+66 2 163 4397", email: "" , lat: 13.756, lon: 100.502 },
        { city: "Hanoi", address: "9th Fl, No. 1, Lane 19, Duy Tan Street, Dich Vong Hau Ward, Cau Giay District, Ha Noi", phone: "+84 778284888", email: "" , lat: 21.028, lon: 105.834 },
        { city: "Ho Chi Minh City", address: "4th Floor, 2-2B Lam Son, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam", phone: "+84 28 36228118", email: "" , lat: 10.823, lon: 106.63 },
        { city: "Klang (Malaysia)", address: "Unit 12-G, Level 12, Top Glove Tower, No. 16, Persiaran Setia Dagang, Bandar Setia Alam, 40170 Shah Alam, Selangor.", phone: "", email: "" , lat: 3.044, lon: 101.447 },
        { city: "Singapore", address: "60 Paya Lebar Road #11-53 Paya Lebar Square, Singapore 409051", phone: "", email: "" , lat: 1.352, lon: 103.82 }
      ] },
      { region: "Middle East & Africa", items: [
        { city: "Riyadh", address: "6719 Wadi Al Thumamah, Sahafah, Riyadh City, Saudi Arabia", phone: "", email: "" , lat: 24.714, lon: 46.675 },
        { city: "Casablanca", address: "Angle Boulevard Moulay Ismail et Boulevard Balti Mohamed ben Mekki, Ain Sebaa, Casablanca, Morocco", phone: "", email: "" , lat: 33.573, lon: -7.59 }
      ] },
      { region: "Greater China", items: [
        { city: "Shenzhen", address: "6th Floor, T2, Runhong Building, No. 75 Meiyuan Road, Sunxi Community, Sungang Sub-district, Luohu District, Shenzhen City, P.R. China", phone: "0755-25916717", email: "" , lat: 22.543, lon: 114.058 },
        { city: "Shanghai", address: "Room 1001-1002, Floor 10, WanShuo Building, No. 198 JingZhou Road, Yangpu District, Shanghai, China.", phone: "021-36035663", email: "" , lat: 31.23, lon: 121.474 },
        { city: "Ningbo", address: "Rm 10-1, Yin Yi Times Square, #8 Lengjing Street, Haishu District, Ningbo", phone: "0574-87322632", email: "" , lat: 29.868, lon: 121.544 },
        { city: "Tianjin", address: "Furun Center, Unit 1-2807, Southwest corner of the intersection of Jiangxi Road and Hefei Road, Hesi District, Tianjin", phone: "022-58922320-817", email: "" , lat: 39.343, lon: 117.362 },
        { city: "Qingdao", address: "601, Noble Plaza Building, No. 328, Dunhua Road, Shibei District, Qingdao", phone: "0532-66006285", email: "" , lat: 36.067, lon: 120.383 },
        { city: "Hefei", address: "Rm 1821, Block B, WEILAN BUSINESS PORT, No. 188 South Qianshan Road, Hefei, China", phone: "0551-65952871", email: "" , lat: 31.821, lon: 117.227 },
        { city: "Xiamen", address: "Unit 304-305, Building 1, 22 Huli Avenue, Huli District, Xiamen, China.", phone: "0592-2639079", email: "" , lat: 24.48, lon: 118.089 },
        { city: "Foshan", address: "Room 3303, Block 2, No. 57, Jihua 5th Road, Zumiao Street, Chancheng District, Foshan, China", phone: "0757-82902043", email: "" , lat: 23.022, lon: 113.122 },
        { city: "Shunde", address: "Room E9, 5th Floor, XinJi Times Square, QingHui Road, ShunDe District, Foshan, Guangdong", phone: "0757-22225990", email: "" , lat: 22.84, lon: 113.25 },
        { city: "Guangzhou", address: "Unit 1509, Nanfeng Hui, No. 620 Xingang East Road, Haizhu District, Guangzhou, China", phone: "020-87681663", email: "" , lat: 23.129, lon: 113.264 },
        { city: "Zhongshan", address: "2503 Lihe Commercial Center, Dongqu Street, Zhongshan City, Guangdong Province, China", phone: "0760-88366212", email: "" , lat: 22.517, lon: 113.393 },
        { city: "Dongguan", address: "Unit 1313, Building 18, Dongguan Vanke Star of East River, Wanjiang District, Dongguan, China.", phone: "0769-22881989", email: "" , lat: 23.021, lon: 113.752 },
        { city: "Jiangmen", address: "Room 2019-2020, Building B, Wanda Plaza, Pengjiang District, Jiangmen, Guangdong", phone: "0750-3850105", email: "" , lat: 22.579, lon: 113.082 },
        { city: "Huizhou", address: "Room 1408, Jiangbei Dewei Building, No. 4 Jiangbei Yunshan West Road, Huicheng District, Huizhou, Guangdong", phone: "0752-2029699", email: "" , lat: 23.112, lon: 114.415 },
        { city: "Shantou", address: "Rm. 1320, North Tower, Bainaohui Plaza, Changping Rd., Shantou, China.", phone: "0754-81880611", email: "" , lat: 23.355, lon: 116.682 },
        { city: "Zhuhai", address: "Room 509, JianAn Building, No. 113, First Street of Cui Qian Bei Road, Xiangzhou District, Zhuhai, China", phone: "0756-8532612", email: "" , lat: 22.271, lon: 113.577 },
        { city: "Wuhan", address: "2203-2204, Block F, Modern Optics Valley World Trade Center, Wuhan City, Hubei Province", phone: "027-87003602", email: "" , lat: 30.593, lon: 114.306 },
        { city: "Nanjing", address: "Room 1603, 16F, Friendship Square, 27 Hanzhong Road, Qinhuai District, Nanjing, Jiangsu Province", phone: "025-88802510", email: "" , lat: 32.06, lon: 118.797 },
        { city: "Chengdu", address: "1018, 10th Floor, Building E3, Global Center, No. 1700 North Tianfu Avenue, High-tech Zone, Chengdu, Sichuan", phone: "028-83368208", email: "" , lat: 30.573, lon: 104.067 },
        { city: "Changsha", address: "Room 2106, 21st Floor, Building 1, Meixi Yuezhang, No. 1067 Fenglin 3rd Road, Lugu Street, Yuelu District, Changsha", phone: "+86 15813592080", email: "" , lat: 28.228, lon: 112.939 },
        { city: "Beijing", address: "Room 1505, Tower A, Rongke Wangjing Center, Wangjing Subdistrict, Chaoyang District, Beijing, China", phone: "", email: "" , lat: 39.904, lon: 116.407 },
        { city: "Chongqing", address: "Room 2509, T2, Jianguo Center, Jiangbeizui, Jiangbei District, Chongqing", phone: "", email: "" , lat: 29.563, lon: 106.551 }
      ] }
    ]
  },

  zh: {
    stats: [
      { value: 600000, suffix: "+", label: "集装箱运输量（2025）" },
      { value: 110000, suffix: "+", label: "累计服务客户" },
      { value: 33, suffix: "+", label: "全球分支机构" },
      { value: 28, suffix: "+", label: "年专业经验" }
    ],
    services: [
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
    ],
    solutions: [
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
    ],
    process: [
      { num: "01", title: "咨询与报价", desc: "告知您的货物、航线与时限，我们提供透明、一口价的报价。" },
      { num: "02", title: "方案与订舱", desc: "我们设计多式联运路线、锁定舱位，并全程负责订舱。" },
      { num: "03", title: "执行与追踪", desc: "货物发运后，依托 IT 平台主动推送各节点进展。" },
      { num: "04", title: "交付与支持", desc: "本地团队负责清关、派送，并提供售后支持。" }
    ],
    offices: [
      { city: "曼谷", country: "泰国" },
      { city: "河内", country: "越南" },
      { city: "胡志明市", country: "越南" },
      { city: "巴生港（马来西亚）", country: "马来西亚" },
      { city: "新加坡", country: "新加坡" },
      { city: "伦敦", country: "英国" },
      { city: "汉堡", country: "德国" },
      { city: "洛杉矶", country: "美国" },
      { city: "墨西哥城", country: "墨西哥" },
      { city: "利雅得", country: "沙特阿拉伯" },
      { city: "卡萨布兰卡", country: "摩洛哥" }
    ],
    industries: [
      "新能源", "通讯设备", "汽车汽配",
      "智能家居", "工程机械", "化工", "EPC"
    ],
    why: [
      { icon: "grade", title: "AAAAA 级网络", desc: "依托长帆顶级资质与全球 33 家分支机构的实力。" },
      { icon: "platform", title: "自主研发 IT 平台", desc: "自研系统连接每个节点，服务透明高效。" },
      { icon: "experience", title: "28 年专业经验", desc: "资深团队将复杂贸易转化为简单可靠的方案。" },
      { icon: "local", title: "本地化 + 全球化", desc: "在每一个重点市场提供本地合规与敏捷响应。" }
    ],
    aboutFoundations: [
      { icon: "grade", title: "AAAAA 级资质", desc: "每一票货物背后，都是国家级物流最高等级资质认证。" },
      { icon: "local", title: "33 家全球分支机构", desc: "在各大重点市场拥有直属办公室与本地团队。" },
      { icon: "platform", title: "自主研发 IT 平台", desc: "自研系统连接每个节点，全程可视透明。" }
    ],
      subsidiaries: [
      { region: "美洲", items: [
          { city: "洛杉矶", address: "14750 Nelson Ave, Unit H, City of Industry, CA 91744", phone: "+1 626-386-8828", email: "" , lat: 34.052, lon: -118.244 },
          { city: "墨西哥城", address: "Hamburgo 206 piso 3 oficina 301, Colonia Juarez, alcaldia Cuauhtemoc, CP 06600, Ciudad de Mexico", phone: "+52 5524865705", email: "" , lat: 19.433, lon: -99.133 }
        ] },
      { region: "欧洲", items: [
          { city: "伦敦", address: "Airivo Chiswick Gable House, 18-24 Turnham Green Terrace, Chiswick, London W4 1QP", phone: "+44 790 4077141", email: "" , lat: 51.507, lon: -0.128 },
          { city: "汉堡", address: "Hamburger Str. 11, 22083 Hamburg, Germany", phone: "+49 40 822178905", email: "" , lat: 53.551, lon: 9.994 }
        ] },
      { region: "东南亚", items: [
          { city: "曼谷", address: "Room No. 32/37 15th Floor Zone A Unit B Sino-Thai Tower, Sukhumvit 21 Rd (Asok), Klongtoey, Nua, Wattana, Bangkok 10110", phone: "+66 2 163 4397", email: "" , lat: 13.756, lon: 100.502 },
          { city: "河内", address: "9th Fl, No. 1, Lane 19, Duy Tan Street, Dich Vong Hau Ward, Cau Giay District, Ha Noi", phone: "+84 778284888", email: "" , lat: 21.028, lon: 105.834 },
          { city: "胡志明市", address: "4th Floor, 2-2B Lam Son, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam", phone: "+84 28 36228118", email: "" , lat: 10.823, lon: 106.63 },
          { city: "巴生港（马来西亚）", address: "Unit 12-G, Level 12, Top Glove Tower, No. 16, Persiaran Setia Dagang, Bandar Setia Alam, 40170 Shah Alam, Selangor.", phone: "", email: "" , lat: 3.044, lon: 101.447 },
          { city: "新加坡", address: "60 Paya Lebar Road #11-53 Paya Lebar Square, Singapore 409051", phone: "", email: "" , lat: 1.352, lon: 103.82 }
        ] },
      { region: "中东与非洲", items: [
          { city: "利雅得", address: "6719 Wadi Al Thumamah, Sahafah, Riyadh City, Saudi Arabia", phone: "", email: "" , lat: 24.714, lon: 46.675 },
          { city: "卡萨布兰卡", address: "Angle Boulevard Moulay Ismail et Boulevard Balti Mohamed ben Mekki, Ain Sebaa, Casablanca, Morocco", phone: "", email: "" , lat: 33.573, lon: -7.59 }
        ] },
      { region: "大中华区", items: [
          { city: "深圳", address: "6th Floor, T2, Runhong Building, No. 75 Meiyuan Road, Sunxi Community, Sungang Sub-district, Luohu District, Shenzhen City, P.R. China", phone: "0755-25916717", email: "" , lat: 22.543, lon: 114.058 },
          { city: "上海", address: "Room 1001-1002, Floor 10, WanShuo Building, No. 198 JingZhou Road, Yangpu District, Shanghai, China.", phone: "021-36035663", email: "" , lat: 31.23, lon: 121.474 },
          { city: "宁波", address: "Rm 10-1, Yin Yi Times Square, #8 Lengjing Street, Haishu District, Ningbo", phone: "0574-87322632", email: "" , lat: 29.868, lon: 121.544 },
          { city: "天津", address: "Furun Center, Unit 1-2807, Southwest corner of the intersection of Jiangxi Road and Hefei Road, Hesi District, Tianjin", phone: "022-58922320-817", email: "" , lat: 39.343, lon: 117.362 },
          { city: "青岛", address: "601, Noble Plaza Building, No. 328, Dunhua Road, Shibei District, Qingdao", phone: "0532-66006285", email: "" , lat: 36.067, lon: 120.383 },
          { city: "合肥", address: "Rm 1821, Block B, WEILAN BUSINESS PORT, No. 188 South Qianshan Road, Hefei, China", phone: "0551-65952871", email: "" , lat: 31.821, lon: 117.227 },
          { city: "厦门", address: "Unit 304-305, Building 1, 22 Huli Avenue, Huli District, Xiamen, China.", phone: "0592-2639079", email: "" , lat: 24.48, lon: 118.089 },
          { city: "佛山", address: "Room 3303, Block 2, No. 57, Jihua 5th Road, Zumiao Street, Chancheng District, Foshan, China", phone: "0757-82902043", email: "" , lat: 23.022, lon: 113.122 },
          { city: "顺德", address: "Room E9, 5th Floor, XinJi Times Square, QingHui Road, ShunDe District, Foshan, Guangdong", phone: "0757-22225990", email: "" , lat: 22.84, lon: 113.25 },
          { city: "广州", address: "Unit 1509, Nanfeng Hui, No. 620 Xingang East Road, Haizhu District, Guangzhou, China", phone: "020-87681663", email: "" , lat: 23.129, lon: 113.264 },
          { city: "中山", address: "2503 Lihe Commercial Center, Dongqu Street, Zhongshan City, Guangdong Province, China", phone: "0760-88366212", email: "" , lat: 22.517, lon: 113.393 },
          { city: "东莞", address: "Unit 1313, Building 18, Dongguan Vanke Star of East River, Wanjiang District, Dongguan, China.", phone: "0769-22881989", email: "" , lat: 23.021, lon: 113.752 },
          { city: "江门", address: "Room 2019-2020, Building B, Wanda Plaza, Pengjiang District, Jiangmen, Guangdong", phone: "0750-3850105", email: "" , lat: 22.579, lon: 113.082 },
          { city: "惠州", address: "Room 1408, Jiangbei Dewei Building, No. 4 Jiangbei Yunshan West Road, Huicheng District, Huizhou, Guangdong", phone: "0752-2029699", email: "" , lat: 23.112, lon: 114.415 },
          { city: "汕头", address: "Rm. 1320, North Tower, Bainaohui Plaza, Changping Rd., Shantou, China.", phone: "0754-81880611", email: "" , lat: 23.355, lon: 116.682 },
          { city: "珠海", address: "Room 509, JianAn Building, No. 113, First Street of Cui Qian Bei Road, Xiangzhou District, Zhuhai, China", phone: "0756-8532612", email: "" , lat: 22.271, lon: 113.577 },
          { city: "武汉", address: "2203-2204, Block F, Modern Optics Valley World Trade Center, Wuhan City, Hubei Province", phone: "027-87003602", email: "" , lat: 30.593, lon: 114.306 },
          { city: "南京", address: "Room 1603, 16F, Friendship Square, 27 Hanzhong Road, Qinhuai District, Nanjing, Jiangsu Province", phone: "025-88802510", email: "" , lat: 32.06, lon: 118.797 },
          { city: "成都", address: "1018, 10th Floor, Building E3, Global Center, No. 1700 North Tianfu Avenue, High-tech Zone, Chengdu, Sichuan", phone: "028-83368208", email: "" , lat: 30.573, lon: 104.067 },
          { city: "长沙", address: "Room 2106, 21st Floor, Building 1, Meixi Yuezhang, No. 1067 Fenglin 3rd Road, Lugu Street, Yuelu District, Changsha", phone: "+86 15813592080", email: "" , lat: 28.228, lon: 112.939 },
          { city: "北京", address: "Room 1505, Tower A, Rongke Wangjing Center, Wangjing Subdistrict, Chaoyang District, Beijing, China", phone: "", email: "" , lat: 39.904, lon: 116.407 },
          { city: "重庆", address: "Room 2509, T2, Jianguo Center, Jiangbeizui, Jiangbei District, Chongqing", phone: "", email: "" , lat: 29.563, lon: 106.551 }
        ] }
    ]
  }
};
