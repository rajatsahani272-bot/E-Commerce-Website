import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Singup from "./pages/Signup.jsx";
import ProductDeatails from "./pages/ProductDetails.jsx";

const router=createBrowserRouter([
  {path:"/", element:<Home/>},
  {path:"/login", element:<Login/>},
  {path:"/singup", element:<Singup/>},
  {path:"/product/:id", element:<ProductDeatails/>},
]);

export default function App(){
  return <RouterProvider router={router}/>;
}