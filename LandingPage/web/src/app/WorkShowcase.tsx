import Image from "next/image";
import styles from "./page.module.css";

const workProjects = [
  {
    title: "Corner Bistro",
    category: "Restaurant booking site",
    image: "/work-bistro.svg",
    placement: "workTopLeft",
    tone: "workSage",
    rotate: "-2.4",
  },
  {
    title: "Northside Clinic",
    category: "Care service website",
    image: "/work-clinic.svg",
    placement: "workTopRight",
    tone: "workSky",
    rotate: "2.1",
  },
  {
    title: "Pulse Coach",
    category: "Fitness landing page",
    image: "/work-fitness.svg",
    placement: "workBottomLeft",
    tone: "workInk",
    rotate: "1.8",
  },
  {
    title: "Bloom Studio",
    category: "Salon launch page",
    image: "/work-salon.svg",
    placement: "workBottomRight",
    tone: "workPeach",
    rotate: "-1.7",
  },
] as const;

export function WorkShowcase() {
  return (
    <>
      <section id="work" className={styles.workSection} data-work-section>
        <div className={styles.workStage} data-work-stage>
          <div className={styles.workHeader} data-work-center>
            <p className={styles.workKicker}>Selected work</p>
            <h2>Designs that you&apos;ll love</h2>
            <p>Websites are our thing. We make them feel local, useful, and sharp.</p>
            <a href="#contact">See more work</a>
          </div>

          <div className={styles.workProjectField} aria-label="Selected website projects">
            {workProjects.map((project) => (
              <article
                className={`${styles.workProject} ${styles[project.placement]} ${styles[project.tone]}`}
                aria-label={`${project.title}, ${project.category}`}
                data-work-card
                data-work-rotate={project.rotate}
                key={project.title}
              >
                <div className={styles.workProjectImage}>
                  <Image
                    src={project.image}
                    alt={`Preview of ${project.title}`}
                    fill
                    sizes="(max-width: 760px) 72vw, 38vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
