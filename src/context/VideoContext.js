import { createContext } from "react";
import useFetch from "../redux/hooks/useFetch";
import { useParams } from "react-router-dom";

export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const { mediaType, id } = useParams();

  // Fetching Videos
  const { data: videoData, loading: videoDataLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const videos = videoData?.results?.filter((item) =>
    item?.name?.match(/trailer/gi)
  );

  const value = {
    videos,
    videoIsLoading: videoDataLoading,
    mediaType,
    id,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};
