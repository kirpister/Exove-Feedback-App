import axios from "axios";
import { UserDetails } from "../common/types/UserDetails";

export const validateSession = async () => {
  const response = await axios.post<UserDetails>("/api/private/validate");
  const data = response.data;
  const status = response.status;
  return {
    data: data,
    status: status,
  };
};
