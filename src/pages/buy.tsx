import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Head from 'next/head';

const BuyProduct: React.FC = () => {
  const router = useRouter();
  const { id, name, price, quantity } = router.query; // Retrieve product info from query parameters
  const [buyquantity, setBuyQuantity] = useState<number>(1); // State to manage user's input quantity
  const [totalPrice, setTotalPrice] = useState<string>('0.00'); // State to store total price
  const [showModal, setShowModal] = useState<boolean>(false); // State to handle modal visibility
  const [errorMessage, setErrorMessage] = useState<string>(''); // State to store error messages

  useEffect(() => {
    const unitPrice = parseFloat(price as string) || 0; // Convert price to float or use 0 if undefined
    const calculatedTotal = (unitPrice * buyquantity).toFixed(2); // Calculate total price and format to 2 decimals
    setTotalPrice(calculatedTotal); // Update state with formatted total price
  }, [price, buyquantity]); // Recalculate whenever price or quantity changes

  // Handle quantity changes and validate input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const maxQuantity = parseInt(quantity as string) || 0; // Convert available quantity to a number or default to 0

    if (value < 1) {
      setErrorMessage('Quantity must be at least 1');
      setBuyQuantity(1);
    } else if (value > maxQuantity) {
      setErrorMessage(`Quantity cannot exceed available stock of ${maxQuantity}`);
      setBuyQuantity(maxQuantity);
    } else {
      setErrorMessage('');
      setBuyQuantity(value);
    }
  };

  // Function to handle purchase confirmation
  const handlePurchase = () => {
    setShowModal(true); // Show confirmation modal
  };

  // Function to proceed with the purchase
  
  const confirmPurchase = () => {
    setShowModal(false);
    setShowModal(false);
    alert(`Purchasing ${buyquantity} unit(s) of ${name} for a total of $${totalPrice}`);
    // Redirect to the confirmation page with query parameters
    router.push({
      pathname: '/payment', // Path to the confirmation page
      query: { 
        name, // Product name
        quantity: buyquantity.toString(), // Convert quantity to string
        totalPrice // Total price
      }
    });
  };
  
  return (
    <>
      <Head>
        <title>Buy Product | AgriBazaar</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <div className="bg-gradient-to-r from-green-100 to-sky-200 min-h-screen flex flex-col">
        <Header />
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow mt-20">
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-green-900 mb-6 flex items-center">
              Buy {name}
            </h1>
            <div className="flex flex-col lg:flex-row lg:items-center mb-6">
              <div className="flex-1 mb-4 lg:mb-0">
                <p className="text-gray-700 mb-2"><strong>Price per unit:</strong> ${price}</p>
                <p className="text-gray-700 mb-2"><strong>Available Stock:</strong> {quantity}</p>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={buyquantity}
                    onChange={handleQuantityChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  />
                </label>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </div>
              <div className="lg:ml-8 lg:flex-none">
                <p className="text-gray-800 font-bold text-lg">
                  Total Price: <span className="text-green-600">${totalPrice}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.back()}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Back to Product
              </button>
              <button
                onClick={handlePurchase}
                disabled={!!errorMessage}
                className={`${
                  errorMessage ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                } text-white px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105`}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </main>
        <Footer />

        {/* Modal for Purchase Confirmation */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Your Purchase</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to purchase {buyquantity} unit(s) of {name} for a total of ${totalPrice}?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPurchase}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuyProduct;
