import { useParams, Link, Navigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Check, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import ProductsLoader from "@/components/ProductsLoader";
import SEO from "@/components/SEO";

declare const fbq: Function;

const ProductDetail = () => {
  const { id } = useParams();
  const { lang, t, dir } = useLang();
  const { add, setOpen } = useCart();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { products, loading } = useProducts();

  const product = products.find(p => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    if (product) {
      fbq('track', 'ViewContent', {
        content_name: product.name['fa'],
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: 'AFN'
      });
    }
  }, [product]);

  if (loading) return <div className="container py-8"><ProductsLoader /></div>;

  if (!product) return <Navigate to="/shop" replace />;

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setShowModal(true);
    setTimeout(() => setAdded(false), 1400);
    fbq('track', 'AddToCart', {
      content_name: product.name['fa'],
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'AFN'
    });
  };

  const stock = (product as any).stock;
  const outOfStock = stock !== null && stock !== undefined && stock <= 0;
  const discountPrice = (product as any).discount_price;
  const hasDiscount = discountPrice !== null && discountPrice !== undefined && discountPrice < product.price;

  return (
    <section className="container py-8 md:py-14">
      <SEO
        title={`${product.name[lang]} — بیزشاپ`}
        description={product.details?.[lang]?.slice(0, 155) || `خرید ${product.name[lang]} از برند ${product.brand} در بیزشاپ کابل`}
        keywords={`${product.name.fa}, ${product.name.en}, ${product.brand}, بیزشاپ, دکتر بیز کابل`}
        image={product.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name[lang],
          image: product.image,
          brand: { "@type": "Brand", name: product.brand },
          offers: {
            "@type": "Offer",
            priceCurrency: "AFN",
            price: hasDiscount ? discountPrice : product.price,
            availability: outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
          },
        }}
      />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 mx-4 w-full max-w-sm flex flex-col items-center gap-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center">
              <Check className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">محصول اضافه شد!</h2>
            <p className="text-gray-500 text-sm text-center">{product.name['fa']}</p>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              onClick={() => { setShowModal(false); setOpen(true); }}
            >
              <ShoppingCart className="w-5 h-5" />
              مشاهده سبد خرید
            </button>
            <button
              className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50"
              onClick={() => setShowModal(false)}
            >
              ادامه خرید
            </button>
          </div>
        </div>
      )}

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
            {hasDiscount && (
              <span className="text-[10px] uppercase tracking-widest text-white bg-red-500 px-2 py-0.5 rounded-full w-fit">
                {lang === "fa" ? "تخفیف ویژه" : "Special Offer"}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-end gap-3">
            {hasDiscount ? (
              <>
                <span className="font-display text-4xl text-red-500">{discountPrice.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground mb-1">{t("afn")}</span>
                <span className="font-display text-2xl text-muted-foreground line-through mb-0.5">{product.price.toLocaleString()}</span>
              </>
            ) : (
              <>
                <span className="font-display text-4xl text-primary">{product.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground mb-1">{t("afn")}</span>
              </>
            )}
          </div>

          {stock !== null && stock !== undefined && (
            <div className="mt-3 flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${outOfStock ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-green-500/10 text-green-600 border-green-500/30"}`}>
                {outOfStock
                  ? (lang === "fa" ? "ناموجود" : "Out of Stock")
                  : (lang === "fa" ? `موجودی: ${stock} عدد` : `In Stock: ${stock}`)}
              </span>
            </div>
          )}

          <Button
            size="lg"
            variant={added ? "secondary" : "default"}
            onClick={handleAdd}
            disabled={outOfStock}
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
