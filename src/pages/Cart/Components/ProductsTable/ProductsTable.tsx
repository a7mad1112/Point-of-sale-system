import { Product, Products } from "../../../../types/types";
import TableRow from "../TableRow/TableRow";

type ProductsTableProps = {
  products: Products;
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  return (
    <div className="measures-table">
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <TableRow
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
