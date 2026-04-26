import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, MessageCircle, Mail } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(5).max(800),
});

const Contact = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    toast.success(t("msg_sent"));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container py-14 md:py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("brand")}</p>
          <h1 className="font-display text-4xl md:text-6xl text-primary">{t("contact_title")}</h1>
          <p className="text-muted-foreground mt-3">{t("contact_sub")}</p>
        </div>
      </section>

      <section className="container py-16 grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-border rounded-sm p-5 bg-card">
              <MapPin className="w-5 h-5 text-accent mb-2" />
              <h3 className="font-display text-lg text-primary mb-1">{t("visit")}</h3>
              <p className="text-sm text-muted-foreground">{t("address")}</p>
            </div>
            <a href="https://wa.me/message/64F75TYQX77KI1" target="_blank" rel="noopener" className="border border-border rounded-sm p-5 bg-card hover:bg-muted transition-smooth block">
              <MessageCircle className="w-5 h-5 text-accent mb-2" />
              <h3 className="font-display text-lg text-primary mb-1">{t("whatsapp")}</h3>
              <p className="text-sm text-muted-foreground">+93 — chat now</p>
            </a>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-sm border border-border shadow-soft">
            <iframe
              title="BizShop Kabul Location"
              src="https://www.google.com/maps?q=G3F6%2BX5J%20Kabul%20100513&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form onSubmit={submit} className="border border-border rounded-sm p-6 md:p-8 bg-card space-y-4 self-start">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-accent" />
            <h2 className="font-display text-2xl text-primary">{t("send_msg")}</h2>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("name")}</label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={80} required className="mt-1" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("email")}</label>
            <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} maxLength={160} required className="mt-1" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">{t("message")}</label>
            <Textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} maxLength={800} required className="mt-1" />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full">{t("send")}</Button>
        </form>
      </section>
    </>
  );
};

export default Contact;
