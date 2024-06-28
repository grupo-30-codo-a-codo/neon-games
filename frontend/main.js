import { manageItemsInCartValue } from "./src/scripts/carroCompras";

// modal functionality login and register
document.addEventListener("DOMContentLoaded", function () {
  var loginModal = document.querySelector(".loginModal");
  var loginBtns = document.querySelectorAll(".user-btn");
  var loginCloseBtn = document.querySelector(".loginModal .close");

  loginBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      if (loginModal) {
        loginModal.style.display = "flex";
      }
    });
  });

  if (loginCloseBtn) {
    loginCloseBtn.addEventListener("click", function () {
      if (loginModal) {
        loginModal.style.display = "none";
      }
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = "none";
    }
  });

  var registerModal = document.querySelector(".registerModal");
  var registerLink = document.querySelector(".register-link");
  var backToLoginLink = document.querySelector(".back-login-link");
  var registerCloseBtns = document.querySelectorAll(".registerModal .close");

  if (registerLink && registerModal) {
    registerLink.addEventListener("click", function (event) {
      event.preventDefault();
      if (loginModal) {
        loginModal.style.display = "none";
      }
      registerModal.style.display = "flex";
    });
  }

  if (backToLoginLink) {
    backToLoginLink.addEventListener("click", function (event) {
      event.preventDefault();
      registerModal.style.display = "none";
      if (loginModal) {
        loginModal.style.display = "flex";
      }
    });
  }

  registerCloseBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      if (registerModal) {
        registerModal.style.display = "none";
      }
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === registerModal) {
      registerModal.style.display = "none";
    }
  });
});

// billboard section
let index = 0;
const images = document.querySelectorAll(".billboard-home-img");

function showImage() {
  images.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) {
      img.classList.add("active");
    }
  });
}
showImage();

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}
setInterval(nextImage, 4000);
// CAROUSEL SECTION
const carousels = document.querySelectorAll(".carousel-container");
carousels.forEach((carouselContainer) => {
  let index = 0;
  let isHolding = false;
  const carousel = carouselContainer.querySelector(".carousel");
  const cards = carouselContainer.querySelectorAll(".card, .offer-card");
  const prevBtns = carouselContainer.querySelectorAll(".prevBtn");
  const nextBtns = carouselContainer.querySelectorAll(".nextBtn");

  function updateIndex() {
    const cardWidth = cards[0].offsetWidth;
    index = Math.round(carousel.scrollLeft / cardWidth);
  }
  carousel.addEventListener("scroll", updateIndex);

  function animateScroll(targetScroll) {
    const startScroll = carousel.scrollLeft;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 300, 1);
      carousel.scrollLeft =
        startScroll + (targetScroll - startScroll) * progress;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  function showCards() {
    const cardWidth = cards[0].offsetWidth;
    const offsetX = index * cardWidth;
    animateScroll(offsetX);
  }

  function handleContinuousScroll(direction) {
    if (isHolding) {
      if (direction === "prev" && index > 0) {
        index--;
      } else if (direction === "next" && index < cards.length - 1) {
        index++;
      }
      showCards();
      setTimeout(() => handleContinuousScroll(direction), 300);
    }
  }
  prevBtns.forEach((prevBtn) => {
    prevBtn.addEventListener("mousedown", () => {
      isHolding = true;
      handleContinuousScroll("prev");
    });
    prevBtn.addEventListener("mouseup", () => {
      isHolding = false;
    });
    prevBtn.addEventListener("mouseleave", () => {
      isHolding = false;
    });
  });
  nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("mousedown", () => {
      isHolding = true;
      handleContinuousScroll("next");
    });
    nextBtn.addEventListener("mouseup", () => {
      isHolding = false;
    });
    nextBtn.addEventListener("mouseleave", () => {
      isHolding = false;
    });
  });

  let startX;
  let isDragging = false;
  let initialScroll;

  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    initialScroll = carousel.scrollLeft;
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const scrollX = startX - currentX;
    carousel.scrollLeft = initialScroll + scrollX;
  });

  carousel.addEventListener("touchend", () => {
    isDragging = false;
  });

  showCards();
});


manageItemsInCartValue()//lo puse aca porque este script se importa globalmente en todos las vistas, actualiza el icono del carrito