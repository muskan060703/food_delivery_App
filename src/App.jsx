import "./App.css";
import  {lazy,Suspense} from "react";
import Body from "./components/Body";
import Error from "./components/Error";
import About from "./components/About";
import Contact from "./components/Contact";
// import Grocery from "./components/Grocery";
import { Header } from "./components/Header";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Grocery = lazy(()=> import("./components/Grocery")) //this import is a function not same as the above imports 
//this will now take the path to go to the grocery 
//importing the grocery component using lazy function 

function AppLayout() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // app layout has 3 childrens 
    children: [
      {
        path : "/",
        element : <Body/>
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path : "/grocery",
        element : <Suspense fallback = {<h2>Loading</h2>}><Grocery/></Suspense>,
      },
      {
        path : "/restaurant/:resId",
        element : <RestaurantMenu/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
