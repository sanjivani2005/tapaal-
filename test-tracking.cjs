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
            console.log('🤖 RESPONSE:', parsed.response);
        });
    });

    req.on('error', (e) => {
        console.error('❌ ERROR:', e.message);
    });

    req.write(postData);
    req.end();
}

// Test mail tracking commands
testMessage('track mail');
setTimeout(() => testMessage('track INW-2026-703'), 1000);
setTimeout(() => testMessage('status of TRK-1'), 2000);
setTimeout(() => testMessage('help'), 3000);
