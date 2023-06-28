import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { Product } from "../../../../types/types";
import store from "../../../../store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

describe("ProductCard", () => {
  const setShowAddToCartModal = jest.fn();
  const setSelectedProductId = jest.fn();
  const product: Product = {
    id: 1,
    attributes: {
      name: "Test Product",
      price: 10.99,
      code: "AX20",
      category: {
        data: {
          id: 1,
          attributes: {
            name: "Test Category",
            image: "",
            publishedAt: "",
            createdAt: "",
            updatedAt: "",
          },
        },
      },
      unit_of_measure: {
        data: null,
      },
      images: {
        data: null
      },
    },
  };
  test("renders the product card with correct data", () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductCard
            product={product}
            setShowAddToCartModal={setShowAddToCartModal}
            setSelectedProductId={setSelectedProductId}
          />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });

  test("calls setShowAddToCartModal and setSelectedProductId on Add To Cart button click", () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductCard
            product={product}
            setShowAddToCartModal={setShowAddToCartModal}
            setSelectedProductId={setSelectedProductId}
          />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add To Cart" }));
    expect(setShowAddToCartModal).toHaveBeenCalledTimes(1);
    expect(setShowAddToCartModal).toHaveBeenCalledWith(true);

    expect(setSelectedProductId).toHaveBeenCalledTimes(1);
    expect(setSelectedProductId).toHaveBeenCalledWith(1);
  });
});
