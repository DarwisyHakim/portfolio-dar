import React, { useEffect, useRef, useState } from "react";
import "./Portfolio.css";


// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA  (add your real githubUrl / liveUrl / images later)
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "01",
    tags: ["JavaScript", "C#", "MySQL",],
    images: [
      "/portfolio-dar/images/gamApp/Gam_app_04.jpg",
        "/portfolio-dar/images/gamApp/Gam_app_03.jpg",
    ],
    githubUrl: "https://github.com/yourusername/fleet-dashboard",
    liveUrl: null,
    en: {
      title: "Fleet Management Dashboard",
      shortDesc:
        "A system for GPS tracking, fuel monitoring, trip reports, and vehicle analytics across a fleet.",
      longDesc:
        "Developed a real-time fleet management dashboard for a logistics company. Integrated live GPS data onto an interactive map, built automated fuel consumption reports, and designed a trip history module with export to PDF/Excel. The C# backend handles data ingestion from GPS devices and exposes analytics endpoints.",
      role: "Full Stack Developer",
      duration: "5 months",
    },
    bm: {
      title: "Papan Pemuka Pengurusan Armada",
      shortDesc:
        "Sistem untuk penjejakan GPS, pemantauan bahan api, laporan perjalanan, dan analitik kenderaan merentasi armada.",
      longDesc:
        "Membangunkan papan pemuka pengurusan armada masa nyata untuk syarikat logistik. Mengintegrasikan data GPS langsung ke peta interaktif, membina laporan penggunaan bahan api automatik, dan mereka bentuk modul sejarah perjalanan dengan eksport ke PDF/Excel. Backend C# mengendalikan pengingesan data daripada peranti GPS.",
      role: "Pembangun Full Stack",
      duration: "5 bulan",
    },
  },
  {
    num: "02",
    tags: ["Flutter", "C#", "MySQL"],
        images: [
           "/portfolio-dar/images/gamApp/Gam_app_02.jpg",
              "/portfolio-dar/images/gamApp/Gam_app_01.jpg",
    ],
    githubUrl: "https://github.com/yourusername/vehicle-checklist",

    liveUrl: null,
    en: {
      title: "Vehicle Checklist App",
      shortDesc:
        "A Flutter mobile app for daily driver and vehicle inspection checklists, integrated with a backend API.",
      longDesc:
        "Designed and built a cross-platform mobile app for daily pre-trip vehicle inspections. Drivers fill in digital checklists, attach photos of defects, and submit reports that sync to a C# REST API. Supervisors receive notifications for flagged items and can approve or escalate issues from a web portal.",
      role: "Mobile & Backend Developer",
      duration: "4 months",
    },
    bm: {
      title: "Aplikasi Senarai Semak Kenderaan",
      shortDesc:
        "Aplikasi mudah alih Flutter untuk senarai semak pemeriksaan pemandu dan kenderaan harian, disepadukan dengan API.",
      longDesc:
        "Mereka bentuk dan membina aplikasi mudah alih merentas platform untuk pemeriksaan kenderaan pra-perjalanan harian. Pemandu mengisi senarai semak digital, melampirkan foto kerosakan, dan menghantar laporan yang disegerakkan ke REST API C#. Penyelia menerima pemberitahuan untuk item yang ditanda dan boleh meluluskan atau meningkatkan isu dari portal web.",
      role: "Pembangun Mudah Alih & Backend",
      duration: "4 bulan",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const LANG = {
  en: {
    available: "Available for work",
    heroGreeting: "Hi, I'm",
    heroDesc:
      "I build modern web apps, mobile apps, APIs, dashboards, and database-driven systems — end to end.",
    viewProjects: "View Projects",
    letsTalk: "Let's Talk →",
    yearsBuilding: "Years building",
    projectsShipped: "Projects shipped",
    stackDev: "Stack developer",
    navProjects: "Projects",
    navPassion: "Passion Projects",
    navSkills: "Skills",
    navAbout: "About",
    navContact: "Contact",
    viewResume: "View Resume",
    download: "↓ Download",
    techStackLabel: "Tech Stack",
    techStackHeading: ["What I ", "work with"],
    portfolioLabel: "Portfolio",
    featuredHeading: ["Featured ", "Projects"],
    viewDetails: "View Details →",
    aboutLabel: "About",
    aboutHeading: ["Who I ", "am"],
    aboutP1: (
      <>
        I'm a <span className="highlight">full stack developer</span> focused on
        building practical systems that solve real business problems. I enjoy
        working across the full spectrum — frontend, backend, mobile, APIs, and
        databases.
      </>
    ),
    aboutP2: (
      <>
        I care about writing{" "}
        <span className="highlight">clean, maintainable code</span> and shipping
        products that actually work for the people using them. Whether it's a
        React dashboard, a C# API, or a Flutter mobile app — I build it end to
        end.
      </>
    ),
    contactLabel: "Contact",
    contactHeading: "Let's build something",
    contactDesc:
      "Open to freelance projects, full-time roles, or just a good conversation about tech.",
    contactName: "Your name",
    contactEmail: "Your email",
    contactMessage: "Your message",
    contactSend: "Send Message",
    contactSending: "Sending…",
    contactSuccess: "Message sent! I'll get back to you soon.",
    contactError: "Something went wrong. Please try again.",
    footerText: "Built by Darwisy Hakim — darwisy.dev",
    modalRole: "Role",
    modalDuration: "Duration",
    modalGithub: "View Code",
    modalLive: "Live Demo",
    modalClose: "Close",
  },
  bm: {
    available: "Terbuka untuk kerja",
    heroGreeting: "Hai, saya",
    heroDesc:
      "Saya membina aplikasi web moden, aplikasi mudah alih, API, papan pemuka, dan sistem berasaskan pangkalan data — dari hujung ke hujung.",
    viewProjects: "Lihat Projek",
    letsTalk: "Hubungi Saya →",
    yearsBuilding: "Tahun membina",
    projectsShipped: "Projek dihantar",
    stackDev: "Pembangun Stack",
    navProjects: "Projek",
    navPassion: "Projek Peribadi",
    navSkills: "Kemahiran",
    navAbout: "Tentang",
    navContact: "Hubungi",
    viewResume: "Lihat Resume",
    download: "↓ Muat Turun",
    techStackLabel: "Tindanan Teknologi",
    techStackHeading: ["Apa yang saya ", "gunakan"],
    portfolioLabel: "Portfolio",
    featuredHeading: ["Projek ", "Pilihan"],
    viewDetails: "Lihat Butiran →",
    aboutLabel: "Tentang",
    aboutHeading: ["Siapa ", "saya"],
    aboutP1: (
      <>
        Saya seorang{" "}
        <span className="highlight">pembangun full stack</span> yang fokus
        membina sistem praktikal bagi menyelesaikan masalah perniagaan sebenar.
        Saya gemar bekerja merangkumi frontend, backend, mudah alih, API, dan
        pangkalan data.
      </>
    ),
    aboutP2: (
      <>
        Saya mengambil berat tentang penulisan{" "}
        <span className="highlight">kod yang bersih dan boleh diselenggara</span>{" "}
        serta menghantar produk yang benar-benar berfungsi untuk pengguna. Sama
        ada papan pemuka React, API C#, atau aplikasi Flutter — saya bina
        kesemuanya dari awal hingga akhir.
      </>
    ),
    contactLabel: "Hubungi",
    contactHeading: "Mari bina sesuatu",
    contactDesc:
      "Terbuka untuk projek bebas, jawatan sepenuh masa, atau sekadar perbualan menarik tentang teknologi.",
    contactName: "Nama anda",
    contactEmail: "E-mel anda",
    contactMessage: "Mesej anda",
    contactSend: "Hantar Mesej",
    contactSending: "Menghantar…",
    contactSuccess: "Mesej dihantar! Saya akan membalas tidak lama lagi.",
    contactError: "Sesuatu telah salah. Sila cuba lagi.",
    footerText: "Dibina oleh Darwisy Hakim — darwisy.dev",
    modalRole: "Peranan",
    modalDuration: "Tempoh",
    modalGithub: "Lihat Kod",
    modalLive: "Demo Langsung",
    modalClose: "Tutup",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// EMAILJS CONFIG — replace with your real IDs from emailjs.com
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

const greetings = [
  "Hello, I'm",
  "こんにちは、私は",
  "你好，我是",
  "안녕하세요, 저는",
  "Bonjour, je suis",
];

const PASSION_PROJECTS = [
  {
    num: "P01",
    tags: ["Flutter"],
    images: [
      "/portfolio-dar/images/japaneseApp/Japanese_app_01.jpg",
        "/portfolio-dar/images/japaneseApp/Japanese_app_02.jpg",
           "/portfolio-dar/images/japaneseApp/Japanese_app_03.jpg",
              "/portfolio-dar/images/japaneseApp/Japanese_app_04.jpg",
    ],
    githubUrl: "https://github.com/yourusername/japanese-learning-app",
    liveUrl: null,
    en: {
      title: "Japanese Learning App",
      shortDesc:
        "A cross-platform mobile application that helps learners build vocabulary, study kanji, and improve Japanese reading skills.",

      longDesc:
        "Developed a Flutter-based Japanese learning application focused on practical language acquisition rather than simple flashcards. The app organizes vocabulary and kanji by JLPT level, supports offline learning, and is designed to grow through downloadable content and future cloud synchronization. The project was inspired by my own journey learning Japanese and continues to evolve as I discover better ways to study.",

      role: "Full Stack Developer",
      duration: "Ongoing",
    },

    bm: {
      title: "Aplikasi Pembelajaran Bahasa Jepun",

      shortDesc:
        "Aplikasi mudah alih merentas platform untuk membantu pengguna mempelajari kosa kata, kanji dan meningkatkan kemahiran membaca bahasa Jepun.",

      longDesc:
        "Membangunkan aplikasi Flutter yang memfokuskan kepada pembelajaran bahasa Jepun secara praktikal. Aplikasi ini mengurus kosa kata dan kanji mengikut tahap JLPT, menyokong pembelajaran luar talian, dan direka supaya kandungan baharu boleh ditambah melalui kemas kini pada masa hadapan. Projek ini bermula daripada pengalaman saya sendiri mempelajari bahasa Jepun.",

      role: "Pembangun Full Stack",
      duration: "Sedang Dibangunkan",
    },
  },

  {
    num: "P02",
    tags: [
      "Flutter",
      "GitHub Pages",
      "JSON",
      "Offline Storage",
      "Image Caching",
    ],
    images: [
      "/portfolio-dar/images/hololiveApp/holo_app_01.jpg",
        "/portfolio-dar/images/hololiveApp/holo_app_02.jpg",
    ],
    githubUrl: "https://github.com/yourusername/hololive-card-app",
    liveUrl: null,

    en: {
      title: "Hololive Card Database",

      shortDesc:
        "A companion app for the Hololive Official Card Game that automatically downloads new card sets without requiring application updates.",

      longDesc:
        "Designed and built a scalable card database application that separates application releases from content updates. Card information and images are hosted on GitHub Pages, while the app downloads manifests, compares versions, fetches only new data, and stores everything locally for offline use. This architecture allows new card expansions to be supported without publishing a new version of the application.",

      role: "Full Stack Developer",
      duration: "Ongoing",
    },

    bm: {
      title: "Pangkalan Data Kad Hololive",

      shortDesc:
        "Aplikasi pendamping untuk Hololive Official Card Game yang memuat turun set kad baharu tanpa memerlukan kemas kini aplikasi.",

      longDesc:
        "Mereka bentuk aplikasi pangkalan data kad yang memisahkan kemas kini kandungan daripada keluaran aplikasi. Maklumat kad dan imej dihoskan melalui GitHub Pages, manakala aplikasi memuat turun manifest, membandingkan versi, memuat turun hanya data baharu dan menyimpannya secara luar talian. Seni bina ini membolehkan set kad baharu ditambah tanpa menerbitkan versi aplikasi yang baharu.",

      role: "Pembangun Full Stack",
      duration: "Sedang Dibangunkan",
    },
  },
    {
    num: "03",
    tags: ["React", "API", "MySQL"],
    githubUrl: "https://github.com/yourusername/tournament-manager",
    liveUrl: "https://your-live-demo.com",
    en: {
      title: "Tournament Manager",
      shortDesc:
        "A React app for managing tournaments, players, rounds, matches, and standings with real-time updates.",
      longDesc:
        "Built a full-featured tournament management system with bracket generation, live standings, and match scheduling. The backend exposes a REST API consumed by the React frontend, with MySQL storing all tournament data. Features include player seeding, round-robin and knockout formats, and printable standings.",
      role: "Full Stack Developer",
      duration: "3 months",
    },
    bm: {
      title: "Pengurus Kejohanan",
      shortDesc:
        "Aplikasi React untuk menguruskan kejohanan, pemain, pusingan, perlawanan, dan kedudukan dengan kemas kini masa nyata.",
      longDesc:
        "Membina sistem pengurusan kejohanan lengkap dengan penjanaan bracket, kedudukan langsung, dan penjadualan perlawanan. Backend mendedahkan REST API yang digunakan oleh frontend React, dengan MySQL menyimpan semua data kejohanan. Ciri termasuk seeding pemain, format round-robin dan knockout, serta kedudukan yang boleh dicetak.",
      role: "Pembangun Full Stack",
      duration: "3 bulan",
    },
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const observeRefs = useRef([]);
  const t = LANG[lang];

  // Scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    observeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  const addRef = (el) => {
    if (el && !observeRefs.current.includes(el)) observeRefs.current.push(el);
  };

  return (
    <div className="portfolio">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">dar.dev</div>
        <div className="nav-links">
          <a href="#projects">{t.navProjects}</a>
          <a href="#passion">{t.navPassion}</a>
          <a href="#skills">{t.navSkills}</a>
          <a href="#about">{t.navAbout}</a>
          <a href="#contact">{t.navContact}</a>
        </div>
        <div className="nav-actions">
          <button className="toggle-btn lang-toggle" onClick={() => setLang(lang === "en" ? "bm" : "en")} aria-label="Toggle language">
            <span className={lang === "en" ? "toggle-active" : ""}>EN</span>
            <span className="toggle-sep">/</span>
            <span className={lang === "bm" ? "toggle-active" : ""}>BM</span>
          </button>
          <button className="toggle-btn theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? "☀" : "☾"}
          </button>
          <a href="DarwisyHakim_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t.viewResume}</a>
          <a href="DarwisyHakim_Resume.pdf" download className="btn btn-solid">{t.download}</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-content">
          <div className="badge fade-up delay-1"><span className="badge-dot" />{t.available}</div>
  <Hero />
          <p className="hero-desc fade-up delay-3">{t.heroDesc}</p>
          <div className="hero-actions fade-up delay-4">
            <a href="#projects" className="btn btn-solid btn-lg">{t.viewProjects}</a>
            <a href="#contact" className="btn btn-ghost btn-lg">{t.letsTalk}</a>
          </div>
          <div className="hero-stats fade-up delay-5">
            <div><div className="stat-num">3+</div><div className="stat-label">{t.yearsBuilding}</div></div>
            <div><div className="stat-num">10+</div><div className="stat-label">{t.projectsShipped}</div></div>
            <div><div className="stat-num">Full</div><div className="stat-label">{t.stackDev}</div></div>
          </div>
        </div>
      </header>

      {/* SKILLS */}
      <section className="skills-section" id="skills">
        <div className="observe" ref={addRef}>
          <div className="section-label">{t.techStackLabel}</div>
          <h2>{t.techStackHeading[0]}<span>{t.techStackHeading[1]}</span></h2>
          <div className="skills-grid">
            {["React","Flutter","JavaScript","C# / ASP.NET","MySQL","REST API","Azure","GitHub"].map((skill) => (
              <div className="skill-chip" key={skill}><span className="skill-dot" />{skill}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects-section" id="projects">
        <div className="observe" ref={addRef}>
          <div className="section-label">{t.portfolioLabel}</div>
          <h2>{t.featuredHeading[0]}<span>{t.featuredHeading[1]}</span></h2>
          <div className="projects-grid">
            {PROJECTS.map((proj, i) => (
              <ProjectCard
                key={i}
                proj={proj}
                lang={lang}
                viewDetails={t.viewDetails}
                onOpen={() => setActiveProject(proj)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="passion-section" id="passion">
  <div className="observe" ref={addRef}>
    <div className="section-label">Passion Projects</div>

    <h2>
      Built <span>outside of work</span>
    </h2>

    <div className="projects-grid">
      {PASSION_PROJECTS.map((proj, i) => (
        <ProjectCard
          key={i}
          proj={proj}
          lang={lang}
          viewDetails={t.viewDetails}
          onOpen={() => setActiveProject(proj)}
        />
      ))}
    </div>
  </div>
</section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="observe" ref={addRef}>
          <div className="section-label">{t.aboutLabel}</div>
          <h2>{t.aboutHeading[0]}<span>{t.aboutHeading[1]}</span></h2>
          <div className="about-inner">
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="observe" ref={addRef}>
          <ContactForm t={t} />
        </div>
      </section>

      <footer>{t.footerText}</footer>

      {/* PROJECT MODAL */}
      {activeProject && (
        <ProjectModal
          proj={activeProject}
          lang={lang}
          t={t}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ proj, lang, viewDetails, onOpen }) {
  const p = proj[lang];
  return (
    <div className="project-card" onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}>
      <div className="project-num">{proj.num}</div>
      <h3>{p.title}</h3>
      <p>{p.shortDesc}</p>
      <div className="card-footer">
        <div className="tags">
          {proj.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <span className="view-details">{viewDetails}</span>
      </div>
    </div>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % greetings.length);
        setFlip(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="fade-up delay-2">
      <span className={`flip-text ${flip ? "flipping" : ""}`}>
        {greetings[index]}
      </span>
      <br />
      <span className="name">Darwisy Hakim</span>
    </h1>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT MODAL
// ─────────────────────────────────────────────────────────────────────────────
function ProjectModal({ proj, lang, t, onClose }) {
  const p = proj[lang];
  const [imageIndex, setImageIndex] = useState(0);

  const images = proj.images || [];
  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

const nextImage = () => {
  setImageIndex((prev) => (prev + 1) % images.length);
};

const prevImage = () => {
  setImageIndex((prev) =>
    prev === 0 ? images.length - 1 : prev - 1
  );
};
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-drawer">
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-num">{proj.num}</div>
            <h2 className="modal-title">{p.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Screenshot placeholder */}
<div className="modal-screenshot">
  {images.length > 0 ? (
    <div className="gallery-viewer">
      <button
        className="gallery-btn gallery-btn-left"
        onClick={prevImage}
        aria-label="Previous image"
      >
        ‹
      </button>

      <img
        src={images[imageIndex]}
        alt={`${p.title} screenshot ${imageIndex + 1}`}
        className="modal-image"
      />

      <button
        className="gallery-btn gallery-btn-right"
        onClick={nextImage}
        aria-label="Next image"
      >
        ›
      </button>

      <div className="gallery-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`gallery-dot ${
              index === imageIndex ? "active" : ""
            }`}
            onClick={() => setImageIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="screenshot-placeholder">
      <div className="screenshot-icon">⬛</div>
      <p>Add your screenshot here</p>
    </div>
  )}
</div>

        {/* Meta row */}
        <div className="modal-meta">
          <div className="modal-meta-item">
            <span className="modal-meta-label">{t.modalRole}</span>
            <span className="modal-meta-value">{p.role}</span>
          </div>
          <div className="modal-meta-item">
            <span className="modal-meta-label">{t.modalDuration}</span>
            <span className="modal-meta-value">{p.duration}</span>
          </div>
          <div className="modal-meta-item">
            <span className="modal-meta-label">Stack</span>
            <div className="tags" style={{ marginTop: 4 }}>
              {proj.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>

        {/* Long description */}
        <p className="modal-desc">{p.longDesc}</p>

        {/* Links */}
        <div className="modal-links">
          {proj.githubUrl && (
            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              ⌥ {t.modalGithub}
            </a>
          )}
          {proj.liveUrl && (
            <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              ↗ {t.modalLive}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM  (EmailJS)
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm({ t }) {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const formRef               = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Dynamically load EmailJS so it doesn't block if the script isn't present
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: "Darwisy",
      });

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="contact-card">
      <h3>{t.contactHeading}</h3>
      <p className="contact-desc">{t.contactDesc}</p>

      {status === "success" ? (
        <div className="contact-success">
          <span className="success-icon">✓</span>
          {t.contactSuccess}
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-name">{t.contactName}</label>
              <input
                id="cf-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.contactName}
                required
                disabled={status === "sending"}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cf-email">{t.contactEmail}</label>
              <input
                id="cf-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t.contactEmail}
                required
                disabled={status === "sending"}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cf-message">{t.contactMessage}</label>
            <textarea
              id="cf-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t.contactMessage}
              rows={5}
              required
              disabled={status === "sending"}
            />
          </div>
          {status === "error" && (
            <p className="contact-error">{t.contactError}</p>
          )}
          <button
            type="submit"
            className="btn btn-solid btn-lg contact-submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? t.contactSending : t.contactSend}
          </button>
        </form>
      )}
    </div>
  );
}