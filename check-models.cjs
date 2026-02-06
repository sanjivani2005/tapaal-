const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log('🔍 Checking available models...');
        const models = await genAI.listModels();
        console.log('✅ Available Models:');
        models.models.forEach(model => {
            console.log(`- ${model.name} (Supported: ${model.supportedGenerationMethods?.join(', ') || 'None'})`);
        });
    } catch (error) {
        console.error('❌ Error listing models:', error.message);
    }
}

listModels();
