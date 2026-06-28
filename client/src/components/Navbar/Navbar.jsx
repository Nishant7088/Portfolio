import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import AddContentModal from "../Modals/AddContentModal.jsx";
import OwnerLoginModal from "../Modals/OwnerLoginModal.jsx";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isOwner, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="container navbar-inner">
          <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}>
            <span className="gradient-text">NA.</span>
          </a>

          <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <button key={link.label} onClick={() => handleNavClick(link.href)}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </motion.span>
            </button>

            <div
              className="profile-wrapper"
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              <button
                className="profile-icon"
                onClick={() => (isOwner ? setProfileMenuOpen((p) => !p) : setShowLogin(true))}
                aria-label="Profile"
              >
                👤
              </button>

              {isOwner && profileMenuOpen && (
                <motion.div
                  className="profile-menu glass-card"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button onClick={() => setShowAddContent(true)}>Add Content</button>
                  <button onClick={logout}>Logout</button>
                </motion.div>
              )}
            </div>

            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {menuOpen && <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />}
      </header>

      {showAddContent && <AddContentModal onClose={() => setShowAddContent(false)} />}
      {showLogin && <OwnerLoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;