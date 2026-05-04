import { useParams, Link, Navigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { Category as Cat } from "@/data/products";
import { SUBCATEGORIES } from "@/data/subcategories";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight, ArrowLeft, LayoutGrid } from "lucide-react";
import { useMemo } from "react";

const VALID: Cat[] = ["medicinal", "healthcare", "cosmetics", "food"];

const CategoryPage = () => {
  const { cat } = useParams();
  const { t, lang, dir } = useLang();
  const { products } = useProducts();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  if (!cat || !VALID.includes(cat as Cat)) return <Navigate to="/shop" replace />;

  const category = cat as Cat;
  const subs = SUBCATEGORIES[category] ?? [];

  // count products per subcategory
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: 0 };
    products.forEach(p => {
      if (p.category !== category) return;
      map.all += 1;
      if (p.subcategory) map[p.subcategory] = (map[p.subcategory] ?? 0) + 1;
    });
    return map;
  }, [products, category]);

  // If category has no subcategories defined, go straight to shop
  if (subs.length === 0) return <Navigate to={`/shop?cat=${category}`} replace />;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-12 md:py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("explore")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary">{t(`cat_${category}` as any)}</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">{t("browse_sub")}</p>
        </div>
      </section>

      {/* Subcategory grid */}
      <section className="container py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {/* All products card */}
          <Link
            to={`/shop?cat=${category}`}
            className="group relative overflow-hidden rounded-md border border-border bg-card p-5 md:p-6 flex flex-col justify-between min-h-[140px] hover:shadow-soft hover:border-primary/40 transition-smooth"
          >
            <div className="flex items-start justify-between">
              <LayoutGrid className="w-5 h-5 text-accent" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {counts.all ?? 0}
              </span>
            </div>
            <div>
              <h3 className="font-display text-base md:text-lg text-primary leading-snug">
                {t("all_products")}
              </h3>
              <span className="mt-2 text-[10px] uppercase tracking-widest text-gold inline-flex items-center gap-1">
                {t("shop_now")} <Arrow className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {subs.map((s, i) => {
            const count = counts[s.key] ?? 0;
            return (
              <Link
                key={s.key}
                to={`/shop?cat=${category}&sub=${s.key}`}
                className="group relative overflow-hidden rounded-md border border-border bg-card p-5 md:p-6 flex flex-col justify-between min-h-[140px] hover:shadow-soft hover:border-primary/40 transition-smooth"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary) / 0.04) 0%, hsl(var(--accent) / 0.06) 100%)`,
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="font-display text-2xl text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {count}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-base md:text-lg text-primary leading-snug line-clamp-2">
                    {s.name[lang]}
                  </h3>
                  <span className="mt-2 text-[10px] uppercase tracking-widest text-gold inline-flex items-center gap-1">
                    {t("shop_now")} <Arrow className="w-3 h-3" />
                  </span>
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
