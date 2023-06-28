import { render, screen } from "@testing-library/react";
import EditMeasureModal from "./EditMeasureModal";
import store from "../../../../store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

test("renders the EditMeasureModal component", () => {
  const measure = {
    id: 1,
    attributes: {
      name: "Test Measure",
      base_unit: "Test Base Unit",
      Conversion_factor: 2,
      createdAt: "",
      updatedAt: "",
    },
  };
  render(
    <Provider store={store}>
      <Router>
        <EditMeasureModal measure={measure} setEditModal={jest.fn()} />
      </Router>
    </Provider>
  );
  const measureInput = screen.getByLabelText(/Measure Name/i);
  expect(measureInput).toBeInTheDocument();
});
