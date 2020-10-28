import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getQueue = () => {
  return service
    .get(`/queue`)
    .then((response) => response.data)
    .catch((error) => console.log(`Error getting queue`, error));
};

export const getQueueDetails = (queueId) => {
  return service
    .get(`/queue/${queueId}`)
    .then((response) => response.data)
    .catch((error) => console.log(`Error getting queue details `, error));
};

export const markSongComplete = (singerSongId) => {
  return service
    .post(`/singerSong/complete`, { singerSongId })
    .then((response) => response.data)
    .catch((err) => err);
};

export const deleteSignup = (singerSongId) => {
  return service
    .post(`/singerSong/deleteSignup`, { singerSongId })
    .then((response) => response.data)
    .catch((err) => err);
};
