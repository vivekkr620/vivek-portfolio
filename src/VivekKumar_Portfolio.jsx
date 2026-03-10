import { useState, useEffect, useRef } from "react";

// ─── Inject Google Fonts + global styles ───────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #050A0F;
      --surface: #0D1821;
      --surface2: #162030;
      --accent: #00FFAA;
      --accent2: #0066FF;
      --accent3: #FF3366;
      --text: #E8F4F8;
      --muted: #5E7A8A;
      --border: rgba(0,255,170,0.15);
      --font-display: 'Syne', sans-serif;
      --font-mono: 'DM Mono', monospace;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-display);
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

    /* ── Cursor glow ── */
    .cursor-glow {
      position: fixed; pointer-events: none; z-index: 9999;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,255,170,0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: transform 0.05s linear;
    }

    /* ── Noise overlay ── */
    .noise {
      position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 200px 200px;
    }

    /* ── Grid background ── */
    .grid-bg {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(0,255,170,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,170,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* ── Nav ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 60px;
      background: linear-gradient(to bottom, rgba(5,10,15,0.95), transparent);
      backdrop-filter: blur(12px);
    }

    .nav-logo {
      font-size: 1.4rem; font-weight: 800; letter-spacing: -0.03em;
      color: var(--accent); cursor: pointer;
    }
    .nav-logo span { color: var(--text); }

    .nav-links { display: flex; gap: 40px; }
    .nav-link {
      font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.08em;
      color: var(--muted); text-decoration: none; text-transform: uppercase;
      cursor: pointer; transition: color 0.2s;
      position: relative; padding-bottom: 4px;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 0; height: 1px; background: var(--accent);
      transition: width 0.3s ease;
    }
    .nav-link:hover { color: var(--accent); }
    .nav-link:hover::after { width: 100%; }

    /* ── Section base ── */
    section {
      position: relative; z-index: 2;
      padding: 120px 60px;
      max-width: 1200px; margin: 0 auto;
    }

    /* ── Hero ── */
    .hero {
      min-height: 100vh; display: flex; align-items: center;
      max-width: 100%; padding: 0 60px; padding-top: 100px;
    }
    .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; }

    .hero-tag {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em;
      color: var(--accent); text-transform: uppercase;
      border: 1px solid var(--border); border-radius: 2px;
      padding: 6px 14px; margin-bottom: 32px;
    }
    .hero-tag::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--accent); animation: pulse-dot 2s infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }

    .hero-name {
      font-size: clamp(3.5rem, 8vw, 7rem);
      font-weight: 800; line-height: 0.95;
      letter-spacing: -0.04em;
      margin-bottom: 24px;
    }
    .hero-name .line { display: block; overflow: hidden; }
    .hero-name .line span {
      display: block;
      animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .hero-name .line:nth-child(2) span { animation-delay: 0.1s; }
    .hero-name .accent-word { color: var(--accent); }

    @keyframes slide-up {
      from { transform: translateY(110%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .hero-sub {
      font-family: var(--font-mono); font-size: 1rem; color: var(--muted);
      margin-bottom: 48px; max-width: 520px; line-height: 1.7;
      animation: fade-in 1s 0.4s both;
    }

    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; animation: fade-in 1s 0.6s both; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 14px 32px; border-radius: 2px;
      background: var(--accent); color: var(--bg);
      font-family: var(--font-display); font-weight: 700; font-size: 0.9rem;
      letter-spacing: 0.02em; border: none; cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      text-decoration: none;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0,255,170,0.35);
    }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 13px 32px; border-radius: 2px;
      background: transparent; color: var(--text);
      font-family: var(--font-display); font-weight: 600; font-size: 0.9rem;
      letter-spacing: 0.02em; border: 1px solid rgba(255,255,255,0.15);
      cursor: pointer; transition: all 0.2s; text-decoration: none;
    }
    .btn-ghost:hover {
      border-color: var(--accent); color: var(--accent);
      background: rgba(0,255,170,0.05);
    }

    .hero-scroll {
      position: absolute; bottom: 40px; left: 50%;
      transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      font-family: var(--font-mono); font-size: 0.65rem;
      color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase;
      animation: fade-in 1s 1.2s both;
    }
    .scroll-line {
      width: 1px; height: 40px; background: linear-gradient(to bottom, var(--accent), transparent);
      animation: scroll-anim 2s ease-in-out infinite;
    }
    @keyframes scroll-anim {
      0%, 100% { transform: scaleY(1); opacity: 1; }
      50% { transform: scaleY(0.5); opacity: 0.4; }
    }

    /* ── Section label ── */
    .section-label {
      display: flex; align-items: center; gap: 16px;
      font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em;
      color: var(--accent); text-transform: uppercase;
      margin-bottom: 60px;
    }
    .section-label::before {
      content: ''; width: 40px; height: 1px; background: var(--accent);
    }

    /* ── About ── */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

    .about-text h2 {
      font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800;
      letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 28px;
    }
    .about-text p {
      font-size: 1rem; line-height: 1.8; color: var(--muted); margin-bottom: 20px;
    }
    .about-text p strong { color: var(--text); }

    .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
    .stat-card {
      background: var(--surface); padding: 28px;
      border: 1px solid var(--border);
      transition: border-color 0.3s, transform 0.3s;
    }
    .stat-card:hover { border-color: var(--accent); transform: translateY(-4px); }
    .stat-num {
      font-size: 2.8rem; font-weight: 800; color: var(--accent);
      letter-spacing: -0.04em; line-height: 1;
      margin-bottom: 8px;
    }
    .stat-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }

    /* ── Skills ── */
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

    .skill-card {
      background: var(--surface); padding: 32px;
      border: 1px solid var(--border);
      transition: all 0.3s; cursor: default;
      position: relative; overflow: hidden;
    }
    .skill-card::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(0,255,170,0.05) 0%, transparent 60%);
      opacity: 0; transition: opacity 0.3s;
    }
    .skill-card:hover::before { opacity: 1; }
    .skill-card:hover { border-color: var(--accent); transform: translateY(-4px); }

    .skill-icon { font-size: 2rem; margin-bottom: 16px; }
    .skill-name { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
    .skill-desc { font-family: var(--font-mono); font-size: 0.75rem; color: var(--muted); line-height: 1.6; }

    .skill-bar-wrap { margin-top: 16px; }
    .skill-bar-bg { height: 2px; background: var(--surface2); border-radius: 1px; overflow: hidden; }
    .skill-bar-fill {
      height: 100%; border-radius: 1px;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* ── Experience timeline ── */
    .timeline { position: relative; padding-left: 40px; }
    .timeline::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 1px; background: linear-gradient(to bottom, var(--accent), transparent);
    }

    .timeline-item {
      position: relative; margin-bottom: 60px;
      animation: fade-in 0.6s both;
    }
    .timeline-dot {
      position: absolute; left: -46px; top: 6px;
      width: 12px; height: 12px; border-radius: 50%;
      border: 2px solid var(--accent); background: var(--bg);
      transition: background 0.2s;
    }
    .timeline-item:hover .timeline-dot { background: var(--accent); }

    .timeline-meta {
      font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent);
      letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px;
    }
    .timeline-company {
      font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 4px;
    }
    .timeline-role { color: var(--muted); font-size: 0.9rem; margin-bottom: 20px; }

    .timeline-bullets { list-style: none; }
    .timeline-bullets li {
      font-size: 0.9rem; color: var(--muted); line-height: 1.7;
      padding-left: 20px; position: relative; margin-bottom: 8px;
    }
    .timeline-bullets li::before {
      content: '→'; position: absolute; left: 0; color: var(--accent); font-size: 0.8rem;
    }

    /* ── Certs ── */
    .certs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }

    .cert-card {
      background: var(--surface); padding: 28px 32px;
      border: 1px solid var(--border);
      display: flex; align-items: flex-start; gap: 20px;
      transition: all 0.3s;
    }
    .cert-card:hover { border-color: var(--accent); transform: translateX(6px); }

    .cert-icon {
      width: 44px; height: 44px; border-radius: 2px;
      background: rgba(0,255,170,0.1); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; flex-shrink: 0;
    }
    .cert-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 6px; }
    .cert-issuer { font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent); }

    /* ── Contact ── */
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }

    .contact-info h2 {
      font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800;
      letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 24px;
    }
    .contact-info p { font-size: 1rem; color: var(--muted); line-height: 1.8; margin-bottom: 40px; }

    .contact-links { display: flex; flex-direction: column; gap: 16px; }
    .contact-link {
      display: flex; align-items: center; gap: 16px;
      padding: 16px 20px; background: var(--surface);
      border: 1px solid var(--border); border-radius: 2px;
      color: var(--text); text-decoration: none;
      font-size: 0.9rem; transition: all 0.25s;
    }
    .contact-link:hover { border-color: var(--accent); color: var(--accent); transform: translateX(6px); }
    .contact-link-icon { font-size: 1.2rem; }
    .contact-link-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; display: block; }
    .contact-link-val { font-weight: 600; }

    .contact-form-side { display: flex; flex-direction: column; gap: 16px; }

    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
    .form-input, .form-textarea {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 2px; padding: 14px 18px;
      color: var(--text); font-family: var(--font-display); font-size: 0.95rem;
      outline: none; transition: border-color 0.2s;
      resize: none;
    }
    .form-input:focus, .form-textarea:focus { border-color: var(--accent); }
    .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }

    .send-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 10px;
      padding: 16px 36px; background: var(--accent); color: var(--bg);
      font-family: var(--font-display); font-weight: 800; font-size: 0.95rem;
      border: none; border-radius: 2px; cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      letter-spacing: 0.02em;
    }
    .send-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,255,170,0.35); }

    /* ── Footer ── */
    footer {
      position: relative; z-index: 2;
      border-top: 1px solid var(--border);
      padding: 32px 60px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .footer-copy { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); }
    .footer-accent { color: var(--accent); }

    /* ── Floating orbs ── */
    .orb {
      position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
      filter: blur(80px); opacity: 0.12;
    }
    .orb1 { width: 600px; height: 600px; background: var(--accent); top: -200px; right: -200px; animation: orb-float 8s ease-in-out infinite; }
    .orb2 { width: 400px; height: 400px; background: var(--accent2); bottom: 20%; left: -150px; animation: orb-float 11s ease-in-out infinite reverse; }
    .orb3 { width: 300px; height: 300px; background: var(--accent3); bottom: -100px; right: 20%; animation: orb-float 9s ease-in-out infinite 3s; }
    @keyframes orb-float {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-40px) scale(1.05); }
    }

    /* ── Animate on scroll ── */
    .aos { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .aos.visible { opacity: 1; transform: translateY(0); }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      nav { padding: 16px 24px; }
      .nav-links { display: none; }
      .hero { padding: 0 24px; padding-top: 80px; }
      section { padding: 80px 24px; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 40px; }
      .skills-grid { grid-template-columns: 1fr; }
      .certs-grid { grid-template-columns: 1fr; }
      footer { flex-direction: column; gap: 12px; padding: 24px; text-align: center; }
    }
  `}</style>
);

// ─── Data ──────────────────────────────────────────────────────────────────
const skills = [
  { icon: "⚡", name: "Frontend Dev", desc: "HTML, CSS, JavaScript, React.js — crafting responsive, pixel-perfect interfaces.", pct: 80 },
  { icon: "🗄️", name: "Database", desc: "MongoDB & SQL — designing schemas and writing efficient queries.", pct: 70 },
  { icon: "🔗", name: "REST APIs", desc: "Integrating and building RESTful APIs with clean, maintainable code.", pct: 75 },
  { icon: "🛡️", name: "Cybersecurity", desc: "Network security, ethical hacking fundamentals, firewalls & encryption.", pct: 55 },
  { icon: "🐙", name: "Git & GitHub", desc: "Version control, branching strategies, code reviews & CI/CD basics.", pct: 78 },
  { icon: "🐍", name: "Python", desc: "Scripting, data manipulation & automation — Kaggle badge certified.", pct: 65 },
];

const experiences = [
  {
    period: "Jun 2025 – Sep 2025",
    company: "Cloudcredits Technologies",
    role: "Frontend Developer Intern · Jaipur, Rajasthan",
    bullets: [
      "Built and improved web interfaces using HTML, CSS & JavaScript.",
      "Integrated REST APIs and ensured cross-device responsiveness.",
      "Maintained clean, version-controlled codebases via Git & GitHub.",
      "Participated in code reviews, stand-ups & brainstorming sessions.",
    ],
  },
  {
    period: "Jul 2024 – Aug 2024",
    company: "Learn and Build",
    role: "Cybersecurity Intern · Jaipur, Rajasthan",
    bullets: [
      "Completed focused internship on Cyber Security fundamentals.",
      "Studied network security, ethical hacking concepts & cyber threats.",
      "Hands-on activities with firewalls, encryption & vulnerability assessment.",
    ],
  },
];

const certs = [
  { icon: "🤖", title: "5-Day AI Agents Intensive", issuer: "Google" },
  { icon: "🐍", title: "Python Coder", issuer: "Kaggle Badge" },
  { icon: "☁️", title: "Azure Synapse Serverless SQL", issuer: "Microsoft Azure" },
  { icon: "🌐", title: "MERN Stack Web Development", issuer: "Certification" },
];

// ─── Hook: cursor glow ─────────────────────────────────────────────────────
function useCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return ref;
}

// ─── Hook: AOS ─────────────────────────────────────────────────────────────
function useAOS() {
  useEffect(() => {
    const els = document.querySelectorAll(".aos");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Animated counter ──────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = () => {
          start += Math.ceil(to / 40);
          if (start >= to) { setVal(to); return; }
          setVal(start); requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Skill bar ─────────────────────────────────────────────────────────────
function SkillBar({ pct }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setW(pct); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="skill-bar-wrap" ref={ref}>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function Portfolio() {
  const cursorRef = useCursor();
  useAOS();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleSend = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <GlobalStyles />
      <div className="cursor-glow" ref={cursorRef} />
      <div className="noise" />
      <div className="grid-bg" />
      <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />

      {/* ── Nav ── */}
      <nav>
        <div className="nav-logo">VK<span>.</span></div>
        <div className="nav-links">
          {["about", "skills", "experience", "certifications", "contact"].map((s) => (
            <span key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</span>
          ))}
        </div>
        <a href="mailto:vk431152@gmail.com" className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.8rem" }}>
          Hire Me ↗
        </a>
      </nav>

      {/* ── Hero ── */}
      <div className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-tag">Available for Opportunities</div>
          <h1 className="hero-name">
            <span className="line"><span>Vivek</span></span>
            <span className="line"><span><span className="accent-word">Kumar.</span></span></span>
          </h1>
          <p className="hero-sub">
            Frontend Developer & CS Engineering Student crafting responsive web experiences
            with clean code and sharp design sensibility.
          </p>
          <div className="hero-ctas">
            <span className="btn-primary" onClick={() => scrollTo("experience")}>View My Work →</span>
            <a href="https://www.linkedin.com/in/vivek-kumar011/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn ↗</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>

      {/* ── About ── */}
      <section id="about">
        <div className="section-label">About Me</div>
        <div className="about-grid">
          <div className="about-text aos">
            <h2>Building the web, one component at a time.</h2>
            <p>
              I'm a <strong>pre-final year B.Tech Computer Science</strong> student at Jagannath University, Jaipur,
              with hands-on experience building real-world interfaces at Cloudcredits Technologies.
            </p>
            <p>
              I blend <strong>frontend craftsmanship</strong> with a strong understanding of databases and APIs —
              always writing code that's readable, scalable, and performance-focused.
            </p>
            <p>
              My certifications in <strong>MERN Stack</strong>, AI Agents with Google, and Azure Synapse keep
              me at the edge of the tech landscape.
            </p>
          </div>
          <div className="about-stats aos">
            <div className="stat-card">
              <div className="stat-num"><Counter to={2} />+</div>
              <div className="stat-label">Internships</div>
            </div>
            <div className="stat-card">
              <div className="stat-num"><Counter to={4} /></div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat-card">
              <div className="stat-num"><Counter to={6} />+</div>
              <div className="stat-label">Tech Skills</div>
            </div>
            <div className="stat-card">
              <div className="stat-num"><Counter to={2027} /></div>
              <div className="stat-label">Graduating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills">
        <div className="section-label">Skills</div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-card aos" key={s.name} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <div className="skill-desc">{s.desc}</div>
              <SkillBar pct={s.pct} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience">
        <div className="section-label">Experience</div>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className="timeline-item aos" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="timeline-dot" />
              <div className="timeline-meta">{exp.period}</div>
              <div className="timeline-company">{exp.company}</div>
              <div className="timeline-role">{exp.role}</div>
              <ul className="timeline-bullets">
                {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications">
        <div className="section-label">Certifications</div>
        <div className="certs-grid">
          {certs.map((c, i) => (
            <div className="cert-card aos" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="cert-icon">{c.icon}</div>
              <div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <div className="section-label">Contact</div>
        <div className="contact-grid">
          <div className="contact-info aos">
            <h2>Let's build something great together.</h2>
            <p>
              I'm actively looking for internship and full-time opportunities.
              Whether you have a project, a question, or just want to say hi — my inbox is open!
            </p>
            <div className="contact-links">
              <a href="mailto:vk431152@gmail.com" className="contact-link">
                <span className="contact-link-icon">✉️</span>
                <div>
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-val">vk431152@gmail.com</span>
                </div>
              </a>
              <a href="tel:6205606989" className="contact-link">
                <span className="contact-link-icon">📱</span>
                <div>
                  <span className="contact-link-label">Phone</span>
                  <span className="contact-link-val">+91 6205606989</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/vivekkumar011" target="_blank" rel="noreferrer" className="contact-link">
                <span className="contact-link-icon">💼</span>
                <div>
                  <span className="contact-link-label">LinkedIn</span>
                  <span className="contact-link-val">linkedin.com/in/vivekkumar011</span>
                </div>
              </a>
              <div className="contact-link" style={{cursor:'default'}}>
                <span className="contact-link-icon">📍</span>
                <div>
                  <span className="contact-link-label">Location</span>
                  <span className="contact-link-val">Patna, Bihar, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-side aos">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" placeholder="Rahul Sharma"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" placeholder="rahul@example.com" type="email"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows={5} placeholder="Hi Vivek, I'd love to discuss..."
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>
            <button className="send-btn" onClick={handleSend}>
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-copy">© 2025 <span className="footer-accent">Vivek Kumar</span>. All rights reserved.</div>
        <div className="footer-copy">Built with <span className="footer-accent">React.js</span> · Patna, Bihar 🇮🇳</div>
      </footer>
    </div>
  );
}
