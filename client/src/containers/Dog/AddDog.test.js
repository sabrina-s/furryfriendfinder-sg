import AddDog from "./AddDog";
import { render, screen, fireEvent } from "@testing-library/react";

describe("AddDog", () => {
  it("should render form to add a new dog", () => {
    render(<AddDog />);

    const form = screen.getByTestId("add-dog-form");

    expect(form).toBeInTheDocument();
  });

  it("should display errors on submit if required fields are missing", async () => {
    render(<AddDog />);

    const createButton = screen.getByTestId("create-dog-btn");
    fireEvent.click(createButton);

    const nameError = await screen.findByText(/please enter name/i);
    const genderError = await screen.findByText(/please select gender/i);
    const descriptionError = await screen.findByText(
      /please enter a short description/i
    );

    expect(nameError).toBeInTheDocument();
    expect(genderError).toBeInTheDocument();
    expect(descriptionError).toBeInTheDocument();
  });
});
