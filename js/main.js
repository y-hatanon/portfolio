const works = document.querySelectorAll(".work");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-show");
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.15
    }
  );

  works.forEach((work) => {
    observer.observe(work);
  });
} else {
  works.forEach((work) => {
    work.classList.add("is-show");
  });
}

const pagetop = document.querySelector(".pagetop");
const footer = document.querySelector("footer");

if (pagetop) {
  const togglePagetop = () => {
    if (window.scrollY > 300) {
      pagetop.classList.add("is-show");
    } else {
      pagetop.classList.remove("is-show");
    }
  };

  const adjustPagetop = () => {
    if (!footer) {
      return;
    }

    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const baseBottom = 24;
    const margin = 16;

    if (footerRect.top < windowHeight) {
      const overlap = windowHeight - footerRect.top;
      pagetop.style.bottom = `${overlap + margin}px`;
    } else {
      pagetop.style.bottom = `${baseBottom}px`;
    }
  };

  const updatePagetop = () => {
    togglePagetop();
    adjustPagetop();
  };

  updatePagetop();

  window.addEventListener("scroll", updatePagetop, {
    passive: true
  });

  window.addEventListener("resize", adjustPagetop);
}