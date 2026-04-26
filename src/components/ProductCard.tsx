import { Product } from "@/data/products";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { lang, t } = useLang();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col">
      <div
        className="relative aspect-square overflow-hidden bg-muted border border-border/60 rounded-sm"
        style={{ background: `linear-gradient(135deg, hsl(36 40% 97%) 0%, hsl(${product.shade} / 0.35) 100%)` }}
      >
        {/* Product visual placeholder — elegant tinted disc */}
        <div className="absolute inset-0 grid place-items-center transition-smooth group-hover:scale-105">
          <div
            className="w-2/3 h-2/3 rounded-full shadow-elegant"
            style={{ background: `radial-gradient(circle at 30% 30%, hsl(${product.shade} / 0.95), hsl(${product.shade} / 0.7) 60%, hsl(${product.shade} / 0.4))` }}
          />
        </div>
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 text-[10px] uppercase tracking-widest text-primary/70 bg-background/80 backdrop-blur px-2 py-0.5 rounded-full">
          {t(`cat_${product.category}` as any)}
        </div>
      </div>
      <div className="pt-3 flex flex-col gap-1">
        <h3 className="font-display text-lg leading-tight text-primary line-clamp-1">
          {product.name[lang]}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">
            {product.price.toLocaleString()} <span className="text-xs text-muted-foreground">{t("afn")}</span>
          </span>
          <Button
            size="sm"
            variant={added ? "secondary" : "default"}
            onClick={handleAdd}
            className="h-8 px-3 text-xs gap-1"
          >
            {added ? <><Check className="w-3.5 h-3.5" />{t("added")}</> : <><Plus className="w-3.5 h-3.5" />{t("add_to_cart")}</>}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
