import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";

import SearchForm from "./SearchForm";

const handleSearch = vi.fn().mockImplementation(() => {});

describe("SearchForm", () => {
  it("renders the SearchForm component", async () => {
    const screen = render(
      <SearchForm onSearch={handleSearch} searchTerm={""} />
    );
    const searchInput = screen.getByPlaceholderText(
      "Search for giphys... e.g. 'Kath & Kim'"
    );
    const submitButton = screen.getByRole("button");
    const resultsMessage = screen.getByTestId("search-results-message");

    // default results message displayed (trending)
    expect(resultsMessage).toHaveTextContent("Showing trending results...");

    //Expect to have search input and submit button
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).not.toHaveValue();
    expect(screen.getByRole("button")).toHaveValue("Search");
    //enter a search value
    await userEvent.type(searchInput, "test");
    expect(searchInput).toHaveValue("test");
    // clicking submit will fire the callback function
    await userEvent.click(submitButton);
    expect(handleSearch).toHaveBeenCalledTimes(1);
    //hittin return on keyboard will fire the callback function
    await userEvent.type(searchInput, "abc{enter}");
    expect(handleSearch).toHaveBeenCalledTimes(2);
  });

  it("shows a custom message related to current search term", async () => {
    const screen = render(
      <SearchForm onSearch={handleSearch} searchTerm={"limes"} />
    );

    const resultsMessage = screen.getByTestId("search-results-message");

    // custom results message displayed (search results)
    expect(resultsMessage).toHaveTextContent("Showing results for: limes");
  });
});
