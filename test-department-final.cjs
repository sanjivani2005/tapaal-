const http = require('http');

const data = JSON.stringify({
    name: 'Finance Department',
    code: 'FIN',
    head: 'Robert Chen',
    description: 'Finance and accounting department',
    location: 'Floor 3, Building C',
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
    console.log(`Create Status: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    
    res.on('end', () => {
        console.log('Create Response:', JSON.parse(body));
        
        // Now test fetching all departments
        const getOptions = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/departments',
            method: 'GET'
        };
        
        const getReq = http.request(getOptions, (getRes) => {
            console.log(`\nFetch Status: ${getRes.statusCode}`);
            
            let getBody = '';
            getRes.on('data', (chunk) => {
                getBody += chunk;
            });
            
            getRes.on('end', () => {
                const response = JSON.parse(getBody);
                console.log('Total departments:', response.data.length);
                
                const newDept = response.data.find(d => d.name === 'Finance Department');
                if (newDept) {
                    console.log('✅ New department found in list:', newDept.name, newDept.code);
                } else {
                    console.log('❌ New department not found in list');
                }
            });
        });
        
        getReq.end();
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
