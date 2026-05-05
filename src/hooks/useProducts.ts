import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product, Category, Brand } from "@/data/products";

export interface DbProductRow {
  id: string;
  name_fa: string;
  name_en: string;
  category: string;
  subcategory: string | null;
  brand: string;
  price: number;
  image_url: string | null;
  details_fa: string | null;
  details_en: string | null;
  shade: string | null;
  sort_order: number;
}

export const rowToProduct = (r: DbProductRow): Product => ({
  id: r.id,
  name: { fa: r.name_fa, en: r.name_en },
  category: r.category as Category,
  subcategory: r.subcategory ?? undefined,
  brand: r.brand as Brand,
  price: Number(r.price),
  shade: r.shade ?? "150 50% 35%",
  image: r.image_url ?? undefined,
  details:
    r.details_fa || r.details_en
      ? { fa: r.details_fa ?? "", en: r.details_en ?? "" }
      : undefined,
});

const CACHE_KEY = "bizshop:products:v1";
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes

interface CacheShape {
  ts: number;
  data: Product[];
}

const readCache = (): CacheShape | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheShape;
  } catch {
    return null;
  }
};

const writeCache = (data: Product[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* ignore */
  }
};

// In-memory cache shared across hook instances during a session
let memoryCache: Product[] | null = null;

export function useProducts() {
  const initial = memoryCache ?? readCache()?.data ?? [];
  const [products, setProducts] = useState<Product[]>(initial);
  const [loading, setLoading] = useState(initial.length === 0);

  const refetch = useCallback(async (silent = false) => {
    if (!silent) setLoading(prev => prev || products.length === 0);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) {
      const mapped = (data as DbProductRow[]).map(rowToProduct);
      memoryCache = mapped;
      writeCache(mapped);
      setProducts(mapped);
    }
    setLoading(false);
  }, [products.length]);

  useEffect(() => {
    const cache = readCache();
    const fresh = cache && Date.now() - cache.ts < CACHE_TTL_MS;
    if (fresh && cache) {
      // serve cached + revalidate silently
      memoryCache = cache.data;
      setProducts(cache.data);
      setLoading(false);
      refetch(true);
    } else {
      refetch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, loading, refetch: () => refetch(false) };
}
