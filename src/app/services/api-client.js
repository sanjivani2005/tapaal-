// Frontend API Service for Dynamic Data
// Replaces static mock data with real API calls

class DynamicApiService {
    constructor() {
        this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
    }

    async fetchWithFallback(url, fallbackData = null) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.success ? data.data : fallbackData;
        } catch (error) {
            console.error('API call failed:', error);
            return fallbackData;
        }
    }

    // Get complete system overview
    async getSystemOverview() {
        return this.fetchWithFallback(`${this.baseURL}/system/overview`, {
            totalInwardMails: 0,
            totalOutwardMails: 0,
            totalUsers: 0,
            totalDepartments: 0,
            totalTrackingEvents: 0,
            activeUsers: 0,
            activeDepartments: 0,
            pendingMails: 0,
            completedMails: 0,
            deliveredMails: 0,
            totalMails: 0
        });
    }

    // Get inward mails with filters
    async getInwardMails(filters = {}) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.department) params.append('department', filters.department);
        if (filters.priority) params.append('priority', filters.priority);

        const url = `${this.baseURL}/mails/inward${params.toString() ? '?' + params.toString() : ''}`;
        return this.fetchWithFallback(url, []);
    }

    // Get outward mails with filters
    async getOutwardMails(filters = {}) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.department) params.append('department', filters.department);
        if (filters.priority) params.append('priority', filters.priority);

        const url = `${this.baseURL}/mails/outward${params.toString() ? '?' + params.toString() : ''}`;
        return this.fetchWithFallback(url, []);
    }

    // Get users with filters
    async getUsers(filters = {}) {
        const params = new URLSearchParams();
        if (filters.role) params.append('role', filters.role);
        if (filters.department) params.append('department', filters.department);
        if (filters.status) params.append('status', filters.status);

        const url = `${this.baseURL}/users${params.toString() ? '?' + params.toString() : ''}`;
        return this.fetchWithFallback(url, []);
    }

    // Get departments with filters
    async getDepartments(filters = {}) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);

        const url = `${this.baseURL}/departments${params.toString() ? '?' + params.toString() : ''}`;
        return this.fetchWithFallback(url, []);
    }

    // Get tracking events with filters
    async getTrackingEvents(filters = {}) {
        const params = new URLSearchParams();
        if (filters.mailType) params.append('mailType', filters.mailType);
        if (filters.status) params.append('status', filters.status);
        if (filters.department) params.append('department', filters.department);

        const url = `${this.baseURL}/tracking${params.toString() ? '?' + params.toString() : ''}`;
        return this.fetchWithFallback(url, []);
    }

    // Get detailed mail information
    async getMailDetails(mailId, mailType) {
        const url = `${this.baseURL}/mails/${mailType}/${mailId}`;
        return this.fetchWithFallback(url, null);
    }

    // Get tracking details
    async getTrackingDetails(trackingId) {
        const url = `${this.baseURL}/tracking/${trackingId}`;
        return this.fetchWithFallback(url, null);
    }

    // Get department-wise statistics
    async getDepartmentStats() {
        return this.fetchWithFallback(`${this.baseURL}/departments/stats`, {});
    }

    // Get user activity summary
    async getUserActivitySummary() {
        return this.fetchWithFallback(`${this.baseURL}/users/activity`, {});
    }

    // Search across all modules
    async searchAll(query) {
        if (!query) return { inwardMails: [], outwardMails: [], users: [], departments: [], tracking: [] };

        const url = `${this.baseURL}/search/${encodeURIComponent(query)}`;
        return this.fetchWithFallback(url, { inwardMails: [], outwardMails: [], users: [], departments: [], tracking: [] });
    }

    // Helper method to check if API is available
    async isApiAvailable() {
        try {
            const response = await fetch(`${this.baseURL}/system/overview`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Method to get data with fallback to static data if API is not available
    async getDataWithFallback(apiMethod, staticFallback, ...args) {
        if (await this.isApiAvailable()) {
            return apiMethod(...args);
        } else {
            console.warn('API not available, using static fallback data');
            return typeof staticFallback === 'function' ? staticFallback() : staticFallback;
        }
    }
}

// Export singleton instance
export const dynamicApiService = new DynamicApiService();
export default dynamicApiService;
