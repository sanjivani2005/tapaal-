import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Card } from '../../components/ui/card';
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

const inwardMails = [
  {
    id: 'INW-2024-001',
    trackingId: 'TRK-1234',
    receivedBy: 'Kumar M',
    handoverTo: 'Thuzharajan M',
    sender: 'BigEye Global Solutions - BGS',
    date: '2024-01-15 10:30:00',
    type: 'Inward',
    deliveryMode: 'Courier',
    details: 'Tax details for Q4 2023',
    referenceDetails: 'TAX-Q4-2023-045',
    status: 'pending',
    priority: 'Important',
    department: 'Finance',
  },
  {
    id: 'INW-2024-002',
    trackingId: 'TRK-1235',
    receivedBy: 'Sarah Williams',
    handoverTo: 'John Doe',
    sender: 'ABC Corporation Ltd',
    date: '2024-01-16 09:15:00',
    type: 'Inward',
    deliveryMode: 'Hand Delivery',
    details: 'Invoice documents for December',
    referenceDetails: 'INV-2023-045',
    status: 'approved',
    priority: 'High',
    department: 'Accounts',
  },
  {
    id: 'INW-2024-003',
    trackingId: 'TRK-1236',
    receivedBy: 'Mike Johnson',
    handoverTo: 'Jane Smith',
    sender: 'XYZ Enterprises Pvt Ltd',
    date: '2024-01-17 14:20:00',
    type: 'Inward',
    deliveryMode: 'Post',
    details: 'Contract papers for new project',
    referenceDetails: 'CON-2024-089',
    status: 'waiting',
    priority: 'Important',
    department: 'Legal',
  },
  {
    id: 'INW-2024-004',
    trackingId: 'TRK-1237',
    receivedBy: 'Emily Davis',
    handoverTo: 'Robert Brown',
    sender: 'Tech Solutions Inc',
    date: '2024-01-18 11:45:00',
    type: 'Inward',
    deliveryMode: 'Courier',
    details: 'Technical documentation',
    referenceDetails: 'TECH-2024-12',
    status: 'in-progress',
    priority: 'Medium',
    department: 'IT',
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    'waiting': 'bg-yellow-100 text-yellow-700',
    'approved': 'bg-green-100 text-green-700',
    'pending': 'bg-orange-100 text-orange-700',
    'rejected': 'bg-red-100 text-red-700',
    'in-progress': 'bg-blue-100 text-blue-700',
  };
  return variants[status] || 'bg-gray-100 text-gray-700';
};

export function InwardMails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredMails = inwardMails.filter((mail) => {
    const matchesSearch = searchTerm === '' ||
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || mail.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || mail.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || mail.department === selectedDepartment;

    return matchesSearch && matchesPriority && matchesStatus && matchesDepartment;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Inward Listing</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all incoming correspondence</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Inward
        </Button>
      </div>

      {/* Filter Section */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-1 relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search ID or Sender..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
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

          <div className="">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Department</label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Accounts">Accounts</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table Section */}
      <Card className="p-6 overflow-hidden">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[120px]">Inward Id</TableHead>
                <TableHead>Received By</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="max-w-[200px]">Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMails.length > 0 ? (
                filteredMails.map((mail) => (
                  <TableRow key={mail.id}>
                    <TableCell className="font-medium text-blue-600">{mail.id}</TableCell>
                    <TableCell>{mail.receivedBy}</TableCell>
                    <TableCell className="max-w-[150px] truncate">{mail.sender}</TableCell>
                    <TableCell className="text-xs">{mail.date}</TableCell>
                    <TableCell>{mail.deliveryMode}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={mail.details}>
                      {mail.details}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(mail.status)}>
                        {mail.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No inward mails found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing {filteredMails.length} of {inwardMails.length} entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
