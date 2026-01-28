// Data Service for API calls
const API_BASE_URL = 'http://localhost:3001/api';

class DataService {
    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Mails API
    async getMails(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/mails${queryString ? `?${queryString}` : ''}`;
        return this.request(endpoint);
    }

    async createMail(mailData) {
        return this.request('/mails', {
            method: 'POST',
            body: JSON.stringify(mailData),
        });
    }

    async getMailById(id, type) {
        return this.request(`/mails/${id}?type=${type}`);
    }

    async updateMail(id, type, updateData) {
        return this.request(`/mails/${id}?type=${type}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
    }

    async deleteMail(id, type) {
        return this.request(`/mails/${id}?type=${type}`, {
            method: 'DELETE',
        });
    }

    // Departments API
    async getDepartments() {
        return this.request('/departments');
    }

    async createDepartment(departmentData) {
        return this.request('/departments', {
            method: 'POST',
            body: JSON.stringify(departmentData),
        });
    }

    async getDepartmentById(id) {
        return this.request(`/departments/${id}`);
    }

    async updateDepartment(id, updateData) {
        return this.request(`/departments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
    }

    async deleteDepartment(id) {
        return this.request(`/departments/${id}`, {
            method: 'DELETE',
        });
    }

    // Dashboard API
    async getDashboardData() {
        return this.request('/dashboard');
    }

    // Health check
    async healthCheck() {
        return this.request('/health');
    }
}

export const dataService = new DataService();
