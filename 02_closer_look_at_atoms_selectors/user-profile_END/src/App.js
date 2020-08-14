import React from "react";
import {
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import { splitListInHalf } from "./splitListInHalf";
import User, { UserPhoto } from "./User";
import "./App.css";

// fetch data
const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
const fetchData = async (id = "") =>
  await fetch(`${URL}${id}`).then((res) => {
    if (!res.ok) {
      throw new Error(res);
    }
    return res.json();
  });

// state values
const currentUserIdState = atom({
  key: "currentUserId",
  default: "",
});

const userProfileState = selector({
  key: "userProfile",
  get: async ({ get }) => {
    const id = get(currentUserIdState);
    return await fetchData(id);
  },
});

function App() {
  const setCurrentUserId = useSetRecoilState(currentUserIdState);
  const { state, contents: userProfile } = useRecoilValueLoadable(
    userProfileState
  );
  const isLoading = state === "loading";
  const hasError = state === "hasError";

  if (hasError) {
    return <div>Has Error :( </div>;
  }

  const { name, profilePic, bio, likes, location, friends = [] } = userProfile;

  const [firstHalf, secondHalf] = splitListInHalf(friends);

  const handlePhotoClick = (evt) => {
    const id = evt.currentTarget.dataset.id;
    setCurrentUserId(id);
  };

  const renderFriends = (friends) => {
    if (isLoading) return null;
    return friends.map((id) => (
      <UserPhoto id={id} key={id} onClick={handlePhotoClick} />
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
