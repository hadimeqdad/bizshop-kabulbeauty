import hairFriendImg from "@/assets/product-hair-friend.jpg";
import luxuryCoinImg from "@/assets/product-luxury-coin-serum.jpg";
import fumariaTeaImg from "@/assets/product-fumaria-tea.jpg";
import supremeCoffeeImg from "@/assets/product-supreme-coffee.jpg";
import claySoapImg from "@/assets/product-clay-soap.jpg";
import stressReliefImg from "@/assets/product-stress-relief.jpg";
import coffeeLatteImg from "@/assets/product-coffee-latte.jpg";
import masalaCoffeeImg from "@/assets/product-masala-coffee.jpg";
import hotChocolateImg from "@/assets/product-hot-chocolate.jpg";
import coffeeMochaImg from "@/assets/product-coffee-mocha.jpg";

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
  {
    id: seed.length + 2,
    name: { en: "Luxury Coin All-in-One Skin Serum", fa: "سیروم مغذی لاکچری کوین" },
    category: "cosmetics",
    brand: "Dr.Biz",
    price: 1900,
    shade: "210 70% 50%",
    image: luxuryCoinImg,
    details: {
      fa: `🌿 معرفی محصول

سیروم مغذی لاکچری کوین دکتر بیز یک محصول تخصصی مراقبت از پوست است که برای آبرسانی عمیق، تغذیه پوست و افزایش شفافیت و درخشندگی پوست ساخته شده است.

این سیروم با ترکیبات مغذی و فرمول پیشرفته، به بازسازی پوست کمک کرده و ظاهر پوست را جوان‌تر و سالم‌تر نشان می‌دهد.

✨ ویژگی‌ها و مزایا
✔ آبرسانی عمیق پوست
✔ کمک به روشن شدن و شفافیت پوست
✔ تغذیه کامل سلول‌های پوستی
✔ کاهش خشکی و زبری پوست
✔ کمک به جوان‌سازی پوست
✔ ایجاد نرمی و لطافت طبیعی

🌸 مناسب برای چه کسانی است؟
✔ پوست خشک و کم‌آب
✔ پوست خسته و کدر
✔ افرادی که دنبال پوست شاداب‌تر هستند
✔ مناسب برای خانم‌ها و آقایان

🌱 طرز استفاده
• روی پوست تمیز استفاده شود
• چند قطره روی صورت یا پوست بزنید
• به آرامی ماساژ داده شود
• روزانه ۱ تا ۲ بار استفاده گردد

⏱️ زمان مشاهده نتیجه
• چند روز اول: نرمی و آبرسانی محسوس
• ۲ تا ۳ هفته: روشن‌تر شدن پوست
• استفاده مداوم: بهبود بافت و شادابی پوست

⚠️ نکات مهم
• استفاده منظم برای نتیجه بهتر ضروری است
• روی پوست تمیز استفاده شود
• در کنار مراقبت روزانه اثرگذاری بیشتر دارد

💎 جمع‌بندی
سیروم لاکچری کوین دکتر بیز یک انتخاب مناسب برای کسانی است که می‌خواهند پوستی نرم، شفاف، جوان و سالم داشته باشند.`,
      en: `🌿 Product Introduction

Dr.Biz Luxury Coin Nourishing Serum is a specialized skincare product designed for deep hydration, skin nourishment, and enhanced clarity and radiance.

With a nutrient-rich advanced formula, it helps regenerate the skin and gives it a younger, healthier appearance.

✨ Features & Benefits
✔ Deep skin hydration
✔ Helps brighten and clarify skin
✔ Full nourishment of skin cells
✔ Reduces dryness and roughness
✔ Supports skin rejuvenation
✔ Creates natural softness and smoothness

🌸 Who Is It For?
✔ Dry and dehydrated skin
✔ Tired and dull skin
✔ Anyone seeking fresher, more vibrant skin
✔ Suitable for both women and men

🌱 How to Use
• Apply on clean skin
• Place a few drops on the face
• Massage gently
• Use 1–2 times daily

⏱️ Expected Results
• First days: noticeable softness and hydration
• 2–3 weeks: brighter skin tone
• Continued use: improved texture and radiance

⚠️ Important Notes
• Regular use is essential for best results
• Apply on clean skin
• Works best alongside daily skincare routine

💎 Summary
Dr.Biz Luxury Coin Serum is an ideal choice for those who want soft, clear, youthful, and healthy skin.`,
    },
  },
  {
    id: seed.length + 3,
    name: { en: "Fumaria Blood Purifier Herbal Tea", fa: "دمنوش شاهتره مصفی خون" },
    category: "food",
    brand: "Dr.Biz",
    price: 1400,
    shade: "45 70% 50%",
    image: fumariaTeaImg,
    details: {
      fa: `🌱 معرفی محصول

دمنوش شاهتره مصفی خون دکتر بیز یک نوشیدنی گیاهی طبیعی است که برای پاکسازی بدن و کمک به تصفیه خون طراحی شده است.

این دمنوش با استفاده از گیاه شاهتره، به بهبود عملکرد کبد و سیستم داخلی بدن کمک کرده و باعث احساس سبکی و سلامت بیشتر می‌شود.

✨ ویژگی‌ها و مزایا
✔ کمک به تصفیه و پاکسازی خون
✔ حمایت از عملکرد سالم کبد
✔ کمک به کاهش جوش و مشکلات پوستی ناشی از خون کثیف
✔ کمک به بهبود هضم و گوارش
✔ کمک به احساس سبکی بدن
✔ کاملاً گیاهی و طبیعی

🌿 مناسب برای چه کسانی است؟
✔ افرادی که دچار جوش و لک پوستی هستند
✔ کسانی که احساس خستگی و سنگینی بدن دارند
✔ افرادی که به پاکسازی بدن اهمیت می‌دهند
✔ مناسب برای استفاده روزانه

☕ طرز استفاده
• یک ساشه دمنوش را در آب جوش قرار دهید
• ۵ تا ۱۰ دقیقه صبر کنید
• روزانه ۱ تا ۲ بار مصرف شود
• بهتر است بعد از غذا یا طبق توصیه استفاده گردد

⏱️ زمان مشاهده نتیجه
• چند روز اول: احساس سبک شدن بدن
• ۲ تا ۳ هفته: بهبود وضعیت پوست و گوارش
• استفاده منظم: کمک به پاکسازی بهتر بدن

⚠️ نکات مهم
• مصرف منظم برای نتیجه بهتر ضروری است
• در کنار تغذیه سالم اثرگذاری بیشتر دارد
• برای افراد خاص (باردار/بیماری خاص) با مشوره استفاده شود

💚 جمع‌بندی
دمنوش شاهتره دکتر بیز یک انتخاب طبیعی و مناسب برای کسانی است که می‌خواهند بدن سالم‌تر، خون پاک‌تر و پوست شفاف‌تر داشته باشند.`,
      en: `🌱 Product Introduction

Dr.Biz Fumaria Blood Purifier Herbal Tea is a natural herbal drink designed for body detox and helping purify the blood.

Made with Fumaria (Shahtareh) herb, it supports liver function and the body's internal systems, leaving you feeling lighter and healthier.

✨ Features & Benefits
✔ Helps purify and cleanse the blood
✔ Supports healthy liver function
✔ Helps reduce acne and skin problems caused by impure blood
✔ Supports better digestion
✔ Promotes a feeling of lightness
✔ 100% herbal and natural

🌿 Who Is It For?
✔ People with acne or skin blemishes
✔ Those feeling tired and heavy
✔ Anyone focused on body detox
✔ Suitable for daily use

☕ How to Use
• Place one sachet in boiling water
• Steep for 5–10 minutes
• Drink 1–2 times daily
• Best taken after meals or as advised

⏱️ Expected Results
• First days: feeling of lightness
• 2–3 weeks: improved skin and digestion
• Continued use: better overall body cleanse

⚠️ Important Notes
• Regular use is essential for best results
• Works best alongside a healthy diet
• Pregnant women or those with conditions should consult before use

💚 Summary
Dr.Biz Fumaria Herbal Tea is a natural choice for anyone seeking a healthier body, purer blood, and clearer skin.`,
    },
  },
  {
    id: seed.length + 4,
    name: { en: "Dr.Biz Supreme Instant Coffee", fa: "قهوه فوری سوپریم دکتر بیز" },
    category: "medicinal",
    brand: "Dr.Biz",
    price: 1350,
    shade: "30 70% 45%",
    image: supremeCoffeeImg,
    details: {
      fa: `🌿 معرفی محصول

قهوه سوپریم دکتر بیز یک نوشیدنی سالم و انرژی‌بخش است که با ترکیب قهوه و عصاره‌های گیاهی (مانند گانودرما) تهیه شده و برای افزایش انرژی، تمرکز و بهبود حالت عمومی بدن طراحی شده است.

این قهوه علاوه بر طعم خوش‌مزه، یک انتخاب مناسب برای سبک زندگی سالم نیز می‌باشد.

✨ ویژگی‌ها و مزایا
✔ افزایش انرژی و رفع خستگی
✔ کمک به افزایش تمرکز و هوشیاری
✔ مناسب برای شروع روز پرانرژی
✔ کمک به بهبود حالت عمومی بدن
✔ دارای ترکیبات گیاهی و طبیعی
✔ طعم خوش‌مزه و متفاوت از قهوه عادی

👥 مناسب برای چه کسانی است؟
✔ افرادی که کار زیاد و خستگی دارند
✔ دانشجویان و کارمندان
✔ کسانی که نیاز به تمرکز بالا دارند
✔ علاقه‌مندان به قهوه سالم و خاص

☕ طرز استفاده
• یک ساشه را در یک فنجان آب داغ حل کنید
• خوب هم بزنید
• روزانه ۱ تا ۲ بار استفاده شود
• بهترین زمان: صبح یا قبل از کار

⏱️ زمان مشاهده اثر
• دقایق اول: افزایش انرژی
• استفاده روزانه: بهبود تمرکز و کاهش خستگی
• مصرف مداوم: کمک به بهبود سبک زندگی

⚠️ نکات مهم
• در مصرف زیاده‌روی نشود
• برای افراد حساس به کافین با احتیاط استفاده شود
• همراه با تغذیه سالم اثر بهتر دارد

💚 جمع‌بندی
قهوه سوپریم دکتر بیز یک انتخاب عالی برای کسانی است که می‌خواهند انرژی بیشتر، تمرکز بهتر و یک نوشیدنی سالم‌تر نسبت به قهوه معمولی داشته باشند.`,
      en: `🌿 Product Introduction

Dr.Biz Supreme Coffee is a healthy, energizing drink made by combining coffee with herbal extracts (such as Ganoderma) — designed to boost energy, focus, and overall wellbeing.

In addition to its delicious taste, it's a great choice for a healthy lifestyle.

✨ Features & Benefits
✔ Boosts energy and relieves fatigue
✔ Helps improve focus and alertness
✔ Perfect for an energetic start to the day
✔ Supports overall body wellbeing
✔ Contains natural herbal ingredients
✔ Delicious taste, different from regular coffee

👥 Who Is It For?
✔ People with heavy workload or fatigue
✔ Students and office workers
✔ Anyone needing high concentration
✔ Lovers of healthy, premium coffee

☕ How to Use
• Dissolve one sachet in a cup of hot water
• Stir well
• Drink 1–2 times daily
• Best time: morning or before work

⏱️ Expected Results
• First minutes: energy boost
• Daily use: improved focus and less fatigue
• Continued use: healthier lifestyle support

⚠️ Important Notes
• Do not overconsume
• Use with caution if sensitive to caffeine
• Works best alongside a healthy diet

💚 Summary
Dr.Biz Supreme Coffee is an excellent choice for those who want more energy, better focus, and a healthier alternative to regular coffee.`,
    },
  },
  {
    id: 999,
    name: { en: "Dr.Biz Clay Soap 100g", fa: "صابون خاک رس دکتر بیز ۱۰۰ گرم" },
    category: "healthcare",
    brand: "Dr.Biz",
    price: 130,
    shade: "25 65% 45%",
    image: claySoapImg,
    details: {
      fa: `🌿 معرفی محصول

صابون خاک رس دکتر بیز یک صابون طبیعی و مراقبتی برای پوست است که با استفاده از خاک رس طبیعی و ترکیبات گیاهی ساخته شده است.

این صابون برای پاکسازی عمیق پوست، کنترل چربی و کمک به شفافیت پوست بسیار مناسب می‌باشد.

✨ ویژگی‌ها و مزایا
✔ پاکسازی عمیق پوست از آلودگی‌ها
✔ کمک به کوچک شدن منافذ باز پوست
✔ کنترل چربی اضافی پوست
✔ کمک به رفع جوش و لک‌های پوستی
✔ ایجاد نرمی و شفافیت پوست
✔ مناسب برای استفاده روزانه

🌸 مناسب برای چه کسانی است؟
✔ پوست‌های چرب و مختلط
✔ افرادی که جوش و آکنه دارند
✔ کسانی که پوست کدر و خسته دارند
✔ مناسب برای خانم‌ها و آقایان

🧼 طرز استفاده
• صورت یا بدن را با آب مرطوب کنید
• صابون را به آرامی روی پوست ماساژ دهید
• ۱ تا ۲ دقیقه صبر کنید
• سپس با آب بشویید
• روزانه ۱ تا ۲ بار استفاده شود

⏱️ زمان مشاهده نتیجه
• چند روز اول: احساس تمیزی و سبکی پوست
• ۱ تا ۲ هفته: کاهش چربی و جوش‌ها
• استفاده مداوم: شفافیت و بهبود بافت پوست

⚠️ نکات مهم
• از تماس مستقیم با چشم جلوگیری شود
• استفاده منظم برای نتیجه بهتر ضروری است
• بعد از شستشو از مرطوب‌کننده استفاده شود

💚 جمع‌بندی
صابون خاک رس دکتر بیز یک انتخاب طبیعی و مؤثر برای کسانی است که می‌خواهند پوستی پاک، شفاف و سالم‌تر داشته باشند.`,
      en: `🌿 Product Introduction

Dr.Biz Clay Soap is a natural skincare soap made with natural clay and herbal ingredients.

It is ideal for deep cleansing, oil control, and helping skin look clearer.

✨ Features & Benefits
✔ Deep cleanses skin from impurities
✔ Helps minimize open pores
✔ Controls excess oil
✔ Helps clear acne and skin blemishes
✔ Creates softness and clarity
✔ Suitable for daily use

🌸 Who Is It For?
✔ Oily and combination skin
✔ People with acne and breakouts
✔ Those with dull and tired skin
✔ Suitable for both women and men

🧼 How to Use
• Wet face or body with water
• Gently massage the soap onto the skin
• Wait 1–2 minutes
• Rinse with water
• Use 1–2 times daily

⏱️ Expected Results
• First days: clean and refreshed skin feeling
• 1–2 weeks: reduced oil and breakouts
• Continued use: clearer skin and improved texture

⚠️ Important Notes
• Avoid direct eye contact
• Regular use is essential for best results
• Apply moisturizer after washing

💚 Summary
Dr.Biz Clay Soap is a natural and effective choice for anyone who wants cleaner, clearer, and healthier skin.`,
    },
  },
  {
    id: 1000,
    name: { fa: "مفرح استرس دکتر بیز", en: "Dr.Biz Stress Relief" },
    brand: "Dr.Biz",
    category: "food",
    price: 450,
    shade: "25 90% 55%",
    image: stressReliefImg,
    details: {
      fa: `🌱 معرفی محصول
مفرح استرس دکتر بیز یک محصول گیاهی و طبیعی است که برای کمک به کاهش استرس، اضطراب و ایجاد آرامش ذهنی طراحی شده است.

این محصول با ترکیبات گیاهی مؤثر، به بهبود حالت روحی کمک کرده و احساس آرامش و تعادل را در بدن افزایش می‌دهد.

✨ ویژگی‌ها و مزایا
✔ کمک به کاهش استرس و اضطراب
✔ ایجاد آرامش ذهنی و جسمی
✔ کمک به بهبود کیفیت خواب
✔ افزایش تمرکز و آرامش فکری
✔ کمک به تعادل حالت روحی
✔ محصول طبیعی و گیاهی

👥 مناسب برای چه کسانی است؟
✔ افرادی که استرس کاری یا روزمره دارند
✔ کسانی که خواب نامنظم دارند
✔ افراد دارای اضطراب و نگرانی
✔ مناسب برای زندگی پرمشغله

🌿 طرز استفاده
• طبق دستور روی بسته استفاده شود
• معمولاً روزانه ۱ تا ۲ بار
• بهتر است بعد از غذا مصرف گردد

⏱️ زمان مشاهده نتیجه
• چند روز اول: احساس آرامش نسبی
• ۱ تا ۲ هفته: کاهش استرس و تنش
• استفاده مداوم: بهبود حالت روحی و خواب

⚠️ نکات مهم
• مصرف منظم برای نتیجه بهتر ضروری است
• همراه با سبک زندگی سالم اثرگذاری بیشتر دارد
• در صورت حساسیت خاص با مشوره استفاده شود

💚 جمع‌بندی
مفرح استرس دکتر بیز یک انتخاب مناسب برای کسانی است که می‌خواهند آرامش بیشتر، استرس کمتر و زندگی متعادل‌تر داشته باشند.`,
      en: `🌱 Product Introduction
Dr.Biz Stress Relief is a natural herbal product designed to help reduce stress, anxiety and bring mental calm.

With effective herbal ingredients, it helps improve mood and increase the feeling of calm and balance in the body.

✨ Features & Benefits
✔ Helps reduce stress and anxiety
✔ Brings mental and physical calm
✔ Helps improve sleep quality
✔ Boosts focus and mental relaxation
✔ Helps balance mood
✔ Natural and herbal product

👥 Who Is It For?
✔ People with work or daily stress
✔ Those with irregular sleep
✔ People with anxiety and worry
✔ Suitable for busy lifestyles

🌿 How to Use
• Use according to package instructions
• Typically 1–2 times daily
• Best taken after meals

⏱️ Expected Results
• First days: noticeable calming feeling
• 1–2 weeks: reduced stress and tension
• Continued use: improved mood and sleep

⚠️ Important Notes
• Regular use is essential for best results
• Works better alongside a healthy lifestyle
• Consult a specialist in case of allergies

💚 Summary
Dr.Biz Stress Relief is a great choice for those who want more calm, less stress, and a more balanced life.`,
    },
  },
  {
    id: 1001,
    name: { fa: "قهوه لاته دکتر بیز", en: "Dr.Biz Coffee Latte" },
    brand: "Dr.Biz",
    category: "medicinal",
    price: 1350,
    shade: "30 60% 45%",
    image: coffeeLatteImg,
    details: {
      fa: `🌿 معرفی محصول
قهوه لاته دکتر بیز یک نوشیدنی خوش‌طعم و ملایم است که از ترکیب قهوه با شیر و ترکیبات گیاهی تهیه شده و برای کسانی که به دنبال یک قهوه نرم، خوش‌مزه و انرژی‌بخش هستند، انتخاب بسیار مناسب می‌باشد.

این محصول علاوه بر طعم عالی، به افزایش انرژی و ایجاد حس آرامش در طول روز کمک می‌کند.

✨ ویژگی‌ها و مزایا
✔ طعم نرم و ملایم (مناسب برای همه)
✔ افزایش انرژی و رفع خستگی
✔ کمک به تمرکز در کارهای روزانه
✔ مناسب برای شروع یک روز خوب
✔ ترکیب قهوه با شیر برای طعم بهتر
✔ قابل استفاده در هر زمان

👥 مناسب برای چه کسانی است؟
✔ کسانی که قهوه تلخ را دوست ندارند
✔ افرادی که دنبال انرژی ملایم هستند
✔ دانشجویان و کارمندان
✔ علاقه‌مندان به نوشیدنی‌های گرم و خوش‌طعم

☕ طرز استفاده
• یک ساشه را در یک فنجان آب داغ حل کنید
• خوب هم بزنید تا کاملاً مخلوط شود
• روزانه ۱ تا ۲ بار استفاده شود
• بهترین زمان: صبح یا هنگام خستگی

⏱️ زمان مشاهده اثر
• دقایق اول: افزایش انرژی
• استفاده روزانه: بهبود تمرکز و کاهش خستگی
• مصرف مداوم: کمک به داشتن روزی فعال‌تر

⚠️ نکات مهم
• در مصرف زیاده‌روی نشود
• برای افراد حساس به کافین با احتیاط استفاده شود
• همراه با سبک زندگی سالم نتیجه بهتر دارد

💚 جمع‌بندی
قهوه لاته دکتر بیز یک انتخاب عالی برای کسانی است که می‌خواهند یک قهوه خوش‌طعم، ملایم و در عین حال انرژی‌بخش داشته باشند.`,
      en: `🌿 Product Introduction
Dr.Biz Coffee Latte is a delicious and mild drink made from coffee blended with milk and herbal ingredients — a perfect choice for those looking for a smooth, tasty and energizing coffee.

Beyond its great taste, it helps boost energy and bring a sense of calm throughout the day.

✨ Features & Benefits
✔ Smooth and mild flavor (suitable for everyone)
✔ Boosts energy and reduces fatigue
✔ Helps focus on daily tasks
✔ Great for starting a good day
✔ Coffee blended with milk for better taste
✔ Can be enjoyed anytime

👥 Who Is It For?
✔ Those who don't like bitter coffee
✔ People looking for mild energy
✔ Students and office workers
✔ Lovers of warm, tasty drinks

☕ How to Use
• Dissolve one sachet in a cup of hot water
• Stir well until fully mixed
• Use 1–2 times daily
• Best time: morning or when feeling tired

⏱️ Expected Results
• First minutes: energy boost
• Daily use: better focus and less fatigue
• Continued use: helps maintain a more active day

⚠️ Important Notes
• Do not overconsume
• Use with caution if sensitive to caffeine
• Works better alongside a healthy lifestyle

💚 Summary
Dr.Biz Coffee Latte is a great choice for anyone who wants a tasty, mild, yet energizing coffee.`,
    },
  },
  {
    id: 1002,
    name: { fa: "قهوه ماسالا دکتر بیز", en: "Dr.Biz Masala Coffee" },
    brand: "Dr.Biz",
    category: "medicinal",
    price: 1350,
    shade: "35 80% 50%",
    image: masalaCoffeeImg,
    details: {
      fa: `🌿 معرفی محصول
قهوه ماسالا دکتر بیز یک نوشیدنی خاص و خوش‌طعم است که از ترکیب قهوه با ادویه‌های گرم و گیاهی (ماسالا) تهیه شده و برای افزایش انرژی، تقویت بدن و ایجاد حس گرما و نشاط بسیار مناسب می‌باشد.

این نوشیدنی علاوه بر طعم متفاوت، به بهبود حالت عمومی بدن نیز کمک می‌کند.

✨ ویژگی‌ها و مزایا
✔ افزایش انرژی و رفع خستگی
✔ ایجاد حس گرما و نشاط در بدن
✔ کمک به بهبود هضم غذا
✔ تقویت بدن با ترکیبات گیاهی
✔ طعم خاص و متفاوت نسبت به قهوه معمولی
✔ مناسب برای فصل سرد

👥 مناسب برای چه کسانی است؟
✔ افرادی که زود خسته می‌شوند
✔ کسانی که طبع سرد دارند
✔ علاقه‌مندان به نوشیدنی‌های گرم و ادویه‌دار
✔ کسانی که دنبال تنوع در نوشیدنی هستند

☕ طرز استفاده
• یک ساشه را در یک فنجان آب داغ حل کنید
• خوب هم بزنید
• روزانه ۱ تا ۲ بار مصرف شود
• بهترین زمان: صبح یا بعد از غذا

⏱️ زمان مشاهده اثر
• دقایق اول: افزایش انرژی و گرمی بدن
• استفاده روزانه: کاهش خستگی و بهبود حال عمومی
• مصرف مداوم: کمک به تقویت بدن

⚠️ نکات مهم
• در مصرف زیاده‌روی نشود
• برای افراد حساس به ادویه با احتیاط مصرف شود
• در کنار تغذیه سالم اثر بهتر دارد

💚 جمع‌بندی
قهوه ماسالا دکتر بیز یک انتخاب عالی برای کسانی است که می‌خواهند انرژی بیشتر، بدن گرم‌تر و یک نوشیدنی خاص و متفاوت را تجربه کنند.`,
      en: `🌿 Product Introduction
Dr.Biz Masala Coffee is a unique and flavorful drink made from coffee blended with warm herbal spices (masala) — perfect for boosting energy, strengthening the body and bringing a feeling of warmth and vitality.

Beyond its distinctive taste, it also helps improve the overall state of the body.

✨ Features & Benefits
✔ Boosts energy and reduces fatigue
✔ Brings warmth and vitality to the body
✔ Helps improve digestion
✔ Strengthens the body with herbal ingredients
✔ Unique flavor different from regular coffee
✔ Great for cold seasons

👥 Who Is It For?
✔ People who get tired easily
✔ Those with a cold constitution
✔ Lovers of warm, spiced drinks
✔ Those looking for variety in their beverages

☕ How to Use
• Dissolve one sachet in a cup of hot water
• Stir well
• Use 1–2 times daily
• Best time: morning or after meals

⏱️ Expected Results
• First minutes: energy boost and body warmth
• Daily use: less fatigue and improved well-being
• Continued use: helps strengthen the body

⚠️ Important Notes
• Do not overconsume
• Use with caution if sensitive to spices
• Works better alongside a healthy diet

💚 Summary
Dr.Biz Masala Coffee is a great choice for those who want more energy, a warmer body, and a unique, distinctive drink experience.`,
    },
  },
  {
    id: 1003,
    name: { fa: "قهوه هات چاکلیت دکتر بیز", en: "Dr.Biz Hot Chocolate Coffee" },
    brand: "Dr.Biz",
    category: "medicinal",
    price: 1350,
    shade: "25 60% 35%",
    image: hotChocolateImg,
    details: {
      fa: `🌿 معرفی محصول
قهوه هات چاکلیت دکتر بیز یک نوشیدنی خوش‌طعم و لذت‌بخش است که از ترکیب قهوه و شکلات تهیه شده و برای کسانی که به دنبال یک نوشیدنی شیرین، انرژی‌بخش و متفاوت هستند، انتخاب عالی می‌باشد.

این نوشیدنی با طعم دلپذیر خود، همزمان انرژی می‌دهد و حس خوشایند ایجاد می‌کند.

✨ ویژگی‌ها و مزایا
✔ طعم شیرین و بسیار خوش‌مزه
✔ افزایش انرژی و رفع خستگی
✔ ایجاد حس شادی و لذت
✔ مناسب برای نوشیدن در هر زمان
✔ ترکیب قهوه و شکلات برای طعم خاص
✔ مناسب برای فصل سرد

👥 مناسب برای چه کسانی است؟
✔ علاقه‌مندان به نوشیدنی‌های شیرین
✔ کسانی که قهوه تلخ دوست ندارند
✔ کودکان و بزرگسالان (با احتیاط در مصرف)
✔ افرادی که به دنبال نوشیدنی لذت‌بخش هستند

☕ طرز استفاده
• یک ساشه را در یک فنجان آب داغ حل کنید
• خوب هم بزنید تا کاملاً مخلوط شود
• روزانه ۱ تا ۲ بار استفاده گردد
• بهترین زمان: عصر یا زمان استراحت

⏱️ زمان مشاهده اثر
• دقایق اول: افزایش انرژی و حس خوب
• استفاده روزانه: کاهش خستگی و بهبود حالت روحی
• مصرف مداوم: کمک به داشتن روزی شادتر

⚠️ نکات مهم
• در مصرف زیاده‌روی نشود
• برای افراد حساس به کافین با احتیاط استفاده شود
• برای کودکان در مقدار کم مصرف گردد

💚 جمع‌بندی
قهوه هات چاکلیت دکتر بیز یک انتخاب عالی برای کسانی است که می‌خواهند یک نوشیدنی خوش‌مزه، انرژی‌بخش و شادی‌آور را تجربه کنند.`,
      en: `🌿 Product Introduction
Dr.Biz Hot Chocolate Coffee is a delicious, enjoyable drink made from coffee blended with chocolate — a great choice for anyone looking for a sweet, energizing and unique beverage.

With its pleasant taste, it gives energy and creates a delightful feeling at the same time.

✨ Features & Benefits
✔ Sweet and very tasty flavor
✔ Boosts energy and reduces fatigue
✔ Creates a sense of joy and pleasure
✔ Suitable for any time of day
✔ Coffee and chocolate blend for a special taste
✔ Great for cold seasons

👥 Who Is It For?
✔ Lovers of sweet beverages
✔ Those who don't enjoy bitter coffee
✔ Children and adults (with moderate use)
✔ Anyone looking for an enjoyable drink

☕ How to Use
• Dissolve one sachet in a cup of hot water
• Stir well until fully mixed
• Use 1–2 times daily
• Best time: afternoon or rest time

⏱️ Expected Results
• First minutes: energy boost and good feeling
• Daily use: less fatigue and improved mood
• Continued use: contributes to happier days

⚠️ Important Notes
• Do not overconsume
• Use with caution if sensitive to caffeine
• Use small amounts for children

💚 Summary
Dr.Biz Hot Chocolate Coffee is a great choice for anyone who wants a tasty, energizing and joyful drink experience.`,
    },
  },
];
