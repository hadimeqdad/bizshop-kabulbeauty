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

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setProducts((data as DbProductRow[]).map(rowToProduct));
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { products, loading, refetch };
}
