import Image from "next/image";
import { FooterSection } from "./FooterSection";
import { IntroGreeting } from "./IntroGreeting";
import { ScrollChoreography } from "./ScrollChoreography";
import { TestimonialStack } from "./TestimonialStack";
import { WorkShowcase } from "./WorkShowcase";
import styles from "./page.module.css";

const processSteps = [
  {
    label: "Subscribe",
    copy: "Book a 30-minute call. We learn your offer, audience, local market, and what must happen after a visitor lands.",
    icon: "target",
  },
  {
    label: "Request",
    copy: "Send your content, offers, photos, and preferences. We turn the messy pieces into a clear build plan.",
    icon: "spark",
  },
  {
    label: "Revise",
    copy: "Review the first direction with us. We refine the page until it feels trustworthy, useful, and unmistakably yours.",
    icon: "wand",
  },
  {
    label: "Enjoy the results",
    copy: "Launch with a fast custom site, simple handover docs, and the confidence that your web presence finally works.",
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
  "Can I get both design and marketing help?",
  "What makes you different from other agencies?",
  "Do you only do design and websites?",
  "How many requests can I send at once?",
  "How does the subscription model work?",
  "What if I do not like the first design?",
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
    <div className={styles.wrapper}>
      <div className={styles.announcementBanner}>
        Websites for local businesses.
      </div>

      <aside className={styles.sideTab} aria-label="Nexora honors">
        <span className={styles.sideMark}>N.</span>
        <span>Nexora Works</span>
      </aside>

      <nav className={styles.fixedBottomNav} aria-label="Section navigation">
        <a href="#about">
          <span>01</span> About
        </a>
        <a href="#process">
          <span>02</span> Process
        </a>
        <a href="#services">
          <span>03</span> Services
        </a>
        <a href="#work">
          <span>04</span> Work
        </a>
        <a href="#pricing">
          <span>05</span> Pricing
        </a>
        <a href="#faqs">
          <span>06</span> FAQs
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

      <main>
        <section id="about" className={styles.heroSection}>
          <div className={styles.heroIntro}>
            <p>We are a boutique studio helping busy local businesses get online without the agency runaround.</p>
            <span aria-hidden="true">&darr;</span>
          </div>
          <div className={styles.heroTitleWrap}>
            <h1 className={styles.heroTitle}>
              <span>Your New Design</span>
              <span>Partner</span>
            </h1>
          </div>
        </section>

        <IntroGreeting />

        <section id="process" className={styles.processSection} data-process-section>
          <div className={styles.sectionKicker}>Process</div>
          <h2>Getting started is easy</h2>
          <p className={styles.sectionLead}>
            Our process is built for busy owners who want quality without the wait: simple, smooth, and stress-free.
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
            <Image
              src="/services-background.png"
              alt=""
              fill
              sizes="100vw"
              className={styles.servicesBackground}
            />
            <div className={styles.servicesScrim} />
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
          <div className={styles.sectionKicker}>Pricing</div>
          <div className={styles.pricingGrid}>
            {packages.map((item) => (
              <article className={`${styles.pricingCard} ${item.featured ? styles.featuredPricing : ""}`} key={item.name}>
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
          <div>
            <div className={styles.sectionKicker}>FAQs</div>
            <h2>The curious corner</h2>
            <p className={styles.sectionLead}>The bits clients usually ask before we start building.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((question) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>
                  We answer this during discovery with specifics for your business, timeline, and launch goals. The short version:
                  we keep the process practical and transparent.
                </p>
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
