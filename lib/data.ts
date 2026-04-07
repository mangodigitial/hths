import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from "fs";
import { join } from "path";

// On Vercel, the project directory is read-only. We copy seed data to /tmp on
// first access and read/write from there. Locally, we use the project's data/ dir.
const SOURCE_DIR = join(process.cwd(), "data");
const isVercel = !!process.env.VERCEL;
const DATA_DIR = isVercel ? "/tmp/data" : SOURCE_DIR;

function ensureDir() {
  if (isVercel && !existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
    // Seed from bundled data
    for (const file of ["products.json", "orders.json"]) {
      const src = join(SOURCE_DIR, file);
      if (existsSync(src)) copyFileSync(src, join(DATA_DIR, file));
    }
  }
}

function readJSON(file: string) {
  ensureDir();
  const path = join(DATA_DIR, file);
  if (!existsSync(path)) return file === "orders.json" ? [] : {};
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
