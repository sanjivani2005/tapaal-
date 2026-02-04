const http = require('http');

const data = JSON.stringify({
    type: 'inward',
    sender: 'John Doe',
    senderName: 'John Doe',
    subject: 'Complete Test Mail',
    description: 'Testing complete save functionality with validation',
    priority: 'HIGH',
    deptId: 'dept-3', // Revenue department
    status: 'PENDING'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/mails',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', JSON.parse(body));
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
