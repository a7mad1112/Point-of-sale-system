import { Product } from "../../../../types/types";

const TableRow = ({ product }: { product: Product }) => {
  return (
    <>
      <tr key={product.id}>
        <td>{product.attributes.name}</td>
        <td>${product.attributes.price}</td>
        <td>{product.attributes.quantity}</td>
      </tr>
    </>
  );
};

export default TableRow;
