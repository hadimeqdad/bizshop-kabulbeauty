import { MapPin, Instagram, Facebook, Send, Leaf } from "lucide-react";
import { useLang } from "@/lib/i18n";

const WA = "https://wa.me/message/64F75TYQX77KI1";

const Footer = () => {
  const { t, lang } = useLang();
  return (
    <footer className="mt-24 border-t border-border bg-ink text-background">
      <div className="container py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold text-ink grid place-items-center shadow-lg">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-display text-2xl text-background">{t("brand")}</span>
          </div>
          <p className="text-sm text-background/60 max-w-sm leading-relaxed">{t("hero_sub")}</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gold mb-4 border-b border-background/10 pb-2">{t("visit")}</h4>
          <a
            href="https://maps.google.com/?q=34.509287,69.138115"
            target="_blank"
            rel="noopener"
            className="group flex items-start gap-3 text-sm text-background/60 hover:text-gold transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-background/5 group-hover:bg-gold/10 grid place-items-center shrink-0 transition-all duration-300">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="mt-1 leading-relaxed">{t("address")}</span>
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener"
            className="group flex items-center gap-3 text-sm text-background/60 hover:text-gold transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-background/5 group-hover:bg-gold/10 grid place-items-center shrink-0 transition-all duration-300">
              <Send className="w-4 h-4" />
            </div>
            <span>{t("whatsapp")}</span>
          </a>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gold mb-4 border-b border-background/10 pb-2">{t("follow")}</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-xl border border-background/10 hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 grid place-items-center rounded-xl border border-background/10 hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={WA} aria-label="WhatsApp" target="_blank" rel="noopener" className="w-10 h-10 grid place-items-center rounded-xl border border-background/10 hover:bg-gold hover:text-ink hover:border-gold transition-all duration-300">
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container py-5 text-xs text-background/40 flex flex-col md:flex-row gap-2 items-center justify-between">
          <span>© {new Date().getFullYear()} {t("brand")}. {t("rights")}.</span>
          <span></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
