import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './About.module.css'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [studyYears, setStudyYears] = useState(0)

  useEffect(() => {
    if (!inView) return

    // Memberikan tipe data untuk TypeScript agar tidak error merah
    let intervalId: ReturnType<typeof setInterval> | undefined

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setStudyYears(prev => {
          if (prev >= 4) {
            // Pengecekan agar TypeScript yakin intervalId ada
            if (intervalId) clearInterval(intervalId)
            return prev
          }
          return prev + 1
        })
      }, 100)
    }, 300)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [inView])

  return (
    <section ref={ref} id="about" className={`${styles.section} about-section`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.underline} />
        
        {/* Sub-teks penjelasan */}
        <p className={styles.sectionSubtitle}>
          Get to know more about my background, academic journey, and passion for software engineering.
        </p>
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <p>
            I am a <strong>Software Engineering Technology</strong> graduate from
            <strong> Batam State Polytechnic</strong> who enjoys turning ideas into
            functional and well-designed web applications.
          </p>

          <p>
            My main focus is <strong>full-stack development</strong>, where I work with
            both <strong>frontend and backend technologies</strong> to build clean,
            responsive, and scalable solutions.
          </p>

          <p>
            I’m highly motivated to keep learning, explore new tools, and grow through
            hands-on projects and collaboration with others.
          </p>
        </div>

        <div className={styles.aboutStats}>
          {/* Card Pertama: Diubah menjadi Years of Study */}
          <div className={styles.statCard}>
            <h3>{studyYears}</h3>
            <p>Years of Study (3 Years PBL + ±1 Year Internship)</p>
          </div>

          {/* Card Kedua */}
          <div className={styles.statCard}>
            <h3>5+</h3>
            <p>Projects Completed</p>
          </div>

          {/* Card Ketiga */}
          <div className={styles.statCard}>
            <h3>100%</h3>
            <p>Commitment to Learning</p>
          </div>
        </div>
      </div>
    </section>
  )
}