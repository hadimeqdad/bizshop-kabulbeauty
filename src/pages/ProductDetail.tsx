import { useParams, Link, Navigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ProductsLoader from "@/components/ProductsLoader";
import SEO from "@/components/SEO";

declare const fbq: Function;

const ProductDetail = () => {
  const { id } = useParams();
  const { lang, t, dir } = useLang();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
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
    fbq('track', 'AddToCart', {
      content_name: product.name['fa'],
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'AFN'
    });
    window.open(
      `whatsapp://send?phone=93787628812&text=سلام، میخواستم ${product.name['fa']} را سفارش بدم - قیمت: ${discountPrice || product.price} افغانی`,
      "_blank"
    );
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
            variant="default"
            onClick={handleAdd}
            disabled={outOfStock}
            className="mt-6 gap-2 w-full md:w-auto bg-green-500 hover:bg-green-600"
          >
            📲 سفارش از واتساپ
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
