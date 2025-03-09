import {getSavedGiphys} from "src/lib";
import {Header, GiphyContainer, NoResults} from "src/components";

const SavedGiphys = () => {
  const giphys = getSavedGiphys();

  return (
    <div className="page-wrapper">
      <div className="page-saved">
        <Header />
        <h2>Your saved items: </h2>
        {giphys.length <= 0 && <NoResults errorMessage="No saved items..." />}
        <GiphyContainer giphys={giphys} />
      </div>
    </div>
  );
};

export default SavedGiphys;
