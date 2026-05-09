"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOutQuart = (value: number) => 1 - Math.pow(1 - value, 4);
const getPageTop = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
const launchTargets = ["#about", "#process", "#services", "#work", "#contact"] as const;

const getAll = <T extends HTMLElement>(root: ParentNode | null | undefined, selector: string) =>
  Array.from(root?.querySelectorAll<T>(selector) ?? []);

interface CachedRefs {
  topNav: HTMLElement | null;
  launchMap: HTMLElement | null;
  launchFill: HTMLElement | null;
  launchStops: HTMLAnchorElement[];
  greetingSection: HTMLElement | null;
  greetingInkLines: HTMLElement[];
  greetingPills: HTMLElement[];
  processSection: HTMLElement | null;
  processGrid: HTMLElement | null;
  processCards: HTMLElement[];
  servicesSection: HTMLElement | null;
  serviceShell: HTMLElement | null;
  serviceRail: HTMLElement | null;
  servicePanels: HTMLElement[];
  serviceNavDots: HTMLButtonElement[];
  workSection: HTMLElement | null;
  workStage: HTMLElement | null;
  workCenter: HTMLElement | null;
  workCards: HTMLElement[];
  testimonialSection: HTMLElement | null;
  testimonialCards: HTMLElement[];
  testimonialNavDots: HTMLButtonElement[];
  backToTop: HTMLButtonElement | null;
}

