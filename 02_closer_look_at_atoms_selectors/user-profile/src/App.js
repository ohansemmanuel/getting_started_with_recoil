import React, { useState } from "react";
import { selectorFamily, useRecoilValueLoadable } from "recoil";
import { fetchUserProfile } from "./api";
import User, { UserPhoto } from "./User";
import { splitListInHalf } from "./splitListInHalf";

import "./App.css";

const userProfileState = selectorFamily({
  key: "userProfile",
  get: (currentUserId) => async ({ get }) => {
    return await fetchUserProfile(currentUserId);
  },
});

function App() {
  const [currentUserId, setCurrentUserId] = useState("");
  const { state, contents: userProfile } = useRecoilValueLoadable(
    userProfileState(currentUserId)
  );

  const isLoading = state === "loading";
  const hasError = state === "hasError";

  if (hasError) {
    return <div>Has Error :(</div>;
  }

  const { name, profilePic, likes, bio, location, friends } = userProfile;

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
