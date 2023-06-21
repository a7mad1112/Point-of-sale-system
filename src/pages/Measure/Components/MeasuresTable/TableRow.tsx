import { AiFillEdit } from "react-icons/ai";
import { Measure } from "../../../../types/types";
import DeleteIcon from "../../../Components/DeleteIcon/DeleteIcon";

const TableRow = ({ meas }: { meas: Measure }) => {
  const URL = "http://localhost:1337/api/unit-of-measures1";
  return (
    <>
      <tr key={meas.id}>
        <td>{meas.attributes.name}</td>
        <td>{meas.attributes.base_unit}</td>
        <td>{meas.attributes.Conversion_factor}</td>
        <td>
          <DeleteIcon URL={URL} id={meas.id} />
        </td>
        <td>
          <i className="edit-icon">
            <AiFillEdit />
          </i>
        </td>
      </tr>
    </>
  );
};

export default TableRow;