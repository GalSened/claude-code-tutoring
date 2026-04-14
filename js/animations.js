import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Hero reveal is owned by js/video-sync.js (fires after video freeze at t=7s).
  // GSAP must NOT touch .hero__content — inline styles from gsap.from beat the
  // CSS class-reveal and pin the element invisible.

  // Chasm — pain slides from left, win slides from right (mirrors the argument)
  gsap.from('.chasm__col--pain .chasm__list li', {
    scrollTrigger: { trigger: '.chasm__columns', start: 'top 75%' },
    opacity: 0,
    x: -30,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out',
  });
  gsap.from('.chasm__col--win .chasm__list li', {
    scrollTrigger: { trigger: '.chasm__columns', start: 'top 75%' },
    opacity: 0,
    x: 30,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out',
  });
  gsap.from('.chasm__bridge-line, .chasm__close', {
    scrollTrigger: { trigger: '.chasm__bridge', start: 'top 85%' },
    opacity: 0,
    y: 20,
    stagger: 0.18,
    duration: 0.8,
    ease: 'power2.out',
  });

  // Philosophy equation — staggered reveal
  gsap.from('.philosophy__term, .philosophy__op', {
    scrollTrigger: {
      trigger: '.philosophy__equation',
      start: 'top 75%',
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Philosophy text
  gsap.from('.philosophy__text p', {
    scrollTrigger: {
      trigger: '.philosophy__text',
      start: 'top 80%',
    },
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.7,
    ease: 'power2.out',
  });

  // Track cards — staggered
  gsap.from('.track', {
    scrollTrigger: {
      trigger: '.tracks__grid',
      start: 'top 75%',
    },
    opacity: 0,
    y: 50,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Proof cards — slide from right
  gsap.from('.proof__card', {
    scrollTrigger: {
      trigger: '.proof__scroll',
      start: 'top 80%',
    },
    opacity: 0,
    x: 60,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  });

  // About — left and right columns
  gsap.from('.about__left', {
    scrollTrigger: {
      trigger: '.about__grid',
      start: 'top 75%',
    },
    opacity: 0,
    x: -40,
    duration: 0.8,
    ease: 'power3.out',
  });

  gsap.from('.about__right', {
    scrollTrigger: {
      trigger: '.about__grid',
      start: 'top 75%',
    },
    opacity: 0,
    x: 40,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.15,
  });

  // CTA section
  gsap.from('.cta__content > *', {
    scrollTrigger: {
      trigger: '.cta',
      start: 'top 75%',
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power2.out',
  });

  // FAQ items
  gsap.from('.faq__item', {
    scrollTrigger: {
      trigger: '.faq__list',
      start: 'top 80%',
    },
    opacity: 0,
    y: 20,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out',
  });

  // Stat counters (about section) — preserves K/M suffixes and trailing "+"
  document.querySelectorAll('.about__stat strong').forEach(el => {
    const match = el.textContent.trim().match(/^(\d+(?:\.\d+)?)([KM]?)(\+?)$/);
    if (!match) return;
    const [, numStr, unit, plus] = match;
    const target = parseFloat(numStr);
    const format = (n) => {
      const rounded = unit ? Math.round(n * 10) / 10 : Math.round(n);
      return rounded + unit + plus;
    };
    el.textContent = format(0);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = format(counter.value); },
          onComplete: () => { el.textContent = format(target); },
        });
      },
      once: true,
    });
  });
}
