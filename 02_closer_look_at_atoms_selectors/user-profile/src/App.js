import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { fetchUserProfile } from "./api";
import "./App.css";

const userProfileState = atom({
  key: "userProfile",
  default: {},
});

function App() {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  useEffect(() => {
    fetchUserProfile().then((data) => setUserProfile(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>
      </header>
    </div>
  );
}

export default App;
