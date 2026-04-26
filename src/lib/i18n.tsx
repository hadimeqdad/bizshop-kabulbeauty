import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "fa" | "en";
type Dict = Record<string, { fa: string; en: string }>;

const dict: Dict = {
  brand: { fa: "بیزشاپ", en: "BizShop" },
  tagline: { fa: "زیبایی شما، امضای ماست", en: "Your Beauty, Our Signature" },
  nav_home: { fa: "خانه", en: "Home" },
  nav_shop: { fa: "فروشگاه", en: "Shop" },
  nav_about: { fa: "درباره ما", en: "About" },
  nav_contact: { fa: "تماس", en: "Contact" },
  hero_eyebrow: { fa: "کالکشن جدید • کابل", en: "New Collection • Kabul" },
  hero_title: { fa: "زیبایی لوکس،\nبرای هر زن افغان", en: "Luxury Beauty,\nFor Every Woman" },
  hero_sub: { fa: "آرایش و مراقبت پوست با کیفیت جهانی، انتخاب شده با عشق برای شما.", en: "World-class makeup & skincare, curated with love for you." },
  shop_now: { fa: "خرید کنید", en: "Shop Now" },
  explore: { fa: "کشف کنید", en: "Explore" },
  featured: { fa: "محصولات منتخب", en: "Featured Products" },
  featured_sub: { fa: "محبوب‌ترین‌های این فصل", en: "This season's bestsellers" },
  shop_by_cat: { fa: "خرید بر اساس دسته", en: "Shop by Category" },
  add_to_cart: { fa: "افزودن به سبد", en: "Add to Cart" },
  added: { fa: "اضافه شد", en: "Added" },
  cart: { fa: "سبد خرید", en: "Cart" },
  cart_empty: { fa: "سبد خرید شما خالی است", en: "Your cart is empty" },
  total: { fa: "مجموع", en: "Total" },
  checkout_wa: { fa: "تکمیل خرید از واتساپ", en: "Checkout via WhatsApp" },
  remove: { fa: "حذف", en: "Remove" },
  all: { fa: "همه", en: "All" },
  cat_lips: { fa: "لب", en: "Lips" },
  cat_eyes: { fa: "چشم", en: "Eyes" },
  cat_face: { fa: "صورت", en: "Face" },
  cat_skin: { fa: "مراقبت پوست", en: "Skincare" },
  cat_fragrance: { fa: "عطر", en: "Fragrance" },
  promo_title: { fa: "هدیه‌ای از جنس زیبایی", en: "A Gift of Beauty" },
  promo_sub: { fa: "ست‌های هدیه ویژه با ۲۰٪ تخفیف ویژه مشتریان وفادار بیزشاپ.", en: "Curated gift sets, 20% off for our loyal BizShop family." },
  shop_title: { fa: "فروشگاه", en: "The Shop" },
  shop_sub: { fa: "۴۰ محصول دست‌چین شده از برند بیزشاپ", en: "40 hand-picked pieces from the BizShop brand" },
  about_title: { fa: "داستان بیزشاپ", en: "Our Story" },
  about_p1: { fa: "بیزشاپ در قلب کابل متولد شد، با یک آرزو ساده: آوردن زیبایی لوکس و قابل دسترس برای زنان افغان. ما باور داریم که هر زن لایق بهترین‌هاست.", en: "BizShop was born in the heart of Kabul with one simple dream: bringing accessible luxury beauty to Afghan women. We believe every woman deserves the best." },
  about_p2: { fa: "ما محصولات خود را با دقت و وسواس انتخاب می‌کنیم و مستقیماً به دستان شما می‌رسانیم. کیفیت، اعتماد و زیبایی، سه ستون اصلی ماست.", en: "We curate every product with obsessive care and deliver them straight to your hands. Quality, trust, and beauty are our three pillars." },
  contact_title: { fa: "با ما در تماس باشید", en: "Get in Touch" },
  contact_sub: { fa: "ما همیشه آماده شنیدن از شما هستیم", en: "We'd love to hear from you" },
  visit: { fa: "از ما دیدن کنید", en: "Visit Us" },
  address: { fa: "G3F6+X5J، کابل، ۱۰۰۵۱۳", en: "G3F6+X5J, Kabul 100513" },
  whatsapp: { fa: "واتساپ", en: "WhatsApp" },
  send_msg: { fa: "ارسال پیام", en: "Send Message" },
  name: { fa: "نام", en: "Name" },
  email: { fa: "ایمیل", en: "Email" },
  message: { fa: "پیام", en: "Message" },
  send: { fa: "ارسال", en: "Send" },
  msg_sent: { fa: "پیام شما ارسال شد", en: "Your message was sent" },
  follow: { fa: "ما را دنبال کنید", en: "Follow Us" },
  rights: { fa: "تمامی حقوق محفوظ است", en: "All rights reserved" },
  back_home: { fa: "بازگشت به خانه", en: "Back to Home" },
  view_all: { fa: "مشاهده همه", en: "View All" },
  filter: { fa: "فیلتر", en: "Filter" },
  qty: { fa: "تعداد", en: "Qty" },
  afn: { fa: "افغانی", en: "AFN" },
};

interface LangCtx {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: (key: keyof typeof dict) => string;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("bizshop-lang") as Lang) || "fa");
  const dir = lang === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("bizshop-lang", lang);
  }, [lang, dir]);

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? key;
  const toggle = () => setLang(lang === "fa" ? "en" : "fa");

  return <Ctx.Provider value={{ lang, dir, t, setLang, toggle }}>{children}</Ctx.Provider>;
};

export const useLang = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used within LanguageProvider");
  return c;
};

export const tx = (en: string, fa: string, lang: Lang) => (lang === "fa" ? fa : en);
