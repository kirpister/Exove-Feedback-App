import { useAppSelector } from "../../app/hooks"

export const Notifications = () => {
    const notifications = useAppSelector((state) => state.userNotifications.notifications);
    if(notifications?.length) {
        return <>{notifications.map(notification => (<p>{notification.message}</p>))}</>
        
    } else {
        return <p> No notifications found</p>
    }
}