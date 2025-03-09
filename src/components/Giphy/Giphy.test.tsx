import "@testing-library/jest-dom";
import {vi} from "vitest";
import {renderWithRouter} from "src/tests/setup";
import {MOCK_GIPHY} from "src/tests/mockData/mockData";
import {getSavedGiphys, saveGiphy, removeGiphy} from "src/lib";
import Giphy from "./Giphy";

describe("Giphy", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders the Giphy component with image (happy path)", () => {
    const screen = renderWithRouter(<Giphy data={MOCK_GIPHY} />);
    const displayedImage = screen.getByRole("img");
    const imageLink = screen.getByRole("link");
    expect(displayedImage).toHaveAttribute(
      "src",
      "https://media1.giphy.com/media/3oKIPsgVPHyPPG5p3a"
    );
    expect(imageLink).toHaveAttribute("href", "/giphy/3oKIPsgVPHyPPG5p3a");
    // save icon
    expect(screen.getAllByTestId("saveIcon")).toHaveLength(1);
  });

  it("wraps the image in a link to the single giphy page", () => {
    const screen = renderWithRouter(<Giphy data={MOCK_GIPHY} />);
    const imageLink = screen.getByRole("link");
    expect(imageLink).toHaveAttribute("href", "/giphy/3oKIPsgVPHyPPG5p3a");
  });

  it("does not wrap the image in a link if we are on the single giphy page", () => {
    const screen = renderWithRouter(<Giphy data={MOCK_GIPHY} />, {
      route: "/giphy",
    });
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should add the giphy to local storage when the save icon is clicked", async () => {
    // save
    saveGiphy(MOCK_GIPHY);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "savedGiphys",
      JSON.stringify([MOCK_GIPHY])
    );
    //expect giphy to be returned from getSavedGiphys
    const saved = getSavedGiphys();
    expect(saved).toHaveLength(1);

    // remove from saved
    removeGiphy(MOCK_GIPHY);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      "savedGiphys",
      JSON.stringify([])
    );
  });
});
