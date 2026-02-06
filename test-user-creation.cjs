const http = require('http');

const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    role: 'user',
    department: 'IT',
    position: 'Developer',
    employeeId: 'emp-001', // Same ID that was causing error
    phone: '1234567890',
    address: 'Test Address',
    isActive: true
};

const postData = JSON.stringify(testUser);

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('🧪 Testing user creation with employeeId: emp-001...');

const req = http.request(options, (res) => {
    console.log(`✅ STATUS: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('📥 RESPONSE:', data);
        try {
            const parsed = JSON.parse(data);
            if (res.statusCode === 200) {
                console.log('🎉 SUCCESS: User created!');
                console.log('👤 User ID:', parsed.data?._id || parsed.id);
            } else {
                console.log('❌ ERROR:', parsed.message || 'Unknown error');
            }
        } catch (e) {
            console.log('❌ PARSE ERROR:', e.message);
        }
    });
});

req.on('error', (e) => {
    console.error('❌ REQUEST ERROR:', e.message);
});

req.write(postData);
req.end();
