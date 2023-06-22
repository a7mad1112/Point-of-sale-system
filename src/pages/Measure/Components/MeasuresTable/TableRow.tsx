import { AiFillEdit } from "react-icons/ai";
import { Measure } from "../../../../types/types";
import { AiFillDelete } from "react-icons/ai";

const TableRow = ({
  meas,
  setEditModal,
  setDeleteId,
  setDialog,
}: {
  meas: Measure;
  setEditModal: React.Dispatch<
    React.SetStateAction<{
      isShow: boolean;
      selectedMeasure: Measure;
    }>
  >;
  setDialog: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      msg: string;
    }>
  >;
  setDeleteId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <tr key={meas.id}>
        <td>{meas.attributes.name}</td>
        <td>{meas.attributes.base_unit}</td>
        <td>{meas.attributes.Conversion_factor}</td>
        <td>
          <i
            className="delete-icon"
            onClick={() => {
              setDeleteId(meas.id);
              setDialog((prev) => ({ ...prev, loading: true }));
            }}
          >
            <AiFillDelete />
          </i>
        </td>
        <td>
          <i
            className="edit-icon"
            onClick={() =>
              setEditModal({ isShow: true, selectedMeasure: meas })
            }
          >
            <AiFillEdit />
          </i>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
