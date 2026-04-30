import { Link, useParams, Navigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { products, Category as Cat } from "@/data/products";
import { SUBCATEGORIES } from "@/data/subcategories";
import { ArrowRight, ArrowLeft, LayoutGrid } from "lucide-react";

const VALID: Cat[] = ["medicinal", "healthcare", "cosmetics", "food"];

const CategoryPage = () => {
  const { cat } = useParams();
  const { t, lang, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  if (!cat || !VALID.includes(cat as Cat)) return <Navigate to="/shop" replace />;
  const category = cat as Cat;
  const subs = SUBCATEGORIES[category];

  // If no subcategories defined, send user to Shop filtered by this category.
  if (!subs || subs.length === 0) {
    return <Navigate to={`/shop?cat=${category}`} replace />;
  }

  const countFor = (subKey: string) =>
    products.filter(p => p.category === category && p.subcategory === subKey).length;

  const totalCount = products.filter(p => p.category === category).length;

  // Pick a tint shade per subcategory from its products (or neutral fallback)
  const shadeFor = (subKey: string) => {
    const p = products.find(p => p.category === category && p.subcategory === subKey);
    return p?.shade ?? "150 40% 40%";
  };

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-12 md:py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("subcategories")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary">
            {t(`cat_${category}` as any)}
          </h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">{t("browse_sub")}</p>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {/* All products card */}
          <Link
            to={`/shop?cat=${category}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-md shadow-soft border border-border bg-card"
          >
            <div
              className="absolute inset-0 transition-smooth group-hover:scale-105"
              style={{ background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 100%)` }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <LayoutGrid className="w-12 h-12 text-primary-foreground/90" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
              <h3 className="font-display text-xl md:text-2xl text-background">{t("all_products")}</h3>
              <span className="text-[10px] uppercase tracking-widest text-gold inline-flex items-center gap-1 mt-1">
                {totalCount} {t("afn") /* reused label ok-ish, remove */ ? "" : ""}
                {totalCount} <Arrow className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {subs.map(sub => {
            const count = countFor(sub.key);
            return (
              <Link
                key={sub.key}
                to={`/shop?cat=${category}&sub=${sub.key}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-md shadow-soft border border-border"
              >
                <div
                  className="absolute inset-0 transition-smooth group-hover:scale-105"
                  style={{ background: `linear-gradient(160deg, hsl(${shadeFor(sub.key)}) 0%, hsl(${shadeFor(sub.key)} / 0.6) 100%)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                  <h3 className="font-display text-lg md:text-xl text-background leading-snug line-clamp-2 min-h-[3rem]">
                    {sub.name[lang]}
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-gold inline-flex items-center gap-1 mt-1">
                    {count} <Arrow className="w-3 h-3" />
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
