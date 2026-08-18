import styles from "./Experience.module.css";

type ExperienceItem = {
  title: string;
  company: string;
  companyUrl?: string;
  certificateUrl?: string;
  date: string;
  description: string;
  type: "experience" | "certificate";
};

const data: ExperienceItem[] = [
  {
    title: "Fullstack Developer Intern",
    company: "Politeknik Negeri Batam - Transformasi Digital",
    companyUrl: "https://polibatam.ac.id",
    date: "Sep 2025 - May 2026",
    description:
      "Develop and maintain web applications using Laravel, integrate REST APIs for backend data communication, and perform performance optimizations and bug fixes to enhance the campus experience.",
    type: "experience",
  },
  {
    title: "Web Developer (PBL)",
    company: "Politeknik Negeri Batam - Project Based Learning",
    companyUrl: "https://polibatam.ac.id",
    date: "Aug 2022 - Jun 2026",
    description:
      "Developed Project Based Learning web platforms using Laravel, implemented responsive UI design, and integrated REST APIs for dynamic content management.",
    type: "experience",
  },
  {
    title: "Mobile Developer (PBL)",
    company: "Politeknik Negeri Batam - Project Based Learning",
    companyUrl: "https://polibatam.ac.id",
    date: "Aug 2023 - Jan 2024",
    description:
      "Developed mobile applications using Flutter, implemented responsive layouts, integrated REST APIs, and optimized application performance for better user experience.",
    type: "experience",
  },
  {
    title: "Fullstack Developer Associate (FSDA) Certificate",
    company: "Logical Operations - CertNexus",
    companyUrl: "https://certifications.certnexus.com",
    certificateUrl:
      "https://certifications.certnexus.com/1b97fc17-6977-44fc-ad98-7adfc3838c85",
    date: "Jul 2026",
    description:
      "Earned the Fullstack Developer Associate (FSDA) certification from Logical Operations, validating proficiency in fullstack web development covering frontend, backend, database, and API integration best practices.",
    type: "certificate",
  },
  {
    title: "Hack4ID Kepri Participant Certificate",
    company: "Politeknik Negeri Batam x Lintasarta",
    companyUrl: "https://www.lintasarta.net",
    certificateUrl:
      "https://drive.google.com/file/d/1fycC8F20TQuQiVgTHknHBeM_DACITmOx/view?usp=drive_link",
    date: "Aug 2023",
    description:
      "Participated in HACK4ID Kepri, a collaborative hackathon organized by Politeknik Negeri Batam and Lintasarta, focusing on digital innovation, problem solving, and rapid web application prototyping.",
    type: "certificate",
  },
  {
    title: "Project Based Learning Certificate",
    company: "Politeknik Negeri Batam - Project Based Learning",
    companyUrl: "https://polibatam.ac.id",
    certificateUrl:
      "https://drive.google.com/file/d/12-xD34KO8BkLFNlgOvjeIDo8H4IusjyR/view?usp=drive_link",
    date: "Aug 2025 - Jan 2026",
    description:
      'Completed a Project Based Learning program with the project titled "Parkwell: Data Driven Smart Parking System Powered by IoT and Big Data Analytics". Responsible for developing the web dashboard using Laravel, integrating IoT sensor data, and implementing real-time monitoring and analytics features.',
    type: "certificate",
  },
];

export default function Experience() {
  const experiences = data.filter((item) => item.type === "experience");
  const certificates = data.filter((item) => item.type === "certificate");

  return (
    <section id="experience" className={styles.section}>
      {/* HEADER */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Experience & Certificates</h2>
        <div className={styles.underline} />
      </div>

      <div className={styles.columns}>
        {/* EXPERIENCE COLUMN */}
        <div>
          <h3 className={styles.columnTitle}>Experience</h3>
          <div className={styles.grid}>
            {experiences.map((item, index) => (
              <div key={index} className={styles.card}>
                <span className={`${styles.badge} ${styles.experience}`}>
                  Experience
                </span>

                <h3>{item.title}</h3>

                <p className={styles.company}>
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                    >
                      {item.company}
                    </a>
                  ) : (
                    item.company
                  )}
                </p>

                <p className={styles.date}>{item.date}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATE COLUMN */}
        <div>
          <h3 className={styles.columnTitle}>Certificates</h3>
          <div className={styles.grid}>
            {certificates.map((item, index) => (
              <div key={index} className={styles.card}>
                <span className={`${styles.badge} ${styles.certificate}`}>
                  Certificate
                </span>

                <h3>{item.title}</h3>

                <p className={styles.company}>
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                    >
                      {item.company}
                    </a>
                  ) : (
                    item.company
                  )}
                </p>

                <p className={styles.date}>{item.date}</p>
                <p className={styles.description}>{item.description}</p>

                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certificateBtn}
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}