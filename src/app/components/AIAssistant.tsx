import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Bot,
    Send,
    Minimize2,
    Maximize2,
    MessageCircle,
    Brain,
    Activity,
    BarChart3,
    Users,
    Mail,
    HelpCircle,
    RefreshCw
} from 'lucide-react';
import { systemDataService } from '../services/system-data';
import { dynamicDataService } from '../services/dynamic-data';

interface AIAssistantProps {
    dashboardData?: any;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
    dashboardData
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    const generateResponse = async (userMessage: string) => {
        // Complete system data integration
        const lowerMessage = userMessage.toLowerCase();
        const systemData = systemDataService.getSystemOverview();

        // Check for specific mail ID queries first
        if (lowerMessage.includes('inw-') || lowerMessage.includes('out-') || lowerMessage.includes('trk-')) {
            // Extract mail ID from message
            const mailIdMatch = userMessage.match(/(INW-\d+-\d+|OUT-\d+-\d+|TRK-\d+)/i);
            if (mailIdMatch) {
                const mailId = mailIdMatch[0];

                // Check if it's an inward mail
                if (mailId.startsWith('INW-')) {
                    const mailDetails = systemDataService.getMailDetails(mailId, 'inward');
                    if (mailDetails) {
                        return {
                            text: `📥 Inward Mail Details (${new Date().toLocaleTimeString()})

📋 Mail ID: ${mailId}
🔍 Tracking ID: ${mailDetails.trackingId}
📧 Subject: ${mailDetails.details}
👤 From: ${mailDetails.sender}
🏢 Department: ${mailDetails.department}
📊 Status: ${mailDetails.status}
🏷️ Priority: ${mailDetails.priority}
📅 Date: ${mailDetails.date}
📦 Delivery Mode: ${mailDetails.deliveryMode}
📋 Reference: ${mailDetails.referenceDetails}
👤 Received By: ${mailDetails.receivedBy}
🤝 Handover To: ${mailDetails.handoverTo}

Need more actions? Ask "Track ${mailId}" or "Update status ${mailId}"`,
                            action: 'mail_details'
                        };
                    }
                }

                // Check if it's an outward mail
                if (mailId.startsWith('OUT-')) {
                    const mailDetails = systemDataService.getMailDetails(mailId, 'outward');
                    if (mailDetails) {
                        return {
                            text: `📤 Outward Mail Details (${new Date().toLocaleTimeString()})

📋 Mail ID: ${mailId}
🔍 Tracking ID: ${mailDetails.trackingId}
📧 Subject: ${mailDetails.subject}
👤 To: ${mailDetails.receiver}
🏢 Department: ${mailDetails.department}
📊 Status: ${mailDetails.status}
🏷️ Priority: ${mailDetails.priority}
📅 Date: ${mailDetails.date}
📦 Delivery Mode: ${mailDetails.deliveryMode}
📅 Due Date: ${mailDetails.dueDate}
📎 Attachments: ${mailDetails.attachments}
👤 Sent By: ${mailDetails.sentBy}

Need more actions? Ask "Track ${mailId}" or "Update status ${mailId}"`,
                            action: 'mail_details'
                        };
                    }
                }

                // Check if it's a tracking ID
                if (mailId.startsWith('TRK-')) {
                    const trackingDetails = systemDataService.getTrackingDetails(mailId);
                    if (trackingDetails) {
                        const timeline = trackingDetails.timeline.slice(-3).map((event, index) =>
                            `${index + 1}. 📋 ${event.status}
   ⏰ ${event.timestamp}
   👤 ${event.user}
   📝 ${event.remarks}`
                        ).join('\n\n');

                        return {
                            text: `🔍 Tracking Details (${new Date().toLocaleTimeString()})

📋 Tracking ID: ${mailId}
📧 Mail ID: ${trackingDetails.mailId}
📧 Mail Type: ${trackingDetails.mailType}
📧 Subject: ${trackingDetails.subject}
👤 ${trackingDetails.mailType === 'Inward' ? 'Sender' : 'Receiver'}: ${trackingDetails.sender || trackingDetails.receiver}
🏢 Department: ${trackingDetails.department}
📊 Current Status: ${trackingDetails.currentStatus}
🏷️ Priority: ${trackingDetails.priority}
👤 Assigned To: ${trackingDetails.assignedTo}
📅 Created: ${trackingDetails.createdAt}
🔄 Last Updated: ${trackingDetails.lastUpdated}

Recent Timeline:
${timeline}

Need more actions? Ask "Full timeline ${mailId}"`,
                            action: 'tracking_details'
                        };
                    }
                }

                return {
                    text: `❌ Mail/Tracking ID "${mailId}" not found in the system.

Available IDs:
📥 Inward: INW-2024-001, INW-2024-002, INW-2024-003, INW-2024-004
📤 Outward: OUT-2024-001, OUT-2024-002, OUT-2024-003
🔍 Tracking: TRK-2401, TRK-2402

Please check the ID and try again.`,
                    action: 'not_found'
                };
            }
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
            const currentTime = new Date().toLocaleTimeString();
            return {
                text: `👋 Namaste! Main aapka AI Assistant hun. Current time: ${currentTime}

System Status: ✅ All modules active
Total Data: ${systemData.totalInwardMails + systemData.totalOutwardMails} mails, ${systemData.totalUsers} users, ${systemData.totalDepartments} departments

How can I help you? Try "Show statistics", "INW-2024-001", "Users list", etc!`,
                action: 'greeting'
            };
        }

        if (lowerMessage.includes('inward') || lowerMessage.includes('incoming')) {
            let inwardMails;
            try {
                inwardMails = await dynamicDataService.getInwardMails();
            } catch (error) {
                console.warn('Dynamic API failed for inward mails, using static data');
                inwardMails = systemDataService.getInwardMails();
            }

            const pendingCount = inwardMails.filter(m => m.status === 'pending').length;
            const completedCount = inwardMails.filter(m => m.status === 'completed').length;

            if (inwardMails.length > 0) {
                const mailList = inwardMails.slice(0, 3).map((mail, index) =>
                    `${index + 1}. 📋 ${mail.id}
   📧 Subject: ${mail.details}
   👤 From: ${mail.sender}
   🏢 Department: ${mail.department}
   📊 Status: ${mail.status}
   🏷️ Priority: ${mail.priority}
   📅 Date: ${mail.date}`
                ).join('\n\n');

                return {
                    text: `📥 Inward Mails Report (${new Date().toLocaleTimeString()})

Total Inward Mails: ${inwardMails.length}
Pending: ${pendingCount} | Completed: ${completedCount}

Recent Inward Mails:
${mailList}

Need more details? Ask "Show all inward mails" or "Inward mail status"`,
                    action: 'inward_mails'
                };
            } else {
                return {
                    text: "📥 No inward mails found in the system.",
                    action: 'no_inward_mails'
                };
            }
        }

        if (lowerMessage.includes('outward') || lowerMessage.includes('outgoing')) {
            const outwardMails = systemDataService.getOutwardMails();
            const deliveredCount = outwardMails.filter(m => m.status === 'delivered').length;
            const inTransitCount = outwardMails.filter(m => m.status === 'in-transit').length;

            if (outwardMails.length > 0) {
                const mailList = outwardMails.slice(0, 3).map((mail, index) =>
                    `${index + 1}. 📤 ${mail.id}
   📧 Subject: ${mail.subject}
   👤 To: ${mail.receiver}
   🏢 Department: ${mail.department}
   📊 Status: ${mail.status}
   🏷️ Priority: ${mail.priority}
   📅 Date: ${mail.date}`
                ).join('\n\n');

                return {
                    text: `📤 Outward Mails Report (${new Date().toLocaleTimeString()})

Total Outward Mails: ${outwardMails.length}
Delivered: ${deliveredCount} | In Transit: ${inTransitCount}

Recent Outward Mails:
${mailList}

Need more details? Ask "Show all outward mails" or "Outward mail status"`,
                    action: 'outward_mails'
                };
            } else {
                return {
                    text: "📤 No outward mails found in the system.",
                    action: 'no_outward_mails'
                };
            }
        }

        if (lowerMessage.includes('user') || lowerMessage.includes('people') || lowerMessage.includes('employee')) {
            const users = systemDataService.getUsers();
            const activeUsers = users.filter(u => u.status === 'Active');
            const adminUsers = users.filter(u => u.role === 'Admin');
            const officerUsers = users.filter(u => u.role === 'Officer');

            if (users.length > 0) {
                const userList = users.slice(0, 4).map((user, index) =>
                    `${index + 1}. 👤 ${user.name}
   📧 Email: ${user.email}
   🏢 Role: ${user.role}
   🏢 Department: ${user.department}
   📊 Status: ${user.status}`
                ).join('\n\n');

                return {
                    text: `👥 Users Report (${new Date().toLocaleTimeString()})

Total Users: ${users.length}
Active Users: ${activeUsers.length}
Admins: ${adminUsers.length} | Officers: ${officerUsers.length}

User List:
${userList}

Need more details? Ask "Show all users" or "User by department"`,
                    action: 'users'
                };
            } else {
                return {
                    text: "👥 No users found in the system.",
                    action: 'no_users'
                };
            }
        }

        if (lowerMessage.includes('department') || lowerMessage.includes('dept')) {
            const departments = systemDataService.getDepartments();
            const activeDepts = departments.filter(d => d.status === 'Active');

            if (departments.length > 0) {
                const deptList = departments.slice(0, 5).map((dept, index) =>
                    `${index + 1}. 🏢 ${dept.name}
   📋 Code: ${dept.code}
   👤 Head: ${dept.head}
   📊 Status: ${dept.status}`
                ).join('\n\n');

                return {
                    text: `🏢 Departments Report (${new Date().toLocaleTimeString()})

Total Departments: ${departments.length}
Active Departments: ${activeDepts.length}

Department List:
${deptList}

Need more details? Ask "Show all departments" or "Department statistics"`,
                    action: 'departments'
                };
            } else {
                return {
                    text: "🏢 No departments found in the system.",
                    action: 'no_departments'
                };
            }
        }

        if (lowerMessage.includes('track') || lowerMessage.includes('tracking')) {
            const trackingEvents = systemDataService.getTrackingEvents();
            const activeTracking = trackingEvents.filter(t => t.currentStatus !== 'Delivered');

            if (trackingEvents.length > 0) {
                const trackingList = trackingEvents.slice(0, 3).map((event, index) =>
                    `${index + 1}. 🔍 ${event.id}
   📧 Mail: ${event.subject}
   📊 Status: ${event.currentStatus}
   🏢 Department: ${event.department}
   👤 Assigned: ${event.assignedTo}
   📅 Updated: ${event.lastUpdated}`
                ).join('\n\n');

                return {
                    text: `🔍 Tracking Report (${new Date().toLocaleTimeString()})

Total Tracking Events: ${trackingEvents.length}
Active Tracking: ${activeTracking.length}

Recent Tracking:
${trackingList}

Need more details? Ask "Show all tracking" or "Tracking by status"`,
                    action: 'tracking'
                };
            } else {
                return {
                    text: "🔍 No tracking events found in the system.",
                    action: 'no_tracking'
                };
            }
        }

        if (lowerMessage.includes('stats') || lowerMessage.includes('statistics') || lowerMessage.includes('data')) {
            const deptStats = systemDataService.getDepartmentStats();
            const userActivity = systemDataService.getUserActivitySummary();

            return {
                text: `📊 Complete System Statistics (${new Date().toLocaleTimeString()})

📧 Mail Statistics:
Inward Mails: ${systemData.totalInwardMails}
Outward Mails: ${systemData.totalOutwardMails}
Pending: ${systemData.pendingMails}
Completed: ${systemData.completedMails}
Delivered: ${systemData.deliveredMails}

👥 User Statistics:
Total Users: ${systemData.totalUsers}
Active Users: ${systemData.activeUsers}

🏢 Department Statistics:
Total Departments: ${systemData.totalDepartments}
Active Departments: ${systemData.activeDepartments}

🔍 Tracking Statistics:
Total Events: ${systemData.totalTrackingEvents}

System Efficiency: ${systemData.totalMails > 0 ? Math.round((systemData.totalTrackingEvents / systemData.totalMails) * 100) : 0}%

Last Updated: Just now!`,
                action: 'statistics'
            };
        }

        if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
            // Extract search term
            const searchTerms = userMessage.split(' ').filter(word =>
                ['search', 'find', 'look', 'for'].indexOf(word.toLowerCase()) === -1
            ).join('');

            if (searchTerms) {
                const searchResults = systemDataService.searchAll(searchTerms);
                const totalResults = Object.keys(searchResults).reduce((sum, key) => sum + searchResults[key].length, 0);

                return {
                    text: `🔍 Search Results for "${searchTerms}" (${new Date().toLocaleTimeString()})

Found ${totalResults} results:
📥 Inward Mails: ${searchResults.inwardMails.length}
📤 Outward Mails: ${searchResults.outwardMails.length}
👥 Users: ${searchResults.users.length}
🏢 Departments: ${searchResults.departments.length}
🔍 Tracking: ${searchResults.tracking.length}

Need detailed results? Ask "Show search details for ${searchTerms}"`,
                    action: 'search'
                };
            } else {
                return {
                    text: "🔍 Please specify what you want to search for. Example: 'search tax' or 'find John'",
                    action: 'search_help'
                };
            }
        }

