import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logo from "./Logo";

describe("Logo component", () => {
  test("renders text", () => {
    render(<Logo />);
    const logoElement = screen.getByRole("heading", {
      level: 6,
      name: /LEVI Market/i,
    });
    expect(logoElement).toBeInTheDocument();
  });

  test("clicking triggers scroll to top", () => {
    render(<Logo />);
    const scrollToSpy = jest.spyOn(window, "scrollTo");
    const logoElement = screen.getByRole("heading", {
      level: 6,
      name: /LEVI Market/i,
    });
    userEvent.click(logoElement);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  test("icon is displayed", () => {
    render(<Logo />);
    const logoIcon = screen.getByTestId("logo-icon");
    expect(logoIcon).toBeInTheDocument();
  });
});
