import "@testing-library/jest-dom/vitest";
import {cleanup, render} from "@testing-library/react";
import {MemoryRouter, Routes, Route} from "react-router-dom";
import {beforeAll, afterEach, afterAll} from "vitest";
import {server} from "./server";

export const renderWithRouter = (ui: React.ReactNode, {route = "/"} = {}) => {
  //return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route
          element={ui}
          path={route} // should specify the params your component wants from the URL
        />
      </Routes>
    </MemoryRouter>
  );
};

// Start the server before all tests
beforeAll(() => server.listen({onUnhandledRequest: "error"}));

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Clean up after the tests are finished
afterAll(() => server.close());
