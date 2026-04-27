import hairFriendImg from "@/assets/product-hair-friend.jpg";

export type Category = "medicinal" | "healthcare" | "cosmetics" | "food";
export type Brand = "Dr.Biz" | "Setin" | "Biene Star" | "Dynamin";

export interface Product {
  id: number;
  name: { en: string; fa: string };
  category: Category;
  brand: Brand;
  price: number; // AFN
  shade: string; // hsl tint for placeholder
  image?: string;
  details?: { fa: string; en: string };
}

// Tints by category — green/gold palette
const TINTS = {
  medicinal: ["150 55% 35%", "150 45% 28%", "160 40% 32%", "145 50% 38%", "150 60% 22%"],
  healthcare: ["180 35% 45%", "190 30% 40%", "170 35% 42%", "200 30% 50%", "175 40% 38%"],
  cosmetics: ["42 65% 55%", "30 50% 60%", "35 60% 50%", "25 55% 55%", "45 70% 60%"],
  food: ["35 75% 50%", "28 65% 45%", "40 70% 55%", "20 60% 50%", "45 80% 48%"],
} as const;

const tint = (cat: Category, i: number) => TINTS[cat][i % TINTS[cat].length];

// Generate 100 products: 25 per category, distributed across brands
const seed: Array<{ en: string; fa: string; cat: Category; brand: Brand; price: number }> = [
  // ---------- Medicinal (25) ----------
  { en: "Vitamin C 1000mg Tablets", fa: "قرص ویتامین سی ۱۰۰۰ میلی‌گرم", cat: "medicinal", brand: "Dr.Biz", price: 480 },
  { en: "Multivitamin Complex", fa: "مولتی‌ویتامین کامل", cat: "medicinal", brand: "Dr.Biz", price: 680 },
  { en: "Omega-3 Fish Oil", fa: "روغن ماهی امگا ۳", cat: "medicinal", brand: "Dynamin", price: 920 },
  { en: "Vitamin D3 5000 IU", fa: "ویتامین د۳ ۵۰۰۰ واحد", cat: "medicinal", brand: "Dr.Biz", price: 540 },
  { en: "Calcium + Magnesium", fa: "کلسیم و منیزیم", cat: "medicinal", brand: "Setin", price: 460 },
  { en: "Iron Plus Folic Acid", fa: "آهن و فولیک اسید", cat: "medicinal", brand: "Setin", price: 380 },
  { en: "Zinc Immune Support", fa: "زینک تقویت ایمنی", cat: "medicinal", brand: "Dynamin", price: 420 },
  { en: "Probiotic 50 Billion", fa: "پروبیوتیک ۵۰ میلیارد", cat: "medicinal", brand: "Biene Star", price: 1180 },
  { en: "Coenzyme Q10", fa: "کوآنزیم کیو ۱۰", cat: "medicinal", brand: "Dynamin", price: 1280 },
  { en: "Cough Relief Syrup", fa: "شربت ضد سرفه", cat: "medicinal", brand: "Dr.Biz", price: 280 },
  { en: "Pain Relief Gel", fa: "ژل ضد درد", cat: "medicinal", brand: "Setin", price: 320 },
  { en: "Cold & Flu Tablets", fa: "قرص سرماخوردگی و آنفولانزا", cat: "medicinal", brand: "Dr.Biz", price: 240 },
  { en: "Echinacea Immunity", fa: "اچیناسه تقویت ایمنی", cat: "medicinal", brand: "Biene Star", price: 720 },
  { en: "Ginseng Energy Caps", fa: "کپسول جینسینگ انرژی", cat: "medicinal", brand: "Biene Star", price: 880 },
  { en: "Turmeric Curcumin", fa: "زردچوبه کورکومین", cat: "medicinal", brand: "Dynamin", price: 640 },
  { en: "Melatonin Sleep Aid", fa: "ملاتونین کمک خواب", cat: "medicinal", brand: "Dynamin", price: 580 },
  { en: "Glucosamine Joint Care", fa: "گلوکوزامین مراقبت مفاصل", cat: "medicinal", brand: "Setin", price: 980 },
  { en: "B-Complex Energy", fa: "بی کمپلکس انرژی", cat: "medicinal", brand: "Dr.Biz", price: 520 },
  { en: "Vitamin E 400 IU", fa: "ویتامین ای ۴۰۰", cat: "medicinal", brand: "Dr.Biz", price: 460 },
  { en: "Magnesium Glycinate", fa: "منیزیم گلیسینات", cat: "medicinal", brand: "Dynamin", price: 740 },
  { en: "Royal Jelly Capsules", fa: "کپسول ژل رویال", cat: "medicinal", brand: "Biene Star", price: 1480 },
  { en: "Spirulina Greens", fa: "اسپیرولینا گیاهی", cat: "medicinal", brand: "Biene Star", price: 820 },
  { en: "Antacid Chewables", fa: "قرص جویدنی ضد اسید", cat: "medicinal", brand: "Setin", price: 180 },
  { en: "Allergy Relief Tabs", fa: "قرص ضد حساسیت", cat: "medicinal", brand: "Setin", price: 260 },
  { en: "Children's Vitamin Drops", fa: "قطره ویتامین کودکان", cat: "medicinal", brand: "Dr.Biz", price: 380 },

  // ---------- Healthcare (25) ----------
  { en: "Antibacterial Hand Soap", fa: "صابون ضدباکتری دست", cat: "healthcare", brand: "Setin", price: 140 },
  { en: "Hand Sanitizer Gel 500ml", fa: "ژل ضدعفونی دست ۵۰۰ml", cat: "healthcare", brand: "Setin", price: 180 },
  { en: "Whitening Toothpaste", fa: "خمیردندان سفیدکننده", cat: "healthcare", brand: "Dr.Biz", price: 160 },
  { en: "Sensitive Toothpaste", fa: "خمیردندان دندان حساس", cat: "healthcare", brand: "Dr.Biz", price: 180 },
  { en: "Dental Floss Mint", fa: "نخ دندان نعنایی", cat: "healthcare", brand: "Dr.Biz", price: 90 },
  { en: "Soft Bristle Toothbrush", fa: "مسواک نرم", cat: "healthcare", brand: "Dr.Biz", price: 70 },
  { en: "Mouthwash Fresh Mint", fa: "دهان‌شویه نعناع تازه", cat: "healthcare", brand: "Dr.Biz", price: 220 },
  { en: "Body Wash Eucalyptus", fa: "شامپو بدن اکالیپتوس", cat: "healthcare", brand: "Setin", price: 280 },
  { en: "Shampoo Anti-Dandruff", fa: "شامپو ضد شوره", cat: "healthcare", brand: "Setin", price: 320 },
  { en: "Hair Conditioner Argan", fa: "نرم‌کننده مو آرگان", cat: "healthcare", brand: "Setin", price: 340 },
  { en: "Deodorant Roll-On", fa: "دئودورانت رول", cat: "healthcare", brand: "Setin", price: 180 },
  { en: "Moisturizing Lotion", fa: "لوسیون مرطوب‌کننده", cat: "healthcare", brand: "Setin", price: 240 },
  { en: "Sunscreen SPF 50", fa: "ضد آفتاب SPF 50", cat: "healthcare", brand: "Biene Star", price: 580 },
  { en: "Baby Diapers Pack", fa: "پوشک بچه بسته", cat: "healthcare", brand: "Dynamin", price: 480 },
  { en: "Baby Wet Wipes", fa: "دستمال مرطوب کودک", cat: "healthcare", brand: "Dynamin", price: 120 },
  { en: "Baby Powder Talc-Free", fa: "پودر بچه بدون تالک", cat: "healthcare", brand: "Dynamin", price: 220 },
  { en: "Adhesive Bandages", fa: "چسب زخم", cat: "healthcare", brand: "Dr.Biz", price: 80 },
  { en: "Antiseptic Solution", fa: "محلول ضدعفونی", cat: "healthcare", brand: "Dr.Biz", price: 140 },
  { en: "Digital Thermometer", fa: "تب‌سنج دیجیتال", cat: "healthcare", brand: "Dynamin", price: 480 },
  { en: "Blood Pressure Monitor", fa: "فشارسنج دیجیتال", cat: "healthcare", brand: "Dynamin", price: 2480 },
  { en: "Face Mask Pack 50", fa: "ماسک صورت بسته ۵۰", cat: "healthcare", brand: "Setin", price: 380 },
  { en: "Cotton Swabs 200", fa: "گوش‌پاک‌کن ۲۰۰", cat: "healthcare", brand: "Setin", price: 90 },
  { en: "Feminine Care Pads", fa: "پد بهداشتی بانوان", cat: "healthcare", brand: "Setin", price: 180 },
  { en: "Lip Balm Honey", fa: "بالم لب عسل", cat: "healthcare", brand: "Biene Star", price: 120 },
  { en: "Nasal Saline Spray", fa: "اسپری بینی سالین", cat: "healthcare", brand: "Dr.Biz", price: 220 },

  // ---------- Cosmetics (25) ----------
  { en: "Hyaluronic Acid Serum", fa: "سرم هیالورونیک اسید", cat: "cosmetics", brand: "Setin", price: 980 },
  { en: "Vitamin C Brightening Serum", fa: "سرم روشن‌کننده ویتامین سی", cat: "cosmetics", brand: "Setin", price: 1180 },
  { en: "Retinol Night Cream", fa: "کرم شب رتینول", cat: "cosmetics", brand: "Setin", price: 1380 },
  { en: "Collagen Day Cream", fa: "کرم روز کلاژن", cat: "cosmetics", brand: "Setin", price: 980 },
  { en: "Eye Contour Cream", fa: "کرم دور چشم", cat: "cosmetics", brand: "Setin", price: 880 },
  { en: "Honey Glow Face Mask", fa: "ماسک صورت عسل", cat: "cosmetics", brand: "Biene Star", price: 480 },
  { en: "Royal Jelly Anti-Age", fa: "ضد پیری ژل رویال", cat: "cosmetics", brand: "Biene Star", price: 1680 },
  { en: "Propolis Healing Cream", fa: "کرم ترمیم‌کننده بره‌موم", cat: "cosmetics", brand: "Biene Star", price: 780 },
  { en: "Honey Lip Treatment", fa: "بالم درمانی لب عسل", cat: "cosmetics", brand: "Biene Star", price: 240 },
  { en: "Gentle Foam Cleanser", fa: "شوینده فومی ملایم", cat: "cosmetics", brand: "Setin", price: 540 },
  { en: "Micellar Cleansing Water", fa: "آب پاک‌کننده میسلار", cat: "cosmetics", brand: "Setin", price: 460 },
  { en: "Rose Water Toner", fa: "تونر گلاب", cat: "cosmetics", brand: "Biene Star", price: 380 },
  { en: "Niacinamide 10% Serum", fa: "سرم نیاسینامید ۱۰٪", cat: "cosmetics", brand: "Setin", price: 720 },
  { en: "Argan Hair Oil", fa: "روغن مو آرگان", cat: "cosmetics", brand: "Biene Star", price: 580 },
  { en: "Body Butter Shea", fa: "کره بدن شیا", cat: "cosmetics", brand: "Setin", price: 480 },
  { en: "Hand Cream Almond", fa: "کرم دست بادام", cat: "cosmetics", brand: "Setin", price: 220 },
  { en: "Foot Care Cream", fa: "کرم مراقبت پا", cat: "cosmetics", brand: "Setin", price: 280 },
  { en: "Anti-Acne Spot Gel", fa: "ژل موضعی ضد جوش", cat: "cosmetics", brand: "Setin", price: 380 },
  { en: "Clay Detox Mask", fa: "ماسک پاکسازی رس", cat: "cosmetics", brand: "Setin", price: 520 },
  { en: "Exfoliating Scrub", fa: "اسکراب لایه‌بردار", cat: "cosmetics", brand: "Setin", price: 460 },
  { en: "BB Cream Light SPF", fa: "بی‌بی کرم لایت SPF", cat: "cosmetics", brand: "Setin", price: 680 },
  { en: "Tinted Moisturizer", fa: "مرطوب‌کننده رنگی", cat: "cosmetics", brand: "Setin", price: 620 },
  { en: "Hair Mask Keratin", fa: "ماسک مو کراتین", cat: "cosmetics", brand: "Setin", price: 580 },
  { en: "Honey Body Wash", fa: "شامپو بدن عسل", cat: "cosmetics", brand: "Biene Star", price: 320 },
  { en: "Beeswax Lip Balm Trio", fa: "تریو بالم لب موم زنبور", cat: "cosmetics", brand: "Biene Star", price: 360 },

  // ---------- Food & Nutrition (25) ----------
  { en: "Pure Mountain Honey 1kg", fa: "عسل خالص کوهی ۱ کیلو", cat: "food", brand: "Biene Star", price: 880 },
  { en: "Sidr Honey Premium 500g", fa: "عسل سدر ممتاز ۵۰۰g", cat: "food", brand: "Biene Star", price: 1280 },
  { en: "Wildflower Honey 700g", fa: "عسل گل وحشی ۷۰۰g", cat: "food", brand: "Biene Star", price: 720 },
  { en: "Bee Pollen Granules", fa: "گرده گل زنبور", cat: "food", brand: "Biene Star", price: 980 },
  { en: "Royal Jelly Fresh 30g", fa: "ژل رویال تازه ۳۰g", cat: "food", brand: "Biene Star", price: 1680 },
  { en: "Propolis Tincture", fa: "تنتور بره‌موم", cat: "food", brand: "Biene Star", price: 580 },
  { en: "Whey Protein Vanilla 2kg", fa: "پودر پروتئین وانیلی ۲ کیلو", cat: "food", brand: "Dynamin", price: 2480 },
  { en: "Whey Protein Chocolate 2kg", fa: "پودر پروتئین شکلاتی ۲ کیلو", cat: "food", brand: "Dynamin", price: 2480 },
  { en: "Plant Protein 1kg", fa: "پروتئین گیاهی ۱ کیلو", cat: "food", brand: "Dynamin", price: 1880 },
  { en: "BCAA Energy Powder", fa: "پودر انرژی BCAA", cat: "food", brand: "Dynamin", price: 1280 },
  { en: "Mass Gainer 3kg", fa: "گینر افزایش وزن ۳ کیلو", cat: "food", brand: "Dynamin", price: 2980 },
  { en: "Almonds Roasted 500g", fa: "بادام بوداده ۵۰۰g", cat: "food", brand: "Setin", price: 680 },
  { en: "Mixed Nuts Premium 400g", fa: "آجیل مخلوط ممتاز ۴۰۰g", cat: "food", brand: "Setin", price: 880 },
  { en: "Walnut Halves 300g", fa: "مغز گردو ۳۰۰g", cat: "food", brand: "Setin", price: 720 },
  { en: "Pistachios Salted 250g", fa: "پسته نمکی ۲۵۰g", cat: "food", brand: "Setin", price: 980 },
  { en: "Dried Apricots 400g", fa: "زردآلو خشک ۴۰۰g", cat: "food", brand: "Setin", price: 380 },
  { en: "Dates Mazafati 1kg", fa: "خرما مضافتی ۱ کیلو", cat: "food", brand: "Setin", price: 480 },
  { en: "Saffron Premium 1g", fa: "زعفران ممتاز ۱ گرم", cat: "food", brand: "Setin", price: 980 },
  { en: "Green Tea Loose 200g", fa: "چای سبز ۲۰۰g", cat: "food", brand: "Dr.Biz", price: 280 },
  { en: "Herbal Tea Wellness 50 bags", fa: "چای گیاهی سلامت ۵۰ تایی", cat: "food", brand: "Dr.Biz", price: 320 },
  { en: "Chamomile Tea 50 bags", fa: "چای بابونه ۵۰ تایی", cat: "food", brand: "Dr.Biz", price: 240 },
  { en: "Olive Oil Extra Virgin 1L", fa: "روغن زیتون فوق بکر ۱ لیتر", cat: "food", brand: "Setin", price: 980 },
  { en: "Coconut Oil Cold Pressed", fa: "روغن نارگیل تصفیه نشده", cat: "food", brand: "Dr.Biz", price: 580 },
  { en: "Chia Seeds 250g", fa: "دانه چیا ۲۵۰g", cat: "food", brand: "Dynamin", price: 380 },
  { en: "Flax Seeds Ground 300g", fa: "دانه کتان آسیاب شده ۳۰۰g", cat: "food", brand: "Dynamin", price: 280 },
];