        if (lowerMessage.includes('help')) {
            return {
                text: `🤖 AI Assistant Help - Complete System Monitoring!

Available Commands:

📧 Mail Commands:
• "Inward mails" - Show all incoming mails
• "Outward mails" - Show all outgoing mails
• "Mail status" - Current mail statistics
• "Tracking" - Mail tracking events

� Specific ID Queries:
• "INW-2024-001" - Get details of specific inward mail
• "OUT-2024-001" - Get details of specific outward mail
• "TRK-2401" - Get tracking details
• "Track INW-2024-001" - Track specific mail

�👥 User Commands:
• "Users" - Show all users
• "User performance" - User activity summary
• "Active users" - Currently active users

🏢 Department Commands:
• "Departments" - Show all departments
• "Department stats" - Department-wise statistics
• "Active departments" - Currently active departments

📊 System Commands:
• "Statistics" - Complete system overview
• "Search [term]" - Search across all modules
• "System status" - Current system health

🔍 Tracking Commands:
• "Tracking" - Show tracking events
• "Mail tracking" - Track specific mails
• "Tracking status" - Current tracking status

Available Mail IDs:
📥 Inward: INW-2024-001, INW-2024-002, INW-2024-003
📤 Outward: OUT-2024-001, OUT-2024-002, OUT-2024-003
🔍 Tracking: TRK-2401, TRK-2402

Special Features:
⚡ Real-time data from all modules
📊 Complete system monitoring
🔍 Cross-module search
📈 Performance analytics
🎯 Specific mail/track ID queries

Try any command! I'll help you navigate the complete system.`,
                action: 'help'
            };
        }

