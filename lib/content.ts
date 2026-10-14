// Site copy and data, taken from the approved Claude Design prototype.

export type Chip = { icon: string; title: string; sub: string; highlight?: boolean };
export type ChipRow = { offset: number; duration: number; large?: boolean; chips: Chip[] };

// Hero "raw material" conveyor: five rows, each looping its three chips.
export const heroRows: ChipRow[] = [
  {
    offset: 0,
    duration: 36,
    chips: [
      { icon: "▤", title: "Flexi Cap Fund", sub: "Scheme Factsheet · Aug 2026" },
      { icon: "◢", title: "Life Cycle Fund 2036", sub: "NFO Launch · Sep 2026", highlight: true },
      { icon: "▲", title: "Large & Mid Cap", sub: "Performance Note · Q1 FY27" },
    ],
  },
  {
    offset: 57,
    duration: 44,
    chips: [
      { icon: "◉", title: "Fund Manager Desk", sub: "Market Commentary · Sep 2026" },
      { icon: "▤", title: "Balanced Advantage", sub: "Annual Report · FY 2025-26" },
      { icon: "◢", title: "BSE Insurance ETF", sub: "NFO Launch · Jul 2026", highlight: true },
    ],
  },
  {
    offset: 4,
    duration: 32,
    large: true,
    chips: [
      { icon: "▤", title: "Multi-Asset FOF", sub: "Product Note · Jun 2026" },
      { icon: "▶", title: "SIP Explainer", sub: "Investor Education · Ep 04" },
      { icon: "◢", title: "Gilt Fund", sub: "Corporate Announcement · Aug 2026", highlight: true },
    ],
  },
  {
    offset: 61,
    duration: 48,
    chips: [
      { icon: "▲", title: "Distributor Meet", sub: "Sales Kit · FY27" },
      { icon: "◉", title: "Riskometer Update", sub: "Regulatory Brief · Q2 FY27" },
      { icon: "▤", title: "Liquid Fund", sub: "Monthly Factsheet · Aug 2026" },
    ],
  },
  {
    offset: 8,
    duration: 38,
    large: true,
    chips: [
      { icon: "◢", title: "Nifty 50 Index Fund", sub: "Campaign Brief · Q3 FY27", highlight: true },
      { icon: "▤", title: "Tax Saver ELSS", sub: "Investor Presentation · FY27" },
      { icon: "▶", title: "Goal Planning", sub: "Explainer Film · Ep 02" },
    ],
  },
];

export const homeStats = [
  { value: "70+", label: "BFSI Clients" },
  { value: "5", label: "Countries Served" },
  { value: "10+", label: "Years of Existence" },
  { value: "95%+", label: "Client Retention" },
  { value: "98%", label: "Clients via Referrals" },
  { value: "5+ Years", label: "Client Tenure" },
];

export const aboutStats = [
  { value: "2016", label: "Started our journey" },
  { value: "10k+", label: "Projects delivered" },
  { value: "70+", label: "BFSI clients" },
  { value: "30+", label: "Team members" },
];

export type Client = { name: string; logo: string; category: string; tag?: string };

