import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, Globe, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { t, lang, toggle } = useLang();
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/shop", label: t("nav_shop") },
    { to: "/about", label: t("nav_about") },
    { to: "/contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full gradient-rose grid place-items-center shadow-rose">
            <span className="font-display text-burgundy-deep text-lg">B</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-xl md:text-2xl text-primary">{t("brand")}</div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase hidden sm:block">
              {lang === "fa" ? "BizShop" : "بیزشاپ"}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-smooth hover:text-accent relative py-1 ${isActive ? "text-accent" : "text-foreground/80"}`
              }>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5 text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            {lang === "fa" ? "EN" : "فا"}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label={t("cart")} className="relative">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 rtl:right-auto rtl:-left-0.5 bg-accent text-accent-foreground text-[10px] font-medium rounded-full w-4 h-4 grid place-items-center">
                {count}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobile(true)} aria-label="Menu">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {mobile && (
        <div className="md:hidden fixed inset-0 z-50 bg-background animate-fade-up">
          <div className="container flex items-center justify-between h-16">
            <span className="font-display text-2xl text-primary">{t("brand")}</span>
            <Button variant="ghost" size="icon" onClick={() => setMobile(false)}><X className="w-5 h-5" /></Button>
          </div>
          <nav className="container flex flex-col gap-2 mt-8">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setMobile(false)}
                className={({ isActive }) =>
                  `font-display text-3xl py-3 border-b border-border/50 ${isActive ? "text-accent" : "text-foreground"}`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
