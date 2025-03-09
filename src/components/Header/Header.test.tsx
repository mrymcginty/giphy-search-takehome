import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header", () => {
  it("renders the Header component", () => {
    const screen = render(<Header />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent("Giphy time!");

    expect(screen.getByTestId("saved-items-button")).toBeInTheDocument();
    expect(screen.getByTestId("saved-items-button")).toHaveTextContent(
      "Saved (0)"
    );
  });
});
