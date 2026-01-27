import { dynamicApiService } from '../src/app/services/api-client.js';

console.log('🧪 Testing Dynamic API Service...\n');

async function testDynamicAPI() {
    try {
        // Test 1: System Overview
        console.log('1️⃣ Testing System Overview...');
        const systemOverview = await dynamicApiService.getSystemOverview();
        console.log('✅ System Overview:', systemOverview);

        // Test 2: Inward Mails
        console.log('\n2️⃣ Testing Inward Mails...');
        const inwardMails = await dynamicApiService.getInwardMails();
        console.log(`✅ Found ${inwardMails.length} inward mails`);

        // Test 3: Outward Mails
        console.log('\n3️⃣ Testing Outward Mails...');
        const outwardMails = await dynamicApiService.getOutwardMails();
        console.log(`✅ Found ${outwardMails.length} outward mails`);

        // Test 4: Users
        console.log('\n4️⃣ Testing Users...');
        const users = await dynamicApiService.getUsers();
        console.log(`✅ Found ${users.length} users`);

        // Test 5: Departments
        console.log('\n5️⃣ Testing Departments...');
        const departments = await dynamicApiService.getDepartments();
        console.log(`✅ Found ${departments.length} departments`);

        // Test 6: Search
        console.log('\n6️⃣ Testing Search...');
        const searchResults = await dynamicApiService.searchAll('tax');
        console.log(`✅ Search results:`, {
            inwardMails: searchResults.inwardMails.length,
            outwardMails: searchResults.outwardMails.length,
            users: searchResults.users.length,
            departments: searchResults.departments.length,
            tracking: searchResults.tracking.length
        });

        console.log('\n🎉 All API tests completed successfully!');

    } catch (error) {
        console.error('❌ API Test failed:', error.message);
        console.log('\n💡 Make sure the API server is running on http://localhost:3001');
        console.log('   Start it with: npm run dev');
    }
}

testDynamicAPI();
