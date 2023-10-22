import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import Cart from "./components/Cart/Cart";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import NotFound from "./components/NotFound/NotFound";
import CartCotextProvider from "./components/Context/CartContext";
import Profile from "./components/Profile/Profile";
import Address from "./components/Address/Address";
import AddressCash from "./components/Address/AddressCash";
import Orders from "./components/Orders/Orders";
import UserCotextProvider, {
  UserContext,
} from "./components/Context/UserContext";
 
import { useContext, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Toaster } from 'react-hot-toast';
 
let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element:  <ProtectedRoute>  <Home /> </ProtectedRoute> ,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute>   },
      {
        path: "products",
        element: <ProtectedRoute> <Products /> </ProtectedRoute>   ,
      },
      {
        path: "address",
        element: <ProtectedRoute> <Address /> </ProtectedRoute>   ,
      },
      {
        path: "addresscash",
        element: <ProtectedRoute> <AddressCash /> </ProtectedRoute>   ,
      },
      {
        path: "categories",
        element: <ProtectedRoute>  <Categories /> </ProtectedRoute> ,
      },
      {
        path: "allorders",
        element: <ProtectedRoute>  < Orders /> </ProtectedRoute> ,
      },
      {
        path: "cart",
        element: <ProtectedRoute> <Cart /> </ProtectedRoute> ,
      },
     
      {
        path: "brands",
        element: <ProtectedRoute> <Brands /> /*</ProtectedRoute>,
      },
      {
        path: "productdetails/:id",
        element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute>,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  let { setuserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setuserToken(localStorage.getItem("userToken"));
    }
  }, []);
  return (
    <>
       <UserCotextProvider>
     
          <CartCotextProvider>
            <Toaster />
            <RouterProvider router={routers}></RouterProvider>
          </CartCotextProvider>
      
      </UserCotextProvider>
    </>
  );
}

export default App;
