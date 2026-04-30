import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { products, Category, Brand } from "@/data/products";
import { SUBCATEGORIES, getSubcategory } from "@/data/subcategories";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const cats: ("all" | Category)[] = ["all", "medicinal", "healthcare", "cosmetics", "food"];
const brands: ("all" | Brand)[] = ["all", "Dr.Biz", "Setin", "Biene Star", "Dynamin"];

const Shop = () => {
  const { t, lang } = useLang();
  const [params, setParams] = useSearchParams();
  const initialCat = (params.get("cat") as Category | null) ?? "all";
  const initialSub = params.get("sub") ?? "all";
  const [active, setActive] = useState<"all" | Category>(initialCat);
  const [sub, setSub] = useState<string>(initialSub);
  const [brand, setBrand] = useState<"all" | Brand>("all");
  const [query, setQuery] = useState("");

  // Sync URL
  useEffect(() => {
    const next = new URLSearchParams(params);
    if (active === "all") next.delete("cat"); else next.set("cat", active);
    if (sub === "all") next.delete("sub"); else next.set("sub", sub);
    setParams(next, { replace: true });
  }, [active, sub]);

  // Reset sub when category changes away from its parent
  useEffect(() => {
    if (active === "all") { setSub("all"); return; }
    if (sub !== "all" && !getSubcategory(active as Category, sub)) setSub("all");
  }, [active]);

  // Listen to external URL changes (e.g. coming from Category page)
  useEffect(() => {
    const c = (params.get("cat") as Category | null) ?? "all";
    const s = params.get("sub") ?? "all";
    if (c !== active) setActive(c);
    if (s !== sub) setSub(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.toString()]);

  const subList = active !== "all" ? SUBCATEGORIES[active as Category] ?? [] : [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      if (active !== "all" && p.category !== active) return false;
      if (sub !== "all" && p.subcategory !== sub) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (q && !p.name.en.toLowerCase().includes(q) && !p.name.fa.includes(q) && !p.brand.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [active, sub, brand, query]);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container py-12 md:py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("featured_sub")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary">{t("shop_title")}</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">{t("shop_sub")}</p>

          {/* Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t("search")}
              className="pl-10 rtl:pl-3 rtl:pr-10 h-11 rounded-full bg-background border-border"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 text-muted-foreground hover:text-foreground"
                aria-label="clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {cats.map(c => (
            <Button
              key={c}
              variant={active === c ? "default" : "outline"}
              size="sm"
              onClick={() => { setActive(c); setSub("all"); }}
              className="rounded-full px-5"
            >
              {c === "all" ? t("all") : t(`cat_${c}` as any)}
            </Button>
          ))}
        </div>

        {/* Subcategory filter */}
        {subList.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <Button
              variant={sub === "all" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSub("all")}
              className="rounded-full px-4 text-xs h-8"
            >
              {t("all_products")}
            </Button>
            {subList.map(s => (
              <Button
                key={s.key}
                variant={sub === s.key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSub(s.key)}
                className="rounded-full px-4 text-xs h-8"
              >
                {s.name[lang]}
              </Button>
            ))}
          </div>
        )}

        {/* Brand filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {brands.map(b => (
            <Button
              key={b}
              variant={brand === b ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setBrand(b)}
              className="rounded-full px-4 text-xs h-8"
            >
              {b === "all" ? t("all") : b}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">{t("no_results")}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
};

export default Shop;
