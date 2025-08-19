"use client";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react"; // cart icon

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        setProducts(await res.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const checkout = () => {
    alert("Checkout successful ✅");
    setCart([]); 
    setIsCartOpen(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shop</h1>

        {/* Cart Icon */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative bg-white border p-2 rounded-full shadow hover:shadow-md"
        >
          <ShoppingCart className="w-6 h-6 text-gray-800" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-600">
          No products yet. Check back later!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg shadow hover:shadow-lg transition bg-white"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
                <p className="text-blue-600 font-bold mt-1">${p.price}</p>
                <p className="text-gray-700 text-sm mt-2">{p.description}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-out Cart */}
      {isCartOpen && (
  <div className="fixed top-20 right-6 w-80 bg-gray-900 text-white border border-gray-700 shadow-lg rounded-lg p-4 z-50">
    <h2 className="text-xl font-bold mb-4">Your Cart</h2>
    {cart.length === 0 ? (
      <p className="text-gray-300">Your cart is empty</p>
    ) : (
      <div className="space-y-3">
        {cart.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center border border-gray-700 p-2 rounded bg-gray-800"
          >
            <span className="text-white">
              {item.name} - ${item.price}
            </span>
            <button
              onClick={() => removeFromCart(i)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-right font-bold text-lg mt-4 text-green-400">
          Total: ${total}
        </div>

        <button
          onClick={checkout}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full mt-2"
        >
          Checkout
        </button>
      </div>
    )}
  </div>
)}
    </div>
  );
}
