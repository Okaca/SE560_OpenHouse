import axios from "axios";

// Prefixes API calls with the app's basePath (e.g. /openhouse/api/...)
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH || "",
});

export default client;
