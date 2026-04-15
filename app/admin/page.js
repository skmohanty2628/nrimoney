'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'nriadmin2024'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)

  // Check session
  useEffect(() => {
    const auth = sessionStorage.getItem('nri_admin_auth')
    if (auth === 'true') setIsAuthenticated(true)
  }, [])

  // Load stats from Firebase when authenticated
  useEffect(() => {
    if (isAuthenticated) fetchStats()
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('nri_admin_auth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('nri_admin_auth')
    setIsAuthenticated(false)
  }

  const fetchStats = async () => {
    setLoading(true)
    try {
      // Firebase REST API — same pattern as divyastotram
      const DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
      const res = await fetch(`${DB_URL}/nri-stats.json`)
      const data = await res.json()
      setStats(data)
    } catch (err) {
      console.error('Firebase fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // ─── LOGIN SCREEN ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={styles.loginWrapper}>
        <div style={styles.loginCard}>
          <div style={styles.logoArea}>
            <span style={styles.logoIcon}>₹</span>
            <h1 style={styles.logoTitle}>NRI Money Admin</h1>
            <p style={styles.logoSub}>Restricted access only</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={styles.input}
                autoFocus
              />
            </div>
            {error && <p style={styles.errorText}>{error}</p>}
            <button type="submit" style={styles.loginBtn}>
              Login →
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ─── ADMIN DASHBOARD ──────────────────────────────────────────
  const tabs = ['overview', 'articles', 'tools', 'seo']

  return (
    <div style={styles.dashWrapper}>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sideTop}>
          <span style={styles.sideIcon}>₹</span>
          <span style={styles.sideName}>NRI Admin</span>
        </div>
        <nav style={styles.nav}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.navBtn,
                ...(activeTab === tab ? styles.navBtnActive : {})
              }}
            >
              {tabIcon(tab)} {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          ⎋ Logout
        </button>
      </aside>

      {/* Main content */}
      <main style={styles.main}>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.pageTitle}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div style={styles.headerRight}>
            <button onClick={fetchStats} style={styles.refreshBtn}>
              ↻ Refresh
            </button>
            <span style={styles.adminBadge}>Admin</span>
          </div>
        </div>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div>
            <div style={styles.statGrid}>
              <StatCard label="Total Visitors" value={stats?.totalVisitors ?? '—'} icon="👥" color="#185FA5" />
              <StatCard label="Today" value={stats?.todayVisitors ?? '—'} icon="📅" color="#0F6E56" />
              <StatCard label="Live Now" value={stats?.liveVisitors ?? '—'} icon="🟢" color="#A32D2D" />
              <StatCard label="Articles" value={stats?.articleCount ?? '—'} icon="📄" color="#BA7517" />
            </div>

            <Section title="Top Performing Articles">
              {loading ? (
                <p style={styles.loadingText}>Loading...</p>
              ) : stats?.topPages ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {['Article', 'Views', 'Avg Time', 'AdSense RPM'].map(h => (
                        <th key={h} style={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(stats.topPages).map(([slug, data]) => (
                      <tr key={slug}>
                        <td style={styles.td}>{slug}</td>
                        <td style={styles.td}>{data.views ?? '—'}</td>
                        <td style={styles.td}>{data.avgTime ?? '—'}</td>
                        <td style={styles.td}>{data.rpm ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={styles.emptyText}>No data yet. Visit tracking will populate this.</p>
              )}
            </Section>

            <Section title="Quick Actions">
              <div style={styles.actionGrid}>
                <ActionBtn label="Add New Article" icon="✏️" onClick={() => setActiveTab('articles')} />
                <ActionBtn label="Run SEO Audit" icon="🔍" onClick={() => setActiveTab('seo')} />
                <ActionBtn label="View Firebase" icon="🔥" onClick={() => window.open(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, '_blank')} />
                <ActionBtn label="Google Search Console" icon="📊" onClick={() => window.open('https://search.google.com/search-console', '_blank')} />
                <ActionBtn label="Google Analytics" icon="📈" onClick={() => window.open('https://analytics.google.com', '_blank')} />
                <ActionBtn label="AdSense Dashboard" icon="💰" onClick={() => window.open('https://www.google.com/adsense', '_blank')} />
              </div>
            </Section>
          </div>
        )}

        {/* Tab: Articles */}
        {activeTab === 'articles' && (
          <div>
            <Section title="Article Pipeline">
              <div style={styles.pipeline}>
                {[
                  { status: '✅ Published', color: '#0F6E56', articles: stats?.articles?.published ?? [] },
                  { status: '📝 Draft', color: '#BA7517', articles: stats?.articles?.draft ?? [] },
                  { status: '🗓 Planned', color: '#185FA5', articles: stats?.articles?.planned ?? [] },
                ].map(({ status, color, articles }) => (
                  <div key={status} style={styles.pipelineCol}>
                    <div style={{ ...styles.pipelineHeader, borderColor: color }}>
                      <span style={{ color }}>{status}</span>
                      <span style={styles.pipelineCount}>{articles.length}</span>
                    </div>
                    {articles.length === 0 ? (
                      <p style={styles.emptyText}>Nothing here yet</p>
                    ) : (
                      articles.map((a, i) => (
                        <div key={i} style={styles.articlePill}>{a.title || a}</div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Target: 30 Pages for AdSense">
              <NRIArticleChecklist />
            </Section>
          </div>
        )}

        {/* Tab: Tools */}
        {activeTab === 'tools' && (
          <Section title="AI & Utility Tools">
            <div style={styles.toolGrid}>
              {[
                { name: 'Groq LLaMA 3.3 70B', desc: 'Your AI engine — same as divyastotram. Model: llama-3.3-70b-versatile', status: '✅ Connected', link: 'https://console.groq.com' },
                { name: 'Firebase Realtime DB', desc: 'Visitor tracking, live count, article stats', status: '✅ Active', link: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL },
                { name: 'Vercel Deployment', desc: 'Auto-deploys on git push. Custom domain needed for AdSense', status: '✅ Live', link: 'https://vercel.com/dashboard' },
                { name: 'Google Search Console', desc: 'Index pages, fix crawl errors, track keywords', status: '⚠ Set up', link: 'https://search.google.com/search-console' },
                { name: 'Google Analytics 4', desc: 'Traffic, sessions, geography breakdown', status: '⚠ Set up', link: 'https://analytics.google.com' },
                { name: 'AdSense', desc: 'Needs custom domain + 30 pages. Do NOT apply with vercel.app', status: '⏳ Pending', link: 'https://www.google.com/adsense' },
              ].map(tool => (
                <div key={tool.name} style={styles.toolCard}>
                  <div style={styles.toolName}>{tool.name}</div>
                  <div style={styles.toolDesc}>{tool.desc}</div>
                  <div style={styles.toolFooter}>
                    <span style={styles.toolStatus}>{tool.status}</span>
                    {tool.link && (
                      <button
                        onClick={() => window.open(tool.link, '_blank')}
                        style={styles.toolLink}
                      >
                        Open →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Tab: SEO */}
        {activeTab === 'seo' && (
          <div>
            <Section title="AdSense Readiness Checklist">
              <SEOChecklist />
            </Section>
            <Section title="Sitemap & Robots">
              <div style={styles.codeBlock}>
                <p style={styles.codeLabel}>Add to next.config.js for auto sitemap:</p>
                <pre style={styles.pre}>{`// Install: npm install next-sitemap
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://yournrisite.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*'],
  robotsTxtOptions: {
    rules: [
      { userAgent: '*', disallow: '/admin' }
    ]
  }
}`}</pre>
              </div>
            </Section>
          </div>
        )}

      </main>
    </div>
  )
}

// ─── SUB COMPONENTS ────────────────────────────────────────────

function StatCard({ label, value, icon, color }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statIcon}>{icon}</div>
      <div style={{ ...styles.statValue, color }}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      {children}
    </div>
  )
}

function ActionBtn({ label, icon, onClick }) {
  return (
    <button onClick={onClick} style={styles.actionBtn}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 12 }}>{label}</span>
    </button>
  )
}

function NRIArticleChecklist() {
  const articles = [
    'What is NRI? Complete guide 2026',
    'NRE vs NRO account — full comparison',
    'Best NRI bank accounts in India',
    'How to invest in Indian mutual funds as NRI',
    'NRI tax in India — what is taxable',
    'DTAA guide for NRIs in USA/UK/UAE',
    'Best remittance apps — Wise vs Remitly vs Western Union',
    'How to send money to India cheaply',
    'NRI home loan — complete process',
    'PPF account for NRI — can you continue?',
    'NPS for NRI — how to open and invest',
    'FCNR deposit — interest rates and guide',
    'NRI property purchase in India — rules',
    'Form 15CA and 15CB explained',
    'RNOR status — tax benefits on return to India',
    'Best credit cards for NRIs',
    'OCI vs NRI vs PIO — what is the difference',
    'NRI health insurance in India 2026',
    'Zerodha for NRI — how to open account',
    'NRI stock market investing — complete guide',
    'Capital gains tax for NRI — all asset types',
    'NRI gold investment — ETF vs bonds vs physical',
    'How to file ITR as NRI',
    'NRI repatriation — how to transfer money abroad',
    'GIFT City investment for NRI',
    'US NRI — FBAR and FATCA requirements',
    'UK NRI — ISA vs Indian FD comparison',
    'UAE NRI — tax free income rules',
    'Australia NRI — superannuation and India investments',
    'NRI returning to India — complete financial checklist',
  ]

  return (
    <div>
      <div style={styles.checklistMeta}>
        <span style={{ color: '#0F6E56', fontWeight: 500 }}>30 target articles</span>
        <span style={{ color: '#BA7517', fontSize: 12, marginLeft: 8 }}>
          — All target US/UK/AU NRI audience for high RPM
        </span>
      </div>
      <div style={styles.checklistGrid}>
        {articles.map((a, i) => (
          <div key={i} style={styles.checklistItem}>
            <span style={styles.checkNum}>{i + 1}</span>
            <span style={styles.checkText}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SEOChecklist() {
  const items = [
    { label: 'Custom domain (not vercel.app)', done: false, critical: true },
    { label: '30+ original, quality pages', done: false, critical: true },
    { label: 'Privacy Policy page', done: false, critical: true },
    { label: 'About Us page with author credentials', done: false, critical: true },
    { label: 'Contact page', done: false, critical: true },
    { label: 'ads.txt file in /public folder', done: false, critical: true },
    { label: 'robots.txt (block /admin)', done: false, critical: false },
    { label: 'Sitemap submitted to Search Console', done: false, critical: false },
    { label: 'Google Analytics 4 installed', done: false, critical: false },
    { label: 'Google Search Console verified', done: false, critical: false },
    { label: 'No broken links or 404 pages', done: false, critical: false },
    { label: 'Site loads in under 3 seconds', done: false, critical: false },
    { label: 'Mobile responsive design', done: false, critical: false },
    { label: 'HTTPS / SSL active', done: true, critical: false },
    { label: 'No AI-only content (E-E-A-T signals needed)', done: false, critical: true },
  ]

  return (
    <div style={styles.seoList}>
      {items.map((item, i) => (
        <div key={i} style={styles.seoItem}>
          <span style={{ fontSize: 16 }}>{item.done ? '✅' : '⬜'}</span>
          <span style={styles.seoText}>{item.label}</span>
          {item.critical && (
            <span style={styles.critBadge}>critical</span>
          )}
        </div>
      ))}
    </div>
  )
}

function tabIcon(tab) {
  return { overview: '📊', articles: '📝', tools: '🛠', seo: '🔍' }[tab]
}

// ─── STYLES ────────────────────────────────────────────────────

const styles = {
  loginWrapper: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#f5f5f0', fontFamily: 'sans-serif'
  },
  loginCard: {
    background: '#fff', borderRadius: 16, padding: '40px 36px',
    width: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
  },
  logoArea: { textAlign: 'center', marginBottom: 32 },
  logoIcon: { fontSize: 40, display: 'block', marginBottom: 8 },
  logoTitle: { fontSize: 20, fontWeight: 600, margin: '0 0 4px', color: '#1a1a1a' },
  logoSub: { fontSize: 13, color: '#888', margin: 0 },
  inputGroup: { marginBottom: 16 },
  label: { display: 'block', fontSize: 12, fontWeight: 500, color: '#555', marginBottom: 6 },
  input: {
    width: '100%', padding: '10px 14px', border: '1px solid #ddd',
    borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box'
  },
  errorText: { color: '#c0392b', fontSize: 13, margin: '8px 0' },
  loginBtn: {
    width: '100%', padding: '12px', background: '#185FA5', color: '#fff',
    border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500,
    cursor: 'pointer', marginTop: 8
  },
  dashWrapper: { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', background: '#f8f8f6' },
  sidebar: {
    width: 200, background: '#1a1a2e', display: 'flex',
    flexDirection: 'column', padding: '24px 0', flexShrink: 0
  },
  sideTop: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)'
  },
  sideIcon: { fontSize: 22 },
  sideName: { color: '#fff', fontWeight: 600, fontSize: 14 },
  nav: { flex: 1, padding: '16px 0' },
  navBtn: {
    display: 'flex', alignItems: 'center', gap: 8, width: '100%',
    padding: '10px 20px', background: 'none', border: 'none',
    color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer',
    textAlign: 'left', textTransform: 'capitalize'
  },
  navBtnActive: { background: 'rgba(255,255,255,0.1)', color: '#fff' },
  logoutBtn: {
    margin: '0 12px 12px', padding: '10px 16px', background: 'rgba(255,255,255,0.06)',
    border: 'none', borderRadius: 8, color: 'rgba(255,255,255,0.5)',
    fontSize: 12, cursor: 'pointer', textAlign: 'left'
  },
  main: { flex: 1, padding: '28px 32px', overflow: 'auto' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 24
  },
  pageTitle: { fontSize: 22, fontWeight: 600, margin: 0, color: '#1a1a1a', textTransform: 'capitalize' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12 },
  refreshBtn: {
    padding: '7px 14px', border: '1px solid #ddd', borderRadius: 6,
    background: '#fff', fontSize: 13, cursor: 'pointer', color: '#555'
  },
  adminBadge: {
    padding: '4px 12px', background: '#185FA5', color: '#fff',
    borderRadius: 20, fontSize: 11, fontWeight: 500
  },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 },
  statCard: {
    background: '#fff', borderRadius: 12, padding: '20px 16px',
    border: '1px solid #eee', textAlign: 'center'
  },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statValue: { fontSize: 26, fontWeight: 700, lineHeight: 1 },
  statLabel: { fontSize: 12, color: '#888', marginTop: 6 },
  section: {
    background: '#fff', borderRadius: 12, padding: '20px 24px',
    border: '1px solid #eee', marginBottom: 20
  },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: '#1a1a1a', margin: '0 0 16px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: {
    textAlign: 'left', padding: '8px 12px', background: '#f8f8f6',
    fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  td: { padding: '9px 12px', borderBottom: '1px solid #f0f0f0', color: '#333' },
  loadingText: { color: '#888', fontSize: 13 },
  emptyText: { color: '#aaa', fontSize: 13, fontStyle: 'italic' },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10 },
  actionBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 6, padding: '14px 8px', background: '#f8f8f6',
    border: '1px solid #eee', borderRadius: 10, cursor: 'pointer',
    color: '#333', fontSize: 13
  },
  pipeline: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 },
  pipelineCol: { background: '#f8f8f6', borderRadius: 10, padding: 14 },
  pipelineHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12, paddingBottom: 10, borderBottom: '2px solid'
  },
  pipelineCount: { background: '#fff', borderRadius: 12, padding: '2px 8px', fontSize: 12, color: '#555' },
  articlePill: {
    background: '#fff', borderRadius: 6, padding: '8px 10px',
    fontSize: 12, color: '#333', marginBottom: 6, border: '1px solid #eee'
  },
  checklistMeta: { marginBottom: 14 },
  checklistGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 },
  checklistItem: {
    display: 'flex', alignItems: 'flex-start', gap: 8,
    padding: '8px 10px', background: '#f8f8f6', borderRadius: 6
  },
  checkNum: {
    fontSize: 10, fontWeight: 700, color: '#185FA5',
    background: '#E6F1FB', borderRadius: 4, padding: '2px 6px',
    minWidth: 22, textAlign: 'center', flexShrink: 0
  },
  checkText: { fontSize: 12, color: '#333', lineHeight: 1.4 },
  toolGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 },
  toolCard: {
    background: '#f8f8f6', borderRadius: 10, padding: 16,
    border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 8
  },
  toolName: { fontSize: 13, fontWeight: 600, color: '#1a1a1a' },
  toolDesc: { fontSize: 12, color: '#666', lineHeight: 1.5, flex: 1 },
  toolFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  toolStatus: { fontSize: 11, color: '#555' },
  toolLink: {
    padding: '4px 10px', background: '#185FA5', color: '#fff',
    border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer'
  },
  seoList: { display: 'flex', flexDirection: 'column', gap: 8 },
  seoItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f5f5f5' },
  seoText: { fontSize: 13, color: '#333', flex: 1 },
  critBadge: {
    fontSize: 10, padding: '2px 8px', background: '#FCEBEB',
    color: '#791F1F', borderRadius: 20, fontWeight: 500, flexShrink: 0
  },
  codeBlock: { background: '#f0f0f0', borderRadius: 8, padding: 16 },
  codeLabel: { fontSize: 12, color: '#555', margin: '0 0 10px' },
  pre: { margin: 0, fontSize: 12, color: '#1a1a1a', whiteSpace: 'pre-wrap', fontFamily: 'monospace' },
}