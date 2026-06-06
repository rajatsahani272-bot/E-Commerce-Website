import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Singup from "./pages/Signup.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AddProduct from "./admin/addProduct.jsx";
import EditProduct from "./admin/EditProduct.jsx";
import ProductList from "./admin/ProductList.jsx";
import NavBar from "./components/Navbar.jsx";
import Cart from "./pages/Cart.jsx";
import CheckoutAddress from "./pages/CheckoutAddress.jsx";
import Checkout from "./pages/Checkout.jsx";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/singup", element: <Singup /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/checkout-address", element: <CheckoutAddress /> },
      { path: "/checkout",element:<Checkout/>}
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
