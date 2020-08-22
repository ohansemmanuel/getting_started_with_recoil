import React, { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { fetchUserProfile } from "./api";
import User, { UserPhoto } from "./User";
import { splitListInHalf } from "./splitListInHalf";

import "./App.css";

const userProfileState = atom({
  key: "userProfile",
  default: {},
});

function App() {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [currentUserId, setCurrentUserId] = useState("");

  const {
    name,
    profilePic,
    likes,
    bio,
    location,
    friends,
    isLoading = true,
  } = userProfile;

  useEffect(() => {
    fetchUserProfile(currentUserId).then((data) =>
      setUserProfile({
        ...data,
        isLoading: false,
      })
    );
  }, [currentUserId, setUserProfile]);

  const [firstFriendsHalf, secondFriendsHalf] = splitListInHalf(friends);

  const handleFriendsClick = (evt) => {
    const id = evt.currentTarget.dataset.id;
    setUserProfile((prevState) => ({ ...prevState, isLoading: true }));
    setCurrentUserId(id);
  };

  const renderFriends = (friendList) => {
    return friendList.map((friendId) => (
      <UserPhoto key={friendId} id={friendId} onClick={handleFriendsClick} />
    ));
  };

  return (
    <div className="App">
      {renderFriends(firstFriendsHalf)}
      <User
        name={name}
        profilePic={profilePic}
        likes={likes}
        bio={bio}
        location={location}
        isLoading={isLoading}
      />
      {renderFriends(secondFriendsHalf)}
    </div>
  );
}

export default App;
