import {StrictMode, useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {App, GiphyPage, SavedGiphys} from "src/pages";
import {getSavedGiphys, CountContext} from "src/lib";
import "./index.scss";

export const AppWrapper = () => {
  //using context to keep track of our saved items count, fo display in the header button
  const [savedCount, setSavedCount] = useState(getSavedGiphys().length);
  return (
    <CountContext.Provider value={[savedCount, setSavedCount]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/giphy/:giphyId" element={<GiphyPage />} />
          <Route path="/saved" element={<SavedGiphys />} />
        </Routes>
      </BrowserRouter>
    </CountContext.Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
