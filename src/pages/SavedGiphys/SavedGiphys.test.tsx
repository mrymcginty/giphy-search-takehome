import "@testing-library/jest-dom";

import SavedGiphys from "./SavedGiphys";
import {renderWithRouter} from "src/tests/setup";
import {SAVED_GIPHYS} from "src/tests/mockData/mockData";
import {saveGiphy, removeGiphy, getSavedGiphys} from "src/lib";

describe("Saved Giphys Page", () => {
  const setSampleSavedData = () => {
    SAVED_GIPHYS.forEach(giphy => saveGiphy(giphy));
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "savedGiphys",
      JSON.stringify(SAVED_GIPHYS)
    );
  };

  afterEach(() => {
    localStorage.clear();
  });

  it("renders the saved page corretly with no saved giphys", async () => {
    const screen = renderWithRouter(<SavedGiphys />);
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Giphy time!");
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent(
      "Your saved items:"
    );
    expect(screen.getAllByRole("heading")[2]).toHaveTextContent(
      "No saved items..."
    );
  });

  it("renders the saved page corretly a list of saved giphys from local storage", async () => {
    // save
    setSampleSavedData();
    const screen = renderWithRouter(<SavedGiphys />);
    expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Giphy time!");
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent(
      "Your saved items:"
    );
    expect(screen.getAllByTestId("giphy")).toHaveLength(3);
  });

  it("removes the giphy from the page if it is un-saved", async () => {
    setSampleSavedData();
    const screen = renderWithRouter(<SavedGiphys />);
    //expect giphy to be returned from getSavedGiphys
    const saved = getSavedGiphys();
    expect(saved).toHaveLength(3);
    expect(screen.getAllByTestId("giphy")).toHaveLength(3);

    // remove from saved
    removeGiphy(SAVED_GIPHYS[0]);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "savedGiphys",
      JSON.stringify([SAVED_GIPHYS[1], SAVED_GIPHYS[2]])
    );
    const updated = getSavedGiphys();
    expect(updated).toHaveLength(2);
  });
});
