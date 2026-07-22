const SERVER = import.meta.env.VITE_SERVER_URL

function ProductCard({product}) {

    const imageUrl = product.image ? `${SERVER}${product.image}` : "https://placehold.co/400x300?text=No+Image"

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <img src={imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-brand font-bold text-xl mt-1">₹{product.price}</p>
            <p className="text-gray-500 text-sm mt-2">{product.description}</p>
            </div>
        </div>
    )
}

export default ProductCard;