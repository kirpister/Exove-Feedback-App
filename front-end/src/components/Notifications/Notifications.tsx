import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteNotification, markNotificationAsRead } from "../../features/notificationsSlice";

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
      <div>
        {notifications.map((notification) => (
          <div>
            <p>{notification.message}</p>
            {!notification.isRead && (
              <button
                onClick={() =>
                  onMarkNotificationRead(notification._id)
                    .then((res) => res.json())
                    .then((res) => {
                      dispatch(markNotificationAsRead(notification._id));
                    })
                }
              >
                Mark as read
              </button>
            )}
            <button
                onClick={() =>
                  onDeleteNotification(notification._id)
                    .then((res) => res.json())
                    .then((res) => {
                      dispatch(deleteNotification(notification._id));
                    })
                }
              >
                Delete
              </button>
          </div>
        ))}
      </div>
    );
  } else {
    return <p> No notifications found</p>;
  }
};
