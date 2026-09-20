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
    "nav.network": "Global Network",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.eyebrow": "GIRAFSAIL · A Longsail Sub-Brand",
    "hero.title": "Simplify the<br>cross-border trade.",
    "hero.sub": "One-stop global logistics built on localized operations and globalized resources — powered by a self-developed IT platform and an AAAAA-level network.",
    "hero.cta1": "Explore services",
    "hero.cta2": "Talk to our team",

    "services.eyebrow": "What we do",
    "services.title": "A full-spectrum logistics portfolio",
    "services.lead": "From origin to destination, one call or one email is all it takes. Our team with 20+ years of experience designs the plan that fits you.",

    "solutions.eyebrow": "Cargo solutions",
    "solutions.title": "Engineered for every cargo type",
    "solutions.lead": "Specialized handling and compliance for the cargo that moves the world.",

    "network.eyebrow": "Where we are",
    "network.title": "Local teams, global reach",
    "network.lead": "GIRAFSAIL runs its own teams in key markets, backed by 36 subsidiaries of Longsail International Logistics across the globe.",

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
    "footer.parent": "A sub-brand of Longsail International Logistics Co., Ltd."
  },

  zh: {
    "nav.services": "服务项目",
    "nav.solutions": "解决方案",
    "nav.network": "全球网络",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",

    "hero.eyebrow": "GIRAFSAIL · 长帆国际物流子品牌",
    "hero.title": "让跨境贸易<br>更简单。",
    "hero.sub": "以本地化运营与全球化资源，提供一站式全球物流解决方案——依托自主研发的 IT 平台与 AAAAA 级服务网络。",
    "hero.cta1": "浏览服务",
    "hero.cta2": "联系我们",

    "services.eyebrow": "我们做什么",
    "services.title": "全谱系物流服务组合",
    "services.lead": "从起运地到目的港，一个电话或一封邮件即可。拥有 20 余年专业经验的团队为您量身定制方案。",

    "solutions.eyebrow": "货物解决方案",
    "solutions.title": "为每一种货物量身打造",
    "solutions.lead": "为驱动世界的货物提供专业操作与合规保障。",

    "network.eyebrow": "我们在哪里",
    "network.title": "本地团队，全球触达",
    "network.lead": "GIRAFSAIL 在重点市场设有直属团队，背靠长帆国际物流全球 36 家分子公司。",

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
    "footer.parent": "长帆国际物流股份有限公司旗下子品牌。"
  }

  /* es: { ... }  // <- add a full locale here to extend */
};

