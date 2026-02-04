import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
    TrendingUp,
    TrendingDown,
    Mail,
    Clock,
    Users,
    Activity,
    BarChart3,
    ArrowRight
} from 'lucide-react';

// Import refactored UI components
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    BarChart,
    PieChart,
    ResponsiveContainer,
    LineChart
} from '../../components/ui/charts';
import { cn } from '../../components/ui/utils';

export default function Analytics() {
    const { t } = useTranslation();

    // --- Data Constants ---
    const performanceMetrics = [
        { title: t('analytics.totalMailsProcessed'), value: '2,847', change: '+12.5%', isPositive: true, icon: Mail, color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { title: t('analytics.avgProcessingTime'), value: '2.3 days', change: '-18%', isPositive: true, icon: Clock, color: 'text-green-600', bgColor: 'bg-green-50' },
        { title: t('analytics.systemEfficiency'), value: '87%', change: '+5.2%', isPositive: true, icon: Activity, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        { title: t('analytics.activeStaff'), value: '156', change: '+8', isPositive: true, icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    ];

    const monthlyTrends = [
        { name: 'Jan', inward: 145, outward: 98 },
        { name: 'Feb', inward: 167, outward: 112 },
        { name: 'Mar', inward: 189, outward: 125 },
        { name: 'Apr', inward: 201, outward: 134 },
        { name: 'May', inward: 223, outward: 156 },
        { name: 'Jun', inward: 245, outward: 167 },
    ];

    const departmentPerformance = [
        { name: 'Admin', value: 92, color: '#3b82f6', mails: 456 },
        { name: 'Finance', value: 88, color: '#10b981', mails: 389 },
        { name: 'HR', value: 85, color: '#f59e0b', mails: 234 },
        { name: 'Ops', value: 90, color: '#ef4444', mails: 567 },
        { name: 'Legal', value: 78, color: '#8b5cf6', mails: 123 },
    ];

    const lineData = [
        { name: 'Jan', value: 2.5 },
        { name: 'Feb', value: 2.1 },
        { name: 'Mar', value: 2.3 },
        { name: 'Apr', value: 1.9 },
        { name: 'May', value: 1.8 },
        { name: 'Jun', value: 2.2 },
    ];

    return (
        <div className="p-8 space-y-8 bg-gray-50/30 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('analytics.title')}</h1>
                    <p className="text-gray-500 font-medium">{t('analytics.subtitle')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="bg-white">
                        {t('analytics.exportReport')}
                    </Button>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1">
                        {t('analytics.liveAnalytics')}
                    </Badge>
                </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric) => (
                    <Card key={metric.title} className="shadow-sm border-gray-200/60">
                        <CardContent className="p-4 pt-8">
                            <div className="flex items-center justify-between">
                                <div className="mt-4">
                                    <p className="text-base font-medium text-gray-600">{metric.title}</p>
                                    <p className="text-base font-bold text-gray-900">{metric.value}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        {metric.isPositive ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                                        <span className={cn("text-sm font-bold", metric.isPositive ? "text-green-600" : "text-red-600")}>
                                            {metric.change}
                                        </span>
                                    </div>
                                </div>
                                <metric.icon className={cn("w-8 h-8", metric.color)} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            {t('analytics.monthlyMailDistribution')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer height={300}>
                            <BarChart data={monthlyTrends} />
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-600" />
                            {t('analytics.departmentLoadEfficiency')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ResponsiveContainer height={300}>
                            <PieChart data={departmentPerformance} />
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Efficiency Table & Trend Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('analytics.departmentPerformanceBreakdown')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {departmentPerformance.map((dept) => (
                                <div key={dept.name} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 rounded-full" style={{ backgroundColor: dept.color }} />
                                            <div>
                                                <p className="font-bold text-gray-900">{dept.name} {t('analytics.department')}</p>
                                                <p className="text-xs text-gray-500">{dept.mails} {t('analytics.itemsHandled')}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-gray-900">{dept.value}%</span>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">{t('analytics.efficiency')}</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${dept.value}%`, backgroundColor: dept.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-green-600" />
                            {t('analytics.processingLatency')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer height={200}>
                            <LineChart data={lineData} />
                        </ResponsiveContainer>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500 leading-relaxed italic">
                                "{t('analytics.latencyReport')}"
                            </p>
                            <Button variant="link" className="px-0 mt-2 text-blue-600">
                                {t('analytics.viewFullLatencyReport')} <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}