import axios from "axios";
import { personalDetailType } from "../model/types/user";

export const fetchUserPersonalDetails = async () => {
  const response = await axios.get<personalDetailType>("/user");
  const data = response.data;
  const status = response.status;
  return {
    data: data,
    status: status,
  };
};