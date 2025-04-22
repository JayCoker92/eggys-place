import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import MyButton from "../../components/MyButton";
import paystackPop from "@paystack/inline-js";

const PayNowSummary = ({ recipientInfo, deliveryInfo, totalPrice }) => {
  const { user } = useAuth(); // Access user from AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handlePayment = () => {
    // Check if the user is signed in
    if (!user) {
      toast.error("You must be signed in to proceed with payment.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Validate recipientInfo
    if (!recipientInfo.fullName || !recipientInfo.phoneNumber || !recipientInfo.email) {
      toast.error("Please fill in all recipient information.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Validate deliveryInfo
    if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.state) {
      toast.error("Please fill in all delivery information.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Validate email and totalPrice
    if (!recipientInfo.email) {
      toast.error("Email is required to proceed with payment.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!totalPrice || totalPrice <= 0) {
      toast.error("Total price is invalid.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Open the modal for Paystack payment
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      const paystackInstance = new paystackPop();
      const PK = import.meta.env.VITE_TEST_PUBLIC_KEY; // Replace with your Paystack public key

     const onSuccess = async (transaction) => {

        try {
          const response = await fetch("http://localhost:4040/api/order",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Use user token from AuthContext
            },
            body: JSON.stringify({
              orderdedItems: cart,
              recipientInfo,
              deliveryInfo,
              totalPrice,
              paymentRef: transaction.reference,
            }),
          });
          const data = await response.json();
        } catch (error) {
          
        }
        // if(data.success){
        //  alert(`${data.message} ${transaction.reference}`);
        //  console.log(response);
        // }
        toast.success(`Payment Successful! Ref: ${transaction.reference}`, {
          position: "top-center",
          autoClose: 3000,
          
        });

        setIsModalOpen(false); // Close the modal
        // Navigate to orders page or perform any post-payment actions
        window.location.href = "/order"; // Redirect to Order.jsx
      };

      const onCancel = () => {
        toast.error("Payment Cancelled", {
          position: "top-center",
          autoClose: 3000,
        });
        setIsModalOpen(false); // Close the modal
      };

      // Initialize the Paystack transaction
      paystackInstance.newTransaction({
        key: PK,
        amount: totalPrice * 100, // Convert amount to kobo
        email: recipientInfo.email,
        onSuccess,
        onCancel,
      });
    }
  }, [isModalOpen, recipientInfo.email, totalPrice]);

  return (
    <section className="p-[15px] rounded-[10px] bg-black text-white w-full h-fit mt-3 sticky top-31">
      <h1 className="font-[500] text-[24px] pb-[15px]">Summary</h1>
      <div className="bg-[#252422] p-[10px] rounded-[8px] w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-[400] text-[18px]">Product Total</h3>
          <p className="text-[#B67B0F] font-[500] text-[18px]">
            <span>&#8358;</span>
            <span className="ms-1">{totalPrice - 2500}</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-[400] text-[18px]">Delivery</h3>
          <p className="text-[#B67B0F] font-[500] text-[18px]">
            <span>&#8358;</span> 2500
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center font-[600] text-[18px]">
          <h1>Total</h1>
          <p className="text-[#B67B0F]">
            <span>&#8358;</span> {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <MyButton
          text="Pay Now"
          className="w-full h-[56px] text-[20px] font-[500]"
          onClick={handlePayment}
        />
      </div>

      {/* Modal for Paystack Payment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]">
            <h2 className="text-xl font-bold mb-4">Processing Payment...</h2>
            <p className="mb-4">Please wait while we process your payment.</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PayNowSummary;