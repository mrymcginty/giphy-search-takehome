import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import GiphyLoader from "./GiphyLoader";

describe("GiphyLoader", () => {
  it("renders the 1 loading skeletons when numItems is 1", () => {
    const screen = render(<GiphyLoader numItems={1} />);
    expect(screen.getAllByTestId("giphy-skeleton")).toHaveLength(1);
  });

  it("renders the 10 loading skeletons when numItems is 10", () => {
    const screen = render(<GiphyLoader numItems={10} />);
    expect(screen.getAllByTestId("giphy-skeleton")).toHaveLength(10);
  });
});
