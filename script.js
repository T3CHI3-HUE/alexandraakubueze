      // Hamburger menu functionality
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

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        });
      });

      // Close mobile menu when clicking outside
      mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
          closeMobileMenu();
        }
      });

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
          }
        });
      }, observerOptions);

      // Observe all animated elements
      document
        .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
        .forEach((el) => {
          el.style.animationPlayState = "paused";
          observer.observe(el);
        });

      // Parallax effect for hero section (reduced intensity)
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById("home");
        if (hero && scrolled < window.innerHeight) {
          hero.style.transform = `translateY(${scrolled * 0.2}px)`;
        } else if (hero) {
          hero.style.transform = `translateY(0px)`;
        }
      });

      // Active navigation highlighting
      window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.clientHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("text-indigo-300");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("text-indigo-300");
          }
        });
      });