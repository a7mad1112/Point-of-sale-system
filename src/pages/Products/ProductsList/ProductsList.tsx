import { useSelector } from "react-redux";
import { Products, Product } from "../../../types/types";
import ProductCard from "../ProductCard/ProductCard";
import "./products-list.css";
const ProductsList = () => {
  const products: Products = useSelector(
    (state: any) => state.products.products
  );
  console.log(products);
  return (
    <div className="products-container">
      {products?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
