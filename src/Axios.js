import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  baseURL: "https://voucherhunter.herokuapp.com",
  // baseURL: "http://localhost:4000",
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  req.headers["Authorization"] = "Bearer " + token;
  return req;
});

export const getslider = () => instance.get("/slider");
export const Login = (body) => instance.post("/login", body);
export const signUp = (body) => instance.post("/register", body);
export const getUserById = (id) => instance.get(`/user/${id}`);
