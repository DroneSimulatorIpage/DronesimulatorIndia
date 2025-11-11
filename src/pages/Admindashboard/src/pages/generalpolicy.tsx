import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Acceptable Use Policy',
    content: (
      <>
     
        <p>This Acceptable Use Policy outlines the standards of conduct expected from all users of the IPage Drone Simulator platform. These guidelines ensure that the platform remains a safe, secure, and productive environment for training and education.</p>
        <h3 className="font-semibold mt-4">1. Purpose</h3>
        <p>To define acceptable behaviors and restrictions while using the IPage Drone Simulator to ensure platform integrity and a respectful environment.</p>
        <h3 className="font-semibold mt-4">2. Prohibited Uses</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Attempt to reverse engineer, decompile, or disassemble any part of the simulator software.</li>
          <li>Circumvent or breach any authentication or security measures.</li>
          <li>Share login credentials or allow unauthorized access.</li>
          <li>Upload harmful, unlawful, or offensive content.</li>
          <li>Disrupt platform performance or other users’ activities.</li>
          <li>Use automation tools or bots without permission.</li>
          <li>Violate intellectual property rights.</li>
        </ul>
        <h3 className="font-semibold mt-4">3. Enforcement</h3>
        <p>Violations may result in:</p>
        <ul className="list-disc list-inside">
          <li>Temporary or permanent access suspension</li>
          <li>Account termination</li>
          <li>Legal action if applicable</li>
        </ul>
        <h3 className="font-semibold mt-4">4. Reporting</h3>
        <p>To report abuse or violations, contact <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">support@dronesimulator.pro</a></p>
      </>
    )
  },
  {
    title: '2. Subscription & Billing Policy',
    content: (
      <>
       
        <p>IPage Drone Simulator offers three subscription plans:</p>
        <ul className="list-disc list-inside mb-2">
          <li><strong>Pro Plan</strong> – for individual professionals</li>
          <li><strong>Student Plan</strong> – for verified students</li>
          <li><strong>Institution Plan</strong> – for colleges, training centers, and organizations</li>
        </ul>
        <h3 className="font-semibold mt-4">1. Billing & Renewals</h3>
        <ul className="list-disc list-inside">
          <li>Subscriptions are billed in advance (monthly/yearly).</li>
          <li>Plans auto-renew unless cancelled before the billing date.</li>
          <li>Renewal reminders are sent via email.</li>
        </ul>
        <h3 className="font-semibold mt-4">2. Plan Modifications</h3>
        <ul className="list-disc list-inside">
          <li>Upgrades apply immediately with pro-rated charges.</li>
          <li>Downgrades take effect in the next billing cycle.</li>
          <li>No partial refunds for downgrades.</li>
        </ul>
        <h3 className="font-semibold mt-4">3. Failed Payments</h3>
        <ul className="list-disc list-inside">
          <li>Payment failure triggers user notifications.</li>
          <li>A grace period is provided to resolve billing issues.</li>
          <li>Access may be paused until payment is successful.</li>
        </ul>
        <h3 className="font-semibold mt-4">4. Support</h3>
        <p>For billing issues, email <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">support@dronesimulator.pro</a></p>
      </>
    )
  },
  {
    title: '3. End User License Agreement (EULA)',
    content: (
      <>
        
        <h3 className="font-semibold">1. License Grant</h3>
        <p>A limited, non-transferable, non-exclusive license is provided to access the simulator for personal or institutional training.</p>
        <h3 className="font-semibold mt-4">2. Restrictions</h3>
        <ul className="list-disc list-inside">
          <li>Copy, sublicense, or resell the software</li>
          <li>Modify or create derivative products</li>
          <li>Use the simulator commercially without written approval</li>
          <li>Reverse engineer or tamper with code</li>
        </ul>
        <h3 className="font-semibold mt-4">3. Ownership</h3>
        <p>All intellectual property rights remain with IPage Drone Simulator. Use of the software does not transfer ownership.</p>
        <h3 className="font-semibold mt-4">4. Termination</h3>
        <p>Breach of this agreement may result in immediate termination of access and legal recourse.</p>
      </>
    )
  },
  {
    title: '4. Disclaimer Policy',
    content: (
      <>
       
        <h3 className="font-semibold">1. Purpose</h3>
        <p>To clarify that the simulator is not a replacement for official drone certification.</p>
        
        <h3 className="font-semibold mt-4">2. Liability Limitations</h3>
        <ul className="list-disc list-inside">
          <li>No employment or licensing guarantees</li>
          <li>Users must validate any third-party requirements</li>
        </ul>
        <h3 className="font-semibold mt-4">3. Guidance</h3>
        <p>Users are encouraged to consult relevant authorities for official licensing and training.</p>
      </>
    )
  },
  {
    title: '5. Accessibility Statement',
    content: (
      <>
       
        <h3 className="font-semibold">1. Objective</h3>
        <p>Ensure equal usability for individuals with varying abilities and needs.</p>
        <h3 className="font-semibold mt-4">2. Features</h3>
        <ul className="list-disc list-inside">
          <li>Screen reader support</li>
          <li>High-contrast visual options</li>
          <li>Keyboard navigability</li>
        </ul>
        <h3 className="font-semibold mt-4">3. Commitment</h3>
        <p>We align with WCAG standards and regularly update accessibility features.</p>
        <h3 className="font-semibold mt-4">4. Feedback</h3>
        <p>We welcome input. Please email suggestions to <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">support@dronesimulator.pro</a></p>
      </>
    )
  },
  {
    title: '6. Contact and Support Policy',
    content: (
      <>
        
        <h3 className="font-semibold">1. Contact Method</h3>
        <p>All support requests should be emailed to <a href="mailto:support@dronesimulator.pro" className="text-orange-500 underline">support@dronesimulator.pro</a></p>
        <h3 className="font-semibold mt-4">2. Support Availability</h3>
        <p>Monday to Friday: 10:00 AM – 6:00 PM IST<br/>Closed on weekends and public holidays</p>
        <h3 className="font-semibold mt-4">3. Response Timelines</h3>
        <ul className="list-disc list-inside">
          <li>We strive to respond as quickly as possible. In most cases, you will hear from us promptly.</li>
          <li>Urgent cases prioritized for early resolution</li>
        </ul>
        <h3 className="font-semibold mt-4">4. Scope of Support</h3>
        <p>We provide help with:</p>
        <ul className="list-disc list-inside">
          <li>Account access</li>
          <li>Subscription and billing</li>
          <li>Technical troubleshooting</li>
        </ul>
      </>
    )
  },
];

const GeneralPolicy: React.FC = () => {
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
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <Navigation />

      <div className="w-full px-6 py-8 max-w-6xl mx-auto text-sm text-gray-800 mt-20">
        <div className="text-xs text-gray-500 mb-3 flex items-center space-x-1">
          <Link to="/" className="text-orange-500 hover:underline">Home</Link>
          <span className="text-gray-400">•</span>
          <span className="text-black font-medium">General Policies</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">General Policies</h1>
          <p className="text-base text-gray-500">Effective Date: June 26, 2025</p>
          <p className="text-base text-gray-500">Explore our usage terms, licensing, billing, accessibility, and more.</p>

        </div>

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

export default GeneralPolicy;