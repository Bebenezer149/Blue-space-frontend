import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import mobileAppScreenshot from "../assets/bg-20c04bea-1d6e-4f74-b0b6-5a824b73866b.png";
import anass from "../assets/anass.jpeg";
import cecil from "../assets/cecil-ofori.jpeg";
import eben from "../assets/eben.jpeg";

/* ------------------------------------------------------------------ */
/* Scroll-reveal utilities                                             */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable bits                                                       */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "Team", id: "team" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const FEATURES = [
  {
    title: "Products at your fingertips",
    description:
      "Add, edit and organise your entire inventory in minutes — with images, pricing and stock in one clean workspace.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
      />
    ),
  },
  {
    title: "Orders, sorted",
    description:
      "Track, fulfil and manage every order in real time. Know exactly where each sale stands without the spreadsheet chaos.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    ),
  },
  {
    title: "Sales insights",
    description:
      "Clear, beautiful dashboards that turn raw numbers into decisions — revenue, top products and trends at a glance.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    ),
  },
  {
    title: "Your store, your link",
    description:
      "Stand out with a beautiful storefront that lives on your own link. Share it anywhere and start selling instantly.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    ),
  },
];

const TEAM = [
  {
    name: "Cecil Ofori",
    role: "Founder & CEO",
    initials: "CO",
    image: cecil,
  },
  {
    name: "Baidoo Ebenezer",
    role: "Founder & Chief Technology Officer",
    initials: "BE",
    image: eben,
  },
  {
    name: "Sylvia",
    role: "Head of Customer Support",
    initials: "SS",
    image: "https://i.pravatar.cc/400?img=47",
  },
  {
    name: "Anass Abdallah",
    role: "Head of Growth",
    initials: "AA",
    image: anass,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Blue Space completely changed how I run my store. Managing products and orders used to take my whole day — now it takes minutes.",
    name: "Akosua M.",
    role: "Fashion Store Owner, Accra",
    initials: "AM",
  },
  {
    quote:
      "The dashboard is so clean and fast. I finally understand my sales at a glance, and my customers love the storefront link.",
    name: "Kojo B.",
    role: "Electronics Store Owner, Kumasi",
    initials: "KB",
  },
  {
    quote:
      "Simple, professional and reliable. Blue Space feels like it was built by people who actually run stores.",
    name: "Abena S.",
    role: "Beauty Brand Founder, Takoradi",
    initials: "AS",
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    handle: "@bluespace_26",
    url: "https://www.instagram.com/bluespaceofficial26?igsh=MXgzM3pkZzloYnpqZg%3D%3D&utm_source=qr",
    color: "#E4405F",
    icon: (
      <path d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.015 8.333 0 8.74 0 12c0 3.26.015 3.667.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.985 8.74 24 12 24c3.26 0 3.668-.015 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.281.073-1.689.073-4.948 0-3.26-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.015 15.26 0 12 0zm0 5.838c3.403 0 6.162 2.759 6.162 6.162S15.403 18.162 12 18.162 5.838 15.403 5.838 12 8.597 5.838 12 5.838zm0 10.162c2.209 0 4-1.79 4-4 0-2.209-1.791-4-4-4s-4 1.791-4 4c0 2.21 1.791 4 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
  },
  {
    name: "WhatsApp",
    handle: "+233 53 927 8827",
    url: "https://wa.me/233539278827",
    color: "#25D366",
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    ),
  },
  {
    name: "X (Twitter)",
    handle: "@bluespace",
    url: "https://x.com/bluespace",
    color: "#000000",
    icon: (
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    ),
  },
  {
    name: "Facebook",
    handle: "/BlueSpace",
    url: "https://facebook.com/bluespace",
    color: "#1877F2",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    name: "TikTok",
    handle: "@bluespace",
    url: "https://tiktok.com/@bluespace",
    color: "#000000",
    icon: (
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    ),
  },
  {
    name: "LinkedIn",
    handle: "/company/bluespace",
    url: "https://linkedin.com/company/bluespace",
    color: "#0A66C2",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    name: "YouTube",
    handle: "@bluespace",
    url: "https://youtube.com/@bluespace",
    color: "#FF0000",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
];

function Avatar({ initials, className = "" }) {
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-white flex items-center justify-center font-semibold shadow-lg ${className}`}
    >
      {initials}
    </div>
  );
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Custom keyframes */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-24px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(18px) scale(0.96); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 11s ease-in-out infinite; }
        .text-gradient {
          background-image: linear-gradient(120deg, #2563eb, #38bdf8, #1e40af, #2563eb);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 6s ease-in-out infinite;
        }
        .text-gradient-light {
          background-image: linear-gradient(120deg, #93c5fd, #ffffff, #60a5fa, #93c5fd);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 6s ease-in-out infinite;
        }
      `}</style>

      {/* ------------------------------------------------------------ */}
      {/* Navbar                                                       */}
      {/* ------------------------------------------------------------ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
<a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
            className="flex items-center group"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-gradient group-hover:scale-105 transition-transform duration-300 inline-block">
              Blue Space
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative hover:text-blue-600 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-3 bg-white/80 backdrop-blur-xl">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                className="flex-1 text-center px-4 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg shadow-blue-500/25"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------ */}
      {/* Section 1 — Hero                                             */}
      {/* ------------------------------------------------------------ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50"
      >
        {/* Blur backdrops */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-3xl animate-float-slower"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-slate-300/40 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Built for store owners who want to grow
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Own your store.{" "}
                <span className="text-gradient">Grow in Blue Space.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8">
                Blue Space is the clean, simple workspace for running your
                online store — products, orders and insights in one beautiful
                place. No clutter. No complexity. Just space to sell.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Get Started Free
                </Link>
                <button
                  onClick={() => scrollTo("features")}
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  Explore Features
                </button>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-10 text-center">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                    500+
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Store owners
                  </p>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                    12k+
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Orders fulfilled
                  </p>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                    99.9%
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Uptime
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Mock dashboard preview */}
          <Reveal delay={250} className="hidden sm:block">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/30 to-blue-700/30 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl shadow-blue-900/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-slate-400">Welcome back,</p>
                    <p className="font-semibold text-slate-900">Adaeze 👋</p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-white"></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Revenue", value: "₦128k" },
                    { label: "Orders", value: "342" },
                    { label: "Products", value: "56" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center"
                    >
                      <p className="text-lg font-bold text-blue-600">
                        {stat.value}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Recent orders
                  </p>
                  {[
                    { name: "Grace Boutique", amount: "₦24,500", status: "Fulfilled" },
                    { name: "TechHub Lagos", amount: "₦67,200", status: "Pending" },
                    { name: "Naija Kicks", amount: "₦12,800", status: "Shipped" },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                            i === 0
                              ? "bg-blue-100 text-blue-700"
                              : i === 1
                              ? "bg-slate-100 text-slate-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {order.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {order.name}
                          </p>
                          <p className="text-xs text-slate-400">{order.amount}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                          order.status === "Fulfilled"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-6 -right-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3 shadow-xl animate-float-slow">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      +₦48k today
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Sales growing fast
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-slate-400 animate-bounce">
          <span className="text-xs">Scroll</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Section 1B — Mobile App Showcase                            */}
      {/* ------------------------------------------------------------ */}
      <section
        id="showcase"
        className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-3xl animate-float-slower"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Your store, right in your pocket
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Manage your store{" "}
                <span className="text-gradient">from anywhere.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8">
                Track orders, update products and watch your sales grow — all
                from your phone. Blue Space is built to work beautifully on
                mobile, wherever your business takes you.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Start Selling Today
                </Link>
                <button
                  onClick={() => scrollTo("features")}
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  Explore Features
                </button>
              </div>
            </Reveal>
          </div>

          {/* Mobile phone mockup */}
          <Reveal delay={250}>
            <div className="relative mx-auto max-w-[300px]">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-400/30 to-blue-700/30 rounded-[3rem] blur-2xl"></div>

              {/* Phone frame */}
              <div className="relative bg-slate-900 rounded-[2.75rem] p-3 shadow-2xl shadow-blue-900/20">
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-10"></div>
                <div className="relative rounded-[2.25rem] overflow-hidden border-2 border-slate-700">
                  <img
                    src={mobileAppScreenshot}
                    alt="Blue Space mobile dashboard"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -top-5 -right-4 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3 shadow-xl animate-float-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        +₵4.8k today
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Sales growing fast
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Section 2 — Features                                          */}
      {/* ------------------------------------------------------------ */}
      <section
        id="features"
        className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-24 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-24 w-80 h-80 bg-slate-300/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Everything your store needs.{" "}
              <span className="text-gradient">Nothing it doesn't.</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Four simple tools that replace the chaos of spreadsheets, notes
              and missed orders.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 120}>
                <div className="group h-full bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 h-0.5 w-8 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Section 3 — Team                                              */}
      {/* ------------------------------------------------------------ */}
      <section
        id="team"
        className="relative py-24 bg-slate-900 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              The people behind{" "}
              <span className="text-gradient">Blue Space</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              A small, focused team obsessed with making store management feel
              effortless.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 120}>
                <div
                  className="group relative h-72 sm:h-80 overflow-hidden rounded-2xl border border-white/10 hover:border-blue-400/40 hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-transparent hover:shadow-blue-500/20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.image})` }}
                >
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                    <h3 className="font-semibold text-white text-base mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-slate-300">{member.role}</p>
                    <div className="mt-3 flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {["#1D4ED8", "#1E40AF", "#3B82F6"].map((color) => (
                        <span
                          key={color}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Section 4 — Testimonials                                      */}
      {/* ------------------------------------------------------------ */}
      <section
        id="testimonials"
        className="relative py-24 bg-slate-50 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-10 left-0 w-96 h-96 bg-slate-300/40 rounded-full blur-3xl animate-float-slower"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Loved by store owners{" "}
              <span className="text-gradient">across Africa</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Real stories from people who run their stores on Blue Space.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <div className="group h-full flex flex-col bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300 transition-all duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg
                        key={s}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-blue-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-slate-700 leading-relaxed text-sm flex-1 mb-6">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <Avatar initials={t.initials} className="w-11 h-11 text-sm" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={200} className="text-center mt-16">
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/40 to-blue-700/40 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl px-8 sm:px-14 py-10 shadow-xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                  Ready to make some{" "}
                  <span className="text-gradient">space</span> for growth?
                </h3>
                <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                  Join hundreds of store owners running their business on Blue
                  Space — free to start.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/register"
                    className="px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-3.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:border-blue-400 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Section 5 — Contact / Social media                           */}
      {/* ------------------------------------------------------------ */}
      <section
        id="contact"
        className="relative py-24 bg-white overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-10 -right-24 w-96 h-96 bg-slate-300/40 rounded-full blur-3xl animate-float-slower"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Reach us on <span className="text-gradient">all platforms</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Follow, chat and connect with the Blue Space team on your
              favourite social media.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {SOCIALS.map((social, i) => (
              <Reveal key={social.name} delay={i * 80}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-full flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:border-blue-300 transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ backgroundColor: social.color }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7 text-white"
                    >
                      {social.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">
                      {social.name}
                    </p>
                    <p className="text-xs text-slate-500">{social.handle}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Email CTA */}
          <Reveal delay={200} className="text-center mt-14">
            <a
              href="mailto:hello@bluespace.app"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Email us: bluespaceapp00@gmail.com
            </a>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Footer                                                       */}
      {/* ------------------------------------------------------------ */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
<div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-gradient-light">
              Blue Space
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Blue Space. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;

