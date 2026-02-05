import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardContent, CardHeader, CardTitle, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui';
import { ArrowLeft, User, Mail, Phone, Building, Shield, Key, Eye, EyeOff, Brain, AlertTriangle, Users } from 'lucide-react';
import { aiService } from '../../services/ai-service';
import { dataService } from '../../services/data-service';
import { userService } from '../../../services/user-service.js';

// Type assertion for the imported service
const service = userService as any;

interface CreateUserProps {
    onBack?: () => void;
}

export function CreateUser({ onBack }: CreateUserProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        role: 'user',
        status: 'Active',
        password: '',
        confirmPassword: '',
        employeeId: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // AI States
    const [emailDuplicate, setEmailDuplicate] = useState(false);
    const [employeeIdDuplicate, setEmployeeIdDuplicate] = useState(false);
    const [suggestedRole, setSuggestedRole] = useState('');
    const [existingUsers, setExistingUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [showAISuggestions, setShowAISuggestions] = useState(true);

    // Fetch existing users and departments
    useEffect(() => {
        fetchExistingData();
    }, []);

    const fetchExistingData = async () => {
        try {
            // Mock departments for now - in real app would come from API
            const mockDepartments = [
                { id: 'dept-1', name: 'Education' },
                { id: 'dept-2', name: 'General Administration' },
                { id: 'dept-3', name: 'Revenue' },
                { id: 'dept-4', name: 'Health' }
            ];
            setDepartments(mockDepartments);

            // Mock existing users for duplicate detection
            const mockUsers = [
                { email: 'john.doe@example.com', employeeId: 'EMP001', name: 'John Doe', role: 'Clerk' },
                { email: 'jane.smith@example.com', employeeId: 'EMP002', name: 'Jane Smith', role: 'Manager' },
                { email: 'mike.wilson@example.com', employeeId: 'EMP003', name: 'Mike Wilson', role: 'Administrator' }
            ];
            setExistingUsers(mockUsers);
        } catch (error) {
            console.error('Error fetching existing data:', error);
        }
    };

    // AI Duplicate Detection for Email
    useEffect(() => {
        if (formData.email) {
            const isDuplicate = existingUsers.some(user =>
                user.email.toLowerCase() === formData.email.toLowerCase()
            );
            setEmailDuplicate(isDuplicate);
        } else {
            setEmailDuplicate(false);
        }
    }, [formData.email, existingUsers]);

    // AI Duplicate Detection for Employee ID
    useEffect(() => {
        if (formData.employeeId) {
            const isDuplicate = existingUsers.some(user =>
                user.employeeId === formData.employeeId
            );
            setEmployeeIdDuplicate(isDuplicate);
        } else {
            setEmployeeIdDuplicate(false);
        }
    }, [formData.employeeId, existingUsers]);

    // AI Role Suggestion based on department and experience
    useEffect(() => {
        if (formData.department && formData.firstName) {
            const suggestedRoles = {
                'Education': ['Teacher', 'Administrator', 'Librarian'],
                'General Administration': ['Clerk', 'Manager', 'Administrator'],
                'Revenue': ['Revenue Officer', 'Clerk', 'Assistant'],
                'Health': ['Medical Officer', 'Administrator', 'Staff']
            };

            const deptRoles = suggestedRoles[formData.department] || ['Clerk'];
            setSuggestedRole(deptRoles[0]); // Suggest first role
        }
    }, [formData.department, formData.firstName]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }

        try {
            // Prepare user data for API - match backend User model
            const userData = {
                username: formData.email.split('@')[0], // Generate username from email
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                fullName: `${formData.firstName} ${formData.lastName}`,
                role: formData.role.toLowerCase(), // Convert to lowercase for backend enum
                department: formData.department,
                position: formData.role, // Use role as position for now
                employeeId: formData.employeeId || `EMP${Date.now()}`, // Generate if not provided
                phone: formData.phone,
                address: formData.address || `${formData.city}, ${formData.state}`,
                isActive: formData.status === 'Active'
            };

            // Create user in database
            const response = await service.createUser(userData);

            if (response.success) {
                alert('User Created Successfully!');
                if (onBack) {
                    onBack(); // Go back to users list
                }
            } else {
                alert('Failed to create user: ' + (response.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user. Please try again.');
        }
    };

    const roles = [
        { value: 'admin', label: 'Administrator' },
        { value: 'manager', label: 'Manager' },
        { value: 'user', label: 'User' }
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={onBack} className="p-2">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Create New User</h1>
                    <p className="text-gray-500 text-sm">Add a new user to the system with appropriate permissions</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="user@gov.in"
                                    className={emailDuplicate ? 'border-red-500' : ''}
                                    required
                                />
                                {emailDuplicate && (
                                    <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-600" />
                                        <span className="text-sm text-red-700">
                                            Email already exists! Try a different email address.
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="employeeId">Employee ID</Label>
                            <Input
                                id="employeeId"
                                value={formData.employeeId}
                                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                                placeholder="EMP-2024-001"
                                className={employeeIdDuplicate ? 'border-red-500' : ''}
                            />
                            {employeeIdDuplicate && (
                                <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                    <span className="text-sm text-red-700">
                                        Employee ID already exists! Use a unique ID.
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            Department & Role
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="department">Department *</Label>
                                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map(dept => (
                                            <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="role">Role *</Label>
                                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map(role => (
                                            <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {suggestedRole && suggestedRole !== formData.role && showAISuggestions && (
                                    <div className="mt-1 p-2 bg-blue-50 border border-blue-200 rounded-md flex items-center gap-2">
                                        <Brain className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-blue-700">
                                            AI Suggestion: {suggestedRole} for {formData.department}
                                        </span>
                                        <button
                                            onClick={() => handleInputChange('role', suggestedRole)}
                                            className="ml-auto text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            Security Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="password">Password *</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        placeholder="Enter password"
                                        required
                                        className="pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        placeholder="Confirm password"
                                        required
                                        className="pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Address Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Enter street address"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    placeholder="Enter city"
                                />
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    placeholder="Enter state"
                                />
                            </div>
                            <div>
                                <Label htmlFor="zipCode">ZIP Code</Label>
                                <Input
                                    id="zipCode"
                                    value={formData.zipCode}
                                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                    placeholder="Enter ZIP code"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-900">User Account Summary</h4>
                            <div className="mt-2 text-sm text-blue-700">
                                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                                <p><strong>Role:</strong> {formData.role}</p>
                                <p><strong>Department:</strong> {formData.department}</p>
                                <p><strong>Status:</strong> {formData.status}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        <User className="w-4 h-4 mr-2" />
                        Create User
                    </Button>
                    <Button type="button" variant="outline" onClick={onBack}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
