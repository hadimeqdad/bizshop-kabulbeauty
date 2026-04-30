import { Category } from "./products";

export interface SubcategoryDef {
  key: string;
  name: { fa: string; en: string };
}

export const SUBCATEGORIES: Record<Category, SubcategoryDef[]> = {
  medicinal: [],
  healthcare: [
    { key: "hc_biz_general", name: { fa: "بهداشتی BIZ", en: "BIZ Hygiene" } },
    { key: "hc_biz_shampoo", name: { fa: "شامپوهای تخصصی BIZ", en: "BIZ Specialty Shampoos" } },
    { key: "hc_biz_soap", name: { fa: "صابون‌های زیبایی BIZ", en: "BIZ Beauty Soaps" } },
    { key: "hc_biz_hair_skin", name: { fa: "محصولات تقویتی مو و پوست BIZ", en: "BIZ Hair & Skin Strengthening" } },
    { key: "hc_biz_perfume", name: { fa: "عطرهای BIZ و Vita Bella", en: "BIZ & Vita Bella Perfumes" } },
    { key: "hc_bic_perfume", name: { fa: "محصولات BIC، ادکلن‌ها و عطرها", en: "BIC Colognes & Perfumes" } },
    { key: "hc_oral", name: { fa: "محصولات دهان و دندان", en: "Oral Care" } },
    { key: "hc_skincare", name: { fa: "محصولات مراقبت از پوست", en: "Skincare" } },
    { key: "hc_hair_mask", name: { fa: "ماسک مو و ژل مو", en: "Hair Masks & Gels" } },
    { key: "hc_moisturizer", name: { fa: "کریم‌های مرطوب‌کننده", en: "Moisturizing Creams" } },
    { key: "hc_body_spray", name: { fa: "سپری خوشبوکننده بدن", en: "Body Sprays" } },
    { key: "hc_hygiene_gel", name: { fa: "ژل‌های بهداشتی", en: "Hygiene Gels" } },
    { key: "hc_deodorant", name: { fa: "مام رول ضد عرق", en: "Roll-On Deodorants" } },
  ],
  cosmetics: [
    { key: "cos_luxury_coin_cream", name: { fa: "کرم‌های لاکچری کوین", en: "Luxury Coin Creams" } },
    { key: "cos_mascara_brow", name: { fa: "ریمل ابرو", en: "Brow Mascara" } },
    { key: "cos_mascara_eye", name: { fa: "ریمل چشم", en: "Eye Mascara" } },
    { key: "cos_foundation", name: { fa: "کرم پودر", en: "Foundation" } },
    { key: "cos_blush", name: { fa: "رژگونه", en: "Blush" } },
    { key: "cos_lipstick", name: { fa: "رژلب", en: "Lipstick" } },
    { key: "cos_compact", name: { fa: "پنکک", en: "Compact Powder" } },
    { key: "cos_eyeliner", name: { fa: "خط چشم", en: "Eyeliner" } },
    { key: "cos_body_splash", name: { fa: "بادی اسپلش", en: "Body Splash" } },
    { key: "cos_eyeshadow", name: { fa: "سایه چشم", en: "Eyeshadow" } },
    { key: "cos_hair_skin_serum", name: { fa: "روغن و سرم تقویت پوست و مو", en: "Hair & Skin Serums & Oils" } },
    { key: "cos_cleansing", name: { fa: "پاک‌کننده و مراقبت پوست", en: "Cleansers & Skincare" } },
    { key: "cos_gatio", name: { fa: "کرم‌های تخصصی گاتیو", en: "Gatio Specialty Creams" } },
  ],
  food: [
    { key: "food_herbal_traditional", name: { fa: "دم‌نوش و فرآورده‌های طبیعی و سنتی", en: "Traditional Herbal Products" } },
    { key: "food_spice_saffron", name: { fa: "ادویه، سبوس، چاشنی و اسپری زعفران", en: "Spices, Bran & Saffron" } },
    { key: "food_herbal_tea_bean", name: { fa: "دم‌نوش‌های Dr.Biz و BEAN", en: "Dr.Biz & BEAN Herbal Teas" } },
    { key: "food_cookies", name: { fa: "کلوچه و شیرینی Dr.BIZ", en: "Dr.BIZ Cookies & Sweets" } },
    { key: "food_honey_sucrose", name: { fa: "عسل مخصوص Dr.BIZ", en: "Dr.BIZ Special Honey" } },
    { key: "food_black_garlic", name: { fa: "سیر سیاه", en: "Black Garlic" } },
    { key: "food_date_bar", name: { fa: "خرما بار Dr.BIZ", en: "Dr.BIZ Date Bars" } },
  ],
};

export const getSubcategory = (cat: Category, key: string) =>
  SUBCATEGORIES[cat]?.find(s => s.key === key);
