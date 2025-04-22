import React , { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
// import { sidebarLinks } from "../db";
import SimilarProducts from "../components/SimilarProducts";
import CartContext from "../context/CartContext";
import UseTitle from "../Hooks/UseTitle";
import helloIcon from "../assets/helloIcon.svg";
import orderIcon from "../assets/OrdersIcon.svg";
import inbox from "../assets/MailIcon.svg";
import logOut from "../assets/LogOutIcon.png";
import checkIcon from "../assets/DangerIcon.svg";
import navlogo from "../assets/nav-logo.svg";



const Orders = () => {

  const today = new Date().toLocaleDateString();

  const { cart, setCart } = useContext(CartContext);
  console.log(cart);

  UseTitle("Your OrderPage | Eggys place");

  function handleRemove(cartId) {
    let remove = cart.filter((cartItem) => cartItem._id !== cartId);
    console.log(333);

    setCart(remove);
  }
  


  return (
    <>
  <header className="bg-[#252422]">
<main className="wrapper min-h-screen p-6 md:flex ">
      {/* Sidebar */}
      <section className= "bg-black text-white w-60  h-60 p-4 space-y-4 rounded-xl mx-15 md:block hidden">
      <aside className="  bg-[#1b1a1a] text-white md:block hidden">
        <div className="space-y-4 ">
          <div className=" mx-4 flex items-center space-x-2 rounded-lg hover:text-[#B67B0F] text-white cursor-pointer">
          <img src={helloIcon} alt="accountIcon" />
        <h4>  My Account</h4>
        
        </div>
        <div className="flex  mx-4 items-center space-x-2 rounded-lg hover:text-[#B67B0F] text-white cursor-pointer">
        <img src={inbox} alt="orderIcon" />
          <h4> Inbox</h4>
           </div>
           
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
                ? "block bg-yellow-600 text-black py-2 px-4 rounded"
                : "block py-2 px-4"
            }
          > <div className="flex items-center space-x-2 rounded-lg gap-2  bg-[#B67B0F] text-white cursor-pointer"><img  className=""src={orderIcon} alt="orderIcon" />
            Orders
            </div>
          </NavLink>
          <div className="flex mx-4 gap 2 cursor-pointer text-red-600 hover:text-[#B67B0F]">
          <img src={logOut} alt="" /> Log Out
          </div>
          
          {/* <button className=" hover:bg-[#B67B0F] cursor-pointer flex gap-1 px-4 py-2 text-sm text-red-600 "
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  <img src={logOut} alt="" /> Log Out
          </button> */}
          
          {/* <dialog
                  id="my_modal_2"
                  className="modal h-fit flex justify-center items-center"
                >
                  <form method="dialog" className="modal-backdrop">
                    <div className="modal-box bg-[#252422] w-[425px]  p-6 flex flex-col items-center justify-center text-center ">
                      <div>
                        <img
                          className="mb-4"
                          src={checkIcon}
                          // src={checkIcon}
                          alt="check-image"
                        />
                      </div>
                      <h3 className="font-bold text-lg text-white ">Log Out</h3>
                      <p className="py-4 text-white">
                        Are you sure, you want to Log out?
                      </p>
                      <div className="flex justify-center gap-17 w-full mt-4">
                        <Link to="Cart">
                        <button
                          onClick={logOut}
                          className="btn text-white rounded-4xl bg-[#252422] w-35 h-10"
                        >
                          Log Out
                        </button>
                        </Link>
                        <button className="btn cursor-pointer text-white rounded-4xl bg-[#B67B0F] w-35 h-10">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </dialog> */}
         
        </div>
      </aside>
      </section>
      {/* Main Orders Section */}
      <section className="container mx-auto md:w-[1000px] w-[328px] bg-black pl-3 pr-3">
        <h1 className="text-xl font-semibold mb-4">Orders</h1>

        {/* Sub-navigation */}
        <div className="flex space-x-6 border-b border-gray-600 mb-4 text-white">
          <NavLink
            to="delivered"
            end
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-yellow-500 text-yellow-500"
                : "pb-2 text-white hover:text-yellow-500"
            }
          >
            Ongoing/Delivered
          </NavLink>

          <NavLink
            to="cancelled"
            className={({ isActive }) =>
              isActive
                ? "pb-2 border-b-2 border-yellow-500 text-yellow-500"
                : "pb-2 text-white hover:text-yellow-500"
            }
          >
            Cancelled
          </NavLink>
          </div>

         <Outlet />
          
         <div>
  {cart.map((itx, index) => {
    const modalId = `modal_${index}`; // unique modal ID
    return (
      <div key={itx._id} className="md:block hidden">
        <div className="card card-side bg-[#252422] shadow-sm w-[890px] h-[200px]">
          <figure>
            <img src={itx.image} alt="burgerImg" />
          </figure>
          <div className="card-body border-black">
            <div className="space-y-4">
              <h2 className="card-title text-white text-2xl">{itx.title}</h2>
              <p className="text-white text-xl">&#8358;{itx.price}</p>
              <p className="text-white">{today}</p>
              <span className="bg-green-600 text-white cursor-pointer hover:text-[#B67B0F] text-xs px-3 py-1 rounded-full">
                Delivered
              </span>
            </div>
           
            <div className="card-actions justify-end">
              <h2 className="text-[#B67B0F] cursor-pointer">
                <button
                  className="cursor-pointer hover:text-white"
                  onClick={() =>
                    document.getElementById(modalId).showModal()
                  }
                >
                  View Details...
                </button>
              
                {/* Modal with unique ID and dynamic data */}
                <dialog id={modalId} className="modal">
                  <div className="modal-box bg-[#252422] text-white">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </form>
                    <div className="space-y-4">
                      <img
                        className="w-20 mx-auto mb-2"
                        src={navlogo}
                        alt="navlogo-Icon"
                      />
                      <h3 className="text-lg font-bold">{itx.title}</h3>
                      <p><strong>Price:</strong> ₦{itx.price}</p>
                      <p><strong>Quantity:</strong> {itx.quantity || 1}</p>
                      <p><strong>Date Ordered:</strong> {today}</p>
                      <p><strong>Status:</strong> <span className="text-green-500">Delivered</span></p>
                      {/* You can expand with more details like description, order ID, etc. */}
                    </div>
                  </div>
                </dialog>
              </h2>
            </div>

            <div className=" flex ">
              <p className="bg[#252422] text-white px-3 py-1 rounded text-xl hover:text-[#B67B0F] cursor-pointer ">
                Page 1 of 2
              </p>
                <p className="bg-[252422] text-gray-300 px-3 py-1 rounded text-xl hover:text-[#B67B0F] cursor-pointer ">
                  Prev
                </p>
                <p className="bg-[252422] text-gray-300 px-3 py-1 rounded hover:text-[#B67B0F] text-xl cursor-pointer">
                  Next
                </p>
              </div>

          </div>
        </div>
      </div>
    );
  })}
</div>
        
      </section>
    </main>
      {/* <main className="wrapper grid grid-cols-3 gap-4">
        <section className="col-span-1 border">
          {sidebarLinks.map((sidebar) => {
            const { id, path, Icon, name } = sidebar;
            return (
              <div key={id} >
                <NavLink key={id} to={path} end>
                  {({ isActive, isPending }) => (
                    <span className="">
                      <h6> {name} </h6>
                    </span>
                  )}
                </NavLink>
               
              </div>
            );
          })}
          <h1>Orders</h1>
          <h1>logout</h1>
        </section>

        <section className="border col-span-2">
          <Outlet />
        </section>
      </main> */}
      <SimilarProducts/>
   
    </header>
    </>
  );
};

export default Orders;