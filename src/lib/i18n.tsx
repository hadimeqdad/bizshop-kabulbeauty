import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "fa" | "en";
type Dict = Record<string, { fa: string; en: string }>;

const dict: Dict = {
  brand: { fa: "بیزشاپ", en: "BizShop" },
  tagline: { fa: "سلامتی، اعتماد، کیفیت", en: "Health. Trust. Quality." },
  nav_home: { fa: "خانه", en: "Home" },
  nav_shop: { fa: "فروشگاه", en: "Shop" },
  nav_about: { fa: "درباره ما", en: "About" },
  nav_contact: { fa: "تماس", en: "Contact" },
  hero_eyebrow: { fa: "سلامت و تندرستی • کابل", en: "Health & Wellness • Kabul" },
  hero_title: { fa: "سلامتی شما،\nاولویت ماست", en: "Your Wellness,\nOur Priority" },
  hero_sub: { fa: "محصولات اصل درمانی، بهداشتی، آرایشی و غذایی از برندهای دکتربیز، ستین، بیه‌نه‌ستار و داینامین.", en: "Authentic medicinal, healthcare, cosmetic and nutritional products from Dr.Biz, Setin, Biene Star and Dynamin." },
  shop_now: { fa: "خرید کنید", en: "Shop Now" },
  explore: { fa: "کشف کنید", en: "Explore" },
  featured: { fa: "محصولات منتخب", en: "Featured Products" },
  featured_sub: { fa: "پرفروش‌ترین‌های این هفته", en: "This week's bestsellers" },
  shop_by_cat: { fa: "خرید بر اساس دسته", en: "Shop by Category" },
  add_to_cart: { fa: "افزودن به سبد", en: "Add to Cart" },
  added: { fa: "اضافه شد", en: "Added" },
  cart: { fa: "سبد خرید", en: "Cart" },
  cart_empty: { fa: "سبد خرید شما خالی است", en: "Your cart is empty" },
  total: { fa: "مجموع", en: "Total" },
  checkout_wa: { fa: "تکمیل سفارش از واتساپ", en: "Checkout via WhatsApp" },
  remove: { fa: "حذف", en: "Remove" },
  all: { fa: "همه", en: "All" },
  cat_medicinal: { fa: "درمانی", en: "Medicinal" },
  cat_healthcare: { fa: "بهداشتی", en: "Healthcare" },
  cat_cosmetics: { fa: "آرایشی", en: "Cosmetics" },
  cat_food: { fa: "مواد غذایی", en: "Food & Nutrition" },
  brands: { fa: "برندها", en: "Brands" },
  search: { fa: "جستجوی محصول...", en: "Search products..." },
  no_results: { fa: "محصولی یافت نشد", en: "No products found" },
  promo_title: { fa: "تخفیف ویژه ست‌های سلامتی", en: "Wellness Bundle Special" },
  promo_sub: { fa: "۲۰٪ تخفیف روی ست‌های مولتی‌ویتامین، پروتئین و عسل ارگانیک. تا پایان ماه.", en: "20% off vitamin, protein and organic honey bundles. Limited time only." },
  shop_title: { fa: "فروشگاه", en: "Shop" },
  shop_sub: { fa: "۱۰۰ محصول از برندهای معتبر سلامت", en: "100 products from trusted health brands" },
  about_title: { fa: "درباره بیزشاپ", en: "About BizShop" },
  about_p1: { fa: "بیزشاپ در قلب کابل با یک ماموریت روشن متولد شد: رساندن محصولات اصل سلامت، بهداشت و تغذیه به دست خانواده‌های افغان. ما با برندهای معتبری چون دکتربیز، ستین، بیه‌نه‌ستار و داینامین همکاری مستقیم داریم.", en: "BizShop was founded in the heart of Kabul with a clear mission: bringing authentic health, hygiene and nutrition products to Afghan families. We partner directly with trusted brands like Dr.Biz, Setin, Biene Star and Dynamin." },
  about_p2: { fa: "هر محصول قبل از رسیدن به دست شما به دقت بررسی می‌شود. کیفیت، اصالت و خدمات صادقانه، پایه‌های ماست.", en: "Every product is carefully verified before reaching your hands. Quality, authenticity and honest service are our foundations." },
  contact_title: { fa: "با ما در تماس باشید", en: "Get in Touch" },
  contact_sub: { fa: "آماده پاسخ‌گویی به سوالات شما هستیم", en: "We're here to answer your questions" },
  visit: { fa: "از ما دیدن کنید", en: "Visit Us" },
  address: { fa: "G45Q+M52، کابل، ۱۰۰۳۱۱", en: "G45Q+M52, Kabul 100311" },
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
  subcategories: { fa: "زیرشاخه‌ها", en: "Subcategories" },
  browse_sub: { fa: "یک زیرشاخه را انتخاب کنید", en: "Choose a subcategory" },
  all_products: { fa: "همه محصولات", en: "All products" },
  qty: { fa: "تعداد", en: "Qty" },
  afn: { fa: "افغانی", en: "AFN" },
  trust_authentic: { fa: "محصولات ۱۰۰٪ اصل", en: "100% Authentic" },
  trust_authentic_sub: { fa: "مستقیم از برندهای معتبر", en: "Direct from trusted brands" },
  trust_delivery: { fa: "تحویل سریع کابل", en: "Fast Kabul Delivery" },
  trust_delivery_sub: { fa: "تحویل در همان روز", en: "Same-day in city" },
  trust_support: { fa: "پشتیبانی واتساپ", en: "WhatsApp Support" },
  trust_support_sub: { fa: "هر روز هفته پاسخگو", en: "7 days a week" },
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
