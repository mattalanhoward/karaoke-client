import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getProfile = ({ userId }) => {
  return service
    .post("/profile", { userId })
    .then((response) => response.data)
    .catch((err) => err);
};

//post method to post new user input data to the db
export const updateProfile = ({ firstName, lastName, stageName, email, password, userId, photoUrl }) => {
    return service
      .post("/profile/editProfile", { firstName, lastName, stageName, email, password, userId, photoUrl })
      .then((response) => response.data)
      .catch((err) => err);
  };

 
  export const handleUpload = (theFile) => {
    // console.log('file in service: ', theFile)
    return service.post('/profile/upload', theFile)
      .then(res => res.data)
      .catch((err) => err);
  };

  export const saveNewThing = (newThing) => {
    console.log('new thing is: ', newThing)
    return service.post('/things/create', newThing)
      .then(res => res.data)
      .catch((err) => err);
  }