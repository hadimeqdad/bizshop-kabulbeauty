import hairFriendImg from "@/assets/product-hair-friend.jpg";
import caffeineGinsengShampooImg from "@/assets/product-caffeine-ginseng-shampoo.jpg";
import exonicArganBodyWashImg from "@/assets/product-exonic-argan-body-wash.jpg";
import exonicAvocadoBodyWashImg from "@/assets/product-exonic-avocado-body-wash.jpg";
import exonicAloeBodyWashImg from "@/assets/product-exonic-aloe-body-wash.jpg";
import exonicRoseBodyWashImg from "@/assets/product-exonic-rose-body-wash.jpg";
import exonicMoringaBodyWashImg from "@/assets/product-exonic-moringa-body-wash.jpg";
import exonicCaviarShampooImg from "@/assets/product-exonic-caviar-shampoo.jpg";
import exonicCaviarBodyLotionImg from "@/assets/product-exonic-caviar-body-lotion.jpg";
import exonicCaviarConditionerImg from "@/assets/product-exonic-caviar-conditioner.jpg";
import bizSesameShampooImg from "@/assets/product-biz-sesame-shampoo.png";
import bizCaffeineGarlicShampooImg from "@/assets/product-biz-caffeine-garlic-shampoo.png";
import bizPomegranateShampooImg from "@/assets/product-biz-pomegranate-shampoo.png";
import bizOstrichShampooImg from "@/assets/product-biz-ostrich-shampoo.png";
import luxuryCoinImg from "@/assets/product-luxury-coin-serum.jpg";
import fumariaTeaImg from "@/assets/product-fumaria-tea.jpg";
import supremeCoffeeImg from "@/assets/product-supreme-coffee.jpg";
import claySoapImg from "@/assets/product-clay-soap.jpg";
import stressReliefImg from "@/assets/product-stress-relief.jpg";
import coffeeLatteImg from "@/assets/product-coffee-latte.jpg";
import masalaCoffeeImg from "@/assets/product-masala-coffee.jpg";
import hotChocolateImg from "@/assets/product-hot-chocolate.jpg";
import coffeeMochaImg from "@/assets/product-coffee-mocha.jpg";
import setinFoeniculumTeaImg from "@/assets/product-setin-foeniculum-tea.png";
import setinFoeniculumBlendTeaImg from "@/assets/product-setin-foeniculum-blend-tea.jpg";
import setinTribulusTeaImg from "@/assets/product-setin-tribulus-tea.jpg";
import setinSlimmingGreenTeaImg from "@/assets/product-setin-slimming-green-tea.jpg";
import bienestarRiceBranImg from "@/assets/product-bienestar-rice-bran.jpg";
import bienestarMultigrainBranImg from "@/assets/product-bienestar-multigrain-bran.jpg";
import bionestarWheatGermImg from "@/assets/product-bionestar-wheat-germ.jpg";
import drbizBlackGarlicImg from "@/assets/product-drbiz-black-garlic.jpg";
import drbizHoney500gImg from "@/assets/product-drbiz-honey-500g.png";
import drbizHoney900gImg from "@/assets/product-drbiz-honey-900g.png";
import dateBarNaturalImg from "@/assets/product-drbiz-date-bar-natural.jpg";
import dateBarCinnamonImg from "@/assets/product-drbiz-date-bar-cinnamon.jpg";
import dateBarGingerImg from "@/assets/product-drbiz-date-bar-ginger.jpg";
import dateBarBoostImg from "@/assets/product-drbiz-date-bar-boost.jpg";
import dateBarDietImg from "@/assets/product-drbiz-date-bar-diet.jpg";
import dateBarEnergyImg from "@/assets/product-drbiz-date-bar-energy.jpg";

export type Category = "medicinal" | "healthcare" | "cosmetics" | "food";
export type Brand = "Dr.Biz" | "Setin" | "Biene Star" | "Dynamin";

export interface Product {
  id: string;
  name: { en: string; fa: string };
  category: Category;
  subcategory?: string;
  brand: Brand;
  price: number; // AFN
  originalPrice?: number; // AFN
  shade: string; // hsl tint for placeholder
  image?: string;
  details?: { fa: string; en: string };
}

