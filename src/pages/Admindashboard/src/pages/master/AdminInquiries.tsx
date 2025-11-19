import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Eye } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface Inquiry {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  organization: string;
  i_am: string;
  purpose_of_contact: string;
  created_at: string;
}

// 🔧 CSV Export Utility
const exportToCSV = (data: Inquiry[], filename: string) => {
  if (!data.length) return;

  const headers = ['Name', 'Email', 'Phone', 'Organization', 'I Am', 'Purpose', 'Submitted On'];
  const csvRows = [headers.join(',')];

  data.forEach(inquiry => {
    const row = [
      inquiry.full_name,
      inquiry.email,
      inquiry.phone_number,
      inquiry.organization,
      inquiry.i_am,
      inquiry.purpose_of_contact,
      new Date(inquiry.created_at).toLocaleString()
    ].map(val => `"${String(val).replace(/"/g, '""')}"`);
    csvRows.push(row.join(','));
  });

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};


const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quickFilter, setQuickFilter] = useState('');

  const fetchInquiries = async () => {
    try {
      const token = sessionStorage.getItem('drone_auth_token');
      const response = await axios.get('https://34-124-167-179.nip.io/api/inquiry/admin/all/', {
        headers: { Authorization: `Token ${token}` },
      });
      setInquiries(response.data.results);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const token = sessionStorage.getItem('drone_auth_token');
      await axios.delete(`https://34-124-167-179.nip.io/api/inquiry/admin/${id}/delete/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setInquiries(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const openDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedInquiry(null);
  };

  const isWithin = (dateStr: string, days: number): boolean => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffTime = now.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const createdAt = new Date(inq.created_at);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    const matchesDateRange = (!from || createdAt >= from) && (!to || createdAt <= to);

    const today = new Date();
    if (quickFilter === 'today') {
      return (
        createdAt.getDate() === today.getDate() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getFullYear() === today.getFullYear()
      );
    } else if (quickFilter === '7days') return isWithin(inq.created_at, 7);
    else if (quickFilter === '1month') return isWithin(inq.created_at, 30);
    else if (quickFilter === '1year') return isWithin(inq.created_at, 365);

    return matchesDateRange;
  });

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (loading) return <div className="p-6">Loading inquiries...</div>;
  const clearAllFilters = () => {
    setStartDate('');
    setEndDate('');
    setQuickFilter('');
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Training Inquiries</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToCSV(filteredInquiries, 'inquiries.csv')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v16h16V4H4zm8 4v8m0 0l-3-3m3 3l3-3"
              />
            </svg>
            Export CSV
          </button>
          <span className="text-sm text-gray-600">Total: {filteredInquiries.length}</span>
        </div>
      </div>

<div className="flex flex-wrap items-center gap-3">
  <label className="text-sm text-gray-700 flex items-center gap-2">
    From:
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1"
    />
  </label>

  <label className="text-sm text-gray-700 flex items-center gap-2">
    To:
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1"
    />
  </label>

  {['today', '7days', '1month', '1year'].map((key) => (
    <button
      key={key}
      onClick={() => setQuickFilter(prev => (prev === key ? '' : key))}
      className={`text-sm font-medium px-3 py-1.5 rounded ${
        quickFilter === key
          ? 'bg-gray-800 text-white'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      {{
        today: 'Today',
        '7days': 'Last 7 Days',
        '1month': 'Last 1 Month',
        '1year': 'Last 1 Year',
      }[key]}
    </button>
  ))}

  <button
    onClick={clearAllFilters}
    className="text-sm font-medium px-3 py-1.5 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
  >
    Clear All
  </button>
</div>


      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Purpose</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInquiries.map(inquiry => (
            <tr key={inquiry.id}>
              <td className="px-4 py-3 text-sm text-gray-900">{inquiry.full_name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{inquiry.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{inquiry.phone_number}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{inquiry.purpose_of_contact}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{new Date(inquiry.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-sm">
                <button onClick={() => openDialog(inquiry)} className="text-blue-500 hover:text-blue-700 mr-2">
                  <Eye size={16} />
                </button>
                <button onClick={() => handleDelete(inquiry.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInquiry && (
        <Dialog open={isOpen} onClose={closeDialog} className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-2">Inquiry Details</Dialog.Title>
            <p><strong>Name:</strong> {selectedInquiry.full_name}</p>
            <p><strong>Email:</strong> {selectedInquiry.email}</p>
            <p><strong>Phone:</strong> {selectedInquiry.phone_number}</p>
            <p><strong>Organization:</strong> {selectedInquiry.organization}</p>
            <p><strong>I am:</strong> {selectedInquiry.i_am}</p>
            <p><strong>Purpose:</strong> {selectedInquiry.purpose_of_contact}</p>
            <p><strong>Submitted on:</strong> {new Date(selectedInquiry.created_at).toLocaleString()}</p>
            <div className="mt-4 text-right">
              <button onClick={closeDialog} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                Close
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
};

export default AdminInquiries;
