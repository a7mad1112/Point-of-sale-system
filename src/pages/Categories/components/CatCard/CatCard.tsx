import { Category } from "../../../../types/types";
import { Box } from "@mui/material";
import Dialog from "../../../Components/Dialog/Dialog";
import "./cat-card.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import useDelete from "../../../../hooks/useDelete";
import { useState } from "react";
import { categoryActions } from "../../../../store/states/categoriesSlice";
import { useDispatch } from "react-redux";
import EditCategoryModal from "../EditCategoryModal/EditCategoryModal";

const CatCard = ({ category }: { category: Category }) => {
  const URL = "http://localhost:1337/api/categories1/" + category.id;
  const { deleteData } = useDelete(URL);
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    await deleteData();
    // after delete the item, we need te reset our state
    const URL = "http://localhost:1337/api/categories1";
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      dispatch(categoryActions.setCategories(data.data));
      console.log(data.data);
    } catch (error) {
      throw new Error("Failed to post data");
    }
  };
  const [dialog, setDialog] = useState({
    loading: false,
    msg:
      "Are you sure you want to delete " +
      category.attributes.name +
      " category?",
  });
  const showDialog = () => {
    setDialog({ ...dialog, loading: true });
  };
  return (
    <>
      <Box flex={1} minWidth={300} margin="auto" p={2} className="card cat-card">
        <span className="point top left"></span>
        <span className="point top right"></span>
        <span className="point bottom left"></span>
        <span className="point bottom right"></span>
        <p>{category.attributes.name}</p>
        <div className="actions">
          <span className="delete-cat" onClick={showDialog}>
            <i>
              <AiFillDelete />
            </i>
          </span>
          <span className="edit-cat" onClick={() => setShowEditModal(true)}>
            <i>
              <AiFillEdit />
            </i>
          </span>
        </div>
      </Box>
      {dialog.loading && (
        <Dialog
          key={category.id}
          dialog={dialog}
          setDialog={setDialog}
          handleDelete={handleDelete}
        />
      )}
      {
        // modal for edit
        showEditModal && <EditCategoryModal setIsShow={setShowEditModal} URL={URL} />
      }
    </>
  );
};

export default CatCard;
