import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero.jpg";
import { ShieldCheck, Heart, Leaf } from "lucide-react";
import SEO from "@/components/SEO";

const About = () => {
  const { t, lang } = useLang();
  const values = [
    { icon: ShieldCheck, en: "100% Authentic", fa: "۱۰۰٪ اصل" },
    { icon: Leaf, en: "Trusted Brands", fa: "برندهای معتبر" },
    { icon: Heart, en: "Made for Afghan Families", fa: "برای خانواده‌های افغان" },
  ];
  const brands = [
    { name: "Dr.Biz", en: "Pharmaceutical & supplements", fa: "دارویی و مکمل‌ها" },
    { name: "Setin", en: "Personal care & cosmetics", fa: "مراقبت شخصی و آرایشی" },
    { name: "Biene Star", en: "Honey & bee products", fa: "عسل و فرآورده‌های زنبور" },
    { name: "Dynamin", en: "Sports nutrition & wellness", fa: "تغذیه ورزشی و سلامتی" },
  ];
  return (
    <>
     <SEO
  title="درباره بیزشاپ کابل | نماینده رسمی دکتر بیز در افغانستان"
  description="بیزشاپ کابل نماینده رسمی برندهای دکتر بیز، ستین، داینامین و بینه‌استار در افغانستان. محصولات ۱۰۰٪ اصل با تحویل سریع در کابل."
  keywords="درباره بیزشاپ، دکتر بیز افغانستان، نماینده رسمی دکتر بیز کابل، فروشگاه سلامتی کابل"
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "بیزشاپ کابل",
    url: "https://bizshopkabul.com/about",
    description: "نماینده رسمی برندهای دکتر بیز، ستین، داینامین و بینه‌استار در افغانستان",
    address: {
      "@type": "PostalAddress",
      addressLocality: "کابل",
      addressCountry: "AF",
    },
  }}
/>
      <section className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("brand")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight mb-6">{t("about_title")}</h1>
          <p className="text-foreground/80 leading-relaxed mb-4">{t("about_p1")}</p>
          <p className="text-foreground/80 leading-relaxed">{t("about_p2")}</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-elegant">
          <img src={heroImg} alt="" width={1200} height={1500} className="w-full h-full object-cover" loading="lazy" />
        </div>
      </section>

      <section className="container pb-12">
        <div className="grid sm:grid-cols-3 gap-5">
          {values.map(v => (
            <div key={v.en} className="border border-border rounded-md p-6 text-center bg-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center mx-auto mb-4">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl text-primary">{lang === "fa" ? v.fa : v.en}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-accent text-center mb-3">{t("brands")}</p>
        <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-10">
          {lang === "fa" ? "برندهای معتبر ما" : "Our Trusted Brands"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brands.map(b => (
            <div key={b.name} className="bg-secondary/40 border border-border rounded-md p-6 text-center">
              <div className="font-display text-2xl text-primary mb-2">{b.name}</div>
              <p className="text-sm text-muted-foreground">{lang === "fa" ? b.fa : b.en}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
