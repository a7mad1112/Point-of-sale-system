import { render, screen, } from "@testing-library/react";
import CreateMeasureModal from "./CreateMeasureModal";
import store from "../../../../store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

test("renders the CreateMeasureModal component", () => {
  render(
    <Provider store={store}>
      <Router>
        <CreateMeasureModal setIsShow={jest.fn()} />
      </Router>
    </Provider>
  );
  const measureInput = screen.getByLabelText(/Measure Name/i);
  expect(measureInput).toBeInTheDocument();
});
