# Mary McGinty HIL takehome

### React + TypeScript + Vite

To get up and running:

```js
npm install && npm run dev
```

To run tests:

```js
npm run test
```

To build:

```js
npm run build
```

---

##### Features

- Load giphys from `/trending` endpoint by default
- Search for giphys using the `/search` endpoint
- Pagination
- Save and unsave giphys to local storage (click and unclick icon in bottom
  right of a giphy image)
- Navigate to the saved giphys page using the button, top right - which displays
  the saved items count
- Click on an individual giphy to open in a new page, with more info, save and
  unsave from here as well.
- Loading skeleton while waiting for API reponse + Loading animation for
  individual images
- Error handling
- Reponsive

---

###### Notes

- **Tests** : Vitest and MSW for mocking API reponses.
  [vitest-localstorage-mock](https://www.npmjs.com/package/vitest-localstorage-mock)
  used for mocking localStorage.
- **CSS** : I decided against using a framework for CSS. I considered tailwind
  or CSS modules but as it's a small project I decided to take the opportunity
  to write plain SASS, co-locating the style files with componenets where
  appropriate.
- **Routing** `react-router-dom` used for individual GIF pages and saved gifs
  page.
- **Context** Using `createContext` to persist the number of saved giphys in the
  header accross routes.

---

**Thanks!**
