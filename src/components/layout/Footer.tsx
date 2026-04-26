import { Link } from "react-router-dom";
import { MapPin, Instagram, Facebook, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";

const WA = "https://wa.me/message/64F75TYQX77KI1";

const Footer = () => {
  const { t, lang } = useLang();
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full gradient-rose grid place-items-center shadow-rose">
              <span className="font-display text-burgundy-deep text-lg">B</span>
            </div>
            <span className="font-display text-2xl text-primary">{t("brand")}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">{t("hero_sub")}</p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-primary mb-3">{t("visit")}</h4>
          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{t("address")}</span>
          </p>
          <a href={WA} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-smooth">
            <Send className="w-4 h-4" /> {t("whatsapp")}
          </a>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-primary mb-3">{t("follow")}</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-smooth">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 grid place-items-center rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-smooth">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={WA} aria-label="WhatsApp" target="_blank" rel="noopener" className="w-9 h-9 grid place-items-center rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-smooth">
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container py-5 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 items-center justify-between">
          <span>© {new Date().getFullYear()} {t("brand")}. {t("rights")}.</span>
          <span>{lang === "fa" ? "ساخته شده با ❤ در کابل" : "Made with ❤ in Kabul"}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
