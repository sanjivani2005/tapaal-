import React, { useState } from 'react';
import { Input, Textarea, Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label } from '../../components/ui';
import { UploadCloud, Search, ArrowLeft } from 'lucide-react';

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log({
            senderName,
            senderAddress,
            subject,
            description,
            department,
            priority,
            attachedFiles,
        });
        // Here you would typically send this data to a backend API
        alert('Inward Mail Saved! Check console for details.');
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
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        placeholder="Search department..."
                                        className="pl-10"
                                    />
                                </div>
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
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Save Inward Mail
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
