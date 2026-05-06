import { MapPin, Instagram, Facebook, Send, Leaf } from "lucide-react";
import { useLang } from "@/lib/i18n";

const WA = "https://wa.me/message/64F75TYQX77KI1";

const Footer = () => {
  const { t, lang } = useLang();
  return (
    <footer className="mt-24 border-t border-border bg-ink text-background">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-md bg-gold text-ink grid place-items-center">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-display text-2xl text-background">{t("brand")}</span>
          </div>
          <p className="text-sm text-background/70 max-w-sm leading-relaxed">{t("hero_sub")}</p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-3">{t("visit")}</h4>
          <p className="text-sm text-background/70 flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{t("address")}</span>
          </p>
          <a href={WA} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2 text-sm text-gold hover:text-background transition-smooth">
            <Send className="w-4 h-4" /> {t("whatsapp")}
          </a>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-3">{t("follow")}</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-full border border-background/20 hover:bg-gold hover:text-ink hover:border-gold transition-smooth">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 grid place-items-center rounded-full border border-background/20 hover:bg-gold hover:text-ink hover:border-gold transition-smooth">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={WA} aria-label="WhatsApp" target="_blank" rel="noopener" className="w-9 h-9 grid place-items-center rounded-full border border-background/20 hover:bg-gold hover:text-ink hover:border-gold transition-smooth">
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container py-5 text-xs text-background/60 flex flex-col md:flex-row gap-2 items-center justify-between">
          <span>© {new Date().getFullYear()} {t("brand")}. {t("rights")}.</span>
          <span>{lang === "" ? "" : ""}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
