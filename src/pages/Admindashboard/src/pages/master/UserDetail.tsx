import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Save, User, Activity, Clock, BarChart3 } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import axios from 'axios';

export const MasterUserDetail: React.FC = () => {
  const { id: email } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, plans, annotations, updateUser, updateUserPlan, updateUserAddOns } = useData();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const userAnnotations = annotations.filter(a => a.userId === user?.id);


  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user || {});
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsRes = await axios.post('https://34-47-194-149.nip.io/api/get-single-user-details/', {
          email: email
        });

        if (userDetailsRes.data.status === 'success') {
          const userData = userDetailsRes.data.data;

          // Assuming scenarios are part of the user data returned by the API
          const formatted = {
            id: userData.user_id,
            name: userData.full_name || userData.username || 'N/A',
            email: userData.email,
            status: userData.is_active ? 'Active' : 'Inactive',
            plan: userData.plan?.toLowerCase() || 'trial',
            planExpiry: userData.plan_expiry_date
              ? new Date(userData.plan_expiry_date).toLocaleDateString()
              : 'N/A',
            addOns: {}, // assuming you fetch these from somewhere else
            paidAmount: 0,
            paymentDate: null,
            nextPaymentDate: null,
            customPlan: null,
            usage: {
              simulationsThisMonth: userData.statistics.total_scenarios_completed || 0,
              totalSimulations: userData.statistics.total_app_sessions || 0
            },
            registrationDate: new Date(userData.created_at).toLocaleDateString(),
            lastLogin: userData.last_login_date
              ? new Date(userData.last_login_date).toLocaleString()
              : 'N/A',
            scenarios: userData.all_scenarios?.scenarios || [], // Include all scenarios here
            raw: userData
          };

          setUser(formatted);
          setEditData(formatted);
        } else {
          console.error('Failed to fetch user detail');
        }
      } catch (error) {
        console.error('Error fetching user detail:', error);
      } finally {
        setLoading(false);
      }

    };

    fetchUserDetails();
  }, [email]);





  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }
  const groupScenarioSummary = (scenarios: any[]) => {
    const grouped: Record<string, { count: number; totalSeconds: number }> = {};

    scenarios.forEach(({ scenario_name, drone_name, location_name, duration_formatted }) => {
      const key = `${scenario_name}|||${drone_name}|||${location_name}`;

      // Convert duration to seconds safely
      let seconds = 0;
      if (typeof duration_formatted === 'string' && duration_formatted.includes(':')) {
        const parts = duration_formatted.split(':').map(Number);
        if (parts.length === 3) {
          const [hrs, mins, secs] = parts;
          seconds = (hrs || 0) * 3600 + (mins || 0) * 60 + (secs || 0);
        }
      }

      if (!grouped[key]) {
        grouped[key] = { count: 1, totalSeconds: seconds };
      } else {
        grouped[key].count += 1;
        grouped[key].totalSeconds += seconds;
      }
    });

    const result = Object.entries(grouped).map(([key, value]) => {
      const [Scenario, Drone, Location] = key.split('|||');
      const hrs = Math.floor(value.totalSeconds / 3600);
      const mins = Math.floor((value.totalSeconds % 3600) / 60);
      const secs = value.totalSeconds % 60;

      return {
        Scenario,
        Drone,
        Location,
        Count: value.count,
        Total_Duration: `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
          .toString()
          .padStart(2, '0')}`,
      };
    });

    return result;
  };


  const sumDurations = (durations: (string | null | undefined)[]) => {
    let totalSeconds = 0;

    durations.forEach((duration) => {
      if (typeof duration === 'string' && duration.includes(':')) {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        totalSeconds += (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
      }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  const overallDuration = sumDurations(
    groupScenarioSummary(user.scenarios || []).map((item) => item.Total_Duration)
  );

  const handleSave = async () => {
    // Normalize values
    const is_active = editData.status === 'Active';
    const sanitizedPlan = editData.plan?.toLowerCase();
    const formatToIsoDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().split('.')[0]; // "2027-06-16T00:00:00"
    };
    const formattedExpiry = formatToIsoDate(editData.planExpiry);

    // Call local update functions if there are changes
    if (editData.plan !== user.plan) {
      updateUserPlan(user.id, sanitizedPlan, currentUser?.name || 'Master Admin');
    }

    if (JSON.stringify(editData.addOns) !== JSON.stringify(user.addOns)) {
      updateUserAddOns(user.id, editData.addOns, currentUser?.name || 'Master Admin');
    }

    try {
      await axios.put(
        `https://34-47-194-149.nip.io/api/update-user-details/`,
        {
          email: editData.email,
          full_name: editData.name,
          plan: sanitizedPlan,
          plan_expiry_date: formattedExpiry,
          is_active: is_active,
        },
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("drone_auth_token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Error updating user details:", err);
    }

    updateUser(user.id, editData, currentUser?.name || 'Master Admin');
    setIsEditing(false);
  };




  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/dash/master/users')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500 mt-1">Manage user information and subscription plan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
     <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-orange-500 p-4">
  <div className="flex items-center justify-between mb-3">
    <h2 className="text-sm font-semibold text-black">User Information</h2>
    <button
      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
      className="flex items-center space-x-2 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
    >
      {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
      <span className="text-xs">{isEditing ? 'Save' : 'Edit'}</span>
    </button>
  </div>

  <div className="space-y-3">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
        <User className="w-5 h-5 text-orange-600" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-black">{user.name}</h3>
        <p className="text-xs text-gray-600">{user.email}</p>
        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {user.status}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium text-black mb-0.5">Full Name</label>
        <input
          type="text"
          value={isEditing ? editData.name : user.name}
          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
          disabled={!isEditing}
          className={`w-full px-3 py-1.5 border border-gray-300 rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-orange-500' : 'bg-gray-50'}`}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-black mb-0.5">Email</label>
        <input
          type="email"
          value={isEditing ? editData.email : user.email}
          onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
          disabled={!isEditing}
          className={`w-full px-3 py-1.5 border border-gray-300 rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-orange-500' : 'bg-gray-50'}`}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-black mb-0.5">Status</label>
        <select
          value={isEditing ? editData.status : user.status}
          onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
          disabled={!isEditing}
          className={`w-full px-3 py-1.5 border border-gray-300 rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-orange-500' : 'bg-gray-50'}`}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-black mb-0.5">Registration Date</label>
        <input
          type="text"
          value={user.registrationDate}
          disabled
          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-gray-50"
        />
      </div>
    </div>

    <div className="border-t border-orange-500 pt-3">
      <h3 className="text-sm font-medium text-black mb-3">Usage Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-lg border border-orange-500">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-black">This Month</span>
          </div>
           <div className="text-[20px] text-gray-900"> Count : {user.usage.simulationsThisMonth}</div>
         
        </div>
        <div className="bg-white p-3 rounded-lg border border-orange-500">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-black">Total</span>
          </div>
          <p className="text-xl font-bold text-black mt-1">{overallDuration}</p>
          <p className="text-xs text-gray-600">{user.usage.totalSimulations} simulations</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-orange-500">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-black">Last Active</span>
          </div>
          <p className="text-xs font-bold text-black mt-1">{user.lastLogin}</p>
          <p className="text-xs text-gray-600">activity</p>
        </div>
      </div>
    </div>
  </div>
</div>


        <div className="space-y-4 mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-orange-500 p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Subscription Plan</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white border border-orange-500 rounded-lg">
                <h3 className="font-medium text-black">Current Plan: {user.plan}</h3>
                <p className="text-sm text-gray-600 mt-1">${plans.find(p => p.name === user.plan)?.price || 0}/month</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Plan Expiry Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.planExpiry?.split('T')[0]}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        planExpiry: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-sm text-black">{user.planExpiry || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Change Plan</label>
                <select
                  value={isEditing ? editData.plan : user.plan}
                  onChange={(e) => setEditData(prev => ({ ...prev, plan: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'focus:ring-2 focus:ring-orange-500' : 'bg-gray-50'}`}
                >
                  <option value="trial">Trial - $0/month</option>
                  <option value="basic">Basic - $10/month</option>
                  <option value="premium">Premium - $25/month</option>
                </select>
              </div>

              <div>
               
                <div className="space-y-2">
                  {Object.entries(user.addOns).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isEditing ? editData.addOns?.[key] : value}
                        onChange={(e) => setEditData(prev => ({
                          ...prev,
                          addOns: { ...prev.addOns, [key]: e.target.checked }
                        }))}
                        disabled={!isEditing}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-black capitalize">
                        {key} Module
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>









        {/* Plan Management */}

      </div>
      {/* ✅ Drone Flight Summary section placed AFTER the main grid */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Drone Flight Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from(
            new Set(groupScenarioSummary(user.scenarios || []).map((x) => x.Location))
          ).map((location, idx) => {
            const data = groupScenarioSummary(user.scenarios || []).filter(
              (item) => item.Location === location
            );

            return (
              <div
                key={idx}
                className="bg-white rounded-md shadow-sm border border-orange-500 p-3 hover:shadow-md transition duration-300"
              >
                <h4 className="text-md font-bold text-orange-600 mb-4 flex justify-between">
                  <span>{location}</span>
                  <span> (Total: {sumDurations(data.map(item => item.Total_Duration))})</span>
                </h4>

                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-orange-50 text-orange-700">
                      <th className="px-2 py-1 text-left font-semibold">Drone</th>
                      <th className="px-2 py-1 text-left font-semibold">Scenario</th>
                      <th className="px-2 py-1 text-left font-semibold">Count</th>
                      <th className="px-2 py-1 text-left font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr key={i} className="border-t hover:bg-orange-50 transition duration-200">
                        <td className="px-2 py-1 text-gray-800">{item.Drone}</td>
                        <td className="px-2 py-1 text-gray-800">{item.Scenario}</td>
                        <td className="px-2 py-1 text-gray-800">{item.Count}</td>
                        <td className="px-2 py-1 text-gray-800">{item.Total_Duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>


    </div>

  );
};