const hairFriendDetailsFa = `🌿 معرفی محصول

تونیک هیرفرند داکتر بیز یک محصول مراقبتی تخصصی برای مو و پوست سر است که برای تقویت ریشه مو، کاهش ریزش مو و کمک به رشد طبیعی موها ساخته شده است.

این تونیک با ترکیبات گیاهی و فرمول پیشرفته، به سلامت پوست سر کمک کرده و شرایط بهتر برای رشد مو فراهم می‌سازد.

✨ ویژگی‌ها و فواید
✔ کمک به کاهش ریزش مو
✔ تقویت ریشه و فولیکول مو
✔ کمک به رشد دوباره موهای ضعیف
✔ بهبود گردش خون در پوست سر
✔ کاهش شوره و خارش سر
✔ افزایش ضخامت و استحکام مو

🌱 طرز استفاده
• روی پوست سر تمیز استفاده شود
• مقدار مناسب روی ریشه مو اسپری گردد
• به آرامی ماساژ داده شود
• نیاز به شستشو ندارد
• روزانه یا طبق هدایت استفاده شود

⏱️ زمان مشاهده نتیجه
• هفته‌های اول: کاهش خارش و چربی
• ۲ تا ۴ هفته: کاهش ریزش مو
• ۱ تا ۳ ماه: تقویت و رشد موهای جدید

👨‍⚕️ مناسب برای چه کسانی است؟
✔ افرادی که ریزش مو دارند
✔ موهای ضعیف و نازک
✔ کسانی که شوره یا خارش سر دارند
✔ قابل استفاده برای خانم‌ها و آقایان

⚠️ نکات مهم
• نتیجه به مرور زمان دیده می‌شود
• استفاده منظم بسیار مهم است
• همراه با تغذیه سالم نتیجه بهتر می‌دهد`;

