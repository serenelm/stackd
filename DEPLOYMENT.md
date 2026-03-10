# Deployment Guide for stackd

## Quick Deployment

### Option 1: Vercel + Heroku (Recommended for Hackathons)

#### Deploy Frontend to Vercel
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

Set environment variable in Vercel:
- Name: `VITE_API_URL`
- Value: `https://stackd-backend.herokuapp.com`

#### Deploy Backend to Heroku
```bash
cd backend
heroku login
heroku create stackd-backend
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://stackd.vercel.app
git push heroku main
```

### Option 2: Railway.app (All-in-One)

1. Push to GitHub
2. Connect to railway.app
3. Deploy both services
4. Set environment variables
5. Access via Railway URLs

### Option 3: Docker + Render/Fly.io

#### Build Docker Images
```bash
docker build -t stackd-backend ./backend
docker build -t stackd-frontend ./frontend
```

#### Deploy to Render
1. Connect GitHub repo
2. Create services for backend and frontend
3. Set environment variables
4. Deploy

### Option 4: Traditional VPS (DigitalOcean, Linode, AWS EC2)

```bash
# SSH into server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/stackd.git
cd stackd

# Backend
cd backend
npm install --production
npm start &

# Frontend (build)
cd ../frontend
npm install
npm run build

# Serve frontend with nginx or similar
```

## Environment Variables for Deployment

### Backend Production
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Frontend Production
```
VITE_API_URL=https://api.yourdomain.com
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d yourdomain.com
```

### Configure Nginx
```nginx
server {
  listen 443 ssl;
  server_name api.yourdomain.com;
  
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
  
  location / {
    proxy_pass http://localhost:5000;
  }
}
```

## Database Integration (Future)

When ready to connect to a real database:

### MongoDB
```javascript
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
```

### PostgreSQL
```javascript
import pg from 'pg';

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
});
```

## Monitoring & Logging

### PM2 (Process Manager)
```bash
npm install -g pm2

pm2 start backend/server.js --name "stackd-api"
pm2 startup
pm2 save
```

### Cloud Logging
- Heroku: Built-in logs via `heroku logs`
- Vercel: Built-in logs in dashboard
- Railway: Built-in logs in dashboard

### Third-party Services
- Sentry for error tracking
- LogRocket for frontend monitoring
- DataDog for infrastructure

## Performance Optimization

### Frontend
- Minification (automatic with `npm run build`)
- Image optimization (CDN, lazy loading)
- Code splitting with React.lazy()

### Backend
- Load balancing with multiple instances
- Database indexing
- Redis caching for API responses
- Gzip compression

## Security Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS / SSL certificates
- [ ] Set strong environment secret variables
- [ ] Configure CORS properly
- [ ] Rate limiting on API endpoints
- [ ] Hide sensitive data from logs
- [ ] Use security headers (helmet.js)
- [ ] Validate all user inputs
- [ ] Keep dependencies updated

## Cost Estimates

| Platform | Service | Cost |
|----------|---------|------|
| Vercel | Frontend | Free - $20/mo |
| Heroku | Backend | $7/mo (eco dyno) |
| Railway | Both | Free - $20/mo |
| DigitalOcean | VPS | $5+/mo |
| AWS | Free tier | Free for 12 months |

## Troubleshooting

### Service won't start
- Check logs: `heroku logs --tail`
- Verify environment variables
- Ensure port is exposed

### CORS errors
- Check FRONTEND_URL matches actual domain
- Verify backend CORS configuration
- Check API base URL in frontend .env

### Database connection fails
- Verify connection string
- Check network access rules
- Test with managed database service

### Performance issues
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategy
- Monitor with performance tools

## Auto-Deployment

### GitHub Actions (CI/CD)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Heroku
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "stackd-backend"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
```

---

**Pro Tips for Hackathon Judges:**
1. Deploy early to show live version
2. Use custom domain for professionalism
3. Add CDN for faster loading
4. Monitor uptime with status page
5. Prepare rollback plan if needed

Good luck! 🚀
