import * as React from 'react';
import { Mail, Send, Users, Clock, ArrowUpRight, ArrowDownRight, Database, Plus } from 'lucide-react';

// UI components
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
<<<<<<< HEAD
import { AIAssistant } from '../../components/AIAssistant';
=======
>>>>>>> sharyu2
import {
  BarChart,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from '../../components/ui/charts';
import { cn } from '../../components/ui/utils';

// Database services
import { fetchDashboardData, addSampleData } from '../../services/mock-api';

// --- DATA DEFINITIONS ---

// Static fallback data - will be replaced with real database data
const fallbackSummaryData = [
  { title: 'Total Inward Mails', value: '0', icon: Mail, color: 'text-blue-600', bgColor: 'bg-blue-50', change: '+0%', isPositive: true },
  { title: 'Total Outward Mails', value: '0', icon: Send, color: 'text-green-600', bgColor: 'bg-green-50', change: '+0%', isPositive: true },
  { title: 'Pending Actions', value: '0', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50', change: '+0%', isPositive: false },
  { title: 'Active Users', value: '0', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50', change: '+0', isPositive: true },
];

const inwardOutwardData = [
  { name: 'Jan', inward: 120, outward: 80 },
  { name: 'Feb', inward: 150, outward: 95 },
  { name: 'Mar', inward: 130, outward: 110 },
  { name: 'Apr', inward: 180, outward: 125 },
  { name: 'May', inward: 165, outward: 140 },
  { name: 'Jun', inward: 195, outward: 155 },
];

const statusData = [
  { name: 'Registered', value: 120, color: '#3b82f6' },
  { name: 'Assigned', value: 85, color: '#f59e0b' },
  { name: 'In Progress', value: 145, color: '#8b5cf6' },
  { name: 'Closed', value: 200, color: '#10b981' },
];

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Registered': 'bg-blue-100 text-blue-700 border-blue-200',
    'Assigned': 'bg-orange-100 text-orange-700 border-orange-200',
    'In Progress': 'bg-purple-100 text-purple-700 border-purple-200',
    'Closed': 'bg-green-100 text-green-700 border-green-200',
  };
  return <Badge className={cn("border shadow-none font-medium", styles[status])}>{status}</Badge>;
};

// --- MAIN DASHBOARD ---

export function Dashboard() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [dbStats, setDbStats] = React.useState({
    totalUsers: 0,
    totalDepartments: 0,
    totalMails: 0,
    totalTrackingEvents: 0,
  });
  const [realData, setRealData] = React.useState(null);

  const handleAddSampleData = async () => {
    setIsLoading(true);
    setMessage('Adding sample data to database...');

    try {
      const result = await addSampleData();
      if (result.success) {
        setMessage(`✅ ${result.message}`);

        // Show verification details
        if (result.verification) {
          console.log('📊 Database Verification:', result.verification);
          const { counts } = result.verification;
          setMessage(`✅ Data saved to database! Users: ${counts.users}, Departments: ${counts.departments}, Mails: ${counts.mails}, Events: ${counts.trackingEvents}`);
        }

        // Refresh stats and real data
        const apiData = await fetchDashboardData();
        if (apiData.success) {
          setDbStats(apiData.data.stats);
          setRealData(apiData.data.realData);
        }
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(''), 8000); // Longer display time for verification
    }
  };

  React.useEffect(() => {
    // Load initial stats and real data
    const loadData = async () => {
      const apiData = await fetchDashboardData();
      if (apiData.success) {
        setDbStats(apiData.data.stats);
        setRealData(apiData.data.realData);
      }
    };
    loadData();
  }, []);

  // Real-time summary data from database
  const realSummaryData = realData ? [
    {
      title: 'Total Inward Mails',
      value: realData.stats.totalInwardMails.toString(),
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Total Outward Mails',
      value: realData.stats.totalOutwardMails.toString(),
      icon: Send,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Pending Actions',
      value: realData.stats.pendingMails.toString(),
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-5%',
      isPositive: false
    },
    {
      title: 'Active Users',
      value: realData.stats.totalUsers.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+3',
      isPositive: true
    },
  ] : fallbackSummaryData;

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Overview</h1>
          <p className="text-gray-500 mt-1 font-medium">Real-time status of Tapaal mail flow.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddSampleData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Database className="w-4 h-4" />
            <Plus className="w-4 h-4" />
            {isLoading ? 'Adding Data...' : 'Add Sample Data'}
          </button>
          <span className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Feed
          </span>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium">
          {message}
        </div>
      )}

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-gray-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{dbStats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">{dbStats.totalDepartments}</p>
              </div>
              <Database className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Mails</p>
                <p className="text-2xl font-bold text-gray-900">{dbStats.totalMails}</p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-200/60">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tracking Events</p>
                <p className="text-2xl font-bold text-gray-900">{dbStats.totalTrackingEvents}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {realSummaryData.map((item) => (
          <Card key={item.title} className="hover:shadow-md transition-all duration-300 border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">{item.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    {item.isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={cn("text-sm font-bold", item.isPositive ? "text-green-600" : "text-red-600")}>
                      {item.change}
                    </span>
                    <span className="text-xs text-gray-400 font-medium ml-1">this month</span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-lg", item.bgColor)}>
                  <item.icon className={cn("w-6 h-6", item.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-gray-200/60">
          <CardHeader>
            <CardTitle>Mail Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={320}>
              <BarChart data={realData ? realData.monthlyData : inwardOutwardData} />
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200/60">
          <CardHeader>
            <CardTitle>Processing Status</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer height={320}>
              <PieChart data={realData ? realData.statusData : statusData} />
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="shadow-sm border-gray-200/60">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-4">
          <CardTitle className="text-lg">Global Activity Feed</CardTitle>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider">
            Full Audit Log
          </button>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="divide-y divide-gray-100">
            {realData && realData.recentMails ? realData.recentMails.map((mail, i) => (
              <div key={mail.id} className="py-4 flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:text-white transition-all duration-300 ${mail.type === 'INWARD'
                    ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600'
                    : 'bg-green-50 text-green-600 group-hover:bg-green-600'
                    }`}>
                    {mail.type === 'INWARD' ? <Mail className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{mail.subject}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {mail.type === 'INWARD' ? `From: ${mail.senderName}` : `To: ${mail.senderName}`} • {mail.department} • Priority: {mail.priority}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${mail.type === 'INWARD'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                    }`}>
                    {mail.type}
                  </span>
                  <StatusBadge status={mail.status} />
                </div>
              </div>
            )) : [1, 2, 3].map((i) => (
              <div key={i} className="py-4 flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Inward Mail TAP-442{i} Registered</p>
                    <p className="text-xs text-gray-500 font-medium">Assigned to Department of Revenue • 1{i}m ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={i === 3 ? "In Progress" : "Registered"} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
<<<<<<< HEAD

      {/* AI Assistant */}
      <AIAssistant
        dashboardData={{
          stats: realData?.stats || dbStats,
          recentMails: realData?.recentMails || [],
          statusData: realData?.statusData || [],
          monthlyData: realData?.monthlyData || []
        }}
      />
=======
>>>>>>> sharyu2
    </div>
  );
}