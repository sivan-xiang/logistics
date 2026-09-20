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
    "hero.cta1": "Explore services",
    "hero.cta2": "Talk to our team",

    "services.eyebrow": "What we do",
    "services.title": "A full-spectrum logistics portfolio",
    "services.lead": "From origin to destination, one call or one email is all it takes. Our team with 20+ years of experience designs the plan that fits you.",
    "detail.capLabel": "Key capabilities",

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
    "footer.parent": "A sub-brand of Longsail International Logistics Co., Ltd.",

    "about.eyebrow": "Our story",
    "about.title": "A global sub-brand of Longsail",
    "about.lead": "GIRAFSAIL is an international logistics sub-brand of Longsail International Logistics Co., Ltd.",
    "about.story": "Backed by the AAAAA-level qualification, a global network spanning 30+ subsidiaries, and a self-developed IT platform, GIRAFSAIL turns complex cross-border trade into a simple, reliable plan — with local teams in the world’s key hubs.",
    "about.presenceLabel": "Local teams established in",
    "network.subsTitle": "The Longsail network",
    "network.subsLead": "GIRAFSAIL is part of the Longsail group — 36 subsidiaries worldwide.",
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
    "hero.cta1": "浏览服务",
    "hero.cta2": "联系我们",

    "services.eyebrow": "我们做什么",
    "services.title": "全谱系物流服务组合",
    "services.lead": "从起运地到目的港，一个电话或一封邮件即可。拥有 20 余年专业经验的团队为您量身定制方案。",
    "detail.capLabel": "核心能力",

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
    "footer.parent": "长帆国际物流股份有限公司旗下子品牌。",

    "about.eyebrow": "我们的故事",
    "about.title": "长帆国际物流旗下全球子品牌",
    "about.lead": "GIRAFSAIL 是长帆国际物流股份有限公司旗下的国际物流子品牌。",
    "about.story": "依托长帆 AAAAA 级资质、覆盖 30 余家分子公司的全球网络，以及自主研发的 IT 平台，GIRAFSAIL 将复杂的跨境贸易化为简单可靠的方案——在各大核心枢纽均设有本地团队。",
    "about.presenceLabel": "本地团队已设立于",
    "network.subsTitle": "长帆集团网络",
    "network.subsLead": "GIRAFSAIL 隶属长帆集团，全球拥有 36 家分子公司。",
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
      { value: 37, suffix: "+", label: "Subsidiaries" },
      { value: 20, suffix: "+", label: "Years of experience" }
    ],
    services: [
      { icon: "ocean", title: "Ocean Freight", desc: "FCL & LCL services across major trade lanes with competitive space and schedule control.",
        intro: "GIRAFSAIL contracts with major ocean carriers to secure stable weekly sailings on trans-Pacific, Asia–Europe and Asia–Middle East lanes. We move full containers and consolidated LCL with transparent pricing, proactive schedule management and door-to-door or port-to-port flexibility.",
        features: ["FCL and LCL consolidation with competitive rates", "Space protection and weekly sailing guarantees", "Customs clearance and full documentation", "Real-time container tracking via our IT platform"] },
      { icon: "air", title: "Air Freight", desc: "Time-critical air solutions with flexible routings and door-to-door options.",
        intro: "For shipments where speed wins, we consolidate through major hubs and offer direct, transshipment and charter options. Our air team balances cost, transit and capacity so urgent cargo reaches destination within days, not weeks.",
        features: ["Consolidated and direct rate programs", "Charter and onboard-courier solutions", "Global transit in 1–5 days", "Handling for DG and temperature-sensitive goods"] },
      { icon: "railway", title: "Railway", desc: "China–Europe and China–Asia block trains for balanced cost and transit time.",
        intro: "Our block-train services on China–Europe and China–Central-Asia corridors deliver a cost-effective middle ground between ocean and air. We manage booking, border customs and last-leg connection under one plan.",
        features: ["FCL and LCL rail to Duisburg, Hamburg, Moscow and beyond", "Stable schedules with border customs coordination", "Lower cost than air, faster than ocean", "Seamless bonded and multimodal connection"] },
      { icon: "inland", title: "Inland Delivery", desc: "First-mile and last-mile trucking coordinated with multimodal legs.",
        intro: "Trucking is the connective tissue of every shipment. We coordinate factory pickup, port drayage and final delivery with vetted carriers, ensuring each leg is timed and documented.",
        features: ["Port drayage and container haulage", "Domestic and cross-border trucking", "Full-truckload and less-than-truckload options", "Appointment and timed delivery windows"] },
      { icon: "ecommerce", title: "Cross-border E-commerce", desc: "Fulfilment, line-haul and last-mile for global online sellers.",
        intro: "We help online sellers scale across marketplaces with overseas warehousing, pick-and-pack fulfilment, returns management and multi-carrier last-mile delivery — all connected through API.",
        features: ["Overseas warehouse fulfilment", "Pick, pack and returns handling", "Multiple last-mile carrier integrations", "Marketplace and API connectivity"] },
      { icon: "dg", title: "DG & Special Containers", desc: "Dangerous goods and specialized equipment with full compliance support.",
        intro: "Hazardous cargo and out-of-gauge equipment demand precision. Our certified team advises on classification, packing and documentation so IMO and IMDG requirements are met end-to-end.",
        features: ["Handling of IMO classes 2–9 dangerous goods", "Reefer, open-top, flat-rack and tank equipment", "MSDS review and packing advisory", "Certified packing, marking and labeling"] },
      { icon: "port", title: "Destination Port Services", desc: "Local clearance, devanning and delivery at overseas gateway ports.",
        intro: "On arrival, our local teams take over: customs clearance, devanning, transloading and delivery to your DC or door. One partner from origin to final mile, in the market that matters.",
        features: ["Local customs clearance at gateway ports", "Devanning and transloading", "Delivery to door or distribution center", "Short-term port storage and stuffing"] },
      { icon: "customs", title: "Customs & Inspection", desc: "Declaration, inspection and tariff optimization by licensed brokers.",
        intro: "Licensed brokers manage import and export declaration, HS classification and duty optimization, while coordinating inspection and quarantine to keep cargo moving compliantly.",
        features: ["Import and export declaration", "HS classification and duty optimization", "AEO and bonded facilitation", "Inspection and quarantine coordination"] },
      { icon: "warehouse", title: "Warehousing", desc: "Strategic storage and inventory management near key hubs.",
        intro: "Our warehouses near major hubs combine ambient and temperature-controlled space with WMS-driven inventory, cross-docking and value-added services to keep your supply chain responsive.",
        features: ["Ambient and temperature-controlled storage", "WMS-based inventory accuracy", "Cross-dock and distribution", "Kitting, labeling and light assembly"] },
      { icon: "bonded", title: "Bonded Logistics", desc: "Bonded warehousing and value-added processing under customs supervision.",
        intro: "Within bonded zones we store goods, defer duties and perform value-added processing under customs supervision — ideal for VMI, consignment and re-export flows.",
        features: ["Bonded storage with duty deferral", "Vendor-managed inventory and consignment", "Repacking, assembly and labeling", "Re-export and transit handling"] }
    ],
    solutions: [
      { icon: "general", title: "General Cargo", desc: "Standard commodities with optimized routing and visibility.",
        intro: "For everyday commodities we design the most cost-efficient multimodal route and keep every handoff visible, so standard cargo gets first-class control without premium cost.",
        features: ["Cost-effective multimodal routing", "End-to-end shipment visibility", "Consolidation to reduce spend", "Standardized handling SOP"] },
      { icon: "frozen", title: "Frozen Cargo", desc: "Reefer and cold-chain integrity from dock to shelf.",
        intro: "Cold-chain is a promise, not a feature. We pre-trip every reefer, log temperature continuously and connect cold storage and transload so product arrives as it left.",
        features: ["Pre-trip reefer inspection", "Continuous temperature logging", "Cold storage and transload", "GDP-compliant option for pharma"] },
      { icon: "danger", title: "Dangerous Cargo", desc: "DG classification, packing and documentation handled end-to-end.",
        intro: "Dangerous goods move only when every rule is met. We classify by IMO, pack to standard, prepare compliant documentation and plan emergency response.",
        features: ["IMO classification and SDS review", "Certified DG packing", "IATA / IMDG compliance", "Emergency response planning"] },
      { icon: "special", title: "Special Cargo", desc: "Oversized, project and high-value shipments with tailored plans.",
        intro: "Project cargo, out-of-gauge and high-value shipments need engineering, not just transport. We survey routes, secure permits and apply security escort where required.",
        features: ["Project and breakbulk management", "Heavy-lift and out-of-gauge handling", "High-value security escort", "Route survey and permit handling"] }
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
    ],
    aboutFoundations: [
      { icon: "grade", title: "AAAAA-level qualification", desc: "Top-tier national logistics certification behind every shipment." },
      { icon: "local", title: "30+ global subsidiaries", desc: "Owned offices and local teams across the world's key markets." },
      { icon: "platform", title: "Self-developed IT platform", desc: "A proprietary system connects every node for full visibility." }
    ],
    subsidiaries: [
      { region: "Europe", items: [
        "GIRAFSAIL LOGISTICS GMBH",
        "GIRAF LOGISTICS (UK) LTD"
      ] },
      { region: "Asia Pacific", items: [
        "GIRAFSAIL LOGISTICS VIETNAM CO., LTD.",
        "GIRAFSAIL LOGISTICS (THAILAND) CO., LTD."
      ] },
      { region: "Americas", items: [
        "GIRAFSAIL LOGISTICS DE MEXICO S.A. DE C.V.",
        "LONGSAIL USA CORPORATION"
      ] },
      { region: "Greater China", items: [
        "FUTURE SAIL LOGISTICS SERVICES COMPANY",
        "LONGSAIL INTERNATIONAL LOGISTICS CO., LTD.",
        "LONGSAIL SUPPLY CHAIN CO., LTD.",
        "REXPRESS TECHNOLOGY CO., LTD.",
        "ESAN INTERNATIONAL LOGISTICS CO., LTD.",
        "SAFESAIL SUPPLY CHAIN CO., LTD.",
        "SOWOLL NETWORK TECHNOLOGY CO., LTD."
      ] }
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
      { icon: "ocean", title: "海运", desc: "覆盖主要贸易航线的整箱与拼箱服务，舱位与船期稳定可控。",
        intro: "GIRAFSAIL 与主流船公司签约，锁定跨太平洋、亚欧、亚洲—中东等航线的稳定周班舱位。我们以透明报价、主动的船期管理，以及门到门或港到港的灵活组合，承运整箱与拼箱货物。",
        features: ["整箱/拼箱集运，报价具竞争力", "舱位保障与周班船期承诺", "清关与全套单证办理", "依托 IT 平台实现集装箱实时追踪"] },
      { icon: "air", title: "空运", desc: "时效优先的空运方案，灵活航线与门到门服务。",
        intro: "对速度有要求的货物，我们通过主要枢纽港做集运，并提供直飞、中转与包机多种方案。空运团队在成本、时效与舱位之间取得平衡，让紧急货物数日内而非数周抵达。",
        features: ["集运与直飞报价方案", "包机与专差押运方案", "全球 1–5 天通达", "可承接危险品与温敏货物"] },
      { icon: "railway", title: "铁路", desc: "中欧、中亚班列，兼顾成本与时效的多式联运。",
        intro: "依托中欧、中亚班列，我们提供介于海运与空运之间、性价比更高的铁路运输。从订舱、边境清关到末端衔接，均由同一方案统筹。",
        features: ["整箱/拼箱铁路至杜伊斯堡、汉堡、莫斯科等地", "稳定班期与边境清关协调", "成本低于空运、时效快于海运", "无缝衔接保税与多式联运"] },
      { icon: "inland", title: "陆运", desc: "与多式联运无缝衔接的头程与末端拖车配送。",
        intro: "拖车配送是每一票货物的连接纽带。我们协调工厂提货、港口拖运与末端派送，由经过甄选的承运商执行，确保每一段都准时有据。",
        features: ["港口拖运与集装箱接驳", "国内及跨境卡车运输", "整车/零担多种选择", "预约与定时派送窗口"] },
      { icon: "ecommerce", title: "跨境电商物流", desc: "面向全球卖家的仓储履约、干线及末端配送。",
        intro: "我们帮助线上卖家跨平台扩张：海外仓履约、拣货打包、退货管理以及多承运商末端配送，全部通过 API 打通。",
        features: ["海外仓履约", "拣货、打包与退货处理", "多家末端承运商对接", "平台与 API 系统对接"] },
      { icon: "dg", title: "危险品及特种箱", desc: "危险品与特种设备的全程合规操作支持。",
        intro: "危险货物与超规设备容不得半点马虎。我们以认证团队提供分类、包装与单证建议，确保 IMO 与 IMDG 要求端到端满足。",
        features: ["IMO 2–9 类危险品操作", "冷藏箱、开顶箱、框架箱、罐箱等设备", "MSDS 审核与包装建议", "认证包装、标记与贴标"] },
      { icon: "port", title: "目的港服务", desc: "海外枢纽港的本地清关、拆箱与派送。",
        intro: "货物到港后，由本地团队接手：清关、拆箱、倒柜及门到门或至配送中心的派送。在关键市场，从起运到末端由同一伙伴负责。",
        features: ["枢纽港本地清关", "拆箱与倒柜", "门到门或至配送中心派送", "短期港存与装箱"] },
      { icon: "customs", title: "报关报检", desc: "持牌报关行的申报、查验与税则优化。",
        intro: "持牌报关行负责进出口申报、HS 归类与税则优化，并协调查验与检验检疫，确保货物合规顺畅流转。",
        features: ["进出口申报", "HS 归类与税则优化", "AEO 与保税便利", "查验与检验检疫协调"] },
      { icon: "warehouse", title: "仓储服务", desc: "核心枢纽附近的策略性仓储与库存管理。",
        intro: "我们在主要枢纽附近布局常温与温控仓储，依托 WMS 驱动库存、越库分拨与增值服务，让供应链保持敏捷。",
        features: ["常温与温控仓储", "基于 WMS 的库存精准管理", "越库与分拨", "贴标、组套与轻量组装"] },
      { icon: "bonded", title: "保税物流", desc: "海关监管下的保税仓储与增值加工。",
        intro: "在保税区内，我们提供货物存储、缓税及海关监管下的增值加工，适用于 VMI、寄售与转口等场景。",
        features: ["保税仓储与缓税", "供应商管理库存(VMI)与寄售", "换包、组装与贴标", "转口与过境处理"] }
    ],
    solutions: [
      { icon: "general", title: "一般货物", desc: "以优化航线与全程可视化为标准品提供保障。",
        intro: "针对常规品类，我们设计最具性价比的多式联运路线，并让每一次交接都可视可控，让标准货物以非溢价成本获得一等管控。",
        features: ["高性价比多式联运路由", "端到端全程可视", "集运降本", "标准化操作 SOP"] },
      { icon: "frozen", title: "冷冻货物", desc: "从码头到货架全程冷链不断链。",
        intro: "冷链是一份承诺，而非一项功能。我们对每台冷箱出运前做 PTI 检测、全程温度记录，并衔接冷库与倒柜，让货品抵达时与离港时一致。",
        features: ["冷箱出运前 PTI 检测", "全程温度记录", "冷库与倒柜衔接", "可提供符合 GDP 的医药方案"] },
      { icon: "danger", title: "危险货物", desc: "危险品分类、包装与单证端到端处理。",
        intro: "危险品只有在每一条规则都满足时才能运输。我们按 IMO 分类、按标准包装、制备合规单证并制定应急预案。",
        features: ["IMO 分类与 SDS 审核", "认证危险品包装", "符合 IATA / IMDG", "应急预案规划"] },
      { icon: "special", title: "特殊货物", desc: "超大件、项目货与高价值货物的定制方案。",
        intro: "项目货、超规货与高价值货物需要的是工程能力而非单纯运输。我们做线路勘测、办理许可，并在必要时安排安保押运。",
        features: ["项目货与件杂货管理", "大件与超规货操作", "高价值安保押运", "线路勘测与许可办理"] }
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
    ],
    aboutFoundations: [
      { icon: "grade", title: "AAAAA 级资质", desc: "每一票货物背后，都是国家级物流最高等级资质认证。" },
      { icon: "local", title: "30+ 家全球分子公司", desc: "在各大重点市场拥有直属办公室与本地团队。" },
      { icon: "platform", title: "自主研发 IT 平台", desc: "自研系统连接每个节点，全程可视透明。" }
    ],
      subsidiaries: [
        { region: "欧洲", items: [
          "GIRAFSAIL LOGISTICS GMBH",
          "GIRAF LOGISTICS (UK) LTD"
        ] },
        { region: "亚太", items: [
          "GIRAFSAIL LOGISTICS VIETNAM CO., LTD.",
          "GIRAFSAIL LOGISTICS (THAILAND) CO., LTD."
        ] },
        { region: "美洲", items: [
          "GIRAFSAIL LOGISTICS DE MEXICO S.A. DE C.V.",
          "LONGSAIL USA CORPORATION"
        ] },
        { region: "大中华区", items: [
          "FUTURE SAIL LOGISTICS SERVICES COMPANY",
          "LONGSAIL INTERNATIONAL LOGISTICS CO., LTD.",
          "LONGSAIL SUPPLY CHAIN CO., LTD.",
          "REXPRESS TECHNOLOGY CO., LTD.",
          "ESAN INTERNATIONAL LOGISTICS CO., LTD.",
          "SAFESAIL SUPPLY CHAIN CO., LTD.",
          "SOWOLL NETWORK TECHNOLOGY CO., LTD."
        ] }
      ]
  }
};
