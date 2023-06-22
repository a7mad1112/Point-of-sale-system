import { AiFillDelete } from "react-icons/ai";
import Dialog from "../Dialog/Dialog";
import { useState } from "react";
type DeleteIconProps = {
  handleDelete: () => Promise<void>;
};

const DeleteIcon: React.FC<DeleteIconProps> = ({ handleDelete }) => {
  const [dialog, setDialog] = useState({
    loading: false,
    msg: "Are you sure you want to delete this item?",
  });
  const showDialog = () => {
    setDialog({ ...dialog, loading: true });
  };
  return (
    <>
      <i className="delete-icon" onClick={showDialog}>
        <AiFillDelete />
      </i>
      {dialog.loading && (
        <Dialog
          dialog={dialog}
          setDialog={setDialog}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default DeleteIcon;
