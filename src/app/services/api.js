// API service for dashboard data
const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchDashboardData() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Return mock data if API is not available
        return {
            success: false,
            data: {
                stats: {
                    totalUsers: 0,
                    totalDepartments: 0,
                    totalMails: 0,
                    totalTrackingEvents: 0,
                },
                realData: null
            }
        };
    }
}

export async function addSampleData() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'addSampleData'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding sample data:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
