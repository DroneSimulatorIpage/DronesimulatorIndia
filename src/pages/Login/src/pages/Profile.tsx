import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import {
  User,
  Settings,
  ShoppingBag,
  Award,
  Edit3,
  Save,
  X,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  Activity,
  Eye,
  EyeOff,
  Monitor,
  Gamepad2,
  GraduationCap,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  BarChart3,
  Users,
  Globe,
  Menu,
  ChevronDown
} from 'lucide-react'

const Profile: React.FC = () => {
  const { user, updateProfile, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [stripePurchases, setStripePurchases] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [detailedUser, setDetailedUser] = useState<any>(null)
  const [showAllScenarios, setShowAllScenarios] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    full_name: '',
    phone_number: '',
    city: '',
    state_province: '',
    country: '',
    purpose_of_use: '',
    purpose_other: ''
  })

  // Enhanced mock data with more realistic information
  const mockUser = {
    email: 'demo@example.com',
    username: 'DemoUser',
    full_name: 'Demo User',
    phone_number: '+1 555-0123',
    city: 'San Francisco',
    state_province: 'California',
    country: 'United States',
    purpose_of_use: 'personal',
    avatar_url: '',
    member_since: '2024-01-01',
    subscription_status: 'premium' as const,
    is_active: true,
    plan: 'premium',
    plan_expiry_date: '2024-12-31',
    statistics: {
      total_scenarios_completed: 47,
      total_app_sessions: 156,
      total_flight_hours: 89.5
    },
    recent_activity: {
      recent_scenarios: [
        {
          scenario_name: 'Urban Navigation',
          drone_name: 'DJI Mavic Pro',
          location_name: 'Downtown San Francisco',
          start_time: '2024-01-15T14:30:00Z',
          duration_formatted: '25 minutes'
        },
        {
          scenario_name: 'https://34-47-194-149.nip.io Flight Training',
          drone_name: 'Autel EVO II',
          location_name: 'Golden Gate Park',
          start_time: '2024-01-14T20:15:00Z',
          duration_formatted: '18 minutes'
        },
        {
          scenario_name: 'Weather Challenge',
          drone_name: 'DJI Mini 3',
          location_name: 'Ocean Beach',
          start_time: '2024-01-13T11:45:00Z',
          duration_formatted: '32 minutes'
        },
        {
          scenario_name: 'Precision Landing',
          drone_name: 'DJI Air 2S',
          location_name: 'Alcatraz Island',
          start_time: '2024-01-12T16:20:00Z',
          duration_formatted: '22 minutes'
        }
      ]
    },
    achievements: ['Welcome Aboard', 'First Flight', 'Night Pilot', 'Precision Master', 'Weather Warrior']
  }

  const mockPurchases = [
    {
      id: 'DEMO-001',
      product_name: 'DroneSimulator Pro License',
      product_type: 'software',
      amount: '199.99',
      currency: 'USD',
      payment_date: '2024-01-15T00:00:00Z',
      status: 'completed',
      description: 'Professional drone simulation software with advanced features and unlimited scenarios'
    },
    {
      id: 'DEMO-002',
      product_name: 'Advanced Pilot Training Course',
      product_type: 'training',
      amount: '89.99',
      currency: 'USD',
      payment_date: '2024-02-01T00:00:00Z',
      status: 'completed',
      description: 'Comprehensive training course covering advanced flight techniques and safety protocols'
    },
    {
      id: 'DEMO-003',
      product_name: 'Weather Simulation Pack',
      product_type: 'software',
      amount: '49.99',
      currency: 'USD',
      payment_date: '2024-02-15T00:00:00Z',
      status: 'completed',
      description: 'Additional weather scenarios including storms, fog, and extreme conditions'
    }
  ]
  const [showFullTable, setShowFullTable] = useState(false)
  // Use authenticated user data if available, otherwise use mock data
  const currentUser = detailedUser || mockUser
  const currentPurchases = stripePurchases.length > 0 ? stripePurchases : mockPurchases
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('auth_token')
      const storedUser = sessionStorage.getItem('auth_user')

      if (!token || !storedUser) {
        setApiError(true)
        return
      }

      try {
        const { email } = JSON.parse(storedUser)

        // Fetch user details
        const userRes = await fetch('https://34-47-194-149.nip.io/api/get-single-user-details/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ email })
        })

        if (userRes.ok) {
          const userResult = await userRes.json()
          if (userResult.data) {
            const enrichedData = {
              ...userResult.data,
              recent_activity: {
                recent_scenarios: userResult.data.all_scenarios?.scenarios || []
              }
            }
            setDetailedUser(enrichedData)
            setApiError(false)
          }
        } else {
          throw new Error('Failed to fetch user details')
        }

        // Fetch stripe transactions
        const stripeRes = await fetch('https://34-47-194-149.nip.io/api/stripe/my-transactions/', {
          headers: {
            Authorization: `Token ${token}`
          }
        })

        if (stripeRes.ok) {
          const stripeResult = await stripeRes.json()
          const transactions = Array.isArray(stripeResult.transactions) ? stripeResult.transactions.map(tx => ({
            id: tx.transaction_id,
            product_name: tx.plan_display_name || tx.plan_name_display || 'Subscription',
            product_type: 'subscription',
            amount: tx.amount,
            currency: tx.currency_display || tx.currency,
            payment_date: tx.payment_date,
            status: tx.payment_status,
            description: `Plan: ${tx.plan_display_name || tx.plan_name}. Auto Renew: ${tx.is_auto_renew ? 'Yes' : 'No'}`,
          })) : []
          setStripePurchases(transactions)
        }
      } catch (error) {
        console.error('API error:', error)
        setApiError(true)
      }
    }

    fetchData()
  }, [])

  // Populate form fields
  useEffect(() => {
    if (currentUser) {
      const isOtherPurpose = !['personal', 'commercial', 'educational', 'research'].includes(currentUser.purpose_of_use)

      setFormData({
        email: currentUser.email || '',
        username: currentUser.username || '',
        full_name: currentUser.full_name || '',
        phone_number: currentUser.phone_number || '',
        city: currentUser.city || '',
        state_province: currentUser.state_province || '',
        country: currentUser.country || '',
        purpose_of_use: isOtherPurpose ? 'other' : currentUser.purpose_of_use || '',
        purpose_other: isOtherPurpose ? currentUser.purpose_of_use || '' : ''
      })
    }
  }, [currentUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (successMessage) {
      setSuccessMessage('')
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required'
    }

    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required'
    }

    if (!formData.city) {
      newErrors.city = 'City is required'
    }

    if (!formData.state_province) {
      newErrors.state_province = 'State/Province is required'
    }

    if (!formData.country) {
      newErrors.country = 'Country is required'
    }

    if (formData.purpose_of_use === 'other' && !formData.purpose_other.trim()) {
      newErrors.purpose_other = 'Please specify your purpose of use'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const tokenInStorage = sessionStorage.getItem('auth_token')
    if (!isAuthenticated && !tokenInStorage) {
      setErrors({ submit: 'Please log in to edit your profile.' })
      return
    }

    setIsLoading(true)

    const payload = {
      email: formData.email,
      username: formData.username,
      password: `${formData.username}@1234`,
      password_confirm: `${formData.username}@1234`,
      full_name: formData.full_name,
      phone_number: formData.phone_number,
      city: formData.city,
      state_province: formData.state_province,
      country: formData.country,
      purpose_of_use: formData.purpose_of_use === 'other' ? formData.purpose_other : formData.purpose_of_use
    }

    try {
      const response = await fetch('https://34-47-194-149.nip.io/api/update-user-details/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenInStorage}`
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile.')
      }

      sessionStorage.setItem('auth_user', JSON.stringify(result.data))
      if (updateProfile) {
        updateProfile(result.data)
      }

      setSuccessMessage('Profile updated successfully!')
      setIsEditing(false)
    } catch (error: any) {
      console.error('Update error:', error)
      setErrors({ submit: error.message || 'Failed to update profile. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }
  const getTotalFlightHours = (scenarios: any[]) => {
    let totalSeconds = 0

    scenarios.forEach((s) => {
      if (s.duration_formatted) {
        const parts = s.duration_formatted.split(':').map(Number)
        if (parts.length === 3) {
          const [hh, mm, ss] = parts
          totalSeconds += (hh * 3600 + mm * 60 + ss)
        }
      }
    })

    return (totalSeconds / 3600).toFixed(1)
  }


  const handleLogout = () => {
    sessionStorage.clear(); // ✅ Clears auth_token and auth_user
    if (isAuthenticated) {
      logout(); // ✅ Clears context, tokens, etc.
    }
    navigate('/auth/login'); // ✅ Redirect to login
  }
  const handleCancel = () => {
    if (currentUser) {
      const isOtherPurpose = !['personal', 'commercial', 'educational', 'research'].includes(currentUser.purpose_of_use)
      setFormData({
        email: currentUser.email,
        username: currentUser.username,
        full_name: currentUser.full_name,
        phone_number: currentUser.phone_number,
        city: currentUser.city,
        state_province: currentUser.state_province,
        country: currentUser.country,
        purpose_of_use: isOtherPurpose ? 'other' : currentUser.purpose_of_use,
        purpose_other: isOtherPurpose ? currentUser.purpose_of_use : ''
      })
    }
    setIsEditing(false)
    setErrors({})
    setSuccessMessage('')
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: { icon: CheckCircle, color: 'text-emerald-700 bg-emerald-50 border-emerald-200', text: 'Completed' },
      pending: { icon: Clock, color: 'text-amber-700 bg-amber-50 border-amber-200', text: 'Pending' },
      cancelled: { icon: XCircle, color: 'text-red-700 bg-red-50 border-red-200', text: 'Cancelled' },
      refunded: { icon: RefreshCw, color: 'text-slate-700 bg-slate-50 border-slate-200', text: 'Refunded' }
    }

    const badge = badges[status as keyof typeof badges] || badges.completed
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    )
  }

  const getProductIcon = (type: string) => {
    const icons = {
      software: Monitor,
      hardware: Package,
      training: GraduationCap,
      subscription: RefreshCw
    }

    const Icon = icons[type as keyof typeof icons] || Package
    return <Icon className="w-5 h-5" />
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'purchases', name: 'Purchases', icon: ShoppingBag },
    // { id: 'achievements', name: 'Achievements', icon: Award }
  ]
  const groupScenarioSummary = (scenarios: any[]) => {
    const timeToSeconds = (duration: string | null) => {
      if (!duration || typeof duration !== 'string') return 0;
      const parts = duration.split(':').map(Number);
      return parts.reduce((acc, val) => acc * 60 + val, 0);
    };


    const grouped = new Map();

    scenarios.forEach((s) => {
      const key = `${s.scenario_name}||${s.drone_name}||${s.location_name}`;
      const current = grouped.get(key) || { count: 0, seconds: 0 };
      grouped.set(key, {
        count: current.count + 1,
        seconds: current.seconds + timeToSeconds(s.duration_formatted),
      });
    });

    return Array.from(grouped.entries()).map(([key, value]) => {
      const [Scenario, Drone, Location] = key.split('||');
      const hrs = Math.floor(value.seconds / 3600);
      const mins = Math.floor((value.seconds % 3600) / 60) % 60;
      const secs = value.seconds % 60;
      return {
        Scenario,
        Drone,
        Location,
        Count: value.count,
        Total_Duration: `${hrs.toString().padStart(2, '0')}:${mins
          .toString()
          .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`,
      };
    });
  };
  function sumDurations(durations: string[]): string {
    let totalSeconds = 0;

    durations.forEach((dur) => {
      const parts = dur.split(':').map(Number);
      if (parts.length === 3) {
        const [hh, mm, ss] = parts;
        totalSeconds += hh * 3600 + mm * 60 + ss;
      }
    });

    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  return (

    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="w-full px-3 py-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <img
                  src="images/logonew.png" // or wherever your logo is located
                  alt="Logo"
                  className="w-10 h-10 rounded-md object-contain"
                />
                <div className="min-w-0">
                  <h1 className="text-base font-bold text-gray-900 truncate">Profile Dashboard</h1>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-3 pt-3 border-t border-gray-200 w-full">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors py-2 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logonew.png" // or wherever your logo is located
                    alt="Logo"
                    className="w-17 h-10 rounded-md object-contain"
                  />
                  <div className="min-w-0">
                    <h1 className="text-base font-bold text-gray-900 truncate">    Profile Dashboard</h1>
                  </div>
                </div>
              </div>

              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* API Error Notice */}
      {apiError && (
        <div className="bg-amber-50 border-b border-amber-200 w-full px-3 lg:px-6 py-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-amber-800 text-sm">Demo Mode</p>
              <p className="text-xs text-amber-700">
                Unable to connect to server. Showing sample data for demonstration.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full px-3 lg:px-6 py-4 lg:py-6">
        {/* User Header Section */}
        <div className="mb-6 lg:mb-8 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 w-full min-w-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg lg:text-xl font-bold text-white">
                  {currentUser.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="min-w-0 flex-1 w-full">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1 truncate">{currentUser.full_name}</h2>
                <p className="text-gray-600 text-sm lg:text-base mb-2 truncate">@{currentUser.username}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs lg:text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">
                      Member since {new Date(currentUser.created_at || currentUser.member_since || '2024-01-01').getFullYear()}
                    </span>

                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{currentUser.city}, {currentUser.country}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{currentUser.purpose_of_use?.charAt(0).toUpperCase() + currentUser.purpose_of_use?.slice(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats - Desktop */}
            <div className="hidden lg:flex gap-6 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {getTotalFlightHours(currentUser.recent_activity?.recent_scenarios || [])}
                </div>
                <div className="text-xs text-gray-500 font-medium">Flight Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {currentUser.statistics?.total_scenarios_completed || 0}
                </div>
                <div className="text-xs text-gray-500 font-medium">Scenarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {currentUser.statistics?.total_app_sessions ?? 0}
                </div>
                <div className="text-xs text-gray-500 font-medium">Sessions</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
            <div className="bg-white rounded-xl p-3 lg:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs font-medium mb-1">Total Purchases</p>
                  <p className="text-lg lg:text-xl font-bold text-gray-900">
                    {currentPurchases.filter(p => p.status === 'succeeded').length}
                  </p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                  <ShoppingBag className="w-4 lg:w-5 h-4 lg:h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 lg:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs font-medium mb-1">Total Spent</p>
                  <p className="text-lg lg:text-xl font-bold text-gray-900">
                    ${currentPurchases
                      .filter(p => p.status === 'succeeded')
                      .reduce((sum, p) => sum + parseFloat(p.amount || '0'), 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg flex-shrink-0">
                  <DollarSign className="w-4 lg:w-5 h-4 lg:h-5 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 lg:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs font-medium mb-1">Account Status</p>
                  <p className="text-lg lg:text-xl font-bold text-emerald-600">
                    {currentUser.is_active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg flex-shrink-0">
                  <Activity className="w-4 lg:w-5 h-4 lg:h-5 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-xl p-3 lg:p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-500 text-xs font-medium mb-1">Achievements</p>
                  <p className="text-lg lg:text-xl font-bold text-gray-900">
                    {currentUser.achievements?.length || 0}
                  </p>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg flex-shrink-0">
                  <Award className="w-4 lg:w-5 h-4 lg:h-5 text-amber-600" />
                </div>
              </div>
            </div> */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Upload Your Social Media Tasks</h3>
            <p className="text-gray-600 mt-2">
              please click below button to upload your social media task proof:
            </p>
            <a
              href="https://forms.gle/KzQGdGMqMWXoj6Dn7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700"
            >
              Click here to upload tasks
            </a>
          </div>

        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full">
          {/* Mobile Tabs */}
          <nav className="lg:hidden border-b border-gray-200 w-full">
            <div className="flex overflow-x-auto w-full">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                      ? 'border-orange-500 text-orange-600 bg-orange-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-3 h-3" />
                    {tab.name}
                  </button>
                )
              })}
            </div>
          </nav>


          {/* Desktop Tabs */}
          <nav className="hidden lg:flex border-b border-gray-200 w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 bg-orange-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              )
            })}
          </nav>

          {/* Tab Content */}
          <div className="p-3 lg:p-6 w-full">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4 lg:space-y-6 w-full">
                <div className="w-full">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">Account Overview</h3>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 w-full">
                    {/* Recent Activity */}
                    <div className="bg-gray-50 rounded-xl p-3 lg:p-4 w-full">
                      <h4 className="text-base font-semibold text-gray-900 mb-3 lg:mb-4">All Scenarios</h4>

                      <div className="overflow-x-auto w-full">
                        <table className="min-w-full text-sm text-left text-gray-600">
                          <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
                            <tr>
                              <th className="px-4 py-3">#</th>
                              <th className="px-4 py-3">Scenario Name</th>
                              <th className="px-4 py-3">Drone</th>
                              <th className="px-4 py-3">Location</th>
                              <th className="px-4 py-3">Duration</th>
                              <th className="px-4 py-3">Date</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {(showFullTable
                              ? currentUser.all_scenarios?.scenarios
                              : (currentUser.all_scenarios?.scenarios || []).slice(-10) // latest 10
                            )
                              ?.map((scenario: any, index: number) => (
                                <tr key={index}>
                                  <td className="px-4 py-3 font-medium text-gray-900">{index + 1}</td>
                                  <td className="px-4 py-3">{scenario.scenario_name}</td>
                                  <td className="px-4 py-3">{scenario.drone_name}</td>
                                  <td className="px-4 py-3">{scenario.location_name}</td>
                                  <td className="px-4 py-3">{scenario.duration_formatted}</td>
                                  <td className="px-4 py-3">{new Date(scenario.start_time).toLocaleDateString()}</td>
                                </tr>
                              ))}

                            {(!currentUser.all_scenarios?.scenarios || currentUser.all_scenarios.scenarios.length === 0) && (
                              <tr>
                                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                                  No scenarios available.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {(currentUser.all_scenarios?.scenarios?.length || 0) > 10 && (
                        <div className="mt-3 text-right">
                          <button
                            onClick={() => setShowFullTable(!showFullTable)}
                            className="text-orange-600 hover:text-orange-700 font-medium text-sm transition"
                          >
                            {showFullTable ? 'Show Less' : 'Show All'}
                          </button>
                        </div>
                      )}
                    </div>


                    {/* Account Details */}
                    <div className="bg-gray-50 rounded-xl p-3 lg:p-4 w-full">
                      <h4 className="text-base font-semibold text-gray-900 mb-3 lg:mb-4">Account Details</h4>
                      <div className="space-y-3 w-full">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 w-full">
                          <span className="text-gray-600 font-medium text-sm">Subscription</span>
                          <span className="font-bold text-gray-900 uppercase text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                            {currentUser.plan || 'Free'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 w-full">
                          <span className="text-gray-600 font-medium text-sm">Plan Expiry</span>
                          <span className="font-semibold text-gray-900 text-sm">
                            {currentUser.plan_expiry_date
                              ? new Date(currentUser.plan_expiry_date).toLocaleDateString()
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200 w-full">
                          <span className="text-gray-600 font-medium text-sm">Total Sessions</span>
                          <span className="font-semibold text-gray-900 text-sm">
                            {currentUser.statistics?.total_app_sessions || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 w-full">
                          <span className="text-gray-600 font-medium text-sm">Member Since</span>
                          <span className="font-semibold text-gray-900 text-sm">
                            {new Date(currentUser.created_at || currentUser.member_since || '2024-01-01').toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="w-full">
                {/* Success Message */}
                {successMessage && (
                  <div className="mb-4 lg:mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl w-full">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <p className="text-emerald-800 font-medium text-sm">{successMessage}</p>
                    </div>
                  </div>
                )}

                {/* Profile Form */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 gap-3 w-full">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">Profile Settings</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => {
                        const tokenInStorage = sessionStorage.getItem('auth_token')
                        if (!isAuthenticated && !tokenInStorage) {
                          setErrors({ submit: 'Please log in to edit your profile.' })
                          return
                        }
                        setIsEditing(true)
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors text-sm"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl font-medium transition-colors text-sm"
                      >
                        <Save className="w-4 h-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-3 lg:p-6 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
                    {/* Email */}
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative w-full">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                            : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                            } ${errors.email ? 'border-red-300' : ''
                            }`}
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Username */}
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Username
                      </label>
                      <div className="relative w-full">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                            : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                            } ${errors.username ? 'border-red-300' : ''
                            }`}
                        />
                      </div>
                      {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                    </div>

                    {/* Full Name */}
                    <div className="lg:col-span-2 w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                          : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                          } ${errors.full_name ? 'border-red-300' : ''
                          }`}
                      />
                      {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative w-full">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                            : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                            } ${errors.phone_number ? 'border-red-300' : ''
                            }`}
                        />
                      </div>
                      {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
                    </div>

                    {/* Purpose */}
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Purpose of Use
                      </label>
                      <select
                        name="purpose_of_use"
                        value={formData.purpose_of_use}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                          : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                          }`}
                      >
                        <option value="personal">Personal</option>
                        <option value="commercial">Commercial</option>
                        <option value="educational">Educational</option>
                        <option value="research">Research</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Other Purpose */}
                    {formData.purpose_of_use === 'other' && (
                      <div className="lg:col-span-2 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Please specify your purpose
                        </label>
                        <input
                          type="text"
                          name="purpose_other"
                          value={formData.purpose_other}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Enter your specific purpose"
                          className={`w-full px-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                            : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                            } ${errors.purpose_other ? 'border-red-300' : ''
                            }`}
                        />
                        {errors.purpose_other && <p className="mt-1 text-sm text-red-600">{errors.purpose_other}</p>}
                      </div>
                    )}

                    {/* City */}
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                          : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                          } ${errors.city ? 'border-red-300' : ''
                          }`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>

                    {/* State */}
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State/Province
                      </label>
                      <input
                        type="text"
                        name="state_province"
                        value={formData.state_province}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                          : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                          } ${errors.state_province ? 'border-red-300' : ''
                          }`}
                      />
                      {errors.state_province && <p className="mt-1 text-sm text-red-600">{errors.state_province}</p>}
                    </div>

                    {/* Country */}
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-3 border rounded-xl transition-colors text-sm ${!isEditing
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                          : 'bg-white hover:border-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 border-gray-300'
                          } ${errors.country ? 'border-red-300' : ''
                          }`}
                      />
                      {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="mt-4 lg:mt-6 p-3 bg-red-50 border border-red-200 rounded-xl w-full">
                      <p className="text-red-800 text-sm">{errors.submit}</p>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div className="w-full">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 gap-3 w-full">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">Purchase History</h3>
                  <div className="text-sm lg:text-base text-gray-600 font-semibold">
                    Total: ${currentPurchases
                      .filter(p => p.status === 'succeeded')
                      .reduce((sum, p) => sum + parseFloat(p.amount || '0'), 0)
                      .toFixed(2)}
                  </div>
                </div>

                <div className="space-y-3 lg:space-y-4 w-full">
                  {currentPurchases
                    .filter(p => p.status === 'succeeded')
                    .map((purchase, index) => (
                      <div key={purchase.id} className="bg-gray-50 rounded-xl p-3 lg:p-4 border border-gray-200 w-full">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
                          <div className="flex items-start gap-3 w-full min-w-0">
                            <div className="p-2 bg-white rounded-xl border border-gray-200 flex-shrink-0">
                              {getProductIcon(purchase.product_type)}
                            </div>
                            <div className="flex-1 min-w-0 w-full">
                              <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base truncate">{purchase.product_name}</h4>
                              <p className="text-gray-600 text-xs lg:text-sm mb-2 leading-relaxed">{purchase.description}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500">
                                <span className="font-medium">Order #{index + 1}</span>
                                <span>
                                  {purchase.payment_date
                                    ? new Date(purchase.payment_date).toLocaleDateString()
                                    : 'N/A'}
                                </span>
                                {getStatusBadge(purchase.status)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                              ${parseFloat(purchase.amount || '0').toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500 font-medium">{purchase.currency}</div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {currentPurchases.filter(p => p.status === 'succeeded').length === 0 && (
                    <div className="text-center py-8 lg:py-12 w-full">
                      <ShoppingBag className="w-8 lg:w-12 h-8 lg:h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm lg:text-base">No completed purchases found.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Achievements Tab
            {activeTab === 'achievements' && (
              <div className="w-full">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Your Achievements</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4 w-full">
                  {currentUser.achievements?.map((achievement: string, index: number) => (
                    <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 lg:p-4 border border-amber-200 w-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-100 rounded-full flex-shrink-0">
                          <Award className="w-4 lg:w-5 h-4 lg:h-5 text-amber-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-gray-900 text-sm lg:text-base truncate">{achievement}</h4>
                          <p className="text-xs text-gray-600">Achievement unlocked</p>
                        </div>
                      </div>
                      <div className="bg-amber-100 rounded-lg p-3">
                        <p className="text-xs lg:text-sm text-amber-800 leading-relaxed">
                          {achievement === 'First Flight' && 'Completed your first drone simulation flight'}
                          {achievement === 'Night Pilot' && 'Successfully completed 10 night flights'}
                          {achievement === 'Precision Master' && 'Achieved 95% landing accuracy'}
                          {achievement === 'Weather Warrior' && 'Flew in all weather conditions'}
                          {achievement === '100 Hours' && 'Accumulated 100+ hours of flight time'}
                          {achievement === 'Welcome Aboard' && 'Welcome to DroneSimulator!'}
                          {!['First Flight', 'Night Pilot', 'Precision Master', 'Weather Warrior', '100 Hours', 'Welcome Aboard'].includes(achievement) &&
                            'A special achievement in your drone simulation journey'}
                        </p>
                      </div>
                    </div>
                  )) || []}

                  {(!currentUser.achievements || currentUser.achievements.length === 0) && (
                    <div className="col-span-full text-center py-8 lg:py-12 w-full">
                      <Award className="w-8 lg:w-12 h-8 lg:h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm lg:text-base">No achievements yet. Keep flying to unlock them!</p>
                    </div>
                  )}
                </div>
              </div>
            )} */}
          </div>
        </div>
      </main>

      {/* Drone Summary Cards */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Drone Flight Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from(
            new Set(groupScenarioSummary(currentUser.all_scenarios?.scenarios || []).map((x) => x.Location))
          ).map((location, idx) => {
            const data = groupScenarioSummary(currentUser.all_scenarios?.scenarios || []).filter(
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
                      <tr
                        key={i}
                        className="border-t hover:bg-orange-50 transition duration-200"
                      >
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
  )
}

export default Profile