import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./measures-table.css";
import { Measure } from "../../../../types/types";

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
            <tr key={meas.id}>
              <td>{meas.attributes.name}</td>
              <td>
                {meas.attributes.base_unit
                  ? meas.attributes.base_unit
                  : "NULL"}
              </td>
              <td>
                {meas.attributes.conversion_factor
                  ? meas.attributes.conversion_factor
                  : "NULL"}
              </td>
              <td>
                <i className="delete-icon">
                  <AiFillDelete />
                </i>
              </td>
              <td>
                <i className="edit-icon">
                  <AiFillEdit />
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
