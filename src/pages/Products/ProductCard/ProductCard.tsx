import { Product, Image } from "../../../types/types";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import "./product-card.css";
interface ProductCardProps {
  product: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<number | null>>;
  setDialog: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      msg: string;
    }>
  >;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setSelectedProduct,
  setShowEditModal,
  setDeleteId,
  setDialog,
}) => {
  const prodImg: Image | null = product.attributes.images.data
    ? product.attributes.images.data[0]
    : null;
  const prodImgUrl: string = prodImg
    ? "http://localhost:1337" + prodImg.attributes.url
    : "";
  ///////

  return (
    <div className="card product-item">
      <div className="product-img">
        <img src={prodImgUrl} alt="" />
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
        {/* delete of edit */}
        <div className="actions">
          <span
            className="delete-cat"
            onClick={() => {
              setDeleteId(product.id);
              setDialog((prev) => ({ ...prev, loading: true }));
            }}
          >
            <i className="delete-icon">
              <AiFillDelete />
            </i>
          </span>
          <span
            className="edit-cat"
            onClick={() => {
              setShowEditModal(true);
              setSelectedProduct(product);
            }}
          >
            <i>
              <AiFillEdit />
            </i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
