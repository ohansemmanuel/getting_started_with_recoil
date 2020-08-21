import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { fetchUserProfile } from "./api";
import User from "./User";

import "./App.css";

const userProfileState = atom({
  key: "userProfile",
  default: {},
});

function App() {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const {
    name,
    profilePic,
    likes,
    bio,
    location,
    isLoading = true,
  } = userProfile;

  useEffect(() => {
    fetchUserProfile().then((data) =>
      setUserProfile({
        ...data,
        isLoading: false,
      })
    );
  }, [setUserProfile]);

  return (
    <div className="App">
      <header className="App-header">
        <User
          name={name}
          profilePic={profilePic}
          likes={likes}
          bio={bio}
          location={location}
          isLoading={isLoading}
        />
      </header>
    </div>
  );
}

export default App;
