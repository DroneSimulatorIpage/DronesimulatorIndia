import React, { useEffect, useState } from 'react';
import { UserCog, Plus, Mail, Shield, Edit, Trash2 } from 'lucide-react';
import { AddEmployeeModal } from '../../components/modals/AddEmployeeModal';
import axios from 'axios';

export const MasterEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
const [showAddModal, setShowAddModal] = useState(false);
const [editEmployee, setEditEmployee] = useState<any | null>(null); // New line


useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const token = sessionStorage.getItem('drone_auth_token');
      if (!token) {
        console.error("No token found in sessionStorage");
        return;
      }

      const res = await axios.get('https://34-47-194-149.nip.io/api/admin/groups/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      const users = res.data.results.flatMap((group: any) =>
        group.permissions.map((perm: any, idx: number) => ({
          id: `${group.id}-${perm.id}-${idx}`,
          name: group.name,
          email: `${group.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
          role: 'editor',
          status: 'Active',
          joinDate: '2024-06-01',
          lastLogin: '2024-07-01',
          activityCount: perm.id,
        }))
      );

      const uniqueEmployees = users.filter(
        (value, index, self) => index === self.findIndex(v => v.email === value.email)
      );
      setEmployees(uniqueEmployees);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  fetchEmployees();
}, []);


  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield;
      case 'editor': return Edit;
      case 'viewer': return UserCog;
      default: return UserCog;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-500 mt-1">Manage team members and their access permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Employees" count={employees.length} Icon={UserCog} color="blue" />
        <StatCard label="Active" count={employees.filter(e => e.status === 'Active').length} Icon={Shield} color="green" />
        <StatCard label="Admins" count={employees.filter(e => e.role === 'admin').length} Icon={Shield} color="red" />
        <StatCard label="Total Activity" count={employees.reduce((sum, e) => sum + e.activityCount, 0)} Icon={Edit} color="purple" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Employee', 'Contact', 'Role', 'Status', 'Activity', 'Join Date', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => {
                const RoleIcon = getRoleIcon(employee.role);
                return (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <UserCog className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">ID: EMP-{employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{employee.email}</span>
                        </div>
                        <div className="text-sm text-gray-500">Last login: {employee.lastLogin}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <RoleIcon className="w-4 h-4 text-gray-500" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(employee.role)}`}>
                          {employee.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Edit className="w-4 h-4 text-gray-400" />
                        <span>{employee.activityCount} edits</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                       <button
  onClick={() => {
    setEditEmployee(employee);
    setShowAddModal(true);
  }}
  className="text-blue-600 hover:text-blue-900 transition-colors p-1"
  title="Edit Employee"
>
  <Edit className="w-4 h-4" />
</button>

                        <button className="text-red-600 hover:text-red-900 transition-colors p-1" title="Delete Employee">
                          <Trash2 className="w-4 h-4" />
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

     <AddEmployeeModal
  isOpen={showAddModal}
  onClose={() => {
    setShowAddModal(false);
    setEditEmployee(null);
  }}
  onSave={(updatedEmployee) => {
    setShowAddModal(false);
    setEditEmployee(null);

    // Optionally update UI immediately
    setEmployees(prev =>
      prev.map(emp => emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp)
    );
  }}
  editingEmployee={editEmployee}
/>

    </div>
  );
};

const StatCard = ({ label, count, Icon, color }: { label: string; count: number; Icon: any; color: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
      </div>
      <div className={`bg-${color}-50 p-3 rounded-lg`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);
