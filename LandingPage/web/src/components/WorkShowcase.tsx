import Image from "next/image";
import styles from "@/styles/work.module.css";

const workProjects = [
  {
    title: "Corner Bistro",
    category: "Restaurant enquiry path",
    proof: "Menu, table booking, and private event enquiries arranged around one clear next step.",
    image: "/work-bistro.svg",
    tone: "workSage",
    sticker: "Bookings",
    rotate: "-3.4",
  },
  {
    title: "Northside Clinic",
    category: "Clinic trust system",
    proof: "Reduced patient hesitation with service pages, credentials, FAQs, and direct contact routes.",
    image: "/work-clinic.svg",
    tone: "workSky",
    sticker: "Care routes",
    rotate: "2.7",
  },
  {
    title: "Pulse Coach",
    category: "Coaching offer page",
    proof: "Turned a personal brand into a focused coaching offer with a clear enquiry path.",
    image: "/work-salon.svg",
    tone: "workInk",
    sticker: "Lead ready",
    rotate: "1.8",
  },
  {
    title: "Bloom Studio",
    category: "Salon booking launch",
    proof: "Packaged services, location details, price cues, and booking intent for a premium local launch.",
    image: "/work-salon.svg",
    tone: "workPeach",
    sticker: "Launch kit",
    rotate: "-2.2",
  },
] as const;

export function WorkShowcase() {
  return (
    <section id="work" className={styles.workSection} data-work-section>
      <div className={styles.workStage} data-work-stage>
        <div className={styles.workHeader} data-work-center>
          <p className={styles.workKicker}>Market-fit examples</p>
          <h2>Buyer paths, pinned to the wall</h2>
          <p>Every preview starts with a real decision: book a table, trust a clinic, enquire about coaching, or choose a salon.</p>
          <a href="#contact" aria-label="Find your website job">Find your website job</a>
        </div>

        <div className={styles.workProjectField} aria-label="Selected website projects">
          {workProjects.map((project, index) => (
            <article
              className={`${styles.workProject} ${styles[project.tone]}`}
              aria-label={`${project.title}, ${project.category}`}
              data-work-card
              data-work-rotate={project.rotate}
              style={{ "--work-card-index": index } as React.CSSProperties}
              key={project.title}
            >
              <span className={styles.workSticker} aria-hidden="true">
                {project.sticker}
              </span>
              <div className={styles.workProjectImage}>
                <Image
                  src={project.image}
                  alt={`Preview of ${project.title}`}
                  fill
                  sizes="(max-width: 760px) 92vw, 48vw"
                />
              </div>
              <div className={styles.workProjectMeta}>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.proof}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
