const http = require('http');

const postData = JSON.stringify({
    message: "Show system statistics"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/chatbot/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('🧪 Testing statistics query...');

const req = http.request(options, (res) => {
    console.log(`✅ STATUS: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('📊 RESPONSE:', data);
        const parsed = JSON.parse(data);
        console.log('🤖 AI REPLY:', parsed.response);
    });
});

req.on('error', (e) => {
    console.error('❌ ERROR:', e.message);
});

req.write(postData);
req.end();
