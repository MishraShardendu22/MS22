import axios from "axios";
import { BackendURL } from "../data";

export const api = axios.create({
  baseURL: BackendURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