// Auto-assign subcategory based on product name keywords
const inferSubcategory = (cat: Category, fa: string, en: string): string | undefined => {
  const text = (fa + " " + en).toLowerCase();
  if (cat === "healthcare") {
    if (text.includes("شامپو") && !text.includes("بدن")) return "hc_biz_shampoo";
    if (text.includes("صابون")) return "hc_biz_soap";
    if (text.includes("خمیردندان") || text.includes("مسواک") || text.includes("نخ دندان") || text.includes("دهان‌شویه") || text.includes("toothpaste") || text.includes("mouthwash") || text.includes("floss") || text.includes("toothbrush")) return "hc_oral";
    if (text.includes("ژل") && (text.includes("ضدعفونی") || text.includes("بهداشت"))) return "hc_hygiene_gel";
    if (text.includes("دئودورانت") || text.includes("رول") || text.includes("deodorant") || text.includes("roll")) return "hc_deodorant";
    if (text.includes("ضد آفتاب") || text.includes("لوسیون") || text.includes("نرم‌کننده مو") || text.includes("conditioner") || text.includes("sunscreen")) return "hc_biz_hair_skin";
    if (text.includes("مرطوب") || text.includes("moistur") || text.includes("lotion")) return "hc_moisturizer";
    if (text.includes("ماسک")) return "hc_hair_mask";
    if (text.includes("اسپری") || text.includes("spray")) return "hc_body_spray";
    return "hc_biz_general";
  }
  if (cat === "cosmetics") {
    if (text.includes("لاکچری کوین") || text.includes("luxury coin")) return "cos_luxury_coin_cream";
    if (text.includes("ریمل ابرو") || text.includes("brow")) return "cos_mascara_brow";
    if (text.includes("ریمل") || text.includes("mascara")) return "cos_mascara_eye";
    if (text.includes("کرم پودر") || text.includes("foundation") || text.includes("bb cream") || text.includes("tinted")) return "cos_foundation";
    if (text.includes("رژگونه") || text.includes("blush")) return "cos_blush";
    if (text.includes("رژلب") || text.includes("بالم") || text.includes("lip") || text.includes("lipstick")) return "cos_lipstick";
    if (text.includes("پنکک") || text.includes("compact") || text.includes("powder")) return "cos_compact";
    if (text.includes("خط چشم") || text.includes("eyeliner")) return "cos_eyeliner";
    if (text.includes("سایه چشم") || text.includes("eyeshadow")) return "cos_eyeshadow";
    if (text.includes("بادی اسپلش") || text.includes("body splash") || text.includes("body butter") || text.includes("body wash")) return "cos_body_splash";
    if (text.includes("سرم") || text.includes("روغن") || text.includes("serum") || text.includes("oil")) return "cos_hair_skin_serum";
    if (text.includes("پاک") || text.includes("تونر") || text.includes("اسکراب") || text.includes("ماسک") || text.includes("cleans") || text.includes("toner") || text.includes("scrub") || text.includes("mask")) return "cos_cleansing";
    if (text.includes("گاتیو") || text.includes("gatio")) return "cos_gatio";
    return "cos_cleansing";
  }
  if (cat === "food") {
    if (text.includes("سیر سیاه") || text.includes("black garlic")) return "food_black_garlic";
    if (text.includes("خرما بار") || text.includes("date bar")) return "food_date_bar";
    if (text.includes("خرما") || text.includes("date")) return "food_date_bar";
    if (text.includes("عسل") || text.includes("honey") || text.includes("ژل رویال") || text.includes("royal jelly") || text.includes("بره‌موم") || text.includes("propolis") || text.includes("گرده") || text.includes("pollen")) return "food_honey_sucrose";
    if (text.includes("کلوچه") || text.includes("شیرینی") || text.includes("cookie")) return "food_cookies";
    if (text.includes("دمنوش") || text.includes("دم‌نوش") || text.includes("چای") || text.includes("tea") || text.includes("bean")) return "food_herbal_tea_bean";
    if (text.includes("زعفران") || text.includes("saffron") || text.includes("ادویه") || text.includes("spice") || text.includes("سبوس")) return "food_spice_saffron";
    return "food_herbal_traditional";
  }
  return undefined;
};

// Tints by category — green/gold palette
const TINTS = {
  medicinal: ["150 55% 35%", "150 45% 28%", "160 40% 32%", "145 50% 38%", "150 60% 22%"],
  healthcare: ["180 35% 45%", "190 30% 40%", "170 35% 42%", "200 30% 50%", "175 40% 38%"],
  cosmetics: ["42 65% 55%", "30 50% 60%", "35 60% 50%", "25 55% 55%", "45 70% 60%"],
  food: ["35 75% 50%", "28 65% 45%", "40 70% 55%", "20 60% 50%", "45 80% 48%"],
} as const;

const tint = (cat: Category, i: number) => TINTS[cat][i % TINTS[cat].length];

// Seed catalog removed — only explicitly curated products remain below.
const seed: Array<{ en: string; fa: string; cat: Category; brand: Brand; price: number }> = [];

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



// Products are now stored in the database. See useProducts() hook.
// Static asset imports above are kept for migration reference and may be removed later.
export const products: Product[] = [];

