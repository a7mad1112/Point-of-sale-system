import { render, screen } from "@testing-library/react";
import CreateCartModal from "./CreateCartModal";
import store from "../../../../store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

describe("CreateCartModal", () => {
  test("renders the modal form", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateCartModal setIsShow={jest.fn()} />
        </Router>
      </Provider>
    );
    expect(screen.getByLabelText(/Cart Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
});
