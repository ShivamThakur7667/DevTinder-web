import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";

const Connections = () => {
  const fetchConnections = async (req, res) => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <h1>Connections</h1>
    </div>
  );
};

export default Connections;