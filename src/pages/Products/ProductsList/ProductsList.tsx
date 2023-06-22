import { useSelector } from "react-redux";
import { Products, Product } from "../../../types/types";
import ProductCard from "../ProductCard/ProductCard";
import "./products-list.css";
import { useState } from "react";
import EditProductModal from "../EditProductModal/EditProductModal";
const ProductsList = () => {
  const products: Products = useSelector(
    (state: any) => state.products.products
  );
  // for edit products modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="products-container">
      {products?.map((product: Product) => (
        <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct} setShowEditModal={setShowEditModal} />
      ))}
      {
        showEditModal && <EditProductModal setIsShow={setShowEditModal} selectedProduct={selectedProduct}/>
      }
    </div>
  );
};

export default ProductsList;
