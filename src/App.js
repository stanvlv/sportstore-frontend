import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Items from "./components/Items";
import ItemDetails from "./components/ItemDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Main from "./components/Main";
import Home from "./components/Home";
import { useState, useEffect, createContext, Suspense } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

// setting context for the cart quantity for the navbar
export const CartQuantityContext = createContext();
export const CartQuantityProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const itemCount = cart
      ? cart.reduce((total, item) => total + item.quantity, 0)
      : 0;
    setCartItemCount(itemCount);
  }, []);

  // Function to update the cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const itemCount = cart
      ? cart.reduce((total, item) => total + item.quantity, 0)
      : 0;
    setCartItemCount(itemCount);
  };
  return (
    <CartQuantityContext.Provider value={{ cartItemCount, updateCartCount }}>
      {children}
    </CartQuantityContext.Provider>
  );
};

// setting context for the products data
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) =>
        console.log(`No connection to the database: `, error.message)
      );
  }, []);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// setting context for the cart orders data
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/items",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Items />
          </Suspense>
        ),
      },
      {
        path: "/items/:id",
        element: <ItemDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

function App() {
  // setting cookies for the session id, used in orders
  useEffect(() => {
    const currentSessionId = Cookies.get("sessionId");
    const oneHourLater = new Date();
    oneHourLater.setTime(oneHourLater.getTime() + 60 * 60 * 1000);
    if (!currentSessionId) {
      Cookies.set("sessionId", uuidv4(), { expires: oneHourLater });
    }
    const cartExpiry = localStorage.getItem("cartExpiry");
    if (!cartExpiry || new Date().getTime() > parseInt(cartExpiry)) {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartExpiry");
    }

    localStorage.setItem("cartExpiry", oneHourLater.getTime());
  }, []);

  return (
    <DataProvider>
      <CartProvider>
        <CartQuantityProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartQuantityProvider>
      </CartProvider>
    </DataProvider>
  );
}

export default App;
