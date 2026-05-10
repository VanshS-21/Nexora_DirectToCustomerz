import Image from "next/image";
import { Target, Sparkles, Wand, BarChart3, ArrowUp } from "lucide-react";
import { FooterSection } from "@/components/FooterSection";
import { IntroGreeting } from "@/components/IntroGreeting";
import { ScrollChoreography } from "@/components/ScrollChoreography";
import { TestimonialStack } from "@/components/TestimonialStack";
import { WorkShowcase } from "@/components/WorkShowcase";
import styles from "@/styles/page.module.css";

const processSteps = [
  {
    label: "Clarify the audience",
    copy: "Who your website is for, what they need to hear, and what the site needs to achieve.",
    icon: "target",
  },
  {
    label: "Shape the offer",
    copy: "Services, proof, pricing, photos, and rough notes turned into a page plan buyers can follow.",
    icon: "spark",
  },
  {
    label: "Design for trust",
    copy: "Design and code built around the doubts someone has before they enquire, book, or call.",
    icon: "wand",
  },
  {
    label: "Launch and learn",
    copy: "Live site with analytics, handover notes, and a clear route for improving after launch.",
    icon: "chart",
  },
];

const services = [
  {
    number: "01",
    title: "Offer and audience clarity",
    description:
      "Who the site is for, what they need to hear, and what proof moves them toward contact.",
    details: ["Audience and offer clarity", "Page jobs and sitemap", "Proof and trust plan"],
  },
  {
    number: "02",
    title: "Trust-led design",
    description:
      "Custom pages that make your service feel specific, credible, and easy to choose on any device.",
    details: ["Website and landing page design", "Booking and enquiry flows", "Mobile-first page systems"],
  },
  {
    number: "03",
    title: "Custom build and launch",
    description:
      "Fast, responsive, owned websites with clean handover, launch support, and no template dependency.",
    details: ["Custom-coded frontend", "Analytics and launch support", "Ownership and handover docs"],
  },
];

const packages = [
  {
    name: "Clarity Sprint",
    price: "Rs 39,999",
    intro: "For businesses that need to clarify their offer and audience before building.",
    items: ["Discovery workshop", "Audience and offer clarity", "Sitemap and page jobs", "One custom design direction"],
    action: "Book a free call",
  },
  {
    name: "Website Launch",
    price: "Rs 89,999",
    intro: "For owners ready to turn services, proof, and reputation into a live, custom website.",
    items: ["Everything from the sprint", "Custom frontend build", "Enquiry or booking path", "Analytics and handover"],
    action: "Book a free call",
    featured: true,
  },
  {
    name: "Growth Partner",
    price: "Custom",
    intro: "For service brands with multiple offers, locations, integrations, or growth goals.",
    items: ["Full website strategy", "Advanced integrations", "Multi-page content system", "Launch and growth support"],
    action: "Talk about your project",
  },
];

const launchStops = [
  { href: "#about", label: "Audience", detail: "Right customer" },
  { href: "#process", label: "Offer", detail: "Clear pages" },
  { href: "#services", label: "Build", detail: "Owned site" },
  { href: "#work", label: "Proof", detail: "Real trust" },
  { href: "#contact", label: "Call", detail: "Start here" },
] as const;

const faqs = [
  {
    question: "Who is Nexora best for?",
    answer:
      "Owner-led service businesses with proof, referrals, or local trust — but an online presence that does not explain the offer clearly enough to earn enquiries.",
  },
  {
    question: "What if our offer still feels messy?",
    answer:
      "That is normal. We sort services, audience, proof, prices, photos, and buyer questions into a clear page plan before design begins.",
  },
  {
    question: "Do you only build websites?",
    answer:
      "The website is the centre of the work. Around it, we can clarify your offer, shape copy, design the booking flow, polish brand direction, and launch the site.",
  },
  {
    question: "What makes this different from a template site?",
    answer:
      "We start with your buyer, proof, service structure, and local trust signals. The goal is not a prettier shell — it is a site that makes someone feel safe contacting you.",
  },
  {
    question: "Are we a good fit if we only want the cheapest site?",
    answer:
      "Probably not. Nexora is for businesses that want a clearer offer, custom design, clean code, and a site they can grow from.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused website usually takes 3–6 weeks depending on content readiness, number of pages, and integrations.",
  },
  {
    question: "What if I do not like the first direction?",
    answer:
      "We make the first direction from an agreed brief, then use review rounds to tighten it. If the strategy is wrong, we revisit the brief first.",
  },
];

const processIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  spark: Sparkles,
  wand: Wand,
  chart: BarChart3,
};

function ProcessGlyph({ type }: { type: string }) {
  const Icon = processIconMap[type] ?? Target;
  return <Icon className={styles.processIconSvg} />;
}

