import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      "Context-Type": "application/jason",
      Authorization: `${token}`
    }
  });
};
export default axiosWithAuth;