        if (lowerMessage.includes('system') || lowerMessage.includes('status')) {
            const efficiency = systemData.totalMails > 0 ?
                Math.round((systemData.totalTrackingEvents / systemData.totalMails) * 100) : 0;

            return {
                text: `⚡ System Status Report (${new Date().toLocaleTimeString()})

🟢 Overall Status: Healthy
📊 System Efficiency: ${efficiency}%
🔧 Modules Active: 5/5

📧 Mail System: ✅ Active
👥 User System: ✅ Active  
🏢 Department System: ✅ Active
🔍 Tracking System: ✅ Active
📊 Analytics: ✅ Active

Current Load:
📧 ${systemData.totalMails} mails processed
👥 ${systemData.activeUsers} active users
🏢 ${systemData.activeDepartments} active departments
🔍 ${systemData.totalTrackingEvents} tracking events

System Performance: ${efficiency > 80 ? 'Excellent' : efficiency > 60 ? 'Good' : 'Needs Attention'}

All systems operational!`,
                action: 'system_status'
            };
        }

        // Default response with system overview
        return {
            text: `🤔 Aap ye keh rahe hain: "${userMessage}"

Current System Status (${new Date().toLocaleTimeString()}):
📧 ${systemData.totalMails} mails processed
👥 ${systemData.activeUsers} active users
🏢 ${systemData.activeDepartments} active departments
🔍 ${systemData.totalTrackingEvents} tracking events

Available Commands:
📊 "Statistics" - Complete overview
📧 "Inward mails" / "Outward mails"
👥 "Users" - User information
🏢 "Departments" - Department details
🔍 "Tracking" - Mail tracking
🆘 "Help" - All commands

What specific information would you like? I can provide complete system data!`,
            action: 'general'
        };
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            type: 'user',
            text: message,
            timestamp: new Date().toISOString()
        };

        setConversation(prev => [...prev, userMessage]);
        setMessage('');
        setIsTyping(true);

        try {
            const response = await generateResponse(message);

            const aiMessage = {
                type: 'assistant',
                text: response.text,
                action: response.action,
                timestamp: new Date().toISOString()
            };

            setConversation(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = {
                type: 'assistant',
                text: '🤖 Sorry, an error occurred. Please try again!',
                timestamp: new Date().toISOString()
            };
            setConversation(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const refreshChat = () => {
        setConversation([]);
        setMessage('');
        setIsTyping(false);
    };

    const quickActions = [
        { icon: BarChart3, label: 'Statistics', message: 'Show statistics' },
        { icon: Mail, label: 'Track Mail', message: 'Track mail status' },
        { icon: Users, label: 'Users', message: 'Show user info' },
        { icon: HelpCircle, label: 'Help', message: 'Help me' }
    ];

    const formatMessage = (text: string) => {
        return text.split('\n').map((line, index) => (
            <div key={index} className="mb-1">
                {line}
            </div>
        ));
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                    <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                </Button>
                <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    AI Assistant - System Intelligence! 🧠
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bot className="w-6 h-6" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
                            <p className="text-xs text-blue-100">System intelligent monitoring</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={refreshChat}
                            className="text-white hover:bg-white/20"
                            title="Refresh chat"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="text-white hover:bg-white/20"
                        >
                            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/20"
                        >
                            ×
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {!isMinimized && (
                <>
                    {/* Status Bar */}
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-4">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                    <Activity className="w-3 h-3 inline mr-1" />
                                    Active
                                </span>
                                <span className="text-gray-500">
                                    {conversation.length} messages
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Brain className="w-3 h-3 text-purple-600" />
                                <span className="text-gray-600">AI Powered</span>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <CardContent className="p-4 h-80 overflow-y-auto">
                        {conversation.length === 0 ? (
                            <div className="text-center py-8">
                                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-700 mb-2">AI Assistant Ready!</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    I'm tracking everything in your system. What would you like to know?
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickActions.map((action, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setMessage(action.message)}
                                            className="text-xs h-8"
                                        >
                                            <action.icon className="w-3 h-3 mr-1" />
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {conversation.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${msg.type === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                {msg.type === 'assistant' && (
                                                    <Bot className="w-4 h-4 mt-0.5 text-blue-600" />
                                                )}
                                                <div className="flex-1">
                                                    <div className="text-sm">
                                                        {formatMessage(msg.text)}
                                                    </div>
                                                    {msg.action && (
                                                        <div className="mt-2 text-xs opacity-75">
                                                            Action: {msg.action}
                                                        </div>
                                                    )}
                                                </div>
                                                {msg.type === 'user' && (
                                                    <MessageCircle className="w-4 h-4 mt-0.5" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <Bot className="w-4 h-4 text-blue-600" />
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </CardContent>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask AI anything..."
                                className="flex-1"
                                disabled={isTyping}
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!message.trim() || isTyping}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                            {quickActions.slice(0, 3).map((action, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setMessage(action.message)}
                                    className="text-xs h-6 px-2"
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AIAssistant;