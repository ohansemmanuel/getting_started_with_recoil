import React from "react";

const User = ({ profilePic, bio, likes, name, location, isLoading }) => {
  return (
    <div className={!isLoading ? "Card" : "Card Card--loading"}>
      <section className={"User__img"}>
        {profilePic && <img src={profilePic} alt="user" />}
      </section>
      {!isLoading && (
        <section className="User__info">
          <p>
            <span role="img" aria-label="owl">
              🦉
            </span>{" "}
            {bio}
          </p>
          <p>
            <span role="img" aria-label="green">
              🌴{" "}
            </span>{" "}
            {likes}
          </p>
          <p className="User__info__details User__info__divider faint">
            <span>Name: </span>
            <span>{name}</span>
          </p>
          <p className="User__info__details faint">
            <span>Location: </span>
            <span>{location}</span>
          </p>
        </section>
      )}
    </div>
  );
};

export const UserPhoto = ({ onClick, id }) => {
  const userId = id.slice(0, id.indexOf(".")); //remove .jpeg/.png etc.

  return (
    <button className="UserPhoto" onClick={onClick} data-id={userId}>
      <img src={`https://i.imgur.com/${id}`} alt="user" />
    </button>
  );
};

export default User;
