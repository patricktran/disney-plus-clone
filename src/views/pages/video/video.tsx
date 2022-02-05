import { useNavigate, useParams } from "react-router-dom";

import VideoPlayer from "components/video-player";
import { ROUTE_PATHS } from "routes/paths";
import { catalogSelectors } from "state/ducks/catalog";
import { useAppSelector } from "state/hooks";
import VideoPageContainer from "views/layouts/video-page-container";

const Video = () => {
  const navigate = useNavigate();
  const { id } = useParams<any>();

  const itemDetails = useAppSelector((state) =>
    catalogSelectors.getCatalogItemById(state, +id!)
  );

  const goBack = () => {
    navigate(`${ROUTE_PATHS.DETAIL}/${id}`);
  };

  if (!itemDetails) {
    return null;
  }

  return (
    <VideoPageContainer>
      <VideoPageContainer.Main>
        <VideoPlayer
          onTitleBugClick={goBack}
          url="http://dash.edgesuite.net/akamai/bbb_30fps/bbb_with_tiled_thumbnails.mpd"
          title={itemDetails.title}
        />
      </VideoPageContainer.Main>
    </VideoPageContainer>
  );
};

export default Video;

// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
