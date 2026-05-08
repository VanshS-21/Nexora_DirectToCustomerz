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

const workShowcaseScript = `
(() => {
  const init = () => {
    const section = document.querySelector("[data-work-section]");
    const stage = section?.querySelector("[data-work-stage]");
    const center = section?.querySelector("[data-work-center]");
    const cards = Array.from(section?.querySelectorAll("[data-work-card]") || []);

    if (!section || !stage || !center || !cards.length) {
      return;
    }

    if (section.__nexoraWorkCleanup) {
      section.__nexoraWorkCleanup();
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

    const update = () => {
      frame = 0;
      const stageRect = stage.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const visibleHeight = Math.max(0, Math.min(stageRect.bottom, viewportHeight) - Math.max(stageRect.top, 0));
      const spreadProgress = reduceMotion.matches
        ? 1
        : easeOutQuart(clamp(visibleHeight / Math.min(stageRect.height, viewportHeight * 0.72)));
      const remaining = 1 - spreadProgress;
      const centerRect = center.getBoundingClientRect();
      const centerX = centerRect.left + centerRect.width / 2 - stageRect.left;
      const centerY = centerRect.top + centerRect.height / 2 - stageRect.top;
      const middleIndex = (cards.length - 1) / 2;

      section.style.setProperty("--work-spread", spreadProgress.toFixed(3));

      cards.forEach((card, index) => {
        const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
        const cardCenterY = card.offsetTop + card.offsetHeight / 2;
        const stackX = (centerX - cardCenterX) * remaining;
        const stackY = (centerY - cardCenterY) * remaining;
        const targetRotate = Number(card.dataset.workRotate || 0);
        const stackRotate = (index - middleIndex) * 2.4;
        const rotate = stackRotate * remaining + targetRotate * spreadProgress;
        const scale = 0.84 + spreadProgress * 0.16;
        const opacity = 0.5 + spreadProgress * 0.5;

        card.style.setProperty("--work-shift-x", Math.round(stackX) + "px");
        card.style.setProperty("--work-shift-y", Math.round(stackY) + "px");
        card.style.setProperty("--work-rotate", rotate.toFixed(2) + "deg");
        card.style.setProperty("--work-scale", scale.toFixed(3));
        card.style.setProperty("--work-opacity", opacity.toFixed(3));
        card.style.setProperty("--work-z", String(cards.length - index));
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
    section.__nexoraWorkCleanup = () => {
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
      <script
        id="nexora-work-showcase"
        dangerouslySetInnerHTML={{ __html: workShowcaseScript }}
      />
    </>
  );
}
