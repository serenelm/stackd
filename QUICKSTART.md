# stackd - Quick Launch Guide

## 🎯 What You Have

A complete, deployment-ready FinTech dashboard prototype with:
- ✅ Full-stack React + Node.js architecture
- ✅ Working API backend with 4+ endpoints
- ✅ Beautiful, responsive dashboard UI
- ✅ Financial wellness calculations
- ✅ Personalized recommendations
- ✅ Docker & deployment configs
- ✅ Modern styling with gradients
- ✅ Zero dependencies conflicts

## 🚀 Launch in 2 Minutes

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```
✓ Backend ready on http://localhost:5000

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```
✓ Frontend ready on http://localhost:3000

**Done!** You should see the dashboard load automatically.

## 📊 What It Shows

1. **Total Net Worth** - $810,000 aggregate across all assets
2. **Asset Allocation** - Pie chart showing distribution
3. **Wellness Scores** - 4 metrics (Diversification, Liquidity, Risk, Health)
4. **Asset List** - All 6 asset categories with individual amounts
5. **Recommendations** - 3-5 personalized insights and actions

## 🧪 Test the API

```bash
# Check backend health
curl http://localhost:5000/health

# Get all assets
curl http://localhost:5000/api/assets

# Get wellness metrics
curl http://localhost:5000/api/wellness

# Get recommendations
curl http://localhost:5000/api/recommendations

# Get complete dashboard
curl http://localhost:5000/api/dashboard
```

## 📁 Key Files to Know

**Backend:**
- `backend/server.js` - Main server (entry point)
- `backend/routes/api.js` - API endpoints
- `backend/data/mockData.js` - All calculations & mock data

**Frontend:**
- `frontend/src/App.jsx` - Main app component
- `frontend/src/components/Dashboard.jsx` - Dashboard layout
- `frontend/src/config/api.js` - API client configuration

## 🎨 Customization

### Change Mock Data
Edit `backend/data/mockData.js` - update `mockUserAssets` object with your own values

### Change Colors
Edit `frontend/src/App.css` - update CSS variables in `:root`

### Change API URL
Edit `frontend/.env` - update `VITE_API_URL` value

## 🚢 Deploy to Production

### Frontend to Vercel (Free)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend to Heroku (Free tier)
```bash
cd backend
heroku create stackd-backend
npm start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🐛 Troubleshooting

**Port 5000 already in use?**
```bash
# Change in backend/.env: PORT=5001
```

**CORS errors in console?**
- Make sure backend is running on 5000
- Check frontend/.env has correct VITE_API_URL

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- [README.md](./README.md) - Full project overview
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment variables

## ✨ What Makes It Hackathon-Ready

1. **Complete**: Both frontend and backend working
2. **Live**: Can be deployed and accessible online
3. **Professional**: Modern UI with real financial logic
4. **Extensible**: Easy to modify data and endpoints
5. **No Errors**: Clean code, proper error handling
6. **Responsive**: Works on phones, tablets, desktop
7. **Fast**: Optimized assets and efficient calculations

## 🎯 Demo Flow for Judges

1. Show dashboard loading
2. Point out net worth and allocation
3. Explain wellness scores
4. Show recommendations (explain the logic)
5. Open DevTools → Network tab → show API calls
6. Mention deployment ready (show .env, docker-compose)
7. Show code organization (backend routes, frontend components)

## 🚀 Next Steps

1. Customize with real data
2. Add user authentication
3. Connect to real APIs (Plaid, Alpha Vantage, etc.)
4. Add database (MongoDB, PostgreSQL)
5. Implement user accounts
6. Add more visualizations

---

**You're ready to demo! Good luck! 🎉**