const hairFriendDetailsEn = `🌿 Product Introduction

Dr.Biz Hair Friend Tonic is a specialized hair and scalp care product designed to strengthen hair roots, reduce hair fall, and support natural hair growth.

With a herbal-based advanced formula, it improves scalp health and creates better conditions for hair growth.

✨ Features & Benefits
✔ Helps reduce hair fall
✔ Strengthens hair roots and follicles
✔ Supports regrowth of weak hair
✔ Improves scalp blood circulation
✔ Reduces dandruff and itching
✔ Increases hair thickness and strength

🌱 How to Use
• Apply on a clean scalp
• Spray a suitable amount on hair roots
• Massage gently
• No rinsing required
• Use daily or as directed

⏱️ Expected Results
• First weeks: less itching and oiliness
• 2–4 weeks: reduced hair fall
• 1–3 months: stronger growth of new hair

👨‍⚕️ Who Is It For?
✔ People experiencing hair loss
✔ Weak and thin hair
✔ Those with dandruff or scalp itching
✔ Suitable for both women and men

⚠️ Important Notes
• Results appear gradually
• Regular use is essential
• Healthy nutrition enhances results`;

export const products: Product[] = [
  ...seed.map((s, i) => ({
    id: i + 1,
    name: { en: s.en, fa: s.fa },
    category: s.cat,
    brand: s.brand,
    price: s.price,
    shade: tint(s.cat, i),
  })),
  {
    id: seed.length + 1,
    name: { en: "Hair Friend Hair Tonic 300ml", fa: "تونیک مو هیرفرند ۳۰۰ml" },
    category: "healthcare",
    brand: "Dr.Biz",
    price: 850,
    shade: "150 45% 45%",
    image: hairFriendImg,
    details: { fa: hairFriendDetailsFa, en: hairFriendDetailsEn },
  },
];
