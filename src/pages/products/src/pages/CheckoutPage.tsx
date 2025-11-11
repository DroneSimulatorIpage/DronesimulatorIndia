import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Package, Bone as Drone, FileText, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Navigation from '@/components/Navigation';
//gh

interface FormData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'card' | 'upi';
  autoRenew: boolean;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'card',
    autoRenew: true,
  });

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'drone':
        return <Drone size={20} />;
      case 'scenario':
        return <FileText size={20} />;
      case 'plan':
        return <Package size={20} />;
      case 'addon':
        return <Settings size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    console.log('Processing payment...', { formData, items });
    clearCart();
    navigate('/');
  };

  const discountedTotal = formData.autoRenew ? totalPrice * 0.9 : totalPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation /> {/* ✅ Add your header here */}
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-5 max-w-4xl">
        <button
  onClick={() => navigate('/product')}
  className="mt-6 flex items-center text-gray-600 hover:text-orange-500 mb-8"
>
  <ArrowLeft size={20} className="mr-2" />
  Back to Products
</button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.type}`} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="text-orange-500 mr-3">
                          {getItemIcon(item.type)}
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            <Badge variant="secondary">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </Badge>
                            {item.quantity > 1 && (
                              <span className="ml-2">× {item.quantity}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${item.price * item.quantity}</div>
                        <div className="text-sm text-gray-500">${item.price} each</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  {formData.autoRenew && (
                    <div className="flex justify-between text-green-600">
                      <span>Auto-renewal Discount (10%)</span>
                      <span>-${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${discountedTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`
                      flex items-center p-4 border rounded-lg cursor-pointer
                      ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}
                    `}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <CreditCard size={24} className="text-orange-500 mr-2" />
                      <span>Card</span>
                    </label>

                    <label className={`
                      flex items-center p-4 border rounded-lg cursor-pointer
                      ${formData.paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}
                    `}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <Smartphone size={24} className="text-orange-500 mr-2" />
                      <span>UPI</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center bg-green-50 p-4 rounded-lg">
                  <input
                    type="checkbox"
                    name="autoRenew"
                    checked={formData.autoRenew}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Enable auto-renewal to save 10% on future payments
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={items.length === 0}
                >
                  Pay ${discountedTotal.toFixed(2)}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;
