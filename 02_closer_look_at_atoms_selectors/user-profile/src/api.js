const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
export const fetchUserProfile = async () =>
  fetch(URL).then((res) => res.json());
