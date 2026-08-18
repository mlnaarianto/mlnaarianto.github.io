import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import styles from './Skills.module.css'

type Skill = {
  name: string
  level: number
  color: string
}

type SkillCategory = {
  id: string
  label: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Programming Languages',
    skills: [
      { name: 'PHP', level: 90, color: '#6C63FF' },
      { name: 'Ruby', level: 75, color: '#CC342D' },
      { name: 'Go', level: 80, color: '#00ADD8' },
      { name: 'Dart', level: 75, color: '#0175C2' },
      { name: 'Python', level: 80, color: '#FFD43B' }
    ]
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Libraries',
    skills: [
      { name: 'Laravel', level: 85, color: '#FF6B6B' },
      { name: 'CodeIgniter', level: 85, color: '#F4A261' },
      { name: 'Flutter', level: 75, color: '#4D96FF' },
      { name: 'React', level: 75, color: '#61C0BF' },
      { name: 'Gin', level: 80, color: '#00ADD8' },
      { name: 'Rails', level: 75, color: '#CC0000' },
      { name: 'FastAPI', level: 80, color: '#009688' }
    ]
  },
  {
    id: 'database',
    label: 'Database',
    skills: [
      { name: 'MySQL', level: 85, color: '#00758F' },
      { name: 'PostgreSQL', level: 75, color: '#336791' }
    ]
  },
  {
    id: 'others',
    label: 'Others',
    skills: [
      { name: 'IoT', level: 65, color: '#43AA8B' }
    ]
  }
]

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)
  const filteredCategories = skillCategories.filter(cat => cat.id === activeCategory)

  return (
    <section ref={ref} id="skills" className={`${styles.section} skills-section`}>
      {/* HEADER */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <div className={styles.underline} />
        {/* Tambahan sub-teks penjelasan dari kuliah dan mandiri */}
        <p className={styles.sectionSubtitle}>
          A combination of technical expertise honed through academic studies and self-driven continuous learning.
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className={styles.categoryButtons}>
        {skillCategories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SKILLS BY CATEGORY */}
      <div className={styles.skillsContainer}>
        {filteredCategories.map((category) => (
          <div key={category.id} className={styles.categoryBlock}>
            <h3 className={styles.categoryTitle}>{category.label}</h3>

            <div className={styles.skillsGrid}>
              {category.skills.map((skill) => (
                <div key={skill.name} className={styles.skillCard}>
                  <div className={styles.skillHeader}>
                    <h4>{skill.name}</h4>
                    <span>{skill.level}%</span>
                  </div>

                  <div className={styles.skillBarContainer}>
                    <div
                      className={styles.skillBar}
                      style={{
                        backgroundColor: skill.color,
                        width: inView ? `${skill.level}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}