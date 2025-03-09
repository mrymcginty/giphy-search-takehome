import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import {vi} from "vitest";

import Pagination from "./Pagination";

const setCurrentPage = vi.fn().mockImplementation((page: number) => page + 1);

describe("Pagination", () => {
  it("renders correct number of pages and arrows", () => {
    const screen = render(
      <Pagination
        currentPage={1}
        totalCount={75}
        pageSize={25}
        onPageChange={page => setCurrentPage(page)}
      />
    );
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
    expect(screen.getAllByTestId("pagination-item")).toHaveLength(3);
    //dots
    expect(screen.queryAllByTestId("pagination-dots")).toHaveLength(0);
  });

  it("renders dots for large totalCount", () => {
    const screen = render(
      <Pagination
        currentPage={1}
        totalCount={500}
        pageSize={25}
        onPageChange={page => setCurrentPage(page)}
      />
    );
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

  it("renders mid range page selection correctly", () => {
    const screen = render(
      <Pagination
        currentPage={4}
        totalCount={500}
        pageSize={25}
        onPageChange={page => setCurrentPage(page)}
      />
    );
    // previous arrow
    expect(screen.getAllByTestId("pagination-previous-arrow")).toHaveLength(1);
    expect(screen.getByTestId("pagination-previous-arrow")).not.toHaveClass(
      "disabled"
    );
    // next arrow
    expect(screen.getAllByTestId("pagination-next-arrow")).toHaveLength(1);
    expect(screen.getByTestId("pagination-next-arrow")).not.toHaveClass(
      "disabled"
    );
    // numbers
    expect(screen.getAllByTestId("pagination-item")).toHaveLength(5);
    //dots
    expect(screen.queryAllByTestId("pagination-dots")).toHaveLength(2);
  });
});
