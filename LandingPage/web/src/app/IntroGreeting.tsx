import styles from "./page.module.css";

const capabilityPills = [
  { label: "Design systems", icon: "grid", side: "left", slot: "top" },
  { label: "UI/UX", icon: "square", side: "left", slot: "middle" },
  { label: "Research", icon: "search", side: "left", slot: "bottom" },
  { label: "Prototyping", icon: "frame", side: "right", slot: "top" },
  { label: "Animation", icon: "motion", side: "right", slot: "middle" },
  { label: "Strategy", icon: "compass", side: "right", slot: "bottom" },
] as const;

const greetingLines = [
  "We help local businesses",
  "establish a clear digital",
  "connection",
  "between their offer and",
  "ready customers",
];

function CapabilityGlyph({ type }: { type: string }) {
  if (type === "grid") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z" />
      </svg>
    );
  }

  if (type === "square") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6h12v12H6z" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="M15 15l4 4" />
      </svg>
    );
  }

  if (type === "frame") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4H5v3M16 4h3v3M8 20H5v-3M16 20h3v-3" />
        <path d="M9 9h6v6H9z" />
      </svg>
    );
  }

  if (type === "motion") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 8c3-4 9 4 12 0M6 16c3 4 9-4 12 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

const greetingScrollScript = `
(() => {
  const init = () => {
    const section = document.querySelector("[data-greeting-section]");

    if (!section) {
      return;
    }

    if (section.__nexoraGreetingCleanup) {
      section.__nexoraGreetingCleanup();
    }

    const copy = section.querySelector("[data-greeting-copy]");
    const lines = Array.from(section.querySelectorAll("[data-ink-line]"));
    const pills = Array.from(section.querySelectorAll("[data-capability-pill]"));
    let frame = 0;
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      const copyRect = (copy || section).getBoundingClientRect();
      const progress = clamp((viewportHeight * 0.84 - copyRect.top) / (viewportHeight * 0.36));

      section.style.setProperty("--scroll-progress", progress.toFixed(3));

      lines.forEach((line) => {
        const lineRect = line.getBoundingClientRect();
        const ink = clamp((viewportHeight * 0.82 - lineRect.top) / (viewportHeight * 0.24));
        line.style.setProperty("--ink-percent", Math.round(ink * 100) + "%");
      });

      pills.forEach((pill) => {
        const side = pill.dataset.pillSide;
        const direction = side === "left" ? 1 : -1;
        const tiltDirection = side === "left" ? -1 : 1;

        pill.style.setProperty("--pill-shift", Math.round(direction * 66 * progress) + "px");
        pill.style.setProperty("--pill-tilt", (tiltDirection * 2 * (1 - progress)).toFixed(2) + "deg");
      });
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", update);
    section.__nexoraGreetingCleanup = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", update);
    };

    update();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
`;

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
            {greetingLines.map((line) => (
              <span className={styles.greetingLine} data-ink-line key={line}>
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className={styles.capabilityOrbit} aria-label="Nexora capabilities">
          {capabilityPills.map((pill) => (
            <div
              className={`${styles.capabilityPill} ${styles[pill.side]} ${styles[pill.slot]}`}
              data-capability-pill
              data-pill-side={pill.side}
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
      <script
        id="nexora-greeting-scroll"
        dangerouslySetInnerHTML={{ __html: greetingScrollScript }}
      />
    </>
  );
}
