import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import CatCard from "./CartCard";
import store from "../../../../store/store";

describe("CartCard", () => {
  test("renders the cart card with cart name", () => {
    const cart = {
      id: 1,
      attributes: {
        name: "Test Cart",
        products: [],
      },
    };

    render(
      <Provider store={store}>
        <Router>
          <CatCard cart={cart} />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Test Cart")).toBeInTheDocument();
  });
});
