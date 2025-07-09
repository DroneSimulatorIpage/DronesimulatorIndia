import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import Navigation from '@/components/Navigation'
// Country data with codes and phone prefixes
const countries = [
  { code: 'US', name: 'United States', phone: '+1' },
  { code: 'CA', name: 'Canada', phone: '+1' },
  { code: 'GB', name: 'United Kingdom', phone: '+44' },
  { code: 'AU', name: 'Australia', phone: '+61' },
  { code: 'DE', name: 'Germany', phone: '+49' },
  { code: 'FR', name: 'France', phone: '+33' },
  { code: 'IT', name: 'Italy', phone: '+39' },
  { code: 'ES', name: 'Spain', phone: '+34' },
  { code: 'NL', name: 'Netherlands', phone: '+31' },
  { code: 'BE', name: 'Belgium', phone: '+32' },
  { code: 'CH', name: 'Switzerland', phone: '+41' },
  { code: 'AT', name: 'Austria', phone: '+43' },
  { code: 'SE', name: 'Sweden', phone: '+46' },
  { code: 'NO', name: 'Norway', phone: '+47' },
  { code: 'DK', name: 'Denmark', phone: '+45' },
  { code: 'FI', name: 'Finland', phone: '+358' },
  { code: 'IE', name: 'Ireland', phone: '+353' },
  { code: 'PT', name: 'Portugal', phone: '+351' },
  { code: 'GR', name: 'Greece', phone: '+30' },
  { code: 'PL', name: 'Poland', phone: '+48' },
  { code: 'CZ', name: 'Czech Republic', phone: '+420' },
  { code: 'HU', name: 'Hungary', phone: '+36' },
  { code: 'SK', name: 'Slovakia', phone: '+421' },
  { code: 'SI', name: 'Slovenia', phone: '+386' },
  { code: 'HR', name: 'Croatia', phone: '+385' },
  { code: 'BG', name: 'Bulgaria', phone: '+359' },
  { code: 'RO', name: 'Romania', phone: '+40' },
  { code: 'LT', name: 'Lithuania', phone: '+370' },
  { code: 'LV', name: 'Latvia', phone: '+371' },
  { code: 'EE', name: 'Estonia', phone: '+372' },
  { code: 'MT', name: 'Malta', phone: '+356' },
  { code: 'CY', name: 'Cyprus', phone: '+357' },
  { code: 'LU', name: 'Luxembourg', phone: '+352' },
  { code: 'IS', name: 'Iceland', phone: '+354' },
  { code: 'JP', name: 'Japan', phone: '+81' },
  { code: 'KR', name: 'South Korea', phone: '+82' },
  { code: 'CN', name: 'China', phone: '+86' },
  { code: 'IN', name: 'India', phone: '+91' },
  { code: 'SG', name: 'Singapore', phone: '+65' },
  { code: 'HK', name: 'Hong Kong', phone: '+852' },
  { code: 'TW', name: 'Taiwan', phone: '+886' },
  { code: 'MY', name: 'Malaysia', phone: '+60' },
  { code: 'TH', name: 'Thailand', phone: '+66' },
  { code: 'PH', name: 'Philippines', phone: '+63' },
  { code: 'ID', name: 'Indonesia', phone: '+62' },
  { code: 'VN', name: 'Vietnam', phone: '+84' },
  { code: 'BD', name: 'Bangladesh', phone: '+880' },
  { code: 'PK', name: 'Pakistan', phone: '+92' },
  { code: 'LK', name: 'Sri Lanka', phone: '+94' },
  { code: 'NP', name: 'Nepal', phone: '+977' },
  { code: 'BT', name: 'Bhutan', phone: '+975' },
  { code: 'MV', name: 'Maldives', phone: '+960' },
  { code: 'AE', name: 'United Arab Emirates', phone: '+971' },
  { code: 'SA', name: 'Saudi Arabia', phone: '+966' },
  { code: 'QA', name: 'Qatar', phone: '+974' },
  { code: 'KW', name: 'Kuwait', phone: '+965' },
  { code: 'BH', name: 'Bahrain', phone: '+973' },
  { code: 'OM', name: 'Oman', phone: '+968' },
  { code: 'JO', name: 'Jordan', phone: '+962' },
  { code: 'LB', name: 'Lebanon', phone: '+961' },
  { code: 'IL', name: 'Israel', phone: '+972' },
  { code: 'TR', name: 'Turkey', phone: '+90' },
  { code: 'EG', name: 'Egypt', phone: '+20' },
  { code: 'ZA', name: 'South Africa', phone: '+27' },
  { code: 'NG', name: 'Nigeria', phone: '+234' },
  { code: 'KE', name: 'Kenya', phone: '+254' },
  { code: 'GH', name: 'Ghana', phone: '+233' },
  { code: 'UG', name: 'Uganda', phone: '+256' },
  { code: 'TZ', name: 'Tanzania', phone: '+255' },
  { code: 'ET', name: 'Ethiopia', phone: '+251' },
  { code: 'MA', name: 'Morocco', phone: '+212' },
  { code: 'DZ', name: 'Algeria', phone: '+213' },
  { code: 'TN', name: 'Tunisia', phone: '+216' },
  { code: 'LY', name: 'Libya', phone: '+218' },
  { code: 'SD', name: 'Sudan', phone: '+249' },
  { code: 'BR', name: 'Brazil', phone: '+55' },
  { code: 'AR', name: 'Argentina', phone: '+54' },
  { code: 'CL', name: 'Chile', phone: '+56' },
  { code: 'CO', name: 'Colombia', phone: '+57' },
  { code: 'PE', name: 'Peru', phone: '+51' },
  { code: 'VE', name: 'Venezuela', phone: '+58' },
  { code: 'EC', name: 'Ecuador', phone: '+593' },
  { code: 'UY', name: 'Uruguay', phone: '+598' },
  { code: 'PY', name: 'Paraguay', phone: '+595' },
  { code: 'BO', name: 'Bolivia', phone: '+591' },
  { code: 'GY', name: 'Guyana', phone: '+592' },
  { code: 'SR', name: 'Suriname', phone: '+597' },
  { code: 'GF', name: 'French Guiana', phone: '+594' },
  { code: 'MX', name: 'Mexico', phone: '+52' },
  { code: 'GT', name: 'Guatemala', phone: '+502' },
  { code: 'BZ', name: 'Belize', phone: '+501' },
  { code: 'SV', name: 'El Salvador', phone: '+503' },
  { code: 'HN', name: 'Honduras', phone: '+504' },
  { code: 'NI', name: 'Nicaragua', phone: '+505' },
  { code: 'CR', name: 'Costa Rica', phone: '+506' },
  { code: 'PA', name: 'Panama', phone: '+507' },
  { code: 'CU', name: 'Cuba', phone: '+53' },
  { code: 'JM', name: 'Jamaica', phone: '+1876' },
  { code: 'HT', name: 'Haiti', phone: '+509' },
  { code: 'DO', name: 'Dominican Republic', phone: '+1809' },
  { code: 'PR', name: 'Puerto Rico', phone: '+1787' },
  { code: 'TT', name: 'Trinidad and Tobago', phone: '+1868' },
  { code: 'BB', name: 'Barbados', phone: '+1246' },
  { code: 'RU', name: 'Russia', phone: '+7' },
  { code: 'UA', name: 'Ukraine', phone: '+380' },
  { code: 'BY', name: 'Belarus', phone: '+375' },
  { code: 'MD', name: 'Moldova', phone: '+373' },
  { code: 'GE', name: 'Georgia', phone: '+995' },
  { code: 'AM', name: 'Armenia', phone: '+374' },
  { code: 'AZ', name: 'Azerbaijan', phone: '+994' },
  { code: 'KZ', name: 'Kazakhstan', phone: '+7' },
  { code: 'KG', name: 'Kyrgyzstan', phone: '+996' },
  { code: 'TJ', name: 'Tajikistan', phone: '+992' },
  { code: 'TM', name: 'Turkmenistan', phone: '+993' },
  { code: 'UZ', name: 'Uzbekistan', phone: '+998' },
  { code: 'MN', name: 'Mongolia', phone: '+976' },
  { code: 'NZ', name: 'New Zealand', phone: '+64' },
  { code: 'FJ', name: 'Fiji', phone: '+679' },
  { code: 'PG', name: 'Papua New Guinea', phone: '+675' },
  { code: 'NC', name: 'New Caledonia', phone: '+687' },
  { code: 'VU', name: 'Vanuatu', phone: '+678' },
  { code: 'SB', name: 'Solomon Islands', phone: '+677' },
  { code: 'TO', name: 'Tonga', phone: '+676' },
  { code: 'WS', name: 'Samoa', phone: '+685' },
  { code: 'KI', name: 'Kiribati', phone: '+686' },
  { code: 'TV', name: 'Tuvalu', phone: '+688' },
  { code: 'NR', name: 'Nauru', phone: '+674' },
  { code: 'PW', name: 'Palau', phone: '+680' },
  { code: 'FM', name: 'Micronesia', phone: '+691' },
  { code: 'MH', name: 'Marshall Islands', phone: '+692' }
].sort((a, b) => a.name.localeCompare(b.name))

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    full_name: '',
    phone_number: '',
    country_code: 'IN',
    phone_code: '+91',
    city: '',
    state_province: '',
    country: 'India',
    purpose_of_use: 'personal',
    purpose_other: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Handle country selection
    if (name === 'country_code') {
      const selectedCountry = countries.find(c => c.code === value)
      if (selectedCountry) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          country: selectedCountry.name,
          phone_code: selectedCountry.phone
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }



    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    if (!formData.password_confirm) {
      newErrors.password_confirm = 'Please confirm your password'
    } else if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = 'Passwords do not match'
    }

    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required'
    }

    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required'
    } else if (!/^\d{7,15}$/.test(formData.phone_number.replace(/\D/g, ''))) {
      newErrors.phone_number = 'Please enter a valid phone number (7-15 digits)'
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
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const requestBody = {
      email: formData.email,
      password: formData.password,
      password_confirm: formData.password_confirm,
      full_name: formData.full_name,
      phone_number: formData.phone_number,
      city: formData.city,
      state_province: formData.state_province,
      country: formData.country,
      purpose_of_use: formData.purpose_of_use === 'other' ? formData.purpose_other : formData.purpose_of_use
    };

    const response = await fetch('https://34-47-194-149.nip.io/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log("🔴 Full registration response:", data); // For debugging

    if (response.ok) {
      setShowVerificationPopup(true);
    } else {
      // ✅ Extract field-level errors like: "email already exists"
      if (data?.errors && typeof data.errors === 'object') {
        const newErrors: { [key: string]: string } = {};
        Object.entries(data.errors).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            newErrors[key] = value[0]; // Use the first error message
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ submit: data?.message || 'Registration failed. Please try again.' });
      }
    }

  } catch (error) {
    console.error("Registration error:", error);
    setErrors({ submit: 'An unexpected error occurred. Please try again.' });
  } finally {
    setIsLoading(false);
  }
};








  return (
    <>
      <Navigation />
      {showVerificationPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Email Verification Sent</h3>
            <p className="text-gray-700">
              Your email is not verified. A new verification link has been sent to your email address.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                setShowVerificationPopup(false);
                navigate('/'); // Redirect after clicking OK
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div
        className="pt-24 min-h-screen w-full bg-cover bg-center bg-no-repeat flex justify-end items-center px-2 md:px-12"
        style={{ backgroundImage: "url('/images/l1.png')" }}
      >
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl px-6 py-8 text-sm">

          <img
            src="/images/logonew.png"
            alt="Drone Simulator Logo"
            className="w-40 mx-auto mb-3"
          />


          <div className="text-center mb-3">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Create Account</h2>
          </div>

          {/* Form - Ultra Compact */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: Email & Username */}
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-1.5 py-1 border rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="email@domain.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full px-1.5 py-1 border rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your name"
                />
                {errors.full_name && <p className="text-red-500 text-xs mt-0.5">{errors.full_name}</p>}
              </div>
            </div>



            {/* Row 2: Password & Confirm */}
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-1.5 py-1 border rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Confirm</label>
                <input
                  type="password"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className={`w-full px-1.5 py-1 border rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.password_confirm ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                />
                {errors.password_confirm && <p className="text-red-500 text-xs mt-0.5">{errors.password_confirm}</p>}
              </div>
            </div>

            {/* Row 3: Full Name & Country */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Country Field */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Country</label>
                <select
                  name="country_code"
                  value={formData.country_code}
                  onChange={handleChange}
                  className="w-full px-1.5 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5 whitespace-nowrap">Phone Number</label>
                <div className="flex">
                  <div className="flex items-center px-1.5 py-1 bg-gray-50 border border-r-0 border-gray-300 rounded-l text-xs font-medium text-gray-700 min-w-[40px] justify-center">
                    {formData.phone_code}
                  </div>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                     className={`w-32 px-1.5 py-1 border rounded-r text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Phone number"
                  />
                </div>
                {errors.phone_number && <p className="text-red-500 text-xs mt-0.5">{errors.phone_number}</p>}
              </div>
            </div>


            {/* Row 4: Phone Number - Compact */}


            {/* Row 5: City, State & Purpose in 3 columns */}
            <div className="grid grid-cols-3 gap-1.5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-1.5 py-1 border rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City"
                />
                {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">State</label>
                <input
                  type="text"
                  name="state_province"
                  value={formData.state_province}
                  onChange={handleChange}
                  className={`w-full px-1.5 py-1 border rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.state_province ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="State"
                />
                {errors.state_province && <p className="text-red-500 text-xs mt-0.5">{errors.state_province}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Purpose</label>
                <select
                  name="purpose_of_use"
                  value={formData.purpose_of_use}
                  onChange={handleChange}
                  className="w-full px-1.5 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="personal">Personal</option>
                  <option value="commercial">Commercial</option>
                  <option value="educational">Educational</option>
                  <option value="research">Research</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {formData.purpose_of_use === 'other' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Specify Purpose</label>
                <input
                  type="text"
                  name="purpose_other"
                  value={formData.purpose_other}
                  onChange={handleChange}
                  className={`w-full px-1.5 py-1 border rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-transparent ${errors.purpose_other ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your specific purpose"
                />
                {errors.purpose_other && <p className="text-red-500 text-xs mt-0.5">{errors.purpose_other}</p>}
              </div>
            )}

            {errors.submit && <p className="text-red-500 text-xs text-center">{errors.submit}</p>}

            {/* Submit Button - Compact */}
            <button
  type="submit"
  disabled={isLoading}
  className="w-40 mx-auto block bg-orange-500 hover:bg-orange-600 text-white font-medium py-[6px] px-3 rounded text-[11px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
>
  {isLoading ? (
    <div className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Creating...
    </div>
  ) : (
    'Create Account'
  )}
</button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register