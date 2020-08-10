import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import User from "./User";
import "./App.css";

// fetch data
const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
const fetchData = async (id = "") =>
  await fetch(`${URL}${id}`).then((res) => res.json());

// state values
const userProfileState = atom({
  key: "userProfile",
  default: {},
});

function App() {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const {
    name,
    profilePic,
    bio,
    likes,
    location,
    isLoading = true,
  } = userProfile;

  useEffect(() => {
    fetchData().then((data) =>
      setUserProfile({
        ...data,
        isLoading: false,
      })
    );
  }, []);

  return (
    <div className="App">
      <User
        name={name}
        profilePic={profilePic}
        bio={bio}
        likes={likes}
        location={location}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
