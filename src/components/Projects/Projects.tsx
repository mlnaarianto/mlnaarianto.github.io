import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Projects.module.css'

// Import gambar CI4 dari assets
import ci4Img1 from '../../assets/images/ci4/1.png'
import ci4Img2 from '../../assets/images/ci4/2.png'
import ci4Img3 from '../../assets/images/ci4/3.png'

// Import gambar PHP Native dari assets
import phpnativeImg1 from '../../assets/images/phpnative/1.png'
import phpnativeImg2 from '../../assets/images/phpnative/2.png'
import phpnativeImg3 from '../../assets/images/phpnative/3.png'

// Import gambar Room Practice dari assets
import roompracticeImg1 from '../../assets/images/roompractice/1.png'
import roompracticeImg2 from '../../assets/images/roompractice/2.png'
import roompracticeImg3 from '../../assets/images/roompractice/3.png'

// Import gambar Printer Server dari assets
import printerserverImg1 from '../../assets/images/printerserver/1.png'
import printerserverImg2 from '../../assets/images/printerserver/2.png'
import printerserverImg3 from '../../assets/images/printerserver/3.png'

// Import gambar Flutter Rentalcar dari assets
import rentalcarImg1 from '../../assets/images/flutter-rentalcar/1.jpeg'
import rentalcarImg2 from '../../assets/images/flutter-rentalcar/2.jpeg'
import rentalcarImg3 from '../../assets/images/flutter-rentalcar/3.jpeg'

// Import gambar Pocari Inventory & Distribution dari assets
import pocariImg1 from '../../assets/images/pocari/1.png'
import pocariImg2 from '../../assets/images/pocari/2.png'
import pocariImg3 from '../../assets/images/pocari/3.png'

// Import gambar React Weather / AtmoIQAI dari assets
import weatherImg1 from '../../assets/images/react-weather/1.png'
import weatherImg2 from '../../assets/images/react-weather/2.png'
import weatherImg3 from '../../assets/images/react-weather/3.png'

type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  images: string[]
  github: string
  demo: string
  fit?: 'cover' | 'contain'
}

const projects: Project[] = [
  {
    title: 'Inventory Borrowing Website (PHP Native)',
    description: 'A web-based inventory borrowing management system built using native PHP and MySQL. Features include item management, borrowing and returning records, admin dashboard, and user authentication.',
    tags: ['PHP', 'MySQL'],
    image: phpnativeImg1,
    images: [phpnativeImg1, phpnativeImg2, phpnativeImg3],
    github: 'https://github.com/mlnaarianto/inventaris-barang',
    demo: ''
  },
  {
    title: 'Room Practice Website',
    description: 'A room practice management website built with Laravel. Features include room scheduling, booking system, admin dashboard, and user authentication.',
    tags: ['PHP', 'Laravel', 'MySQL'],
    image: roompracticeImg1,
    images: [roompracticeImg1, roompracticeImg2, roompracticeImg3],
    github: 'https://github.com/mlnaarianto/Room-Practice',
    demo: ''
  },
  {
    title: 'IoT Printer Server with RFID',
    description: 'An IoT-based printer server deployment system built on ARM architecture with RFID card authentication. This project enables centralized printer management, secure access control, and real-time monitoring.',
    tags: ['IoT', 'Laravel', 'MySQL'],
    image: printerserverImg1,
    images: [printerserverImg1, printerserverImg2, printerserverImg3],
    github: 'https://github.com/mlnaarianto/Printer-server-with-RFID-Card-IoT',
    demo: ''
  },
  {
    title: 'Online Store Application (CodeIgniter 4)',
    description: 'An online store web application built using PHP and the CodeIgniter 4 framework. Features include product management, shopping cart, user authentication, and order processing.',
    tags: ['PHP', 'CodeIgniter', 'MySQL'],
    image: ci4Img1,
    images: [ci4Img1, ci4Img2, ci4Img3],
    github: 'https://github.com/mlnaarianto/Aplication-Store-with-code-igniter-4',
    demo: ''
  },
  {
    title: 'Inventory & Distribution System (Laravel)',
    description: 'A modern supply chain and inventory distribution web application built with Laravel. Features include real-time inventory tracking between central warehouses and distributor partners, automated request workflows, and role-based access control.',
    tags: ['PHP', 'Laravel', 'MySQL'],
    image: pocariImg1,
    images: [pocariImg1, pocariImg2, pocariImg3],
    github: 'https://github.com/mlnaarianto/Inventaris-dan-distribusi-laravel',
    demo: ''
  },
  {
    title: 'AtmoIQAI Weather Frontend',
    description: 'A weather forecasting and climate intelligence web application built with React, TypeScript, and Vite. Integrated with a Go (Gin) backend featuring RBAC and predictive AI models (LSTM and ENSO).',
    tags: ['React', 'TypeScript', 'Vite', 'Go'],
    image: weatherImg1,
    images: [weatherImg1, weatherImg2, weatherImg3],
    github: 'https://github.com/mlnaarianto/Barelang-frontend-AtmoIQAI',
    demo: ''
  },
  {
    title: 'Flutter Rentalcar Mobile App',
    description: 'A mobile car rental application built with Flutter, integrated with a Laravel Sanctum API for authentication, role-based access control (RBAC) using Spatie Permission, and Firebase Firestore for real-time data.',
    tags: ['Flutter', 'Laravel', 'Firebase'],
    image: rentalcarImg1,
    images: [rentalcarImg1, rentalcarImg2, rentalcarImg3],
    github: 'https://github.com/mlnaarianto/Flutter-rentalcar',
    demo: '',
    fit: 'contain'
  }
]

