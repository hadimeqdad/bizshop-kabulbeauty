import { Link, useParams, Navigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { products, Category as Cat } from "@/data/products";
import { SUBCATEGORIES } from "@/data/subcategories";
import { ArrowRight, ArrowLeft, LayoutGrid, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const VALID: Cat[] = ["medicinal", "healthcare", "cosmetics", "food"];

const CategoryPage = () => {
  const { cat } = useParams();
  const { t, lang, dir } = useLang();
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  if (!cat || !VALID.includes(cat as Cat)) return <Navigate to="/shop" replace />;
  const category = cat as Cat;
  const subs = SUBCATEGORIES[category];

  if (!subs || subs.length === 0) {
    return <Navigate to={`/shop?cat=${category}`} replace />;
  }

  const countFor = (subKey: string) =>
    products.filter(p => p.category === category && p.subcategory === subKey).length;

  const totalCount = products.filter(p => p.category === category).length;

  const shadeFor = (subKey: string) => {
    const p = products.find(p => p.category === category && p.subcategory === subKey);
    return p?.shade ?? "150 40% 40%";
  };

  const firstImageFor = (subKey: string) =>
    products.find(p => p.category === category && p.subcategory === subKey)?.image;

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, hsl(var(--primary)) 0%, transparent 40%), radial-gradient(circle at 80% 90%, hsl(var(--accent)) 0%, transparent 45%)",
          }}
        />
        <div className="container relative py-10 md:py-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-accent mb-3">{t("subcategories")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary">
            {t(`cat_${category}` as any)}
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">{t("browse_sub")}</p>
        </div>
      </section>

      {/* Subcategory list */}
      <section className="container py-6 md:py-10">
        {/* All products - featured banner */}
        <Link
          to={`/shop?cat=${category}`}
          className="group relative block mb-4 overflow-hidden rounded-2xl border border-border shadow-soft"
        >
          <div
            className="absolute inset-0 transition-smooth group-hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(120deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 55%, hsl(var(--accent) / 0.9) 100%)",
            }}
          />
          <div className="relative flex items-center gap-4 p-4 md:p-5">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/15 backdrop-blur-sm grid place-items-center ring-1 ring-background/30">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg md:text-2xl text-background leading-tight">
                {t("all_products")}
              </h3>
              <p className="text-background/80 text-xs md:text-sm mt-0.5">
                {totalCount} {t(`cat_${category}` as any)}
              </p>
            </div>
            <Chevron className="w-5 h-5 text-background/90 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Sub list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subs.map(sub => {
            const count = countFor(sub.key);
            const img = firstImageFor(sub.key);
            const shade = shadeFor(sub.key);
            return (
              <Link
                key={sub.key}
                to={`/shop?cat=${category}&sub=${sub.key}`}
                className="group relative flex items-center gap-4 p-3 md:p-4 rounded-xl border border-border bg-card hover:border-accent/60 hover:shadow-soft transition-smooth"
              >
                {/* Thumb */}
                <div
                  className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-1 ring-border"
                  style={{ background: `linear-gradient(135deg, hsl(${shade} / 0.85), hsl(${shade} / 0.4))` }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={sub.name[lang]}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-90 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <LayoutGrid className="w-6 h-6 text-background/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base md:text-lg text-primary leading-snug line-clamp-2">
                    {sub.name[lang]}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        count > 0 ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count} {t("featured")}
                    </span>
                  </div>
                </div>

                <Chevron className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-smooth" />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
