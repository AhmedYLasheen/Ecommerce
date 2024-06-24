import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MasterLayout from './Components/SharedModule/MasterLayout/MasterLayout'
import NotFound from './Components/SharedModule/NotFound/NotFound'
import Home from './Components/Layout/Home/Home'
import Cart from './Components/Layout/Cart/Cart'
import AddProduct from './Components/Layout/AddProduct/AddProduct'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          path: "product",
          element: <Home/>,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "addProduct",
          element: <AddProduct />,
        },
 
      ],
    },

  ])

  return (
    <>
    <RouterProvider router={router} />
     
    </>
  )
}

export default App