export const clientRows: Client[][] = [
  [
    { name: "ICICI Prudential Mutual Fund", logo: "icici-prudential-mf", category: "Investment", tag: "Mutual Fund" },
    { name: "Aditya Birla Sun Life Mutual Fund", logo: "aditya-birla-sun-life-amc", category: "Investment", tag: "Mutual Fund" },
    { name: "Aditya Birla Capital Mutual Funds", logo: "aditya-birla-capital", category: "Investment", tag: "Mutual Fund" },
    { name: "Canara Robeco Mutual Fund", logo: "canara-robeco-mf", category: "Investment", tag: "Mutual Fund" },
    { name: "Franklin Templeton", logo: "franklin-templeton", category: "Investment", tag: "Mutual Fund, SIF & AIF" },
    { name: "Sapphire SIF", logo: "sapphire-sif", category: "Investment", tag: "SIF" },
    { name: "Baroda BNP Paribas Mutual Fund", logo: "baroda-bnp-paribas-mf", category: "Investment", tag: "Mutual Fund" },
    { name: "Bajaj Asset Management", logo: "bajaj-finserv-amc", category: "Investment", tag: "Mutual Fund, SIF & AIF" },
    { name: "Tata Mutual Fund", logo: "tata-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "HSBC Global Asset Management", logo: "hsbc-global-asset-management", category: "Investment", tag: "Mutual Fund, SIF & AIF" },
    { name: "UTI Mutual Fund", logo: "uti-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "UTI International", logo: "uti-international", category: "Investment", tag: "AIF & PMS" },
    { name: "ITI Mutual Fund", logo: "iti-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "Invesco Mutual Fund", logo: "invesco-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "Nuvama Asset Management", logo: "nuvama-asset-management", category: "Investment", tag: "AIF & PMS" },
  ],
  [
    { name: "360 ONE Asset Management", logo: "360-one-asset", category: "Investment", tag: "AIF & PMS" },
    { name: "Dyna SIF (by 360 ONE Asset)", logo: "dyna-sif", category: "Investment", tag: "SIF & PMS" },
    { name: "Helios Mutual Fund", logo: "helios-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "Bandhan Mutual Fund", logo: "bandhan-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "Union Mutual Fund", logo: "union-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "The Wealth Company", logo: "the-wealth-company", category: "Investment", tag: "Mutual Fund" },
    { name: "PGIM India Mutual Fund", logo: "pgim-india-mf", category: "Investment", tag: "Mutual Fund" },
    { name: "Motilal Oswal Mutual Fund", logo: "motilal-oswal-amc", category: "Investment", tag: "Mutual Fund" },
    { name: "HDFC Mutual Fund", logo: "hdfc-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "Kotak Mutual Fund", logo: "kotak-mutual-fund", category: "Investment", tag: "Mutual Fund" },
    { name: "Mahindra Manulife Mutual Fund", logo: "mahindra-manulife-mf", category: "Investment", tag: "Mutual Fund" },
    { name: "AMFI", logo: "amfi", category: "Industry Body" },
    { name: "NSE", logo: "nse", category: "Industry Body" },
    { name: "Federal Bank", logo: "federal-bank", category: "Bank" },
    { name: "IndusInd Bank", logo: "indusind-bank", category: "Bank" },
    { name: "TATA AIA Life Insurance", logo: "tata-aia-life", category: "Insurance" },
    { name: "Aditya Birla Health Insurance", logo: "aditya-birla-health-insurance", category: "Insurance" },
    { name: "PNB Housing", logo: "pnb-housing-finance", category: "NBFC" },
    { name: "Ecofy", logo: "ecofy", category: "NBFC" },
    { name: "IndiaNivesh", logo: "indianivesh", category: "NBFC" },
    { name: "AssetPlus", logo: "assetplus", category: "Fintech" },
    { name: "Vested", logo: "vested", category: "Fintech" },
    { name: "Dezerv", logo: "dezerv", category: "Fintech" },
  ],
];

export const workSteps = [
  {
    name: "Idea",
    tagline: "Starting with the right idea",
    copy: "Every project starts with an idea. We help shape it, challenge it and find the opportunity worth pursuing.",
  },
  {
    name: "Strategy",
    tagline: "Deciding how to make it work",
    copy: "Message, approach and direction. We determine what needs to be said, who needs to hear it and how we can make it meaningful.",
  },
  {
    name: "Execution & Compliance",
    tagline: "Turning ideas into communication",
    copy: "Production, adaptation and delivery. We turn the idea into communication that works across the required formats and platforms, with compliance built into the process from the start.",
  },
  {
    name: "Review & Beyond",
    tagline: "Keeping the work moving forward",
    copy: "We review, learn and gather feedback to identify what can be improved, adapted or taken further.",
  },
];

export type Service = {
  title: string;
  headline: string;
  copy: string;
  items: string[];
  tone: "sage" | "white" | "green" | "mist";
};

export const services: Service[] = [
  {
    title: "Content & Research",
    headline: "Complex finance shouldn't require a finance degree.",
    copy: "Financial products can be complicated. The communication doesn't have to be.",
    items: ["Creative Campaigns", "Performance Creatives", "Social Media & Digital Content", "Investor Communication"],
    tone: "sage",
  },
  {
    title: "Creative Design & Visual Communication",
    headline: "Good ideas deserve more than a good-looking execution.",
    copy: "We turn strategy into visual communication that's clear and impactful across every touchpoint.",
    items: ["Campaign Identities", "Brand Assets", "Social Media Creatives", "Presentation & Sales Collaterals"],
    tone: "white",
  },
  {
    title: "Video & Animation",
    headline: "If it's complicated, show it.",
    copy: "Some financial concepts are easier to understand when you can see them, not just read them.",
    items: ["Product Videos", "Explainer Videos", "Motion Graphics & Reels", "Interactive Videos"],
    tone: "green",
  },
  {
    title: "Gamification & Merchandise",
    headline: "Finance should never feel boring.",
    copy: "When audiences need to participate, not just consume, communication needs to become an experience.",
    items: ["Phygital Games", "Investor Engagement Tools", "Merchandise & Physical Collaterals", "Event Experiences"],
    tone: "mist",
  },
  {
    title: "Digital Solutions",
    headline: "Don't just tell people. Give them somewhere to go.",
    copy: "A good digital experience can take an audience from understanding a product to actually doing something with that information.",
    items: ["Microsites", "Landing Pages", "Digital Journeys", "Calculators & Tools"],
    tone: "white",
  },
];

export type Testimonial = {
  quote: string;
  detail: string;
  name: string;
  role: string;
  linkedin?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "FinAce has been a strong strategic partner for us — the rigour they bring to research stands out.",
    detail:
      "They use data and industry intelligence to uncover insights, identify whitespace and turn them into differentiated messaging. Their turnaround is excellent and the team is hands-on, responsive and always willing to push further.",
    name: "Ameya Ingle",
    role: "Director & Head - Marketing, Invesco India Mutual Fund",
    linkedin: "https://www.linkedin.com/in/ameya-ingle-74b6a38/",
  },
  {
    quote: "Working with FinAce has been a great experience.",
    detail:
      "A strong, efficient team across research, content and design, with each member taking complete ownership. Their understanding of the mutual fund industry reflects in the quality and relevance of their work, making them a dependable partner.",
    name: "Anjali Nair",
    role: "Deputy Manager, ICICI Prudential AMC",
    linkedin: "https://www.linkedin.com/in/anjali-nair-831111169",
  },
  {
    quote:
      "The biggest asset of FinAce is understanding the complex subject of mutual funds and communicating it in investor-friendly language.",
    detail:
      "Many agencies are good at design but completely miss concept clarity. Every time, FinAce brings new concepts to the desk that showcase both their subject understanding and marketing skills.",
    name: "Vishal Kapoor",
    role: "Deputy Vice President, Tata AIA Life Insurance",
    linkedin: "https://www.linkedin.com/in/vishal-kapoor-23808318",
  },
  {
    quote: "FinAce understands both worlds — strict mutual fund guidelines and creative, simple communication.",
    detail:
      "For communications, mutual funds are one of the most challenging categories, with complicated products that need simple, creative marketing. FinAce has helped us create interesting communications by simplifying content and bringing in creativity.",
    name: "Gaurav Agrawal",
    role: "Vice President – Marketing, UTI Mutual Fund",
    linkedin: "https://www.linkedin.com/in/gaurav-agrawal-marketing",
  },
  {
    quote: "Working with this team has been an absolute pleasure.",
    detail:
      "They’ve delivered on multiple NFO campaigns for us, and their work ethic is second to none. What sets them apart is their ability to take complex financial concepts and translate them into clear, engaging language and clean designs that truly resonate with investors. They truly understand the mutual fund category and have excelled in creative execution in this space.",
    name: "Sweta Mehta",
    role: "AVP, ICICI Prudential AMC",
  },
  {
    quote: "FinAce has been incredible to work with.",
    detail:
      "Their creative direction is spot-on, and their turnaround speed is really commendable — they get our vision right away, work amazingly fast, and are super professional through every revision. Keep it up, team FinAce!",
    name: "Namrata Lonkar",
    role: "AVP – Distribution Communication, Helios Mutual Fund",
  },
];

// "The problem" section: questions clients ask, each with a scripted answer.
export type AskItem = { tag: string; icon: string; question: string; lead: string; answer: string; cta: string };

export const askItems: AskItem[] = [
  {
    tag: "01 — Compliance",
    icon: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6",
    question: "How do we build compliance into the idea without killing the creative?",
    lead: "You shouldn't have to choose between compliance and creativity.",
    answer:
      "We bring compliance in from the start, understand the claims and requirements, and build them into the idea. That means fewer unnecessary revisions and more room for the creative to work.",
    cta: "Build with compliance →",
  },
  {
    tag: "02 — Concepts",
    icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
    question: "How do we turn complex financial concepts into something people actually understand?",
    lead: "If we can't explain it simply, we probably don't understand it well enough yet.",
    answer:
      "We get into the concept first, then find the simplest way to communicate it without losing the meaning. The result is financial communication that feels clear, not watered down.",
    cta: "Simplify the complex →",
  },
  {
    tag: "03 — Context",
    icon: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    question: "How do we make sure the communication fits the product, market and moment?",
    lead: "The same message doesn't work in every context.",
    answer:
      "We look beyond the product itself. What's happening in the market? What does the audience already know? What's relevant right now? That context shapes what we say, how we say it and when we say it.",
    cta: "Find the right context →",
  },
  {
    tag: "04 — Audience",
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
    question: "How do we explain the same financial idea to different audiences?",
    lead: "One product can need very different stories.",
    answer:
      "An investor, distributor and consumer don't read the same information in the same way. We adapt the message to what each audience needs to understand, remember and act on.",
    cta: "Make it audience-ready →",
  },
  {
    tag: "05 — Campaigns & Experiences",
    icon: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
    question: "What kind of campaigns and experiences can you create to meet our marketing objectives?",
    lead: "We don't just create content. We create experiences across formats, platforms and customer segments.",
    answer:
      "From NFO campaigns and investor communication to distributor engagement, case studies and gamification, we build around your marketing objectives.",
    cta: "Explore our solutions →",
  },
  {
    tag: "06 — Simplification",
    icon: "M4 7h16M4 12h10M4 17h6",
    question: "How do we turn financial jargon into language consumers actually understand?",
    lead: "Simple doesn't mean simplistic.",
    answer:
      "We know which parts of a financial concept can be simplified, which need context and which cannot be compromised. Then we find the language that makes it click.",
    cta: "Make finance make sense →",
  },
  {
    tag: "07 — Format & Platform",
    icon: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01",
    question: "What's the best way to communicate this: video, carousel, landing page or something else?",
    lead: "The format should serve the idea, not the other way around.",
    answer:
      "We start with the objective, audience and message. Then we choose the format and platform that give the communication the best chance of being understood and remembered.",
    cta: "Find the right format →",
  },
  {
    tag: "08 — Process",
    icon: "M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",
    question: "How do we get from brief to final without endless rounds of revisions?",
    lead: "Good work shouldn't need endless rounds to get there.",
    answer:
      "The right people need to be involved from the beginning. With domain understanding, context and compliance built into the process, we reduce unnecessary back-and-forth and keep the work moving.",
    cta: "Make the process easier →",
  },
];

export const askFallback =
  "That's exactly the kind of brief we love. Share the details and our BFSI team will come back with a clear, compliant way to tell it.";

export const briefQuestions = [
  { key: "need", label: "What is your requirement?", options: ["Campaign", "Video", "Website", "Merchandise", "Not sure yet"] },
  {
    key: "audience",
    label: "Who are you trying to reach?",
    options: ["Investors", "Distributors & advisors", "Employees", "Multiple audiences", "Not sure yet"],
  },
  { key: "timeline", label: "When are you looking to start?", options: ["This month", "This quarter", "Exploring"] },
] as const;

export type BriefKey = (typeof briefQuestions)[number]["key"];

export const briefDefaults: Record<BriefKey, string> = {
  need: "Video",
  audience: "Investors",
  timeline: "This quarter",
};

export const problems = [
  ["I need to explain a financial product simply.", "We turn dense product structure into content investors will actually finish watching."],
  ["I need to educate investors, not just advertise to them.", "Education-first content that builds trust before it asks for anything."],
  [
    "I need my distributors more engaged.",
    "Communication built around what actually motivates a distributor, not just what's easy to produce.",
  ],
  [
    "I need a digital experience, not just a video.",
    "Websites, apps, and interactive formats that carry the message further than a single asset can.",
  ],
  [
    "I need to simplify something genuinely complex.",
    "This is the whole reason we exist — send us the thing nobody else could make clear.",
  ],
] as const;

export const timeline = [
  [
    "The start",
    "Two founders, one shared vision",
    "Gaurav Mody and Nikhil Kothari founded FinAce in 2016, bringing together product and content expertise with a CFA research perspective.",
  ],
  [
    "Earning trust",
    "Becoming Go-To Domain Experts",
    "Years of working closely with the financial industry helped us develop a deeper understanding of products, research, audiences and the business behind them.",
  ],
  [
    "Scaling up",
    "From solving briefs to building solutions",
    "As we grew, our work evolved from communication projects to building solutions that address real challenges across the financial ecosystem.",
  ],
  [
    "Today",
    "A trusted BFSI marketing partner",
    "Today, leading financial brands and platforms rely on FinAce for everything from strategy and content to creative and visualisation.",
  ],
] as const;

export const team = [
  {
    name: "Gaurav Mody",
    role: "Founder & CEO",
    bio: "A management graduate with 20+ years of experience across BFSI, Gaurav brings expertise in product, research, digital marketing, business analytics and operations. He is passionate about building products and simplifying customer experiences through innovative solutions for the financial industry.",
    linkedin: "https://www.linkedin.com/in/gaurav-mody-928a054/",
    photo: "/team/team-gaurav.jpeg",
  },
  {
    name: "Nikhil Kothari",
    role: "Co-founder",
    bio: "A CFA, CAIA and CFP with 19+ years of experience in investment research and financial planning, Nikhil is focused on simplifying finance and helping people make informed financial decisions.",
    linkedin: "https://www.linkedin.com/in/nikhil-kothari-06273b9",
    photo: "/team/team-nikhil.jpeg",
  },
];

export const contact = {
  phoneDisplay: "81049 31645",
  phoneHref: "tel:+918104931645",
  email: "info@finace.co",
};

export const social = {
  facebook: "https://www.facebook.com/FinAce.co/",
  linkedin: "https://www.linkedin.com/company/finace-co/",
  instagram: "https://www.instagram.com/finace.infosolutions",
};
