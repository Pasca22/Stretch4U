import axios from "axios";

const BASE_URL = "http://192.168.0.127:5259/api/users";

export const loginAPI = async (username: string, password: string) => {
  const response = await axios
    .post(`${BASE_URL}/login`, {
      username,
      password,
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const signupAPI = async (
  username: string,
  password: string,
  confirmPassword: string
) => {
  const response = await axios
    .post(`${BASE_URL}/signup`, {
      username,
      password,
      confirmPassword,
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
  return response;
};
