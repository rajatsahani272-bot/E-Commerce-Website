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


  const addToCart = async (productId) => {

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login to add items to your cart.");
      return;
    }


    const res = await api.post("/cart/add", {
      userId,
      productId
    });


    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );


    localStorage.setItem("cartCount", total);


    window.dispatchEvent(
      new Event("cartUpdated")
    );

  };


  return (

    <div className="p-6">


      {/* Search + Category */}

      <div className="mb-4 flex gap-3">

        <input
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[500px] px-4 py-2 border border-gray-300 rounded-lg"
        />


        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="w-full md:w-48 px-4 py-2 border rounded-lg"
        >

          <option value="">
            All Categories
          </option>

          <option value="Mobile">
            Mobile
          </option>

          <option value="Laptop">
            Laptop
          </option>

          <option value="Tablet">
            Tablet
          </option>

          <option value="PC">
            PC
          </option>

        </select>


      </div>



      {/* Products Grid */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">


        {
          products.map((product)=>(


          <div
          key={product._id}
          className="border rounded p-3 flex flex-col items-center hover:shadow-lg transition"
          >


            <Link
            to={`/products/${product._id}`}
            >

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain bg-white rounded"
              />


              <h2 className="mt-2 font-semibold text-lg">

                {product.title}

              </h2>


              <p className="text-gray-600">

                ${product.price}

              </p>


            </Link>



            <button
            onClick={()=>addToCart(product._id)}
             className="
    mt-3 
    w-full 
    bg-blue-500 
    text-white 
    py-2 
    rounded-lg 
    font-medium
    hover:bg-blue-900 
    transition 
    duration-200
     active:bg-green-600
  "
            >

              Add To Cart

            </button>


          </div>


          ))
        }


      </div>


    </div>

  );

}