import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { splitListInHalf } from "./splitListInHalf";
import User, { UserPhoto } from "./User";
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
    friends = [],
    isLoading = true,
  } = userProfile;

  const [firstHalf, secondHalf] = splitListInHalf(friends);

  useEffect(() => {
    fetchData().then((data) =>
      setUserProfile({
        ...data,
        isLoading: false,
      })
    );
  }, [setUserProfile]);

  const renderFriends = (friends) => {
    if (isLoading) return null;

    return friends.map((id) => (
      <UserPhoto id={id} key={id} onClick={() => {}} />
    ));
  };

  return (
    <div className="App">
      {renderFriends(firstHalf)}
      <User
        name={name}
        profilePic={profilePic}
        bio={bio}
        likes={likes}
        location={location}
        isLoading={isLoading}
      />
      {renderFriends(secondHalf)}
    </div>
  );
}

export default App;
