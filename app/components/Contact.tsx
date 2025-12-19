export function Contact() {
  const reviews = [
    {
      id: 1,
      title: "Custom menus for website",
      date: "Oct 2025",
      text: "This is the second hire and I highly recommend Isaias for any web application or website builds. Great communication and fast/efficient work.",
      tags: ["Clear Communicator", "Reliable"]
    },
    {
      id: 2,
      title: "WordPress form fix",
      date: "Sep 2025",
      text: "It was such a pleasure working with Isaias. After several attempts to find someone who could fix an online form, he was the one who took the time to understand it, asked the right questions, and did not take on the project just to be hired. He completed it perfectly and even went out of his way to explain things carefully.",
      tags: ["Collaborative", "Committed to Quality"]
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
      
      <div className="flex flex-col gap-12">
        {/* Simple Header */}
        <div className="flex flex-col gap-3">
          <span className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase font-bold">Client Feedback</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">Recent Reviews</h2>
        </div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-bold text-white">{review.title}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-yellow-500 font-mono">5.0</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-secondary opacity-60">{review.date}</span>
              </div>
              
              <p className="text-secondary text-[15px] leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div className="flex flex-wrap gap-3 mt-2">
                {review.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono text-secondary/60 uppercase tracking-widest">
                    # {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Discreet Verified Link */}
        <div className="mt-12 flex justify-start">
          <a 
            href="https://www.upwork.com/freelancers/isaiasdavidc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-secondary hover:text-white transition-colors text-xs font-mono tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px] text-green-500">verified</span>
            <span>VERIFIED REVIEWS ON UPWORK</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>

      </div>
    </section>
  );
}