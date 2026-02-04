import React, { useState } from 'react';
import { Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
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

// Mock Data
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
    },
    {
        id: 'OUT-2024-002',
        trackingId: 'TRK-1246',
        subject: 'Appointment Letter',
        receiver: 'Sarah Williams',
        department: 'HR',
        sentBy: 'Jane Smith',
        date: '2024-01-16 09:15:00',
        deliveryMode: 'Hand Delivery',
        status: 'pending',
        priority: 'High',
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

interface OutwardMailsProps {
    onViewMail?: (id: string) => void;
    onEditMail?: (id: string) => void;
}

export function OutwardMails({ onViewMail, onEditMail }: OutwardMailsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [showCreateForm, setShowCreateForm] = useState(false);

    const filteredMails = outwardMails.filter((mail) => {
        const matchesSearch = mail.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mail.trackingId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = departmentFilter === 'all' || mail.department === departmentFilter;
        const matchesStatus = statusFilter === 'all' || mail.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || mail.priority === priorityFilter;
        return matchesSearch && matchesDepartment && matchesStatus && matchesPriority;
    });

    if (showCreateForm) {
        return <div className="p-6">Create Form Placeholder <Button onClick={() => setShowCreateForm(false)}>Back</Button></div>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Outward Mails</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all outgoing correspondence</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Outward
                </Button>
            </div>

            {/* Filters Section */}
            <Card className="p-6">
                <div className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[300px] relative">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search by ID, Subject, or Tracking..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
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
                                <SelectItem value="Procurement">Procurement</SelectItem>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Administration">Administration</SelectItem>
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
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-transit">In Transit</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
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
                                <TableHead className="font-semibold">Outward Id</TableHead>
                                <TableHead className="font-semibold">Sent By</TableHead>
                                <TableHead className="font-semibold">Receiver</TableHead>
                                <TableHead className="font-semibold">Dept</TableHead>
                                <TableHead className="font-semibold">Date</TableHead>
                                <TableHead className="font-semibold">Mode</TableHead>
                                <TableHead className="font-semibold">Subject</TableHead>
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
                                    <TableCell className="text-xs">{mail.date}</TableCell>
                                    <TableCell>{mail.deliveryMode}</TableCell>
                                    <TableCell className="max-w-[150px] truncate" title={mail.subject}>
                                        {mail.subject}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusBadge(mail.status)}>
                                            {mail.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => onViewMail?.(mail.id)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="bg-blue-50 text-blue-600 hover:bg-blue-100" onClick={() => onEditMail?.(mail.id)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500">
                        Showing {filteredMails.length} of {outwardMails.length} entries
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
