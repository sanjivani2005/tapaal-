import { useState } from 'react'
import { Sidebar } from './layout/Sidebar'
import { Header } from './layout/Header'
import { Dashboard } from './pages/dashboard/Dashboard'
import Analytics from './pages/analytics/Analytics'
import { InwardMails } from './pages/inward-mails/InwardMails'
import { OutwardMails } from './pages/outward-mails/OutwardMails'
import { Users } from './pages/users/Users'
import { Departments } from './pages/departments/Departments'
import { Tracking } from './pages/tracking/Tracking'
<<<<<<< HEAD
=======
import { AIAssistant } from './components/AIAssistant'
>>>>>>> sharyu2

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'analytics':
        return <Analytics />
      case 'inward':
        return <InwardMails />
      case 'outward':
        return <OutwardMails />
      case 'users':
        return <Users />
      case 'departments':
        return <Departments />
      case 'tracking':
        return <Tracking />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
<<<<<<< HEAD
=======
      {/* AI Assistant available on all pages */}
      <AIAssistant
        dashboardData={{
          stats: { totalUsers: 0, totalDepartments: 0, totalMails: 0, totalTrackingEvents: 0 },
          recentMails: [],
          statusData: [],
          monthlyData: []
        }}
      />
>>>>>>> sharyu2
    </div>
  )
}
