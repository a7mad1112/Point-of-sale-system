import { useDispatch, useSelector } from "react-redux";
import { Products, Product } from "../../../types/types";
import ProductCard from "../ProductCard/ProductCard";
import "./products-list.css";
import { useState } from "react";
import EditProductModal from "../EditProductModal/EditProductModal";
import useDelete from "../../../hooks/useDelete";
import Dialog from "../../Components/Dialog/Dialog";
import { productsActions } from "../../../store/states/productsSlice";
const ProductsList = () => {
  const products: Products = useSelector(
    (state: any) => state.products.products
  );
  // for edit products modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // for delete
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [dialog, setDialog] = useState({
    loading: false,
    msg: "Are you sure you want to delete this product?",
  });
  const URL = "http://localhost:1337/api/products1/";
  const { deleteData } = useDelete(URL + deleteId);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await deleteData();
    // after delete the item, we need te reset our state
    try {
      const res = await fetch(
        "http://localhost:1337/api/products1?pagination[limit]=-1&populate=*"
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      dispatch(productsActions.setProducts(data.data));
      // console.log(data.data);
    } catch (error) {
      throw new Error("Failed to post data");
    }
  };
  return (
    <div className="products-container">
      {products?.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          setSelectedProduct={setSelectedProduct}
          setShowEditModal={setShowEditModal}
          setDeleteId={setDeleteId}
          setDialog={setDialog}
        />
      ))}
      {showEditModal && (
        <EditProductModal
          setIsShow={setShowEditModal}
          selectedProduct={selectedProduct}
        />
      )}
      {dialog.loading && (
        <Dialog
          dialog={dialog}
          setDialog={setDialog}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductsList;
