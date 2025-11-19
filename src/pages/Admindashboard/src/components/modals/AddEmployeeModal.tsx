import React, { useState } from 'react';
import axios from 'axios';
import { X, UserPlus } from 'lucide-react';
import { Employee } from '../../hooks/useData';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: any) => void;
  editingEmployee?: any; // New prop
}


export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'editor' as 'admin' | 'editor' | 'viewer',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;
const assignGroupsToUser = async (userId: number, groupIds: number[]) => {
  try {
    const token = sessionStorage.getItem('drone_auth_token');
    if (!token) throw new Error('Auth token missing');

    await axios.put(
      `https://34-93-79-185.nip.io/api/admin/users/${userId}/assign-groups/`,
      { groups: groupIds },
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Groups assigned successfully');
  } catch (err) {
    console.error('Error assigning groups:', err);
  }
};

const handleSave = async () => {
  setError('');

  if (!formData.name || !formData.email) {
    setError('Name and email are required.');
    return;
  }

  const token = sessionStorage.getItem('drone_auth_token');
  if (!token) {
    setError('Authentication token missing.');
    return;
  }

  const requestBody = {
    email: formData.email,
    full_name: formData.name,
    password: 'TestPassword123!', // You can randomize later
    is_staff: true,
    is_superuser: formData.role === 'admin',
    groups: [] // we'll assign separately after creation
  };

  setLoading(true);
  try {
    const response = await axios.post(
      'https://34-124-167-179.nip.io/api/admin/create-user/',
      requestBody,
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const newUser = response.data;
    console.log('Employee created:', newUser);

    // Now assign group using the second API
    const groupId = formData.role === 'admin' ? 1 : formData.role === 'editor' ? 2 : 3;
    await assignGroupsToUser(newUser.id, [groupId]);

    // Notify parent component
    onSave({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status
    });

    setFormData({
      name: '',
      email: '',
      role: 'editor',
      status: 'Active'
    });
    onClose();
  } catch (err: any) {
    console.error('Error creating user:', err);
    setError('Failed to create user. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Employee</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@dronesim.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'editor' | 'viewer' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'Active' | 'Inactive' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Add Employee'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
