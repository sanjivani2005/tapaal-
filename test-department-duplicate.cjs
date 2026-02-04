const http = require('http');

// Test duplicate name
const data = JSON.stringify({
    name: 'Human Resources',
    code: 'HR2',
    head: 'Test Person',
    status: 'Active'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/departments',
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
