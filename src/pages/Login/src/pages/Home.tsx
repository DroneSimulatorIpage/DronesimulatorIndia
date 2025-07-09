import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) {
    navigate('/login')
    return null
  }

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #e5e7eb'
    },
    headerContent: {
      maxWidth: '80rem',
      margin: '0 auto',
      padding: '0 1rem'
    },
    headerInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '4rem'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logoIcon: {
      backgroundColor: '#f97316',
      borderRadius: '0.5rem',
      padding: '0.5rem'
    },
    logoText: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#111827'
    },
    logoSubtext: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    navLink: {
      color: '#6b7280',
      textDecoration: 'none',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      transition: 'all 0.2s',
      cursor: 'pointer'
    },
    navLinkHover: {
      color: '#f97316',
      backgroundColor: '#fff7ed'
    },
    logoutButton: {
      backgroundColor: '#f97316',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    mainContent: {
      maxWidth: '80rem',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      borderRadius: '1rem',
      padding: '3rem 2rem',
      marginBottom: '3rem',
      color: 'white',
      textAlign: 'center' as const
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '1rem'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      marginBottom: '2rem',
      opacity: 0.9
    },
    heroWelcome: {
      fontSize: '1.125rem',
      marginBottom: '2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '1rem',
      borderRadius: '0.5rem',
      display: 'inline-block'
    },
    ctaButton: {
      backgroundColor: 'white',
      color: '#f97316',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.2s',
      border: 'none',
      cursor: 'pointer'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem'
    },
    featureCard: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    featureCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    featureIcon: {
      backgroundColor: '#fff7ed',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '1.5rem',
      display: 'inline-block'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '1rem'
    },
    featureDescription: {
      color: '#6b7280',
      lineHeight: '1.6'
    },
    statsSection: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginBottom: '3rem'
    },
    statsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '2rem',
      textAlign: 'center' as const
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem'
    },
    statItem: {
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#f97316',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: '500'
    },
    quickActions: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    quickActionsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '1.5rem'
    },
    actionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      textDecoration: 'none',
      color: '#374151',
      transition: 'all 0.2s',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left' as const
    },
    actionButtonHover: {
      backgroundColor: '#fff7ed',
      color: '#f97316'
    },
    actionIcon: {
      backgroundColor: '#f97316',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '0.5rem'
    },
    actionText: {
      fontWeight: '500'
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerInner}>
            <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 0 0 1-.37 1-1s-.37-1-1-1c-4.34-1.04-7-4.55-7-9V8.3l7-3.11 7 3.11V17c0 4.45-2.66 7.96-7 9 0 0-1 .37-1 1s1 1 1 1c5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <div>
                <h1 style={styles.logoText}>DroneSimulator</h1>
                <p style={styles.logoSubtext}>Advanced Flight Training</p>
              </div>
            </div>
            <div style={styles.nav}>
              <Link
                to="/profile"
                style={styles.navLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = styles.navLinkHover.color
                  e.currentTarget.style.backgroundColor = styles.navLinkHover.backgroundColor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = styles.navLink.color
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <h1 style={styles.heroTitle}>Welcome to DroneSimulator</h1>
          <p style={styles.heroSubtitle}>Master the skies with our advanced drone simulation platform</p>
          <div style={styles.heroWelcome}>
            👋 Welcome back, <strong>{user.full_name}</strong>!
          </div>
          <button
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Start Flying Now
          </button>
        </div>

        {/* Features Grid */}
        <div style={styles.featuresGrid}>
          <div
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.featureCardHover.transform
              e.currentTarget.style.boxShadow = styles.featureCardHover.boxShadow
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = styles.featureCard.boxShadow
            }}
          >
            <div style={styles.featureIcon}>
              <svg style={{ width: '2rem', height: '2rem', color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Realistic Flight Physics</h3>
            <p style={styles.featureDescription}>
              Experience true-to-life drone physics with advanced aerodynamics simulation, weather effects, and realistic flight dynamics.
            </p>
          </div>

          <div
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.featureCardHover.transform
              e.currentTarget.style.boxShadow = styles.featureCardHover.boxShadow
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = styles.featureCard.boxShadow
            }}
          >
            <div style={styles.featureIcon}>
              <svg style={{ width: '2rem', height: '2rem', color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Multiple Environments</h3>
            <p style={styles.featureDescription}>
              Train in diverse environments from urban cityscapes to rural landscapes, each with unique challenges and scenarios.
            </p>
          </div>

          <div
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.featureCardHover.transform
              e.currentTarget.style.boxShadow = styles.featureCardHover.boxShadow
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = styles.featureCard.boxShadow
            }}
          >
            <div style={styles.featureIcon}>
              <svg style={{ width: '2rem', height: '2rem', color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Certification Training</h3>
            <p style={styles.featureDescription}>
              Prepare for official drone certifications with structured courses and practice exams designed by industry experts.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.statsSection}>
          <h2 style={styles.statsTitle}>Your Flight Statistics</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{user.total_flight_hours}h</div>
              <div style={styles.statLabel}>Total Flight Time</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{user.achievements.length}</div>
              <div style={styles.statLabel}>Achievements Earned</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{user.subscription_status.toUpperCase()}</div>
              <div style={styles.statLabel}>Membership Level</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>
                {new Date().getFullYear() - new Date(user.member_since).getFullYear()}+
              </div>
              <div style={styles.statLabel}>Years with Us</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.quickActions}>
          <h2 style={styles.quickActionsTitle}>Quick Actions</h2>
          <div style={styles.actionGrid}>
            <button
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor
                e.currentTarget.style.color = styles.actionButtonHover.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor
                e.currentTarget.style.color = styles.actionButton.color
              }}
            >
              <div style={styles.actionIcon}>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span style={styles.actionText}>Start New Flight</span>
            </button>

            <Link
              to="/profile"
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor
                e.currentTarget.style.color = styles.actionButtonHover.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor
                e.currentTarget.style.color = styles.actionButton.color
              }}
            >
              <div style={styles.actionIcon}>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span style={styles.actionText}>View Profile</span>
            </Link>

            <button
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor
                e.currentTarget.style.color = styles.actionButtonHover.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor
                e.currentTarget.style.color = styles.actionButton.color
              }}
            >
              <div style={styles.actionIcon}>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span style={styles.actionText}>Training Courses</span>
            </button>

            <button
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor
                e.currentTarget.style.color = styles.actionButtonHover.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor
                e.currentTarget.style.color = styles.actionButton.color
              }}
            >
              <div style={styles.actionIcon}>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span style={styles.actionText}>Flight Analytics</span>
            </button>

            <button
              style={styles.actionButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor
                e.currentTarget.style.color = styles.actionButtonHover.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor
                e.currentTarget.style.color = styles.actionButton.color
              }}
            >
              <div style={styles.actionIcon}>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span style={styles.actionText}>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home