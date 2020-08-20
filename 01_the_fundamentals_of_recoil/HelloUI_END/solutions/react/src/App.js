import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import logo from "./logo.png";
import "./App.css";

const PLANETS = ["Web", "Javascript", "Earth"];

const activePlanetAtom = atom({
  key: "activePlanet",
  default: PLANETS[0],
});

const activePlanetLengthSelector = selector({
  key: "activePlanetLength",
  get: ({ get }) => {
    const activePlanet = get(activePlanetAtom);
    return activePlanet.length;
  },
});

function App() {
  const [activePlanet, setActivePlanet] = useRecoilState(activePlanetAtom);
  const activePlanetLength = useRecoilValue(activePlanetLengthSelector);

  const handlePlanetUpdate = (event) => {
    setActivePlanet(event.target.textContent);
  };

  return (
    <>
      <img src={logo} alt="hello-world-logo" width="220" height="190" />
      <p>
        Hello World from planet <span className="planet">{activePlanet}</span>
      </p>

      <section>
        {PLANETS.map((planet) => (
          <button
            className={`btn ${planet === activePlanet ? "selected" : ""}`}
            onClick={handlePlanetUpdate}
            key={planet}
          >
            {planet}
          </button>
        ))}
        <p>The current planet has {activePlanetLength} characters</p>
      </section>
    </>
  );
}

export default App;
