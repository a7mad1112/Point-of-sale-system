import { Box } from "@mui/material";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { CartType } from "../../../../types/types";
import { Link } from "react-router-dom";
const CatCard = ({ cart }: { cart: CartType }) => {
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
          <span className="delete-cat">
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
      {/* {dialog.loading && (
        <Dialog
          key={category.id}
          dialog={dialog}
          setDialog={setDialog}
          handleDelete={handleDelete}
        />
      )} */}
      {/* {
        // modal for edit
        showEditModal && <EditCategoryModal setIsShow={setShowEditModal} URL={URL} />
      } */}
    </>
  );
};

export default CatCard;
