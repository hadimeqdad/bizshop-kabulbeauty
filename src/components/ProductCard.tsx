import { Product } from "@/data/products";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { lang, t } = useLang();
  const { add, setOpen } = useCart();
  const [added, setAdded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const outOfStock = product.stock !== null && product.stock !== undefined && product.stock <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    add(product);
    setAdded(true);
    setShowPopup(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col bg-card border border-border rounded-md overflow-hidden hover:shadow-soft transition-smooth relative">
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-xl p-6 mx-4 max-w-sm w-full shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">محصول اضافه شد!</h3>
            <p className="text-sm text-gray-500 mb-4">{product.name[lang]}</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setShowPopup(false); setOpen(true); }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-sm"
              >
                🛒 مشاهده سبد خرید
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg text-sm"
              >
                ادامه خرید
              </button>
            </div>
          </div>
        </div>
      )}
      <Link to={`/product/${product.id}`} className="block">
        <div
          className="relative aspect-square overflow-hidden"
          style={{ background: `linear-gradient(135deg, hsl(var(--background)) 0%, hsl(${product.shade} / 0.18) 100%)` }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name[lang]}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-105 ${outOfStock ? "opacity-50 grayscale" : ""}`}
            />
          ) : (
            <div className={`absolute inset-0 grid place-items-center transition-smooth group-hover:scale-105 ${outOfStock ? "opacity-50 grayscale" : ""}`}>
              <div className="relative w-1/2 h-3/4">
                <div
                  className="absolute top-[12%] left-1/2 -translate-x-1/2 w-1/3 h-[12%] rounded-t-sm"
                  style={{ background: `hsl(${product.shade} / 0.85)` }}
                />
                <div
                  className="absolute top-[24%] left-0 right-0 bottom-0 rounded-md shadow-elegant"
                  style={{ background: `linear-gradient(160deg, hsl(${product.shade}) 0%, hsl(${product.shade} / 0.7) 100%)` }}
                >
                  <div className="absolute inset-x-3 top-1/3 bottom-1/4 bg-background/85 rounded-sm grid place-items-center">
                    <span className="font-display text-[10px] tracking-widest text-foreground/60 uppercase">{product.brand}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 text-[10px] uppercase tracking-widest text-primary bg-background/90 backdrop-blur px-2 py-0.5 rounded-full border border-border">
            {t(`cat_${product.category}` as any)}
          </div>
          {outOfStock && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
                ناموجود
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-3 md:p-4 flex flex-col gap-1 flex-1">
        <span className="text-[10px] uppercase tracking-widest text-accent font-medium">{product.brand}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-base md:text-lg leading-snug text-primary line-clamp-2 min-h-[2.5rem] hover:underline">
            {product.name[lang]}
          </h3>
        </Link>
        <div className="mt-auto pt-2">
          {outOfStock ? (
            <div className="w-full h-8 flex items-center justify-center text-xs text-muted-foreground border border-border rounded">
              ⏳ موقتاً ناموجود
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">
                  {product.discount_price ? (
                    <>
                      <span className="line-through text-muted-foreground mr-1">{product.price.toLocaleString()}</span>
                      <span className="text-red-500">{product.discount_price.toLocaleString()}</span>
                    </>
                  ) : (
                    product.price.toLocaleString()
                  )}
                </span>
                <Button
                  size="sm"
                  variant={added ? "secondary" : "default"}
                  onClick={handleAdd}
                  className="h-7 px-2 text-xs gap-1"
                >
                  {added ? <><Check className="w-3 h-3" />{t("added")}</> : <><Plus className="w-3 h-3" />{t("add_to_cart")}</>}
                </Button>
              </div>
              <a
                href={`whatsapp://send?phone=93787628812&text=سلام، میخواستم ${product.name[lang]} را سفارش بدم`}
                className="w-full h-8 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded"
              >
                📲 سفارش از واتساپ
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
