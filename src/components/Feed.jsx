import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {feed && (
        <div className="my-10 flex justify-center">
          <UserCard user1={feed} />
        </div>
      )}
    </div>
  );
};

export default Feed;