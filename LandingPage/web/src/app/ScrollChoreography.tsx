"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOutQuart = (value: number) => 1 - Math.pow(1 - value, 4);

const getAll = <T extends HTMLElement>(root: ParentNode | null | undefined, selector: string) =>
  Array.from(root?.querySelectorAll<T>(selector) ?? []);

export function ScrollChoreography() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updaters: Array<() => void> = [];
    let frame = 0;

    const runUpdates = () => {
      frame = 0;
      updaters.forEach((update) => update());
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(runUpdates);
    };

    const greetingSection = document.querySelector<HTMLElement>("[data-greeting-section]");
    if (greetingSection) {
      const copy = greetingSection.querySelector<HTMLElement>("[data-greeting-copy]");
      const lines = getAll<HTMLElement>(greetingSection, "[data-ink-line]");
      const pills = getAll<HTMLElement>(greetingSection, "[data-capability-pill]");

      updaters.push(() => {
        const viewportHeight = window.innerHeight || 1;
        const copyRect = (copy || greetingSection).getBoundingClientRect();
        const progress = clamp((viewportHeight * 0.84 - copyRect.top) / (viewportHeight * 0.36));

        greetingSection.style.setProperty("--scroll-progress", progress.toFixed(3));

        const lineStates = lines.map((line) => {
          const lineRect = line.getBoundingClientRect();
          return {
            line,
            ink: clamp((viewportHeight * 0.82 - lineRect.top) / (viewportHeight * 0.24)),
          };
        });

        lineStates.forEach(({ line, ink }) => {
          line.style.setProperty("--ink-percent", Math.round(ink * 100) + "%");
        });

        pills.forEach((pill) => {
          const side = pill.dataset.pillSide;
          const direction = side === "left" ? 1 : -1;
          const tiltDirection = side === "left" ? -1 : 1;

          pill.style.setProperty("--pill-shift", Math.round(direction * 66 * progress) + "px");
          pill.style.setProperty("--pill-tilt", (tiltDirection * 2 * (1 - progress)).toFixed(2) + "deg");
        });
      });
    }

    const processSection = document.querySelector<HTMLElement>("[data-process-section]");
    const processGrid = processSection?.querySelector<HTMLElement>("[data-process-grid]");
    const processCards = getAll<HTMLElement>(processSection, "[data-process-card]");
    if (processSection && processGrid && processCards.length) {
      updaters.push(() => {
        if (reduceMotion.matches) {
          processSection.style.setProperty("--process-progress", "1");
          processCards.forEach((card) => {
            card.style.setProperty("--process-stack-x", "0px");
            card.style.setProperty("--process-stack-y", "0px");
            card.style.setProperty("--process-stack-rotate", "0deg");
            card.style.setProperty("--process-card-scale", "1");
          });
          return;
        }

        const gridRect = processGrid.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const rawProgress = clamp((viewportHeight * 0.86 - gridRect.top) / (viewportHeight * 0.48));
        const progress = easeOutQuart(rawProgress);
        const remaining = 1 - progress;
        const stackCenterX = processGrid.clientWidth / 2;
        const stackCenterY = processGrid.clientHeight / 2;
        const middleIndex = (processCards.length - 1) / 2;
        const cardStates = processCards.map((card, index) => {
          const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
          const cardCenterY = card.offsetTop + card.offsetHeight / 2;

          return {
            card,
            index,
            stackX: (stackCenterX - cardCenterX) * remaining,
            stackY: (stackCenterY - cardCenterY) * remaining,
            rotate: (middleIndex - index) * 2.15 * remaining,
            scale: 0.94 + progress * 0.06,
          };
        });

        processSection.style.setProperty("--process-progress", progress.toFixed(3));
        cardStates.forEach(({ card, index, stackX, stackY, rotate, scale }) => {
          card.style.setProperty("--process-stack-x", Math.round(stackX) + "px");
          card.style.setProperty("--process-stack-y", Math.round(stackY) + "px");
          card.style.setProperty("--process-stack-rotate", rotate.toFixed(2) + "deg");
          card.style.setProperty("--process-card-scale", scale.toFixed(3));
          card.style.setProperty("--process-z", String(processCards.length - index));
        });
      });
    }

    const servicesSection = document.querySelector<HTMLElement>("[data-services-section]");
    const serviceShell = servicesSection?.querySelector<HTMLElement>("[data-service-shell]");
    const serviceRail = servicesSection?.querySelector<HTMLElement>("[data-service-rail]");
    const servicePanels = getAll<HTMLElement>(servicesSection, "[data-service-panel]");
    if (servicesSection && serviceShell && serviceRail && servicePanels.length) {
      updaters.push(() => {
        if (reduceMotion.matches || window.innerWidth < 760) {
          servicesSection.style.setProperty("--service-progress", "1");
          serviceRail.style.setProperty("--service-shift", "0px");
          servicePanels.forEach((panel) => {
            panel.style.setProperty("--service-panel-opacity", "1");
            panel.style.setProperty("--service-panel-scale", "1");
          });
          return;
        }

        const sectionRect = servicesSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const scrollRange = Math.max(1, servicesSection.offsetHeight - viewportHeight);
        const progress = clamp(-sectionRect.top / scrollRange);
        const maxShift = Math.max(0, serviceRail.scrollHeight - serviceShell.clientHeight);
        const activeIndex = progress * (servicePanels.length - 1);

        servicesSection.style.setProperty("--service-progress", progress.toFixed(3));
        serviceRail.style.setProperty("--service-shift", Math.round(-maxShift * progress) + "px");
        servicePanels.forEach((panel, index) => {
          const distance = Math.abs(index - activeIndex);
          const opacity = clamp(1 - distance * 0.5, 0.28, 1);
          const scale = 1 - clamp(distance * 0.035, 0, 0.07);

          panel.style.setProperty("--service-panel-opacity", opacity.toFixed(3));
          panel.style.setProperty("--service-panel-scale", scale.toFixed(3));
        });
      });
    }

    const workSection = document.querySelector<HTMLElement>("[data-work-section]");
    const workStage = workSection?.querySelector<HTMLElement>("[data-work-stage]");
    const workCenter = workSection?.querySelector<HTMLElement>("[data-work-center]");
    const workCards = getAll<HTMLElement>(workSection, "[data-work-card]");
    if (workSection && workStage && workCenter && workCards.length) {
      updaters.push(() => {
        const stageRect = workStage.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const visibleHeight = Math.max(
          0,
          Math.min(stageRect.bottom, viewportHeight) - Math.max(stageRect.top, 0),
        );
        const spreadProgress = reduceMotion.matches
          ? 1
          : easeOutQuart(clamp(visibleHeight / Math.min(stageRect.height, viewportHeight * 0.72)));
        const remaining = 1 - spreadProgress;
        const centerRect = workCenter.getBoundingClientRect();
        const centerX = centerRect.left + centerRect.width / 2 - stageRect.left;
        const centerY = centerRect.top + centerRect.height / 2 - stageRect.top;
        const middleIndex = (workCards.length - 1) / 2;
        const cardStates = workCards.map((card, index) => {
          const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
          const cardCenterY = card.offsetTop + card.offsetHeight / 2;
          const targetRotate = Number(card.dataset.workRotate || 0);
          const stackRotate = (index - middleIndex) * 2.4;

          return {
            card,
            index,
            stackX: (centerX - cardCenterX) * remaining,
            stackY: (centerY - cardCenterY) * remaining,
            rotate: stackRotate * remaining + targetRotate * spreadProgress,
            scale: 0.84 + spreadProgress * 0.16,
            opacity: 0.5 + spreadProgress * 0.5,
          };
        });

        workSection.style.setProperty("--work-spread", spreadProgress.toFixed(3));
        cardStates.forEach(({ card, index, stackX, stackY, rotate, scale, opacity }) => {
          card.style.setProperty("--work-shift-x", Math.round(stackX) + "px");
          card.style.setProperty("--work-shift-y", Math.round(stackY) + "px");
          card.style.setProperty("--work-rotate", rotate.toFixed(2) + "deg");
          card.style.setProperty("--work-scale", scale.toFixed(3));
          card.style.setProperty("--work-opacity", opacity.toFixed(3));
          card.style.setProperty("--work-z", String(workCards.length - index));
        });
      });
    }

    const testimonialSection = document.querySelector<HTMLElement>("[data-testimonial-section]");
    const testimonialCards = getAll<HTMLElement>(testimonialSection, "[data-testimonial-card]");
    if (testimonialSection && testimonialCards.length) {
      updaters.push(() => {
        const viewportHeight = window.innerHeight || 1;
        const sectionRect = testimonialSection.getBoundingClientRect();
        const scrollRange = Math.max(1, testimonialSection.offsetHeight - viewportHeight);
        const progress = reduceMotion.matches ? 0 : clamp(-sectionRect.top / scrollRange);
        const active = progress * Math.max(1, testimonialCards.length - 1);

        testimonialSection.style.setProperty("--testimonial-progress", progress.toFixed(3));
        testimonialCards.forEach((card, index) => {
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
      });
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);
    reduceMotion.addEventListener("change", scheduleUpdate);
    runUpdates();

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      reduceMotion.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return null;
}
