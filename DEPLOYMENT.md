# 🚀 Deployment Guide

Complete step-by-step guide to deploy Orbitfolio to production.

---

## 📋 Prerequisites

- GitHub account
- Supabase account (free tier)
- Vercel account (free tier)
- Google Cloud Console account (for OAuth)
- GitHub OAuth App (for GitHub login)

---

## 1️⃣ Setup Supabase

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: orbitfolio
   - **Database Password**: (generate strong password)
   - **Region**: Choose closest to your users
4. Wait for project to initialize (~2 minutes)

### Run Database Migration
1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Copy entire contents of `database.sql` file
4. Click "Run" to execute
5. Verify success message appears

### Get API Credentials
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`
3. Save these for later

### Configure OAuth Providers

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen:
   - User Type: External
   - App name: Orbitfolio
   - Support email: your email
6. Create OAuth Client ID:
   - Application type: Web application
   - Authorized redirect URIs: `https://xxxxx.supabase.co/auth/v1/callback`
7. Copy **Client ID** and **Client Secret**
8. In Supabase:
   - Go to **Authentication** → **Providers**
   - Enable **Google**
   - Paste Client ID and Secret
   - Save

#### GitHub OAuth
1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - Application name: Orbitfolio
   - Homepage URL: `https://your-domain.vercel.app`
   - Authorization callback URL: `https://xxxxx.supabase.co/auth/v1/callback`
4. Click **Register application**
5. Copy **Client ID**
6. Generate **Client Secret** and copy
7. In Supabase:
   - Go to **Authentication** → **Providers**
   - Enable **GitHub**
   - Paste Client ID and Secret
   - Save

---

## 2️⃣ Deploy to Vercel

### Option A: One-Click Deploy
1. Click the button in README:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/orbitfolio/orbitfolio)
2. Connect your GitHub account
3. Configure project:
   - **Project Name**: orbitfolio
   - **Framework Preset**: Next.js
4. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Click **Deploy**
6. Wait for deployment (~2 minutes)

### Option B: Manual Deploy via CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: orbitfolio
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your Supabase URL

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your Supabase anon key

# Deploy to production
vercel --prod
```

### Get Your Domain
After deployment, Vercel provides:
- **Production URL**: `https://orbitfolio.vercel.app`
- **Custom domain** (optional): Configure in Vercel dashboard

---

## 3️⃣ Update OAuth Redirect URLs

### Update Supabase Site URL
1. Go to Supabase **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://your-domain.vercel.app`
3. Add **Redirect URLs**:
   - `https://your-domain.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

### Update Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **Credentials**
4. Edit your OAuth 2.0 Client ID
5. Add to **Authorized redirect URIs**:
   - `https://your-domain.vercel.app/auth/callback`
6. Save

### Update GitHub OAuth
1. Go to [GitHub OAuth Apps](https://github.com/settings/developers)
2. Select your app
3. Update **Homepage URL**: `https://your-domain.vercel.app`
4. Update **Authorization callback URL**: `https://your-domain.vercel.app/auth/callback`
5. Save

---

## 4️⃣ Verify Deployment

### Test Authentication
1. Visit `https://your-domain.vercel.app`
2. Click "Continue with Google"
3. Authorize the app
4. Should redirect to `/dashboard`
5. Verify you see welcome message

### Test API Routes
1. Open browser console
2. Navigate to dashboard
3. Check Network tab for:
   - `/api/prices` - Should return 200
   - `/api/search` - Should return 200

### Test Database
1. In Supabase, go to **Table Editor**
2. Check `portfolios` table
3. Should see a row created for your user

---

## 5️⃣ Custom Domain (Optional)

### Add Custom Domain in Vercel
1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain (e.g., `orbitfolio.com`)
6. Follow DNS configuration instructions

### Update DNS Records
Add these records in your domain registrar:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Update OAuth URLs
Repeat Step 3 with your custom domain.

---

## 6️⃣ Monitoring & Maintenance

### Vercel Analytics
1. Go to Vercel dashboard
2. Select project → **Analytics**
3. View:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Supabase Monitoring
1. Go to Supabase dashboard
2. Check **Database** → **Usage**
3. Monitor:
   - Database size
   - Active connections
   - API requests

### Set Up Alerts
1. In Vercel, go to **Settings** → **Notifications**
2. Enable:
   - Deployment failures
   - Performance degradation
3. In Supabase, go to **Settings** → **Billing**
4. Set usage alerts at 80% of free tier

---

## 🔧 Troubleshooting

### OAuth Not Working
- Verify redirect URLs match exactly
- Check Supabase logs: **Authentication** → **Logs**
- Ensure OAuth providers are enabled

### API Routes Failing
- Check Vercel function logs
- Verify environment variables are set
- Test API routes directly: `https://your-domain.vercel.app/api/prices?symbols=AAPL`

### Database Connection Issues
- Verify Supabase credentials in Vercel env vars
- Check Supabase project status
- Review RLS policies in SQL Editor

### Build Failures
- Check Vercel deployment logs
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`

---

## 📊 Performance Optimization

### Enable Caching
Already configured in API routes:
```typescript
{ next: { revalidate: 300 } } // 5 minutes
```

### Optimize Images
Use Next.js Image component:
```tsx
import Image from 'next/image';
<Image src="/logo.png" width={200} height={200} alt="Logo" />
```

### Database Indexes
Already created in `database.sql`:
- `idx_portfolios_user_id`
- `idx_holdings_portfolio_id`
- `idx_holdings_symbol`

---

## 🎉 Success!

Your Orbitfolio instance is now live at:
- **Production**: `https://your-domain.vercel.app`
- **Dashboard**: `https://your-domain.vercel.app/dashboard`

Share with users and start tracking portfolios! 🚀

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/orbitfolio/orbitfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/orbitfolio/orbitfolio/discussions)
