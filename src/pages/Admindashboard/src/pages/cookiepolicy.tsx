import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. What Are Cookies?',
    content: (
      <p>
        Cookies are small text files stored on your device when you visit a website or application.
        They help recognize your browser and capture certain data to enhance your experience.
      </p>
    ),
  },
  {
    title: '2. Types of Cookies Used',
    content: (
      <>
        <p><strong>A. Essential Cookies</strong></p>
        <p>These are necessary for the simulator to function. They enable features such as secure login, session management, and page navigation.</p>
        <p className="mt-2"><strong>B. Performance and Analytics Cookies</strong></p>
        <p>These cookies collect information about how users interact with the simulator (e.g., time spent on pages, error logs) to improve performance and user experience.</p>
        <p className="mt-2"><strong>C. Preference Cookies</strong></p>
        <p>Used to remember your settings (language, UI layout, etc.) so that you don’t have to reconfigure them on each visit.</p>
        <p className="mt-2"><strong>D. Third-Party Cookies</strong></p>
        <p>Some features may use third-party services (e.g., Google Analytics, embedded videos) that set their own cookies. IPage Drone Simulator does not control these cookies directly.</p>
      </>
    ),
  },
  {
    title: '3. How We Use Cookies',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Maintain user login and session continuity</li>
        <li>Measure learning outcomes and optimize course paths</li>
        <li>Analyze usage trends to improve simulator content and performance</li>
        <li>Secure your access to training environments</li>
      </ul>
    ),
  },
  {
    title: '4. Managing Cookies',
    content: (
      <>
        <p>You can manage or disable cookies through your browser settings:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>Block or delete existing cookies</li>
          <li>Set preferences for future cookies</li>
          <li>Receive notifications when cookies are being used</li>
        </ul>
        <p className="mt-2">Note: Disabling certain cookies may affect the functionality or performance of the simulator.</p>
      </>
    ),
  },
  {
    title: '5. Updates to This Policy',
    content: (
      <p>
        This Cookie Policy may be updated from time to time. All changes will be published on this page with the updated effective date.
        Users are encouraged to review it periodically.
      </p>
    ),
  },
  {
    title: '6. Contact Information',
    content: (
      <p>
        For questions or concerns related to this Cookie Policy, contact:<br />
        <strong>IPage Drone Simulator</strong><br />
        Email:{' '}
        <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">
          support@dronesimulator.pro
        </a>
      </p>
    ),
  },
];

const CookiePolicy: React.FC = () => {
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
          <span className="text-black font-medium">Cookie Policy</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Cookie Policy</h1>
          <p className="text-base text-gray-500">Effective Date: June 26, 2025</p>
          <p className="mt-2 text-[15px]">
            This Cookie Policy explains how IPage Drone Simulator uses cookies and similar technologies when you access or interact with the simulator platform or related services.
          </p>
        </div>

        {/* Card Container */}
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
                  <div className="mt-3 text-[15px] text-gray-700">
                    {section.content}
                  </div>
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

export default CookiePolicy;
