import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import TableRow from "./TableRow";
import store from "../../../../store/store";

const mockCartProduct = {
  id: 1,
  attributes: {
    product: {
      data: {
        attributes: {
          name: "Product 1",
          price: 10,
        },
      },
    },
    quantity: 2,
  },
};

describe("TableRow component", () => {
  test("product name is rendered", () => {
    render(
      <Provider store={store}>
        <TableRow cartProduct={mockCartProduct} />
      </Provider>
    );
    const productNameElement = screen.getByText("Product 1");
    expect(productNameElement).toBeInTheDocument();
  });

  test("product price is rendered", () => {
    render(
      <Provider store={store}>
        <TableRow cartProduct={mockCartProduct} />
      </Provider>
    );
    const productPriceElement = screen.getByText("$10");
    expect(productPriceElement).toBeInTheDocument();
  });

  test("product quantity is rendered", () => {
    render(
      <Provider store={store}>
        <TableRow cartProduct={mockCartProduct} />
      </Provider>
    );
    const productQuantityElement = screen.getByText("2");
    expect(productQuantityElement).toBeInTheDocument();
  });
});
