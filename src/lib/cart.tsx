import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem { product: Product; qty: number; }

interface CartCtx {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  update: (id: number, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("bizshop-cart") || "[]"); } catch { return []; }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => { localStorage.setItem("bizshop-cart", JSON.stringify(items)); }, [items]);

  const add = (p: Product) => setItems(prev => {
    const ex = prev.find(i => i.product.id === p.id);
    return ex ? prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { product: p, qty: 1 }];
  });
  const remove = (id: number) => setItems(prev => prev.filter(i => i.product.id !== id));
  const update = (id: number, qty: number) => setItems(prev => qty <= 0 ? prev.filter(i => i.product.id !== id) : prev.map(i => i.product.id === id ? { ...i, qty } : i));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return <Ctx.Provider value={{ items, add, remove, update, clear, count, total, open, setOpen }}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};
