export type Category = "lips" | "eyes" | "face" | "skin" | "fragrance";

export interface Product {
  id: number;
  name: { en: string; fa: string };
  category: Category;
  price: number; // AFN
  shade: string; // tailwind-friendly hsl color for placeholder
}

// Helper for shade colors that hint at the product
const c = (h: string) => h;

export const products: Product[] = [
  // Lips (10)
  { id: 1, name: { en: "Velvet Burgundy Lipstick", fa: "رژلب مخملی بوردو" }, category: "lips", price: 850, shade: c("345 60% 28%") },
  { id: 2, name: { en: "Rose Petal Matte", fa: "رژلب مات رز پتل" }, category: "lips", price: 780, shade: c("350 55% 55%") },
  { id: 3, name: { en: "Nude Silk Lipstick", fa: "رژلب نود سیلک" }, category: "lips", price: 820, shade: c("18 45% 65%") },
  { id: 4, name: { en: "Crimson Liquid Lip", fa: "رژلب مایع کرمزی" }, category: "lips", price: 920, shade: c("355 75% 42%") },
  { id: 5, name: { en: "Berry Glow Tint", fa: "تینت لب بری گلو" }, category: "lips", price: 640, shade: c("330 60% 45%") },
  { id: 6, name: { en: "Coral Bloom Gloss", fa: "گلاس کورال بلوم" }, category: "lips", price: 580, shade: c("12 80% 65%") },
  { id: 7, name: { en: "Plum Velvet Stick", fa: "رژلب مخملی آلویی" }, category: "lips", price: 880, shade: c("310 40% 35%") },
  { id: 8, name: { en: "Pink Champagne Lip", fa: "رژلب صورتی شامپاین" }, category: "lips", price: 760, shade: c("345 50% 75%") },
  { id: 9, name: { en: "Cocoa Nude Liner", fa: "خط لب نود کاکائو" }, category: "lips", price: 420, shade: c("20 35% 40%") },
  { id: 10, name: { en: "Wine Matte Couture", fa: "رژلب مات شراب کوتور" }, category: "lips", price: 990, shade: c("350 65% 25%") },

  // Eyes (8)
  { id: 11, name: { en: "Rose Gold Palette", fa: "پالت سایه رز گلد" }, category: "eyes", price: 1850, shade: c("18 56% 70%") },
  { id: 12, name: { en: "Burgundy Smoke Quad", fa: "پالت دودی بوردو" }, category: "eyes", price: 1450, shade: c("345 40% 35%") },
  { id: 13, name: { en: "Black Velvet Mascara", fa: "ریمل مخملی سیاه" }, category: "eyes", price: 690, shade: c("0 0% 8%") },
  { id: 14, name: { en: "Liquid Liner Noir", fa: "خط چشم مایع نوآر" }, category: "eyes", price: 540, shade: c("0 0% 12%") },
  { id: 15, name: { en: "Brow Sculpt Pencil", fa: "مداد ابرو اسکالپت" }, category: "eyes", price: 480, shade: c("25 35% 25%") },
  { id: 16, name: { en: "Shimmer Eye Topper", fa: "هایلایتر سایه شیمر" }, category: "eyes", price: 720, shade: c("38 70% 70%") },
  { id: 17, name: { en: "Kohl Eye Definer", fa: "خط چشم کحل" }, category: "eyes", price: 380, shade: c("0 0% 5%") },
  { id: 18, name: { en: "Sunset Eyeshadow Pan", fa: "سایه تک رنگ سانست" }, category: "eyes", price: 520, shade: c("18 70% 55%") },

  // Face (10)
  { id: 19, name: { en: "Silk Foundation Ivory", fa: "کرم پودر سیلک ایوری" }, category: "face", price: 1290, shade: c("30 40% 80%") },
  { id: 20, name: { en: "Silk Foundation Beige", fa: "کرم پودر سیلک بژ" }, category: "face", price: 1290, shade: c("28 38% 70%") },
  { id: 21, name: { en: "Silk Foundation Caramel", fa: "کرم پودر سیلک کارامل" }, category: "face", price: 1290, shade: c("25 40% 55%") },
  { id: 22, name: { en: "Rose Glow Blush", fa: "رژگونه رز گلو" }, category: "face", price: 720, shade: c("345 55% 65%") },
  { id: 23, name: { en: "Champagne Highlighter", fa: "هایلایتر شامپاین" }, category: "face", price: 880, shade: c("38 65% 75%") },
  { id: 24, name: { en: "Sculpt Contour Stick", fa: "کانتور استیک" }, category: "face", price: 690, shade: c("22 30% 45%") },
  { id: 25, name: { en: "Setting Powder Translucent", fa: "پودر تثبیت ترانسلوسنت" }, category: "face", price: 950, shade: c("30 25% 88%") },
  { id: 26, name: { en: "Dewy Setting Spray", fa: "اسپری تثبیت دیوی" }, category: "face", price: 580, shade: c("18 30% 90%") },
  { id: 27, name: { en: "Concealer Crème", fa: "کانسیلر کرم" }, category: "face", price: 640, shade: c("28 45% 75%") },
  { id: 28, name: { en: "Bronzer Sun Kissed", fa: "برنزر سان کیسد" }, category: "face", price: 820, shade: c("22 50% 50%") },

  // Skin (7)
  { id: 29, name: { en: "Rose Hydra Cream", fa: "کرم آبرسان رز" }, category: "skin", price: 1480, shade: c("345 30% 85%") },
  { id: 30, name: { en: "Vitamin C Serum", fa: "سرم ویتامین سی" }, category: "skin", price: 1280, shade: c("38 80% 70%") },
  { id: 31, name: { en: "Night Renewal Oil", fa: "روغن ترمیم شب" }, category: "skin", price: 1620, shade: c("32 60% 55%") },
  { id: 32, name: { en: "Gentle Cream Cleanser", fa: "شوینده ملایم کرمی" }, category: "skin", price: 740, shade: c("36 30% 92%") },
  { id: 33, name: { en: "Rose Toner Mist", fa: "تونر اسپری رز" }, category: "skin", price: 680, shade: c("345 40% 88%") },
  { id: 34, name: { en: "Eye Renewal Balm", fa: "بالم دور چشم" }, category: "skin", price: 1180, shade: c("30 35% 80%") },
  { id: 35, name: { en: "SPF 50 Daily Veil", fa: "ضد آفتاب روزانه" }, category: "skin", price: 980, shade: c("36 50% 88%") },

  // Fragrance (5)
  { id: 36, name: { en: "Oud Rose Eau de Parfum", fa: "ادو پارفوم عود رز" }, category: "fragrance", price: 2480, shade: c("345 50% 30%") },
  { id: 37, name: { en: "Kabul Bloom Perfume", fa: "عطر کابل بلوم" }, category: "fragrance", price: 2180, shade: c("345 45% 60%") },
  { id: 38, name: { en: "Velvet Musk EDP", fa: "ادو پارفوم ولوت ماسک" }, category: "fragrance", price: 2680, shade: c("25 35% 35%") },
  { id: 39, name: { en: "Saffron Amber Mist", fa: "اسپری سافرون امبر" }, category: "fragrance", price: 1480, shade: c("32 70% 50%") },
  { id: 40, name: { en: "Jasmine Noir Parfum", fa: "پارفوم یاس نوآر" }, category: "fragrance", price: 2280, shade: c("36 30% 90%") },
];
