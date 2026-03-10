# Development Guide for stackd

## Getting Started

### One-Command Setup (Requires concurrently)
```bash
npm install concurrently
npm run install-all
npm run dev
```

This will start both backend and frontend simultaneously.

### Manual Setup

#### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```

#### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```

## Backend Development

### File Structure
- `server.js` - Main Express server entry point
- `routes/api.js` - API route handlers
- `data/mockData.js` - Mock data and financial calculations

### Adding New Endpoints

Edit `routes/api.js`:
```javascript
router.get('/api/new-route', (req, res) => {
  try {
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Modifying Mock Data

Edit `data/mockData.js` to change:
- Asset categories and amounts
- Calculation algorithms
- Recommendation rules

## Frontend Development

### File Structure
- `src/App.jsx` - Main app component
- `src/components/` - Reusable React components
- `src/config/api.js` - API client configuration

### Creating New Components

1. Create component file: `src/components/MyComponent.jsx`
2. Create styles: `src/components/MyComponent.css`
3. Import in parent component

Example:
```javascript
import MyComponent from './components/MyComponent';

export default function App() {
  return <MyComponent data={data} />;
}
```

### Styling

Uses **CSS modules** approach with:
- CSS Grid for layouts
- Flexbox for alignment
- CSS variables for theming
- Media queries for responsive design

### Changing Colors

Update colors in `src/App.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #4facfe 0%, #43e97b 100%);
}
```

## API Integration

The frontend uses axios client configured in `src/config/api.js`:

```javascript
import { fetchDashboard } from '../config/api';

useEffect(() => {
  fetchDashboard()
    .then(data => setData(data.data))
    .catch(error => setError(error));
}, []);
```

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Debugging

### Backend
1. Check logs in terminal
2. Visit `http://localhost:5000/health` to verify server is running
3. API responses include error messages

### Frontend
1. Open browser DevTools (F12)
2. Check Console for JavaScript errors
3. Check Network tab for API calls
4. Verify VITE_API_URL environment variable

## Testing Endpoints

### Using curl
```bash
curl http://localhost:5000/api/dashboard

curl http://localhost:5000/api/assets

curl http://localhost:5000/api/wellness
```

### Using Postman
1. Create new request
2. Method: GET
3. URL: http://localhost:5000/api/endpoint
4. Send

## Build for Production

### Backend
No build step needed. Just ensure dependencies are installed:
```bash
cd backend
npm install --production
```

### Frontend
```bash
cd frontend
npm run build
```

This creates a `dist/` folder with optimized production build.

## Common Issues

### Backend not starting
- Check if port 5000 is available
- Verify Node.js version (16+)
- Run `npm install` in backend folder

### Frontend not connecting to backend
- Verify backend is running (`http://localhost:5000/health`)
- Check VITE_API_URL in frontend/.env
- Check browser console for CORS errors

### Module not found errors
- Run `npm install` in the affected folder
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Deployment Checklist

- [ ] Set environment variables for production
- [ ] Build frontend: `npm run build`
- [ ] Test production build locally
- [ ] Update API URLs to production domain
- [ ] Configure CORS for production domain
- [ ] Set NODE_ENV=production
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Test all API endpoints
- [ ] Check browser console for errors

## Performance Optimization

### Frontend
- Recharts components are optimized for performance
- CSS gradients use `will-change` for smooth animations
- Images could be optimized with lazy loading

### Backend
- API responses are trimmed of unnecessary data
- CORS configured appropriately
- Error handling prevents crashes

## Next Steps

1. **Real Data Integration**: Replace mock data with real APIs
2. **Authentication**: Add user login/signup
3. **Database**: Store user data persistently
4. **Analytics**: Add more visualization types
5. **Mobile App**: Convert to React Native

---

Happy coding! 🚀
