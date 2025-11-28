import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Clock,
  FileText,
  Cpu,
  MessageCircle,
  Star,
} from "lucide-react";

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks = () => (
    <>
      <a href="#about" className="hover:text-blue-600">About</a>
      <a href="#services" className="hover:text-blue-600">Services</a>
      <a href="#process" className="hover:text-blue-600">How it Works</a>
      <a href="#testimonials" className="hover:text-blue-600">Reviews</a>
      <a href="#contact" className="hover:text-blue-600">Contact</a>
      <Link
        to="/login"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login <ArrowRight className="w-4 h-4" />
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white grid place-items-center font-bold">
                A
              </div>
              <span className="text-xl font-extrabold tracking-tight">EduAssist</span>
            </div>

            {/* Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <NavLinks />
            </nav>

            {/* Mobile */}
            <button
              className="md:hidden p-2 rounded-lg border hover:bg-gray-50"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Panel */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium">
              <NavLinks />
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-200/60 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> Fast • Reliable • Expert
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              Ace your <span className="text-blue-600">assignments</span> with expert writing & technical help
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              From essays to code, get quality assistance tailored to your course and deadline — with clear pricing and 24/7 support.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold hover:bg-gray-50 transition"
              >
                Explore Services
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              {[
                { icon: Shield, label: "Original & confidential" },
                { icon: Clock, label: "On-time delivery" },
                { icon: CheckCircle2, label: "Top-rated experts" },
              ].map(({ icon: I, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <I className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hero Card / Visual */}
          <div className="relative">
            <div className="rounded-2xl border bg-white shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Current average rating</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-700">5.0</span>
                  </div>
                </div>
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  2,000+ tasks completed
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold">Writing</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Essays • Reports • Research papers
                  </p>
                </div>
                <div className="border rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold">Technical</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Programming • Data • Engineering
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 grid place-items-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Need quick guidance?</p>
                  <p className="text-gray-500">Our support responds in minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">About EduAssist</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We connect learners with vetted academic writers, developers, and analysts.
              Your brief is matched to the right expert, and we keep you updated until delivery.
              Quality, originality, and confidentiality are our core values.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "Plagiarism-free work with references",
                "Private & secure order management",
                "Clear communication and progress updates",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <Stat label="Avg. Score" value="A-" />
              <Stat label="On-Time" value="99%" />
              <Stat label="Satisfaction" value="4.9/5" />
            </div>
            <p className="mt-6 text-sm text-gray-500">
              * Self-reported by users in post-delivery surveys across 2,000+ tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center">Services</h2>
          <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
            Choose a track below and get started in minutes.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card
              title="Academic Writing"
              icon={FileText}
              items={[
                "Essays & reports",
                "Research proposals",
                "Case studies",
                "Literature reviews",
              ]}
              cta={{ label: "Order Writing", to: "/dashboard/new-order" }}
            />
            <Card
              title="Technical Help"
              icon={Cpu}
              items={[
                "Programming assignments",
                "Data analysis & visualization",
                "Debugging & reviews",
                "Documentation",
              ]}
              cta={{ label: "Request Quote", to: "/dashboard/technical" }}
            />
            <Card
              title="Consult & Support"
              icon={MessageCircle}
              items={[
                "Topic brainstorming",
                "Outlining & planning",
                "Citation & formatting",
                "24/7 chat support",
              ]}
              cta={{ label: "Chat Now", to: "/dashboard/support" }}
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center">How it works</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Create Order", desc: "Tell us your topic, course, pages, and deadline." },
              { step: "2", title: "Match Expert", desc: "We assign a vetted writer or technical specialist." },
              { step: "3", title: "Track Progress", desc: "Chat, share files, and request updates anytime." },
              { step: "4", title: "Review & Submit", desc: "Get on-time delivery and request adjustments." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white grid place-items-center font-bold">
                  {s.step}
                </div>
                <h4 className="mt-3 font-semibold">{s.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center">What students say</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Super fast and exactly what I needed. Clear references and formatting.",
                name: "Jasmine K.",
                meta: "Business, 2nd Year",
              },
              {
                quote:
                  "They debugged my Python assignment and explained the fixes. Lifesaver.",
                name: "Brian O.",
                meta: "Computer Science, 3rd Year",
              },
              {
                quote:
                  "On-time delivery and helpful feedback. My grade definitely improved.",
                name: "Amina N.",
                meta: "Nursing, 1st Year",
              },
            ].map((t, i) => (
              <blockquote
                key={i}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i2) => (
                    <Star key={i2} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="mt-3 text-gray-700">{t.quote}</p>
                <footer className="mt-4 text-sm text-gray-500">
                  — {t.name}, {t.meta}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold">Ready to get started?</h3>
              <p className="text-white/80 mt-2">
                Join thousands of students who trust EduAssist for writing & technical help.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                Login <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border border-white/60 text-white px-5 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (3 columns) */}
      <footer id="contact" className="bg-gray-950 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white grid place-items-center font-bold">
                A
              </div>
              <span className="text-lg font-extrabold">EduAssist</span>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Academic writing & technical help, done right and delivered on time.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h5 className="text-gray-100 font-semibold mb-3">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#process" className="hover:text-white">How it Works</a></li>
              <li><a href="#testimonials" className="hover:text-white">Reviews</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h5 className="text-gray-100 font-semibold mb-3">Resources</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard/new-order" className="hover:text-white">Order Writing</Link></li>
              <li><Link to="/dashboard/technical" className="hover:text-white">Technical Quote</Link></li>
              <li><Link to="/dashboard/support" className="hover:text-white">Support Chat</Link></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h5 className="text-gray-100 font-semibold mb-3">Contact</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@eduassist.com" className="hover:text-white">support@eduassist.com</a></li>
              <li><span className="text-gray-400">Nairobi, Kenya</span></li>
              <li>
                <span className="text-gray-400">Mon–Sun • 24/7</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <p>© {new Date().getFullYear()} EduAssist. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-gray-300">Terms</a>
              <a href="#" className="hover:text-gray-300">Privacy</a>
              <a href="#" className="hover:text-gray-300">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Small UI helpers */
function Stat({ label, value }) {
  return (
    <div className="rounded-xl border bg-white py-6 px-4">
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
        {label}
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, items, cta }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600" />
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            {i}
          </li>
        ))}
      </ul>
      <Link
        to={cta.to}
        className="mt-5 inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline"
      >
        {cta.label} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
