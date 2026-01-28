import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running' });
});

// Get dashboard data (mock data)
app.get('/api/dashboard', (req, res) => {
    try {
        // Mock data for testing
        const stats = {
            totalUsers: 4,
            totalDepartments: 5,
            totalMails: 12,
            totalTrackingEvents: 8,
            pendingMails: 3,
            assignedMails: 5,
            registeredMails: 4,
        };

        // Status distribution
        const statusData = [
            { name: 'Registered', value: stats.registeredMails, color: '#3b82f6' },
            { name: 'Assigned', value: stats.assignedMails, color: '#f59e0b' },
            { name: 'Pending', value: stats.pendingMails, color: '#ef4444' },
        ];

        // Monthly data
        const monthlyData = [
            { name: 'Jan', inward: 120, outward: 50 },
            { name: 'Feb', inward: 140, outward: 70 },
            { name: 'Mar', inward: 110, outward: 80 },
            { name: 'Apr', inward: 160, outward: 90 },
            { name: 'May', inward: 130, outward: 100 },
            { name: 'Jun', inward: stats.totalMails, outward: 110 },
        ];

        const recentMails = [
            {
                id: 'mail_01',
                subject: 'Tender Notice: Road Construction',
                senderName: 'SDR Construction',
                status: 'PENDING',
                department: 'Revenue',
                priority: 'IMPORTANT'
            },
            {
                id: 'mail_02',
                subject: 'Water Leakage Complaint',
                senderName: 'Residents of Nagpur',
                status: 'ASSIGNED',
                department: 'General Administration',
                priority: 'HIGH'
            }
        ];

        const realData = {
            stats,
            statusData,
            monthlyData,
            recentMails
        };

        res.json({
            success: true,
            data: {
                stats: {
                    totalUsers: stats.totalUsers,
                    totalDepartments: stats.totalDepartments,
                    totalMails: stats.totalMails,
                    totalTrackingEvents: stats.totalTrackingEvents,
                },
                realData
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Add sample data endpoint
app.post('/api/dashboard', (req, res) => {
    try {
        const { action } = req.body;

        if (action === 'addSampleData') {
            res.json({
                success: true,
                message: 'Sample data would be saved to database (mock mode)',
                verification: {
                    counts: {
                        users: 4,
                        departments: 5,
                        mails: 12,
                        trackingEvents: 8
                    }
                },
                data: {
                    stats: {
                        totalUsers: 4,
                        totalDepartments: 5,
                        totalMails: 12,
                        totalTrackingEvents: 8,
                    }
                }
            });
        } else {
            res.status(400).json({ success: false, error: 'Invalid action' });
        }
    } catch (error) {
        console.error('Error adding sample data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
