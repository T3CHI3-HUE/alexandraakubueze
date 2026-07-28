/**
 * ALEXANDRA AKUBUEZE — Premium Portfolio JavaScript
 * GSAP Animations, Interactions & Effects
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ============================================
  // 1. LENIS SMOOTH SCROLL
  // ============================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ============================================
  // 2. LOADING SCREEN
  // ============================================
  const loader = document.getElementById("loader");

  function hideLoader() {
    const tl = gsap.timeline({
      onComplete: () => {
        loader.style.display = "none";
      },
    });
    tl.to(loader, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }

  // Fallback: hide loader after 4 seconds max (in case CDN is slow)
  setTimeout(() => {
    if (loader.style.display !== "none") {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          loader.style.display = "none";
        },
      });
    }
  }, 4000);

  // ============================================
  // 3. SCROLL PROGRESS INDICATOR
  // ============================================
  const progressBar = document.getElementById("scrollProgress");

  gsap.to(progressBar, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });

  // ============================================
  // 4. CUSTOM CURSOR
  // ============================================
  const cursor = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursorTrail");
  let mouseX = 0,
    mouseY = 0;
  let trailX = 0,
    trailY = 0;

  if (window.innerWidth > 1024) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
      gsap.set(cursor, { x: mouseX, y: mouseY });
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;
      gsap.set(cursorTrail, { x: trailX, y: trailY });
    });

    // Cursor hover effects on interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, .project-card, .skill-card, .contact-card, .magnetic-btn"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out" });
        gsap.to(cursorTrail, {
          scale: 1.8,
          duration: 0.3,
          ease: "power2.out",
          borderColor: "rgba(100,255,218,0.6)",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(cursorTrail, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          borderColor: "rgba(100,255,218,0.3)",
        });
      });
    });
  }

  // ============================================
  // 5. MOUSE-FOLLOWING LIGHT
  // ============================================
  const mouseLight = document.getElementById("mouseLight");
  if (mouseLight) {
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(mouseLight, {
        x: x - mouseLight.offsetWidth / 2,
        y: y - mouseLight.offsetHeight / 2,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }

  // ============================================
  // 6. MAGNETIC BUTTONS
  // ============================================
  const magneticBtns = document.querySelectorAll(".magnetic-btn");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    });
  });

  // ============================================
  // 7. HERO TIMELINE REVEAL
  // ============================================
  const heroTl = gsap.timeline({
    delay: 0.2,
    onStart: hideLoader,
  });

  // Badges stagger
  heroTl.from(
    ".hero-badges span",
    {
      y: 30,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    },
    0
  );

  // Headline split text effect
  heroTl.from(
    ".hero-title span",
    {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power4.out",
    },
    0.2
  );

  // Subtitle
  heroTl.from(
    ".hero-subtitle",
    {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    },
    0.6
  );

  // CTAs
  heroTl.from(
    ".hero-ctas a",
    {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
    },
    0.9
  );

  // Stats cards
  heroTl.from(
    ".stat-card",
    {
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
    },
    1.2
  );

  // Logos
  heroTl.from(
    ".hero-logos span",
    {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    },
    1.6
  );

  // ============================================
  // 8. FLOATING PARTICLES
  // ============================================
  const particlesContainer = document.getElementById("particles");
  if (particlesContainer) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full pointer-events-none";
      const size = Math.random() * 4 + 2;
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${["#64FFDA", "#3B82F6", "#7C3AED", "#F8FAFC"][
          Math.floor(Math.random() * 4)
        ]};
        opacity: ${Math.random() * 0.4 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      particlesContainer.appendChild(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: Math.random() * 0.3 + 0.05,
        duration: Math.random() * 10 + 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });
    }
  }

  // ============================================
  // 9. SECTION TRIGGERED ANIMATIONS
  // ============================================

  // Helper: animate elements on scroll into view
  function animateOnScroll(selector, fromVars, duration = 0.7, stagger = 0.1) {
    const els = document.querySelectorAll(selector);
    els.forEach((el) => {
      gsap.from(el, {
        ...fromVars,
        duration,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }

  // Section headers
  function animateSectionHeaders() {
    document.querySelectorAll(".section-header").forEach((header) => {
      const span = header.querySelector("span");
      const h2 = header.querySelector("h2");
      const p = header.querySelector("p");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (span) {
        tl.from(span, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }
      if (h2) {
        tl.from(
          h2,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
      if (p) {
        tl.from(
          p,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }
    });
  }

  animateSectionHeaders();

  // Projects stagger
  gsap.from(".project-card", {
    y: 60,
    opacity: 0,
    scale: 0.95,
    duration: 0.7,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#projects .grid",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Skills stagger
  gsap.from(".skill-card", {
    y: 50,
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Skills progress bars animation
  gsap.utils.toArray(".skill-progress").forEach((bar) => {
    const width = bar.dataset.width || 85;
    gsap.to(bar, {
      width: `${width}%`,
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bar.closest(".skill-card"),
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // About section
  // Image reveal
  const aboutImgWrapper = document.querySelector(".about-image-wrapper");
  if (aboutImgWrapper) {
    gsap.to(".about-image-reveal", {
      width: "0%",
      duration: 1.2,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: aboutImgWrapper,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(aboutImgWrapper.querySelector("img"), {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutImgWrapper,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }

  // About text content
  gsap.from(".about-content", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // About stats stagger
  gsap.from(".about-stat", {
    y: 40,
    opacity: 0,
    scale: 0.95,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-stat",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll(".counter-value");
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      if (isNaN(target)) return;

      const suffix = counter.dataset.suffix || "+";

      gsap.from(counter, {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          const val = Math.round(counter.textContent);
          counter.textContent = val + suffix;
        },
        onComplete: () => {
          counter.textContent = target + suffix;
        },
      });
    });
  }

  animateCounters();

  // Contact section
  gsap.from(".contact-card", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contact .grid",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // ============================================
  // 10. NAVIGATION ACTIVE STATE
  // ============================================
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Use Lenis scroll event for better accuracy
  lenis.on("scroll", updateActiveNav);

  // ============================================
  // 11. SMOOTH NAVIGATION LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      }
    });
  });

  // ============================================
  // 12. MOBILE MENU
  // ============================================
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  function closeMobileMenu() {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Expose for HTML onclick
  window.closeMobileMenu = closeMobileMenu;

  // Close on outside click
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  // ============================================
  // 13. PARALLAX ON MOUSE
  // ============================================
  const heroSection = document.getElementById("home");
  if (heroSection && window.innerWidth > 768) {
    heroSection.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      gsap.to(".hero-title", {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(".hero-subtitle", {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(".hero-ctas", {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(".hero-stats", {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }

  // ============================================
  // 14. ANIMATED GRADIENT ON HEADINGS
  // ============================================
  gsap.utils
    .toArray(".bg-gradient-to-r.bg-clip-text")
    .forEach((el) => {
      gsap.to(el, {
        backgroundPosition: "200% 50%",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

  // ============================================
  // 15. FLOATING ELEMENTS (ENHANCED)
  // ============================================
  // Stat cards in hero already animate via timeline,
  // this adds subtle continuous floating
  gsap.to(".stat-card", {
    y: -6,
    duration: 2.5 + Math.random(),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.3,
  });

  // ============================================
  // 16. RESIZE HANDLER
  // ============================================
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // ============================================
  // 17. INITIAL REFRESH
  // ============================================
  ScrollTrigger.refresh();

  console.log("🎨 Alexandra Akubueze — Premium Portfolio loaded");
});

