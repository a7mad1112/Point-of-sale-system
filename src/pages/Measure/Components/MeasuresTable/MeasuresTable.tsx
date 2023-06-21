import "./measures-table.css";
import { Measure } from "../../../../types/types";
import TableRow from "./TableRow";

type MeasuresTableProps = {
  measures: Measure[];
};

const CategoriesTable: React.FC<MeasuresTableProps> = ({ measures }) => {

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
            <TableRow key={meas.id} meas={meas}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
