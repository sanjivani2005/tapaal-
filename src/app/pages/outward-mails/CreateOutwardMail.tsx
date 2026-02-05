import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Textarea, Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label } from '../../components/ui';
import { ArrowLeft, Save, UploadCloud, Calendar, User, Building, MapPin, DollarSign } from 'lucide-react';
import { outwardMailService } from '../../../services/outward-mail-service';

interface CreateOutwardMailProps {
  onBack: () => void;
  onRefresh?: () => void; // Add refresh callback
}

export function CreateOutwardMail({ onBack, onRefresh }: CreateOutwardMailProps) {
  const { t } = useTranslation();

  // Form state
  const [sentBy, setSentBy] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [sentDate, setSentDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [deliveryMode, setDeliveryMode] = useState('Courier');
  const [cost, setCost] = useState('');
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (!sentBy.trim()) {
      alert('Please enter sent by name');
      return;
    }

    if (!receiver.trim()) {
      alert('Please enter receiver name');
      return;
    }

    if (!receiverAddress.trim()) {
      alert('Please enter receiver address');
      return;
    }

    if (!subject.trim()) {
      alert('Please enter subject');
      return;
    }

    if (!details.trim()) {
      alert('Please enter mail details');
      return;
    }

    if (!department) {
      alert('Please select a department');
      return;
    }

    console.log('🚀 Starting outward mail submission...');
    console.log('Form data:', {
      sentBy,
      receiver,
      receiverAddress,
      subject,
      details,
      department,
      priority,
      sentDate,
      dueDate,
      referenceNumber,
      deliveryMode,
      cost,
      attachedFiles
    });

    try {
      const mailData = {
        sentBy: sentBy,
        receiver: receiver,
        receiverAddress: receiverAddress,
        subject: subject,
        details: details,
        referenceDetails: referenceNumber,
        priority: priority,
        department: department,
        status: 'pending',
        deliveryMode: deliveryMode,
        date: sentDate || new Date().toISOString().slice(0, 10),
        dueDate: dueDate,
        cost: parseFloat(cost) || 0
      };

      console.log('📤 Sending to API:', mailData);

      const response = await outwardMailService.createOutwardMail(mailData, attachedFiles);

      console.log('📥 API Response:', response);

      if (response.success) {
        console.log('✅ Mail saved successfully!');
        alert('Outward mail created successfully!');
        // Clear form fields
        setSentBy('');
        setReceiver('');
        setReceiverAddress('');
        setSubject('');
        setDetails('');
        setDepartment('');
        setPriority('Normal');
        setSentDate('');
        setDueDate('');
        setReferenceNumber('');
        setDeliveryMode('Courier');
        setCost('');
        setAttachedFiles([]);

        // Trigger parent refresh
        onBack?.();
        onRefresh?.(); // Trigger table refresh
      } else {
        console.log('❌ API returned error:', response.message);
        setError('Failed to create outward mail: ' + response.message);
      }
    } catch (error) {
      console.error('💥 Error creating outward mail:', error);
      alert('Failed to create outward mail. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Create Outward Mail</h1>
          <p className="text-gray-500 text-sm">Record new correspondence sent to external parties</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Sender & Receiver Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sentBy">Sent By *</Label>
                <Input
                  id="sentBy"
                  value={sentBy}
                  onChange={(e) => setSentBy(e.target.value)}
                  placeholder="Enter sender name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="receiver">Receiver *</Label>
                <Input
                  id="receiver"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  placeholder="Enter receiver name"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="receiverAddress">Receiver Address</Label>
              <Textarea
                id="receiverAddress"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Enter complete receiver address"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                    <SelectItem value="Procurement">Procurement</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="IT">Information Technology</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deliveryMode">Delivery Mode</Label>
                <Select value={deliveryMode} onValueChange={setDeliveryMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Courier">Courier</SelectItem>
                    <SelectItem value="Post">Post</SelectItem>
                    <SelectItem value="Hand Delivery">Hand Delivery</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Registered Post">Registered Post</SelectItem>
                    <SelectItem value="Speed Post">Speed Post</SelectItem>
                    <SelectItem value="Fax">Fax</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mail Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter mail subject"
                required
              />
            </div>
            <div>
              <Label htmlFor="details">Details *</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter mail details"
                rows={5}
                required
              />
            </div>
            <div>
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input
                id="referenceNumber"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter reference number"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Important">Important</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sentDate">Sent Date</Label>
                <Input
                  id="sentDate"
                  type="date"
                  value={sentDate}
                  onChange={(e) => setSentDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cost">Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadCloud className="w-5 h-5" />
              Attachments (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
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
                <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                <ul className="space-y-1">
                  {attachedFiles.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Outward Mail
          </Button>
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
