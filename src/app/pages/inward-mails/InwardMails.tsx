import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Pencil, Trash2, Eye, Download, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { dataService } from '../../services/data-service';
import { CreateInwardMail } from '../inward/CreateInwardMail';

interface InwardMailsProps {
  onViewMail?: (mail: any) => void;
  onEditMail?: (mail: any) => void;
  onCreateMail?: () => void;
}

export function InwardMails({ onViewMail, onEditMail, onCreateMail }: InwardMailsProps) {
  // Mock data for demonstration - matching outward mail structure
  const [mails, setMails] = useState([
    {
      id: 'INW-2024-001',
      trackingId: 'TRK-1250',
      subject: 'Legal Document Submission',
      sender: 'Supreme Court',
      department: 'Legal',
      sentBy: 'John Doe',
      date: '2024-01-15 14:30:00',
      deliveryMode: 'Courier',
      status: 'received',
      priority: 'Important',
      dueDate: '2024-01-20',
      attachments: 3,
      cost: 250.00,
      createdAt: '2024-01-15 10:00:00',
      updatedAt: '2024-01-15 16:45:00'
    },
    {
      id: 'INW-2024-002',
      trackingId: 'TRK-1251',
      subject: 'Contract Agreement',
      sender: 'ABC Corporation Ltd',
      department: 'Finance',
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
      id: 'INW-2024-003',
      trackingId: 'TRK-1252',
      subject: 'Tax Notice',
      sender: 'Tax Department',
      department: 'Accounts',
      sentBy: 'Mike Johnson',
      date: '2024-01-17 11:20:00',
      deliveryMode: 'Post',
      status: 'processing',
      priority: 'Important',
      dueDate: '2024-01-22',
      attachments: 4,
      cost: 150.00,
      createdAt: '2024-01-17 10:00:00',
      updatedAt: '2024-01-17 11:20:00'
    },
    {
      id: 'INW-2024-004',
      trackingId: 'TRK-1253',
      subject: 'Meeting Minutes',
      sender: 'Board of Directors',
      department: 'Administration',
      sentBy: 'Emily Davis',
      date: '2024-01-18 15:45:00',
      deliveryMode: 'Email',
      status: 'received',
      priority: 'Medium',
      dueDate: '2024-01-19',
      attachments: 1,
      cost: 0.00,
      createdAt: '2024-01-18 14:00:00',
      updatedAt: '2024-01-18 16:00:00'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredMails = mails.filter((mail) => {
    const matchesSearch = mail.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mail.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || mail.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || mail.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || mail.priority === priorityFilter;
    return matchesSearch && matchesDepartment && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
        'received': 'bg-green-100 text-green-700',
        'pending': 'bg-orange-100 text-orange-700',
        'processing': 'bg-blue-100 text-blue-700',
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

  return (
    <div>
      {showCreateForm ? (
        <CreateInwardMail onBack={() => setShowCreateForm(false)} />
      ) : (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Inward Mails</h1>
              <p className="text-gray-500 text-sm mt-1">Manage all incoming correspondence</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Inward
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, Subject, or Tracking..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="w-48">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
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

              <div className="w-48">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Department</label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Accounts">Accounts</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-48">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Table Section */}
          <Card className="p-6">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold whitespace-nowrap">Inward Id</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Sent By</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Sender</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Department</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Date</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Type</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Delivery Mode</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Subject</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Tracking Id</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Status</TableHead>
                    <TableHead className="font-semibold text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMails.map((mail) => (
                    <TableRow key={mail.id}>
                      <TableCell className="font-medium text-blue-600 whitespace-nowrap">{mail.id}</TableCell>
                      <TableCell className="whitespace-nowrap">{mail.sentBy}</TableCell>
                      <TableCell className="whitespace-nowrap">{mail.sender}</TableCell>
                      <TableCell className="whitespace-nowrap">{mail.department}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{mail.date}</TableCell>
                      <TableCell className="whitespace-nowrap">Inward</TableCell>
                      <TableCell className="whitespace-nowrap">{mail.deliveryMode}</TableCell>
                      <TableCell className="truncate whitespace-nowrap" title={mail.subject}>{mail.subject}</TableCell>
                      <TableCell className="whitespace-nowrap">{mail.trackingId}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge className={getStatusBadge(mail.status)}>
                          {mail.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => onViewMail?.(mail)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => onEditMail?.(mail)}>
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
          </Card>
        </div>
      )}
    </div>
  );
}
