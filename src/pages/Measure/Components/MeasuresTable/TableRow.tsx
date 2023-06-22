import { AiFillEdit } from "react-icons/ai";
import { Measure } from "../../../../types/types";
import DeleteIcon from "../../../Components/DeleteIcon/DeleteIcon";
import useDelete from "../../../../hooks/useDelete";
import { measuresActions } from "../../../../store/states/measuresSlice";
import { useDispatch } from "react-redux";

const TableRow = ({ meas }: { meas: Measure }) => {
  const URL = "http://localhost:1337/api/unit-of-measures1";
  const { deleteData } = useDelete(URL + "/" + meas.id);
  const dispatch = useDispatch();
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
      <tr key={meas.id}>
        <td>{meas.attributes.name}</td>
        <td>{meas.attributes.base_unit}</td>
        <td>{meas.attributes.Conversion_factor}</td>
        <td>
          <DeleteIcon handleDelete={handleDelete} />
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