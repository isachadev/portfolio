export function Experience() {
  const experiences = [
    {
      id: 1,
      role: "Freelance Software Engineer",
      company: "Upwork / Remote",
      period: "2025 — Present",
      description: "I work remotely with clients from Spain, Brazil, and the USA on both fixed-price and hourly contracts. My role varies per project: I handle feature planning, budget estimation, and full-stack development. I often jump between fixing bugs in legacy code and building new modules using React, PHP, or Python.",
      skills: ["React", "Next.js", "WordPress", "Python", "Stripe API"]
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "UMSS - Faculty of Political and Juridical Sciences",
      period: "2025",
      description: "Built an administrative system as part of a two-person team. My responsibilities included gathering requirements from university staff, planning the database structure, and coding key modules. We prioritized integration testing to ensure the system was stable and ready for official deployment.",
      skills: ["PHP", "Laravel", "Livewire", "MySQL", "Integration Testing"]
    },
    {
      id: 3,
      role: "Lead Full Stack Developer",
      company: "Corporación Bozo",
      period: "2024 — 2025",
      description: "Led the development of a B2C logistics app for delivery drivers. I managed the entire process from planning to deployment, building the mobile app with React Native and the backend with Supabase. I also handled complex integrations like Google Maps for live tracking and a QR payment gateway with the National Bank of Bolivia.",
      skills: ["React Native", "TypeScript", "Supabase", "Google Maps API", "DenoJS"]
    }
  ];

  return (
    <section id="experience" className="py-20 lg:py-24 px-6 lg:px-8 max-w-7xl mx-auto border-t border-border bg-page">
      <div className="flex flex-col gap-4 mb-16">
         <span className="text-accent font-mono text-xs tracking-widest uppercase font-bold">Career Path</span>
         <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Professional <span className="text-secondary">History</span>
         </h2>
      </div>

      <div className="relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-12">
        {experiences.map((job, index) => {
          const isCurrent = index === 0;
          return (
            <div key={job.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className={`absolute -left-[5px] top-2 size-2.5 rounded-full border shadow-[0_0_0_4px_rgba(0,0,0,1)] ${
                isCurrent 
                  ? "bg-accent border-accent shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                  : "bg-surface border-white/20"
              }`}></div>
              
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className={`text-xl font-bold ${isCurrent ? "text-accent" : "text-white"}`}>
                    {job.role}
                  </h3>
                  <span className={`font-mono text-xs uppercase tracking-wider px-2 py-1 rounded border ${
                    isCurrent 
                      ? "text-accent border-accent/30 bg-accent/5" 
                      : "text-secondary/60 border-border/50 bg-surface"
                  }`}>
                    {job.period}
                  </span>
                </div>
                
                <h4 className={`text-sm font-bold ${isCurrent ? "text-white" : "text-secondary"}`}>{job.company}</h4>
                
                <p className="text-secondary/80 text-sm leading-relaxed max-w-2xl mt-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded text-[10px] font-mono text-secondary border border-white/5 bg-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}