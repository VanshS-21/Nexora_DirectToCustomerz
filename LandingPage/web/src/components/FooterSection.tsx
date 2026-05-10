import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import styles from "@/styles/contact.module.css";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
  { label: "Process", href: "#process" },
] as const;

export function FooterSection() {
  return (
    <footer id="contact" className={styles.contactSection}>
      <Image
        src="/footer-sunrise.webp"
        alt=""
        fill
        sizes="100vw"
        className={styles.footerBackground}
      />
      <div className={styles.footerOverlay} aria-hidden="true" />
      <div className={styles.footerContent}>
        <div className={styles.footerAvailability} data-reveal>
          <span aria-hidden="true" />
          Booking market-fit website builds for 2026
        </div>
        <div className={styles.contactFormCard} data-reveal>
          <div className={styles.contactFormHeader}>
            <h2 className={styles.contactFormHeading}>Start a project</h2>
            <p className={styles.contactFormLead}>
              Tell us about your business and we&apos;ll get back within a day.
            </p>
          </div>
          <ContactForm />
        </div>
        <nav className={styles.footerSocials} aria-label="Footer links" data-reveal>
          {footerLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.footerRule} data-reveal aria-hidden="true" />
        <p className={styles.footerTagline} data-reveal>Boutique web agency for owner-led service brands.</p>
        <p className={styles.footerCopyright} data-reveal>&copy;2026 Nexora Labs &bull; All rights reserved</p>
      </div>
    </footer>
  );
}
