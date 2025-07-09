import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Information Collected',
    content: (
      <>
        <p><strong>A. Personal Information</strong></p>
        <ul className="list-disc list-inside mb-3 space-y-2">
          <li>Full name, email address, phone number</li>
          <li>Institution or company name (for student or enterprise accounts)</li>
          <li>Login credentials and access tokens</li>
        </ul>
        <p><strong>B. Usage Data</strong></p>
        <ul className="list-disc list-inside mb-3 space-y-2">
          <li>Simulator activities (e.g., drone types used, mission results)</li>
          <li>Course progress and certification status</li>
          <li>User preferences and feedback</li>
        </ul>
        <p><strong>C. Device & Technical Data</strong></p>
        <ul className="list-disc list-inside space-y-2">
          <li>IP address, browser type, device OS</li>
          <li>Geographic location</li>
          <li>Simulator logs, crash reports, and diagnostic info</li>
        </ul>
      </>
    ),
  },
  {
    title: '2. Purpose of Data Usage',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Provide access to simulation modules and training tools</li>
        <li>Monitor course progress and generate certification</li>
        <li>Improve simulator performance and user experience</li>
        <li>Deliver technical updates and respond to inquiries</li>
      </ul>
    ),
  },
  {
    title: '3. Data Sharing',
    content: (
      <>
        <p>IPage Drone Simulator does not sell your personal data. Information may only be shared:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>With trusted third-party service providers (cloud storage, analytics) under strict confidentiality</li>
          <li>With educational partners (for certification/verification purposes)</li>
          <li>If legally required for compliance or fraud prevention</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. Cookies and Analytics',
    content: (
      <>
        <p>Cookies may be used to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Store user preferences and login sessions</li>
          <li>Analyze traffic and simulator performance</li>
          <li>Improve user experience</li>
        </ul>
        <p className="mt-2">Disabling cookies may limit some platform functionality.</p>
      </>
    ),
  },
  {
    title: '5. Data Security',
    content: (
      <>
        <p>IPage Drone Simulator stores all data in secure cloud environments with:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>End-to-end encryption</li>
          <li>Role-based access controls</li>
          <li>Regular security audits and backups</li>
        </ul>
      </>
    ),
  },
  {
    title: '6. User Rights',
    content: (
      <>
        <p>Users can request to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Access, update, or delete their data</li>
          <li>Download a copy of their stored data</li>
          <li>Revoke data processing consent (where applicable)</li>
        </ul>
        <p className="mt-2">
          Requests can be submitted via email at{' '}
          <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">
            support@dronesimulator.pro
          </a>
        </p>
      </>
    ),
  },
  {
    title: '7. Child Privacy Policy',
    content: (
      <p>
        IPage Drone Simulator is not intended for users under 12 years of age. If data is collected unknowingly, it will be deleted upon discovery unless parental consent is provided.
      </p>
    ),
  },
  {
    title: '8. External Links',
    content: (
      <p>
        The platform may contain links to third-party websites. IPage Drone Simulator is not responsible for the content or privacy practices of those external platforms.
      </p>
    ),
  },
  {
    title: '9. Policy Updates',
    content: (
      <p>
        This policy may be updated occasionally. Revisions will be posted on this page with the updated effective date. Users are encouraged to review the policy periodically.
      </p>
    ),
  },
  {
    title: '10. Contact Information',
    content: (
      <p>
        For privacy-related inquiries or data access requests, contact:<br />
        <strong>IPage Drone Simulator</strong><br />
        Email: <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">support@dronesimulator.pro</a>
      </p>
    ),
  },
];

const PrivacyPolicy: React.FC = () => {
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
          <span className="text-black font-medium">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Privacy Policy</h1>
          <p className="text-base text-gray-500">Effective Date: June 26, 2025</p>
          <p className="mt-2 text-[15px]">
            IPage Drone Simulator is committed to protecting your privacy. This Privacy Policy outlines how your information is collected, used, and safeguarded when you access or use the simulator software, services, or platform.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white border rounded shadow-sm p-4">
          <div className="flex justify-end text-sm font-medium text-orange-500 mb-3 space-x-4">
            <button onClick={expandAll} className="hover:underline">EXPAND ALL</button>
            <span className="text-gray-300">|</span>
            <button onClick={collapseAll} className="hover:underline">CLOSE ALL</button>
          </div>

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

export default PrivacyPolicy;
