import React, { useState } from "react";
import {
  Dog,
  PawPrint,
  Home,
  ThermometerSnowflake,
  Truck,
  UtensilsCrossed,
  Heart,
  Star,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Check,
} from "lucide-react";

/**
 * Marrakech Dog Hotel – React + Tailwind website (v5)
 * Debug & polish:
 * - Ensured component closes properly (no missing parenthesis/brace at EOF)
 * - Removed Tailwind `@apply` inside <style> (can break builds). Replaced with inline classNames.
 * - Hero uses a clear dog-only photo (Unsplash) matching the theme.
 * - Tight, reasonable section spacing; clear separation panels.
 * - Header with glass effect + mobile menu; fully responsive.
 * - Services: 4 cards in 2 columns (larger), no "Daily Updates" item.
 * - Pricing split: Hotel (top) then Training + Stay.
 * - FAQ spans full content width.
 * - Contact & Booking preserved.
 */

const PRICES = {
  hotel: {
    ac: { label: "AC Box", price: "200 MAD / night" },
    nonAc: { label: "Non-AC Box", price: "140 MAD / night" },
  },
  training: [
    { type: "Obedience", ac: "350 MAD / night", nonAc: "290 MAD / night", bullets: ["Sit/Stay/Heel basics", "Recall training", "Positive reinforcement"] },
    { type: "Protection", ac: "420 MAD / night", nonAc: "360 MAD / night", bullets: ["Controlled bite work", "Handler protection", "Confidence building"] },
    { type: "Specialized", ac: "480 MAD / night", nonAc: "420 MAD / night", bullets: ["Custom goals", "1:1 coach", "Progress tracking"] },
  ],
};

const GALLERY = [
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622844995052-fac8a5e11f2f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568572933382-74d440642117?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=1400&auto=format&fit=crop",
];

const FAQS = [
  { q: "What’s included in every stay?", a: "Daily walks, play sessions, enrichment activities, comfy bedding, and daily photo/video updates sent to owners." },
  { q: "Do you require vaccinations?", a: "Yes. We require up-to-date core vaccinations (rabies, DHPP) and strongly recommend kennel cough (Bordetella)." },
  { q: "Can I bring my dog’s own food?", a: "Absolutely. We can also provide high-quality food on request; just select that option at booking." },
  { q: "Do you offer pick-up and delivery?", a: "Yes, Marrakech-wide pick-up and drop-off is available for an additional fee depending on distance." },
];

