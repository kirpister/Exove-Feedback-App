import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteNotification,
  markNotificationAsRead,
} from "../../features/notificationsSlice";
import styles from "./Notification.module.css";

export const Notifications = () => {
  const onMarkNotificationRead = (notificationId: string) => {
    return fetch("/user/notifications", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: notificationId,
      }),
    });
  };
  const onDeleteNotification = (notificationId: string) => {
    return fetch("/user/notifications", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: notificationId,
      }),
    });
  };
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.userNotifications.notifications
  );

  if (notifications?.length) {
    return (
      <div className={styles.notifications_wrapper}>
        {notifications.map((notification) => (
          <div className={styles.all_notifications}>
            <p className={styles.message}>{notification.message}</p>

            {!notification.isRead && (
              <button
                className={styles.note_btn}
                onClick={() =>
                  onMarkNotificationRead(notification._id)
                    .then((res) => res.json())
                    .then((res) => {
                      dispatch(markNotificationAsRead(notification._id));
                    })
                }
              >
                <i className="fa-solid fa-check"></i>
              </button>
            )}

            <button
              className={styles.note_btn}
              onClick={() =>
                onDeleteNotification(notification._id)
                  .then((res) => res.json())
                  .then((res) => {
                    dispatch(deleteNotification(notification._id));
                  })
              }
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return <p style={{marginLeft: "3rem"}}> No notifications found</p>;
  }
};
