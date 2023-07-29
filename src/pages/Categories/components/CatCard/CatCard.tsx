import { Category } from "../../../../types/types";
import { Box } from "@mui/material";
import Dialog from "../../../Components/Dialog/Dialog";
import "./cat-card.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import EditCategoryModal from "../EditCategoryModal/EditCategoryModal";
import useDeleteCategory from "../../hooks/useDeleteCategory";

const CatCard = ({ category }: { category: Category }) => {
  const URL = "http://localhost:1337/api/categories1/" + category.id;
  const [showEditModal, setShowEditModal] = useState(false);

  // const handleDelete = async () => {
  //   await deleteData();
  //   // after delete the item, we need te reset our state
  //   const URL = "http://localhost:1337/api/categories1?pagination[limit]=-1"
  //   try {
  //     const res = await fetch(URL);
  //     if (!res.ok) {
  //       throw new Error(res.statusText);
  //     }
  //     const data = await res.json();
  //     dispatch(categoryActions.setCategories(data.data));
  //   } catch (error) {
  //     throw new Error("Failed to post data");
  //   }
  // };
  const { handleDelete } = useDeleteCategory(URL);
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
        showEditModal && (
          <EditCategoryModal setIsShow={setShowEditModal} URL={URL} />
        )
      }
    </>
  );
};

export default CatCard;
