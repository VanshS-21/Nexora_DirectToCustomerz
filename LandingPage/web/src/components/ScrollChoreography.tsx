"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOutQuart = (value: number) => 1 - Math.pow(1 - value, 4);
const getPageTop = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
const launchTargets = ["#about", "#process", "#services", "#work", "#contact"] as const;
const sectionTargets = ["#about", "#process", "#services", "#work", "#pricing", "#faqs", "#contact"] as const;

const getAll = <T extends HTMLElement>(root: ParentNode | null | undefined, selector: string) =>
  Array.from(root?.querySelectorAll<T>(selector) ?? []);

interface CachedRefs {
  topNav: HTMLElement | null;
  navLinks: HTMLElement[];
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

interface CachedMetrics {
  greetingCopyTop: number;
  inkLineTops: number[];
  processGridTop: number;
  processGridWidth: number;
  processGridHeight: number;
  processCardCenters: Array<{ x: number; y: number }>;
  servicesTop: number;
  servicesHeight: number;
  serviceRailScrollHeight: number;
  serviceShellClientHeight: number;
  workStageTop: number;
  workStageHeight: number;
  workCenterCenter: { x: number; y: number };
  workCardCenters: Array<{ x: number; y: number }>;
  testimonialTop: number;
  testimonialHeight: number;
  launchSectionTops: Array<{ top: number; bottom: number }>;
  sectionTops: Array<{ id: string; top: number; bottom: number }>;
}

export function ScrollChoreography() {
  const [metrics, setMetrics] = useState(0);
  const metricsVersion = useRef(0);
  const cachedRefs = useRef<CachedRefs>({
    topNav: null,
    navLinks: [],
    launchMap: null, launchFill: null, launchStops: [],
    greetingSection: null, greetingInkLines: [], greetingPills: [],
    processSection: null, processGrid: null, processCards: [],
    servicesSection: null, serviceShell: null, serviceRail: null, servicePanels: [], serviceNavDots: [],
    workSection: null, workStage: null, workCenter: null, workCards: [],
    testimonialSection: null, testimonialCards: [], testimonialNavDots: [],
    backToTop: null,
  });
  const cachedMetrics = useRef<CachedMetrics>({
    greetingCopyTop: 0, inkLineTops: [],
    processGridTop: 0, processGridWidth: 0, processGridHeight: 0, processCardCenters: [],
    servicesTop: 0, servicesHeight: 0, serviceRailScrollHeight: 0, serviceShellClientHeight: 0,
    workStageTop: 0, workStageHeight: 0, workCenterCenter: { x: 0, y: 0 }, workCardCenters: [],
    testimonialTop: 0, testimonialHeight: 0,
    launchSectionTops: [],
    sectionTops: [],
  });
  const reduceMotionRef = useRef(false);
  const rafId = useRef(0);
  const pendingScrollY = useRef(0);

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
    reduceMotionRef.current = reduceMotion.matches;
    const motionHandler = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches;
      recalc();
    };
    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", motionHandler);
    } else {
      reduceMotion.addListener(motionHandler);
    }

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("load", recalc);
      window.removeEventListener("pageshow", recalc);
      window.visualViewport?.removeEventListener("resize", recalc);
      if (typeof reduceMotion.removeEventListener === "function") {
        reduceMotion.removeEventListener("change", motionHandler);
      } else {
        reduceMotion.removeListener(motionHandler);
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
    r.navLinks = getAll<HTMLElement>(document, "[data-nav-section]");

    // Cache layout metrics (avoids reflow in scroll handler)
    const m = cachedMetrics.current;
    const copyEl = r.greetingSection?.querySelector<HTMLElement>("[data-greeting-copy]");
    const greetingTarget = copyEl || r.greetingSection;
    m.greetingCopyTop = greetingTarget ? getPageTop(greetingTarget) : 0;
    m.inkLineTops = r.greetingInkLines.map(getPageTop);

    if (r.processGrid) {
      m.processGridTop = getPageTop(r.processGrid);
      m.processGridWidth = r.processGrid.clientWidth;
      m.processGridHeight = r.processGrid.clientHeight;
      m.processCardCenters = r.processCards.map((card) => ({
        x: card.offsetLeft + card.offsetWidth / 2,
        y: card.offsetTop + card.offsetHeight / 2,
      }));
    }

    if (r.servicesSection) {
      m.servicesTop = getPageTop(r.servicesSection);
      m.servicesHeight = r.servicesSection.offsetHeight;
      m.serviceRailScrollHeight = r.serviceRail?.scrollHeight ?? 0;
      m.serviceShellClientHeight = r.serviceShell?.clientHeight ?? 0;
    }

    if (r.workStage && r.workCenter) {
      m.workStageTop = getPageTop(r.workStage);
      m.workStageHeight = r.workStage.offsetHeight;
      const stageRect = r.workStage.getBoundingClientRect();
      const centerRect = r.workCenter.getBoundingClientRect();
      m.workCenterCenter = {
        x: centerRect.left - stageRect.left + centerRect.width / 2,
        y: centerRect.top - stageRect.top + centerRect.height / 2,
      };
      m.workCardCenters = r.workCards.map((card) => {
        const cr = card.getBoundingClientRect();
        return {
          x: cr.left - stageRect.left + card.offsetWidth / 2,
          y: cr.top - stageRect.top + card.offsetHeight / 2,
        };
      });
    }

    if (r.testimonialSection) {
      m.testimonialTop = getPageTop(r.testimonialSection);
      m.testimonialHeight = r.testimonialSection.offsetHeight;
    }

    m.launchSectionTops = launchTargets
      .map((sel) => document.querySelector<HTMLElement>(sel))
      .filter((s): s is HTMLElement => Boolean(s))
      .map((s) => ({ top: getPageTop(s), bottom: getPageTop(s) + s.offsetHeight }));

    m.sectionTops = sectionTargets
      .map((sel) => {
        const el = document.querySelector<HTMLElement>(sel);
        return el ? { id: sel.slice(1), top: getPageTop(el), bottom: getPageTop(el) + el.offsetHeight } : null;
      })
      .filter((s): s is { id: string; top: number; bottom: number } => Boolean(s));
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

    const bindDotGroup = (
      section: HTMLElement,
      dots: HTMLButtonElement[],
      itemCount: number,
      indexAttr: string,
    ) => {
      if (!itemCount) return;
      const sectionOffsetTop = getPageTop(section);
      const sectionOffsetHeight = section.offsetHeight;
      dots.forEach((dot) => {
        const handler = () => {
          const targetIndex = Number(dot.dataset[indexAttr] ?? 0);
          const scrollRange = Math.max(1, sectionOffsetHeight - viewportHeight);
          const targetProgress = targetIndex / Math.max(1, itemCount - 1);
          window.scrollTo({ top: sectionOffsetTop + targetProgress * scrollRange, behavior: "smooth" });
        };
        dot.addEventListener("click", handler);
        handlers.push({ el: dot, handler });
      });
    };

    if (r.servicesSection) bindDotGroup(r.servicesSection, r.serviceNavDots, r.servicePanels.length, "serviceIndex");
    if (r.testimonialSection) bindDotGroup(r.testimonialSection, r.testimonialNavDots, r.testimonialCards.length, "testimonialIndex");

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

  // Main scroll-driven updater — native scroll listener, throttled to rAF
  useEffect(() => {
    const onScroll = () => {
      pendingScrollY.current = window.scrollY;
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        const scrollY = pendingScrollY.current;
        const reduceMotion = reduceMotionRef.current;
        const viewportHeight = window.innerHeight || 1;
        const r = cachedRefs.current;
        const m = cachedMetrics.current;

        // Top Nav scroll state (hysteresis prevents flicker at threshold)
        if (r.topNav) {
          const currentState = r.topNav.dataset.navState;
          const enterAt = viewportHeight * 0.12;
          const leaveAt = viewportHeight * 0.04;
          if (currentState !== "scrolled" && scrollY > enterAt) {
            r.topNav.dataset.navState = "scrolled";
          } else if (currentState === "scrolled" && scrollY < leaveAt) {
            r.topNav.dataset.navState = "top";
          }
        }

        // Launch Map
        if (r.launchMap && r.launchFill && r.launchStops.length) {
          const launchSections = m.launchSectionTops;

          if (launchSections.length) {
            const pageStart = launchSections[0].top;
            const pageEnd = launchSections[launchSections.length - 1].bottom;
            const focusLine = scrollY + viewportHeight * 0.42;
            const progress = reduceMotion ? 1 : clamp((focusLine - pageStart) / Math.max(1, pageEnd - pageStart));

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
              stop.setAttribute("aria-current", index === activeIndex ? "true" : "false");
            });
            r.launchMap.dataset.launchVisibility =
              activeIndex === 0 && scrollY < pageStart + viewportHeight * 0.72 ? "hidden" : "visible";
          }
        }

        // Greeting Section
        if (r.greetingSection) {
          const progress = clamp((viewportHeight * 0.84 - (m.greetingCopyTop - scrollY)) / (viewportHeight * 0.36));
          r.greetingSection.style.setProperty("--scroll-progress", progress.toFixed(3));

          r.greetingInkLines.forEach((line, index) => {
            const offsetTop = m.inkLineTops[index] ?? 0;
            const ink = clamp((viewportHeight * 0.82 - (offsetTop - scrollY)) / (viewportHeight * 0.24));
            line.style.setProperty("--ink-percent", Math.round(ink * 100) + "%");
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
          if (reduceMotion) {
            r.processSection.style.setProperty("--process-progress", "1");
            r.processCards.forEach((card, index) => {
              card.style.setProperty("--process-stack-x", "0px");
              card.style.setProperty("--process-stack-y", "0px");
              card.style.setProperty("--process-stack-rotate", "0deg");
              card.style.setProperty("--process-card-scale", "1");
              card.style.setProperty("--process-z", String(index + 1));
            });
          } else {
            const progress = easeOutQuart(clamp((viewportHeight * 0.86 - (m.processGridTop - scrollY)) / (viewportHeight * 0.48)));
            const remaining = 1 - progress;
            const stackCenterX = m.processGridWidth / 2;
            const stackCenterY = m.processGridHeight / 2;
            const middleIndex = (r.processCards.length - 1) / 2;

            r.processCards.forEach((card, index) => {
              const center = m.processCardCenters[index] ?? { x: 0, y: 0 };
              const stackX = (stackCenterX - center.x) * remaining;
              const stackY = (stackCenterY - center.y) * remaining;
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
          if (reduceMotion || window.innerWidth < 760) {
            r.servicesSection.style.setProperty("--service-progress", "1");
            r.serviceRail.style.setProperty("--service-shift", "0px");
            r.servicePanels.forEach((panel) => {
              panel.style.setProperty("--service-panel-opacity", "1");
              panel.style.setProperty("--service-panel-scale", "1");
            });
            r.serviceNavDots.forEach((dot) => { dot.dataset.dotState = "active"; });
          } else {
            const scrollRange = Math.max(1, m.servicesHeight - viewportHeight);
            const progress = clamp(-(m.servicesTop - scrollY) / scrollRange);
            const maxShift = Math.max(0, m.serviceRailScrollHeight - m.serviceShellClientHeight);
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
              dot.setAttribute("aria-current", index === roundedActive ? "true" : "false");
            });
          }
        }

        // Work Section
        if (r.workSection && r.workStage && r.workCenter && r.workCards.length) {
          const stageTop = m.workStageTop - scrollY;
          const stageBottom = stageTop + m.workStageHeight;
          const visibleHeight = Math.max(0, Math.min(stageBottom, viewportHeight) - Math.max(stageTop, 0));
          const spreadProgress = reduceMotion ? 1 : easeOutQuart(clamp(visibleHeight / Math.min(m.workStageHeight, viewportHeight * 0.72)));
          const remaining = 1 - spreadProgress;
          const middleIndex = (r.workCards.length - 1) / 2;

          r.workCards.forEach((card, index) => {
            const cardCenter = m.workCardCenters[index] ?? { x: 0, y: 0 };
            const targetRotate = Number(card.dataset.workRotate || 0);
            const stackRotate = (index - middleIndex) * 2.4;
            const stackX = (m.workCenterCenter.x - cardCenter.x) * remaining;
            const stackY = (m.workCenterCenter.y - cardCenter.y) * remaining;
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
          if (reduceMotion) {
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
            const scrollRange = Math.max(1, m.testimonialHeight - viewportHeight);
            const progress = clamp(-(m.testimonialTop - scrollY) / scrollRange);
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
              dot.setAttribute("aria-current", index === roundedActive ? "true" : "false");
            });
          }
        }

        // Back to top
        if (r.backToTop) {
          r.backToTop.dataset.visible = scrollY > viewportHeight * 1.2 ? "true" : "false";
        }

        // Nav active state
        if (r.navLinks.length && m.sectionTops.length) {
          const focusLine = scrollY + viewportHeight * 0.42;
          let activeId = "";
          for (const section of m.sectionTops) {
            if (focusLine >= section.top - viewportHeight * 0.14) activeId = section.id;
          }
          r.navLinks.forEach((link) => {
            if (link.dataset.navSection === activeId) {
              link.dataset.navActive = "true";
            } else {
              delete link.dataset.navActive;
            }
          });
        }

      }); // end rAF callback
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [metrics]);

  return <span aria-hidden="true" data-choreography-probe hidden />;
}
