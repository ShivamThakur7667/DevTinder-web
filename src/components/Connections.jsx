import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectons } from "../utils/connectionSlice";

const Connections = () => {
  const connectionsFromStore = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnectons(res.data.data));
      setConnections(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Delete Connection
  const handleDelete = async (_id) => {
    try {
      await axios.delete(BASE_URL + "/user/" + _id, {
        withCredentials: true,
      });
      setConnections((prev) => prev.filter((user) => user._id !== _id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    setConnections(connectionsFromStore);
  }, [connectionsFromStore]);

  if (!connections) {
    return;
  }
  if (connections.length === 0) {
    return <h1>No Connections Found</h1>;
  }

  return (
    <div className="text-center justify-center items-center min-h-[calc(100vh-64px)]">
      {connections.filter(Boolean).map((connection) => {
        const { _id, firstName, lastName, imageURL, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 bg-base-300 rounded w-1/3 mx-auto"
          >
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
