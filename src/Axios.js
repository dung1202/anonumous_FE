import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  baseURL: "https://voucherhunter.herokuapp.com",
});




export const getslider = () => instance.get("/slider");

// export const getStudents = () => instance.get("/student");
// export const getStudentByID = (id) => instance.get(`/student/${id}`);
// export const createStudent = (body) => instance.post("/student", body);
// export const updateStudent = (body) => instance.put("/student", body);
// export const deleteStudentByID = (id) => instance.delete(`/student/${id}`);

// export const getSchools = () => instance.get("/school");
// export const createSchool = (body) => instance.post("/school", body);
// export const updateSchool = (body) => instance.put("/school", body);
// export const deleteSchoolByID = (id) => instance.delete(`/school/${id}`);
