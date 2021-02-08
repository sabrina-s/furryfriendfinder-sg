import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should display Navbar component", () => {
    render(<App />);
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });
});
