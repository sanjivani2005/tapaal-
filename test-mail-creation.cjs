const http = require('http');

const testMail = {
    receivedBy: 'System Admin',
    handoverTo: 'System Admin',
    sender: 'sharyu',
    deliveryMode: 'Courier',
    details: 'tapaal updates',
    priority: 'Normal',
    department: 'IT',
    type: 'Inward'
};

const postData = JSON.stringify(testMail);

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/inward-mails',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('🧪 Testing mail creation with priority: Normal...');

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
                console.log('🎉 SUCCESS: Mail created!');
                console.log('📋 Mail ID:', parsed.data?._id || parsed.id);
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
