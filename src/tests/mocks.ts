import {http, HttpResponse} from "msw";
import {MOCK_GIPHY} from "./mockData/mockData";
import {MOCK_TRENDING} from "./mockData/mockTrending";
import {MOCK_SEARCH} from "./mockData/mockSearch";

export const handlers = [
  http.get("https://api.giphy.com/v1/gifs/trending", async () => {
    return HttpResponse.json(MOCK_TRENDING);
  }),
  http.get("https://api.giphy.com/v1/gifs/search", async () => {
    return HttpResponse.json(MOCK_SEARCH);
  }),
  http.get("https://api.giphy.com/v1/gifs/:giphyId", async () => {
    return HttpResponse.json({data: MOCK_GIPHY});
  }),
];
