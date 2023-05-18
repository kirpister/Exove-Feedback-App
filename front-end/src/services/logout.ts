import axios from "axios";

export const logoutSession = async () => {
  const response = await axios.post("/api/logout");
  const status = response.status;
  return {
    status: status,
  };
};
