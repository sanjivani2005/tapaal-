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
      const apiData = response.data || [];
      
      // If API returns data, use it. Otherwise, use mock data
      if (apiData.length > 0) {
        setDepartments(apiData);
      } else {
        // Mock data for demonstration
        const mockDepartments = [
          {
            id: 'DEPT-001',
            name: 'General Administration',
            code: 'ADM',
            head: 'Rajesh Kumar',
            description: 'Handles administrative tasks and office management',
            email: 'admin@company.com',
            phone: '+1-234-567-8901',
            established: '2020-01-15'
          },
          {
            id: 'DEPT-002',
            name: 'Revenue',
            code: 'REV',
            head: 'Priya Sharma',
            description: 'Manages revenue collection and tax operations',
            email: 'revenue@company.com',
            phone: '+1-234-567-8902',
            established: '2020-01-20'
          },
          {
            id: 'DEPT-003',
            name: 'Health',
            code: 'HLT',
            head: 'Dr. Amit Singh',
            description: 'Handles health services and medical facilities',
            email: 'health@company.com',
            phone: '+1-234-567-8903',
            established: '2020-01-25'
          },
          {
            id: 'DEPT-004',
            name: 'Education',
            code: 'EDU',
            head: 'Sunita Devi',
            description: 'Manages educational institutions and programs',
            email: 'education@company.com',
            phone: '+1-234-567-8904',
            established: '2020-02-01'
          },
          {
            id: 'DEPT-005',
            name: 'Public Works',
            code: 'PUB',
            head: 'Mahesh Patel',
            description: 'Handles public infrastructure and construction projects',
            email: 'publicworks@company.com',
            phone: '+1-234-567-8905',
            established: '2020-02-05'
          },
          {
            id: 'DEPT-006',
            name: 'Panchayat',
            code: 'PAN',
            head: 'Anita Yadav',
            description: 'Manages rural development and panchayat affairs',
            email: 'panchayat@company.com',
            phone: '+1-234-567-8906',
            established: '2020-02-10'
          },
          {
            id: 'DEPT-007',
            name: 'Construction',
            code: 'CON',
            head: 'Vikram Reddy',
            description: 'Handles construction and building projects',
            email: 'construction@company.com',
            phone: '+1-234-567-8907',
            established: '2020-02-15'
          },
          {
            id: 'DEPT-008',
            name: 'Pension',
            code: 'PEN',
            head: 'Meera Joshi',
            description: 'Manages pension schemes and retirement benefits',
            email: 'pension@company.com',
            phone: '+1-234-567-8908',
            established: '2020-02-20'
          }
        ];
        setDepartments(mockDepartments);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      // Fallback to mock data if API fails
      const mockDepartments = [
        {
          id: 'DEPT-001',
          name: 'General Administration',
          code: 'ADM',
          head: 'Rajesh Kumar'
        },
        {
          id: 'DEPT-002',
          name: 'Revenue',
          code: 'REV',
          head: 'Priya Sharma'
        },
        {
          id: 'DEPT-003',
          name: 'Health',
          code: 'HLT',
          head: 'Dr. Amit Singh'
        },
        {
          id: 'DEPT-004',
          name: 'Education',
          code: 'EDU',
          head: 'Sunita Devi'
        },
        {
          id: 'DEPT-005',
          name: 'Public Works',
          code: 'PUB',
          head: 'Mahesh Patel'
        },
        {
          id: 'DEPT-006',
          name: 'Panchayat',
          code: 'PAN',
          head: 'Anita Yadav'
        },
        {
          id: 'DEPT-007',
          name: 'Construction',
          code: 'CON',
          head: 'Vikram Reddy'
        },
        {
          id: 'DEPT-008',
          name: 'Pension',
          code: 'PEN',
          head: 'Meera Joshi'
        }
      ];
      setDepartments(mockDepartments);
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
          </Card>
        </div>
      )}
    </div>
  );
}
