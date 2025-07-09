import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  X,
  GraduationCap,
  Airplay,
  Satellite,
  Mail
} from 'lucide-react';
import { Plan } from '../types';
import Card from './Card';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // Import Link for redirection

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  if (!plan || typeof plan !== 'object') return null;
  const { addItem } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'verify' | 'restricted' | 'taken'>('login');

  const [studentEmail, setStudentEmail] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(sessionStorage.getItem('auth_user') || '{}');

  const handleVerifyStudentEmail = () => {
    const isEducational = /@[\w.-]+\.(edu|ac)(\.[a-z]{2,})?$|\.university$/i.test(studentEmail);
    if (!isEducational) {
      setError('Please enter a valid college/institute email.');
      return;
    }
    setError('Verification link has been sent to your email.');
  };



 const handleAddToCart = () => {
  const userEmail = sessionStorage.getItem('auth_email');
  const user = JSON.parse(sessionStorage.getItem('auth_user') || '{}');
  const currentPlan = user.plan;
  const cartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');

  // Redirect immediately for institution
  if (plan.id === 'institution') {
    window.location.href = '/salesform';
    return;
  }

  // ✅ Block switching from Pro or Student plan
const blockedPlans = ['pro', 'student', 'premium'];

  if (user?.plan && blockedPlans.includes(user.plan.toLowerCase())) {
    setModalMode('taken');
    setShowModal(true);
    return;
  }

  if (!userEmail) {
    setModalMode('login');
    setShowModal(true);
    return;
  }

  // Student email check
  if (plan.id === 'Student') {
    const isEducational = /@[\w.-]+\.(edu|ac)(\.[a-z]{2,})?$|\.university$/i.test(userEmail);
    if (!isEducational) {
      setModalMode('restricted');
      setShowModal(true);
      return;
    }
  }

  if (plan.id === 'free') {
    window.location.href = '/auth/register';
    return;
  }

  const alreadyInCart = cartItems.find((item: any) => item.id === plan.id);
  if (alreadyInCart) return;

  const newItem = {
    id: plan.id,
    name: plan.name,
    price: plan.price,
    type: 'plan' as 'plan',
    stripe_price_id: plan.stripe_price_id,
  };

  const updatedCart = [...cartItems, newItem];
  sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  addItem(newItem);
};




  useEffect(() => {
    const userEmail = sessionStorage.getItem('auth_email');
    const pendingPlanId = sessionStorage.getItem('pendingPlanId');
    if (userEmail && pendingPlanId === plan.id) {
      if (plan.id === 'Student') {
        const isEducational = /@[\w.-]+\.(edu|ac)(\.[a-z]{2,})?$|\.university$/i.test(userEmail);
        if (!isEducational) {
          setModalMode('restricted');
          setShowModal(true);
        } else {
          setModalMode('verify');
          setShowModal(true);
        }
      } else {
        handleAddToCart();
      }
      sessionStorage.removeItem('pendingPlanId');
    }
  }, []);

  return (
    <>
      <Card
        highlighted={plan.mostPopular}

        className={`h-full flex flex-col ${!plan.mostPopular ? 'border-4 border-gray-300' : ''
          }`}



      >
        {plan.mostPopular && (
          <div className="bg-orange-500 text-white py-1 px-4 text-center text-sm font-semibold">
            Most Popular
          </div>
        )}
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{plan.name}</h3>
            {(plan.id === 'Student' || plan.id === 'pro') && (
              <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                90% OFF
              </span>
            )}
          </div>


          {plan.id !== 'institution' && (
            <div className="mb-4 flex items-baseline space-x-2">
              {(plan.id === 'Student' || plan.id === 'pro') ? (
                <>
                  <span className="text-2xl font-bold text-black">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-1000 ml-1">
                    /year
                  </span>

                  <span className="text-gray-600 line-through text-base">
                    {plan.id === 'Student' ? '$99.99' : '$349.99'}
                  </span>


                </>
              ) : (
                <>
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.billing}</span>
                </>
              )}
            </div>

          )}


          <ul className="mb-6 flex-grow space-y-3">
            {/* ✅ Shared List Format for All Items */}
            {plan.id === 'free' && (
              <>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong>Available Drones:</strong> Agriculture Drone, Racing Drone, DJI Marvic</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong>Permitted Zones:</strong> RPTO Ground, Agriculture Zone, City Road or Free Flight Zone</span>
                </li>
              </>
            )}

            {plan.id === 'Student' && (
              <>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <strong>Available Drones:</strong> All from Free Plan, DJI MATRICE 350 RTK, Crystalball<br />
                     Model V
                  </span>
                </li>

                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong>Permitted Zones:</strong> RPTO Ground, Agriculture, City Road, HV Lines, Solar Panel Zones, Basic Urban Factory Zone
                  </span>
                </li>
              </>
            )}

            {plan.id === 'pro' && ( 
              <>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong>Available Drones:</strong> All Drones + Fighter-VTOL</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong>Permitted Zones:</strong> All Zones Except Defence, Full Training & Analytics</span>
                </li>
              </>
            )}

            {plan.id === 'institution' && (
              <>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong></strong> Advanced Scenario Customization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong>Available Drones:</strong> All 6 Drones including Fighter-VTOL</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700"><strong>Permitted Zones:</strong> RPTO, Agriculture, Defence, HV Lines, Bridges, City </span>
                </li>
              </>
            )}

            {/* 💡 Common Feature Loop */}
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>



          <Button variant={plan.buttonVariant} onClick={handleAddToCart} fullWidth>
            {plan.buttonText}
          </Button>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
          <div className="relative w-full max-w-3xl h-[350px] bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-xl shadow-2xl overflow-hidden flex">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col justify-center items-center text-white px-4 relative">
              {plan.id === 'Student' ? (
                <div className="relative w-full flex flex-col items-center">
                  <img
                    src="/images/student-banner.jpeg"
                    alt="Student"
                    className="w-70 h-40 object-contain mb-4 rounded-xl"
                  />
                  <div className="space-y-2 z-10">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-1 flex items-center space-x-2">
                      <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                      <span className="text-sm">Quick Verification</span>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-1 flex items-center space-x-2">
                      <GraduationCap size={18} />
                      <span className="text-sm">Student Discount</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full flex flex-col items-center">
                  <img
                    src="/images/drone-user.png"
                    alt="User"
                    className="w-70 h-40 object-contain mb-4 rounded-xl"
                  />
                  <div className="space-y-2 z-10">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-1 flex items-center space-x-2">
                      <Airplay size={16} />
                      <span className="text-sm">Simulation Access</span>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-1 flex items-center space-x-2">
                      <Satellite size={16} />
                      <span className="text-sm">Advanced Features</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="w-1/2 text-white px-6 py-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-white hover:text-gray-200"
              >
                <X size={20} />
              </button>

              {modalMode === 'login' && (
                <>
                  <h2 className="text-2xl font-bold mb-2">
                    {plan.id === 'Student' ? 'Access Student Benefits' : 'Access Drone Features'}
                  </h2>
                  <p className="text-sm text-white text-opacity-80 mb-4">
                    {plan.id === 'Student'
                      ? 'Login using your .edu or institute email.'
                      : 'Login to unlock advanced drone simulation, analytics, and training modules.'}
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => (window.location.href = '/auth/login')}
                      className="w-full bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 rounded-md text-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        if (plan.id === 'Student') {
                          window.location.href = '/auth/studentregister';
                        } else {
                          window.location.href = '/auth/register';
                        }
                      }}
                      className="w-full bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-semibold py-2 rounded-md text-sm border border-white border-opacity-20"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}

              {modalMode === 'verify' && (
                <>
                  <h2 className="text-2xl font-bold mb-2">Verify Student Status</h2>
                  <p className="text-sm text-white text-opacity-80 mb-4">
                    Enter your educational email to verify and unlock discounts. Accepted domains: .edu, .ac.in, .university
                  </p>
                  <div className="relative mb-6">
                    <input
                      type="email"
                      placeholder="Enter your college email (e.g. john@abc.edu)"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-md text-gray-800 placeholder-gray-500 text-sm"
                    />
                    <Mail size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {error && (
                    <div className={`flex items-start space-x-2 backdrop-blur-md border rounded-xl p-3 text-sm shadow-lg ${error.includes('Verification')
                      ? 'bg-white/20 border-green-300 text-green-100'
                      : 'bg-white/30 border-red-300 text-red-800'
                      }`}>
                      {error.includes('Verification') ? (
                        <CheckCircle size={18} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />

                      ) : (
                        <X size={18} className="mt-0.5 text-red-600" />
                      )}
                      <span className="font-medium leading-snug">{error}</span>
                    </div>
                  )}
                  <button
                    onClick={handleVerifyStudentEmail}
                    className="w-full mt-3 bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 rounded-md text-sm"
                  >
                    Send Verification Code
                  </button>
                  <p className="text-xs mt-4 text-white text-opacity-75">
                    We'll send a verification link to confirm your student status.
                  </p>
                </>
              )}

              {modalMode === 'restricted' && (
                <>
                  <h2 className="text-2xl font-bold mb-2">Student Plan Restricted</h2>
                  <p className="text-sm text-white text-opacity-80 mb-4">
                    This plan is only available for verified students with .edu or .ac email addresses.
                  </p>
                  <button
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.href = '/auth/studentregister';
                    }}
                    className="w-full bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-semibold py-2 rounded-md text-sm border border-white border-opacity-20"
                  >
                    Register as Student
                  </button>
                </>
              )}
              {modalMode === 'taken' && (
                <>
                  <h2 className="text-2xl font-bold mb-2">You Already Have a Plan</h2>
                  <p className="text-sm text-white text-opacity-80 mb-2">
                    You have already purchased the <strong>{user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1)}</strong> plan.
                  </p>
                  <p className="text-sm text-white text-opacity-80 mb-4">
                    You cannot add or switch to another plan while your current subscription is active.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full bg-white bg-opacity-30 hover:bg-opacity-50 text-white font-semibold py-2 rounded-md text-sm border border-white border-opacity-20"
                  >
                    Close
                  </button>
                </>
              )}



              <p className="text-xs text-white text-opacity-50 mt-4">
                <Link to="/terms" className="underline hover:text-white text-white/70">
                  Terms & Conditions apply.
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlanCard;
