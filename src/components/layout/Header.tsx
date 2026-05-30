import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, Globe, X, Search, Leaf } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const { t, lang, toggle } = useLang();
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/shop", label: t("nav_shop") },
    { to: "/about", label: t("nav_about") },
    { to: "/contact", label: t("nav_contact") },
    { to: "/referral", label: lang === "fa" ? "معرفی دوست 🎁" : "Refer a Friend 🎁" },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setMobile(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between gap-4 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-md bg-primary text-primary-foreground grid place-items-center shadow-soft">
            <Leaf className="w-5 h-5" />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl md:text-2xl text-primary">{t("brand")}</div>
            <div className="text-[10px] tracking-[0.25em] text-accent uppercase hidden sm:block">
              {lang === "fa" ? "BizShop" : "بیزشاپ"}
            </div>
          </div>
        </Link>

        {/* Desktop search */}
        <form onSubmit={submitSearch} className="hidden lg:flex flex-1 max-w-md relative">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t("search")}
            className="pl-10 rtl:pl-3 rtl:pr-10 h-10 rounded-full bg-secondary/50 border-border"
          />
        </form>

        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
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

        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5 text-xs uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            {lang === "fa" ? "EN" : "فا"}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label={t("cart")} className="relative">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 rtl:right-auto rtl:-left-0.5 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] px-1 grid place-items-center">
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
        <div className="md:hidden fixed inset-0 z-[100] bg-background animate-fade-up">
          <div className="container flex items-center justify-between h-16">
            <span className="font-display text-2xl text-primary">{t("brand")}</span>
            <Button variant="ghost" size="icon" onClick={() => setMobile(false)}><X className="w-5 h-5" /></Button>
          </div>
          <div className="container">
            <form onSubmit={submitSearch} className="relative mt-2">
              <Search className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t("search")}
                className="pl-10 rtl:pl-3 rtl:pr-10 h-11 rounded-full bg-secondary/50"
              />
            </form>
          </div>
          <nav className="container flex flex-col gap-1 mt-6">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setMobile(false)}
                className={({ isActive }) =>
                  `font-display text-2xl py-3 border-b border-border ${isActive ? "text-accent" : "text-foreground"}`
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
