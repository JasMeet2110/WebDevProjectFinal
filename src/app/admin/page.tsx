"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") router.replace("/login");
    else if (session?.user?.role !== "admin") router.replace("/");
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchProducts();
    }
  }, [status, session]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (res.ok) setProducts(await res.json());
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setForm({ ...form, image: data.url });
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    setForm({ name: "", price: "", description: "", image: "" });
    fetchProducts();
  };

  const updateProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    setEditingId(null);
    setForm({ name: "", price: "", description: "", image: "" });
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (status === "loading") return <div className="p-6 text-black">Loading session...</div>;
  if (session?.user?.role !== "admin") return null;

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Form */}
      <form onSubmit={addProduct} className="space-y-3 mb-8 bg-gray-50 p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Add Product</h2>

        <label className="block">
          <span className="text-sm">Product Name</span>
          <input
            className="border p-2 w-full rounded text-black bg-white"
            placeholder="Enter product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-sm">Price</span>
          <input
            className="border p-2 w-full rounded text-black bg-white"
            placeholder="Enter price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-sm">Description</span>
          <textarea
            className="border p-2 w-full rounded text-black bg-white"
            placeholder="Enter product description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="text-sm">Upload Product Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="border p-2 w-full rounded text-black bg-white"
          />
        </label>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>

      {/* Products List */}
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p._id} className="border rounded p-4 bg-white shadow flex justify-between">
            {editingId === p._id ? (
              <div className="flex-1 space-y-2">
                <label className="block">
                  <span className="text-sm">Product Name</span>
                  <input
                    className="border p-2 w-full rounded text-black bg-white"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Price</span>
                  <input
                    className="border p-2 w-full rounded text-black bg-white"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="Enter price"
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Description</span>
                  <textarea
                    className="border p-2 w-full rounded text-black bg-white"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Upload New Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="border p-2 w-full rounded text-black bg-white"
                  />
                </label>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateProduct(p._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-32 h-32 object-cover mb-2 rounded"
                  />
                )}
                <h2 className="font-bold text-lg text-black">{p.name}</h2>
                <p className="text-gray-600">${p.price}</p>
                <p className="text-sm text-black">{p.description}</p>
              </div>
            )}
            <div className="flex flex-col justify-center gap-2 ml-4">
              {editingId === p._id ? null : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(p._id);
                      setForm({
                        name: p.name,
                        price: p.price,
                        description: p.description,
                        image: p.image,
                      });
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
