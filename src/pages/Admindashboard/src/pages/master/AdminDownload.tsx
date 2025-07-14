import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Eye, Download } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface Download {
  email: string;
  name: string;
  phone: string;
  city: string;
  state_province: string;
  country: string;
  purpose_of_use: string;
  created_at: string;
  download_history: string[]; // array of timestamps
  download_count: number;
}


const DownloadAdmin: React.FC = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDownload, setSelectedDownload] = useState<Download | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [quickFilter, setQuickFilter] = useState<string>('');

const fetchDownloads = async () => {
  try {
    const email = sessionStorage.getItem('admin_email');
    if (!email) {
      console.error('❌ Admin email not found in sessionStorage');
      return;
    }

    const response = await axios.post(
      'https://rems3zz1k6.execute-api.ap-south-1.amazonaws.com/Getalldownloads',
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { message, downloads } = response.data;

    if (message === 'Success' && Array.isArray(downloads)) {
      setDownloads(downloads);
      console.log('✅ Downloads fetched:', downloads);
    } else {
      console.warn('⚠️ Unexpected response format or no downloads.');
      setDownloads([]);
    }

  } catch (error) {
    console.error('❌ Error fetching downloads:', error);
    setDownloads([]);
  } finally {
    setLoading(false);
  }
};





  const handleDelete = async (email: string) => {
    if (!window.confirm(`Are you sure you want to delete the record for ${email}?`)) return;

    try {
      const token = sessionStorage.getItem('drone_auth_token');
      const response = await axios.delete('https://34-47-194-149.nip.io/api/delete-download-record/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        data: { email },
      });
      console.log('Deleted:', response.data);
      setDownloads((prev) => prev.filter((d) => d.email !== email));
    } catch (error: any) {
      console.error('Delete failed:', error?.response || error.message);
      alert('Failed to delete. Check console for details.');
    }
  };

const handleExportCSV = () => {
  const headers = [
    'Name',
    'Email',
    'Phone',
    'City',
    'State',
    'Country',
    'Purpose',
    'Created At',
    'Download Count',
    'Download History'
  ];

  const rows = filteredDownloads.map(d => [
    d.name || d.name || 'Anonymous',
    d.email || 'N/A',
    d.phone || d.phone || 'N/A',
    d.city || 'N/A',
    d.state_province || 'N/A',
    d.country || 'N/A',
    d.purpose_of_use || 'N/A',
    new Date(d.created_at).toLocaleString(),
    d.download_count || 0,
    (d.download_history || []).map(date => new Date(date).toLocaleString()).join(' | ')
  ]);

  const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'downloads.csv');
  link.click();
};


  const openDialog = (download: Download) => {
    setSelectedDownload(download);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedDownload(null);
  };

  const isWithin = (dateStr: string, days: number): boolean => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffTime = now.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  };

  const filteredDownloads = downloads.filter((d) => {
    const createdAt = new Date(d.created_at);
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
    } else if (quickFilter === '7days') return isWithin(d.created_at, 7);
    else if (quickFilter === '1month') return isWithin(d.created_at, 30);
    else if (quickFilter === '1year') return isWithin(d.created_at, 365);

    return matchesDateRange;
  });
  const clearAllFilters = () => {
    setQuickFilter('');
    setStartDate('');
    setEndDate('');
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading downloads...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Downloads</h1>
          <p className="text-gray-500 mt-1">Monitor and manage all download records</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-1.5 rounded hover:bg-orange-700"
          >
            <Download size={16} /> Export CSV
          </button>
          <div className="text-sm text-gray-600">Total: {filteredDownloads.length}</div>
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
      className={`text-sm font-medium px-3 py-1.5 rounded ${quickFilter === key
        ? 'bg-gray-800 text-white shadow'
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


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-xs">

            <thead className="bg-gray-50">
  <tr>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download Count</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
  </tr>
</thead>

 <tbody className="bg-white divide-y divide-gray-200">
  {filteredDownloads.map((download, index) => (
    <tr key={index} className="hover:bg-gray-50 transition-colors">
      <td className="px-2 py-2 text-sm text-gray-900">{download.name || 'Anonymous'}</td>
      <td className="px-2 py-2 text-sm text-gray-600">{download.email || 'N/A'}</td>
      <td className="px-2 py-2 text-sm text-gray-600">{download.phone || 'N/A'}</td>
      <td className="px-2 py-2 text-sm text-gray-700">
        {download.city}, {download.state_province}, {download.country}
      </td>
      <td className="px-2 py-2 text-sm text-gray-700">
        {new Date(download.created_at).toLocaleString()}
      </td>
      <td className="px-2 py-2 text-sm text-gray-700">{download.download_count}</td>
      <td className="px-6 py-4 text-sm font-medium">
        <div className="flex items-center space-x-2">
          <button onClick={() => openDialog(download)} className="text-orange-600 hover:text-orange-900" title="View">
            <Eye size={16} />
          </button>
          <button onClick={() => handleDelete(download.email)} className="text-red-600 hover:text-red-900" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>

      {selectedDownload && (
        <Dialog open={isOpen} onClose={closeDialog} className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
  <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full">
    <Dialog.Title className="text-lg font-bold mb-2">Download Details</Dialog.Title>
    <p><strong>Name:</strong> {selectedDownload?.name}</p>
    <p><strong>Email:</strong> {selectedDownload?.email}</p>
    <p><strong>Phone:</strong> {selectedDownload?.phone}</p>
    <p><strong>Location:</strong> {selectedDownload?.city}, {selectedDownload?.state_province}, {selectedDownload?.country}</p>
    <p><strong>Purpose:</strong> {selectedDownload?.purpose_of_use}</p>
    <p><strong>Download Count:</strong> {selectedDownload?.download_count}</p>
    <p><strong>Created On:</strong> {new Date(selectedDownload?.created_at).toLocaleString()}</p>
    <p><strong>Download History:</strong></p>
    <ul className="list-disc list-inside text-sm text-gray-700">
      {selectedDownload?.download_history?.map((ts: string, idx: number) => (
        <li key={idx}>{new Date(ts).toLocaleString()}</li>
      ))}
    </ul>
    <div className="mt-4 text-right">
      <button onClick={closeDialog} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Close</button>
    </div>
  </Dialog.Panel>
</Dialog>

      )}
    </div>
  );
};

export default DownloadAdmin;