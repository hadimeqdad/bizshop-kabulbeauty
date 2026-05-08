import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { ArrowRight, ArrowLeft, Leaf, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import hero from "@/assets/hero.jpg";
import promo from "@/assets/promo.jpg";
import catMedicinal from "@/assets/file_000000002bfc7243b357c60be7fcf0ed.jpg";
import catHealthcare from "@/assets/cat-healthcare.jpg.";
import catCosmetics from "@/assets/cat-cosmetics.jpg.";
import catFood from "@/assets/cat-food.jpg.";

const Home = () => {
  const { t, lang, dir } = useLang();
  const { products } = useProducts();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const featured = products.slice(0, 8);

  const cats = [
    { key: "medicinal", img: catMedicinal, icon: "" },
    { key: "healthcare", img: catHealthcare, icon: "🧴" },
    { key: "cosmetics", img: catCosmetics, icon: "💄" },
    { key: "food", img: catFood, icon: "🥗" },
  ] as const;

  const trust = [
    { icon: ShieldCheck, title: t("trust_authentic"), sub: t("trust_authentic_sub") },
    { icon: Truck, title: t("trust_delivery"), sub: t("trust_delivery_sub") },
    { icon: MessageCircle, title: t("trust_support"), sub: t("trust_support_sub") },
  ];

  const brands = ["Dr.Biz", "Setin", "Biene Star", "Dynamin"];

  return (
    <>
      <SEO
        title="بیزشاپ — فروشگاه آنلاین محصولات دکتر بیز در کابل افغانستان"
        description="خرید محصولات بهداشتی، آرایشی و غذایی دکتر بیز، ستین، داینامین و بیینه استار در کابل افغانستان"
        keywords="bizshop، بیزشاپ، دکتر بیز کابل، خرید آنلاین افغانستان، فروشگاه کابل"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "BizShop بیزشاپ",
          url: "https://bizshop-kabulbeauty.lovable.app/",
          address: { "@type": "PostalAddress", addressLocality: "Kabul", addressCountry: "AF" },
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img src={hero} alt="" width={1920} height={1280} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        <div className="container relative py-20 md:py-32 lg:py-40">
          <div className="max-w-xl animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-5">
              <Leaf className="w-3.5 h-3.5" /> {t("hero_eyebrow")}
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-background leading-[1.05] whitespace-pre-line text-balance">
              {t("hero_title")}
            </h1>
            <p className="mt-5 text-base md:text-lg text-background/80 max-w-md leading-relaxed">
              {t("hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 rounded-full px-7 bg-gold text-ink hover:bg-gold/90 border-0">
                <Link to="/shop">{t("shop_now")} <Arrow className="w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7 bg-transparent text-background border-background/40 hover:bg-background/10 hover:text-background">
                <Link to="/about">{t("nav_about")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {trust.map(item => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm text-primary">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16 md:py-20">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{t("explore")}</p>
            <h2 className="font-display text-3xl md:text-5xl text-primary">{t("shop_by_cat")}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {cats.map((c) => (
            <Link
              key={c.key}
              to={`/category/${c.key}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-md shadow-soft"
            >
              <img src={c.img} alt={t(`cat_${c.key}` as any)} loading="lazy" width={800} height={1000} className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                {c.icon && <div className="text-2xl mb-1">{c.icon}</div>}
                <h3 className="font-display text-xl md:text-2xl text-background">{t(`cat_${c.key}` as any)}</h3>
                <span className="text-[10px] uppercase tracking-widest text-gold inline-flex items-center gap-1 mt-1">
                  {t("shop_now")} <Arrow className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container py-10 md:py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent text-center mb-6">{t("brands")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {brands.map(b => (
              <div key={b} className="text-center py-4 px-3 bg-background border border-border rounded-md">
                <div className="font-display text-2xl md:text-3xl text-primary">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16 md:py-20">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{t("featured_sub")}</p>
            <h2 className="font-display text-3xl md:text-5xl text-primary">{t("featured")}</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-1 text-sm text-accent hover:text-primary transition-smooth">
            {t("view_all")} <Arrow className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-md shadow-elegant">
          <img src={promo} alt="" loading="lazy" width={1600} height={900} className="w-full h-[420px] md:h-[520px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-md text-background">
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">{lang === "fa" ? "پیشنهاد ویژه" : "Special Offer"}</p>
                <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight">{t("promo_title")}</h2>
                <p className="text-background/85 mb-6 leading-relaxed">{t("promo_sub")}</p>
                <Button asChild size="lg" className="rounded-full px-7 gap-2 bg-gold text-ink hover:bg-gold/90 border-0">
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
