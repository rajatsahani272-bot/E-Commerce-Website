import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(
      `/products?search=${search}&category=${category}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  return (
    <div className="p-6">

      {/* Search + Category */}
      <div className="mb-4 flex gap-3">

        <input
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[500px] px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="">All Categories</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Tablet">Tablet</option>
          <option value="PC">PC</option>
        </select>

      </div>


      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {products.map((Product) => (
          <Link
            key={Product._id}
            to={`/products/${Product._id}`}
            className="border rounded p-3 flex flex-col items-center hover:shadow-lg transition"
          >

            <img
              src={Product.image}
              alt={Product.title}
              className="w-full h-40 object-contain bg-white rounded"
            />

            <h2 className="mt-2 font-semibold text-lg">
              {Product.title}
            </h2>

            <p className="text-gray-600">
              ${Product.price}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}