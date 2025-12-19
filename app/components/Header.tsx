import { useLocation, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State
  const isClickingRef = useRef(false);

  // Scroll Spy Logic
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -50% 0px", 
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isClickingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["home", "projects", "experience", "stack", "contact"];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    isClickingRef.current = true;
    setActiveSection(targetId);
    
    // Close mobile menu if open
    setIsMenuOpen(false);

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        setTimeout(() => {
          isClickingRef.current = false;
        }, 800);
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToTarget, 100);
    } else {
      scrollToTarget();
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Exp", id: "experience" },
    { name: "Stack", id: "stack" },
    { name: "Review", id: "contact" },
  ];

  return (
    <>
      <header className="w-full border-b border-white/5 bg-page/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-100">
        <div className="px-5 md:px-8 h-16 max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* Mobile Logo / Home Link (Visible only on mobile to maintain layout) */}
          <div className="md:hidden">
             <a href="/" onClick={(e) => handleNavClick(e, 'home')} className="font-mono font-bold text-white text-lg">
               Isachadev
             </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-1 mx-auto">
            <div className="flex items-center gap-1 bg-surface/50 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-100 cursor-pointer ${
                    activeSection === link.id && location.pathname === "/"
                      ? "bg-white text-black shadow-lg scale-105" 
                      : "text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center p-2 text-white hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-page/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "translate-y-0 opacity-100 pointer-events-auto" 
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={`/#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            className={`text-2xl font-bold font-mono tracking-tight transition-colors ${
              activeSection === link.id
                ? "text-accent"
                : "text-white hover:text-secondary"
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}