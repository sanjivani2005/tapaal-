const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/departments',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    
    res.on('end', () => {
        console.log('Raw Response:', body);
        console.log('Parsed Response:', JSON.parse(body));
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
