import React, { useState } from 'react';
import { Users as UsersIcon, Search, Filter, Edit, Eye, UserX, Settings, Calendar, Download } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { EditUserModal } from '../../components/modals/EditUserModal';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '@/api/axios';
export const MasterUsers: React.FC = () => {
  const { plans, drones, scenarios, updateUserPlan, updateUserAddOns, updateCustomPlan } = useData();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [editingUser, setEditingUser] = useState<string | null>(null);
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesPlan = planFilter === 'all' || user.plan === planFilter;

    const joinedDate = new Date(user.registrationDate);
    const matchesStart = startDate ? joinedDate >= new Date(startDate) : true;
    const matchesEnd = endDate ? joinedDate <= new Date(endDate) : true;

    return matchesSearch && matchesStatus && matchesPlan && matchesStart && matchesEnd;
  });


  const handleEditUser = async (
    userId: string,
    newPlan: string,
    addOns: any,
    customPlan?: any
  ) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    const updatePayload = {
      email: userToUpdate.email,
      username: userToUpdate.name,
      full_name: userToUpdate.name,
      password: 'TempPass@123',  // or fetch if user provides it
      password_confirm: 'TempPass@123',
      phone_number: userToUpdate.phone_number || '',
      city: userToUpdate.city || '',
      state_province: userToUpdate.state_province || '',
      country: userToUpdate.country || '',
      purpose_of_use: userToUpdate.purpose_of_use || '',
      plan:
        newPlan === 'Demo' ? 'trial' :
          newPlan === 'Free' ? 'basic' :
            newPlan === 'Premium' ? 'premium' :
              newPlan.toLowerCase(),
    };

    try {
      const token = sessionStorage.getItem('drone_auth_token') || '';
      await axios.put('https://34-47-194-149.nip.io/api/update-user-details/', updatePayload, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      // Locally update user state
      updateUserPlan(userId, newPlan, currentUser?.name || 'Master Admin');
      updateUserAddOns(userId, addOns, currentUser?.name || 'Master Admin');

      if (newPlan === 'Custom' && customPlan) {
        updateCustomPlan(userId, customPlan, currentUser?.name || 'Master Admin');
      }

      alert('User plan updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user plan.');
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Free': return 'bg-gray-100 text-gray-800';
      case 'Pro': return 'bg-blue-100 text-blue-800';
      case 'Institutional': return 'bg-purple-100 text-purple-800';
      case 'Enterprise': return 'bg-indigo-100 text-indigo-800';
      case 'Custom': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const handleDeleteUser = async (email: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete user: ${email}?`);
    if (!confirmed) return;

    try {
      const response = await axiosInstance.delete('/delete-user/', {
        data: { email }
      });


      if (response.data.status === 'success') {
        alert('User deleted successfully');
        setUsers(prev => prev.filter(user => user.email !== email));
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting user');
    }
  };


  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  // Add this inside your user processing logic (e.g., in fetch function or before render)
  const getTotalDuration = (scenarios: any[]) => {
    let totalSeconds = 0;

    scenarios.forEach(({ duration_formatted }) => {
      if (typeof duration_formatted === 'string') {
        const parts = duration_formatted.split(':').map(Number);
        if (parts.length === 3) {
          const [hrs, mins, secs] = parts;
          totalSeconds += (hrs || 0) * 3600 + (mins || 0) * 60 + (secs || 0);
        }
      }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPaymentStatus = (user: any) => {
    if (user.plan === 'Free') return { status: 'Free Plan', color: 'text-gray-500' };

    if (!user.nextPaymentDate) return { status: 'No Payment Due', color: 'text-gray-500' };

    const nextPayment = new Date(user.nextPaymentDate);
    const today = new Date();
    const daysUntilPayment = Math.ceil((nextPayment.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilPayment < 0) {
      return { status: 'Overdue', color: 'text-red-600' };
    } else if (daysUntilPayment <= 7) {
      return { status: `Due in ${daysUntilPayment} days`, color: 'text-yellow-600' };
    } else {
      return { status: `Due in ${daysUntilPayment} days`, color: 'text-green-600' };
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token =
          sessionStorage.getItem('drone_auth_token') ||
          localStorage.getItem('drone_auth_token');

        const [usersRes, transactionsRes] = await Promise.all([
          axiosInstance.get('/get-all-users/'),
          axios.get('https://34-47-194-149.nip.io/api/stripe/transactions/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          }).catch(() => ({ data: { results: [] } })) // fallback if Stripe API fails
        ]);

        const userList = usersRes.data.data;
        const transactions = transactionsRes.data.results || [];

        const normalizeEmail = (email: string) => (email || '').trim().toLowerCase();
        const formattedUsers = await Promise.all(userList.map(async (user: any) => {
          const txn = transactions.find((t: any) =>
            normalizeEmail(t.user_email) === normalizeEmail(user.email)
          );

          let scenarios = [];
          try {
            const scenarioRes = await axiosInstance.post('/get-single-user-details/', {
              email: user.email
            });
            scenarios = scenarioRes.data?.data?.all_scenarios?.scenarios || [];
          } catch (err) {
            console.warn(`Failed to load scenarios for ${user.email}`);
          }

          return {
            id: user.user_id,
            name: user.full_name || user.username || 'N/A',
            email: user.email,
            status: user.is_active ? 'Active' : 'Inactive',
            plan: (() => {
              if (txn?.plan_name_display) {
                switch (txn.plan_name_display.toLowerCase()) {
                  case 'trial': return 'Demo';
                  case 'basic': return 'Free';
                  case 'premium': return 'Premium';
                  default: return txn.plan_name_display;
                }
              } else {
                switch ((user.plan || '').toLowerCase()) {
                  case 'trial': return 'Demo';
                  case 'premium': return 'Premium';
                  case 'basic': return 'Free';
                  default: return user.plan || 'Free';
                }
              }
            })(),
            paidAmount: txn ? parseFloat(txn.amount) : 0,
            paymentDate: txn?.payment_date || null,
            nextPaymentDate: txn?.plan_expiry_date || user.plan_expiry_date || null,
            addOns: {},
            customPlan: null,
            usage: {
              simulationsThisMonth: user.statistics?.total_scenarios_completed || 0,
              totalSimulations: user.statistics?.total_app_sessions || 0,
            },
            registrationDate: new Date(user.created_at).toLocaleDateString(),
            scenarios // ✅ Add this
          };
        }));


        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users or transactions:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 const [sortConfig, setSortConfig] = useState<{ key: string | null, direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc'
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  //this is the 
  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading users...</div>;
  }
  const handleExportCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Status',
      'Plan',
      'Paid Amount',
      'Payment Date',
      'Next Payment Date',
      'Simulations This Month',
      'Total Simulations',
      'Registration Date'
    ];

    const rows = filteredUsers.map(user => [
      user.name,
      user.email,
      user.status,
      user.plan,
      user.paidAmount,
      user.paymentDate || '',
      user.nextPaymentDate || '',
      user.usage.simulationsThisMonth,
      user.usage.totalSimulations,
      user.registrationDate
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  const getTotalDurationSeconds = (scenarios: any[]) => {
    let totalSeconds = 0;
    scenarios.forEach(({ duration_formatted }) => {
      if (typeof duration_formatted === 'string') {
        const [h = 0, m = 0, s = 0] = duration_formatted.split(':').map(Number);
        totalSeconds += h * 3600 + m * 60 + s;
      }
    });
    return totalSeconds;
  };
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal: any;
    let bVal: any;

    switch (sortConfig.key) {
      case 'name':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'registrationDate':
        aVal = new Date(a.registrationDate).getTime();
        bVal = new Date(b.registrationDate).getTime();
        break;
      case 'usageDuration':
        aVal = getTotalDurationSeconds(a.scenarios);
        bVal = getTotalDurationSeconds(b.scenarios);
        break;
      default:
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
    }

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registered Users</h1>
          <p className="text-gray-500 mt-1">Manage all platform users and their subscriptions</p>
        </div>
        <div className="text-sm text-gray-600">
          Total: {users.length} users • Active: {users.filter(u => u.status === 'Active').length}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Plan Filter and Export Button */}
        <div className="flex justify-between items-center mt-4">
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Plans</option>
            <option value="Demo">Demo</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

      </div>

      {/* Users Table */}
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50 text-sm">
              <tr>
                {[
                  { key: 'name', label: 'User' },
                  { key: '', label: 'Plan & Configuration' },
                  { key: '', label: 'Status' },
                  { key: '', label: 'Payment' },
                  { key: 'usageDuration', label: 'Usage' },
                  { key: 'registrationDate', label: 'Joined' },
                  { key: '', label: 'Actions' },
                ].map(({ key, label }) => (
                  <th
                    key={label}
                    onClick={() => key && handleSort(key)}
                    className={`px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wide whitespace-nowrap text-[11px] ${key ? 'cursor-pointer select-none' : ''}`}
                  >
                    {label === 'Plan & Configuration' ? (
                      <>
                        PLAN
                        <br />
                        & CONFIGURATION
                      </>
                    ) : (
                      label
                    )}
                    {sortConfig.key === key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}

              </tr>
            </thead>


            <tbody className="bg-white divide-y divide-gray-100 text-[11px]">
              {sortedUsers.map((user) => {
                const paymentStatus = getPaymentStatus(user);
                return (
                  <tr
                    key={user.id}
                    onClick={() => window.location.href = `/dash/master/users/${user.email}`}
                    className="hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {/* User */}
                    <td className="px-2 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                          <UsersIcon className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div className="leading-tight">
                          <div className="font-medium text-gray-900 text-[11px]">{user.name}</div>
                          <div className="text-gray-500 text-[10px] break-all">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span className={`px-2 py-[2px] rounded-full text-[10px] font-medium ${getPlanColor(user.plan)}`}>
                        {user.plan}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span className={`px-2 py-[2px] rounded-full text-[10px] font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="px-2 py-2 whitespace-nowrap leading-tight">
                      <div className="text-green-600 font-semibold text-[11px]">
                        {user.paidAmount ? `₹${user.paidAmount}` : 'Free Plan'}
                      </div>
                      <div className="text-gray-400 text-[10px]">
                        {user.nextPaymentDate && paymentStatus.status}
                      </div>
                    </td>

                    {/* Usage */}
                    <td className="px-2 py-2 text-gray-600 whitespace-nowrap leading-tight">
                      <div className="text-[10px] text-gray-900"> Count : {user.usage.simulationsThisMonth}</div>
                      {/* <div className="text-[10px] text-gray-400">{user.usage.totalSimulations} total</div> */}
                      <div className="text-[10px] text-gray-900">{getTotalDuration(user.scenarios)}</div>
                    </td>

                    {/* Joined */}
                    <td className="px-2 py-2 whitespace-nowrap text-[10px]">{user.registrationDate}</td>

                    {/* Actions */}
                    <td className="px-2 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `/dash/master/users/${user.email}`;
                          }}
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingUser(user.id);
                          }}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-green-600" />
                        </button>
                        {user.plan === 'Custom' && (
                          <Settings
                            className="w-4 h-4 text-purple-600"
                            onClick={(e) => e.stopPropagation()}
                            title="Custom"
                          />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(user.email);
                          }}
                          title="Delete"
                        >
                          <UserX className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>


          </table>
        </div>
      </div>




      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          user={users.find(u => u.id === editingUser)!}
          plans={plans.map(p => p.name)}
          drones={drones}
          scenarios={scenarios}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleEditUser}
        />
      )}
    </div>
  );
};