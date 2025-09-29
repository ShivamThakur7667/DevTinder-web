import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recevied", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return;
  }
  if (requests.length === 0) {
    return <h1>No Requests Found</h1>;
  }

  return (
    <div className="text-center justify-center items-center min-h-[calc(100vh-64px)]">
      {requests.map((request) => {
        const { _id, firstName, lastName, imageURL, age, gender, about } =
          request.User;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 bg-base-300 rounded w-1/2 mx-auto"
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
            <div>
              <button className="btn btn-active btn-primary my-2 mr-2">Reject</button>
              <button className="btn btn-active btn-secondary my-2 mr-2">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
