// AOS Init on page load
window.addEventListener('DOMContentLoaded', () => {
  AOS.init();
});

// Counter animation logic
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-count");
    const current = +counter.innerText;
    const increment = Math.ceil(target / 100);
    if (current < target) {
      counter.innerText = current + increment;
      setTimeout(update, 40);
    } else {
      counter.innerText = target;
    }
  };
  update();
});

// Open modal by ID
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

// Close modal and reset all relevant form fields
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");

  // Reset respective modals
  if (id === 'demoModal') {
    document.getElementById("modalThankYou").classList.add("hidden");
    document.getElementById("name").value = "";
    document.getElementById("demoEmail").value = "";
  } else if (id === 'exploreModal') {
    document.getElementById("accessLinks").classList.add("hidden");
    document.getElementById("exploreName").value = "";
    document.getElementById("exploreEmail").value = "";
  } else if (id === 'helpModal') {
    document.getElementById("helpThankYou").classList.add("hidden");
    document.getElementById("helpName").value = "";
    document.getElementById("helpPhone").value = "";
    document.getElementById("helpEmail").value = "";
    document.getElementById("helpMessage").value = "";
  }
}

// Handle Demo modal submission
function handleDemoSubmit(event) {
  event.preventDefault();
  document.getElementById("modalThankYou").classList.remove("hidden");
  setTimeout(() => {
    closeModal("demoModal");
  }, 2000);
  return false;
}

// Handle Explore Now modal form
function handleExploreSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("exploreName").value.trim();
  const email = document.getElementById("exploreEmail").value.trim();
  if (name && email) {
    document.getElementById("accessLinks").classList.remove("hidden");
  }
  return false;
}

// Handle Email Signup form at the bottom
function submitForm(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  if (email.trim() !== "") {
    document.getElementById("formMessage").classList.remove("hidden");
  }
  return false;
}

// Handle Help button form submission
function handleHelpSubmit(event) {
  event.preventDefault();
  document.getElementById("helpThankYou").classList.remove("hidden");
  setTimeout(() => {
    closeModal("helpModal");
  }, 2000);
  return false;
}

// Circular auto-rotating feature carousel with enlarged center
const slider = document.getElementById("featureSlider");
const originalSlides = slider.querySelectorAll("div.flex-shrink-0");
let currentIndex = 1;

// Clone first and last slides for infinite loop effect
const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
slider.appendChild(firstClone);
slider.insertBefore(lastClone, originalSlides[0]);

const allSlides = slider.querySelectorAll("div.flex-shrink-0");

// Set initial position
slider.style.transform = `translateX(-${currentIndex * 100}%)`;

function updateScales() {
  allSlides.forEach((slide, i) => {
    const card = slide.querySelector("div.bg-gray-100");
    if (i === currentIndex) {
      card.classList.add("scale-110");
      card.classList.remove("scale-100");
    } else {
      card.classList.remove("scale-110");
      card.classList.add("scale-100");
    }
  });
}

function rotateFeatures() {
  currentIndex++;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateScales();

  // Reset to actual first after the clone
  if (currentIndex === allSlides.length - 1) {
    setTimeout(() => {
      slider.style.transition = "none";
      currentIndex = 1;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateScales();
    }, 500);
  }
}

// Initialize
updateScales();
setInterval(rotateFeatures, 3000);


