# stackd 📊

> Your unified wealth wellness dashboard. Stack smarter.

A modern FinTech prototype that aggregates assets across multiple categories (cash, stocks, crypto, real estate, private investments) and provides comprehensive financial wellness analytics with personalized recommendations.

- **Unified Net Worth**: See your complete financial picture at a glance
- **Asset Aggregation**: Combine assets from cash, stocks, crypto, real estate, and private investments
- **Diversification Analysis**: Understand how well your portfolio is diversified
- **Liquidity Scoring**: Know how quickly you can access your funds
- **Risk Assessment**: Identify concentration risks in your portfolio
- **Financial Health Score**: Get a comprehensive wellness score
- **Smart Recommendations**: Receive personalized, actionable insights

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:5000`

Make sure you have a `backend/.env` file (you can copy from `.env.example`) with at least:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

API Endpoints:
- `GET /health` - Health check
- `GET /api/assets` - Aggregated assets
- `GET /api/wellness` - Financial wellness metrics
- `GET /api/recommendations` - Personalized insights
- `GET /api/dashboard` - Complete dashboard data

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will open at `http://localhost:3000`

Make sure you have a `frontend/.env` file (you can copy from `.env.example`) with at least:

```env
VITE_API_URL=http://localhost:5000
```

### One-command dev (optional)

If you prefer to start both apps at once from the project root:

```bash
npm install
npm run dev
```

This uses `concurrently` to run `backend` and `frontend` together. If this ever fails, you can always fall back to starting the backend and frontend in **separate terminals** using the steps above.

## 📦 Project Structure

```
stackd/
├── backend/
│   ├── server.js                 # Express server
│   ├── routes/api.js            # API endpoints
│   ├── data/mockData.js         # Mock data & calculations
│   ├── package.json
│   ├── .env
│   └── .env.example
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── WellnessScore.jsx
│   │   ├── config/api.js        # API client
│   │   ├── App.jsx
│   ├── vite.config.js
│   └── .env.example
└── README.md
```


- **Modern Gen Z Aesthetic**: Clean, all-lowercase branding
- **Responsive Layout**: Works on desktop and mobile
- **Smooth Animations**: Interactive elements with hover effects
- **Color Gradient**: Modern purple-to-pink gradient for primary brand
- **Card-Based UI**: Clear information hierarchy with card components
- **Real-time Data**: Mock data served from backend API


### Backend
- **Express.js**: Lightweight web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **Node.js**: JavaScript runtime

### Frontend
- **React 18**: UI library
- **Vite**: Fast build tool
- **Recharts**: Chart visualization library
- **Axios**: HTTP client
- **CSS3**: Modern styling with gradients and flexbox

## 💾 Mock Data
The application includes realistic mock data with:
- 6 different asset categories
- Total net worth of ~$810k
- Diversification and liquidity calculations
- Risk assessment algorithms
- Personalized recommendation engine

Data is stored in `backend/data/mockData.js` and can be easily replaced with real APIs.

## 📊 Financial Wellness Metrics

### Diversification Score (0-100)
Uses Herfindahl Index to measure portfolio concentration

### Liquidity Score (0-100)
Based on percentage of liquid assets (cash, stocks, crypto)

### Concentration Risk (0-100)
Measures risk of over-concentration in single asset class

### Overall Health Score (0-100)
Weighted composite of diversification (0.4), liquidity (0.3), and risk (0.3)

## 🚢 Deployment

### Environment Variables

**Backend (.env)**
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

**Frontend (.env)**
```
VITE_API_URL=https://api.yourdomain.com
```

### Deployment Options

#### Vercel (Frontend)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

#### Heroku (Backend)
```bash
cd backend
heroku create stackd-backend
heroku config:set NODE_ENV=production
git push heroku main
```

#### Docker (Both)
Create a Dockerfile in root:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## 🎯 Features for Hackathon Judges

✅ **Complete Full-Stack**: Both frontend and backend fully functional
✅ **Professional UI**: Modern design with smooth animations
✅ **Real Data Flow**: Frontend-backend integration working
✅ **Responsive Design**: Works on mobile and desktop
✅ **Smart Analytics**: Actual financial wellness calculations
✅ **Deployment Ready**: Environment variables, CORS, error handling
✅ **Clean Code**: Modular, well-organized architecture
✅ **Polished**: No console errors, smooth user experience

## 🔮 Future Enhancements

- Real API integration (Plaid, Alpaca, Crypto APIs)
- User authentication
- Portfolio rebalancing recommendations
- Historical trend analysis
- Real-time price updates
- Machine learning risk scoring
- Export reports as PDF

## 📝 License

MIT

## 👥 Built for

FinTech Hackathon 2026

---

**stackd** - *Your wealth, unified. Your growth, accelerated.*
