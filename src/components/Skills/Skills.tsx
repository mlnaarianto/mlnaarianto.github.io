import { motion } from 'framer-motion'
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
    threshold: 0.2
  })

  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)

  const filteredCategories = skillCategories.filter(cat => cat.id === activeCategory)

  return (
    <motion.section
      ref={ref}
      id="skills"
      className={`${styles.section} skills-section`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* HEADER */}
      <div className={styles.sectionHeader}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Skills
        </motion.h2>

        <motion.div
          className={styles.underline}
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      {/* CATEGORY FILTER */}
      <motion.div
        className={styles.categoryButtons}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {skillCategories.map(cat => (
          <motion.button
            key={cat.id}
            className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* SKILLS BY CATEGORY */}
      <div className={styles.skillsContainer}>
        {filteredCategories.map((category, catIndex) => (
          <div key={category.id} className={styles.categoryBlock}>
            <motion.h3
              className={styles.categoryTitle}
              initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * catIndex }}
            >
              {category.label}
            </motion.h3>

            <div className={styles.skillsGrid}>
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={styles.skillCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.skillHeader}>
                    <h4>{skill.name}</h4>
                    <span>{skill.level}%</span>
                  </div>

                  <div className={styles.skillBarContainer}>
                    <motion.div
                      className={styles.skillBar}
                      style={{
                        backgroundColor: skill.color,
                        transformOrigin: 'left'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: skill.level / 100 } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.2 + 0.1 * index,
                        ease: 'easeOut'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}