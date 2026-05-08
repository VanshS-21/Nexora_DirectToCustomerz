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
    </>
  );
}
