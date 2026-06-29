import "./Footer.css";

const QUICK_LINKS = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Nishant7088" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nishant-agarwal-5a3a8a211/" },
  { label: "Email", href: "mailto:anishant415@gmail.com" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <h3 className="gradient-text">NA.</h3>
          <p>MERN Stack Developer crafting fast, futuristic digital experiences.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Social</h4>
          <ul>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Nishant Agarwal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
