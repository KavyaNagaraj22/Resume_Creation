// frontend/src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // change to your deployed backend URL when hosting
});

export default instance;
