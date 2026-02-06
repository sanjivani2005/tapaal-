const http = require('http');

const postData = JSON.stringify({
    message: 'Show users list'
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

console.log('🧪 Testing chatbot with "Show users list"...');

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
                console.log('🎉 SUCCESS: Chatbot responded!');
                console.log('🤖 AI Response:', parsed.response);
            } else {
                console.log('❌ ERROR:', parsed.response || 'Unknown error');
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
