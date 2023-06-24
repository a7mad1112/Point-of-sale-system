import React from "react";
import { Product } from "../../../../types/types";
import { Button } from "@mui/material";
type ProductCardProps = {
  product: Product;
  setShowAddToCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProductId:  React.Dispatch<React.SetStateAction<number>>;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, setShowAddToCartModal, setSelectedProductId }) => {
  const img =
    "http://localhost:1337" +
      product.attributes.images?.data?.[0]?.attributes?.url ?? null;
  // console.log(img);
  const showCartModal = () => {
    setSelectedProductId(product.id);
    setShowAddToCartModal(true)
  }
  return (
    <div className="card product-item">
      <div className="product-img">
        <img src={img} alt={product.attributes.name} />
      </div>
      <div className="product-content">
        <h3>{product.attributes.name}</h3>

        <div className="pro-data">
          <span className="product-data">${product.attributes.price}</span>
          <span className="product-data">
            {product.attributes.category
              ? product.attributes.category.data?.attributes.name
              : "NULL"}
          </span>
        </div>
        <Button
          onClick={() => showCartModal()}
          sx={{
            my: 4,
            backgroundColor: "var(--yellow-color)",
            color: "#FFFFFF",
            fontWeight: "bold",
            transition: "0.3s",
            "&:hover": {
              opacity: 0.8,
              backgroundColor: "var(--yellow-color)",
              transform: "translateY(-2px)",
            },
          }}
          variant="contained"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
