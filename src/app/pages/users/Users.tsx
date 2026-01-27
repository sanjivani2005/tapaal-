import * as React from 'react';
import { Search, Filter, Plus, Pencil, Trash2 } from 'lucide-react';

// Primitive UI Imports
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
import { cn } from '../../components/ui/utils';

// --- Types & Constants ---

interface User {
  name: string;
  email: string;
  role: 'Admin' | 'HOD' | 'Clerk' | 'Officer';
  department: string;
  status: 'Active' | 'Inactive';
}

const USERS_DATA: User[] = [
  { name: 'John Doe', email: 'john.doe@gov.in', role: 'Admin', department: 'Administration', status: 'Active' },
  { name: 'Jane Smith', email: 'jane.smith@gov.in', role: 'HOD', department: 'Finance', status: 'Active' },
  { name: 'Mike Johnson', email: 'mike.j@gov.in', role: 'Clerk', department: 'HR', status: 'Active' },
  { name: 'Sarah Williams', email: 'sarah.w@gov.in', role: 'Officer', department: 'IT', status: 'Active' },
  { name: 'Robert Brown', email: 'robert.b@gov.in', role: 'HOD', department: 'Operations', status: 'Active' },
  { name: 'Emily Davis', email: 'emily.d@gov.in', role: 'Clerk', department: 'Finance', status: 'Inactive' },
];

// --- Sub-components for Badges ---

const UserRoleBadge = ({ role }: { role: User['role'] }) => {
  const variants: Record<string, string> = {
    Admin: 'bg-red-50 text-red-700 border-red-100',
    HOD: 'bg-purple-50 text-purple-700 border-purple-100',
    Clerk: 'bg-blue-50 text-blue-700 border-blue-100',
    Officer: 'bg-green-50 text-green-700 border-green-100',
  };
  return (
    <Badge className={cn("border font-medium shadow-none", variants[role])}>
      {role}
    </Badge>
  );
};

const UserStatusBadge = ({ status }: { status: User['status'] }) => (
  <Badge
    className={cn(
      "border font-medium shadow-none",
      status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-700 border-gray-100'
    )}
  >
    {status}
  </Badge>
);

// --- Main Component ---

export function Users() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('all');
  const [deptFilter, setDeptFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Performance Optimization: Only filter when search or filters change
  const filteredUsers = React.useMemo(() => {
    return USERS_DATA.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesDept = deptFilter === 'all' || user.department === deptFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesDept && matchesStatus;
    });
  }, [searchTerm, roleFilter, deptFilter, statusFilter]);

  return (
    <div className="p-8 space-y-8 bg-gray-50/30 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-500 font-medium">Configure administrative access and department roles.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card className="p-6">
        {/* Filters Toolbar */}
        <div className="flex items-end gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-48">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Role</label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="HOD">HOD</SelectItem>
                <SelectItem value="Clerk">Clerk</SelectItem>
                <SelectItem value="Officer">Officer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Department</label>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setRoleFilter('all');
            setDeptFilter('all');
            setStatusFilter('all');
          }}>
            Clear
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-gray-200 shadow-sm overflow-hidden">
        {/* User Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-gray-50/50">
              <TableHead className="font-bold text-gray-600">User Details</TableHead>
              <TableHead className="font-bold text-gray-600">Role</TableHead>
              <TableHead className="font-bold text-gray-600">Department</TableHead>
              <TableHead className="font-bold text-gray-600">Status</TableHead>
              <TableHead className="font-bold text-gray-600 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => (
                <TableRow key={user.email} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500 font-medium">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell><UserRoleBadge role={user.role} /></TableCell>
                  <TableCell className="font-medium text-gray-600">{user.department}</TableCell>
                  <TableCell><UserStatusBadge status={user.status} /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-gray-400">
                  No users found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}