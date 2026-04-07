// ============================================================
// SITE CONFIGURATION
// ============================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialPlatform {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface MerchandiseItem {
  id: string;
  title: string;
  image: string;
}

// ─── NAVIGATION ─────────────────────────────────────────────
export const navigation: NavItem[] = [
  { label: "Welcome", href: "#welcome" },
  { label: "About", href: "#about" },
  { label: "Merchandise", href: "/order" },
  { label: "Social", href: "#social" },
  { label: "Websites", href: "#web" },
  { label: "Contact", href: "#contact" },
];

// ─── HOMEPAGE MERCHANDISE (carousel) ────────────────────────
export const merchandiseItems: MerchandiseItem[] = [
  { id: "peach-paper", title: "Peach Paper", image: "/images/Peach-Paper.jpg" },
  { id: "apron", title: "Apron", image: "/images/apron.jpg" },
  { id: "a-frame", title: "A Frame", image: "/images/aFrame.jpg" },
  { id: "containers", title: "Reusable Containers", image: "/images/Containers.jpg" },
  { id: "badges", title: "Badges", image: "/images/badge.jpg" },
  { id: "stickers", title: "Stickers", image: "/images/Stickers.jpg" },
  { id: "recipe-cards", title: "Recipe Cards", image: "/images/recipe-cards.jpg" },
  { id: "window-sticker", title: "Window Sticker", image: "/images/Window-Sticker.jpg" },
  { id: "posters", title: "Posters", image: "/images/Posters.jpg" },
];

// ─── SOCIAL PLATFORMS (homepage) ────────────────────────────
export const socialPlatforms: SocialPlatform[] = [
  {
    id: "facebook", title: "Facebook",
    icon: "/images/fb.png",
    description: "Facebook is an easy to use platform and will enable you to engage with customers and boost sales.",
  },
  {
    id: "instagram", title: "Instagram",
    icon: "/images/Insta.png",
    description: "Instagram is the perfect platform to inspire your customers with your product range.",
  },
  {
    id: "mailchimp", title: "Mailchimp",
    icon: "/images/mc.png",
    description: "Sending out a regular email to customers is a good way to keep them informed with all your news, product ranges and special offers.",
  },
];

// ─── HOMEPAGE SECTIONS ORDER ────────────────────────────────
export const homepageSections: string[] = [
  "welcome",
  "bluebanner",
  "about",
  "social",
  "merchandise",
  "web",
  "contact",
];

// ─── PARTNER SHOPS ──────────────────────────────────────────
export const partnerShops: { name: string; image: string }[] = [
  { name: "Alan Jones Butchers Hull", image: "/images/shops/alan-jones.jpg" },
  { name: "Prendergast Butchers Bridgend", image: "/images/shops/prendergast.jpg" },
  { name: "Colin Deans Butchers Bridgend", image: "/images/shops/colin-deans.jpg" },
  { name: "DK Butchers Leeds", image: "/images/shops/dk-butchers.jpg" },
  { name: "A W Andrews Verwood Poole", image: "/images/shops/aw-andrews.jpg" },
];

// ─── ORDER PAGE: LOCAL DEPOTS ───────────────────────────────
export const localDepots: string[] = [
  "Select your depot",
  "Birmingham",
  "Bridgend",
  "Hull",
  "Leeds",
  "Leicester",
  "Market Harborough",
  "Portsmouth",
  "Other",
];

// ─── ORDER PAGE: HOW HEARD OPTIONS ──────────────────────────
export const howHeardOptions: string[] = [
  "Select an option",
  "Weddel Swift driver",
  "Weddel Swift sales rep",
  "Social media",
  "Word of mouth",
  "Email",
  "Other",
];

// ─── SITE META ──────────────────────────────────────────────
export const siteMeta = {
  title: "Help the High Street",
  tagline: "from Weddel Swift",
  contactEmail: "hths@wsdepots.com",
  logo: "/images/logo.jpg",
  logoWhite: "/images/logo-white.png",
  heroImage: "/images/hero-butcher.jpg",
  marketingPackImage: "/images/marketing-pack.jpg",
  laptopImage: "/images/laptop.png",
};
