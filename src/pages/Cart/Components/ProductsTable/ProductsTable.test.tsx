import { render, screen } from "@testing-library/react";
import ProductsTable from "./ProductsTable";


describe("ProductsTable component", () => {
  test("renders table headers", () => {
    render(<ProductsTable cartsProducts={[]} />);
    const productNameHeader = screen.getByText("Product Name");
    expect(productNameHeader).toBeInTheDocument();
    const productPriceHeader = screen.getByText("Product Price");
    expect(productPriceHeader).toBeInTheDocument();
    const quantityHeader = screen.getByText("Quantity");
    expect(quantityHeader).toBeInTheDocument();
    const deleteHeader = screen.getByText("Delete");
    expect(deleteHeader).toBeInTheDocument();
  });
});