const itemsPerPage = 3

// Komponen gambar project dengan navigasi carousel yang ringan
function ProjectImage({ project }: { project: Project }) {
  const hasMultiple = project.images && project.images.length > 1
  const [current, setCurrent] = useState(0)

  const gallery = hasMultiple ? project.images : [project.image]

  const containerClass = project.fit === 'contain'
    ? `${styles.projectImage} ${styles.projectImageContain}`
    : styles.projectImage

  const next = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrent(prev => (prev + 1) % gallery.length)
  }

  const prev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrent(prevIndex => (prevIndex - 1 + gallery.length) % gallery.length)
  }

  return (
    <div className={containerClass}>
      <img
        src={gallery[current]}
        alt={project.title}
        className={styles.activeImage}
      />

      {hasMultiple && (
        <>
          <button
            className={`${styles.imageNavBtn} ${styles.imageNavLeft}`}
            onClick={prev}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          <button
            className={`${styles.imageNavBtn} ${styles.imageNavRight}`}
            onClick={next}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>

          <div className={styles.imageDots}>
            {gallery.map((_, i) => (
              <span
                key={i}
                className={`${styles.imageDot} ${i === current ? styles.imageDotActive : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrent(i)
                }}
              />
            ))}
          </div>
        </>
      )}

      <div className={styles.projectOverlay}>
        <div className={styles.projectLinks}>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter(project =>
          project.tags.some(tag =>
            tag.toLowerCase().includes(filter.toLowerCase())
          )
        )

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage))

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section ref={ref} id="projects" className={`${styles.section} projects-section`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.underline} />
      </div>

      {/* FILTER */}
      <div className={styles.filterButtons}>
        {['all', 'PHP', 'laravel', 'react', 'iot', 'codeigniter', 'flutter'].map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        {paginatedProjects.map((project) => (
          <div key={project.title} className={styles.projectCard}>
            <ProjectImage project={project} />

            <div className={styles.projectContent}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className={styles.projectTags}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageArrow}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`${styles.pageNumber} ${currentPage === page ? styles.pageActive : ''}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={styles.pageArrow}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  )
}