import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectons } from "../utils/connectionSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async (req, res) => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnectons(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }
  if (connections.length === 0) {
    return <h1>No Connections Found</h1>;
  }

  return (
    <div className="text-center justify-center items-center min-h-[calc(100vh-64px)]">
      {/* <h1 className="text-bold text-xl">Connections</h1> */}

      {connections.map((connection) => {
        if (!connection) return null;
        const { firstName, lastName, imageURL, age, gender, about } =
          connection;

        return (
          <div className="flex m-4 p-4 bg-base-300 rounded">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={imageURL}
              />
            </div>
            <div className="text-left m-4">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{age + ", " + gender}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
