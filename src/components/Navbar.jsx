import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import resume from "../assets/pdf/Vivek_Resume.pdf";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  /* Scroll Effect */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  /* Outside Click */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  /* ESC */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* Lock Scroll */

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.documentElement.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/75 backdrop-blur-2xl border-b border-white/10 shadow-lg"
          : "bg-[#020617]/90 backdrop-blur-xl"
      }`}
    >
      {/* Navbar */}

      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}

        <a
          href="#home"
          onClick={() => setIsOpen(false)}
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide whitespace-nowrap text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          VIVEK KUMAR
        </a>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          {/* Resume */}

          <a
            href={resume}
            download="Vivek_Kumar_Resume.pdf"
            className="hidden md:inline-flex items-center justify-center rounded-md border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
          >
            Resume
          </a>

          {/* Hamburger */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-cyan-400 transition hover:bg-slate-700 active:scale-95"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}

      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 px-5 py-5"
          style={{
            paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center border-b border-slate-800 py-4 text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Resume */}

            <a
              href={resume}
              download="Vivek_Kumar_Resume.pdf"
              onClick={() => setIsOpen(false)}
              className="mt-5 flex items-center justify-center rounded-lg border border-cyan-500 bg-cyan-500/10 py-3 font-medium text-cyan-400 transition hover:bg-cyan-500/20"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
