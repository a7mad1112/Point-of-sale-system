import { CartProduct } from "../../../../types/types";
import TableRow from "../TableRow/TableRow";
import './products-table.css'
type ProductsTableProps = {
  cartsProducts: CartProduct [];
};

const ProductsTable: React.FC<ProductsTableProps> = ({ cartsProducts }) => {
  // console.log(cartsProducts)
  return (
    <div className="measures-table">
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartsProducts.map((cartPro: CartProduct) => (
            <TableRow
              key={cartPro.id}
              cartProduct={cartPro}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
