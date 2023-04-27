import axios from "axios";

export const logoutSession = async () => {
  const response = await axios.post("/logout");
  const status = response.status;
  return {
    status: status,
  };
};
