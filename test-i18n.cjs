// Simple test to check if translation files exist and are valid JSON
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing i18n translation files...');

const localesPath = path.join(__dirname, 'src', 'locales');
const languages = ['en', 'hi', 'mr'];

languages.forEach(lang => {
    const filePath = path.join(localesPath, lang, 'translation.json');
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const translations = JSON.parse(content);
            console.log(`✅ ${lang.toUpperCase()}: ${Object.keys(translations).length} keys loaded`);
            
            // Test some specific keys
            if (translations.department && translations.department.title) {
                console.log(`   📝 Department title: ${translations.department.title}`);
            }
            if (translations.common && translations.common.save) {
                console.log(`   📝 Common save: ${translations.common.save}`);
            }
        } else {
            console.log(`❌ ${lang.toUpperCase()}: File not found at ${filePath}`);
        }
    } catch (error) {
        console.log(`❌ ${lang.toUpperCase()}: Error reading file - ${error.message}`);
    }
});
