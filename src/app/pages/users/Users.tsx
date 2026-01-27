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

      <Card className="border-gray-200 shadow-sm overflow-hidden">
        {/* Filters Toolbar */}
        <div className="p-6 bg-white border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search name or email..."
                className="pl-10 bg-gray-50/50 focus:bg-white transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  <SelectValue placeholder="All Roles" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="HOD">HOD</SelectItem>
                <SelectItem value="Clerk">Clerk</SelectItem>
                <SelectItem value="Officer">Officer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  <SelectValue placeholder="All Departments" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  <SelectValue placeholder="All Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

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
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
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