const COMING_SOON = [
  { title: "Dog + Owner Yoga", desc: "Bonding sessions focused on calm energy and mobility.", icon: Heart },
  { title: "Collective Training Classes", desc: "Small-group classes to socialize and learn together.", icon: PawPrint },
  { title: "Kennel Club Membership", desc: "Priority booking, discounts, events, and member-only perks.", icon: ShieldCheck },
];

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-white/85 backdrop-blur ring-1 ring-amber-100 shadow px-5 md:px-8 py-6 md:py-8">
          {title && (
            <div className="mb-5 md:mb-6">
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-stone-800">{title}</h2>
              {subtitle && <p className="mt-2 text-stone-600 max-w-2xl">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-900">
      <Check className="h-4 w-4" /> {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-stone-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function PriceCard({ title, price, features, badge }) {
  return (
    <Card className="p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-stone-800">{title}</h4>
        {badge && (
          <span className="text-xs font-medium rounded-full bg-amber-100 text-amber-900 px-2 py-1">{badge}</span>
        )}
      </div>
      <div className="mt-4 text-3xl font-bold text-stone-900">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-stone-600">
        {features?.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="h-4 w-4 mt-0.5 shrink-0" /> {f}
          </li>
        ))}
      </ul>
      <button className="mt-6 rounded-xl bg-amber-700 text-white px-4 py-2 hover:bg-amber-800 transition">Book now</button>
    </Card>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 py-4">
      <button className="w-full flex items-center justify-between text-left" onClick={() => setOpen((v) => !v)}>
        <span className="font-medium text-stone-800 text-base md:text-lg">{q}</span>
        <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-2 text-stone-600">{a}</p>}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#life", label: "Life at Hotel" },
    { href: "#coming", label: "Coming Soon" },
    { href: "#gallery", label: "Gallery" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-amber-200/60 bg-[rgba(255,253,245,0.75)] backdrop-blur supports-[backdrop-filter]:bg-amber-50/70 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-semibold text-stone-800">
          <PawPrint className="h-6 w-6 text-amber-700" /> Marrakech Dog Hotel
        </a>
        <nav className="hidden md:flex items-center gap-6 text-stone-700">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-amber-800 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-amber-700 hover:after:w-full after:transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden md:inline-flex rounded-full bg-amber-700 text-white px-4 py-2 hover:bg-amber-800 shadow">
            Book now
          </a>
          <button className="md:hidden rounded-xl p-2 hover:bg-amber-100" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-amber-200/60 bg-amber-50/95">
          <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-2 gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-xl px-3 py-2 bg-white text-stone-800" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative h-[86vh] min-h-[540px] w-full overflow-hidden">
      {/* Clear dog image from Unsplash (no ocean) */}
      <img
        src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=1920&auto=format&fit=crop"
        alt="Friendly dog portrait in warm light"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-amber-50/70" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">
            <ThermometerSnowflake className="h-4 w-4" /> 20 Boxes • 10 with A/C
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">A caring, playful haven for dogs in Marrakech</h1>
          <p className="mt-4 text-white/90 md:text-lg">Premium hotel stays, training + stay packages, daily activities and updates — with optional pick-up, drop-off, and food.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#pricing" className="rounded-xl bg-amber-700 text-white px-5 py-3 hover:bg-amber-800">See pricing</a>
            <a href="#services" className="rounded-xl bg-white/90 text-stone-900 px-5 py-3 hover:bg-white">Explore services</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>Daily walks & activities</Pill>
            <Pill>Pick-up & delivery</Pill>
            <Pill>AC & non-AC options</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { title: "Dog Hotel", icon: Home, desc: "Cozy, safe, and clean boxes with attentive care and playtime.", bullets: ["AC and non-AC options", "Daily walks", "Enrichment games"] },
    { title: "Training + Stay", icon: Dog, desc: "Obedience, protection, and specialized training while boarding.", bullets: ["1:1 sessions", "Clear goals", "Progress tracking"] },
    { title: "Pick-up & Delivery", icon: Truck, desc: "City-wide transport to and from our hotel, on your schedule.", bullets: ["Marrakech coverage", "Time-windowed", "Add-on pricing"] },
    { title: "Food Provision", icon: UtensilsCrossed, desc: "High-quality meals provided — or bring your own.", bullets: ["Diet notes respected", "Measured servings", "Hydration tracked"] },
  ];

  const cardList = items.map((s) => (
    <Card key={s.title} className="p-7 md:p-8 min-h-[220px]">
      <div className="flex items-center gap-3">
        <s.icon className="h-7 w-7 text-amber-700" />
        <h3 className="text-xl font-semibold text-stone-800">{s.title}</h3>
      </div>
      <p className="mt-2 text-stone-600 text-base">{s.desc}</p>
      <ul className="mt-4 space-y-2 text-sm text-stone-600">
        {s.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /> {b}</li>
        ))}
      </ul>
    </Card>
  ));

  return (
    <Section id="services" title="Services" subtitle="Everything your dog needs to feel at home — and make progress.">
      <div className="grid md:grid-cols-2 gap-6">{cardList}</div>
    </Section>
  );
}

