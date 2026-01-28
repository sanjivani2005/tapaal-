import React, { useState, useEffect } from 'react';
import { Input, Textarea, Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label } from '../../components/ui';
import { UploadCloud, Search, ArrowLeft, Brain, AlertTriangle } from 'lucide-react';
import { aiService, DuplicateResult, PriorityResult, DescriptionSuggestion } from '../../services/ai-service';
import { AIDuplicateAlert } from '../../components/ai/AIDuplicateAlert';
import { AIPrioritySuggestion } from '../../components/ai/AIPrioritySuggestion';
import { AIDescriptionSuggestions } from '../../components/ai/AIDescriptionSuggestions';
import { dataService } from '../../services/data-service';

interface CreateInwardMailProps {
    onBack?: () => void;
}

export function CreateInwardMail({ onBack }: CreateInwardMailProps) {
    const [senderName, setSenderName] = useState('John Doe');
    const [senderAddress, setSenderAddress] = useState('123 Street, City');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [priority, setPriority] = useState('Normal');
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

    // AI States
    const [duplicateResult, setDuplicateResult] = useState<DuplicateResult | null>(null);
    const [priorityResult, setPriorityResult] = useState<PriorityResult | null>(null);
    const [descriptionSuggestions, setDescriptionSuggestions] = useState<DescriptionSuggestion[]>([]);
    const [showDuplicateAlert, setShowDuplicateAlert] = useState(true);
    const [showPrioritySuggestion, setShowPrioritySuggestion] = useState(true);
    const [showDescriptionSuggestions, setShowDescriptionSuggestions] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [departments, setDepartments] = useState([]);

    // Load departments on mount
    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const response = await dataService.getDepartments();
            setDepartments(response.data || []);
        } catch (error) {
            console.error('Failed to load departments:', error);
        }
    };

    // Mock existing mails for duplicate detection
    const existingMails = [
        {
            subject: 'Meeting Schedule for Next Week',
            description: 'This is regarding the meeting scheduled for next week',
            sender: 'John Doe',
            department: 'Administration',
            priority: 'High'
        },
        {
            subject: 'Emergency Court Case Notice',
            description: 'Urgent court case requiring immediate attention',
            sender: 'Legal Department',
            department: 'Legal',
            priority: 'Critical'
        }
    ];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachedFiles(Array.from(event.target.files));
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            setAttachedFiles(Array.from(event.dataTransfer.files));
        }
    };

    // AI Effects
    useEffect(() => {
        // Check for duplicates when subject or sender changes
        if (subject || senderName) {
            checkForDuplicates();
        }
    }, [subject, senderName]);

    useEffect(() => {
        // Assign priority when subject or description changes
        if (subject || description) {
            assignAIPriority();
        }
    }, [subject, description]);

    useEffect(() => {
        // Get description suggestions when subject changes
        if (subject) {
            getDescriptionSuggestions();
        }
    }, [subject]);

    const checkForDuplicates = async () => {
        const newMail = {
            subject,
            description,
            sender: senderName,
            department,
            priority
        };

        const result = await aiService.detectDuplicate(newMail, existingMails);
        setDuplicateResult(result);
    };

    const assignAIPriority = async () => {
        const content = `${subject} ${description}`;
        const result = await aiService.assignPriority(content);
        setPriorityResult(result);
    };

    const getDescriptionSuggestions = async () => {
        const suggestions = await aiService.getDescriptionSuggestions(subject);
        setDescriptionSuggestions(suggestions);
    };

    const handleApplyPriority = (suggestedPriority: string) => {
        setPriority(suggestedPriority);
        setShowPrioritySuggestion(false);
    };

    const handleSelectDescription = (suggestion: string) => {
        setDescription(suggestion);
        setShowDescriptionSuggestions(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Find department ID
            const selectedDepartment = departments.find((dept: any) => dept.name === department);

            const mailData = {
                type: 'inward',
                sender: senderName,
                senderName,
                senderAddress,
                subject,
                description,
                priority,
                deptId: selectedDepartment?.id,
                status: 'PENDING'
            };

            const response = await dataService.createMail(mailData);

            if (response.data) {
                alert('Inward Mail Saved Successfully!');
                if (onBack) onBack();
            }
        } catch (error) {
            console.error('Error saving mail:', error);
            alert('Failed to save mail. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">New Inward Mail</h1>
                    <p className="text-gray-500">Home / Inward / Create</p>
                </div>
                <Button variant="ghost" className="flex items-center gap-2" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
            </div>

            <Card className="shadow-sm border-gray-200/60">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* AI Alerts and Suggestions */}
                        {showDuplicateAlert && duplicateResult && duplicateResult.isDuplicate && (
                            <AIDuplicateAlert
                                duplicateResult={duplicateResult}
                                onDismiss={() => setShowDuplicateAlert(false)}
                            />
                        )}

                        {showPrioritySuggestion && priorityResult && (
                            <AIPrioritySuggestion
                                priorityResult={priorityResult}
                                onApplyPriority={handleApplyPriority}
                                onDismiss={() => setShowPrioritySuggestion(false)}
                            />
                        )}

                        {showDescriptionSuggestions && descriptionSuggestions.length > 0 && !description && (
                            <AIDescriptionSuggestions
                                suggestions={descriptionSuggestions}
                                onSelectSuggestion={handleSelectDescription}
                                onDismiss={() => setShowDescriptionSuggestions(false)}
                            />
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="senderName">Sender Name</Label>
                                <Input
                                    id="senderName"
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="senderAddress">Sender Address</Label>
                                <Input
                                    id="senderAddress"
                                    value={senderAddress}
                                    onChange={(e) => setSenderAddress(e.target.value)}
                                    placeholder="123 Street, City"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter subject"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Additional notes..."
                                rows={4}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select value={department} onValueChange={setDepartment}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((dept: any) => (
                                            <SelectItem key={dept.id} value={dept.name}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select value={priority} onValueChange={setPriority}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Normal">Normal</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Attach Files</Label>
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                    Browse Files
                                </Button>
                            </div>
                            {attachedFiles.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">Selected files:</p>
                                    <ul className="mt-2 space-y-1">
                                        {attachedFiles.map((file, index) => (
                                            <li key={index} className="text-sm text-gray-700">
                                                • {file.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Inward Mail'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
