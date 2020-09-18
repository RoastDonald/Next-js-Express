import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

const handleErrors = ({ data, status }) => {
  if (status > 400) {
    throw data;
  }
};

export default {
  login: async (userCredentials) => {
    try {
      const { data } = await server.post("/api/users/login", userCredentials);
      return data;
    } catch ({ response }) {
      handleErrors(response);
    }
  },
  logout: async () => {
    try {
      const { data } = await server.get("/api/users/logout");
      return data;
    } catch ({ response }) {
      handleErrors(response);
    }
  },
  register: async (userCredentials) => {
    try {
      const { data } = await server.post(
        "/api/users/register",
        userCredentials
      );
      return data;
    } catch ({ response }) {
      handleErrors(response);
    }
  },
  me: async () => {
    try {
      const { data } = await server.get("/api/users/me");
      return data;
    } catch ({ response }) {
      handleErrors(response);
    }
  },
};
