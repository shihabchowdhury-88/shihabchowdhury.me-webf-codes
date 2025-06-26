document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".page_content");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuContent = document.querySelector(".menu-content");
  const menuPreviewImg = document.querySelector(".menu-preview-img");
  const menuLinks = document.querySelectorAll(".link a");
  const previewImages = document.querySelectorAll(".preview-img");

  let isOpen = false;
  let isAnimating = false;

  menuToggle.addEventListener("click", () => {
    if (!isOpen) openMenu();
    else closeMenu();
  });

  function switchPreviewImage(targetIndex) {
    // Remove active class from all images
    previewImages.forEach((img) => img.classList.remove("active"));

    // Add active class to target image
    const targetImage = document.querySelector(
      `.preview-img[data-img="${targetIndex}"]`
    );
    if (targetImage) {
      targetImage.classList.add("active");
    }
  }

  function resetPreviewImage() {
    // Reset to first image
    switchPreviewImage(0);
  }

  function animateMenuToggle(isOpening) {
    const open = document.querySelector("#menu-open");
    const close = document.querySelector("#menu-close");

    gsap.to(isOpening ? open : close, {
      x: isOpening ? -5 : -5,
      y: isOpening ? -10 : 10,
      rotation: isOpening ? -5 : 5,
      opacity: 0,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(isOpening ? close : open, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      delay: isOpening ? 0.5 : 0.5,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  function openMenu() {
    if (isAnimating || isOpen) return;
    isAnimating = true;

    gsap.to(container, {
      rotation: 10,
      x: 300,
      y: 450,
      scale: 1.5,
      duration: 1.25,
      ease: "power4.inOut",
    });

    animateMenuToggle(true);

    gsap.to(menuContent, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to([".link a", ".social a"], {
      y: "0%",
      delay: 0.75,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });
  }

  function closeMenu() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;

    gsap.to(container, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    animateMenuToggle(false);

    gsap.to(menuContent, {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        gsap.set([".link a", ".social a"], { y: "120%" });
        resetPreviewImage();
      },
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
      if (!isOpen || isAnimating) return;

      const targetIndex = link.getAttribute("data-target");
      if (targetIndex === null || targetIndex === undefined) return;

      switchPreviewImage(targetIndex);
    });
  });
});
