import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./measures-table.css";
const CategoriesTable = () => {
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
          <tr>
            <td>kiloGram</td>
            <td>Gram</td>
            <td>0.001</td>
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
          <tr>
            <td>kiloGram</td>
            <td>Gram</td>
            <td>0.001</td>
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
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
