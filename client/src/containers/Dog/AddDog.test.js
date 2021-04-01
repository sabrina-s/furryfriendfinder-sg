import AddDog from "./AddDog";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("AddDog", () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <AddDog />
      </Provider>,
    ),
  );
  it("should render form to add a new dog", () => {
    const form = screen.getByTestId("add-dog-form");

    expect(form).toBeInTheDocument();
  });

  it("should display errors on submit if required fields are missing", async () => {
    const createButton = screen.getByTestId("create-dog-btn");
    fireEvent.click(createButton);

    const nameError = await screen.findByText(/please enter name/i);
    const genderError = await screen.findByText(/please select gender/i);
    const descriptionError = await screen.findByText(
      /please enter a short description/i,
    );

    expect(nameError).toBeInTheDocument();
    expect(genderError).toBeInTheDocument();
    expect(descriptionError).toBeInTheDocument();
  });
});
