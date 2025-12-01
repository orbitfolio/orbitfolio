# ⚡ Quick Start Guide

Get Orbitfolio running in **5 minutes**!

---

## 🎯 What You'll Need

- Node.js 18+ installed
- A Supabase account (free)
- 5 minutes of your time

---

## 📦 Step 1: Clone & Install (1 min)

```bash
git clone https://github.com/orbitfolio/orbitfolio.git
cd orbitfolio
npm install
```

---

## 🔑 Step 2: Setup Supabase (2 min)

### Create Project
1. Go to [supabase.com](https://supabase.com) → Sign up/Login
2. Click **"New Project"**
3. Fill in:
   - Name: `orbitfolio`
   - Password: (generate strong password)
   - Region: (choose closest)
4. Wait ~2 minutes for setup

### Run Database Setup
1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy-paste entire `database.sql` file contents
4. Click **"Run"**
5. ✅ Should see success message

### Get Credentials
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

---

## 🔐 Step 3: Configure OAuth (1 min)

### Enable Google Login
1. In Supabase, go to **Authentication** → **Providers**
2. Find **Google** → Click **Enable**
3. For now, leave Client ID/Secret empty (we'll use Supabase's defaults)
4. Click **Save**

### Enable GitHub Login
1. Same section, find **GitHub** → Click **Enable**
2. Leave Client ID/Secret empty
3. Click **Save**

> **Note**: For production, you'll need to add your own OAuth credentials. See `DEPLOYMENT.md` for details.

---

## ⚙️ Step 4: Environment Setup (30 sec)

Create `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

Replace with your actual values from Step 2.

---

## 🚀 Step 5: Run! (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ Verify It Works

1. **Landing Page**: Should see Orbitfolio homepage
2. **Click "Continue with Google"**: Should redirect to Google login
3. **After login**: Should see dashboard with welcome message
4. **Toggle theme**: Click moon/sun icon in header

---

## 🎉 Success!

You're now running Orbitfolio locally!

### Next Steps

- **Add Holdings**: Coming soon in Phase 2
- **View Charts**: Coming soon in Phase 2
- **Deploy to Production**: See `DEPLOYMENT.md`

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### OAuth not working
- Check `.env.local` has correct Supabase URL and key
- Verify OAuth providers are enabled in Supabase
- Try incognito/private browsing mode

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Database errors
- Re-run `database.sql` in Supabase SQL Editor
- Check Supabase project is active (not paused)

---

## 📚 Learn More

- **Full Setup**: See `README.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Contributing**: See `CONTRIBUTING.md`

---

## 💬 Need Help?

- [GitHub Issues](https://github.com/orbitfolio/orbitfolio/issues)
- [GitHub Discussions](https://github.com/orbitfolio/orbitfolio/discussions)

Happy tracking! 🚀📈
