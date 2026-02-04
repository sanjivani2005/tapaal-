const http = require('http');

const data = JSON.stringify({
    type: 'inward',
    sender: 'Test Sender',
    senderName: 'Test Sender',
    subject: 'Test Mail Save',
    description: 'Testing save functionality',
    priority: 'Normal',
    deptId: 'dept-1',
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
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    
    res.on('end', () => {
        console.log('Response body:', body);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
