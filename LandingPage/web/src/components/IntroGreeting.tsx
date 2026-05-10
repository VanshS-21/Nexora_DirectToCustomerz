import { LayoutGrid, Square, Search, Scan, Waves, Compass } from "lucide-react";
import styles from "@/styles/greeting.module.css";

const capabilityPills = [
  { label: "Offer clarity", icon: "grid", pos: "pos-0", drift: "34" },
  { label: "Buyer trust", icon: "square", pos: "pos-1", drift: "-42" },
  { label: "Proof mapping", icon: "search", pos: "pos-2", drift: "52" },
  { label: "Page strategy", icon: "frame", pos: "pos-3", drift: "-38" },
  { label: "Booking paths", icon: "motion", pos: "pos-4", drift: "28" },
  { label: "Custom build", icon: "compass", pos: "pos-5", drift: "-48" },
] as const;

const greetingLines = [
  "Your best customers",
  "already trust you offline",
  "we help the website",
  "earn that trust",
  "before they enquire",
];

const capabilityIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  grid: LayoutGrid,
  square: Square,
  search: Search,
  frame: Scan,
  motion: Waves,
  compass: Compass,
};

function CapabilityGlyph({ type }: { type: string }) {
  const Icon = capabilityIconMap[type] ?? Compass;
  return <Icon />;
}

export function IntroGreeting() {
  return (
    <>
      <section
        id="intro"
        className={styles.greetingSection}
        aria-label="How Nexora helps"
        data-greeting-section
      >
        <div className={styles.greetingCenter}>
          <div className={styles.greetingLabel}>
            <span />
            <p>Hello!</p>
            <span />
          </div>
          <h2 data-greeting-copy>
            {greetingLines.map((line, index) => (
              <span className={styles.greetingLine} data-ink-line style={{ "--line-index": index } as React.CSSProperties} key={line}>
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className={styles.capabilityOrbit} aria-label="Nexora capabilities">
          {capabilityPills.map((pill, index) => (
            <div
              className={`${styles.capabilityPill} ${styles[pill.pos]}`}
              data-capability-pill
              data-pill-drift={pill.drift}
              style={{ "--pill-index": index } as React.CSSProperties}
              key={pill.label}
            >
              <span className={`${styles.capabilityIcon} ${styles[pill.icon]}`}>
                <CapabilityGlyph type={pill.icon} />
              </span>
              <span>{pill.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
