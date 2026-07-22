import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function NotificationSender() {
    const {setMessage} = useContext(NotificationContext)

    return (
        <div className="flex flex-wrap gap-4 mt-6">
            <button
            onClick={() => {
                setMessage("Product added successfully")
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >Add Product</button>
            <button
            onClick={() => {
                setMessage("Product added to cart successfully")
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >Add to cart</button>
        </div>
    )
}