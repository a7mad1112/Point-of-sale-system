import { AiFillDelete } from "react-icons/ai";
import useDelete from "./../../../hooks/useDelete";
import Dialog from "../Dialog/Dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { measuresActions } from "../../../store/states/measuresSlice";

const DeleteIcon = ({ URL, id }: { URL: string; id: number }) => {
  const { deleteData } = useDelete(URL + "/" + id);
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({
    loading: false,
    msg: "Are you sure you want to delete this measure?",
  });
  const showDialog = () => {
    setDialog({ ...dialog, loading: true });
  };
  const handleDelete = async () => {
    await deleteData();
    // after delete the item, we need te reset our state
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      dispatch(measuresActions.setMeasures(data.data));
      console.log(data.data);
    } catch (error) {
      throw new Error("Failed to post data");
    }
  };
  return (
    <>
      <i className="delete-icon" onClick={showDialog}>
        <AiFillDelete />
      </i>
      {dialog.loading && (
        <Dialog
          key={id}
          dialog={dialog}
          setDialog={setDialog}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default DeleteIcon;
