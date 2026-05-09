"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOutQuart = (value: number) => 1 - Math.pow(1 - value, 4);
const getPageTop = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;

const getAll = <T extends HTMLElement>(root: ParentNode | null | undefined, selector: string) =>
  Array.from(root?.querySelectorAll<T>(selector) ?? []);

export function ScrollChoreography() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionRoot = document.querySelector<HTMLElement>("[data-motion-root]");
    const revealNodes = getAll<HTMLElement>(document, "[data-reveal]");
    let updaters: Array<() => void> = [];
    let revealObserver: IntersectionObserver | null = null;
    let frame = 0;

    const setRevealed = (element: HTMLElement) => {
      element.dataset.visible = "true";
    };

    const setupReveals = () => {
      motionRoot?.setAttribute("data-motion-ready", "true");
      revealObserver?.disconnect();
      revealObserver = null;

      if (reduceMotion.matches || !("IntersectionObserver" in window)) {
        revealNodes.forEach(setRevealed);
        return;
      }

      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setRevealed(entry.target as HTMLElement);
            revealObserver?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -14% 0px", threshold: 0.16 },
      );

      revealNodes.forEach((element) => {
        if (element.dataset.visible === "true") return;
        revealObserver?.observe(element);
      });
    };

    const runUpdates = () => {
      frame = 0;
      updaters.forEach((update) => update());
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(runUpdates);
    };

    const updateMetrics = () => {
      const viewportHeight = window.innerHeight || 1;
      const newUpdaters: Array<() => void> = [];

      // Greeting Section
      const greetingSection = document.querySelector<HTMLElement>("[data-greeting-section]");
      if (greetingSection) {
        const copy = greetingSection.querySelector<HTMLElement>("[data-greeting-copy]");
        const target = copy || greetingSection;
        const greetingOffsetTop = getPageTop(target);
        const lines = getAll<HTMLElement>(greetingSection, "[data-ink-line]").map(line => ({
          el: line,
          offsetTop: getPageTop(line)
        }));
        const pills = getAll<HTMLElement>(greetingSection, "[data-capability-pill]");

        newUpdaters.push(() => {
          const scrollY = window.scrollY;
          const progress = clamp((viewportHeight * 0.84 - (greetingOffsetTop - scrollY)) / (viewportHeight * 0.36));
          greetingSection.style.setProperty("--scroll-progress", progress.toFixed(3));

          lines.forEach(({ el, offsetTop }) => {
            const ink = clamp((viewportHeight * 0.82 - (offsetTop - scrollY)) / (viewportHeight * 0.24));
            el.style.setProperty("--ink-percent", Math.round(48 + ink * 52) + "%");
          });

          pills.forEach((pill) => {
            const drift = Number(pill.dataset.pillDrift || 0);
            const tiltDirection = drift >= 0 ? -1 : 1;
            pill.style.setProperty("--pill-shift", Math.round(drift * (1 - progress)) + "px");
            pill.style.setProperty("--pill-tilt", (tiltDirection * 1.8 * (1 - progress)).toFixed(2) + "deg");
          });
        });
      }

      // Process Section
      const processSection = document.querySelector<HTMLElement>("[data-process-section]");
      const processGrid = processSection?.querySelector<HTMLElement>("[data-process-grid]");
      const processCards = getAll<HTMLElement>(processSection, "[data-process-card]");
      if (processSection && processGrid && processCards.length) {
        const gridOffsetTop = getPageTop(processGrid);
        const gridClientWidth = processGrid.clientWidth;
        const gridClientHeight = processGrid.clientHeight;
        const cardMetrics = processCards.map((card, index) => ({
          el: card,
          index,
          centerX: card.offsetLeft + card.offsetWidth / 2,
          centerY: card.offsetTop + card.offsetHeight / 2
        }));

        newUpdaters.push(() => {
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
          const scrollY = window.scrollY;
          const progress = easeOutQuart(clamp((viewportHeight * 0.86 - (gridOffsetTop - scrollY)) / (viewportHeight * 0.48)));
          const remaining = 1 - progress;
          const stackCenterX = gridClientWidth / 2;
          const stackCenterY = gridClientHeight / 2;
          const middleIndex = (processCards.length - 1) / 2;

          cardMetrics.forEach(({ el, index, centerX, centerY }) => {
            const stackX = (stackCenterX - centerX) * remaining;
            const stackY = (stackCenterY - centerY) * remaining;
            const rotate = (middleIndex - index) * 2.15 * remaining;
            const scale = 0.94 + progress * 0.06;
            el.style.setProperty("--process-stack-x", Math.round(stackX) + "px");
            el.style.setProperty("--process-stack-y", Math.round(stackY) + "px");
            el.style.setProperty("--process-stack-rotate", rotate.toFixed(2) + "deg");
            el.style.setProperty("--process-card-scale", scale.toFixed(3));
            el.style.setProperty("--process-z", String(processCards.length - index));
          });
          processSection.style.setProperty("--process-progress", progress.toFixed(3));
        });
      }

      // Services Section
      const servicesSection = document.querySelector<HTMLElement>("[data-services-section]");
      const serviceShell = servicesSection?.querySelector<HTMLElement>("[data-service-shell]");
      const serviceRail = servicesSection?.querySelector<HTMLElement>("[data-service-rail]");
      const servicePanels = getAll<HTMLElement>(servicesSection, "[data-service-panel]");
      if (servicesSection && serviceShell && serviceRail && servicePanels.length) {
        const sectionOffsetTop = getPageTop(servicesSection);
        const sectionOffsetHeight = servicesSection.offsetHeight;
        const railScrollHeight = serviceRail.scrollHeight;
        const shellClientHeight = serviceShell.clientHeight;

        newUpdaters.push(() => {
          if (reduceMotion.matches || window.innerWidth < 760) {
            servicesSection.style.setProperty("--service-progress", "1");
            serviceRail.style.setProperty("--service-shift", "0px");
            servicePanels.forEach((panel) => {
              panel.style.setProperty("--service-panel-opacity", "1");
              panel.style.setProperty("--service-panel-scale", "1");
            });
            return;
          }
          const scrollY = window.scrollY;
          const scrollRange = Math.max(1, sectionOffsetHeight - viewportHeight);
          const progress = clamp(-(sectionOffsetTop - scrollY) / scrollRange);
          const maxShift = Math.max(0, railScrollHeight - shellClientHeight);
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

      // Work Section
      const workSection = document.querySelector<HTMLElement>("[data-work-section]");
      const workStage = workSection?.querySelector<HTMLElement>("[data-work-stage]");
      const workCenter = workSection?.querySelector<HTMLElement>("[data-work-center]");
      const workCards = getAll<HTMLElement>(workSection, "[data-work-card]");
      if (workSection && workStage && workCenter && workCards.length) {
        const stageOffsetTop = getPageTop(workStage);
        const stageOffsetHeight = workStage.offsetHeight;
        const stageRect = workStage.getBoundingClientRect();
        const centerRect = workCenter.getBoundingClientRect();
        const centerX = centerRect.left - stageRect.left + centerRect.width / 2;
        const centerY = centerRect.top - stageRect.top + centerRect.height / 2;

        const cardMetrics = workCards.map((card, index) => ({
          el: card,
          index,
          centerX: card.getBoundingClientRect().left - stageRect.left + card.offsetWidth / 2,
          centerY: card.getBoundingClientRect().top - stageRect.top + card.offsetHeight / 2,
          targetRotate: Number(card.dataset.workRotate || 0)
        }));

        newUpdaters.push(() => {
          const scrollY = window.scrollY;
          const stageTop = stageOffsetTop - scrollY;
          const stageBottom = stageTop + stageOffsetHeight;
          const visibleHeight = Math.max(0, Math.min(stageBottom, viewportHeight) - Math.max(stageTop, 0));
          const spreadProgress = reduceMotion.matches ? 1 : easeOutQuart(clamp(visibleHeight / Math.min(stageOffsetHeight, viewportHeight * 0.72)));
          const remaining = 1 - spreadProgress;
          const middleIndex = (workCards.length - 1) / 2;

          cardMetrics.forEach(({ el, index, centerX: cardCenterX, centerY: cardCenterY, targetRotate }) => {
            const stackRotate = (index - middleIndex) * 2.4;
            const stackX = (centerX - cardCenterX) * remaining;
            const stackY = (centerY - cardCenterY) * remaining;
            const rotate = stackRotate * remaining + targetRotate * spreadProgress;
            const scale = 0.84 + spreadProgress * 0.16;
            const opacity = 0.5 + spreadProgress * 0.5;

            el.style.setProperty("--work-shift-x", Math.round(stackX) + "px");
            el.style.setProperty("--work-shift-y", Math.round(stackY) + "px");
            el.style.setProperty("--work-rotate", rotate.toFixed(2) + "deg");
            el.style.setProperty("--work-scale", scale.toFixed(3));
            el.style.setProperty("--work-opacity", opacity.toFixed(3));
            el.style.setProperty("--work-z", String(workCards.length - index));
          });
          workSection.style.setProperty("--work-spread", spreadProgress.toFixed(3));
        });
      }

      // Testimonial Section
      const testimonialSection = document.querySelector<HTMLElement>("[data-testimonial-section]");
      const testimonialCards = getAll<HTMLElement>(testimonialSection, "[data-testimonial-card]");
      if (testimonialSection && testimonialCards.length) {
        const sectionOffsetTop = getPageTop(testimonialSection);
        const sectionOffsetHeight = testimonialSection.offsetHeight;

        newUpdaters.push(() => {
          const scrollY = window.scrollY;
          const scrollRange = Math.max(1, sectionOffsetHeight - viewportHeight);
          const progress = reduceMotion.matches ? 0 : clamp(-(sectionOffsetTop - scrollY) / scrollRange);
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

      updaters = newUpdaters;
    };

    const handleMetricsChange = () => {
      setupReveals();
      updateMetrics();
      scheduleUpdate();
    };

    setupReveals();
    updateMetrics();
    runUpdates();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleMetricsChange);
    window.addEventListener("pageshow", handleMetricsChange);

    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", handleMetricsChange);
    } else {
      reduceMotion.addListener(handleMetricsChange);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      revealObserver?.disconnect();
      motionRoot?.removeAttribute("data-motion-ready");
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleMetricsChange);
      window.removeEventListener("pageshow", handleMetricsChange);
      if (typeof reduceMotion.removeEventListener === "function") {
        reduceMotion.removeEventListener("change", handleMetricsChange);
      } else {
        reduceMotion.removeListener(handleMetricsChange);
      }
    };
  }, []);

  return <span aria-hidden="true" data-choreography-probe hidden />;
}
