import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. No Refunds Provided',
    content: (
      <p>
        We do not offer refunds for any of our subscription plans — including Pro, Student, or Institution — once a purchase is completed.
        All payments are final and non-refundable.
        <br /><br />
        This policy helps us maintain consistent service quality and operational efficiency across our platform.
      </p>
    ),
  },
  {
    title: '2. 15-Day Free Trial',
    content: (
      <p>
        To help users make informed decisions, we offer a <strong>15-day free trial</strong> with full access to the simulator.
        During this period, you can explore all features and training modules before deciding to subscribe.
        <br /><br />
        We encourage all users to take full advantage of the trial to ensure the platform aligns with their learning or institutional needs.
      </p>
    ),
  },
  {
    title: '3. Need Help or Have Questions?',
    content: (
      <p>
        If you have any questions about your plan or need assistance before making a purchase, our team is happy to help.
        <br /><br />
        Contact us at:<br />
        <strong>Email:</strong>{' '}
        <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">
          support@dronesimulator.pro
        </a>
      </p>
    ),
  },
];

const RefundPolicy: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const expandAll = () => {
    setOpenIndexes(sections.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndexes([]);
  };

  const toggleSection = (index: number) => {
    setOpenIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <Navigation />

      <div className="w-full px-6 py-8 max-w-6xl mx-auto text-sm text-gray-800 mt-20">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-3 flex items-center space-x-1">
          <Link to="/" className="text-orange-500 hover:underline">Home</Link>
          <span className="text-gray-400">•</span>
          <span className="text-black font-medium">Refund Policy</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Refund Policy</h1>
          <p className="text-base text-gray-500">Effective Date: June 26, 2025</p>
          <p className="mt-2 text-[15px]">
            At IPage Drone Simulator, we are committed to delivering a valuable and transparent experience to all our users.
            Please take a moment to review our refund policy before subscribing to any of our plans.
          </p>
        </div>

        {/* Policy Box */}
        <div className="bg-white border rounded shadow-sm p-4">
          <div className="flex justify-end text-sm font-medium text-orange-500 mb-3 space-x-4">
            <button onClick={expandAll} className="hover:underline">EXPAND ALL</button>
            <span className="text-gray-300">|</span>
            <button onClick={collapseAll} className="hover:underline">CLOSE ALL</button>
          </div>

          {/* Collapsible Sections */}
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div key={index} className="py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  <button className="w-6 h-6 rounded-full text-orange-500 bg-orange-100 text-center text-sm font-bold">
                    {openIndexes.includes(index) ? '−' : '+'}
                  </button>
                </div>
                {openIndexes.includes(index) && (
                  <div className="mt-3 text-[15px] text-gray-700">{section.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RefundPolicy;
