import React from 'react'

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-orange-500 rounded-lg p-3">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 0 0 1-.37 1-1s-.37-1-1-1c-4.34-1.04-7-4.55-7-9V8.3l7-3.11 7 3.11V17c0 4.45-2.66 7.96-7 9 0 0-1 .37-1 1s1 1 1 1c5.16-1.26 9-5.45 9-11V7l-10-5z"/>
        </svg>
      </div>
      <div className="ml-3">
        <h1 className="text-2xl font-bold text-gray-900">DroneSimulator</h1>
        <p className="text-sm text-gray-500">Advanced Flight Training</p>
      </div>
    </div>
  )
}

export default Logo