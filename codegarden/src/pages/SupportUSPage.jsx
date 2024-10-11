import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const SupportUsPage = () => {
  const [activeTab, setActiveTab] = useState('paypal');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Support Us</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex mb-4">
          <motion.button
            className={`flex-1 py-2 ${activeTab === 'paypal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('paypal')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PayPal
          </motion.button>
        </div>

        {activeTab === 'paypal' && (
          <PayPalScriptProvider options={{ "client-id": "AZDJNYJunr27NPtXVN_5JWncvGTU6GiLDDV4K1uTwes8i6LwxzAvJV3EbZlYfLWf4YzeO6im9QA1RKsT" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "10.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  console.log('PayPal transaction completed', details);
                  // Handle successful payment here
                });
              }}
            />
          </PayPalScriptProvider>
        )}

        <p className="mt-8 text-center text-gray-600">
          Your support helps us continue to provide and improve our services. Thank you for your generosity!
        </p>
      </div>
    </div>
  );
};

export default SupportUsPage;
