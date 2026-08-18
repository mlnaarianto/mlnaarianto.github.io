import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaTag, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Blog.module.css'

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Native PHP for Beginners',
    slug: 'getting-started-native-php',
    excerpt: 'My first experience learning native PHP, understanding basic syntax, CRUD operations, and how PHP connects with MySQL in simple web applications.',
    date: '2026-02-10',
    category: 'Backend',
    image: 'https://www.php.net/images/logos/new-php-logo.svg',
    readTime: '4 min read'
  },
  {
    id: 2,
    title: 'Building a REST API with Laravel Sanctum & RBAC',
    slug: 'building-rest-api-laravel-sanctum',
    excerpt: 'How I built a token-based REST API in Laravel using Sanctum for authentication and a custom RBAC middleware to restrict access by user role.',
    date: '2026-02-10',
    category: 'Laravel',
    image: 'https://raw.githubusercontent.com/laravel/art/master/laravel-logo.svg',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Building a REST API Backend with Go and Gin Framework',
    slug: 'building-rest-api-go-gin',
    excerpt: 'How I built a structured backend using Go and the Gin framework, covering routing, middlewares, RBAC authorization, and clean project architecture.',
    date: '2026-02-10',
    category: 'Golang',
    image: 'https://raw.githubusercontent.com/gin-gonic/logo/master/color.png',
    readTime: '8 min read'
  },
  {
    id: 4,
    title: 'Implementing OAuth Social Login (Google, Meta, X, Discord)',
    slug: 'implementing-oauth-social-login',
    excerpt: 'Learn how OAuth works and how to integrate social login services like Google, Meta, X, and Discord into your web application.',
    date: '2026-02-10',
    category: 'Authentication',
    image: 'https://unpkg.com/lucide-static@latest/icons/key-round.svg',
    readTime: '9 min read'
  },
  {
    id: 5,
    title: 'Generating Anime Characters using DCGAN with TensorFlow & Keras',
    slug: 'anime-generator-dcgan-tensorflow-keras',
    excerpt: 'Learn how I built an anime face generator using Deep Convolutional GAN (DCGAN) with TensorFlow and Keras, from dataset preparation to model training.',
    date: '2026-02-10',
    category: 'AI / Machine Learning',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    readTime: '12 min read'
  },
  {
    id: 6,
    title: 'Getting Started with CodeIgniter 4 for Web Development',
    slug: 'getting-started-codeigniter-4',
    excerpt: 'A beginner-friendly introduction to CodeIgniter 4, covering MVC structure, routing, controllers, and simple CRUD implementation.',
    date: '2026-02-10',
    category: 'PHP',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg',
    readTime: '8 min read'
  },
  {
    id: 7,
    title: 'Understanding Ruby on Rails: Convention over Configuration',
    slug: 'getting-started-ruby-on-rails',
    excerpt: 'An introduction to Ruby on Rails, exploring its core principles like Convention over Configuration, Active Record ORM, MVC pattern, and rapid web development.',
    date: '2026-02-10',
    category: 'Ruby on Rails',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg',
    readTime: '7 min read'
  }
]

const itemsPerPage = 3

export default function Blog() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))]

  const filteredPosts =
    filter === 'all'
      ? blogPosts
      : blogPosts.filter(post => post.category === filter)

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage))

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <motion.section
      ref={ref}
      id="blog"
      className={`${styles.section} blog-section`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* ===== HEADER ===== */}
      <div className={styles.sectionHeader}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Blog
        </motion.h2>

        <motion.div
          className={styles.underline}
          initial={{ width: 0 }}
          animate={inView ? { width: '80px' } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>

      {/* ===== FILTER ===== */}
      <motion.div
        className={styles.filterButtons}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {categories.map(category => (
          <motion.button
            key={category}
            className={`${styles.filterBtn} ${filter === category ? styles.active : ''}`}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* ===== BLOG GRID ===== */}
      <div className={styles.blogGrid}>
        {paginatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className={styles.blogCard}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -10 }}
          >
            {/* IMAGE */}
            <div className={styles.blogImage}>
              <img src={post.image} alt={post.title} />
              <div className={styles.blogOverlay}>
                <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* CONTENT */}
            <div className={styles.blogContent}>
              <div className={styles.blogMeta}>
                <span className={styles.blogCategory}>
                  <FaTag /> {post.category}
                </span>
                <span className={styles.blogDate}>
                  <FaCalendarAlt /> {formatDate(post.date)}
                </span>
              </div>

              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>

              <div className={styles.blogFooter}>
                <span className={styles.readTime}>{post.readTime}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className={styles.readMoreLink}
                >
                  Read More <FaArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== EMPTY STATE ===== */}
      {filteredPosts.length === 0 && (
        <motion.div
          className={styles.noPosts}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p>No posts found in this category.</p>
        </motion.div>
      )}

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <motion.div
          className={styles.pagination}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
        </motion.div>
      )}
    </motion.section>
  )
}