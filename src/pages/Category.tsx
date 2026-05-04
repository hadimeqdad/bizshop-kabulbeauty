import { useParams, Navigate } from "react-router-dom";
import { Category as Cat } from "@/data/products";

const VALID: Cat[] = ["medicinal", "healthcare", "cosmetics", "food"];

const CategoryPage = () => {
  const { cat } = useParams();
  if (!cat || !VALID.includes(cat as Cat)) return <Navigate to="/shop" replace />;
  return <Navigate to={`/shop?cat=${cat}`} replace />;
};

export default CategoryPage;
