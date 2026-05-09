import { CopyEmailButton } from "./CopyEmailButton";
import styles from "./page.module.css";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
  { label: "Process", href: "#process" },
] as const;

export function FooterSection() {
  return (
    <footer id="contact" className={styles.contactSection}>
      <div className={styles.footerOverlay} aria-hidden="true" />
      <div className={styles.footerContent}>
        <div className={styles.footerAvailability} data-reveal>
          <span aria-hidden="true" />
          Currently accepting new projects for 2026
        </div>
        <a className={styles.footerEmail} href="mailto:hello@nexoralabs.com" data-reveal>
          <span>hello@</span>
          <span>nexoralabs.com</span>
        </a>
        <CopyEmailButton />
        <nav className={styles.footerSocials} aria-label="Footer links" data-reveal>
          {footerLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.footerRule} data-reveal aria-hidden="true" />
        <p className={styles.footerTagline} data-reveal>Boutique web studio for local brands.</p>
        <p className={styles.footerCopyright} data-reveal>&copy;2026 Nexora Labs &bull; All rights reserved</p>
      </div>
    </footer>
  );
}
