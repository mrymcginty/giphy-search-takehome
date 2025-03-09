import {useState, useContext} from "react";
import {useLocation} from "react-router-dom";
import classNames from "classnames";

import "./giphy.scss";

import CheckIcon from "@mui/icons-material/Check";

import {
  CountContext,
  GiphyProps,
  saveGiphy,
  removeGiphy,
  isGiphySaved,
} from "src/lib";

const Giphy = ({data}: {data: GiphyProps}) => {
  const {pathname} = useLocation();
  const isSavedPage = pathname.substring(1) === "saved";
  const isSingleGiphyPage = pathname.substring(1, 6) === "giphy";
  const [savedCount, setSavedCount] = useContext(CountContext);
  const [removeGiphyDisplay, setRemoveGiphyDisplay] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(isGiphySaved(data));

  const handleSave = () => {
    saveGiphy(data);
    setIsSaved(true);
    setSavedCount(savedCount + 1);
  };

  const handleUnSave = () => {
    setRemoveGiphyDisplay(true);
    const delay = isSavedPage ? 300 : 0;
    setTimeout(() => {
      // using a timeout to animate out selected giphy before removing from state
      removeGiphy(data);
      setIsSaved(false);
      setSavedCount(savedCount - 1);
    }, delay);
  };

  const Image = () => (
    <img
      className={classNames("giphy giphy-image", {loading: !imgLoaded})}
      src={data.images.downsized.url}
      width={data.images.downsized.width}
      height={data.images.downsized.height}
      alt={data.alt_text}
      onLoad={() => setImgLoaded(true)}
    />
  );

  return (
    <>
      {data.images && (
        <div
          style={{
            width: data.images.downsized.width,
            height: data.images.downsized.height,
          }}
          className={classNames("giphy", {
            hidden: removeGiphyDisplay && isSavedPage,
          })}
          data-testid="giphy"
        >
          {!imgLoaded && <div className="loadingIcon"></div>}

          {!isSingleGiphyPage ? (
            <a href={`/giphy/${data.id}`} rel="noreferrer" key={data.id}>
              <Image />
            </a>
          ) : (
            <Image />
          )}
          <div className="giphy-actions" data-testid="giphy-actions">
            <button
              onClick={isSaved ? handleUnSave : handleSave}
              className={classNames("saveIcon", {saved: isSaved})}
              data-testid="saveIcon"
            >
              <span
                className={classNames("label label-save", {hidden: isSaved})}
              >
                save
              </span>
              <span
                className={classNames("label label-saved", {hidden: !isSaved})}
              >
                saved!
              </span>
              <CheckIcon className={classNames("check", {saved: isSaved})} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Giphy;
