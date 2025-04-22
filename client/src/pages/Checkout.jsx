import React, { useState, useContext } from "react";
import CartContext from "../context/CartContext";
import { calculateTotalPrice } from "../utils/CartUtils";
import Information from "../features/Checkout/Information";
import PayNowSummary from "../features/Checkout/PayNowSummary";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  // State for recipient information
  const navigate = useNavigate("/Order");
  const [recipientInfo, setRecipientInfo] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  // State for delivery information
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    state: "",
  });

  const { cart } = useContext(CartContext);
  const totalPrice = calculateTotalPrice(cart) + 2500; // Add delivery fee

  return (
    <main className="bg-[#2F2F2F]">
      <section className="grid lg:grid-cols-3 gap-[20px] py-3 lg:px-[130px]">
        {/* Pass recipientInfo and setRecipientInfo to Recipient */}
        <div className="lg:col-span-2">
          <Information
            recipientInfo={recipientInfo}
            setRecipientInfo={setRecipientInfo}
            deliveryInfo={deliveryInfo}
            setDeliveryInfo={setDeliveryInfo}
          />
        </div>
        {/* Pass recipientInfo and deliveryInfo to CheckoutSummary */}
        <div className="lg:col-span-1">
          <PayNowSummary
            recipientInfo={recipientInfo}
            deliveryInfo={deliveryInfo}
            totalPrice={totalPrice}
          />
        </div>
      </section>
    </main>
  );
};

export default Checkout;