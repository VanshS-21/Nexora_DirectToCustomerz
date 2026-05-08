import Image from "next/image";
import styles from "./page.module.css";

const socialLinks = [
  { label: "Instagram", short: "Ig", href: "https://instagram.com" },
  { label: "LinkedIn", short: "in", href: "https://linkedin.com" },
  { label: "Behance", short: "Be", href: "https://behance.net" },
] as const;

export function FooterSection() {
  return (
    <footer id="contact" className={styles.contactSection}>
      <Image
        src="/footer-sunrise.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.footerImage}
        priority={false}
      />
      <div className={styles.footerOverlay} aria-hidden="true" />
      <div className={styles.footerContent}>
        <nav className={styles.footerSocials} aria-label="Social links">
          {socialLinks.map((link) => (
            <a href={link.href} aria-label={link.label} key={link.label}>
              {link.short}
            </a>
          ))}
        </nav>
        <p className={styles.footerAvailability}>
          <span aria-hidden="true" />
          Available for new project(s)
        </p>
        <a className={styles.footerEmail} href="mailto:hello@nexoralabs.com">
          hello@nexoralabs.com
        </a>
        <div className={styles.footerRule} aria-hidden="true" />
        <p className={styles.footerTagline}>We make local websites feel worth clicking.</p>
        <p className={styles.footerCopyright}>©2026 Nexora Labs</p>
      </div>
    </footer>
  );
}
