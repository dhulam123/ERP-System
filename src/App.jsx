import { useNavigate } from "react-router-dom";
import { allOrders } from "./constants/orders";
import { allProducts } from "./constants/products";

const App = () => {
  const totalProducts = allProducts.length;
  const totalOrders = allOrders.length;
  const navigate = useNavigate();

  return (
    <div className="flex bg-red-100">

      <div className="bg-gray-600 w-1/3 h-screen p-8 pt-16">
      <div className="w-32 h-32 p-4 rounded-full bg-red-600 m-auto text-white text-6xl font-extrabold flex items-center justify-center border-solid border-4 border-white">
          D
        </div>
        <h1 className="text-3xl p-6 font-extrabold text-center text-white">Dashboard</h1>
        <hr />

        <div className="grid grid-rows-2 mt-12 py-3 gap-10">
          <button className="bg-white text-red-600 hover:text-white hover:bg-blue-600 font-extrabold px-6 py-3 mx-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none border-solid border-2 border-white"
            onClick={() => navigate("/products")} >
            Manage Products
          </button>

          <button className="bg-white text-red-600 hover:text-white hover:bg-green-600 font-extrabold px-6 py-3 mx-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none border-solid border-2 border-white"
            onClick={() => navigate("/orders")} >
            Manage Orders
          </button>
        </div>
      </div>
      
      <div className="flex flex-col w-full h-50 py-3 gap-10 items-center justify-center bg-[url('https://plus.unsplash.com/premium_photo-1682309543429-6aaa6d792dae?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JhcGhzfGVufDB8fDB8fHww')] bg-cover">
          <div className="bg-blue-600 p-6 rounded-md h-28 w-80 my-6 hover:scale-105 transition duration-300 ease-in-out">
            <p className="text-lg font-semibold text-white text-center">Total Products</p>
            <p className="text-4xl font-extrabold text-white text-center">{totalProducts}</p>
          </div>

          <div className="bg-green-700 p-6 rounded-md h-28 w-80 my-6 hover:scale-105 transition duration-300 ease-in-out">
            <p className="text-lg font-semibold text-white text-center">Total Orders</p>
            <p className="text-4xl font-extrabold text-white text-center">{totalOrders}</p>
          </div>
      </div>
    </div>   
  );
};

export default App;
