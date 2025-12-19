export function Projects() {
  const projects = [
    {
      id: "logistics-app",
      title: "Logistics App for Drivers",
      role: "Mobile Developer",
      description: "Developed an Android logistics app for efficient delivery management. Features dynamic forms for driver registration and real-time task updates, optimized for performance in low-resource environments.",
      tech: ["React Native", "TypeScript", "Supabase", "PostgreSQL"],
      image: "/portfolio/projects/kaypikani-project.png",
    },
    {
      id: "payroll-system",
      title: "University Payroll & Academic System",
      role: "Full Stack Developer",
      description: "Automated teacher scheduling, attendance tracking, and precise payroll calculation for a university department. Built with a focus on administrative efficiency.",
      tech: ["Laravel", "Livewire", "PHP", "MySQL"],
      image: "/portfolio/projects/umss-project.png",
    },
    {
      id: "health-age",
      title: "Health Age Analytics Platform",
      role: "Technical Lead & Full-Stack Engineer",
      description: "Developed a secure health analytics platform that calculates 'Health Age' through complex deterministic algorithms, featuring a React-based dashboard and a robust Flask API.",
      tech: ["React.js", "Python (Flask)", "PostgreSQL", "JWT", "Railway"],
      image: "/portfolio/projects/healthage-project.png",
    },
    {
      id: "property-calendar",
      title: "Property Calendar Pro",
      role: "Full Stack Developer (Desktop & Web)",
      description: "A high-performance management system for real estate agents. Built as a cross-platform desktop application, it functions like a specialized Google Calendar for property bookings and management.",
      tech: ["Next.js", "Tauri", "SQLite", "TypeScript", "Tailwind"],
      image: "/portfolio/projects/propertycalendar-project.png",
    },
  ];

  return (
    <section id="projects" className="py-24 lg:py-32 bg-page relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-4 mb-16 items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border">
            <span className="size-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-wider">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Selected <span className="text-secondary">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <button 
              key={project.id}
              onClick={() => alert(`This case study is currently under development. \nLast portfolio update: Dec 19, 2025.`)}
              className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-secondary/40 hover:shadow-2xl transition-all duration-300 text-left cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-border">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Info Section */}
              <div className="flex flex-col p-6 lg:p-8 gap-6 flex-1">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-[10px] font-mono font-bold text-accent uppercase">
                      {project.role}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-secondary text-sm leading-relaxed line-clamp-4">
                  {project.description}
                </p>

                {/* Tech Specs Block - Highly Visible */}
                <div className="pt-6 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-2 mb-3 opacity-50">
                    <span className="material-symbols-outlined text-[14px]">terminal</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-[12px] font-mono font-medium text-white group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
