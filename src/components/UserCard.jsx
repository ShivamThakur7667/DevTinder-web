import React from "react";
import { useSelector } from "react-redux";
const UserCard = ({ user1 }) => {
  const user = useSelector((store) => store.user);

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={user.imageURL} alt="user image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName || "No Name"}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
