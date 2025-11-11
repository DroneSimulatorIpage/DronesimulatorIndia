import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: (
      <p>
        By creating an account or using any part of the simulator, you acknowledge that you have read, understood, and agreed to these Terms and Conditions, along with the Privacy Policy and Cookie Policy.
      </p>
    ),
  },
  {
    title: '2. Account and Access',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Users must provide accurate and complete information when registering.</li>
        <li>Account credentials must be kept secure. IPage Drone Simulator is not responsible for unauthorized access resulting from user negligence.</li>
        <li>We reserve the right to suspend or terminate accounts that violate these terms or are suspected of misuse.</li>
      </ul>
    ),
  },
  {
    title: '3. Usage Guidelines',
    content: (
      <>
        <p>Users agree not to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Use the simulator for any illegal or unauthorized purpose</li>
          <li>Attempt to reverse engineer, copy, or exploit the software</li>
          <li>Distribute, resell, or share access without written consent</li>
          <li>Interfere with platform security or performance</li>
        </ul>
        <p className="mt-2">
          All simulator data, drone environments, and content are the intellectual property of IPage Drone Simulator.
        </p>
      </>
    ),
  },
  {
    title: '4. Licensing and Restrictions',
    content: (
      <p>
        Users are granted a limited, non-exclusive, non-transferable license to access and use the simulator for personal or institutional training. Any use beyond this license is prohibited.
      </p>
    ),
  },
  {
    title: '5. Intellectual Property',
    content: (
      <p>
        All trademarks, software, training content, media, and branding remain the sole property of IPage Drone Simulator. Users may not reproduce or modify any content without permission.
      </p>
    ),
  },
  {
    title: '6. Limitation of Liability',
    content: (
      <>
        <p>IPage Drone Simulator is not liable for:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Any direct or indirect damages from using the simulator</li>
          <li>Loss of data, certifications, or training progress due to user error or technical issues</li>
          <li>Downtime or interruptions caused by maintenance, upgrades, or third-party failures</li>
        </ul>
        <p className="mt-2">Use of the simulator is at your own risk.</p>
      </>
    ),
  },
  {
    title: '7. Termination of Use',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>Violates these terms</li>
        <li>Engages in harmful or fraudulent behavior</li>
        <li>Attempts to breach the platform's security or integrity</li>
      </ul>
    ),
  },
  {
    title: '8. Modifications to Terms',
    content: (
      <p>
        We may update these Terms and Conditions periodically. Any changes will be posted on this page with the revised effective date. Continued use of the platform constitutes acceptance of the updated terms.
      </p>
    ),
  },
  {
    title: '9. Governing Law',
    content: (
      <p>
  These Terms shall be governed by the laws of Singapore. Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in Singapore.
</p>

    ),
  },
  {
    title: '10. Student Plan Eligibility',
    content: (
      <p>
        To access the Student Plan offer, users must register using a valid educational email ID ending with <code>.edu</code>, <code>.ac.in</code>, or other recognized academic domains. This verification ensures eligibility for discounted educational pricing.
      </p>
    ),
  },
  {
    title: '11. Contact Information',
    content: (
      <p>
        For questions about these Terms and Conditions, contact:<br />
        <strong>IPage Drone Simulator</strong><br />
        Email:{' '}
        <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">
          support@dronesimulator.pro
        </a>
      </p>
    ),
  },
];

const TermsAndConditions: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const expandAll = () => setOpenIndexes(sections.map((_, i) => i));
  const collapseAll = () => setOpenIndexes([]);

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
          <span className="text-black font-medium">Terms and Conditions</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Terms and Conditions</h1>
          <p className="text-base text-gray-500">Effective Date: June 26, 2025</p>
          <p className="mt-2 text-[15px]">
            These Terms and Conditions govern the use of the IPage Drone Simulator platform and services.
            By accessing or using the simulator, you agree to comply with and be bound by these terms.
            If you do not agree, please do not use the platform.
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

export default TermsAndConditions;
