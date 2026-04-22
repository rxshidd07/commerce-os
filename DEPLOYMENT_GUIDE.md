# 🚀 Deployment Guide - Commerce OS

Complete guide to publish and deploy Commerce OS to GitHub and production.

---

## 📋 Table of Contents

1. [GitHub Setup](#github-setup)
2. [Vercel Deployment](#vercel-deployment)
3. [Environment Configuration](#environment-configuration)
4. [Post-Deployment](#post-deployment)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 GitHub Setup

### Step 1: Create a New GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in details:
   - **Repository name:** `commerce-os`
   - **Description:** "API-first commerce infrastructure platform"
   - **Visibility:** Public (for portfolio) or Private (for production)
   - **DO NOT initialize with README** (we already have one)

3. Click **"Create repository"**

### Step 2: Add Remote and Push

In your terminal, run:

```bash
cd c:\Users\iquba\commerce-os

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/commerce-os.git

# Rename branch to main (optional, but recommended for GitHub)
git branch -M main

# Push all commits
git push -u origin main
```

You should see:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to 8 threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
Total XX (delta XX), reused XX (delta XX), pack-reused 0
To https://github.com/YOUR_USERNAME/commerce-os.git
 * [new branch]      main -> main
Branch 'main' is set to track remote branch 'main' from 'origin'.
```

### Step 3: Verify on GitHub

- Visit `https://github.com/YOUR_USERNAME/commerce-os`
- You should see:
  - ✅ All files committed
  - ✅ README.md with full documentation
  - ✅ LICENSE file
  - ✅ All source code
  - ✅ Package.json with dependencies

---

## 🌐 Vercel Deployment

### Option A: Automatic Deployment (Recommended)

#### Step 1: Sign Up on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account
4. You'll be redirected to Vercel dashboard

#### Step 2: Import Project

1. Click **"Add New"** → **"Project"**
2. Click **"Import Git Repository"**
3. Paste: `https://github.com/YOUR_USERNAME/commerce-os`
4. Click **"Continue"**

#### Step 3: Configure Project

Vercel will auto-detect Next.js. Settings should show:

```
Framework:        Next.js
Build Command:    npm run build
Output Directory: .next
Install Command:  npm install
```

Leave defaults and click **"Deploy"**

#### Step 4: Wait for Deployment

You'll see build logs. The build should complete in ~2-3 minutes:

```
✅ Deployment successful!
🎉 Your project is live at: https://commerce-os-xxxxx.vercel.app
```

#### Step 5: Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Update DNS records at your domain provider

### Option B: Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd c:\Users\iquba\commerce-os
vercel

# For production
vercel --prod
```

---

## 🔐 Environment Configuration

### Production Environment Variables

Create `.env.production` for Vercel:

```env
# API Base URL (for client-side API calls)
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app

# JWT Secret (generate a new one for production)
JWT_SECRET=your-super-secret-jwt-key-generate-this

# Database (when ready to integrate real DB)
DATABASE_URL=your_postgres_or_firebase_url

# Payment Gateway (when ready)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Service (optional)
SENDGRID_API_KEY=your_sendgrid_key

# AI Service (optional)
OPENAI_API_KEY=your_openai_key
```

### Set Environment Variables on Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable with Production scope
5. Click **"Save"**

Vercel will automatically redeploy when you add variables.

---

## ✅ Post-Deployment Checklist

### Testing

- [ ] Visit your deployed URL
- [ ] Test landing page loads
- [ ] Test login page (try demo account)
- [ ] Test signup (create new account)
- [ ] Test API endpoints from API docs page
- [ ] Test responsive design on mobile

### Security

- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set strong JWT_SECRET
- [ ] Configure CORS if needed
- [ ] Review middleware protection
- [ ] Test protected routes redirect to login

### Performance

- [ ] Check Lighthouse score (aim for 80+)
- [ ] Verify images load optimized
- [ ] Test API response times
- [ ] Monitor build size

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Enable analytics (Vercel Analytics)
- [ ] Configure uptime monitoring
- [ ] Set up email alerts

### Documentation

- [ ] Update API docs with live URL
- [ ] Add deployed link to GitHub README
- [ ] Create installation guide for users
- [ ] Document environment setup

---

## 📊 Monitoring & Analytics

### Enable Vercel Analytics

1. Go to project **Settings**
2. Click **Analytics**
3. Click **Enable Web Analytics**
4. Add this to `next.config.ts`:

```typescript
export const analyticId = "your-analytics-id";
```

### Error Tracking (Sentry)

1. Sign up at [sentry.io](https://sentry.io)
2. Create new project (Next.js)
3. Install Sentry SDK:

```bash
npm install @sentry/nextjs
```

4. Add to root directory:

```bash
npx @sentry/wizard@latest -i nextjs
```

### Application Performance Monitoring

- Vercel provides built-in Web Vitals
- Check **Settings → Analytics** for metrics

---

## 🔄 Continuous Deployment

Your project is now set up for automatic CI/CD:

```
You push to main
    ↓
GitHub triggers webhook
    ↓
Vercel auto-builds
    ↓
Tests run (if configured)
    ↓
Deploy to production
```

### Setup Automatic Deployments

Vercel is already configured for:
- ✅ Auto-deploy on every push to `main`
- ✅ Preview deployments for pull requests
- ✅ Automatic rollback on failed builds

### Setup GitHub Actions (Optional)

Create `.github/workflows/test.yml`:

```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test  # Add tests later
```

---

## 🆘 Troubleshooting

### Build Fails on Vercel

**Error:** `npm ERR! 404 Not Found - GET https://registry.npmjs.org/...`

**Solution:**
```bash
# Clear cache and reinstall
npm ci --prefer-offline --no-audit
git add package-lock.json
git commit -m "fix: update package-lock"
git push
```

### Environment Variables Not Working

**Error:** `undefined` values in production

**Solution:**
1. Verify all env vars set in Vercel dashboard
2. Use `NEXT_PUBLIC_` prefix for client-side vars
3. Redeploy after setting variables
4. Check Deployment logs for env var values

### Custom Domain DNS Issues

**Problem:** "Pending" status for custom domain

**Solution:**
1. Go to Vercel → Settings → Domains
2. Copy the DNS records shown
3. Add to your domain provider's DNS settings
4. Wait 24-48 hours for propagation
5. Use `nslookup` to verify:
   ```bash
   nslookup yourdomain.com
   ```

### API 401 Unauthorized in Production

**Problem:** Protected endpoints return 401

**Solution:**
1. Verify JWT_SECRET is set in production
2. Check auth cookie is being set
3. Ensure tokens are valid (not expired)
4. Check CORS headers in middleware

### Performance Issues

**Problem:** Slow page loads or API responses

**Solution:**
1. Optimize images with Next.js Image component
2. Enable caching headers
3. Use API routes with `revalidate`
4. Monitor Vercel analytics
5. Check server logs for bottlenecks

---

## 📈 Growth Checklist

After deployment, consider:

- [ ] Add Google Analytics
- [ ] Setup email notifications
- [ ] Add error tracking (Sentry)
- [ ] Configure backups
- [ ] Setup CDN for static assets
- [ ] Enable rate limiting on API
- [ ] Add API monitoring
- [ ] Setup status page
- [ ] Create API terms of service
- [ ] Add usage tracking

---

## 🚀 Next Steps

1. **Share Your Project**
   ```bash
   # Share deployed URL
   https://commerce-os-xxxxx.vercel.app
   
   # Share GitHub
   https://github.com/YOUR_USERNAME/commerce-os
   ```

2. **Get Feedback**
   - Share with beta users
   - Collect feedback
   - Iterate based on feedback

3. **Enhance Features**
   - Integrate real database
   - Add Razorpay payments
   - Setup email service
   - Implement OpenAI features

4. **Scale Infrastructure**
   - Monitor usage metrics
   - Upgrade to Vercel Pro if needed
   - Setup redundancy
   - Optimize for high traffic

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Help:** https://docs.github.com
- **Troubleshooting:** See docs in repo

---

## ✅ Deployment Complete!

Your Commerce OS is now live and accessible worldwide! 🎉

**Quick Links:**
- 🌐 Live App: `https://commerce-os-xxxxx.vercel.app`
- 📦 GitHub: `https://github.com/YOUR_USERNAME/commerce-os`
- 📊 Vercel Dashboard: `https://vercel.com/dashboard`

**Share Your Success:**
- Tweet about it
- Add to portfolio
- Open source the project
- Gather community feedback

Happy deploying! 🚀
