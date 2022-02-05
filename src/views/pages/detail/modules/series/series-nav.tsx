import { useState } from "react";

import EpisodeCarousel from "./episode-carousel";
import SeasonCarousel from "./season-carousel";

const SEASONS_COUNT = 24;
// ideally this would be an array/map that returns total num episodes for that season
// needed for dummy card rendering
const EPISODES_COUNT = 6;

const SeriesNav = () => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  return (
    <>
      <SeasonCarousel
        activeSeason={selectedSeason}
        seasons={SEASONS_COUNT}
        onClick={(season) => setSelectedSeason(season)}
      />
      <EpisodeCarousel season={selectedSeason} episodeCount={EPISODES_COUNT} />
    </>
  );
};

export default SeriesNav;
