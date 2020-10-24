import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const searchArtistSongs = (searchParams) => {
  return service
    .get(`/search/songs/${searchParams}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const singerSong = (userId, songId) => {
  return service
    .post(`/singerSong`, { songId, userId })
    .then((response) => response.data)
    .catch((err) => err);
};
