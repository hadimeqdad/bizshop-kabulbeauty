import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero.jpg";
import { Sparkles, Heart, ShieldCheck } from "lucide-react";

const About = () => {
  const { t, lang } = useLang();
  const values = [
    { icon: Sparkles, en: "Curated Luxury", fa: "لوکس دست‌چین شده" },
    { icon: Heart, en: "Made for You", fa: "ساخته شده برای شما" },
    { icon: ShieldCheck, en: "100% Authentic", fa: "۱۰۰٪ اصل" },
  ];
  return (
    <>
      <section className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("brand")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight mb-6">{t("about_title")}</h1>
          <p className="text-foreground/80 leading-relaxed mb-4">{t("about_p1")}</p>
          <p className="text-foreground/80 leading-relaxed">{t("about_p2")}</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-elegant">
          <img src={heroImg} alt="" width={1200} height={1500} className="w-full h-full object-cover" loading="lazy" />
        </div>
      </section>

      <section className="container pb-20">
        <div className="grid sm:grid-cols-3 gap-5">
          {values.map(v => (
            <div key={v.en} className="border border-border rounded-sm p-6 text-center bg-card">
              <div className="w-12 h-12 rounded-full gradient-rose grid place-items-center mx-auto mb-4">
                <v.icon className="w-5 h-5 text-burgundy-deep" />
              </div>
              <h3 className="font-display text-xl text-primary">{lang === "fa" ? v.fa : v.en}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
