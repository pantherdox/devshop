import { createContext, useState } from "react";

export const NotificationContext = createContext();

export default function NotificationProvider({children}) {
    const [message, setMessage] = useState("No Notifications")

    return (
        <NotificationContext.Provider value={{ message, setMessage}}>
            {children}
        </NotificationContext.Provider>
    )
}