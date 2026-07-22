import {useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import api from "../api/axios"

const SERVER = import.meta.env.VITE_SERVER_URL;

function ProductDetail() {
    const {id} = useParams(); // reads :id from the URL
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchOne = async () => {
            try{
                setLoading(true)
                const res = await api.get(`/products/${id}`)
                setProduct(res.data.data)
            } catch (err) {
                setError("product not found")
            } finally {
                setLoading(false)
            }
        }

        fetchOne();
    }, [id])

    if(loading) return <p className="max-w-4xl mx-auto p-6 text-gray-500">Loading...</p>

    if(error) return <p className="max-w-4xl mx-auto p-6 text-red-600">{error}</p>

    const imageUrl = product.image ? `${SERVER}${product.image}` : "https://placehold.co/400x300?text=No+Image"

    return(
        <main className="max-w-4xl max-auto p-6">
            <Link to="/" className="text-brand hover:underline">Back to products</Link>

            <div className="bg-white rounded-lg shadow mt-4 grid md:grid-cols-2 gap-6 p-6">
                <img src={imageUrl} alt={product.name} className="w-full h-72 object-cover rounded" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    {product.category && (
                        <p className="text-sm text-gray-500 mt-1">{product.category.name}</p>
                    )}
                    <p className="text-brand font-bold text-2xl mt-4">₹{product.price}</p>
                    <p className="text-gray-600 mt-4">{product.description}</p>
                    <button className="mt-6 bg-brand text-white px-6 py-2 rounded hover:opacity-90">
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    )
}

export default ProductDetail;