import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./Layout";
import store from "../store/store";

test("Layout component renders SideBar", () => {
  render(
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
  const sideBarElement = screen.getByTestId("sidebar-component");
  expect(sideBarElement).toBeInTheDocument();
});
