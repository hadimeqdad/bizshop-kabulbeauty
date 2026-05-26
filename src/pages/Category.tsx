import { useParams, Link, Navigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { Category as Cat } from "@/data/products";
import { SUBCATEGORIES } from "@/data/subcategories";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useMemo } from "react";
import ProductsLoader from "@/components/ProductsLoader";
import SEO from "@/components/SEO";
import catMedicinal from "@/assets/1000122016.webp";
import catHealthcare from "@/assets/1000122013.webp";
import catCosmetics from "@/assets/cat-cosmetics.jpg";
import catFood from "@/assets/1000122015.webp";

const VALID: Cat[] = ["medicinal", "healthcare", "cosmetics", "food"];
const CAT_IMAGES: Record<Cat, string> = {
  medicinal: catMedicinal,
  healthcare: catHealthcare,
  cosmetics: catCosmetics,
  food: catFood,
};

const CategoryPage = () => {
  const { cat } = useParams();
  const { t, lang, dir } = useLang();
  const { products, loading } = useProducts();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  if (!cat || !VALID.includes(cat as Cat)) return <Navigate to="/shop" replace />;

  const category = cat as Cat;
  const subs = SUBCATEGORIES[category] ?? [];
  const heroImg = CAT_IMAGES[category];

  // count + sample image per subcategory
  const { counts, samples } = useMemo(() => {
    const c: Record<string, number> = { all: 0 };
    const s: Record<string, string | undefined> = {};
    products.forEach(p => {
      if (p.category !== category) return;
      c.all += 1;
      if (p.subcategory) {
        c[p.subcategory] = (c[p.subcategory] ?? 0) + 1;
        if (!s[p.subcategory] && p.image) s[p.subcategory] = p.image;
      }
    });
    return { counts: c, samples: s };
  }, [products, category]);

  if (subs.length === 0) return <Navigate to={`/shop?cat=${category}`} replace />;

  return (
    <>
      <SEO
        title={`${t(`cat_${category}` as any)} — بیزشاپ کابل`}
        description={`خرید محصولات ${t(`cat_${category}` as any)} برندهای دکتر بیز، ستین، داینامین و بیینه استار در بیزشاپ کابل افغانستان`}
        keywords={`${t(`cat_${category}` as any)}, بیزشاپ, دکتر بیز کابل, خرید آنلاین افغانستان`}
      />
      {loading && <div className="container py-8"><ProductsLoader /></div>}
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        </div>
        <div className="container relative py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> {t("explore")}
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-background">
            {t(`cat_${category}` as any)}
          </h1>
          <p className="text-background/80 mt-4 max-w-md mx-auto">{t("browse_sub")}</p>
        </div>
      </section>

      {/* Subcategory cards */}
      <section className="container py-12 md:py-16">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{t("subcategories")}</p>
            <h2 className="font-display text-2xl md:text-4xl text-primary">
              {t(`cat_${category}` as any)}
            </h2>
          </div>
          <Link
            to={`/shop?cat=${category}`}
            className="hidden md:inline-flex items-center gap-1 text-sm text-accent hover:text-primary transition-smooth"
          >
            {t("all_products")} ({counts.all ?? 0}) <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {/* All products card */}
          <Link
            to={`/shop?cat=${category}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-md shadow-soft bg-primary"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/80" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, hsl(var(--gold)) 0%, transparent 50%)" }} />
            <div className="relative h-full p-4 md:p-5 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest text-gold">
                {counts.all ?? 0} {lang === "fa" ? "محصول" : "items"}
              </span>
              <div>
                <h3 className="font-display text-xl md:text-2xl text-background leading-tight">
                  {t("all_products")}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gold inline-flex items-center gap-1 mt-2">
                  {t("shop_now")} <Arrow className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>

          {subs.map((s, i) => {
            const count = counts[s.key] ?? 0;
            const img = samples[s.key];
            const shadeHues = [12, 30, 150, 200, 280, 340];
            const hue = shadeHues[i % shadeHues.length];
            return (
              <Link
                key={s.key}
                to={`/shop?cat=${category}&sub=${s.key}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-md shadow-soft"
                style={{ background: `linear-gradient(135deg, hsl(${hue} 40% 35%) 0%, hsl(${hue} 30% 20%) 100%)` }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={s.name[lang]}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-smooth group-hover:scale-110 group-hover:opacity-80"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-background/20 font-display text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                <div className="relative h-full p-4 md:p-5 flex flex-col justify-between">
                  <span className="self-start text-[10px] uppercase tracking-widest text-background bg-ink/40 backdrop-blur px-2 py-0.5 rounded-full border border-background/20">
                    {count} {lang === "fa" ? "محصول" : "items"}
                  </span>
                  <div>
                    <h3 className="font-display text-base md:text-xl text-background leading-snug line-clamp-2">
                      {s.name[lang]}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-gold inline-flex items-center gap-1 mt-2">
                      {t("shop_now")} <Arrow className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
