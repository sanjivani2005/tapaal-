const http = require('http');

const data = JSON.stringify({
    name: 'Test Department',
    code: 'TST',
    head: 'John Doe',
    description: 'Test department for validation',
    location: 'Floor 1, Building A',
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
