import { apiService } from './api-service.js';

export class OutwardMailService {
  // Get all outward mails with pagination and filters
  async getOutwardMails(params = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      priority = 'all',
      status = 'all',
      department = 'all'
    } = params;

    return apiService.get('/outward-mails', {
      page,
      limit,
      search,
      priority,
      status,
      department
    });
  }

  // Get single outward mail by ID
  async getOutwardMail(id) {
    return apiService.get(`/outward-mails/${id}`);
  }

  // Create new outward mail with file attachments
  async createOutwardMail(mailData, files = []) {
    const formData = new FormData();

    // Add mail data to FormData
    Object.keys(mailData).forEach(key => {
      formData.append(key, mailData[key]);
    });

    // Add files to FormData
    files.forEach(file => {
      formData.append('attachments', file);
    });

    return apiService.uploadFile('/outward-mails', formData);
  }

  // Update outward mail
  async updateOutwardMail(id, mailData) {
    return apiService.put(`/outward-mails/${id}`, mailData);
  }

  // Delete outward mail
  async deleteOutwardMail(id) {
    return apiService.delete(`/outward-mails/${id}`);
  }

  // Get outward mail statistics
  async getOutwardMailStats() {
    return apiService.get('/outward-mails/stats/summary');
  }

  // Get file download URL
  getFileUrl(filename, type = 'outward') {
    return `http://localhost:5000/uploads/${type}/${filename}`;
  }
}

export const outwardMailService = new OutwardMailService();
