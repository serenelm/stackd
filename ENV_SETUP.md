# Environment Variables Guide

## Backend Configuration (.env)

Create `backend/.env` file with:

```
# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Production Example
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://stackd.vercel.app
```

## Frontend Configuration (.env)

Create `frontend/.env` file with:

```
# API Base URL
VITE_API_URL=http://localhost:5000
```

### Production Example
```
VITE_API_URL=https://stackd-api.herokuapp.com
```

## Deployment Platforms

### Vercel (Frontend)
Set environment variables in Vercel dashboard:
- `VITE_API_URL` → your backend URL

### Heroku (Backend)
```bash
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://yourdomain.com
```

### Railway / Render
Similar to Heroku, set env vars in dashboard

### Docker
Set in docker-compose.yml or Dockerfile

---

**Note**: Never commit `.env` files to git. Use `.env.example` as template.
