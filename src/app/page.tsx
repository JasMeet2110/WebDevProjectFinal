"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Tech Haven</h1>
        <p className="text-lg max-w-2xl mb-8 text-gray-200">
          Your one-stop online store for the latest and greatest in electronics.  
          From powerful laptops to cutting-edge gadgets, we bring technology closer to you.
        </p>

        <div className="flex gap-4">
          <Link
            href="/shop"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            🛒 Shop Now
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="relative bg-white text-gray-800 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Tech Haven?</h2>
          <p className="text-lg mb-6">
            At Tech Haven, we believe in making technology accessible, reliable, 
            and exciting. With a focus on quality products, secure shopping, and 
            customer-first service, we’re here to be your trusted electronics partner.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">🔒 Secure</h3>
              <p>Safe checkout and data protection for peace of mind.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">⚡ Fast</h3>
              <p>Quick processing and seamless shopping experience.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">💻 Latest Tech</h3>
              <p>Always updated with the newest gadgets and electronics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
