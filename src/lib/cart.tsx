import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem { product: Product; qty: number; }

interface CartCtx {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  coupon: { code: string; percent: number } | null;
  setCoupon: (c: { code: string; percent: number } | null) => void;
  discountedTotal: number;
}

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("bizshop-cart") || "[]"); } catch { return []; }
  });
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState<{ code: string; percent: number } | null>(null);

  useEffect(() => { localStorage.setItem("bizshop-cart", JSON.stringify(items)); }, [items]);

  const add = (p: Product) => setItems(prev => {
    const ex = prev.find(i => i.product.id === p.id);
    return ex ? prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { product: p, qty: 1 }];
  });
  const remove = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));
  const update = (id: string, qty: number) => setItems(prev => qty <= 0 ? prev.filter(i => i.product.id !== id) : prev.map(i => i.product.id === id ? { ...i, qty } : i));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);

  // قیمت هر محصول با در نظر گرفتن تخفیف محصول
  const getItemPrice = (product: Product) => {
    const discountPrice = (product as any).discount_price;
    if (discountPrice !== null && discountPrice !== undefined && discountPrice < product.price) {
      return discountPrice;
    }
    return product.price;
  };

  const total = items.reduce((s, i) => s + i.qty * getItemPrice(i.product), 0);

  const discountedTotal = coupon
    ? items.reduce((s, i) => {
        const basePrice = getItemPrice(i.product);
        const minPrice = (i.product as any).min_price;
        const discounted = Math.round(basePrice * (1 - coupon.percent / 100));
        const finalPrice = minPrice ? Math.max(discounted, minPrice) : discounted;
        return s + finalPrice * i.qty;
      }, 0)
    : total;

  return <Ctx.Provider value={{ items, add, remove, update, clear, count, total, open, setOpen, coupon, setCoupon, discountedTotal }}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};
