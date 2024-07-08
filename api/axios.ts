import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.URL_SERVER;

const api = axios.create({
  baseURL,
});

// // Add a request interceptor to add authorization headers
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    // if (!!session && !!session?.user) {
    if (!!session) {
      if (!!window) {
        // Retrieve the authorization token from wherever you store it (localStorage, Vuex, etc.)
        const serverSelect = window?.sessionStorage?.getItem("server");
        // If a token exists, add it to the request headers
        // if ((session as any)?.user.token) {
        config.headers["Server"] = `${serverSelect}`;
        return config;
      }

      return config;
    } else {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
