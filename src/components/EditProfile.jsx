import { useState, useRef, useEffect } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [imageURL, setImageURL] = useState(user?.imageURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const dispatch = useDispatch();
  const [showToast, setshowToast] = useState(false);

  const [error, setError] = useState("");

  const [cardHeight, setCardHeight] = useState("auto");
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      const formHeight = formRef.current.offsetHeight;
      setCardHeight(formHeight / 2 + "px");
    }
  }, [firstName, lastName, imageURL, age, gender, about]);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          imageURL,
          age: Number(age),
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-6 my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder="Enter your firstName here"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder="Enter your lastName here"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Image Url</legend>
                  <input
                    type="text"
                    value={imageURL}
                    className="input"
                    placeholder="Enter your imageURL here"
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend block font-medium">
                    Age
                  </legend>
                  <input
                    type="number"
                    value={age}
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    value={gender}
                    className="select select-bordered w-full"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <p>Select Gender</p>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input"
                    placeholder="Enter your about here"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>

              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: cardHeight }}>
          <UserCard
            className="flex-1 flex justify-center items-center"
            user={{ firstName, lastName, imageURL, age, gender, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
