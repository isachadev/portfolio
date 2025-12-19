import type { Route } from "./+types/project.$slug";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Project: ${params.slug} - Dev Portfolio` },
    { name: "description", content: "Case study of a high-performance distributed API gateway." },
  ];
}

export default function ProjectDetail() {
  return (
    <div className="bg-page min-h-screen">
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-border/50">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-8 pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent font-mono">
                  v2.4.0
                </span>
                <span className="inline-flex items-center rounded border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-secondary font-mono">
                  Infrastructure
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Global Edge API Gateway
              </h1>
              <p className="text-lg text-secondary max-w-2xl leading-relaxed">
                A high-performance, distributed API gateway built with Rust and WebAssembly. Reduced global latency by 40% and handles 1M+ req/s with 99.99% uptime.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center rounded bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition-colors gap-2">
                <span className="material-symbols-outlined text-lg">code</span>
                View Repository
              </button>
              <button className="inline-flex items-center justify-center rounded border border-border bg-surface px-5 py-2.5 text-sm font-medium text-white hover:bg-surface-highlight transition-colors">
                Read Architecture Docs
                <span className="material-symbols-outlined ml-2 text-sm">article</span>
              </button>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="text-xs text-secondary mb-3 font-mono uppercase tracking-wider">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono">Rust</span>
                <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono">WebAssembly</span>
                <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono">Redis</span>
                <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono">Docker</span>
                <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono">Terraform</span>
                <span className="px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono">AWS Lambda</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:max-w-xl xl:max-w-2xl">
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border bg-surface shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-8 bg-surface border-b border-border flex items-center px-3 gap-1.5 z-10">
                <div className="size-2.5 rounded-full bg-red-500/50"></div>
                <div className="size-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="size-2.5 rounded-full bg-green-500/50"></div>
                <div className="ml-4 text-[10px] text-secondary font-mono opacity-60">src/gateway/main.rs</div>
              </div>
              <div 
                className="absolute inset-0 top-8 bg-cover bg-center opacity-80" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClI5heCwvlxsYi9a3jfwlvSGdQpLjwj30CPeyxTZjufXGj6D5ZqKRG6ebOs1zgU5GgM3XDV0p9QA5q2Fb-QZ3Lz2gNq5UNAbCRFvlF_gQMO2EUUGy0m_yIGUfUD1mKX6-O74Izu2gjmOhrH4m5NqsYJf_4SAg2Q_5buMD5qYC0Et0wanzyLfYy1E-LoxSj1EwxtvOHIMkrm1CPZCozzMOBpcsdLI5v-eEV-4eKf-GbRF4ZubFhkFcjGiw7ipq5Re5fTzkuEUHloHsr')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-page to-transparent opacity-90"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-sm border border-border/50 rounded font-mono text-xs sm:text-sm text-gray-300 shadow-xl overflow-hidden">
                <pre><code>
<span className="text-purple-400">async fn</span> <span className="text-blue-400">handle_request</span>(req: Request) -&gt; Result&lt;Response&gt; {'{'}
    <span className="text-gray-500 italic">// Route to nearest edge node</span>
    <span className="text-purple-400">let</span> region = <span className="text-blue-400">get_nearest_region</span>(&req);
    <span className="text-purple-400">let</span> cached = cache.<span className="text-blue-400">get</span>(&req.path).<span className="text-purple-400">await</span>?;
    <span className="text-purple-400">if let</span> Some(res) = cached {'{'}
        <span className="text-purple-400">return</span> <span className="text-blue-400">Ok</span>(res);
    {'}'}
    <span className="text-gray-500 italic">// Fallback to origin</span>
    origin.<span className="text-blue-400">fetch</span>(req).<span className="text-purple-400">await</span>
{'}'}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-wider text-secondary">Organization</span>
              <span className="text-sm font-semibold text-white">StreamFlow Systems</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-wider text-secondary">My Role</span>
              <span className="text-sm font-semibold text-white">Senior Backend Engineer</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-wider text-secondary">Timeline</span>
              <span className="text-sm font-semibold text-white">Q3 2023 - Q1 2024</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-wider text-secondary">Repository</span>
              <a href="#" className="text-sm font-semibold text-accent hover:underline flex items-center gap-1">
                github.com/streamflow
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 w-full space-y-24">
        <section className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <h2 className="text-xl font-bold text-white sticky top-24 flex items-center gap-2">
              <span className="text-accent material-symbols-outlined">bug_report</span>
              The Problem
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-2xl font-bold leading-tight text-white">
              Global latency spikes and inconsistent API response times were causing timeouts for 15% of users.
            </h3>
            <div className="prose prose-invert prose-lg text-secondary">
              <p>
                The legacy monolithic Node.js application was hosted in a single AWS region (us-east-1). Users in Asia and Europe experienced RTTs exceeding 400ms. Additionally, the synchronous processing model caused thread blocking during high-traffic bursts, leading to cascading failures.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded border border-border bg-surface/50">
                <div className="text-red-400 font-bold text-xs font-mono mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  LATENCY
                </div>
                <p className="font-medium text-white">Average RTT &gt; 400ms for non-US traffic.</p>
              </div>
              <div className="p-5 rounded border border-border bg-surface/50">
                <div className="text-red-400 font-bold text-xs font-mono mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">memory</span>
                  RESOURCE INTENSIVE
                </div>
                <p className="font-medium text-white">High memory footprint per connection.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-accent material-symbols-outlined">hub</span>
              System Architecture
            </h2>
            <p className="text-secondary max-w-md text-sm md:text-right">
              Transitioning from Monolith to Distributed Edge Computing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded border border-border bg-surface">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-50 grayscale hover:grayscale-0" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC56FHxdzEkw7LOZe-yoySKKMmprt6se1zQprxR_bj5XkNaEVX9_EClr3B-28YDEBspigBauZyPL-1oJqzWIF_Jgzu6ToEfJHEgV3L3-FJ-8uOhyrFqa2jrpbi1OeQL0grPDiZihxp4YTgX6kOHw39YE8Zc1SDZ3C6hvB9UebPij-q9xLnDx3dsD4Crv-0SkqE6HBqPehLsMzo6uqIhVY_QIF7DodsbQVTUsw0z1_J5zIQX4weO7upVf0AmbqGg13uSfrk3f-hf8hDC')" }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <span className="text-white font-mono text-sm font-bold">Initial RFC Diagrams</span>
              </div>
            </div>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded border border-border bg-surface">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-60 grayscale hover:grayscale-0" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0qkuU8K7bFraRu3ptwtpnBIXnAgE24qz5-y-C9kCoVXosRlSeCXO65HMiNRIE6K67GUV_2hWZlYTvIm8m4weNk9OWcJl83AjGtStAEnUhin6W3_WEVR3RKlJlx85ajbS3S8aU0rY7CNryXUYkvpRWn2CaOfkXkmcczha83wU2px4fztUd_Ff_yYEQc2Kqa7EmIQ6VvBcD7QmQdEJW9SNFI7ai7ur-6XIsz6gVhnrRX_tK2657zNH0DMiGxB_w7C5o0FyHNTlpJLvK')" }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <span className="text-white font-mono text-sm font-bold">Data Replication Topology</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded p-6 md:p-10">
            <h3 className="text-lg font-bold mb-6 text-white font-mono">Request Lifecycle</h3>
            <div className="relative w-full aspect-[21/9] bg-page rounded overflow-hidden border border-border mb-6">
              <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-80 invert" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFP49cey_V7jzat6Tiwddeb4Ju0rhMyXEZDV4ASpJiQ70AgbUvk9-GlgYa45JUrnaXL6PFdYF-QYsVVUN-89IGMBFVtkW3AFPQXqPp9ma-2bzi6ifrocIp9r7g1leIgnIAPzSAKB7iRWL2GYejRqX9xNqJKuKKXS8iYxGrDnFQNjJFC_l2JAdPIFUO9n6elCcR52cEYvl1v2CDqn2J5Y0CJBfFTwktjW3ykOLDSF9-VLw3P7c0mghGlhFop96fhTb7_rk_XDW64DF4')" }}
              ></div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-secondary">
              <li className="flex gap-3">
                <span className="flex-none size-6 rounded bg-surface-highlight border border-border flex items-center justify-center font-mono text-xs text-white">1</span>
                <span>Request hits nearest edge node (GeoDNS).</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-none size-6 rounded bg-surface-highlight border border-border flex items-center justify-center font-mono text-xs text-white">2</span>
                <span>Wasm worker checks Redis hot cache.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-none size-6 rounded bg-surface-highlight border border-border flex items-center justify-center font-mono text-xs text-white">3</span>
                <span>Asynchronous fetch from origin if miss.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-12">
          <div className="md:text-center max-w-3xl mx-auto space-y-4">
            <span className="text-accent font-mono text-xs uppercase tracking-wider">Implementation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Rust + Wasm at the Edge</h2>
            <p className="text-lg text-secondary">
              We rewrote critical paths in Rust, compiled to WebAssembly, and deployed to a global edge network.
            </p>
          </div>

          {/* Code Snippet Card */}
          <div className="relative rounded-lg border border-border bg-surface/30 p-8 md:p-12 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Smart Caching Strategy</h3>
                </div>
                <p className="text-secondary leading-relaxed">
                  Implemented a Stale-While-Revalidate pattern using Edge storage. This ensures users always get content instantly, while background workers update the cache asynchronously.
                </p>
                <div className="bg-page rounded border border-border p-4 font-mono text-xs overflow-x-auto text-gray-300">
                  <pre><code>
<span className="text-gray-500">// Cache configuration struct</span>
<span className="text-purple-400">struct</span> <span className="text-blue-400">CacheConfig</span> {'{'}
    ttl: <span className="text-blue-400">Duration</span>,
    stale_ttl: <span className="text-blue-400">Duration</span>,
    strategy: <span className="text-green-400">"stale-while-revalidate"</span>
{'}'}
<span className="text-purple-400">impl</span> CacheConfig {'{'}
    <span className="text-purple-400">fn</span> <span className="text-blue-400">should_revalidate</span>(&self, age: u64) -&gt; bool {'{'}
        age &gt; self.ttl.<span className="text-blue-400">as_secs</span>()
    {'}'}
{'}'}</code></pre>
                </div>
              </div>
              <div className="flex-1 relative min-h-[300px] flex items-center justify-center">
                <div className="w-full h-full bg-page rounded border border-border p-2 shadow-2xl">
                  <div className="h-6 border-b border-border flex items-center px-2 mb-2">
                    <span className="text-[10px] text-secondary font-mono">terminal — zsh</span>
                  </div>
                  <div className="font-mono text-xs space-y-1">
                    <div className="text-green-400">➜  ~ curl -I https://api.edge.dev/v1/data</div>
                    <div className="text-secondary">HTTP/2 200</div>
                    <div className="text-secondary">date: Mon, 24 Oct 2023 10:00:00 GMT</div>
                    <div className="text-secondary">content-type: application/json</div>
                    <div className="text-accent">x-cache: HIT</div>
                    <div className="text-accent">x-edge-region: fra1</div>
                    <div className="text-accent">server-timing: dur=14ms</div>
                    <div className="text-green-400 pt-2">➜  ~ <span className="animate-pulse">_</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="relative rounded-lg border border-border bg-surface/30 p-8 md:p-12 overflow-hidden">
            <div className="flex flex-col lg:flex-row-reverse gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Zero-Trust Security</h3>
                </div>
                <p className="text-secondary leading-relaxed">
                  We moved authentication to the edge. JWTs are validated in the Wasm layer before requests ever touch the origin server, blocking malicious traffic effectively.
                </p>
                <ul className="space-y-3 text-sm text-secondary pt-2">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500 text-sm">check</span>
                    <span>RSA-256 Signature Verification</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500 text-sm">check</span>
                    <span>Rate limiting per IP at the edge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500 text-sm">check</span>
                    <span>DDoS mitigation layer</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 relative w-full flex justify-center">
                <div className="relative w-full aspect-video bg-page rounded border border-border shadow-2xl overflow-hidden group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGxZvLnQV-HiRTl0yjJ1Y4yYIANqWaxw8GsazaKpOSsqZv0WljSR12rJ7XU9xxwqUGHL9JntC8F0vrD-oeaXGv_AWdojBoVCasHKZZW5UGJmWW1E6HkjRa4YIBJ4I3klK1RJz0M9kqyd0dSAW1A03RI-e66OchaUgtxAHstTYw7T53KOGdytXaCHlkutKgFU0Y8K81kccx_pwtLnLI_vKKrYIddHrgI9L_mEouyEG-rhmI7bGy74PVcfvVvohEcSHTGfVBsoMYixCr')" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/80 backdrop-blur p-4 rounded border border-red-900/50 text-center">
                      <div className="text-red-400 text-2xl font-bold font-mono">14,203</div>
                      <div className="text-gray-400 text-xs font-mono uppercase">Threats Blocked / Hr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Performance Metrics</h2>
              <p className="text-secondary">
                Measured over 30 days post-deployment.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-900/50 rounded text-xs font-mono flex items-center gap-2">
                <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                System Healthy
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col p-6 bg-surface border border-border rounded relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">timer</span>
              </div>
              <span className="text-4xl font-bold text-white mb-2 font-mono">50ms</span>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">-85%</span>
                <span className="text-sm font-medium text-secondary uppercase tracking-wider">Global Latency</span>
              </div>
              <p className="text-xs text-gray-500">95th percentile (p95)</p>
            </div>
            <div className="flex flex-col p-6 bg-surface border border-border rounded relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">savings</span>
              </div>
              <span className="text-4xl font-bold text-white mb-2 font-mono">-40%</span>
              <span className="text-sm font-medium text-secondary uppercase tracking-wider mb-2">Infrastructure Cost</span>
              <p className="text-xs text-gray-500">Reduced EC2 instance count</p>
            </div>
            <div className="flex flex-col p-6 bg-surface border border-border rounded relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">dns</span>
              </div>
              <span className="text-4xl font-bold text-white mb-2 font-mono">99.99%</span>
              <span className="text-sm font-medium text-secondary uppercase tracking-wider mb-2">System Uptime</span>
              <p className="text-xs text-gray-500">Zero downtime deployment</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
