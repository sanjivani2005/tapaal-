import React, { useState } from 'react';
import { Search, Eye, Clock, User, MapPin, Filter, Download, RefreshCw } from 'lucide-react';
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

const trackingHistory = [
  {
    id: 'TRK-2401',
    mailId: 'INW-2024-001',
    mailType: 'Inward',
    subject: 'Tax details for Q4 2023',
    sender: 'BigEye Global Solutions',
    currentStatus: 'Closed',
    priority: 'High',
    department: 'Finance',
    assignedTo: 'John Doe',
    createdAt: '2026-01-21 09:00',
    lastUpdated: '2026-01-21 14:30',
    timeline: [
      { status: 'Registered', timestamp: '2026-01-21 09:00', user: 'Clerk', remarks: 'New inward mail registered' },
      { status: 'Assigned', timestamp: '2026-01-21 10:30', user: 'Admin', remarks: 'Assigned to Finance Department' },
      { status: 'In Progress', timestamp: '2026-01-21 12:15', user: 'John Doe', remarks: 'Under review by HOD' },
      { status: 'Closed', timestamp: '2026-01-21 14:30', user: 'John Doe', remarks: 'Successfully processed and archived' }
    ]
  },
  {
    id: 'TRK-2402',
    mailId: 'OUT-2024-001',
    mailType: 'Outward',
    subject: 'Tender Notice Publication',
    sender: 'Procurement Department',
    currentStatus: 'In Progress',
    priority: 'High',
    department: 'Procurement',
    assignedTo: 'Jane Smith',
    createdAt: '2026-01-21 08:30',
    lastUpdated: '2026-01-21 13:45',
    timeline: [
      { status: 'Draft', timestamp: '2026-01-21 08:30', user: 'Jane Smith', remarks: 'Created new outward mail' },
      { status: 'Pending', timestamp: '2026-01-21 09:15', user: 'Jane Smith', remarks: 'Waiting for approval' },
      { status: 'In Progress', timestamp: '2026-01-21 13:45', user: 'Admin', remarks: 'Approved and sent for dispatch' }
    ]
  },
  {
    id: 'TRK-2403',
    mailId: 'INW-2024-002',
    mailType: 'Inward',
    subject: 'Contract papers for new project',
    sender: 'XYZ Enterprises Pvt Ltd',
    currentStatus: 'Assigned',
    priority: 'High',
    department: 'Legal',
    assignedTo: 'Robert Brown',
    createdAt: '2026-01-21 07:45',
    lastUpdated: '2026-01-21 12:15',
    timeline: [
      { status: 'Registered', timestamp: '2026-01-21 07:45', user: 'Clerk', remarks: 'New inward mail received' },
      { status: 'Assigned', timestamp: '2026-01-21 12:15', user: 'Admin', remarks: 'Assigned to Legal Department' }
    ]
  },
  {
    id: 'TRK-2404',
    mailId: 'OUT-2024-002',
    mailType: 'Outward',
    subject: 'Appointment Letter',
    sender: 'HR Department',
    currentStatus: 'Delivered',
    priority: 'Medium',
    department: 'HR',
    assignedTo: 'Sarah Williams',
    createdAt: '2026-01-20 16:00',
    lastUpdated: '2026-01-21 11:00',
    timeline: [
      { status: 'Draft', timestamp: '2026-01-20 16:00', user: 'Sarah Williams', remarks: 'Created appointment letter' },
      { status: 'Pending', timestamp: '2026-01-20 16:30', user: 'Sarah Williams', remarks: 'Waiting for HOD approval' },
      { status: 'In Progress', timestamp: '2026-01-21 09:00', user: 'Admin', remarks: 'Approved for hand delivery' },
      { status: 'Delivered', timestamp: '2026-01-21 11:00', user: 'Sarah Williams', remarks: 'Hand delivered to recipient' }
    ]
  },
];

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

export function Tracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTracking, setSelectedTracking] = useState<typeof trackingHistory[0] | null>(null);

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
        <h1 className="text-2xl font-semibold text-gray-800">Tracking Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Track all mail activities and updates</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by Tracking ID, Mail ID, or Subject..."
              className="pl-10"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Status</option>
            <option value="Registered">Registered</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Types</option>
            <option value="Inward">Inward</option>
            <option value="Outward">Outward</option>
          </select>

          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold whitespace-nowrap">Tracking ID</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Mail ID</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Type</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Subject</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Sender/Receiver</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Department</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Assigned To</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Priority</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Current Status</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Created</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Last Updated</TableHead>
                <TableHead className="font-semibold text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTracking.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-blue-600 whitespace-nowrap">{item.id}</TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{item.mailId}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-sm ${item.mailType === 'Inward' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                      {item.mailType}
                    </span>
                  </TableCell>
                  <TableCell className="truncate whitespace-nowrap" title={item.subject}>{item.subject}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.sender}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm whitespace-nowrap">
                      {item.department}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{item.assignedTo}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge className={getPriorityBadge(item.priority)}>
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge className={getStatusBadge(item.currentStatus)}>
                      {item.currentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">{item.createdAt}</TableCell>
                  <TableCell className="text-sm whitespace-nowrap">{item.lastUpdated}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTracking(item)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Timeline
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredTracking.length} of {trackingHistory.length} entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>

        {/* Timeline Modal */}
        {selectedTracking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Tracking Timeline</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTracking(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tracking ID</p>
                    <p className="font-medium">{selectedTracking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mail ID</p>
                    <p className="font-medium">{selectedTracking.mailId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <span className={`px-2 py-1 rounded-full text-sm ${selectedTracking.mailType === 'Inward' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                      {selectedTracking.mailType}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <Badge className={getPriorityBadge(selectedTracking.priority)}>
                      {selectedTracking.priority}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{selectedTracking.subject}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{selectedTracking.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="font-medium">{selectedTracking.assignedTo}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Status Timeline</h3>
                <div className="space-y-3">
                  {selectedTracking.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${event.status === 'Closed' || event.status === 'Delivered'
                          ? 'bg-green-500'
                          : event.status === 'In Progress'
                            ? 'bg-blue-500'
                            : event.status === 'Assigned'
                              ? 'bg-orange-500'
                              : 'bg-gray-400'
                          }`}></div>
                        {index < selectedTracking.timeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-300 mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStatusBadge(event.status)}>
                            {event.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{event.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600">{event.remarks}</p>
                        <p className="text-xs text-gray-400 mt-1">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
