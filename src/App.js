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
  if(!Cookies.get('sessionId')) {
    const oneHourLater = new Date();
      oneHourLater.setTime(oneHourLater.getTime() + (1 * 60 * 60 * 1000));
      Cookies.set('sessionId', uuidv4(), { expires: oneHourLater });
  }
}, [])

  
  return (
    <DataProvider>
      {/* <div> */}
        <RouterProvider router={router}></RouterProvider>
      {/* </div> */}
    </DataProvider>
  );
}

export default App;
