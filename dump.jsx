import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProductCard from './components/ProductCard'
import Navbar from './components/Navbar'

function App() {

  const storeName = "DevShop"
  const year = new Date().getFullYear();

  // const [count, setCount] = useState(0)
  // const [text, setText] = useState("")

  const products = [
    {_id: "1", name: "Laptop", price: 79999, description: "14 inch laptop"},
    {_id: "2", name: "Laptop", price: 7999, description: "14 inch laptop"},
    {_id: "3", name: "Laptop", price: 999, description: "14 inch laptop"},
    {_id: "4", name: "Laptop", price: 79998, description: "14 inch laptop"},
    {_id: "5", name: "Laptop", price: 7999469, description: "14 inch laptop"},
    {_id: "6", name: "Laptop", price: 7999229, description: "14 inch laptop"},
  ]

  return (
    <div className='bg-gray-100 min-h-screen'>
      {/* <h1 className='text-4xl text-green-500 font-bold'>{storeName}</h1> */}
      {/* <p>Cart items: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Clear</button>

      <br/> */}

      {/* <input type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Search...'
      />

      {text.length > 0 ? <p>Searching for: {text}</p> : <p>Start typing to search</p>}

      {text.length > 4 && <p>That's a nice long search term</p>} */}
      
      {/* <h2>You Typed: {text}</h2> */}

      <Navbar />
      <main className='max-w-6xl mx-auto p-6'>
        <h1 className='text-2xl font bold mb-6'>Products</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <ProductCard 
            key={product._id}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
      </main>

    </div>
  )
  
}

export default App
