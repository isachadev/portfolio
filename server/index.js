import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, useNavigate, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const isClickingRef = useRef(false);
  useEffect(() => {
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
    const handleIntersect = (entries) => {
      if (isClickingRef.current) return;
      entries.forEach((entry2) => {
        if (entry2.isIntersecting) {
          setActiveSection(entry2.target.id);
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
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    isClickingRef.current = true;
    setActiveSection(targetId);
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
    { name: "Review", id: "contact" }
  ];
  return /* @__PURE__ */ jsx("header", { className: "w-full border-b border-white/5 bg-page/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-100", children: /* @__PURE__ */ jsxs("div", { className: "px-5 md:px-8 h-16 max-w-7xl mx-auto flex items-center justify-between md:justify-center relative", children: [
    /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-1", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 bg-surface/50 p-1.5 rounded-full border border-white/5 backdrop-blur-sm", children: navLinks.map((link) => /* @__PURE__ */ jsx(
      "a",
      {
        href: `/#${link.id}`,
        onClick: (e) => handleNavClick(e, link.id),
        className: `px-5 py-2 rounded-full text-sm font-medium transition-all duration-100 cursor-pointer ${activeSection === link.id && location.pathname === "/" ? "bg-white text-black shadow-lg scale-105" : "text-secondary hover:text-white hover:bg-white/5"}`,
        children: link.name
      },
      link.name
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden flex w-full justify-end", children: /* @__PURE__ */ jsx("button", { className: "flex items-center justify-center p-2 text-secondary hover:text-white transition-colors", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-2xl", children: "menu" }) }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "w-full py-12 px-6 border-t border-white/5 bg-page", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8", children: [
    /* @__PURE__ */ jsx("p", { className: "text-secondary/40 font-mono text-xs tracking-widest uppercase", children: "© 2025 isachadev" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: (e) => {
            const user = "isachavez.apaza";
            const domain = "gmail.com";
            const email = `${user}@${domain}`;
            navigator.clipboard.writeText(email);
            const span = e.currentTarget.querySelector("span");
            if (span) {
              const originalText = span.textContent;
              span.textContent = "Copied!";
              span.classList.add("text-accent");
              setTimeout(() => {
                span.textContent = originalText;
                span.classList.remove("text-accent");
              }, 2e3);
            }
          },
          className: "text-xs font-mono text-secondary hover:text-white transition-colors cursor-pointer",
          title: "Copy email to clipboard",
          children: /* @__PURE__ */ jsx("span", { children: "Email Me" })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/isachadev",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-xs font-mono text-secondary hover:text-white transition-colors",
          children: "GitHub"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://www.linkedin.com/in/isaias-david-chavez-apaza-717b2314b/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-xs font-mono text-secondary hover:text-white transition-colors",
          children: "LinkedIn"
        }
      )
    ] })
  ] }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@200..800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col min-h-screen",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("main", {
      className: "flex-1",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Contact() {
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
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 lg:py-32 px-6 lg:px-8 max-w-7xl mx-auto border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-accent font-mono text-[10px] tracking-[0.3em] uppercase font-bold", children: "Client Feedback" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white tracking-tight", children: "Recent Reviews" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16", children: reviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-white", children: review.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[16px] text-yellow-500", style: { fontVariationSettings: "'FILL' 1" }, children: "star" }, i)) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-yellow-500 font-mono", children: "5.0" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-secondary opacity-60", children: review.date })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-secondary text-[15px] leading-relaxed italic", children: [
        '"',
        review.text,
        '"'
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 mt-2", children: review.tags.map((tag) => /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-secondary/60 uppercase tracking-widest", children: [
        "# ",
        tag
      ] }, tag)) })
    ] }, review.id)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-start", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "https://www.upwork.com/freelancers/isaiasdavidc",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "group flex items-center gap-2 text-secondary hover:text-white transition-colors text-xs font-mono tracking-wider",
        children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[18px] text-green-500", children: "verified" }),
          /* @__PURE__ */ jsx("span", { children: "VERIFIED REVIEWS ON UPWORK" }),
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform", children: "arrow_forward" })
        ]
      }
    ) })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { id: "home", className: "relative flex flex-col justify-center overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-24", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 lg:px-8 max-w-7xl mx-auto w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 lg:w-2/3 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 text-left", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit", children: [
              /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
                /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" }),
                /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-accent" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-medium text-accent uppercase tracking-wide", children: "Available for projects" })
            ] }) }),
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight text-white", children: [
              "Fullstack ",
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent-dark animate-gradient-x", children: "Developer" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-secondary leading-relaxed max-w-[640px]", children: "I'm a developer who enjoys building functional and clean web applications. I focus on learning every day and creating useful tools for users. Currently helping clients worldwide on Upwork." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://github.com/isachadev",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-white text-black hover:bg-white/90 text-sm font-bold transition-all shadow-xl shadow-accent/10",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[18px]", children: "code" }),
                    /* @__PURE__ */ jsx("span", { children: "GitHub" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://www.linkedin.com/in/isaias-david-chavez-apaza-717b2314b/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-transparent border border-border hover:border-accent/50 text-white hover:bg-white/5 text-sm font-bold transition-all",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[18px]", children: "person_add" }),
                    /* @__PURE__ */ jsx("span", { children: "LinkedIn" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://www.upwork.com/freelancers/isaiasdavidc",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-green-600/10 border border-green-600/30 text-green-500 hover:bg-green-600/20 text-sm font-bold transition-all",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[18px]", children: "work" }),
                    /* @__PURE__ */ jsx("span", { children: "Upwork Profile" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: (e) => {
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
                    }, 2e3);
                  }
                },
                className: "group flex items-center gap-2 text-xs font-mono text-secondary hover:text-white transition-colors w-fit pl-1",
                title: "Click to copy email",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[16px]", children: "mail" }),
                  /* @__PURE__ */ jsx("span", { className: "group-hover:underline decoration-white/20 underline-offset-4 transition-all", children: "Copy Email Address" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-10 pt-8 border-t border-border w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white font-mono", children: "1+" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-secondary uppercase tracking-wider font-semibold", children: "Year Exp." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden sm:block w-px h-12 bg-border" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white font-mono", children: "100%" }),
                /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-green-500 text-base", children: "verified" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-secondary uppercase tracking-wider font-semibold", children: "Upwork Job Success" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden sm:block w-px h-12 bg-border" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-accent text-3xl", children: "workspace_premium" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-white font-mono", children: "Rising" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-secondary uppercase tracking-wider font-semibold", children: "Talent on Upwork" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative w-full lg:w-1/3 flex justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative size-64 sm:size-72 lg:size-80", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-accent/10 rounded-full blur-3xl -z-10" }),
            /* @__PURE__ */ jsx("div", { className: "relative w-full h-full rounded-full p-1 border border-border bg-surface shadow-2xl overflow-hidden group", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-full h-full rounded-full bg-cover bg-center transition-all duration-700 ease-in-out scale-100 group-hover:scale-105 shadow-inner",
                style: { backgroundImage: "url('/profile.png')" }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-8 mt-6", children: [
            { label: "Projects", icon: "folder_open", target: "projects" },
            { label: "Experience", icon: "history_edu", target: "experience" },
            { label: "Stack", icon: "code", target: "stack" }
          ].map((item) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => {
                e.preventDefault();
                const element = document.getElementById(item.target);
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              },
              className: "group flex flex-col items-center gap-1.5 cursor-pointer relative",
              title: `Scroll to ${item.label}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[20px] text-secondary/40 group-hover:text-accent transition-all duration-300 group-hover:scale-110", children: item.icon }),
                /* @__PURE__ */ jsx("span", { className: "text-[9px] font-mono font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-4 whitespace-nowrap", children: item.label })
              ]
            },
            item.label
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "mt-24 lg:mt-28 w-full max-w-5xl overflow-hidden relative mx-auto px-4",
          style: { maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" },
          children: /* @__PURE__ */ jsx("div", { className: "flex w-max animate-scroll", children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "flex items-center gap-12 sm:gap-24 px-6 sm:px-12 shrink-0", children: [
            { name: "JavaScript", icon: "javascript" },
            { name: "TypeScript", icon: "data_object" },
            { name: "PHP", icon: "php" },
            { name: "Laravel", icon: "deployed_code" },
            { name: "SQL", icon: "database" },
            { name: "React", icon: "code_blocks" },
            { name: "Node.js", icon: "terminal" }
          ].map((tech) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-default", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-3xl", children: tech.icon }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-mono font-bold tracking-widest uppercase", children: tech.name })
          ] }, `${i}-${tech.name}`)) }, i)) })
        }
      )
    ] })
  ] });
}
function Projects() {
  const projects = [
    {
      id: "logistics-app",
      title: "Logistics App for Drivers",
      role: "Mobile Developer",
      description: "Developed an Android logistics app for efficient delivery management. Features dynamic forms for driver registration and real-time task updates, optimized for performance in low-resource environments.",
      tech: ["React Native", "TypeScript", "Supabase", "PostgreSQL"],
      image: "/projects/kaypikani-project.png"
    },
    {
      id: "payroll-system",
      title: "University Payroll & Academic System",
      role: "Full Stack Developer",
      description: "Automated teacher scheduling, attendance tracking, and precise payroll calculation for a university department. Built with a focus on administrative efficiency.",
      tech: ["Laravel", "Livewire", "PHP", "MySQL"],
      image: "/projects/umss-project.png"
    },
    {
      id: "health-age",
      title: "Health Age Analytics Platform",
      role: "Technical Lead & Full-Stack Engineer",
      description: "Developed a secure health analytics platform that calculates 'Health Age' through complex deterministic algorithms, featuring a React-based dashboard and a robust Flask API.",
      tech: ["React.js", "Python (Flask)", "PostgreSQL", "JWT", "Railway"],
      image: "/projects/healthage-project.png"
    },
    {
      id: "property-calendar",
      title: "Property Calendar Pro",
      role: "Full Stack Developer (Desktop & Web)",
      description: "A high-performance management system for real estate agents. Built as a cross-platform desktop application, it functions like a specialized Google Calendar for property bookings and management.",
      tech: ["Next.js", "Tauri", "SQLite", "TypeScript", "Tailwind"],
      image: "/projects/propertycalendar-project.png"
    }
  ];
  return /* @__PURE__ */ jsxs("section", { id: "projects", className: "py-24 lg:py-32 bg-page relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-16 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border", children: [
          /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-accent animate-pulse" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono font-bold text-secondary uppercase tracking-wider", children: "Portfolio" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-white tracking-tight", children: [
          "Selected ",
          /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "Projects" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: projects.map((project) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => alert(`This case study is currently under development. 
Last portfolio update: Dec 19, 2025.`),
          className: "group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-secondary/40 hover:shadow-2xl transition-all duration-300 text-left cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[16/9] overflow-hidden border-b border-border", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105",
                  style: { backgroundImage: `url('${project.image}')` }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-6 lg:p-8 gap-6 flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-[10px] font-mono font-bold text-accent uppercase", children: project.role }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white group-hover:text-accent transition-colors", children: project.title })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-secondary text-sm leading-relaxed line-clamp-4", children: project.description }),
              /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-white/5 mt-auto", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3 opacity-50", children: [
                  /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[14px]", children: "terminal" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono font-bold uppercase tracking-widest", children: "Stack" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tech.map((t) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-[12px] font-mono font-medium text-white group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300", children: t }, t)) })
              ] })
            ] })
          ]
        },
        project.id
      )) })
    ] })
  ] });
}
function Stack() {
  return /* @__PURE__ */ jsx("section", { id: "stack", className: "py-20 lg:py-24 px-6 lg:px-8 max-w-7xl mx-auto border-t border-border bg-page", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-4 flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-accent font-mono text-xs tracking-widest uppercase font-bold", children: "Skills & Tools" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-white leading-tight", children: [
          "My Technical ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "Toolkit" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-secondary leading-relaxed text-sm", children: "I prioritize a modern stack that offers type safety, performance, and developer experience. Here are the technologies I work with on a daily basis." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-mono font-bold text-white border-b border-border pb-2 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[18px] text-accent", children: "code" }),
          "Frontend"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["TypeScript", "JavaScript (ES6+)", "React", "Next.js", "Tailwind CSS", "HTML5 & CSS3"].map((skill) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 rounded-md bg-surface border border-border text-sm text-secondary hover:text-white hover:border-accent/30 transition-colors cursor-default", children: skill }, skill)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-mono font-bold text-white border-b border-border pb-2 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[18px] text-purple-400", children: "dns" }),
          "Backend & CMS"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["Node.js", "PHP", "Laravel", "WordPress", "PostgreSQL", "MySQL", "REST APIs"].map((skill) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 rounded-md bg-surface border border-border text-sm text-secondary hover:text-white hover:border-purple-400/30 transition-colors cursor-default", children: skill }, skill)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-mono font-bold text-white border-b border-border pb-2 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[18px] text-green-400", children: "terminal" }),
          "Tools & DevOps"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Figma", "Vercel"].map((skill) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 rounded-md bg-surface border border-border text-sm text-secondary hover:text-white hover:border-green-400/30 transition-colors cursor-default", children: skill }, skill)) })
      ] })
    ] })
  ] }) });
}
function Experience() {
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
  return /* @__PURE__ */ jsxs("section", { id: "experience", className: "py-20 lg:py-24 px-6 lg:px-8 max-w-7xl mx-auto border-t border-border bg-page", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-16", children: [
      /* @__PURE__ */ jsx("span", { className: "text-accent font-mono text-xs tracking-widest uppercase font-bold", children: "Career Path" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white tracking-tight", children: [
        "Professional ",
        /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "History" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-12", children: experiences.map((job, index) => {
      const isCurrent = index === 0;
      return /* @__PURE__ */ jsxs("div", { className: "relative pl-8 md:pl-12", children: [
        /* @__PURE__ */ jsx("div", { className: `absolute -left-[5px] top-2 size-2.5 rounded-full border shadow-[0_0_0_4px_rgba(0,0,0,1)] ${isCurrent ? "bg-accent border-accent shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-surface border-white/20"}` }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1", children: [
            /* @__PURE__ */ jsx("h3", { className: `text-xl font-bold ${isCurrent ? "text-accent" : "text-white"}`, children: job.role }),
            /* @__PURE__ */ jsx("span", { className: `font-mono text-xs uppercase tracking-wider px-2 py-1 rounded border ${isCurrent ? "text-accent border-accent/30 bg-accent/5" : "text-secondary/60 border-border/50 bg-surface"}`, children: job.period })
          ] }),
          /* @__PURE__ */ jsx("h4", { className: `text-sm font-bold ${isCurrent ? "text-white" : "text-secondary"}`, children: job.company }),
          /* @__PURE__ */ jsx("p", { className: "text-secondary/80 text-sm leading-relaxed max-w-2xl mt-2", children: job.description }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: job.skills.map((skill) => /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-mono text-secondary border border-white/5 bg-white/5", children: skill }, skill)) })
        ] })
      ] }, job.id);
    }) })
  ] });
}
function meta$1() {
  return [{
    title: "Portfolio"
  }, {
    name: "description",
    content: "Welcome to my portfolio"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(Projects, {}), /* @__PURE__ */ jsx(Experience, {}), /* @__PURE__ */ jsx(Stack, {}), /* @__PURE__ */ jsx(Contact, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({
  params
}) {
  return [{
    title: `Project: ${params.slug} - Dev Portfolio`
  }, {
    name: "description",
    content: "Case study of a high-performance distributed API gateway."
  }];
}
const project_$slug = UNSAFE_withComponentProps(function ProjectDetail() {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-page min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-border/50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-10 lg:flex-row lg:items-start",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex-1 space-y-8 pt-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-3",
              children: [/* @__PURE__ */ jsx("span", {
                className: "inline-flex items-center rounded border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent font-mono",
                children: "v2.4.0"
              }), /* @__PURE__ */ jsx("span", {
                className: "inline-flex items-center rounded border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-secondary font-mono",
                children: "Infrastructure"
              })]
            }), /* @__PURE__ */ jsx("h1", {
              className: "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white",
              children: "Global Edge API Gateway"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg text-secondary max-w-2xl leading-relaxed",
              children: "A high-performance, distributed API gateway built with Rust and WebAssembly. Reduced global latency by 40% and handles 1M+ req/s with 99.99% uptime."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap gap-4",
            children: [/* @__PURE__ */ jsxs("button", {
              className: "inline-flex items-center justify-center rounded bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition-colors gap-2",
              children: [/* @__PURE__ */ jsx("span", {
                className: "material-symbols-outlined text-lg",
                children: "code"
              }), "View Repository"]
            }), /* @__PURE__ */ jsxs("button", {
              className: "inline-flex items-center justify-center rounded border border-border bg-surface px-5 py-2.5 text-sm font-medium text-white hover:bg-surface-highlight transition-colors",
              children: ["Read Architecture Docs", /* @__PURE__ */ jsx("span", {
                className: "material-symbols-outlined ml-2 text-sm",
                children: "article"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "pt-4 border-t border-border/50",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-xs text-secondary mb-3 font-mono uppercase tracking-wider",
              children: "Tech Stack"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap gap-2",
              children: [/* @__PURE__ */ jsx("span", {
                className: "px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono",
                children: "Rust"
              }), /* @__PURE__ */ jsx("span", {
                className: "px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono",
                children: "WebAssembly"
              }), /* @__PURE__ */ jsx("span", {
                className: "px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono",
                children: "Redis"
              }), /* @__PURE__ */ jsx("span", {
                className: "px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono",
                children: "Docker"
              }), /* @__PURE__ */ jsx("span", {
                className: "px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono",
                children: "Terraform"
              }), /* @__PURE__ */ jsx("span", {
                className: "px-2 py-1 bg-surface border border-border rounded text-xs text-secondary font-mono",
                children: "AWS Lambda"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "flex-1 w-full lg:max-w-xl xl:max-w-2xl",
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border bg-surface shadow-2xl",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "absolute top-0 left-0 right-0 h-8 bg-surface border-b border-border flex items-center px-3 gap-1.5 z-10",
              children: [/* @__PURE__ */ jsx("div", {
                className: "size-2.5 rounded-full bg-red-500/50"
              }), /* @__PURE__ */ jsx("div", {
                className: "size-2.5 rounded-full bg-yellow-500/50"
              }), /* @__PURE__ */ jsx("div", {
                className: "size-2.5 rounded-full bg-green-500/50"
              }), /* @__PURE__ */ jsx("div", {
                className: "ml-4 text-[10px] text-secondary font-mono opacity-60",
                children: "src/gateway/main.rs"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 top-8 bg-cover bg-center opacity-80",
              style: {
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClI5heCwvlxsYi9a3jfwlvSGdQpLjwj30CPeyxTZjufXGj6D5ZqKRG6ebOs1zgU5GgM3XDV0p9QA5q2Fb-QZ3Lz2gNq5UNAbCRFvlF_gQMO2EUUGy0m_yIGUfUD1mKX6-O74Izu2gjmOhrH4m5NqsYJf_4SAg2Q_5buMD5qYC0Et0wanzyLfYy1E-LoxSj1EwxtvOHIMkrm1CPZCozzMOBpcsdLI5v-eEV-4eKf-GbRF4ZubFhkFcjGiw7ipq5Re5fTzkuEUHloHsr')"
              }
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-t from-page to-transparent opacity-90"
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-sm border border-border/50 rounded font-mono text-xs sm:text-sm text-gray-300 shadow-xl overflow-hidden",
              children: /* @__PURE__ */ jsx("pre", {
                children: /* @__PURE__ */ jsxs("code", {
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-purple-400",
                    children: "async fn"
                  }), " ", /* @__PURE__ */ jsx("span", {
                    className: "text-blue-400",
                    children: "handle_request"
                  }), "(req: Request) -> Result<Response> ", "{", /* @__PURE__ */ jsx("span", {
                    className: "text-gray-500 italic",
                    children: "// Route to nearest edge node"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-purple-400",
                    children: "let"
                  }), " region = ", /* @__PURE__ */ jsx("span", {
                    className: "text-blue-400",
                    children: "get_nearest_region"
                  }), "(&req);", /* @__PURE__ */ jsx("span", {
                    className: "text-purple-400",
                    children: "let"
                  }), " cached = cache.", /* @__PURE__ */ jsx("span", {
                    className: "text-blue-400",
                    children: "get"
                  }), "(&req.path).", /* @__PURE__ */ jsx("span", {
                    className: "text-purple-400",
                    children: "await"
                  }), "?;", /* @__PURE__ */ jsx("span", {
                    className: "text-purple-400",
                    children: "if let"
                  }), " Some(res) = cached ", "{", /* @__PURE__ */ jsx("span", {
                    className: "text-purple-400",
                    children: "return"
                  }), " ", /* @__PURE__ */ jsx("span", {
                    className: "text-blue-400",
                    children: "Ok"
                  }), "(res);", "}", /* @__PURE__ */ jsx("span", {
                    className: "text-gray-500 italic",
                    children: "// Fallback to origin"
                  }), "origin.", /* @__PURE__ */ jsx("span", {
                    className: "text-blue-400",
                    children: "fetch"
                  }), "(req).", /* @__PURE__ */ jsx("span", {
                    className: "text-purple-400",
                    children: "await"
                  }), "}"]
                })
              })
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "border-b border-border bg-surface/30",
      children: /* @__PURE__ */ jsx("div", {
        className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-xs font-mono uppercase tracking-wider text-secondary",
              children: "Organization"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm font-semibold text-white",
              children: "StreamFlow Systems"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-xs font-mono uppercase tracking-wider text-secondary",
              children: "My Role"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm font-semibold text-white",
              children: "Senior Backend Engineer"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-xs font-mono uppercase tracking-wider text-secondary",
              children: "Timeline"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm font-semibold text-white",
              children: "Q3 2023 - Q1 2024"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-1",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-xs font-mono uppercase tracking-wider text-secondary",
              children: "Repository"
            }), /* @__PURE__ */ jsxs("a", {
              href: "#",
              className: "text-sm font-semibold text-accent hover:underline flex items-center gap-1",
              children: ["github.com/streamflow", /* @__PURE__ */ jsx("span", {
                className: "material-symbols-outlined text-xs",
                children: "open_in_new"
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsxs("main", {
      className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 w-full space-y-24",
      children: [/* @__PURE__ */ jsxs("section", {
        className: "grid md:grid-cols-12 gap-8 items-start",
        children: [/* @__PURE__ */ jsx("div", {
          className: "md:col-span-4",
          children: /* @__PURE__ */ jsxs("h2", {
            className: "text-xl font-bold text-white sticky top-24 flex items-center gap-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-accent material-symbols-outlined",
              children: "bug_report"
            }), "The Problem"]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "md:col-span-8 space-y-6",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold leading-tight text-white",
            children: "Global latency spikes and inconsistent API response times were causing timeouts for 15% of users."
          }), /* @__PURE__ */ jsx("div", {
            className: "prose prose-invert prose-lg text-secondary",
            children: /* @__PURE__ */ jsx("p", {
              children: "The legacy monolithic Node.js application was hosted in a single AWS region (us-east-1). Users in Asia and Europe experienced RTTs exceeding 400ms. Additionally, the synchronous processing model caused thread blocking during high-traffic bursts, leading to cascading failures."
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "p-5 rounded border border-border bg-surface/50",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "text-red-400 font-bold text-xs font-mono mb-2 flex items-center gap-1",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "material-symbols-outlined text-sm",
                  children: "trending_up"
                }), "LATENCY"]
              }), /* @__PURE__ */ jsx("p", {
                className: "font-medium text-white",
                children: "Average RTT > 400ms for non-US traffic."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "p-5 rounded border border-border bg-surface/50",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "text-red-400 font-bold text-xs font-mono mb-2 flex items-center gap-1",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "material-symbols-outlined text-sm",
                  children: "memory"
                }), "RESOURCE INTENSIVE"]
              }), /* @__PURE__ */ jsx("p", {
                className: "font-medium text-white",
                children: "High memory footprint per connection."
              })]
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "space-y-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-xl font-bold text-white flex items-center gap-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-accent material-symbols-outlined",
              children: "hub"
            }), "System Architecture"]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-secondary max-w-md text-sm md:text-right",
            children: "Transitioning from Monolith to Distributed Edge Computing."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "group relative aspect-[4/3] w-full overflow-hidden rounded border border-border bg-surface",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-50 grayscale hover:grayscale-0",
              style: {
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC56FHxdzEkw7LOZe-yoySKKMmprt6se1zQprxR_bj5XkNaEVX9_EClr3B-28YDEBspigBauZyPL-1oJqzWIF_Jgzu6ToEfJHEgV3L3-FJ-8uOhyrFqa2jrpbi1OeQL0grPDiZihxp4YTgX6kOHw39YE8Zc1SDZ3C6hvB9UebPij-q9xLnDx3dsD4Crv-0SkqE6HBqPehLsMzo6uqIhVY_QIF7DodsbQVTUsw0z1_J5zIQX4weO7upVf0AmbqGg13uSfrk3f-hf8hDC')"
              }
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-white font-mono text-sm font-bold",
                children: "Initial RFC Diagrams"
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "group relative aspect-[4/3] w-full overflow-hidden rounded border border-border bg-surface",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-60 grayscale hover:grayscale-0",
              style: {
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0qkuU8K7bFraRu3ptwtpnBIXnAgE24qz5-y-C9kCoVXosRlSeCXO65HMiNRIE6K67GUV_2hWZlYTvIm8m4weNk9OWcJl83AjGtStAEnUhin6W3_WEVR3RKlJlx85ajbS3S8aU0rY7CNryXUYkvpRWn2CaOfkXkmcczha83wU2px4fztUd_Ff_yYEQc2Kqa7EmIQ6VvBcD7QmQdEJW9SNFI7ai7ur-6XIsz6gVhnrRX_tK2657zNH0DMiGxB_w7C5o0FyHNTlpJLvK')"
              }
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-white font-mono text-sm font-bold",
                children: "Data Replication Topology"
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "bg-surface border border-border rounded p-6 md:p-10",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-lg font-bold mb-6 text-white font-mono",
            children: "Request Lifecycle"
          }), /* @__PURE__ */ jsx("div", {
            className: "relative w-full aspect-[21/9] bg-page rounded overflow-hidden border border-border mb-6",
            children: /* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-contain bg-center bg-no-repeat opacity-80 invert",
              style: {
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFP49cey_V7jzat6Tiwddeb4Ju0rhMyXEZDV4ASpJiQ70AgbUvk9-GlgYa45JUrnaXL6PFdYF-QYsVVUN-89IGMBFVtkW3AFPQXqPp9ma-2bzi6ifrocIp9r7g1leIgnIAPzSAKB7iRWL2GYejRqX9xNqJKuKKXS8iYxGrDnFQNjJFC_l2JAdPIFUO9n6elCcR52cEYvl1v2CDqn2J5Y0CJBfFTwktjW3ykOLDSF9-VLw3P7c0mghGlhFop96fhTb7_rk_XDW64DF4')"
              }
            })
          }), /* @__PURE__ */ jsxs("ul", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-secondary",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-3",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex-none size-6 rounded bg-surface-highlight border border-border flex items-center justify-center font-mono text-xs text-white",
                children: "1"
              }), /* @__PURE__ */ jsx("span", {
                children: "Request hits nearest edge node (GeoDNS)."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-3",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex-none size-6 rounded bg-surface-highlight border border-border flex items-center justify-center font-mono text-xs text-white",
                children: "2"
              }), /* @__PURE__ */ jsx("span", {
                children: "Wasm worker checks Redis hot cache."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-3",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex-none size-6 rounded bg-surface-highlight border border-border flex items-center justify-center font-mono text-xs text-white",
                children: "3"
              }), /* @__PURE__ */ jsx("span", {
                children: "Asynchronous fetch from origin if miss."
              })]
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "space-y-12",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "md:text-center max-w-3xl mx-auto space-y-4",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-accent font-mono text-xs uppercase tracking-wider",
            children: "Implementation"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-4xl font-bold text-white",
            children: "Rust + Wasm at the Edge"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg text-secondary",
            children: "We rewrote critical paths in Rust, compiled to WebAssembly, and deployed to a global edge network."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "relative rounded-lg border border-border bg-surface/30 p-8 md:p-12 overflow-hidden",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col lg:flex-row gap-12",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex-1 space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "size-10 rounded bg-accent/10 border border-accent/20 flex items-center justify-center text-accent",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "material-symbols-outlined",
                    children: "bolt"
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-white",
                  children: "Smart Caching Strategy"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-secondary leading-relaxed",
                children: "Implemented a Stale-While-Revalidate pattern using Edge storage. This ensures users always get content instantly, while background workers update the cache asynchronously."
              }), /* @__PURE__ */ jsx("div", {
                className: "bg-page rounded border border-border p-4 font-mono text-xs overflow-x-auto text-gray-300",
                children: /* @__PURE__ */ jsx("pre", {
                  children: /* @__PURE__ */ jsxs("code", {
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "text-gray-500",
                      children: "// Cache configuration struct"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-purple-400",
                      children: "struct"
                    }), " ", /* @__PURE__ */ jsx("span", {
                      className: "text-blue-400",
                      children: "CacheConfig"
                    }), " ", "{", "ttl: ", /* @__PURE__ */ jsx("span", {
                      className: "text-blue-400",
                      children: "Duration"
                    }), ", stale_ttl: ", /* @__PURE__ */ jsx("span", {
                      className: "text-blue-400",
                      children: "Duration"
                    }), ", strategy: ", /* @__PURE__ */ jsx("span", {
                      className: "text-green-400",
                      children: '"stale-while-revalidate"'
                    }), "}", /* @__PURE__ */ jsx("span", {
                      className: "text-purple-400",
                      children: "impl"
                    }), " CacheConfig ", "{", /* @__PURE__ */ jsx("span", {
                      className: "text-purple-400",
                      children: "fn"
                    }), " ", /* @__PURE__ */ jsx("span", {
                      className: "text-blue-400",
                      children: "should_revalidate"
                    }), "(&self, age: u64) -> bool ", "{", "age > self.ttl.", /* @__PURE__ */ jsx("span", {
                      className: "text-blue-400",
                      children: "as_secs"
                    }), "()", "}", "}"]
                  })
                })
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "flex-1 relative min-h-[300px] flex items-center justify-center",
              children: /* @__PURE__ */ jsxs("div", {
                className: "w-full h-full bg-page rounded border border-border p-2 shadow-2xl",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "h-6 border-b border-border flex items-center px-2 mb-2",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-[10px] text-secondary font-mono",
                    children: "terminal — zsh"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "font-mono text-xs space-y-1",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "text-green-400",
                    children: "➜  ~ curl -I https://api.edge.dev/v1/data"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-secondary",
                    children: "HTTP/2 200"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-secondary",
                    children: "date: Mon, 24 Oct 2023 10:00:00 GMT"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-secondary",
                    children: "content-type: application/json"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-accent",
                    children: "x-cache: HIT"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-accent",
                    children: "x-edge-region: fra1"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-accent",
                    children: "server-timing: dur=14ms"
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "text-green-400 pt-2",
                    children: ["➜  ~ ", /* @__PURE__ */ jsx("span", {
                      className: "animate-pulse",
                      children: "_"
                    })]
                  })]
                })]
              })
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "relative rounded-lg border border-border bg-surface/30 p-8 md:p-12 overflow-hidden",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col lg:flex-row-reverse gap-12",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex-1 space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "size-10 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "material-symbols-outlined",
                    children: "security"
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-white",
                  children: "Zero-Trust Security"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-secondary leading-relaxed",
                children: "We moved authentication to the edge. JWTs are validated in the Wasm layer before requests ever touch the origin server, blocking malicious traffic effectively."
              }), /* @__PURE__ */ jsxs("ul", {
                className: "space-y-3 text-sm text-secondary pt-2",
                children: [/* @__PURE__ */ jsxs("li", {
                  className: "flex items-center gap-3",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "material-symbols-outlined text-green-500 text-sm",
                    children: "check"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "RSA-256 Signature Verification"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-center gap-3",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "material-symbols-outlined text-green-500 text-sm",
                    children: "check"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Rate limiting per IP at the edge"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-center gap-3",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "material-symbols-outlined text-green-500 text-sm",
                    children: "check"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "DDoS mitigation layer"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "flex-1 relative w-full flex justify-center",
              children: /* @__PURE__ */ jsxs("div", {
                className: "relative w-full aspect-video bg-page rounded border border-border shadow-2xl overflow-hidden group",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity",
                  style: {
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGxZvLnQV-HiRTl0yjJ1Y4yYIANqWaxw8GsazaKpOSsqZv0WljSR12rJ7XU9xxwqUGHL9JntC8F0vrD-oeaXGv_AWdojBoVCasHKZZW5UGJmWW1E6HkjRa4YIBJ4I3klK1RJz0M9kqyd0dSAW1A03RI-e66OchaUgtxAHstTYw7T53KOGdytXaCHlkutKgFU0Y8K81kccx_pwtLnLI_vKKrYIddHrgI9L_mEouyEG-rhmI7bGy74PVcfvVvohEcSHTGfVBsoMYixCr')"
                  }
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 flex items-center justify-center",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "bg-black/80 backdrop-blur p-4 rounded border border-red-900/50 text-center",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "text-red-400 text-2xl font-bold font-mono",
                      children: "14,203"
                    }), /* @__PURE__ */ jsx("div", {
                      className: "text-gray-400 text-xs font-mono uppercase",
                      children: "Threats Blocked / Hr"
                    })]
                  })
                })]
              })
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "border-t border-border pt-16",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row justify-between items-end mb-12 gap-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-white",
              children: "Performance Metrics"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-secondary",
              children: "Measured over 30 days post-deployment."
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "flex gap-2",
            children: /* @__PURE__ */ jsxs("span", {
              className: "px-3 py-1 bg-green-900/30 text-green-400 border border-green-900/50 rounded text-xs font-mono flex items-center gap-2",
              children: [/* @__PURE__ */ jsx("span", {
                className: "size-2 rounded-full bg-green-500 animate-pulse"
              }), "System Healthy"]
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 sm:grid-cols-3 gap-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col p-6 bg-surface border border-border rounded relative overflow-hidden",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute top-0 right-0 p-4 opacity-10",
              children: /* @__PURE__ */ jsx("span", {
                className: "material-symbols-outlined text-6xl",
                children: "timer"
              })
            }), /* @__PURE__ */ jsx("span", {
              className: "text-4xl font-bold text-white mb-2 font-mono",
              children: "50ms"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2 mb-2",
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded",
                children: "-85%"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-secondary uppercase tracking-wider",
                children: "Global Latency"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "95th percentile (p95)"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col p-6 bg-surface border border-border rounded relative overflow-hidden",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute top-0 right-0 p-4 opacity-10",
              children: /* @__PURE__ */ jsx("span", {
                className: "material-symbols-outlined text-6xl",
                children: "savings"
              })
            }), /* @__PURE__ */ jsx("span", {
              className: "text-4xl font-bold text-white mb-2 font-mono",
              children: "-40%"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm font-medium text-secondary uppercase tracking-wider mb-2",
              children: "Infrastructure Cost"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "Reduced EC2 instance count"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col p-6 bg-surface border border-border rounded relative overflow-hidden",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute top-0 right-0 p-4 opacity-10",
              children: /* @__PURE__ */ jsx("span", {
                className: "material-symbols-outlined text-6xl",
                children: "dns"
              })
            }), /* @__PURE__ */ jsx("span", {
              className: "text-4xl font-bold text-white mb-2 font-mono",
              children: "99.99%"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm font-medium text-secondary uppercase tracking-wider mb-2",
              children: "System Uptime"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-gray-500",
              children: "Zero downtime deployment"
            })]
          })]
        })]
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: project_$slug,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/portfolioassets/entry.client-CKa99e04.js", "imports": ["/portfolioassets/chunk-JMJ3UQ3L--QkOGNv2.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/portfolioassets/root-C5sNBNAm.js", "imports": ["/portfolioassets/chunk-JMJ3UQ3L--QkOGNv2.js"], "css": ["/portfolioassets/root-BEScjco4.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/portfolioassets/home-BsrnZ6R4.js", "imports": ["/portfolioassets/chunk-JMJ3UQ3L--QkOGNv2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/project.$slug": { "id": "routes/project.$slug", "parentId": "root", "path": "project/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/portfolioassets/project._slug-BJC1RgCo.js", "imports": ["/portfolioassets/chunk-JMJ3UQ3L--QkOGNv2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/portfolioassets/manifest-20cc4e16.js", "version": "20cc4e16", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/portfolio";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/project.$slug": {
    id: "routes/project.$slug",
    parentId: "root",
    path: "project/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
