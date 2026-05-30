import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, Tag, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CartSidebar = () => {
  const { items, open, setOpen, update, remove, total, count, clear, coupon, setCoupon, discountedTotal } = useCart();
  const { t, lang, dir } = useLang();
  const fa = lang === "fa";

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    const { data, error } = await supabase
      .from("coupons")
      .select("code, discount_percent, expires_at, active, max_uses, used_count")
      .eq("code", couponInput.trim().toUpperCase())
      .single();

    if (error || !data || !data.active) {
      setCouponError(fa ? "کد تخفیف معتبر نیست" : "Invalid coupon code");
    } else if (data.expires_at && new Date(data.expires_at) < new Date()) {
      setCouponError(fa ? "کد تخفیف منقضی شده" : "Coupon has expired");
    } else if (data.max_uses !== null && data.used_count >= data.max_uses) {
      setCouponError(fa ? "ظرفیت استفاده از این کد تمام شده" : "Coupon usage limit reached");
    } else {
      setCoupon({ code: data.code, percent: data.discount_percent });
      setCouponInput("");
    }
    setCouponLoading(false);
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError("");
  };
  
const buildWaMessage = () => {
  const header = "🛒 سفارش جدید:";
  const lines = items.map((i, idx) =>
    `${idx + 1}. ${i.product.name.fa} x${i.qty} = ${(i.product.price * i.qty).toLocaleString()} افغانی`
  );
  const couponLine = coupon ? `تخفیف: ${coupon.code} (${coupon.percent}%)` : "";
  const footer = `مجموع: ${discountedTotal.toLocaleString()} افغانی`;
  const referral = `\n🎁 دوستت رو معرفی کن و ۱۰٪ تخفیف بگیر!\nbizshopkabul.com/referral`;
  const parts = [header, ...lines];
  if (couponLine) parts.push(couponLine);
  parts.push(footer);
  parts.push(referral);
  return encodeURIComponent(parts.join("\n"));
};

  const handleCheckout = async () => {
    if (coupon) {
      await supabase.rpc("increment_coupon_usage", { coupon_code: coupon.code });
    }
    clear();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={dir === "rtl" ? "left" : "right"} className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-primary flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> {t("cart")} {count > 0 && <span className="text-sm text-muted-foreground">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-center">
            <div>
              <div className="w-20 h-20 rounded-full gradient-rose mx-auto grid place-items-center mb-4 opacity-70">
                <ShoppingBag className="w-8 h-8 text-burgundy-deep" />
              </div>
              <p className="text-muted-foreground">{t("cart_empty")}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6 divide-y divide-border/60">
              {items.map(i => (
                <div key={i.product.id} className="py-4 flex gap-3">
                  <div
                    className="w-16 h-16 rounded-sm shrink-0 grid place-items-center"
                    style={{ background: `linear-gradient(135deg, hsl(36 40% 97%), hsl(${i.product.shade} / 0.4))` }}
                  >
                    <div className="w-9 h-9 rounded-full" style={{ background: `hsl(${i.product.shade})` }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-base text-primary truncate">{i.product.name[lang]}</h4>
                    <p className="text-xs text-muted-foreground">{i.product.price.toLocaleString()} {t("afn")}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => update(i.product.id, i.qty - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">{i.qty}</span>
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => update(i.product.id, i.qty + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto rtl:ml-0 rtl:mr-auto text-muted-foreground hover:text-destructive" onClick={() => remove(i.product.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">

              {!coupon ? (
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <Input
                      placeholder={fa ? "کد تخفیف" : "Coupon code"}
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value); setCouponError(""); }}
                      className="h-9 text-sm"
                      onKeyDown={e => e.key === "Enter" && applyCoupon()}
                    />
                    <Button size="sm" variant="outline" onClick={applyCoupon} disabled={couponLoading} className="gap-1 shrink-0">
                      <Tag className="w-3.5 h-3.5" />
                      {fa ? "اعمال" : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-xs text-destructive">{couponError}</p>}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded px-3 py-2">
                  <span className="text-xs text-green-600 font-medium">
                    {coupon.code} — {coupon.percent}% {fa ? "تخفیف" : "off"}
                  </span>
                  <button onClick={removeCoupon}>
                    <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              )}

              <div className="space-y-1">
                {coupon && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{fa ? "قیمت اصلی" : "Original"}</span>
                    <span className="line-through text-muted-foreground">{total.toLocaleString()} {t("afn")}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">{t("total")}</span>
                  <span className="font-display text-2xl text-primary">{discountedTotal.toLocaleString()} {t("afn")}</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full gap-2" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <a href={`https://wa.me/93787628812?text=${buildWaMessage()}`} target="_blank" rel="noopener" onClick={handleCheckout}>
                  <MessageCircle className="w-5 h-5" /> {t("checkout_wa")}
                </a>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
