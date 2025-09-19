import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <EditProfile user={user} />
      {/* <UserCard/> */}
    </div>
  );
};

export default Profile;
