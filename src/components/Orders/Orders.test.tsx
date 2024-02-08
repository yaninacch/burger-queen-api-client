import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { Orders } from "./Orders";

describe("orders", () => {
  test("Orders must have a logo", () => {
    render(
      <HashRouter>
        <Orders />
      </HashRouter>
    );
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "logo-burger.png");
    expect(logo).toHaveAttribute("alt", "logo");
  });
  test("Orders must have a title", () => {
    render(
      <HashRouter>
        <Orders />
      </HashRouter>
    );
    const title = screen.getByText("ORDERS");
    expect(title).toBeInTheDocument();
    
  });
});
