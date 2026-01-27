import React, { useState } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const departments = [
  { id: 'DEPT-001', name: 'Administration', code: 'ADM', head: 'Maria Garcia' },
  { id: 'DEPT-002', name: 'Finance', code: 'FIN', head: 'Jane Smith' },
  { id: 'DEPT-003', name: 'Human Resources', code: 'HR', head: 'James Taylor' },
  { id: 'DEPT-004', name: 'Information Technology', code: 'IT', head: 'Sarah Williams' },
  { id: 'DEPT-005', name: 'Operations', code: 'OPS', head: 'Robert Brown' },
  { id: 'DEPT-006', name: 'Legal', code: 'LEG', head: 'David Wilson' },
  { id: 'DEPT-007', name: 'Procurement', code: 'PRO', head: 'Lisa Anderson' },
  { id: 'DEPT-008', name: 'Facilities', code: 'FAC', head: 'Michael Chen' },
  { id: 'DEPT-009', name: 'Public Relations', code: 'PR', head: 'Emma Thompson' },
  { id: 'DEPT-010', name: 'Audit & Compliance', code: 'AUD', head: 'Daniel Lee' },
];

export function Departments() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Departments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage organizational departments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Department
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search departments..."
              className="pl-10"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Department ID</TableHead>
                <TableHead className="font-semibold">Department Name</TableHead>
                <TableHead className="font-semibold">Code</TableHead>
                <TableHead className="font-semibold">Head</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium text-blue-600">{dept.id}</TableCell>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {dept.code}
                    </span>
                  </TableCell>
                  <TableCell>{dept.head}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
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
            Showing {filteredDepartments.length} of {departments.length} entries
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
