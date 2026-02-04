const http = require('http');

// Test API endpoints
console.log('🔧 Testing API Endpoints...\n');

const testEndpoint = (path, method = 'GET', data = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`✅ ${method} ${path}: Status ${res.statusCode}`);
                console.log(`   Response: ${data}`);
                resolve({ status: res.statusCode, data: data });
            });
        });

        req.on('error', (error) => {
            console.log(`❌ ${method} ${path}: Error - ${error.message}`);
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

// Test endpoints
const runTests = async () => {
    try {
        console.log('Testing API endpoints...\n');
        
        // Test health endpoint
        await testEndpoint('/api/health');
        
        // Test GET mails
        await testEndpoint('/api/mails?type=outward');
        
        // Test POST outward mail
        await testEndpoint('/api/mails', 'POST', {
            type: 'outward',
            receiver: 'Test Receiver',
            receiverName: 'Test Receiver',
            subject: 'Test Subject',
            description: 'Test Description',
            priority: 'Normal',
            deptId: 'DEPT-001',
            status: 'PENDING'
        });
        
        console.log('\n✅ All API tests completed!');
    } catch (error) {
        console.log('\n❌ API tests failed:', error.message);
    }
};

runTests();
