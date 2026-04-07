import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// Resolve data directory - try multiple locations since Vercel bundles differently
function resolveSourceDir(): string {
  const candidates = [
    join(process.cwd(), "data"),
    join(__dirname, "..", "data"),
    join(__dirname, "..", "..", "data"),
  ];
  for (const dir of candidates) {
    if (existsSync(join(dir, "products.json"))) return dir;
  }
  return join(process.cwd(), "data");
}

const isVercel = !!process.env.VERCEL;
const DATA_DIR = isVercel ? "/tmp/data" : resolveSourceDir();

// Inline seed data so it's always available even if files aren't bundled
const SEED_PRODUCTS = require("../data/products.json");
const SEED_ORDERS: unknown[] = [];

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  const prodPath = join(DATA_DIR, "products.json");
  if (!existsSync(prodPath)) {
    writeFileSync(prodPath, JSON.stringify(SEED_PRODUCTS, null, 2));
  }
  const ordersPath = join(DATA_DIR, "orders.json");
  if (!existsSync(ordersPath)) {
    writeFileSync(ordersPath, JSON.stringify(SEED_ORDERS, null, 2));
  }
}

function readJSON(file: string) {
  ensureDir();
  const path = join(DATA_DIR, file);
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJSON(file: string, data: unknown) {
  ensureDir();
  writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// ─── Products ───────────────────────────────────────────────

export interface SocialGraphic {
  id: string;
  label: string;
  image: string;
  downloadUrl: string;
}

export interface CheckboxProduct {
  id: string;
  label: string;
  price?: string;
  image?: string;
}

export interface ProductsData {
  socialGraphics: SocialGraphic[];
  complimentaryProducts: CheckboxProduct[];
  paidProducts: CheckboxProduct[];
}

export function getProducts(): ProductsData {
  return readJSON("products.json") as ProductsData;
}

export function saveProducts(data: ProductsData) {
  writeJSON("products.json", data);
}

// ─── Orders ─────────────────────────────────────────────────

export interface Order {
  id: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  company: string;
  depot: string;
  howHeard: string;
  phone: string;
  email: string;
  requirements: string;
  complimentarySelected: string[];
  paidSelected: string[];
}

export function getOrders(): Order[] {
  return readJSON("orders.json") as Order[];
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  writeJSON("orders.json", orders);
}
