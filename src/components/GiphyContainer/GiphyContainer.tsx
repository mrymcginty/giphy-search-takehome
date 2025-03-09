import Giphy from "../Giphy/Giphy";
import {GiphyListProps} from "src/lib/";
import "./giphyContainer.scss";

const GiphyContainer: React.FC<GiphyListProps> = ({giphys}) => {
  return (
    <div className="results-container">
      {giphys?.map(giphy => {
        return <Giphy key={giphy.id} data={giphy} />;
      })}
    </div>
  );
};

export default GiphyContainer;
