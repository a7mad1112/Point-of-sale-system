type ProductsRowProps = {
  cartProduct: any ;
};
const TableRow: React.FC<ProductsRowProps> = ({ cartProduct }) => {
  // console.log(cartProduct.attributes.product.data.attributes);
  const { name: productName, price: productPrice } = cartProduct.attributes.product.data.attributes;
  return (
    <>
      <tr>
        <td>{productName}</td>
        <td>${productPrice}</td>
        <td>
          <span id="increment-quantity">+</span>
          <span>{cartProduct.attributes.quantity}</span>
          <span id="decrement-quantity">-</span>
        </td>
      </tr>
    </>
  );
};

export default TableRow;