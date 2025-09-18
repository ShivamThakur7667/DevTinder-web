import React from "react";
import { useSelector } from "react-redux";
const UserCard = ({ user1 }) => {
  const user = useSelector((store) => store.user);

  return (
    <div className="card bg-base-300 w-96 shadow-sm flex flex-row">
      <figure className="w-30 mt-1 mx-5">
        <img src={user.imageURL} alt="user image" />
      </figure>
      <div className="card-body flex">
        <h3 className="card-title justify-start">
          {user?.firstName + " " + user?.lastName}
        </h3>
        <h5 className="flex">{user?.about}</h5>
        <h6>{user?.gender}</h6>

        <div className="card-actions">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
