import Image from "next/image";
import { FooterSection } from "./FooterSection";
import { IntroGreeting } from "./IntroGreeting";
import { ScrollChoreography } from "./ScrollChoreography";
import { TestimonialStack } from "./TestimonialStack";
import { WorkShowcase } from "./WorkShowcase";
import styles from "./page.module.css";

const processSteps = [
  {
    label: "Dump the puzzle",
    copy: "We learn your offer, audience, local market, and what must happen after a visitor lands.",
    icon: "target",
  },
  {
    label: "Sort the pieces",
    copy: "We turn scattered content, offers, photos, and preferences into a clear build plan.",
    icon: "spark",
  },
  {
    label: "Make it click",
    copy: "You review one strong direction with us, then we tighten the story, visuals, and flow.",
    icon: "wand",
  },
  {
    label: "Hand it over",
    copy: "Launch with a fast custom site, simple handover docs, analytics, and ownership clarity.",
    icon: "chart",
  },
];

const services = [
  {
    number: "01",
    title: "UI/UX design",
    description:
      "Websites and apps that are easy to trust, hard to ignore, and arranged around the decisions your customers need to make.",
    details: ["Website and landing page design", "Booking and enquiry flows", "Mobile-first page systems"],
  },
  {
    number: "02",
    title: "Web development",
    description:
      "Responsive, custom-coded builds with clean handover, fast loading, and no dependency on rented templates.",
    details: ["Workflow and framework development", "High-converting landing pages", "No-code and low-code support"],
  },
  {
    number: "03",
    title: "Brand design",
    description:
      "Logo polish, guidelines, visual systems, and practical creative direction for businesses that need to look established.",
    details: ["Logo and identity design", "Brand guidelines", "Creative direction for launch"],
  },
];

const packages = [
  {
    name: "Design",
    price: "Rs 39,999",
    intro: "For businesses that need a sharper site direction before building.",
    items: ["Discovery workshop", "Sitemap and page strategy", "Custom design direction", "Mobile and desktop layouts"],
    action: "Book design call",
  },
  {
    name: "Design + Development",
    price: "Rs 89,999",
    intro: "For owners who want the complete website handled from idea to launch.",
    items: ["Everything from design", "Custom frontend build", "Simple content handover", "Performance optimization"],
    action: "Book a discovery call",
    featured: true,
  },
  {
    name: "Customized",
    price: "Custom",
    intro: "For more complex launches with booking flows, integrations, or multiple service lines.",
    items: ["Full product strategy", "Advanced integrations", "Multi-page content system", "Launch and growth support"],
    action: "Start a custom plan",
  },
];

const faqs = [
  {
    question: "Do you only build websites?",
    answer:
      "Websites are the center of the work, but we can shape the surrounding brand, copy, launch graphics, booking flow, and offer clarity when the site needs it.",
  },
  {
    question: "Can you help if our content is messy?",
    answer:
      "Yes. Most clients come with scattered notes, old pages, WhatsApp screenshots, and half-written offers. We turn that into a usable page structure before design starts.",
  },
  {
    question: "How involved do I need to be?",
    answer:
      "You stay close to the key decisions without managing every detail. Expect a discovery call, one clean direction, focused review rounds, and clear next steps.",
  },
  {
    question: "What makes this different from a template site?",
    answer:
      "We design around your buyer, proof, service flow, and local trust signals. The goal is not a pretty shell. It is a site that makes someone feel safe contacting you.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused website usually takes 3-6 weeks depending on content readiness, number of pages, and whether development is included.",
  },
  {
    question: "What if I do not like the first direction?",
    answer:
      "We make the first direction from an agreed brief, then use review rounds to tighten it. If the strategy is wrong, we revisit the brief before polishing pixels.",
  },
];

