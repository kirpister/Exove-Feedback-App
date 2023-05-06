import axios from "axios";
import { Notification } from "../model/types/notification";

export const fetchNotifications = async () => {
  const response = await axios.get<Notification>("/user/notifications");
  const data = response.data;
  const status = response.status;
  return {
    data: data,
    status: status,
  };
};
