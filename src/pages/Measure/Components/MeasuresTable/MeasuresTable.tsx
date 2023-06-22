import "./measures-table.css";
import { Measure } from "../../../../types/types";
import TableRow from "./TableRow";
import { useState } from "react";
import EditMeasureModal from "../EditMeasureModal/EditMeasureModal";

type MeasuresTableProps = {
  measures: Measure[];
};

const MeasuresTable: React.FC<MeasuresTableProps> = ({ measures }) => {
  const [editModal, setEditModal] = useState({
    isShow: false,
    selectedMeasure: measures[0]
  });
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
            <TableRow key={meas.id} meas={meas} setEditModal={setEditModal} />
          ))}
        </tbody>
      </table>
      {editModal.isShow && <EditMeasureModal measure={editModal.selectedMeasure} setEditModal={setEditModal} />}
    </div>
  );
};

export default MeasuresTable;
