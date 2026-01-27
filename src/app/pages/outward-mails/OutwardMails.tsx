import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Pencil, Trash2, Download, Clock, AlertCircle, Send } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const outwardMails = [
  {
    id: 'OUT-2024-001',
    trackingId: 'TRK-1245',
    subject: 'Tender Notice Publication',
    receiver: 'All Vendors',
    department: 'Procurement',
    sentBy: 'John Doe',
    date: '2024-01-15 14:30:00',
    deliveryMode: 'Courier',
    status: 'delivered',
    priority: 'Important',
    dueDate: '2024-01-20',
    attachments: 3,
    cost: 250.00,
    createdAt: '2024-01-15 10:00:00',
    updatedAt: '2024-01-15 16:45:00'
  },
  {
    id: 'OUT-2024-002',
    trackingId: 'TRK-1246',
    subject: 'Appointment Letter',
    receiver: 'New Employee - Sarah Williams',
    department: 'HR',
    sentBy: 'Jane Smith',
    date: '2024-01-16 09:15:00',
    deliveryMode: 'Hand Delivery',
    status: 'pending',
    priority: 'High',
    dueDate: '2024-01-18',
    attachments: 2,
    cost: 0.00,
    createdAt: '2024-01-16 08:30:00',
    updatedAt: '2024-01-16 09:15:00'
  },
  {
    id: 'OUT-2024-003',
    trackingId: 'TRK-1247',
    subject: 'Payment Confirmation',
    receiver: 'ABC Corporation Ltd',
    department: 'Finance',
    sentBy: 'Mike Johnson',
    date: '2024-01-17 11:20:00',
    deliveryMode: 'Post',
    status: 'in-transit',
    priority: 'Important',
    dueDate: '2024-01-22',
    attachments: 4,
    cost: 150.00,
    createdAt: '2024-01-17 10:00:00',
    updatedAt: '2024-01-17 11:20:00'
  },
  {
    id: 'OUT-2024-004',
    trackingId: 'TRK-1248',
    subject: 'Meeting Invitation',
    receiver: 'Department Heads',
    department: 'Administration',
    sentBy: 'Emily Davis',
    date: '2024-01-18 15:45:00',
    deliveryMode: 'Email',
    status: 'delivered',
    priority: 'Medium',
    dueDate: '2024-01-19',
    attachments: 1,
    cost: 0.00,
    createdAt: '2024-01-18 14:00:00',
    updatedAt: '2024-01-18 16:00:00'
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    'delivered': 'bg-green-100 text-green-700',
    'pending': 'bg-orange-100 text-orange-700',
    'in-transit': 'bg-blue-100 text-blue-700',
    'failed': 'bg-red-100 text-red-700',
    'draft': 'bg-gray-100 text-gray-700',
  };
  return variants[status] || 'bg-gray-100 text-gray-700';
};

const getPriorityBadge = (priority: string) => {
  const variants: Record<string, string> = {
    'Important': 'bg-red-600 text-white',
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'Low': 'bg-green-100 text-green-700',
  };
  return variants[priority] || 'bg-gray-100 text-gray-700';
};

export function OutwardMails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredMails = outwardMails.filter((mail) => {
    const matchesSearch = mail.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || mail.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || mail.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || mail.priority === priorityFilter;
    return matchesSearch && matchesDepartment && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Outward Mails</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all outgoing correspondence</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Outward
        </Button>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by ID, Subject, or Tracking..."
              className="pl-10"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Procurement">Procurement</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Administration">Administration</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="Important">Important</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Inward Id</TableHead>
                <TableHead className="font-semibold">Received By</TableHead>
                <TableHead className="font-semibold">Handover To</TableHead>
                <TableHead className="font-semibold">Sender</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Delivery Mode</TableHead>
                <TableHead className="font-semibold">Details</TableHead>
                <TableHead className="font-semibold">Reference Details</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMails.map((mail) => (
                <TableRow key={mail.id}>
                  <TableCell className="font-medium text-blue-600">{mail.id}</TableCell>
                  <TableCell>{mail.sentBy}</TableCell>
                  <TableCell>{mail.receiver}</TableCell>
                  <TableCell>{mail.department}</TableCell>
                  <TableCell className="text-sm">{mail.date}</TableCell>
                  <TableCell>Outward</TableCell>
                  <TableCell>{mail.deliveryMode}</TableCell>
                  <TableCell className="max-w-xs truncate" title={mail.subject}>{mail.subject}</TableCell>
                  <TableCell>{mail.trackingId}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(mail.status)}>
                      {mail.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="bg-red-500 text-white hover:bg-red-600">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
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
            Showing {filteredMails.length} of {outwardMails.length} entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
