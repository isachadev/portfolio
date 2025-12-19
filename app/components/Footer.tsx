export function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 bg-page">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left: Simple Copyright */}
        <p className="text-secondary/40 font-mono text-xs tracking-widest uppercase">
          &copy; 2025 isachadev
        </p>

        {/* Right: Discrete Contact Actions */}
        <div className="flex items-center gap-8">
          {/* Anti-Bot Email Button */}
          <button
            onClick={(e) => {
              const user = "isachavez.apaza";
              const domain = "gmail.com";
              const email = `${user}@${domain}`;
              navigator.clipboard.writeText(email);
              
              const span = e.currentTarget.querySelector('span');
              if (span) {
                const originalText = span.textContent;
                span.textContent = "Copied!";
                span.classList.add("text-accent");
                setTimeout(() => {
                  span.textContent = originalText;
                  span.classList.remove("text-accent");
                }, 2000);
              }
            }}
            className="text-xs font-mono text-secondary hover:text-white transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            <span>Email Me</span>
          </button>

          {/* Social Links - Discreet Text */}
          <a 
            href="https://github.com/isachadev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-mono text-secondary hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/isaias-david-chavez-apaza-717b2314b/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-mono text-secondary hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}