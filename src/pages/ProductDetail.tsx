import { useParams, Link, Navigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Check } from "lucide-react";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { lang, t, dir } = useLang();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const { products, loading } = useProducts();

  const product = products.find(p => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (loading) return <div className="container py-20 text-center text-muted-foreground">...</div>;

  if (!product) return <Navigate to="/shop" replace />;

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <section className="container py-8 md:py-14">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
        {t("nav_shop")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-14">
        <div
          className="relative aspect-square rounded-lg overflow-hidden border border-border"
          style={{ background: `linear-gradient(135deg, hsl(var(--background)) 0%, hsl(${product.shade} / 0.18) 100%)` }}
        >
          {product.image ? (
            <img src={product.image} alt={product.name[lang]} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-2xl text-primary/40 uppercase tracking-widest">{product.brand}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">{product.brand}</span>
          <h1 className="font-display text-3xl md:text-5xl text-primary mt-2">{product.name[lang]}</h1>

          <div className="mt-3 inline-flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-primary bg-secondary px-2 py-0.5 rounded-full border border-border w-fit">
              {t(`cat_${product.category}` as any)}
            </span>
          </div>

          <div className="mt-6 flex items-end gap-2">
            <span className="font-display text-4xl text-primary">{product.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground mb-1">{t("afn")}</span>
          </div>

          <Button
            size="lg"
            variant={added ? "secondary" : "default"}
            onClick={handleAdd}
            className="mt-6 gap-2 w-full md:w-auto"
          >
            {added ? <><Check className="w-4 h-4" />{t("added")}</> : <><Plus className="w-4 h-4" />{t("add_to_cart")}</>}
          </Button>

          {product.details && (
            <div className="mt-10 prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 text-foreground/90 bg-secondary/40 border border-border rounded-lg p-5">
{product.details[lang]}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
