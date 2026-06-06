import { useParams, Link, Navigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star } from "lucide-react";
import { useEffect, useState } from "react";
import ProductsLoader from "@/components/ProductsLoader";
import SEO from "@/components/SEO";
import { useReviews } from "@/hooks/useReviews";

declare const fbq: Function;

const StarRating = ({ value, onChange }: { value: number; onChange?: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-5 h-5 cursor-pointer ${s <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
        onClick={() => onChange?.(s)}
      />
    ))}
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const { lang, t, dir } = useLang();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const { products, loading } = useProducts();

  const product = products.find(p => p.id === id);
  const { reviews, submitted, submitReview } = useReviews(id || "");

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [sending, setSending] = useState(false);

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
    setTimeout(() => {
      window.open(
        `whatsapp://send?phone=93787628812&text=سلام، میخواستم ${product.name['fa']} را سفارش بدم - قیمت: ${discountPrice || product.price} افغانی`,
        "_blank"
      );
    }, 300);
  };

  const handleSubmitReview = async () => {
    if (!reviewName || !reviewComment) return;
    setSending(true);
    await submitReview(reviewName, reviewRating, reviewComment);
    setSending(false);
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

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              variant="default"
              onClick={handleAdd}
              disabled={outOfStock}
              className="gap-2 w-full sm:w-auto bg-green-500 hover:bg-green-600"
            >
              📲 سفارش از واتساپ
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2 w-full sm:w-auto"
            >
              💬 نظرات مشتریان
            </Button>
          </div>

          {product.details && (
            <div className="mt-10 prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 text-foreground/90 bg-secondary/40 border border-border rounded-lg p-5">
{product.details[lang]}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* بخش نظرات */}
      <div id="reviews-section" className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-2xl text-primary mb-8">نظرات مشتریان</h2>

        {reviews.length > 0 ? (
          <div className="space-y-4 mb-10">
            {reviews.map((review) => (
              <div key={review.id} className="bg-secondary/40 border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{review.name}</span>
                  <StarRating value={review.rating} />
                </div>
                <p className="text-sm text-foreground/80">{review.comment}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {new Date(review.created_at).toLocaleDateString("fa-IR")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-8">هنوز نظری ثبت نشده.</p>
        )}

        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-600 text-sm">
            ✅ نظر شما ثبت شد و ظرف ۲ ساعت نمایش داده می‌شود.
          </div>
        ) : (
          <div className="bg-secondary/40 border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-medium">نظر خود را بنویسید</h3>
            <input
              type="text"
              placeholder="نام شما"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div>
              <p className="text-sm text-muted-foreground mb-1">امتیاز:</p>
              <StarRating value={reviewRating} onChange={setReviewRating} />
            </div>
            <textarea
              placeholder="نظر شما..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <Button onClick={handleSubmitReview} disabled={sending} className="w-full md:w-auto">
              {sending ? "در حال ارسال..." : "ارسال نظر"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
