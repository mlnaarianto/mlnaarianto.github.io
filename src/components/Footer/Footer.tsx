import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import styles from './Footer.module.css'

export default function Footer() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [loading, setLoading] = useState(false)

  const currentYear = new Date().getFullYear()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    /* 1️⃣ HONEYPOT CHECK */
    const botField = form.elements.namedItem('botcheck') as HTMLInputElement
    if (botField?.value) {
      console.warn('Spam detected (honeypot)')
      return
    }

    /* 2️⃣ RATE LIMIT (1 EMAIL / 60 DETIK) */
    const lastSend = localStorage.getItem('lastEmailTime')
    const now = Date.now()

    if (lastSend && now - Number(lastSend) < 60000) {
      alert('Please wait a minute before sending another message.')
      return
    }

    setLoading(true)

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert('Message sent successfully!')
        localStorage.setItem('lastEmailTime', now.toString())
        form.reset()
      })
      .catch((error) => {
        console.error(error)
        alert('Failed to send message. Please try again later.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.footerContent}>
        {/* LEFT */}
        <div className={styles.footerInfo}>
          <h2>Get In Touch</h2>
          <p>Feel free to reach out to me for any questions or opportunities.</p>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <FaEnvelope />
              <span>maulanaarianto592@gmail.com</span>
            </div>

            <div className={styles.contactItem}>
              <FaPhone />
              <span>+62 895385178108</span>
            </div>

            <div className={styles.contactItem}>
              <FaMapMarkerAlt />
              <span>Batam City, Riau Island Province, Indonesia</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.footerForm}>
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* HONEYPOT */}
            <input
              type="text"
              name="botcheck"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className={styles.formGroup}>
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="reply_to"
                placeholder="Your Email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.footerBottom}>
        <div className={styles.socialLinks}>
          <a href="https://github.com/mlnaarianto" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/maulana-arianto-4a32a8370/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/_mlna.arianto/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/mlna.arianto"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://x.com/MaulanaArianto"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
          >
            <FaXTwitter />
          </a>
        </div>

        <p>© {currentYear} Maulana Arianto. All rights reserved.</p>
      </div>
    </footer>
  )
}