import React, { useState, useEffect } from 'react';
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
import { CreateDepartment } from './CreateDepartment';
import { EditDepartment } from './EditDepartment';
import { dataService } from '../../services/data-service';

export function Departments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await dataService.getDepartments();
      setDepartments(response.data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
      // Fallback to empty array if API fails
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditDepartment = (departmentId: string) => {
    setEditingDepartmentId(departmentId);
    setShowEditForm(true);
  };

  const handleDepartmentUpdated = () => {
    fetchDepartments();
    setShowEditForm(false);
    setEditingDepartmentId('');
  };

  return (
    <div>
      {showCreateForm ? (
        <CreateDepartment
          onBack={() => setShowCreateForm(false)}
          onDepartmentCreated={fetchDepartments}
        />
      ) : showEditForm ? (
        <EditDepartment
          onBack={() => setShowEditForm(false)}
          departmentId={editingDepartmentId}
          onDepartmentUpdated={handleDepartmentUpdated}
        />
      ) : (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Departments</h1>
              <p className="text-gray-500 text-sm mt-1">Manage organizational departments</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreateForm(true)}>
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
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading departments...</p>
                  </div>
                </div>
              ) : filteredDepartments.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">
                      {searchTerm ? 'No departments found matching your search.' : 'No departments found.'}
                    </p>
                    {!searchTerm && (
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowCreateForm(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Department
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
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
                      <TableRow key={dept.id || dept.code}>
                        <TableCell className="font-medium text-blue-600">{dept.id || dept.code}</TableCell>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {dept.code}
                          </span>
                        </TableCell>
                        <TableCell>{dept.head}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDepartment(dept.id || dept.code)}
                            >
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
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : `Showing ${filteredDepartments.length} of ${departments.length} entries`}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
