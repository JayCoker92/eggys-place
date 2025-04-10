import React, { useContext,useState } from "react";
import CartContext from  "../context/CartContext";
import { Link } from  "react-router-dom";
import Information from "../components/Information";
import UseTitle from "../Hooks/UseTitle";
import CartItems from "../features/cart/CartItems";





const Checkout  = () => {
  const { cart, setCart } = useContext(CartContext);
  UseTitle("Your Checkout | Eggys place");

  console.log(cart);
  function handleRemove(cartId) {
    let remove = cart.filter((cartItem) => cartItem._id !== cartId);
    console.log(333);

    setCart(remove);
  }
  let handleInc = (productId) => {
    const incQty = cart.map((cartItx) =>
      cartItx._id === productId
        ? { ...cartItx, quantity: cartItx.quantity + 1 }
        : cartItx
    );

    setCart(incQty);
  };

  let handleDec = function (itemId) {
    const decQty = cart.map((cartItx) => {
      if (cartItx._id === itemId) {
        const qty = cartItx.quantity > 1 ? cartItx.quantity - 1 : 1;
        return { ...cartItx, quantity: qty };
      }
      return cartItx;
    });
    setCart(decQty);
  };

  // total price
  const totalPrice = cart.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  return (
    <>
      <div className="bg-[#2F2F2F] text-white">
        {cart.length === 0 ? (
          "No Cart Items "
        ) : (
          <main className="bg-[#2F2F2F]">
            {/* section for  cart  */}
            <section className="text-white wrapper grid lg:grid-cols-3 gap-[20px] py-5 lg:px-[130px] ">
              {/* div for  information  */}
              <div className="lg:col-span-2 bg-black rounded-[8px] py-3 p-[15px]">
                <Information/>
                
              </div>
              {/* div for summary  */}
              <div className="rounded-[10px] bg-black p-[15px] h-fit ">
                <h2 className="text-[24px] leading-[100%] text-white py-4">
                  Summary
                </h2>
                {/* div for summary content */}
                <div className="bg-[#252422] rounded-[8px] py-3">
                  {/* div for product total */}
                  <div className="flex justify-between p-[10px]">
                    <h3 className="text-white text-[18px]">
                      Product Total({cart.length})
                    </h3>
                    <p className="text-[#B67B0F] text-[18px]">
                      &#8358; {totalPrice}
                    </p>
                  </div>
                  {/* div for vat */}
                  <div className="flex justify-between p-[10px]">
                    <h3 className="text-white text-[18px]">VAT</h3>
                    <p className="text-[#B67B0F] text-[18px]">&#8358; 1000</p>
                  </div>
                  {/* div for delivery */}
                  <div className="flex justify-between border-b-[2px] border-b-white p-[10px]">
                    <h3 className="text-white text-[18px]">Delivery</h3>
                    <p className="text-[#B67B0F] text-[18px]">&#8358; 1,500</p>
                  </div>
                  {/* div for total */}
                  <div className="flex justify-between">
                    <h3 className="text-white text-[18px] p-[10px]">Total</h3>
                    <p className="text-[#B67B0F] text-[18px]">
                      &#8358; {(totalPrice + 2500).toLocaleString()}
                    </p>
                  </div>
                </div>
                {/* div for button */}
                <Link to="/Checkout">
                  <div className="py-4">
                    <button className=" bg-[#B67B0F] leading-[100%] w-full cursor-pointer rounded-[31px] lg:whitespace-nowrap py-[15px] px-[56px] md:text-base text-white">
                      Pay Now
                    </button>
                  </div>
                </Link>

              </div>
            </section>
          
          </main>
        )}
      </div>
      
    </>
  );
};

export default Checkout;