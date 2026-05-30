import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Copy, Check } from "lucide-react";
import SEO from "@/components/SEO";

const Referral = () => {
  const { lang } = useLang();
  const fa = lang === "fa";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generateCode = (name: string) => {
    const clean = name.trim().toUpperCase().replace(/\s+/g, "").slice(0, 5);
    const num = Math.floor(Math.random() * 900) + 100;
    return `${clean}${num}`;
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      setError(fa ? "لطفاً اسم و شماره رو وارد کنید" : "Please enter name and phone");
      return;
    }
    setLoading(true);
    setError("");

    // چک کن که قبلاً ثبت نشده
    const { data: existing } = await supabase
      .from("referrals")
      .select("referral_code")
      .eq("phone", phone.trim())
      .single();

    if (existing) {
      setCode(existing.referral_code);
      setLoading(false);
      return;
    }

    const referralCode = generateCode(name);

    // در جدول referrals ذخیره کن
    const { error: refError } = await supabase
      .from("referrals")
      .insert({ name: name.trim(), phone: phone.trim(), referral_code: referralCode });

    if (refError) {
      setError(fa ? "خطا در ثبت — دوباره امتحان کنید" : "Error — please try again");
      setLoading(false);
      return;
    }

    // در جدول coupons هم ذخیره کن
    await supabase.from("coupons").insert({
      code: referralCode,
      discount_percent: 10,
      active: true,
      max_uses: 100,
      used_count: 0,
    });

    setCode(referralCode);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container py-12 md:py-20 max-w-lg">
      <SEO
        title="کد معرف دوستان — بیزشاپ"
        description="دوستت رو معرفی کن و هر دو ۱۰٪ تخفیف بگیرید"
        keywords="کد تخفیف، معرفی دوست، بیزشاپ"
      />

      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-gold/20 grid place-items-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-gold" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-primary mb-3">
          {fa ? "دوستت رو معرفی کن" : "Refer a Friend"}
        </h1>
        <p className="text-muted-foreground">
          {fa
            ? "کد معرف بگیر — دوستت با کد تو ۱۰٪ تخفیف میگیره و تو هم برای خرید بعدیت ۱۰٪ تخفیف داری!"
            : "Get your referral code — your friend gets 10% off and so do you!"}
        </p>
      </div>

      {!code ? (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <Label>{fa ? "اسم شما" : "Your Name"}</Label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={fa ? "مثلاً: علی" : "e.g. Ali"}
              className="mt-1"
            />
          </div>
          <div>
            <Label>{fa ? "شماره موبایل" : "Phone Number"}</Label>
            <Input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder={fa ? "مثلاً: 0700123456" : "e.g. 0700123456"}
              className="mt-1"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? (fa ? "در حال ساخت..." : "Generating...") : (fa ? "کد معرف بگیر" : "Get Referral Code")}
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {fa ? "کد معرف شما:" : "Your referral code:"}
          </p>
          <div className="font-mono text-3xl font-bold text-primary tracking-widest">
            {code}
          </div>
          <Button onClick={handleCopy} variant="outline" className="gap-2 w-full">
            {copied ? <><Check className="w-4 h-4" />{fa ? "کپی شد!" : "Copied!"}</> : <><Copy className="w-4 h-4" />{fa ? "کپی کد" : "Copy Code"}</>}
          </Button>
          <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
            {fa
              ? "این کد رو به دوستت بده — با این کد ۱۰٪ تخفیف میگیره و تو هم برای خرید بعدیت ۱۰٪ تخفیف خواهی داشت!"
              : "Share this code with your friend — they get 10% off and so do you on your next purchase!"}
          </div>
        </div>
      )}
    </section>
  );
};

export default Referral;
