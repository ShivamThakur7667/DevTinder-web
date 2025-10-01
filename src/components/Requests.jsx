import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, reqId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${reqId}`,
        {},
        {
          withCredentials: true,
        }
      );
      fetchRequests();
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      // filter out request with missing user data
      const validRequests = res.data.data.filter((r) => r.User);

      dispatch(addRequests(validRequests));
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <h1 className="text-center mt-10">No Requests Found</h1>;
  }

  return (
    <div className="text-center justify-center items-center min-h-[calc(100vh-64px)]">
      {requests.map((request) => {
        console.log("Request object:", request);
        

        const user = request.User;
        if (!user) {
          console.log("User data is missing for request:", request);
          return null; // skip rendering this request
        }

        const { _id, firstName, lastName, imageURL, age, gender, about } =
          user;

        return (
          <div
            key={request.reqId}
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
              <button
                className="btn btn-active btn-primary my-2 mr-2"
                onClick={() => {
                  console.log("Sending reqId:", request.data.reqId);
                  reviewRequest("rejected", request.data.reqId)}
                }
              >
                Reject
              </button>
              <button
                className="btn btn-active btn-secondary my-2 mr-2"
                onClick={() => {
                  console.log("Sending reqId:", request.reqId);
                  reviewRequest("accepted", request.reqId)}
                }
              >
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