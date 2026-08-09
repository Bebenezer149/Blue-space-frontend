import { useState } from "react";
import HeroVideo from "../assets/herovideo.mp4";
import cart from "../assets/buying.jpg";
import anass from "../assets/anass.jpeg";
import cecil from "../assets/cecil-ofori.jpeg";
import eben from "../assets/eben.jpeg";

import {
  HiMenu,
  HiX,
  HiOutlineArrowRight,
  HiOutlineShoppingBag,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineDeviceMobile,
  HiOutlineGlobe,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
HiOutlinePhone,
  HiOutlineMail,
  HiOutlineUserGroup,
  HiOutlineSparkles,
} from "react-icons/hi";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa6";

const steps = [
  {
    icon: HiOutlineUserGroup,
    title: "Sign Up For Free",
    text: "Create your Blue Space account in minutes. No card, no long forms — just your business name and you are ready to go.",
  },
  {
    icon: HiOutlineShoppingBag,
    title: "Add Your Products",
    text: "Upload your items with photos, prices and descriptions. Keep your catalogue organised and looking great for shoppers.",
  },
  {
    icon: HiOutlineClipboardList,
    title: "Share Your Store Link",
    text: "Get a unique link for your shop and share it on WhatsApp, Instagram and TikTok. Customers anywhere in Ghana can browse instantly.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Track & Grow",
    text: "Receive orders, manage deliveries and watch your sales grow with simple analytics. You are always in control.",
  },
];

const team = [
  {
    name: "Cecil Ofori",
    role: "Founder & COO",
    img: cecil,
  },
  {
    name: "Baidoo Ebenezer",
    role: "Engineering Manager",
    img: eben,
  },
  {
    name: "Anas Abdallah",
    role: "Social Media Manager",
    img: anass,
  },
];

const socials = [
  { icon: FaInstagram, label: "Instagram", handle: "@bluespacegh", href: "#" },
  { icon: FaFacebook, label: "Facebook", handle: "Blue Space Ghana", href: "#" },
  { icon: FaTwitter, label: "Twitter", handle: "@bluespacegh", href: "#" },
  { icon: FaWhatsapp, label: "WhatsApp", handle: "+233 24 000 0000", href: "#" },
  { icon: FaTiktok, label: "TikTok", handle: "@bluespacegh", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", handle: "Blue Space", href: "#" },
];

const features = [
  {
    icon: HiOutlineGlobe,
    title: "Your Own Storefront",
    text: "A beautiful store link you own and share across Ghana.",
  },
  {
    icon: HiOutlineDeviceMobile,
    title: "Mobile-First",
    text: "Manage everything easily from your phone, even on slow networks.",
  },
  {
    icon: HiOutlineCreditCard,
    title: "Flexible Payments",
    text: "Mobile Money, cash on delivery and cards — pay your way.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Simple Analytics",
    text: "Know what sells and where, so you grow with confidence.",
  },
];

function SectionHeading({ title, subtitle, light }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
      <h2
        className={`text-3xl sm:text-4xl font-bold mb-4 ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-lg ${light ? "text-blue-100" : "text-gray-500"}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function Landing() {
  const [openMenu, setOpenMenu] = useState(false);

  const navItems = [
    { href: "#how", label: "How It Works" },
    { href: "#features", label: "Features" },
    { href: "#team", label: "Our Team" },
    { href: "#contact", label: "Contact" },
  ];

  return (
<div className="min-h-screen bg-slate-50 text-gray-900 antialiased">
{/* Header */}
      <header className="fixed top-4 inset-x-4 max-w-6xl mx-auto z-50">
        {/* Header bar (stays fixed height) */}
        <div className="bg-white/40 backdrop-blur-md border border-gray-200 rounded-full shadow-sm px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <a href="#"  className="flex text-blue-600 items-center gap-2 shrink-0 font-bold ">
              
              Blue Space
            </a>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                Get Started
                <HiOutlineArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpenMenu((v) => !v)}
              className="lg:hidden text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {openMenu ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown (rendered below the bar, doesn't stretch the bar) */}
        {openMenu && (
          <div className="absolute top-full right-0 left-0 mt-3 lg:hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-4 animate-slide-down">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <a
                href="/login"
                className="flex-1 text-center text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="flex-1 text-center text-sm font-medium text-white bg-blue-600 px-4 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl text-white animate-fade-in-up">
            {/* <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
              <HiOutlineGlobe className="h-4 w-4" />
              Made for Ghana's businesses
            </span> */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              One Sign Up. <span className="text-blue-500">One Link.</span>
              <br />
              Unlimited Possibilities
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              Blue Space is here to grow your business online. The fear of
              spending too much on websites is over. With just a sign up, you
              can serve your customers anywhere in Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Your Store Now
                <HiOutlineArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

{/* How It Works - four hero sections */}
      <section id="how" className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            title="How It Works"
            subtitle="How I started — and how you can too. Simple, no technical skills needed."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex gap-5 bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="shrink-0">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                    <step.icon className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      Step {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Why Choose Us / Features hero */}
      <section id="features" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<SectionHeading
            title="Why Choose Us"
            subtitle="Everything you need to run a modern online shop, kept beautifully simple."
          />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Built around the way Ghana does business
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                From market traders in Accra to boutiques in Kumasi, Blue Space
                adapts to how you already sell. No complicated tools — just a
                simple way to take your shop online.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">
                      {f.title}
                    </h4>
                    <p className="text-xs text-gray-500">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                <img
                  src={cart}
                  alt="Blue Space quality services"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineCheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      Quality you can rely on
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We keep things simple so you can focus on what matters —
                    serving your customers and growing your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Our Team hero */}
      <section id="team" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<SectionHeading
            title="Our Team"
            subtitle="Meet the people behind Blue Space and what drives us."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto animate-stagger">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-white border border-gray-200 rounded-3xl p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-28 w-28 rounded-full overflow-hidden mx-auto mb-5 border-4 border-blue-100">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{m.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Contact hero */}
      <section id="contact" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<SectionHeading
            title="Let's Stay Connected"
            subtitle="Follow us on social media and reach out — we'd love to hear from you."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Social handles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-stagger">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      {s.label}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>

{/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <HiOutlinePhone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Call Us</p>
                  <p className="text-sm text-gray-500">+233 24 000 0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <HiOutlineMail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email Us</p>
                  <p className="text-sm text-gray-500">hello@bluespace.gh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-center animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to grow your business online?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Join Ghanaian vendors who are already selling more with Blue
              Space. It only takes a few minutes to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Create Free Account
                <HiOutlineArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-blue-800 transition-colors"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  B
                </span>
                <span className="text-lg font-bold text-white">Blue Space</span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering Ghanaian entrepreneurs with simple technology to
                start, run and grow their online business.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#how" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Our Team</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Sign In</a></li>
                <li><a href="/register" className="hover:text-white transition-colors">Get Started</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Follow us</h4>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="h-10 w-10 rounded-full bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <p>© {new Date().getFullYear()} Blue Space. Made in Ghana 🇬🇭</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