/* ---------------------- DATA (arrays / structured) ---------------------- */
const DATA = {
  en: {
    stats: [
      { value: 600000, suffix: "+", label: "Containers (2025)" },
      { value: 110000, suffix: "+", label: "Customers" },
      { value: 37, suffix: "+", label: "Subsidiaries" },
      { value: 20, suffix: "+", label: "Years of experience" }
    ],
    services: [
      { icon: "ocean", title: "Ocean Freight", desc: "FCL & LCL services across major trade lanes with competitive space and schedule control." },
      { icon: "air", title: "Air Freight", desc: "Time-critical air solutions with flexible routings and door-to-door options." },
      { icon: "railway", title: "Railway", desc: "China–Europe and China–Asia block trains for balanced cost and transit time." },
      { icon: "inland", title: "Inland Delivery", desc: "First-mile and last-mile trucking coordinated with multimodal legs." },
      { icon: "ecommerce", title: "Cross-border E-commerce", desc: "Fulfilment, line-haul and last-mile for global online sellers." },
      { icon: "dg", title: "DG & Special Containers", desc: "Dangerous goods and specialized equipment with full compliance support." },
      { icon: "port", title: "Destination Port Services", desc: "Local clearance, devanning and delivery at overseas gateway ports." },
      { icon: "customs", title: "Customs & Inspection", desc: "Declaration, inspection and tariff optimization by licensed brokers." },
      { icon: "warehouse", title: "Warehousing", desc: "Strategic storage and inventory management near key hubs." },
      { icon: "bonded", title: "Bonded Logistics", desc: "Bonded warehousing and value-added processing under customs supervision." }
    ],
    solutions: [
      { icon: "general", title: "General Cargo", desc: "Standard commodities with optimized routing and visibility." },
      { icon: "frozen", title: "Frozen Cargo", desc: "Reefer and cold-chain integrity from dock to shelf." },
      { icon: "danger", title: "Dangerous Cargo", desc: "DG classification, packing and documentation handled end-to-end." },
      { icon: "special", title: "Special Cargo", desc: "Oversized, project and high-value shipments with tailored plans." }
    ],
    offices: [
      { city: "Mexico City", country: "Mexico" },
      { city: "London", country: "United Kingdom" },
      { city: "Hamburg", country: "Germany" },
      { city: "Ho Chi Minh City", country: "Vietnam" },
      { city: "Hanoi", country: "Vietnam" },
      { city: "Bangkok", country: "Thailand" },
      { city: "Riyadh", country: "Saudi Arabia" }
    ],
    industries: [
      "New Energy", "Telecom Equipment", "Automotive Parts",
      "Smart Home", "Engineering Machinery", "Chemicals", "EPC"
    ],
    why: [
      { icon: "grade", title: "AAAAA-level network", desc: "Backed by Longsail's top-tier qualification and 36 global subsidiaries." },
      { icon: "platform", title: "Self-developed IT platform", desc: "A proprietary system connects every node for transparent, efficient service." },
      { icon: "experience", title: "20+ years of expertise", desc: "A seasoned team turns complex trade into a simple, reliable plan." },
      { icon: "local", title: "Localized + global", desc: "Local compliance and agile response in every key market we serve." }
    ]
  },

  zh: {
    stats: [
      { value: 600000, suffix: "+", label: "集装箱运输量（2025）" },
      { value: 110000, suffix: "+", label: "累计服务客户" },
      { value: 37, suffix: "+", label: "全球分子公司" },
      { value: 20, suffix: "+", label: "年专业经验" }
    ],
    services: [
      { icon: "ocean", title: "海运", desc: "覆盖主要贸易航线的整箱与拼箱服务，舱位与船期稳定可控。" },
      { icon: "air", title: "空运", desc: "时效优先的空运方案，灵活航线与门到门服务。" },
      { icon: "railway", title: "铁路", desc: "中欧、中亚班列，兼顾成本与时效的多式联运。" },
      { icon: "inland", title: "陆运", desc: "与多式联运无缝衔接的头程与末端拖车配送。" },
      { icon: "ecommerce", title: "跨境电商物流", desc: "面向全球卖家的仓储履约、干线及末端配送。" },
      { icon: "dg", title: "危险品及特种箱", desc: "危险品与特种设备的全程合规操作支持。" },
      { icon: "port", title: "目的港服务", desc: "海外枢纽港的本地清关、拆箱与派送。" },
      { icon: "customs", title: "报关报检", desc: "持牌报关行的申报、查验与税则优化。" },
      { icon: "warehouse", title: "仓储服务", desc: "核心枢纽附近的策略性仓储与库存管理。" },
      { icon: "bonded", title: "保税物流", desc: "海关监管下的保税仓储与增值加工。" }
    ],
    solutions: [
      { icon: "general", title: "一般货物", desc: "以优化航线与全程可视化为标准品提供保障。" },
      { icon: "frozen", title: "冷冻货物", desc: "从码头到货架全程冷链不断链。" },
      { icon: "danger", title: "危险货物", desc: "危险品分类、包装与单证端到端处理。" },
      { icon: "special", title: "特殊货物", desc: "超大件、项目货与高价值货物的定制方案。" }
    ],
    offices: [
      { city: "墨西哥城", country: "墨西哥" },
      { city: "伦敦", country: "英国" },
      { city: "汉堡", country: "德国" },
      { city: "胡志明市", country: "越南" },
      { city: "河内", country: "越南" },
      { city: "曼谷", country: "泰国" },
      { city: "利雅得", country: "沙特阿拉伯" }
    ],
    industries: [
      "新能源", "通讯设备", "汽车汽配",
      "智能家居", "工程机械", "化工", "EPC"
    ],
    why: [
      { icon: "grade", title: "AAAAA 级网络", desc: "依托长帆顶级资质与全球 36 家分子公司的实力。" },
      { icon: "platform", title: "自主研发 IT 平台", desc: "自研系统连接每个节点，服务透明高效。" },
      { icon: "experience", title: "20 余年专业经验", desc: "资深团队将复杂贸易转化为简单可靠的方案。" },
      { icon: "local", title: "本地化 + 全球化", desc: "在每一个重点市场提供本地合规与敏捷响应。" }
    ]
  }
};
