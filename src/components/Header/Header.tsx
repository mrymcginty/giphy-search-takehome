import {useContext} from "react";
import classNames from "classnames";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import "./header.scss";

import {CountContext} from "src/lib/";

const Header = () => {
  const [savedCount] = useContext(CountContext);
  return (
    <div className="header-wrapper">
      <div className="header">
        <h1>
          <a href="/">
            <SentimentVerySatisfiedIcon />
            Giphy time!
          </a>
        </h1>
        <div className="header-nav">
          <a
            data-testid="saved-items-button"
            href="/saved"
            className={classNames("button button-yellow", {
              hasItems: savedCount > 0,
            })}
          >
            {savedCount > 0 ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            Saved ({savedCount})
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
