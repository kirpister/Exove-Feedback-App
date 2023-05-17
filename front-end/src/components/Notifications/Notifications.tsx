import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteNotification, markNotificationAsRead } from "../../features/notificationsSlice";
import styles from "./Notification.module.css";

export const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
  enum Message {
    requestFeedback = "You have been requested for feedback",
    askForUserList = "Please send userlist to initiate feedback process",
    pendingFeedbackApproved = "New feedback Request is pending for your approval",
    answerFeedback = "Please submit feedback",
  }
  const checkAnswerRouter = (message: string) => {
    switch (message) {
      case Message.requestFeedback :
        return navigate("/answer", { state: { show: true } });
      case Message.askForUserList:
        return navigate("/requestfeedback", { state: { show: true } });
      case Message.pendingFeedbackApproved:
        return navigate("/getuserlist", { state: { show: true } });
      default:
        return navigate("/answer", { state: { show: true } });
    }
  };

  const notifications = useAppSelector((state) => state.userNotifications.notifications);

  if (notifications?.length) {
    return (
      <div className={styles.notifications_wrapper} onClick={() => {}}>
        {notifications.map((notification) => (
          <div className={styles.all_notifications}>
            <p className={styles.message}>{notification.message}</p>

            {!notification.isRead && (
              <>
                <button
                  className={styles.note_btn}
                  onClick={() => {
                    checkAnswerRouter(notification.message);
                  }}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
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
              </>
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
    return <p> No notifications found</p>;
  }
};
