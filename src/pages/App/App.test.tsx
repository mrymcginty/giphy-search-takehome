import "@testing-library/jest-dom";
import {waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import {renderWithRouter} from "src/tests/setup";

describe("Homepage", () => {
  it("renders the Homepage page content with trending GIFs (happy path)", async () => {
    const screen = renderWithRouter(<App />, {
      route: "/trending",
    });

    expect(screen.getByRole("heading")).toHaveTextContent("Giphy time!");

    // expect initial loading state
    expect(screen.getByTestId("page-loading")).toBeInTheDocument();
    // and loading component removed when we have data
    await waitFor(() =>
      expect(screen.queryByTestId("page-loading")).not.toBeInTheDocument()
    );

    //Check for images
    const giphysLoaded = await screen.findAllByTestId("giphy");
    expect(giphysLoaded).toHaveLength(25);

    //pagination
    // previous arrow
    expect(screen.getAllByTestId("pagination-previous-arrow")).toHaveLength(1);
    expect(screen.getByTestId("pagination-previous-arrow")).toHaveClass(
      "disabled"
    );
    // next arrow
    expect(screen.getAllByTestId("pagination-next-arrow")).toHaveLength(1);
    expect(screen.getByTestId("pagination-next-arrow")).not.toHaveClass(
      "disabled"
    );
    // numbers
    expect(screen.getAllByTestId("pagination-item")).toHaveLength(6);
    //dots
    expect(screen.queryAllByTestId("pagination-dots")).toHaveLength(1);
  });

  it("returns search results", async () => {
    const screen = renderWithRouter(<App />, {
      route: "/",
    });

    // expect initial loading state
    expect(screen.getByTestId("page-loading")).toBeInTheDocument();
    // and loading component removed when we have data
    await waitFor(() =>
      expect(screen.queryByTestId("page-loading")).not.toBeInTheDocument()
    );

    const searchInput = screen.getByPlaceholderText(
      "Search for giphys... e.g. 'Kath & Kim'"
    );
    await userEvent.type(searchInput, "Kath & Kim");
    const submitButton = screen.getByRole("button", {name: "search"});
    await userEvent.click(submitButton);

    expect(screen.getByRole("heading")).toHaveTextContent("Giphy time!");

    //Check for images
    const giphysLoaded = await screen.findAllByTestId("giphy");
    expect(giphysLoaded).toHaveLength(14);
    expect(screen.getByTestId("search-results-message")).toHaveTextContent(
      "Showing results for: Kath & Kim"
    );

    // should be no pagination as it's less than 35 results
    expect(
      screen.queryByRole("list", {name: "pagination"})
    ).not.toBeInTheDocument();
  });

  it("renders an error message if no data ", async () => {
    const screen = renderWithRouter(<App />, {
      route: "/:gip<broken-url>hyId",
    });

    //Check for image
    const displayedImage = await screen.findByRole("img");
    // image loads
    await waitFor(() =>
      expect(
        expect(displayedImage).toHaveAttribute(
          "src",
          "/src/assets/img/no-results.gif"
        )
      )
    );
  });
});
