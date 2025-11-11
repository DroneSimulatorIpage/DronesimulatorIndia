import React, { useState } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

const MiniCart: React.FC = () => {
  const { items, totalItems, totalPrice, removeItem } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

const handleCheckout = async () => {
  if (items.length === 0) return;

  const item = items[0];
  const stripe_price_id = item.stripe_price_id || 'price_1RcJttCKYG7gRDVPBkHPkocp';

  const token = sessionStorage.getItem('auth_token');
  if (!token) {
    alert('Please login and try again.');
    return;
  }

  try {
    const response = await fetch('https://34-47-194-149.nip.io/api/stripe/create-checkout-session/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ stripe_price_id }),
    });

    const data = await response.json();

    console.log('Checkout API Response:', data); // ✅ log full response

    if (response.ok && data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert(data.message || 'Stripe checkout failed. Check console.');
    }
  } catch (err) {
    console.error('Fetch Error:', err);
    alert('Something went wrong. Please try again.');
  }
};




  const handleCartClick = () => {
    if (totalItems > 0) {
      setIsPopupOpen(true);
    }
  };

  // Always show the cart at the bottom when there are items
  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      {/* Unified Cart Button with Checkout Text */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleCartClick}
          className="flex items-center space-x-3 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all font-semibold"
        >
          {/* Cart Icon with Count */}
          <div className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
              {totalItems}
            </span>
          </div>
          
          {/* Checkout Text */}
          <span>Checkout</span>
        </button>
      </div>

      {/* Cart Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />
          
          {/* Popup Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800">Your Cart ({totalItems})</h3>
              <button 
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.type}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-orange-500 font-semibold">${item.price}</span>
                          {item.quantity > 1 && (
                            <span className="ml-2 text-gray-500 text-sm">× {item.quantity}</span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.type)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Footer - Fixed at bottom */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 flex-shrink-0 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-xl font-bold text-orange-500">${totalPrice}</span>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsPopupOpen(false)} 
                    fullWidth
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleCheckout}
                    fullWidth
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MiniCart;