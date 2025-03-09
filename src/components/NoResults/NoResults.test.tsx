import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import NoResults from "./NoResults";

describe("NoResults", () => {
  it("renders with no message if none is supplied", () => {
    const screen = render(<NoResults />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders with a custom message", () => {
    const screen = render(<NoResults errorMessage="Custom error message" />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Custom error message"
    );
  });

  it("renders with a search term message", () => {
    const screen = render(<NoResults searchTerm="limes" />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toHaveTextContent(
      'No results for "limes" 😭'
    );
  });
});
