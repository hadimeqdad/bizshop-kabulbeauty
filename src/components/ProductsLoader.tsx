import { Leaf } from "lucide-react";
import { useLang } from "@/lib/i18n";

const ProductsLoader = () => {
  const { lang } = useLang();
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
        {/* Spinning gold arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent animate-spin" style={{ animationDuration: "1.2s" }} />
        {/* Inner pulsing leaf */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-12 h-12 rounded-full bg-primary grid place-items-center animate-float-pulse">
            <Leaf className="w-6 h-6 text-gold" />
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.4em] text-accent animate-pulse">
        {lang === "fa" ? "در حال بارگذاری" : "Loading"}
      </p>
      {/* Skeleton grid hint */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-md bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsLoader;
