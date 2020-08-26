import React from "react";
import {
  selectorFamily,
  useRecoilValueLoadable,
  useRecoilCallback,
  atom,
  useRecoilValue,
} from "recoil";
import { fetchUserProfile } from "./api";
import User, { UserPhoto } from "./User";
import { splitListInHalf } from "./splitListInHalf";

import "./App.css";

const currentUserIdState = atom({
  key: "currentUserId",
  default: "",
});

const userProfileState = selectorFamily({
  key: "userProfile",
  get: (currentUserId) => async ({ get }) => {
    return await fetchUserProfile(currentUserId);
  },
});

function App() {
  const currentUserId = useRecoilValue(currentUserIdState);
  const userProfileStateLoadable = useRecoilValueLoadable(
    userProfileState(currentUserId)
  );

  const isLoading = userProfileStateLoadable.state === "loading";
  const hasError = userProfileStateLoadable.state === "hasError";

  const handleFriendsClick = useRecoilCallback(
    ({ snapshot, set }) => async (evt) => {
      const id = evt.currentTarget.dataset.id;
      snapshot.getLoadable(userProfileState(id));
      set(currentUserIdState, id);
    }
  );

  if (hasError) {
    return <div>Has Error :(</div>;
  }

  const {
    name,
    profilePic,
    likes,
    bio,
    location,
    friends,
  } = userProfileStateLoadable.contents;

  const [firstFriendsHalf, secondFriendsHalf] = splitListInHalf(friends);

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
