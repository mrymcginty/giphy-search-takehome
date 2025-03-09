import "../GiphyContainer/giphyContainer.scss";

const GiphyLoader = ({numItems}: {numItems: number}) => (
  <div
    className={`results-container items-${numItems}`}
    data-testid="page-loading"
  >
    {Array.from({length: numItems}, (_, i) => (
      <div
        key={i}
        className="giphy giphy-skeleton"
        data-testid="giphy-skeleton"
      >
        <div className="loadingIcon"></div>
      </div>
    ))}
  </div>
);

export default GiphyLoader;
