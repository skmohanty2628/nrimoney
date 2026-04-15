# 🇮🇳 NRI Money Guide — Complete Setup Guide

India's #1 NRI finance website. 100+ articles, AI expert (Groq/LLaMA 3.3 70B), 3 calculators, AdSense-ready.

---

## ⚡ Quick Start (2 Days to Live)

### Day 1: Setup & Deploy

**Step 1: Install dependencies**
```bash
npm install
```

**Step 2: Configure environment**
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and add your keys:
- `GROQ_API_KEY` — Get free at [console.groq.com](https://console.groq.com) (no credit card required)
- `NEXT_PUBLIC_SITE_URL` — Your domain (e.g. https://nrimoneytalk.com)
- `NEXT_PUBLIC_GA_ID` — Google Analytics (optional for now)
- `NEXT_PUBLIC_ADSENSE_ID` — Add AFTER AdSense approval

**Step 3: Run locally**
```bash
npm run dev
```
Visit http://localhost:3000 — your site is working!

**Step 4: Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts — link to your GitHub repo
# Set environment variables in Vercel dashboard
```

**Step 5: Connect domain**
1. Buy domain at Namecheap/GoDaddy (~$10/year)
2. In Vercel: Settings → Domains → Add your domain
3. Update nameservers at your registrar to Vercel's nameservers
4. SSL is automatic (free)

---

### Day 2: SEO & AdSense Prep

**Google Search Console:**
1. Go to search.google.com/search-console
2. Add your domain property
3. Verify ownership (Vercel makes this easy with meta tag)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Day 30: Apply for AdSense**
- Ensure you have 25+ article pages live
- Privacy Policy, Terms, About, Contact pages (all included!)
- Site must be live for at least 30 days
- Apply at: google.com/adsense

---

## 📁 Project Structure

```
nri-money-guide/
├── app/
│   ├── page.js              # Homepage
│   ├── layout.js            # Root layout (GA + AdSense)
│   ├── globals.css          # Tailwind + custom styles
│   ├── articles/
│   │   ├── page.js          # Article listing (100 articles)
│   │   └── [slug]/
│   │       ├── page.js      # Article detail page
│   │       └── ArticleContentLoader.jsx  # Groq auto-generator
│   ├── calculators/
│   │   ├── emi/page.js      # NRI EMI calculator
│   │   ├── tax/page.js      # NRI tax calculator
│   │   └── remittance/page.js  # Remittance comparator
│   ├── ask-expert/page.js   # Full AI expert chat
│   ├── about/page.js
│   ├── contact/page.js
│   ├── privacy-policy/page.js  # Required for AdSense
│   ├── terms/page.js           # Required for AdSense
│   ├── api/
│   │   ├── chat/route.js        # Groq chatbot API
│   │   └── generate-article/route.js  # AI article generator
│   ├── sitemap.js           # Auto sitemap (all 100 articles)
│   └── robots.js
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ChatWidget.jsx       # Floating AI chat
├── data/
│   └── articles.js          # 30 complete + 70 AI-generated
└── .env.local.example       # Environment variables template
```

---

## 🤖 AI Features (Groq Free Tier)

### What's Free on Groq:
- **LLaMA 3.3 70B**: ~6,000 tokens/minute, **500,000 tokens/day**
- **LLaMA 3.1 8B**: Higher limits, faster responses
- No credit card required at [console.groq.com](https://console.groq.com)

### How AI is Used:
1. **AI Expert Chatbot** (`/ask-expert` + floating widget) — LLaMA 3.3 70B
2. **Auto Article Generation** — For 70 stub articles, Groq generates content on first visit (cached in browser session)

### Token Budget:
- Each chatbot response: ~500–1000 tokens
- Each article generation: ~2000 tokens
- Daily budget of 500K tokens = 500 chat responses OR 250 article generations

---

## 💰 Monetization Setup

### Affiliate Programs (Apply Now):
1. **Wise** → wise.com/affiliate-program (£10/personal signup)
2. **Remitly** → remitly.com/us/en/affiliates ($20-40/funded account)
3. **Zerodha NRI** → zerodha.com/open-account (₹300-1500/account)
4. **PolicyBazaar** → policybazaar.com/affiliate (₹500-2000/lead)

### After AdSense Approval:
1. Add your AdSense client ID to `.env.local` as `NEXT_PUBLIC_ADSENSE_ID`
2. Ads will automatically appear (configured in `app/layout.js`)

### NRI CA Consultation Leads:
- Contact 2-3 NRI-specialist CAs directly
- Add "Book CA Consultation" buttons on tax articles
- ₹2,000–10,000 per lead

---

## 📊 Content Strategy

### 30 Complete Articles (Ready Now):
All key NRI finance topics are written with expert content, tables, and examples. See `data/articles.js`.

### 70 AI-Generated Articles:
Groq generates these on demand when a user visits. Content is high quality (LLaMA 3.3 70B). Cache in session storage to save API tokens.

### How to Write More Articles:
Add new entries to the `articleStubs` array in `data/articles.js`:
```javascript
{
  slug: 'your-topic-slug',
  title: 'Your Article Title',
  metaDesc: 'SEO description (150-160 chars)',
  category: 'banking', // or taxes, investment, property, etc.
  readTime: 6,
  publishDate: '2025-07-01',
}
```

---

## 🚀 Growth Strategy

### Week 1-2: Content & SEO
- Submit sitemap to Google Search Console
- Share articles in NRI WhatsApp groups (especially Odia NRI groups — zero competition!)
- Share on LinkedIn with #NRI hashtag
- Post in r/IndianDiaspora subreddit

### Month 2-3: Traffic Building
- Start an Odia-language YouTube channel on NRI finance (zero competition)
- Guest post on Indian financial blogs
- Answer NRI questions on Quora with link back to detailed articles

### Day 30: AdSense
- Apply with 30+ quality pages
- Approval takes 1-14 days
- Ads go live automatically

---

## 🔧 Customization

### Change Site Name/Domain:
1. Update `NEXT_PUBLIC_SITE_URL` in `.env.local`
2. Update site name in `app/layout.js` metadata
3. Update footer links in `components/Footer.jsx`

### Add Firebase Visitor Tracking:
```bash
npm install firebase
```
Then add Firebase config to `.env.local` and update `app/layout.js`.

### Upgrade to Claude AI (when you have budget):
Replace Groq in `app/api/chat/route.js` with Anthropic SDK:
```bash
npm install @anthropic-ai/sdk
```

---

## 📞 Support

Built with ❤️ for NRIs worldwide. All the best with your site!

**Important reminder:** Always include "not financial advice" disclaimers on all content. Verify all tax/legal information with official sources (incometax.gov.in, rbi.org.in).
