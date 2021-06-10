import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";
import Skeleton from "../skeleton/Skeleton";

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/videos/1");
        setVideos(res.data);
      } catch (err) {}
      setIsLoading(false);
    };
    getVideos();
  }, []);

  return (
    <div className="feed">
      {isLoading ? (
        <Skeleton type="feed" />
      ) : (
        videos.map((video) => <Post video={video} />)
      )}
    </div>
  );
};

export default Feed;
