document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll("[data-gallery]");

  galleries.forEach((gallery) => {
    const mainImage = gallery.querySelector("[data-gallery-image]");
    const imageNodes = gallery.querySelectorAll(".gallery-images img");
    const prevBtn = gallery.querySelector("[data-gallery-prev]");
    const nextBtn = gallery.querySelector("[data-gallery-next]");

    if (!mainImage || imageNodes.length === 0) return;



    // ✅ ONLY keep valid image src values
    const images = Array.from(imageNodes)
      .map((img) => img.getAttribute("src"))
      .filter((src) => src && src.trim() !== "");

    if (images.length === 0) return;

    let currentIndex = images.indexOf(mainImage.src);
    if (currentIndex === -1) currentIndex = 0;

    const updateImage = () => {
      mainImage.src = images[currentIndex];
    };

    // 🔑 Initialize immediately
    updateImage();

    const goNext = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    };

    const goPrev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    };

    /* ----------------------------------
       Button Controls
    ---------------------------------- */
    prevBtn?.addEventListener("click", goPrev);
    nextBtn?.addEventListener("click", goNext);

    /* ----------------------------------
       Keyboard Controls
    ---------------------------------- */
    gallery.setAttribute("tabindex", "0");

    gallery.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "ArrowRight") {
        goNext();
      }
    });

    /* ----------------------------------
       Swipe Controls (Mobile)
    ---------------------------------- */
    let startX = 0;
    let endX = 0;
    const swipeThreshold = 50;

    gallery.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].screenX;
    });

    gallery.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].screenX;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
        diff > 0 ? goNext() : goPrev();
      }
    });
  });
});
