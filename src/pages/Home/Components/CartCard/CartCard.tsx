import { Box } from "@mui/material";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { CartType } from "../../../../types/types";
import { Link } from "react-router-dom";
import useDelete from "../../../../hooks/useDelete";
import { useDispatch } from "react-redux";
import { cartsActions } from "../../../../store/states/cartSlice";
import { useState } from "react";
import Dialog from "../../../Components/Dialog/Dialog";
const CatCard = ({ cart }: { cart: CartType }) => {
  // for delete cart
  const dispatch = useDispatch();
  const { deleteData } = useDelete(
    "http://localhost:1337/api/carts1/" + cart.id
  );
  const handleDelete = async () => {
    await deleteData();
    // after delete the item, we need te reset our state
    const URL = "http://localhost:1337/api/carts1?populate=*";
    try {
      const res = await fetch(URL);
      const data = await res.json();
      dispatch(cartsActions.setCarts(data.data));
      console.log(data.data);
    } catch (error) {
      throw new Error("Failed to post data");
    }
  };
  const [dialog, setDialog] = useState({
    loading: false,
    msg: "Are you sure you want to delete " + cart.attributes.name + " cart?",
  });
  const showDialog = () => {
    setDialog({ ...dialog, loading: true });
  };
  return (
    <>
      <Box
        flex={1}
        minWidth={300}
        margin="auto"
        p={2}
        className="card cat-card"
      >
        <span className="point top left"></span>
        <span className="point top right"></span>
        <span className="point bottom left"></span>
        <span className="point bottom right"></span>
        <p>{cart.attributes.name}</p>
        <div className="actions">
          <span className="delete-cat" onClick={showDialog}>
            <i>
              <AiFillDelete />
            </i>
          </span>
          <span className="edit-cat">
            <Link to={`cart/${cart.id}`}>
              <i>
                <AiFillEdit />
              </i>
            </Link>
          </span>
        </div>
      </Box>
      {dialog.loading && (
        <Dialog
          key={cart.id}
          dialog={dialog}
          setDialog={setDialog}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default CatCard;
