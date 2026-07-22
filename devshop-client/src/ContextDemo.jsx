import NotificationProvider from "./context/NotificationContext";
import NotificationBar from "./components/NotificationBar";
import NotificationSender from "./components/NotificationSender";

export default function ContextDemo() {
    return (
        <NotificationProvider>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w- 2xl">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                        React Context API Demo
                    </h1>
                    <NotificationBar />
                    <NotificationSender />
                </div>
            </div>
        </NotificationProvider>
    )
}