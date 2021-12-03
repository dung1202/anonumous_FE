import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  baseURL: "https://voucherhunter.herokuapp.com",
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  req.headers["Authorization"] = "Bearer " + token;
  return req;
});

export const getslider = () => instance.get("/slider");
export const Login = (body) => instance.post("/login", body);
