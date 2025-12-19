export function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-24"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none"></div>

      <div className="px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 lg:w-2/3 items-start">
            <div className="flex flex-col gap-5 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  <span className="text-xs font-mono font-medium text-accent uppercase tracking-wide">
                    Available for projects
                  </span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                Fullstack{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent-dark animate-gradient-x">
                  Developer
                </span>
              </h1>

              <p className="text-lg text-secondary leading-relaxed max-w-[640px]">
                I'm a developer who enjoys building functional and clean web
                applications. I focus on learning every day and creating useful
                tools for users. Currently helping clients worldwide on Upwork.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <a
                  href="https://github.com/isachadev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-white text-black hover:bg-white/90 text-sm font-bold transition-all shadow-xl shadow-accent/10"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    code
                  </span>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/isaias-david-chavez-apaza-717b2314b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-transparent border border-border hover:border-accent/50 text-white hover:bg-white/5 text-sm font-bold transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.upwork.com/freelancers/isaiasdavidc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-green-600/10 border border-green-600/30 text-green-500 hover:bg-green-600/20 text-sm font-bold transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    work
                  </span>
                  <span>Upwork Profile</span>
                </a>
              </div>

              {/* Discrete Anti-Bot Email Copy */}
              <button
                onClick={(e) => {
                  const user = "isachavez.apaza";
                  const domain = "gmail.com";
                  const email = `${user}@${domain}`;
                  navigator.clipboard.writeText(email);

                  const span = e.currentTarget.querySelector("span:last-child");
                  if (span) {
                    const originalText = span.textContent;
                    span.textContent = "Email copied to clipboard!";
                    span.classList.add("text-accent");
                    setTimeout(() => {
                      span.textContent = originalText;
                      span.classList.remove("text-accent");
                    }, 2000);
                  }
                }}
                className="group flex items-center gap-2 text-xs font-mono text-secondary hover:text-white transition-colors w-fit pl-1"
                title="Click to copy email"
              >
                <span className="material-symbols-outlined text-[16px]">
                  mail
                </span>
                <span className="group-hover:underline decoration-white/20 underline-offset-4 transition-all">
                  Copy Email Address
                </span>
              </button>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10 pt-8 border-t border-border w-full">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-white font-mono">
                  1+
                </span>
                <span className="text-xs text-secondary uppercase tracking-wider font-semibold">
                  Year Exp.
                </span>
              </div>

              <div className="hidden sm:block w-px h-12 bg-border"></div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white font-mono">
                    100%
                  </span>
                  <span className="material-symbols-outlined text-green-500 text-base">
                    verified
                  </span>
                </div>
                <span className="text-xs text-secondary uppercase tracking-wider font-semibold">
                  Upwork Job Success
                </span>
              </div>

              <div className="hidden sm:block w-px h-12 bg-border"></div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent text-3xl">
                    workspace_premium
                  </span>
                  <span className="text-3xl font-bold text-white font-mono">
                    Rising
                  </span>
                </div>
                <span className="text-xs text-secondary uppercase tracking-wider font-semibold">
                  Talent on Upwork
                </span>
              </div>
            </div>
          </div>

          {/* Circular Profile Image Column */}
          <div className="relative w-full lg:w-1/3 flex flex-col items-center lg:items-end gap-6">
            {/* Image Container */}
            <div className="relative size-64 sm:size-72 lg:size-80">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-accent/10 rounded-full blur-3xl -z-10"></div>

              <div className="relative w-full h-full rounded-full p-1 border border-border bg-surface shadow-2xl overflow-hidden group">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center transition-all duration-700 ease-in-out scale-100 group-hover:scale-105 shadow-inner"
                  style={{ backgroundImage: "url('/portfolio/profile.png')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
              </div>
            </div>

            {/* Name & Title */}
            <div className="flex flex-col items-center gap-1 w-64 sm:w-72 lg:w-80">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Isaias David Chavez
              </h2>
              <p className="text-xs font-mono text-secondary uppercase tracking-widest opacity-80">
                Software Developer
              </p>
            </div>

            {/* Minimalist Nav Icons */}
            <div className="flex justify-center gap-8 w-64 sm:w-72 lg:w-80 pt-2">
              {[
                { label: "Projects", icon: "folder_open", target: "projects" },
                {
                  label: "Experience",
                  icon: "history_edu",
                  target: "experience",
                },
                { label: "Stack", icon: "code", target: "stack" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.target);
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition =
                        element.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="group flex flex-col items-center gap-1.5 cursor-pointer relative"
                  title={`Scroll to ${item.label}`}
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary/40 group-hover:text-accent transition-all duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-4 whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Infinite Tech Stack Marquee */}
        <div
          className="mt-24 lg:mt-28 w-full max-w-5xl overflow-hidden relative mx-auto px-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex w-max animate-scroll">
            {/* Double the list to create infinite loop illusion */}
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-12 sm:gap-24 px-6 sm:px-12 shrink-0"
              >
                {[
                  { name: "JavaScript", icon: "javascript" },
                  { name: "TypeScript", icon: "data_object" },
                  { name: "PHP", icon: "php" },
                  { name: "Laravel", icon: "deployed_code" },
                  { name: "SQL", icon: "database" },
                  { name: "React", icon: "code_blocks" },
                  { name: "Node.js", icon: "terminal" },
                ].map((tech) => (
                  <div
                    key={`${i}-${tech.name}`}
                    className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-default"
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {tech.icon}
                    </span>
                    <span className="text-sm font-mono font-bold tracking-widest uppercase">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