export function ScrollChoreography() {
  const { scrollY } = useScroll();
  const [metrics, setMetrics] = useState(0);
  const metricsVersion = useRef(0);
  const cachedRefs = useRef<CachedRefs>({
    topNav: null,
    launchMap: null, launchFill: null, launchStops: [],
    greetingSection: null, greetingInkLines: [], greetingPills: [],
    processSection: null, processGrid: null, processCards: [],
    servicesSection: null, serviceShell: null, serviceRail: null, servicePanels: [], serviceNavDots: [],
    workSection: null, workStage: null, workCenter: null, workCards: [],
    testimonialSection: null, testimonialCards: [], testimonialNavDots: [],
    backToTop: null,
  });

  // Recalculate element positions on resize / load / fonts ready
  const recalc = useCallback(() => {
    metricsVersion.current += 1;
    setMetrics(metricsVersion.current);
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    window.addEventListener("load", recalc);
    window.addEventListener("pageshow", recalc);
    window.visualViewport?.addEventListener("resize", recalc);
    document.fonts?.ready.then(recalc).catch(() => undefined);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => recalc();
    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", handler);
    } else {
      reduceMotion.addListener(handler);
    }

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("load", recalc);
      window.removeEventListener("pageshow", recalc);
      window.visualViewport?.removeEventListener("resize", recalc);
      if (typeof reduceMotion.removeEventListener === "function") {
        reduceMotion.removeEventListener("change", handler);
      } else {
        reduceMotion.removeListener(handler);
      }
    };
  }, [recalc]);

  // Cache DOM refs when metrics change
  useEffect(() => {
    const r = cachedRefs.current;
    r.topNav = document.querySelector<HTMLElement>("[data-top-nav]");
    r.launchMap = document.querySelector<HTMLElement>("[data-launch-map]");
    r.launchFill = r.launchMap?.querySelector<HTMLElement>("[data-launch-fill]") ?? null;
    r.launchStops = getAll<HTMLAnchorElement>(r.launchMap, "[data-launch-stop]");

    r.greetingSection = document.querySelector<HTMLElement>("[data-greeting-section]");
    r.greetingInkLines = r.greetingSection ? getAll<HTMLElement>(r.greetingSection, "[data-ink-line]") : [];
    r.greetingPills = r.greetingSection ? getAll<HTMLElement>(r.greetingSection, "[data-capability-pill]") : [];

    r.processSection = document.querySelector<HTMLElement>("[data-process-section]");
    r.processGrid = r.processSection?.querySelector<HTMLElement>("[data-process-grid]") ?? null;
    r.processCards = getAll<HTMLElement>(r.processSection, "[data-process-card]");

    r.servicesSection = document.querySelector<HTMLElement>("[data-services-section]");
    r.serviceShell = r.servicesSection?.querySelector<HTMLElement>("[data-service-shell]") ?? null;
    r.serviceRail = r.servicesSection?.querySelector<HTMLElement>("[data-service-rail]") ?? null;
    r.servicePanels = getAll<HTMLElement>(r.servicesSection, "[data-service-panel]");
    r.serviceNavDots = getAll<HTMLButtonElement>(r.servicesSection, "[data-service-nav-dot]");

    r.workSection = document.querySelector<HTMLElement>("[data-work-section]");
    r.workStage = r.workSection?.querySelector<HTMLElement>("[data-work-stage]") ?? null;
    r.workCenter = r.workSection?.querySelector<HTMLElement>("[data-work-center]") ?? null;
    r.workCards = getAll<HTMLElement>(r.workSection, "[data-work-card]");

    r.testimonialSection = document.querySelector<HTMLElement>("[data-testimonial-section]");
    r.testimonialCards = getAll<HTMLElement>(r.testimonialSection, "[data-testimonial-card]");
    r.testimonialNavDots = getAll<HTMLButtonElement>(r.testimonialSection, "[data-testimonial-nav-dot]");

    r.backToTop = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  }, [metrics]);

  // IntersectionObserver-based reveals (runs once per metrics recalc)
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionRoot = document.querySelector<HTMLElement>("[data-motion-root]");
    const revealNodes = getAll<HTMLElement>(document, "[data-reveal]");

    motionRoot?.setAttribute("data-motion-ready", "true");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealNodes.forEach((el) => { el.dataset.visible = "true"; });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.16 },
    );

    revealNodes.forEach((el) => {
      if (el.dataset.visible === "true") return;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [metrics]);

  // Nav dot click handlers (stable, only rebind on metrics change)
  useEffect(() => {
    const viewportHeight = window.innerHeight || 1;
    const r = cachedRefs.current;

    const handlers: Array<{ el: HTMLButtonElement; handler: () => void }> = [];

    if (r.servicesSection && r.servicePanels.length) {
      const sectionOffsetTop = getPageTop(r.servicesSection);
      const sectionOffsetHeight = r.servicesSection.offsetHeight;
      r.serviceNavDots.forEach((dot) => {
        const handler = () => {
          const targetIndex = Number(dot.dataset.serviceIndex ?? 0);
          const scrollRange = Math.max(1, sectionOffsetHeight - viewportHeight);
          const targetProgress = targetIndex / Math.max(1, r.servicePanels.length - 1);
          window.scrollTo({ top: sectionOffsetTop + targetProgress * scrollRange, behavior: "smooth" });
        };
        dot.addEventListener("click", handler);
        handlers.push({ el: dot, handler });
      });
    }

    if (r.testimonialSection && r.testimonialCards.length) {
      const sectionOffsetTop = getPageTop(r.testimonialSection);
      const sectionOffsetHeight = r.testimonialSection.offsetHeight;
      r.testimonialNavDots.forEach((dot) => {
        const handler = () => {
          const targetIndex = Number(dot.dataset.testimonialIndex ?? 0);
          const scrollRange = Math.max(1, sectionOffsetHeight - viewportHeight);
          const targetProgress = targetIndex / Math.max(1, r.testimonialCards.length - 1);
          window.scrollTo({ top: sectionOffsetTop + targetProgress * scrollRange, behavior: "smooth" });
        };
        dot.addEventListener("click", handler);
        handlers.push({ el: dot, handler });
      });
    }

    return () => {
      handlers.forEach(({ el, handler }) => el.removeEventListener("click", handler));
    };
  }, [metrics]);

  // Back-to-top click handler
  useEffect(() => {
    const btn = cachedRefs.current.backToTop;
    if (!btn) return;
    const handler = () => window.scrollTo({ top: 0, behavior: "smooth" });
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, [metrics]);

  // Main scroll-driven updater — reads from cached refs
  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewportHeight = window.innerHeight || 1;
    const r = cachedRefs.current;

    // Top Nav scroll state (hysteresis prevents flicker at threshold)
    if (r.topNav) {
      const currentState = r.topNav.dataset.navState;
      const enterAt = viewportHeight * 0.12;
      const leaveAt = viewportHeight * 0.04;
      if (currentState !== "scrolled" && latestScrollY > enterAt) {
        r.topNav.dataset.navState = "scrolled";
      } else if (currentState === "scrolled" && latestScrollY < leaveAt) {
        r.topNav.dataset.navState = "top";
      }
    }

    // Launch Map
    if (r.launchMap && r.launchFill && r.launchStops.length) {
      const launchSections = launchTargets
        .map((sel) => document.querySelector<HTMLElement>(sel))
        .filter((s): s is HTMLElement => Boolean(s))
        .map((s) => ({ top: getPageTop(s), bottom: getPageTop(s) + s.offsetHeight }));

      if (launchSections.length) {
        const pageStart = launchSections[0].top;
        const pageEnd = launchSections[launchSections.length - 1].bottom;
        const focusLine = latestScrollY + viewportHeight * 0.42;
        const progress = reduceMotion.matches ? 1 : clamp((focusLine - pageStart) / Math.max(1, pageEnd - pageStart));

        let activeIndex = 0;
        launchSections.forEach((section, index) => {
          if (focusLine >= section.top - viewportHeight * 0.14) activeIndex = index;
        });

        r.launchMap.style.setProperty("--launch-progress", progress.toFixed(3));
        r.launchFill.style.setProperty("--launch-fill", progress.toFixed(3));
        r.launchStops.forEach((stop, index) => {
          const distance = Math.abs(index - activeIndex);
          stop.dataset.launchState = index === activeIndex ? "active" : index < activeIndex ? "passed" : "upcoming";
          stop.style.setProperty("--launch-stop-distance", Math.min(distance, 3).toFixed(2));
        });
        r.launchMap.dataset.launchVisibility =
          activeIndex === 0 && latestScrollY < pageStart + viewportHeight * 0.72 ? "hidden" : "visible";
      }
    }

    // Greeting Section
    if (r.greetingSection) {
      const copy = r.greetingSection.querySelector<HTMLElement>("[data-greeting-copy]");
      const target = copy || r.greetingSection;
      const greetingOffsetTop = getPageTop(target);
      const progress = clamp((viewportHeight * 0.84 - (greetingOffsetTop - latestScrollY)) / (viewportHeight * 0.36));
      r.greetingSection.style.setProperty("--scroll-progress", progress.toFixed(3));

      r.greetingInkLines.forEach((line) => {
        const offsetTop = getPageTop(line);
        const ink = clamp((viewportHeight * 0.82 - (offsetTop - latestScrollY)) / (viewportHeight * 0.24));
        line.style.setProperty("--ink-percent", Math.round(48 + ink * 52) + "%");
      });

      r.greetingPills.forEach((pill) => {
        const drift = Number(pill.dataset.pillDrift || 0);
        const tiltDirection = drift >= 0 ? -1 : 1;
        pill.style.setProperty("--pill-shift", Math.round(drift * (1 - progress)) + "px");
        pill.style.setProperty("--pill-tilt", (tiltDirection * 1.8 * (1 - progress)).toFixed(2) + "deg");
      });
    }

    // Process Section
    if (r.processSection && r.processGrid && r.processCards.length) {
      if (reduceMotion.matches) {
        r.processSection.style.setProperty("--process-progress", "1");
        r.processCards.forEach((card, index) => {
          card.style.setProperty("--process-stack-x", "0px");
          card.style.setProperty("--process-stack-y", "0px");
          card.style.setProperty("--process-stack-rotate", "0deg");
          card.style.setProperty("--process-card-scale", "1");
          card.style.setProperty("--process-z", String(index + 1));
        });
      } else {
        const gridOffsetTop = getPageTop(r.processGrid);
        const gridClientWidth = r.processGrid.clientWidth;
        const gridClientHeight = r.processGrid.clientHeight;
        const progress = easeOutQuart(clamp((viewportHeight * 0.86 - (gridOffsetTop - latestScrollY)) / (viewportHeight * 0.48)));
        const remaining = 1 - progress;
        const stackCenterX = gridClientWidth / 2;
        const stackCenterY = gridClientHeight / 2;
        const middleIndex = (r.processCards.length - 1) / 2;

        r.processCards.forEach((card, index) => {
          const centerX = card.offsetLeft + card.offsetWidth / 2;
          const centerY = card.offsetTop + card.offsetHeight / 2;
          const stackX = (stackCenterX - centerX) * remaining;
          const stackY = (stackCenterY - centerY) * remaining;
          const rotate = (middleIndex - index) * 2.15 * remaining;
          const scale = 0.94 + progress * 0.06;
          card.style.setProperty("--process-stack-x", Math.round(stackX) + "px");
          card.style.setProperty("--process-stack-y", Math.round(stackY) + "px");
          card.style.setProperty("--process-stack-rotate", rotate.toFixed(2) + "deg");
          card.style.setProperty("--process-card-scale", scale.toFixed(3));
          card.style.setProperty("--process-z", String(index + 1));
        });
        r.processSection.style.setProperty("--process-progress", progress.toFixed(3));
      }
    }

    // Services Section
    if (r.servicesSection && r.serviceShell && r.serviceRail && r.servicePanels.length) {
      if (reduceMotion.matches || window.innerWidth < 760) {
        r.servicesSection.style.setProperty("--service-progress", "1");
        r.serviceRail.style.setProperty("--service-shift", "0px");
        r.servicePanels.forEach((panel) => {
          panel.style.setProperty("--service-panel-opacity", "1");
          panel.style.setProperty("--service-panel-scale", "1");
        });
        r.serviceNavDots.forEach((dot) => { dot.dataset.dotState = "active"; });
      } else {
        const sectionOffsetTop = getPageTop(r.servicesSection);
        const sectionOffsetHeight = r.servicesSection.offsetHeight;
        const railScrollHeight = r.serviceRail.scrollHeight;
        const shellClientHeight = r.serviceShell.clientHeight;
        const scrollRange = Math.max(1, sectionOffsetHeight - viewportHeight);
        const progress = clamp(-(sectionOffsetTop - latestScrollY) / scrollRange);
        const maxShift = Math.max(0, railScrollHeight - shellClientHeight);
        const activeIndex = progress * (r.servicePanels.length - 1);

        r.servicesSection.style.setProperty("--service-progress", progress.toFixed(3));
        r.serviceRail.style.setProperty("--service-shift", Math.round(-maxShift * progress) + "px");
        r.servicePanels.forEach((panel, index) => {
          const distance = Math.abs(index - activeIndex);
          panel.style.setProperty("--service-panel-opacity", clamp(1 - distance * 0.5, 0.28, 1).toFixed(3));
          panel.style.setProperty("--service-panel-scale", (1 - clamp(distance * 0.035, 0, 0.07)).toFixed(3));
        });
        r.serviceNavDots.forEach((dot, index) => {
          const roundedActive = Math.round(activeIndex);
          dot.dataset.dotState = index === roundedActive ? "active" : index < roundedActive ? "passed" : "upcoming";
        });
      }
    }

    // Work Section
    if (r.workSection && r.workStage && r.workCenter && r.workCards.length) {
      const stageOffsetTop = getPageTop(r.workStage);
      const stageOffsetHeight = r.workStage.offsetHeight;
      const stageTop = stageOffsetTop - latestScrollY;
      const stageBottom = stageTop + stageOffsetHeight;
      const visibleHeight = Math.max(0, Math.min(stageBottom, viewportHeight) - Math.max(stageTop, 0));
      const spreadProgress = reduceMotion.matches ? 1 : easeOutQuart(clamp(visibleHeight / Math.min(stageOffsetHeight, viewportHeight * 0.72)));
      const remaining = 1 - spreadProgress;
      const middleIndex = (r.workCards.length - 1) / 2;

      const stageRect = r.workStage.getBoundingClientRect();
      const centerRect = r.workCenter.getBoundingClientRect();
      const centerX = centerRect.left - stageRect.left + centerRect.width / 2;
      const centerY = centerRect.top - stageRect.top + centerRect.height / 2;

      r.workCards.forEach((card, index) => {
        const cardCenterX = card.getBoundingClientRect().left - stageRect.left + card.offsetWidth / 2;
        const cardCenterY = card.getBoundingClientRect().top - stageRect.top + card.offsetHeight / 2;
        const targetRotate = Number(card.dataset.workRotate || 0);
        const stackRotate = (index - middleIndex) * 2.4;
        const stackX = (centerX - cardCenterX) * remaining;
        const stackY = (centerY - cardCenterY) * remaining;
        const rotate = stackRotate * remaining + targetRotate * spreadProgress;
        const scale = 0.84 + spreadProgress * 0.16;
        const opacity = 0.5 + spreadProgress * 0.5;

        card.style.setProperty("--work-shift-x", Math.round(stackX) + "px");
        card.style.setProperty("--work-shift-y", Math.round(stackY) + "px");
        card.style.setProperty("--work-rotate", rotate.toFixed(2) + "deg");
        card.style.setProperty("--work-scale", scale.toFixed(3));
        card.style.setProperty("--work-opacity", opacity.toFixed(3));
        card.style.setProperty("--work-z", String(r.workCards.length - index));
      });
      r.workSection.style.setProperty("--work-spread", spreadProgress.toFixed(3));
    }

    // Testimonial Section
    if (r.testimonialSection && r.testimonialCards.length) {
      if (reduceMotion.matches) {
        r.testimonialSection.style.setProperty("--testimonial-progress", "0");
        r.testimonialCards.forEach((card) => {
          card.style.setProperty("--testimonial-x", "0px");
          card.style.setProperty("--testimonial-y", "0px");
          card.style.setProperty("--testimonial-rotate", "0deg");
          card.style.setProperty("--testimonial-scale", "1");
          card.style.setProperty("--testimonial-opacity", "1");
          card.style.setProperty("--testimonial-content-opacity", "1");
          card.style.setProperty("--testimonial-z", "100");
        });
        r.testimonialNavDots.forEach((dot) => { dot.dataset.dotState = "active"; });
      } else {
        const sectionOffsetTop = getPageTop(r.testimonialSection);
        const sectionOffsetHeight = r.testimonialSection.offsetHeight;
        const scrollRange = Math.max(1, sectionOffsetHeight - viewportHeight);
        const progress = clamp(-(sectionOffsetTop - latestScrollY) / scrollRange);
        const active = progress * Math.max(1, r.testimonialCards.length - 1);

        r.testimonialSection.style.setProperty("--testimonial-progress", progress.toFixed(3));
        r.testimonialCards.forEach((card, index) => {
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
        r.testimonialNavDots.forEach((dot, index) => {
          const roundedActive = Math.round(active);
          dot.dataset.dotState = index === roundedActive ? "active" : index < roundedActive ? "passed" : "upcoming";
        });
      }
    }

    // Back to top
    if (r.backToTop) {
      r.backToTop.dataset.visible = latestScrollY > viewportHeight * 1.2 ? "true" : "false";
    }
  });

  return <span aria-hidden="true" data-choreography-probe hidden />;
}
