import {useParams, useNavigate} from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {Header, Giphy, NoResults, GiphyLoader} from "src/components/";
import {GiphyPageProps, useGiphyById} from "src/lib";
import "./giphyPage.scss";

const GiphyPage = () => {
  const navigate = useNavigate();
  const {giphyId} = useParams();
  const {giphy, isLoading, error}: GiphyPageProps = useGiphyById(giphyId);

  const uploadDate =
    giphy && giphy.import_datetime ? new Date(giphy?.import_datetime) : null;
  const formattedDate = uploadDate?.toDateString() || "unknown date";

  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-giphy">
        {error && <NoResults errorMessage="Oops, not found" />}
        {isLoading && <GiphyLoader numItems={1} />}

        {!isLoading && giphy && (
          <>
            <Giphy data={giphy} />
            <h1>{giphy.title}</h1>
            <p>{giphy.alt_text}</p>

            {giphy.username && (
              <p className="info" data-testid="giphy-username">
                <FaceIcon fontSize="small" />
                <a href={`https://giphy.com/${giphy.username}`} target="_blank">
                  {giphy.username}
                </a>
              </p>
            )}

            {uploadDate && (
              <p className="info" data-testid="giphy-date">
                <AccessTimeIcon fontSize="small" />
                Uploaded on {formattedDate}
              </p>
            )}

            <button
              onClick={() => navigate(-1)}
              className="button button-yellow"
              data-testid="button-back"
            >
              <ArrowBackIcon />
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GiphyPage;