function Pricing() {
  return (
    <Section id="pricing" title="Pricing & Packages" subtitle="Transparent options for AC and non-AC boxes. Training combined with comfortable stays.">
      {/* Subsection: Hotel */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Home className="h-6 w-6 text-amber-700" />
          <h3 className="text-xl font-semibold text-stone-800">Hotel</h3>
        </div>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <PriceCard title={PRICES.hotel.ac.label} price={PRICES.hotel.ac.price} features={["Climate-controlled comfort", "Daily walks", "Activities included"]} badge="Popular" />
          <PriceCard title={PRICES.hotel.nonAc.label} price={PRICES.hotel.nonAc.price} features={["Well-ventilated boxes", "Daily walks", "Activities included"]} />
        </div>
        <p className="mt-3 text-sm text-stone-600">* 20 total boxes; 10 are air-conditioned. Availability varies; please book early during holidays.</p>
      </div>

      {/* Compact divider between subsections */}
      <div className="h-3" />
      <div className="border-t border-amber-100 my-1" />
      <div className="h-3" />

      {/* Subsection: Training + Stay */}
      <div>
        <div className="flex items-center gap-3">
          <Dog className="h-6 w-6 text-amber-700" />
          <h3 className="text-xl font-semibold text-stone-800">Training + Stay</h3>
        </div>
        <div className="mt-5 grid md:grid-cols-3 gap-4">
          {PRICES.training.map((t) => (
            <div key={t.type} className="flex flex-col">
              <h4 className="text-lg font-semibold text-stone-800">{t.type}</h4>
              <div className="mt-2 grid grid-cols-1 gap-3">
                <PriceCard title="AC Box" price={t.ac} features={[...t.bullets.slice(0, 2), "AC accommodation"]} />
                <PriceCard title="Non-AC Box" price={t.nonAc} features={[...t.bullets.slice(0, 2), "Non-AC accommodation"]} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-stone-600">* Custom programs available on request. All training uses humane, reward-first methods.</p>
      </div>
    </Section>
  );
}

function LifeAtHotel() {
  const items = [
    { time: "Morning", title: "Walk & Play", desc: "Energy burn and social time." },
    { time: "Mid-day", title: "Training Blocks", desc: "Focused sessions by goals." },
    { time: "Afternoon", title: "Rest & Enrichment", desc: "Snuffle mats, puzzles, cuddles." },
    { time: "Evening", title: "Calm Down + Updates", desc: "Wind-down routine; owner updates sent." },
  ];
  return (
    <Section id="life" title="Life at Our Hotel" subtitle="A balanced daily rhythm that keeps dogs happy, healthy, and learning.">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-stone-800">Daily Routine</h4>
          <ol className="mt-4 space-y-4">
            {items.map((it) => (
              <li key={it.time} className="flex gap-4">
                <div className="w-24 shrink-0 text-amber-800 font-medium">{it.time}</div>
                <div>
                  <div className="font-medium text-stone-800">{it.title}</div>
                  <div className="text-stone-600 text-sm">{it.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-stone-800">What we guarantee</h4>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Pill>Daily walks</Pill>
            <Pill>Enrichment games</Pill>
            <Pill>Clean, safe boxes</Pill>
            <Pill>Gentle handling</Pill>
            <Pill>Photo & video updates</Pill>
            <Pill>Owner communication</Pill>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function ComingSoon() {
  return (
    <Section id="coming" title="Coming Soon" subtitle="We’re evolving into a full Kennel Club with more ways to connect.">
      <div className="grid md:grid-cols-3 gap-6">
        {COMING_SOON.map((c) => (
          <Card key={c.title} className="p-6">
            <div className="flex items-center gap-3">
              <c.icon className="h-6 w-6 text-amber-700" />
              <h3 className="text-lg font-semibold text-stone-800">{c.title}</h3>
            </div>
            <p className="mt-2 text-stone-600">{c.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  return (
    <Section id="gallery" title="Gallery" subtitle="A peek into happy days with us.">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {GALLERY.map((src, i) => (
          <img key={src} src={src} alt={`Dog photo ${i + 1}`} className="h-40 md:h-56 w-full object-cover rounded-xl" loading="lazy" />
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const items = [
    { name: "Salma", text: "The daily videos were everything. My husky loved the play sessions!", stars: 5 },
    { name: "Youssef", text: "Great obedience progress in just a week. Very professional trainers.", stars: 5 },
    { name: "Amal", text: "Clean, safe, and super friendly staff. Recommend!", stars: 5 },
  ];
  return (
    <Section id="reviews" title="Testimonials">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t) => (
          <Card key={t.name} className="p-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-3 text-stone-700">“{t.text}”</p>
            <div className="mt-4 font-medium text-stone-800">— {t.name}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="faq" title="FAQs">
      <div>
        {FAQS.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClasses = "w-full rounded-xl border border-stone-300 bg-white px-4 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/40 focus:border-amber-600/60";
  const checkboxClasses = "h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-600";

  return (
    <Section id="contact" title="Contact & Booking" subtitle="Tell us about your dog and preferred dates. We’ll confirm availability quickly.">
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input className={inputClasses} placeholder="Your name" required />
              <input className={inputClasses} placeholder="Phone (WhatsApp)" required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input className={inputClasses} placeholder="Email" type="email" />
              <input className={inputClasses} placeholder="Dog’s name" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input className={inputClasses} placeholder="Check-in date" type="date" required />
              <input className={inputClasses} placeholder="Check-out date" type="date" required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <select className={inputClasses} defaultValue="">
                <option value="" disabled>Select box type</option>
                <option>AC Box</option>
                <option>Non-AC Box</option>
              </select>
              <select className={inputClasses} defaultValue="">
                <option value="" disabled>Training type (optional)</option>
                <option>Obedience</option>
                <option>Protection</option>
                <option>Specialized</option>
                <option>None</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 text-sm text-stone-700"><input type="checkbox" className={checkboxClasses} /> Pick-up & delivery</label>
              <label className="flex items-center gap-2 text-sm text-stone-700"><input type="checkbox" className={checkboxClasses} /> Provide food</label>
            </div>
            <textarea className={`${inputClasses} min-h-[96px]`} placeholder="Notes: diet, meds, temperament…" />
            <button className="rounded-xl bg-amber-700 text-white px-5 py-3 hover:bg-amber-800">Request booking</button>
            {submitted && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">Thanks! We received your request and will get back shortly.</div>
            )}
          </form>
        </Card>
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-stone-800">Visit us</h4>
          <p className="mt-2 text-stone-600">Marrakech, Morocco — detailed address shared upon booking confirmation.</p>
          <div className="mt-4 space-y-2 text-stone-700">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +212 6 00 00 00 00</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@marrakechdoghotel.com</div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Open daily 8:00–20:00</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Near Palmeraie, Marrakech</div>
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=1400&auto=format&fit=crop" alt="Marrakech Palmeraie" className="w-full h-48 object-cover" />
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-amber-200/70 bg-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 items-center md:items-start md:justify-between">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 font-semibold text-stone-800">
            <PawPrint className="h-6 w-6 text-amber-700" /> Marrakech Dog Hotel
          </div>
          <p className="mt-2 text-stone-600 max-w-sm">Caring accommodation and training in Marrakech. Growing into a full Kennel Club soon.</p>
        </div>
        <div className="text-stone-700 text-sm">
          <div className="flex gap-6">
            <a href="#services" className="hover:text-amber-800">Services</a>
            <a href="#pricing" className="hover:text-amber-800">Pricing</a>
            <a href="#gallery" className="hover:text-amber-800">Gallery</a>
            <a href="#contact" className="hover:text-amber-800">Contact</a>
          </div>
          <div className="mt-4 text-stone-500">© {new Date().getFullYear()} Marrakech Dog Hotel</div>
        </div>
      </div>
    </footer>
  );
}

export default function MarrakechDogHotelSite() {
  return (
    <div className="scroll-smooth font-sans text-stone-800 bg-[radial-gradient(1200px_800px_at_20%_10%,#fffde7_0%,#fff8dc_35%,#fff_65%)]">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <LifeAtHotel />
        <ComingSoon />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
