import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './About.module.css'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [experience, setExperience] = useState(0)

  useEffect(() => {
    if (inView) {
      const expTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setExperience(prev => {
            if (prev < 4) return prev + 1
            clearInterval(interval)
            return prev
          })
        }, 100)
        return () => clearInterval(interval)
      }, 300)

      return () => clearTimeout(expTimer)
    }
  }, [inView])

  return (
    <section ref={ref} id="about" className={`${styles.section} about-section`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.underline} />
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <p>
            I am a <strong>Software Engineering Technology</strong> student at
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
          <div className={styles.statCard}>
            <h3>{experience}+</h3>
            <p>Years Experience</p>
          </div>

          <div className={styles.statCard}>
            <h3>12+</h3>
            <p>Projects Completed</p>
          </div>

          <div className={styles.statCard}>
            <h3>100%</h3>
            <p>Commitment to Learning</p>
          </div>
        </div>
      </div>
    </section>
  )
}