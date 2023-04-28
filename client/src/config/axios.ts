import axios from "axios";
import api from "./api";

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;
