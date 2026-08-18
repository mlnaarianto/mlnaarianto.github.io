import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'blog']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>('home')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  // 🔒 DETEKSI SLUG BLOG DETAIL (KHUSUS /blog/:slug)
  const isBlogDetail =
    location.pathname.startsWith('/blog/') &&
    location.pathname.split('/').length === 3

  /* ================= THEME ================= */
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    const current = saved ?? 'dark'
    setTheme(current)
    document.documentElement.setAttribute('data-theme', current)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  /* ================= ACTIVE STATE ================= */
  useEffect(() => {
    if (isBlogDetail) {
      setActive(null)
      return
    }

    if (location.pathname === '/') {
      setActive(localStorage.getItem('last-section') ?? 'home')
    }
  }, [location.pathname, isBlogDetail])

  /* ================= SCROLL + OBSERVER ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })

    if (location.pathname !== '/') {
      return () => window.removeEventListener('scroll', handleScroll)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActive(id)
            localStorage.setItem('last-section', id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [location.pathname])

  /* ================= CLICK OUTSIDE (MOBILE) ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  /* ================= NAV CLICK ================= */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const offset = -80
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const handleNavClick = (section: string) => {
    setMenuOpen(false)
    localStorage.setItem('last-section', section)

    if (isBlogDetail) {
      navigate(-1)
      return
    }

    if (location.pathname === '/') {
      scrollToSection(section)
      return
    }

    navigate('/')
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* LOGO */}
        <h2
          className={styles.logo}
          onClick={() =>
            isBlogDetail
              ? navigate(-1)
              : window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          Maulana Arianto
        </h2>

        {/* HAMBURGER */}
        <button
          ref={hamburgerRef}
          className={`${styles.hamburger} ${
            menuOpen ? styles.hamburgerOpen : ''
          }`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* NAV LINKS */}
        <div
          ref={menuRef}
          className={`${styles.navLinks} ${
            menuOpen ? styles.mobileOpen : ''
          }`}
        >
          {/* SECTION MENU */}
          {SECTIONS.map((section) => (
            <button
              key={section}
              className={`${styles.navLink} ${
                active === section ? styles.active : ''
              }`}
              onClick={() => handleNavClick(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}

          {/* BLOG DETAIL */}
          {isBlogDetail && (
            <button
              className={`${styles.navLink} ${styles.active}`}
              onClick={() => navigate(-1)}
            >
              Blog Detail
            </button>
          )}

          {/* THEME SWITCH */}
          <div className={styles.themeWrapper}>
            <div className={styles.themeSwitch} onClick={toggleTheme}>
              <span className={theme === 'light' ? styles.activeTheme : ''}>
                Light
              </span>
              <div
                className={`${styles.switch} ${
                  theme === 'dark' ? styles.switchOn : ''
                }`}
              >
                <div className={styles.knob} />
              </div>
              <span className={theme === 'dark' ? styles.activeTheme : ''}>
                Dark
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}