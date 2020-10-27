import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getQueueDetails = (queueId) => {
  return service
    .get(`/queue/${queueId}`)
    .then((response) => response.data)
    .catch((error) => console.log(`Error getting queue details `, error));
};
