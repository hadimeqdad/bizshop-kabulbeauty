import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { products, Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const cats: ("all" | Category)[] = ["all", "lips", "eyes", "face", "skin", "fragrance"];

const Shop = () => {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const initial = (params.get("cat") as Category | null) ?? "all";
  const [active, setActive] = useState<"all" | Category>(initial);

  useEffect(() => {
    if (active === "all") params.delete("cat"); else params.set("cat", active);
    setParams(params, { replace: true });
  }, [active]);

  const filtered = useMemo(
    () => active === "all" ? products : products.filter(p => p.category === active),
    [active]
  );

  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container py-14 md:py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("featured_sub")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary">{t("shop_title")}</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">{t("shop_sub")}</p>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {cats.map(c => (
            <Button
              key={c}
              variant={active === c ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(c)}
              className="rounded-full px-5"
            >
              {c === "all" ? t("all") : t(`cat_${c}` as any)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
};

export default Shop;
