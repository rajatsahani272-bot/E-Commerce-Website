import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Singup from "./pages/Signup.jsx";
import ProductDeatails from "./pages/ProductDetails.jsx";
import AddProduct from "./admin/addProduct.jsx";
import EditProduct from "./admin/EditProduct.jsx";
import ProductList from "./admin/ProductList.jsx";


const router=createBrowserRouter([
  {path:"/", element:<Home/>},
  {path:"/login", element:<Login/>},
  {path:"/singup", element:<Singup/>},
  {path:"/product/:id", element:<ProductDeatails/>},
  {path:"/admin/products",element:<ProductList/>},
  {path:"/admin/products/add",element:<AddProduct/>},
  {path:"/admin/products/edit/:id",element:<EditProduct/>},
]);

export default function App(){
  return <RouterProvider router={router}/>;
}