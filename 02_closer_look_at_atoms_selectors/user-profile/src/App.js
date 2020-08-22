import React, { useState, useEffect } from "react";
import { atom, selector, useRecoilState } from "recoil";
import { fetchUserProfile } from "./api";
import User, { UserPhoto } from "./User";
import { splitListInHalf } from "./splitListInHalf";

import "./App.css";

const currentUserIdState = atom({
  key: "currentUserId",
  default: "",
});

const userProfileState = selector({
  key: "userProfile",
  get: async ({ get }) => {
    const currentUserId = get(currentUserIdState);
    const data = await fetchUserProfile(currentUserId);
    return {
      ...data,
      isLoading: false,
    };
  },
});

function App() {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdState);

  const {
    name,
    profilePic,
    likes,
    bio,
    location,
    friends,
    isLoading = true,
  } = userProfile;

  const [firstFriendsHalf, secondFriendsHalf] = splitListInHalf(friends);

  const handleFriendsClick = (evt) => {
    const id = evt.currentTarget.dataset.id;
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
