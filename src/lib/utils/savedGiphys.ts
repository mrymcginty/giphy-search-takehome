import {GiphyProps} from "src/lib";

export const getSavedGiphys = () =>
  JSON.parse(localStorage.getItem("savedGiphys") || "[]");

export const saveGiphy = (giphy: GiphyProps) => {
  const savedGiphys = getSavedGiphys();
  if (!savedGiphys.includes(giphy)) {
    localStorage.setItem(
      "savedGiphys",
      JSON.stringify([...savedGiphys, giphy])
    );
  }
};

export const removeGiphy = (giphy: GiphyProps) => {
  const savedGiphys = getSavedGiphys();
  const updateGiphys = savedGiphys.filter(
    (savedGiphy: GiphyProps) => savedGiphy.id !== giphy.id
  );
  localStorage.setItem("savedGiphys", JSON.stringify(updateGiphys));
};

export const isGiphySaved = (giphy: GiphyProps) => {
  const savedGiphys = getSavedGiphys();
  return savedGiphys.some(
    (savedGiphy: GiphyProps) => savedGiphy.id === giphy.id
  );
};
