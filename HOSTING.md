# API Hosting Guide for Tapaal Backend

## 🚀 Quick Hosting Options

### Option 1: Vercel (Recommended - Free)
**Best for:** Quick deployment, serverless functions, free tier

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from backend folder:**
   ```bash
   cd backend
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `GEMINI_API_KEY` - Your Gemini API key

### Option 2: Railway (Easy - $5/month)
**Best for:** Simple Node.js hosting, built-in database

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and deploy:**
   ```bash
   railway login
   cd backend
   railway up
   ```

### Option 3: Render (Free Tier Available)
**Best for:** Free hosting for small projects

1. **Create `render.yaml`:**
   ```yaml
   services:
     - type: web
       name: tapaal-api
       env: node
       buildCommand: cd server && npm install
       startCommand: cd server && npm start
       envVars:
         - key: NODE_ENV
           value: production
   ```

2. **Connect your GitHub repo to Render**

### Option 4: DigitalOcean App Platform ($5/month)
**Best for:** Scalable hosting, good performance

1. **Create `do-app.yaml`:**
   ```yaml
   name: tapaal-api
   services:
     - name: api
       source_dir: /server
       github:
         repo: your-username/tapaal
         branch: main
       run_command: npm start
       environment_slug: node-js
       instance_count: 1
       instance_size_slug: basic-xxs
   ```

## 📋 Environment Variables Setup

### Required for all hosts:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tapaal
JWT_SECRET=your_super_secure_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
PORT=5000
```

### MongoDB Setup (if using cloud):
1. **MongoDB Atlas (Free):**
   - Go to https://www.mongodb.com/atlas
   - Create free cluster
   - Get connection string
   - Add your IP to whitelist

2. **Update your MONGODB_URI:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/tapaal?retryWrites=true&w=majority
   ```

## 🔧 Configuration Updates

### Update frontend API URL:
```bash
# frontend/.env
VITE_API_URL=https://your-api-domain.vercel.app/api
```

### CORS Configuration (already set):
Your server already has CORS configured for all origins.

## 🚦 Testing Your Hosted API

After deployment, test these endpoints:
- `GET https://your-domain.vercel.app/api/health`
- `POST https://your-domain.vercel.app/api/chatbot`
- `GET https://your-domain.vercel.app/api/departments`

## 💡 Pro Tips

1. **Always use HTTPS in production**
2. **Set up proper environment variables**
3. **Use MongoDB Atlas for database**
4. **Enable logging for debugging**
5. **Set up monitoring/alerts**

## 🆘 Common Issues

**Port Issues:** Most platforms handle port automatically
**CORS Issues:** Already configured in your server
**Database Connection:** Use MongoDB Atlas string format
**Environment Variables:** Set them in hosting dashboard, not .env file

## 📞 Support

- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- Render: https://render.com/docs
- DigitalOcean: https://docs.digitalocean.com/products/app-platform
