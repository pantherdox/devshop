import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function NotificationBar() {
    const {message} = useContext(NotificationContext)

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow">
            <h2 className="text-xl font-bold text-blue-700 mb-2">🔔 Notification</h2>

            <p className="text-gray-700 text-lg">{message}</p>
        </div>
    )
}