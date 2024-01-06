import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Items from "./components/Items";
import ItemDetails from "./components/ItemDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Main from "./components/Main";
import Home from "./components/Home";
import { useState, useEffect, createContext, Suspense } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";


export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(`No connection to the database: `, error.message));
  }, []);
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const CartContext = createContext();
export const CartProvider = ({ children}) => {
  const [cart, setCart] = useState(() => {    
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
  });
  return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>;
}


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
        element: <Suspense fallback={<div>Loading...</div>}> <Items /></Suspense>,
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

useEffect(() => {
  const currentSessionId = Cookies.get('sessionId');
  const oneHourLater = new Date(new Date().getTime() + 60 * 60 * 1000);

  if(!currentSessionId) {
    Cookies.set('sessionId', uuidv4(), { expires: oneHourLater} );
  }

  const cartExpiry = localStorage.getItem('cartExpiry');
  if(!cartExpiry || new Date().getTime() > parseInt(cartExpiry)) {
    localStorage.removeItem('cart');
    localStorage.removeItem('cartExpiry');
  }

  localStorage.setItem('cartExpiry', oneHourLater.getTime());
}, [])

  
  return (
    <DataProvider>
      {/* <div> */}
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
      {/* </div> */}
    </DataProvider>
  );
}

export default App;