export default function Home() {
  return (
    <div className={styles.wrapper} data-motion-root>
      <a href="#main" className="visually-hidden">Skip to main content</a>
      <div className={styles.announcementBanner} role="status" aria-label="Current focus">
        Websites that turn your local trust into enquiries.
      </div>

      <nav className={styles.fixedBottomNav} aria-label="Mobile section navigation">
        <a href="#process" data-nav-section="process" aria-label="Go to Process section">
          <span>01</span> Process
        </a>
        <a href="#work" data-nav-section="work" aria-label="Go to Work section">
          <span>02</span> Work
        </a>
        <a href="#pricing" data-nav-section="pricing" aria-label="Go to Pricing section">
          <span>03</span> Pricing
        </a>
        <a href="#contact" data-nav-section="contact" className={styles.bottomNavCta} aria-label="Go to Contact section">
          <span>04</span> Contact
        </a>
      </nav>

      <nav
        className={styles.launchMap}
        aria-label="Launch route navigation"
        data-launch-map
        data-launch-visibility="hidden"
      >
        <div className={styles.launchMapHeader}>
          <span>Your route</span>
          <b>Trust to enquiries</b>
        </div>
        <div className={styles.launchMapTrack} aria-hidden="true">
          <span className={styles.launchMapRail}>
            <i data-launch-fill />
          </span>
        </div>
        <ol className={styles.launchMapStops}>
          {launchStops.map((stop, index) => (
            <li key={stop.href}>
              <a
                href={stop.href}
                className={styles.launchMapStop}
                data-launch-stop
                data-launch-index={index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{stop.label}</b>
                <small>{stop.detail}</small>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <header className={styles.topNav} data-top-nav>
        <a href="#" className={styles.logo} aria-label="Nexora Labs home">
          <span>Nexora</span>
          <b>Labs</b>
        </a>
        <nav className={styles.navLinks} aria-label="Main navigation">
          <a href="#about" data-nav-section="about">About</a>
          <a href="#work" data-nav-section="work">Work</a>
          <a href="#pricing" data-nav-section="pricing">Pricing</a>
          <a href="#contact" data-nav-section="contact" className={styles.navCta}>
            Contact us
          </a>
        </nav>
      </header>

      <main id="main">
        <section id="about" className={styles.heroSection}>
          <div className={styles.heroScene} aria-hidden="true">
            <div className={`${styles.heroArtifact} ${styles.heroArtifactBistro}`}>
              <Image src="/work-bistro.svg" alt="" fill sizes="22vw" priority />
            </div>
            <div className={`${styles.heroArtifact} ${styles.heroArtifactClinic}`}>
              <Image src="/work-clinic.svg" alt="" fill sizes="18vw" priority />
            </div>
          </div>
          <div className={styles.heroIntro}>
            <p>
              For service businesses that earn trust offline but need a website
              that explains the offer, shows proof, and makes it easy to enquire.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.primaryAction}>
                Book a free call
              </a>
              <a href="#work" className={styles.secondaryAction}>
                See our work
              </a>
            </div>
            <span aria-hidden="true">&darr;</span>
          </div>
          <div className={styles.heroTitleWrap}>
            <h1 className={styles.heroTitle}>
              <span>Websites</span>
              <span>Built For</span>
              <span>Local Trust</span>
            </h1>
          </div>
        </section>

        <IntroGreeting />

        <section id="process" className={styles.processSection} data-process-section>
          <div className={styles.sectionKicker}>Process</div>
          <h2>Clarify before you build</h2>
          <p className={styles.sectionLead}>
            Four steps: decide who the site must reach, what proof they need, and how it turns attention into action.
          </p>
          <div className={styles.processGrid} data-process-grid>
            {processSteps.map((step, index) => (
              <article className={styles.processCard} data-process-card key={step.label}>
                <div className={styles.processIcon}>
                  <ProcessGlyph type={step.icon} />
                </div>
                <div>
                  <span className={styles.processStepNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.label}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <a href="#work" className="visually-hidden">Skip services section</a>
        <section id="services" className={styles.servicesSection} data-services-section>
          <div className={styles.servicesStickyFrame}>
            <div className={styles.servicesMedia}>
              <Image
                src="/services-background.webp"
                alt=""
                fill
                sizes="100vw"
                className={styles.servicesBackground}
                priority
              />
            </div>
            <div className={styles.servicesScrim} />
            <nav className={styles.serviceNav} aria-label="Service panels">
              {services.map((service, index) => (
                <button
                  type="button"
                  className={styles.serviceNavDot}
                  data-service-nav-dot
                  data-service-index={index}
                  key={service.title}
                  aria-label={`${service.title}`}
                />
              ))}
            </nav>
            <div className={styles.serviceStack} data-service-shell>
              <div className={styles.serviceRail} data-service-rail>
                {services.map((service) => (
                  <article className={styles.servicePanel} data-service-panel key={service.title}>
                    <div className={styles.serviceNumber}>{service.number}</div>
                    <div className={styles.serviceRule} />
                    <div className={styles.serviceCopy}>
                      <h2>{service.title}</h2>
                      <p>{service.description}</p>
                      <ul>
                        {service.details.map((detail, index) => (
                          <li key={detail}>
                            <span>/{String(index + 1).padStart(2, "0")}</span>
                            <strong>{detail}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WorkShowcase />

        <a href="#pricing" className="visually-hidden">Skip testimonials section</a>
        <TestimonialStack />

        <section id="pricing" className={styles.pricingSection}>
          <div className={styles.pricingIntro} data-reveal>
            <div className={styles.sectionKicker}>Pricing</div>
            <h2>Start with the right problem</h2>
            <p>Every package starts with who the site is for, what proves you credible, and what each page needs to do. Pick the level of support that fits.</p>
          </div>
          <div className={styles.pricingGrid}>
            {packages.map((item) => (
              <article
                className={`${styles.pricingCard} ${item.featured ? styles.featuredPricing : ""}`}
                data-reveal
                key={item.name}
              >
                {item.featured ? <span className={styles.pricingBadge}>Most chosen</span> : null}
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <p>{item.intro}</p>
                <ul>
                  {item.items.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a href="#contact" aria-label={`${item.action} — ${item.name}`}>{item.action}</a>
              </article>
            ))}
          </div>

          <div className={styles.faqBlock}>
            <div data-reveal>
              <div className={styles.sectionKicker}>FAQs</div>
              <h2>Common questions</h2>
              <p className={styles.sectionLead}>What owners ask before they get in touch.</p>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details data-reveal key={faq.question}>
                  <summary><span>{faq.question}</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
      <button
        type="button"
        className={styles.backToTop}
        data-back-to-top
        aria-label="Back to top"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
      <ScrollChoreography />
    </div>
  );
}
