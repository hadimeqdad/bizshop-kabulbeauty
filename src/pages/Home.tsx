import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import hero from "@/assets/hero.jpg";
import promo from "@/assets/promo.jpg";
import catLips from "@/assets/cat-lips.jpg";
import catEyes from "@/assets/cat-eyes.jpg";
import catFace from "@/assets/cat-face.jpg";
import catSkin from "@/assets/cat-skin.jpg";
import catFragrance from "@/assets/cat-fragrance.jpg";

const Home = () => {
  const { t, lang, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const featured = products.slice(0, 8);

  const cats = [
    { key: "lips", img: catLips },
    { key: "eyes", img: catEyes },
    { key: "face", img: catFace },
    { key: "skin", img: catSkin },
    { key: "fragrance", img: catFragrance },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" width={1920} height={1080} className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        <div className="container relative py-20 md:py-32 lg:py-40">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent mb-5">
              <Sparkles className="w-3.5 h-3.5" /> {t("hero_eyebrow")}
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-primary leading-[1.05] whitespace-pre-line text-balance">
              {t("hero_title")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-foreground/75 max-w-md leading-relaxed">
              {t("hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 rounded-full px-7">
                <Link to="/shop">{t("shop_now")} <Arrow className="w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7 border-primary/30">
                <Link to="/about">{t("nav_about")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{t("explore")}</p>
            <h2 className="font-display text-3xl md:text-5xl text-primary">{t("shop_by_cat")}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
          {cats.map((c, i) => (
            <Link
              key={c.key}
              to={`/shop?cat=${c.key}`}
              className={`group relative aspect-[3/4] overflow-hidden rounded-sm shadow-soft ${i === 0 ? "col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto" : ""}`}
            >
              <img src={c.img} alt={t(`cat_${c.key}` as any)} loading="lazy" width={800} height={800} className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/70 via-burgundy-deep/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-6">
                <h3 className="font-display text-2xl md:text-3xl text-cream">{t(`cat_${c.key}` as any)}</h3>
                <span className="text-xs uppercase tracking-widest text-cream/80 inline-flex items-center gap-1 mt-1">
                  {t("shop_now")} <Arrow className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{t("featured_sub")}</p>
            <h2 className="font-display text-3xl md:text-5xl text-primary">{t("featured")}</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-1 text-sm text-accent hover:text-primary transition-smooth">
            {t("view_all")} <Arrow className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-sm shadow-elegant">
          <img src={promo} alt="" loading="lazy" width={1600} height={900} className="w-full h-[420px] md:h-[520px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/85 via-burgundy-deep/40 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-md text-cream">
                <p className="text-xs uppercase tracking-[0.3em] text-rosegold mb-3">{lang === "fa" ? "تخفیف ویژه" : "Special Offer"}</p>
                <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight">{t("promo_title")}</h2>
                <p className="text-cream/85 mb-6 leading-relaxed">{t("promo_sub")}</p>
                <Button asChild size="lg" variant="secondary" className="rounded-full px-7 gap-2 bg-cream text-primary hover:bg-rosegold">
                  <Link to="/shop">{t("shop_now")} <Arrow className="w-4 h-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
