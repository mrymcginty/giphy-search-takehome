import "@testing-library/jest-dom";
import {waitFor} from "@testing-library/react";
import GiphyPage from "./GiphyPage";
import {renderWithRouter} from "src/tests/setup";
import {MOCK_GIPHY} from "src/tests/mockData/mockData";

describe("Giphy Single Page", () => {
  it("renders the Giphy page content (happy path)", async () => {
    const screen = renderWithRouter(<GiphyPage />, {
      route: "/giphy/:giphyId",
    });

    expect(screen.getByRole("heading")).toHaveTextContent("Giphy time!");

    // expect initial loading state
    expect(screen.getByTestId("page-loading")).toBeInTheDocument();
    // and loading component removed when we have data
    await waitFor(() =>
      expect(screen.queryByTestId("page-loading")).not.toBeInTheDocument()
    );

    //Check for image
    const displayedImage = await screen.findByRole("img");
    // image loads
    await waitFor(() =>
      expect(
        expect(displayedImage).toHaveAttribute(
          "src",
          MOCK_GIPHY.images.downsized.url
        )
      )
    );
    await waitFor(() =>
      expect(screen.getByTestId("giphy-actions")).toBeInTheDocument()
    );

    // second title on page should be the giphy
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent(
      "Wolf Dog Deal With It GIF by Old Spice"
    );
    // username displayed
    expect(screen.getByTestId("giphy-username")).toHaveTextContent("oldspice");
    // uploaded date displayed
    expect(screen.getByTestId("giphy-date")).toHaveTextContent(
      "Uploaded on Mon Jul 10 2017"
    );
    // back button displayed
    expect(screen.getByTestId("button-back")).toBeInTheDocument();
  });

  it("renders an error message if no data ", async () => {
    const screen = renderWithRouter(<GiphyPage />, {
      route: "/giphy/:gip<broken-url>hyId",
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

    // second title on page should be the giphy
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent(
      "Oops, not found"
    );
    // username displayed
    expect(screen.queryByTestId("giphy-username")).not.toBeInTheDocument();
    // uploaded date displayed
    expect(screen.queryByTestId("giphy-date")).not.toBeInTheDocument();
    // back button displayed
    expect(screen.queryByTestId("button-back")).not.toBeInTheDocument();
  });
});