function ProcessGlyph({ type }: { type: string }) {
  if (type === "spark") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M35 6l5 17 17 5-17 6-5 24-7-24-21-6 21-5z" />
      </svg>
    );
  }

  if (type === "wand") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M15 49l27-27 7 7-27 27z" />
        <path d="M46 8l2 8 8 2-8 2-2 8-3-8-7-2 7-2z" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M13 50h38" />
        <path d="M18 44V29" />
        <path d="M32 44V17" />
        <path d="M46 44V24" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="8" />
      <path d="M32 4v11M32 49v11M4 32h11M49 32h11" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={styles.wrapper} data-motion-root>
      <a href="#main" className="visually-hidden">Skip to main content</a>
      <div className={styles.announcementBanner} role="status" aria-label="Current focus">
        Now shaping playful web launches for local brands.
      </div>

      <aside className={styles.sideTab} aria-label="Nexora honors">
        <span className={styles.sideMark}>N.</span>
        <span>Nexora Works</span>
      </aside>

      <nav className={styles.fixedBottomNav} aria-label="Mobile section navigation">
        <a href="#process" aria-label="Go to Process section">
          <span>01</span> Process
        </a>
        <a href="#work" aria-label="Go to Work section">
          <span>02</span> Work
        </a>
        <a href="#pricing" aria-label="Go to Pricing section">
          <span>03</span> Pricing
        </a>
        <a href="#contact" className={styles.bottomNavCta} aria-label="Go to Contact section">
          <span>04</span> Contact
        </a>
      </nav>

      <header className={styles.topNav}>
        <a href="#" className={styles.logo} aria-label="Nexora Labs home">
          <span>Nexora</span>
          <b>Labs</b>
        </a>
        <nav className={styles.navLinks} aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact" className={styles.navCta}>
            Contact us
          </a>
        </nav>
      </header>

      <main id="main">
        <section id="about" className={styles.heroSection}>
          <div className={styles.heroScene} aria-hidden="true">
            <div className={`${styles.heroArtifact} ${styles.heroArtifactBistro}`}>
              <Image src="/work-bistro.svg" alt="" fill sizes="22vw" />
            </div>
            <div className={`${styles.heroArtifact} ${styles.heroArtifactClinic}`}>
              <Image src="/work-clinic.svg" alt="" fill sizes="18vw" />
            </div>
            <div className={`${styles.heroArtifact} ${styles.heroArtifactFitness}`}>
              <Image src="/work-fitness.svg" alt="" fill sizes="20vw" />
            </div>
            <span className={styles.heroSticker}>No templates</span>
            <span className={styles.heroStamp}>Done for you</span>
            <div className={styles.heroLaunchNote}>
              <span>Launch packet</span>
              <b>Strategy</b>
              <b>Design</b>
              <b>Build</b>
            </div>
          </div>
          <div className={styles.heroIntro}>
            <p>
              Bring the notes, photos, half-written offers, and the slightly
              messy idea. We turn it into a custom website that feels credible,
              lively, and ready for real customers.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.primaryAction}>
                Book a discovery call
              </a>
              <a href="#work" className={styles.secondaryAction}>
                See proof
              </a>
            </div>
            <ul className={styles.heroTrustList} aria-label="Nexora project strengths">
              <li>Strategy, design, and development</li>
              <li>3-6 week focused launches</li>
              <li>Built around real buyer trust</li>
            </ul>
            <span aria-hidden="true">&darr;</span>
          </div>
          <div className={styles.heroTitleWrap}>
            <h1 className={styles.heroTitle}>
              <span>Websites</span>
              <span>That Feel</span>
              <span>Handmade</span>
            </h1>
          </div>
        </section>

        <IntroGreeting />

        <section id="process" className={styles.processSection} data-process-section>
          <div className={styles.sectionKicker}>Process</div>
          <h2>We make the messy middle fun</h2>
          <p className={styles.sectionLead}>
            A clear path for busy owners: hand us the clutter, review the important choices, and get a polished site without managing the whole build.
          </p>
          <div className={styles.processGrid} data-process-grid>
            {processSteps.map((step) => (
              <article className={styles.processCard} data-process-card key={step.label}>
                <div className={styles.processIcon}>
                  <ProcessGlyph type={step.icon} />
                </div>
                <h3>{step.label}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className={styles.servicesSection} data-services-section>
          <div className={styles.servicesStickyFrame}>
            <div className={styles.servicesMedia}>
              <Image
                src="/services-background.png"
                alt=""
                fill
                sizes="100vw"
                className={styles.servicesBackground}
              />
            </div>
            <div className={styles.servicesScrim} />
            <div className={styles.serviceProgress} aria-hidden="true">
              <span>Services</span>
              <div className={styles.progressTrack}>
                <i />
              </div>
            </div>
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

        <TestimonialStack />

        <section id="pricing" className={styles.pricingSection}>
          <div className={styles.pricingIntro} data-reveal>
            <div className={styles.sectionKicker}>Pricing</div>
            <h2>Pick a starting shape</h2>
            <p>Simple proposal-style packages, with enough room to tailor the build around your actual business.</p>
          </div>
          <div className={styles.pricingGrid}>
            {packages.map((item) => (
              <article
                className={`${styles.pricingCard} ${item.featured ? styles.featuredPricing : ""}`}
                data-reveal
                key={item.name}
              >
                {item.featured ? <span className={styles.pricingBadge}>Most handled</span> : null}
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <p>{item.intro}</p>
                <ul>
                  {item.items.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a href="#contact">{item.action}</a>
              </article>
            ))}
          </div>
        </section>

        <section id="faqs" className={styles.faqSection}>
          <div data-reveal>
            <div className={styles.sectionKicker}>FAQs</div>
            <h2>The curious corner</h2>
            <p className={styles.sectionLead}>The bits clients usually ask before we start building.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details data-reveal key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <FooterSection />
      </main>
      <ScrollChoreography />
    </div>
  );
}
