import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Eye, Download } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface Download {
  id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  city: string;
  state_province: string;
  country: string;
  created_at: string;
  last_download_at: string;
  purpose_of_use: string;
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
      const token = sessionStorage.getItem('drone_auth_token');
      const response = await axios.get('https://34-47-194-149.nip.io/api/get-all-downloads/', {
        headers: { Authorization: `Token ${token}` },
      });
      setDownloads(response.data.data || []);
    } catch (error) {
      console.error('Error fetching downloads:', error);
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
    const headers = ['Name', 'Email', 'Phone', 'City', 'State', 'Country', 'Purpose', 'Created At', 'Last Download'];
    const rows = filteredDownloads.map(d => [
      d.full_name || d.username || 'Anonymous',
      d.email,
      d.phone_number,
      d.city,
      d.state_province,
      d.country,
      d.purpose_of_use,
      new Date(d.created_at).toLocaleString(),
      new Date(d.last_download_at || d.created_at).toLocaleString()
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


      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full table-auto text-[11px]">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wide">Name</th>
          <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wide">Email</th>
          <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wide">Phone</th>
          <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wide">Location</th>
          <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wide">Date</th>
          <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wide">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredDownloads.map((download) => (
          <tr key={download.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-2 py-1 text-gray-900">{download.full_name || download.username || 'Anonymous'}</td>
            <td className="px-2 py-1 text-gray-600">{download.email || 'N/A'}</td>
            <td className="px-2 py-1 text-gray-600">{download.phone_number || 'N/A'}</td>
            <td className="px-2 py-1 text-gray-700">
              {download.city || '-'}
            </td>
            <td className="px-2 py-1 text-gray-700">
              {new Date(download.last_download_at || download.created_at).toLocaleDateString()}
            </td>
            <td className="px-2 py-1 text-gray-700">
              <div className="flex items-center space-x-1">
                <button onClick={() => openDialog(download)} className="text-orange-600 hover:text-orange-800" title="View">
                  <Eye size={14} />
                </button>
                <button onClick={() => handleDelete(download.email)} className="text-red-600 hover:text-red-800" title="Delete">
                  <Trash2 size={14} />
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
            <p><strong>Name:</strong> {selectedDownload.full_name}</p>
            <p><strong>Email:</strong> {selectedDownload.email}</p>
            <p><strong>Phone:</strong> {selectedDownload.phone_number}</p>
            <p><strong>Location:</strong> {selectedDownload.city}, {selectedDownload.state_province}, {selectedDownload.country}</p>
            <p><strong>Purpose:</strong> {selectedDownload.purpose_of_use}</p>
            <p><strong>Download Date:</strong> {new Date(selectedDownload.last_download_at || selectedDownload.created_at).toLocaleString()}</p>
            <p><strong>Created On:</strong> {new Date(selectedDownload.created_at).toLocaleString()}</p>
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