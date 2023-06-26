import { useDispatch } from "react-redux";
import usePut from "../../../../hooks/usePut";
import { cartProductsActions } from "../../../../store/states/cartProductsSlice";
import useDelete from "../../../../hooks/useDelete";

type ProductsRowProps = {
  cartProduct: any;
};
const TableRow: React.FC<ProductsRowProps> = ({ cartProduct }) => {
  // console.log(cartProduct.attributes.product.data.attributes);
  const { name: productName, price: productPrice } =
    cartProduct.attributes.product.data.attributes;
  const { quantity: productQuantity } = cartProduct.attributes;
  // handle quantity actions:
  const handleDecrement = () => {
    if (productQuantity <= 1) deleteItem();
    else updateQuantity(productQuantity - 1);
  };
  const handleIncrement = () => updateQuantity(productQuantity + 1);
  // function to update quantity
  const PUT_DELETE_URL = `http://localhost:1337/api/carts-products1/${cartProduct.id}?populate=*`;
  const { putData } = usePut(PUT_DELETE_URL);
  const dispatch = useDispatch();
  const updateQuantity = async (quantity: number) => {
    // console.log("new value " + quantity);
    const payload = {
      data: {
        quantity,
      },
    };
    await putData(payload);
    // re fetch cart product
    await storeData();
  };
  // function to delete item in cart
  const { deleteData } = useDelete(PUT_DELETE_URL);
  const deleteItem = async () => {
    await deleteData();
    await storeData();
  };
  // function to fetch new data and store it
  const storeData = async () => {
    try {
      const res = await fetch(
        "http://localhost:1337/api/carts-products1?populate=*"
      );
      const data = await res.json();
      dispatch(cartProductsActions.setCartProducts(data.data));
    } catch (error) {
      throw new Error("Failed to post data");
    }
  };
  return (
    <>
      <tr>
        <td>{productName}</td>
        <td>${productPrice}</td>
        <td>
          <div className="quantity">
            <span id="increment-quantity" onClick={handleIncrement}>
              +
            </span>
            <span>{productQuantity}</span>
            <span id="decrement-quantity" onClick={handleDecrement}>
              -
            </span>
          </div>
        </td>
        <td className="delete" onClick={deleteItem}>
          Delete
        </td>
      </tr>
    </>
  );
};

export default TableRow;
