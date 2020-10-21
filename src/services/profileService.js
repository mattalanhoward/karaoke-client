import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const editProfile = ({ stageName, email, password, userId }) => {
    return service
      .post("/profile/editProfile", { stageName, email, password, userId })
      .then((response) => response.data)
      .catch((err) => err);
  };