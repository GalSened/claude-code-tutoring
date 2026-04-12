import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Hero content fade-in on load
  gsap.from('.hero__content', {
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.3,
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

  // Stat counters (about section)
  document.querySelectorAll('.about__stat strong').forEach(el => {
    const target = parseInt(el.textContent);
    if (isNaN(target)) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(el, {
          textContent: 0,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            el.textContent = Math.round(parseFloat(el.textContent)) + '+';
          },
        });
      },
      once: true,
    });
  });
}
