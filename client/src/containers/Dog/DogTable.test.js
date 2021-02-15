import DogTable from "./DogTable";
import { render, screen } from "@testing-library/react";

describe("DogTable", () => {
  it("should render dog table with headers", async () => {
    render(<DogTable />);

    const table = screen.getByTestId("dog-table");
    const nameHeader = screen.getByText("Name");
    const genderHeader = screen.getByText("Gender");
    const descriptionHeader = screen.getByText("Description");
    const hdbHeader = screen.getByText("HDB Approved?");
    const availableHeader = screen.getByText("Available?");

    expect(table).toBeInTheDocument();
    expect(nameHeader).toBeInTheDocument();
    expect(genderHeader).toBeInTheDocument();
    expect(descriptionHeader).toBeInTheDocument();
    expect(hdbHeader).toBeInTheDocument();
    expect(availableHeader).toBeInTheDocument();
  });
});