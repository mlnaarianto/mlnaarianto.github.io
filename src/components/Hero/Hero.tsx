import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import profileImg from '../../assets/images/which.png'
import styles from './Hero.module.css'

export default function Hero() {
  const [text, setText] = useState('')
  const fullText = "Full Stack Developer Enthusiast "
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText.charAt(index))
        setIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // 1. Ganti motion.section jadi section biasa atau biarkan satu di root saja
    <section className={styles.hero} id="home">
      <div className={styles.heroContainer}>
        
        {/* 2. Bungkus konten utama cukup dengan div biasa, hilangkan motion berlebih */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Hello, I'm <span className={styles.highlight}>Maulana Arianto</span>
          </h1>

          <div className={styles.typewriter}>
            <p className={styles.typewriterText}>{text}<span className={styles.cursor}>|</span></p>
          </div>

          <p className={styles.heroSubtitle}>
            Hello what's up :3
          </p>

          <div className={styles.heroButtons}>
            {/* 3. Tombol pakai button HTML biasa, efek hover/active diatur lewat CSS */}
            <button
              className={styles.primaryBtn}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.profileImage}>
            <img className={styles.profileImageImg} src={profileImg} alt="Profile" />
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} onClick={scrollToNext}>
        <FaArrowDown />
      </div>
    </section>
  )
}