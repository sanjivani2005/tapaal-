import { apiService } from './api-service';

export class InwardMailService {
  // Get all inward mails with pagination and filters
  async getInwardMails(params = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      priority = 'all',
      status = 'all',
      department = 'all'
    } = params;

    return apiService.get('/inward-mails', {
      page,
      limit,
      search,
      priority,
      status,
      department
    });
  }

  // Get single inward mail by ID
  async getInwardMail(id) {
    return apiService.get(`/inward-mails/${id}`);
  }

  // Create new inward mail with file attachments
  async createInwardMail(mailData, files = []) {
    const formData = new FormData();
    
    // Add mail data to FormData
    Object.keys(mailData).forEach(key => {
      formData.append(key, mailData[key]);
    });

    // Add files to FormData
    files.forEach(file => {
      formData.append('attachments', file);
    });

    return apiService.uploadFile('/inward-mails', formData);
  }

  // Update inward mail
  async updateInwardMail(id, mailData) {
    return apiService.put(`/inward-mails/${id}`, mailData);
  }

  // Delete inward mail
  async deleteInwardMail(id) {
    return apiService.delete(`/inward-mails/${id}`);
  }

  // Get inward mail statistics
  async getInwardMailStats() {
    return apiService.get('/inward-mails/stats/summary');
  }

  // Get file download URL
  getFileUrl(filename, type = 'inward') {
    return `http://localhost:5000/uploads/${type}/${filename}`;
  }
}

export const inwardMailService = new InwardMailService();
