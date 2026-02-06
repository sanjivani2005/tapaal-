const http = require('http');

function testMessage(message) {
    const postData = JSON.stringify({ message });

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

    console.log(`\n🧪 Testing: "${message}"`);

    const req = http.request(options, (res) => {
        console.log(`✅ STATUS: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            const parsed = JSON.parse(data);
            console.log('🤖 AI RESPONSE:', parsed.response);
        });
    });

    req.on('error', (e) => {
        console.error('❌ ERROR:', e.message);
    });

    req.write(postData);
    req.end();
}

// Test AI-only approach
testMessage('hello');
setTimeout(() => testMessage('track 6983b3943b17251bb5d2bcd7'), 2000);
setTimeout(() => testMessage('show statistics'), 4000);
setTimeout(() => testMessage('help me'), 6000);
