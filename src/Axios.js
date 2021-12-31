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

export const Login = (body) => instance.post("/login", body);
export const signUp = (body) => instance.post("/register", body);
export const checkToken = () => instance.post("/auth/checktoken");
export const changePwd = (body) => instance.put("/auth/changepwd", body);

export const getUserById = (id) => instance.get(`/user/${id}`);
export const updateUser = (body) => instance.put(`/user`, body);

export const getProduct = () => instance.get("/product");
export const getProductById = (id) => instance.get("/product/" + id);

export const getNews = (number) => {
  return instance.get("/news?page=" + number);
};

export const getCart = () => instance.get("/cart/auth");
export const addCart = (body) => instance.post("/cart/auth/additem", body);
export const updateItemCart = (body) =>
  instance.put("/cart/auth/changeqty", body);
export const deleteItemCart = (body) =>
  instance.delete("/cart/auth/removeitem", body);
export const deleteCart = () => instance.delete("/cart/auth/removeall");

export const createInvoice = (body) =>
  instance.post("/invoice/auth/create", body);