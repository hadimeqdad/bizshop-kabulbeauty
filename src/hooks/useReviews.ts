import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  product_id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
}

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("approved", true)
      .order("created_at", { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  const submitReview = async (
    name: string,
    rating: number,
    comment: string
  ) => {
    const { data, error } = await supabase
      .from("reviews")
      .insert([{
        product_id: productId,
        name: name,
        rating: rating,
        comment: comment,
        approved: false,
      }])
      .select();

    console.log("insert result:", data, error);

    if (!error) {
      setSubmitted(true);
    }
  };

  return { reviews, submitted, submitReview, loading };
};
