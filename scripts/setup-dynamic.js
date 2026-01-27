#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Dynamic Tapaal Management System...\n');

async function setup() {
    try {
        // 1. Check if .env file exists
        const envPath = path.join(__dirname, '../.env');
        if (!fs.existsSync(envPath)) {
            console.log('📝 Creating .env file...');
            const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tapaal_db"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API
API_BASE_URL="http://localhost:3001"
`;
            fs.writeFileSync(envPath, envContent);
            console.log('✅ .env file created. Please update your DATABASE_URL');
        }

        // 2. Install dependencies
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });

        // 3. Generate Prisma client
        console.log('🔧 Generating Prisma client...');
        execSync('npx prisma generate', { stdio: 'inherit' });

        // 4. Push database schema
        console.log('🗄️ Pushing database schema...');
        try {
            execSync('npx prisma db push', { stdio: 'inherit' });
        } catch (error) {
            console.log('⚠️  Database push failed. Please ensure your PostgreSQL database is running and DATABASE_URL is correct.');
            console.log('   Run: npx prisma db push manually after fixing database connection');
        }

        // 5. Seed the database
        console.log('🌱 Seeding database...');
        try {
            execSync('node prisma/seed-dynamic.js', { stdio: 'inherit' });
        } catch (error) {
            console.log('⚠️  Database seeding failed. Please run it manually:');
            console.log('   node prisma/seed-dynamic.js');
        }

        // 6. Start the development server
        console.log('\n🎉 Setup completed!');
        console.log('\n📋 Next steps:');
        console.log('1. Update your DATABASE_URL in .env file');
        console.log('2. Make sure PostgreSQL is running');
        console.log('3. Run: npx prisma db push');
        console.log('4. Run: node prisma/seed-dynamic.js');
        console.log('5. Start the server: npm run dev');
        console.log('\n🔗 Available endpoints:');
        console.log('   Frontend: http://localhost:3000');
        console.log('   API: http://localhost:3001');
        console.log('   API Docs: http://localhost:3001/api/v1/system/overview');

    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        process.exit(1);
    }
}

setup();
