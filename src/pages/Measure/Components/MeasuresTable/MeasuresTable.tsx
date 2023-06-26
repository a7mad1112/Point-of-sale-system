import "./measures-table.css";
import { Measure } from "../../../../types/types";
import TableRow from "./TableRow";
import { useState, useRef } from "react";
import EditMeasureModal from "../EditMeasureModal/EditMeasureModal";
import useDelete from "../../../../hooks/useDelete";
import { measuresActions } from "../../../../store/states/measuresSlice";
import { useDispatch } from "react-redux";
import Dialog from "../../../Components/Dialog/Dialog";

type MeasuresTableProps = {
  measures: Measure[];
};

const MeasuresTable: React.FC<MeasuresTableProps> = ({ measures }) => {
  const [editModal, setEditModal] = useState({
    isShow: false,
    selectedMeasure: measures[0],
  });
  // for delete
  /*
  (parameter) dialog: {
    loading: boolean;
    msg: string;
}*/
  const [deleteId, setDeleteId] = useState(measures[0].id);
  const [dialog, setDialog] = useState({
    loading: false,
    msg: "Are you sure you want to delete this measure?",
  });
  const URL = "http://localhost:1337/api/unit-of-measures1";
  const { deleteData } = useDelete(URL + "/" + deleteId);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await deleteData();
    // after delete the item, we need te reset our state
    try {
      const res = await fetch(
        "http://localhost:1337/api/unit-of-measures1?pagination[limit]=-1"
      );
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
    <div className="measures-table">
      <table>
        <thead>
          <tr>
            <th>Unit Name</th>
            <th>Base Unit</th>
            <th>Conversion Factor</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {measures.map((meas: Measure) => (
            <TableRow
              key={meas.id}
              meas={meas}
              setEditModal={setEditModal}
              setDeleteId={setDeleteId}
              setDialog={setDialog}
            />
          ))}
        </tbody>
      </table>
      {editModal.isShow && (
        <EditMeasureModal
          measure={editModal.selectedMeasure}
          setEditModal={setEditModal}
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

export default MeasuresTable;
