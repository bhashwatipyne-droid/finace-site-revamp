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
  { value: "30+", label: "Team Members" },
  { value: "96%", label: "On-Time Delivery" },
];

export const aboutStats = [
  { value: "2016", label: "Started our journey" },
  { value: "10k+", label: "Projects delivered" },
  { value: "70+", label: "BFSI clients" },
  { value: "30+", label: "Team members" },
];

export type Client = { name: string; logo: string; category: string };

export const clientRows: Client[][] = [
  [
    { name: "ICICI Prudential Mutual Fund", logo: "icici-prudential-mf", category: "Investment" },
    { name: "ICICI ETF", logo: "icici-etf", category: "Investment" },
    { name: "ICICI Prudential iSIF", logo: "isif", category: "Investment" },
    { name: "Aditya Birla Sun Life Mutual Fund", logo: "aditya-birla-sun-life-amc", category: "Investment" },
    { name: "Aditya Birla Capital Mutual Funds", logo: "aditya-birla-capital", category: "Investment" },
    { name: "Apex SIF", logo: "apex-sif", category: "Investment" },
    { name: "Canara Robeco Mutual Fund", logo: "canara-robeco-mf", category: "Investment" },
    { name: "Franklin Templeton", logo: "franklin-templeton", category: "Investment" },
    { name: "Sapphire SIF", logo: "sapphire-sif", category: "Investment" },
    { name: "Baroda BNP Paribas Mutual Fund", logo: "baroda-bnp-paribas-mf", category: "Investment" },
    { name: "Bajaj Asset Management", logo: "bajaj-finserv-amc", category: "Investment" },
    { name: "Tata Mutual Fund", logo: "tata-mutual-fund", category: "Investment" },
    { name: "HSBC Global Asset Management", logo: "hsbc-global-asset-management", category: "Investment" },
    { name: "UTI Mutual Fund", logo: "uti-mutual-fund", category: "Investment" },
    { name: "UTI International", logo: "uti-international", category: "Investment" },
    { name: "ITI Mutual Fund", logo: "iti-mutual-fund", category: "Investment" },
    { name: "Invesco Mutual Fund", logo: "invesco-mutual-fund", category: "Investment" },
    { name: "Nuvama Asset Management", logo: "nuvama-asset-management", category: "Investment" },
  ],
  [
    { name: "360 ONE Asset Management", logo: "360-one-asset", category: "Investment" },
    { name: "Dyna SIF (by 360 ONE Asset)", logo: "dyna-sif", category: "Investment" },
    { name: "Helios Mutual Fund", logo: "helios-mutual-fund", category: "Investment" },
    { name: "Bandhan Mutual Fund", logo: "bandhan-mutual-fund", category: "Investment" },
    { name: "Union Mutual Fund", logo: "union-mutual-fund", category: "Investment" },
    { name: "The Wealth Company", logo: "the-wealth-company", category: "Investment" },
    { name: "PGIM India Mutual Fund", logo: "pgim-india-mf", category: "Investment" },
    { name: "Motilal Oswal Mutual Fund", logo: "motilal-oswal-amc", category: "Investment" },
    { name: "HDFC Mutual Fund", logo: "hdfc-mutual-fund", category: "Investment" },
    { name: "Kotak Mutual Fund", logo: "kotak-mutual-fund", category: "Investment" },
    { name: "Mahindra Manulife Mutual Fund", logo: "mahindra-manulife-mf", category: "Investment" },
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
  { name: "Consulting", phase: "Understanding the requirement." },
  { name: "Research", phase: "Digging deeper into the product." },
  { name: "Strategy", phase: "Finding insights & stories worth building on." },
  { name: "Creation", phase: "Bringing the strategy to life with creatives that connect." },
  { name: "Experience", phase: "Getting it right at every step for a seamless experience." },
];

export type Service = {
  title: string;
  copy: string;
  items: string[];
  tone: "sage" | "white" | "green" | "mist";
};

export const services: Service[] = [
  {
    title: "Content & Research",
    copy: "From product stories to investor communication, we specialize in research-led storytelling that makes financial products easier to communicate.",
    items: ["Creative Campaigns", "Performance Creatives", "Social & Digital Content", "Investor communication"],
    tone: "sage",
  },
  {
    title: "Creative Design & Visual Communication",
    copy: "We build cohesive visual systems that bring ideas to life while creating consistent brand experiences.",
    items: ["Campaign Identities", "Brand Assets", "Social Media Creatives", "Presentation & Sales Collaterals"],
    tone: "white",
  },
  {
    title: "Video & Animation",
    copy: "Bringing products, propositions and campaigns to life through video, motion graphics and interactive experiences.",
    items: ["Product Videos", "Explainer Videos", "Motion Graphics & Reels", "Interactive Videos"],
    tone: "green",
  },
  {
    title: "Gamification & Merchandise",
    copy: "Taking engagement beyond the screen through games, activations and physical experiences.",
    items: ["Phygital Games", "Investor Engagement Tools", "Merchandise & Physical Collaterals", "Event Experiences"],
    tone: "mist",
  },
  {
    title: "Digital Solutions",
    copy: "Designing digital experiences that take audiences from information to action.",
    items: ["Microsites", "Landing Pages", "Digital Journeys", "Calculators & Tools"],
    tone: "white",
  },
];

export const testimonials = [
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
    role: "Now with Motilal Oswal · Ex ICICI Prudential MF",
    linkedin: "https://www.linkedin.com/in/anjali-nair-831111169",
  },
  {
    quote:
      "The biggest asset of FinAce is understanding the complex subject of mutual funds and communicating it in investor-friendly language.",
    detail:
      "Many agencies are good at design but completely miss concept clarity. Every time, FinAce brings new concepts to the desk that showcase both their subject understanding and marketing skills.",
    name: "Vishal Kapoor",
    role: "Aditya Birla Capital",
    linkedin: "https://www.linkedin.com/in/vishal-kapoor-23808318",
  },
  {
    quote: "FinAce understands both worlds — strict mutual fund guidelines and creative, simple communication.",
    detail:
      "For communications, mutual funds are one of the most challenging categories, with complicated products that need simple, creative marketing. FinAce has helped us create interesting communications by simplifying content and bringing in creativity.",
    name: "Gaurav Agrawal",
    role: "Principal Mutual Fund",
    linkedin: "https://www.linkedin.com/in/gaurav-agrawal-marketing",
  },
];

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
