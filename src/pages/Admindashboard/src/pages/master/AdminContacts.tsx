import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Eye } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  user_details: {
    id: number;
    username: string;
    email: string;
    full_name: string;
    phone_number: string;
    city: string;
    state_province: string;
    country: string;
    purpose_of_use: string;
    is_active: boolean;
    plan: string;
    plan_expiry_date: string;
    last_login_date: string;
    is_social_login: boolean;
    is_paid_user: boolean;
    is_superuser: boolean;
    is_staff: boolean;
    created_at: string;
    updated_at: string;
  };
}

const exportToCSV = (data: Contact[], filename: string) => {
  if (!data.length) return;

  const headers = ['Name', 'Email', 'Message', 'Full Name', 'Phone', 'City', 'State', 'Country', 'Purpose', 'Plan'];
  const csvRows = [headers.join(',')];

  data.forEach(contact => {
    const row = [
      contact.name,
      contact.email,
      contact.message,
      contact.user_details?.full_name || '',
      contact.user_details?.phone_number || '',
      contact.user_details?.city || '',
      contact.user_details?.state_province || '',
      contact.user_details?.country || '',
      contact.user_details?.purpose_of_use || '',
      contact.user_details?.plan || ''
    ].map(val => `"${String(val).replace(/"/g, '""')}"`);
    csvRows.push(row.join(','));
  });

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quickFilter, setQuickFilter] = useState('');

  const fetchContacts = async () => {
    try {
      const token = sessionStorage.getItem('drone_auth_token');
      const response = await axios.get('https://34-47-194-149.nip.io/api/contact/admin/all/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setContacts(response.data.results);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const token = sessionStorage.getItem('drone_auth_token');
      await axios.delete(`https://34-47-194-149.nip.io/api/contact/admin/${id}/delete/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const isWithin = (dateStr: string, days: number): boolean => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffTime = now.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  };

  const filteredContacts = contacts.filter((c) => {
    const created = new Date(c.created_at);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    const matchesDateRange = (!from || created >= from) && (!to || created <= to);

    const today = new Date();
    if (quickFilter === 'today') {
      return (
        created.getDate() === today.getDate() &&
        created.getMonth() === today.getMonth() &&
        created.getFullYear() === today.getFullYear()
      );
    } else if (quickFilter === '7days') return isWithin(c.created_at, 7);
    else if (quickFilter === '1month') return isWithin(c.created_at, 30);
    else if (quickFilter === '1year') return isWithin(c.created_at, 365);

    return matchesDateRange;
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) return <div className="p-6">Loading contacts...</div>;
  const clearAllFilters = () => {
    setStartDate('');
    setEndDate('');
    setQuickFilter('');
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
  <h2 className="text-xl font-bold text-gray-900">Contact Submissions</h2>

  <div className="flex items-center gap-3">
    <button
      onClick={() => exportToCSV(filteredContacts, 'contacts.csv')}
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
    <span className="text-sm text-gray-600">Total: {filteredContacts.length}</span>
  </div>
</div>


      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm text-gray-700">
            From:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="text-sm text-gray-700">
            To:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <div className="flex gap-2">
            {['today', '7days', '1month', '1year'].map((key) => (
              <button
                key={key}
                onClick={() => setQuickFilter(prev => (prev === key ? '' : key))}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${quickFilter === key
                    ? 'bg-orange-600 text-white shadow'
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

            {/* ✅ Clear All Button */}
            <button
              onClick={clearAllFilters}
              className="px-4 py-1.5 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Clear All
            </button>
          </div>

        </div>

        
      </div>

      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Message</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Submitted On</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredContacts.map(contact => (
            <tr key={contact.id}>
              <td className="px-4 py-3 text-sm text-gray-900">{contact.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{contact.email}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{contact.message}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{new Date(contact.created_at).toLocaleString()}</td>
              <td className="px-4 py-3 text-sm">
                <button
                  onClick={() => handleView(contact)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContact && (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-2">Contact Details</Dialog.Title>
            <p><strong>Name:</strong> {selectedContact.user_details.full_name}</p>
            <p><strong>Email:</strong> {selectedContact.user_details.email}</p>
            <p><strong>Phone:</strong> {selectedContact.user_details.phone_number}</p>
            <p><strong>City:</strong> {selectedContact.user_details.city}</p>
            <p><strong>State:</strong> {selectedContact.user_details.state_province}</p>
            <p><strong>Country:</strong> {selectedContact.user_details.country}</p>
            <p><strong>Purpose:</strong> {selectedContact.user_details.purpose_of_use}</p>
            <p><strong>Plan:</strong> {selectedContact.user_details.plan}</p>
            <p><strong>Message:</strong> {selectedContact.message}</p>
            <div className="mt-4 text-right">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
};

export default AdminContacts;
