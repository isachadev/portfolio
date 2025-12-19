import { useLocation, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const isClickingRef = useRef(false); // Flag para bloquear el spy durante el click scroll

  // Scroll Spy Logic usando Intersection Observer
  useEffect(() => {
    // Si no estamos en la home, limpiamos el activo
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observerOptions = {
      root: null,
      // rootMargin define la "línea de meta" invisible.
      // -10% arriba: Ignora un poco el top.
      // -50% abajo: La sección debe cruzar la mitad de la pantalla para activarse.
      rootMargin: "-10% 0px -50% 0px", 
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isClickingRef.current) return; // Si el usuario hizo clic, ignoramos el scroll automático

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
    
    // 1. Marcar que estamos en modo "click" para pausar el observer
    isClickingRef.current = true;
    setActiveSection(targetId); // Feedback inmediato visual (optimista)

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

        // 2. Desbloquear el observer después de que termine la animación (aprox 800ms)
        setTimeout(() => {
          isClickingRef.current = false;
          // Verificación final por si el scroll no llegó exacto
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
    <header className="w-full border-b border-white/5 bg-page/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-100">
      <div className="px-5 md:px-8 h-16 max-w-7xl mx-auto flex items-center justify-between md:justify-center relative">
        
        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* Mobile Menu Toggle (Visible only on mobile) */}
        <div className="md:hidden flex w-full justify-end">
          <button className="flex items-center justify-center p-2 text-secondary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
