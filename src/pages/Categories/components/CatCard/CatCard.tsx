import { Category } from "../../../../types/types";
import { Box } from "@mui/material";
import "./cat-card.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const CatCard = ({ category }: { category: Category }) => {
  return (
    <Box flex={1} minWidth={300} margin="auto" p={2} className="cat-card">
      <span className="point top left"></span>
      <span className="point top right"></span>
      <span className="point bottom left"></span>
      <span className="point bottom right"></span>
      <p>{category.attributes.name}</p>
      <div className="actions">
        <span className="delete-cat">
          <i>
            <AiFillEdit />
          </i>
        </span>
        <span className="edit-cat">
          <i>
            <AiFillDelete />
          </i>
        </span>
      </div>
    </Box>
  );
};

export default CatCard;
