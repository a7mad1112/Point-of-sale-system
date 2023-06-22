import { Product, Image } from "../../../types/types";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import "./product-card.css";
import useDelete from "../../../hooks/useDelete";
import { productsActions } from "../../../store/states/productsSlice";
import { useDispatch } from "react-redux";
interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const prodImg: Image | null = product.attributes.images.data
    ? product.attributes.images.data[0]
    : null;
  const prodImgUrl: string = prodImg
    ? "http://localhost:1337" + prodImg.attributes.url
    : "";
  ///////
  const URL = "http://localhost:1337/api/products1/";
  const { deleteData } = useDelete(URL + product.id);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await deleteData();
    // after delete the item, we need te reset our state
    // get products
    try {
      const res = await fetch(URL, {
        method: "GET",
      });
      const data = await res.json();
      // console.log(data.data);
      // dispatch(productsActions.setProducts(data.data));
    } catch (error) {
      console.error("Failed to get data:", error);
    }
  };
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
          <span className="delete-cat">
            <i className="delete-icon">
              <AiFillDelete />
            </i>
          </span>
          <span className="edit-cat">
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
