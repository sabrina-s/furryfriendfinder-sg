import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should display Navbar component", () => {
    render(<App />);
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  describe("no currentUser", () => {
    it("should display login and register links", () => {
      render(<App />);
      const loginLink = screen.getByText(/login/i);
      const registerLink = screen.getByText(/register/i);
      expect(loginLink).toBeInTheDocument();
      expect(registerLink).toBeInTheDocument();
    });

    it("should not display logout link", () => {
      render(<App />);
      const logoutLink = screen.queryByText(/logout/i);

      expect(logoutLink).toBeNull();
    });
  });
});
