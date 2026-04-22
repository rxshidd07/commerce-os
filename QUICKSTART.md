# Quick Start Guide - Commerce OS

## 🚀 Start Building Immediately

### 1. **Development Server** (Already Running ✅)

```bash
npm run dev
```

Server running at: **http://localhost:3000**

### 2. **Login to Dashboard**

Use these demo credentials:
```
Email:    demo@commerce.os
Password: password
```

### 3. **Explore the Platform**

#### 📊 Dashboard
- See real-time metrics
- View revenue charts
- Check recent activity
- Monitor API usage

#### 🛍️ Products
- View sample products
- Create new products
- Edit existing products
- Delete products
- Search by name/SKU

#### 📦 Orders
- View all orders
- Filter by status
- Check customer details
- Track order totals
- See payment/shipping status

#### 💳 Payments
- View payment methods (Card, UPI, Wallet)
- See transaction history
- Monitor success rates
- Check payment volume

#### 🤖 AI Tools
- Generate product descriptions
- Get pricing suggestions
- View sales forecasts
- See recommendations

#### 📈 Analytics
- Revenue trends
- Top products
- Payment methods distribution
- Customer insights

#### 🔌 API Docs
- Complete endpoint reference
- Code examples
- Usage information
- Rate limits

#### ⚙️ Settings
- Manage account
- View API keys
- Update profile

---

## 🛠️ Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

---

## 📝 Sample Data Included

The platform comes with:
- 1 demo user account
- 3 sample products
- Multiple mock orders
- Transaction data
- Analytics data

---

## 🔑 API Testing

All endpoints are fully functional:

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -b "auth-token=YOUR_TOKEN" \
  -d '{
    "title": "New Product",
    "price": 99.99,
    "sku": "PROD-001",
    "inventory": 10,
    "category": "Electronics"
  }'
```

### Get Products
```bash
curl http://localhost:3000/api/products \
  -b "auth-token=YOUR_TOKEN"
```

### Create an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -b "auth-token=YOUR_TOKEN" \
  -d '{
    "customer_email": "customer@example.com",
    "customer_name": "John Doe",
    "total": 199.99
  }'
```

---

## 🎨 UI Features to Try

1. **Hover Effects**
   - Hover over cards to see animations
   - Buttons have smooth transitions

2. **Animations**
   - Page load animations
   - Animated counters
   - Chart animations
   - Loading spinners

3. **Responsiveness**
   - Resize browser to see mobile layout
   - Test on different devices
   - Check tablet view

4. **Dark Theme**
   - Glassmorphism cards
   - Gradient backgrounds
   - Smooth color transitions

---

## 📊 Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/auth/login` | Login |
| `/auth/signup` | Register |
| `/dashboard` | Main dashboard |
| `/products` | Products list |
| `/orders` | Orders list |
| `/payments` | Payment system |
| `/ai` | AI tools |
| `/analytics` | Analytics |
| `/api-docs` | API reference |
| `/settings` | Account settings |

---

## 🔐 Authentication

The system uses JWT tokens:
- Tokens stored in httpOnly cookies
- 30-day expiry
- Automatic logout on invalid token
- Protected routes with middleware

---

## 💾 Data

**Important**: Data is stored in memory:
- Resets when server restarts
- Use for development/testing
- Ready for real database integration

To integrate a real database:
1. Replace `lib/db.ts`
2. Connect Supabase/PostgreSQL
3. Update API endpoints
4. Done!

---

## 🚨 Troubleshooting

### Server won't start
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Build errors
```bash
npm run build -- --debug
```

### CSS not loading
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Check `app/globals.css`

---

## 📖 Documentation

- **README.md** - Full project documentation
- **IMPLEMENTATION_COMPLETE.md** - What was built
- **API pages** - In-app API documentation

---

## 🎯 Common Tasks

### Add a Product
1. Go to `/products`
2. Click "+ Add Product"
3. Fill in details
4. Click "Create Product"

### Create an Order
1. Go to `/orders` 
2. Use API or in-app form
3. Enter customer details
4. Confirm order

### Change Payment Method
1. Go to `/payments`
2. Click "Enable" on any method
3. See transaction history

### Generate AI Description
1. Go to `/ai`
2. Enter product title
3. Click "Generate Description"
4. Copy result

### View Analytics
1. Go to `/analytics`
2. See revenue charts
3. Check product performance
4. View payment distribution

---

## 💡 Tips & Tricks

1. **Search Everywhere**
   - Products page has search
   - Orders have filters
   - Use keyboard shortcuts

2. **Mobile Testing**
   - Open DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test different sizes

3. **API Key**
   - Go to Settings
   - View your API key
   - Use in custom integrations

4. **Dark Theme**
   - Automatic based on OS preference
   - Works perfectly in dark mode

5. **Keyboard Navigation**
   - Tab through forms
   - Enter to submit
   - Esc to close dialogs

---

## 🚀 Production Checklist

Before deploying:

- [ ] Update environment variables
- [ ] Connect real database
- [ ] Setup payment gateway
- [ ] Configure email (optional)
- [ ] Add SSL certificate
- [ ] Setup domain
- [ ] Configure CDN
- [ ] Enable monitoring
- [ ] Setup backups
- [ ] Test all features

---

## 📞 Need Help?

1. Check **README.md**
2. Review **IMPLEMENTATION_COMPLETE.md**
3. Check inline code comments
4. Review API documentation
5. Check TypeScript types

---

## ✨ What's Next?

After exploring:

1. **Integrate Database**
   - Use Supabase
   - Or PostgreSQL
   - Or Firebase

2. **Add Payments**
   - Integrate Razorpay
   - Or Stripe
   - Or PayPal

3. **Setup Email**
   - SendGrid
   - Mailgun
   - AWS SES

4. **Deploy to Production**
   - Deploy to Vercel
   - Setup domain
   - Enable monitoring

---

**Happy building! 🚀**

*The invisible infrastructure powering modern commerce ⚙️*
