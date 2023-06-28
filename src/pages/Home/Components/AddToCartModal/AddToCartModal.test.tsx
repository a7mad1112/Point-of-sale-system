import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartModal from "./AddToCartModal";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../../store/store";
describe("AddToCartModal", () => {
  test("renders modal with form contain cart selection", () => {
    const setIsShow = jest.fn();
    const selectedProductId = 1;

    render(
      <Provider store={store}>
        <Router>
          <AddToCartModal
            setIsShow={setIsShow}
            selectedProductId={selectedProductId}
          />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId("add-to-cart-from")).toBeInTheDocument();
    expect(screen.getByLabelText("Choose Cart")).toBeInTheDocument();
    expect(screen.getByLabelText("Choose Cart")).toHaveValue("");
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  test("submits the form with the selected cart",  () => {
    const setIsShow = jest.fn();
    const selectedProductId = 1;
    const mockSubmit = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <AddToCartModal
            setIsShow={setIsShow}
            selectedProductId={selectedProductId}
          />
        </Router>
      </Provider>
    );

    const form = screen.getByTestId("add-to-cart-from")
    form.onsubmit = mockSubmit;

    // Select a cart from the dropdown
    const cartSelect = screen.getByLabelText('Choose Cart');
    fireEvent.change(cartSelect, { target: { value: '1' } });
    fireEvent.submit(form);
    // to make sure the request done
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith(expect.any(Object));
  });
});
