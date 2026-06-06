import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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
    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      name,
      rating,
      comment,
      approved: false,
    });
    if (error) {
  console.error("Review insert error:", error);
  return false;
}
setSubmitted(true);
return true;
  };

  return { reviews, loading, submitted, submitReview };
};
