export function Stack() {
  return (
    <section id="stack" className="py-20 lg:py-24 px-6 lg:px-8 max-w-7xl mx-auto border-t border-border bg-page">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        
        {/* Header Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-accent font-mono text-xs tracking-widest uppercase font-bold">Skills & Tools</span>
            <h2 className="text-3xl font-bold text-white leading-tight">
              My Technical <br/><span className="text-secondary">Toolkit</span>
            </h2>
          </div>
          <p className="text-secondary leading-relaxed text-sm">
            I prioritize a modern stack that offers type safety, performance, and developer experience. Here are the technologies I work with on a daily basis.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          
          {/* Category: Frontend */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-mono font-bold text-white border-b border-border pb-2 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-accent">code</span>
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "JavaScript (ES6+)", "React", "Next.js", "Tailwind CSS", "HTML5 & CSS3"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-md bg-surface border border-border text-sm text-secondary hover:text-white hover:border-accent/30 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Category: Backend */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-mono font-bold text-white border-b border-border pb-2 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-purple-400">dns</span>
              Backend & CMS
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "PHP", "Laravel", "WordPress", "PostgreSQL", "MySQL", "REST APIs"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-md bg-surface border border-border text-sm text-secondary hover:text-white hover:border-purple-400/30 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Category: Tools */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-mono font-bold text-white border-b border-border pb-2 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-green-400">terminal</span>
              Tools & DevOps
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Git", "GitHub", "Docker", "Postman", "VS Code", "Figma", "Vercel"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-md bg-surface border border-border text-sm text-secondary hover:text-white hover:border-green-400/30 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}