import styles from "./page.module.css";

const testimonials = [
  {
    name: "Akhil Lodha",
    role: "Financial advisor",
    quote:
      "They dug deep into what our clients ask before they call us. The new website explains our value quickly and makes every enquiry feel warmer.",
    mark: "01",
    tone: "testimonialWarm",
  },
  {
    name: "Angelique Overton",
    role: "Salon owner",
    quote:
      "Nexora took our scattered ideas and turned them into a site that feels polished without becoming stiff. We finally have a place we can send people with pride.",
    mark: "02",
    tone: "testimonialRose",
  },
  {
    name: "Kevin Khoury",
    role: "Local studio founder",
    quote:
      "The process was calm, quick, and very clear. They handled strategy, design, and launch without making us manage five different people.",
    mark: "03",
    tone: "testimonialMint",
  },
] as const;

const testimonialStackScript = `
(() => {
  const init = () => {
    const section = document.querySelector("[data-testimonial-section]");
    const cards = Array.from(section?.querySelectorAll("[data-testimonial-card]") || []);

    if (!section || !cards.length) {
      return;
    }

    if (section.__nexoraTestimonialCleanup) {
      section.__nexoraTestimonialCleanup();
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      const sectionRect = section.getBoundingClientRect();
      const scrollRange = Math.max(1, section.offsetHeight - viewportHeight);
      const progress = reduceMotion.matches ? 0 : clamp(-sectionRect.top / scrollRange);
      const active = progress * Math.max(1, cards.length - 1);

      section.style.setProperty("--testimonial-progress", progress.toFixed(3));

      cards.forEach((card, index) => {
        const distance = index - active;
        const futureOffset = Math.max(distance, 0);
        const passed = clamp(active - index);
        const localProgress = easeOutQuart(passed);
        const activeDistance = Math.abs(distance);
        const x = futureOffset * 13 - localProgress * 46;
        const y = futureOffset * 11 - localProgress * 118;
        const rotate = futureOffset * 1.45 - localProgress * 4.6;
        const scale = 1 - futureOffset * 0.018 - localProgress * 0.035;
        const opacity = 1 - Math.max(0, activeDistance - 1.08) * 0.34 - localProgress * 0.18;
        const contentOpacity = 1 - clamp(activeDistance * 0.95, 0, 1);
        const z = Math.round(100 - activeDistance * 18 + index);

        card.style.setProperty("--testimonial-x", x.toFixed(1) + "px");
        card.style.setProperty("--testimonial-y", y.toFixed(1) + "px");
        card.style.setProperty("--testimonial-rotate", rotate.toFixed(2) + "deg");
        card.style.setProperty("--testimonial-scale", scale.toFixed(3));
        card.style.setProperty("--testimonial-opacity", clamp(opacity, 0.28, 1).toFixed(3));
        card.style.setProperty("--testimonial-content-opacity", contentOpacity.toFixed(3));
        card.style.setProperty("--testimonial-z", String(z));
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
    reduceMotion.addEventListener("change", update);
    section.__nexoraTestimonialCleanup = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", update);
      reduceMotion.removeEventListener("change", update);
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

export function TestimonialStack() {
  return (
    <>
      <section
        className={styles.testimonialsSection}
        aria-labelledby="testimonials-heading"
        data-testimonial-section
      >
        <div className={styles.testimonialSticky}>
          <div className={styles.testimonialIntro}>
            <div className={styles.sectionKicker}>Client notes</div>
            <h2 id="testimonials-heading">Kisses from our partners</h2>
            <p className={styles.sectionLead}>
              Great partnerships leave stories behind. These are a few we keep close.
            </p>
          </div>

          <div className={styles.testimonialDeck} aria-label="Partner stories">
            {testimonials.map((testimonial) => (
              <article
                className={`${styles.testimonialCard} ${styles[testimonial.tone]}`}
                data-testimonial-card
                key={testimonial.name}
              >
                <div className={styles.testimonialCopy}>
                  <span>{testimonial.mark}</span>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.quote}</p>
                  <small>{testimonial.role}</small>
                </div>
                <div className={styles.testimonialPattern} aria-hidden="true" />
                <div className={styles.testimonialSticker} aria-hidden="true">
                  <b>Works</b>
                  <span>smooth</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <script
        id="nexora-testimonial-stack"
        dangerouslySetInnerHTML={{ __html: testimonialStackScript }}
      />
    </>
  );
}
