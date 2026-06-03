import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];

  const loadProduct = async () => {
    try {
      const res = await api.get("/products");

      const product = res.data.find((p) => p._id === id);

      if (product) {
        setForm(product);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("ID:", id);
  console.log("FORM:", form);

    try {
      await api.put(`/products/update/${id}`, form);

      alert("Product updated successfully");

      navigate("/admin/products");

    } catch (error) {
      console.log("ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">
        Edit Product
      </h2>

      <form 
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        {allowedFields.map((key) => (
          <input
            key={key}
            name={key}
            value={form[key] || ""}
            onChange={handleChange}
            placeholder={key}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>

      </form>
    </div>
  );
}