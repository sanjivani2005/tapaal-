import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Eye, Clock, User, MapPin, Filter, Download, RefreshCw, X } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { inwardMailService } from '../../../services/inward-mail-service.js';
import { outwardMailService } from '../../../services/outward-mail-service.js';

// Type assertions for the imported services
const inwardService = inwardMailService as any;
const outwardService = outwardMailService as any;

interface TrackingHistory {
  id: string;
  mailId: string;
  mailType: string;
  subject: string;
  sender: string;
  currentStatus: string;
  priority: string;
  department: string;
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    user: string;
    remarks: string;
  }>;
}

export function Tracking() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTracking, setSelectedTracking] = useState<TrackingHistory | null>(null);
  const [trackingHistory, setTrackingHistory] = useState<TrackingHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'Registered': 'bg-blue-100 text-blue-700',
      'Assigned': 'bg-orange-100 text-orange-700',
      'In Progress': 'bg-purple-100 text-purple-700',
      'Closed': 'bg-green-100 text-green-700',
      'Delivered': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Draft': 'bg-gray-100 text-gray-700',
    };
    return variants[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'Low': 'bg-green-100 text-green-700',
    };
    return variants[priority] || 'bg-gray-100 text-gray-700';
  };

  const fetchTrackingData = async () => {
    try {
      setLoading(true);
      
      // Fetch both inward and outward mails
      const [inwardResponse, outwardResponse] = await Promise.all([
        inwardService.getInwardMails(),
        outwardService.getOutwardMails()
      ]);

      if (inwardResponse.success && outwardResponse.success) {
        const inwardMails = inwardResponse.data || [];
        const outwardMails = outwardResponse.data || [];
        
        // Combine and format tracking data
        const allMails = [...inwardMails, ...outwardMails];
        const trackingData: TrackingHistory[] = allMails.map((mail, index) => ({
          id: `TRK-${index + 1}`,
          mailId: mail.id || mail._id,
          mailType: mail.type || 'INWARD',
          subject: mail.details || mail.subject,
          sender: mail.type === 'INWARD' ? mail.sender : mail.senderName || mail.receiver,
          currentStatus: mail.status,
          priority: mail.priority || 'Normal',
          department: mail.department,
          assignedTo: mail.type === 'INWARD' ? 'Department Head' : 'Recipient',
          createdAt: mail.createdAt || new Date().toISOString(),
          lastUpdated: mail.updatedAt || new Date().toISOString(),
          timeline: [
            {
              status: mail.status,
              timestamp: new Date().toISOString(),
              user: 'System',
              remarks: `${mail.type || 'INWARD'} mail processed`
            }
          ]
        }));
        
        setTrackingHistory(trackingData);
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const filteredTracking = trackingHistory.filter((item) =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((item) =>
    statusFilter === 'all' || item.currentStatus === statusFilter
  ).filter((item) =>
    typeFilter === 'all' || item.mailType === typeFilter
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Mail Tracking</h1>
        <p className="text-gray-600 mt-1">Track all inward and outward mails</p>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by tracking ID, mail ID, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="min-w-[150px]">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="INWARD">Inward</option>
                <option value="OUTWARD">Outward</option>
              </select>
            </div>
            <Button
              onClick={fetchTrackingData}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Tracking Table */}
      <Card>
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Loading tracking data...</span>
            </div>
          ) : filteredTracking.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No tracking records found matching your filters.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Mail ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTracking.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.mailId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {item.mailType}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                    <TableCell>{item.sender}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(item.currentStatus)}>
                        {item.currentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadge(item.priority)}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTracking(item)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>

      {/* Tracking Detail Modal */}
      {selectedTracking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tracking Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTracking(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tracking ID</p>
                  <p className="font-medium">{selectedTracking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mail ID</p>
                  <p className="font-medium">{selectedTracking.mailId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <Badge variant="outline">{selectedTracking.mailType}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className={getStatusBadge(selectedTracking.currentStatus)}>
                    {selectedTracking.currentStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <Badge className={getPriorityBadge(selectedTracking.priority)}>
                    {selectedTracking.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{selectedTracking.department}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Subject</p>
                <p className="font-medium">{selectedTracking.subject}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Sender</p>
                <p className="font-medium">{selectedTracking.sender}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Assigned To</p>
                <p className="font-medium">{selectedTracking.assignedTo}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Timeline</h3>
                <div className="space-y-2">
                  {selectedTracking.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                      <Clock className="w-4 h-4 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-600">{event.remarks}</p>
                        <p className="text-xs text-gray-500">{event.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
