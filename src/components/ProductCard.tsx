import { Product } from "@/data/products";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Plus, Check, ShoppingCart } from "lucide-react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl p-8 mx-4 w-full max-w-sm flex flex-col items-center gap-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center">
              <Check className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">محصول اضافه شد!</h2>
            <p className="text-gray-500 text-sm text-center">{product.name['fa']}</p>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              onClick={() => { setShowPopup(false); setOpen(true); }}
            >
              <ShoppingCart className="w-5 h-5" />
              مشاهده سبد خرید
            </button>
            <button
              className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50"
              onClick={() => setShowPopup(false)}
            >
              ادامه خرید
            </button>
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
              ⏳ موجودی به اتمام رسید
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
